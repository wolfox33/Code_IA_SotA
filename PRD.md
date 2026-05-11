# PRD — Stage 11: Automated Refactoring Suggestions for Low-Density Skills

## Project

Evolution of the `Code_IA_SotA` harness through Stage 11: add automated refactoring suggestions for low-density skills to guide manual refactoring.

This PRD assumes Stage 1 (`skill-creator`), Stage 2 (`skill-reviewer`), Stage 3 (`harness-repair`), Stage 4 (`harness-maintenance`), Stage 5 (`harness validation command`), Stage 6 (skill audit and incremental refactor), Stage 7 (`benchmark context efficiency`), Stage 8 (`CI integration for harness validation`), Stage 9 (`automated bloat detection rules`) and Stage 10 (`CI enforcement of density thresholds`) are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds automated refactoring suggestions to the CLI. The work can be tracked directly in `TASK.md`.

Create separate specs only if later work introduces:

- automated bulk migration
- generated reports with fixed schema
- CI enforcement of refactoring
- compatibility contracts for external platforms

---

# 2. Vision

Add automated refactoring suggestions to the CLI to guide manual refactoring of low-density skills, making it easier to move reference content to `references/` and increase density.

Stage 11 should add a CLI command that analyzes low-density skills and suggests specific refactoring actions (e.g., "move section X to references/").

---

# 3. Problem Statement

Stage 9 and Stage 10 identified 20 skills with density < 30%, but provided no guidance on how to refactor them.

Without refactoring suggestions:
- Manual refactoring is time-consuming and error-prone
- No clear guidance on what content to move
- Risk of losing valuable reference content
- Difficulty prioritizing which skills to refactor first

---

# 4. Objective

Add automated refactoring suggestions to the CLI to guide manual refactoring of low-density skills.

The goal is to provide actionable suggestions for increasing density without automating the refactoring itself (manual review required).

---

# 5. Scope

## In Scope

- Add CLI command to analyze low-density skills
- Generate specific refactoring suggestions (e.g., "move section X to references/")
- Identify sections with high reference content
- Suggest which skills to refactor first (by lowest density)
- Add documentation for the new command

## Out of Scope

- Automated refactoring (manual review required)
- Moving content automatically
- Changing existing skills without user approval
- CI enforcement of refactoring

---

# 6. Required Implementation Standard

- New CLI command: `npm run suggest:refactor`
- Analyzes skills with density < threshold
- Identifies sections with high reference content (e.g., long lists, external links)
- Suggests specific actions: "move section X to references/"
- Prioritizes by lowest density
- Output format: structured JSON or human-readable

---

# 7. Design Constraints

- Suggestions only, no automated changes
- Manual review required before refactoring
- Preserve existing validation behavior
- No breaking changes to existing CLI

---

# 8. Acceptance Criteria

Stage 11 is complete when:

- CLI command `suggest:refactor` exists
- Command analyzes low-density skills
- Command generates specific refactoring suggestions
- Suggestions are actionable and accurate
- Documentation is updated

---

# 9. Risks

## R1 — Inaccurate Suggestions

Risk: Suggestions may be incorrect or misleading.

Mitigation: Manual review required; suggestions are guidance, not commands.

## R2 — False Positives

Risk: Skills with legitimate low density get refactoring suggestions.

Mitigation: Suggestions are optional; user can ignore if not applicable.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `suggest:refactor`
2. Implement density analysis per skill
3. Implement section analysis to identify reference content
4. Generate specific refactoring suggestions
5. Test with known low-density skills
6. Update documentation

---

# 11. Future Roadmap

Future stages may include:

- Stage 12: Bulk density benchmarking and reporting
- Stage 13: Density trends over time
- Stage 14: Automated refactoring with user approval

Each future stage should receive its own PRD update or separate task plan before implementation.
