# TASK — Stage 6 (Batch 3): Skill Audit and Incremental Refactor

## Goal

Refactor `harness-repair` and `skill-reviewer` based on Stage 7 benchmark findings to simplify output contracts and improve density.

## Execution Rule

Work in stages. Do not refactor other skills in this batch.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 6 (Batch 2) is committed
- [x] Confirm working tree is clean before Stage 6 Batch 3
- [x] Update `PRD.md` for Stage 6 Batch 3
- [x] Update this `TASK.md`

## 2. Analysis

- [x] Read `harness-repair/SKILL.md` completely
- [x] Read `skill-reviewer/SKILL.md` completely
- [x] Evaluate output contracts sections
- [x] Decide simplification opportunities
- [x] Document decision rationale

## 3. Implementation

- [x] Simplify output contracts in harness-repair
- [x] Simplify output contracts in skill-reviewer
- [x] Move verbose examples to references if applicable
- [x] Preserve essential contract structure
- [x] Keep changes minimal and reversible

## 4. Validation

- [x] Re-run validation command
- [x] Confirm command exits `0`
- [x] Verify density improvement
- [x] Review diff before completion

## 5. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 6 Batch 3 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Decision Rationale

## Output Contracts Analysis

**harness-repair (lines 68-104)**
- 4 contract types: Harness repair report, Boundary diagnosis, Migration plan, Priority fix list
- Each contract has 4-5 concise criteria bullets
- No verbose examples or redundant descriptions
- Structure is repetitive but necessary for diagnostic clarity

**skill-reviewer (lines 65-102)**
- 4 contract types: Single skill review, Multi-skill comparison, Improvement plan, Readiness check
- Each contract has 4-6 concise criteria bullets
- No verbose examples or redundant descriptions
- Structure is similar to harness-repair

## Decision

**No refactor needed**

Rationale:
- Output contracts are already concise (no verbose examples to move)
- Contracts are essential for the diagnostic role of these skills
- Simplifying bullets would reduce clarity without significant density gain
- Moderate density (44.9% and 41.9%) is justified for structural skills
- Moving to references would not help since contracts are frequently consulted

## Result

- No changes made to harness-repair or skill-reviewer
- Validation passes (exit code 0)
- Density remains moderate but justified by diagnostic role
- Output contracts preserved for clarity

---

# Acceptance Checklist

Stage 6 (Batch 3) is done only when:

- [x] `harness-repair` and `skill-reviewer` have been evaluated
- [x] validation command exits `0`
- [x] decision rationale is documented in TASK.md
- [x] no changes made when contracts are already concise and essential
- [x] no other skills or workflows are modified
- [x] future stages remain deferred
