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

async function main() {
  if (process.argv[2] === "validate") {
    await validateHarness(path.resolve(TARGET_DIR, process.argv[3] || "."));
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
