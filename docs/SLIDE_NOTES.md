# GitPet Professional Presentation Deck: Complete Speaker Notes & Demo Playbook

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (12 Slides)  
**Target Duration:** 10 to 12 minutes (Target: ~11 minutes 15 seconds)  
**Suggested Pacing:** Roughly 45 to 75 seconds per slide  
**Primary Presenters:** Aliasgar Husain, Lucas Whitaker, David Castelli, Faris Nour  
**Live Application Target:** `http://localhost:3004` (`npm run dev`)

---

## Executive Presentation Overview

| Slide # | Slide Title in Deck 11 | Primary Subject & Theme | Target Time | Cumulative Time | Presenter Lead |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **01** | **GitPet (Title & Hook)** | 3 Core Dilemmas (Context, Agency, Telemetry) | 0:55 | 0:55 | Aliasgar Husain |
| **02** | **SOLUTION (Notice · Understand · Resolve)** | 3-Stage DevSecOps Loop & Byte Companion | 1:05 | 2:00 | Aliasgar Husain |
| **03** | **AI ASSISTANCE (Talk to Byte)** | 4 Personas, 3 Model Tiers, Structured Evidence | 1:15 | 3:15 | Faris Nour |
| **04** | **SAFETY (Layer 1: Static Rules)** | Universal Danger Invariants & Tokenized Rejection | 1:10 | 4:25 | Lucas Whitaker |
| **05** | **SAFETY (Layer 2: Contextual Lints)** | Working-Tree Aware Preconditions & Reversals | 1:05 | 5:30 | Lucas Whitaker |
| **06** | **REPOSITORY (DAG & Working Tree)** | Multi-Lane SVG Topology, Diff Studio, Stash & Rollback | 1:00 | 6:30 | David Castelli |
| **07** | **CI/CD (Failure to Remediation)** | 5-Stage Tracker, Flaky Test Quarantine, CVE Patching | 0:55 | 7:25 | Faris Nour |
| **08** | **PULL REQUESTS (Review to Merge)** | PR #214, Turnaround Clock, AI Review Composer | 0:50 | 8:15 | Faris Nour |
| **09** | **SCORING (Release Gate & Deployment)** | 5 Weighted Pillars, Blocker Analysis, Audit Exports | 0:50 | 9:05 | David Castelli |
| **10** | **SCORING (Dynamic Risk Analysis)** | 7-Factor HP Formula, 4-Tier Auras, Deep-Link Remediate | 0:50 | 9:55 | David Castelli |
| **11** | **ARCHITECTURE (System & Gateway)** | React 19, Express Boundary, execFile, Gemini Cloud | 1:00 | 10:55 | Lucas Whitaker |
| **12** | **CLOSING (Ambient DevSecOps + Live Launch)** | 5 Core Pillars, Governance, Quickstart, Live Q&A | 0:45 | 11:40 | Team Ribbon Patrol |

---

## Slide 1: GitPet (Title & Problem Hook)

### Slide Header & Content in Deck 11
```
GitPet — Ambient DevSecOps Repository Companion
DEVOPS FOR GENAI 2026 | TEAM 05
"See risk. Understand evidence. Resolve safely."
Aliasgar Husain • Lucas Whitaker • David Castelli • Faris Nour
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “Hello judges, fellow engineers, and guests. We are Team 05, **Ribbon Patrol**: Aliasgar Husain, Lucas Whitaker, David Castelli, and Faris Nour. Today, we are thrilled to present **GitPet**—an ambient DevSecOps repository companion built on a foundational promise: *See risk. Understand evidence. Resolve safely.*
>
> Modern software development has three major points of friction:
>
> 1. **Fragmented Context & Cognitive Overload:** Repository health is scattered across terminal outputs, CI/CD portals, pull request threads, and security dashboards. Developers discover upstream branch drift, detached HEADs, uncommitted stash debt, or stale reviews only when a pull, rebase, or release fails.
> 2. **The 'Excessive Agency' Dilemma in AI Coding Assistants:** Unbounded AI agents with direct shell execution can generate syntactically valid but catastrophic operations—like force-pushes, hard resets, or destructive file wipes—without explaining blast radius or planning rollbacks. Prompt instructions alone are not security boundaries.
> 3. **Inaccessible Git & Pipeline Telemetry:** Non-linear DAG topologies, merge base divergence, flaky test regressions, and supply-chain CVEs are technically recorded, but they remain buried in thousands of lines of raw terminal logs.
>
> GitPet solves this by bringing live repository telemetry directly into an ambient virtual companion named **Byte**. Byte keeps developers aware of repository state, explains problems through grounded Gemini reasoning, and guides teams through bounded, reversible actions.”

### Live Demonstration Cues & Screen Actions
- **Screen State:** Start on the main **Ambient Companion** view (`http://localhost:3004#companion`) with Byte visible in the center stage.
- **Presenter Action:** Point out Byte's ambient avatar and idle floating animation. Do not trigger complex actions yet—focus entirely on framing the problem and setting the stage.
- **Keyboard Shortcut:** Keep hands relaxed near `⌘K` / `Ctrl+K` for the upcoming scenario shift.

### Key Technical Talking Points & Judge Anchors
- Frame GitPet not as a decorative chatbot, but as an **ambient DevSecOps visualization layer** and an **authoritative safety proxy**.
- Emphasize the core thesis: *AI should augment human judgment through grounded evidence, never replace it with unbounded autonomous execution.*

### Transition to Slide 2
> “So how does GitPet transform this fragmented telemetry into a seamless, safe developer workflow?”

### Anticipated Judge Q&A for Slide 1
- **Q: Why create an ambient pet rather than another IDE sidebar plugin?**  
  *A: Traditional dashboards require active polling and context switching. Byte uses peripheral awareness—subtle posture, glowing auras, and chiptune audio cues—to communicate repository health at a glance without interrupting flow.*

---

