# GitPet Demo Presentation — Slide Content

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Estimated Duration:** 10–12 minutes

---

## Slide 1: Title & Problem Hook

### Title
**GitPet — Your Ambient DevSecOps Repository Companion**

### Subtitle
*Team 05 — Ribbon Patrol | DevOps for GenAI Hackathon, Ottawa 2026*

### Team
- **Project Lead:** Aliasgar Husain
- **Team Members:** Lucas Whitaker, David Castelli, Faris Nour

### The Problem (3 Pain Points)

1. **Context Fragmentation & Cognitive Overload**
   Developers lose track of local vs. remote drift, stash states, upstream divergence, and PR review comments until a pull or rebase fails catastrophically.

2. **The "Excessive Agency" Dilemma in AI Coding Assistants**
   Autonomous agents with shell execution permissions can accidentally force-push, discard uncommitted changes, or trigger destructive rebases without the developer understanding the blast radius.

3. **Inaccessible Git & Pipeline Telemetry**
   Complex Git DAG topologies, detached HEADs, flaky test suites, and multi-file merge conflicts are intimidating and time-consuming to decipher through terminal logs alone.

### Speaker Notes
> Open on the Companion page with Byte visible. Introduce the team, then immediately frame the three problems. Keep this tight — 60 seconds max. The goal is to make judges feel the pain before showing the solution.

---

## Slide 2: The Solution — Notice, Understand, Resolve

### Title
**GitPet: A Continuous DevSecOps Loop**

### The 3-Step Loop

```
[ Healthy Pet ] ---> ( Repository / Pipeline Event ) ---> [ Pet Signals Symptom & Aura ]
       ^                                                                  |
       |                                                                  v
[ Verified State ] <--- ( Developer Confirms Write ) <--- [ Multi-Factor Risk & Explanation ]
```

1. **Notice** — Byte's posture, aura, and audio cues reflect repository health at a glance. 18 expressive symptom states map directly to Git and infrastructure conditions.
2. **Understand** — Gemini AI explains issues in plain language with evidence citations, confidence ratings, 7-factor risk breakdowns, and reversal plans.
3. **Resolve** — Bounded, reversible Git actions with mandatory human-in-the-loop preview and confirmation. Zero blind execution.

### 4 Core Differentiators

| Differentiator | What It Means |
| :--- | :--- |
| **Ambient & Non-Intrusive** | Sits beside your editor. 18 symptom postures, dynamic health auras, Web Audio cues. Passive awareness without interrupting flow. |
| **Bounded AI Agency** | Mandatory human-in-the-loop preview. Pre-computed reversal commands. 2-layer static & contextual safety engine. Zero force-push. |
| **Multimodal AI Integration** | Gemini Flash/Pro reasoning. Gemini Live Audio WebSocket streaming. Gemini Image avatar generation. TTS speech synthesis. |
| **DevSecOps Intelligence & DAG** | 7-factor risk score engine. Interactive multi-lane Git DAG visualizer. CI/CD & PR Intelligence drawers. Dual live & sandbox modes. |

### Speaker Notes
> Point to Byte on screen. Explain the health bar (e.g. 68% HP, amber aura = "Attention"). Emphasize that GitPet doesn't replace the developer's judgment — it augments it with visible telemetry and safe, reversible actions.

---

## Slide 3: Live AI Chat & Multi-Persona Assistance

### Title
**Talk to Byte: 4 Personas, 3 Model Tiers, 100% Grounded**

### 4 AI Personas

| Persona | Style | Focus |
| :--- | :--- | :--- |
| **Byte Mascot** | Friendly, witty developer humor | Ambient companion, encouraging guidance |
| **Senior Architect** | Rigorous, analytical | Deep DAG topology, rebase vs merge strategy, branch architecture |
| **Safety Auditor** | Strict, compliance-focused | Zero data-loss, safe rollback, stash verification, clean resets |
| **Git Tutor** | Pedagogical, clear | Teaches Git internals: blobs, trees, commit objects, staging index |

### 3 Model Speed & Depth Tiers

| Tier | Model | Use Case |
| :--- | :--- | :--- |
| **Fast** | `gemini-2.5-flash` / `gemini-flash-lite` | Instant status checks & one-liner answers |
| **General** | `gemini-2.5-flash` / `gemini-3.6-flash` | Standard chat, tutoring, repository analysis |
| **Deep Reasoning** | `gemini-2.5-pro` / `gemini-3.7-flash` | Complex multi-branch conflicts & architecture guidance |

### Every AI Response Includes

