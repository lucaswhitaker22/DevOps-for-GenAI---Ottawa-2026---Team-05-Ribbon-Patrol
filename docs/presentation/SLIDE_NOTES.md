# GitPet Comprehensive Presentation Playbook: Verbatim Speaker Scripts

**Project:** GitPet — Ambient DevSecOps Repository Companion
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)
**Target Duration:** About 20 minutes (including handoffs and app-navigation cues)
**Presentation Format:** Engineer-facing slide-deck presentation. Each feature slide follows one message map: the developer/DevOps problem, why it matters to delivery/reliability/safe change, what the app actually demonstrates, the real AI contribution (or explicitly no AI), whether the data is live/local/scenario-driven, and the demo cue/transition.
**Presenters:**
- **Aliasgar** — Slides 1–3: mission, problem, and solution.
- **Lucas Whitaker** — Slides 4–6: AI assistance and safety policy.
- **David Castelli** — Slides 7–10: repository, CI/CD scenarios, PR scenarios, and release readiness.
- **Faris** — Slides 11–13: risk/health pool, architecture, and closing.
**Live Application Target:** `http://localhost:3004` (`npm run dev`)
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)

---

## Master Presentation Schedule & Presenter Split

| Slide # | Slide Title in Deck 11 | Core Architectural & Feature Topic | Target Time | Cumulative | Presenter Lead |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **01** | **GitPet (Title & AWS Community Day)** | Welcome, Team Credentials & The DevOps for GenAI Challenge | 1:25 | 1:25 | **Aliasgar** |
| **02** | **THE PROBLEM (3 Developer Crises)** | Context Blindness, Excessive AI Agency, & Buried Telemetry | 1:15 | 2:40 | **Aliasgar** |
| **03** | **SOLUTION (Notice · Understand · Resolve)** | 3-Stage DevSecOps Loop & 18 Physical Symptoms Taxonomy | 2:20 | 5:00 | **Aliasgar** |
| **04** | **AI ASSISTANCE (Talk to Byte)** | 4 Personas, Tiered Gemini Flash Models, Grounded Evidence | 1:50 | 6:50 | **Lucas Whitaker** |
| **05** | **SAFETY (Layer 1: Static Rules)** | Eight Hard Blocks, Static Warning, Parser/Allowlist & Argv Execution | 1:35 | 8:25 | **Lucas Whitaker** |
| **06** | **SAFETY (Layer 2: Contextual Lints)** | Seven Contextual Checks, Stash Suggestion (`-u`) & Execution Anchors | 1:50 | 10:15 | **Lucas Whitaker** |
| **07** | **REPOSITORY (DAG & Working Tree)** | Multi-Lane SVG Graph, Diff Studio, Checkbox Staging & Stashes | 1:30 | 11:45 | **David Castelli** |
| **08** | **CI/CD (Scenario Walkthrough)** | 5-Stage Demo, Example Logs, Flaky-Test Triage & Seeded CVE | 1:10 | 12:55 | **David Castelli** |
| **09** | **PULL REQUESTS (Review Scenario)** | Sample PR, Status Display, Example Threads & Editable Reply | 1:10 | 14:05 | **David Castelli** |
| **10** | **SCORING (Readiness Report)** | Weighted Advisory Score, Status Thresholds & Local Reports | 1:50 | 15:55 | **David Castelli** |
| **11** | **SCORING (Dynamic Risk Analysis)** | Seven Risk Deductions, Health Labels & Remediation Guidance | 1:30 | 17:25 | **Faris** |
| **12** | **ARCHITECTURE (System & Gateway)** | React 19, Express Server, Safety Policy & Git Execution | 1:40 | 19:05 | **Faris** |
| **13** | **CLOSING (Ambient DevSecOps + Live Launch)** | Five Core Ideas, 31 Vitest Tests, Demo Launch & Q&A | 1:00 | 20:05 | **Faris** |

Allow approximately 0:35 for transitions and app navigation; the full run is about 20:40.

---

## Engineering term prefaces (use at first mention on the relevant slide)

