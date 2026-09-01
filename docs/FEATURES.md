
# 01_AMBIENT_COMPANION

---

# ðŸ• Feature 01: Ambient Companion (`#companion`)

The **Ambient Companion** workspace represents the emotional and operational mission control center of GitPet. It translates cold Git and infrastructure telemetry into expressive physical postures, ambient lighting auras, interactive sound cues, and multi-turn conversational guidance powered by Google Gemini.

---

## ðŸŒŸ Key Functional Capabilities

```
+------------------------------------+-------------------------------------------+
| [ðŸ• Pixel Mascot Canvas]           | [Multi-Turn Gemini Companion]             |
| Status: Attention â€¢ Uneasy & Alert | Role: Byte Mascot | Architect | Auditor   |
| Health: 68% HP [========------]    | Model: Fast | General | Deep Reasoning    |
| Speech: "Behind remote by 3!"      |                                           |
| Actions: [ðŸ¾ Pet] [â˜• Fuel] [ðŸ’¬ Ask]| "Hello! I'm Byte. Behind by 3 commits.    |
|                                    | Stash your work before pulling!"          |
+------------------------------------+-------------------------------------------+
| [4-Card Live Telemetry Quick Deck] | [Recommended Safe Action Card]            |
| ðŸŒ² Branch Drift  | âš¡ CI/CD Health  | Command: `git stash && git pull ...`      |
| ðŸ”€ PR Intelligence | ðŸš€ Release Gate| [Preview Diff]  [Confirm Safe Fix]        |
+------------------------------------+-------------------------------------------+
```

### 1. Pixel Mascot Graphic & 18 Symptom Auras (`PixelPetGraphic.tsx`)
Byte dynamically maps repository health and DevSecOps events into 18 physical symptom states:

| Symptom Key | Trigger Condition | Visual Appearance & Aura | Emotional Mood |
| :--- | :--- | :--- | :--- |
| `healthy` | 100% synchronized, clean working tree | Smiling expression, green halo glow | Relaxed & Playful |
| `behind_remote` | Commits behind upstream origin | Backpack posture, looking over shoulder | Uneasy & Alert |
| `local_uncommitted` | Modified or untracked files in tree | Carrying stacked papers, amber aura | Busy & Watchful |
| `conflict` | Unresolved merge conflict markers | Tangled in yarn ball, spiral eyes | Distressed & Tangled |
| `hazard_unsafe` | Work-loss hazard (pulling over dirty tree) | Shielded turtle shell, grayscale contrast | Guarded & Defensive (0% HP) |
| `failed_build` | CI/CD build step exited with non-zero | Sick thermometer expression, fever blush | Distressed & Ill |
| `flaky_tests` | Intermittent test failures in spec suites | Dizzy eyes, spinning stars | Confused & Dizzy |
| `vulnerability` | High/critical CVEs in dependencies | Defective armor shield, pulsing beacon | Shielded & Cautious |
| `pr_changes_requested` | Reviewer requested code changes | Holding notepad and pencil | Patient & Waiting |
| `pr_pending_review` | PR waiting on approvals | Looking at hourglass | Patient |
| `pr_conflicted` | PR branch conflicts with base | Tangled ribbon | Blocked |
| `pr_approved` | All PR checks green & approvals met | Party hat, celebration sparkles | Joyful & Triumphant |
| `lost_map` | Terraform state backend lock unavailable | Broken compass, lost expression | Disoriented |
| `smoke_cloud` | Kubernetes pod crash or missing env vars | Coughing expression, smoke cloud | Choked & Alarmed |
| `shield_cracked` | Cloud security policy deviation | Shattered blue shield | Security Alert |

#### Autonomous Physical Loops:
* **Natural Blinking**: Eyes automatically blink every 3.2 to 5.2 seconds with a 160ms animation window.
* **Cursor Tracking**: Mascot pupils and head position follow mouse coordinates across the container (`handleMouseMove`).
* **Grayscale Safety Interlock**: If health drops to `0%` or status is `Unsafe`, the pet automatically desaturates to indicate high danger.

---

### 2. Interactive Action Dock

Located directly at the base of the avatar canvas:
* **ðŸ¾ Pet Mascot (`Spacebar`)**: Synthesizes purring audio, produces floating heart particles, and boosts mascot mood.
* **â˜• Fuel Mascot**: Hands Byte a steaming coffee mug, playing coffee slurping audio and applying a `+100 Energy` boost.
* **ðŸŽ© Outfit Customizer**: Cycles through wearable accessories:
  * *Classic Bot* (Standard pixel mascot)
  * *Dev Headphones* (Noise-canceling gaming headset)
  * *AR Cyber Visor* (Neon cybernetic sunglasses)
  * *Hot Coffee Mug* (Handheld thermal mug)
  * *Patrol Badge* (Ribbon DevSecOps gold star badge)
  * *Git Wizard Hat* (Pointed magical hat)
