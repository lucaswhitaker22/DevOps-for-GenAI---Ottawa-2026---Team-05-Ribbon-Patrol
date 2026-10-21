# GitPet Presentation Speaker Notes

**Deck:** `GitPet_Professional_Deck 11.pptx` (13 slides)  
**Target duration:** About 20 minutes, including slide changes and short app walkthrough cues  
**Speaking order:** Aliasgar (slides 1-3), Lucas Whitaker (slides 4-6), David Castelli (slides 7-9), Faris (slides 10-13)  
**Build team credited on the deck:** Lucas Whitaker and David Castelli, Ribbon Patrol (Team 05)  
**Demo:** `npm run dev` at `http://localhost:3004`

## Rehearsal plan

Aim for a measured 115-125 spoken words per minute. The timings below total 19 minutes 20 seconds of speaking; allow about 40 seconds across handoffs, slide changes, and app navigation to land near 20 minutes. Keep the short bold cues as stage directions, not spoken text. If running long, shorten the examples, not the implementation caveats.

| Slides | Presenter | Target |
|---|---|---:|
| 1-3 | Aliasgar | 4:10 |
| 4-6 | Lucas | 4:40 |
| 7-9 | David | 4:35 |
| 10-13 | Faris | 5:55 |
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

# Aliasgar - Slides 1-3 (4:10)

## Slide 1: Title and mission (1:15)

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

## Slide 3: Notice, Understand, Resolve (1:40)

The product story follows three steps: Notice, Understand, Resolve.

Notice is the companion layer. The app models 18 physical symptoms, including Git conditions such as upstream drift, unpushed work, detached HEAD, conflicts, and clean synchronization, as well as seeded build, flaky-test, vulnerability, PR, and infrastructure scenarios. Byte's posture, health aura, and procedural Web Audio cues reflect the active app state. The important qualifier is that this is not a daemon polling all repositories in the background: the initial state is a sandbox, and local scanning is an explicit action.

Understand is contextual assistance. When Gemini is configured, chat requests can include repository details such as branch name, ahead/behind counts, detached state, and working-tree paths. Fast, general, and deep model tiers are available. The model can help explain the supplied context, but an answer is not automatically verified; seeded CI, PR, and CVE examples should not be presented as findings from a live provider.

Resolve is guided action. Supported Git commands are evaluated by deterministic safety policy and can be previewed. The server checks the policy again when execution is requested, and write execution is disabled by default. A preview, a suggested command, or a before/after HEAD hash is not a promise that every filesystem change has a complete diff or that every operation can be undone.

The point is not to remove developer judgment. The point is to make the state easier to interpret and to put meaningful controls around the actions that the prototype can execute.

Lucas will now explain how the AI options and command safety layers work.

**[Handoff to Lucas.]**

---

# Lucas - Slides 4-6 (4:40)

## Slide 4: AI assistance, personas, and model tiers (1:35)

Thanks, Aliasgar.

The Companion workspace offers four response personas. Byte Mascot uses a warm, concise tone for everyday repository guidance. Senior Architect emphasizes Git topology and rebase strategies. Safety Auditor focuses on preserving work and understanding risk. Git Tutor explains concepts such as commits, trees, references, HEAD, and the index. These are prompt-level roles that shape the response; they are not separate autonomous agents with different system permissions.

The server routes requests through three model tiers using the Google GenAI SDK. The fast chain starts with `gemini-3.1-flash-lite`, then tries `gemini-3.6-flash` and `gemini-flash-latest`. The general chain starts with `gemini-3.6-flash`, then `gemini-3.5-flash` and `gemini-flash-latest`. The deep chain starts with `gemini-3.7-flash`, then `gemini-3.6-flash` and `gemini-flash-latest`.

For availability and quota errors such as 404, 429, and 503, the server can try the next model in the chosen chain. Some chat and analyze paths also have deterministic fallback guidance. That does not mean every function, including Live Audio or image generation, works offline.

For chat, the server can add current app repository context to the prompt. The model still generates the explanation, so verify important advice against the displayed state and Git itself. We do not claim that every answer includes a calibrated confidence score, citations, or a valid inverse command.

