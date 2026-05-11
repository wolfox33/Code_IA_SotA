# TASK — Stage 24: Harness Evolutionary Governance

This task tracks implementation of Stage 24 as defined in `PRD-v2.md`.

---

# 1. Preparation

- [x] Create PRD-v2 for Stage 24
- [x] Create this TASK-v2.md

---

# 2. Implementation

## 2.1 AGENTS.md Budget and Split Guidelines

- [ ] Define AGENTS.md budget: 300-500 lines maximum
- [ ] Add budget guideline to AGENTS.md
- [ ] Add budget guideline to README
- [ ] Define split criteria when budget exceeded
- [ ] Define where to move content (skills/workflows/references)
- [ ] Add CLI command to check AGENTS.md line count

## 2.2 Reference Granularity Rules

- [ ] Define reference granularity: 1 topic per file
- [ ] Define max size per reference file (50-100 lines)
- [ ] Add granularity rules to README
- [ ] Add granularity rules to skill-creator
- [ ] Add CLI validation to detect reference monoliths
- [ ] Add warning for oversized reference files

## 2.3 Override Hierarchy

- [ ] Define override hierarchy: AGENTS.md > skill > workflow > subagent
- [ ] Document override hierarchy in AGENTS.md
- [ ] Document override hierarchy in README
- [ ] Add examples of conflict resolution
- [ ] Add CLI validation to check for conflicts

## 2.4 Expanded Lifecycle

- [ ] Add experimental state to lifecycle
- [ ] Define semantics for experimental state
- [ ] Update CLI skill:lifecycle to show experimental
- [ ] Document lifecycle states in README
- [ ] Define transition rules between states
- [ ] Update skill-creator to support experimental status

## 2.5 Harness Maintenance Workflow

- [ ] Review existing harness-maintenance.md workflow
- [ ] Define execution triggers (monthly, after N changes, manual)
- [ ] Define workflow steps for skill-reviewer
- [ ] Define workflow steps for harness-repair
- [ ] Add CLI command to trigger maintenance workflow
- [ ] Test maintenance workflow execution

## 2.6 CLI Governance Commands

- [ ] Add CLI command to check AGENTS.md budget
- [ ] Add CLI command to check reference granularity
- [ ] Add CLI command to detect skill overlap
- [ ] Add CLI command to show activation frequency
- [ ] Add CLI command to run governance checks
- [ ] Test all governance CLI commands

---

# 3. Validation

## 3.1 AGENTS.md Budget Validation

- [ ] Confirm AGENTS.md is within budget (300-500 lines)
- [ ] Confirm split guidelines are clear
- [ ] Test CLI command to check budget
- [ ] Verify budget warning triggers correctly

## 3.2 Reference Granularity Validation

- [ ] Confirm reference files follow granularity rules
- [ ] Test CLI validation detects oversized references
- [ ] Verify warning triggers correctly
- [ ] Confirm no reference monoliths exist

## 3.3 Override Hierarchy Validation

- [ ] Confirm override hierarchy is documented
- [ ] Test CLI validation detects conflicts
- [ ] Verify examples are clear
- [ ] Confirm hierarchy is consistent

## 3.4 Lifecycle Validation

- [ ] Confirm experimental state is documented
- [ ] Test CLI shows experimental skills
- [ ] Verify transition rules are clear
- [ ] Confirm skill-creator supports experimental

## 3.5 Maintenance Workflow Validation

- [ ] Confirm workflow is operational
- [ ] Test workflow execution
- [ ] Verify skill-reviewer integration
- [ ] Verify harness-repair integration
- [ ] Confirm triggers work correctly

## 3.6 CLI Commands Validation

- [ ] Test all governance CLI commands
- [ ] Verify commands produce correct output
- [ ] Confirm commands integrate with validation
- [ ] Verify error handling works correctly

---

# 4. Completion

- [ ] Update project memory if durable decisions emerge
- [ ] Confirm Stage 24 acceptance checklist
- [ ] Suggest commit only after this stage is complete

---

# Acceptance Checklist

Stage 24 is done only when:

- [ ] AGENTS.md budget defined and documented (300-500 lines)
- [ ] Reference granularity rules defined and enforced
- [ ] Override hierarchy documented in AGENTS.md and README
- [ ] Lifecycle expanded with experimental state
- [ ] Harness maintenance workflow operationalized
- [ ] CLI commands for governance checks exist
- [ ] Documentation updated (README, AGENTS.md)
- [ ] All validation checks pass
