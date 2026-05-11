# PRD — Stage 22: Density Enforcement with Automated Fixes

## Project

Evolution of the `Code_IA_SotA` harness through Stage 22: add density enforcement with automated fixes to automatically apply density fixes when threshold is violated.

This PRD assumes Stages 1-21 are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds density enforcement with automated fixes. The work can be tracked directly in `TASK.md`.

---

# 2. Vision

Add density enforcement with automated fixes to automatically apply density fixes when threshold is violated, preventing bloat in new skills.

Stage 22 should add a CLI command and CI enforcement that automatically applies density fixes when threshold is violated.

---

# 3. Problem Statement

Stage 10 enforces density thresholds in CI but only fails validation without applying fixes. Manual fixes are required for low-density skills.

Without automated fixes:
- Manual fixes required for low-density skills
- Time-consuming to fix density violations
- Risk of incomplete fixes
- Inconsistent fix quality

---

# 4. Objective

Add density enforcement with automated fixes to automatically apply density fixes when threshold is violated.

The goal is to provide automated density fixes while maintaining quality.

---

# 5. Scope

## In Scope

- Add CLI command `density:fix` for automated density fixes
- Implement automated fix logic (move reference content)
- Apply fixes to low-density skills
- Add CI enforcement with automated fixes
- Configure fix behavior (dry-run vs apply)

## Out of Scope

- Complex refactoring beyond moving content
- Automated fixes without review
- Forced fixes in CI
- Breaking changes to existing skills

---

# 6. Required Implementation Standard

- CLI command: `npm run density:fix`
- Automated fix logic based on `suggest:refactor`
- Dry-run mode: `npm run density:fix -- --dry-run`
- CI enforcement with automated fixes optional
- Preserve original content

---

# 7. Design Constraints

- Dry-run mode for preview
- Preserve original content
- No forced fixes in CI
- Manual review recommended

---

# 8. Acceptance Criteria

Stage 22 is complete when:

- CLI command `density:fix` exists
- Command applies automated density fixes
- Dry-run mode works correctly
- CI enforcement with automated fixes optional
- Documentation is updated

---

# 9. Risks

## R1 — Incorrect Automated Fixes

Risk: Automated fixes may make incorrect changes.

Mitigation: Dry-run mode for preview; manual review recommended; use existing refactoring logic.

## R2 — Data Loss

Risk: Original content may be lost during fixes.

Mitigation: Preserve original content; dry-run mode for preview; manual review required.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `density:fix`
2. Implement automated fix logic
3. Apply fixes to low-density skills
4. Add dry-run mode
5. Add CI enforcement option
6. Test with low-density skills
7. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 23: Skill lifecycle management

Each future stage should receive its own PRD update or separate task plan before implementation.
