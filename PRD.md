# PRD — Stage 20: Automated Bulk Refactoring with CI

## Project

Evolution of the `Code_IA_SotA` harness through Stage 20: add automated bulk refactoring with CI to automatically apply refactoring suggestions to low-density skills in CI.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`), Stage 11 (`automated refactoring suggestions`), Stage 12 (`bulk density benchmarking and reporting`), Stage 13 (`density trends over time`), Stage 14 (`automated refactoring with user approval`), Stage 15 (`CI integration of density tracking`), Stage 16 (`automated alerts based on trends`) and Stage 17 (`bulk refactoring with batch approval`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds automated bulk refactoring with CI. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- generated reports with fixed schema
- CI enforcement of automated refactoring
- compatibility contracts for external platforms

---

# 2. Vision

Add automated bulk refactoring with CI to automatically apply refactoring suggestions to low-density skills, reducing manual effort while maintaining quality.

Stage 20 should add a GitHub Actions workflow step that applies automated refactoring to low-density skills with PR creation for review.

---

# 3. Problem Statement

Stage 17 provides bulk refactoring with batch approval, but still requires manual implementation of refactoring suggestions.

Without automated bulk refactoring in CI:
- Manual implementation is time-consuming for 20 skills
- Difficult to ensure consistent refactoring across skills
- Risk of manual errors during refactoring
- High effort for systematic refactoring

---

# 4. Objective

Add automated bulk refactoring with CI to automatically apply refactoring suggestions to low-density skills.

The goal is to provide automated refactoring with PR creation for review, reducing manual effort while maintaining quality.

---

# 5. Scope

## In Scope

- Add GitHub Actions workflow step for automated refactoring
- Apply automated refactoring to low-density skills
- Create PR for review with refactoring changes
- Use existing `suggest:refactor` logic
- Configure workflow to run on schedule or manual trigger

## Out of Scope

- Automated merging without review
- Complex refactoring beyond moving content
- Real-time monitoring dashboards
- Email/SMS notifications

---

# 6. Required Implementation Standard

- GitHub Actions workflow step for automated refactoring
- Apply refactoring using existing logic
- Create PR with descriptive title and description
- Configure workflow to run on schedule (weekly)
- Manual trigger available

---

# 7. Design Constraints

- PR creation for review required
- No automated merging without review
- Use existing refactoring logic
- Preserve existing CI behavior

---

# 8. Acceptance Criteria

Stage 20 is complete when:

- GitHub Actions workflow applies automated refactoring
- PR created with refactoring changes
- PR description includes density improvements
- Workflow runs on schedule or manual trigger
- Documentation is updated

---

# 9. Risks

## R1 — Incorrect Automated Refactoring

Risk: Automated refactoring may make incorrect changes.

Mitigation: PR creation for review; manual approval required; use existing refactoring logic.

## R2 — PR Spam

Risk: Too many PRs may be created by automated refactoring.

Mitigation: Weekly schedule; manual trigger available; can be disabled if needed.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add GitHub Actions workflow step for automated refactoring
2. Implement automated refactoring logic
3. Add PR creation logic
4. Configure workflow schedule (weekly)
5. Test workflow with manual trigger
6. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 21: Automated PR merging with approval
- Stage 22: Density enforcement with automated fixes
- Stage 23: Skill lifecycle management

Each future stage should receive its own PRD update or separate task plan before implementation.
