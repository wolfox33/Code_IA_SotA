# TASK — Stage 10: CI Enforcement of Density Thresholds

## Goal

Add CI enforcement of density thresholds to GitHub Actions workflow to fail when skills have density below threshold.

## Execution Rule

Work in stages. Do not break existing local validation behavior (warnings only).

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 9 is committed
- [x] Confirm working tree is clean before Stage 10
- [x] Update `PRD.md` for Stage 10
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add flag to CLI validation to fail on warnings
- [x] Modify GitHub Actions workflow to use flag
- [x] Add HARNESS_DENSITY_THRESHOLD environment variable to workflow
- [x] Test workflow with low-density skill

## 3. Validation

- [x] Confirm workflow fails on density warnings when FAIL_ON_WARNINGS=true
- [x] Confirm local validation still exits 0 with warnings when FAIL_ON_WARNINGS=false
- [x] Confirm threshold is configurable in workflow
- [x] Test with high-density skill passes CI

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 10 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 10 is done only when:

- [x] GitHub Actions workflow has HARNESS_FAIL_ON_WARNINGS flag (set to false for weak enforcement)
- [x] HARNESS_DENSITY_THRESHOLD is configurable in workflow
- [x] Local validation still exits 0 with warnings
- [x] Workflow documentation is updated
- [x] Test confirms FAIL_ON_WARNINGS=true fails, FAIL_ON_WARNINGS=false passes
- [x] future stages remain deferred
