# TASK — Stage 11: Automated Refactoring Suggestions for Low-Density Skills

## Goal

Add automated refactoring suggestions to CLI to guide manual refactoring of low-density skills.

## Execution Rule

Work in stages. Do not automate refactoring; provide suggestions only, manual review required.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 10 is committed
- [x] Confirm working tree is clean before Stage 11
- [x] Update `PRD.md` for Stage 11
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Add CLI command `suggest:refactor`
- [x] Implement density analysis per skill
- [x] Implement section analysis to identify reference content
- [x] Generate specific refactoring suggestions
- [x] Test with known low-density skills

## 3. Validation

- [x] Confirm command analyzes low-density skills
- [x] Confirm suggestions are actionable and accurate
- [x] Test with high-density skill (no suggestions)
- [x] Test with low-density skill (suggestions generated)

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 11 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 11 is done only when:

- [x] CLI command `suggest:refactor` exists
- [x] Command analyzes low-density skills
- [x] Command generates specific refactoring suggestions
- [x] Suggestions are actionable and accurate
- [x] Documentation is updated
- [x] future stages remain deferred
