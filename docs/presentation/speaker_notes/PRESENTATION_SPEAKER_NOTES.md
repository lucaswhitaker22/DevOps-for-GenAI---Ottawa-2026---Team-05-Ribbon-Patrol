# GitPet Presentation Speaker Notes

**Deck:** `GitPet_Professional_Deck 11.pptx` (13 slides)  
**Target duration:** About 20 minutes, including slide changes and short app walkthrough cues  
**Speaking order:** Aliasgar (slides 1-3), Lucas Whitaker (slides 4-6), David Castelli (slides 7-9), Lucas Whitaker (slides 10-11), Faris (slides 12-13)
**Build team credited on the deck:** Lucas Whitaker and David Castelli, Ribbon Patrol (Team 05)  
**Demo:** `npm run dev` at `http://localhost:3004`

## Rehearsal plan

Aim for a measured 125-135 spoken words per minute. The slide timings total about 20 minutes of spoken material; allow roughly 35 seconds for handoffs, slide changes, and app navigation for a total near 20:40. Keep the short bold cues as stage directions, not spoken text. If running long, shorten examples, not implementation caveats.

| Slides | Presenter | Target |
|---|---|---:|
| 1-3 | Aliasgar | 5:00 |
| 4-6, 10-11 | Lucas | 8:35 |
| 7-9 | David | 3:50 |
| 12-13 | Faris | 2:40 |
| Transitions / app navigation | All | 0:35 |
| **Total** |  | **20:40** |

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

We are presenting GitPet, an ambient DevSecOps repository companion, for the DevOps for GenAI track at AWS Community Day Ottawa 2026. Our team name is Ribbon Patrol. I am Aliasgar, and I will open the presentation; Lucas, David, and Faris will take the next sections.

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

# Lucas - Slides 4-6 (5:15)

## Slide 4: AI assistance, personas, and model tiers (1:50)

Thanks, Aliasgar.

We have seen Byte reflect a repository state. Now the question is: when a developer asks why the state matters, how does the app shape the answer? Companion offers four prompt personas: Byte Mascot for everyday guidance, Senior Architect for Git topology and rebases, Safety Auditor for risk and preservation, and Git Tutor for concepts such as commits, HEAD, and the index. They shape response style; they are not agents with different system permissions.

The user selects fast, general, or deep routing. Their first-choice models are `gemini-3.1-flash-lite`, `gemini-3.6-flash`, and `gemini-3.7-flash`, respectively, with additional models in each same-tier fallback chain. A few request keywords can influence routing; this is simple app logic, not a benchmark of task difficulty.

For availability or quota errors, the server can try the next model in that chain. Some chat/analyze paths also have deterministic fallback; Live Audio and image generation still need their services.

For chat, the server can add repository and branch names, upstream, ahead/behind counts, detached/stale flags, working-tree paths/status, and remote commits behind. Ahead means local-only commits; behind means tracking-branch commits not yet local. CI/PR panels remain scenario data. Model output is advice to verify, not a guaranteed citation or undo plan.

