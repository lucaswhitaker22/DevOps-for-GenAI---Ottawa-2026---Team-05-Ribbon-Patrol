# 🎯 GitPet Demo Presentation — Slide Deck Blueprint

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (12 Slides)  
**Target Duration:** 10–12 Minutes  
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## 🧭 12-Slide Master Overview

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                GITPET PRESENTATION ROADMAP                                       │
│                                                                                                  │
│  01. THE PROBLEM        02. THE SOLUTION        03. AI ASSISTANCE       04. STATIC SAFETY        │
│  Terminal Blindness     Notice·Understand·Fix   4 Roles & Fast Models   Zero Force-Push Rules    │
│                                                                                                  │
│  05. CONTEXT SAFETY     06. REPO & DAG          07. CI/CD & FLAKY       08. PULL REQUESTS        │
│  Working-Tree Lints     Multi-Lane Topology     Logs & 1-Click Fix      AI Review Composer       │
│                                                                                                  │
│  09. RELEASE GATE       10. RISK HEALTH POOL    11. ARCHITECTURE        12. LIVE LAUNCH          │
│  5-Pillar Scorecard     0-100 HP Scoring        React 19 + Gateway      31 Tests & Q&A           │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Slide 1: Title & The Developer Crisis

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  🐾 GitPet: Ambient DevSecOps Repository Companion                                              │
│  Team Ribbon Patrol (Team 05) • Lucas Whitaker & David Castelli                                  │
│                                                                                                  │
│  "Terminal commands hide context. Autonomous AI agents risk destructive chaos."                 │
│                                                                                                  │
│  [ 1. Context Blindness ]       [ 2. Unchecked AI Agency ]      [ 3. Buried Telemetry ]          │
│  Drift & stashes discovered     AI runs blind force-pushes      DAG topology & CVEs hidden       │
│  only when a pull explodes      without blast radius checks     in thousands of log lines        │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Context Blindness Trap**: Developers lose 20–30% of their day context-switching across terminals, CI/CD portals, and PR queues—discovering merge drift only when a release breaks.
* **The "Excessive Agency" Dilemma**: Autonomous AI coding assistants with shell access can wipe code (`git push --force`, `git reset --hard`) with zero human verification.
* **The GitPet Vision**: An ambient, expressive virtual companion (**Byte**) that turns live repository telemetry into at-a-glance peripheral awareness and verified, safe remediation.

---

## Slide 2: The Core Loop — Notice, Understand, Resolve

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
│  │   • Web Audio Cues      │    │   • Pre-Computed Undo   │    │   • 1-Click Rollback    │       │
│  └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **1. Notice (Peripheral Vision)**: Byte’s posture, glowing aura, and Web Audio chiptunes signal repository health instantly without terminal polling.
* **2. Understand (Grounded AI)**: Google Gemini (3.6/3.7 Flash) explains drift in plain English with cited commit hashes, line numbers, and confidence ratings.
* **3. Resolve (Bounded Safety)**: Zero blind execution—every proposed action includes a pre-flight diff modal, blast radius estimate, and verified rollback plan (`git stash pop`, `git rebase --abort`).

---

## Slide 3: AI Assistance — 4 Personas & Tiered Models

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  TALK TO BYTE: MULTI-PERSONA REASONING                                                          │
│                                                                                                  │
│  [ 🐶 Byte Mascot ]       [ 🏛️ Senior Architect ]   [ 🛡️ Safety Auditor ]     [ 📚 Git Tutor ]  │
│  Friendly, witty guide    DAG topology & rebases   Zero-loss compliance       Blobs, trees & HEAD│
│                                                                                                  │
│  ⚡ Model Tiers: Fast (3.1 Lite) • General (3.6 Flash) • Deep Reasoning (3.7 Flash)             │
│  🛡️ Evidence Box: Cites branch drift, dirty files, and conflict markers before answering        │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Tailored AI Personas**: Switch between friendly mascot guidance, principal architect rigor, safety compliance audits, or internal Git tutoring in 1 click.
* **Multi-Tier Model Speed**: Dynamic fallback routing across `gemini-3.1-flash-lite` (instant status), `gemini-3.6-flash` (general chat), and `gemini-3.7-flash` (deep DAG/rebase reasoning).
* **Factual Evidence Grounding**: Every response cites concrete repository telemetry—eliminating hallucinations.

---

