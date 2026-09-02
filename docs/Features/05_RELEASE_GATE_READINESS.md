# 🚀 Feature 05: Release Gate & Deployment Sign-Off (`#release`)

The **Release Gate** workspace implements an automated **5-Pillar Sign-Off Engine** evaluating repository health, continuous integration test suites, code coverage thresholds, dependency security, and team PR sign-offs before any code is approved for production deployment.

---

## 🌟 Key Functional Capabilities

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ [Header] Release Gate & Deployment Sign-Off • Score: 78% • CAUTION / REVIEW        │
│ Actions: [📋 Copy Markdown Summary]  [💾 Download JSON Compliance]  [🛡️ Sign Off]   │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [AI Executive Release Verdict (POST /api/ai/release-readiness)]                    │
│ "Release readiness: 78%. One high-severity vulnerability in jsonwebtoken@8.5.1 and │
│ 1 missing peer approval prevent green status. Remediate blockers to ship."         │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [5-Pillar Scorecard Grid]                                                          │
│ [Tests Passing: 100% (25% weight)]      [Code Coverage: 82% (20% weight)]          │
│ [Security: 1 High CVE (25% weight)]     [PR Approvals: 1/2 (15% weight)]           │
│ [Branch Freshness: 3 Behind (15% weight)]                                          │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Active Deployment Blockers (2 Blockers)]                                          │
│ • CVE-2026-8819 in jsonwebtoken@8.5.1               [🛠️ Remediate with Byte]        │
│ • 1 peer approval required from lead reviewer       [🛠️ Remediate with Byte]        │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. The 5 Evaluated Release Pillars (`releaseReadiness.ts`)

| Pillar ID | Pillar Name | Weight | Evaluation Criteria | Target Standard | Blocker Condition |
| :--- | :--- | :---: | :--- | :--- | :--- |
| `testsPassing` | **Tests Passing** | **25%** | CI/CD test suite pass rate | 100% passing | Any failing test suite or compilation error |
| `coverage` | **Code Coverage** | **20%** | Line coverage percentage | ≥ 80% line coverage | Line coverage < 60% |
| `vulnerabilities`| **Vulnerability Count** | **25%** | Dependency CVE scan count | 0 High/Critical CVEs | ≥ 1 High or Critical CVE |
| `prApprovals` | **PR Approvals** | **15%** | Verified peer review approvals | ≥ 2 Peer Approvals | Unresolved review change requests |
| `branchFreshness`| **Branch Freshness**| **15%** | Commits behind upstream main | 0 commits behind | > 5 commits behind or merge conflicts |

---

## 2. Readiness Scoring & Status Classification

The overall release score is computed as a weighted sum across all 5 pillars:

$$\text{Overall Score} = (S_{\text{tests}} \times 0.25) + (S_{\text{cov}} \times 0.20) + (S_{\text{vuln}} \times 0.25) + (S_{\text{pr}} \times 0.15) + (S_{\text{fresh}} \times 0.15)$$

### Status Classification:
* **Ready to Ship (`green`, Score ≥ 80%, 0 Blockers)**: All criteria met; `canShip: true`. The Authorize Production Ship button is armed.
* **Caution / Review (`amber`, Score 60–79%, 0 Blockers)**: Non-blocking warnings exist; requires release engineer review.
* **Blocked (`red`, Score < 60% or ≥ 1 Blocker)**: Hard blocker detected; production deployment prohibited.

---

## 3. AI Executive Release Synthesis (`POST /api/ai/release-readiness`)

The backend synthesizes a high-level executive report using Google Gemini:
* **Headline**: Concise 1-line verdict (e.g. *"Release readiness: 78%. One high-severity vulnerability prevents green status."*).
* **Executive Summary**: 2-sentence release risk and sign-off recommendation.
* **canShip**: Boolean release gate permission.
* **Blocker Inventory**: List of specific blocker strings requiring resolution.

---

## 4. Active Blocker Remediation

* **Explicit Inventory**: Identifies every blocker preventing green release status.
* **Remediate with Byte**: Click **Remediate with Byte** next to any blocker to open the companion chat with pre-populated remediation commands.

---

## 5. Compliance Artifact Export & Sign-Off

* **Copy Markdown Summary**: Copies a structured Markdown release audit report directly to the clipboard.
* **Download JSON Compliance Artifact**: Downloads a machine-readable JSON file (`release-readiness-[repo]-[timestamp].json`) for automated compliance audits.
* **Authorize Production Ship Action**: Confirms verified release sign-off and dispatches deployment workflows.