**[Demo cue: select one persona and compare the response tone, then show the tier control. If credentials/network aren't ready, explain the configured model chains rather than claiming a live response.]**

The model helps explain and propose; the next two slides show the code that decides which Git commands are refused or need contextual review.

## Slide 5: Static safety rules (1:35)

Layer 1 is a set of checks that do not depend on branch or working-tree state. It hard-blocks eight cases: unconditional force push; deleting a remote ref; `reset --hard`; `git clean`; `branch -D`; stash drop/clear; history rewriting; and checkout of paths that can overwrite edits.

`rebase --onto` gets a warning, not a hard block, because it rewrites commit identities. Separate parser and allowlist checks reject non-Git commands, disallowed subcommands, and shell control characters; `&&` is parsed as an explicit chain of Git commands.

For example, `git checkout main -- app.ts` restores that path from another tree and can overwrite local edits. That's why the policy treats path checkout differently from simply switching branches.

Where possible, a rule suggests an alternative: `--force-with-lease`, `reset --keep`, or merged-only `branch -d`. Suggestions are not applied automatically, and a lease-checked push still requires judgment about the remote state.

For execution, the server passes Git and its arguments separately through `child_process.execFile` rather than asking a shell to parse a command string. The server checks policy again at execution time. Writes require `GITPET_ALLOW_WRITES=true`, off by default.

These controls constrain the supported Git executor; they do not make the whole app immune to every failure. The executor suite has 19 tests for selected rules, parsing, and execution cases, not exhaustive threat coverage.

**[Show the blocked examples. Mention the safer suggestion where the policy provides one, but don't imply the blocked command was rewritten.]**

## Slide 6: Contextual safety lints (1:50)

Layer 1 cannot catch a command that is valid in general but unsafe for this repository. A contextual lint checks working-tree, stash, branch ahead/behind, or in-progress-operation state. Guidance flows can use supplied scenario state; live preview/execution paths also scan the configured local Git workspace.

For example, `git stash push -m "wip"` saves tracked changes but omits untracked files. If those files exist, `stash-misses-untracked` warns and suggests `-u`, which includes them. GitPet does not rewrite or run the command: the user chooses the suggestion, reviews it, and must have writes enabled for live execution.

In other words, a stash is a temporary snapshot, not a commit; `-u` adds untracked files to that snapshot.

The other six checks are: `stash-pop-empty` warns on an empty stash; `pull-dirty-tree` warns when pull/merge has no stash or autostash protection; `unresolved-conflicts` blocks pull, merge, switch, or checkout while conflicts remain; `operation-in-progress` blocks unrelated mutations during a paused rebase/merge but allows continue, abort, skip, staging fixes, and read-only inspection; `ff-only-on-diverged` blocks an impossible fast-forward-only pull and suggests rebase; `push-while-behind` warns that a push will be rejected. Findings are targeted checks, not a formal safety proof.

Preview is a dry run: it reports the command steps but is not a universal file-level diff. Execution records `headBefore` and `headAfter`; they can aid investigation but cannot restore every uncommitted edit or reverse every operation.

That is the boundary to remember: contextual policy can catch specific hazards, but the person remains responsible for reviewing the suggestion and the repository state.

David will now show the repository tools and scenario-based delivery workspaces.

**[Handoff to David.]**

---

# David - Slides 7-10 (3:50)

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

## Slide 10: Release readiness report (1:50)

Thank you, David.

The previous workspaces showed repository tools and example CI/PR states. Release Readiness combines the selected app state's delivery signals into an advisory report.

The local `releaseReadiness.ts` function scores five dimensions: tests passing (25%), code coverage (20%, 80% target), vulnerabilities (25%, zero high/critical target), PR approvals (15%), and branch freshness (15%). It scores each pillar, multiplies by the weight, then rounds the weighted sum.

The 78-percent Caution example is calculated locally from app state. CI, coverage, vulnerability, and PR values may be scenario inputs, not results from a CI runner, coverage service, package scanner, or branch-protection API. In plain terms, this score summarizes the currently loaded inputs; it does not certify that a real release is safe.

The status is Blocked with blockers or a score below 70, Caution/Review with warnings or a score below 85, and Ready to Ship otherwise. A separate `canShip` flag requires no blockers and at least 80 points, so it can disagree with the label between 80 and 84. Treat this as prototype behavior, not a production release policy.

When the Gemini key is configured, the release-readiness endpoint can request an AI summary. The score remains a local calculation. Users can copy a Markdown summary or download JSON, but those are generated reports, not signed attestations. The sign-off button changes UI state only.

**[Point to each of the five weights, then the current score/status and the export controls. Say "advisory report," not "deployment authorization."]**


# Faris:
## Slide 11: Risk score and health pool (1:30)

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
