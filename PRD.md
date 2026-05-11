# PRD — Stage 23: Skill Lifecycle Management

## Project

Evolution of the `Code_IA_SotA` harness through Stage 23: add skill lifecycle management to track skill status, usage, and deprecation.

This PRD assumes Stages 1-22 are complete.

---

# 1. Decision on Specs

Separate specs are not required for this stage.

This stage adds skill lifecycle management. The work can be tracked directly in `TASK.md`.

---

# 2. Vision

Add skill lifecycle management to track skill status, usage, and deprecation, enabling systematic skill maintenance and cleanup.

Stage 23 should add a CLI command to manage skill lifecycle (active, deprecated, archived) and track skill metadata.

---

# 3. Problem Statement

No systematic way to track skill lifecycle, usage patterns, or deprecation status. Skills may become obsolete without clear deprecation process.

Without lifecycle management:
- No clear skill status tracking
- Difficult to identify obsolete skills
- No deprecation process
- Unclear skill ownership

---

# 4. Objective

Add skill lifecycle management to track skill status, usage, and deprecation.

The goal is to provide systematic skill lifecycle tracking and management.

---

# 5. Scope

## In Scope

- Add CLI command `skill:lifecycle` to manage skill status
- Track skill status (active, deprecated, archived)
- Add skill metadata (owner, created date, last updated)
- Add deprecation process
- Generate lifecycle report

## Out of Scope

- Automated skill deletion
- Complex usage analytics
- Skill dependency tracking
- Automated archiving

---

# 6. Required Implementation Standard

- CLI command: `npm run skill:lifecycle`
- Status tracking in frontmatter
- Metadata fields in frontmatter
- Deprecation notice in skill content
- Lifecycle report generation

---

# 7. Design Constraints

- Frontmatter-based status tracking
- Manual status changes
- No automated deletion
- Preserve existing skills

---

# 8. Acceptance Criteria

Stage 23 is complete when:

- CLI command `skill:lifecycle` exists
- Status tracking in frontmatter
- Metadata fields added
- Deprecation process defined
- Lifecycle report generated
- Documentation is updated

---

# 9. Risks

## R1 — Incorrect Status Changes

Risk: Incorrect status changes may affect skill availability.

Mitigation: Manual status changes; confirmation required; clear status definitions.

## R2 — Metadata Inconsistency

Risk: Metadata may become inconsistent across skills.

Mitigation: Standardized metadata fields; validation; manual review.

---

# 10. Execution Plan

Execution is tracked in `TASK.md`.

High-level sequence:

1. Add CLI command `skill:lifecycle`
2. Implement status tracking in frontmatter
3. Add metadata fields
4. Implement deprecation process
5. Generate lifecycle report
6. Test with skill status changes
7. Update documentation

---

# 11. Future Roadmap

No future stages defined. This concludes the density enforcement and refactoring roadmap.

Each future stage should receive its own PRD update or separate task plan before implementation.