- **Evidence Signals Box** — Cites concrete repo data (current branch, upstream divergence, dirty file list, conflict markers)
- **Confidence Rating** — High / Medium / Low with numeric percentage
- **Risk Badge** — Safe / Caution / Protected / Hazard
- **Recommended Safe Action Card** — Verified shell commands with syntax highlighting, 1-click copy, expected outcome, and pre-computed reversal command
- **Preview Diff & Scope Button** — Opens the human-in-the-loop confirmation modal

### Categorized Prompt Chips (1-Click)
- `📊 Status report & diagnostics`
- `🚨 Work-loss risk assessment`
- `🌲 Explain branch divergence`
- `🔀 Review PR & reviewer feedback`
- `⚡ CI/CD test failure diagnosis`

### Demo Script
1. Switch to **"Behind Main (Branch Drift)"** scenario using the Scenario Switcher
2. Watch Byte's posture change — pulling on leash, amber aura
3. Click the prompt chip: **"Status report & diagnostics"**
4. Show the AI response — evidence box, confidence score, recommended action card
5. Highlight the **reversal command** displayed alongside the action

### Speaker Notes
> This is the key demo moment. Make sure the Gemini API key is configured so responses are live. If the API is unavailable, the fallback rule-based engine still produces a structured response — mention this resilience.

---

## Slide 4: The 2-Layer Safety Engine

### Title
**Bounded Agency: Zero Force-Push, Zero Shell Pass-Through**

### Why This Matters
> The model is instructed to avoid unsafe commands, but that is guidance, not a guarantee. The safety engine is the boundary that actually holds.

### Layer 1: Static Rules (Universal Danger Invariants)

| Rule Code | What It Blocks | Safe Alternative |
| :--- | :--- | :--- |
| `force-push` | `git push --force` or `-f` | `git push --force-with-lease` |
| `hard-reset` | `git reset --hard` | `git reset --keep` |
| `clean` | `git clean -fdx` | (Blocked entirely) |
| `force-branch-delete` | `git branch -D` | `git branch -d` |
| `stash-destroy` | `git stash drop` / `git stash clear` | (Blocked entirely) |
| `remote-ref-delete` | `git push origin --delete` | (Blocked entirely) |
| `shell-injection` | Metacharacters `; \| & > < $` | (Rejected) |
| `non-git-command` | `sudo`, `rm`, `curl` | (Binary whitelisting — git only) |

### Layer 2: Contextual Lints (Working-Tree Aware)

| Lint Code | What It Catches | Suggestion |
| :--- | :--- | :--- |
| `stash-misses-untracked` | `git stash` while untracked files exist | Use `git stash push -u` |
| `push-while-behind` | Pushing a branch behind upstream | Pull/rebase first |
| `operation-in-progress` | Non-continue commands during active rebase/merge | Only `--continue`, `--skip`, `--abort` permitted |
| `stash-pop-empty` | `git stash pop` with empty stash stack | Warns against popping nothing |

### Execution Architecture

- **Dry-Run Mode (Default):** Validates syntax, checks blast radius, simulates outcome — zero disk writes
- **Verified Write Mode (`GITPET_ALLOW_WRITES=true`):** Executes via `child_process.execFile` with argv arrays (never shell), 10s hard timeout
- **Pre-Computed Reversal Commands:** Every action paired with deterministic undo step

| Proposed Action | Reversal Command |
| :--- | :--- |
| `git stash push -m "gitpet_backup"` | `git stash pop` |
| `git pull --rebase origin main` | `git rebase --abort` |
| `git merge origin/main` | `git merge --abort` |
| `git commit -m "feat: ..."` | `git reset --soft HEAD~1` |
| `git checkout -b feature/new` | `git checkout -` |

### Verification
- **31 automated Vitest tests** across `security.test.ts`, `executor.test.ts`, `markdown.test.ts`
- Validates: secret masking, prompt injection blocking, destructive command rejection, contextual lints, human approval gates, markdown XSS defense
- **CI Pipeline:** TypeScript lint → Vitest → Gitleaks secret scan → npm audit → build verification

### Demo Script
1. Click **"Preview Changes"** on the recommended action from Slide 3
2. Show the Preview Changes Modal: exact command, blast radius, affected files, reversal step
3. Say: "Even if the AI hallucinated a `git push --force`, the safety engine would hard-block it at the code level"
4. (Optional) Run `npm test` in terminal to show 31 tests passing live

### Speaker Notes
> This is the most important slide for judges. Emphasize that the safety engine is provider-agnostic — it behaves identically whether the command came from Gemini, the rule engine, or manual input. The AI is guidance; this module is the guarantee.

---