* **ðŸ’¬ Ask Quip**: Prompts Byte to cycle through quick developer pro-tips regarding atomic commits, linear history, and stash hygiene.

---

### 3. Live Telemetry Mission Control Quick Deck

Directly underneath the mascot stage, 4 interactive telemetry cards provide real-time status and instant navigation into full pages:
1. **ðŸŒ² Branch Drift & Tree**: Displays `â†‘ ahead` / `â†“ behind` commit counts and dirty file counts. Clicking navigates to `#repository`.
2. **âš¡ Pipeline & Test Health**: Displays CI build pass/fail status, test pass rate %, and open CVE count. Clicking navigates to `#cicd`.
3. **ðŸ”€ PR Intelligence**: Displays active PR number, review state, and reviewer waiting days. Clicking navigates to `#pr`.
4. **ðŸš€ Release Gate**: Displays 5-pillar deployment readiness score % and ship gate sign-off status. Clicking navigates to `#release`.

---

### 4. Multi-Turn Gemini Conversational Stream (`ChatStream.tsx`)

A dedicated conversational stream providing evidence-based repository advice and verified safe Git actions:

* **Role Personas**:
  * **Byte Mascot**: Friendly, encouraging, ambient companion with witty developer humor.
  * **Senior Architect**: Deep DAG topology, merge-base analysis, and long-term branching strategies.
  * **Safety Auditor**: Zero data loss compliance, strict reversal commands, and blast radius auditing.
  * **Git Tutor**: Pedagogical mental models explaining Git internals (blobs, trees, commit objects, index).
* **Model Speed & Depth Tiers**:
  * **Fast**: Instant responses powered by `gemini-2.5-flash`.
  * **General**: Balanced latency and reasoning depth.
  * **Deep Reasoning**: Complex structural analysis powered by `gemini-2.5-pro`.
* **Evidence Signals Box**: Every diagnosis cites concrete repository data points (current branch, upstream divergence, dirty file list, conflicting markers).
* **Recommended Safe Action Card**:
  * Formats verified shell commands with syntax highlighting.
  * 1-Click terminal copy button with visual confirmation.
  * Displays expected outcome and pre-computed safe reversal command.
  * **Preview Diff & Scope Button**: Opens the human-in-the-loop preview confirmation modal.
  * **Confirm & Execute Button**: Executes the verified bounded action.
* **Categorized Prompt Chips**: Instant 1-click prompts for common developer questions:
  * `ðŸ“Š Status report & diagnostics`
  * `ðŸš¨ Work-loss risk assessment`
  * `ðŸŒ² Explain branch divergence`
  * `ðŸ”€ Review PR & reviewer feedback`
  * `âš¡ CI/CD test failure diagnosis`

---

### 5. Scenario Switcher & Anomaly Sandbox (`ScenarioSwitcher.tsx`)
* **Dual Operating Mode Toggle**: Toggle between pre-configured incident presets and your real local workspace.
* **18 Incident Scenarios**: Grouped by Git Workflows, CI/CD Pipelines, PR Reviews, and Cloud Infrastructure.
* **Quick Anomaly Injectors**:
  * `+1 Remote`: Adds an upstream commit to origin without pulling, immediately triggering branch drift.
  * `+1 Edit`: Creates an uncommitted modification in the working tree, testing dirty tree handling.
  * `Conflict`: Simulates merge conflict markers in active files.
  * `Clean`: Resets repository state to a clean 100% health baseline.

---

### 6. Web Audio API Ambient Sound Engineering (`audioEffects.ts`)
GitPet features zero-dependency, synthesized audio effects via the browser's native `AudioContext`:
* `playPetChirpSound()`: Ascending two-tone chirp (523Hz -> 659Hz) on mascot interaction.
* `playPurrSound()`: Modulated low-frequency vibrato (120Hz carrier with 25Hz AM) while being petted.
* `playCoffeeSlurpSound()`: Pitch slide liquid resonance simulating coffee drinking.
* `playAccessoryEquipSound()`: High chime (880Hz) on equipping hats or accessories.
* `playSyncSuccessSound()`: C-Major chord arpeggio (C5 -> E5 -> G5) on verified safe synchronization.
* `playConflictAlertSound()`: Dissonant warning tritone alert (440Hz + 622Hz) on conflict detection.
* **Persistent Mute Toggle**: State preserved in global header controls.


# 02_REPOSITORY_AND_DAG_GRAPH

---

# ðŸŒ² Feature 02: Repository Details & DAG Graph (`#repository`)

The **Repository Details & DAG Graph** workspace provides a full-page, multi-tab environment for deep repository inspection, multi-lane topological lineage analysis, syntax-highlighted diffs, and stash management.

---

