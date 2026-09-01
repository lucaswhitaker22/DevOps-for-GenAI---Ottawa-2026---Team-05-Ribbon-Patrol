# GitPet Demo Presentation — Slide Content

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Presentation Deck:** `GitPet_Professional_Deck 11.pptx` (12 Slides)  
**Estimated Duration:** 10–12 minutes  
**Target Audience:** Technical Judges, DevOps Engineers, AI Safety Evaluators  

---

## Slide 1: Title & Problem Hook

### Slide Header & Banner
```
GitPet — Ambient DevSecOps Repository Companion
DEVOPS FOR GENAI 2026 | TEAM 05
"See risk. Understand evidence. Resolve safely."
```

### Team Members & Contributions
- **Aliasgar Husain** (`Alhusain@rbbn.com`) — Project Lead, Architecture, Multi-Model Gemini Integration
- **Lucas Whitaker** — Safety Policy Engine, Automated Testing, Security Threat Modeling
- **David Castelli** — React 19 Frontend, SVG DAG Graph Engine, Web Audio Synthesizer
- **Faris Nour** — Live GitHub Test Fixtures, PR Intelligence Drawer, Telemetry Pipelines

### The Core Dilemma: 3 Critical Developer Pain Points

```
+-----------------------------------------------------------------------------------+
| 1. Context Fragmentation       | 2. Excessive AI Agency        | 3. Inaccessible Telemetry|
| Drift, stashes, upstream lag   | Unbounded agents run blind    | Dense terminal logs hide |
| discovered only on broken sync | force-pushes & destructive ops| merge topology & CVEs    |
+-----------------------------------------------------------------------------------+
```

1. **Context Fragmentation & Cognitive Overload**
   - Developers work blind to upstream branch drift, uncommitted stash debt, detached HEADs, and stale PR review threads.
   - Synchronization errors are discovered late—during high-friction pulls, rebases, or broken staging releases.
   - Developers lose 20–30% of their day context-switching between terminal windows, CI/CD portals, and Git GUIs.

2. **The "Excessive Agency" Dilemma in AI Coding Assistants**
   - Unbounded autonomous agents with shell execution run destructive commands (`git push --force`, `git reset --hard`, `git clean -fdx`) without explaining blast radius.
   - Prompt-only safety instructions fail against hallucinations, context dilution, or indirect prompt injections.
   - Developers lack pre-computed rollback plans when AI-suggested operations mutate working tree state.

3. **Inaccessible Git & Pipeline Telemetry**
   - Non-linear Git DAG topologies, merge base divergence, and multi-file conflicts are hard to parse from raw logs.
   - Flaky CI/CD test runs and supply-chain CVE warnings remain buried in thousands of lines of terminal output.

### Speaker Notes
> Introduce GitPet and frame the three pain points: fragmented context, excessive AI agency, and inaccessible Git and pipeline telemetry. Open directly on the Companion page with Byte visible. Keep this tight — 60 seconds max. The goal is to make judges feel the pain before showing the solution.

---

## Slide 2: The Solution — Notice, Understand, Resolve

### Slide Header
```
SOLUTION
Notice · Understand · Resolve
Byte turns repository telemetry into an actionable DevSecOps loop.
```

### The 3-Step Human-in-the-Loop Loop

```
+----------------------------------------------------------------------------------------------------+
|  1. NOTICE (Ambient Telemetry)  -->  2. UNDERSTAND (Grounded AI)  -->  3. RESOLVE (Bounded Action) |
|  - 18 visual symptom postures        - Multimodal Gemini reasoning      - 2-layer safety gate      |
|  - Dynamic 4-tier health auras       - Evidence signals box             - Modal diff preview       |
|  - Web Audio synthesized cues        - Pre-computed reversal plans      - Verified argv execution  |
+----------------------------------------------------------------------------------------------------+
```

1. **1. NOTICE (Ambient Awareness)**
   - Byte's posture, mood aura, and chiptune audio cues reflect repository health at a glance.
   - **18 expressive symptom postures** map 1:1 to Git status, CI/CD pipeline states, PR bottlenecks, and cloud infrastructure alerts.
   - **4-tier dynamic health aura:**
     - **Healthy** (80–100 HP, Emerald Glow)
     - **Attention** (45–79 HP, Amber Glow)
     - **Blocked** (<45 HP, Orange Glow)
     - **Critical Hazard** (0 HP / Unsafe, Grayscale)