## Slide 5: Repository DAG Graph & Diffs

### Title
**See Your Git Topology — Multi-Lane DAG Visualization**

### Interactive Multi-Lane DAG Visualizer

- **SVG Commit Graph** rendering commit lineage across parallel visual lanes:
  - **Main Trunk Lane** — Tracks upstream origin commits
  - **Local Feature Lane** — Tracks local branch commits
  - **Secondary Lanes** — Tracks diverged branches and forks
- **Commit Roles:** `HEAD`, `local_ahead`, `remote_behind`, `merge_base`, `fork_point`, `conflicted`
- **Interactive Inspector:** Click any commit node to view hash, author, message, parent hashes, timestamp
- **SVG Topology Engine:** Cubic bezier spline paths, animated HEAD pulsing, double-ring merge base highlights

### Working Tree & Side-by-Side Diffs

- **File Search Filter** — Search dirty changesets by filename in real-time
- **Checkbox File Staging** — Selectively stage/unstage individual files; bulk Stage All / Unstage All
- **Status Indicators:** `modified` (amber), `staged` (green), `untracked` (slate), `conflicted` (red)
- **Syntax-Highlighted Diff Viewer** — Line-by-line unified diffs, addition/deletion counts, line gutters
- **AI Commit Generator Integration** — Draft Conventional Commits from active diffs

### Stash Stack Management
- Snapshot inventory with stash index, message, timestamp, file count
- 1-click **Restore to Working Tree** with toast confirmation

### Immutable Audit Trail & Rollback
- Every executed command recorded with timestamp, description, and shell command
- 1-click **Rollback Last Action** executes the pre-computed safe reversal
- Rollback safeguard: verifies working tree is clean/stashed before executing

### Demo Script
1. Navigate to **Repository** page (`#repository`)
2. Show the DAG graph with diverged branches — point out HEAD, merge base, local ahead, remote behind
3. Click a commit node to show the inspector panel
4. Switch to **Working Tree & Diffs** tab — show dirty files with staging checkboxes and diff viewer
5. Switch to **Stashes** tab — show stash snapshot inventory

### Speaker Notes
> The DAG visualizer is technically impressive — it computes lane indices from branch topology and renders bezier spline curves. Don't go too deep on the math; focus on the visual impact and how it makes Git topology intuitive.

---

## Slide 6: CI/CD Pipeline Telemetry

### Title
**Pipeline Health: From Build Failure to Flaky Test Quarantine**

### 5-Stage Pipeline Progression Tracker

| Stage | Purpose | Status Indicators |
| :--- | :--- | :--- |
| 01 — Lint & Formatting | Code style enforcement | `success` (green), `failed` (red pulse), `pending` (slate) |
| 02 — Unit & Contract Tests | Test suite execution | Duration metrics per stage |
| 03 — Security & CVE Scan | Supply chain vulnerability check | Expandable terminal logs |
| 04 — Container Artifact Build | Docker image compilation | Real-time duration tracking |
| 05 — Staging Smoke Verification | Pre-deployment health check | Line-by-line build logs |

### Flaky Test Suite Diagnostics
- **Identification:** Surfaces tests that pass/fail intermittently without source changes
- **Failure Telemetry:** Pass rate %, failures over last 10 runs, last failing commit SHA
- **Quarantine Action:** Click **Quarantine & Analyze** to isolate flaky tests from blocking deployment

### Supply Chain Security & CVE Scans
- **Dependency Vulnerability Detection** — Identifies known CVEs in third-party packages
- **Severity Scoring** — High, Critical, Medium, Low categorization
- **Remediation Target** — Recommends exact patch version (e.g. upgrade `jsonwebtoken` to `9.0.2`)
- **Draft Dependabot Patch** — Generate automated PR for dependency bumping

### Demo Script
1. Switch to **"CI/CD: Build Failure"** scenario
2. Navigate to **CI/CD** page (`#cicd`)
3. Show the failed pipeline stage — click to expand terminal logs
4. Point to flaky test diagnostics panel with 70% pass rate
5. Point to CVE scan panel showing CVE-2026-8819 (High Severity)

### Speaker Notes
> Keep this to 45 seconds. The CI/CD page is visually rich but self-explanatory. Focus on the flaky test quarantine and CVE remediation — those are unique features judges won't have seen elsewhere.

---

## Slide 7: Pull Request Intelligence

### Title
**PR Intelligence: From Blocked Review to Squash & Merge**

