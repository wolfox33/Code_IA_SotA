# TASK — Stage 13: Density Trends Over Time

## Goal

Add density trends tracking over time to monitor density changes and identify bloat accumulation.

## Execution Rule

Work in stages. Use simple file-based storage; no database or complex automation.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 12 is committed
- [x] Confirm working tree is clean before Stage 13
- [x] Update `PRD.md` for Stage 13
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `density:snapshot`
- [x] Implement JSON file storage at `.agents/data/density-history.json`
- [x] Add CLI command `density:trends`
- [x] Generate trend report showing density changes
- [x] Test snapshot and trend commands

## 3. Validation

- [x] Confirm snapshot stores data correctly
- [x] Confirm trend report shows density changes
- [x] Test with multiple snapshots
- [x] Verify JSON format is correct

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 13 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 13 is done only when:

- [x] CLI command `density:snapshot` exists
- [x] CLI command `density:trends` exists
- [x] Historical data stored in JSON format
- [x] Trend report shows density changes over time
- [x] Documentation is updated
- [x] future stages remain deferred