2. **2. UNDERSTAND (Grounded AI Reasoning)**
   - Multimodal Gemini reasoning explains repository issues in plain, developer-friendly language.
   - Surfaces concrete **evidence signals** (branch divergence, dirty files, conflict markers, CVE IDs).
   - Delivers explicit **confidence ratings (%)**, **4-tier risk badges**, and **deterministic reversal steps**.

3. **3. RESOLVE (Bounded, Safe Execution)**
   - Bounded, reversible Git actions with mandatory human-in-the-loop preview.
   - **Zero blind execution:** modal diff preview reveals blast radius, affected files, and exact `argv` parameters.
   - **One-click rollback:** restores working tree state safely using pre-computed undo commands.

### Speaker Notes
> Explain that Byte is a real-time visualization of repository posture, not decorative branding. Point to Byte on screen. Explain the health bar (e.g. 68% HP, amber aura = "Attention"). Emphasize that GitPet does not replace the developer's judgment — it augments it with visible ambient telemetry, grounded explanations, and safe, reversible actions.

---

## Slide 3: AI Assistance — Multi-Persona Guidance & Tiered Models

### Slide Header
```
AI ASSISTANCE
Talk to Byte: multi-persona guidance
Four roles, three model tiers, and structured responses tied to repository evidence.
```

### 4 Specialized AI Personas

| Persona | Tone & Style | Domain Specialization | System Prompt Focus |
| :--- | :--- | :--- | :--- |
| **Byte Mascot** | Friendly, witty developer humor | Ambient companion & daily workflow | Encouraging tips, routine status, gamified guidance |
| **Senior Architect** | Rigorous, analytical, topological | Branching strategy & Git internals | Rebase vs merge, DAG ancestry, multi-lane branch design |
| **Safety Auditor** | Strict, cautious, compliance-first | Work-loss prevention & security | Stash verification, rollback safety, zero-data-loss resets |
| **Git Tutor** | Pedagogical, clear, conceptual | Developer education & internals | Teaches blobs, trees, commit objects, and index mechanics |

### Anatomy of Every AI Response

- **Evidence Signals Box** — Grounded repository facts (current branch, ahead/behind counts, dirty files, conflict markers).
- **Confidence Rating** — Quantitative score (e.g., `96% Confidence`) indicating grounded factual certainty.
- **Risk Badge** — Four color-coded levels: `SAFE` (Green), `CAUTION` (Amber), `PROTECTED` (Blue), `HAZARD` (Red).
- **Recommended Safe Action Card** — Formatted shell command, expected outcome, copy CTA, and pre-computed reversal.
- **Preview Diff & Scope Button** — Triggers human-in-the-loop modal before any subprocess execution.

### Speaker Notes
> Demo Behind Main, ask for a status report, then point to evidence, confidence, risk, and the reversal command. Switch to the Behind Main scenario using the Scenario Switcher (`⌘K` or top bar). Point out Byte pulling on leash with amber aura. Click the prompt chip for "Status report & diagnostics". Show the AI response: evidence box, confidence score, recommended action card (`git pull --rebase origin main`), and the pre-computed reversal command (`git rebase --abort`).

---

## Slide 4: Safety — Layer 1: Static Rules (The Code-Level Guarantee)

### Slide Header
```
SAFETY
Bounded agency: the code-level guarantee
The model can suggest. The safety engine decides what is allowed.
LAYER 1 — STATIC RULES
```

### Why System Prompts Are Not Enough
> *"Prompt instructions are guidance; code-level safety engines are guarantees."*  
> GitPet never passes unvalidated LLM output directly to a shell. Every proposed action passes through Layer 1 static syntax validation before any evaluation.

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

### Speaker Notes
> Show Preview Changes. Mention blast radius, affected files, explicit confirmation, and deterministic reversal. State to judges: *"Even if an LLM hallucinates `git push --force` or an injection like `git status; rm -rf /`, the static engine drops it immediately at the gateway."*

