# 🎙️ GitPet Complete Presentation Playbook: 2-Presenter Verbatim Scripts & Live Demo Guide

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (12 Slides)  
**Target Duration:** 10 to 12 Minutes (Target: ~11 minutes 35 seconds)  
**Presenters:** **Lucas Whitaker** (Safety, Architecture, Backend, DevSecOps Engine) & **David Castelli** (Frontend, UI/UX, DAG Visualizer, CI/CD, PRs, Scoring)  
**Live Application Target:** `http://localhost:3004` (`npm run dev`)  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## ⏱️ Executive Presentation Schedule & 2-Presenter Split

| Slide # | Slide Title in Deck 11 | Primary Subject & Core Message | Target Time | Cumulative | Presenter Lead |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **01** | **GitPet (Title & Hook)** | The 3 Developer Crises (Context, Agency, Telemetry) | 0:55 | 0:55 | **Lucas Whitaker** |
| **02** | **SOLUTION (Notice · Understand · Resolve)** | 3-Stage DevSecOps Loop & Byte Companion Engine | 1:05 | 2:00 | **Lucas Whitaker** |
| **03** | **AI ASSISTANCE (Talk to Byte)** | 4 Personas, Tiered Gemini Flash Models, Evidence | 1:10 | 3:10 | **David Castelli** |
| **04** | **SAFETY (Layer 1: Static Rules)** | Universal Danger Invariants & Zero Force-Push | 1:05 | 4:15 | **Lucas Whitaker** |
| **05** | **SAFETY (Layer 2: Contextual Lints)** | Working-Tree Aware Lints & Untracked Stash Fix | 1:05 | 5:20 | **Lucas Whitaker** |
| **06** | **REPOSITORY (DAG & Working Tree)** | Multi-Lane SVG Graph, Diffs, Stashes & Rollback | 1:00 | 6:20 | **David Castelli** |
| **07** | **CI/CD (Failure to Remediation)** | 5-Stage Tracker, Flaky Test Quarantine, CVE Patch | 0:55 | 7:15 | **David Castelli** |
| **08** | **PULL REQUESTS (Review to Merge)** | PR #214, Turnaround Clock, AI Review Composer | 0:50 | 8:05 | **David Castelli** |
| **09** | **SCORING (Release Gate & Deployment)** | 5-Pillar Scorecard, AI Executive Verdict, Exports | 0:55 | 9:00 | **David Castelli** |
| **10** | **SCORING (Dynamic Risk Analysis)** | 7-Factor HP Pool (0–100 HP) & Deep-Link Remediate | 0:50 | 9:50 | **David Castelli** |
| **11** | **ARCHITECTURE (System & Gateway)** | React 19, Express Gateway, Token Redactor, Gemini | 1:00 | 10:50 | **Lucas Whitaker** |
| **12** | **CLOSING (Ambient DevSecOps + Live Launch)** | 5 Core Pillars, 31 Tests, Live Demo & Q&A | 0:45 | 11:35 | **David & Lucas (Shared)** |

---

## Slide 1: GitPet (Title & Problem Hook)

**Presenter:** **Lucas Whitaker**  
**Target time:** 55 seconds  
**Visual focus:** Product name, three developer problem pillars, and Byte companion  
**Starting screen:** Ambient Companion workspace (`http://localhost:3004#companion`) with Byte visible  

