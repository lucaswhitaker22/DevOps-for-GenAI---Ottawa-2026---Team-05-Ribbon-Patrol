# 🛡️ Feature 06: Risk Scorecard & Health Pool (`#risk`)

The **Risk Scorecard & Health Pool** workspace provides a granular, deterministic breakdown of your repository's overall health across 7 weighted DevSecOps dimensions, mapping risks directly into Byte's Health Pool (0–100 HP).

---

## 🌟 Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] 7-Factor Repository Risk Scorecard • Attention (68% HP)               |
| Actions: [📋 Copy Scorecard]                                                   |
+--------------------------------------------------------------------------------+
| [Repository Health Pool Gauge]                                                 |
| 68 / 100 HP  [=======================-----------------]                        |
+--------------------------------------------------------------------------------+
| [Filter Tabs] (•) All Factors (7)  ( ) Hazards (0)  ( ) Warnings (3)  ( ) Healthy|
+--------------------------------------------------------------------------------+
| [Factor Cards Grid]                                                            |
| • Branch Divergence & Drift (-15 pts) [Warning]                                |
| • Failed & Flaky Tests (0 pts) [Healthy]                                       |
| • Secrets & Security Policies (0 pts) [Healthy]                                |
| • Open Vulnerabilities (-10 pts) [Warning]                                     |
| • Code Smells & Debt (-6 pts) [Warning]                                        |
| • Unreviewed Commits & PR Review Lag (0 pts) [Healthy]                         |
| • Large PR Size (0 pts) [Healthy]                                              |
+--------------------------------------------------------------------------------+
```

### 1. The 7-Factor Risk Scoring Architecture

GitPet implements an automated, multi-factor risk assessment model defined in `computeRepositoryHealth()`:

| Factor ID | Risk Factor Name | Impact Range | Status Criteria | Remediation Strategy |
| :--- | :--- | :--- | :--- | :--- |
| `branch_divergence` | **Branch Divergence & Drift** | 0 to -35 pts | `critical` if >= 6 behind, `warning` if > 0 behind, `good` if 0 | Pull upstream commits into local branch using `git pull --rebase origin main` |
| `failed_tests` | **Failed & Flaky Tests** | 0 to -28 pts | `critical` if build failed or pod crashed; `warning` if flaky specs detected | Quarantine flaky specs or inspect container build logs |
| `secrets_detected` | **Secrets & Security Policies** | 0 to -30 pts | `critical` if anonymous storage access or exposed API tokens found | Revoke compromised tokens and enforce cloud security policies |
| `vulnerabilities` | **Open Vulnerabilities** | 0 to -22 pts | `critical` if high/critical CVEs exist; `warning` if low/medium | Bump dependencies using automated Dependabot patches |
| `code_smells` | **Code Smells & Debt** | 0 to -15 pts | `warning` if > 8 uncommitted files or excessive TODO tags | Stage and commit in small, focused atomic commits |
| `unreviewed_commits` | **Unreviewed Commits & PR Lag**| 0 to -15 pts | `warning` if review changes requested or waiting > 3 days | Address reviewer comments and request team re-review |
| `large_pr_size` | **Large PR Size & Blast Radius** | 0 to -12 pts | `warning` if changeset > 400 lines or > 15 files | Split changeset into stacked pull requests to speed up reviews |

---

### 2. Health Score Aggregation Formula

The Health Pool score is computed dynamically:
$$\text{Calculated Score} = \max\left(0, 100 - \sum \text{Deductions}\right)$$

#### Classification Thresholds:
* **Healthy (90–100% HP, Low Risk)**: All 7 factors in `good` standing. Green ambient glow.
* **Attention (60–89% HP, Moderate Risk)**: Minor divergence, uncommitted churn, or small PR review delay. Amber aura.
* **Blocked (30–59% HP, High Risk)**: Active merge conflicts, failed build, or test deduction >= 25. Orange aura.
* **Critical Hazard (0–29% HP, Critical Risk)**: Work-loss hazard, destructive upstream force-push, or score drops to 0. Grayed out turtle posture.

---

### 3. Interactive Category Filters
* **All Factors**: Displays the full 7-factor diagnostic matrix.
* **Critical Hazards**: Isolates high-risk blockers requiring emergency intervention.
* **Warnings**: Filters for medium-severity items (e.g. branch drift, uncommitted files).
* **Healthy**: Displays green factors currently satisfying repository hygiene standards.

---

### 4. 1-Click Remediation Deep Links
* Clicking **Remediate with Byte** on any factor card opens the companion chat with a pre-populated prompt asking Byte for exact shell commands to remediate that specific factor.

---

### 5. Formatted Scorecard Export
* Clicking **Copy Scorecard** copies the complete structured diagnostic assessment to the clipboard for standup notes, incident reports, or team reviews.
