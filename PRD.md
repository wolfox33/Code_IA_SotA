# PRD — Stage 7: Benchmark Context Efficiency

## Project

Evolution of the `Code_IA_SotA` harness through a focused seventh stage: benchmark context efficiency of skills to identify bloat and establish measurable targets.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`) and Stage 6 (`skill audit and incremental refactor`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage produces diagnostic metrics and observations, not runtime application behavior. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bloat detection rules
- CI enforcement of size limits
- generated reports with fixed schema
- compatibility contracts for external platforms

---

# 2. Vision

Establish a baseline of context efficiency across skills to identify which skills are disproportionately large or dense relative to their scope.

Stage 7 should produce actionable data without enforcing arbitrary size limits or refactoring skills in bulk.

---

# 3. Problem Statement

The harness has many skills, but there is no objective measurement of which skills consume disproportionate context.

Current gaps:

- no baseline of skill file sizes
- no measurement of line density vs. actionable content
- no way to prioritize bloat reduction efforts
- no objective data to guide future refactor batches

Without a benchmark, future maintenance may:

- refactor skills that are already efficient
- ignore skills that are actual context bottlenecks
- apply cosmetic edits instead of high-impact reductions

---

# 4. Objective

Benchmark context efficiency of all skills to produce a ranked list of candidates for bloat reduction.

The goal is not to enforce a specific size limit. The goal is to provide data for informed prioritization.

---

# 5. Scope

## In Scope

- Measure file size for each skill `SKILL.md`
- Count lines and distinguish metadata from procedure
- Estimate density of actionable content
- Identify skills with high size-to-scope ratio
- Document observations without refactoring
- Propose metrics for ongoing monitoring

## Out of Scope

- Refactoring skills based on benchmark
- Enforcing hard size limits
- Changing skill content
- Validating subagents or workflows
- CI integration
- Platform compatibility mirrors

---

# 6. Metrics to Capture

For each `.agents/skills/*/SKILL.md`, measure:

- Total file size in bytes
- Total line count
- Frontmatter line count
- Procedure line count
- References/assets line count when present
- Estimated density (procedure lines / total lines)
- Subjective complexity score (low/medium/high) based on domain

---

# 7. Analysis Criteria

Flag skills as potential bloat candidates when:

- file size is above median but scope is narrow
- procedure section is disproportionately long relative to use cases
- references/assets exist but are rarely needed
- skill description suggests focused scope but content suggests broad coverage

Avoid flagging skills when:

- large size is justified by complex domain
- skill is a central orchestration or pattern
- complexity is inherent to the problem space

---

# 8. Output Requirements

Stage 7 must produce:

- A ranked list of skills by file size
- A ranked list of skills by procedure line count
- A ranked list of skills by density ratio
- Qualitative observations for top candidates
- Recommended metrics for ongoing monitoring

---

# 9. Acceptance Criteria

Stage 7 is complete when:

- all skills have been measured for size and line count
- frontmatter/procedure/reference line counts are captured
- density ratios are calculated
- ranked lists are produced
- qualitative observations are documented for top candidates
- no skills or workflows are modified
- no subagents or global policy files are changed

---

# 10. Risks

## R1 — False Positives

Risk: flagging legitimately complex skills as bloat.

Mitigation: use domain judgment and complexity score alongside raw metrics.

## R2 — Metric Gaming

Risk: editing skills to optimize for metrics without improving quality.

Mitigation: Stage 7 is diagnostic only; Stage 6 batches drive actual changes.

## R3 — Overanalysis

Risk: spending time on micro-optimizations instead of high-impact targets.

Mitigation: focus on ranked top candidates and clear outliers.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. List all skills
2. Measure file size and line counts
3. Categorize lines by section
4. Calculate density ratios
5. Rank and identify top candidates
6. Document observations and recommended metrics
7. Update project memory if a durable decision emerges

---

# 12. Future Roadmap

Future stages may include:

- additional skill refactor batches based on benchmark data
- Stage 8: CI integration for harness validation

Each future stage should receive its own PRD update or separate task plan before implementation.
