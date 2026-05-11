# TASK — Stage 21: Automated PR Merging with Approval

## Goal

Add automated PR merging with approval to automatically merge refactoring PRs after review approval.

## Execution Rule

Work in stages. Approval required before merge; no forced merging with conflicts.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 20 is committed
- [x] Confirm working tree is clean before Stage 21
- [x] Update `PRD.md` for Stage 21
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add GitHub Actions workflow step for automated merging
- [x] Implement approval check
- [x] Implement merge conflict check
- [x] Add merge confirmation message
- [x] Test with approved PR

## 3. Validation

- [x] Confirm workflow merges approved PRs
- [x] Confirm approval required before merge
- [x] Test merge conflict scenario
- [x] Verify merge confirmation message

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 21 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 21 is done only when:

- [x] GitHub Actions workflow merges approved PRs
- [x] Approval required before merge
- [x] Merge conflicts checked before merging
- [x] Merge confirmation message added
- [x] Documentation is updated
- [x] future stages remain deferred