- **Ahead / behind** (Slide 4 or 7): ahead = commits that exist locally but not on the tracking branch; behind = tracking-branch commits not yet local. Divergence is when both are non-zero.
- **DAG / merge base** (Slide 7): the commit graph is a directed acyclic graph; the merge base is the lowest common ancestor of two refs, used to compute divergence and rebase ranges.
- **Stash / untracked** (Slide 6): `git stash` snapshots tracked changes; `-u` adds untracked files to that snapshot. Without `-u`, untracked files stay in the working tree and can be lost on a subsequent checkout or rebase.
- **Argv execution** (Slide 5): Git is invoked through `child_process.execFile` with an argument array rather than a shell string, so shell control characters are not interpreted.
- **Weighted score vs. deductions** (Slides 10–11): Release Readiness sums five weighted pillars (additive, 0-100). The Health Pool starts at 100 and subtracts seven deductions (subtractive, floored at 0). They answer different questions and use different math.

---

## Slide 1: Title & The Mission — AWS Community Day Ottawa 2026

**Presenter:** **Aliasgar**
**Target time:** 1 minute 25 seconds
**Message map:** Problem = context scattered across Git/CI/reviews/security and AI agents that can propose destructive commands; Value = a single companion surface that makes state legible without unrestricted LLM authority; What the app demonstrates = six-workspace ambient companion with Byte; AI role = optional tiered Gemini chat explains supplied context, does not execute; Data source = sandbox by default, explicit local Git scan or configured public GitHub fixture; Demo cue = title slide, point to three columns.

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

### Technical backup (presenter notes, not spoken unless asked):
- Six workspaces: Companion, Repository, CI/CD, Pull Requests, Release Gate, Risk.
- Configured public GitHub fixture: `farisnour/gitpet-acme-corp-ecommerce-store` via `/api/repo/live`.
- App is not a background repository monitor; local scanning is explicit.

### Verbal Transition to Slide 2:
> “To see why software engineering teams urgently need this companion, let’s look at the three developer crises on Slide 2.”

---

## Slide 2: The Problem — The 3 Developer Crises

**Presenter:** **Aliasgar**
**Target time:** 1 minute 15 seconds
**Message map:** Problem = three recurring delivery friction points; Value = naming them shows where each GitPet workspace responds; What the app demonstrates = six workspaces bring signals together; AI role = AI is assistance, not an autonomous actor; Data source = scenario-driven for CI/CD and PR, live only for explicitly selected Git sources; Demo cue = point to three problem cards, pause.

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

### Technical backup (presenter notes):
- Do not claim a specific percentage of developer time lost; the cards illustrate the problem, not a measured metric.
- GitPet's CI/CD and PR panels are scenario-driven, not live integrations.

### Verbal Transition to Slide 3:
> “Let’s look at how GitPet converts this fragmented telemetry into an intuitive, continuous developer workflow on Slide 3.”

---

## Slide 3: SOLUTION (Notice · Understand · Resolve)

**Presenter:** **Aliasgar**
**Target time:** 2 minutes 20 seconds
**Message map:** Problem = the three crises need a repeatable workflow, not a bag of features; Value = a three-stage loop gives a mental model for every following slide; What the app demonstrates = Notice (18 symptoms + Byte visuals/audio), Understand (Gemini chat over supplied context), Resolve (policy-checked Git preview/execution); AI role = Understand uses Gemini when configured; Notice and Resolve are deterministic; Data source = Notice state is scenario or scanned; Resolve live execution requires `GITPET_ALLOW_WRITES=true`; Demo cue = trace the loop, hand to Lucas.

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

### Technical backup (presenter notes):
- 18 symptoms span Git conditions (upstream drift, unpushed work, detached HEAD, conflicts, clean sync) and seeded build/flaky-test/vulnerability/PR/infrastructure scenarios.
- `headBefore`/`headAfter` are HEAD anchors; they cannot restore uncommitted file content or guarantee one-click rollback.

### Verbal Transition to Slide 4:
> “Now Lucas will explain how Byte adapts its reasoning to different developer roles and task complexities on Slide 4.”

---

## Slide 4: AI ASSISTANCE (Talk to Byte)

