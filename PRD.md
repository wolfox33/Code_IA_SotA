# PRD — Stage 12: Bulk Density Benchmarking and Reporting

## Project

Evolution of the `Code_IA_SotA` harness through Stage 12: add bulk density benchmarking and reporting to track density across all skills over time.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`) and Stage 11 (`automated refactoring suggestions`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds bulk density benchmarking and reporting to the CLI. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of benchmarking
- compatibility contracts for external platforms

---

# 2. Vision

Add bulk density benchmarking and reporting to track density across all skills, enabling trend analysis and identification of skills that need refactoring.

Stage 12 should add a CLI command that generates a density report for all skills, with optional JSON output for programmatic consumption.

---

# 3. Problem Statement

Stage 9 and Stage 11 identified low-density skills, but provided no way to track density trends over time or generate comprehensive reports.

Without benchmarking and reporting:
- No way to track density changes over time
- No comprehensive view of all skills density
- Difficult to prioritize refactoring efforts
- No programmatic access to density data

---

# 4. Objective

Add bulk density benchmarking and reporting to track density across all skills, enabling trend analysis and identification of skills that need refactoring.

The goal is to provide a comprehensive density report with optional JSON output for automation.

---

# 5. Scope

## In Scope

- Add CLI command `benchmark:density` to generate density report
- Generate human-readable report with density for all skills
- Add optional JSON output flag for programmatic consumption
- Sort skills by density (ascending/descending)
- Add statistics (average, min, max density)

## Out of Scope

- Storing historical density data
- Trend analysis over time
- CI integration of benchmarking
- Automated refactoring based on benchmark

---

# 6. Required Implementation Standard

- New CLI command: `npm run benchmark:density`
- Optional JSON output: `npm run benchmark:density -- --json`
- Report format: table with skill name, density, file path
- Statistics: average, min, max density
- Sorting: by density (ascending by default)

---

# 7. Design Constraints

- Preserve existing CLI behavior
- JSON output should be machine-readable
- Human-readable output should be clear and concise
- No breaking changes to existing commands

---

# 8. Acceptance Criteria

Stage 12 is complete when:

- CLI command `benchmark:density` exists
- Command generates density report for all skills
- JSON output flag works correctly
- Statistics are accurate
- Documentation is updated

---

# 9. Risks

## R1 — Performance Impact

Risk: Benchmarking may be slow for large codebases.

Mitigation: Simple density calculation is fast; no complex parsing.

## R2 — Output Format Changes

Risk: JSON format may change in future, breaking automation.

Mitigation: Document JSON schema; version the format if needed.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `benchmark:density`
2. Implement density calculation for all skills
3. Generate human-readable report
4. Add JSON output flag
5. Calculate statistics (average, min, max)
6. Test with all skills
7. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 13: Density trends over time
- Stage 14: Automated refactoring with user approval
- Stage 15: CI integration of benchmarking

Each future stage should receive its own PRD update or separate task plan before implementation.
