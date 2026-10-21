# GitPet Presentation Speaker Notes

**Deck:** `GitPet_Professional_Deck 11.pptx` (13 slides)  
**Target duration:** About 20 minutes, including slide changes and short app walkthrough cues  
**Speaking order:** Aliasgar (slides 1-3), Lucas Whitaker (slides 4-6), David Castelli (slides 7-9), Lucas Whitaker (slides 10-11), Faris (slides 12-13)
**Build team credited on the deck:** Lucas Whitaker and David Castelli, Ribbon Patrol (Team 05)  
**Demo:** `npm run dev` at `http://localhost:3004`

## Rehearsal plan

Aim for a measured 125-135 spoken words per minute. The timings below total about 20 minutes of spoken material; allow about 40 seconds across handoffs, slide changes, and app navigation for a total near 20:40. Keep the short bold cues as stage directions, not spoken text. If running long, shorten the examples, not the implementation caveats.

| Slides | Presenter | Target |
|---|---|---:|
| 1-3 | Aliasgar | 5:00 |
| 4-6, 10-11 | Lucas | 8:30 |
| 7-9 | David | 3:50 |
| 12-13 | Faris | 2:40 |
| Transitions / app navigation | All | 0:40 |
| **Total** |  | **20:00** |

## Demo truth to preserve throughout

- The six workspaces are Companion, Repository, CI/CD, Pull Requests, Release Gate, and Risk.
- The app starts with deterministic scenario data. A user can explicitly switch to a local Git scan; a configured public GitHub fixture can also provide repository history. The app is not a background repository monitor.
- CI/CD logs, flaky-test examples, CVEs, PR details, review comments, and PR action controls are scenario/UI demonstrations, not live CI or GitHub integrations.
- Gemini calls require a reachable service and configured credentials. Model output is assistance, not a verified fact source. Fallback is available in selected chat/analyze paths, not every feature.
- Git writes are disabled unless `GITPET_ALLOW_WRITES=true`. The safety layer warns/suggests; for example, it does not silently rewrite `git stash` to include `-u`. Preview and HEAD hashes are not a universal diff or rollback guarantee.
- The release score and exported report are advisory. The sign-off control does not deploy.

---

# Aliasgar - Slides 1-3 (5:00)

## Slide 1: Title and mission (1:25)

**[Start on title slide. Pause, greet the room, then point to the three columns.]**

Hello everyone, and thank you for joining us.

We are presenting GitPet, an ambient DevSecOps repository companion, for the DevOps for GenAI track at AWS Community Day Ottawa 2026. The project team credited on the deck is Ribbon Patrol: Lucas Whitaker and David Castelli. I am Aliasgar, and I will open the presentation; Lucas, David, and Faris will take the next sections.

The question behind GitPet is practical: can Generative AI help developers understand repository and delivery risks without giving a model unrestricted authority to change code or infrastructure?

A developer's working context is spread across Git history, local edits, pipeline results, review conversations, and security findings. A chatbot can answer a question, but the person still has to discover the relevant signal, work out whether it applies, and decide what action is safe.

GitPet explores a different interaction: Byte, a virtual companion, reflects the currently selected repository scenario or an explicitly scanned local Git workspace. It combines a visual state model, repository tools, optional Gemini assistance, and deterministic command checks. It is a working prototype, not a production integration with every DevOps provider.

Our short promise is: see risk, understand evidence, resolve safely. We will show what that means in the interface and be clear about which information is live and which is simulated.

**[Advance.]**

## Slide 2: Three developer crises (1:15)

We grouped the problem into three related challenges.

First is context blindness. Repository state is often inspected in one place, test failures in another, and pull-request feedback somewhere else. Developers must correlate those signals themselves. GitPet's six workspaces demonstrate how the information might be brought into one interface; the CI/CD and PR panels in this prototype use scenarios rather than live service connections.

Second is excessive agency. A command can be valid syntax and still be dangerous. A force push may overwrite work on a shared branch. A hard reset or cleanup can discard changes. Asking a language model to "be careful" is not an enforcement boundary.