### Verbatim Spoken Script:
> “Good morning, judges, fellow engineers, and guests!
>
> We are Team 05, **Ribbon Patrol**: Lucas Whitaker and David Castelli.
>
> Today, we are proud to introduce **GitPet**—an ambient DevSecOps repository companion built around one foundational promise:
>
> *See risk. Understand evidence. Resolve safely.*
>
> Modern software development has three major points of friction:
>
> 1. **First, Context Blindness and Cognitive Overload.** Important repository information is fragmented across terminal windows, CI/CD systems, pull request queues, and security dashboards. Developers discover upstream branch drift, detached HEADs, uncommitted stash debt, or broken build runs late—usually when a merge or staging release fails.
> 2. **Second, Unchecked AI Agency.** An autonomous coding assistant with direct shell access can generate syntactically valid commands with catastrophic blast radius—like un-leased force-pushes, hard resets, or destructive file wipes. Prompt instructions alone are not security boundaries.
> 3. **Third, Buried Telemetry.** Non-linear branch divergence, merge conflicts, flaky tests, dependency CVEs, and review delays are technically logged, but remain hidden inside thousands of lines of terminal output.
>
> GitPet solves this by bringing live repository telemetry directly into an ambient virtual companion named **Byte**. Byte reflects repository health, explains supporting evidence, and guides developers through bounded, human-verified, and reversible actions.”

### Visual and Delivery Cues:
- On *“three major points of friction,”* gesture toward the three problem cards on screen.
- Pause briefly after each problem point to let it sink in with the judges.
- On *“through Byte,”* gesture toward the mascot stage.
- Do not explain individual symptoms yet; keep this slide focused on the problem and product thesis.

### Verbal Transition to Slide 2:
> “So how does GitPet convert this fragmented telemetry into a simple, safe developer workflow?”

---

## Slide 2: SOLUTION (Notice · Understand · Resolve)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 5 seconds  
**Visual focus:** Three-stage workflow loop, 18 physical symptoms, and the human approval gate  

### Verbatim Spoken Script:
> “GitPet organizes the developer experience into a continuous 3-stage loop: **Notice, Understand, and Resolve.**
>
> **Stage 1 is NOTICE (Ambient Awareness):**  
> Byte converts repository telemetry into peripheral awareness. Byte’s physical posture, glowing aura, accessories, and Web Audio cues change dynamically according to repository and delivery conditions. GitPet supports **18 physical symptoms** representing states such as branch drift, unpushed work, merge conflicts, failed builds, flaky tests, security vulnerabilities, delayed reviews, and cloud infrastructure hazards.
>
> **Stage 2 is UNDERSTAND (Grounded Reasoning):**  
> When GitPet detects an issue, our reasoning layer powered by Google Gemini (Gemini 3.6 and 3.7 Flash) explains what happened in plain language. Crucially, the explanation is grounded in verified repository facts: the active branch, ahead and behind commit counts, modified file paths, conflict markers, failed test names, and vulnerability CVE identifiers.
>
> **Stage 3 is RESOLVE (Bounded Execution):**  
> GitPet proposes a bounded, safe action. Nothing is executed blindly. The developer sees the exact command arguments, affected files, estimated blast radius, and planned reversal before approving the action.
>
> The most important principle is right at the bottom:
>
> *Human judgment remains the mandatory approval gate.*
>
> GitPet accelerates understanding and remediation, but it never removes developer oversight.”

### Visual and Delivery Cues:
- Point to each stage card as it is introduced: *Notice*, *Understand*, *Resolve*.
- Highlight the 4-tier health aura: **Healthy** (80–100 HP, Green), **Attention** (45–79 HP, Amber), **Blocked** (1–44 HP, Red), and **Critical Hazard** (0 HP, Grayscale).
- Press `Spacebar` to pet Byte, demonstrating floating hearts and synthesized purring audio.

### Presenter Handoff to Slide 3:
- **Lucas:** *“David will now demonstrate how Byte adapts its guidance through our multi-persona conversational engine.”*

---

## Slide 3: AI ASSISTANCE (Talk to Byte)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 10 seconds  
**Visual focus:** Four personas, three model tiers (`@google/genai` v2.4.0), and evidence-first responses  

### Presenter Handoff:
- **David:** *“Thank you, Lucas.”*