## ðŸŒŸ Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] Repository Details & DAG Graph â€¢ feature/cart â€¢ 0 ahead | 3 behind   |
| [Tabs] (â€¢) Interactive DAG Graph  ( ) Working Tree & Diffs (2)  ( ) Stashes (1)|
+--------------------------------------------------------------------------------+
| [Interactive SVG Multi-Lane DAG Visualizer]                                    |
| [HEAD]  commit e4f29a (feature/cart)                                          |
|   | \                                                                          |
|   |  *  commit c1b802 (origin/main)                                           |
|   |  *  commit a991fc                                                         |
|   | /                                                                          |
| [*]     commit 87bc41 (Merge Base)                                            |
+--------------------------------------------------------------------------------+
```

### 1. Interactive Multi-Lane DAG Visualizer (`GitDagVisualizer.tsx`)
* **SVG Commit Graph**: Renders commit lineage across parallel visual lanes:
  * **Main Trunk Lane**: Tracks upstream origin commits.
  * **Local Feature Lane**: Tracks local branch commits.
  * **Secondary Lanes**: Tracks diverged branches and forks.
* **Commit Roles & Nodes**:
  * `HEAD`: The currently checked-out commit pointer.
  * `local_ahead`: Commits present locally but not yet pushed to origin.
  * `remote_behind`: Upstream commits not yet merged or rebased into local.
  * `merge_base`: The most recent common ancestor between local and remote.
  * `fork_point`: Where feature branch diverged from main.
  * `conflicted`: Commits containing active file conflict markers.
* **Interactive Commit Inspector**:
  * Click any commit node in the graph to view full commit details: short hash, author name, commit message, parent hashes, and relative timestamp.
* **Legend Badges**: Header legend clearly indicates local ahead counts (`â†‘X`) and origin behind counts (`â†“Y`).

#### SVG Coordinate & Topology Layout Engine:
* Computes lane indices based on branch topology (Lane 0: main/upstream trunk; Lane 1: feature branches; Lane 2: fork branches).
* Connects parent-child commit nodes with cubic bezier spline paths (`M x1 y1 C x1 yMid, x2 yMid, x2 y2`) to produce smooth visual branch curves.
* Animates node pulsing for `HEAD` and highlights merge base nodes with double-ring SVG strokes.

---

### 2. Working Tree & Side-by-Side Diffs (`DiffViewer.tsx`)
* **File Search Filter**: Search through dirty working tree changesets by filename in real-time.
* **Checkbox File Staging**:
  * Selectively stage or unstage individual files using checkbox controls.
  * Click **Stage All / Unstage All** in the header for fast bulk staging.
* **Status Indicators**:
  * `modified` (Amber badge)
  * `staged` (Green badge)
  * `untracked` (Slate badge)
  * `conflicted` (Red badge)
* **Syntax-Highlighted Diff Viewer**:
  * Line-by-line unified diff inspection.
  * Clear addition counts (`+N`, emerald) and deletion counts (`-M`, rose).
  * Line number gutters and monospace font formatting.
* **AI Commit Generator Integration**:
  * Click **AI Conventional Commit** in the header to immediately draft a standardized commit based on active working tree diffs.

---

### 3. Git Stash Stack Management
* **Snapshot Inventory**: Displays all preserved working tree snapshots (`stash@{0}`, `stash@{1}`) created during safety syncs or manual actions.
* **Stash Metadata**: Inspect stash index, commit message, timestamp, and preserved file count.
* **1-Click Restore Action**:
  * Click **Restore to Working Tree** on any stash item to safely restore changes back into the active working tree with visual toast confirmation.

---

### 4. Immutable Safety Audit Trail & Rollback
* **Session Execution History**:
  * Every command executed through GitPet is recorded with an exact timestamp, description, and shell command.
* **1-Click Rollback**:
  * Click **Rollback Last Action** in the header to execute the pre-computed safe reversal command of the most recent action.
* **Rollback Safeguard**: Verifies working tree is clean or stashed before executing a rollback, preventing overwriting current in-flight edits.


# 03_CICD_PIPELINE_TELEMETRY

---

# âš¡ Feature 03: CI/CD Pipeline Telemetry (`#cicd`)

The **CI/CD Pipeline Telemetry** workspace bridges code repositories and continuous deployment pipelines, identifying test regressions, flaky test suites, and third-party supply chain vulnerabilities.

---

