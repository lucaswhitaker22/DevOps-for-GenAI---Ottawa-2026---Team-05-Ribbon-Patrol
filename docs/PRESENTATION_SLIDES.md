# GitPet Demo Presentation — Slide Content

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Estimated Duration:** 10–12 minutes  
**Target Audience:** Technical Judges, DevOps Engineers, AI Safety Evaluators

---

## Slide 1: Title & Problem Hook

### Title
**GitPet — Your Ambient DevSecOps Repository Companion**

### Subtitle
*Team 05 — Ribbon Patrol | DevOps for GenAI Hackathon, Ottawa 2026*

### Team & Roles
- **Project Lead:** Aliasgar Husain (`Alhusain@rbbn.com`) — System Architecture & AI Integration
- **Lucas Whitaker** — Safety Engine, Test Automation & CI/CD Pipelines
- **David Castelli** — DAG Visualization, Frontend UI & Web Audio
- **Faris Nour** — Live GitHub Fixture, PR Intelligence & Telemetry

### The Problem: 3 Critical Developer Dilemmas

```
+-----------------------------------------------------------------------------------+
| 1. Context Fragmentation       | 2. Excessive AI Agency        | 3. Inaccessible Telemetry|
| Drift, stashes, upstream lag   | Unbounded agents run blind    | Dense terminal logs hide |
| discovered only on broken sync | force-pushes & destructive ops| merge topology & CVEs    |
+-----------------------------------------------------------------------------------+
```

1. **Context Fragmentation & Cognitive Overload**
   - Developers work blind to upstream drift, uncommitted stash debt, detached HEADs, and stale PR threads.
   - Synchronization errors are discovered late—during high-friction pulls, rebases, or broken releases.
   - Average developer spends 20–30% of sync time context-switching between terminals, CI portals, and Git GUIs.

2. **The "Excessive Agency" Dilemma in AI Coding Assistants**
   - Unbounded autonomous agents with shell access execute destructive commands (`git push --force`, `git reset --hard`, `git clean -fdx`) without explaining the blast radius.
   - Prompt-only safety instructions fail against hallucinations, context dilution, or indirect prompt injections.
   - Developers lack pre-computed rollback plans when AI-suggested operations mutate working tree state.

3. **Inaccessible Git & Pipeline Telemetry**
   - Non-linear Git DAG topologies, merge base divergence, and multi-file conflicts are hard to parse from raw logs.
   - Flaky CI/CD test runs and supply-chain CVE warnings remain buried in thousands of lines of terminal output.

### Speaker Notes
> Open directly on the Companion page with Byte visible. Introduce Team 05, then immediately frame the three dilemmas: context fragmentation, excessive AI agency, and inaccessible telemetry. Keep this tight — 60 seconds max. The goal is to make judges feel the pain before showing the solution.

---

## Slide 2: The Solution — Notice, Understand, Resolve

### Title
**GitPet: A Continuous Ambient DevSecOps Loop**

### The 3-Step Human-in-the-Loop Loop

```
+----------------------------------------------------------------------------------------------------+
|  1. NOTICE (Ambient Telemetry)  -->  2. UNDERSTAND (Grounded AI)  -->  3. RESOLVE (Bounded Action) |
|  - 18 visual symptom postures        - Multimodal Gemini reasoning      - 2-layer safety gate      |
|  - Dynamic 4-tier health auras       - Evidence signals box             - Modal diff preview       |
|  - Web Audio synthesized cues        - Pre-computed reversal plans      - Verified argv execution  |
+----------------------------------------------------------------------------------------------------+
```

1. **Notice** — Byte's posture, mood aura, and chiptune audio cues reflect repository health at a glance.
   - 18 expressive symptom postures map 1:1 to Git status, CI/CD pipeline states, PR bottlenecks, and cloud infrastructure alerts.
   - 4-tier dynamic health aura: **Healthy** (80–100 HP, Green) → **Attention** (45–79 HP, Amber) → **Blocked** (<45 HP, Orange) → **Critical Hazard** (0 HP, Grayscale).
2. **Understand** — Multimodal Gemini reasoning explains issues in plain language.
   - Surfaces concrete evidence signals (branch divergence, dirty files, conflict markers, CVE IDs).
   - Delivers explicit confidence ratings (%), 4-tier risk badges, and deterministic reversal steps.
3. **Resolve** — Bounded, reversible Git actions with mandatory human-in-the-loop preview.
   - Zero blind execution: modal diff preview reveals blast radius, affected files, and exact argv parameters.
   - One-click rollback restores working tree state safely using pre-computed undo commands.

### 4 Core Architectural Differentiators

| Differentiator | Implementation Details | Key Value |
| :--- | :--- | :--- |
| **Ambient & Non-Intrusive** | Sidecar companion, 18 postures, CSS glowing auras, Web Audio API sound synthesis | Passive peripheral awareness without breaking focus |
| **Bounded AI Agency** | 2-layer safety gate (static rules + contextual lints), mandatory HITL preview modal, dry-run default | Code-level prevention of force-push, data loss, and injection |
| **Multimodal Intelligence** | Gemini 2.5/3.x reasoning, Gemini Live WebSocket audio, Gemini Image mascot studio, TTS | Multi-sensory interaction with guaranteed offline fallbacks |
| **Full-Spectrum DevSecOps** | 7-factor risk engine, SVG DAG visualizer, CI/CD pipeline drawer, PR intelligence suite | Unified repository, pipeline, review, and supply chain telemetry |

### Speaker Notes
> Point to Byte on screen. Explain the health bar (e.g. 68% HP, amber aura = "Attention"). Emphasize that GitPet does not replace the developer's judgment — it augments it with visible ambient telemetry, grounded explanations, and safe, reversible actions.

---

## Slide 3: Live AI Chat & Multi-Persona Assistance

### Title
**Talk to Byte: 4 Personas, 3 Model Tiers, 100% Grounded**

### 4 Specialized AI Personas

