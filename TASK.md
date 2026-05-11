# TASK — Stage 3: Harness Repair

## Goal

Create `.agents/skills/harness-repair/SKILL.md` as the canonical guide for diagnosing harness-wide structural issues and planning safe repairs in the `.agents/` harness.

## Execution Rule

Work in stages. Do not implement future roadmap items unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Review Stage 1 `skill-creator`
- [x] Review Stage 2 `skill-reviewer`
- [x] Confirm `.agents/skills/harness-repair/` did not exist
- [x] Update `PRD.md` for Stage 3
- [x] Update this `TASK.md`

## 2. Create `harness-repair`

- [x] Create `.agents/skills/harness-repair/SKILL.md`
- [x] Add valid YAML frontmatter
- [x] Add clear `description`
- [x] Define use cases
- [x] Define non-use cases
- [x] Add diagnostic dimensions
- [x] Add severity and priority levels
- [x] Add output contracts
- [x] Add repair report format
- [x] Add anti-pattern checks
- [x] Add verification checklist

## 3. Scope Control

- [x] Confirm no validation scripts were created
- [x] Confirm no workflow was created
- [x] Confirm no existing skills were repaired during skill creation
- [x] Confirm no full harness audit was performed
- [x] Confirm no unrelated file was changed

## 4. Validation

- [x] Re-read created `harness-repair/SKILL.md`
- [x] Verify frontmatter is parse-safe
- [x] Verify skill stays focused on diagnosis and planning, not mutation
- [x] Verify acceptance criteria from `PRD.md`
- [x] Review diff before completion

## 5. Completion

- [x] Summarize changes
- [x] Record project memory only if a durable decision or lesson emerges
- [x] Ask user whether to test `harness-repair` with a limited diagnostic run

## 6. Follow-up repair from `harness-repair` test

- [x] Test `harness-repair` against `AGENTS.md`, selected skills and workflows
- [x] Keep workflow findings out of this repair cycle
- [x] Refactor `.agents/skills/data-science/SKILL.md` from placeholder to operational skill
- [x] Refactor `.agents/skills/quant/SKILL.md` from placeholder to operational skill
- [x] Preserve boundaries between `ml`, `data-science` and `quant`
- [x] Review diff before completion

---

# Acceptance Checklist

Stage 3 is done only when:

- [x] `.agents/skills/harness-repair/SKILL.md` exists
- [x] the skill defines diagnostic dimensions
- [x] the skill defines output contracts
- [x] the skill defines severity and priority levels
- [x] the skill gives a repair report format
- [x] the skill separates diagnosis, planning and repair
- [x] the skill identifies harness-level anti-patterns
- [x] the skill remains compact and operational
- [x] future stages remain deferred