## ðŸŒŸ Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] CI/CD Pipeline Telemetry & Health â€¢ Run #pipe_1042 â€¢ FAILED (88% pass)|
| Actions: [ðŸ” Rerun Pipeline]                                                   |
+--------------------------------------------------------------------------------+
| [Pipeline Stages Progression]                                                  |
| [01 Lint: Passed]  [02 Tests: FAILED]  [03 Security: Passed]  [04 Build: Pend] |
|                                                                                |
| > [Expandable Stage Log Terminal]                                              |
|   FAIL src/tests/auth.spec.ts > token refresh timeout (flaky)                  |
|   ERROR: 1 test failed in 48s.                                                 |
+--------------------------------------------------------------------------------+
| [Flaky Test Diagnostics]               | [Supply Chain CVE Scans]              |
| src/tests/auth.spec.ts (70% pass rate) | CVE-2026-8819 (High Severity)         |
| [Quarantine & Analyze]                 | [Draft Dependabot Patch]              |
+--------------------------------------------------------------------------------+
```

### 1. 5-Stage Progression Pipeline Tracker
* **Continuous Visual Pipeline**:
  * Step 01: *Lint & Formatting*
  * Step 02: *Unit & Contract Tests*
  * Step 03: *Security & CVE Scan*
  * Step 04: *Container Artifact Build*
  * Step 05: *Staging Smoke Verification*
* **Stage Status Indicators**: Color-coded badges for `success` (green check), `failed` (pulsing red alert), and `pending` (slate circle).
* **Duration Metrics**: Real-time duration tracked per stage (e.g. `12s`, `48s`).
* **Expandable Log Terminal**: Clicking any stage card expands a terminal drawer displaying line-by-line build logs.

---

### 2. Flaky Test Suite Diagnostics
* **Identification**: Surfaces tests that pass and fail intermittently without corresponding source code changes.
* **Failure Telemetry**:
  * Pass rate percentage (e.g. `70%`).
  * Number of failures over the last 10 runs (e.g. `3 failures`).
  * Last failing commit SHA and relative failure timestamp.
* **Quarantine Action**:
  * Click **Quarantine & Analyze** to temporarily isolate the flaky test from blocking main deployment branches while Byte generates a fix.

---

### 3. Supply Chain Security & CVE Scans
* **Dependency Vulnerability Detection**: Identifies known CVEs in third-party packages (e.g., `jsonwebtoken@8.5.1`).
* **Severity Scoring**: Categorizes risks by `High`, `Critical`, `Medium`, or `Low`.
* **Remediation Target**: Recommends the exact patch version that resolves the issue (e.g., upgrade to `9.0.2`).
* **Draft Dependabot Patch**: Click **Draft Dependabot Patch** to generate an automated PR for dependency version bumping.

---

### 4. Rerun Pipeline Simulation
* Click **Rerun Pipeline** in the header to simulate a full CI/CD retry with animated spinner states and success notifications.


# 04_PULL_REQUEST_INTELLIGENCE

---

# ðŸ”€ Feature 04: Pull Request Intelligence (`#pr`)

The **Pull Request Intelligence** workspace monitors active PR reviews, approval thresholds, turnaround latency, and reviewer comment threads to streamline code reviews and eliminate blockers.

---

## ðŸŒŸ Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] PR #214: feat(cart): multi-currency checkout â€¢ CHANGES REQUESTED      |
| Author: lucaswhitaker22 â€¢ feature/cart -> main â€¢ Waiting: 3 days               |
| Actions: [âœ¨ Generate PR Changelog]  [ðŸ”€ Squash & Merge]                      |
+--------------------------------------------------------------------------------+
| [Review Metrics]                                                               |
| Approvals: 1 of 2 required | Turnaround: 3 days waiting | Conflict: Clean      |
+--------------------------------------------------------------------------------+
| [Inline Review Comments & Threads (2)]                                         |
| @sarah-reviewer on src/services/currency.ts:42                                 |
| "Please ensure we wrap rate lookup in a timeout."                              |
| [âœ¨ Draft AI Resolution Response]                                              |
|                                                                                |
| [Thread Reply Box]                                                             |
| [ Input: Post resolution comment...                      ]  [Send Reply]       |
+--------------------------------------------------------------------------------+
```

### 1. PR Telemetry & Turnaround Clock
* **Metadata Tracking**:
  * Pull request number and title.
  * Author username.
  * Source branch (`branch`) and target base branch (`baseBranch`).
  * Live review status (`changes_requested`, `approved`, `pending_review`).
* **Approval Counting**: Compares current peer approvals against team requirements (e.g., `1 of 2 required`).
* **Review Turnaround Clock**: Tracks days waiting in review (e.g. `3 days waiting`) to highlight review bottlenecks.
* **Mergeability Assessment**: Real-time status indicating whether the PR is cleanly mergeable or has conflicting markers with main.

---

### 2. Inline Review Threads & Comment Management
* Displays reviewer comments linked to specific files and line numbers (e.g. `src/services/currency.ts:42`).
* Status tags indicate whether the comment thread is `open` or `resolved`.
* Reviewer identity tags display author handles (e.g. `@sarah-reviewer`, `@marcus-lead`).

---

### 3. AI Resolution Response Draft Composer
* **1-Click AI Draft**: Click **Draft AI Resolution Response** to prompt Byte to generate a concrete, professional reply detailing code adjustments and added unit tests.
* **Interactive Reply Box**: Edit the drafted response or type a custom reply, and click **Reply** to append it to the conversation thread.

---

### 4. Squash & Merge Action
* Armed when review criteria are met.
* Clicking **Squash & Merge** triggers a simulated squash merge into main with celebration feedback and linear branch synchronization.

---

### 5. PR Changelog Generator
* Click **Generate PR Changelog** in the header to generate conventional release notes and changelogs summarizing the pull request's feature additions, bug fixes, and breaking changes.


# 05_RELEASE_GATE_READINESS

---

# ðŸš€ Feature 05: Release Gate & Deployment Sign-Off (`#release`)