| Persona | Tone & Style | Domain Specialization | System Prompt Focus |
| :--- | :--- | :--- | :--- |
| **Byte Mascot** | Friendly, witty developer humor | Ambient companion & daily workflow | Encouraging tips, routine status, gamified guidance |
| **Senior Architect** | Rigorous, analytical, topological | Branching strategy & Git internals | Rebase vs merge, DAG ancestry, multi-lane branch design |
| **Safety Auditor** | Strict, cautious, compliance-first | Work-loss prevention & security | Stash verification, rollback safety, zero-data-loss resets |
| **Git Tutor** | Pedagogical, clear, conceptual | Developer education & internals | Teaches blobs, trees, commit objects, and index mechanics |

### 3 Model Speed & Depth Tiers

| Tier | Primary Model | Fallback Models | Latency / Scope |
| :--- | :--- | :--- | :--- |
| **Fast** | `gemini-3.1-flash-lite` | `gemini-3.6-flash` → `gemini-flash-latest` | ~200–400ms: Instant status checks & one-liner queries |
| **General** | `gemini-3.6-flash` | `gemini-3.5-flash` → `gemini-flash-latest` | ~500–900ms: Standard chat, tutoring, diff explanation |
| **Deep Reasoning** | `gemini-3.7-flash` | `gemini-3.6-flash` → `gemini-flash-latest` | ~1.2–2.0s: Multi-branch conflict resolution & architecture |

### Anatomy of Every AI Response

```
+-----------------------------------------------------------------------------------+
| [ Persona Header ] Byte (Senior Architect) • gemini-3.7-flash • 96% Confidence    |
| [ Evidence Signals ] branch: feature/payment-v2 | behind: 4 | conflicts: 2 files  |
| [ Explanation ] Upstream main has diverged with schema migrations in payment.ts...|
| [ Safe Action Card ]                                                              |
|   Command:  git pull --rebase origin main                                         |
|   Reversal: git rebase --abort                                                    |
|   Risk:     CAUTION (Working tree modified)                                       |
|   [ Copy Command ]  [ Preview Diff & Scope ]  [ Run Action (HITL) ]               |
+-----------------------------------------------------------------------------------+
```

- **Evidence Signals Box** — Grounded repository facts (current branch, ahead/behind counts, dirty files, conflict markers).
- **Confidence Rating** — Quantitative score (e.g., `96% Confidence`) indicating grounded factual certainty.
- **Risk Badge** — Four color-coded levels: `SAFE` (Green), `CAUTION` (Amber), `PROTECTED` (Blue), `HAZARD` (Red).
- **Recommended Safe Action Card** — Formatted shell command, expected outcome, copy CTA, and pre-computed reversal.
- **Preview Diff & Scope Button** — Triggers human-in-the-loop modal before any subprocess execution.

### 1-Click Diagnostic Prompt Chips
- `📊 Status report & diagnostics` — Full working tree, staging, and upstream health scan
- `🚨 Work-loss risk assessment` — Stash audit, dirty file risk, and uncommitted modification check
- `🌲 Explain branch divergence` — Rebase vs merge trade-offs for current ahead/behind topology
- `🔀 Review PR & reviewer feedback` — Summary of unresolved review comments and approval thresholds
- `⚡ CI/CD test failure diagnosis` — Terminal log analysis and flaky test identification

### Demo Script
1. Switch to **"Behind Main (Branch Drift)"** scenario using the Scenario Switcher (`⌘K` or top bar).
2. Observe Byte's visual transition — pulling on leash, amber aura, 68% HP.
3. Click the prompt chip: **"Status report & diagnostics"**.
4. Show the AI response: Evidence Box, 96% confidence score, and Safe Action Card (`git pull --rebase origin main`).
5. Highlight the **pre-computed reversal command** (`git rebase --abort`) displayed side-by-side.

### Speaker Notes
> This is the key live AI moment. Show the model selector and persona switcher. Emphasize that if the Gemini API key is absent or rate-limited, GitPet automatically falls back to its deterministic rule engine, ensuring 100% demo resilience.

---

## Slide 4: The 2-Layer Safety Engine

### Title
**Bounded Agency: Universal Invariants + Contextual Lints**

### Why System Prompts Are Not Enough
> *"Prompt instructions are guidance; code-level safety engines are guarantees."*  
> GitPet never passes unvalidated LLM output directly to a shell. Every proposed action passes through a 2-layer deterministic policy engine.

### Layer 1: Static Rules (Universal Danger Invariants)

| Threat Code | Blocked Pattern | Code-Level Defense | Safe Alternative |
| :--- | :--- | :--- | :--- |
| `force-push` | `git push --force`, `-f` | Hard-rejected by regex tokenizer | `git push --force-with-lease` |
| `hard-reset` | `git reset --hard` | Destructive working tree wipe blocked | `git reset --keep` / `git stash` |
| `clean-wipe` | `git clean -fdx` | Permanent file deletion blocked | Stash or manual file review |
| `force-branch-delete` | `git branch -D` | Unmerged branch deletion blocked | `git branch -d` (safe check) |
| `stash-destroy` | `git stash drop`, `clear` | History destruction blocked | Explicit stash pop/apply only |
| `remote-ref-delete` | `git push origin --delete` | Remote branch deletion blocked | Handled via PR web interface |
| `history-rewrite` | `filter-branch`, `filter-repo` | Repository history mutation blocked | Protected Git operations |
| `shell-injection` | `;`, `\|`, `&`, `>`, `<`, `$()`, `` ` `` | Metacharacters stripped/rejected | Argv array tokenization |
| `non-git-binary` | `sudo`, `rm`, `curl`, `sh` | Binary whitelist (`git` only) | Rejected at gateway router |

### Layer 2: Contextual Lints (Working-Tree State Aware)

| Lint Identifier | Repository Context Detected | Prevented Failure | Safe Recommendation |
| :--- | :--- | :--- | :--- |
| `stash-misses-untracked` | Working tree contains untracked files | Untracked files left behind on stash | Suggests `git stash push -u` |
| `push-while-behind` | Branch is behind remote (`behind >= 1`) | Remote rejects non-fast-forward push | Suggests `git pull --rebase` first |
| `diverged-pull-needs-rebase` | Local and remote branches diverged | Unintended merge commit pollution | Suggests `git pull --rebase origin main` |
| `operation-in-progress` | Active rebase/merge lock files present | Corrupted intermediate Git state | Limits commands to `--continue`, `--skip`, `--abort` |
| `stash-pop-empty` | Stash stack length == 0 | Confusing "No stash entries found" error | Blocks empty stash pop |
| `dirty-tree-checkout` | Uncommitted edits on branch switch | Accidental overwrite of active work | Prompts to stash or commit first |

### Execution Pipeline & Deterministic Reversals

```
[ AI Suggestion / Input ] 
       │
       ▼
