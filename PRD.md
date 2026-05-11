# PRD — Stage 10: CI Enforcement of Density Thresholds

## Project

Evolution of the `Code_IA_SotA` harness through Stage 10: enforce density thresholds in CI to prevent low-density skills from being merged.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`) and Stage 9 (`automated bloat detection rules`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds CI enforcement of density thresholds to the GitHub Actions workflow. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of other metrics
- compatibility contracts for external platforms

---

# 2. Vision

Enforce density thresholds in CI to prevent low-density skills from being merged, ensuring the harness maintains high density over time.

Stage 10 should modify the GitHub Actions workflow to fail when skills have density below the threshold, making density a gate for PRs and pushes.

---

# 3. Problem Statement

Stage 9 added automated bloat detection to the CLI validation, but it only emits warnings. Without CI enforcement, low-density skills can still be merged, leading to gradual bloat accumulation.

Without CI enforcement:
- Low-density skills can be merged without blocking
- Density warnings can be ignored in PR reviews
- Gradual bloat accumulation over time
- No automated gate for density

---

# 4. Objective

Add CI enforcement of density thresholds to the GitHub Actions workflow to fail when skills have density below the threshold.

The goal is to make density a hard gate for PRs and pushes, preventing low-density skills from being merged.

---

# 5. Scope

## In Scope

- Modify GitHub Actions workflow to fail on density warnings
- Add HARNESS_DENSITY_THRESHOLD environment variable to workflow
- Update workflow documentation
- Test workflow with low-density skill

## Out of Scope

- Changing existing skills (already addressed in Stage 6)
- Changing CLI validation behavior (warnings remain in local runs)
- Enforcing other metrics beyond density
- Automated refactoring of low-density skills

---

# 6. Required Implementation Standard

- GitHub Actions workflow fails when validation exits with non-zero code
- CLI validation already exits 0 with warnings; need to add flag to fail on warnings
- Add HARNESS_DENSITY_THRESHOLD environment variable to workflow (default 30%)
- Workflow should fail when any skill has density < threshold

---

# 7. Design Constraints

- Preserve local validation behavior (warnings only)
- CI enforcement should be opt-in via environment variable
- Threshold should be configurable in workflow
- Don't break existing CI behavior

---

# 8. Acceptance Criteria

Stage 10 is complete when:

- GitHub Actions workflow fails on density warnings
- HARNESS_DENSITY_THRESHOLD is configurable in workflow
- Local validation still exits 0 with warnings
- Workflow documentation is updated
- Test with low-density skill fails CI

---

# 9. Risks

## R1 — Breaking Existing PRs

Risk: Existing PRs with low-density skills will fail CI.

Mitigation: Threshold configurable; can start with lower threshold or temporarily disable enforcement.

## R2 — False Positives

Risk: Skills with legitimate low density (e.g., placeholder skills) fail CI.

Mitigation: Warnings only in local runs; CI enforcement can be disabled via environment variable if needed.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add flag to CLI validation to fail on warnings
2. Modify GitHub Actions workflow to use flag
3. Add HARNESS_DENSITY_THRESHOLD environment variable
4. Test workflow with low-density skill
5. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 11: Automated refactoring suggestions for low-density skills
- Stage 12: Bulk density benchmarking and reporting
- Stage 13: Density trends over time

Each future stage should receive its own PRD update or separate task plan before implementation.
