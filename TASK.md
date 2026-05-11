# TASK — Stage 17: Bulk Refactoring with Batch Approval

## Goal

Add bulk refactoring with batch approval to streamline refactoring of multiple low-density skills.

## Execution Rule

Work in stages. Single batch approval required; no automated changes without review.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 16 is committed
- [x] Confirm working tree is clean before Stage 17
- [x] Update `PRD.md` for Stage 17
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `refactor:bulk`
- [x] Implement batch refactoring plan generation
- [x] Add single batch approval
- [x] Add dry-run mode
- [x] Generate summary report
- [x] Test with multiple low-density skills

## 3. Validation

- [x] Confirm command generates batch refactoring plan
- [x] Confirm single batch approval works
- [x] Confirm dry-run mode works correctly
- [x] Verify summary report is clear

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 17 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 17 is done only when:

- [x] CLI command `refactor:bulk` exists
- [x] Command generates batch refactoring plan
- [x] Single batch approval for all skills
- [x] Dry-run mode works correctly
- [x] Summary report is clear
- [x] Documentation is updated
- [x] future stages remain deferred