[ Layer 1: Static Rules ] ──(Violation)──> [ HTTP 400 Bad Request + Policy Alert ]
       │ (Pass)
       ▼
[ Layer 2: Contextual Lints ] ──(Warning)──> [ Contextual Safety Notification ]
       │ (Pass)
       ▼
[ Human-in-the-Loop Modal ] ──(User Rejects)──> [ Action Cancelled ]
       │ (User Confirms)
       ▼
[ Safe Executor (execFile) ] ──(argv array, no shell, 10s timeout)──> [ Immutable Audit Log ]
```

| Proposed Action | Pre-Computed Reversal Command | Rollback Safety Guard |
| :--- | :--- | :--- |
| `git stash push -u -m "backup"` | `git stash pop` | Verifies clean index before pop |
| `git pull --rebase origin main` | `git rebase --abort` | Verified during active rebase |
| `git merge origin/main` | `git merge --abort` | Verified during active merge |
| `git commit -m "feat: ..."` | `git reset --soft HEAD~1` | Preserves changes in working index |
| `git checkout -b feature/new` | `git checkout -` | Returns to previous branch |

### Verification & Automated Testing
- **31 Automated Vitest Tests** across `tests/security.test.ts`, `tests/executor.test.ts`, and `tests/markdown.test.ts`.
- **100% Pass Rate:** Validates secret scrubbing, prompt injection defense, destructive flag rejection, contextual lints, and markdown XSS escaping.

### Demo Script
1. Click **"Preview Diff & Scope"** on any recommended action.
2. Show the modal: exact command, blast radius, affected files, reversal command, and risk factors.
3. State to judges: *"Even if an LLM hallucinates `git push --force` or an injection like `git status; rm -rf /`, the static engine drops it immediately."*

### Speaker Notes
> This is the most crucial slide for DevSecOps judges. Emphasize that the safety engine is provider-agnostic: it evaluates commands identically whether they come from Gemini 3.7 Pro, rule engines, or user inputs.

---

## Slide 5: Repository DAG Graph & Working Tree Diffs

### Title
**See Your Git Topology — Multi-Lane DAG & Working Tree Studio**

### Interactive Multi-Lane DAG Visualizer

```
Main Trunk (origin)  ●─────────●─────────●─────────● (origin/main)
                      \                   \
Feature Lane           ●─────────●─────────● (HEAD -> feature/cart)
                                  \
Secondary Fork                     ● (stale-branch)
```

- **SVG Topology Engine:** Calculates topological lane indices and renders smooth cubic bezier spline curves.
- **11 Expressive Commit Roles:**
  - `HEAD` (pulsing emerald ring) • `upstream_HEAD` (origin pointer) • `local_ahead` • `remote_behind`
  - `merge_base` (double-ring highlight) • `fork_point` • `conflicted` (red alert) • `hazard` • `sync_clean` • `detached` • `collapsed_run`
- **Interactive Commit Inspector:** Click any node to inspect SHA-1, author, timestamp, parent hashes, commit message, and branch pointers.

### Working Tree & Side-by-Side Diff Viewer
- **Real-Time Search Filter:** Instant fuzzy search across dirty changesets.
- **Selective File Staging:** Individual file checkboxes, plus bulk **Stage All** / **Unstage All**.
- **Color-Coded Status Badges:** `modified` (Amber), `staged` (Green), `untracked` (Slate), `conflicted` (Red).
- **Unified Diff Viewer:** Line gutters, addition/deletion counters, and syntax-highlighted diff blocks.
- **AI Commit Generator:** Drafts standardized Conventional Commits (`feat:`, `fix:`, `refactor:`) directly from active staged diffs.

### Stash Stack & Immutable Audit Trail
- **Stash Stack Inventory:** Visual cards displaying stash index (`stash@{0}`), timestamp, stash message, and file counts with 1-click **Restore**.
- **Immutable Session Audit Log:** FIFO ring buffer recording every executed action, timestamp, target files, and AI rationale.
- **1-Click Rollback Safeguard:** Executes pre-computed reversal command only after verifying working tree cleanliness.

### Demo Script
1. Navigate to **Repository** page (`#repository` or sidebar).
2. Show the multi-lane DAG visualizer — point out `HEAD`, `origin/main`, `merge_base`, and diverged lanes.
3. Click a commit node to open the Commit Inspector panel.
4. Switch to **Working Tree & Diffs** tab — stage a modified file and click **"Generate AI Commit"**.
5. Switch to **Stashes & Audit Trail** tab — show the rollback safeguard button.

### Speaker Notes
> Focus on clarity: the DAG visualizer turns confusing `git log --graph` terminal text into an intuitive multi-lane topological map. Emphasize the AI Commit Generator drafting Conventional Commits from real diffs.

---

## Slide 6: CI/CD Pipeline Telemetry & Flaky Tests

### Title
**Pipeline Health: 5-Stage Progression & Flaky Test Quarantine**

### 5-Stage Pipeline Progression Tracker

```
+---------------------------------------------------------------------------------------+
| 01. Lint & Format ──> 02. Unit Tests ──> 03. CVE Scan ──> 04. Build ──> 05. Staging  |
|      (Passed)              (Passed)           (Failed)        (Pending)    (Pending)  |
|       12.4s                 45.2s             0.8s              --            --      |
+---------------------------------------------------------------------------------------+
```