**Presenter:** **Lucas Whitaker**
**Target time:** 1 minute 50 seconds
**Message map:** Problem = a single chat tone does not fit a junior, an architect, and a release engineer; Value = personas and tiers shape the answer without changing safety policy; What the app demonstrates = four prompt personas and fast/general/deep Gemini chains; AI role = Gemini reasoning; personas are prompt roles, not separately privileged agents; Data source = repository context supplied to supported chat; CI/PR remain scenario data; Demo cue = compare persona tones, show tier control.

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
> These are prompt personas, not separate agents with separate permissions. The user can select a model tier through the chat UI. The configured fast model chain is `gemini-3.1-flash-lite`, then `gemini-3.6-flash`, then `gemini-flash-latest`; general is `gemini-3.6-flash`, then `gemini-3.5-flash`, then `gemini-flash-latest`; deep is `gemini-3.7-flash`, then `gemini-3.6-flash`, then `gemini-flash-latest`. Retries happen within the selected chain; do not imply every failure triggers a cascade through every tier.
>
> Chat prompts can include repository and branch names, upstream, ahead/behind counts, detached/stale flags, working-tree paths/status, and remote commits behind. CI/CD, PR, and CVE scenario data is not made live by this prompt context. Do not present model responses as guaranteed evidence citations, calibrated confidence scores, or atomic undo plans.
>
> For availability or quota errors, the backend can try the next model within the selected chain. Some chat/analyze flows can fall back to deterministic rule-based guidance, but that is not a cross-feature offline mode or an AI-equivalent response.”

### Slide Delivery Cues:
- Bridge from Slide 3: the model contributes to *Understand*; it does not control *Resolve*.
- Explain that repository context is supplied to supported chat requests, while model output can still be wrong and should be checked.
- If showing the UI, point out that personas shape prompts and do not grant different execution permissions.

### Technical backup (presenter notes):
- Fast tier first model: `gemini-3.1-flash-lite`; general: `gemini-3.6-flash`; deep: `gemini-3.7-flash`. Each chain has same-tier fallbacks.
- Deterministic fallback exists only in selected chat/analyze paths; Live Audio and image generation still require their services.

### Verbal Transition to Slide 5:
> “Reasoning quality is essential, but reasoning alone is not a security boundary. On Slide 5, let’s look at how GitPet enforces safety at the code level.”

---

## Slide 5: SAFETY (Layer 1: Static Rules)

**Presenter:** **Lucas Whitaker**
**Target time:** 1 minute 35 seconds
**Message map:** Problem = a hallucinated/injected command can be syntactically valid and still destructive; Value = deterministic static rules catch universally dangerous commands regardless of repo state; What the app demonstrates = Layer 1 hard-blocks eight classes, warns on `rebase --onto`, rejects non-Git/shell-control input, uses argv; AI role = no AI, the model can suggest but the safety engine decides; Data source = static policy in `safety.ts`, server rechecks at execution, writes require `GITPET_ALLOW_WRITES=true`; Demo cue = show blocked examples and safer suggestions.

**Visual Focus on Slide 5:** The blocked-command examples, safer suggestions, and argv-based Git execution.

### Verbatim Spoken Presentation:
> “In any AI-enabled developer system, prompt engineering is guidance—it is not a security boundary. If an LLM hallucinates a dangerous command, receives prompt injection, or misinterprets repository state, relying on system instructions alone will fail.
>
> GitPet implements safety as deterministic application code through a **2-Layer Safety Policy Engine** in `safety.ts`.
>
> **Layer 1 has eight hard-block rules** regardless of repository state:
> - Blocks unconditional `git push --force`/`-f` and can suggest `--force-with-lease`.
> - Blocks `git push --delete`/`-d`, which deletes a remote ref.
> - Blocks `git reset --hard` and can suggest `--keep`.
> - Blocks `git clean`, which deletes untracked files.
> - Blocks `git branch -D` and can suggest the safer merged-only `-d`.
> - Blocks `git stash drop` and `git stash clear`.
> - Blocks history-rewriting `filter-branch` and `--filter-repo`.
> - Blocks `git checkout <path>` forms that can overwrite edits.
>
> There is also a warning, not a hard block, for `git rebase --onto`. The parser rejects non-Git commands, disallowed subcommands, and shell control characters; `&&` is handled as an explicit chain of Git commands.
>
> The executor invokes Git through `child_process.execFile` with an argv array, not a shell command string. This reduces shell-injection risk; it is not a claim that all application behavior is invulnerable.
>
> Execution is rechecked server-side. Writes are disabled unless `GITPET_ALLOW_WRITES=true`; the safety tests cover selected policy and parsing cases, not every possible Git risk.
>
> The model can suggest an action; the safety engine decides what is permitted.”

