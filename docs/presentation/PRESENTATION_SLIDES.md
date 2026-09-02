# 🎯 GitPet Demo Presentation — Slide Deck Blueprint

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli  
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)  
**Target Duration:** 10–12 Minutes (Target: ~11 minutes 50 seconds)  
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## 🧭 13-Slide Master Overview

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                GITPET PRESENTATION ROADMAP                                       │
│                                                                                                  │
│  01. THE PROBLEM        02. THE EVENT MISSION   03. THE SOLUTION        04. AI ASSISTANCE        │
│  Terminal Blindness     AWS Community Day 2026  Notice·Understand·Fix   4 Roles & Fast Models    │
│                                                                                                  │
│  05. STATIC SAFETY      06. CONTEXT SAFETY      07. REPO & DAG          08. CI/CD & FLAKY        │
│  Zero Force-Push Rules  Working-Tree Lints      Multi-Lane Topology     Logs & 1-Click Fix       │
│                                                                                                  │
│  09. PULL REQUESTS      10. RELEASE GATE        11. RISK HEALTH POOL    12. ARCHITECTURE         │
│  AI Review Composer     5-Pillar Scorecard      0-100 HP Scoring        React 19 + Gateway       │
│                                                                                                  │
│  13. LIVE LAUNCH                                                                                 │
│  31 Tests & Q&A                                                                                  │
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