### Verbatim Spoken Script:
> “Not every developer needs the same type of explanation.
>
> A new contributor may need a clear mental model of Git objects and branch history. A platform engineer diagnosing a complex rebase needs deeper topological analysis. A security-focused reviewer needs a strict assessment of data-loss risk.
>
> GitPet provides **four specialized AI personas**:
> 1. **Byte Mascot:** Friendly, concise guidance and developer humor for daily workflows.
> 2. **Senior Architect:** Focuses on commit topology, merge bases, rebase strategies, and long-term repository health.
> 3. **Safety Auditor:** Strictly focuses on work preservation, policy compliance, blast radius, and reversal readiness.
> 4. **Git Tutor:** Teaches Git internals—blobs, trees, commit objects, references, HEAD, and the staging index.
>
> Under the hood, GitPet routes queries across **three model speed tiers** using the official Google GenAI SDK (`@google/genai` v2.4.0):
> - **Fast Tier (`gemini-3.1-flash-lite`):** For sub-second status checks and commit message drafting.
> - **General Tier (`gemini-3.6-flash`):** For default conversational chat and tutoring.
> - **Deep Tier (`gemini-3.7-flash`):** For complex merge conflicts, DAG analysis, and release reasoning.
>
> Most importantly, our response structure is strictly **evidence-first**.
>
> Byte cites the repository signals used in the answer, provides a quantitative confidence rating, marks the 4-tier risk level, and presents a safe recommended action with a pre-computed reversal step.
>
> If Gemini is temporarily offline or quota-limited, our deterministic rule engine automatically takes over, providing guaranteed safe guidance without external dependencies.”

### Live Demo Actions & Cues:
- In `#companion`, switch the persona selector from *Byte Mascot* to *Senior Architect*.
- Click the prompt chip: *“Status report & diagnostics”*.
- Point out the structured response: Evidence signals box, confidence rating (95%), risk badge, recommended action block (`git pull --rebase origin feature/cart`), and pre-computed reversal command (`git rebase --abort`).

### Presenter Handoff to Slide 4:
- **David:** *“Reasoning quality is essential, but reasoning alone is not a security boundary. Lucas will explain how GitPet constrains AI agency in code.”*

---

## Slide 4: SAFETY (Layer 1: Static Rules)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 5 seconds  
**Visual focus:** Blocked commands, safe alternatives, and pure argv child process execution  

### Presenter Handoff:
- **Lucas:** *“Thank you, David.”*

### Verbatim Spoken Script:
> “In an AI-enabled developer tool, prompt engineering is guidance—it is not a security boundary.
>
> If a model hallucinates a destructive command, receives prompt injection, or misinterprets repository state, relying on system instructions alone will fail.
>
> GitPet implements safety as deterministic application code through a **2-Layer Safety Policy Engine**.
>
> **Layer 1 enforces Static Invariants** regardless of repository state:
> - **Zero Un-Leased Force-Pushes:** `git push --force` or `-f` is hard-rejected at the gateway; the engine automatically suggests `git push --force-with-lease`.
> - **Zero Destructive Resets:** `git reset --hard` is blocked; GitPet recommends preserving work first with `git reset --keep` or stashing.
> - **Zero Permanent Deletions:** Commands like `git clean -fdx`, forced unmerged branch deletion (`git branch -D`), and `git stash drop` are forbidden.
> - **Zero History Rewrites:** Operations like `filter-branch` and `--filter-repo` are blocked.
> - **Zero Shell Injection:** Metacharacters like `;`, `|`, `&`, `$()`, and backticks are rejected.
>
> Approved commands are tokenized into pure `argv` arrays and executed via `child_process.execFile`—never shell interpolation.
>
> The system also enforces a strict binary whitelist: only the `git` executable is permitted. Commands like `sudo`, `rm`, `curl`, or `sh` are dropped at the gateway router before reaching execution.
>
> The model can suggest an action. The safety engine decides whether that action is permitted.”

### Live Demo Actions & Cues:
- Click **“Preview Diff & Scope”** on the Safe Action card.
- Point out the dry-run safety report, blast radius file list, and reversal command.
- Highlight that Layer 1 is covered by 19 automated executor tests in Vitest.

