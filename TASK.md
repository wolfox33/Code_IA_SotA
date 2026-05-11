# TASK — Stage 6: Skill Audit and Incremental Refactor

## Goal

Audit existing skill validation warnings and refactor a small first batch of skills toward the canonical operational standard.

## Execution Rule

Work in stages. Do not refactor every skill in one batch unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 5 validation command is committed
- [x] Confirm working tree is clean before Stage 6
- [x] Update `PRD.md` for Stage 6
- [x] Update this `TASK.md`

## 2. Baseline Audit

- [x] Run validation command
- [x] Review warnings by skill
- [x] Identify high-warning skills
- [x] Select first small batch with rationale

## 3. Refactor First Batch

- [x] Read selected skills before editing
- [x] Preserve each skill's intended scope
- [x] Add missing objective/non-use/output/procedure/verification sections
- [x] Add skill log entries only for changed skills
- [x] Avoid unrelated workflow, subagent or `AGENTS.md` changes

## 4. Validation

- [x] Re-run validation command
- [x] Confirm command exits `0`
- [x] Confirm selected skills no longer emit avoidable warnings
- [x] Review diff before completion
- [x] Update project memory if a durable decision emerges

## 5. Completion

- [x] Summarize selected batch and remaining warnings
- [x] Confirm Stage 6 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 6 is done only when:

- [x] baseline validation output has been reviewed
- [x] first batch is selected with rationale
- [x] selected skills are refactored in place
- [x] validation command exits `0`
- [x] selected skills no longer emit avoidable operational-section warnings
- [x] remaining warnings are documented as future batches
- [x] no unrelated workflows, subagents or global policy files are changed
- [x] future stages remain deferred