### Slide Delivery Cues:
- Point out the clear contrast between blocked red commands and green safe alternatives.
- Group the blocks by remote refs, local data, stashes, history, and path overwrites. Mention `rebase --onto` is a warning, not a hard block.
- If mentioning tests, note that the executor suite has 19 tests for selected cases; do not imply exhaustive coverage.

### Technical backup (presenter notes):
- Eight hard-block rules: force push, push --delete, reset --hard, clean, branch -D, stash drop/clear, filter-branch/--filter-repo, checkout <path>.
- Suggestions (`--force-with-lease`, `reset --keep`, `branch -d`) are not applied automatically.
- `&&` parsed as explicit chain; shell control chars (`;`, `|`, backticks, `$`, `>`) rejected.

### Verbal Transition to Slide 6:
> “Static syntax checks catch universally dangerous commands. But what happens when a command is syntactically valid yet dangerous in the current working directory? That brings us to Slide 6.”

---

## Slide 6: SAFETY (Layer 2: Contextual Lints)

**Presenter:** **Lucas Whitaker**
**Target time:** 1 minute 50 seconds
**Message map:** Problem = a command valid in general can be unsafe for this repository right now; Value = Layer 2 checks working-tree/stash/branch/in-progress state to catch context-specific hazards; What the app demonstrates = seven contextual lints, signature example `stash-misses-untracked`; AI role = no AI, deterministic lints; Data source = working-tree, stash, branch ahead/behind, in-progress-operation state; Demo cue = point to missing `-u` vs corrected command, emphasize user chooses.

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
> Alongside that stash warning, six contextual lint codes check: `stash-pop-empty` (warning on an empty stash); `pull-dirty-tree` (warn on pull/merge with dirty files unless stash/autostash protects them); `unresolved-conflicts` (block pull, merge, switch, or checkout while conflicts remain); `operation-in-progress` (block unrelated mutations during a paused operation, while allowing continuation/abort/skip, staging fixes, and read-only inspection); `ff-only-on-diverged` (block an impossible fast-forward-only pull and suggest rebase); and `push-while-behind` (warn when a push will be rejected).
>
> Some findings warn, others block. The lints are targeted checks, not a complete formal proof that a Git operation is safe. Live writes require `GITPET_ALLOW_WRITES=true`. The executor records `headBefore` and `headAfter` hashes; those hashes don't restore uncommitted file content or guarantee one-click rollback.”

### Slide Delivery Cues:
- Point directly to the missing `-u` in the model suggestion versus the corrected command.
- Emphasize the core takeaway: *“Valid syntax, unsafe context.”* Explain that `-u` is a suggestion for the user to select, not an automatic rewrite.
- Use the six other lint names as supporting detail if the room asks what else is checked.

### Technical backup (presenter notes):
- `stash-misses-untracked` warns and suggests `-u`; the command is not rewritten or executed automatically.
- Preview is dry-run; not a universal file-level diff. `headBefore`/`headAfter` are HEAD anchors, not a universal rollback mechanism.
- Guidance flows can use supplied scenario state; live preview/execution paths scan the configured local Git workspace.

### Presenter Handoff to Slide 7:
- **Lucas:** *“With our safety foundation established, David will now demonstrate the repository workspace, scenario-driven delivery views, and the advisory readiness report.”*

---

## Slide 7: REPOSITORY (DAG & Working Tree)

**Presenter:** **David Castelli**
**Target time:** 1 minute 30 seconds
**Message map:** Problem = a linear `git log` hides branch divergence, merge bases, and detached-HEAD hazards; Value = a topological DAG and diff studio make state legible and enable selective staging; What the app demonstrates = DAG normalizer renders multi-lane SVG, Diff Studio shows modified files/search/checkbox staging/unified diffs, stash inspection; AI role = the "AI Conventional Commit" control is labeled AI but regenerates template text locally, does not call Gemini, Apply sends a chat prompt rather than committing; Data source = deterministic DAG normalization and diff parsing, local UI state for staging/stash; Demo cue = show graph + commit drawer, move to working-tree file selection/diff.

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
- Be precise: the AI Conventional Commit generator regenerates template text locally; it does not call Gemini. Its Apply action routes a chat prompt rather than committing.