## Slide 2: SOLUTION (Notice · Understand · Resolve)

### Slide Header & Content in Deck 11
```
SOLUTION
Notice • Understand • Resolve
Byte turns repository telemetry into an actionable DevSecOps loop.

1. NOTICE: Byte's posture, mood aura, and chiptune audio cues reflect repository health at a glance.
   8 expressive symptoms map 1:1 to Git status, CI/CD pipeline states, PR bottlenecks, and cloud infrastructure alerts.
2. UNDERSTAND: Multimodal Gemini reasoning explains issues in plain language.
   Surfaces concrete evidence signals (branch divergence, dirty files, conflict markers, CVE IDs).
   Delivers explicit confidence ratings (%), 4-tier risk badges, and deterministic reversal steps.
3. RESOLVE: Bounded, reversible Git actions with mandatory human-in-the-loop preview.
   Zero blind execution: modal diff preview reveals blast radius, affected files, and exact argv parameters.
   One-click rollback restores working tree state safely using pre-computed undo commands.
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “GitPet organizes developer interaction into an intuitive 3-stage loop: **Notice, Understand, and Resolve.**
>
> **Stage 1 is NOTICE:**  
> Byte turns complex repository telemetry into ambient, real-time awareness. Byte's posture, glowing mood aura, and Web Audio chiptune cues change dynamically with repository health. In the slide, we highlight 8 core expressive symptoms—while our complete engine supports 18 symptoms across Git topology, pipeline failures, PR roadblocks, and cloud security alerts. When the repository is clean, Byte is cheerful with an emerald aura; when divergence occurs, Byte tethers on a leash with an amber glow; and during merge conflicts or build failures, Byte enters blocked or hazardous states.
>
> **Stage 2 is UNDERSTAND:**  
> When an issue arises, GitPet uses multimodal Google Gemini models to explain what happened in plain, developer-friendly language. Crucially, responses are grounded in verified repository facts: active branch name, ahead/behind commit counts, modified file paths, and CVE identifiers. Every response includes a quantitative confidence rating and a 4-tier risk badge.
>
> **Stage 3 is RESOLVE:**  
> GitPet suggests bounded, reversible Git operations. Before anything touches disk, a modal diff preview shows the exact tokenized arguments, blast radius, affected files, and a pre-computed reversal command. Zero blind execution occurs—the developer is always the mandatory approval gate.”

### Live Demonstration Cues & Screen Actions
- **Screen State:** Companion View (`#companion`).
- **Presenter Action:** Point to Byte’s health bar (e.g., 68 HP) and the glowing amber aura.
- **Audio Cue:** If sound is unmuted, trigger Byte’s subtle interaction or press `Spacebar` to showcase the Web Audio synthesizer purr and heart particle animation.
- **Callout:** Show the status chip below Byte displaying *Behind Upstream (6 behind)*.

### Key Technical Talking Points & Judge Anchors
- **4-Tier Dynamic Aura System:** Healthy (80–100 HP, Emerald), Attention (45–79 HP, Amber), Blocked (<45 HP, Orange), Critical Hazard (0 HP, Grayscale).
- **Grounded AI Principles:** The AI model is strictly conditioned on live repository state injected into the prompt context, eliminating hallucinations.

### Transition to Slide 3
> “Once Byte alerts the developer to a problem, how does the developer interact with the AI to investigate the root cause?”

### Anticipated Judge Q&A for Slide 2
- **Q: Does the application require internet access for Byte’s ambient postures to work?**  
  *A: No. All 18 symptom state evaluations, aura mappings, Web Audio synthesis, and local Git telemetry checks run 100% locally and deterministically inside the browser and gateway.*

---

## Slide 3: AI ASSISTANCE (Talk to Byte: Multi-Persona Guidance)

### Slide Header & Content in Deck 11
```
AI ASSISTANCE
Talk to Byte: multi-persona guidance
Four roles, three model tiers, and structured responses tied to repository evidence.

MODEL TIERS:
• Fast: instant status checks
• General: chat and repository analysis
• Deep: multi-branch conflicts and architecture

EVERY RESPONSE INCLUDES:
• Evidence signals and confidence
• Risk badge and expected impact
• Safe action, reversal, preview and approval
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “GitPet’s AI assistance is engineered for technical precision, offering four specialized personas and three reasoning tiers.
>
> Developers can tailor Byte’s perspective to the task at hand:
> - The **Byte Mascot** persona offers concise, friendly daily workflow tips and status summaries.
> - The **Senior Architect** analyzes complex branch topology, merge-base ancestry, and architectural trade-offs like rebase versus merge.
> - The **Safety Auditor** operates with zero trust, analyzing work-loss hazards, stash safety, and rollback verification.
> - The **Git Tutor** explains underlying Git mechanics—such as blobs, trees, commit objects, and index pointers.
>
> We support three Gemini model tiers: **Fast** for rapid status summaries, **General** for standard repository chat, and **Deep** for complex multi-branch conflict resolution.
>
> Look at the structure of every AI response:
> 1. **Evidence Signals Box:** Concrete repository facts extracted directly from Git state.
> 2. **Confidence Rating:** A quantitative assessment of factual certainty (e.g., 96% Confidence).
> 3. **Risk Classification Badge:** Categorized as SAFE (Green), CAUTION (Amber), PROTECTED (Blue), or HAZARD (Red).
> 4. **Safe Action Card:** Formatted command, expected outcome, and an automatic pre-computed reversal command (`git rebase --abort`).
> 5. **Preview Button:** Opens the human-in-the-loop preview modal.
>
> In our live demo, we select the *Behind Main* scenario. Byte flags the 6-commit divergence, provides a structured diagnostic, recommends `git pull --rebase origin main`, and arms `git rebase --abort` as the immediate safety net.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Press `⌘K` or click the top scenario dropdown to select **Behind Main** (or *Branch Drift*).
  2. Point out Byte’s changed posture (pulling on a leash, amber aura).
  3. Click the prompt chip: *“Status report & diagnostics”*.
  4. Walk judges through the returned structured card:
     - Evidence box: `branch: feature/auth-jwt`, `behind: 6`, `ahead: 1`.
     - Confidence score: `96% Confidence`.
     - Risk badge: `CAUTION`.
     - Safe Action card: `git pull --rebase origin main`.
     - Reversal command box: `git rebase --abort`.
  5. Click **Preview Diff & Scope** to open the safety confirmation modal, but *do not execute yet*.

### Key Technical Talking Points & Judge Anchors
- **Offline Deterministic Fallback:** If the Gemini API key is omitted or rate-limited, GitPet automatically falls back to an internal rule-based inference engine, ensuring 100% demo reliability without breaking.
- **Structured Schema Enforcement:** The backend enforces JSON schema validation on model outputs to guarantee evidence, confidence, and reversal fields are always populated.

### Transition to Slide 4
> “Grounded explanations are vital, but AI recommendations cannot be blindly trusted. The true security boundary begins in our safety engine.”

### Anticipated Judge Q&A for Slide 3
- **Q: How do you prevent the AI model from hallucinating Git commands?**  
  *A: The system prompt injects strict repository telemetry, requires structured JSON outputs with evidence citations, and passes every proposed command to our deterministic Layer 1 and Layer 2 safety engine before execution.*

---

## Slide 4: SAFETY (Layer 1: Static Rules — The Code-Level Guarantee)

### Slide Header & Content in Deck 11
```
SAFETY
Bounded agency: the code-level guarantee
The model can suggest. The safety engine decides what is allowed.
LAYER 1 — STATIC RULES

