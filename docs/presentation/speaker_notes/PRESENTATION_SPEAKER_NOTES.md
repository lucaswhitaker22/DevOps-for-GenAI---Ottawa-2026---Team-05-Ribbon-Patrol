# GitPet Presentation Speaker Notes

**Deck:** `GitPet_Professional_Deck 11.pptx` (13 slides)
**Target duration:** About 20 minutes, including slide changes and short app walkthrough cues
**Speaking order:** Aliasgar (slides 1-3), Lucas Whitaker (slides 4-6), David Castelli (slides 7-10), Faris (slides 11-13)
**Build team credited on the deck:** Lucas Whitaker and David Castelli, Ribbon Patrol (Team 05)
**Demo:** `npm run dev` at `http://localhost:3004`

## Rehearsal plan

Aim for a measured 125-135 spoken words per minute. The slide timings total about 20 minutes of spoken material; allow roughly 35 seconds for handoffs, slide changes, and app navigation for a total near 20:40. Keep the short bold cues as stage directions, not spoken text. If running long, shorten examples, not implementation caveats.

| Slides | Presenter | Target |
|---|---|---:|
| 1-3 | Aliasgar | 5:00 |
| 4-6 | Lucas | 5:15 |
| 7-10 | David | 5:40 |
| 11-13 | Faris | 4:10 |
| Transitions / app navigation | All | 0:35 |
| **Total** |  | **20:40** |

Per-slide timing: 1:25, 1:15, 2:20, 1:50, 1:35, 1:50, 1:30, 1:10, 1:10, 1:50, 1:30, 1:40, 1:00.

## Message map used on every feature slide

For each deck feature, state in this order so an engineering audience can connect it to their own work:

1. **Problem** — the developer/operations pain the feature addresses.
2. **Value** — why it matters to delivery, reliability, or safe change.
3. **What the app demonstrates** — the actual prototype behavior.
4. **AI role** — what Gemini contributes, or explicitly that there is no AI.
5. **Data source** — live, local, or scenario-driven; and the caveat.
6. **Demo cue / transition** — what to show and how to hand off.

## Demo truth to preserve throughout

- The six workspaces are Companion, Repository, CI/CD, Pull Requests, Release Gate, and Risk.
- The app starts with deterministic scenario data. A user can explicitly switch to a local Git scan; a configured public GitHub fixture (`farisnour/gitpet-acme-corp-ecommerce-store`) can also provide repository history. The app is not a background repository monitor.
- CI/CD logs, flaky-test examples, CVEs, PR details, review comments, and PR action controls are scenario/UI demonstrations, not live CI or GitHub integrations.
- Gemini calls require a reachable service and configured credentials. Model output is assistance, not a verified fact source. Fallback is available in selected chat/analyze paths, not every feature.
- Git writes are disabled unless `GITPET_ALLOW_WRITES=true`. The safety layer warns/suggests; for example, it does not silently rewrite `git stash` to include `-u`. Preview and HEAD hashes are not a universal diff or rollback guarantee.
- The release score and exported report are advisory. The sign-off control does not deploy.
- UI labels such as "AI Commit Generator," "AI Resolution Reply," "CI/CD Telemetry," and "Release Gate" describe intended workflows; the underlying controls are local UI or scenario behavior unless explicitly stated otherwise.

## Engineering term glossary (use as needed in setup lines)

- **Ahead / behind:** ahead = commits that exist locally but not on the tracking branch; behind = tracking-branch commits not yet local. Divergence is when both are non-zero.
- **DAG / merge base:** the commit graph is a directed acyclic graph; the merge base is the lowest common ancestor of two refs, used to compute divergence and rebase ranges.
- **Stash / untracked:** `git stash` snapshots tracked changes; `-u` adds untracked files to that snapshot. Without `-u`, untracked files stay in the working tree and can be lost on a subsequent checkout or rebase.
- **Argv execution:** Git is invoked through `child_process.execFile` with an argument array rather than a shell string, so shell control characters are not interpreted.
- **Weighted score vs. deductions:** Release Readiness sums five weighted pillars (additive, 0-100). The Health Pool starts at 100 and subtracts seven deductions (subtractive, floored at 0). They answer different questions and use different math.