### Technical backup (presenter notes):
- DAG normalization and diff parsing are deterministic (`gitDagNormalizer.ts`, `diffParser.ts`).
- The "AI Commit Generator" modal preloads three template suggestions; "regenerate" builds a templated string from selected type/scope locally (`AICommitGeneratorModal.tsx`).
- Staging/stash controls are local UI state; do not claim all actions modify a live Git index or restore a real stash.

### Verbal Transition to Slide 8:
> “Repository state is only one part of delivery health. Let’s look at how GitPet presents CI/CD pipeline telemetry on Slide 8.”

---

## Slide 8: CI/CD (Scenario Walkthrough)

**Presenter:** **David Castelli**
**Target time:** 1 minute 10 seconds
**Message map:** Problem = when a build goes red, the developer jumps between CI dashboards, logs, and scanner outputs; Value = a single triage view from failure signal to proposed next step demonstrates the intended workflow; What the app demonstrates = five illustrative stages with example logs, flaky-test card, seeded CVE card; AI role = no AI on this page, a user may separately ask Byte about the selected scenario; Data source = scenario-driven, not connected to any CI provider, no dependency scanner; Demo cue = open one stage log, label flaky-test/CVE cards as scenario content.

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
> This still makes the workflow useful as a prototype: it illustrates how a developer might move from a generic red build badge to the exact root cause and an actionable remediation path in seconds. The next engineering step would be to connect real pipeline and scanner sources, define their data contracts, and ensure the remediation controls perform auditable provider operations.”

### Slide Delivery Cues:
- Point out the progression from the failing test log to the flaky test diagnostic card and the supply chain CVE card.
- Explicitly label the CI/CD content as scenario data; do not imply a live CI provider or dependency scanner.

### Technical backup (presenter notes):
- CI/CD stages, logs, pass-rate/CVE examples, and triage actions are scenario-driven (`CICDPage.tsx`, `mockScenarios.ts`).
- Rerun/quarantine controls simulate app state; no CI provider, scanner, file edit, or pipeline gate is connected.
- AI may be invoked separately if a user asks Byte about the selected scenario.

### Verbal Transition to Slide 9:
> “Once the pipeline is understood, the next delivery bottleneck is often peer code review. Let’s look at Pull Request Intelligence on Slide 9.”

---

## Slide 9: PULL REQUESTS (Review Scenario)

**Presenter:** **David Castelli**
**Target time:** 1 minute 10 seconds
**Message map:** Problem = review bottlenecks and stale PRs slow delivery, and reply/merge controls can be opaque; Value = a PR view surfaces wait time, approvals, and comments to demonstrate the intended review loop; What the app demonstrates = sample PR, status, comments, scenario wait value, editable example reply, Squash & Merge control; AI role = no AI, the reply composer fills hardcoded local text, does not send thread to Gemini or post to GitHub; Data source = scenario-driven, Squash & Merge changes local UI state only; Demo cue = point out PR values are scenario data and reply is editable UI example.

**Visual Focus on Slide 9:** Scenario PR #214 metadata, approval/change-request counts, example wait value, inline comments, and editable sample reply.

### Verbatim Spoken Presentation:
> “In the **Pull Request Intelligence Workspace (`#pr`)** on Slide 9, GitPet demonstrates how to accelerate code review cycles and surface review bottlenecks.
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
- Emphasize: no AI, no GitHub posting, no real merge.

### Technical backup (presenter notes):
- `PRIntelligencePage.tsx`: `handleDraftAIReply` sets a hardcoded local string; `handleSquashAndMerge` sets local `merged` state for 5s.
- PR details/comments are scenario data; some buttons route a guidance prompt to chat.
- A production version would need authenticated GitHub API access, permission checks, provider-side state refresh, and confirmation before posting or merging.

### Verbal Transition to Slide 10:
> “The app has brought Git and delivery scenarios together. Let’s look at how GitPet summarizes the current state into an advisory readiness report on Slide 10.”

---

## Slide 10: SCORING (Readiness Report)