| Stage ID & Name | Purpose & Tooling | Status Indicators & Telemetry |
| :--- | :--- | :--- |
| **01 — Lint & Formatting** | ESLint / Prettier code style validation | `passed` (Green) • Duration: 12.4s • Expandable terminal logs |
| **02 — Unit & Contract Tests** | Vitest / Jest test suite execution | `passed` (Green) • Duration: 45.2s • Individual spec assertions |
| **03 — Security & CVE Scan** | Gitleaks + Dependabot vulnerability scan | `failed` (Red pulse) • Uncovers CVE-2026-8819 in supply chain |
| **04 — Container Artifact Build** | Docker multi-stage container compilation | `pending` (Slate) • Build blocked pending upstream fixes |
| **05 — Staging Smoke Verification**| Pre-deployment smoke test suite | `pending` (Slate) • Release gate hold |

### Flaky Test Suite Diagnostics & Quarantine
- **Intermittent Failure Detection:** Identifies test specs that alternate between pass/fail without source changes.
- **Failure Telemetry Card:**
  - Displays overall pass rate (e.g., `70% Pass Rate`).
  - Failure frequency: `3 failures across last 10 pipeline executions`.
  - Last failing commit SHA and error stack trace.
- **1-Click Quarantine Action:** Isolates flaky specs to prevent deployment pipeline blocking while alerting the QA team.

### Supply Chain Security & CVE Remediation
- **Vulnerability Inspection:** Surfaces CVE identifier, CVSS severity score (`HIGH` / `CRITICAL`), and vulnerable package.
- **Remediation Target Version:** Recommends exact patched package version (e.g., upgrade `jsonwebtoken` from `9.0.0` to `9.0.2`).
- **1-Click Dependabot Patch:** Generates automated PR branch and commit diff for immediate dependency upgrade.

### Demo Script
1. Switch to **"CI/CD: Build Failure"** scenario.
2. Navigate to **CI/CD Pipelines** page (`#cicd`).
3. Click on the failed **Security & CVE Scan** stage to expand live terminal logs.
4. Show the **Flaky Test Diagnostics** panel and click **"Quarantine & Analyze"**.
5. Show the **CVE Security Alert** panel and click **"Draft Dependabot Patch"**.

### Speaker Notes
> Keep this to 45 seconds. Focus on the two high-value features: flaky test quarantining and 1-click CVE patch generation. These directly address day-to-day DevOps friction.

---

## Slide 7: Pull Request Intelligence

### Title
**PR Intelligence: Bottleneck Telemetry to 1-Click Resolution**

### PR Telemetry & Turnaround Tracker

```
+-----------------------------------------------------------------------------------+
| PR #214: feat(auth): migrate to WebAuthn biometric passkeys                       |
| Author: @farisnour  •  Branch: feature/auth-v2 -> main  •  Status: Changes Req.   |
| Approvals: [ 1 of 2 Required ]  •  Review Bottleneck: [ 3 Days Waiting in Queue ] |
+-----------------------------------------------------------------------------------+
```

- **Approval Threshold Meter:** Real-time visual ratio of peer approvals vs. branch protection requirements (`1 of 2 required`).
- **Review Turnaround Clock:** Measures queue duration (e.g., `3 days waiting in review`) to highlight team bottlenecks.
- **Mergeability Diagnostic:** Assesses merge conflict status, CI status, and change request blockers.

### Inline Review Threads & File/Line Anchoring
- **Line-Anchored Threads:** Links review comments directly to source files and line numbers (e.g., `src/auth/authService.ts:42`).
- **Status Tags:** Displays `open` (Amber) vs. `resolved` (Green) state per thread.
- **Reviewer Identity Badges:** Clear avatar and GitHub handle tagging for all participating reviewers.

### AI Resolution Response Draft Composer
- **Context-Aware Drafting:** Byte reads reviewer feedback, diff context, and proposed fixes to draft an empathetic, professional reply.
- **Technical Rigor:** Details exact code changes made, architectural rationale, and added unit tests.
- **Interactive Composer:** Developers can inspect, edit, or customize the draft before clicking **"Reply"** to append to the thread.

### Armed Squash & Merge & Automated Changelog
- **Armed Merge Button:** Unlocks once review thresholds, CI checks, and conflict checks pass. Triggers celebration confetti feedback.
- **Generate PR Changelog:** Produces formatted Conventional Release Notes categorizing Features, Fixes, and Breaking Changes.

### Demo Script
1. Switch to **"PR #214: Changes Requested"** scenario.
2. Navigate to **PR Intelligence** page (`#pr`).
3. Show the review metrics (1 of 2 approvals, 3 days waiting).
4. Expand the inline comment on `authService.ts:42` and click **"Draft AI Resolution Response"**.
5. Show the drafted response in the composer, edit a word, and click **"Reply"**.

### Speaker Notes
> 45 seconds. The AI resolution composer is the star here: it demonstrates Gemini synthesizing reviewer feedback and code context into a polite, technically complete developer response.

---

## Slide 8: Release Gate & 7-Factor Risk Score

### Title
**Data-Driven Deployment: 5-Pillar Gate + 7-Factor Health Pool**

### 5-Pillar Deployment Release Gate

```
+---------------------------------------------------------------------------------------+
|  Tests Passing (25%)  |  Coverage (20%)  |  Vulnerabilities (25%) |  PR Approvals (15%)|
|    [ 100% Target ]    |   [ >=80% Target] |    [ 0 High/Crit CVE ] |  [ >=2 Approvals ] |
|  Freshness (15%)      |  OVERALL SCORE: 92% (READY TO SHIP) - SIGN-OFF ARMED          |
+---------------------------------------------------------------------------------------+
```

| Pillar | Weight | Target Standard | Evaluation Criteria |
| :--- | :---: | :--- | :--- |
| **1. Tests Passing** | 25% | 100% test pass rate | All unit, contract, and smoke suites succeed |
| **2. Code Coverage** | 20% | ≥ 80% line coverage | Verified test coverage across modified modules |
| **3. Vulnerabilities** | 25% | 0 High/Critical CVEs | Zero unpatched CVEs or secret exposures |
| **4. PR Approvals** | 15% | ≥ 2 peer approvals | Branch protection rules satisfied, 0 change requests |
| **5. Branch Freshness**| 15% | 0 commits behind | Fully synchronized with upstream trunk (`origin/main`)|

- **Status Tiers:** **Ready to Ship** (≥90%, Green, Sign-Off armed) • **Caution** (70–89%, Amber) • **Blocked** (<70%, Red).
- **Compliance Artifact Exports:** 1-click Markdown summary export & downloadable JSON audit artifact (`release-readiness-[repo]-[timestamp].json`).

