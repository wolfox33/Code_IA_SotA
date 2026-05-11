# PRD — Stage 13: Density Trends Over Time

## Project

Evolution of the `Code_IA_SotA` harness through Stage 13: add density trends tracking over time to monitor density changes and identify bloat accumulation.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`), Stage 10 (`CI enforcement of density thresholds`), Stage 11 (`automated refactoring suggestions`) and Stage 12 (`bulk density benchmarking and reporting`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds density trends tracking over time. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of trend tracking
- compatibility contracts for external platforms

---

# 2. Vision

Add density trends tracking over time to monitor density changes and identify bloat accumulation, enabling proactive refactoring before density degrades significantly.

Stage 13 should add a simple mechanism to store historical density data and generate trend reports.

---

# 3. Problem Statement

Stage 12 provides snapshot density reports, but no way to track density changes over time or identify gradual bloat accumulation.

Without trend tracking:
- No visibility into density changes over time
- Difficult to identify gradual bloat accumulation
- No way to measure impact of refactoring efforts
- No early warning system for density degradation

---

# 4. Objective

Add density trends tracking over time to monitor density changes and identify bloat accumulation.

The goal is to provide a simple mechanism to store historical density data and generate trend reports.

---

# 5. Scope

## In Scope

- Add simple file-based storage for historical density data
- Add CLI command to store density snapshot
- Add CLI command to generate trend report
- Store data in JSON format in `.agents/data/density-history.json`
- Generate trend report showing density changes over time

## Out of Scope

- Database storage
- Complex trend analysis algorithms
- CI integration of trend tracking
- Automated alerts based on trends

---

# 6. Required Implementation Standard

- Storage: JSON file at `.agents/data/density-history.json`
- Snapshot format: timestamp, skill name, density
- CLI command `npm run density:snapshot` to store snapshot
- CLI command `npm run density:trends` to generate trend report
- Trend report: show density changes for each skill over time

---

# 7. Design Constraints

- Simple file-based storage (no database)
- JSON format for easy parsing
- Manual snapshot creation (no automation)
- Preserve existing CLI behavior

---

# 8. Acceptance Criteria

Stage 13 is complete when:

- CLI command `density:snapshot` exists
- CLI command `density:trends` exists
- Historical data stored in JSON format
- Trend report shows density changes over time
- Documentation is updated

---

# 9. Risks

## R1 — File Growth

Risk: Density history file may grow large over time.

Mitigation: Simple JSON format; manual cleanup if needed.

## R2 — Manual Process

Risk: Snapshots must be created manually; may be forgotten.

Mitigation: Document process; can be automated in future stages.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `density:snapshot`
2. Implement JSON file storage
3. Add CLI command `density:trends`
4. Generate trend report
5. Test snapshot and trend commands
6. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 14: Automated refactoring with user approval
- Stage 15: CI integration of density tracking
- Stage 16: Automated alerts based on trends

Each future stage should receive its own PRD update or separate task plan before implementation.
