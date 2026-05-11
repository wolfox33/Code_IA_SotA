# TASK — Stage 22: Density Enforcement with Automated Fixes

## Goal

Add density enforcement with automated fixes to automatically apply density fixes when threshold is violated.

## Execution Rule

Work in stages. Dry-run mode for preview; manual review recommended.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 21 is committed
- [x] Confirm working tree is clean before Stage 22
- [x] Update `PRD.md` for Stage 22
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `density:fix`
- [x] Implement automated fix logic
- [x] Apply fixes to low-density skills
- [x] Add dry-run mode
- [x] Add CI enforcement option
- [x] Test with low-density skills

## 3. Validation

- [x] Confirm command applies automated fixes
- [x] Confirm dry-run mode works correctly
- [x] Test with low-density skill
- [x] Verify fixes improve density

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 22 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 22 is done only when:

- [x] CLI command `density:fix` exists
- [x] Command applies automated density fixes
- [x] Dry-run mode works correctly
- [x] CI enforcement with automated fixes optional
- [x] Documentation is updated
- [x] future stages remain deferred
