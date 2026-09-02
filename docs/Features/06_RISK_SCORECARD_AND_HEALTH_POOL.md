# 🛡️ Feature 06: Risk Scorecard & Health Pool (`#risk`)

The **Risk Scorecard & Health Pool** workspace provides a granular, deterministic breakdown of your repository's overall health across 7 weighted DevSecOps dimensions, mapping risks directly into Byte's Health Pool (0–100 HP).

---

## 🌟 Key Functional Capabilities

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ [Header] 7-Factor Repository Risk Scorecard • Attention (68 HP / 100 HP)           │
│ Actions: [📋 Copy Scorecard Assessment]                                            │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Repository Health Pool Gauge]                                                     │
│ 68 / 100 HP  [=======================-----------------] Moderate Risk              │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Filter Tabs] (•) All Factors (7)   ( ) Hazards (0)   ( ) Warnings (3)   ( ) Healthy│
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Factor Cards Grid]                                                                │
│                                                                                    │
│ ⚠️ 1. Branch Divergence & Drift (-15 pts) [Warning]                                │
│    3 commits behind upstream tracking branch. Stash before sync.                   │
│    [🛠️ Remediate with Byte]                                                        │
│                                                                                    │
│ ✓  2. Failed & Flaky Tests (0 pts) [Healthy]                                       │
│    All CI/CD test suites and build checks passed cleanly.                          │
│                                                                                    │
│ ✓  3. Secrets & Security Policies (0 pts) [Healthy]                                │
│    No plaintext secrets or permissive storage policies detected.                   │
│                                                                                    │
│ ⚠️ 4. Open Vulnerabilities (-12 pts) [Warning]                                     │
│    1 dependency vulnerability flagged in package-lock.json.                        │
│    [🛠️ Remediate with Byte]                                                        │
│                                                                                    │
│ ⚠️ 5. Code Smells & Debt (-6 pts) [Warning]                                        │
│    2 uncommitted files in working tree — moderate context switching risk.          │
│    [🛠️ Remediate with Byte]                                                        │
│                                                                                    │
│ ✓  6. Unreviewed Commits & PR Lag (0 pts) [Healthy]                                │
│    All active branch changes have peer reviews and approvals.                      │
│                                                                                    │
│ ✓  7. Large PR Size (0 pts) [Healthy]                                              │
│    PR size is small and easy to review (< 300 lines changed).                      │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 7-Factor Risk Scoring Architecture

GitPet computes repository health dynamically using `computeRepositoryHealth()`:

| Factor ID | Risk Factor Name | Max Impact | Status Criteria & Triggers | Recommended Remediation |
| :--- | :--- | :---: | :--- | :--- |
| `branch_divergence` | **Branch Divergence** | **-35 pts** | Hazard: -35 | Conflicts: -25 | Detached: -18 | Behind+Dirty: -22 | Behind: -15 | Ahead: -10 | Fast-forward pull, rebase, or stash |
| `failed_tests` | **Failed & Flaky Tests** | **-28 pts** | Deployment crash: -28 | Build fail: -25 | Flaky suite: -14 | Fix compilation errors / quarantine flaky specs |
| `secrets_detected` | **Secrets & Security Policies** | **-30 pts** | Public cloud bucket: -30 | Leaked secret: -15/each | Revoke tokens & enforce private cloud policies |
| `vulnerabilities` | **Open Vulnerabilities** | **-22 pts** | High/Critical CVE: -22 | Low/Medium: -12 | Bump dependencies with automated patches |
| `code_smells` | **Code Smells & Debt** | **-15 pts** | High smell count: -15 | Dirty sprawl (>8 files): -6 | Stage and commit in small atomic units |
| `unreviewed_commits`| **Unreviewed Commits & PR Lag**| **-15 pts** | Changes requested: -15 | Stale PR (>3 days): -10 | Address review comments & nudge reviewers |
| `large_pr_size` | **Large PR Size** | **-8 pts** | Changeset > 400 lines or > 15 files: -8 | Split into smaller stacked PRs |

---

## 2. Health Score Aggregation Formula

The Health Pool score is calculated by subtracting total deductions from base 100:

$$\text{Health Score} = \max\left(0, \min\left(100, 100 - \sum \text{Deductions}\right)\right)$$

### Health Level Classifications:
* **Healthy (80–100 HP, Low Risk)**: All 7 factors in `good` standing. Green ambient glow.
* **Attention (45–79 HP, Moderate Risk)**: Minor divergence, uncommitted churn, or PR review lag. Amber warning aura.
* **Blocked (1–44 HP, High Risk)**: Active merge conflicts, failed builds, or high-severity CVEs. Crimson alert barrier.
* **Unsafe / Hazard (0 HP, Critical Risk)**: Work-loss hazard (upstream force-push over dirty tree). Frozen grayscale state.

---

## 3. Interactive Category Filters

* **All Factors (7)**: Displays the full 7-factor diagnostic scorecard.
* **Hazards (Critical)**: Isolates high-risk blockers requiring emergency developer intervention.
* **Warnings**: Filters for medium-severity items (e.g. branch drift, uncommitted files, PR lag).
* **Healthy**: Displays green factors currently satisfying repository hygiene standards.

---

## 4. 1-Click Remediation Deep Links

Clicking **Remediate with Byte** on any factor card opens the companion chat stream with a pre-populated prompt asking Byte for step-by-step shell commands to resolve that specific factor.

---

## 5. Formatted Scorecard Export

Clicking **Copy Scorecard Assessment** copies the complete structured diagnostic report to the clipboard for standup notes, incident triage, or release audits.