Third is buried telemetry. Logs, branch relationships, review feedback, and vulnerability findings are hard to interpret when viewed as disconnected lists. A useful assistant should help make the state legible, while still making clear what evidence it actually has.

We are not claiming that every developer loses a specific percentage of time or that GitPet solves these industry-wide problems. Our prototype demonstrates a focused response: make state easier to notice, provide contextual explanation, and constrain supported Git actions with code-level checks and explicit user approval.

**[Advance.]**

## Slide 3: Notice, Understand, Resolve (2:20)

The product story follows three steps: Notice, Understand, Resolve.

Notice is the companion layer. The app models 18 physical symptoms, including Git conditions such as upstream drift, unpushed work, detached HEAD, conflicts, and clean synchronization, as well as seeded build, flaky-test, vulnerability, PR, and infrastructure scenarios. Byte's posture, health aura, and procedural Web Audio cues reflect the active app state. The important qualifier is that this is not a daemon polling all repositories in the background: the initial state is a sandbox, and local scanning is an explicit action.

Understand is contextual assistance. When Gemini is configured, chat requests can include repository details such as branch name, ahead/behind counts, detached state, and working-tree paths. Fast, general, and deep model tiers are available. The model can help explain the supplied context, but an answer is not automatically verified; seeded CI, PR, and CVE examples should not be presented as findings from a live provider.

Resolve is guided action. Supported Git commands are evaluated by deterministic safety policy and can be previewed. The server checks the policy again when execution is requested, and write execution is disabled by default. A preview, a suggested command, or a before/after HEAD hash is not a promise that every filesystem change has a complete diff or that every operation can be undone.

The point is not to remove developer judgment. The point is to make the state easier to interpret and to put meaningful controls around the actions that the prototype can execute.

Lucas will now explain how the AI options and command safety layers work.

**[Handoff to Lucas.]**

---

# Lucas - Slides 4-6 (5:00)

## Slide 4: AI assistance, personas, and model tiers (1:50)

Thanks, Aliasgar.

We have seen Byte reflect a repository state. Now the question is: when a developer asks why the state matters, how does the app shape the answer? Companion offers four prompt personas: Byte Mascot for everyday guidance, Senior Architect for Git topology and rebases, Safety Auditor for risk and preservation, and Git Tutor for concepts such as commits, HEAD, and the index. They shape response style; they are not agents with different system permissions.

The user selects fast, general, or deep routing. Their first-choice models are `gemini-3.1-flash-lite`, `gemini-3.6-flash`, and `gemini-3.7-flash`, respectively, with additional models in each same-tier fallback chain. A few request keywords can influence routing; this is simple app logic, not a benchmark of task difficulty.

For availability or quota errors, the server can try the next model in that chain. Some chat/analyze paths also have deterministic fallback; Live Audio and image generation still need their services.

For chat, the server can add repository and branch names, upstream, ahead/behind counts, detached/stale flags, working-tree paths/status, and remote commits behind. Ahead means local-only commits; behind means tracking-branch commits not yet local. CI/PR panels remain scenario data. Model output is advice to verify, not a guaranteed citation or undo plan.

