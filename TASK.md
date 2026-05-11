# TASK — Stage 4: Harness Maintenance Workflow

## Goal

Create `.agents/workflows/harness-maintenance.md` as the canonical workflow for coordinating safe maintenance of the `.agents/` harness.

## Execution Rule

Work in stages. Do not implement future roadmap items unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 3 `harness-repair` is complete
- [x] Confirm working tree is clean before Stage 4
- [x] Review existing workflow style
- [x] Update `PRD.md` for Stage 4
- [x] Update this `TASK.md`

## 2. Create `harness-maintenance` workflow

- [x] Create `.agents/workflows/harness-maintenance.md`
- [x] Add valid YAML frontmatter
- [x] Add clear `description`
- [x] Define use cases
- [x] Define non-use cases
- [x] Define workflow stages
- [x] Define routing to `skill-creator`, `skill-reviewer` and `harness-repair`
- [x] Define approval-before-mutation rule
- [x] Define validation and memory checkpoints

## 3. Scope Control

- [x] Confirm no validation scripts were created
- [x] Confirm no existing workflows were refactored
- [x] Confirm no platform compatibility work was changed
- [x] Confirm no unrelated skills were modified
- [x] Confirm no full harness audit was performed

## 4. Validation

- [x] Re-read created `harness-maintenance.md`
- [x] Verify workflow is compact and operational
- [x] Verify it routes to skills instead of duplicating them
- [x] Verify acceptance criteria from `PRD.md`
- [x] Review diff before completion

## 5. Completion

- [x] Summarize changes
- [x] Record project memory only if a durable decision or lesson emerges
- [x] Ask user whether to test the workflow with a limited maintenance scenario

---

# Acceptance Checklist

Stage 4 is done only when:

- [x] `.agents/workflows/harness-maintenance.md` exists
- [x] the workflow defines when to use and not use it
- [x] the workflow sequences diagnosis, planning, repair and validation
- [x] the workflow routes to `skill-creator`, `skill-reviewer` and `harness-repair`
- [x] the workflow requires approval before mutation
- [x] memory and deferral checkpoints are present
- [x] no unrelated workflow/platform files are changed
- [x] future stages remain deferred
