# PRD — Stage 1: Canonical Skill Creator

## Project

Evolution of the `Code_IA_SotA` harness through a focused first stage: refactor `.agents/skills/skill-creator/SKILL.md` into the canonical standard for creating, modifying, and maintaining skills inside the `.agents/` harness.

This PRD intentionally narrows the previous broad self-maintenance vision into an incremental, verifiable stage.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This PRD is sufficient because:

- the target artifact is specific: `.agents/skills/skill-creator/SKILL.md`
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

Make `skill-creator` the canonical operational guide for skill creation and skill maintenance in the `.agents/` harness.

The skill should help future agents and maintainers create skills that are:

- parse-safe
- narrow in scope
- operational rather than philosophical
- easy to review
- easy to validate
- consistent with the harness architecture
- resistant to context bloat

---

# 3. Problem Statement

The current `skill-creator` is useful and already lean, but it does not yet fully define the canonical harness standard for skills.

Current gaps:

- quality bar is implicit
- output contracts are not explicit
- parse-safe rules are too light
- modularity guidance is incomplete
- anti-pattern detection is minimal
- separation between `AGENTS.md`, skills, workflows, references, scripts, and subagents is not explicit enough
- verification checklist is useful but not strict enough for a canonical standard

Without a stronger `skill-creator`, future skills may drift into:

- oversized instructions
- duplicated global policy
- vague activation semantics
- inconsistent frontmatter
- unclear output expectations
- unnecessary resources or scripts

---

# 4. Objective

Refactor `.agents/skills/skill-creator/SKILL.md` into the canonical skill for:

- creating new skills
- modifying existing skills
- improving skill quality
- defining skill output contracts
- enforcing parse-safe structure
- guiding modular skill design
- preventing common skill anti-patterns

The goal is not to create a meta-framework. The goal is a practical, compact, operational standard for skill work.

---

# 5. Scope

## In Scope

- Update `.agents/skills/skill-creator/SKILL.md`
- Preserve the existing skill intent
- Keep the skill focused and readable
- Add explicit quality bar
- Add output contracts
- Add parse-safe rules
- Add modularity rules
- Add anti-pattern detection
- Add clearer separation logic for harness artifacts
- Strengthen verification criteria
- Keep `Skill log` history

## Out of Scope

- Creating `skill-reviewer`
- Creating `harness-repair`
- Creating validation scripts
- Creating maintenance workflows
- Auditing all existing skills
- Refactoring `AGENTS.md`
- Refactoring subagents
- Creating compatibility mirrors for specific platforms
- Benchmarking context efficiency

---

# 6. Target Artifact

```txt
.agents/skills/skill-creator/
  SKILL.md
```

Optional resource files are not required in this stage.

Create `references/` only if the skill becomes too long or if examples/anti-patterns would make the main `SKILL.md` harder to use.

---

# 7. Required Improvements

## 7.1 Quality Bar

The skill must define what a good skill is.

Minimum quality criteria:

- clear reason to exist
- narrow operational scope
- concrete activation conditions
- explicit non-use cases
- parse-safe frontmatter
- procedure that can be followed step by step
- verification checklist
- no duplicated global policy from `AGENTS.md`
- no unnecessary philosophical prose

## 7.2 Output Contracts

The skill must define expected outputs for common scenarios:

- new skill created
- existing skill modified
- skill improvement plan produced
- skill diagnosis produced

Each output must have a minimal completion definition.

## 7.3 Parse-Safe Rules

The skill must include concrete rules for safe skill files:

- `SKILL.md` must start with YAML frontmatter
- frontmatter must be delimited by `---`
- `name` is required and must be kebab-case
- `description` is required and must be quoted
- markdown belongs in the body, not in frontmatter
- lists in YAML must use consistent indentation
- avoid complex YAML structures unless they improve discovery

## 7.4 Modularity Rules

The skill must clarify where information belongs:

- `AGENTS.md` for global policy
- `SKILL.md` for operational skill instructions
- `references/` for dense or optional knowledge
- `scripts/` for deterministic executable checks or transformations
- `assets/` for templates or static files used by the skill
- workflows for multi-step orchestration across artifacts
- subagents for role-based delegation, not simple skill instructions

## 7.5 Anti-Pattern Detection

The skill must teach maintainers to detect:

- broad catch-all skills
- vague descriptions
- hidden global policy duplication
- excessive examples in the main skill
- instructions that depend on unstated context
- missing verification
- resource files created without need
- scripts created before the process stabilizes

---

# 8. Design Constraints

- Keep the change surgical.
- Preserve the useful parts of the existing skill.
- Prefer compact operational instructions over long explanations.
- Do not create future-stage artifacts yet.
- Do not refactor unrelated files.
- Do not make `skill-creator` responsible for full harness auditing.
- Do not turn future ideas into current obligations.

---

# 9. Acceptance Criteria

Stage 1 is complete when:

- `.agents/skills/skill-creator/SKILL.md` still has valid frontmatter
- `description` explains when to use the skill and what it does
- the skill clearly states when not to use it
- the procedure includes intent discovery before editing
- the procedure includes parse-safe authoring rules
- the procedure includes output contracts
- the procedure includes modularity decisions
- the procedure includes anti-pattern checks
- the procedure includes verification before completion
- the skill remains focused on skill creation/modification
- no unrelated harness files are changed

---

# 10. Risks

## R1 — Overengineering

Risk: making `skill-creator` too abstract or too long.

Mitigation: keep it focused on actionable skill creation and maintenance.

## R2 — Scope Creep

Risk: implementing future stages while refactoring the first skill.

Mitigation: track only Stage 1 in `TASK.md`.

## R3 — Duplicated Global Policy

Risk: copying broad `AGENTS.md` rules into the skill.

Mitigation: only include skill-specific operational rules.

## R4 — Premature Resource Extraction

Risk: creating `references/` or `scripts/` before the skill needs them.

Mitigation: keep everything in `SKILL.md` unless the main file becomes harder to use.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Review current `skill-creator`
2. Refactor `SKILL.md` with the new canonical sections
3. Verify structure, scope, and parse safety
4. Review diff for accidental scope expansion
5. Decide whether any lessons should be recorded in project memory

---

# 12. Future Roadmap

The broader harness self-maintenance vision remains valid, but is explicitly deferred.

Future stages may include:

- Stage 2: create `skill-reviewer`
- Stage 3: create `harness-repair`
- Stage 4: create maintenance workflow
- Stage 5: create validation scripts
- Stage 6: audit and refactor existing skills
- Stage 7: benchmark context efficiency

Each future stage should receive its own PRD update or separate task plan before implementation.
