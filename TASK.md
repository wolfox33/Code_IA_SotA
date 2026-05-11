# TASK — Stage 20: Automated Bulk Refactoring with CI

## Goal

Add automated bulk refactoring with CI to automatically apply refactoring suggestions to low-density skills.

## Execution Rule

Work in stages. PR creation for review required; no automated merging without review.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 17 is committed
- [x] Confirm working tree is clean before Stage 20
- [x] Update `PRD.md` for Stage 20
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add GitHub Actions workflow step for automated refactoring
- [x] Implement automated refactoring logic
- [x] Add PR creation logic
- [x] Configure workflow schedule (weekly)
- [x] Test workflow with manual trigger

## 3. Validation

- [x] Confirm workflow applies automated refactoring
- [x] Confirm PR created with refactoring changes
- [x] Test manual trigger
- [x] Verify PR description includes density improvements

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 20 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 20 is done only when:

- [x] GitHub Actions workflow applies automated refactoring
- [x] PR created with refactoring changes
- [x] PR description includes density improvements
- [x] Workflow runs on schedule or manual trigger
- [x] Documentation is updated
- [x] future stages remain deferred