Table of 9 Threat Codes:
• force-push: git push --force, -f -> Hard-rejected by regex tokenizer -> git push --force-with-lease
• hard-reset: git reset --hard -> Destructive working tree wipe blocked -> git reset --keep / git stash
• clean-wipe: git clean -fdx -> Permanent file deletion blocked -> Stash or manual file review
• force-branch-delete: git branch -D -> Unmerged branch deletion blocked -> git branch -d (safe check)
• stash-destroy: git stash drop, clear -> History destruction blocked -> Explicit stash pop/apply only
• remote-ref-delete: git push origin --delete -> Remote branch deletion blocked -> Handled via PR web interface
• history-rewrite: filter-branch, filter-repo -> Repository history mutation blocked -> Protected Git operations
• shell-injection: ;, |, &, >, <, $(), ` -> Metacharacters stripped/rejected -> Argv array tokenization
• non-git-binary: sudo, rm, curl, sh -> Binary whitelist (git only) -> Rejected at gateway router
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “This slide presents the core technical philosophy of GitPet: *The model can suggest. The safety engine decides what is allowed.*
>
> We reject the idea that system prompts are a sufficient security guarantee. Prompt instructions fail against hallucinations, jailbreaks, context dilution, and indirect prompt injection. In GitPet, safety is enforced in compiled TypeScript and Node.js code.
>
> **Layer 1 enforces 9 deterministic Static Rules:**
> 1. **Force-Push Prevention:** Unconditional `git push --force` and `-f` flags are hard-rejected by our regex tokenizer to protect remote history.
> 2. **Hard-Reset Block:** `git reset --hard` is blocked to prevent wiping uncommitted working tree modifications.
> 3. **Clean-Wipe Protection:** `git clean -fdx` is blocked to prevent permanent file loss.
> 4. **Force-Branch-Delete Guard:** `git branch -D` is blocked; only safe `-d` deletion of fully merged branches is permitted.
> 5. **Stash Destruction Shield:** `git stash drop` and `clear` are blocked.
> 6. **Remote Ref Deletion Block:** `git push origin --delete` is blocked.
> 7. **History Rewrite Shield:** `filter-branch` and `filter-repo` are blocked.
> 8. **Shell Injection Defense:** Semicolons, pipes, ampersands, backticks, and subshells are stripped and rejected at the gateway.
> 9. **Binary Whitelist:** Only the `git` binary is permitted. Any invocation of `sudo`, `rm`, `curl`, or shell wrappers is rejected immediately.
>
> This layer is completely provider-agnostic. Whether a command originates from Gemini, a custom prompt, or direct input, it hits the same immutable code boundary.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  - Keep the **Preview Changes Modal** open on screen.
  - Highlight the exact parsed arguments (`git`, `pull`, `--rebase`, `origin`, `main`).
  - Point to the **Risk Assessment:** `CAUTION (Branch synchronization)`.
  - Point to **Estimated Blast Radius:** `6 commits to replay, 0 working tree conflicts`.
  - Show that execution is disarmed until the human developer explicitly clicks **Approve & Execute**.

### Key Technical Talking Points & Judge Anchors
- Quote for Judges: *“AI guidance is advisory. The deterministic safety engine is authoritative.”*
- Reference the **31 automated Vitest test suite**, highlighting that 9 dedicated unit tests in `tests/security.test.ts` continuously validate that all 9 threat codes are blocked with 100% pass rates.

### Transition to Slide 5
> “Static rules stop universally dangerous commands. But what happens when a command is syntactically safe, but dangerous in the current repository state? That is what Layer 2 solves.”

### Anticipated Judge Q&A for Slide 4
- **Q: What if a developer genuinely needs to force-push their own feature branch?**  
  *A: GitPet enforces safer alternatives like `--force-with-lease`, ensuring you never overwrite remote commits you haven’t seen, while delegating true destructive operations to explicit terminal workflows.*

---

## Slide 5: SAFETY (Layer 2: Contextual Lints & Reversible Execution)

### Slide Header & Content in Deck 11
```
SAFETY
Bounded agency: the code-level guarantee
The model can suggest. The safety engine decides what is allowed.
LAYER 2 — CONTEXTUAL LINTS