## Slide 4: Safety Layer 1 — Static Invariants (Zero Force-Push)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 1 SAFETY: UNIVERSAL DANGER INVARIANTS                                                     │
│  "Prompt engineering is guidance; code-level safety engines are guarantees."                     │
│                                                                                                  │
│  ❌ BLOCKED AT GATEWAY ROUTER                      ✅ SAFE REPLACEMENT OFFERED                   │
│  • git push --force / -f                    ──►   git push --force-with-lease                    │
│  • git reset --hard                         ──►   git reset --keep (with safety stash)           │
│  • git clean -fdx                           ──►   Interactive file inspection                    │
│  • git branch -D                            ──►   git branch -d (safe check)                     │
│  • Shell metacharacters (; | ` $ > <)       ──►   Pure argv array tokenization (execFile)        │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Code Guarantee**: The model can suggest commands; the safety engine (`src/server/safety.ts`) decides what is executed.
* **8 Universal Static Rules**: Categorically blocks un-leased force pushes, destructive hard resets, remote ref deletions, and history rewrites.
* **Subprocess Containment**: Pure `argv` child process execution (`child_process.execFile`) completely eliminates shell injection vulnerabilities.

---

## Slide 5: Safety Layer 2 — Contextual Lints (Working-Tree Aware)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 2 SAFETY: WORKING-TREE CONTEXTUAL LINTS                                                   │
│  "Syntactically valid commands can still destroy code if run in the wrong state."                │
│                                                                                                  │
│  [ Scenario: Untracked Files Present ]                                                           │
│  Model Suggests: `git stash push -m "wip"`                                                       │
│  ⚠️ Safety Engine Flags: `stash-misses-untracked` (2 untracked files will be left behind!)       │
│  💡 Auto-Correction Applied: `git stash push -u -m "wip"`                                        │
│                                                                                                  │
│  ✓ Diverged branch fast-forward blocked     ✓ Operation in progress (rebase locked) checked      │
│  ✓ Empty stash pop blocked                  ✓ Dirty tree pull without --autostash warned         │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Catches Hidden Edge Cases**: Prevents the classic Git disaster where `git stash` silently skips untracked files, causing subsequent pulls to fail or overwrite code.
* **Live Working-Tree Inspection**: Evaluates proposed commands against observed uncommitted files, detached HEADs, diverged commits, and paused rebase/merge locks.
* **Deterministic Reversals**: Every accepted command comes pre-paired with an atomic undo command.

---

## Slide 6: Repository — Multi-Lane DAG & Working Tree Studio

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  TOPOLOGICAL DAG & WORKING TREE STUDIO (#repository)                                             │
│                                                                                                  │
│  Lane 0 (main)             Lane 1 (feature/cart)                                                 │
│       │                          * [HEAD] feat(cart): add quantity stepper                       │
│       * c90e14 (origin/cart)     │                                                               │
│       * b412d0                   │                                                               │
│       │ \                       /                                                                │
│       │  * 8a1f49 (Merge Base)                                                                   │
│                                                                                                  │
│  [☑ Checkbox File Staging]  [🔍 Syntax-Highlighted Diffs]  [💾 Stash Stack Restore]  [↩️ Rollback]│
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Interactive SVG DAG Graph**: Topological lane routing, smooth cubic bezier curves, and expressive role nodes (`HEAD`, `merge_base`, `hazard`, `conflicted`).
* **Working Tree Diff Viewer**: Side-by-side syntax-highlighted diffs with individual file staging checkboxes and Stage All controls.
* **Stash Management & Audit Rollback**: 1-click restoration of preserved stash snapshots and immutable session command history.

---

## Slide 7: CI/CD Telemetry — From Build Failure to Fix

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  CI/CD PIPELINE TELEMETRY & FLAKY TEST QUARANTINE (#cicd)                                        │
│                                                                                                  │
│  [01 Lint: Passed 14s]  ──►  [02 Tests: FAILED 45s]  ──►  [03 Security: 1 CVE]  ──►  [04 Build] │
│                                                                                                  │
│  ▼ Expandable Step Logs: FAIL src/tests/auth.spec.ts > token refresh timeout (48s)               │
│                                                                                                  │
│  [ 🛡️ Flaky Test Diagnostics ]                 [ 📦 Supply Chain Security ]                     │
│  auth.spec.ts (70% pass rate, 3 failures)       CVE-2026-8819 in jsonwebtoken@8.5.1 (High)       │
│  Action: [ 1-Click Quarantine Test Spec ]       Action: [ 1-Click Draft Dependabot Patch ]       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **5-Stage Live Progression Tracker**: Real-time pipeline monitoring with expandable terminal build and test logs.
* **Flaky Test Suite Quarantine**: Isolates intermittent test specs in 1 click to maintain main-branch release velocity.
* **Supply Chain CVE Patching**: Pinpoints vulnerable dependencies and drafts immediate patch upgrade PRs.

---

## Slide 8: Pull Requests — From Blocked Review to Merge

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  PULL REQUEST INTELLIGENCE & REVIEW ACCELERATOR (#pr)                                            │
│                                                                                                  │
│  PR #214: feat(cart): multi-currency checkout • CHANGES REQUESTED • 3 Days Waiting               │
│                                                                                                  │
│  💬 @sarah-lead on currency.ts:42: "Please ensure rate lookup has a timeout."                    │
│                                                                                                  │
│  [ ✨ 1-Click AI Resolution Response Composer ]                                                  │
│  "Added 5000ms AbortController timeout and unit test in currency.spec.ts."                       │
│                                                                                                  │
│  [ 🔀 Armed Squash & Merge + Automatic Feature Branch Pruning ]                                 │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **PR Bottleneck Telemetry**: Visualizes peer approval ratios (`1 of 2 required`) and review turnaround duration clocks.
* **AI Resolution Reply Composer**: Gemini synthesizes reviewer comments into polished, professional resolution replies detailing code changes.
* **Clean Squash & Merge**: Merges into main, pulls upstream, and prunes local feature branches automatically.

---

## Slide 9: Release Gate — 5-Pillar Deployment Scorecard

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  5-PILLAR RELEASE READINESS GATE (#release)                                                      │
│                                                                                                  │
│  Tests Passing (25%)  •  Code Coverage (20%)  •  CVE Security (25%)  •  PRs (15%)  •  Fresh (15%)│
│                                                                                                  │
│  Overall Readiness: 78% (CAUTION / REVIEW)                                                       │
│  AI Verdict: "High CVE in jsonwebtoken and 1 missing approval prevent green sign-off."           │
│                                                                                                  │
│  [ 📋 Copy Markdown Summary ]     [ 💾 Download JSON Compliance ]     [ 🛡️ Authorize Ship ]     │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Data-Driven Release Gate**: Evaluates 5 weighted pillars before authorizing production deployment.
* **AI Executive Synthesis (`POST /api/ai/release-readiness`)**: Produces structured release headlines, risk summaries, and blocker inventories.
* **Compliance Artifact Export**: 1-click download of JSON audit manifests and Markdown release notes.

---

## Slide 10: Risk Scorecard — 0–100 HP Dynamic Health Pool

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  7-FACTOR REPOSITORY HEALTH POOL (#risk)                                                         │
│                                                                                                  │
│  Health Pool: 68 / 100 HP [=======================-----------------] Moderate Risk               │
│                                                                                                  │
│  • 1. Branch Divergence (-15 pts) [Warning]       • 5. Code Smells & Debt (-6 pts) [Warning]     │
│  • 2. Failed Tests (0 pts) [Healthy]              • 6. Unreviewed PR Lag (0 pts) [Healthy]       │
│  • 3. Secrets Detected (0 pts) [Healthy]          • 7. Large PR Size (0 pts) [Healthy]           │
│  • 4. Open Vulnerabilities (-12 pts) [Warning]                                                   │
│                                                                                                  │
│  [ 🛠️ 1-Click "Remediate with Byte" Deep Links directly to Companion Chat ]                      │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Mathematical Health Score**: Derives Byte’s 0–100 HP health pool from 7 concrete DevSecOps deductions.
* **Category Filtering**: Instant filtering across *All*, *Hazards (Critical)*, *Warnings*, and *Healthy*.
* **Remediate with Byte**: 1-click deep links route directly to step-by-step remediation in the companion view.

---

## Slide 11: Production Architecture & Security

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  PRODUCTION-GRADE SEPARATION OF CONCERNS                                                         │
│                                                                                                  │
│  [ React 19 Frontend ]  ◄──(REST / WS)──►  [ Express Gateway (3004) ]                            │
│  • 6 Dedicated Pages                       ├── Secret Token Redactor (AIza, ghp, sk)             │
│  • Web Audio Synthesizer                   ├── 2-Layer Safety Policy (safety.ts)                 │
│  • Motion & Canvas Confetti                ├── Pure Argv Child Process (executor.ts)             │
│                                            └── FIFO Audit Buffer (200 events)                    │
│                                                     │                       │                    │
│                     (Safe argv CLI) ────────────────┘                       └──(TLS 1.3 REST/WS)─│
│                     ▼                                                           ▼                │
│             [ Local Git CLI ]                                           [ Google Gemini API ]    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Gateway Security Barrier**: Express server mediates all AI requests, redacts secret tokens, and enforces safety policies before anything reaches the shell.
* **Dual Workspace Awareness**: Local on-disk Git workspace scanner (`/api/git/live-status`) + Public GitHub test fixture (`/api/repo/live`).
* **Multi-Modal Gemini APIs**: Live Audio WebSocket (`/live`), Pet Image Studio (`30m preview registry`), and TTS speech synthesis.

---

## Slide 12: Conclusion — Ambient DevSecOps & Live Demo

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  GITPET: AMBIENT DEVSECOPS COMPANION                                                             │
│  "See risk. Understand evidence. Resolve safely."                                                │
│                                                                                                  │
│  ✓ 31 Automated Vitest Tests (100% Pass)        ✓ NIST AI RMF 1.0 & STRIDE Threat Model          │
│  ✓ Zero Unverified Shell Execution              ✓ Dual Mode: Local Git & GitHub Fixture          │
│                                                                                                  │
│  🚀 Run It Live: npm run dev  ──►  http://localhost:3004                                         │
│  📦 Repository: https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05... │
│                                                                                                  │
│  Thank you! Questions & Live Demo Walkthrough                                                    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Bottom Line**: GitPet makes repository health ambient, explainable, and 100% safely actionable.
* **Enterprise Rigor**: 31 automated Vitest tests, complete CycloneDX SBOM (`npm run sbom`), SRE runbook, and NIST AI RMF governance.
* **Live Demo Command**: Run `npm run dev` and explore all 6 workspaces at `http://localhost:3004`.