**Presenter:** **David Castelli**
**Target time:** 1 minute 50 seconds
**Message map:** Problem = release managers need a fast, consistent summary of whether the current state is shippable; Value = an advisory five-pillar scorecard makes the decision legible without pretending to be a deployment gate; What the app demonstrates = `releaseReadiness.ts` computes five weighted pillars locally, the page renders score/status/blockers/exports; AI role = a separate `/api/ai/release-readiness` endpoint can request Gemini synthesis when configured, but the current page does not call it, the score is purely local; Data source = current app state, which may include scenario inputs; Demo cue = point to each weight, score/status, export controls, say "advisory report."

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
> In the demo scenario, the score shown is **78% (Caution / Review)**. Read the displayed value during the live presentation if you switch scenarios.
>
> The weighted sum is rounded to an overall score. The UI labels a state Blocked when there are blockers or the score is below 70; Caution/Review when there are warnings or the score is below 85; otherwise Ready to Ship. Its separate `canShip` flag requires no blockers and at least 80, so the flag can disagree with the label in the 80-84 range. This is an advisory prototype report, not a deployment rule.
>
> The optional `POST /api/ai/release-readiness` endpoint can request Gemini synthesis when configured. The standard release page is not wired to call it; the score remains a local calculation. Vulnerabilities and approvals in this demo are scenario inputs, not live scans or branch-protection checks.
>
> A blocker action can pass context to Byte for guidance; it does not remediate the underlying issue automatically.
>
> Users can copy a Markdown summary or download the calculated JSON report. These are demo reports, not signed compliance artifacts or deployment sign-offs. The sign-off button does not deploy.”

### Slide Delivery Cues:
- Point out the 5 weighted pillar bars, the circular gauge (78%), and the active blocker cards.
- Say "advisory report," not "deployment authorization."

### Technical backup (presenter notes):
- `releaseReadiness.ts`: `overallScore = Math.round(rawScore)`; `statusLabel` Blocked if blockers or score < 70, Caution if warnings or score < 85, else Ready; `canShip = blockers.length === 0 && overallScore >= 80`.
- The `/api/ai/release-readiness` route exists in `server.ts` (line ~1935) but `ReleaseReadinessPage.tsx` calls `calculateReleaseReadiness(state)` locally and does not call the endpoint.
- Status thresholds and `canShip` cutoff differ between 80 and 84; explain as prototype behavior.

### Presenter Handoff to Slide 11:
- **David:** *“The advisory release score is one view of readiness. Faris will now explain the separate seven-factor risk and health pool, then the architecture and closing.”*

---

## Slide 11: SCORING (Dynamic Risk Analysis)

**Presenter:** **Faris**
**Target time:** 1 minute 30 seconds
**Visual Focus on Slide 11:** The 7-factor risk deduction breakdown table, the current-state 0–100 HP health pool gauge, and category filtering.

**Message map:** Problem = a release-readiness score summarizes shippability but does not show what is actively eroding repository health; Value = a separate seven-factor deduction model surfaces current hazards so a developer can prioritize remediation; What the app demonstrates = Risk workspace starts at 100 HP, subtracts seven deductions, clamps at zero, labels state-aware health; AI role = no AI in scoring, Remediate with Byte passes context to Companion for guidance, does not perform the fix; Data source = current app state, which may be scenario data; Demo cue = show the score, one factor, filters, remediation link.

### Verbatim Spoken Presentation:
> “Thanks, David.
>
> On Slide 11, we examine the **Risk Scorecard & Health Pool Workspace (`#risk`)**. The score is deterministic for the current state, which may be a sandbox scenario rather than live telemetry.
>
> GitPet starts at 100 HP and subtracts deductions across **seven factors**; this is a sum of deductions, not a weighted average:
> 1. **Branch Divergence (up to -35):** Destructive-risk state, conflicts, detached HEAD, ahead/behind drift, or a stale branch.
> 2. **Failed & Flaky Tests (up to -28):** Failed build, flaky tests, or failed deployment.
> 3. **Secrets & Security Policies (up to -30):** Seeded policy breach or detected credentials.
> 4. **Open Vulnerabilities (-12 or -22):** Lower-severity or high/critical vulnerability data.
> 5. **Code Smells & Debt (up to -15):** Smell count or a large dirty working tree.
> 6. **Unreviewed Commits & PR Lag (up to -15):** Requested changes, a long review wait, or unreviewed commits.
> 7. **Large PR Scope (-8):** The current condition uses scenario PR/comment and diff-size values.
>
> The score is `max(0, 100 - total deductions)`. Severe conditions also affect the health label: destructive hazards are Unsafe; conflicts, severe test/security failures, or a very low score can be Blocked; lower scores may be Attention. The labels are not only fixed numeric bands.
>
> Developers can filter factors by *All*, *Critical Hazards*, *Warnings*, and *Healthy*. A remediation action opens Byte with diagnostic context; it provides guidance rather than automatically fixing the factor. Read the displayed deductions because values vary by scenario.
>
> These two scores answer different questions: Release Readiness summarizes five delivery dimensions, while the Health Pool applies seven risk deductions to the current state. Neither is an external release approval.”