The **Release Gate** workspace implements an automated, deterministic **5-Pillar Sign-Off Engine** evaluating repository health, continuous integration test suites, code coverage thresholds, dependency security, and team PR sign-offs before any code is approved for production deployment.

---

## ðŸŒŸ Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] Release Gate & Deployment Sign-Off â€¢ Score: 78% â€¢ CAUTION / REVIEW   |
| Actions: [ðŸ“‹ Copy Summary]  [ðŸ’¾ Download JSON]  [ðŸ›¡ï¸ Sign Off Release]         |
+--------------------------------------------------------------------------------+
| [Executive Summary]                                                            |
| "Branch feature/cart has 1 high-severity CVE and 1 flaky test suite.           |
| Remediate CVE-2026-8819 before green production release sign-off."             |
+--------------------------------------------------------------------------------+
| [5-Pillar Scorecard Grid]                                                      |
| [Tests Passing: 88% (25%)]  [Coverage: 88% (20%)]  [Security: 1 CVE (25%)]     |
| [PR Approvals: 1/2 (15%)]   [Branch Freshness: 3 behind (15%)]                 |
+--------------------------------------------------------------------------------+
| [Active Deployment Blockers (2)]                                               |
| â€¢ CVE-2026-8819 in jsonwebtoken@8.5.1               [Remediate with Byte]      |
| â€¢ 1 peer approval required from team lead           [Remediate with Byte]      |
+--------------------------------------------------------------------------------+
```

### 1. The 5 Evaluated Release Pillars (`releaseReadiness.ts`)

| Pillar ID | Pillar Name | Weight | Evaluation Criteria | Target Standard |
| :--- | :--- | :---: | :--- | :--- |
| `testsPassing` | **Tests Passing** | **25%** | 100% of unit, integration, and regression test suites pass | `100% passing` |
| `coverage` | **Code Coverage** | **20%** | Line coverage percentage across core components and handlers | `â‰¥ 80% line coverage` |
| `vulnerabilities`| **Vulnerability Count** | **25%** | Zero open high or critical supply chain CVEs | `0 High/Critical CVEs` |
| `prApprovals` | **PR Approvals** | **15%** | Required peer review approvals met with zero open change requests | `â‰¥ 2 Peer Approvals` |
| `branchFreshness`| **Branch Freshness**| **15%** | Branch synchronized with origin without upstream divergence | `0 commits behind` |

---

### 2. Readiness Scoring & Status Classification

The overall release score is calculated as a weighted average across all 5 pillars:
$$\text{Overall Score} = \sum (\text{Score}_i \times \text{Weight}_i)$$

#### Status Classification:
* **Ready to Ship (`green`)**: Overall Score >= 90%, zero critical blockers (`canShip: true`). The Sign Off Release action is armed.
* **Caution / Review (`amber`)**: Overall Score 70â€“89%, non-critical warnings exist (`canShip: false`).
* **Blocked (`red`)**: Overall Score < 70%, or failing build / high CVE detected (`canShip: false`).

---

### 3. Active Blocker Remediation
* **Explicit Inventory**: Identifies every blocker preventing green release status (e.g., failing unit tests, open security CVEs, unmerged branch divergence).
* **Remediate Action**: Click **Remediate** next to any blocker to have Byte immediately generate a step-by-step resolution command.

---

### 4. Compliance Artifact Export & Sign-Off
* **Copy Markdown Summary**:
  * Copies a human-readable release audit note directly to the clipboard, formatted with executive summaries, pillar scorecards, and active blockers.
* **Download JSON Artifact**:
  * Downloads a machine-readable JSON file (`release-readiness-[repo]-[timestamp].json`) containing the full 5-pillar sign-off report for automated compliance records.
* **Sign Off Release Button**:
  * Enabled only when `canShip` is true, providing a verified gate for deployment.


# 06_RISK_SCORECARD_AND_HEALTH_POOL

---

# ðŸ›¡ï¸ Feature 06: Risk Scorecard & Health Pool (`#risk`)

The **Risk Scorecard & Health Pool** workspace provides a granular, deterministic breakdown of your repository's overall health across 7 weighted DevSecOps dimensions, mapping risks directly into Byte's Health Pool (0â€“100 HP).

---

