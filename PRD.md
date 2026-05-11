# PRD — Stage 2: Skill Reviewer

## Project

Evolution of the `Code_IA_SotA` harness through a focused second stage: create `.agents/skills/skill-reviewer/SKILL.md` as the canonical skill for reviewing existing skills against the standards established by `skill-creator`.

This PRD assumes Stage 1 is complete and keeps the broader self-maintenance vision incremental and bounded.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This PRD is sufficient because:

- the target artifact is specific: `.agents/skills/skill-reviewer/SKILL.md`
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

Make `skill-reviewer` the canonical operational guide for reviewing skill quality in the `.agents/` harness.

The skill should help future agents and maintainers identify whether existing skills are:

- parse-safe
- narrow in scope
- operational rather than philosophical
- easy to maintain
- easy to improve
- consistent with the harness architecture
- resistant to context bloat

---

# 3. Problem Statement

Stage 1 created the canonical guidance for creating and improving skills, but the harness still needs a separate review capability.

Current gaps:

- reviewing a skill currently depends on ad hoc judgment
- there is no standard review report format
- findings may mix critical defects with optional improvements
- reviewers may over-edit instead of recommending small corrections
- cross-skill overlap is hard to identify consistently
- parse-safety and activation quality are not audited uniformly

Without `skill-reviewer`, future skill maintenance may drift into:

- subjective reviews
- inconsistent quality bars
- unnecessary rewrites
- missed frontmatter issues
- duplicated responsibilities across skills
- weak prioritization of fixes

---

# 4. Objective

Create `.agents/skills/skill-reviewer/SKILL.md` as the canonical skill for:

- reviewing existing skills
- diagnosing skill quality issues
- checking parse-safe structure
- checking activation semantics
- checking output contracts and verification
- identifying modularity problems
- producing prioritized review reports

The goal is not to repair the whole harness. The goal is a practical skill-level reviewer that can recommend focused improvements.

---

# 5. Scope

## In Scope

- Create `.agents/skills/skill-reviewer/SKILL.md`
- Define when to use and not use the reviewer
- Define review output contracts
- Define review dimensions
- Define severity levels
- Define anti-pattern checks
- Define verification criteria
- Keep the skill focused on review, not repair

## Out of Scope

- Creating `harness-repair`
- Creating validation scripts
- Creating maintenance workflows
- Auditing all existing skills
- Refactoring `AGENTS.md`
- Refactoring subagents
- Creating compatibility mirrors for specific platforms
- Benchmarking context efficiency
- Automatically modifying reviewed skills unless explicitly requested

---

# 6. Target Artifact

```txt
.agents/skills/skill-reviewer/
  SKILL.md
```

Optional resource files are not required in this stage.

Create `references/` only if review examples or scoring rubrics become too long for the main `SKILL.md`.

---

# 7. Required Capabilities

## 7.1 Review Dimensions

The skill must review:

- frontmatter parse safety
- description clarity
- use and non-use conditions
- scope boundaries
- output contracts
- procedure quality
- modularity decisions
- pitfalls and anti-pattern coverage
- verification quality
- bloat and duplication

## 7.2 Output Contracts

The skill must define expected outputs for common scenarios:

- single skill review
- multi-skill comparison
- improvement plan
- pass/fail readiness check

Each output must have a minimal completion definition.

## 7.3 Severity Levels

Findings must be classified as:

- **Blocker**: breaks parsing, discovery, or safe use
- **High**: causes wrong activation, duplicated responsibility, or unsafe guidance
- **Medium**: weakens maintainability or reviewability
- **Low**: style, wording, or minor clarity issue

## 7.4 Review Report Format

The skill must produce reports with:

- summary verdict
- scope reviewed
- findings by severity
- evidence from the skill
- recommended changes
- out-of-scope notes
- final readiness status

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
- unnecessary rewrites when targeted edits are enough

---

# 8. Design Constraints

- Keep the change surgical.
- Use the Stage 1 `skill-creator` standard as the review baseline.
- Prefer compact operational instructions over long explanations.
- Do not create future-stage artifacts.
- Do not refactor unrelated files.
- Do not make `skill-reviewer` responsible for full harness auditing.
- Do not turn future ideas into current obligations.
- Do not modify reviewed skills unless the user asks for repair.

---

# 9. Acceptance Criteria

Stage 2 is complete when:

- `.agents/skills/skill-reviewer/SKILL.md` exists
- `description` explains when to use the skill and what it does
- the skill clearly states when not to use it
- the procedure includes reading the target skill before reviewing
- the procedure includes review dimensions
- the procedure includes severity levels
- the procedure includes output contracts
- the procedure includes a review report format
- the procedure separates diagnosis from repair
- the skill remains focused on skill review
- no unrelated harness files are changed

---

# 10. Risks

## R1 — Overengineering

Risk: making `skill-reviewer` too abstract or too long.

Mitigation: keep it focused on actionable skill review.

## R2 — Scope Creep

Risk: implementing future stages while creating the reviewer.

Mitigation: track only Stage 2 in `TASK.md`.

## R3 — Duplicated Global Policy

Risk: copying broad `AGENTS.md` rules into the reviewer.

Mitigation: only include skill-specific operational rules.

## R4 — Reviewer Becomes Repair Engine

Risk: the reviewer starts editing every issue it finds.

Mitigation: diagnose first; repair only when explicitly requested.

---

# 11. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Review Stage 1 standards in `skill-creator`
2. Create `.agents/skills/skill-reviewer/SKILL.md`
3. Verify structure, scope, and parse safety
4. Review diff for accidental scope expansion
5. Decide whether any lessons should be recorded in project memory

---

# 12. Future Roadmap

The broader harness self-maintenance vision remains valid, but later stages remain deferred.

Future stages may include:

- Stage 3: create `harness-repair`
- Stage 4: create maintenance workflow
- Stage 5: create validation scripts
- Stage 6: audit and refactor existing skills
- Stage 7: benchmark context efficiency

Each future stage should receive its own PRD update or separate task plan before implementation.
