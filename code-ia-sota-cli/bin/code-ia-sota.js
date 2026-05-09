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

async function main() {
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
