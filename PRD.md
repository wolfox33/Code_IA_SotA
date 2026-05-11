# PRD — Stage 4: Harness Maintenance Workflow

## Project

Evolution of the `Code_IA_SotA` harness through a focused fourth stage: create `.agents/workflows/harness-maintenance.md` as the operational workflow for coordinating harness maintenance.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`) and Stage 3 (`harness-repair`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This PRD is sufficient because:

- the target artifact is specific: `.agents/workflows/harness-maintenance.md`
- the change is documentation/harness-logic oriented, not runtime application code
- there is no API, database, external integration, or user-facing product contract
- acceptance criteria can be expressed directly in this PRD and tracked in `TASK.md`

Create separate specs only if a later stage introduces:

- validation scripts with CLI contracts
- automated repair behavior
- fixed report schemas consumed by tools
- multi-file migration rules with compatibility requirements

---

# 2. Vision

Make `harness-maintenance` the canonical workflow for deciding how to maintain `.agents/` artifacts safely.

The workflow should coordinate:

- when to use `skill-creator`
- when to use `skill-reviewer`
- when to use `harness-repair`
- when to update project memory
- when to defer scripts or broader audits
- how to keep diagnosis, planning and mutation separated

---

# 3. Problem Statement

The harness now has specialized skills for creation, review and structural diagnosis, but there is no operational workflow that sequences them.

Current gaps:

- agents may jump directly from diagnosis to edits
- skill-level and harness-level concerns may be mixed
- workflow findings may become accidental scope creep
- memory updates may be inconsistent
- future script work needs a stable maintenance process first

Without a maintenance workflow, future work may drift into:

- ad hoc task sequencing
- unnecessary full audits
- premature automation
- unclear handoff between skills
- broad repairs without explicit approval

---

# 4. Objective

Create `.agents/workflows/harness-maintenance.md` as the canonical workflow for:

- scoping harness maintenance work
- selecting the right skill or diagnostic layer
- sequencing diagnosis, plan, repair and validation
- preserving surgical changes
- recording durable decisions
- deferring unrelated workflow/platform findings

The goal is not automation. The goal is a compact operational sequence for maintainers.

---

# 5. Scope

## In Scope

- Create `.agents/workflows/harness-maintenance.md`
- Define use and non-use conditions
- Define workflow stages
- Define handoff rules between `skill-creator`, `skill-reviewer` and `harness-repair`
- Define validation and memory checkpoints
- Keep platform compatibility work out of scope

## Out of Scope

- Creating validation scripts
- Refactoring existing workflows
- Refactoring `AGENTS.md`
- Refactoring subagents
- Running a full harness audit
- Creating compatibility mirrors for specific platforms
- Automating repairs

---

# 6. Target Artifact

```txt
.agents/workflows/harness-maintenance.md
```

No resources, scripts or assets are required in this stage.

---

# 7. Required Capabilities

## 7.1 Workflow Stages

The workflow must include:

- scope definition
- artifact selection
- diagnostic path selection
- repair planning
- explicit approval before mutation
- validation
- project memory update

## 7.2 Skill Routing

The workflow must route:

- skill creation/modification to `skill-creator`
- skill review/readiness checks to `skill-reviewer`
- multi-artifact structural diagnosis to `harness-repair`

## 7.3 Output Expectations

The workflow must produce:

- a scoped maintenance plan
- a clear list of files in scope
- a diagnosis or repair summary
- validation status
- deferred items when out of scope

## 7.4 Anti-Pattern Detection

The workflow must avoid:

- auditing everything by default
- editing during diagnosis
- mixing platform compatibility with harness maintenance
- creating scripts before rules stabilize
- treating workflow orchestration as skill content

---

# 8. Design Constraints

- Keep the workflow compact and executable.
- Do not duplicate the full content of skills.
- Reference skills by responsibility instead of copying their procedures.
- Do not modify existing workflows in this stage.
- Do not add scripts or resources.
- Do not reopen platform compatibility work.

---

# 9. Acceptance Criteria

Stage 4 is complete when:

- `.agents/workflows/harness-maintenance.md` exists
- frontmatter has a clear `description`
- workflow defines when to use and not use it
- workflow sequences diagnosis, planning, repair and validation
- workflow routes to `skill-creator`, `skill-reviewer` and `harness-repair`
- workflow requires approval before mutation
- workflow includes memory and deferral checkpoints
- no unrelated workflows are changed

---

# 10. Risks

## R1 — Workflow Becomes Policy

Risk: duplicating global `AGENTS.md` policy in the workflow.

Mitigation: keep only operational sequencing.

## R2 — Workflow Becomes Skill

Risk: copying detailed skill procedures into the workflow.

Mitigation: route to skills instead of duplicating them.

## R3 — Scope Creep

Risk: using Stage 4 to refactor old workflows or platform docs.

Mitigation: create only the maintenance workflow.

## R4 — Premature Automation

Risk: turning the workflow into scripts before the process stabilizes.

Mitigation: defer scripts to Stage 5.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Define Stage 4 scope
2. Create `.agents/workflows/harness-maintenance.md`
3. Verify workflow compactness and routing
4. Review diff for accidental scope expansion
5. Record durable decisions if needed

---

# 12. Future Roadmap

Future stages may include:

- Stage 5: create validation scripts
- Stage 6: audit and refactor existing skills
- Stage 7: benchmark context efficiency

Each future stage should receive its own PRD update or separate task plan before implementation.
