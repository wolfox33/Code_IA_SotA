# TASK — Stage 6 (Batch 5): Skill Audit and Incremental Refactor

## Goal

Add missing operational sections to `ai-sdk-ui-chat`, `deployment-best-practices` and `performance-optimization-chat` to reduce validation warnings.

## Execution Rule

Work in stages. Do not refactor other skills in this batch.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 6 (Batch 4) is committed
- [x] Confirm working tree is clean before Stage 6 Batch 5
- [x] Update `PRD.md` for Stage 6 Batch 5
- [x] Update this `TASK.md`

## 2. Implementation

- [x] Read `ai-sdk-ui-chat/SKILL.md` completely
- [x] Read `deployment-best-practices/SKILL.md` completely
- [x] Read `performance-optimization-chat/SKILL.md` completely
- [x] Add missing Objetivo section (without emojis)
- [x] Add missing Use/Do not use sections
- [x] Add missing Output contracts
- [x] Add missing Procedure section
- [x] Add missing Verification section
- [x] Add skill log entries

## 3. Validation

- [x] Re-run validation command
- [x] Confirm command exits `0`
- [x] Confirm target skills no longer emit avoidable warnings
- [x] Review diff before completion

## 4. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 6 Batch 5 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 6 (Batch 5) is done only when:

- [x] `ai-sdk-ui-chat`, `deployment-best-practices` and `performance-optimization-chat` have been refactored
- [x] validation command exits `0`
- [x] target skills no longer emit avoidable operational-section warnings
- [x] no other skills or workflows are modified
- [x] skill log entries are added
- [x] future stages remain deferred