### 7-Factor Risk Scorecard & Health Pool Calculation

$$\text{Health Score (HP)} = \max\left(0, 100 - \sum \text{Deductions}\right)$$

| Risk Factor | Point Deduction Range | Critical Threshold Trigger | Deep-Linked Remediation Action |
| :--- | :---: | :--- | :--- |
| **1. Branch Drift & Divergence** | 0 to -35 pts | `behind >= 6` commits | `git pull --rebase origin main` |
| **2. Failed & Flaky Tests** | 0 to -28 pts | Failing build or pod crash | Quarantine flaky specs, inspect CI logs |
| **3. Secrets & Security Policies**| 0 to -30 pts | Exposed API keys or open S3 | Revoke secrets, enforce IAM policies |
| **4. Open CVE Vulnerabilities** | 0 to -22 pts | High / Critical CVE found | Upgrade package via Dependabot |
| **5. Code Smells & Uncommitted Debt**| 0 to -15 pts | > 8 uncommitted dirty files | Atomic staging & commit generation |
| **6. Unreviewed PR Lag** | 0 to -15 pts | Changes requested or >3d wait| Draft AI review response & re-request |
| **7. Oversized PR Scope** | 0 to -12 pts | > 400 lines or > 15 files | Split into stacked pull requests |

### Demo Script
1. Navigate to **Release Gate** page (`#release`) — show 5-pillar scorecard, 92% readiness score, and export buttons.
2. Navigate to **Risk Scorecard** page (`#risk`) — show the 7-factor deduction table and total HP gauge.
3. Click **"Remediate with Byte"** on any factor — show it navigating back to Companion with a pre-populated diagnostic prompt.

### Speaker Notes
> Crucial takeaway: Byte's visual health state is directly computed from these 7 factors. The pet is not a static graphic — it is an ambient, real-time data visualization of your repository's DevSecOps security posture.

---

## Slide 9: Multimodal AI — Live Voice, Vision & Image Studio

### Title
**Multimodal AI: Live Audio Streaming, TTS & Custom Avatars**

### Multimodal Capability Matrix

```
+-----------------------------------------------------------------------------------+
|  Gemini Live Audio (WS)  │  Gemini TTS Voice (REST)  │  Pet Avatar Studio (Image) |
|  - 16kHz PCM bidirectional- Zephyr speech synthesis  - Pixel-art mascot creation  |
|  - Real-time transcription- Browser fallback         - 30-min ephemeral preview   |
+-----------------------------------------------------------------------------------+
```

### 1. Live Voice & Audio Streaming
- **Gemini Live API (`gemini-3.1-flash-live-preview`):** Bidirectional low-latency audio streaming via WebSocket endpoint (`/live`).
- **16kHz PCM Audio Processing:** Real-time client-side microphone capture with animated waveform visualizer.
- **Simultaneous Transcription:** Displays real-time streaming text as Byte speaks.
- **Privacy & Security Boundaries:** Microphone inactive by default, visual recording indicator, instant socket severance on modal close, **zero audio retention** on server.
- **Guaranteed Fallback:** Web Speech API when WebSocket is unavailable.

### 2. Pet Avatar Studio (Image Generation & Editing)
- **Gemini Image (`gemini-3.1-flash-image`):** Generates and edits customized pixel-art pet sprites from text prompts.
- **Ephemeral Asset Registry:** 30-minute preview TTL before promotion to active companion set.
- **Endpoints:** `POST /api/ai/images/generate`, `POST /api/ai/images/edit`, `POST /api/ai/images/:id/approve`.
- **Aesthetic SVG Generator Fallback:** Procedural local SVG avatar rendering if cloud image API is offline.

### 3. Text-to-Speech Synthesis (TTS)
- **Gemini TTS (`gemini-3.1-flash-tts-preview`):** Expressive audio synthesis using Zephyr voice profile via `POST /api/voice/tts`.
- **Fallback:** Browser-native `window.speechSynthesis`.

### Multi-Tier Resilience & Fallback Matrix

| Modality | Primary Engine | Secondary Fallback | Offline Guarantee |
| :--- | :--- | :--- | :--- |
| **Chat Reasoning** | `gemini-3.7-flash` / `3.6-flash` | `gemini-flash-latest` | Deterministic Rule Engine |
| **Live Voice** | `gemini-3.1-flash-live-preview` | Web Speech API | Text Chat Interface |
| **Speech TTS** | `gemini-3.1-flash-tts-preview` | Browser SpeechSynthesis | Visual Speech Bubbles |
| **Image Studio** | `gemini-3.1-flash-image` | Procedural SVG Generator | Built-in Pixel Sprites |

### Demo Script
1. Click the **microphone icon** in the top bar to open the **Live Voice Modal** — show the audio waveform.
2. (Optional) Speak a brief question: *"Byte, what's my repo risk?"* and show real-time transcription.
3. Open **Avatar Studio** from avatar menu — enter prompt *"Cyberpunk neon fox"* and show generation interface.
4. Highlight: *"Every single AI modality has a graceful fallback — the application never breaks."*

### Speaker Notes
> This is the wow-factor slide. If comfortable, demonstrate live voice streaming. If network latency is unpredictable, show the UI, explain the WebSocket 16kHz PCM pipeline, and highlight the zero-retention privacy guarantee.

---

## Slide 10: Architecture & Tech Stack

### Title
**Production Architecture: React 19 + Express Gateway + Gemini Cloud**

### Technology Stack Overview

| Layer | Technologies & Libraries | Architectural Role |
| :--- | :--- | :--- |
| **Frontend SPA** | React 19, TypeScript, Vite, TailwindCSS v4, Motion (`framer-motion`), Lucide Icons, Canvas Confetti | Reactive 6-page interface, Web Audio synthesizer, SVG DAG engine |
| **Backend Gateway** | Node.js, Express, WebSocket (`ws`), `tsx` (dev), `esbuild` (production bundle) | Gateway server (Port 3004), secret redactor, safety router |
| **AI Integration** | `@google/genai` (Google Gen AI SDK), Gemini 2.5/3.x, Live Audio, Imagen 3, TTS | Multimodal intelligence, persona steering, structured analysis |
| **Safety & Execution**| `child_process.execFile` (argv arrays), 2-layer safety gate, FIFO audit buffer | Subprocess containment, zero shell pass-through, rollback runner |
| **Testing & CI/CD** | Vitest v4.1.11 (31 tests), GitHub Actions, Gitleaks, npm audit, CycloneDX SBOM | Automated test gates, supply chain scanning, artifact generation |