## ðŸŒŸ Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] 7-Factor Repository Risk Scorecard â€¢ Attention (68% HP)               |
| Actions: [ðŸ“‹ Copy Scorecard]                                                   |
+--------------------------------------------------------------------------------+
| [Repository Health Pool Gauge]                                                 |
| 68 / 100 HP  [=======================-----------------]                        |
+--------------------------------------------------------------------------------+
| [Filter Tabs] (â€¢) All Factors (7)  ( ) Hazards (0)  ( ) Warnings (3)  ( ) Healthy|
+--------------------------------------------------------------------------------+
| [Factor Cards Grid]                                                            |
| â€¢ Branch Divergence & Drift (-15 pts) [Warning]                                |
| â€¢ Failed & Flaky Tests (0 pts) [Healthy]                                       |
| â€¢ Secrets & Security Policies (0 pts) [Healthy]                                |
| â€¢ Open Vulnerabilities (-10 pts) [Warning]                                     |
| â€¢ Code Smells & Debt (-6 pts) [Warning]                                        |
| â€¢ Unreviewed Commits & PR Review Lag (0 pts) [Healthy]                         |
| â€¢ Large PR Size (0 pts) [Healthy]                                              |
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
* **Healthy (90â€“100% HP, Low Risk)**: All 7 factors in `good` standing. Green ambient glow.
* **Attention (60â€“89% HP, Moderate Risk)**: Minor divergence, uncommitted churn, or small PR review delay. Amber aura.
* **Blocked (30â€“59% HP, High Risk)**: Active merge conflicts, failed build, or test deduction >= 25. Orange aura.
* **Critical Hazard (0â€“29% HP, Critical Risk)**: Work-loss hazard, destructive upstream force-push, or score drops to 0. Grayed out turtle posture.

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


# 07_MODALS_AND_TOOLS

---

# ðŸ› ï¸ Feature 07: Specialized Modals & Tools

GitPet provides an array of global modals and utility subsystems accessible from anywhere in the application.

---

## ðŸŒŸ Key Functional Capabilities

| Modal Name | Shortcut / Trigger | Core Technology | Primary Functionality |
| :--- | :--- | :--- | :--- |
| **AI Conventional Commit Generator** | Header button / Repo view | `@google/genai` (Gemini 2.5 Flash) | Generates standardized semantic commits conforming to Conventional Commits 1.0.0 based on active diffs. |
| **Preview Changes & Approval Gate** | "Preview Changes" buttons | Safety Engine (`safety.ts`) | Mandatory human-in-the-loop approval gate showing command, blast radius, affected files, and reversal steps. |
| **Quick Command Palette** | `âŒ˜K` / `Ctrl+K` | React + Fuzzy Search | Global fuzzy command bar for instant page navigation, scenario switching, action rollbacks, and audio toggling. |
| **Live Voice & Vision Streaming** | Microphone trigger | Gemini Live Audio WebSocket | Real-time bidirectional voice conversation with Byte using streaming audio. |
| **Image Studio (Avatar Studio)** | Avatar menu | Gemini Imagen (`gemini-3.1-flash-image`)| Custom mascot avatar generation and editing using text prompts. |
| **Pitch Deck Presentation Modal** | `P` key | React Presentation Deck | In-app 7-slide pitch deck covering the problem, architecture, DevSecOps safety model, and demo highlights. |

---

### 1. AI Conventional Commit Generator Modal (`AICommitGeneratorModal.tsx`)
* **Endpoint**: `POST /api/ai/commit`
* **Input Schema**:
  ```json
  {
    "diffContext": "diff --git a/src/auth.ts b/src/auth.ts...",
    "commitType": "feat",
    "scope": "cart",
    "breakingChange": false
  }
  ```
* **Semantic Type Selection**: Select or generate commits conforming to `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, or `ci`.
* **Scope & Subject Formatting**: Formats commit header with proper scope syntax (e.g. `feat(cart): implement multi-currency checkout`).
* **Breaking Change Alerts**: Flags breaking API changes with `BREAKING CHANGE:` footer notices.
* **Diff Context Aware**: Ingests active working tree diffs to suggest accurate commit subjects.
* **1-Click Apply / Copy**: Copy formatted message or send directly to the assistant.

---

### 2. Preview Changes & Diff Confirmation Modal (`PreviewChangesModal.tsx`)
* **Endpoint**: `POST /api/git/preview-action`
* **Human-in-the-Loop Safety Enforcement**: Ensures zero blind command execution.
* **Blast Radius Calculation**: Lists every file affected by the command and classifies file mutations.
* **Pre-Computed Reversal Step**: Shows the exact command required to undo the action (e.g., `git stash pop`, `git rebase --abort`).
* **Explicit Execution Confirmation**: Action executes only after explicit developer approval, routing to `POST /api/git/execute-action`.

---

### 3. Quick Command Palette (`QuickPaletteModal.tsx`)
* **Global Access**: Trigger with `âŒ˜K` (macOS) or `Ctrl+K` (Windows/Linux).
* **Fuzzy Filtering**: Search across commands, scenarios, navigation routes, and actions.
* **Instant Rollback**: 1-click rollback of the last executed command.
* **Audio & Mascot Shortcuts**: Toggle audio mute or pet Byte directly from the keyboard.

---

### 4. Live Voice Streaming (`LiveVoiceModal.tsx`)
* **Endpoint**: `WebSocket ws://localhost:3001/live`
* **Bidirectional PCM Audio**: Streams audio at 16kHz/24kHz to the Gemini Live API via WebSockets.
* **Real-time Voice Feedback**: Talk directly with Byte to diagnose repository issues hands-free.
* **Real-time Live Audio Waveform**: Animated visual equalizer reflecting active audio input levels.