Table of 6 Contextual Lints:
• stash-misses-untracked: Working tree contains untracked files -> Untracked files left behind on stash -> Suggests git stash push -u
• push-while-behind: Branch is behind remote (behind >= 1) -> Remote rejects non-fast-forward push -> Suggests git pull --rebase first
• diverged-pull-needs-rebase: Local and remote branches diverged -> Unintended merge commit pollution -> Suggests git pull --rebase origin main
• operation-in-progress: Active rebase/merge lock files present -> Corrupted intermediate Git state -> Limits commands to --continue, --skip, --abort
• stash-pop-empty: Stash stack length == 0 -> Confusing "No stash entries found" error -> Blocks empty stash pop
• dirty-tree-checkout: Uncommitted edits on branch switch -> Accidental overwrite of active work -> Prompts to stash or commit first
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “Layer 2 evaluates proposed Git commands against the live working tree, staging index, and repository locks.
>
> A Git command might look completely harmless in isolation, but cause chaos depending on repository state:
> - If you run `git stash` with untracked files present, standard Git leaves them behind. GitPet detects untracked files and upgrades the command to `git stash push -u`.
> - If you try to push while behind upstream, GitPet blocks the inevitable non-fast-forward rejection and recommends synchronizing first.
> - If branches have diverged, GitPet warns against accidental merge commit pollution and recommends an explicit rebase.
> - If a rebase or merge is already in progress, GitPet locks down execution to only valid control flags: `--continue`, `--skip`, or `--abort`.
> - If the stash stack is empty, it blocks confusing `git stash pop` errors.
> - If uncommitted edits exist during a branch switch, it halts execution before dirty files can be overwritten or polluted across branches.
>
> Once both layers validate the operation, GitPet executes the command safely using Node.js `execFile` with tokenized argument arrays—never string shell execution.
>
> Furthermore, every executed action is logged to an immutable FIFO audit ring buffer, and assigned a deterministic rollback command—such as `git stash pop`, `git rebase --abort`, or `git reset --soft HEAD~1`—giving developers complete confidence.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  - In the modal, demonstrate the dry-run simulation toggle.
  - Click **Approve & Execute**.
  - Show the real-time execution animation and success toast: *“Synchronized feature/auth-jwt with origin/main via rebase.”*
  - Point to Byte’s health restoring from 68 HP (Amber) to 100 HP (Emerald, Healthy posture).
  - Open the **Audit History Drawer** to show the immutable log entry with timestamp, command, and the armed **Rollback** button.

### Key Technical Talking Points & Judge Anchors
- **Safe Subprocess Spawning:** Using `child_process.execFile('git', args)` completely eliminates command injection vectors like `git checkout $(calc.exe)`.
- **Working Tree Precondition Guards:** The rollback runner checks `git status --porcelain` before executing any reversal, preventing accidental clobbering of newly authored code.

### Transition to Slide 6
> “Now that we’ve established our two-layer safety engine, let’s explore the visual repository workspace where developers inspect topology, diffs, and stashes.”

### Anticipated Judge Q&A for Slide 5
- **Q: How does the system handle merge conflicts during an approved rebase?**  
  *A: GitPet detects the `.git/rebase-merge` lock file, shifts Byte into the tangled yarn 'Conflicted' posture, and provides one-click `--abort` or guided conflict resolution.*

---

## Slide 6: REPOSITORY (Multi-Lane DAG, Diff Studio & History)

### Slide Header & Content in Deck 11
```
REPOSITORY
See Git topology, diffs, stashes, and history
The repository workspace makes branch state and file changes understandable.
MULTI-LANE DAG | WORKING TREE
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “The Repository page turns complex Git history and working-tree changes into an interactive inspection studio.
>
> On the left side, you see our custom **Multi-Lane SVG DAG (Directed Acyclic Graph)**. Instead of dense terminal ASCII trees, GitPet assigns commits to discrete topological lanes—such as upstream trunk, local feature branches, and forks—connecting parent-child relationships with smooth cubic bezier curves.
>
> The DAG identifies 11 distinct commit roles:
> - Active `HEAD` with an emerald pulsing ring.
> - Upstream `origin/main` pointers.
> - Local ahead and remote behind nodes.
> - Highlighted `merge_base` ancestry nodes, fork points, and conflicted states.
>
> Clicking any commit node opens the interactive Commit Inspector, displaying SHA-1, author, timestamp, parent hashes, commit messages, and branch pointers.
>
> On the right side, the **Working Tree Diff Viewer** provides complete control over dirty files:
> - Real-time search filtering across modified files.
> - Color-coded status badges for modified, staged, untracked, and conflicted changes.
> - Line-by-line syntax-highlighted diffs with addition/deletion counters.
> - Selective single-file checkboxes and bulk Stage All / Unstage All controls.
> - An integrated **AI Commit Generator** that drafts standardized Conventional Commits (`feat:`, `fix:`, `refactor:`) directly from staged diffs.
>
> Below the diffs, developers can inspect their **Stash Stack** with one-click safe restoration, and review the session **Audit Trail** for rollback safety.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Navigate to the **Repository** page (`#repository` or press `⌘B` / `Ctrl+B`).
  2. Point out the multi-lane SVG DAG layout.
  3. Click a commit node (e.g., `feat(auth): add refresh token handler`) to open the commit inspector popover.
  4. Point to the merge-base indicator showing divergence from `main`.
  5. In the right panel, filter files by typing `auth`.
  6. Click a staged file to reveal the syntax-highlighted unified diff.
  7. Click **Generate Commit Message** to show the AI-drafted Conventional Commit modal.
  8. Point to the Stash Stack card showing `stash@{0}: WIP on auth middleware`.

### Key Technical Talking Points & Judge Anchors
- **Custom Topological Layout Engine:** The DAG layout algorithm calculates branch lane allocation and merge-base ancestry entirely on the client side using pure SVG and React 19.
- **Developer Ergonomics:** Bridges visual Git GUIs with strict safety policies—developers never have to guess what files are staged.

