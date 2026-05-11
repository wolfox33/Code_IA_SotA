# TASK — Stage 7: Benchmark Context Efficiency

## Goal

Benchmark context efficiency of all skills to produce actionable data for prioritizing bloat reduction efforts.

## Execution Rule

Work in stages. Do not refactor skills based on benchmark data in this stage.

---

# Task Tracker

## 1. Preparation

- [x] Confirm Stage 6 skill audit batch is committed
- [x] Confirm working tree is clean before Stage 7
- [x] Update `PRD.md` for Stage 7
- [x] Update this `TASK.md`

## 2. Data Collection

- [x] List all skills under `.agents/skills/`
- [x] Measure file size for each skill
- [x] Count total lines for each skill
- [x] Count frontmatter lines
- [x] Count procedure lines
- [x] Count reference/asset lines when present

## 3. Analysis

- [x] Calculate density ratios (procedure / total)
- [x] Rank skills by file size
- [x] Rank skills by procedure line count
- [x] Rank skills by density ratio
- [x] Identify top candidates for bloat review

## 4. Documentation

- [x] Document ranked lists
- [x] Add qualitative observations for top candidates
- [x] Propose ongoing metrics
- [x] Avoid modifying skills or workflows
- [x] Update project memory if a durable decision emerges

## 5. Completion

- [x] Summarize findings
- [x] Confirm Stage 7 acceptance checklist
- [x] Suggest commit only after this stage is complete

---

# Benchmark Analysis

## Data Collected

| Skill | Size (bytes) | Lines | Frontmatter | Procedure | Other | Density |
|-------|-------------|-------|-------------|-----------|-------|----------|
| skill-creator | 11752 | 303 | 14 | 175 | 114 | 57.8% |
| backend-resilience-by-design | 10244 | 184 | 16 | 126 | 42 | 68.5% |
| harness-repair | 8201 | 234 | 14 | 105 | 115 | 44.9% |
| skill-reviewer | 7793 | 217 | 14 | 91 | 112 | 41.9% |
| vps-docker-deploy | 3875 | 201 | 19 | 0 | 182 | 0% |
| test-driven-development | 3030 | 87 | 16 | 31 | 40 | 35.6% |
| systematic-debugging | 2635 | 85 | 15 | 34 | 36 | 40.0% |
| verification-before-completion | 2531 | 77 | 15 | 25 | 37 | 32.5% |

## Ranked Lists

### By File Size
1. skill-creator (11752 bytes)
2. backend-resilience-by-design (10244 bytes)
3. harness-repair (8201 bytes)
4. skill-reviewer (7793 bytes)
5. vps-docker-deploy (3875 bytes)
6. test-driven-development (3030 bytes)
7. systematic-debugging (2635 bytes)
8. verification-before-completion (2531 bytes)

### By Procedure Line Count
1. skill-creator (175 lines)
2. backend-resilience-by-design (126 lines)
3. harness-repair (105 lines)
4. skill-reviewer (91 lines)
5. systematic-debugging (34 lines)
6. test-driven-development (31 lines)
7. verification-before-completion (25 lines)
8. vps-docker-deploy (0 lines)

### By Density (Procedure/Total)
1. backend-resilience-by-design (68.5%)
2. skill-creator (57.8%)
3. harness-repair (44.9%)
4. skill-reviewer (41.9%)
5. systematic-debugging (40.0%)
6. test-driven-development (35.6%)
7. verification-before-completion (32.5%)
8. vps-docker-deploy (0%)

## Qualitative Observations

### Top Candidates for Bloat Review

**vps-docker-deploy**
- Density: 0% (no procedure section)
- Size: 3875 bytes, 201 lines
- Issue: Entire content is structured as reference material without operational procedure
- Recommendation: Consider refactoring to separate reference material into `references/` and add minimal procedure or merge into infrastructure pattern reference
- Risk: Low impact if moved to references; currently acts as documentation rather than operational skill

**harness-repair**
- Density: 44.9%
- Size: 8201 bytes, 234 lines
- Issue: High line count with moderate density; output contracts section is long (lines 68-105)
- Recommendation: Consider consolidating output contract templates or moving to references if rarely needed
- Risk: Medium; skill is structural and may need detailed contracts

**skill-reviewer**
- Density: 41.9%
- Size: 7793 bytes, 217 lines
- Issue: Similar to harness-repair; output contracts section (lines 65-103) contributes to bloat
- Recommendation: Consider template simplification or moving example formats to references
- Risk: Medium; skill is diagnostic and may need clear contract examples

### High-Efficiency Skills

**backend-resilience-by-design**
- Density: 68.5%
- Size: 10244 bytes, 184 lines
- Observation: High density despite large size; procedure is substantial and actionable
- Recommendation: Keep as-is; complexity is justified by domain

**systematic-debugging**
- Density: 40.0%
- Size: 2635 bytes, 85 lines
- Observation: Compact and focused; procedure is concise
- Recommendation: Keep as-is; good example of lean skill

## Recommended Ongoing Metrics

1. **Density Threshold**: Flag skills with density < 40% for review
2. **Size Threshold**: Flag skills > 10000 bytes for structural review
3. **Procedure Ratio**: Aim for 50%+ density for operational skills
4. **Reference Separation**: Move non-procedural content > 100 lines to `references/`

## Conclusion

The harness has 8 skills with varying efficiency. Most skills have reasonable density (35-68%). The primary bloat candidate is `vps-docker-deploy`, which lacks a procedure section entirely and functions as reference material. Structural skills (`harness-repair`, `skill-reviewer`) have moderate density due to detailed output contracts, which may be justified for their diagnostic role.

No immediate refactor is required. Future Stage 6 batches can prioritize `vps-docker-deploy` for reference separation if operational procedure is added.

---

# Acceptance Checklist

Stage 7 is done only when:

- [x] all skills have been measured
- [x] file size and line counts are captured
- [x] density ratios are calculated
- [x] ranked lists are produced
- [x] qualitative observations are documented for top candidates
- [x] no skills or workflows are modified
- [x] no subagents or global policy files are changed
- [x] future stages remain deferred
