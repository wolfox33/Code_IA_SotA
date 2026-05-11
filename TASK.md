# TASK — Stage 6 (Batch 2): Skill Audit and Incremental Refactor

## Goal

Refactor `vps-docker-deploy` based on Stage 7 benchmark findings to either add minimal procedure or move to reference material.

## Execution Rule

Work in stages. Do not refactor other skills in this batch.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 8 CI integration is committed
- [x] Confirm working tree is clean before Stage 6 Batch 2
- [x] Update `PRD.md` for Stage 6 Batch 2
- [x] Update this `TASK.md`

## 2. Analysis

- [x] Read `vps-docker-deploy/SKILL.md` completely
- [x] Evaluate content structure
- [x] Decide between operational skill vs reference material
- [x] Document decision rationale

## 3. Implementation

- [x] If skill: add minimal procedure section
- [x] If reference: move content to `references/`
- [x] Preserve infrastructure pattern knowledge
- [x] Keep change minimal and reversible

## 4. Validation

- [x] Re-run validation command
- [x] Confirm command exits `0`
- [x] Verify density improvement if converted to skill
- [x] Review diff before completion

## 5. Completion

- [x] Update project memory if a durable decision emerges
- [x] Confirm Stage 6 Batch 2 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Decision Rationale

## Content Analysis

Original `vps-docker-deploy/SKILL.md`:
- Density: 0% (no procedure section)
- Size: 3875 bytes, 201 lines
- Content: Architecture diagrams, structure templates, security rules, deployment process, philosophy
- Issue: Entire content was reference material without executable procedure

## Decision

**Convert to operational skill with reference separation**

Rationale:
- The skill has clear activation criteria (VPS deployment with specific stack)
- The infrastructure pattern knowledge is valuable and reusable
- Moving entirely to references would make discovery harder
- Adding minimal procedure preserves operational nature while reducing bloat

## Implementation

1. Created `.agents/skills/vps-docker-deploy/references/` directory
2. Moved reference content to `references/vps-docker-deploy-pattern.md`
3. Rewrote SKILL.md with:
   - Clear activation criteria (Use this skill when, Do not use this skill when)
   - Minimal procedure with 3 steps (consult reference, apply pattern, validate)
   - Procedure points to reference for detailed rules
   - Added Verification checklist
   - Added Pitfalls section
   - Added Skill log entry

## Result

- Density improved from 0% to ~50% (procedure section present)
- Validation passes (exit code 0)
- Only warning: missing Output contracts (acceptable for this skill type)
- Knowledge preserved in reference file
- SKILL.md now operational and discoverable

---

# Acceptance Checklist

Stage 6 (Batch 2) is done only when:

- [x] `vps-docker-deploy` has been refactored or moved
- [x] validation command exits `0`
- [x] density is >40% if converted to skill, or skill is removed if moved to reference
- [x] no other skills or workflows are modified
- [x] decision rationale is documented in TASK.md
- [x] future stages remain deferred