### Transition to Slide 5:
> “Static rules catch universally dangerous commands. However, a syntactically valid Git command can still be dangerous when used in the wrong repository state.”

---

## Slide 5: SAFETY (Layer 2: Contextual Lints)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 5 seconds  
**Visual focus:** Untracked-file stash scenario, contextual correction (`-u`), and rollback anchors  

### Verbatim Spoken Script:
> “That brings us to **Layer 2: Contextual Safety Lints**.
>
> Layer 2 evaluates the proposed action against the live working tree, staging index, branch relationship, stash stack, and any Git operation currently in progress.
>
> The scenario on this slide demonstrates why contextual safety is vital.
>
> Suppose the working tree contains two untracked files, and an LLM suggests:
>
> `git stash push -m "wip"`
>
> This is perfectly valid Git syntax. However, standard Git silently leaves untracked files behind in the directory, meaning subsequent branch pulls or checkouts could overwrite or conflict with them.
>
> GitPet detects this condition with our `stash-misses-untracked` lint.
>
> Instead of silently running the command, the engine warns the developer and upgrades the command to:
>
> `git stash push -u -m "wip"`
>
> The added `-u` guarantees that untracked files are safely preserved.
>
> Other contextual checks detect diverged branch fast-forwards, dirty-tree pulls without `--autostash`, unresolved conflicts, empty stash pops, and paused rebases.
>
> Furthermore, all mutating commands are disabled by default and require an explicit write opt-in via `GITPET_ALLOW_WRITES=true`. When executed, GitPet records the `headBefore` and `headAfter` commit hashes, ensuring 1-click rollback guarantees.”

### Visual and Delivery Cues:
- Point specifically to `-u` in the corrected command.
- Emphasize the phrase: *“Valid syntax, unsafe context.”*

### Presenter Handoff to Slide 6:
- **Lucas:** *“With the safety foundation established, David will now take us through our dedicated workspaces, starting with the Repository and Topological DAG Graph.”*

---

## Slide 6: REPOSITORY (DAG & Working Tree)

**Presenter:** **David Castelli**  
**Target time:** 1 minute 0 seconds  
**Visual focus:** Multi-lane SVG topological DAG graph, Working Tree Diff Studio, and stash stack  

### Presenter Handoff:
- **David:** *“Thank you, Lucas.”*

### Verbatim Spoken Script:
> “Navigating to `#repository` opens our dedicated **Repository Details & DAG Graph** workspace.
>
> On the left, our **Interactive Multi-Lane DAG Visualizer** translates complex Git commit histories into an intuitive SVG topological graph.
>
> Commits are sorted topologically and assigned to parallel lanes representing main trunk, feature branches, and forks, connected with smooth cubic bezier spline curves.
>
> GitPet identifies **11 distinct commit roles**: `HEAD`, `upstream_HEAD`, `local_ahead`, `remote_behind`, `merge_base` with double-ring highlights, `fork_point`, `conflicted`, and `hazard`. Clicking any commit node opens an inspector drawer displaying author, timestamp, parent hashes, and full commit messages.
>
> On the right, our **Working Tree & Diff Studio** provides real-time file search filters, individual checkbox staging controls, Stage All / Unstage All buttons, and unified syntax-highlighted diffs.
>
> Developers can stage selected files, inspect preserved stash snapshots with 1-click restore, click **AI Conventional Commit** to draft semantic commit messages in seconds, and review an immutable audit log of previous GitPet actions.”

### Live Demo Actions & Cues:
- Navigate to `#repository` (`http://localhost:3004#repository`).
- Click a commit node in the DAG graph to display the commit inspector drawer.
- Switch to the *Working Tree & Diffs* tab. Toggle individual staging checkboxes.

