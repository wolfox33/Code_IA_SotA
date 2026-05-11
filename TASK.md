# TASK — Stage 8: CI Integration for Harness Validation

## Goal

Integrate the existing harness validation command into GitHub Actions CI to catch structural regressions automatically while allowing warnings for maturity gaps.

## Execution Rule

Work in stages. Do not change validation command rules or refactor skills for CI compliance in this stage.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 7 benchmark is committed
- [x] Confirm working tree is clean before Stage 8
- [x] Update `PRD.md` for Stage 8
- [x] Update this `TASK.md`

## 2. CI Configuration

- [x] Create `.github/workflows/validate-harness.yml`
- [x] Configure Node.js environment
- [x] Configure triggers (pull_request to main, push to main)
- [x] Add step to run `npm run validate:harness`
- [x] Configure workflow to fail on validation failures

## 3. Testing

- [x] Verify workflow syntax
- [x] Confirm workflow calls correct npm script
- [x] Confirm workflow path points to repository root
- [x] Test workflow locally if possible

## 4. Documentation

- [x] Document CI behavior in README
- [x] Document how to bypass CI if needed
- [x] Avoid modifying skills or workflows
- [x] Update project memory if a durable decision emerges

## 5. Completion

- [x] Summarize CI configuration
- [x] Confirm Stage 8 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 8 is done only when:

- [x] GitHub Actions workflow exists
- [x] workflow triggers on pull_request to main
- [x] workflow triggers on push to main
- [x] workflow calls `npm run validate:harness`
- [x] workflow fails when validation fails
- [x] workflow passes when validation succeeds (even with warnings)
- [x] CI behavior is documented in README
- [x] no skills or workflows are modified for CI compliance
- [x] no subagents or global policy files are changed
- [x] future stages remain deferred
