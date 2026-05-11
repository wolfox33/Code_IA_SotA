# PRD — Stage 15: CI Integration of Density Tracking

## Project

Evolution of the `Code_IA_SotA` harness through Stage 15: add CI integration of density tracking to automatically create density snapshots on each push/PR.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`), Stage 11 (`automated refactoring suggestions`), Stage 12 (`bulk density benchmarking and reporting`), Stage 13 (`density trends over time`) and Stage 14 (`automated refactoring with user approval`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds CI integration of density tracking. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of density trends
- compatibility contracts for external platforms

---

# 2. Vision

Add CI integration of density tracking to automatically create density snapshots on each push/PR, enabling continuous monitoring of density changes without manual intervention.

Stage 15 should add a GitHub Actions workflow step that runs `density:snapshot` on each push/PR to automatically track density changes.

---

# 3. Problem Statement

Stage 13 provides density snapshot and trend tracking, but requires manual execution of `density:snapshot`. Without CI integration, density tracking may be forgotten or inconsistent.

Without CI integration:
- Manual snapshot creation is error-prone
- Density tracking may be inconsistent
- No automatic monitoring of density changes
- Difficult to correlate density changes with commits

---

# 4. Objective

Add CI integration of density tracking to automatically create density snapshots on each push/PR.

The goal is to provide automatic density tracking without manual intervention.

---

# 5. Scope

## In Scope

- Add `density:snapshot` step to existing GitHub Actions workflow
- Commit density history file to repository
- Configure workflow to run on push/PR
- Preserve existing validation behavior

## Out of Scope

- Automated alerts based on density changes
- Trend analysis in CI
- Blocking CI based on density trends
- Complex density monitoring dashboards

---

# 6. Required Implementation Standard

- Add step to existing `.github/workflows/validate-harness.yml`
- Run `density:snapshot` after validation
- Commit `.agents/data/density-history.json` to repository
- Configure git user for automated commits
- Non-blocking (validation failures should still fail CI)

---

# 7. Design Constraints

- Preserve existing CI behavior
- Density snapshot should not block CI
- Automated commits should be clearly identifiable
- No breaking changes to existing workflow

---

# 8. Acceptance Criteria

Stage 15 is complete when:

- GitHub Actions workflow runs `density:snapshot` on push/PR
- Density history file is committed to repository
- Automated commits are clearly identifiable
- Existing validation behavior is preserved
- Documentation is updated

---

# 9. Risks

## R1 — Commit Conflicts

Risk: Automated density snapshot commits may conflict with manual changes.

Mitigation: Separate commits; workflow runs after validation; conflicts rare.

## R2 — File Growth

Risk: Density history file may grow large over time.

Mitigation: Simple JSON format; manual cleanup if needed; can be optimized in future.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add `density:snapshot` step to GitHub Actions workflow
2. Configure git user for automated commits
3. Commit density history file to repository
4. Test workflow with push/PR
5. Verify automated commits are identifiable
6. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 16: Automated alerts based on trends
- Stage 17: Bulk refactoring with batch approval
- Stage 18: Density monitoring dashboard

Each future stage should receive its own PRD update or separate task plan before implementation.
