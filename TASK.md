# TASK — Stage 9: Automated Bloat Detection Rules

## Goal

Add automated bloat detection to CLI validation to warn about low-density skills.

## Execution Rule

Work in stages. Do not change existing validation behavior beyond adding density warnings.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 8 is committed
- [x] Confirm working tree is clean before Stage 9
- [x] Update `PRD.md` for Stage 9
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Read CLI validation code
- [x] Add density calculation function
- [x] Add density threshold check with environment variable
- [x] Add warning output for low-density skills
- [x] Test validation with low-density skill

## 3. Validation

- [x] Re-run validation command
- [x] Confirm command exits `0` (warnings allowed)
- [x] Confirm low-density skills trigger warnings
- [x] Confirm high-density skills do not trigger warnings

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 9 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 9 is done only when:

- [x] CLI validation calculates density for each skill
- [x] Skills with <30% density trigger warnings
- [x] Validation still exits `0` with warnings
- [x] Density threshold is configurable via environment variable
- [x] Documentation is updated
- [x] future stages remain deferred