### Transition to Slide 7:
> “Repository state is only one part of delivery health. Let's look at how GitPet connects source changes to CI/CD pipeline telemetry.”

---

## Slide 7: CI/CD (Failure to Remediation)

**Presenter:** **David Castelli**  
**Target time:** 55 seconds  
**Visual focus:** 5-stage pipeline progression, expandable terminal logs, flaky test quarantine, and CVE scan  

### Verbatim Spoken Script:
> “The **CI/CD Pipeline Telemetry** workspace (`#cicd`) bridges source code with automated build and deployment pipelines.
>
> Our **5-Stage Pipeline Progression Tracker** monitors:
> 1. *Lint & Static Analysis*
> 2. *Unit & Integration Tests*
> 3. *Security & CVE Scan*
> 4. *Container Artifact Build*
> 5. *Deployment / Staging Rollout*
>
> Clicking any stage expands live terminal execution logs directly within the UI.
>
> In this scenario, linting passed, but the test stage failed on `auth.spec.ts` due to a token refresh timeout.
>
> GitPet solves two major delivery bottlenecks here:
> 1. **Flaky Test Suite Diagnostics:** Identifies specs with intermittent failures, tracks pass rates (e.g. 70%), and provides a 1-click **Quarantine Test Spec** action to unblock main deployment pipelines while notifying QA.
> 2. **Supply Chain Security:** Surfaces high and critical CVEs in dependency lockfiles and offers 1-click **Draft Dependabot Patch** to generate an immediate upgrade PR.
>
> GitPet moves developers from a generic red build badge to the exact root cause and an actionable remediation path in seconds.”

### Live Demo Actions & Cues:
- Navigate to `#cicd`.
- Expand the *Unit & Integration Tests* stage to show the failing log snippet.
- Point out the *Flaky Test Diagnostics* card and click *“Quarantine Test Spec”*.
- Point out the *Supply Chain CVE* card.

### Transition to Slide 8:
> “Once the pipeline is understood, the next delivery bottleneck is often peer review.”

---

## Slide 8: PULL REQUESTS (Review to Merge)

**Presenter:** **David Castelli**  
**Target time:** 50 seconds  
**Visual focus:** PR #214 review status, review turnaround clock, inline comment threads, and AI reply composer  

### Verbatim Spoken Script:
> “In the **Pull Request Intelligence** workspace (`#pr`), GitPet tracks PR #214.
>
> We surface critical review telemetry:
> - **Approval Ratio:** Real-time ratio comparing peer approvals against branch protection rules (`1 of 2 required`).
> - **Review Turnaround Clock:** Measures queue duration (`3 days waiting in review`) to identify team bottlenecks.
> - **Mergeability Diagnostic:** Checks merge conflicts and CI check status.
>
> Below, we render **Inline Review Threads** linked directly to source files and line numbers. When a reviewer requests changes—such as wrapping a rate lookup in a timeout—developers can click **Draft AI Resolution Response**. Gemini reads reviewer feedback and code context to compose a polite, technically complete developer response.
>
> The developer reviews and edits the response before posting—GitPet never speaks on behalf of the developer autonomously.
>
> Once all approvals and checks pass, the **Squash & Merge** action arms, providing clean branch merging with automatic feature branch pruning and changelog generation.”

### Live Demo Actions & Cues:
- Navigate to `#pr`.
- Point to the review turnaround clock (3 days waiting).
- Show the inline comment thread on `src/services/currency.ts:42`.
- Click **Draft AI Resolution Response** to demonstrate Gemini generating the response draft.

### Transition to Slide 9:
> “Repository health, CI results, and pull request status all feed into the final production deployment decision: the GitPet Release Gate.”

---

## Slide 9: SCORING (Release Gate & Deployment)

**Presenter:** **David Castelli**  
**Target time:** 55 seconds  
**Visual focus:** 5-pillar scorecard, 78% score, active blocker inventory, and compliance artifact exports  

