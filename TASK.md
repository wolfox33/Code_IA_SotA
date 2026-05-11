# TASK — Stage 5: Harness Validation Scripts

## Goal

Create deterministic validation tooling for the `.agents/` harness without adding auto-fix behavior or semantic review.

## Execution Rule

Work in stages. Do not implement future roadmap items unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 4 `harness-maintenance` is committed
- [x] Confirm working tree is clean before Stage 5
- [x] Update `PRD.md` for Stage 5
- [x] Update this `TASK.md`

## 2. Tooling Discovery

- [x] Inspect existing CLI/tooling structure
- [x] Identify package manager and runnable commands
- [x] Decide whether to extend existing CLI or create a minimal script
- [x] Confirm no competing tooling path is needed

## 3. Implement Validation

- [x] Add validation command or script
- [x] Validate skill frontmatter presence
- [x] Validate skill `name` and `description`
- [x] Detect placeholder skill descriptions
- [x] Validate operational skill sections as warnings
- [x] Validate workflow frontmatter and `description`
- [x] Print clear failure messages
- [x] Exit non-zero on failure

## 4. Documentation

- [x] Document how to run validation
- [x] Keep documentation close to existing tooling
- [x] Confirm no CI integration was added
- [x] Confirm no auto-fix behavior was added

## 5. Validation

- [x] Run validation command
- [x] Review output
- [x] Review diff before completion
- [x] Update project memory if a durable decision emerges

## 6. Completion

- [x] Summarize changes
- [x] Confirm Stage 5 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 5 is done only when:

- [x] repository tooling structure has been inspected
- [x] a validation command exists
- [x] skills under `.agents/skills/` are validated structurally
- [x] workflows under `.agents/workflows/` are validated structurally
- [x] failures include file path and reason
- [x] validation exits non-zero on failure
- [x] run instructions are documented
- [x] no auto-fix behavior exists
- [x] no CI integration was added
- [x] future stages remain deferred
