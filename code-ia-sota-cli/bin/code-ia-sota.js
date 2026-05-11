#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";

import fsExtra from "fs-extra";
import simpleGit from "simple-git";
import pc from "picocolors";

const REPO_URL =
  "https://github.com/wolfox33/Code_IA_SotA.git";

const TARGET_DIR = process.cwd();

const REQUIRED_OPERATIONAL_SKILL_SECTIONS = [
  ["Objetivo", "Objective"],
  ["Use this skill when"],
  ["Do not use this skill when"],
  ["Output contracts", "Output esperado"],
  ["Procedure", "Processo", "Review dimensions", "Diagnostic dimensions"],
  ["Verification"]
];

const DENSITY_THRESHOLD = parseInt(process.env.HARNESS_DENSITY_THRESHOLD || "30", 10);
const FAIL_ON_WARNINGS = process.env.HARNESS_FAIL_ON_WARNINGS === "true";

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function cloneTemplate(tmpDir) {
  console.log(pc.cyan("Downloading template..."));

  await simpleGit().clone(REPO_URL, tmpDir, [
    "--depth",
    "1",
    "--filter=blob:none",
    "--sparse"
  ]);

  const repoGit = simpleGit(tmpDir);

  await repoGit.raw([
    "sparse-checkout",
    "set",
    "--no-cone",
    "AGENTS.md",
    ".agents/**"
  ]);
}

async function copyFiles(tmpDir) {
  const sourceAgentsFile =
    path.join(tmpDir, "AGENTS.md");

  const sourceAgentsDir =
    path.join(tmpDir, ".agents");

  const targetAgentsFile =
    path.join(TARGET_DIR, "AGENTS.md");

  const targetAgentsDir =
    path.join(TARGET_DIR, ".agents");

  if (!(await exists(sourceAgentsFile))) {
    throw new Error(
      "AGENTS.md not found in repository."
    );
  }

  await fsExtra.copy(
    sourceAgentsFile,
    targetAgentsFile,
    {
      overwrite: true
    }
  );

  if (await exists(sourceAgentsDir)) {
    await fsExtra.copy(
      sourceAgentsDir,
      targetAgentsDir,
      {
        overwrite: true
      }
    );
  }
}

function parseFrontmatter(content) {
  const normalizedContent = content.replace(/\r\n/g, "\n");

  if (!normalizedContent.startsWith("---\n")) {
    return null;
  }

  const endIndex = normalizedContent.indexOf("\n---", 4);

  if (endIndex === -1) {
    return null;
  }

  const raw = normalizedContent.slice(4, endIndex).trim();
  const data = {};

  for (const line of raw.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);

    if (match) {
      data[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }

  return {
    data,
    body: normalizedContent.slice(endIndex + 5).trim()
  };
}

function hasSection(content, sectionNames) {
  const names = Array.isArray(sectionNames) ? sectionNames : [sectionNames];

  return names.some((sectionName) => {
    const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`^#{1,6}\\s+${escaped}\\s*$`, "im");

    return pattern.test(content);
  });
}

function addFailure(failures, rootDir, filePath, reason) {
  failures.push({
    filePath: path.relative(rootDir, filePath),
    reason
  });
}

function addWarning(warnings, rootDir, filePath, reason) {
  warnings.push({
    filePath: path.relative(rootDir, filePath),
    reason
  });
}

async function listMarkdownFiles(dirPath) {
  if (!(await exists(dirPath))) {
    return [];
  }

  const entries = await fs.readdir(dirPath, {
    withFileTypes: true
  });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => path.join(dirPath, entry.name));
}

async function listSkillFiles(skillsDir) {
  if (!(await exists(skillsDir))) {
    return [];
  }

  const entries = await fs.readdir(skillsDir, {
    withFileTypes: true
  });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(skillsDir, entry.name, "SKILL.md"));
}

