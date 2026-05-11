# PRD — Stage 6 (Batch 3): Skill Audit and Incremental Refactor

## Project

Evolution of the `Code_IA_SotA` harness through a focused sixth stage (batch 3): refactor `harness-repair` and `skill-reviewer` based on Stage 7 benchmark findings.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (Batch 1: `skill audit and incremental refactor`), Stage 6 (Batch 2: `vps-docker-deploy refactor`), Stage 7 (`benchmark context efficiency`) and Stage 8 (`CI integration for harness validation`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage refactors two structural skills based on benchmark data. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of density thresholds
- compatibility contracts for external platforms

---

# 2. Vision

Refactor `harness-repair` and `skill-reviewer` to reduce bloat from detailed output contracts while preserving their diagnostic utility.

Stage 6 (Batch 3) should improve density of structural skills without losing clarity for their diagnostic role.

---

# 3. Problem Statement

The Stage 7 benchmark identified `harness-repair` and `skill-reviewer` as secondary bloat candidates:

**harness-repair**
- Density: 44.9%
- Size: 8201 bytes, 234 lines
- Issue: Output contracts section is long (lines 68-105)

**skill-reviewer**
- Density: 41.9%
- Size: 7793 bytes, 217 lines
- Issue: Output contracts section (lines 65-103) contributes to bloat

Current state:

- Both skills are structural/diagnostic with detailed output contract templates
- Output contracts provide clarity but increase line count
- Density is moderate but could be improved

Without refactoring, these skills continue to:

- Consume more context than needed for their diagnostic role
- Have lower density than optimal for structural skills
- Include verbose templates that could be simplified

---

# 4. Objective

Refactor `harness-repair` and `skill-reviewer` to:

- Simplify output contract templates where possible
- Move verbose examples to references if rarely needed
- Preserve diagnostic clarity and contract specificity
- Improve density toward 50%+ target

The goal is not to remove output contracts. The goal is to make them concise while preserving utility.

---

# 5. Scope

## In Scope

- Read `harness-repair/SKILL.md` and `skill-reviewer/SKILL.md` completely
- Evaluate output contracts sections for simplification opportunities
- Simplify templates or move examples to references
- Preserve essential contract structure
- Re-run validation to confirm improvement
- Update TASK.md with decision rationale

## Out of Scope

- Refactoring other skills from the benchmark
- Changing validation command rules
- Modifying workflows or subagents
- Removing output contracts entirely

---

# 6. Decision Criteria

Simplify output contracts when:

- Templates are verbose with redundant examples
- Multiple contract types share similar structure
- Examples can be moved to references without losing clarity

Keep detailed contracts when:

- Contracts provide essential diagnostic specificity
- Templates are already concise
- Examples are needed for contract understanding
- Skill is frequently used and clarity is critical

---

# 7. Required Refactor Standard

For each skill:

- Preserve all output contract types (report, diagnosis, plan, etc.)
- Simplify template descriptions where verbose
- Consider moving example formats to references
- Maintain frontmatter and other sections unchanged
- Aim for 50%+ procedure density

---

# 8. Design Constraints

- Preserve diagnostic utility of both skills.
- Do not remove contract types entirely.
- Keep changes minimal and reversible.
- Do not expand scope to other benchmark candidates.

---

# 9. Acceptance Criteria

Stage 6 (Batch 3) is complete when:

- `harness-repair` and `skill-reviewer` have been refactored
- Validation command exits `0`
- Density is improved toward 50%+ target
- No other skills or workflows are modified
- Decision rationale is documented in TASK.md

---

# 10. Risks

## R1 — Loss of Clarity

Risk: Simplifying contracts reduces diagnostic specificity.

Mitigation: Keep essential contract structure; simplify only verbose descriptions.

## R2 — Overrefactoring

Risk: Moving examples to references makes contracts harder to understand.

Mitigation: Keep examples in SKILL.md if they are critical for contract understanding.

## R3 — Scope Creep

Risk: Extending refactor to other benchmark candidates.

Mitigation: This batch is scoped only to `harness-repair` and `skill-reviewer`.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Read `harness-repair/SKILL.md` and `skill-reviewer/SKILL.md` completely
2. Evaluate output contracts sections for simplification opportunities
3. Decide which templates to simplify or move to references
4. Implement refactor for each skill
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
