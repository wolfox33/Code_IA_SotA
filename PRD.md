# PRD — Stage 3: Harness Repair

## Project

Evolution of the `Code_IA_SotA` harness through a focused third stage: create `.agents/skills/harness-repair/SKILL.md` as the diagnostic skill for detecting structural drift, duplicated responsibilities, context bloat, and misplaced harness responsibilities across `.agents/`.

This PRD assumes Stage 1 (`skill-creator`) and Stage 2 (`skill-reviewer`) are complete and keeps repair as diagnosis-first, not automatic mutation.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This PRD is sufficient because:

- the target artifact is specific: `.agents/skills/harness-repair/SKILL.md`
- the change is documentation/harness-logic oriented, not runtime application code
- there is no API, database, external integration, or user-facing product contract
- acceptance criteria can be expressed directly in this PRD and tracked in `TASK.md`

Create separate specs only if a later stage introduces:

- validation scripts with CLI contracts
- harness-wide audit reports with fixed schema
- automated repair behavior
- multi-file migration rules
- compatibility contracts for external agent runtimes

---

# 2. Vision

Make `harness-repair` the canonical operational guide for diagnosing harness-wide structural issues in `.agents/`.

The skill should help future agents and maintainers identify:

- architectural drift
- responsibility overlap
- context bloat
- misplaced policy or operational instructions
- invalid or inconsistent topology
- high-priority repair opportunities
- safe migration plans

---

# 3. Problem Statement

Stage 2 created a skill-level reviewer, but the harness still needs a broader diagnostic layer for issues that span multiple artifacts.

Current gaps:

- skill-level review does not cover topology-level drift
- overlap across skills, workflows, subagents and `AGENTS.md` needs a separate lens
- there is no standard harness repair report format
- broad repair can easily become unsafe if diagnosis and mutation are mixed
- future scripts/workflows need a diagnostic baseline first

Without `harness-repair`, future maintenance may drift into:

- duplicated governance
- bloated skills
- unclear boundaries between skills and workflows
- scattered policy
- premature scripts
- inconsistent maintenance decisions

---

# 4. Objective

Create `.agents/skills/harness-repair/SKILL.md` as the canonical skill for:

- diagnosing harness-wide structural problems
- detecting overlap and responsibility drift
- separating local skill issues from architecture issues
- recommending safe, staged repair plans
- producing a standard harness repair report
- keeping repair diagnosis separate from file mutation

The goal is not automatic repair. The goal is a practical diagnosis and planning skill for harness-wide maintenance.

---

# 5. Scope

## In Scope

- Create `.agents/skills/harness-repair/SKILL.md`
- Define when to use and not use harness repair
- Define diagnostic dimensions
- Define repair report format
- Define severity and priority model
- Define safe migration planning rules
- Define verification criteria
- Keep the skill focused on diagnosis and planning

## Out of Scope

- Creating validation scripts
- Creating maintenance workflows
- Refactoring `AGENTS.md`
- Refactoring subagents
- Refactoring existing skills
- Creating compatibility mirrors for specific platforms
- Benchmarking context efficiency
- Automatically modifying harness files unless explicitly requested
- Running a full repository audit as part of skill creation

---

# 6. Target Artifact

```txt
.agents/skills/harness-repair/
  SKILL.md
```

Optional resource files are not required in this stage.

Create `references/` only if repair report examples, topology maps, or migration templates become too long for the main `SKILL.md`.

---

# 7. Required Capabilities

## 7.1 Diagnostic Dimensions

The skill must diagnose:

- topology consistency
- duplicated responsibilities
- misplaced global policy
- skills that should be split or merged
- workflow responsibilities inside skills
- subagent responsibilities inside skills
- references or scripts created prematurely
- context bloat and excessive examples
- missing or weak validation layer opportunities
- unsafe repair sequencing

## 7.2 Output Contracts

The skill must define expected outputs for common scenarios:

- harness repair report
- boundary diagnosis
- migration plan
- priority fix list

Each output must have a minimal completion definition.

## 7.3 Severity and Priority

Findings must be classified as:

- **Blocker**: breaks discovery, parsing, or safe harness operation
- **High**: creates major duplication, wrong routing, or unsafe maintenance path
- **Medium**: increases context cost, ambiguity, or maintainability burden
- **Low**: local cleanup or clarity issue

Priorities must be classified as:

- **P0**: fix before proceeding
- **P1**: fix in current maintenance cycle
- **P2**: backlog improvement

## 7.4 Repair Report Format

The skill must produce reports with:

- scope reviewed
- topology findings
- context findings
- boundary findings
- duplication findings
- parsing or validation findings
- repair recommendations
- staged migration plan
- out-of-scope notes
- final readiness status

## 7.5 Anti-Pattern Detection

The skill must teach maintainers to detect:

- broad catch-all skills or workflows
- global policy duplicated outside `AGENTS.md`
- skill-level fixes that are actually architecture issues
- workflow orchestration embedded inside skills
- subagent role definitions embedded inside skills
- references created to hide unclear scope
- scripts created before stable rules exist
- repair plans that change too many files at once

---

# 8. Design Constraints

- Keep the change surgical.
- Use Stage 1 `skill-creator` and Stage 2 `skill-reviewer` as baselines.
- Prefer compact operational instructions over long explanations.
- Do not create future-stage artifacts.
- Do not refactor unrelated files.
- Do not run a full harness audit during skill creation.
- Do not turn future ideas into current obligations.
- Do not modify diagnosed artifacts unless the user asks for repair.

---

# 9. Acceptance Criteria

Stage 3 is complete when:

- `.agents/skills/harness-repair/SKILL.md` exists
- `description` explains when to use the skill and what it does
- the skill clearly states when not to use it
- the procedure includes reading only the necessary harness artifacts
- the procedure includes diagnostic dimensions
- the procedure includes severity and priority levels
- the procedure includes output contracts
- the procedure includes a repair report format
- the procedure separates diagnosis, planning and repair
- the skill remains focused on harness-wide diagnosis
- no unrelated harness files are changed

---

# 10. Risks

## R1 — Overengineering

Risk: making `harness-repair` too abstract or too long.

Mitigation: keep it focused on actionable diagnosis and staged repair plans.

## R2 — Scope Creep

Risk: implementing future stages while creating the repair skill.

Mitigation: track only Stage 3 in `TASK.md`.

## R3 — Duplicated Global Policy

Risk: copying broad `AGENTS.md` rules into the repair skill.

Mitigation: only include skill-specific operational rules.

## R4 — Diagnosis Becomes Mutation

Risk: the skill starts changing many files during diagnosis.

Mitigation: diagnose and plan first; mutate only when explicitly requested.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Review Stage 1 and Stage 2 standards
2. Create `.agents/skills/harness-repair/SKILL.md`
3. Verify structure, scope, and parse safety
4. Review diff for accidental scope expansion
5. Decide whether any lessons should be recorded in project memory

---

# 12. Future Roadmap

The broader harness self-maintenance vision remains valid, but later stages remain deferred.

Future stages may include:

- Stage 4: create maintenance workflow
- Stage 5: create validation scripts
- Stage 6: audit and refactor existing skills
- Stage 7: benchmark context efficiency

Each future stage should receive its own PRD update or separate task plan before implementation.