### High-Level System Architecture Diagram

```
[ Developer ] 
      │ (HTTPS / WS)
      ▼
[ React 19 Frontend SPA ] (Port 3004 / Vite)
      │ 
      ├─► Ambient Companion (#companion)      ├─► PR Intelligence (#pr)
      ├─► Repository & DAG (#repository)      ├─► Release Gate (#release)
      ├─► CI/CD Pipelines (#cicd)             └─► Risk Scorecard (#risk)
      │
      ▼ (REST & WebSocket /live)
[ Express API Gateway Server ]
      │
      ├── [ Secret Redactor ] ──► Masks AIza*, ghp_*, AWS keys, Bearer tokens
      ├── [ 2-Layer Safety Gate ] ──► Static Universal Rules + Contextual Lints
      ├── [ Audit Ring Buffer ] ──► FIFO 200-event telemetry store (/api/audit-logs)
      ├── [ Asset Registry ] ──► 30-min TTL ephemeral image preview store
      │
      ├── (Safe CLI Subprocess) ──► [ Local Git CLI / Fixture ] (execFile, argv only)
      └── (TLS 1.3 REST / WS) ──► [ Google Gemini Cloud Services ]
```

### Complete Backend REST & WebSocket API Routes

| Endpoint | Method | Purpose & Payload |
| :--- | :---: | :--- |
| `/api/health` | `GET` | System health: uptime, memory, active AI models, write mode status, telemetry |
| `/api/audit-logs` | `GET` | FIFO ring buffer of audited events (max 200 entries) with timestamps & outcomes |
| `/api/git/live-status` | `GET` | Read-only local Git scanner: branch, ahead/behind, diffs, conflicts, stashes |
| `/api/repo/live` | `GET` | Public GitHub test fixture branch scanner (`farisnour/gitpet-acme-corp`) |
| `/api/git/preview-action`| `POST`| Dry-run simulation: validates command, calculates blast radius and reversal |
| `/api/git/execute-action`| `POST`| Executes approved Git command via `execFile` (requires `GITPET_ALLOW_WRITES=true`)|
| `/api/ai/chat` | `POST`| Multi-turn Gemini chat with prompt sanitization, persona steering & safety filter |
| `/api/gitpet/analyze` | `POST`| Structured JSON repo diagnostic with evidence citations and confidence rating |
| `/api/ai/images/generate`| `POST`| Generates pixel-art mascot preview images with 30-min TTL |
| `/api/ai/images/edit` | `POST`| Modifies existing pet avatar sprites based on text prompt |
| `/api/ai/images/:id/approve`| `POST`| Promotes preview avatar to active asset set |
| `/api/voice/tts` | `POST`| Synthesizes text to speech using Gemini TTS (Zephyr voice) |
| `/live` | `WS` | Bidirectional WebSocket for 16kHz PCM Live Voice and transcription streaming |

### Speaker Notes
> 45 seconds. Point out the clear separation of concerns: the Express Gateway sits strictly between the frontend and the Git CLI, and the safety engine mediates every execution. Mention port 3004, single-command startup, and TLS 1.3 encrypted cloud communication.

---

## Slide 11: Security, AI Governance & Production Readiness

### Title
**DevSecOps by Design: STRIDE, OWASP LLM Top 10, NIST AI RMF**

### STRIDE Threat Model & Engineering Controls

| STRIDE Threat | Attack Vector Analyzed | Code-Level Mitigation Implemented |
| :--- | :--- | :--- |
| **Spoofing** | Unauthorized API calls / origin spoofing | Strict CORS localhost origin isolation, schema validation, optional Basic Auth |
| **Tampering** | Command manipulation & prompt injection | Input sanitization, role-delimited system prompts, regex injection filters |
| **Repudiation** | Untracked destructive operations | FIFO audit log (`/api/audit-logs`) recording timestamp, user, command, AI rationale |
| **Info Disclosure**| Leaking API keys or source credentials | Runtime token redactor masking `AIza*`, `ghp_*`, `AKIA*`, and `Bearer` headers |
| **Denial of Service**| Token exhaustion or WebSocket flood | Output token caps, multi-tier fallback chains, socket idle auto-disconnect |
| **Elevation of Priv.**| Arbitrary shell command execution | Zero shell pass-through, `child_process.execFile` with argv arrays, binary whitelist |

### OWASP LLM Top 10 Comprehensive Defense Matrix

| OWASP Category | Implemented Defense Mechanism |
| :--- | :--- |
| **LLM01: Prompt Injection** | Role-separated system prompts, pre-flight regex sanitizer, 31 automated adversarial tests |
| **LLM02: Sensitive Info Disclosure** | Runtime regex secret redactor (`[REDACTED_SECRET]`), `.gitignore` enforcement, Gitleaks in CI |
| **LLM03: Supply Chain Vulnerabilities** | Pinned dependencies, CycloneDX SBOM generation (`npm run sbom`), automated `npm audit` in CI |
| **LLM04: Data & Model Poisoning** | Ephemeral context windows, zero fine-tuning data retention, grounded Git CLI telemetry |
| **LLM05: Improper Output Handling (XSS)**| `react-markdown` with strict HTML escaping, remark-gfm sanitization, Vitest markdown test suite |
| **LLM06: Excessive Agency** | Strict 2-layer safety gate, dry-run default, mandatory HITL preview modal, pre-computed reversals |
| **LLM07: System Prompt Leakage** | Anti-leakage prompt instructions, persona bounding, architectural isolation |
| **LLM08: Vector / Embedding Weakness** | Grounded directly in live Git CLI output — no stale vector database or embeddings drift |
| **LLM09: Misinformation & Hallucination** | Mandatory evidence citation boxes, confidence percentage scoring, pre-flight branch verification |
| **LLM10: Unbounded Consumption** | 16kHz audio sampling cap, strict token limits, client-side mute & disconnect controls |