### PR Telemetry & Turnaround Clock
- **Metadata Tracking:** PR number, title, author, source branch → target branch, review status
- **Approval Counting:** Current approvals vs. required threshold (e.g. `1 of 2 required`)
- **Review Turnaround Clock:** Days waiting in review (e.g. `3 days waiting`) — highlights bottlenecks
- **Mergeability Assessment:** Real-time clean/conflicted/blocked status

### Inline Review Threads & Comment Management
- Reviewer comments linked to specific files and line numbers (e.g. `src/services/currency.ts:42`)
- Status tags: `open` or `resolved`
- Reviewer identity tags with author handles

### AI Resolution Response Draft Composer
- 1-click **Draft AI Resolution Response** — Byte generates a professional reply detailing code adjustments and added unit tests
- Interactive reply box — edit the drafted response or type custom reply, click **Reply** to append to thread

### Squash & Merge & Changelog
- **Squash & Merge** armed when review criteria are met — triggers simulated merge with celebration feedback
- **Generate PR Changelog** — Produces conventional release notes summarizing features, fixes, and breaking changes

### Demo Script
1. Switch to **"PR #214: Changes Requested"** scenario
2. Navigate to **PR Intelligence** page (`#pr`)
3. Show review metrics: 1 of 2 approvals, 3 days waiting, changes requested
4. Show inline review comments linked to file/line
5. Click **"Draft AI Resolution Response"** to show AI-generated reply

### Speaker Notes
> 45 seconds. The AI resolution reply drafting is the highlight — it shows Gemini understanding review context and generating a professional developer response.

---

## Slide 8: Release Gate & 7-Factor Risk Score

### Title
**Data-Driven Deployment: 5 Pillars + 7 Factors = 1 Health Score**

### Release Gate — 5-Pillar Deployment Readiness

| Pillar | Weight | Target Standard | Evaluation Criteria |
| :--- | :---: | :--- | :--- |
| **Tests Passing** | 25% | 100% passing | All unit, integration, and regression suites pass |
| **Code Coverage** | 20% | ≥ 80% line coverage | Coverage across core components |
| **Vulnerabilities** | 25% | 0 High/Critical CVEs | Zero open supply chain vulnerabilities |
| **PR Approvals** | 15% | ≥ 2 peer approvals | Required reviews met, zero open change requests |
| **Branch Freshness** | 15% | 0 commits behind | Synchronized with origin, no upstream divergence |

**Status Classification:**
- **Ready to Ship (green):** Score ≥ 90%, zero critical blockers — Sign Off Release armed
- **Caution / Review (amber):** Score 70–89%, non-critical warnings
- **Blocked (red):** Score < 70%, or failing build / high CVE

**Compliance Artifact Export:** Copy Markdown summary, download JSON artifact (`release-readiness-[repo]-[timestamp].json`)

### 7-Factor Risk Scorecard & Health Pool

| Factor | Impact Range | Critical Threshold | Remediation |
| :--- | :--- | :--- | :--- |
| **Branch Divergence & Drift** | 0 to -35 pts | ≥ 6 behind | `git pull --rebase origin main` |
| **Failed & Flaky Tests** | 0 to -28 pts | Build failed or pod crashed | Quarantine flaky specs, inspect build logs |
| **Secrets & Security Policies** | 0 to -30 pts | Anonymous access or exposed tokens | Revoke tokens, enforce cloud policies |
| **Open Vulnerabilities** | 0 to -22 pts | High/Critical CVEs exist | Bump dependencies via Dependabot |
| **Code Smells & Debt** | 0 to -15 pts | > 8 uncommitted files | Stage and commit in atomic chunks |
| **Unreviewed Commits & PR Lag** | 0 to -15 pts | Changes requested or > 3 days waiting | Address comments, request re-review |
| **Large PR Size** | 0 to -12 pts | > 400 lines or > 15 files | Split into stacked pull requests |

**Health Pool Formula:** `Calculated Score = max(0, 100 - sum(Deductions))`

**Classification:** Healthy (90–100 HP, green) → Attention (60–89 HP, amber) → Blocked (30–59 HP, orange) → Critical Hazard (0–29 HP, grayscale)

### Demo Script
1. Navigate to **Release Gate** page (`#release`) — show 5-pillar grid, overall score, active blockers
2. Navigate to **Risk Scorecard** page (`#risk`) — show 7-factor breakdown, HP gauge, category filters
3. Click a factor's **"Remediate with Byte"** — show it jumping back to Companion with pre-filled prompt

### Speaker Notes
> The key insight here is that Byte's visual health state is directly computed from these 7 factors. The pet's posture isn't decorative — it's a real-time data visualization of your repository's DevSecOps posture.

---

## Slide 9: Multimodal AI — Voice & Image Studio

