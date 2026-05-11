# PRD — Stage 8: CI Integration for Harness Validation

## Project

Evolution of the `Code_IA_SotA` harness through a focused eighth stage: integrate the harness validation command into CI to catch structural regressions automatically.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (`skill audit and incremental refactor`) and Stage 7 (`benchmark context efficiency`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds CI configuration, not application behavior. The validation command from Stage 5 already exists and has a deterministic contract. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- multiple CI environments with different rules
- automated fix behavior in CI
- generated reports with fixed schema
- compatibility contracts for external platforms

---

# 2. Vision

Prevent harness structural regressions by running the validation command automatically in CI before merge.

Stage 8 should catch frontmatter parse errors, missing required fields, and placeholder descriptions early without blocking legitimate changes to mature content.

---

# 3. Problem Statement

The harness has a deterministic validation command, but it must be run manually.

Current gaps:

- structural regressions can slip through without manual validation
- placeholder descriptions can reappear unnoticed
- frontmatter parse errors can break discovery
- no automated feedback loop for harness quality

Without CI integration, future maintenance may:

- merge skills with broken frontmatter
- reintroduce placeholder descriptions
- allow workflow metadata to drift
- rely on manual discipline for structural quality

---

# 4. Objective

Integrate the existing validation command into CI to fail builds on harness structural failures while allowing warnings for maturity gaps.

The goal is not to enforce perfect canonical compliance. The goal is to prevent regressions in parse safety and required metadata.

---

# 5. Scope

## In Scope

- Add GitHub Actions workflow to run validation command
- Configure workflow to trigger on PR to main
- Configure workflow to run on push to main
- Fail the build on validation failures (non-zero exit)
- Allow warnings to pass without failing the build
- Document CI behavior in README

## Out of Scope

- Refactoring skills to pass validation
- Changing validation command rules
- Enforcing hard size limits or density thresholds
- Validating subagents unless explicitly added later
- Platform compatibility mirrors
- Automated fix behavior

---

# 6. CI Configuration Requirements

The GitHub Actions workflow must:

- Use the existing `npm run validate:harness` script
- Run on Node.js compatible environment
- Trigger on pull_request to main
- Trigger on push to main
- Fail the workflow if validation exits non-zero
- Allow warnings without failing the workflow
- Output validation results clearly in logs

---

# 7. Validation Behavior in CI

The validation command behavior in CI should match Stage 5:

- **Failures**: missing frontmatter, missing `name` or `description`, placeholder descriptions, empty workflow body
- **Warnings**: missing operational sections in skills
- **Exit code**: non-zero on failures, zero on success (even with warnings)

CI should fail the workflow only on validation failures, not on warnings.

---

# 8. Design Constraints

- Keep CI configuration simple and readable.
- Do not introduce external dependencies beyond Node.js.
- Do not change the validation command itself.
- Do not block legitimate changes to mature content.
- Do not create competing CI workflows.

---

# 9. Acceptance Criteria

Stage 8 is complete when:

- GitHub Actions workflow exists
- workflow runs on pull_request to main
- workflow runs on push to main
- workflow calls `npm run validate:harness`
- workflow fails when validation fails
- workflow passes when validation succeeds (even with warnings)
- CI behavior is documented in README
- no skills or workflows are modified for CI compliance
- no subagents or global policy files are changed

---

# 10. Risks

## R1 — Overblocking

Risk: CI blocks legitimate changes to mature content.

Mitigation: validation treats missing operational sections as warnings, not failures.

## R2 — False Positives

Risk: CI fails on valid changes due to environment differences.

Mitigation: use the same npm script that works locally; CI runs in standard Node.js environment.

## R3 — Workflow Drift

Risk: CI configuration becomes outdated if validation command changes.

Mitigation: CI calls the npm script directly; changes to the script are reflected automatically.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Review existing validation command behavior
2. Create GitHub Actions workflow file
3. Configure triggers (pull_request, push)
4. Test workflow locally or via dry run
5. Document CI behavior in README
6. Update project memory if a durable decision emerges

---

# 12. Future Roadmap

Future stages may include:

- additional skill refactor batches based on Stage 7 benchmark
- Stage 9: automated bloat detection rules
- Stage 10: CI enforcement of density thresholds

Each future stage should receive its own PRD update or separate task plan before implementation.
