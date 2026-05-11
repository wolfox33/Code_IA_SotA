# TASK — Stage 16: Automated Alerts Based on Trends

## Goal

Add automated alerts based on density trends to notify when density degrades significantly.

## Execution Rule

Work in stages. Alerts should be informational, not blocking.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 15 is committed
- [x] Confirm working tree is clean before Stage 16
- [x] Update `PRD.md` for Stage 16
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `density:alerts`
- [x] Implement trend analysis logic
- [x] Define alert thresholds
- [x] Generate alert report
- [x] Test with historical data

## 3. Validation

- [x] Confirm command analyzes density trends
- [x] Confirm alerts generated when density degrades
- [x] Test with normal density (no alerts)
- [x] Verify alert format is clear and actionable

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 16 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 16 is done only when:

- [x] CLI command `density:alerts` exists
- [x] Command analyzes density trends
- [x] Alerts generated when density degrades beyond thresholds
- [x] Alert format is clear and actionable
- [x] Documentation is updated
- [x] future stages remain deferred
