# TASK — Stage 15: CI Integration of Density Tracking

## Goal

Add CI integration of density tracking to automatically create density snapshots on each push/PR.

## Execution Rule

Work in stages. Non-blocking; density snapshot should not fail CI.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 14 is committed
- [x] Confirm working tree is clean before Stage 15
- [x] Update `PRD.md` for Stage 15
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add `density:snapshot` step to GitHub Actions workflow
- [x] Configure git user for automated commits
- [x] Commit density history file to repository
- [x] Test workflow with push/PR

## 3. Validation

- [x] Confirm workflow runs density snapshot on push/PR
- [x] Verify automated commits are identifiable
- [x] Confirm existing validation behavior is preserved
- [x] Test commit conflicts scenario

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 15 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 15 is done only when:

- [x] GitHub Actions workflow runs density snapshot on push/PR
- [x] Density history file is committed to repository
- [x] Automated commits are clearly identifiable
- [x] Existing validation behavior is preserved
- [x] Documentation is updated
- [x] future stages remain deferred