---

## Slide 5: Safety — Layer 2: Contextual Lints (Working-Tree Aware)

### Slide Header
```
SAFETY
Bounded agency: the code-level guarantee
The model can suggest. The safety engine decides what is allowed.
LAYER 2 — CONTEXTUAL LINTS
```

### Context-Aware Precondition Checks
> Even syntactically valid Git commands can be hazardous if run in the wrong repository state. Layer 2 inspects the live working tree, staging index, and lock files before permitting action.

### Layer 2: Contextual Lints (Working-Tree State Aware)

| Lint Identifier | Repository Context Detected | Prevented Failure | Safe Recommendation |
| :--- | :--- | :--- | :--- |
| `stash-misses-untracked` | Working tree contains untracked files | Untracked files left behind on stash | Suggests `git stash push -u` |
| `push-while-behind` | Branch is behind remote (`behind >= 1`) | Remote rejects non-fast-forward push | Suggests `git pull --rebase` first |
| `diverged-pull-needs-rebase` | Local and remote branches diverged | Unintended merge commit pollution | Suggests `git pull --rebase origin main` |
| `operation-in-progress` | Active rebase/merge lock files present | Corrupted intermediate Git state | Limits commands to `--continue`, `--skip`, `--abort` |
| `stash-pop-empty` | Stash stack length == 0 | Confusing "No stash entries found" error | Blocks empty stash pop |
| `dirty-tree-checkout` | Uncommitted edits on branch switch | Accidental overwrite of active work | Prompts to stash or commit first |

### Deterministic Reversal Safeguard

| Proposed Action | Pre-Computed Reversal Command | Rollback Safety Guard |
| :--- | :--- | :--- |
| `git stash push -u -m "backup"` | `git stash pop` | Verifies clean index before pop |
| `git pull --rebase origin main` | `git rebase --abort` | Verified during active rebase |
| `git merge origin/main` | `git merge --abort` | Verified during active merge |
| `git commit -m "feat: ..."` | `git reset --soft HEAD~1` | Preserves changes in working index |
| `git checkout -b feature/new` | `git checkout -` | Returns to previous branch |

### Speaker Notes
> Show Preview Changes. Mention blast radius, affected files, explicit confirmation, and deterministic reversal. Highlight that GitPet validates contextual safety against live Git state. Point out the 31 automated Vitest tests validating these rules.

---

## Slide 6: Repository — Multi-Lane DAG & Working Tree Studio

### Slide Header
```
REPOSITORY
See Git topology, diffs, stashes, and history
The repository workspace makes branch state and file changes understandable.
MULTI-LANE DAG | WORKING TREE
```

### Multi-Lane DAG Visualizer
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

### Speaker Notes
> Navigate the DAG, inspect a commit, then show diffs, staging controls, stashes, and rollback history. Focus on visual clarity: turning confusing terminal output into an intuitive multi-lane topological map.

---

## Slide 7: CI/CD — From Pipeline Failure to Remediation

### Slide Header
```
CI/CD
From pipeline failure to remediation
Track stages, inspect logs, quarantine flaky tests, and address vulnerable dependencies.
EXPANDABLE LOGS | FLAKY TESTS | SUPPLY CHAIN
```

### 5-Stage Pipeline Progression Tracker
- **Stage Progression:** `01. Lint & Format` ──> `02. Unit Tests` ──> `03. CVE Scan` ──> `04. Build` ──> `05. Staging`
- **Status Indicators:** `passed` (Green), `failed` (Red pulse), `running` (Blue pulse), `pending` (Slate).
- **Expandable Terminal Logs:** Live, expandable line-by-line build logs (e.g., `FAIL auth.spec.ts token refresh timeout 1 test failed in 48s`).

### Flaky Test Suite Diagnostics & Quarantine
- **Pass Rate & Recent Failures:** Computes spec reliability (e.g., `70% Pass Rate`, 3 failures across last 10 runs).
- **Last Failing Commit:** Tracks exact regression commit SHA and error stack trace.
- **1-Click "Quarantine & Analyze":** Isolates flaky specs to prevent deployment pipeline blocking while notifying QA.

