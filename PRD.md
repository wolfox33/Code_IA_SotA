# PRD — Stage 6 (Batch 2): Skill Audit and Incremental Refactor

## Project

Evolution of the `Code_IA_SotA` harness through a focused sixth stage (batch 2): refactor `vps-docker-deploy` based on Stage 7 benchmark findings.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (Batch 1: `skill audit and incremental refactor`), Stage 7 (`benchmark context efficiency`) and Stage 8 (`CI integration for harness validation`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage refactors a single skill based on benchmark data. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of density thresholds
- compatibility contracts for external platforms

---

# 2. Vision

Refactor `vps-docker-deploy` from a reference-heavy artifact (0% procedure density) to either an operational skill with minimal procedure or a reference document in `references/`.

Stage 6 (Batch 2) should reduce context bloat while preserving the infrastructure pattern knowledge.

---

# 3. Problem Statement

The Stage 7 benchmark identified `vps-docker-deploy` as the primary bloat candidate:

- Density: 0% (no procedure section)
- Size: 3875 bytes, 201 lines
- Issue: Entire content is structured as reference material without operational procedure

Current state:

- `vps-docker-deploy` functions as documentation rather than operational skill
- Content includes architecture diagrams, structure templates, security rules, deployment process
- No executable procedure for agents to follow

Without refactoring, this skill continues to:

- Consume context without providing operational guidance
- Blur the boundary between skill and reference material
- Increase harness bloat without corresponding utility

---

# 4. Objective

Refactor `vps-docker-deploy` to either:

- Add a minimal procedure section to make it an operational skill, or
- Move the content to `references/` as infrastructure pattern documentation

The goal is not to lose the knowledge. The goal is to place it in the correct artifact type.

---

# 5. Scope

## In Scope

- Read `vps-docker-deploy/SKILL.md` completely
- Decide between operational skill vs reference material
- If skill: add minimal procedure section with executable steps
- If reference: create `references/` directory and move content
- Re-run validation to confirm improvement
- Update TASK.md with decision rationale

## Out of Scope

- Refactoring other skills from the benchmark
- Changing validation command rules
- Modifying workflows or subagents
- Creating platform compatibility mirrors

---

# 6. Decision Criteria

Choose **operational skill** when:

- The skill is frequently invoked for VPS deployment tasks
- Agents need step-by-step guidance for Docker Compose setup
- The content has clear activation criteria

Choose **reference material** when:

- The content is primarily documentation or templates
- The skill is rarely invoked or acts as lookup material
- Moving to `references/` preserves knowledge without bloat

---

# 7. Required Refactor Standard

If converted to operational skill:

- Add `## Procedure` section with executable steps
- Add `## Use this skill when` with concrete situations
- Add `## Do not use this skill when` to avoid over-triggering
- Keep reference-heavy sections if they support the procedure
- Aim for >40% procedure density

If moved to reference:

- Create `.agents/skills/vps-docker-deploy/references/` directory
- Move content to `references/vps-docker-deploy-pattern.md`
- Keep minimal `SKILL.md` with activation criteria pointing to reference
- Or remove the skill entirely if not operational

---

# 8. Design Constraints

- Preserve the infrastructure pattern knowledge.
- Do not delete useful content without replacement.
- Keep the change minimal and reversible.
- Do not expand scope to other benchmark candidates.

---

# 9. Acceptance Criteria

Stage 6 (Batch 2) is complete when:

- `vps-docker-deploy` has been refactored or moved
- Validation command exits `0`
- Density is >40% if converted to skill, or skill is removed if moved to reference
- No other skills or workflows are modified
- Decision rationale is documented in TASK.md

---

# 10. Risks

## R1 — Knowledge Loss

Risk: Moving to reference might make the knowledge harder to discover.

Mitigation: Keep clear activation criteria in minimal SKILL.md pointing to reference.

## R2 — Overrefactoring

Risk: Adding procedure where none is needed creates fake operational skill.

Mitigation: If the content is truly reference material, move it rather than force a procedure.

## R3 — Scope Creep

Risk: Extending refactor to other benchmark candidates.

Mitigation: This batch is scoped only to `vps-docker-deploy`.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Read `vps-docker-deploy/SKILL.md` completely
2. Evaluate content structure and usage pattern
3. Decide between skill vs reference
4. Implement refactor (add procedure or move to references)
5. Re-run validation and verify density improvement
6. Document decision rationale in TASK.md
7. Update project memory if a durable decision emerges

---

# 12. Future Roadmap

Future stages may include:

- additional skill refactor batches based on Stage 7 benchmark
- Stage 9: automated bloat detection rules
- Stage 10: CI enforcement of density thresholds

Each future stage should receive its own PRD update or separate task plan before implementation.