---

# Aliasgar - Slides 1-3 (5:00)

## Slide 1: Title and mission (1:25)

**Problem:** Developers and release managers lose time correlating signals across Git, CI, reviews, and security dashboards, and AI coding assistants can propose destructive commands.

**Value:** A single companion surface that makes repository and delivery state legible without granting an LLM unrestricted authority.

**What the app demonstrates:** GitPet is an ambient DevSecOps repository companion with a virtual mascot, Byte, that reflects the selected scenario or an explicitly scanned local Git workspace across six workspaces.

**AI role:** Optional tiered Gemini chat explains supplied context; it does not execute commands.

**Data source:** Sandbox scenario by default; local Git scan or a configured public GitHub fixture when explicitly selected. Not a background monitor.

**Demo cue:** Start on the title slide; pause; point to the three columns.

**[Start on title slide. Pause, greet the room, then point to the three columns.]**

Hello everyone, and thank you for joining us.

We are presenting GitPet, an ambient DevSecOps repository companion, for the DevOps for GenAI track at AWS Community Day Ottawa 2026. Our team name is Ribbon Patrol. I am Aliasgar, and I will open the presentation; Lucas, David, and Faris will take the next sections.

The question behind GitPet is practical: can Generative AI help developers understand repository and delivery risks without giving a model unrestricted authority to change code or infrastructure?

A developer's working context is spread across Git history, local edits, pipeline results, review conversations, and security findings. A chatbot can answer a question, but the person still has to discover the relevant signal, work out whether it applies, and decide what action is safe.

GitPet explores a different interaction: Byte, a virtual companion, reflects the currently selected repository scenario or an explicitly scanned local Git workspace. It combines a visual state model, repository tools, optional Gemini assistance, and deterministic command checks. It is a working prototype, not a production integration with every DevOps provider.

Our short promise is: see risk, understand evidence, resolve safely. We will show what that means in the interface and be clear about which information is live and which is simulated.

**[Advance.]**

## Slide 2: Three developer crises (1:15)

**Problem:** Three recurring delivery friction points: context blindness, excessive AI agency, and buried telemetry.

**Value:** Naming them lets us show where each GitPet workspace responds.

**What the app demonstrates:** Six workspaces bring Git, CI, PR, readiness, and risk signals into one interface; CI/CD and PR panels use scenarios rather than live service connections.

**AI role:** AI is positioned as assistance, not as an autonomous actor.

**Data source:** Scenario-driven for CI/CD and PR; live only for explicitly selected Git sources.

**Demo cue:** Point to the three problem cards; pause.

We grouped the problem into three related challenges.

First is context blindness. Repository state is often inspected in one place, test failures in another, and pull-request feedback somewhere else. Developers must correlate those signals themselves. GitPet's six workspaces demonstrate how the information might be brought into one interface; the CI/CD and PR panels in this prototype use scenarios rather than live service connections.

Second is excessive agency. A command can be valid syntax and still be dangerous. A force push may overwrite work on a shared branch. A hard reset or cleanup can discard changes. Asking a language model to "be careful" is not an enforcement boundary.

Third is buried telemetry. Logs, branch relationships, review feedback, and vulnerability findings are hard to interpret when viewed as disconnected lists. A useful assistant should help make the state legible, while still making clear what evidence it actually has.

We are not claiming that every developer loses a specific percentage of time or that GitPet solves these industry-wide problems. Our prototype demonstrates a focused response: make state easier to notice, provide contextual explanation, and constrain supported Git actions with code-level checks and explicit user approval.

**[Advance.]**

## Slide 3: Notice, Understand, Resolve (2:20)

**Problem:** The three crises need a repeatable workflow, not a bag of features.

**Value:** A three-stage loop gives the audience a mental model for every following slide.

**What the app demonstrates:** Notice (18 physical symptoms + Byte visuals/audio), Understand (Gemini chat over supplied context), Resolve (policy-checked Git preview/execution).

**AI role:** Understand uses Gemini when configured; Notice and Resolve are deterministic.

**Data source:** Notice state is scenario or scanned; Resolve live execution requires `GITPET_ALLOW_WRITES=true`.

**Demo cue:** Trace the loop; hand to Lucas.