### Transition to Slide 7
> “Repository state is only one part of the delivery cycle. Let’s look at how GitPet connects local Git health with CI/CD pipeline intelligence.”

### Anticipated Judge Q&A for Slide 6
- **Q: Can this handle large enterprise repositories with thousands of commits?**  
  *A: Yes. The DAG engine supports windowed virtual scrolling, commit node collapsing (`collapsed_run`), and loads recent active branch history dynamically.*

---

## Slide 7: CI/CD (From Pipeline Failure to Remediation)

### Slide Header & Content in Deck 11
```
CI/CD
From pipeline failure to remediation
Track stages, inspect logs, quarantine flaky tests, and address vulnerable dependencies.

EXPANDABLE LOGS:
FAIL auth.spec.ts | token refresh timeout | 1 test failed in 48s

FLAKY TESTS:
• Pass rate and recent failures
• Last failing commit
• Quarantine & Analyze

SUPPLY CHAIN:
• CVE severity and version
• Exact safe target version
• Draft Dependabot patch
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “The CI/CD workspace connects pipeline execution directly to automated failure diagnosis and supply-chain remediation.
>
> At the top, GitPet tracks the delivery pipeline across 5 standard stages: `Lint & Format`, `Unit Tests`, `CVE Scan`, `Build`, and `Staging Verification`. Each stage displays live status badges, execution durations, and expandable line-by-line terminal logs.
>
> When a stage fails—as seen in our authentication test timeout—GitPet doesn't just display a red icon. It surfaces two high-value DevSecOps workflows:
>
> **1. Flaky Test Suite Diagnostics & Quarantine:**  
> GitPet computes historical test reliability across recent runs. In this scenario, `auth.spec.ts` shows a 70% pass rate with 3 intermittent timeout failures. Rather than letting a known flaky test block an urgent production hotfix, developers can trigger **1-Click Quarantine & Analyze**. This isolates the flaky test in CI telemetry, opens an investigation ticket, and prevents unnecessary pipeline blockages.
>
> **2. Supply Chain Security & CVE Remediation:**  
> The supply-chain panel pinpoints vulnerable dependencies detected during security scans—for instance, CVE-2026-8819 in `jsonwebtoken@9.0.0`. GitPet highlights the CVSS severity, identifies the exact safe target version (`9.0.2`), and arms **1-Click Draft Dependabot Patch** to generate an automated remediation PR branch with verified package manifests.
>
> This bridges four fragmented steps: failure detection, root cause log analysis, test quarantine, and dependency patching.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Navigate to the **CI/CD** page (`#cicd`).
  2. Switch scenario to **Build Failure** (or *Flaky Test Regression*).
  3. Expand the failed `02. Unit Tests` stage to show terminal output: `FAIL tests/auth.spec.ts: token refresh timeout after 48s`.
  4. Point to the **Flaky Test Diagnostics Card** showing 70% reliability.
  5. Hover over the **Quarantine & Analyze** button.
  6. Point to the **Supply Chain Security Card** highlighting CVE-2026-8819 and the **Draft Dependabot Patch** CTA.

### Key Technical Talking Points & Judge Anchors
- **Closed-Loop DevSecOps:** Moves beyond passive monitoring by providing concrete remediation pathways directly from CI/CD telemetry.
- **Security Posture:** Complies with OpenSSF and NIST supply chain guidelines by recommending non-breaking semver updates.

### Transition to Slide 8
> “Once pipeline checks pass, the next common delivery bottleneck is human code review.”

### Anticipated Judge Q&A for Slide 7
- **Q: Does quarantining a flaky test create tech debt by hiding broken tests?**  
  *A: No. Quarantined tests remain highlighted with an alert banner on the CI/CD and Release Gate pages, actively deducting points until permanently resolved.*

---

## Slide 8: PULL REQUESTS (From Blocked Review to Merge Readiness)

### Slide Header & Content in Deck 11
```
PULL REQUESTS
From blocked review to merge readiness
Unify approvals, turnaround, inline threads, and AI-assisted resolution.
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “The Pull Request Intelligence workspace unifies review metrics, approval thresholds, line-anchored comments, and AI-assisted resolutions into a single developer view.
>
> In our demonstration, we are inspecting **PR #214: Add JWT Authentication Middleware**.
>
> At the top of the drawer:
> - The **Approval Threshold Meter** shows `1 of 2 required peer approvals`, making readiness instantly obvious.
> - The **Review Turnaround Clock** tracks wait time (`3 days in review`), spotlighting organizational delivery bottlenecks.
> - The **Mergeability Diagnostic** checks branch conflict status, CI test status, and pending change requests.
>
> Below the metrics, GitPet renders inline review comments anchored directly to the exact file and line number (`src/auth/authService.ts:42`).
>
> **The highlight of this page is the AI Resolution Composer:**  
> When a reviewer requests changes—such as adding exponential backoff to token refreshes—Byte analyzes the comment, the surrounding code diff, and project architecture to draft a professional, context-rich developer response.
>
> The draft details the code changes made, explains the technical rationale, and cites the newly added unit tests.
>
> Crucially, the draft is never auto-posted. The developer can inspect, edit, and refine the text before appending it to the thread.
>
> Once all approvals and checks turn green, the **Squash & Merge** action unlocks, complete with an automated Conventional Changelog generator.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Navigate to the **Pull Requests** page (`#pr`).
  2. Open **PR #214**.
  3. Point out the `1 of 2 Approvals` badge and the `3 days waiting` turnaround clock.
  4. Scroll to the line-anchored review thread on `src/auth/authService.ts:42` from reviewer `@sarah-dev`.
  5. Click **Draft AI Resolution Response**.
  6. Show the generated markdown response in the interactive text area.
  7. Show that the text is fully editable by typing a quick adjustment.
  8. Point to the locked **Squash & Merge** button, noting that it arms only when all review and CI policies are satisfied.