### Title
**Talk to Byte: Live Voice, Vision, and Avatar Generation**

### Live Voice & Vision Streaming
- **Gemini Live API** (`gemini-3.1-flash-live-preview`) — Bidirectional 16kHz PCM audio streaming over WebSocket (`/live`)
- **Real-time text transcription** — See Byte's responses as text while audio streams
- **Animated audio waveform** — Visual equalizer reflecting active audio input levels
- **Security controls:**
  - Explicit permission gate — microphone inactive by default
  - Visual recording indicators — pulsating alerts when streaming
  - Instant mute & teardown — closing modal severs WebSocket and releases media tracks
  - Zero cloud recording — audio frames processed ephemerally, never persisted
- **Fallback:** Web Speech API if Gemini Live unavailable

### Pet Avatar Studio (Image Generation)
- **Gemini Image** (`gemini-3.1-flash-image`) — Custom mascot avatar generation and iterative editing
- **Text prompt driven** — Describe your custom pet and generate pixel-art sprites
- **Ephemeral Asset Registry** — 30-minute preview TTL before explicit approval to active set
- **Aesthetic SVG Fallback** — Guaranteed offline fallback generator if remote image generation unavailable
- **Endpoints:** `POST /api/ai/images/generate`, `POST /api/ai/images/edit`, `POST /api/ai/images/:id/approve`

### Text-to-Speech Synthesis
- **Gemini TTS** (`gemini-3.1-flash-tts-preview`) — Zephyr voice speech synthesis
- **Endpoint:** `POST /api/voice/tts`
- **Fallback:** Browser SpeechSynthesis API

### Multi-Tier Model Fallback Chains

| Tier | Primary | Fallback 1 | Fallback 2 |
| :--- | :--- | :--- | :--- |
| Fast | `gemini-flash-lite` | `gemini-3.6-flash` | `gemini-flash-latest` |
| General | `gemini-3.6-flash` | `gemini-3.5-flash` | `gemini-flash-latest` |
| Deep | `gemini-3.7-flash` | `gemini-3.6-flash` | `gemini-flash-latest` |
| Image | `gemini-3.1-flash-image` | Offline SVG Generator | — |
| Live Voice | `gemini-3.1-flash-live-preview` | Web Speech API | — |
| TTS | `gemini-3.1-flash-tts-preview` | Browser SpeechSynthesis | — |

### Demo Script
1. Click the **microphone icon** to open Live Voice Modal — show audio waveform visualization
2. (If comfortable) Speak a brief question to Byte and show the transcription
3. Open **Image Studio** from avatar menu — show prompt input and generation interface
4. Mention: "Every modality has a fallback — the app never breaks if an API is unavailable"

### Speaker Notes
> This is the wow-factor moment. If you can do a live voice conversation, do it — it's the most memorable part of the demo. If not, at least show the UI and explain the WebSocket streaming architecture. Emphasize the zero-recording privacy stance.

---

## Slide 10: Architecture & Tech Stack

### Title
**Built for Production: React 19 + Express + Gemini Cloud**

### Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS v4, Framer Motion (`motion`), Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express, WebSocket (`ws`), `tsx` (dev), `esbuild` (production bundle) |
| **AI Integration** | `@google/genai` — Google Gemini SDK (Chat, Live Audio, Image, TTS) |
| **Testing** | Vitest v4.1.11 — 31 automated tests (security, executor, markdown) |
| **CI/CD** | GitHub Actions — Lint, Test, Gitleaks, npm audit, Build, SBOM |

### System Architecture

```
[Developer] <---> [React 19 Frontend (SPA)]
                        |
              HTTP REST & WebSocket (/live)
                        |
                [Express Gateway Server :3004]
                   /       |        \
          [Safety Engine] [Executor] [Gemini Cloud APIs]
          [Audit Buffer]  [argv]     [Chat / Live / Image / TTS]
                   |
          [Local Git CLI / GitHub Fixture]
```

### 6-Page Workspace Architecture

1. **Ambient Companion** (`#companion`) — Pet stage, chat stream, telemetry quick deck
2. **Repository & DAG** (`#repository`) — DAG graph, diffs, stashes, audit trail
3. **CI/CD Pipelines** (`#cicd`) — Pipeline tracker, flaky tests, CVE scans
4. **PR Intelligence** (`#pr`) — Review metrics, inline comments, AI replies, merge
5. **Release Gate** (`#release`) — 5-pillar scorecard, blockers, artifact export
6. **Risk Scorecard** (`#risk`) — 7-factor breakdown, HP gauge, remediation links

### Backend API Routes