### 5-Tier Human-in-the-Loop Oversight Matrix (NIST AI RMF 1.0 Aligned)

```
[ Level 0: Passive ] ──> [ Level 1: Advisory ] ──> [ Level 2: Reviewer ] ──> [ Level 3: Approver ] ──> [ Level 4: BLOCKED ]
Read Git status & HP     AI chat explanations      Avatar image preview       Safe Git write ops        Force-push, hard reset
(Background poll)        (Confidence scores)       (30-min TTL store)         (HITL Modal + Confirm)    (Hard code rejection)
```

| Tier Level | Operations Governed | Human Role | Enforcement Mechanism |
| :---: | :--- | :--- | :--- |
| **Level 0** | Read Git status, display health aura | Passive Observer | Read-only background polling |
| **Level 1** | AI diagnostic explanations & tutoring | Consumer / Learner | Grounded chat with confidence ratings |
| **Level 2** | Mascot avatar image generation | Interactive Reviewer | 30-minute preview TTL before active promotion |
| **Level 3** | Safe Git write operations (`stash`, `pull`, `commit`) | **Mandatory Approver** | **Modal diff preview + explicit human confirmation** |
| **Level 4** | `push --force`, `reset --hard`, `clean -fdx` | **Blocked / Forbidden** | **Hard-rejected by code-level safety engine** |

### Production Readiness & Compliance Verification
- **Automated Test Suite:** 31 Vitest tests passing with 100% success rate across security, executor, and markdown suites.
- **Supply Chain Security:** CycloneDX-compatible SBOM generated via `npm run sbom`.
- **SRE Observability:** Live health diagnostics (`/api/health`), FIFO audit logs (`/api/audit-logs`), SRE Runbook with disaster recovery workflows.
- **Hackathon Compliance:** **All 15 Participant Guidelines (P-01 to P-15)** and **All 20 Submission Checklist Items** fully verified and MET.

### Demo Script
1. Highlight the 5-Tier Oversight Matrix: Level 3 requires explicit human confirmation, Level 4 is permanently blocked in code.
2. (Optional) Run `npm test` in terminal to show 31 passing unit and security tests.
3. Show `/api/health` JSON response displaying server uptime, memory usage, and active AI model configurations.

### Speaker Notes
> This slide proves engineering maturity. Emphasize that GitPet does not merely claim safety — it enforces it with a formal STRIDE threat model, OWASP LLM Top 10 coverage, NIST AI RMF oversight tiers, and 31 automated tests.

---

## Slide 12: Demo Integrity & Live Workspace Mode (P-15)

### Title
**Transparent Demo Integrity: Sandbox vs. Live Workspace**

### Dual Operating Modes (Participant Guideline P-15 Compliant)

| Operating Mode | Data Source | Execution Behavior | Primary Use Case |
| :--- | :--- | :--- | :--- |
| **Sandbox Mode (Default)** | 18 deterministic DevSecOps mock scenarios | Simulated execution with real UI transitions and transcript tags | Hackathon evaluation, feature exploration, safe training |
| **Live Workspace Mode** | Real local Git workspace OR public GitHub fixture | Real Git execution (argv array via `execFile`) if `GITPET_ALLOW_WRITES=true` | Daily production development, real repository inspection |

### 18 Deterministic Sandbox Scenarios

| Domain Category | Included Scenarios & Conditions |
| :--- | :--- |
| **Git Workflows (7)** | `mvp_sync_divergence` (behind 4, ahead 1), `merge_conflict` (conflicted files), `detached_head`, `stale_branch` (14 days old), `unpushed_work`, `clean_healthy`, `unsafe_loss_risk` (destructive reset attempt) |
| **CI/CD Pipelines (4)** | `cicd_failed_build` (Security CVE failure), `cicd_flaky_tests` (70% pass rate), `cicd_vulnerability`, `cicd_deploy_success` |
| **PR Reviews (4)** | `pr_changes_requested` (inline review blockers), `pr_pending_review` (awaiting approvals), `pr_conflicted`, `pr_approved_ready` (squash-ready) |
| **Cloud Infrastructure (3)**| `lost_map` (Terraform state lock), `smoke_cloud` (K8s Pod CrashLoopBackOff), `shield_cracked` (S3 bucket open to public read) |

### Live Workspace Data Integration
1. **Local Host Repository (`/api/git/live-status`):**
   - Executes read-only commands: `git status --porcelain=v2`, `git rev-parse`, `git log -n 20`, `git stash list`.
   - Analyzes real branch divergence, dirty working trees, untracked changes, and in-progress merge/rebase locks.
2. **Public GitHub Fixture (`/api/repo/live`):**
   - Connects to public repository: `farisnour/gitpet-acme-corp-ecommerce-store`.
   - Demonstrates live remote branch switching: `main`, `feature/cart-stepper`, `feature/payment-v2`, `refactor/checkout-v2`.

### 4-Layer Safety Net for Live Workspace Writes
1. **Safety Interceptor:** Blocks destructive syntax invariants before execution.
2. **Contextual Linter:** Verifies current working tree state matches precondition requirements.
3. **Dry-Run Preview:** Simulates output and displays blast radius to the user.
4. **Explicit Human Confirmation:** Requires manual button click in the Preview Changes modal.
5. **Fail-Safe Executor:** Invokes `child_process.execFile` with explicit argv arrays, 10s timeout, and write permission gate (`GITPET_ALLOW_WRITES=true`).

### Demo Script
1. Toggle the **Live Workspace** switch in the top navigation bar.
2. Point out the visual indicator badge showing connection to the active local Git repository.
3. State to judges: *"In sandbox mode, GitPet provides 18 reproducible test scenarios; in live mode, it inspects your real repository with identical 2-layer safety guarantees."*

### Speaker Notes
> Transparency is essential for P-15 compliance. Clearly distinguish between sandbox simulations and live repository execution. Judges appreciate explicit boundaries and honest engineering integrity.

---