### Key Technical Talking Points & Judge Anchors
- **Human-in-the-Loop Communication:** Reinforces that AI generates technical drafts to save developer time, but human engineers maintain full ownership of all team communication.
- **End-to-End Traceability:** Connects review comments directly to the commit diff and subsequent verification tests.

### Transition to Slide 9
> “With repository state, CI pipelines, and pull requests unified, how do teams make the ultimate deployment decision: is this build ready to ship?”

### Anticipated Judge Q&A for Slide 8
- **Q: Does the AI Resolution Composer post directly to GitHub via API?**  
  *A: In Live Workspace Mode, it can post approved responses to GitHub PR threads using the configured personal access token; in Sandbox Mode, it provides full interactive simulated drafting.*

---

## Slide 9: SCORING (Release Gate & Deployment Readiness)

### Slide Header & Content in Deck 11
```
SCORING
Release Gate + Deployment
Deployment readiness and repository health stay aligned with Byte’s visual state.

HEALTH FACTORS:
• Branch divergence • Failed and flaky tests • Secrets and security policies
• Open vulnerabilities • Code smells and debt • Unreviewed commits and PR lag • Large PR size

68 ATTENTION HP
Score = max(0, 100 − deductions)
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “GitPet provides a deterministic **5-Pillar Release Gate** that calculates deployment readiness and prevents premature releases.
>
> The Release Gate evaluates five weighted pillars:
> 1. **Tests Passing (25% weight):** Requires a 100% clean test suite pass rate.
> 2. **Code Coverage (20% weight):** Enforces a minimum threshold of 80% line coverage.
> 3. **Vulnerability Status (25% weight):** Enforces zero open High or Critical CVEs.
> 4. **PR Approvals (15% weight):** Requires satisfying peer review thresholds with zero unresolved change requests.
> 5. **Branch Freshness (15% weight):** Requires 0 commits behind upstream main.
>
> The overall score maps directly to three release readiness tiers:
> - **Ready to Ship (≥90%):** Green status, sign-off button armed.
> - **Caution (70–89%):** Amber status, requires team review.
> - **Blocked (<70%):** Red status, release sign-off locked.
>
> The Release Gate does not just display a percentage. It pinpoints active release blockers with direct remediation deep links—such as jumping straight into CVE patching or rebase synchronization.
>
> Teams can also export compliance artifacts in one click: a formatted **Markdown Summary** for release notes or a machine-readable **JSON Audit Artifact** for compliance records.
>
> Notice that Byte’s 68 Attention HP on screen directly reflects these underlying release deductions.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Navigate to the **Release Gate** page (`#release`).
  2. Point out the overall readiness score gauge (e.g., `68% - CAUTION / BLOCKED`).
  3. Walk across the 5 pillar progress bars:
     - Tests Passing (Failing test flag).
     - Code Coverage (78% vs 80% target).
     - Vulnerabilities (1 High CVE detected).
     - PR Approvals (1 of 2 satisfied).
     - Branch Freshness (6 commits behind).
  4. Point to the **Active Blockers List** at the bottom.
  5. Click **Export JSON Artifact** or **Export Markdown Summary** to showcase compliance readiness.

### Key Technical Talking Points & Judge Anchors
- **Objective Release Governance:** Eliminates subjective 'feels ready' deployment decisions by establishing transparent, reproducible release scorecards.
- **Audit-Ready Compliance:** Generates verifiable JSON release manifests containing full test, coverage, and security metadata.

### Transition to Slide 10
> “To understand the exact mathematical breakdown behind Byte’s 68 HP score, let’s look at our 7-Factor Risk Analysis engine.”

### Anticipated Judge Q&A for Slide 9
- **Q: Can release pillar weights and coverage thresholds be customized per team?**  
  *A: Yes. The scoring parameters are defined in a structured configuration schema, allowing teams to adjust coverage targets, required approvals, and CVE tolerance.*

---

## Slide 10: SCORING (Dynamic Weighted Risk Analysis)

### Slide Header & Content in Deck 11
```
SCORING
Risk Analysis
Dynamic weighted risk assessment
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “The Risk Analysis page provides the mathematical engine behind Byte’s health pool.
>
> Repository health is computed dynamically using a 7-factor deduction formula:
> $$\text{Health Score (HP)} = \max\left(0, 100 - \sum \text{Deductions}\right)$$
>
> **The 7 Risk Dimensions are:**
> 1. **Branch Drift & Divergence (0 to -35 pts):** Deducts points based on behind-commit count.
> 2. **Failed & Flaky Tests (0 to -28 pts):** Deducts points for failing CI runs and intermittent test flakes.
> 3. **Secrets & Security Policies (0 to -30 pts):** High-impact deduction for exposed credentials or open cloud storage policies.
> 4. **Open CVE Vulnerabilities (0 to -22 pts):** Deducts points for unpatched dependencies.
> 5. **Code Smells & Uncommitted Debt (0 to -15 pts):** Deducts points for dirty working trees with >8 modified files.
> 6. **Unreviewed PR Lag (0 to -15 pts):** Deducts points for stale pull requests waiting >3 days.
> 7. **Oversized PR Scope (0 to -12 pts):** Deducts points for massive PRs (>400 lines or >15 files) that increase blast radius.
>
> This score maps directly to Byte’s 4-tier visual aura: **Healthy (80–100 HP)**, **Attention (45–79 HP)**, **Blocked (<45 HP)**, and **Critical Hazard (0 HP)**.
>
> Every factor card includes an interactive **'Remediate with Byte'** button. Clicking it deep-links the developer back to the Companion with a pre-populated diagnostic prompt, closing the loop from detection to safe resolution.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  1. Navigate to the **Risk Score** page (`#risk`).
  2. Point to the top health score meter displaying `68 HP (Attention)`.
  3. Show the category filter tabs: `All Factors`, `Hazards`, `Warnings`, `Healthy`.
  4. Scroll down to show the specific factor deductions:
     - Branch Drift: `-18 pts` (6 commits behind).
     - CVE Vulnerabilities: `-14 pts` (1 High severity package).
  5. Click **Remediate with Byte** on the Branch Drift card.
  6. Show how the application seamlessly navigates back to the Companion page with the diagnostic prompt pre-filled in the chat input.