| Endpoint | Method | Purpose |
| :--- | :--- | :--- |
| `/api/health` | GET | Server uptime, memory, models, writes status, telemetry |
| `/api/audit-logs` | GET | FIFO ring buffer of audited events (max 200) |
| `/api/git/live-status` | GET | Read-only local workspace Git scanner |
| `/api/repo/live` | GET | Public GitHub fixture branch scanner |
| `/api/git/preview-action` | POST | Dry-run safety analysis of proposed commands |
| `/api/git/execute-action` | POST | Execute human-approved Git commands |
| `/api/ai/chat` | POST | Multi-turn Gemini chat with safety validation |
| `/api/gitpet/analyze` | POST | Structured JSON repo analysis & action proposal |
| `/api/ai/images/generate` | POST | Generate pet avatar previews |
| `/api/ai/images/edit` | POST | Edit existing pet avatars |
| `/api/ai/images/:id/approve` | POST | Promote preview asset to active set |
| `/api/voice/tts` | POST | Gemini TTS speech synthesis |
| `/live` | WS | Bidirectional Gemini Live Audio streaming |

### Speaker Notes
> 45 seconds. Don't read every API route aloud — just point to the slide. Emphasize that all API keys are managed server-side with TLS 1.3 and zero data retention. The architecture slide is for judges who want to verify production-grade engineering.

---

## Slide 11: Security, Governance & Production Readiness

### Title
**DevSecOps by Design: STRIDE, OWASP LLM Top 10, NIST AI RMF**

### Security Threat Model (STRIDE)

| Threat | Mitigation |
| :--- | :--- |
| **Spoofing** | Strict CORS, local origin isolation, schema validation, optional Basic Auth |
| **Tampering** | Input sanitization, role-delimited system prompts, regex injection detector |
| **Repudiation** | Real-time FIFO audit log — timestamp, action, AI rationale, approval status |
| **Information Disclosure** | Runtime token redactor (`AIza*`, `ghp_`, Bearer → `[REDACTED_SECRET]`) |
| **Denial of Service** | Token ceilings, model fallback chains, WebSocket rate-limiting, inactivity disconnect |
| **Elevation of Privilege** | Zero shell pass-through, argv arrays only, destructive flags blocked |

### OWASP LLM Top 10 Coverage

| OWASP Category | Defense Implemented |
| :--- | :--- |
| LLM01: Prompt Injection | Hardened system prompts, pre-flight sanitizer, 31 adversarial tests |
| LLM02: Sensitive Info Disclosure | Regex credential masking, `.gitignore`, Gitleaks CI |
| LLM03: Supply Chain | Pinned deps, SBOM (`npm run sbom`), `npm audit` in CI |
| LLM04: Data/Model Poisoning | Ephemeral context windows, no fine-tuning, grounded Git CLI evidence |
| LLM05: Improper Output (XSS) | `react-markdown` with GFM, strict HTML escaping, markdown tests |
| LLM06: Excessive Agency | HITL invariant, Preview Changes Modal, reversal commands, no auto-execution |
| LLM07: System Prompt Leakage | Persona consistency instructions, no architecture dumping |
| LLM08: Vector/Embedding Weakness | Live Git CLI output, no stale vector embeddings |
| LLM09: Hallucinations | Grounded evidence requirements, pre-flight branch/file verification |
| LLM10: Unbounded Consumption | 16kHz audio cap, model fallback chains, client-side mute controls |

### AI Governance — NIST AI RMF 1.0 Aligned

| Governance Area | Status | Evidence |
| :--- | :---: | :--- |
| Purpose & Scope | MET | Clear intended use, target users, non-goals, prohibited uses |
| Risk Classification | MET | 4-tier taxonomy (Critical / High / Medium / Low) with controls |
| Data Governance | MET | Zero retention, ephemeral processing, secret scrubbing |
| Human Oversight | MET | 5-tier oversight matrix (Level 0: passive → Level 4: hard-blocked) |
| Transparency | MET | Confidence scores, risk badges, reversal commands, persona explanations |
| Model Traceability | MET | `/api/health` exposes active models, provider, settings |
| Monitoring | MET | `/api/audit-logs`, latency tracking, uptime metrics |
| Change Management | MET | Git version control, CI regression tests, prompt versioning |
| Incident Response | MET | Automatic fallback, UI abort, SRE runbook, post-mortem logging |

### 5-Tier Human-in-the-Loop Oversight Matrix