---

### 5. Pet Avatar Studio (`ImageStudioModal.tsx`)
* **Endpoints**: `POST /api/ai/images/generate`, `POST /api/ai/images/edit`, `POST /api/ai/images/:id/approve`
* **Mascot Customization**: Generates custom avatar variations using `gemini-3.1-flash-image`.
* **Ephemeral Asset Registry**: 30-minute preview lifecycle before applying to the active stage.
* **Aesthetic SVG Fallback**: Guaranteed offline fallback generator if remote image generation is unavailable.

---

### 6. Pitch Deck Presentation Modal (`PitchDeckModal.tsx`)
* **Instant Presentation**: Press `P` anywhere in the app to open the 7-slide pitch deck:
  1. *Title & Problem*: The Hidden State Crisis in Developer Workflows.
  2. *The Solution*: GitPet â€” DevSecOps Ambient Companion.
  3. *Architecture*: Multi-Tier Gemini Intelligence + 2-Layer Safety Gate.
  4. *7-Factor Risk & 5-Pillar Gate*: Data-Driven Scoring Engine.
  5. *Live Workspace vs Sandbox*: Dual-Mode Operational Realism.
  6. *Security & Governance*: NIST AI RMF 1.0 & Zero Force-Push Guarantee.
  7. *Team Ribbon Patrol*: Team Credits & Submission Checklist.


# 08_SAFETY_AND_GOVERNANCE

---

# ðŸ›¡ï¸ Feature 08: Safety & DevSecOps Governance

GitPet bridges agentic automation and strict DevSecOps safety protocols through a **2-Layer Safety Verification Engine**, guaranteed reversibility, and secret redaction.

---

## ðŸŒŸ Key Functional Capabilities

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant UI as React UI (Preview Modal)
    participant BE as Express API Gateway
    participant Guard as Safety Engine (safety.ts)
    participant Runner as Safe Executor (executor.ts)
    participant Git as Git CLI Subprocess

    Dev->>UI: Clicks "Run Safe Action"
    UI->>BE: POST /api/git/execute-action { command, targetFiles, expectedRisk }
    BE->>Guard: evaluateCommand(command, stateContext)
    alt Destructive / Force Push Detected
        Guard-->>BE: REJECT: Policy violation (e.g. force push prohibited)
        BE-->>UI: 400 Bad Request { error, policyViolation: true }
        UI-->>Dev: Alert: Action blocked by safety boundary
    else Safe / Bounded Command
        Guard-->>BE: ACCEPT: Command verified
        BE->>Runner: executeApprovedCommand(command)
        alt GITPET_ALLOW_WRITES == 'true'
            Runner->>Git: execFile('git', argv, { timeout: 10000 })
            Git-->>Runner: stdout / stderr
            Runner-->>BE: { success: true, stdout }
        else Dry-Run Mode (Default)
            Runner-->>BE: { success: true, simulated: true, output: "[Dry-run verified]" }
        end
        BE-->>UI: 200 OK { executionResult, newHealthPercentage }
        UI-->>Dev: Green checkmark + Sound + Reversal step logged
    end