**[Point to persona and tier areas. Keep the model list brief; avoid promising a particular response time.]**

## Slide 5: Static safety rules (1:30)

The first safety layer rejects dangerous commands independent of repository context. There are eight hard-block rules in the static rule set: unconditional force push, deleting a remote ref, hard reset, `git clean`, force-deleting a branch with `-D`, dropping or clearing stashes, history rewriting, and checkout of paths that can overwrite edits.

There is also a static warning for `rebase --onto` because it rewrites commit identities and may disrupt shared work. Parser and allowlist checks add separate protections: the command must be an allowed Git subcommand, and unsupported binaries or shell control characters are rejected. An explicit `&&` chain is parsed as multiple Git commands rather than handed to a shell.

For execution, the server tokenizes arguments and invokes Git through `child_process.execFile`, not a shell command string. The client preview is not the security boundary: the server evaluates the command again at execution time. Writes require `GITPET_ALLOW_WRITES=true`, which is off by default.

That is a meaningful control for the supported Git executor, not a claim that the entire application is immune to injection, model mistakes, or every possible Git risk. The executor tests exercise selected static rules, parsing cases, and execution behavior; tests do not prove the policy exhaustive.

**[Show the blocked examples. Mention the safer suggestion where the policy provides one, but don't imply the blocked command was rewritten.]**

## Slide 6: Contextual safety lints (1:35)

Static checks are not enough because a command can be valid but unsafe for the current repository. The second layer compares a command with context such as the working tree, stash list, branch ahead/behind state, and an operation already in progress.

Take the stash example. `git stash push -m "wip"` does not include untracked files by default. If untracked files are present, GitPet's `stash-misses-untracked` lint reports a warning and suggests adding `-u`. The system does not silently alter the command or run the suggestion. The user has to choose it, review the preview, and, for a live write, have server writes enabled.

The other six contextual checks cover: popping an empty stash; pulling or merging with a dirty tree when nothing preserves it; attempting certain operations with unresolved conflicts; unrelated mutations during a paused rebase or merge; a fast-forward-only pull on a diverged branch; and pushing while behind upstream. Some findings warn; others block. The report identifies the finding and may provide a safer suggestion.

Execution is a separate step. Dry-run preview reports what would run; it is not a universal file-level diff. When execution occurs, the executor captures `headBefore` and `headAfter`, and the app can keep an in-memory audit history. Those references can help with recovery, but cannot restore every uncommitted edit or reverse every Git action.

That is the boundary to remember: contextual policy can catch specific hazards, but the person remains responsible for reviewing the suggestion and the repository state.

David will now show the repository tools and scenario-based delivery workspaces.

**[Handoff to David.]**

---

# David - Slides 7-9 (4:35)

## Slide 7: Repository workspace and DAG (1:40)

Thanks, Lucas.

The Repository workspace combines a commit graph with working-tree tools. The DAG normalizer arranges commit and parent data into lanes for SVG rendering, highlights relationships such as HEAD and merge base, and identifies role categories such as upstream, local-ahead, remote-behind, detached, and conflict/hazard states. Selecting a node opens commit details. This is a visual explanation of the graph data supplied to the app, not a claim that every possible Git history has been stress-tested at arbitrary scale.

The Working Tree and Diff Studio displays modified files, supports searching and selecting files for staging, and renders unified diff content. Staging is granular: a user can select a file instead of staging everything. The workspace also includes stash inspection and restoration controls.

If Gemini is configured, the AI Conventional Commit tool can use staged diff data to draft a message. Treat the generated text as a draft to review, not as an authoritative classification. The app also shows a session audit history; it is in-memory, not an immutable external audit record.

**[Demo cue: show the graph and one commit drawer; move to working-tree file selection/diff. If the local workspace is unavailable, stay in the prepared scenario rather than implying a live scan.]**

## Slide 8: CI/CD scenario walkthrough (1:30)

The CI/CD workspace shows five illustrative stages: lint, tests, security scan, artifact build, and staging/deployment. Expanding a stage displays example log lines supplied by the selected scenario. These are not fetched from Jenkins, GitHub Actions, CodeBuild, or another CI provider.

The flaky-test card displays scenario-provided test and pass-rate values. Its control simulates changing the app state; it does not mark a test skipped, edit a test file, or unblock a real pipeline. Similarly, the CVE card presents seeded vulnerability data. There is no live package scanner here, and the demo action does not create a Dependabot pull request.

This still makes the workflow useful as a prototype: it illustrates how a developer might move from a failure signal to a triage view and a proposed next step. The next engineering step would be to connect real pipeline and scanner sources, define their data contracts, and ensure the remediation controls perform auditable provider operations.

**[Open one stage log; point out that it is an example. Then show the flaky-test/CVE cards and explicitly label them scenario content.]**

## Slide 9: Pull Request scenario (1:25)

The PR workspace presents a sample PR, status, comments, and a scenario wait value. For the displayed example, the component's scenario fields include one approval and one requested change; these counts are not fetched from GitHub branch protection. The comment paths and text are also scenario data.

The reply control fills an editable example response locally. It does not send the review thread to Gemini and does not post a comment to a remote PR. The Squash and Merge control changes local UI state; it does not merge a GitHub PR or prune a branch. Other PR controls should be presented with the same caution: they are prototype interactions, not live provider operations.

This lets us demonstrate the user experience we'd want around review bottlenecks while being honest about the missing integration. A production version would need authenticated GitHub API access, permission checks, provider-side state refresh, and confirmation before posting or merging.

The next section moves from feature workspaces to readiness and repository-risk views. Faris will take over.

**[Handoff to Faris.]**

---

# Faris - Slides 10-13 (5:55)

## Slide 10: Release readiness report (1:35)

Thank you, David.

The Release Gate workspace computes an advisory score locally from five dimensions: tests passing at 25 percent, coverage at 20 percent, vulnerabilities at 25 percent, PR approvals at 15 percent, and branch freshness at 15 percent. Those weights are implemented in `releaseReadiness.ts` and applied to the current app state. In this prototype, CI, coverage, CVE, and PR values may be scenario inputs rather than data from live providers.

The report labels a state Blocked when there are blockers or the score is below 70; it labels Caution/Review when there are warnings or the score is below 85; otherwise it labels Ready to Ship. The separate `canShip` boolean uses no blockers and a score of at least 80, so do not describe the screen as an external deployment gate or assume its label triggers a deploy.

When the Gemini key is configured, the release-readiness endpoint can request an AI summary. The score remains a local calculation. Users can copy a Markdown summary or download JSON, but those are generated reports, not signed attestations. The sign-off button changes UI state only.

**[Point to the five weights, status, and export buttons. Say "advisory report," not "deployment authorization."]**

## Slide 11: Risk score and health pool (1:35)

The Risk workspace shows a separate score, starting from 100 and subtracting deductions from seven factors in the app's health calculation:

1. Branch divergence and related work-loss hazards: up to 35 points.
2. Failed/flaky tests and deployment failures: up to 28.
3. Secrets and security-policy deviations: up to 30.
4. Vulnerabilities: 12 for the lower-severity path or 22 for high/critical findings.
5. Code smells or working-tree sprawl: up to 15.
6. Unreviewed commits and PR review lag: up to 15.
7. Large PR scope: 8.

The exact factor values depend on the current state and scenario. Some severe conditions, such as active conflicts or destructive-risk state, affect the health label as well as the numeric deductions. The labels are not just fixed score bands: for example, a conflict can be Blocked even when the score alone would not imply it.

The filters let users focus on all factors, critical hazards, warnings, or healthy items. A Remediate with Byte action sends context back to Companion for guidance; it does not fix the factor automatically. When presenting a sample score, read the number visible in the app rather than adding deductions from an unrelated scenario.

**[Show the score, one factor, then filters and a remediation link. Do not claim real-time CI/PR telemetry.]**

## Slide 12: Architecture and boundaries (1:45)

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
- David labels CI/CD and PR panels as scenarios, then hands to Faris after slide 9.
- Faris describes the readiness page as advisory, closes, and takes Q&A.
- Keep a local sandbox selected for predictable demos. Use live local Git scan only if the configured workspace and repository state have been checked before presenting.
