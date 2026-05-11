# PRD — Stage 5: Harness Validation Scripts

## Project

Evolution of the `Code_IA_SotA` harness through a focused fifth stage: create deterministic validation scripts for the `.agents/` harness.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`) and Stage 4 (`harness-maintenance`) are complete.

---

# 1. Decision on Specs

Separate specs are required at the PRD/TASK level only for this stage.

This stage introduces executable validation behavior, so the PRD must define a small, stable contract before implementation.

A separate OpenSpec package is not required because:

- the script is local repository tooling
- there is no public API or service contract
- the CLI contract is intentionally minimal
- acceptance criteria can be tracked directly in `TASK.md`

Create separate specs only if later stages add:

- multiple commands with structured output schemas
- CI integration requirements
- auto-fix behavior
- machine-consumed reports

---

# 2. Vision

Make harness validation repeatable and cheap by adding a deterministic script that catches structural issues before manual review.

The script should validate the minimum standards established by prior stages without replacing human diagnosis.

---

# 3. Problem Statement

The harness now has canonical skills and workflows, but validation is manual.

Current gaps:

- frontmatter parse issues can be missed
- required sections can drift silently
- workflow metadata can become inconsistent
- manual review is slower than a deterministic baseline check

Without a validation script, future maintenance may regress into:

- broken discovery metadata
- placeholder skills reappearing unnoticed
- inconsistent workflow frontmatter
- more expensive manual audits

---

# 4. Objective

Create a minimal validation script that checks `.agents/` artifacts for structural readiness.

The goal is not semantic review or automatic repair. The goal is deterministic validation of basic harness invariants.

---

# 5. Scope

## In Scope

- Inspect existing CLI/tooling structure before implementation
- Add or extend a local validation command
- Validate skill `SKILL.md` frontmatter presence and required keys
- Validate workflow frontmatter presence and `description`
- Warn about missing operational skill sections without failing the command
- Provide clear pass/fail output
- Exit non-zero on validation failure
- Document how to run the validation

## Out of Scope

- Auto-fixing files
- Full semantic review
- CI integration
- Platform compatibility mirrors
- Benchmarking context efficiency
- Refactoring skills or workflows as part of script creation
- Validating subagents unless explicitly added later

---

# 6. Target Artifact

Target artifact depends on existing repository tooling discovered during implementation.

Preferred target if compatible with current structure:

```txt
code-ia-sota-cli/
```

Do not create a second competing CLI if the existing CLI can be extended safely.

---

# 7. Required Capabilities

## 7.1 Skill validation

For each `.agents/skills/*/SKILL.md`, validate:

- YAML frontmatter exists
- `name` exists
- `description` exists
- placeholder descriptions are not used
- missing operational sections are reported as warnings

Warned section groups:

- `Objetivo` or objective equivalent
- `Use this skill when` or equivalent
- `Do not use this skill when` or equivalent
- `Output contracts` when the skill is operational
- `Procedure` or process equivalent
- `Verification`

## 7.2 Workflow validation

For each `.agents/workflows/*.md`, validate:

- YAML frontmatter exists
- `description` exists
- body is not empty

## 7.3 Output behavior

The validation command must:

- print checked artifact counts
- print each failure with file path and reason
- print each warning with file path and reason
- exit `0` when valid
- exit non-zero when invalid

---

# 8. Design Constraints

- Keep implementation simple and dependency-light.
- Prefer existing Node/CLI structure if present.
- Do not introduce external dependencies unless necessary.
- Do not validate semantics that require model judgment.
- Do not modify harness artifacts to make tests pass unless separately requested.

---

# 9. Acceptance Criteria

Stage 5 is complete when:

- repository tooling structure has been inspected
- a validation command exists
- command validates skills and workflows under `.agents/`
- command reports clear failures
- command reports non-blocking warnings for maturity gaps
- command exits non-zero on failure
- command exits zero on current valid harness with known maturity warnings
- run instructions are documented
- no auto-fix behavior is introduced

---

# 10. Risks

## R1 — Overvalidation

Risk: script encodes subjective review rules.

Mitigation: validate only deterministic structural rules.

## R2 — Competing Tooling

Risk: creating a new CLI when one already exists.

Mitigation: inspect existing CLI first and extend it when practical.

## R3 — False Positives

Risk: older intentional artifacts fail strict canonical checks.

Mitigation: separate minimum checks from operational skill checks.

## R4 — Scope Creep

Risk: adding CI, auto-fix or semantic audits.

Mitigation: defer those to future stages.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Define Stage 5 validation contract
2. Inspect existing CLI/tooling
3. Implement minimum deterministic validation
4. Run validation and adjust only the script unless harness fixes are explicitly needed
5. Document run command and record durable decisions

---

# 12. Future Roadmap

Future stages may include:

- Stage 6: audit and refactor existing skills
- Stage 7: benchmark context efficiency
- Stage 8: CI integration for harness validation

Each future stage should receive its own PRD update or separate task plan before implementation.