The product story follows three steps: Notice, Understand, Resolve.

Notice is the companion layer. The app models 18 physical symptoms, including Git conditions such as upstream drift, unpushed work, detached HEAD, conflicts, and clean synchronization, as well as seeded build, flaky-test, vulnerability, PR, and infrastructure scenarios. Byte's posture, health aura, and procedural Web Audio cues reflect the active app state. The important qualifier is that this is not a daemon polling all repositories in the background: the initial state is a sandbox, and local scanning is an explicit action.

Understand is contextual assistance. When Gemini is configured, chat requests can include repository details such as branch name, ahead/behind counts, detached state, and working-tree paths. Fast, general, and deep model tiers are available. The model can help explain the supplied context, but an answer is not automatically verified; seeded CI, PR, and CVE examples should not be presented as findings from a live provider.

Resolve is guided action. Supported Git commands are evaluated by deterministic safety policy and can be previewed. The server checks the policy again when execution is requested, and write execution is disabled by default. A preview, a suggested command, or a before/after HEAD hash is not a promise that every filesystem change has a complete diff or that every operation can be undone.

The point is not to remove developer judgment. The point is to make the state easier to interpret and to put meaningful controls around the actions that the prototype can execute.

Lucas will now explain how the AI options and command safety layers work.

**[Handoff to Lucas.]**

---

# Lucas - Slides 4-6 (5:15)

## Slide 4: AI assistance, personas, and model tiers (1:50)

**Problem:** A single chat tone does not fit a junior learning Git, an architect diagnosing a rebase, and a release engineer checking compliance.

**Value:** Personas and tiers let the developer shape the answer without changing safety policy.

**What the app demonstrates:** Four prompt personas (Byte Mascot, Senior Architect, Safety Auditor, Git Tutor) and fast/general/deep Gemini model chains.

**AI role:** Gemini reasoning; personas are prompt roles, not separately privileged agents.

**Data source:** Repository context (branch, ahead/behind, working-tree paths) supplied to supported chat; CI/PR remain scenario data.

**Demo cue:** Compare persona tones; show tier control.

Thanks, Aliasgar.

We have seen Byte reflect a repository state. Now the question is: when a developer asks why the state matters, how does the app shape the answer? Companion offers four prompt personas: Byte Mascot for everyday guidance, Senior Architect for Git topology and rebases, Safety Auditor for risk and preservation, and Git Tutor for concepts such as commits, HEAD, and the index. They shape response style; they are not agents with different system permissions.

The user selects fast, general, or deep routing. Their first-choice models are `gemini-3.1-flash-lite`, `gemini-3.6-flash`, and `gemini-3.7-flash`, respectively, with additional models in each same-tier fallback chain. A few request keywords can influence routing; this is simple app logic, not a benchmark of task difficulty.

For availability or quota errors, the server can try the next model in that chain. Some chat/analyze paths also have deterministic fallback; Live Audio and image generation still need their services.

For chat, the server can add repository and branch names, upstream, ahead/behind counts, detached/stale flags, working-tree paths/status, and remote commits behind. Ahead means local-only commits; behind means tracking-branch commits not yet local. CI/PR panels remain scenario data. Model output is advice to verify, not a guaranteed citation or undo plan.