### Slide Delivery Cues:
- Emphasize the formula: `Health Score = max(0, 100 - sum(deductions))`.
- Show one factor and its condition; explain Remediate with Byte opens guidance rather than performing a repair.
- Do not claim real-time CI/PR telemetry.

### Technical backup (presenter notes):
- `computeRepositoryHealth` derives seven deductions from current `RepositoryState`; merge conflicts affect the branch-divergence factor rather than adding an eighth factor.
- Labels (Healthy/Attention/Blocked/Unsafe) are state-aware, not fixed score ranges.
- Remediate with Byte passes context to Companion; it does not remediate automatically.

### Verbal Transition to Slide 12:
> “Faris will now take us through the system boundaries and architecture, then close the presentation.”

---

## Slide 12: ARCHITECTURE (System & Gateway)

**Presenter:** **Faris**
**Target time:** 1 minute 40 seconds
**Message map:** Problem = judges and architects need to see where trust boundaries sit and which component owns enforcement; Value = a clear separation prevents the model from directly launching a process in the local repository; What the app demonstrates = React frontend, Express server on 3004, safety/executor pipeline for supported Git, two repository data options, Gemini as external service; AI role = Gemini reasons over supplied context, the Git executor is a separate server-side component that accepts only policy-permitted commands; Data source = local scanner or configured public GitHub fixture for repository data, CI/CD and PR remain scenario-driven; Demo cue = trace browser -> Express -> safety/executor -> Git, show Gemini as separate external service.

**Visual Focus on Slide 12:** The C4 container architecture diagram, trust boundaries, Express gateway on port 3004, secret redactor, and execution pipeline.

### Verbatim Spoken Presentation:
> “On Slide 12, we detail GitPet’s architecture, designed with strict separation of concerns across deliberate trust boundaries:
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

### Technical backup (presenter notes):
- Gemini genuinely used by Companion chat/analyze, Live Audio (`/live` WebSocket), image generation/edit/approval, and the `/api/ai/release-readiness` route.
- Live Audio: if Live API setup fails, the server sends a `fallback_ready` status message, but the current client does not implement a browser SpeechRecognition fallback. Live voice requires reachable service/API credentials.
- Image studio: temporary `prev_` assets with 30-minute TTL; explicit Approve gate promotes to active avatar. Offline `generateFallbackAvatar()` synthesizes SVG badges.
- Server has selected redaction/sanitization helpers, optional Basic Auth, bounded in-memory audit buffer. These are implementation boundaries, not a fully hardened multi-tenant production service.

### Transition to Slide 13:
- **Faris:** *“Let’s close with what this prototype demonstrates and how to try the app.”*

---

## Slide 13: CLOSING (Ambient DevSecOps + Live Launch)

**Presenter:** **Faris**
**Target time:** 1 minute 0 seconds
**Message map:** Problem = recap the engineering story and state the demo boundary honestly; Value = five ideas summarize what the prototype demonstrates and what it does not claim; What the app demonstrates = ambient awareness, contextual AI, integrated views, bounded Git actions, engineering evidence; AI role = Gemini for explanation/drafting, deterministic policy and human approval govern supported Git execution; Data source = sandbox by default, live Git only when explicitly selected, CI/CD and PR are scenarios; Demo cue = open Q&A, if demoing start from sandbox and label seeded data.

**Visual Focus on Slide 13:** The 5 core pillars summary, test verification badges (31 Vitest tests, 100% pass), local launch command (`npm run dev`), repository link, and Q&A invitation.

### Verbatim Spoken Presentation:

