# 🎙️ GitPet Comprehensive Presentation Playbook: Verbatim Speaker Scripts

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli  
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)  
**Target Duration:** About 20 minutes (including handoffs and app-navigation cues)
**Presentation Format:** Authoritative, high-impact slide-deck presentation explaining the core problem landscape, event challenge, system architecture, 6 dedicated full-page workspaces, 2-layer safety policy engine, scoring algorithms, and governance model to judges and technical evaluators.  
**Presenters:**  
- **Aliasgar** — Slides 1–3: mission, problem, and solution.
- **Lucas Whitaker** — Slides 4–6: AI assistance and the safety policy.
- **David Castelli** — Slides 7–9: repository, CI/CD scenarios, and PR scenarios.
- **Faris** — Slides 10–13: readiness, risk, architecture, and closing.
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## ⏱️ Master Presentation Schedule & Presenter Split

| Slide # | Slide Title in Deck 11 | Core Architectural & Feature Topic | Target Time | Cumulative | Presenter Lead |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **01** | **GitPet (Title & AWS Community Day)** | Welcome, Team Credentials & The DevOps for GenAI Challenge | 1:15 | 1:15 | **Aliasgar** |
| **02** | **THE PROBLEM (3 Developer Crises)** | Context Blindness, Excessive AI Agency, & Buried Telemetry | 1:15 | 2:30 | **Aliasgar** |
| **03** | **SOLUTION (Notice · Understand · Resolve)** | 3-Stage DevSecOps Loop & 18 Physical Symptoms Taxonomy | 1:40 | 4:10 | **Aliasgar** |
| **04** | **AI ASSISTANCE (Talk to Byte)** | 4 Personas, Tiered Gemini Flash Models, Grounded Evidence | 1:35 | 5:45 | **Lucas Whitaker** |
| **05** | **SAFETY (Layer 1: Static Rules)** | Universal Danger Invariants, Zero Force-Push & Pure Argv Execution | 1:30 | 7:15 | **Lucas Whitaker** |
| **06** | **SAFETY (Layer 2: Contextual Lints)** | Working-Tree Lints, Untracked Stash Suggestion (`-u`) & Execution Anchors | 1:35 | 8:50 | **Lucas Whitaker** |
| **07** | **REPOSITORY (DAG & Working Tree)** | Multi-Lane SVG Graph, Diff Studio, Checkbox Staging & Stashes | 1:40 | 10:30 | **David Castelli** |
| **08** | **CI/CD (Scenario Walkthrough)** | 5-Stage Demo, Example Logs, Flaky-Test Triage & Seeded CVE | 1:30 | 12:00 | **David Castelli** |
| **09** | **PULL REQUESTS (Review Scenario)** | Sample PR, Status Display, Example Threads & Editable Reply | 1:25 | 13:25 | **David Castelli** |
| **10** | **SCORING (Readiness Report)** | Advisory 5-Pillar Scorecard, Optional AI Summary & Report Exports | 1:35 | 15:00 | **Faris** |
| **11** | **SCORING (Dynamic Risk Analysis)** | 7-Factor HP Pool (0–100 HP) & Remediation Guidance | 1:35 | 16:35 | **Faris** |
| **12** | **ARCHITECTURE (System & Gateway)** | React 19, Express Server, Safety Policy & Git Execution | 1:45 | 18:20 | **Faris** |
| **13** | **CLOSING (Ambient DevSecOps + Live Launch)** | Five Core Ideas, 31 Vitest Tests, Demo Launch & Q&A | 1:00 | 19:20 | **Faris** |

Allow approximately 0:40 for transitions and app navigation to reach a 20-minute total.

---

## Slide 1: Title & The Mission — AWS Community Day Ottawa 2026

**Presenter:** **Aliasgar**
**Target time:** 1 minute 15 seconds
**Visual Focus on Slide 1:** Product branding, team credentials, [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) banner, and the 3-column architecture diagram: *1. Hackathon Theme*, *2. Proposed App: GitPet*, and *3. Hackathon Alignment*.  

