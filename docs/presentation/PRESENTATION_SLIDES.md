# 🎯 GitPet Demo Presentation — Slide Deck Blueprint

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli  
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)  
**Target Duration:** About 20 Minutes (including handoffs and app-navigation cues)
**Presenters:** Aliasgar (1–3), Lucas Whitaker (4–6), David Castelli (7–10), Faris (11–13)
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

Per-slide timing: 1:25, 1:15, 2:20, 1:50, 1:35, 1:50, 1:30, 1:10, 1:10, 1:50, 1:30, 1:40, 1:00 (20:05) plus ~0:35 transitions ≈ 20:40.

---

## 🧭 13-Slide Master Overview

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                GITPET PRESENTATION ROADMAP                                       │
│                                                                                                  │
│  01. THE EVENT MISSION  02. THE PROBLEM         03. THE SOLUTION        04. AI ASSISTANCE        │
│  AWS Community Day 2026 Terminal Blindness      Notice·Understand·Fix   4 Roles & Fast Models    │
│                                                                                                  │
│  05. STATIC SAFETY      06. CONTEXT SAFETY      07. REPO & DAG          08. CI/CD SCENARIOS      │
│  Zero Force-Push Rules  Working-Tree Lints      Multi-Lane Topology     Seeded logs & triage UI   │
│                                                                                                  │
│  09. PULL REQUESTS      10. RELEASE GATE        11. RISK HEALTH POOL    12. ARCHITECTURE         │
│  Example reply UI       Advisory Scorecard      0-100 HP Scoring        React 19 + Gateway       │
│                                                                                                  │
│  13. LIVE LAUNCH                                                                                 │
│  31 Tests & Q&A                                                                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Slide 1: Title & The Mission — AWS Community Day Ottawa 2026

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  🐾 GitPet: Ambient DevSecOps Repository Companion                                              │
│  🇨🇦 AWS COMMUNITY DAY OTTAWA 2026 (https://awscommunityday.ca/)                                  │
│  Team Ribbon Patrol (Team 05) • Lucas Whitaker & David Castelli                                  │
│  Track: DevOps for GenAI Hackathon & Innovation Challenge                                        │
│                                                                                                  │
│  "See risk. Understand evidence. Resolve safely."                                                │
│                                                                                                  │
│  ┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐       │
│  │  1. HACKATHON THEME     │    │  2. PROPOSED APP: GITPET│    │  3. HACKATHON ALIGNMENT │       │
│  │  DevOps for GenAI Track │ ──►│  Ambient Repo Companion │ ──►│  Responsible DevSecOps  │       │
│  │  • Cloud-Native Pipelines│    │  • Virtual Mascot: Byte │    │  • Zero Excessive Agency│       │
│  │  • GenAI for Operations │    │  • 18 Physical Symptoms │    │  • 2-Layer Safety Policy│       │
│  │  • Security & Governance│    │  • Tiered Gemini Models │    │  • 31 Vitest Tests      │       │
│  │  • Eliminating Dev Toil │    │  • 6 Dedicated Spaces   │    │  • NIST AI RMF Governance│      │
│  └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Hackathon Theme & Community Context**:
  * Built for the **AWS Community Day Ottawa 2026** ([awscommunityday.ca](https://awscommunityday.ca/)) DevOps for GenAI track.
  * Explores the central challenge of modern cloud engineering: *How do we infuse Generative AI into daily DevOps and Git workflows to eliminate developer friction without introducing unverified, destructive AI operations?*
* **Our Proposed Solution — GitPet**:
  * An **Ambient DevSecOps Repository Companion** powered by an expressive virtual mascot named **Byte**.
  * Maps the selected repository state or an explicit local-repository scan into ambient signals (**18 physical symptoms**, health auras, procedural Web Audio cues). CI/CD and PR content is currently demonstrated with deterministic scenarios.
  * Combines optional tiered Google Gemini reasoning (`@google/genai` v2.4.0) with a **2-layer deterministic safety engine** (8 hard-block rules + 7 contextual lints; additional parser/allowlist checks also reject unsafe input).
* **Direct Alignment with the Hackathon Objectives**:
  * **DevOps Modernization**: Demonstrates workflows for Git DAG topology, CI/CD status, flaky-test triage, and PR review scenarios.
  * **Responsible AI & Security Governance**: Mitigates excessive agency for supported Git commands with argv execution, policy checks, preview, and explicit write opt-in.
  * **Engineering Rigor**: Includes 31 automated Vitest tests, STRIDE threat modeling, a CycloneDX SBOM, and release-readiness reporting; these do not establish production certification.

---

## Slide 2: The Problem — The 3 Developer Crises

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  THE THREE DEVELOPER CRISES IN MODERN DEVSECOPS                                                  │
│                                                                                                  │
│  "Terminal commands hide context. Autonomous AI agents risk destructive chaos."                 │
│                                                                                                  │
│  [ 1. Context Blindness ]       [ 2. Unchecked AI Agency ]      [ 3. Buried Telemetry ]          │
│  Developers lose 20–30% of day  Autonomous AI tools run blind   DAG topology, flaky tests, & CVEs│
│  switching across terminal tabs force-pushes with zero safety   are buried in thousands of       │
│  and fragmented CI/CD portals   or blast-radius validation      lines of linear console logs     │
│                                                                                                  │
│  The Missing Link: Ambient peripheral awareness + bounded, human-authorized execution.           │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Context Blindness Trap**: Developers must correlate information across terminals, CI/CD portals, and PR queues; GitPet's demo makes those signals visible together.
* **The "Excessive Agency" Dilemma**: AI-proposed commands can be destructive (`git push --force`, `git reset --hard`) without deterministic checks and human review.
* **The GitPet Vision**: An ambient companion (**Byte**) that visualizes selected scenario state or a scanned local Git repository and guides users through bounded actions.

---

## Slide 3: The Core Loop — Notice, Understand, Resolve

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  THE DEVSECOPS COMPANION LOOP                                                                    │
│                                                                                                  │
│  ┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐       │
│  │   1. NOTICE             │ ──►│   2. UNDERSTAND         │ ──►│   3. RESOLVE            │       │
│  │   Ambient Awareness     │    │   Multimodal Reasoning  │    │   Bounded Execution     │       │
│  │   • 18 Physical Symptoms│    │   • Gemini 3.6/3.7 Flash│    │   • 2-Layer Safety Gate │       │
│  │   • 0-100 HP Health Aura│    │   • Grounded Evidence   │    │   • Mandatory Diff Modal│       │
│  │   • Web Audio Cues      │    │   • Verify, Don't Trust │    │   • HEAD Anchors (Not   │       │
│  └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘       │
│                                                                                                  │
│  Core Architectural Principle: "Human judgment remains the mandatory approval gate."             │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **1. Notice (Peripheral Vision)**: Byte’s posture, glowing aura, and Web Audio chiptunes signal repository health instantly without terminal polling.
* **2. Understand (Grounded AI)**: When Gemini is configured, repository context is included in chat requests; deterministic analysis is also available as a fallback. Do not promise citations or confidence fields on every response.
* **3. Resolve (Bounded Safety)**: Git actions pass through preview and policy checks before execution. Preview is not a verified rollback plan: `headBefore`/`headAfter` are anchors, not a universal undo mechanism.

---

## Slide 4: AI Assistance — Multi-Persona Guidance & Tiered Models

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  TALK TO BYTE: MULTI-PERSONA & TIERED SPEED ARCHITECTURE                                         │
│                                                                                                  │
│  [ 🐶 Byte Mascot ]       [ 🏛️ Senior Architect ]   [ 🛡️ Safety Auditor ]     [ 🎓 Git Tutor ]    │
│  Friendly, concise hygiene Topological DAG rebases   Zero data loss & compliance Mental models   │
│                                                                                                  │
│  ⚡ Tiered Gemini Routing (@google/genai v2.4.0):                                                 │
│  • Fast Tier (gemini-3.1-flash-lite)  ──► Short status requests & commit messages                │
│  • General Tier (gemini-3.6-flash)    ──► Conversational guidance, diff reviews & tutoring       │
│  • Deep Tier (gemini-3.7-flash)       ──► Complex merge DAG resolution & release readiness       │
│                                                                                                  │
│  Chat Guidance + Repository Context • Safety Findings • Suggested Safer Commands                │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **4 Specialized Personas**: Adapts tone and depth—from junior developer mental models (Git Tutor) to topological rebase analysis (Senior Architect).
* **Tiered Model Routing**: Routes fast, general, and deep tasks through their configured model chains.
* **Grounded & Verifiable**: Chat receives repository context when available; fallback rule-based analysis supplies deterministic guidance. Response formatting and reversals are not guaranteed for every answer.

---

## Slide 5: Safety Layer 1 — Static Rules (Universal Danger Invariants)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 1: DETERMINISTIC STATIC INVARIANTS                                                        │
│                                                                                                  │
│  Policy-Blocked Command                         Policy Outcome / Safer Guidance                   │
│  ---------------------------------------------  -----------------------------------------------  │
│  ❌ git push --force / -f                        ──► ✅ git push --force-with-lease               │
│  ❌ git reset --hard                             ──► ✅ git reset --keep / git stash              │
│  ❌ git clean -fdx / git branch -D               ──► ✅ Blocked: Permanent work destruction       │
│  ❌ git filter-branch / --filter-repo            ──► ✅ Blocked: History rewrite hazard           │
│  ❌ Shell controls (; | ` $() >)               ──► ✅ Rejected; execute Git via argv             │
│                                                                                                  │
│  Enforcement: child_process.execFile with pure argv arrays • Strict binary whitelist ('git' only)│
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Deterministic Guardrails**: Safety is implemented as strict code policies in `safety.ts`—never relying on LLM prompt compliance.
* **Zero Force-Push Policy**: Hard-rejects unconditional force pushes and reports `--force-with-lease` as a safer alternative.
* **Pure Argv Execution**: Commands are tokenized and executed without shell interpolation, reducing shell-injection risk.

---

## Slide 6: Safety Layer 2 — Contextual Lints (Working-Tree Aware)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 2: CONTEXTUAL WORKING-TREE SAFETY LINTS                                                   │
│                                                                                                  │
│  Scenario: Uncommitted untracked files present in directory                                      │
│                                                                                                  │
│  Model Suggests: git stash push -m "wip"       (Valid syntax; untracked files remain unstashed) │
│  GitPet Warns: stash-misses-untracked lint    ──► Suggests adding '-u'                         │
│  User Reviews: git stash push -u -m "wip"      (Preview, then approve if writes are enabled)   │
│                                                                                                  │
│  🛡️ Other Context Checks: diverged branch pulls • dirty tree checkout • paused rebase guards     │
│  🔒 Write Opt-In: GITPET_ALLOW_WRITES=true required • headBefore / headAfter rollback anchors    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Context-Aware Protection**: Evaluates commands against supplied or scanned working-tree, branch, stash, and operation state.
* **Untracked File Warning**: Detects when a stash would omit untracked files and reports a `-u` suggestion; the user must choose and preview that suggestion.
* **Opt-In Write Mode**: Live Git writes are disabled by default (`GITPET_ALLOW_WRITES=true` is required to enable execution). HEAD hashes are recorded as recovery references, not guaranteed one-click rollback.

---

## Slide 7: Repository Workspace — Multi-Lane DAG & Working Tree Studio

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  REPOSITORY WORKSPACE (#repository)                                                              │
│                                                                                                  │
│  [ Interactive Multi-Lane SVG DAG Graph ]        [ Working Tree & Diff Studio ]                  │
│  • Topological sorting & cubic bezier splines    • Search filter & checkbox staging              │
│  • 11 Roles: HEAD, upstream, merge_base, hazard  • Syntax-highlighted unified diffs              │
│  • Drawer: author, commit hash, parents, message • Template commit drafter (local)            │
│  • Merge base highlight with double-ring node    • Stash stack manager & HEAD anchors            │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Multi-Lane Topological DAG**: Turns linear commit history into an interactive topological graph, identifying merge bases, branch divergence, and detached HEAD hazards.
* **Working Tree Diff Studio**: Provides individual file checkbox staging, syntax-highlighted diffs, and addition/deletion counters.
* **Commit Drafter (Local Template)**: The "AI Conventional Commit" control is labeled AI, but it regenerates template text locally from the selected type and scope; it does not call Gemini. Its Apply action routes a chat prompt rather than committing.

---

## Slide 8: CI/CD Telemetry — From Failure to Remediation

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  CI/CD PIPELINE TELEMETRY WORKSPACE (#cicd)                                                      │
│                                                                                                  │
│  [ 1. Lint ] ──► [ 2. Tests (FAILED) ] ──► [ 3. Security (CVE) ] ──► [ 4. Build ] ──► [ 5. Deploy]│
│                        │                                                                         │
│  Expandable Log:       ▼                                                                         │
│  auth.spec.ts:48 ──► "Token refresh timeout after 5000ms"                                        │
│                                                                                                  │
│  [ 🧪 Scenario Flaky-Test Example ]                [ 📦 Seeded CVE Example ]                       │
│  auth.spec.ts: sample pass rate                  CVE-2026-8819 in jsonwebtoken@8.5.1 (sample)    │
│  Demo controls only; no CI run, file edit, scan, or PR creation                                  │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **5-Stage Pipeline Demonstration**: Shows scenario-provided Linting, Tests, Security, Build, and Deployment states with example logs; it is not connected to a CI provider.
* **Flaky Test Triage**: Displays scenario pass-rate data and a demo action that changes the selected scenario; it does not edit or quarantine a real test file.
* **CVE Scenario**: Presents seeded vulnerability data and a demo remediation affordance; it does not scan a dependency tree or open a Dependabot PR.

---

## Slide 9: Pull Request Intelligence — Turnaround to Merge

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  PULL REQUEST INTELLIGENCE WORKSPACE (#pr)                                                       │
│                                                                                                  │
│  PR #214: Multi-Currency Checkout • Branch: feature/cart • Author: lucaswhitaker22                │
│  1 approval, 1 change request       •  Scenario wait time: 3 days                                 │
│                                                                                                  │
│  Inline Review Thread (src/services/currency.ts:42):                                             │
│  Reviewer: "Please wrap this external rate lookup in a timeout to avoid hangs."                  │
│                                                                                                  │
│  [ ✎ Fill Example Reply ]                                                                        │
│  Editable local example; not generated from the thread or posted to GitHub                      │
│                                                                                                  │
│  Demo action: [ 🔀 Squash & Merge UI state ]                                                     │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Review Scenario Display**: Shows sample approval/change-request counts, a scenario wait value, and mergeability state.
* **Reply Composer**: The current reply action fills an editable example response locally; it does not call Gemini or post to a PR.
* **PR Demo Actions**: PR status/comments are scenario data, and merge/changelog controls demonstrate UI state only; they do not modify GitHub.

---

## Slide 10: Release Gate — Advisory 5-Pillar Scorecard

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  5-PILLAR RELEASE READINESS GATE (#release)                                                      │
│                                                                                                  │
│  Tests Passing (25%)  •  Code Coverage (20%)  •  CVE Security (25%)  •  PRs (15%)  •  Fresh (15%)│
│                                                                                                  │
│  Overall Readiness: Scenario-derived advisory score (CAUTION / REVIEW)                          │
│  Summary: Review the scenario CVE and approval inputs; this is not a live deployment gate.       │
│                                                                                                  │
│  [ 📋 Copy Summary ]              [ 💾 Download JSON Report ]        [ Review Sign-off UI ]       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Data-Driven Readiness Score**: `releaseReadiness.ts` calculates five weighted dimensions from the current app state. It is an advisory score, not a deployment authorization.
* **Optional AI Synthesis (Unwired)**: A separate `POST /api/ai/release-readiness` endpoint can request Gemini synthesis when configured, but the standard `ReleaseReadinessPage` is not wired to call it; the score is calculated locally by `calculateReleaseReadiness`.
* **Report Export**: Download JSON or copy a Markdown summary for review; these are local reports, not signed compliance attestations.
* **Status Thresholds**: The label is Blocked if blockers exist or score < 70, Caution/Review if warnings or score < 85, else Ready to Ship. A separate `canShip` flag requires no blockers and at least 80, so it can disagree with the label between 80 and 84. This is prototype behavior, not a production release policy.

---

## Slide 11: Risk Scorecard — 0–100 HP Dynamic Health Pool

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  7-FACTOR REPOSITORY HEALTH POOL (#risk)                                                         │
│                                                                                                  │
│  Health Pool: Computed from current scenario/repository state • 0–100 HP                         │
│                                                                                                  │
│  • Seven deductions computed from current state; values vary by scenario                         │
│  • Sandbox state is illustrative; local Git scan does not provide CI or PR telemetry             │
│                                                                                                  │
│  Action: [ 🛠️ Remediate with Byte ──► Instant Deep Link to Companion Chat ]                      │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Scenario/Repository Health Pool**: A 0–100 score is computed from the current app state across seven factors; only repository data obtained in the selected mode is live.
* **Interactive Category Filtering**: Filter factors by All, Hazards (Critical), Warnings, and Healthy.
* **Remediation Guidance**: Risk items can open Byte with diagnostic context; this provides guidance rather than automatically remediating the finding.

---

## Slide 12: Production Architecture & Security Boundaries

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  SYSTEM TOPOLOGY & SECURITY TRUST BOUNDARIES                                                     │
│                                                                                                  │
│  [ React 19 Client SPA ] ──► [ Express 4.21 Gateway (3004) ] ──► [ Safety & Execution Layer ]    │
│  • Vite 6 / TypeScript 5.8   • Secret Token Redactor           • 8 Static Rules + 7 Lints        │
│  • Motion & Web Audio API    • FIFO Audit Buffer (200 events)  • child_process.execFile (argv)   │
│  • SVG DAG Spline Engine     • Image Studio (30m TTL)          • GITPET_ALLOW_WRITES Guard       │
│                              • Constant-Time Basic Auth        • Local Git Workspace Scanner     │
│                                                                                                  │
│  [ Google Gemini Cloud ] ◄── (Fast / General / Deep Tiers + Live Audio WebSocket on /live)        │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Gateway Security Boundary**: Express mediates API and permitted Git operations; the Git command executor uses argv and rechecks policy. This does not make all UI actions live integrations.
* **Repository Data Modes**: Local on-disk Git scanner (`/api/git/live-status`) and a configured public GitHub fixture (`/api/repo/live`); CI/CD and PR workspaces remain scenario-driven.
* **Gemini Features**: Optional chat/model fallback, Live Audio WebSocket (`/live`), Pet Image Studio preview registry, and TTS endpoint; these require network/API availability. If Live API setup fails, the server sends a fallback status message, but the current client does not implement a browser SpeechRecognition fallback.

---

## Slide 13: Conclusion — Ambient DevSecOps & Live Launch

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  GITPET: AMBIENT DEVSECOPS COMPANION                                                             │
│  "See risk. Understand evidence. Resolve safely."                                                │
│                                                                                                  │
│  ✓ 31 Automated Vitest Tests (100% Pass)        ✓ NIST AI RMF 1.0 & STRIDE Threat Model          │
│  ✓ Policy-Checked Git Execution                  ✓ Sandbox + Optional Live Git Data               │
│                                                                                                  │
│  🚀 Run It Live: npm run dev  ──►  http://localhost:3004                                         │
│  📦 Repository: https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05... │
│  🇨🇦 AWS Community Day Ottawa 2026: https://awscommunityday.ca/                                  │
│                                                                                                  │
│  Thank you! Questions & Live Demo Walkthrough                                                    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Bottom Line**: GitPet demonstrates ambient repository awareness, explainable guidance, and policy-checked Git actions while keeping the user in control.
* **Enterprise Rigor**: 31 automated Vitest tests, complete CycloneDX SBOM (`npm run sbom`), SRE runbook, and NIST AI RMF governance.
* **Demo Command**: Run `npm run dev` and explore six workspaces at `http://localhost:3004`; CI/CD and PR content is scenario-driven.
