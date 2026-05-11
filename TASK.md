# TASK — Stage 1: Canonical Skill Creator

## Goal

Refactor `.agents/skills/skill-creator/SKILL.md` into the canonical guide for creating, modifying, and maintaining skills in the `.agents/` harness.

## Execution Rule

Work in stages. Do not implement future roadmap items unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Review current `PRD.md`
- [x] Review current `.agents/skills/skill-creator/SKILL.md`
- [x] Narrow PRD scope to Stage 1
- [x] Create this `TASK.md`

## 2. Refactor `skill-creator`

- [x] Preserve valid YAML frontmatter
- [x] Improve `description` if needed
- [x] Clarify use cases
- [x] Clarify non-use cases
- [x] Add explicit quality bar
- [x] Add output contracts
- [x] Add parse-safe rules
- [x] Add modularity rules
- [x] Add anti-pattern checks
- [x] Strengthen verification checklist
- [x] Preserve existing useful guidance
- [x] Preserve `Skill log`

## 3. Scope Control

- [x] Confirm no `skill-reviewer` was created
- [x] Confirm no `harness-repair` was created
- [x] Confirm no validation scripts were created
- [x] Confirm no workflow was created
- [x] Confirm no unrelated file was changed

## 4. Validation

- [x] Re-read updated `SKILL.md`
- [x] Verify frontmatter remains parse-safe
- [x] Verify skill stays focused on skill creation/modification
- [x] Verify acceptance criteria from `PRD.md`
- [x] Review diff before completion

## 5. Completion

- [x] Summarize changes
- [x] Record project memory only if a durable decision or lesson emerges
- [x] Ask user whether to proceed to a real test iteration or future Stage 2

---

# Acceptance Checklist

Stage 1 is done only when:

- [x] `.agents/skills/skill-creator/SKILL.md` remains the only harness behavior artifact changed during implementation
- [x] the skill defines what a good skill is
- [x] the skill defines output contracts
- [x] the skill gives concrete parse-safe rules
- [x] the skill explains where content belongs in the harness
- [x] the skill identifies common skill anti-patterns
- [x] the skill remains compact and operational
- [x] future stages remain deferred