### Verbatim Spoken Presentation:
> “Good morning, judges, fellow engineers, and community members!
>
> We are Team 05, **Ribbon Patrol**: Lucas Whitaker and David Castelli.
>
> Today, we are thrilled to present **GitPet**—an ambient DevSecOps repository companion conceived, architected, and built specifically for **AWS Community Day Ottawa 2026** ([awscommunityday.ca](https://awscommunityday.ca/)) in the **DevOps for GenAI Hackathon**.
>
> **First, let’s look at the Hackathon Theme:**  
> AWS Community Day brings together cloud architects, DevOps engineers, and AI practitioners across Canada’s capital. The core challenge of the DevOps for GenAI track asks a vital question: *How can we harness modern Generative AI to eliminate developer friction, automate complex Git operations, and secure CI/CD pipelines—without introducing the catastrophic risks of unverified, autonomous AI execution?*
>
> **Second, our Proposed Solution — GitPet:**  
> GitPet demonstrates an ambient virtual companion named **Byte**. The app maps its selected sandbox scenario, or an explicitly requested local Git scan, into **18 physical symptoms** and a health aura. Optional tiered Gemini chat can explain repository context; CI/CD and PR screens use deterministic scenario data rather than connected provider integrations.
>
> **Third, how GitPet directly aligns with the Hackathon goals:**  
> 1. **DevOps & DevEx Modernization:** It demonstrates workflows across multi-lane DAG topology, CI/CD status, PR review scenarios, and release-readiness scoring.
> 2. **Responsible DevSecOps & Security Governance:** Rather than giving an LLM direct shell access—which triggers the critical **OWASP LLM08 (Excessive Agency)** vulnerability—GitPet enforces a **2-layer deterministic safety engine** in code (8 static invariants + 7 contextual lints) with pure argv execution and mandatory human approval gates.
> 3. **Engineering Rigor:** GitPet includes 31 automated Vitest tests across 3 suites, plus documented threat modeling, an SBOM, and AI governance materials. These artifacts do not by themselves establish production readiness.
>
> Our foundational promise is simple: *See risk. Understand evidence. Resolve safely.*”

### Slide Delivery Cues:
- Greet the judges warmly and direct their gaze to the three thematic columns on the slide.
- Clearly emphasize the three pillars: *1. The Hackathon Theme*, *2. The Proposed Application (GitPet)*, and *3. Our Direct Hackathon Alignment*.
- Highlight Team 05’s focus on responsible AI and production engineering.

### Verbal Transition to Slide 2:
> “To see why software engineering teams urgently need this companion, let’s look at the three developer crises on Slide 2.”

---

## Slide 2: The Problem — The 3 Developer Crises

**Presenter:** **Aliasgar**
**Target time:** 1 minute 15 seconds
**Visual Focus on Slide 2:** The three developer problem cards: *1. Context Blindness*, *2. Unchecked AI Agency*, and *3. Buried Telemetry*.  

### Verbatim Spoken Presentation:
> “Modern software delivery suffers from three critical friction points:
>
> 1. **First, Context Blindness and Cognitive Overload.** Developers must correlate information across terminal windows, CI/CD portals, pull request queues, and security dashboards. Critical conditions can be discovered late, when a merge or release is already at risk.
> 2. **Second, the 'Excessive Agency' Dilemma in AI Coding Assistants.** Autonomous coding agents with unrestricted shell access can generate syntactically valid commands that carry catastrophic blast radius—such as blind force-pushes, hard resets, or destructive file wipes. Prompt instructions alone are not security boundaries.
> 3. **Third, Buried Telemetry.** Non-linear branch divergence, merge conflicts, flaky test regressions, and supply-chain CVEs are technically logged, but remain buried inside thousands of lines of raw terminal output.
>
> GitPet demonstrates a way to bring these signals together. Byte reflects the current selected scenario or scanned repository state, explains relevant context, and guides developers through policy-checked actions that require user review.”

### Slide Delivery Cues:
- Point out the three colored problem cards.
- Pause momentarily after stating the three problems to let the dilemma resonate with the judges.
- Emphasize the core takeaway: *Prompt instructions are guidance; code-level checks provide an additional enforcement boundary, not a guarantee against every failure.*

### Verbal Transition to Slide 3:
> “Let’s look at how GitPet converts this fragmented telemetry into an intuitive, continuous developer workflow on Slide 3.”

---

## Slide 3: SOLUTION (Notice · Understand · Resolve)

**Presenter:** **Aliasgar**
**Target time:** 1 minute 40 seconds
**Visual Focus on Slide 3:** The 3-stage DevSecOps loop diagram, the 18 physical symptoms taxonomy, and the bottom principle: *“Human judgment remains the approval gate.”*  

### Verbatim Spoken Presentation:
> “GitPet organizes the demonstrated workflow into a 3-stage loop: **Notice, Understand, and Resolve.**
>
> **Stage 1 is NOTICE (Ambient Awareness):**  
> Byte’s physical posture, aura, accessories, and Web Audio cues reflect the current app state. The state engine models **18 physical symptoms**, spanning Git conditions and seeded CI/CD, PR, and infrastructure scenarios. Local repository scanning is an explicit mode; the app is not a background monitoring agent.
>
> **Stage 2 is UNDERSTAND (Grounded Reasoning):**  
> When Gemini is configured, chat requests can include repository state such as branch, ahead/behind counts, and working-tree paths. The CI/CD, PR, and vulnerability details shown in the demo are scenario data. Treat model explanations as assistance, not verified findings.
>
> **Stage 3 is RESOLVE (Bounded Execution):**  
> For supported Git operations, the app provides a preview and evaluates commands against policy before any permitted execution. The preview is not a guaranteed blast-radius analysis or a universal undo plan; `headBefore` and `headAfter` are recovery references.
>
> As shown at the bottom of the slide, our foundational architectural rule is simple: *Human judgment remains the mandatory approval gate.*”

### Slide Delivery Cues:
- Explain the health labels accurately: **Healthy** starts at 80 HP, **Attention** is generally below 80, **Blocked** can result from severe conditions (including scores below 45), and **Unsafe** indicates a destructive hazard or zero HP. These labels are not solely score bands.
- Emphasize that Byte is not decorative art—it is an authoritative ambient telemetry visualizer.

### Verbal Transition to Slide 4:
> “Now Lucas will explain how Byte adapts its reasoning to different developer roles and task complexities on Slide 4.”

---

## Slide 4: AI ASSISTANCE (Talk to Byte)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 35 seconds
**Visual Focus on Slide 4:** The 4 specialized personas matrix, the 3 model speed tiers (`@google/genai` v2.4.0), and the structured anatomy of an AI response.  

### Verbatim Spoken Presentation:
> “Not every developer requires the same type of guidance. A junior developer learning Git needs clear mental models; a platform architect diagnosing a complex rebase conflict needs topological rigor; and a release engineer needs strict compliance verification.
>
> GitPet solves this by providing **four specialized AI personas**:
> 1. **Byte Mascot:** Friendly, concise guidance and developer humor for daily workflow hygiene.
> 2. **Senior Architect:** Focuses on commit topology, merge-base ancestry, rebase strategies, and long-term repository health.
> 3. **Safety Auditor:** Strictly focuses on zero data loss, stash verification, policy compliance, blast radius, and reversal readiness.
> 4. **Git Tutor:** Teaches internal Git mental models—explaining blobs, trees, commit objects, references, HEAD, and the staging index.
>
> GitPet routes requests across **three model tiers** using the Google GenAI SDK (`@google/genai` v2.4.0):
> - **Fast Tier (`gemini-3.1-flash-lite`):** For short status requests and commit message drafting.
> - **General Tier (`gemini-3.6-flash`):** For standard conversational chat and tutoring.
> - **Deep Tier (`gemini-3.7-flash`):** For complex merge conflicts, DAG analysis, and release sign-offs.
>
> The chat UI can show repository context and recommended-action details. Do not present model responses as guaranteed evidence citations, calibrated confidence scores, or atomic undo plans.
>
> If Gemini is unavailable, some chat/analyze flows can fall back to deterministic rule-based guidance. This fallback does not cover every feature or guarantee an AI-equivalent response.”

### Slide Delivery Cues:
- Explain that repository context is supplied to supported chat requests, while model output can still be wrong and should be checked.

### Verbal Transition to Slide 5:
> “Reasoning quality is essential, but reasoning alone is not a security boundary. On Slide 5, let’s look at how GitPet enforces safety at the code level.”

---

## Slide 5: SAFETY (Layer 1: Static Rules)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 30 seconds
**Visual Focus on Slide 5:** The blocked-command examples, safer suggestions, and argv-based Git execution.

### Verbatim Spoken Presentation:
> “In any AI-enabled developer system, prompt engineering is guidance—it is not a security boundary. If an LLM hallucinates a dangerous command, receives prompt injection, or misinterprets repository state, relying on system instructions alone will fail.
>
> GitPet implements safety as deterministic application code through a **2-Layer Safety Policy Engine** in `safety.ts`.
>
> **Layer 1 enforces Universal Static Invariants** regardless of repository state:
> - **Zero Un-Leased Force-Pushes:** Commands like `git push --force` or `-f` are hard-rejected; the policy can suggest the safer `--force-with-lease` alternative.
> - **Zero Destructive Resets:** Commands like `git reset --hard` are blocked; GitPet recommends preserving work first with `git reset --keep` or stashing.
> - **Zero Permanent Deletions:** Destructive cleanups like `git clean -fdx`, unmerged branch deletion (`git branch -D`), and `git stash drop` are forbidden.
> - **Zero History Rewrites:** Operations like `filter-branch` and `--filter-repo` are blocked.
> - **Zero Shell Injection:** Metacharacters like semicolons, pipes, backticks, and `$()` are rejected.
>
> Crucially, approved commands are tokenized into argument arrays and executed via `child_process.execFile`—completely bypassing the system shell and neutralizing command injection attacks.
>
> We also enforce a strict binary whitelist: only the `git` executable is permitted. Commands like `sudo`, `rm`, `curl`, or `sh` are dropped at the gateway before reaching the OS.
>
> The model can suggest an action; the safety engine decides what is permitted.”

### Slide Delivery Cues:
- Point out the clear contrast between blocked red commands and green safe alternatives.
- Highlight that Layer 1 is backed by 19 automated executor tests in Vitest.

### Verbal Transition to Slide 6:
> “Static syntax checks catch universally dangerous commands. But what happens when a command is syntactically valid yet dangerous in the current working directory? That brings us to Slide 6.”

---

## Slide 6: SAFETY (Layer 2: Contextual Lints)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 35 seconds
**Visual Focus on Slide 6:** The untracked-file stash scenario, the `stash-misses-untracked` warning and `-u` suggestion, and execution policy.

### Verbatim Spoken Presentation:
> “On Slide 6, we present **Layer 2: Contextual Safety Lints**.
>
> Layer 2 compares proposed commands against the live working tree, staging index, branch relationships, stash stack, and any Git operation currently in progress.
>
> Consider the classic Git scenario on this slide:
>
> A developer has uncommitted, untracked files in their directory. The AI assistant suggests:
>
> `git stash push -m "wip"`
>
> This is completely valid Git syntax. However, standard Git silently leaves untracked files behind in the working directory. A subsequent branch checkout, rebase, or pull will fail or overwrite those untracked files, resulting in silent data loss.
>
> GitPet detects this condition using our `stash-misses-untracked` contextual lint.
>
> The engine does not silently rewrite or execute the command. It warns the developer and suggests:
>
> `git stash push -u -m "wip"`
>
> The added `-u` ensures all untracked files are safely preserved in the snapshot.
>
> Layer 2 also detects diverged branch pulls, dirty-tree pulls without `--autostash`, unresolved conflict markers, empty stash pops, and paused rebases—where commands are strictly restricted to `--continue`, `--skip`, or `--abort`.
>
> Live Git writes are disabled by default and require explicit opt-in via `GITPET_ALLOW_WRITES=true`. Execution records `headBefore` and `headAfter` hashes, but those anchors do not guarantee that every operation can be rolled back with one click.”

### Slide Delivery Cues:
- Point directly to the missing `-u` in the model suggestion versus the corrected command.
- Emphasize the core takeaway: *“Valid syntax, unsafe context.”*

### Presenter Handoff to Slide 7:
- **Lucas:** *“With our safety foundation established, David will now demonstrate the repository workspace and scenario-driven delivery views.”*

---

## Slide 7: REPOSITORY (DAG & Working Tree)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 40 seconds
**Visual Focus on Slide 7:** The Multi-Lane SVG Topological DAG Graph layout, commit role badges, the Working Tree Diff Studio, and stash restoration.  

### Verbatim Spoken Presentation:
> “Slide 7 showcases our dedicated **Repository Details & DAG Graph Workspace (`#repository`)**.
>
> On the left, our **Interactive Multi-Lane DAG Visualizer** translates complex Git histories into an intuitive SVG topological graph.
>
> Rather than drawing an unreadable linear git log, our normalizer sorts commits topologically, assigns them to parallel branch lanes—main trunk, feature branches, and forks—and connects them with smooth cubic bezier spline curves.
>
> GitPet models **11 distinct commit roles**: the checked-out `HEAD`, the `upstream_HEAD` pointer, local ahead commits, remote behind commits, the highlighted **Merge Base** double-ring node, fork points, conflict points, and hazards. Clicking any commit node opens an inspector drawer displaying author, timestamp, parent hashes, and full commit messages.
>
> On the right, our **Working Tree & Diff Studio** provides file search, individual checkbox staging controls, Stage All / Unstage All controls, and unified syntax-highlighted diffs with line gutters and addition/deletion counters.
>
> Developers can stage files selectively, inspect stash snapshots, request a Gemini-generated conventional commit from staged diffs, and review the in-memory session audit history. Recovery controls are operation-specific; the audit history is not immutable or a universal rollback facility.”

### Slide Delivery Cues:
- Point to the cubic bezier spline curves and the distinct Merge Base double-ring node on the DAG diagram.
- Highlight how the diff studio connects working tree changes directly to the commit generator and safety preview.

### Verbal Transition to Slide 8:
> “Repository state is only one part of delivery health. Let’s look at how GitPet connects source code to CI/CD pipeline telemetry on Slide 8.”

---

## Slide 8: CI/CD (Failure to Remediation)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 30 seconds
**Visual Focus on Slide 8:** The 5-stage pipeline progression tracker, expandable terminal execution logs, flaky test suite diagnostics, and supply chain CVE scan.  

### Verbatim Spoken Presentation:
> “On Slide 8, we explore the **CI/CD Pipeline Telemetry Workspace (`#cicd`)**, which bridges local development with continuous integration and deployment pipelines.
>
> Our **5-Stage Pipeline Progression Tracker** monitors:
> 1. *Lint & Static Analysis*
> 2. *Unit & Integration Tests*
> 3. *Security & CVE Scan*
> 4. *Container Artifact Build*
> 5. *Deployment / Staging Rollout*
>
> Clicking a pipeline stage expands illustrative logs supplied by the scenario; the demo is not connected to a CI provider.
>
> In the scenario shown on screen, linting passed, but the test stage failed on `auth.spec.ts` due to a token refresh timeout.
>
> This workspace demonstrates two common platform-engineering concerns:
> 1. **Flaky Test Triage:** The selected scenario supplies pass-rate and failure data. The quarantine control demonstrates a UI action; it does not edit a test file, change a pipeline, or notify QA.
> 2. **Supply Chain Security:** The scenario displays a seeded vulnerability example, such as CVE-2026-8819 in `jsonwebtoken@8.5.1`. It is not the result of a live dependency scan and the remediation control does not open a Dependabot PR.
>
> GitPet moves developers from a generic red build badge to the exact root cause and an actionable remediation path in seconds.”

### Slide Delivery Cues:
- Point out the progression from the failing test log to the flaky test diagnostic card and the supply chain CVE card.

### Verbal Transition to Slide 9:
> “Once the pipeline is understood, the next delivery bottleneck is often peer code review. Let’s look at Pull Request Intelligence on Slide 9.”

---

## Slide 9: PULL REQUESTS (Review to Merge)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 25 seconds
**Visual Focus on Slide 9:** Scenario PR #214 metadata, approval/change-request counts, example wait value, inline comments, and editable sample reply.

### Verbatim Spoken Presentation:
> “In the **Pull Request Intelligence Workspace (`#pr`)** on Slide 9, GitPet accelerates code review cycles and eliminates review bottlenecks.
>
> The workspace surfaces critical review telemetry:
> - **Approval Display:** Scenario-provided count (for example, 1 approval and 1 requested change); it is not queried from branch protection rules.
> - **Review Wait Display:** Shows the scenario's wait value (for example, 3 days); it is not calculated from a live PR timestamp.
> - **Mergeability Diagnostic:** Verifies merge conflict status and CI check results.
>
> Below, review comments are anchored directly to file paths and line numbers. When a reviewer requests changes—such as wrapping a currency rate lookup in a timeout—developers can click **Draft AI Resolution Response**.
>
> In the current implementation, the reply composer fills an editable example response locally; it does not call Gemini with the review thread or post a comment to GitHub.
>
> The developer reviews and edits the draft before posting—GitPet never speaks autonomously on behalf of the developer.
>
> The **Squash & Merge** control demonstrates a local UI state change. It does not merge a remote pull request, prune a branch, or generate a changelog automatically.”

### Slide Delivery Cues:
- Point out that PR values are scenario data and the reply is an editable UI example.

### Presenter Handoff to Slide 10:
- **David:** *“The app has brought Git and delivery scenarios together. Faris will now explain its advisory readiness and risk views.”*

---

## Slide 10: SCORING (Release Gate & Deployment)

**Presenter:** **Faris**
**Target time:** 1 minute 35 seconds
**Visual Focus on Slide 10:** The 5-pillar deployment scorecard gauge (78% score, Caution/Review status), the active blocker inventory, and compliance artifact exports.  

### Verbatim Spoken Presentation:
> “On Slide 10, we present the **Release Gate Workspace (`#release`)**, which turns current app-state inputs into an advisory readiness report.
>
> The local `releaseReadiness.ts` function computes an advisory score from five weighted dimensions:
> 1. **Tests Passing (25% Weight):** Scores the current state's pipeline pass/fail fields (Target: 100%).
> 2. **Code Coverage (20% Weight):** Evaluates line coverage against targets (Target: ≥80%).
> 3. **Vulnerabilities (25% Weight):** Scores scenario/state vulnerability data (Target: 0 High/Critical findings).
> 4. **PR Approvals (15% Weight):** Scores scenario/state approval information; it does not enforce a remote branch rule.
> 5. **Branch Freshness (15% Weight):** Measures divergence from upstream main.
>
> In the scenario shown on screen, the calculated score is **78% (Caution / Review)**.
>
> The optional `POST /api/ai/release-readiness` endpoint can request Gemini synthesis when configured. Vulnerabilities and approvals in this demo are scenario inputs, not live scans or branch-protection checks.
>
> A blocker action can pass context to Byte for guidance; it does not remediate the underlying issue automatically.
>
> Users can copy a Markdown summary or download the calculated JSON report. These are demo reports, not signed compliance artifacts or deployment sign-offs. The sign-off button does not deploy.”

### Slide Delivery Cues:
- Point out the 5 weighted pillar bars, the circular gauge (78%), and the active blocker cards.

### Verbal Transition to Slide 11:
> “The advisory release score is one view of readiness; Byte’s health pool uses a separate 7-factor model on Slide 11.”

---

## Slide 11: SCORING (Dynamic Risk Analysis)

**Presenter:** **Faris**
**Target time:** 1 minute 35 seconds
**Visual Focus on Slide 11:** The 7-factor risk deduction breakdown table, the current-state 0–100 HP health pool gauge, and category filtering.

### Verbatim Spoken Presentation:
> “On Slide 11, we examine the **Risk Scorecard & Health Pool Workspace (`#risk`)**. The score is deterministic for the current state, which may be a sandbox scenario rather than live telemetry.
>
> GitPet begins with a base score of 100 Health Points (HP) and applies deductions across **7 weighted DevSecOps dimensions**:
> 1. **Branch Divergence (0 to -35 pts):** Ahead/behind drift, detached HEAD, work-loss hazards.
> 2. **Failed & Flaky Tests (0 to -28 pts):** Build failures, flaky suites, rollout crashes.
> 3. **Secrets & Security Policies (0 to -30 pts):** Exposed API keys, public storage buckets.
> 4. **Open CVE Vulnerabilities (0 to -22 pts):** High/Critical dependency CVEs.
> 5. **Code Smells & Debt (0 to -15 pts):** Dirty file sprawl (>8 files), lint debt.
> 6. **Unreviewed PR Lag (0 to -15 pts):** Stale reviews (>3 days), changes requested.
> 7. **Large PR Scope (0 to -8 pts):** Changesets exceeding 400 lines or 15 files.
>
> In this example, those deductions total **67 HP**: -15 for branch divergence, -12 for vulnerabilities, and -6 for working-tree/code-smell state. Use the actual displayed score if the selected scenario differs.
>
> Developers can filter factors by *All*, *Hazards*, *Warnings*, and *Healthy*. A remediation action opens Byte with diagnostic context; it provides guidance rather than automatically fixing the factor.”

### Slide Delivery Cues:
- Emphasize the mathematical formula: $\text{Health Score} = \max(0, 100 - \sum \text{Deductions})$.
- Highlight how clicking *Remediate with Byte* turns diagnostic assessment directly into action.

### Verbal Transition to Slide 12:
> “Now let’s look under the hood at the system boundaries and production architecture that make these capabilities possible on Slide 12.”

---

## Slide 12: ARCHITECTURE (System & Gateway)

**Presenter:** **Faris**
**Target time:** 1 minute 45 seconds
**Visual Focus on Slide 12:** The C4 container architecture diagram, trust boundaries, Express gateway on port 3004, secret redactor, and execution pipeline.  

### Verbatim Spoken Presentation:
> “On Slide 12, we detail GitPet’s production architecture, designed with strict separation of concerns across deliberate trust boundaries:
>
> 1. **The React 19 Frontend SPA:** Built with TypeScript, Vite, TailwindCSS, Motion, and the Web Audio API. Browser-side code requests supported Git operations from the server; it does not spawn Git itself.
> 2. **The Node.js Express Server (port 3004):** Provides REST and WebSocket routes, redaction/sanitization helpers, an in-memory FIFO audit buffer (max 200 events), temporary image previews, and optional Basic Auth when configured.
> 3. **Supported Git actions pass through `safety.ts` and `executor.ts`:** This includes 8 hard-block rules, 7 contextual lints, and parser/allowlist checks. Execution uses argv-based `child_process.execFile`; live writes require `GITPET_ALLOW_WRITES=true`.
> 4. **Repository data options:** The local scanner reads the configured on-disk repository; `/api/repo/live` retrieves the configured public GitHub fixture. CI/CD and PR workspaces are not live-connected integrations.
> 5. **Google Gemini Cloud Services:** Ingests context via the official `@google/genai` v2.4.0 SDK across multi-tier fallback chains, Live Audio streaming over WebSockets on `/live`, and avatar generation.
>
> The key architectural principle is strict separation of concerns:
>
> *The model provides reasoning. The gateway provides mediation. The policy engine provides enforcement. The human provides authorization. The executor performs only the allowed operation.*”

### Slide Delivery Cues:
- Trace the flow from left to right on the C4 diagram: React client → Express gateway → Safety engine → Git CLI subprocess and Gemini Cloud.
- Emphasize the core judge takeaway: *The external AI service cannot directly execute a command in the local repository.*

### Transition to Slide 13:
- **Faris:** *“Let’s close with what this prototype demonstrates and how to try the app.”*

---

## Slide 13: CLOSING (Ambient DevSecOps + Live Launch)

**Presenter:** **Faris**
**Target time:** 1 minute 0 seconds
**Visual Focus on Slide 13:** The 5 core pillars summary, test verification badges (31 Vitest tests, 100% pass), local launch command (`npm run dev`), repository link, and Q&A invitation.  

### Verbatim Spoken Presentation:

> “To summarize, GitPet demonstrates five core ideas:
> 1. **Ambient Awareness:** 18 physical symptoms and a 0–100 HP health pool visualize the selected app state.
> 2. **Grounded Multimodal Assistance:** Tiered Gemini Flash reasoning (3.1 Lite, 3.6 Flash, 3.7 Flash), real-time Live Audio WebSocket streaming, and custom avatar styling.
> 3. **Integrated DevSecOps Views:** Brings Git topology and working-tree views together with scenario-driven CI/CD, PR, readiness, and risk screens.”
>
> 4. **Bounded Git Actions:** Deterministic policy checks, preview, and explicit write opt-in constrain supported Git execution; they do not provide a universal rollback guarantee.
> 5. **Engineering Evidence:** 31 automated Vitest tests, threat-model and governance documentation, a runbook, and SBOM tooling are included. These are project artifacts, not proof of production readiness.
>
> GitPet makes DevSecOps health ambient, explainable, and safely actionable.
>
> You can launch the platform locally right now with `npm run dev` on port 3004.
>
> On behalf of Team 05, **Ribbon Patrol**, thank you for your time at AWS Community Day Ottawa 2026. We welcome your questions!”

---

## 🎯 Complete Rehearsal Q&A Playbook for Judges

### Q1: How does GitPet prevent prompt injection or jailbreak attacks from executing destructive shell commands?
* **Answer (Lucas):** *“AI output is not passed directly to a shell. Supported Git commands are parsed and checked by the safety policy, and execution uses argv-based `child_process.execFile`. The UI provides a preview; server-side policy is checked again, and writes require `GITPET_ALLOW_WRITES=true`. These controls reduce risk but do not prove the system is immune to every failure or destructive outcome.”*

### Q2: What happens if the Gemini API key is missing or quota is exhausted (HTTP 429)?
* **Answer (Lucas):** *“The model chain tries configured alternatives for availability/quota errors. Some chat/analyze requests can use a deterministic rule-based fallback when Gemini is unavailable, but this is not a universal offline mode. Other features may require the API and network.”*

### Q3: How does the DAG visualizer scale with large commit histories?
* **Answer (David):** *“The DAG normalizer (`gitDagNormalizer.ts`) arranges commit and parent data into lanes and merge-base relationships for SVG display. The current app does not claim a specific large-history render bound; performance should be measured against the target repository size.”*

### Q4: How is human-in-the-loop safety guaranteed for write operations?
* **Answer (Lucas):** *“Live Git writes are disabled by default and require `GITPET_ALLOW_WRITES=true`. The user previews supported commands, then the server re-evaluates the policy when execution is requested. Preview content and HEAD anchors are not a full filesystem diff or guaranteed rollback.”*

---

## 🛠️ Operational Emergency Fallback Script

*Use this script if the live network connection or local server experiences unexpected downtime during the live demo:*

> *“While we restore the local development server, the important workflow remains identical across all views:
>
> GitPet maps the selected scenario or scanned Git repository state into Byte’s visual state, can provide AI-assisted explanations, evaluates supported Git commands through static and contextual policies, and requires user review plus server write opt-in before permitted writes.
>
> Some chat/analyze paths can use deterministic guidance without Gemini. This is feature-specific: live voice and Gemini image/TTS functions may be unavailable, while the CI/CD and PR examples remain seeded demo data.”*