function calculateDensity(content) {
  const lines = content.split("\n").filter(line => line.trim().length > 0);
  const totalLines = lines.length;

  const procedureMatch = content.match(/^##\s+Procedure/im);
  if (!procedureMatch) {
    return 0;
  }

  const procedureIndex = procedureMatch.index;
  const nextSectionMatch = content.slice(procedureIndex + procedureMatch[0].length).match(/^##\s+/im);
  const endIndex = nextSectionMatch ? procedureIndex + nextSectionMatch.index : content.length;

  const procedureContent = content.slice(procedureIndex, endIndex);
  const procedureLines = procedureContent.split("\n").filter(line => line.trim().length > 0).length;

  return Math.round((procedureLines / totalLines) * 100);
}

async function validateSkill(rootDir, filePath, failures, warnings) {
  if (!(await exists(filePath))) {
    addFailure(failures, rootDir, filePath, "SKILL.md is missing.");
    return;
  }

  const content = await fs.readFile(filePath, "utf8");
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    addFailure(failures, rootDir, filePath, "YAML frontmatter is missing or invalid.");
    return;
  }

  if (!frontmatter.data.name) {
    addFailure(failures, rootDir, filePath, "frontmatter field `name` is missing.");
  }

  if (!frontmatter.data.description) {
    addFailure(failures, rootDir, filePath, "frontmatter field `description` is missing.");
  }

  if (/placeholder/i.test(frontmatter.data.description || "")) {
    addFailure(failures, rootDir, filePath, "placeholder description is not allowed.");
  }

  for (const sectionGroup of REQUIRED_OPERATIONAL_SKILL_SECTIONS) {
    if (!hasSection(content, sectionGroup)) {
      addWarning(warnings, rootDir, filePath, `operational section group \`${sectionGroup.join(" | ")}\` is missing.`);
    }
  }

  const density = calculateDensity(content);
  if (density < DENSITY_THRESHOLD) {
    addWarning(warnings, rootDir, filePath, `Low density (<${DENSITY_THRESHOLD}%): ${density}% density. Consider moving reference content to references/ and adding executable procedure.`);
  }
}

async function validateWorkflow(rootDir, filePath, failures) {
  const content = await fs.readFile(filePath, "utf8");
  const frontmatter = parseFrontmatter(content);

  if (!frontmatter) {
    addFailure(failures, rootDir, filePath, "YAML frontmatter is missing or invalid.");
    return;
  }

  if (!frontmatter.data.description) {
    addFailure(failures, rootDir, filePath, "frontmatter field `description` is missing.");
  }

  if (!frontmatter.body) {
    addFailure(failures, rootDir, filePath, "workflow body is empty.");
  }
}

async function validateHarness(rootDir) {
  const agentsDir = path.join(rootDir, ".agents");
  const skillsDir = path.join(agentsDir, "skills");
  const workflowsDir = path.join(agentsDir, "workflows");
  const failures = [];
  const warnings = [];
  const skillFiles = await listSkillFiles(skillsDir);
  const workflowFiles = await listMarkdownFiles(workflowsDir);

  console.log(pc.bold(pc.green("Code IA Sota")));
  console.log(pc.cyan("Validating harness..."));

  for (const filePath of skillFiles) {
    await validateSkill(rootDir, filePath, failures, warnings);
  }

  for (const filePath of workflowFiles) {
    await validateWorkflow(rootDir, filePath, failures);
  }

  console.log("");
  console.log(`Checked ${skillFiles.length} skills.`);
  console.log(`Checked ${workflowFiles.length} workflows.`);

  if (warnings.length > 0) {
    console.log("");
    console.warn(pc.yellow(`Validation completed with ${warnings.length} warning(s):`));

    for (const warning of warnings) {
      console.warn(`  ${warning.filePath}: ${warning.reason}`);
    }

    if (FAIL_ON_WARNINGS) {
      console.log("");
      console.error(pc.red(`Validation failed due to warnings (FAIL_ON_WARNINGS=true).`));
      process.exitCode = 1;
      return;
    }
  }

  if (failures.length > 0) {
    console.log("");
    console.error(pc.red(`Validation failed with ${failures.length} issue(s):`));

    for (const failure of failures) {
      console.error(`  ${failure.filePath}: ${failure.reason}`);
    }

    process.exitCode = 1;
    return;
  }

  console.log("");
  console.log(pc.green("Validation passed."));
}

async function analyzeReferenceContent(content) {
  const suggestions = [];

  const sections = content.split(/^##\s+/m);
  for (const section of sections) {
    if (!section.trim()) continue;

    const lines = section.split("\n");
    const sectionName = lines[0].trim();
    const sectionContent = lines.slice(1).join("\n");

    const hasExternalLinks = /https?:\/\//.test(sectionContent);
    const hasLongLists = sectionContent.split("\n").filter(line => /^[-*]\s/.test(line)).length > 5;
    const hasCodeBlocks = /```[\s\S]*```/.test(sectionContent);
    const isLongSection = sectionContent.split("\n").length > 20;

    if (hasExternalLinks || hasLongLists || (isLongSection && !hasCodeBlocks)) {
      suggestions.push({
        section: sectionName,
        reason: hasExternalLinks ? "contains external links" : hasLongLists ? "has long lists" : "is long without code blocks",
        action: "consider moving reference content to references/"
      });
    }
  }

  return suggestions;
}

async function suggestRefactor(rootDir) {
  const agentsDir = path.join(rootDir, ".agents");
  const skillsDir = path.join(agentsDir, "skills");
  const skillFiles = await listSkillFiles(skillsDir);
  const suggestions = [];

  console.log(pc.bold(pc.green("Code IA Sota")));
  console.log(pc.cyan("Analyzing low-density skills for refactoring suggestions..."));
  console.log("");

  for (const filePath of skillFiles) {
    if (!(await exists(filePath))) continue;

    const content = await fs.readFile(filePath, "utf8");
    const density = calculateDensity(content);

    if (density < DENSITY_THRESHOLD) {
      const referenceSuggestions = await analyzeReferenceContent(content);
      const skillName = path.basename(path.dirname(filePath));

      suggestions.push({
        skill: skillName,
        density: density,
        filePath: path.relative(rootDir, filePath),
        suggestions: referenceSuggestions
      });
    }
  }

  suggestions.sort((a, b) => a.density - b.density);

  if (suggestions.length === 0) {
    console.log(pc.green("No low-density skills found. All skills meet the density threshold."));
    return;
  }

  console.log(`Found ${suggestions.length} low-density skill(s):`);
  console.log("");

  for (const suggestion of suggestions) {
    console.log(pc.yellow(`Skill: ${suggestion.skill} (${suggestion.density}% density)`));
    console.log(`  File: ${suggestion.filePath}`);

    if (suggestion.suggestions.length > 0) {
      console.log("  Refactoring suggestions:");
      for (const ref of suggestion.suggestions) {
        console.log(`    - Section "${ref.section}": ${ref.reason}. ${ref.action}`);
      }
    } else {
      console.log("  No specific sections identified. Consider expanding the Procedure section.");
    }

    console.log("");
  }

  console.log(pc.cyan("To refactor:"));
  console.log("  1. Review the suggestions above");
  console.log("  2. Move reference content to references/");
  console.log("  3. Expand the Procedure section with executable steps");
  console.log("  4. Re-run validation to check improved density");
}

async function benchmarkDensity(rootDir) {
  const agentsDir = path.join(rootDir, ".agents");
  const skillsDir = path.join(agentsDir, "skills");
  const skillFiles = await listSkillFiles(skillsDir);
  const results = [];
  const jsonOutput = process.argv.includes("--json");

  console.log(pc.bold(pc.green("Code IA Sota")));
  console.log(pc.cyan("Benchmarking density for all skills..."));
  console.log("");

  for (const filePath of skillFiles) {
    if (!(await exists(filePath))) continue;

    const content = await fs.readFile(filePath, "utf8");
    const density = calculateDensity(content);
    const skillName = path.basename(path.dirname(filePath));

    results.push({
      skill: skillName,
      density: density,
      filePath: path.relative(rootDir, filePath)
    });
  }

  results.sort((a, b) => a.density - b.density);

  const densities = results.map(r => r.density);
  const average = Math.round(densities.reduce((a, b) => a + b, 0) / densities.length);
  const min = Math.min(...densities);
  const max = Math.max(...densities);

  if (jsonOutput) {
    console.log(JSON.stringify({
      skills: results,
      statistics: {
        average: average,
        min: min,
        max: max,
        total: results.length
      }
    }, null, 2));
    return;
  }

  console.log(`Total skills: ${results.length}`);
  console.log(`Average density: ${average}%`);
  console.log(`Min density: ${min}%`);
  console.log(`Max density: ${max}%`);
  console.log("");
  console.log("Density by skill (ascending):");
  console.log("");

  for (const result of results) {
    const densityColor = result.density < DENSITY_THRESHOLD ? pc.red : result.density < 50 ? pc.yellow : pc.green;
    console.log(`${densityColor(result.density + "%")} ${result.skill}`);
    console.log(`  File: ${result.filePath}`);
    console.log("");
  }

  console.log(pc.cyan("Low-density skills (<" + DENSITY_THRESHOLD + "%):"));
  const lowDensity = results.filter(r => r.density < DENSITY_THRESHOLD);
  if (lowDensity.length === 0) {
    console.log("  None");
  } else {
    for (const result of lowDensity) {
      console.log(`  - ${result.skill} (${result.density}%)`);
    }
  }
}

async function densitySnapshot(rootDir) {
  const agentsDir = path.join(rootDir, ".agents");
  const skillsDir = path.join(agentsDir, "skills");
  const dataDir = path.join(agentsDir, "data");
  const historyFile = path.join(dataDir, "density-history.json");
  const skillFiles = await listSkillFiles(skillsDir);
  const snapshot = {
    timestamp: new Date().toISOString(),
    skills: []
  };

  console.log(pc.bold(pc.green("Code IA Sota")));
  console.log(pc.cyan("Creating density snapshot..."));
  console.log("");

  for (const filePath of skillFiles) {
    if (!(await exists(filePath))) continue;

    const content = await fs.readFile(filePath, "utf8");
    const density = calculateDensity(content);
    const skillName = path.basename(path.dirname(filePath));

    snapshot.skills.push({
      skill: skillName,
      density: density,
      filePath: path.relative(rootDir, filePath)
    });
  }

  snapshot.skills.sort((a, b) => a.density - b.density);

  if (!(await exists(dataDir))) {
    await fs.mkdir(dataDir, { recursive: true });
  }

  let history = [];
  if (await exists(historyFile)) {
    const historyContent = await fs.readFile(historyFile, "utf8");
    history = JSON.parse(historyContent);
  }

  history.push(snapshot);

  await fs.writeFile(historyFile, JSON.stringify(history, null, 2));

  console.log(`Snapshot created at ${snapshot.timestamp}`);
  console.log(`Total skills: ${snapshot.skills.length}`);
  console.log(`History file: ${historyFile}`);
  console.log(`Total snapshots: ${history.length}`);
}

async function densityTrends(rootDir) {
  const agentsDir = path.join(rootDir, ".agents");
  const historyFile = path.join(agentsDir, "data", "density-history.json");

  console.log(pc.bold(pc.green("Code IA Sota")));
  console.log(pc.cyan("Generating density trends report..."));
  console.log("");

  if (!(await exists(historyFile))) {
    console.log(pc.yellow("No density history found. Run `npm run density:snapshot` first."));
    return;
  }

  const historyContent = await fs.readFile(historyFile, "utf8");
  const history = JSON.parse(historyContent);

  if (history.length === 0) {
    console.log(pc.yellow("No snapshots found in history."));
    return;
  }

  console.log(`Total snapshots: ${history.length}`);
  console.log("");

  const skillTrends = {};

  for (const snapshot of history) {
    console.log(pc.bold(`Snapshot: ${snapshot.timestamp}`));

    for (const skill of snapshot.skills) {
      if (!skillTrends[skill.skill]) {
        skillTrends[skill.skill] = [];
      }
      skillTrends[skill.skill].push({
        timestamp: snapshot.timestamp,
        density: skill.density
      });
    }

    const densities = snapshot.skills.map(s => s.density);
    const average = Math.round(densities.reduce((a, b) => a + b, 0) / densities.length);
    console.log(`  Average density: ${average}%`);
    console.log(`  Total skills: ${snapshot.skills.length}`);
    console.log("");
  }

  console.log(pc.cyan("Density trends by skill:"));
  console.log("");

  for (const [skillName, trends] of Object.entries(skillTrends)) {
    const first = trends[0];
    const last = trends[trends.length - 1];
    const change = last.density - first.density;
    const changeColor = change > 0 ? pc.green : change < 0 ? pc.red : pc.white;
    const changeSign = change > 0 ? "+" : "";

    console.log(`${skillName}:`);
    console.log(`  First: ${first.density}% (${first.timestamp})`);
    console.log(`  Last: ${last.density}% (${last.timestamp})`);
    console.log(`  Change: ${changeColor(changeSign + change + "%")}`);
    console.log("");
  }
}

async function main() {
  if (process.argv[2] === "validate") {
    await validateHarness(path.resolve(TARGET_DIR, process.argv[3] || "."));
    return;
  }

  if (process.argv[2] === "suggest:refactor") {
    await suggestRefactor(path.resolve(TARGET_DIR, process.argv[3] || "."));
    return;
  }

  if (process.argv[2] === "benchmark:density") {
    await benchmarkDensity(path.resolve(TARGET_DIR, process.argv[3] || "."));
    return;
  }

  if (process.argv[2] === "density:snapshot") {
    await densitySnapshot(path.resolve(TARGET_DIR, process.argv[3] || "."));
    return;
  }

  if (process.argv[2] === "density:trends") {
    await densityTrends(path.resolve(TARGET_DIR, process.argv[3] || "."));
    return;
  }

  const tmpDir = await fs.mkdtemp(
    path.join(os.tmpdir(), "code-ia-sota-")
  );

  try {
    console.log(
      pc.bold(pc.green("Code IA Sota"))
    );

    await cloneTemplate(tmpDir);

    console.log(
      pc.cyan("Installing files...")
    );

    await copyFiles(tmpDir);

    console.log(
      pc.green("Installation completed.")
    );

    console.log("");
    console.log("Created:");
    console.log("  AGENTS.md");
    console.log("  .agents/");
  } finally {
    await fsExtra.remove(tmpDir);
  }
}

main().catch((error) => {
  console.error(
    pc.red("Installation failed.")
  );

  console.error(error.message);

  process.exit(1);
});
