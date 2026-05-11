# PRD — Stage 6: Skill Audit and Incremental Refactor

## Project

Evolution of the `Code_IA_SotA` harness through a focused sixth stage: audit existing skills and refactor them incrementally toward the canonical operational standard.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`) and Stage 5 (`harness validation command`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage changes harness documentation artifacts, not runtime application behavior. The validation command from Stage 5 provides deterministic feedback, and the work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement
- compatibility contracts for external platforms

---

# 2. Vision

Move existing skills from mixed maturity levels toward a consistent, parse-safe and operational standard without rewriting the whole harness in one pass.

Stage 6 should reduce validation warnings and improve routing clarity while preserving each skill's scope.

---

# 3. Problem Statement

The Stage 5 validator shows that many existing skills have valid metadata but incomplete operational sections.

Current gaps:

- some skills lack explicit objectives
- some skills lack non-use boundaries
- some skills lack output contracts
- some skills lack procedure or verification sections
- refactoring all skills at once would create high review risk

Without a staged refactor, the harness may retain:

- inconsistent activation behavior
- ambiguous boundaries between skills
- uneven quality standards
- warning noise in validation output

---

# 4. Objective

Audit existing skill warnings and refactor a small first batch of skills to the canonical standard.

The goal is not to complete every skill in one commit. The goal is to establish a safe repeatable process for skill refactoring batches.

---

# 5. Scope

## In Scope

- Run the Stage 5 validation command to capture baseline warnings
- Select a small first batch of skills for refactor
- Refactor selected skills in place
- Add missing operational sections where needed
- Preserve skill intent and routing boundaries
- Re-run validation after the batch
- Record remaining warnings as future work

## Out of Scope

- Refactoring every skill in one batch
- Refactoring workflows
- Refactoring subagents
- Changing global `AGENTS.md` policy
- Changing validation script rules unless a clear false positive is found
- Creating platform compatibility mirrors
- CI integration

---

# 6. Selection Criteria

Choose the first batch using these criteria:

- high warning count
- high likelihood of reuse
- clear scope and low ambiguity
- no need for external domain research
- low risk of changing behavior or routing unexpectedly

Avoid skills whose correct boundary requires major product or architecture decisions.

---

# 7. Required Refactor Standard

Each selected skill should include:

- valid frontmatter with `name` and actionable `description`
- clear objective
- `Use this skill when`
- `Do not use this skill when`
- output contracts when applicable
- procedure or process steps
- pitfalls or anti-patterns when useful
- verification checklist
- concise skill log entry when changed

---

# 8. Validation Requirements

Stage 6 must validate:

- selected skills still parse
- validation command exits `0`
- warning count for selected skills is reduced or intentionally justified
- no unrelated skills or workflows are changed
- remaining warnings are treated as backlog, not hidden

---

# 9. Acceptance Criteria

Stage 6 is complete when:

- baseline validation output has been reviewed
- first batch of skills has been selected with rationale
- selected skills are refactored in place
- validation command exits `0`
- selected skills no longer emit avoidable operational-section warnings
- remaining warnings are documented as future batches
- no unrelated workflows, subagents or global policy files are changed

---

# 10. Risks

## R1 — Bulk Rewrite Risk

Risk: refactoring too many skills at once makes review difficult.

Mitigation: keep the first batch small.

## R2 — Scope Drift

Risk: improving skill content turns into changing global policy or workflows.

Mitigation: refactor only selected skill files unless explicitly needed.

## R3 — Boundary Regression

Risk: adding sections expands a skill beyond its intended responsibility.

Mitigation: preserve original scope and add explicit non-use cases.

## R4 — Warning Gaming

Risk: editing just to silence the validator without improving operational quality.

Mitigation: make sections meaningful and reviewable.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Run validation and capture warning baseline
2. Select first batch using criteria
3. Read selected skills before editing
4. Refactor selected skills surgically
5. Re-run validation and review diff
6. Record remaining warnings and next batch recommendation

---

# 12. Future Roadmap

Future stages may include:

- additional skill refactor batches
- Stage 7: benchmark context efficiency
- Stage 8: CI integration for harness validation

Each future stage should receive its own PRD update or separate task plan before implementation.