### Supply Chain Security & CVE Remediation
- **CVE Severity & Version:** Pinpoints vulnerable package and CVSS severity (e.g., CVE-2026-8819 in `jsonwebtoken@9.0.0`).
- **Exact Safe Target Version:** Recommends exact patched dependency release (`9.0.2`).
- **1-Click "Draft Dependabot Patch":** Generates automated PR branch and commit diff for immediate dependency upgrade.

### Speaker Notes
> Use the build-failure scenario. Show the failed stage, terminal logs, flaky test diagnostics, and CVE remediation. Keep this to 45 seconds. Focus on the two high-value features: flaky test quarantining and 1-click CVE patch generation.

---

## Slide 8: Pull Requests — From Blocked Review to Merge Readiness

### Slide Header
```
PULL REQUESTS
From blocked review to merge readiness
Unify approvals, turnaround, inline threads, and AI-assisted resolution.
```

### PR Telemetry & Bottleneck Tracker
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

### Speaker Notes
> Show PR #214, review metrics, the file-linked comment, and the one-click AI resolution response. 45 seconds. The AI resolution composer is the star here: it demonstrates Gemini synthesizing reviewer feedback and code context into a polite, technically complete developer response.

---

## Slide 9: Scoring — Release Gate + Deployment Readiness

### Slide Header
```
SCORING
Release Gate + Deployment
Deployment readiness and repository health stay aligned with Byte's visual state.
HEALTH FACTORS | 68 ATTENTION HP | Score = max(0, 100 - deductions)
```

### 5-Pillar Deployment Release Gate

```
+---------------------------------------------------------------------------------------+
|  Tests Passing (25%)  |  Coverage (20%)  |  Vulnerabilities (25%) |  PR Approvals (15%)|
|    [ 100% Target ]    |   [ >=80% Target] |    [ 0 High/Crit CVE ] |  [ >=2 Approvals ] |
|  Freshness (15%)      |  OVERALL SCORE: 92% (READY TO SHIP) - SIGN-OFF ARMED          |
+---------------------------------------------------------------------------------------+
```

- **Status Tiers:** **Ready to Ship** (≥90%, Green, Sign-Off armed) • **Caution** (70–89%, Amber) • **Blocked** (<70%, Red).
- **Compliance Artifact Exports:** 1-click Markdown summary export & downloadable JSON audit artifact.

### Speaker Notes
> Show the five weighted release pillars, active blockers, exports, then the seven risk factors and Remediate with Byte. Explain that Byte's visual HP (e.g. 68 HP) is calculated directly from repository risk deductions.

---

## Slide 10: Scoring — Dynamic Weighted Risk Analysis

### Slide Header
```
SCORING
Risk Analysis
Dynamic weighted risk assessment
```

### 7-Factor Health Pool & Risk Deduction Breakdown

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

### Dynamic 4-Tier Health Aura Mapping
- **Healthy** (80–100 HP, Green) — Low risk, clean repository state.
- **Attention** (45–79 HP, Amber) — Moderate drift, uncommitted debt, or pending reviews.
- **Blocked** (<45 HP, Orange) — Active merge conflicts, failing test suites, or critical CVEs.
- **Critical Hazard** (0 HP, Grayscale) — Unsafe loss risk or destructive condition detected.

### Speaker Notes
> Show the five weighted release pillars, active blockers, exports, then the seven risk factors and Remediate with Byte. Show how clicking "Remediate with Byte" deep-links back to the Companion with a pre-populated diagnostic prompt.

---

## Slide 11: Architecture — React 19 + Express Gateway + Gemini Services

### Slide Header
```
ARCHITECTURE
React 19 + Express gateway + Gemini services
A production-shaped separation between interface, policy, execution, and external services.
```

### Technology Stack Overview