### Verbatim Spoken Script:
> “The **Release Gate** workspace (`#release`) turns delivery telemetry into an automated, defensible production sign-off.
>
> GitPet evaluates **five weighted pillars**:
> 1. **Tests Passing (25% Weight):** Evaluates CI pass rate (Target: 100%).
> 2. **Code Coverage (20% Weight):** Evaluates line coverage (Target: ≥80%).
> 3. **Vulnerabilities (25% Weight):** Enforces 0 High/Critical CVEs.
> 4. **PR Approvals (15% Weight):** Enforces peer approvals and resolved change requests.
> 5. **Branch Freshness (15% Weight):** Measures divergence from upstream main.
>
> In this scenario, the calculated score is **78% (Caution / Review)**.
>
> Rather than just giving a score, our backend calls `POST /api/ai/release-readiness`, where Google Gemini synthesizes an executive verdict identifying the exact blockers: one high-severity CVE in `jsonwebtoken@8.5.1` and one missing peer approval.
>
> Each blocker includes a **Remediate with Byte** button.
>
> For audit compliance, release managers can click **Copy Markdown Summary** for release notes or **Download JSON Compliance Artifact** to save a machine-readable sign-off manifest.”

### Live Demo Actions & Cues:
- Navigate to `#release`.
- Point out the 5-pillar scorecard gauge (78% score, Caution/Review status).
- Point out the active blockers list and the *Remediate with Byte* buttons.
- Click *“Download JSON Compliance Artifact”*.

### Transition to Slide 10:
> “The release score is designed for a deployment gate. Byte’s day-to-day health pool uses a broader 7-factor risk model.”

---

## Slide 10: SCORING (Dynamic Risk Analysis)

**Presenter:** **David Castelli**  
**Target time:** 50 seconds  
**Visual focus:** 68 HP health pool gauge, deduction breakdown, category filters, and deep links  

### Verbatim Spoken Script:
> “Byte’s health pool is not a subjective mood. It is a transparent calculation based on live telemetry.
>
> In the **Risk Scorecard & Health Pool** workspace (`#risk`), GitPet calculates a dynamic health pool score from 0 to 100 HP using 7 real-time telemetry deductions:
> 1. **Branch Divergence (0 to -35 pts):** Commits ahead/behind, detached HEAD, work-loss hazards.
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

### Live Demo Actions & Cues:
- Navigate to `#risk`.
- Apply the *Warnings* filter tab.
- Click *“Remediate with Byte”* on the *Branch Divergence* card to demonstrate instant deep-link routing back to the companion chat stream.

### Presenter Handoff to Slide 11:
- **David:** *“Lucas will now show the system boundaries and production architecture that make these capabilities possible.”*

---

## Slide 11: ARCHITECTURE (System & Gateway)

**Presenter:** **Lucas Whitaker**  
**Target time:** 1 minute 0 seconds  
**Visual focus:** Frontend SPA, Express gateway, safety engine, local Git CLI, and Google Gemini cloud services  

### Presenter Handoff:
- **Lucas:** *“Thank you, David.”*

### Verbatim Spoken Script:
> “GitPet is divided into deliberate trust boundaries:
>
> 1. **On the left is the React 19 Frontend SPA:** Built with TypeScript 5.8, Vite 6, TailwindCSS 4, Motion, and the Web Audio API. The browser does not execute Git commands directly.
> 2. **All sensitive operations pass through our Node.js Express Gateway (port 3004):** The gateway handles REST and WebSocket communication, automatically redacts secret token patterns (`AIza...`, `ghp_...`, `sk-...`, `Bearer...`), maintains an in-memory FIFO audit ring buffer (max 200 events), hosts our 30-minute ephemeral Pet Image Studio asset registry, and provides constant-time HTTP Basic Auth.
> 3. **Before any action reaches execution, it passes through `safety.ts` and `executor.ts`:** This layer applies the 8 static rules and 7 contextual lints, enforces mandatory human preview, checks write opt-in (`GITPET_ALLOW_WRITES=true`), and executes approved Git operations strictly through pure `argv` `child_process.execFile` calls.
> 4. **Dual Workspace Scanner:** Scans local on-disk Git repositories (`/api/git/live-status`) and syncs with our public GitHub live fixture (`/api/repo/live`).
> 5. **Google Gemini Services:** Ingests context via the official `@google/genai` v2.4.0 SDK across multi-tier fallback chains, Live Audio streaming over WebSockets on `/live`, and avatar generation.
>
> The key architecture principle is strict separation of concerns:
>
> *The model provides reasoning. The gateway provides mediation. The policy engine provides enforcement. The human provides authorization. The executor performs only the allowed operation.*”

