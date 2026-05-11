# TASK — Stage 2: Skill Reviewer

## Goal

Create `.agents/skills/skill-reviewer/SKILL.md` as the canonical guide for reviewing existing skills in the `.agents/` harness.

## Execution Rule

Work in stages. Do not implement future roadmap items unless explicitly requested.

---

# Task Tracker

## 1. Preparation

- [x] Review Stage 1 `skill-creator`
- [x] Confirm `.agents/skills/skill-reviewer/` did not exist
- [x] Update `PRD.md` for Stage 2
- [x] Update this `TASK.md`

## 2. Create `skill-reviewer`

- [x] Create `.agents/skills/skill-reviewer/SKILL.md`
- [x] Add valid YAML frontmatter
- [x] Add clear `description`
- [x] Define use cases
- [x] Define non-use cases
- [x] Add review dimensions
- [x] Add severity levels
- [x] Add output contracts
- [x] Add review report format
- [x] Add anti-pattern checks
- [x] Add verification checklist

## 3. Scope Control

- [x] Confirm no `harness-repair` was created
- [x] Confirm no validation scripts were created
- [x] Confirm no workflow was created
- [x] Confirm no existing skills were modified by the reviewer stage
- [x] Confirm no unrelated file was changed

## 4. Validation

- [x] Re-read created `skill-reviewer/SKILL.md`
- [x] Verify frontmatter is parse-safe
- [x] Verify skill stays focused on review, not repair
- [x] Verify acceptance criteria from `PRD.md`
- [x] Review diff before completion

## 5. Completion

- [x] Summarize changes
- [x] Record project memory only if a durable decision or lesson emerges
- [x] Ask user whether to test `skill-reviewer` on an existing skill

---

# Acceptance Checklist

Stage 2 is done only when:

- [x] `.agents/skills/skill-reviewer/SKILL.md` exists
- [x] the skill defines review dimensions
- [x] the skill defines output contracts
- [x] the skill defines severity levels
- [x] the skill gives a review report format
- [x] the skill separates diagnosis from repair
- [x] the skill identifies common skill anti-patterns
- [x] the skill remains compact and operational
- [x] future stages remain deferred