### Key Technical Talking Points & Judge Anchors
- **Closed-Loop Remediation:** Shows how GitPet connects analytical risk scoring directly to actionable AI guidance and bounded execution.
- **Predictable, Bounded Formula:** Guarantees that HP never drops below 0 and provides transparent accounting for every lost point.

### Transition to Slide 11
> “Now let’s examine the underlying architecture that keeps AI reasoning, safety policies, and Git execution strictly separated.”

### Anticipated Judge Q&A for Slide 10
- **Q: Why separate Release Gate scoring from Risk Scorecard HP?**  
  *A: The Release Gate focuses strictly on binary deployment criteria for a specific build artifact, while the Risk Scorecard monitors broader continuous repository hygiene and developer working habits.*

---

## Slide 11: ARCHITECTURE (React 19 + Express Gateway + Gemini Services)

### Slide Header & Content in Deck 11
```
ARCHITECTURE
React 19 + Express gateway + Gemini services
A production-shaped separation between interface, policy, execution, and external services.
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “GitPet uses a clean, production-shaped architecture designed around a strict separation of authority:
>
> 1. **Frontend SPA Layer:** Built with React 19, TypeScript, Vite, TailwindCSS v4, and Motion. It hosts our 6 core pages, the Web Audio chiptune synthesizer, and the SVG DAG topology engine.
> 2. **Express Gateway Layer (Port 3004):** The central security trust boundary. It handles request validation, prompt sanitization, automated secret redaction, safety policy routing, and WebSocket telemetry streaming.
> 3. **Safety Engine & Subprocess Boundary:** Contains our Layer 1 static tokenizer and Layer 2 contextual linter. Approved commands are executed strictly via `child_process.execFile` with separate argv arrays—completely bypassing system shell interpreters.
> 4. **External Gemini Cloud Services:** Communicates over secure TLS 1.3 with Google Gemini models for structured text reasoning, Gemini Live Audio for low-latency voice, and Imagen 3 for avatar personalization. All API keys remain safely guarded behind the backend gateway.
>
> **The Key Architectural Principle is Separation of Authority:**
> - The **AI Model** has authority to explain, analyze, and *suggest*.
> - The **Safety Engine** has authority to *allow or reject*.
> - The **Human Developer** has authority to *approve*.
> - The **Constrained Executor** has authority to run *only the verified Git operation*.
>
> This guarantees that an AI model can never directly execute a shell command on a developer's machine.”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  - Point to the architecture flow diagram on the slide.
  - Trace the path of an action: `User Request` → `Gemini Reasoning` → `Gateway Secret Redactor` → `2-Layer Safety Gate` → `Human Preview Modal` → `execFile Subprocess Execution` → `Audit Buffer`.
  - Highlight the backend gateway running on `http://localhost:3004`.

### Key Technical Talking Points & Judge Anchors
- **Defense-in-Depth:** Aligns with OWASP LLM Top 10 (LLM01 Prompt Injection, LLM02 Sensitive Information Disclosure, LLM08 Excessive Agency) and NIST AI RMF 1.0 standards.
- **Secret Redaction:** The gateway scans prompts and outputs for GitHub tokens, AWS keys, and private SSH keys, redacting them before they can be sent to external models or saved to logs.

### Transition to Slide 12
> “To conclude, let’s review what makes GitPet unique and open the floor for questions.”

### Anticipated Judge Q&A for Slide 11
- **Q: What happens if the Express gateway goes down?**  
  *A: The frontend detects gateway disconnection, displays an offline warning banner, and switches gracefully to local sandbox mode so developers can still inspect local DAG topology and diffs.*

---

## Slide 12: CLOSING (Ambient DevSecOps + Live Launch)

### Slide Header & Content in Deck 11
```
GitPet makes DevSecOps health ambient, explainable, and safely actionable.

AMBIENT AWARENESS: No terminal hunting
BOUNDED AGENCY: Safety enforced in code
MULTIMODAL AI: Text, voice, image, TTS
DEVSECOPS INTELLIGENCE: DAG, CI/CD, PR, release
PRODUCTION READY: Tests, governance, SBOM, runbook

Team Ribbon Patrol: Aliasgar Husain • Lucas Whitaker • David Castelli • Faris Nour
PRESS P FOR IN-APP DECK (Deck reference available)
npm run dev  →  http://localhost:3004
```

### Spoken Speaker Script (Verbatim Rehearsal)
> “In summary, **GitPet makes DevSecOps health ambient, explainable, and safely actionable.**
>
> Here are the 5 core takeaways:
> 1. **Ambient Awareness:** Byte eliminates terminal hunting by making repository health continuously visible through posture, auras, and sound.
> 2. **Bounded Agency:** Safety is enforced in code. With our two-layer safety engine, mandatory previews, and pre-computed rollbacks, the human developer always retains ultimate control.
> 3. **Multimodal AI:** Seamlessly integrates Google Gemini text reasoning, Gemini Live voice streaming, and Imagen avatar personalization with offline fallbacks.
> 4. **DevSecOps Intelligence:** Unifies multi-lane DAG topology, working tree diffs, CI/CD pipeline telemetry, flaky test quarantine, PR review intelligence, and 5-pillar release readiness in one cohesive experience.
> 5. **Production Readiness:** Backed by 31 automated Vitest tests (100% pass), a comprehensive STRIDE threat model, NIST AI RMF governance system cards, CycloneDX SBOM inventory, and an SRE runbook.
>
> We are Team 05, **Ribbon Patrol**: Aliasgar Husain, Lucas Whitaker, David Castelli, and Faris Nour.
>
> You can run the application right now with `npm run dev` at `http://localhost:3004`.
>
> Thank you for your time, and we welcome your questions or live scenario requests!”

