# PRD — Stage 17: Bulk Refactoring with Batch Approval

## Project

Evolution of the `Code_IA_SotA` harness through Stage 17: add bulk refactoring with batch approval to streamline refactoring of multiple low-density skills.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`), Stage 11 (`automated refactoring suggestions`), Stage 12 (`bulk density benchmarking and reporting`), Stage 13 (`density trends over time`), Stage 14 (`automated refactoring with user approval`), Stage 15 (`CI integration of density tracking`) and Stage 16 (`automated alerts based on trends`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds bulk refactoring with batch approval. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of batch refactoring
- compatibility contracts for external platforms

---

# 2. Vision

Add bulk refactoring with batch approval to streamline refactoring of multiple low-density skills, reducing manual effort while maintaining control.

Stage 17 should add a CLI command that performs bulk refactoring with single batch approval for multiple skills.

---

# 3. Problem Statement

Stage 14 provides automated refactoring with individual approval, but refactoring 20 low-density skills one-by-one is time-consuming.

Without bulk refactoring:
- Manual refactoring of 20 skills is time-consuming
- Repetitive approval process for each skill
- Difficult to track overall progress
- High effort for systematic refactoring

---

# 4. Objective

Add bulk refactoring with batch approval to streamline refactoring of multiple low-density skills.

The goal is to provide a CLI command that performs bulk refactoring with single batch approval for multiple skills.

---

# 5. Scope

## In Scope

- Add CLI command `refactor:bulk` for batch refactoring
- Generate batch refactoring plan for all low-density skills
- Single batch approval for all skills
- Support dry-run mode
- Generate summary report

## Out of Scope

- Automated refactoring without approval
- Complex refactoring beyond moving content
- CI integration of bulk refactoring
- Individual skill approval (use Stage 14)

---

# 6. Required Implementation Standard

- CLI command: `npm run refactor:bulk`
- Batch approval: single approval for all skills
- Dry-run mode: `npm run refactor:bulk -- --dry-run`
- Summary report with overall progress
- Use existing `suggest:refactor` logic

---

# 7. Design Constraints

- Single batch approval required
- Dry-run mode for preview
- Preserve original content
- No automated changes without review

---

# 8. Acceptance Criteria

Stage 17 is complete when:

- CLI command `refactor:bulk` exists
- Command generates batch refactoring plan
- Single batch approval for all skills
- Dry-run mode works correctly
- Summary report is clear
- Documentation is updated

---

# 9. Risks

## R1 — Incorrect Bulk Refactoring

Risk: Bulk refactoring may make incorrect changes to multiple skills.

Mitigation: Dry-run mode for preview; manual review required; use existing `suggest:refactor` logic.

## R2 — Data Loss

Risk: Original content may be lost during bulk refactoring.

Mitigation: Preserve original content; dry-run mode for preview; manual review required.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `refactor:bulk`
2. Implement batch refactoring plan generation
3. Add single batch approval
4. Add dry-run mode
5. Generate summary report
6. Test with multiple low-density skills
7. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 18: Density monitoring dashboard
- Stage 19: Email/SMS notifications
- Stage 20: Automated bulk refactoring with CI

Each future stage should receive its own PRD update or separate task plan before implementation.
