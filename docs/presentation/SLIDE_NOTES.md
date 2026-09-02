# 🎙️ GitPet Comprehensive Presentation Playbook: 2-Presenter Verbatim Speaker Scripts

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli  
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)  
**Target Duration:** 10 to 12 Minutes (Target: ~11 minutes 50 seconds)  
**Presentation Format:** Authoritative, high-impact slide-deck presentation explaining the core problem landscape, event challenge, system architecture, 6 dedicated full-page workspaces, 2-layer safety policy engine, scoring algorithms, and governance model to judges and technical evaluators.  
**Presenters:**  
- **Lucas Whitaker** (Lead Presenter — Majority: Title & Event Mission, Problem Crises, Core Loop, AI Engine, 2-Layer Safety Policy, Release Gate, Risk Health Pool, Production Architecture, Closing)  
- **David Castelli** (Workspaces Presenter: Repository DAG & Diff Studio, CI/CD Pipeline Telemetry & Flaky Quarantine, PR Intelligence & AI Reply Composer, Shared Closing)  
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## ⏱️ Master Presentation Schedule & 2-Presenter Split (Lucas Majority)

| Slide # | Slide Title in Deck 11 | Core Architectural & Feature Topic | Target Time | Cumulative | Presenter Lead |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **01** | **GitPet (Title & AWS Community Day)** | Welcome, Team Credentials & The DevOps for GenAI Challenge | 0:50 | 0:50 | **Lucas Whitaker** |
| **02** | **THE PROBLEM (3 Developer Crises)** | Context Blindness, Excessive AI Agency, & Buried Telemetry | 0:50 | 1:40 | **Lucas Whitaker** |
| **03** | **SOLUTION (Notice · Understand · Resolve)** | 3-Stage DevSecOps Loop & 18 Physical Symptoms Taxonomy | 1:00 | 2:40 | **Lucas Whitaker** |
| **04** | **AI ASSISTANCE (Talk to Byte)** | 4 Personas, Tiered Gemini Flash Models, Grounded Evidence | 1:05 | 3:45 | **Lucas Whitaker** |
| **05** | **SAFETY (Layer 1: Static Rules)** | Universal Danger Invariants, Zero Force-Push & Pure Argv Execution | 1:00 | 4:45 | **Lucas Whitaker** |
| **06** | **SAFETY (Layer 2: Contextual Lints)** | Working-Tree Aware Lints, Untracked Stash Fix (`-u`) & Rollback Anchors | 1:00 | 5:45 | **Lucas Whitaker** |
| **07** | **REPOSITORY (DAG & Working Tree)** | Multi-Lane SVG Graph, Diff Studio, Checkbox Staging & Stashes | 1:00 | 6:45 | **David Castelli** |
| **08** | **CI/CD (Failure to Remediation)** | 5-Stage Tracker, Logs, Flaky Test Quarantine & CVE Patching | 0:55 | 7:40 | **David Castelli** |
| **09** | **PULL REQUESTS (Review to Merge)** | PR #214, Turnaround Clock, Inline Threads & AI Reply Composer | 0:50 | 8:30 | **David Castelli** |
| **10** | **SCORING (Release Gate & Deployment)** | Automated 5-Pillar Scorecard, AI Executive Verdict & Compliance Exports | 0:55 | 9:25 | **Lucas Whitaker** |
| **11** | **SCORING (Dynamic Risk Analysis)** | 7-Factor HP Pool (0–100 HP) & Deep-Link Remediation | 0:50 | 10:15 | **Lucas Whitaker** |
| **12** | **ARCHITECTURE (System & Gateway)** | React 19, Express Gateway, Secret Redactor, Pure Argv Execution | 1:00 | 11:15 | **Lucas Whitaker** |
| **13** | **CLOSING (Ambient DevSecOps + Live Launch)** | 5 Core Pillars, 31 Vitest Tests, Live Launch on Port 3004 & Q&A | 0:45 | 12:00 | **Lucas & David (Shared)** |

---

## Slide 1: Title & The Mission — AWS Community Day Ottawa 2026