```

---

### 1. The 2-Layer Safety Policy Engine (`safety.ts`)

#### Layer 1: Static Rule Verification (Deterministic)
* **Zero Force-Push Policy**: Prohibits destructive commands including:
  * `git push --force` or `git push -f`
  * `git push origin +branch`
  * `git reset --hard` (unless preceded by a verified safety stash)
  * `git clean -fdx`
  * `git branch -D`
* **Command Whitelisting**: Restricts execution strictly to bounded, non-destructive Git operations:
  * `git stash push`, `git stash pop`, `git stash apply`
  * `git fetch origin`, `git pull --rebase`
  * `git commit -m`, `git add`
  * `git checkout -b`, `git switch`
  * `git rebase --abort`, `git merge --abort`

#### Layer 2: Contextual Lints
* Evaluates current repository context before approving commands:
  * Verifies working tree is clean or stashed before permitting a branch switch or rebase.
  * Blocks pulls if local modifications conflict with upstream patches.

---

### 2. Pre-Computed Reversal Commands
Every suggested action is paired with an immutable, deterministic safe reversal command:

| Proposed Action | Reversal Command |
| :--- | :--- |
| `git stash push -m "gitpet_backup"` | `git stash pop` |
| `git pull --rebase origin main` | `git rebase --abort` |
| `git merge origin/main` | `git merge --abort` |
| `git commit -m "feat: ..."` | `git reset --soft HEAD~1` |
| `git checkout -b feature/new` | `git checkout -` |

---

### 3. Automated Secret Token Redaction
* Automatically scans prompt inputs, diff snippets, and terminal output for high-entropy secrets:
  * GitHub Personal Access Tokens (`ghp_`, `github_pat_`)
  * AWS Access Keys (`AKIA[0-9A-Z]{16}`)
  * Google Cloud API Keys (`AIza[0-9A-Za-z-_]{35}`)
  * Private SSH Keys (`-----BEGIN OPENSSH PRIVATE KEY-----`)
* Redacts detected secrets with `[REDACTED_SECRET]` before transmission to generative AI models.

---

### 4. Bounded Agency Execution Modes
* **Dry-Run Mode (Default)**:
  * Validates command syntax, checks blast radius, and simulates outcome without writing to the disk.
* **Verified Write Mode (`GITPET_ALLOW_WRITES=true`)**:
  * Executes approved commands using `child_process.execFile` with argument arrays to prevent shell injection vulnerabilities.
  * Enforces a 10,000ms hard execution timeout.


# README

---

# ðŸ“¦ GitPet Feature Documentation Suite

Welcome to the comprehensive feature documentation suite for **GitPet** (Team Ribbon Patrol). This directory provides modular, exhaustive, in-depth architectural and operational guides for every subsystem, full-page workspace, specialized modal, and DevSecOps safety boundary within the application.

---

## ðŸ—‚ï¸ Documentation Directory

| Document | Focus Area | Description |
| :--- | :--- | :--- |
| [**01. Ambient Companion**](01_AMBIENT_COMPANION.md) | `#companion` | Pixel pet canvas, 18 symptom auras, interactive dock, 4-card telemetry quick deck, multi-turn Gemini stream with 4 personas & 3 model tiers. |
| [**02. Repository Details & DAG Graph**](02_REPOSITORY_AND_DAG_GRAPH.md) | `#repository` | Multi-lane topological DAG graph, working tree diffs, checkbox file staging, stash stack manager, and immutable audit rollback log. |
| [**03. CI/CD Pipeline Telemetry**](03_CICD_PIPELINE_TELEMETRY.md) | `#cicd` | 5-stage progression pipeline tracker, live expandable terminal logs, flaky test suite diagnostics & quarantine, and supply chain CVE scanner. |
| [**04. Pull Request Intelligence**](04_PULL_REQUEST_INTELLIGENCE.md) | `#pr` | Turnaround duration metrics, reviewer approvals vs. changes requested counters, inline review threads, AI resolution reply composer, and squash & merge. |
| [**05. Release Gate Readiness**](05_RELEASE_GATE_READINESS.md) | `#release` | 5-pillar deployment readiness gate, blocker remediation, Markdown release note export, and machine-readable JSON compliance artifact download. |
| [**06. Risk Scorecard & Health Pool**](06_RISK_SCORECARD_AND_HEALTH_POOL.md) | `#risk` | 7-factor weighted repository risk scorecard, dynamic health pool gauge (0â€“100 HP), factor category filters, and 1-click remediation deep links. |
| [**07. Specialized Modals & Tools**](07_MODALS_AND_TOOLS.md) | Global Modals | AI Conventional Commit generator, Preview Changes safety gate, Quick Command Palette (`âŒ˜K`), Gemini Live Audio streaming, and Image Studio. |
| [**08. Safety & DevSecOps Governance**](08_SAFETY_AND_GOVERNANCE.md) | Security Engine | 2-layer static & contextual safety policies, zero force-push boundaries, mandatory human confirmation, and token redaction. |

---

## ðŸ§­ System Architecture Summary

```mermaid
graph TD
    classDef page fill:#1e293b,stroke:#4f46e5,stroke-width:2px,color:#f8fafc;
    classDef modal fill:#1e1b4b,stroke:#7c3aed,stroke-width:2px,color:#ffffff;
    classDef core fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#ffffff;

    App["GitPet Core Engine"]:::core

    %% 6 Workspaces
    P1["01. Ambient Companion"]:::page
    P2["02. Repo Details & DAG"]:::page
    P3["03. CI/CD Telemetry"]:::page
    P4["04. PR Intelligence"]:::page
    P5["05. Release Gate"]:::page
    P6["06. Risk & HP Scorecard"]:::page

    %% Global Utilities
    M1["07. Modals & Tools"]:::modal
    M2["08. Safety & Governance"]:::modal

    App --> P1
    App --> P2
    App --> P3
    App --> P4
    App --> P5
    App --> P6
    App --> M1
    App --> M2
```

---

*GitPet â€” Built by Ribbon Patrol (Team 05) for DevOps for GenAI Hackathon 2026.*

