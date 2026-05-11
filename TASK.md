# TASK — Stage 12: Bulk Density Benchmarking and Reporting

## Goal

Add bulk density benchmarking and reporting to track density across all skills.

## Execution Rule

Work in stages. Do not store historical data; generate snapshot reports only.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 11 is committed
- [x] Confirm working tree is clean before Stage 12
- [x] Update `PRD.md` for Stage 12
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `benchmark:density`
- [x] Implement density calculation for all skills
- [x] Generate human-readable report
- [x] Add JSON output flag
- [x] Calculate statistics (average, min, max)
- [x] Test with all skills

## 3. Validation

- [x] Confirm command generates density report for all skills
- [x] Confirm JSON output flag works correctly
- [x] Confirm statistics are accurate
- [x] Test sorting (ascending/descending)

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 12 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 12 is done only when:

- [x] CLI command `benchmark:density` exists
- [x] Command generates density report for all skills
- [x] JSON output flag works correctly
- [x] Statistics are accurate
- [x] Documentation is updated
- [x] future stages remain deferred