**Presenter:** **Lucas Whitaker**  
**Target time:** 50 seconds  
**Visual Focus on Slide 1:** Product branding, team credentials, [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) banner, and the Hackathon challenge thesis: *DevOps Reality ➔ GenAI Opportunity ➔ GitPet Innovation*.  

### Verbatim Spoken Presentation:
> “Good morning, judges, fellow engineers, and guests!
>
> We are Team 05, **Ribbon Patrol**: Lucas Whitaker and David Castelli.
>
> Today, we are proud to introduce **GitPet**—an ambient DevSecOps repository companion built specifically for **AWS Community Day Ottawa 2026** ([awscommunityday.ca](https://awscommunityday.ca/)) in the **DevOps for GenAI Hackathon**.
>
> AWS Community Day brings together cloud architects, DevOps practitioners, and AI researchers across Canada’s capital region. The hackathon challenged us with a fundamental industry question:
>
> *How can Generative AI transform DevOps, Continuous Integration, and Repository Governance from reactive, high-friction toil into intelligent, ambient, and bulletproof delivery workflows?*
>
> Our answer is built on one foundational promise:
>
> *See risk. Understand evidence. Resolve safely.*
>
> GitPet bridges the gap between cloud-native delivery and multi-modal generative AI by introducing an ambient companion named **Byte**—combining continuous peripheral awareness, Google Gemini reasoning, and deterministic safety guarantees.”

### Slide Delivery Cues:
- Greet the judges warmly and reference AWS Community Day Ottawa 2026.
- Direct attention to the challenge thesis on screen: *DevOps Reality ➔ GenAI Opportunity ➔ GitPet Innovation*.
- Emphasize Team 05’s core mission: building a production-grade, enterprise-ready DevSecOps companion.

### Verbal Transition to Slide 2:
> “To understand why modern software teams urgently need this companion, let’s examine the three developer crises on Slide 2.”

---

## Slide 2: The Problem — The 3 Developer Crises

**Presenter:** **Lucas Whitaker**  
**Target time:** 50 seconds  
**Visual Focus on Slide 2:** The three developer problem cards: *1. Context Blindness*, *2. Unchecked AI Agency*, and *3. Buried Telemetry*.  

### Verbatim Spoken Presentation:
> “Modern software delivery suffers from three critical friction points:
>
> 1. **First, Context Blindness and Cognitive Overload.** Developers spend up to 30 percent of their working day context-switching between terminal windows, CI/CD portals, pull request queues, and security dashboards. Critical repository conditions—like upstream branch drift, detached HEADs, uncommitted stash debt, or broken test suites—are discovered late, usually when a merge or staging release fails.
> 2. **Second, the 'Excessive Agency' Dilemma in AI Coding Assistants.** Autonomous coding agents with unrestricted shell access can generate syntactically valid commands that carry catastrophic blast radius—such as blind force-pushes, hard resets, or destructive file wipes. Prompt instructions alone are not security boundaries.
> 3. **Third, Buried Telemetry.** Non-linear branch divergence, merge conflicts, flaky test regressions, and supply-chain CVEs are technically logged, but remain buried inside thousands of lines of raw terminal output.
>
> GitPet solves this by translating live repository telemetry directly into Byte. Byte reflects repository health through continuous peripheral vision, explains supporting evidence, and guides developers through bounded, human-verified, and reversible actions.”

### Slide Delivery Cues:
- Point out the three colored problem cards.
- Pause momentarily after stating the three problems to let the dilemma resonate with the judges.
- Emphasize the core takeaway: *Prompt instructions are guidance; code-level safety boundaries are guarantees.*

### Verbal Transition to Slide 3:
> “Let’s look at how GitPet converts this fragmented telemetry into an intuitive, continuous developer workflow on Slide 3.”

---

## Slide 3: SOLUTION (Notice · Understand · Resolve)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 0 seconds  
**Visual Focus on Slide 3:** The 3-stage DevSecOps loop diagram, the 18 physical symptoms taxonomy, and the bottom principle: *“Human judgment remains the approval gate.”*  

### Verbatim Spoken Presentation:
> “GitPet organizes the entire developer experience into a continuous 3-stage loop: **Notice, Understand, and Resolve.**
>
> **Stage 1 is NOTICE (Ambient Awareness):**  
> Instead of forcing developers to constantly poll status commands in a terminal, Byte translates repository and infrastructure telemetry into peripheral awareness. Byte’s physical posture, glowing aura, accessories, and Web Audio chiptune cues reflect delivery conditions in real time. Our state engine models **18 distinct physical symptoms**—ranging from clean synchronization and upstream drift, to merge conflicts, broken CI builds, flaky test suites, supply-chain CVEs, stale pull requests, and cloud infrastructure alerts. When the repository is healthy, Byte is relaxed with a vibrant green halo; when branch drift occurs, Byte pulls forward on a leash with an amber warning glow; and when severe merge conflicts or build failures happen, Byte enters blocked or hazardous states.
>
> **Stage 2 is UNDERSTAND (Grounded Reasoning):**  
> When an issue arises, our reasoning layer powered by Google Gemini (Gemini 3.6 and 3.7 Flash) explains the situation in plain, developer-friendly language. Crucially, explanations are strictly grounded in verified repository facts: the active branch, ahead and behind commit counts, modified file paths, conflict markers, failed test names, and vulnerability CVE identifiers.
>
> **Stage 3 is RESOLVE (Bounded Execution):**  
> GitPet proposes bounded, safe Git operations. Zero blind execution occurs. The developer is always presented with the exact tokenized arguments, affected file scope, estimated blast radius, and a pre-computed reversal command before approving the action.
>
> As shown at the bottom of the slide, our foundational architectural rule is simple: *Human judgment remains the mandatory approval gate.*”

### Slide Delivery Cues:
- Highlight the 4-tier health aura model: **Healthy** (80–100 HP, Green), **Attention** (45–79 HP, Amber), **Blocked** (1–44 HP, Red), and **Critical Hazard** (0 HP, Grayscale).
- Emphasize that Byte is not decorative art—it is an authoritative ambient telemetry visualizer.

### Verbal Transition to Slide 4:
> “Now let’s examine how Byte adapts its reasoning to different developer roles and task complexities on Slide 4.”

---

## Slide 4: AI ASSISTANCE (Talk to Byte)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 5 seconds  
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
> To ensure low latency and high accuracy, GitPet routes queries across **three model speed tiers** using the official Google GenAI SDK (`@google/genai` v2.4.0):
> - **Fast Tier (`gemini-3.1-flash-lite`):** For sub-second status checks and commit message drafting.
> - **General Tier (`gemini-3.6-flash`):** For standard conversational chat and tutoring.
> - **Deep Tier (`gemini-3.7-flash`):** For complex merge conflicts, DAG analysis, and release sign-offs.
>
> As shown on the slide, every response follows a strict, structured anatomy: an **Evidence Signals Box** citing verified repository telemetry, a quantitative **Confidence Rating**, a **4-Tier Risk Badge**, and a **Recommended Safe Action Card** paired with an atomic undo command.
>
> Furthermore, if an external API key is missing or quota is exhausted, GitPet includes a deterministic offline rule engine that ensures 100% operational fallback.”

### Slide Delivery Cues:
- Point out the Evidence Signals Box and explain how it prevents model hallucinations by anchoring generation in verified repository data.

### Verbal Transition to Slide 5:
> “Reasoning quality is essential, but reasoning alone is not a security boundary. On Slide 5, let’s look at how GitPet enforces safety at the code level.”

---

## Slide 5: SAFETY (Layer 1: Static Rules)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 0 seconds  
**Visual Focus on Slide 5:** The blocked threat codes table, safe alternatives mapping, and pure argv child process execution guarantees.  

### Verbatim Spoken Presentation:
> “In any AI-enabled developer system, prompt engineering is guidance—it is not a security boundary. If an LLM hallucinates a dangerous command, receives prompt injection, or misinterprets repository state, relying on system instructions alone will fail.
>
> GitPet implements safety as deterministic application code through a **2-Layer Safety Policy Engine** in `safety.ts`.
>
> **Layer 1 enforces Universal Static Invariants** regardless of repository state:
> - **Zero Un-Leased Force-Pushes:** Commands like `git push --force` or `-f` are hard-rejected at the gateway router; GitPet automatically suggests the safe alternative: `git push --force-with-lease`.
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
**Target time:** 1 minute 0 seconds  
**Visual Focus on Slide 6:** The untracked-file stash scenario, the `stash-misses-untracked` auto-correction (`-u`), and rollback anchor state.  

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
> Instead of silently executing the dangerous command, the engine warns the developer and automatically upgrades the command to:
>
> `git stash push -u -m "wip"`
>
> The added `-u` ensures all untracked files are safely preserved in the snapshot.
>
> Layer 2 also detects diverged branch pulls, dirty-tree pulls without `--autostash`, unresolved conflict markers, empty stash pops, and paused rebases—where commands are strictly restricted to `--continue`, `--skip`, or `--abort`.
>
> Furthermore, all write operations are disabled by default and require explicit opt-in via `GITPET_ALLOW_WRITES=true`. When executed, GitPet records the `headBefore` and `headAfter` commit hashes, ensuring 1-click rollback guarantees.”

### Slide Delivery Cues:
- Point directly to the missing `-u` in the model suggestion versus the corrected command.
- Emphasize the core takeaway: *“Valid syntax, unsafe context.”*

### Presenter Handoff to Slide 7:
- **Lucas:** *“With our safety foundation established, David will now take us through our dedicated developer workspaces, starting with the Repository and Topological DAG Graph on Slide 7.”*

---

## Slide 7: REPOSITORY (DAG & Working Tree)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 0 seconds  
**Visual Focus on Slide 7:** The Multi-Lane SVG Topological DAG Graph layout, commit role badges, the Working Tree Diff Studio, and stash restoration.  

### Presenter Handoff:
- **David:** *“Thank you, Lucas.”*

### Verbatim Spoken Presentation:
> “Slide 7 showcases our dedicated **Repository Details & DAG Graph Workspace (`#repository`)**.
>
> On the left, our **Interactive Multi-Lane DAG Visualizer** translates complex Git histories into an intuitive SVG topological graph.
>
> Rather than drawing an unreadable linear git log, our normalizer sorts commits topologically, assigns them to parallel branch lanes—main trunk, feature branches, and forks—and connects them with smooth cubic bezier spline curves.
>
> GitPet models **11 distinct commit roles**: the checked-out `HEAD`, the `upstream_HEAD` pointer, local ahead commits, remote behind commits, the highlighted **Merge Base** double-ring node, fork points, conflict points, and hazards. Clicking any commit node opens an inspector drawer displaying author, timestamp, parent hashes, and full commit messages.
>
> On the right, our **Working Tree & Diff Studio** provides real-time file search filters, individual checkbox staging controls, Stage All / Unstage All controls, and unified syntax-highlighted diffs with line gutters and addition/deletion counters.
>
> Developers can stage files selectively, inspect preserved stash snapshots with 1-click restore, click **AI Conventional Commit** to have Gemini draft standardized semantic commits based on active diffs, and review an immutable session audit log with 1-click rollback.”

### Slide Delivery Cues:
- Point to the cubic bezier spline curves and the distinct Merge Base double-ring node on the DAG diagram.
- Highlight how the diff studio connects working tree changes directly to the commit generator and safety preview.

### Verbal Transition to Slide 8:
> “Repository state is only one part of delivery health. Let’s look at how GitPet connects source code to CI/CD pipeline telemetry on Slide 8.”

---

## Slide 8: CI/CD (Failure to Remediation)

**Presenter:** **David Castelli**  
**Target time:** 55 seconds  
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
> Clicking any pipeline stage expands live terminal execution logs directly inside the platform.
>
> In the scenario shown on screen, linting passed, but the test stage failed on `auth.spec.ts` due to a token refresh timeout.
>
> GitPet solves two major platform engineering headaches here:
> 1. **Flaky Test Suite Diagnostics:** Intermittent test failures degrade CI velocity. GitPet calculates test pass rates (e.g. 70%) and failure frequency across recent runs, providing a 1-click **Quarantine Test Spec** action to unblock main deployment pipelines while notifying QA.
> 2. **Supply Chain Security:** GitPet scans dependency lockfiles for high and critical CVEs (such as CVE-2026-8819 in `jsonwebtoken@8.5.1`) and provides a 1-click **Draft Dependabot Patch** button to generate an immediate upgrade PR.
>
> GitPet moves developers from a generic red build badge to the exact root cause and an actionable remediation path in seconds.”

### Slide Delivery Cues:
- Point out the progression from the failing test log to the flaky test diagnostic card and the supply chain CVE card.

### Verbal Transition to Slide 9:
> “Once the pipeline is understood, the next delivery bottleneck is often peer code review. Let’s look at Pull Request Intelligence on Slide 9.”

---

## Slide 9: PULL REQUESTS (Review to Merge)

**Presenter:** **David Castelli**  
**Target time:** 50 seconds  
**Visual Focus on Slide 9:** PR #214 review metadata, approval threshold meter, review turnaround clock, inline comment threads, and the AI Resolution Response composer.  

### Verbatim Spoken Presentation:
> “In the **Pull Request Intelligence Workspace (`#pr`)** on Slide 9, GitPet accelerates code review cycles and eliminates review bottlenecks.
>
> The workspace surfaces critical review telemetry:
> - **Approval Ratio:** Real-time ratio comparing peer approvals against branch protection rules (`1 of 2 required`).
> - **Review Turnaround Clock:** Measures queue wait times (`3 days waiting in review`) to highlight team review bottlenecks.
> - **Mergeability Diagnostic:** Verifies merge conflict status and CI check results.
>
> Below, review comments are anchored directly to file paths and line numbers. When a reviewer requests changes—such as wrapping a currency rate lookup in a timeout—developers can click **Draft AI Resolution Response**.
>
> Google Gemini reads the reviewer’s comment, analyzes the code diff, and composes a polite, technically complete developer response detailing the exact timeout adjustments and added unit tests.
>
> The developer reviews and edits the draft before posting—GitPet never speaks autonomously on behalf of the developer.
>
> Once all approvals and checks pass, the **Squash & Merge** action arms, providing clean branch merging with automatic feature branch pruning and changelog generation.”

### Slide Delivery Cues:
- Highlight the review turnaround clock (3 days waiting) and the 1-click AI resolution response composer.

### Presenter Handoff to Slide 10:
- **David:** *“Repository health, CI results, and pull request status all feed into our final production deployment decision: the GitPet Release Gate. Lucas will walk us through our scoring engines and production architecture on Slide 10.”*

---

## Slide 10: SCORING (Release Gate & Deployment)

**Presenter:** **Lucas Whitaker**  
**Target time:** 55 seconds  
**Visual Focus on Slide 10:** The 5-pillar deployment scorecard gauge (78% score, Caution/Review status), the active blocker inventory, and compliance artifact exports.  

### Presenter Handoff:
- **Lucas:** *“Thank you, David.”*

### Verbatim Spoken Presentation:
> “On Slide 10, we present the **Release Gate Workspace (`#release`)**, which turns delivery telemetry into an automated, defensible production sign-off.
>
> GitPet evaluates **five weighted pillars** defined in `releaseReadiness.ts`:
> 1. **Tests Passing (25% Weight):** Evaluates CI pass rate (Target: 100%).
> 2. **Code Coverage (20% Weight):** Evaluates line coverage against targets (Target: ≥80%).
> 3. **Vulnerabilities (25% Weight):** Enforces 0 High/Critical CVEs.
> 4. **PR Approvals (15% Weight):** Enforces peer approvals and resolved change requests.
> 5. **Branch Freshness (15% Weight):** Measures divergence from upstream main.
>
> In the scenario shown on screen, the calculated score is **78% (Caution / Review)**.
>
> Rather than just presenting a score, our backend calls `POST /api/ai/release-readiness`, where Google Gemini synthesizes an executive verdict identifying the exact blockers: one high-severity CVE in `jsonwebtoken@8.5.1` and one missing peer approval.
>
> Each blocker includes a **Remediate with Byte** button for instant resolution.
>
> For enterprise audit compliance, release managers can click **Copy Markdown Summary** for release notes or **Download JSON Compliance Artifact** to save a machine-readable sign-off manifest.”

### Slide Delivery Cues:
- Point out the 5 weighted pillar bars, the circular gauge (78%), and the active blocker cards.

### Verbal Transition to Slide 11:
> “While the release score governs production deployment gates, Byte’s day-to-day health pool uses a broader 7-factor risk model on Slide 11.”

---

## Slide 11: SCORING (Dynamic Risk Analysis)

**Presenter:** **Lucas Whitaker**  
**Target time:** 50 seconds  
**Visual Focus on Slide 11:** The 7-factor risk deduction breakdown table, the 0–100 HP health pool gauge (68 HP), and category filtering.  

### Verbatim Spoken Presentation:
> “On Slide 11, we examine the **Risk Scorecard & Health Pool Workspace (`#risk`)**, which demonstrates that Byte’s health is not an arbitrary mood—it is a deterministic calculation based on live telemetry.
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
> In this scenario, the repository has **68 HP**: -15 for branch divergence, -12 for open vulnerabilities, and -6 for uncommitted working-tree sprawl.
>
> Developers can filter factors by *All*, *Hazards*, *Warnings*, and *Healthy*. Clicking **Remediate with Byte** on any factor deep-links directly back to the companion workspace with a pre-populated diagnostic prompt.”

### Slide Delivery Cues:
- Emphasize the mathematical formula: $\text{Health Score} = \max(0, 100 - \sum \text{Deductions})$.
- Highlight how clicking *Remediate with Byte* turns diagnostic assessment directly into action.

### Verbal Transition to Slide 12:
> “Now let’s look under the hood at the system boundaries and production architecture that make these capabilities possible on Slide 12.”

---

## Slide 12: ARCHITECTURE (System & Gateway)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 0 seconds  
**Visual Focus on Slide 12:** The C4 container architecture diagram, trust boundaries, Express gateway on port 3004, secret redactor, and execution pipeline.  

### Verbatim Spoken Presentation:
> “On Slide 12, we detail GitPet’s production architecture, designed with strict separation of concerns across deliberate trust boundaries:
>
> 1. **On the left is the React 19 Frontend SPA:** Built with TypeScript 5.8, Vite 6, TailwindCSS 4, Motion, and the Web Audio API for rich ambient aesthetics. The browser never executes Git commands directly.
> 2. **All sensitive operations pass through our Node.js Express Gateway (port 3004):** The gateway handles REST and WebSocket communication, automatically redacts secret token patterns (`AIza...`, `ghp_...`, `sk-...`, `Bearer...`), maintains an in-memory FIFO audit ring buffer (max 200 events), hosts our 30-minute ephemeral Pet Image Studio asset registry, and provides constant-time HTTP Basic Auth.
> 3. **Before any action reaches execution, it passes through `safety.ts` and `executor.ts`:** This layer applies the 8 static rules and 7 contextual lints, enforces mandatory human preview, checks write opt-in (`GITPET_ALLOW_WRITES=true`), and executes approved Git operations strictly through pure `argv` `child_process.execFile` calls.
> 4. **Dual Workspace Scanner:** Scans local on-disk Git repositories (`/api/git/live-status`) and syncs with our public GitHub live fixture (`/api/repo/live`).
> 5. **Google Gemini Cloud Services:** Ingests context via the official `@google/genai` v2.4.0 SDK across multi-tier fallback chains, Live Audio streaming over WebSockets on `/live`, and avatar generation.
>
> The key architectural principle is strict separation of concerns:
>
> *The model provides reasoning. The gateway provides mediation. The policy engine provides enforcement. The human provides authorization. The executor performs only the allowed operation.*”

### Slide Delivery Cues:
- Trace the flow from left to right on the C4 diagram: React client → Express gateway → Safety engine → Git CLI subprocess and Gemini Cloud.
- Emphasize the core judge takeaway: *The external AI service cannot directly execute a command in the local repository.*

### Presenter Handoff to Slide 13:
- **Lucas:** *“David and I will now bring our core pillars together for the closing on Slide 13.”*

---

## Slide 13: CLOSING (Ambient DevSecOps + Live Launch)

**Presenters:** **Lucas Whitaker & David Castelli (Shared Closing, Lucas Lead)**  
**Target time:** 45 seconds  
**Visual Focus on Slide 13:** The 5 core pillars summary, test verification badges (31 Vitest tests, 100% pass), local launch command (`npm run dev`), repository link, and Q&A invitation.  

### Verbatim Spoken Presentation:

> **David:**  
> “To summarize, GitPet delivers on five core pillars:
> 1. **Ambient Awareness:** 18 physical symptoms and a dynamic 0–100 HP health pool make repository conditions continuously visible without terminal hunting.
> 2. **Grounded Multimodal Assistance:** Tiered Gemini Flash reasoning (3.1 Lite, 3.6 Flash, 3.7 Flash), real-time Live Audio WebSocket streaming, and custom avatar styling.
> 3. **Integrated DevSecOps Intelligence:** Connects Git commit topology, working-tree diffs, CI/CD pipeline failures, PR peer reviews, release readiness, and repository risk.”
>
> **Lucas:**  
> “4. **Bounded Agency in Code:** Two layers of deterministic safety in code, mandatory diff preview, explicit write opt-in, and pre-computed reversals prevent unverified execution.
> 5. **Engineering Readiness:** 31 automated Vitest tests (100% passing), STRIDE threat modeling, OWASP LLM Top 10 mitigations, NIST AI RMF governance, an SRE runbook, and a CycloneDX SBOM.
>
> GitPet makes DevSecOps health ambient, explainable, and safely actionable.
>
> You can launch the platform locally right now with `npm run dev` on port 3004.
>
> On behalf of Team 05, **Ribbon Patrol**, thank you for your time at AWS Community Day Ottawa 2026. We welcome your questions!”

---

## 🎯 Complete Rehearsal Q&A Playbook for Judges

### Q1: How does GitPet prevent prompt injection or jailbreak attacks from executing destructive shell commands?
* **Answer (Lucas):** *“GitPet never treats LLM output as executable code. All suggested commands pass through our 2-layer safety policy in `safety.ts`. Layer 1 statically blocks dangerous patterns like `git push --force`, `git reset --hard`, `git clean -fdx`, and shell metacharacters. Layer 2 verifies working tree state. Commands are tokenized into argv arrays and executed via `child_process.execFile`—never a shell. Even if an LLM is completely compromised, it cannot execute destructive commands.”*

### Q2: What happens if the Gemini API key is missing or quota is exhausted (HTTP 429)?
* **Answer (Lucas):** *“GitPet is built with 100% offline resilience. If `GEMINI_API_KEY` is missing or returns 429 quota exhaustion, our deterministic rule engine (`generateRuleBasedAction`) immediately activates. It evaluates the exact same repository state, computes 7-factor risk scores, and generates verified, safe Git actions with evidence citations and reversal commands.”*

### Q3: How does the DAG visualizer scale with large commit histories?
* **Answer (David):** *“The DAG normalizer (`gitDagNormalizer.ts`) uses topological sorting and lane assignment algorithms that bound the render window to active branch lineages (default: 12–25 recent commits). It detects merge bases, collapses linear commit runs when needed, and renders smooth cubic bezier splines with zero layout thrashing.”*

### Q4: How is human-in-the-loop safety guaranteed for write operations?
* **Answer (Lucas):** *“All write execution is disabled by default and requires `GITPET_ALLOW_WRITES=true`. When a developer clicks 'Confirm & Execute', the action opens a preview diff modal showing affected files, blast radius, and reversal commands. The command is re-evaluated against the safety engine at execution time, preventing any client-side tampering.”*

---

## 🛠️ Operational Emergency Fallback Script

*Use this script if the live network connection or local server experiences unexpected downtime during the live demo:*

> *“While we restore the local development server, the important workflow remains identical across all views:
>
> GitPet continuously ingests repository and delivery telemetry, maps that telemetry into Byte’s visual state, grounds AI explanations in observed evidence, evaluates every proposed command through static and contextual safety policies, and requires explicit human approval before executing any permitted write operation.
>
> If external AI services are unreachable, our deterministic fallback engine calculates risk deductions and generates safe remediation commands with zero API dependencies.”*