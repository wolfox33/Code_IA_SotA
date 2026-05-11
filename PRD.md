# PRD — Stage 9: Automated Bloat Detection Rules

## Project

Evolution of the `Code_IA_SotA` harness through Stage 9: implement automated bloat detection rules to prevent low-density skills.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`) and Stage 8 (`CI integration for harness validation`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds automated bloat detection to the CLI validation command. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of density thresholds
- compatibility contracts for external platforms

---

# 2. Vision

Add automated bloat detection rules to the CLI validation command to warn about low-density skills, preventing future bloat.

Stage 9 should add a density metric and threshold warning to the existing validation command, without blocking validation (warnings only).

---

# 3. Problem Statement

Stage 7 identified `vps-docker-deploy` as having 0% density (content as reference), which was later fixed in Stage 6 Batch 2 by moving reference content to `references/` and adding executable procedure.

Without automated detection, new skills may also become low-density over time, leading to:

- Skills with reference content instead of executable procedures
- High context cost for low value
- Difficulty identifying bloat without manual benchmarking

---

# 4. Objective

Add automated bloat detection to the CLI validation command to warn about low-density skills.

The goal is to provide early warning when a skill has low density, allowing proactive refactoring before bloat becomes widespread.

---

# 5. Scope

## In Scope

- Add density metric calculation to CLI validation
- Define density threshold (e.g., <30% density triggers warning)
- Add warning output for low-density skills
- Update validation command documentation

## Out of Scope

- Changing existing skills (already addressed in Stage 6)
- Blocking validation based on density (warnings only)
- CI enforcement of density thresholds (deferred to Stage 10)
- Automated refactoring of low-density skills

---

# 6. Required Implementation Standard

- Density calculation: (procedure lines / total lines) * 100
- Threshold: <30% density triggers warning
- Warning message: "Low density (<30%): {skill_name} has {density}% density. Consider moving reference content to references/ and adding executable procedure."
- Validation should still exit 0 (warnings only)

---

# 7. Design Constraints

- Preserve existing validation behavior
- Warnings only, no blocking errors
- Density calculation should be simple and fast
- Threshold should be configurable via environment variable

---

# 8. Acceptance Criteria

Stage 9 is complete when:

- CLI validation calculates density for each skill
- Skills with <30% density trigger warnings
- Validation still exits 0 with warnings
- Density threshold is configurable via environment variable
- Documentation is updated

---

# 9. Risks

## R1 — False Positives

Risk: Skills with legitimate low density (e.g., simple placeholder skills) trigger warnings.

Mitigation: Warnings only, not errors; threshold configurable; placeholder skills can be documented as exceptions.

## R2 — Performance Impact

Risk: Density calculation slows down validation.

Mitigation: Simple line count calculation; no complex parsing; fast enough for 26 skills.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Read CLI validation code
2. Add density calculation function
3. Add density threshold check
4. Add warning output for low-density skills
5. Make threshold configurable via environment variable
6. Test validation with low-density skill
7. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 10: CI enforcement of density thresholds
- Stage 11: Automated refactoring suggestions for low-density skills
- Stage 12: Bulk density benchmarking and reporting

Each future stage should receive its own PRD update or separate task plan before implementation.