| Tier | Action | Human Role | Enforcement |
| :--- | :--- | :--- | :--- |
| Level 0 | Read Git status, display pet health | Passive Observer | Read-only background poll |
| Level 1 | AI explanations & recommendations | Consumer / Learner | Read-only chat with confidence score |
| Level 2 | Avatar studio generation | Interactive Reviewer | 30-min preview TTL before promotion |
| Level 3 | Safe Git writes (stash, pull, branch) | **Mandatory Approver** | Modal diff preview + explicit confirm |
| Level 4 | Force-push, hard reset, branch delete | **Escalation / Blocked** | **Hard rejection by safety engine** |

### Production Readiness Evidence

- **31 automated tests** — 100% pass rate (security, executor, markdown)
- **CI/CD pipeline** — TypeScript lint, Vitest, Gitleaks, npm audit, build verification
- **SBOM** — CycloneDX-compatible dependency inventory (`npm run sbom`)
- **SRE Runbook** — Health endpoints, audit logs, disaster recovery, rollback procedures
- **Observability** — `/api/health` (uptime, memory, models, telemetry), `/api/audit-logs` (FIFO ring buffer, max 200 events)
- **SLO Targets** — 99.9% uptime, < 800ms telemetry latency, 0 unintended data mutations

### Compliance Matrix
- **All 15 Participant Guidelines (P-01 to P-15):** MET
- **All 20 Submission Checklist Items:** MET

### Demo Script
1. (If time permits) Run `npm test` in terminal — show 31 tests passing
2. (Or) Run `curl -s http://localhost:3004/api/health | jq .` — show live health endpoint
3. Point to the compliance matrix — all guidelines and submission items MET

### Speaker Notes
> This slide is dense — don't read it all. Highlight three things: (1) STRIDE + OWASP LLM Top 10 coverage, (2) the 5-tier human oversight matrix, (3) 31 tests passing. Judges who want deeper evidence can reference the docs folder.

---

## Slide 12: Demo Integrity & Live Workspace Mode

### Title
**Sandbox vs. Live: Transparent Demo Integrity (P-15)**

### Two Operating Modes

| Mode | Data Source | Actions | Use Case |
| :--- | :--- | :--- | :--- |
| **Sandbox (default)** | 18 bundled DevSecOps scenarios | Simulated — visual transitions animate, transcript flags simulation | Demo, exploration, training |
| **Live Workspace** | Real local Git workspace or public GitHub fixture | Real execution — bounded argv commands if `GITPET_ALLOW_WRITES=true` | Production use, real repo inspection |

### 18 Deterministic Sandbox Scenarios

| Category | Scenarios |
| :--- | :--- |
| **Git Workflows** | `mvp_sync_divergence`, `merge_conflict`, `detached_head`, `stale_branch`, `unpushed_work`, `clean_healthy`, `unsafe_loss_risk` |
| **CI/CD Pipelines** | `cicd_failed_build`, `cicd_flaky_tests`, `cicd_vulnerability`, `cicd_deploy_success` |
| **PR Reviews** | `pr_changes_requested`, `pr_pending_review`, `pr_conflicted`, `pr_approved_ready` |
| **Cloud Infrastructure** | `lost_map` (Terraform state lock), `smoke_cloud` (Pod CrashLoopBackOff), `shield_cracked` (S3 anonymous read) |

### Live Workspace Data Sources

1. **Local Host Repository** (`/api/git/live-status`)
   - Read-only `git status --porcelain`, `git rev-parse`, `git log`, `git stash list`
   - Computes real branch divergence, detached HEAD, uncommitted diffs, in-progress operations

2. **Public GitHub Fixture** (`/api/repo/live`)
   - Connects to `farisnour/gitpet-acme-corp-ecommerce-store`
   - Live branch switching: `main`, `feature/cart-stepper`, `feature/payment-v2`, `refactor/checkout-v2`

### 4-Layer Safety Defense for Live Writes

1. **Static Rule Interceptor** — Refuses destructive commands at code level
2. **Contextual Lint Engine** — Inspects live working tree state
3. **Dry-Run Preview** — Simulates execution before prompting user
4. **Mandatory Human Confirmation** — Zero automated execution
5. **Fail-Stop Parameter Execution** — `execFile` with argv arrays, never shell

### Graceful Fallback Mechanisms
- **Deterministic Rule-Based Engine** — Zero-API-key resilience, structured responses without Gemini
- **Multi-Tier Model Cascades** — 404/429 recovery through fallback chain
- **In-Memory SVG Avatar Canvas** — Offline image generation fallback
- **Web Speech API** — Browser-native voice fallback

### Demo Script
1. Toggle **Live Workspace** switch in the top bar — show mode change
2. Point out the transcript flag indicating sandbox vs. live mode
3. Mention: "Even in live mode, writes are disabled by default — you must explicitly opt in with `GITPET_ALLOW_WRITES=true`"