### Live Demonstration Cues & Screen Actions
- **Presenter Action:** 
  - Return to the live application at `http://localhost:3004`.
  - Leave Byte on screen in the center stage.
  - Invite the judges to pick any scenario from the Quick Palette (`⌘K` / `Ctrl+K`), test a custom Git command, or ask Byte an architectural question.

### Key Technical Talking Points & Judge Anchors
- Thank the hackathon organizers and Google Gemini team.
- Highlight team collaboration, clear division of responsibilities, and thorough documentation suite.

---

## Presentation Timing & Pacing Reference Table

```
+---------+----------------------------------------------+----------+-----------------+
| Slide # | Slide Title & Core Topic                     | Duration | Cumulative Time |
+---------+----------------------------------------------+----------+-----------------+
| 01      | GitPet Title & 3 Core Dilemmas               | 00:55    | 00:55           |
| 02      | SOLUTION: Notice · Understand · Resolve      | 01:05    | 02:00           |
| 03      | AI ASSISTANCE: 4 Personas & Evidence Cards   | 01:15    | 03:15           |
| 04      | SAFETY: Layer 1 Static Rules (9 Threats)     | 01:10    | 04:25           |
| 05      | SAFETY: Layer 2 Context Lints & Reversals    | 01:05    | 05:30           |
| 06      | REPOSITORY: Multi-Lane DAG & Diff Studio     | 01:00    | 06:30           |
| 07      | CI/CD: 5-Stage Tracker & Flaky Quarantine    | 00:55    | 07:25           |
| 08      | PULL REQUESTS: PR #214 & AI Resolution Draft | 00:50    | 08:15           |
| 09      | SCORING: 5-Pillar Release Gate & Exports     | 00:50    | 09:05           |
| 10      | SCORING: 7-Factor HP Formula & Remediate     | 00:50    | 09:55           |
| 11      | ARCHITECTURE: Express Gateway & execFile     | 01:00    | 10:55           |
| 12      | CLOSING: 5 Core Pillars & Live Launch        | 00:45    | 11:40           |
+---------+----------------------------------------------+----------+-----------------+
| TOTAL   | Full Presentation & Demonstration            | 11m 40s  | (Budget: 12m)   |
+---------+----------------------------------------------+----------+-----------------+
```

---

## High-Priority Messages to Preserve Under Time Pressure

If the judges or moderators issue a 2-minute or 5-minute warning, compress the presentation while strictly preserving these four foundational claims:

1. **Byte is a Live Telemetry Visualization, Not Just a Mascot:**  
   Byte's 18 postures, 4 health auras, and chiptune audio directly reflect live Git status, pipeline states, and security posture.
2. **AI Reasoning is Grounded in Concrete Repository Evidence:**  
   Every Gemini response cites live branch divergence, dirty files, and CVE IDs with quantitative confidence scores.
3. **The Model Can Suggest; The Safety Engine Decides:**  
   Safety is enforced at the code level through 9 static rules and 6 contextual lints. Commands run via tokenized `execFile`, never free-form shell execution.
4. **Every Action is Previewed, Bounded, and Reversible:**  
   Zero blind execution. The developer sees the blast radius and reversal plan before confirming any state-changing operation.

---

## Live Demo Keyboard Shortcuts & Quick Reference

| Shortcut | Scope | Action Triggered |
| :--- | :--- | :--- |
| `Spacebar` | Global | Pet Byte (synthesizes purring audio + spawns heart particles) |
| `⌘K` / `Ctrl+K` | Global | Open Quick Command Palette (scenario switcher, navigation, settings) |
| `⌘B` / `Ctrl+B` | Global | Toggle between Companion Page (`#companion`) and Repository Page (`#repository`) |
| `Esc` | Global | Close active modal, preview drawer, or command palette |

---

## Documentation Cross-Reference Matrix

| Documentation File | Key Content Aligned with Slide Notes |
| :--- | :--- |
| `docs/PRESENTATION_SLIDES.md` | Slide-by-slide markdown transcript matching `GitPet_Professional_Deck 11.pptx` (12 slides). |
| `docs/PROJECT_OVERVIEW.md` | Executive summary, elevator pitch, 3 core dilemmas, and target user personas. |
| `docs/README.md` | Complete functional specification, feature inventory, API reference, and setup guide. |
| `docs/ARCHITECTURE.md` | System architecture, C4 container diagrams, Express gateway trust boundary, and data flows. |
| `docs/SECURITY_THREAT_MODEL.md` | STRIDE analysis, 9 static threat rules, 6 contextual lints, secret redactor specifications. |
| `docs/AI_GOVERNANCE.md` | NIST AI RMF 1.0 system card, 5-tier human-in-the-loop matrix, and AI transparency disclosures. |
| `docs/RUNBOOK.md` | Operational guide, health check endpoints (`/api/health`), disaster recovery, and troubleshooting. |
| `docs/TEST_REPORT.md` | 31 automated Vitest tests (security, executor, markdown) and test execution logs. |
| `docs/SBOM_MANIFEST.md` | CycloneDX-compatible software bill of materials and dependency license audit. |
| `docs/DEMO_NOTES.md` | Component fidelity classification, sandbox vs. live workspace mode data mapping. |
| `docs/USER_GUIDE.md` | Comprehensive manual covering all 6 application pages and interactive workflows. |
| `docs/GUIDELINES_COMPLIANCE.md` | Participant guidelines verification matrix (P-01 through P-15). |
| `docs/CHECKLIST.md` | Hackathon submission checklist verification matrix (Items 1 through 20). |