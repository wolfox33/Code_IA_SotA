# PRD — Stage 24: Harness Evolutionary Governance

## Project

Evolution of the `Code_IA_SotA` harness through Stage 24: add evolutionary governance mechanisms to prevent AGENTS.md bloat, reference monoliths, and enable systematic harness maintenance through skill-reviewer and harness-repair operationalization.

This PRD assumes Stages 1-23 are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds evolutionary governance mechanisms. The work can be tracked directly in `TASK-v2.md`.

---

# 2. Vision

Add evolutionary governance mechanisms to prevent AGENTS.md bloat, reference monoliths, and enable systematic harness maintenance through operationalized skill-reviewer and harness-repair.

Stage 24 should establish:
- AGENTS.md budget and split guidelines
- Reference granularity rules
- Override hierarchy semantics
- Expanded lifecycle with experimental state
- Operational harness maintenance workflow

---

# 3. Problem Statement

Current harness lacks evolutionary governance mechanisms:

- AGENTS.md can grow without bounds, becoming obfuscated
- references/ folders can become hidden monoliths
- skill-reviewer and harness-repair exist but are not operationalized
- No clear override hierarchy between AGENTS.md, skills, workflows
- Lifecycle lacks experimental state for new skills
- No observability metrics for activation, overlap, context efficiency

Without evolutionary governance:
- Harness degrades over time through context bloat
- No systematic way to detect drift and overlap
- Unclear conflict resolution between policy layers
- Difficult to track skill health and usage patterns

---

# 4. Objective

Add evolutionary governance mechanisms to maintain harness health over time.

The goal is to provide systematic tools for:
- Preventing AGENTS.md bloat
- Preventing reference monoliths
- Operationalizing harness maintenance
- Defining clear override hierarchy
- Expanding lifecycle management
- Adding basic observability metrics

---

# 5. Scope

## In Scope

- AGENTS.md budget (300-500 lines max) and split guidelines
- Reference granularity rules (1 topic per file, max size)
- Override hierarchy definition (AGENTS.md > skill > workflow > subagent)
- Expanded lifecycle with experimental state
- Operational harness maintenance workflow
- Basic observability metrics (activation frequency, skill overlap)

## Out of Scope

- Automated skill deletion
- Complex usage analytics dashboards
- Automated archiving workflows
- Advanced observability (token usage, context efficiency)
- Dependency tracking between skills

---

# 6. Required Implementation Standard

- AGENTS.md budget: 300-500 lines maximum
- Reference granularity: 1 topic per file, max 50-100 lines
- Override hierarchy documented in AGENTS.md and README
- Lifecycle states: active, experimental, deprecated, archived
- Harness maintenance workflow operationalized
- CLI commands for governance checks

---

# 7. Design Constraints

- Manual governance decisions (no automated deletion)
- Preserve existing skills and structure
- Backward compatible with current harness
- CLI-based validation and checks
- Workflow-driven maintenance process

---

# 8. Acceptance Criteria

Stage 24 is complete when:

- AGENTS.md budget defined and documented
- Reference granularity rules defined and enforced
- Override hierarchy documented in AGENTS.md and README
- Lifecycle expanded with experimental state
- Harness maintenance workflow operationalized
- CLI commands for governance checks exist
- Documentation updated

---

# 9. Risks

## R1 — AGENTS.md Split Complexity

Risk: Splitting AGENTS.md may create fragmentation or unclear boundaries.

Mitigation: Clear split guidelines; preserve core policy in AGENTS.md; move operational details to skills/workflows.

## R2 — Reference Granularity Overhead

Risk: Too many small reference files may increase complexity.

Mitigation: Balance granularity with usability; define clear topic boundaries; allow exceptions with justification.

## R3 — Override Hierarchy Confusion

Risk: Override hierarchy may be misunderstood or misapplied.

Mitigation: Clear documentation with examples; validation checks; training materials.

---

# 10. Execution Plan

Execution is tracked in `TASK-v2.md`.

High-level sequence:

1. Define AGENTS.md budget and split guidelines
2. Define reference granularity rules
3. Document override hierarchy in AGENTS.md and README
4. Expand lifecycle with experimental state
5. Operationalize harness maintenance workflow
6. Add CLI commands for governance checks
7. Update documentation
8. Validate governance mechanisms

---

# 11. Future Roadmap

Future stages may build on this foundation:

- Advanced observability (token usage, context efficiency)
- Automated drift detection
- Skill dependency tracking
- Automated archiving workflows
- Usage analytics dashboards

Each future stage should receive its own PRD update or separate task plan before implementation.