## Slide 13: Team, AI Transparency & Closing

### Title
**GitPet — Team Ribbon Patrol (Team 05)**

### Team Members & Contributions
- **Aliasgar Husain** (`Alhusain@rbbn.com`) — Project Lead, Architecture, Multi-Model Gemini Integration
- **Lucas Whitaker** — Safety Policy Engine, Automated Testing, Security Threat Modeling
- **David Castelli** — React 19 Frontend, SVG DAG Graph Engine, Web Audio Synthesizer
- **Faris Nour** — Live GitHub Test Fixtures, PR Intelligence Drawer, Telemetry Pipelines

### AI Usage Disclosure (Participant Guideline P-06 Compliant)

**Runtime AI Model Integration:**
- **Google Gemini 2.5/3.x Flash & Pro** — Core reasoning, state diagnosis, risk assessment, and safe action generation.
- **Gemini Live API (`gemini-3.1-flash-live-preview`)** — Bidirectional 16kHz PCM audio streaming over WebSocket.
- **Gemini Image (`gemini-3.1-flash-image`)** — Mascot avatar sprite generation and iterative editing.
- **Gemini TTS (`gemini-3.1-flash-tts-preview`)** — Expressive speech synthesis with Zephyr voice.

**Development & Engineering Assistance:**
- **Google AI Studio** — System instruction prototyping, parameter tuning, and persona calibration.
- **Antigravity (Gemini)** — TypeScript architecture, React 19 component design, and TailwindCSS layout.
- **Claude Code** — Vitest test case formulation and regex safety sanitizer validation.
- **Microsoft Copilot** — Code autocomplete, inline docstrings, and documentation scaffolding.

> *All AI-suggested code, safety filters, and test suites underwent rigorous human audit, review, and verification by Team 05.*

### Summary of Key Achievements
1. **Ambient DevSecOps Telemetry** — 18 symptom postures and dynamic auras make repository health visible at a glance.
2. **Bounded AI Agency** — 2-layer safety gate guarantees zero unvalidated force-pushes, data wipes, or injections.
3. **Multimodal Interaction** — Text, live bidirectional voice, speech synthesis, and avatar studio with 100% offline fallback resilience.
4. **Comprehensive DevSecOps Suite** — 7-factor risk scoring, multi-lane DAG visualizer, CI/CD telemetry, and PR intelligence.
5. **Enterprise Production-Ready** — 31 Vitest tests, STRIDE threat model, NIST AI RMF governance, CycloneDX SBOM, and SRE Runbook.

### Try It Yourself (Quickstart)

```bash
# 1. Clone the repository
git clone https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol.git
cd DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol

# 2. Install dependencies & configure environment
npm install
cp .env.example .env    # Add GEMINI_API_KEY (optional - rule engine fallback included)

# 3. Launch the development server
npm run dev             # Opens http://localhost:3004

# 4. Run automated test suite
npm run test            # Runs 31 Vitest tests (security, executor, markdown)
```

### In-App Pitch Deck
Press **`P`** anywhere in the running web application to open the built-in interactive 7-slide pitch deck presentation.

### Speaker Notes
> Close strong. Press `P` to open the in-app pitch deck as a visual finale. Thank the judges, provide the GitHub repository URL, and open the floor for Q&A. Be prepared to address questions on the 2-layer safety engine, the 7-factor risk calculation formula, or the live WebSocket audio streaming architecture.

---

## Appendix: Operational Quick Reference

### Application Keyboard Shortcuts

| Shortcut | Scope | Triggered Action |
| :--- | :--- | :--- |
| `Spacebar` | Global | Pet Byte (triggers purring audio synthesis + floating heart particles) |
| `⌘K` / `Ctrl+K` | Global | Opens Quick Command Palette (scenario selection, navigation, settings) |
| `P` | Global | Opens the In-App 7-Slide Pitch Deck Modal |
| `Esc` | Global | Closes any currently active modal or drawer |

### Available npm CLI Scripts

| Script Command | Purpose & Execution Details |
| :--- | :--- |
| `npm run dev` | Starts full-stack development server on port 3004 with hot-module reloading |
| `npm run build` | Compiles Vite frontend bundle and builds backend gateway via `esbuild` |
| `npm run start` | Launches production server from `dist/server.cjs` |
| `npm run test` | Executes all 31 Vitest unit, security, executor, and markdown tests |
| `npm run sbom` | Generates CycloneDX-compatible JSON dependency inventory manifest |
| `npm run lint` | Executes TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Cleans `dist/` build output artifacts |

### Documentation Architecture Index

| Documentation File | Primary Scope & Contents |
| :--- | :--- |
| `docs/PROJECT_OVERVIEW.md` | Executive summary, problem statement, core persona definitions, value proposition |
| `docs/README.md` | Complete functional specification, feature inventory, API reference |
| `docs/ARCHITECTURE.md` | C4 system & container diagrams, execution sequences, layout routing |
| `docs/SECURITY_THREAT_MODEL.md` | STRIDE threat analysis, OWASP LLM Top 10 mitigations, secret redactor specs |
| `docs/AI_GOVERNANCE.md` | NIST AI RMF 1.0 system card, 5-tier human oversight matrix, transparency disclosures |
| `docs/RUNBOOK.md` | SRE operational guide, `/api/health` monitoring, alert runbooks, disaster recovery |
| `docs/TEST_REPORT.md` | 31 test case descriptions, execution logs, and validation results |
| `docs/DEMO_NOTES.md` | Component fidelity classification, sandbox vs. live data source mapping |
| `docs/LIVE_WORKSPACE.md` | Live workspace setup guide, local Git CLI & GitHub fixture integration |
| `docs/SBOM_MANIFEST.md` | Software bill of materials, package licenses, supply chain security posture |
| `docs/GUIDELINES_COMPLIANCE.md` | Compliance mapping for all 15 Participant Guidelines (P-01 through P-15) |
| `docs/CHECKLIST.md` | Verification matrix for all 20 Hackathon Submission Checklist items |
| `docs/USER_GUIDE.md` | Comprehensive end-user operations manual covering all 6 application pages |
| `docs/Features/` | Deep-dive documentation for all 8 functional and architectural subsystems |