### Visual and Delivery Cues:
- Trace the flow from left to right on the C4 diagram: React client → Express gateway → Safety engine → Git CLI subprocess and Gemini Cloud.
- Emphasize the core judge takeaway: *The external AI service cannot directly execute a command in the local repository.*

### Presenter Handoff to Slide 12:
- **Lucas:** *“David and I will now bring our core pillars together for the closing.”*

---

## Slide 12: CLOSING (Ambient DevSecOps + Live Launch)

**Presenters:** **David Castelli & Lucas Whitaker (Shared 2-Presenter Closing)**  
**Target time:** 45 seconds  
**Visual focus:** 5 core pillars, live launch command, repository link, and Q&A  

### Verbatim Spoken Script:

> **David:**  
> “To summarize, GitPet delivers on five core pillars:
> 1. **Ambient Awareness:** 18 physical symptoms and a dynamic 0–100 HP health pool make repository conditions continuously visible without terminal hunting.
> 2. **Grounded Multimodal Assistance:** Tiered Gemini Flash reasoning (3.1 Lite, 3.6 Flash, 3.7 Flash), real-time Live Audio WebSocket streaming, and custom avatar styling.
> 3. **Integrated DevSecOps Intelligence:** Connects Git commit topology, working-tree diffs, CI/CD pipeline failures, PR peer reviews, release readiness, and repository risk.”
>
> **Lucas:**  
> “4. **Bounded Agency in Code:** Two layers of deterministic safety, mandatory diff preview, explicit write opt-in, and pre-computed reversals prevent unverified execution.
> 5. **Engineering Readiness:** 31 automated Vitest tests (100% passing), STRIDE threat modeling, OWASP LLM Top 10 mitigations, NIST AI RMF governance, an SRE runbook, and a CycloneDX SBOM.
>
> GitPet makes DevSecOps health ambient, explainable, and safely actionable.
>
> You can launch the platform locally right now with `npm run dev` on port 3004.
>
> On behalf of Team 05, **Ribbon Patrol**, thank you for your time. We welcome your questions!”

---

## 🎯 Complete Rehearsal Q&A Playbook for Judges

### Q1: How does GitPet prevent prompt injection or jailbreak attacks from executing destructive shell commands?
* **Answer (Lucas):** *“GitPet never treats LLM output as executable code. All suggested commands pass through our 2-layer safety policy in `safety.ts`. Layer 1 statically blocks dangerous patterns like `git push --force`, `git reset --hard`, `git clean -fdx`, and shell metacharacters. Layer 2 verifies working tree state. Commands are tokenized into argv arrays and executed via `child_process.execFile`—never a shell. Even if an LLM is completely compromised, it cannot execute destructive commands.”*

### Q2: What happens if the Gemini API key is missing or quota is exhausted (HTTP 429)?
* **Answer (David):** *“GitPet is built with 100% offline resilience. If `GEMINI_API_KEY` is missing or returns 429 quota exhaustion, our deterministic rule engine (`generateRuleBasedAction`) immediately activates. It evaluates the exact same repository state, computes 7-factor risk scores, and generates verified, safe Git actions with evidence citations and reversal commands.”*

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