> “To summarize, GitPet demonstrates five core ideas:
> 1. **Ambient Awareness:** 18 physical symptoms and a 0–100 HP health pool visualize the selected app state.
> 2. **Grounded Multimodal Assistance:** Tiered Gemini Flash reasoning (3.1 Lite, 3.6 Flash, 3.7 Flash), Live Audio WebSocket streaming, and custom avatar styling. These require network/API availability where applicable.
> 3. **Integrated DevSecOps Views:** Brings Git topology and working-tree views together with scenario-driven CI/CD, PR, readiness, and risk screens.
> 4. **Bounded Git Actions:** Deterministic policy checks, preview, and explicit write opt-in constrain supported Git execution; they do not provide a universal rollback guarantee.
> 5. **Engineering Evidence:** 31 automated Vitest tests, threat-model and governance documentation, a runbook, and SBOM tooling are included. These are project artifacts, not proof of production readiness.
>
> GitPet makes DevSecOps health ambient, explainable, and safely actionable.
>
> You can launch the platform locally right now with `npm run dev` on port 3004.
>
> On behalf of Team 05, **Ribbon Patrol**, thank you for your time at AWS Community Day Ottawa 2026. We welcome your questions!”

### Slide Delivery Cues:
- State the demo boundary: sandbox by default; live Git only when explicitly selected; CI/CD and PR are scenarios.
- Do not call the prototype production-ready solely because it has tests, threat-model documentation, or governance artifacts.

### Technical backup (presenter notes):
- 31 Vitest tests: `tests/security.test.ts` (9), `tests/executor.test.ts` (19), `tests/markdown.test.ts` (3). The suite does not contain a dedicated XSS test.
- `npm run sbom` generates a CycloneDX SBOM.

---

## Rehearsal Q&A Playbook for Judges

### Q1: How does GitPet prevent prompt injection or jailbreak attacks from executing destructive shell commands?
* **Answer (Lucas):** *“AI output is not passed directly to a shell. Supported Git commands are parsed and checked by the safety policy, and execution uses argv-based `child_process.execFile`. The UI provides a preview; server-side policy is checked again, and writes require `GITPET_ALLOW_WRITES=true`. These controls reduce risk but do not prove the system is immune to every failure or destructive outcome.”*

### Q2: What happens if the Gemini API key is missing or quota is exhausted (HTTP 429)?
* **Answer (Lucas):** *“The model chain tries configured alternatives for availability/quota errors. Some chat/analyze requests can use a deterministic rule-based fallback when Gemini is unavailable, but this is not a universal offline mode. Other features may require the API and network.”*

### Q3: How does the DAG visualizer scale with large commit histories?
* **Answer (David):** *“The DAG normalizer (`gitDagNormalizer.ts`) arranges commit and parent data into lanes and merge-base relationships for SVG display. The current app does not claim a specific large-history render bound; performance should be measured against the target repository size.”*

### Q4: How is human-in-the-loop safety guaranteed for write operations?
* **Answer (Lucas):** *“Live Git writes are disabled by default and require `GITPET_ALLOW_WRITES=true`. The user previews supported commands, then the server re-evaluates the policy when execution is requested. Preview content and HEAD anchors are not a full filesystem diff or guaranteed rollback.”*

### Q5: Does the AI Commit Generator call Gemini?
* **Answer (David):** *“No. The modal is labeled AI, but it regenerates template text locally from the selected type and scope. Its Apply action routes a chat prompt rather than committing. It does not call Gemini.”*

### Q6: Does the Release Readiness page call the AI synthesis endpoint?
* **Answer (David):** *“The `/api/ai/release-readiness` route exists and can request Gemini synthesis when configured, but the standard `ReleaseReadinessPage` calls `calculateReleaseReadiness(state)` locally and is not wired to that endpoint. The score is purely deterministic.”*

---

## Operational Emergency Fallback Script

*Use this script if the live network connection or local server experiences unexpected downtime during the live demo:*

> *“While we restore the local development server, the important workflow remains identical across all views:
>
> GitPet maps the selected scenario or scanned Git repository state into Byte’s visual state, can provide AI-assisted explanations, evaluates supported Git commands through static and contextual policies, and requires user review plus server write opt-in before permitted writes.
>
> Some chat/analyze paths can use deterministic guidance without Gemini. This is feature-specific: live voice and Gemini image/TTS functions may be unavailable, while the CI/CD and PR examples remain seeded demo data.”*