## Slide 2: The Event & The Mission — AWS Community Day Ottawa 2026

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  🇨🇦 AWS COMMUNITY DAY OTTAWA 2026 (https://awscommunityday.ca/)                                  │
│  Track: DevOps for GenAI Hackathon & Innovation Challenge                                        │
│                                                                                                  │
│  "How do we bridge Cloud-Native DevOps with Generative AI—safely, ambidently, and at scale?"    │
│                                                                                                  │
│  ┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐       │
│  │   DevOps Reality        │    │   GenAI Opportunity     │    │   GitPet Innovation     │       │
│  │   • Fragmented Pipelines│ ──►│   • Multimodal Reasoning│ ──►│   • Ambient Awareness   │       │
│  │   • CI/CD Bottlenecks   │    │   • Automated Diagnostics│    │   • Deterministic Safety│       │
│  │   • Security Compliance │    │   • Excessive Agency Risk│   │   • Production Readiness│       │
│  └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Community & Event**: Built specifically for **AWS Community Day Ottawa 2026** ([awscommunityday.ca](https://awscommunityday.ca/)), celebrating community-driven cloud and DevOps innovation in Canada's national capital region.
* **The Hackathon Prompt**: Modernizing developer experience by infusing Generative AI into Git workflows and CI/CD pipelines while solving the core security risk of unverified AI execution.
* **The Team 05 Answer**: Delivering a production-grade, enterprise-ready companion that unifies peripheral UI telemetry, multi-tier Google Gemini intelligence, and deterministic safety containment.

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
│  │   • Web Audio Cues      │    │   • Pre-Computed Undo   │    │   • 1-Click Rollback    │       │
│  └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘       │
│                                                                                                  │
│  Core Architectural Principle: "Human judgment remains the mandatory approval gate."             │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **1. Notice (Peripheral Vision)**: Byte’s posture, glowing aura, and Web Audio chiptunes signal repository health instantly without terminal polling.
* **2. Understand (Grounded AI)**: Google Gemini (3.6/3.7 Flash) explains drift in plain English with cited commit hashes, line numbers, and confidence ratings.
* **3. Resolve (Bounded Safety)**: Zero blind execution—every proposed action includes a pre-flight diff modal, blast radius estimate, and verified rollback plan (`git stash pop`, `git rebase --abort`).

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
│  • Fast Tier (gemini-3.1-flash-lite)  ──► Sub-second status checks & commit messages             │
│  • General Tier (gemini-3.6-flash)    ──► Conversational guidance, diff reviews & tutoring       │
│  • Deep Tier (gemini-3.7-flash)       ──► Complex merge DAG resolution & release readiness       │
│                                                                                                  │
│  Structured Response: Evidence Signals Box • Confidence Rating (%) • Pre-Computed Rollback       │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **4 Specialized Personas**: Adapts tone and depth—from junior developer mental models (Git Tutor) to topological rebase analysis (Senior Architect).
* **Tiered Speed Routing**: Matches task complexity to the ideal Google GenAI model (`gemini-3.1-flash-lite` for speed, `gemini-3.7-flash` for deep reasoning).
* **Grounded & Verifiable**: Every AI response cites repository telemetry facts and provides an atomic undo command. Offline deterministic fallback active if API is unreachable.

---

## Slide 5: Safety Layer 1 — Static Rules (Universal Danger Invariants)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 1: DETERMINISTIC STATIC INVARIANTS                                                        │
│                                                                                                  │
│  Blocked Dangerous Command                      Safe Alternative Auto-Suggested                  │
│  ---------------------------------------------  -----------------------------------------------  │
│  ❌ git push --force / -f                        ──► ✅ git push --force-with-lease               │
│  ❌ git reset --hard                             ──► ✅ git reset --keep / git stash              │
│  ❌ git clean -fdx / git branch -D               ──► ✅ Blocked: Permanent work destruction       │
│  ❌ git filter-branch / --filter-repo            ──► ✅ Blocked: History rewrite hazard           │
│  ❌ Shell metacharacters (; | & ` $() >)        ──► ✅ Blocked: Zero command injection           │
│                                                                                                  │
│  Enforcement: child_process.execFile with pure argv arrays • Strict binary whitelist ('git' only)│
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Deterministic Guardrails**: Safety is implemented as strict code policies in `safety.ts`—never relying on LLM prompt compliance.
* **Zero Force-Push Policy**: Hard-rejects destructive overwrites; automatically suggests lease-checked pushes.
* **Pure Argv Execution**: Commands are tokenized into argument arrays and executed directly without shell interpolation, eliminating injection vulnerabilities.

---

## Slide 6: Safety Layer 2 — Contextual Lints (Working-Tree Aware)

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  LAYER 2: CONTEXTUAL WORKING-TREE SAFETY LINTS                                                   │
│                                                                                                  │
│  Scenario: Uncommitted untracked files present in directory                                      │
│                                                                                                  │
│  Model Suggests: git stash push -m "wip"       (Valid syntax, but drops untracked files!)        │
│  GitPet Detects: stash-misses-untracked lint   ──► Auto-injects '-u' to prevent silent loss     │
│  Safe Execution: git stash push -u -m "wip"    (All work safely preserved in snapshot)          │
│                                                                                                  │
│  🛡️ Other Context Checks: diverged branch pulls • dirty tree checkout • paused rebase guards     │
│  🔒 Write Opt-In: GITPET_ALLOW_WRITES=true required • headBefore / headAfter rollback anchors    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Context-Aware Protection**: Detects dangerous conditions in syntactically valid Git commands based on live working tree, staging index, and operation-in-progress state.
* **Untracked File Preservation**: Automatically detects untracked files during stashing and upgrades commands to include `-u`, preventing silent data loss.
* **Opt-In Write Mode**: Mutating commands are disabled by default (`GITPET_ALLOW_WRITES=true`) and record commit hashes before and after for instant rollback.

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
│  • Drawer: author, commit hash, parents, message • AI Conventional Commit generator              │
│  • Merge base highlight with double-ring node    • Stash stack manager & audit rollback          │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Multi-Lane Topological DAG**: Turns linear commit history into an interactive topological graph, identifying merge bases, branch divergence, and detached HEAD hazards.
* **Working Tree Diff Studio**: Provides individual file checkbox staging, syntax-highlighted diffs, and addition/deletion counters.
* **AI Conventional Commit**: Gemini analyzes staged diffs to generate semantic, standards-compliant commit messages in seconds.

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
│  [ 🧪 Flaky Test Diagnostics ]                   [ 📦 Supply Chain Security ]                    │
│  auth.spec.ts: 70% pass rate (3 failures)        CVE-2026-8819 in jsonwebtoken@8.5.1 (High)      │
│  Action: [ 🛡️ Quarantine Test Spec ]              Action: [ 🛠️ Draft Dependabot Patch ]           │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **5-Stage Pipeline Progression**: Tracks Linting, Tests, Security CVEs, Artifact Build, and Deployment with inline terminal execution logs.
* **Flaky Test Suite Quarantine**: Flags intermittent test suites (e.g. 70% pass rate) and provides 1-click test spec quarantine to unblock deployment gates.
* **Supply Chain CVE Patching**: Scans dependencies for high/critical vulnerabilities and drafts upgrade pull requests with one click.

---

## Slide 9: Pull Request Intelligence — Turnaround to Merge

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  PULL REQUEST INTELLIGENCE WORKSPACE (#pr)                                                       │
│                                                                                                  │
│  PR #214: Add Currency Rate Lookup • Branch: feature/currency • Author: farisnour                │
│  Approvals: 1 of 2 required [=====-----]  •  Turnaround Clock: 3 days in review (Stale Bottleneck)│
│                                                                                                  │
│  Inline Review Thread (src/services/currency.ts:42):                                             │
│  Reviewer: "Please wrap this external rate lookup in a timeout to avoid hangs."                  │
│                                                                                                  │
│  [ 🤖 Draft AI Resolution Response ]                                                             │
│  "Added 5000ms AbortController timeout and unit test in currency.spec.ts. Ready for re-review!" │
│                                                                                                  │
│  Action: [ 🔀 Armed Squash & Merge + Prune Feature Branch ]                                      │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Review Telemetry**: Surfaces approval ratios, review turnaround durations (measuring team review latency), and merge conflict status.
* **AI Resolution Reply Composer**: Gemini reads reviewer feedback and code context to draft polite, technically accurate resolution responses for developer review.
* **Clean Branch Lifecycle**: Armed Squash & Merge prunes feature branches and generates changelogs automatically.

---

## Slide 10: Release Gate — Automated 5-Pillar Scorecard

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
* **Data-Driven Release Gate**: Evaluates 5 weighted pillars in `releaseReadiness.ts` before authorizing production deployment.
* **AI Executive Synthesis (`POST /api/ai/release-readiness`)**: Produces structured release headlines, risk summaries, and blocker inventories.
* **Compliance Artifact Export**: 1-click download of JSON audit manifests and Markdown release notes for deployment auditing.

---

## Slide 11: Risk Scorecard — 0–100 HP Dynamic Health Pool

### Visual Layout
```
+--------------------------------------------------------------------------------------------------+
│  7-FACTOR REPOSITORY HEALTH POOL (#risk)                                                         │
│                                                                                                  │
│  Health Pool: 68 / 100 HP [=======================-----------------] Moderate Risk               │
│                                                                                                  │
│  • 1. Branch Divergence (-15 pts) [Warning]       • 5. Code Smells & Debt (-6 pts) [Warning]     │
│  • 2. Failed Tests (0 pts) [Healthy]              • 6. Unreviewed PR Lag (0 pts) [Healthy]       │
│  • 3. Secrets Detected (0 pts) [Healthy]          • 7. Large PR Scope (0 pts) [Healthy]          │
│  • 4. Open CVE Vulnerabilities (-12 pts) [Hazard]                                                │
│                                                                                                  │
│  Action: [ 🛠️ Remediate with Byte ──► Instant Deep Link to Companion Chat ]                      │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **Mathematical Health Pool**: Dynamic 0–100 HP score calculated from 7 real-time DevSecOps telemetry deduction factors.
* **Interactive Category Filtering**: Filter factors by All, Hazards (Critical), Warnings, and Healthy.
* **1-Click Remediation**: Every risk factor includes a deep link that pre-populates Byte with diagnostic context and remediation steps.

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
* **Gateway Security Barrier**: Express server mediates all AI requests, redacts secret tokens, and enforces safety policies before anything reaches the shell.
* **Dual Workspace Awareness**: Local on-disk Git workspace scanner (`/api/git/live-status`) + Public GitHub test fixture (`/api/repo/live`).
* **Multi-Modal Gemini APIs**: Live Audio WebSocket (`/live`), Pet Image Studio (`30m preview registry`), and TTS speech synthesis.

---

## Slide 13: Conclusion — Ambient DevSecOps & Live Launch

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
│  🇨🇦 AWS Community Day Ottawa 2026: https://awscommunityday.ca/                                  │
│                                                                                                  │
│  Thank you! Questions & Live Demo Walkthrough                                                    │
+--------------------------------------------------------------------------------------------------+
```

### Punchy Bullet Points:
* **The Bottom Line**: GitPet makes repository health ambient, explainable, and 100% safely actionable.
* **Enterprise Rigor**: 31 automated Vitest tests, complete CycloneDX SBOM (`npm run sbom`), SRE runbook, and NIST AI RMF governance.
* **Live Demo Command**: Run `npm run dev` and explore all 6 workspaces at `http://localhost:3004`.
