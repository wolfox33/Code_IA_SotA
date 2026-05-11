# PRD — Stage 14: Automated Refactoring with User Approval

## Project

Evolution of the `Code_IA_SotA` harness through Stage 14: add automated refactoring with user approval to streamline the refactoring process while maintaining control.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`), Stage 11 (`automated refactoring suggestions`), Stage 12 (`bulk density benchmarking and reporting`) and Stage 13 (`density trends over time`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds automated refactoring with user approval. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of refactoring
- compatibility contracts for external platforms

---

# 2. Vision

Add automated refactoring with user approval to streamline the refactoring process while maintaining control, reducing manual effort while ensuring quality.

Stage 14 should add a CLI command that performs automated refactoring with user approval for each change.

---

# 3. Problem Statement

Stage 11 provides refactoring suggestions, but requires manual implementation of each suggestion, which is time-consuming and error-prone.

Without automated refactoring:
- Manual implementation is slow and error-prone
- Risk of inconsistent refactoring across skills
- Difficult to ensure all suggestions are applied correctly
- High effort for repetitive tasks

---

# 4. Objective

Add automated refactoring with user approval to streamline the refactoring process while maintaining control.

The goal is to provide a CLI command that performs automated refactoring with user approval for each change.

---

# 5. Scope

## In Scope

- Add CLI command `refactor:auto` to perform automated refactoring
- Implement user approval for each change (interactive)
- Move reference content to `references/` automatically
- Expand Procedure section with executable steps
- Generate preview before applying changes
- Support dry-run mode

## Out of Scope

- Automated refactoring without user approval
- Complex refactoring beyond moving content
- CI integration of automated refactoring
- Bulk refactoring without review

---

# 6. Required Implementation Standard

- CLI command: `npm run refactor:auto`
- Interactive approval: prompt user for each change
- Dry-run mode: `npm run refactor:auto -- --dry-run`
- Preview changes before applying
- Create `references/` directory if needed
- Preserve original content in comments

---

# 7. Design Constraints

- User approval required for each change
- Dry-run mode for preview
- Preserve original content
- No automated changes without review

---

# 8. Acceptance Criteria

Stage 14 is complete when:

- CLI command `refactor:auto` exists
- Command performs automated refactoring with user approval
- Dry-run mode works correctly
- Changes are previewed before applying
- Documentation is updated

---

# 9. Risks

## R1 — Incorrect Refactoring

Risk: Automated refactoring may make incorrect changes.

Mitigation: User approval required for each change; dry-run mode for preview.

## R2 — Data Loss

Risk: Original content may be lost during refactoring.

Mitigation: Preserve original content in comments; dry-run mode for preview.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `refactor:auto`
2. Implement content detection (reference vs executable)
3. Implement refactoring logic (move to references/, expand procedure)
4. Add interactive approval prompts
5. Add dry-run mode
6. Test with known low-density skills
7. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 15: CI integration of density tracking
- Stage 16: Automated alerts based on trends
- Stage 17: Bulk refactoring with batch approval

Each future stage should receive its own PRD update or separate task plan before implementation.