### Speaker Notes
> Transparency is key for P-15 compliance. Be explicit about what's sandboxed vs. live. Judges appreciate honesty about demo boundaries — it builds credibility.

---

## Slide 13: Team & Closing

### Title
**Team Ribbon Patrol — DevOps for GenAI 2026**

### Team Members
- **Project Lead:** Aliasgar Husain (`Alhusain@rbbn.com`)
- **Lucas Whitaker**
- **David Castelli**
- **Faris Nour**

### AI Usage Disclosure (P-06 Transparency)

**Runtime AI Integration:**
- **Google Gemini 2.5 Flash / Pro** — Primary LLM inference engine for DevSecOps guidance
- **Imagen 3** — Pet Avatar Studio pixel-art mascot generation
- **Gemini Live API** — Low-latency bidirectional streaming for live audio/vision

**Development & Coding Assistance:**
- **Google AI Studio** — Prompt prototyping, system instruction iteration, parameter tuning
- **Antigravity (Gemini)** — Pair-programming for TypeScript setup, UI styling, React components
- **Claude Code** — Vitest unit/integration tests and safety sanitizer refinement
- **Microsoft Copilot** — Real-time code completions, formatting, documentation drafting

> All AI-suggested code, safety filters, and test boundaries were fully reviewed, audited, and approved by the team.

### Key Takeaways

1. **Ambient awareness** — Byte makes repository health visible without terminal hunting
2. **Bounded agency** — 2-layer safety engine guarantees zero destructive operations
3. **Multimodal AI** — Text, voice, and image generation with graceful fallbacks
4. **DevSecOps intelligence** — 7-factor risk scoring, DAG visualization, CI/CD & PR telemetry
5. **Production-grade** — 31 tests, STRIDE threat model, NIST AI RMF governance, SBOM, SRE runbook

### Try It Yourself

```bash
git clone https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol.git
cd DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol
npm install
cp .env.example .env  # Add your GEMINI_API_KEY
npm run dev           # Open http://localhost:3004
```

> **Note:** If `GEMINI_API_KEY` is not provided, the application falls back to robust rule-based responses — you can still demonstrate and navigate the full interface.

### In-App Pitch Deck
Press **`P`** anywhere in the app to open the built-in 7-slide pitch deck presentation.

### Speaker Notes
> Close strong. Press `P` to open the in-app pitch deck as a visual finale. Thank the judges, mention the GitHub repo URL, and invite them to try it live. If there's Q&A, be ready for: safety engine implementation details, sandbox vs. live mode, model fallback chain, and how the 7-factor risk score is computed.

---

## Appendix: Quick Reference

### Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Spacebar` | Pet Byte (purring sound + hearts) |
| `⌘K` / `Ctrl+K` | Open Quick Command Palette |
| `P` | Open Pitch Deck Presentation |
| `Esc` | Close any open modal |

### Available npm Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Start dev server with hot reload (port 3004) |
| `npm run build` | Build frontend (Vite) + server (esbuild) |
| `npm run start` | Run production server (`dist/server.cjs`) |
| `npm run test` | Run 31 Vitest automated tests |
| `npm run sbom` | Generate JSON dependency inventory |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove `dist/` build output |

### Documentation Index

| Document | Focus |
| :--- | :--- |
| `docs/PROJECT_OVERVIEW.md` | Elevator pitch, problem statement, target users |
| `docs/README.md` | Functional specification document |
| `docs/ARCHITECTURE.md` | C4 system & container diagrams |
| `docs/SECURITY_THREAT_MODEL.md` | STRIDE + OWASP LLM Top 10 defenses |
| `docs/AI_GOVERNANCE.md` | NIST AI RMF system card, 5-tier oversight matrix |
| `docs/RUNBOOK.md` | SRE operations, health endpoints, disaster recovery |
| `docs/TEST_REPORT.md` | 31 test cases & verification results |
| `docs/DEMO_NOTES.md` | Component fidelity & sandbox vs. live classification |
| `docs/LIVE_WORKSPACE.md` | Live mode setup & 4-layer safety defense |
| `docs/SBOM_MANIFEST.md` | Dependency inventory & supply chain security |
| `docs/GUIDELINES_COMPLIANCE.md` | P-01 to P-15 compliance matrix |
| `docs/CHECKLIST.md` | 20 submission items compliance |
| `docs/USER_GUIDE.md` | Complete end-user feature manual |
| `docs/Features/` | 8 deep-dive feature documentation files |