| Layer | Technologies & Libraries | Architectural Role |
| :--- | :--- | :--- |
| **Frontend SPA** | React 19, TypeScript, Vite, TailwindCSS v4, Motion (`framer-motion`), Lucide Icons | Reactive 6-page interface, Web Audio synthesizer, SVG DAG engine |
| **Backend Gateway** | Node.js, Express, WebSocket (`ws`), `tsx`, `esbuild` | Gateway server (Port 3004), secret redactor, safety router |
| **AI Integration** | `@google/genai` (Google Gen AI SDK), Gemini 2.5/3.x, Live Audio, Imagen 3, TTS | Multimodal intelligence, persona steering, structured analysis |
| **Safety & Execution**| `child_process.execFile` (argv arrays), 2-layer safety gate, FIFO audit buffer | Subprocess containment, zero shell pass-through, rollback runner |
| **Testing & CI/CD** | Vitest v4.1.11 (31 tests), GitHub Actions, Gitleaks, CycloneDX SBOM | Automated test gates, supply chain scanning, artifact generation |

```
[ Developer ] --(HTTPS/WS)--> [ React 19 SPA ] --(REST/WS)--> [ Express Gateway ]
                                                                     │
                                        ├── [ Secret Redactor ] ─────┤
                                        ├── [ 2-Layer Safety Gate ] ─┤
                                        ├── [ Audit Ring Buffer ] ───┤
                                        │                            │
                                        ├── (Safe CLI Subprocess) ──► [ Local Git CLI / Fixture ] (execFile, argv only)
                                        └── (TLS 1.3 REST / WS) ──► [ Google Gemini Cloud Services ]
```

### Speaker Notes
> Emphasize that the gateway prevents AI output from becoming a direct shell command and manages secrets, validation, audit, and execution. Point out the clear separation of concerns: the Express Gateway sits strictly between the frontend and the Git CLI, and the safety engine mediates every execution.

---

## Slide 12: Conclusion & Summary — Ambient DevSecOps + Live Launch

### Slide Header
```
GitPet makes DevSecOps health ambient, explainable, and safely actionable.
AMBIENT AWARENESS | BOUNDED AGENCY | MULTIMODAL AI | DEVSECOPS INTELLIGENCE | PRODUCTION READY
Team Ribbon Patrol: Aliasgar Husain, Lucas Whitaker, David Castelli, Faris Nour
npm run dev  -->  http://localhost:3004
```

### 5 Core Pillars of GitPet

1. **AMBIENT AWARENESS** — No terminal hunting
   - 18 symptom postures, dynamic 4-tier glowing auras, and synthesized chiptune audio cues give peripheral repository awareness.
2. **BOUNDED AGENCY** — Safety enforced in code
   - 2-layer safety engine (static rules + contextual lints), mandatory HITL preview modal, dry-run simulation, and pre-computed reversals.
3. **MULTIMODAL AI** — Text, voice, image, TTS
   - Gemini 2.5/3.x multi-tiered reasoning, Gemini Live WebSocket audio, Imagen avatar generation, and expressive TTS with offline fallback.
4. **DEVSECOPS INTELLIGENCE** — DAG, CI/CD, PR, release
   - Multi-lane SVG DAG visualizer, 5-stage pipeline tracker with flaky test quarantine, PR reviewer assistant, and 5-pillar release gate.
5. **PRODUCTION READY** — Tests, governance, SBOM, runbook
   - 31 Vitest tests (100% pass), STRIDE threat model, OWASP LLM Top 10 defenses, NIST AI RMF governance, CycloneDX SBOM, and SRE runbook.

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

### Speaker Notes
> Close with the core message: GitPet keeps the developer in control. Mention AI-use transparency and invite the judges to try the live application. Thank the judges, provide the GitHub repository URL, and open the floor for Q&A.

---

## Appendix: Operational Quick Reference

### Application Keyboard Shortcuts

| Shortcut | Scope | Triggered Action |
| :--- | :--- | :--- |
| `Spacebar` | Global | Pet Byte (triggers purring audio synthesis + floating heart particles) |
| `⌘K` / `Ctrl+K` | Global | Opens Quick Command Palette (scenario selection, navigation, settings) |
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
| `docs/PRESENTATION_SLIDES.md` | Complete 12-slide presentation structure aligned 1:1 with `GitPet_Professional_Deck 11.pptx` |
| `docs/SLIDE_NOTES.md` | Spoken presentation rehearsal notes aligned 1:1 with the 12 slides |
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
