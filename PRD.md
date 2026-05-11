# PRD — Stage 6 (Batch 6): Skill Audit and Incremental Refactor

## Project

Evolution of the `Code_IA_SotA` harness through a focused sixth stage (batch 6): refactor `testing-patterns-chat`, `frontend-design`, `realtime-chat-implementation`, `stripe-integration`, `tech-stack-decision` and `vertical-slice-modular-monolith` to add missing operational sections.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (Batches 1-5: skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`) and Stage 8 (`CI integration for harness validation`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds missing operational sections to skills based on validation warnings. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of density thresholds
- compatibility contracts for external platforms

---

# 2. Vision

Add missing operational sections to 6 skills to reduce validation warnings while preserving their domain-specific scope.

Stage 6 (Batch 6) should follow the same pattern as previous batches: add missing sections (Objetivo, Use/Do not use, Output contracts, Procedure, Verification) without changing skill intent.

---

# 3. Problem Statement

The validation command shows that many skills still have missing operational sections.

Current gaps for target skills:

**testing-patterns-chat** (5 warnings):
- Missing: Objetivo, Do not use this skill when, Output contracts, Procedure, Verification

**frontend-design** (4 warnings):
- Missing: Objetivo, Output contracts, Procedure, Verification

**realtime-chat-implementation** (4 warnings):
- Missing: Objetivo, Output contracts, Procedure, Verification

**stripe-integration** (4 warnings):
- Missing: Objetivo, Output contracts, Procedure, Verification

**tech-stack-decision** (4 warnings):
- Missing: Objetivo, Output contracts, Procedure, Verification

**vertical-slice-modular-monolith** (4 warnings):
- Missing: Objetivo, Output contracts, Procedure, Verification

Without refactoring, these skills continue to:

- Generate validation warnings
- Lack clarity on activation and boundaries
- Miss explicit verification criteria
- Have incomplete operational structure

---

# 4. Objective

Add missing operational sections to 6 skills to reduce validation warnings.

The goal is not to rewrite the skills. The goal is to complete their operational structure following the canonical pattern.

---

# 5. Scope

## In Scope

- Read target skills completely
- Add missing sections: Objetivo, Use this skill when, Do not use this skill when, Output contracts, Procedure, Verification
- Preserve existing domain knowledge and scope
- Add skill log entries for changed skills
- Re-run validation to confirm warnings reduced

## Out of Scope

- Refactoring other skills from the validation output
- Changing validation command rules
- Modifying workflows or subagents
- Changing skill intent or scope

---

# 6. Required Refactor Standard

For each skill:

- Add `## Objetivo` section if missing (without emojis to ensure validation recognition)
- Ensure `## Use this skill when` is clear and concrete
- Ensure `## Do not use this skill when` avoids over-triggering
- Add `## Output contracts` when the skill produces deliverables
- Add or complete `## Procedure` with executable steps
- Add `## Verification` checklist
- Add skill log entry documenting the change

---

# 7. Design Constraints

- Preserve domain-specific knowledge.
- Keep changes minimal and surgical.
- Follow the same pattern as Stage 6 previous batches.
- Do not use emojis in section headings (validation does not recognize them).
- Do not expand scope to other skills.

---

# 8. Acceptance Criteria

Stage 6 (Batch 6) is complete when:

- All 6 target skills have been refactored
- Validation command exits `0`
- Target skills no longer emit avoidable operational-section warnings
- No other skills or workflows are modified
- Skill log entries are added

---

# 9. Risks

## R1 — Scope Drift

Risk: Adding sections expands skill beyond original intent.

Mitigation: Preserve existing content; only add missing sections, don't change existing ones.

## R2 — Generic Content

Risk: Added sections become too generic.

Mitigation: Make sections domain-specific based on existing skill content.

## R3 — Emoji Recognition

Risk: Validation does not recognize section headings with emojis.

Mitigation: Use plain headings without emojis (## Objetivo, not ## 🎯 Objetivo).

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Read target skills completely
2. Identify missing operational sections
3. Add missing sections for each skill
4. Add skill log entries
5. Re-run validation and confirm warnings reduced
6. Update project memory if a durable decision emerges

---

# 11. Future Roadmap

Future stages may include:

- additional skill refactor batches based on validation warnings
- Stage 9: automated bloat detection rules
- Stage 10: CI enforcement of density thresholds

Each future stage should receive its own PRD update or separate task plan before implementation.