**[Demo cue: select one persona and compare the response tone, then show the tier control. If credentials/network aren't ready, explain the configured model chains rather than claiming a live response.]**

## Slide 5: Static safety rules (1:35)

The first safety layer rejects dangerous commands independent of repository context. A "static" rule means the check does not need to know whether the current branch is ahead or whether files are modified. There are eight hard-block rules in the static rule set: unconditional force push, deleting a remote ref, hard reset, `git clean`, force-deleting a branch with `-D`, dropping or clearing stashes, history rewriting, and checkout of paths that can overwrite edits.

There is also a static warning for `rebase --onto` because it rewrites commit identities and may disrupt shared work. That warning is not an additional hard block. Parser and allowlist checks add separate protections: the command must begin with Git, use an allowed Git subcommand, and avoid rejected shell control characters. An explicit `&&` chain is parsed as multiple Git commands rather than handed to a shell.

Some blocked rules return a safer suggestion: an unconditional force push can suggest `--force-with-lease`, `reset --hard` can suggest `reset --keep`, and `branch -D` can suggest `branch -d`. Suggestions are not applied automatically, and `--force-with-lease` still needs the user to understand the remote branch state.

For execution, the server tokenizes arguments and invokes Git through `child_process.execFile`, not a shell command string. "Argv" simply means the executable receives the program name and its arguments as separate values, rather than asking a shell to parse one command string. The client preview is not the security boundary: the server evaluates the command again at execution time. Writes require `GITPET_ALLOW_WRITES=true`, which is off by default.

That is a meaningful control for the supported Git executor, not a claim that the entire application is immune to injection, model mistakes, or every possible Git risk. The executor tests exercise selected static rules, parsing cases, and execution behavior; tests do not prove the policy exhaustive.

**[Show the blocked examples. Mention the safer suggestion where the policy provides one, but don't imply the blocked command was rewritten.]**

## Slide 6: Contextual safety lints (1:50)

Static checks are not enough because a command can be valid but unsafe for the current repository. A contextual lint is a check against repository state: the working tree, stash list, branch ahead/behind state, or an operation already in progress. The app evaluates supplied scenario context in guidance flows; live preview/execution paths also build context by scanning the configured local Git workspace.

Take the stash example. `git stash push -m "wip"` saves tracked changes but does not include untracked files by default. If untracked files are present, GitPet's `stash-misses-untracked` lint reports a warning and suggests adding `-u`, which tells Git to include untracked files. The system does not silently alter the command or run the suggestion. The user has to choose it, review the preview, and, for a live write, have server writes enabled.

The other six contextual checks are `stash-pop-empty` for an empty stash; `pull-dirty-tree` when a pull or merge has no stash or autostash protection; `unresolved-conflicts` for pull, merge, switch, or checkout while conflicted files remain; `operation-in-progress` for unrelated mutations during a paused rebase or merge; `ff-only-on-diverged` when a fast-forward-only pull cannot work; and `push-while-behind` when upstream has commits not integrated locally. The stash, dirty-tree, and push-behind checks warn; unresolved conflicts, unrelated operations, and the impossible fast-forward case block. During an operation-in-progress, safe continuation, abort/skip, staging fixes, and read-only inspection remain allowed. Findings can include a suggestion, but the user decides what to do.

Execution is a separate step. Dry-run preview reports what would run; it is not a universal file-level diff. When execution occurs, the executor captures `headBefore` and `headAfter`, and the app can keep an in-memory audit history. Those references can help with recovery, but cannot restore every uncommitted edit or reverse every Git action.

That is the boundary to remember: contextual policy can catch specific hazards, but the person remains responsible for reviewing the suggestion and the repository state.

David will now show the repository tools and scenario-based delivery workspaces.

**[Handoff to David.]**

---

# David - Slides 7-9 (3:50)

## Slide 7: Repository workspace and DAG (1:30)

Thanks, Lucas.

The Repository workspace combines a commit graph with working-tree tools. The DAG normalizer arranges commit and parent data into lanes for SVG rendering, highlights relationships such as HEAD and merge base, and identifies role categories such as upstream, local-ahead, remote-behind, detached, and conflict/hazard states. Selecting a node opens commit details. This is a visual explanation of the graph data supplied to the app, not a claim that every possible Git history has been stress-tested at arbitrary scale.

The Working Tree and Diff Studio displays modified files, supports searching and selecting files for staging, and renders unified diff content. Staging is granular: a user can select a file instead of staging everything. The workspace also includes stash inspection and restoration controls.

If Gemini is configured, the AI Conventional Commit tool can use staged diff data to draft a message. Treat the generated text as a draft to review, not as an authoritative classification. The app also shows a session audit history; it is in-memory, not an immutable external audit record.

**[Demo cue: show the graph and one commit drawer; move to working-tree file selection/diff. If the local workspace is unavailable, stay in the prepared scenario rather than implying a live scan.]**

## Slide 8: CI/CD scenario walkthrough (1:10)

The CI/CD workspace shows five illustrative stages: lint, tests, security scan, artifact build, and staging/deployment. Expanding a stage displays example log lines supplied by the selected scenario. These are not fetched from Jenkins, GitHub Actions, CodeBuild, or another CI provider.

The flaky-test card displays scenario-provided test and pass-rate values. Its control simulates changing the app state; it does not mark a test skipped, edit a test file, or unblock a real pipeline. Similarly, the CVE card presents seeded vulnerability data. There is no live package scanner here, and the demo action does not create a Dependabot pull request.

This still makes the workflow useful as a prototype: it illustrates how a developer might move from a failure signal to a triage view and a proposed next step. The next engineering step would be to connect real pipeline and scanner sources, define their data contracts, and ensure the remediation controls perform auditable provider operations.

**[Open one stage log; point out that it is an example. Then show the flaky-test/CVE cards and explicitly label them scenario content.]**

## Slide 9: Pull Request scenario (1:10)

The PR workspace presents a sample PR, status, comments, and a scenario wait value. For the displayed example, the component's scenario fields include one approval and one requested change; these counts are not fetched from GitHub branch protection. The comment paths and text are also scenario data.

The reply control fills an editable example response locally. It does not send the review thread to Gemini and does not post a comment to a remote PR. The Squash and Merge control changes local UI state; it does not merge a GitHub PR or prune a branch. Other PR controls should be presented with the same caution: they are prototype interactions, not live provider operations.

This lets us demonstrate the user experience we'd want around review bottlenecks while being honest about the missing integration. A production version would need authenticated GitHub API access, permission checks, provider-side state refresh, and confirmation before posting or merging.

The next section moves from feature workspaces to readiness and repository-risk views. Lucas will take over.

---

# Lucas - Slides 10-11: Scoring (3:15)

## Slide 10: Release readiness report (1:55)

Thank you, David.

The last three workspaces showed repository tools and example CI and PR states. The Release Gate now combines the selected app state's delivery signals into one advisory report. It is important to understand both what the score includes and where the inputs come from.

The local `releaseReadiness.ts` function scores five dimensions: tests passing is 25 percent of the total; code coverage is 20 percent, with 80 percent as the stated target; vulnerabilities are 25 percent, with zero high or critical findings as the target; PR approvals are 15 percent; and branch freshness is 15 percent. Each pillar gets a score and status. The overall score is the rounded weighted sum: each pillar score multiplied by its weight, then added together.

The current page shows a 78-percent caution example. The number is calculated locally from the current app state. Here, CI, coverage, vulnerability, and PR values can be scenario inputs, not results fetched from a CI runner, coverage service, package scanner, or branch-protection API.

The displayed status is Blocked if blockers exist or the score is below 70. It is Caution/Review if there are warnings or the score is below 85. Otherwise it is Ready to Ship. There is also a separate `canShip` boolean that requires no blockers and a score of at least 80. Because these conditions are not identical, the boolean can differ from the displayed label in the 80-to-84 range. Treat this as a prototype inconsistency, not as a production release policy.

When the Gemini key is configured, the release-readiness endpoint can request an AI summary. The score remains a local calculation. Users can copy a Markdown summary or download JSON, but those are generated reports, not signed attestations. The sign-off button changes UI state only.

**[Point to each of the five weights, then the current score/status and the export controls. Say "advisory report," not "deployment authorization."]**

## Slide 11: Risk score and health pool (1:20)

The Risk workspace answers a different question from Release Readiness. Instead of weighted delivery pillars, it starts at 100 health points and subtracts penalties from seven risk factors. The score is capped at zero. Read the value shown for the selected scenario; don't carry the previous slide's 78 percent over as though it were the same metric.

1. Branch divergence and related work-loss hazards: up to 35 points.
2. Failed/flaky tests and deployment failures: up to 28.
3. Secrets and security-policy deviations: up to 30.
4. Vulnerabilities: 12 for the lower-severity path or 22 for high/critical findings.
5. Code smells or working-tree sprawl: up to 15.
6. Unreviewed commits and PR review lag: up to 15.
7. Large PR scope: 8.

The factor triggers use the current app state. Branch risk can rise with conflicts, detached HEAD, ahead/behind drift, stale branches, or destructive-risk state. The test factor reacts to a failed build, flaky suite, or failed deployment. The security factor reacts to exposed-secret counts or the seeded policy-breach scenario. Vulnerability deductions depend on severity. Code-smell risk uses the smell count or a large dirty working tree; review risk uses requested changes, review wait, or unreviewed commits; and large-PR risk uses PR/comment and diff-size fields.

The score is `max(0, 100 - total deductions)`. Some severe conditions, such as active conflicts or destructive-risk state, affect the health label as well as the numeric deductions. The labels are not just fixed score bands: a conflict or failed build can be Blocked even when the numeric score alone would not imply it.

The filters let users focus on all factors, critical hazards, warnings, or healthy items. A Remediate with Byte action sends context back to Companion for guidance; it does not fix the factor automatically. The intended calculation is `max(0, 100 - sum of deductions)`. This is an explainable demo score, not a live feed of CI, PR, or scanner data.

**[Show the score, one factor, then filters and a remediation link. Do not claim real-time CI/PR telemetry.]**

These two scores answer different questions: Release Readiness summarizes five delivery dimensions, while the Health Pool applies seven risk deductions to the current state. Neither is an external release approval.

Faris will now take us through the architecture and close the presentation.

**[Handoff to Faris.]**

---

# Faris - Slides 12-13 (2:40)

## Slide 12: Architecture and boundaries (1:40)

The frontend is a React application, with six workspaces selected in the UI. The browser communicates with the Node/Express server on port 3004. The server provides REST routes and a `/live` WebSocket; Gemini calls require configured credentials and network access.

For repository data, there are two options: the local scanner reads the configured Git workspace when requested, and the configured public GitHub fixture can supply repository history. That should not be confused with the other panels: CI/CD and PR views remain scenario-driven.

Supported Git writes flow through `safety.ts` and `executor.ts`: parsing and allowed-subcommand checks, static rules, contextual findings, dry-run preview, a server-side recheck, then argv-based Git execution. Writes remain disabled unless `GITPET_ALLOW_WRITES=true`. The server also has selected redaction/sanitization helpers, optional Basic Auth when configured, and a bounded in-memory audit buffer. The image studio uses temporary preview assets. These are implementation boundaries, not a claim of a fully hardened multi-tenant production service.

The key separation is: Gemini can reason over supplied context, but the model does not directly launch a process in the local repository. The app's Git executor is a separate server-side component that accepts only commands permitted by its policy.

**[Trace browser -> Express -> safety/executor -> Git. Show Gemini as a separate external service. Mention optional authentication and write configuration only if asked.]**

## Slide 13: Conclusion and Q&A (1:00)

To close, GitPet demonstrates five ideas.

First, ambient awareness: Byte maps the selected state into physical symptoms and a health score. Second, contextual AI assistance: Gemini can help explain supplied repository state, with model availability and accuracy caveats. Third, integrated views: the app combines repository tools with scenario-driven CI/CD, PR, readiness, and risk pages. Fourth, bounded Git actions: policy, preview, and explicit server write opt-in constrain supported command execution. Fifth, engineering evidence: the project has 31 passing Vitest tests across three suites, threat-model and governance documentation, a runbook, and SBOM tooling. Those artifacts support the prototype; they are not production certification.

To run the demo, use `npm run dev` and open `http://localhost:3004`. Thanks for joining us. We welcome your questions.

**[Open Q&A. If demonstrating the app, begin from the sandbox mode and label seeded CI/CD and PR data before interacting.]**

---

## Presenter handoff checklist

- Aliasgar introduces the build team as Lucas Whitaker and David Castelli, then hands to Lucas after slide 3.
- Lucas hands to David after slide 6; emphasize the `-u` item is a suggested command, not an automatic rewrite.
- David labels CI/CD and PR panels as scenarios, then hands to Lucas for both scoring slides.
- Lucas explains the advisory Release Readiness and Risk scores, then hands to Faris.
- Faris covers architecture, closes, and takes Q&A.
- Keep a local sandbox selected for predictable demos. Use live local Git scan only if the configured workspace and repository state have been checked before presenting.