**[Demo cue: select one persona and compare the response tone, then show the tier control. If credentials/network aren't ready, explain the configured model chains rather than claiming a live response.]**

The model helps explain and propose; the next two slides show the code that decides which Git commands are refused or need contextual review.

## Slide 5: Static safety rules (1:35)

**Problem:** A hallucinated or injected command can be syntactically valid and still destructive.

**Value:** Deterministic static rules catch universally dangerous Git commands regardless of repository state.

**What the app demonstrates:** Layer 1 hard-blocks eight command classes, warns on `rebase --onto`, and rejects non-Git/shell-control input; execution uses argv.

**AI role:** No AI. The model can suggest; the safety engine decides what is permitted.

**Data source:** Static policy in `safety.ts`; server rechecks at execution; writes require `GITPET_ALLOW_WRITES=true`.

**Demo cue:** Show blocked examples and safer suggestions; do not imply the blocked command was rewritten.

Layer 1 is a set of checks that do not depend on branch or working-tree state. It hard-blocks eight cases: unconditional force push; deleting a remote ref; `reset --hard`; `git clean`; `branch -D`; stash drop/clear; history rewriting; and checkout of paths that can overwrite edits.

`rebase --onto` gets a warning, not a hard block, because it rewrites commit identities. Separate parser and allowlist checks reject non-Git commands, disallowed subcommands, and shell control characters; `&&` is parsed as an explicit chain of Git commands.

For example, `git checkout main -- app.ts` restores that path from another tree and can overwrite local edits. That's why the policy treats path checkout differently from simply switching branches.

Where possible, a rule suggests an alternative: `--force-with-lease`, `reset --keep`, or merged-only `branch -d`. Suggestions are not applied automatically, and a lease-checked push still requires judgment about the remote state.

For execution, the server passes Git and its arguments separately through `child_process.execFile` rather than asking a shell to parse a command string. The server checks policy again at execution time. Writes require `GITPET_ALLOW_WRITES=true`, off by default.

These controls constrain the supported Git executor; they do not make the whole app immune to every failure. The executor suite has 19 tests for selected rules, parsing, and execution cases, not exhaustive threat coverage.

**[Show the blocked examples. Mention the safer suggestion where the policy provides one, but don't imply the blocked command was rewritten.]**

## Slide 6: Contextual safety lints (1:50)

**Problem:** A command valid in general can be unsafe for this repository right now.

**Value:** Layer 2 checks working-tree, stash, branch, and in-progress-operation state to catch context-specific hazards.

**What the app demonstrates:** Seven contextual lints; the signature example is `stash-misses-untracked` warning and suggesting `-u`.

**AI role:** No AI. Deterministic lints; guidance flows can use supplied scenario state, live preview/execution uses scanned state.

**Data source:** Working-tree, stash, branch ahead/behind, in-progress-operation state.

**Demo cue:** Point to missing `-u` vs corrected command; emphasize user chooses the suggestion.

Layer 1 cannot catch a command that is valid in general but unsafe for this repository. A contextual lint checks working-tree, stash, branch ahead/behind, or in-progress-operation state. Guidance flows can use supplied scenario state; live preview/execution paths also scan the configured local Git workspace.

For example, `git stash push -m "wip"` saves tracked changes but omits untracked files. If those files exist, `stash-misses-untracked` warns and suggests `-u`, which includes them. GitPet does not rewrite or run the command: the user chooses the suggestion, reviews it, and must have writes enabled for live execution.

In other words, a stash is a temporary snapshot, not a commit; `-u` adds untracked files to that snapshot.

The other six checks are: `stash-pop-empty` warns on an empty stash; `pull-dirty-tree` warns when pull/merge has no stash or autostash protection; `unresolved-conflicts` blocks pull, merge, switch, or checkout while conflicts remain; `operation-in-progress` blocks unrelated mutations during a paused rebase/merge but allows continue, abort, skip, staging fixes, and read-only inspection; `ff-only-on-diverged` blocks an impossible fast-forward-only pull and suggests rebase; `push-while-behind` warns that a push will be rejected. Findings are targeted checks, not a formal safety proof.

Preview is a dry run: it reports the command steps but is not a universal file-level diff. Execution records `headBefore` and `headAfter`; they can aid investigation but cannot restore every uncommitted edit or reverse every operation.

That is the boundary to remember: contextual policy can catch specific hazards, but the person remains responsible for reviewing the suggestion and the repository state.

David will now show the repository tools and scenario-based delivery workspaces.

**[Handoff to David.]**

---

# David - Slides 7-10 (5:40)

## Slide 7: Repository workspace and DAG (1:30)

**Problem:** A linear `git log` hides branch divergence, merge bases, and detached-HEAD hazards.

**Value:** A topological DAG and a working-tree diff studio make repository state legible and let developers stage selectively.

**What the app demonstrates:** DAG normalizer renders commit/parent data as multi-lane SVG; Diff Studio shows modified files, search, checkbox staging, and unified diffs; stash inspection/restoration.

**AI role:** The "AI Conventional Commit" control is labeled AI, but it regenerates template text locally; it does not call Gemini. Its Apply action sends a chat prompt rather than committing.

**Data source:** Deterministic DAG normalization and diff parsing; local UI state for staging/stash controls.

**Demo cue:** Show graph + commit drawer; move to working-tree file selection/diff.

Thanks, Lucas.

The Repository workspace combines a commit graph with working-tree tools. The DAG normalizer arranges commit and parent data into lanes for SVG rendering, highlights relationships such as HEAD and merge base, and identifies role categories such as upstream, local-ahead, remote-behind, detached, and conflict/hazard states. Selecting a node opens commit details. This is a visual explanation of the graph data supplied to the app, not a claim that every possible Git history has been stress-tested at arbitrary scale.

The Working Tree and Diff Studio displays modified files, supports searching and selecting files for staging, and renders unified diff content. Staging is granular: a user can select a file instead of staging everything. The workspace also includes stash inspection and restoration controls.

If Gemini is configured, the AI Conventional Commit tool can use staged diff data to draft a message. Treat the generated text as a draft to review, not as an authoritative classification. The app also shows a session audit history; it is in-memory, not an immutable external audit record.

**[Demo cue: show the graph and one commit drawer; move to working-tree file selection/diff. If the local workspace is unavailable, stay in the prepared scenario rather than implying a live scan.]**

## Slide 8: CI/CD scenario walkthrough (1:10)

**Problem:** When a build goes red, the developer jumps between CI dashboards, logs, and scanner outputs to find the cause.

**Value:** A single triage view from failure signal to proposed next step demonstrates the intended workflow.

**What the app demonstrates:** Five illustrative stages (lint, tests, security, build, deploy) with example log lines, a flaky-test card, and a seeded CVE card.

**AI role:** No AI on this page. A user may separately ask Byte about the selected scenario.

**Data source:** Scenario-driven. Not connected to Jenkins, GitHub Actions, CodeBuild, or another CI provider; no dependency scanner.

**Demo cue:** Open one stage log; label flaky-test/CVE cards as scenario content.

The CI/CD workspace shows five illustrative stages: lint, tests, security scan, artifact build, and staging/deployment. Expanding a stage displays example log lines supplied by the selected scenario. These are not fetched from Jenkins, GitHub Actions, CodeBuild, or another CI provider.

The flaky-test card displays scenario-provided test and pass-rate values. Its control simulates changing the app state; it does not mark a test skipped, edit a test file, or unblock a real pipeline. Similarly, the CVE card presents seeded vulnerability data. There is no live package scanner here, and the demo action does not create a Dependabot pull request.

This still makes the workflow useful as a prototype: it illustrates how a developer might move from a failure signal to a triage view and a proposed next step. The next engineering step would be to connect real pipeline and scanner sources, define their data contracts, and ensure the remediation controls perform auditable provider operations.

**[Open one stage log; point out that it is an example. Then show the flaky-test/CVE cards and explicitly label them scenario content.]**

## Slide 9: Pull Request scenario (1:10)

**Problem:** Review bottlenecks and stale PRs slow delivery, and reply/merge controls in tools can be opaque.

**Value:** A PR view that surfaces wait time, approvals, and comments demonstrates the intended review loop.

**What the app demonstrates:** Sample PR, status, comments, scenario wait value; an editable example reply; a Squash & Merge control.

**AI role:** No AI. The reply composer fills hardcoded local text; it does not send the thread to Gemini or post to GitHub.

**Data source:** Scenario-driven. Squash & Merge changes local UI state; it does not merge a GitHub PR or prune a branch.

**Demo cue:** Point out PR values are scenario data and the reply is an editable UI example.

The PR workspace presents a sample PR, status, comments, and a scenario wait value. For the displayed example, the component's scenario fields include one approval and one requested change; these counts are not fetched from GitHub branch protection. The comment paths and text are also scenario data.

The reply control fills an editable example response locally. It does not send the review thread to Gemini and does not post a comment to a remote PR. The Squash and Merge control changes local UI state; it does not merge a GitHub PR or prune a branch. Other PR controls should be presented with the same caution: they are prototype interactions, not live provider operations.

This lets us demonstrate the user experience we'd want around review bottlenecks while being honest about the missing integration. A production version would need authenticated GitHub API access, permission checks, provider-side state refresh, and confirmation before posting or merging.

The next section moves from feature workspaces to the advisory readiness view.

## Slide 10: Release readiness report (1:50)

**Problem:** Release managers need a fast, consistent summary of whether the current state is shippable.

**Value:** An advisory five-pillar scorecard makes the decision legible without pretending to be a deployment gate.

**What the app demonstrates:** `releaseReadiness.ts` computes five weighted pillars locally; the page renders the score, status, blockers, and export/sign-off controls.

**AI role:** A separate `/api/ai/release-readiness` endpoint can request Gemini synthesis when configured, but the current page does not call it; the score is purely local.

**Data source:** Current app state, which may include scenario inputs for CI, coverage, vulnerability, and PR values.

**Demo cue:** Point to each weight, the score/status, and export controls; say "advisory report," not "deployment authorization."

The previous workspaces showed repository tools and example CI/PR states. Release Readiness combines the selected app state's delivery signals into an advisory report.

The local `releaseReadiness.ts` function scores five dimensions: tests passing (25%), code coverage (20%, 80% target), vulnerabilities (25%, zero high/critical target), PR approvals (15%), and branch freshness (15%). It scores each pillar, multiplies by the weight, then rounds the weighted sum.

The 78-percent Caution example is calculated locally from app state. CI, coverage, vulnerability, and PR values may be scenario inputs, not results from a CI runner, coverage service, package scanner, or branch-protection API. In plain terms, this score summarizes the currently loaded inputs; it does not certify that a real release is safe.

The status is Blocked with blockers or a score below 70, Caution/Review with warnings or a score below 85, and Ready to Ship otherwise. A separate `canShip` flag requires no blockers and at least 80 points, so it can disagree with the label between 80 and 84. Treat this as prototype behavior, not a production release policy.

When the Gemini key is configured, the release-readiness endpoint can request an AI summary. The score remains a local calculation, and the standard page is not wired to call that endpoint. Users can copy a Markdown summary or download JSON, but those are generated reports, not signed attestations. The sign-off button changes UI state only.

**[Point to each of the five weights, then the current score/status and the export controls. Say "advisory report," not "deployment authorization."]**

---

# Faris - Slides 11-13 (4:10)

## Slide 11: Risk score and health pool (1:30)

**Problem:** A release-readiness score summarizes shippability, but it does not show what is actively eroding repository health.

**Value:** A separate seven-factor deduction model surfaces the current hazards so a developer can prioritize remediation.

**What the app demonstrates:** Risk workspace starts at 100 HP, subtracts seven deductions, clamps at zero, and labels state-aware health.

**AI role:** No AI in scoring. Remediate with Byte passes context to Companion for guidance; it does not perform the fix.

**Data source:** Current app state, which may be scenario data; not live CI/PR/scanner feeds.

**Demo cue:** Show the score, one factor, filters, and a remediation link; do not claim real-time telemetry.

Thanks, David.

The Risk workspace answers a different question from Release Readiness. It starts at 100 health points, subtracts penalties across seven factors, and clamps the result at zero. Read its own displayed score; it is not the previous slide's 78-percent metric.

1. Branch divergence and related work-loss hazards: up to 35 points.
2. Failed/flaky tests and deployment failures: up to 28.
3. Secrets and security-policy deviations: up to 30.
4. Vulnerabilities: 12 for the lower-severity path or 22 for high/critical findings.
5. Code smells or working-tree sprawl: up to 15.
6. Unreviewed commits and PR review lag: up to 15.
7. Large PR scope: 8.

The triggers use state such as branch conflict/drift, failed or flaky pipelines, credential findings, review status, and diff size. Those values may be seeded scenarios, not live CI, PR, or scanner feeds. Health labels also consider severity: a conflict can be Blocked even if its numeric score alone suggests otherwise.

The labels are Healthy, Attention, Blocked, and Unsafe. Destructive risk can be Unsafe; conflicts or severe test/security conditions can be Blocked. They are state-aware labels, not simply fixed score ranges. The filters show all factors, critical hazards, warnings, or healthy items. Remediate with Byte passes context to Companion for guidance; it does not perform the fix.

**[Show the score, one factor, then filters and a remediation link. Do not claim real-time CI/PR telemetry.]**

These two scores answer different questions: Release Readiness summarizes five delivery dimensions, while the Health Pool applies seven risk deductions to the current state. Neither is an external release approval.

## Slide 12: Architecture and boundaries (1:40)

**Problem:** Judges and architects need to see where trust boundaries sit and which component owns enforcement.

**Value:** A clear separation prevents the model from directly launching a process in the local repository.

**What the app demonstrates:** React frontend, Express server on port 3004, safety/executor pipeline for supported Git, two repository data options, and Gemini as an external service.

**AI role:** Gemini reasons over supplied context; the Git executor is a separate server-side component that accepts only policy-permitted commands.

**Data source:** Local scanner or configured public GitHub fixture for repository data; CI/CD and PR remain scenario-driven.

**Demo cue:** Trace browser -> Express -> safety/executor -> Git; show Gemini as a separate external service.

The frontend is a React application, with six workspaces selected in the UI. The browser communicates with the Node/Express server on port 3004. The server provides REST routes and a `/live` WebSocket; Gemini calls require configured credentials and network access.

For repository data, there are two options: the local scanner reads the configured Git workspace when requested, and the configured public GitHub fixture can supply repository history. That should not be confused with the other panels: CI/CD and PR views remain scenario-driven.

Supported Git writes flow through `safety.ts` and `executor.ts`: parsing and allowed-subcommand checks, static rules, contextual findings, dry-run preview, a server-side recheck, then argv-based Git execution. Writes remain disabled unless `GITPET_ALLOW_WRITES=true`. The server also has selected redaction/sanitization helpers, optional Basic Auth when configured, and a bounded in-memory audit buffer. The image studio uses temporary preview assets. These are implementation boundaries, not a claim of a fully hardened multi-tenant production service.

The key separation is: Gemini can reason over supplied context, but the model does not directly launch a process in the local repository. The app's Git executor is a separate server-side component that accepts only commands permitted by its policy.

**[Trace browser -> Express -> safety/executor -> Git. Show Gemini as a separate external service. Mention optional authentication and write configuration only if asked.]**

## Slide 13: Conclusion and Q&A (1:00)

**Problem:** Recap the engineering story and state the demo boundary honestly.

**Value:** Five ideas summarize what the prototype demonstrates and what it does not claim.

**What the app demonstrates:** Ambient awareness, contextual AI, integrated views, bounded Git actions, engineering evidence.

**AI role:** Gemini for explanation/drafting; deterministic policy and human approval govern supported Git execution.

**Data source:** Sandbox by default; live Git only when explicitly selected; CI/CD and PR are scenarios.

**Demo cue:** Open Q&A; if demoing, start from sandbox and label seeded data.

To close, GitPet demonstrates five ideas.

First, ambient awareness: Byte maps the selected state into physical symptoms and a health score. Second, contextual AI assistance: Gemini can help explain supplied repository state, with model availability and accuracy caveats. Third, integrated views: the app combines repository tools with scenario-driven CI/CD, PR, readiness, and risk pages. Fourth, bounded Git actions: policy, preview, and explicit server write opt-in constrain supported command execution. Fifth, engineering evidence: the project has 31 passing Vitest tests across three suites, threat-model and governance documentation, a runbook, and SBOM tooling. Those artifacts support the prototype; they are not production certification.

To run the demo, use `npm run dev` and open `http://localhost:3004`. Thanks for joining us. We welcome your questions.

**[Open Q&A. If demonstrating the app, begin from the sandbox mode and label seeded CI/CD and PR data before interacting.]**

---

## Presenter handoff checklist

- Aliasgar introduces the build team as Lucas Whitaker and David Castelli, then hands to Lucas after slide 3.
- Lucas hands to David after slide 6; emphasize the `-u` item is a suggested command, not an automatic rewrite.
- David labels CI/CD and PR panels as scenarios, presents the advisory Release Readiness report, then hands to Faris.
- Faris covers the Risk/Health Pool, architecture, closes, and takes Q&A.
- Keep a local sandbox selected for predictable demos. Use live local Git scan only if the configured workspace and repository state have been checked before presenting.
