# TASK — Stage 14: Automated Refactoring with User Approval

## Goal

Add automated refactoring with user approval to streamline the refactoring process while maintaining control.

## Execution Rule

Work in stages. User approval required for each change; no automated changes without review.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 13 is committed
- [x] Confirm working tree is clean before Stage 14
- [x] Update `PRD.md` for Stage 14
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `refactor:auto`
- [x] Implement content detection (reference vs executable)
- [x] Implement refactoring logic (move to references/, expand procedure)
- [x] Add interactive approval prompts
- [x] Add dry-run mode
- [x] Test with known low-density skills

## 3. Validation

- [x] Confirm command performs automated refactoring with approval
- [x] Confirm dry-run mode works correctly
- [x] Test with low-density skill
- [x] Verify changes are correct

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 14 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 14 is done only when:

- [x] CLI command `refactor:auto` exists
- [x] Command performs automated refactoring with user approval
- [x] Dry-run mode works correctly
- [x] Changes are previewed before applying
- [x] Documentation is updated
- [x] future stages remain deferred
