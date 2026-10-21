Speaker Notes
================

**Project:** GitPet — Ambient DevSecOps Repository Companion
**Team:** Ribbon Patrol (Team 05) — Lucas Whitaker & David Castelli
**Event:** [AWS Community Day Ottawa 2026](https://awscommunityday.ca/) — DevOps for GenAI Hackathon
**Presentation Deck File:** `GitPet_Professional_Deck 11.pptx` (13 Slides)
**Target Duration:** 10–12 Minutes (Target: ~11 minutes 50 seconds)
**Live Application Target:** `http://localhost:3004` (`npm run dev`)
**Presenters (speaking order):** Aliasgar → Lucas → David → Faris

> **Note on team composition:** The deck's title slide credits the build team as
> Lucas Whitaker & David Castelli (Ribbon Patrol, Team 05). Aliasgar and Faris
> join the live presentation to cover additional speaker segments; the
> authored-by line on every slide remains "Lucas Whitaker & David Castelli".

---

Aliasgar (Slides 1–3)

Slide 1: Title & The Mission — AWS Community Day Ottawa 2026
"Hello everyone, and thank you for joining us today.

We're excited to present GitPet, an ambient DevSecOps repository companion designed to help developers make safer and smarter decisions throughout the software development lifecycle.

GitPet was built specifically for AWS Community Day Ottawa 2026 in the DevOps for GenAI track. The central question we set out to answer is: how do we infuse Generative AI into daily Git and CI/CD workflows to eliminate developer friction without introducing unverified, destructive AI operations?

Development teams today work across many different systems: source control, CI/CD pipelines, security scanners, issue trackers, and deployment platforms. While these tools provide valuable information, that information is often fragmented, requiring developers to constantly switch contexts and manually correlate data.

At the same time, AI-assisted development is rapidly transforming how software is built. Developers are increasingly relying on AI for coding, troubleshooting, and operational guidance. However, most AI tools focus on generating answers rather than maintaining awareness of repository health, operational risk, or organizational policies.

GitPet was created to bridge that gap. Instead of being just another chatbot, GitPet acts as an intelligent companion — powered by optional tiered Google Gemini models via the @google/genai SDK — that reflects selected or scanned repository state and guides developers toward safer actions.

Our foundational promise is simple: See risk. Understand evidence. Resolve safely."

Slide 2: The Problem — The 3 Developer Crises
"The challenge we wanted to solve can be broken into three major areas.

First, there is context blindness.

Developers have to correlate signals across terminal windows, CI/CD portals, pull request queues, and security dashboards. Important signals can be discovered late when a merge or release is already at risk.

Second, there is unchecked AI agency.

Modern AI assistants are increasingly capable of suggesting commands and automated workflows. However, some operations can be destructive if executed incorrectly. A force push, a hard reset, or an improperly executed cleanup operation can accidentally remove valuable work or disrupt team collaboration. This is the OWASP LLM08 Excessive Agency vulnerability: prompt instructions alone are not a security boundary.

Third, telemetry is often buried.

Organizations collect enormous amounts of operational and security data, but much of it goes unnoticed until a release is delayed or a production issue occurs. Non-linear branch divergence, merge conflicts, flaky test regressions, and supply-chain CVEs are technically logged but remain buried inside thousands of lines of raw terminal output.

These challenges reduce developer productivity, increase release risk, and make collaboration more difficult."

Slide 3: The Solution — Notice, Understand, Resolve
"Our vision is simple and can be summarized in three steps:

Notice. Understand. Resolve.

In the Notice phase, the app reflects its selected scenario or an explicitly requested local Git scan. Byte translates the current app state into 18 physical symptoms, a 0 to 100 health-point aura, procedural Web Audio cues, and expressive posture. This is not a background monitoring agent.

In the Understand phase, optional Gemini chat uses a selected model tier and can receive repository context such as branch state and working-tree paths. Other CI/CD, PR, and CVE details in the demo are seeded scenario data. AI explanations are assistance, not independently verified findings, and response formatting is not guaranteed.

In the Resolve phase, supported Git commands are evaluated by policy and can be previewed before execution. Writes require explicit server opt-in. The preview and recorded HEAD hashes are not a guaranteed blast-radius calculation or universal rollback plan.

The goal is not to replace developers. The goal is to augment developers with continuous awareness, intelligent guidance, and safe automation while keeping humans firmly in control of all important decisions.

With that vision established, I'll hand things over to Lucas, who will walk through the intelligence and safety mechanisms that make GitPet different from traditional AI assistants."

---

Lucas (Slides 4–6)

Slide 4: AI Assistance — Multi-Persona Guidance & Tiered Models
"Thanks Aliasgar.

At the core of GitPet is the Notice, Understand, Resolve workflow, and the AI engine that powers the Understand phase.

Not every user requires the same type of assistance. Junior developers often need learning-focused guidance and explanations. Senior engineers need rapid diagnostics and concise recommendations. Security teams focus on policy compliance and risk assessment. Release managers care about deployment readiness and operational stability.

To address these different needs, GitPet supports four specialized AI personas, each with its own system instruction in the backend:
1. Byte Mascot — friendly, concise guidance and developer humor for daily workflow hygiene.
2. Senior Architect — topological DAG analysis, merge-base ancestry, and rebase strategies.
3. Safety Auditor — zero data loss, stash verification, policy compliance, and reversal readiness.
4. Git Tutor — internal Git mental models: blobs, trees, commit objects, references, HEAD, and the staging index.

We also support intelligent model routing across three speed tiers using the official @google/genai SDK, version 2.4.0:
- Fast Tier, gemini-3.1-flash-lite, for sub-second status checks and commit message drafting.
- General Tier, gemini-3.6-flash, for standard conversational chat, diff reviews, and tutoring.
- Deep Tier, gemini-3.7-flash, for complex merge conflicts, DAG analysis, and release sign-offs.

If a model returns an availability or quota error, the server tries subsequent models in that tier's chain. Some chat/analyze flows can use deterministic rule-based fallback when Gemini is unavailable; this does not make every feature available offline.

Chat responses may be accompanied by app-generated context and recommended-action UI. Do not claim every answer contains verified citations, a calibrated confidence rating, or an atomic undo.

The result is a much more personalized and practical AI experience."

Slide 5: Safety Layer 1 — Static Rules (Universal Danger Invariants)
"One of our most important design principles is that safety cannot rely solely on AI prompts. Critical protection mechanisms must be enforced programmatically.

That's where Layer 1 — Static Safety Invariants — comes in. These are 8 hard-block rules defined in safety.ts that reject commands which are unsafe in any repository, regardless of what an AI model suggests:
- Zero un-leased force pushes: git push --force is blocked, and we auto-suggest git push --force-with-lease.
- Zero destructive resets: git reset --hard is blocked; we recommend git reset --keep or stashing first.
- Zero permanent deletions: git clean, git branch -D, and git stash drop are forbidden.
- Zero history rewrites: git filter-branch and --filter-repo are blocked.
- Zero shell injection: metacharacters like semicolons, pipes, backticks, and $() are rejected at the parser.

Approved commands are tokenized into argument arrays and executed via child_process.execFile — completely bypassing the system shell and neutralizing command injection attacks. We also enforce a strict binary whitelist: only the git executable is permitted. Commands like sudo, rm, curl, or sh are dropped at the gateway before reaching the OS.

Even if a model generates a dangerous recommendation, the enforcement layer ensures organizational safety requirements are respected. In other words, the AI can reason and advise, but policy enforcement remains deterministic and reliable.

The executor test suite contains 19 tests for selected static/contextual rules, parsing cases, and execution behavior. The tests are useful verification, not proof that every risk is covered."

Slide 6: Safety Layer 2 — Contextual Lints (Working-Tree Aware)
"Static rules alone are not enough. Many actions are technically valid, but risky in a specific context.

This is where Layer 2 — Contextual Safety Lints — becomes valuable. Layer 2 compares proposed commands against the live working tree, staging index, branch relationships, stash stack, and any Git operation currently in progress.

The canonical example: a developer has uncommitted, untracked files in their directory. The AI assistant suggests git stash push -m "wip". This is completely valid Git syntax. However, standard Git silently leaves untracked files behind. A subsequent checkout, rebase, or pull will fail or overwrite those untracked files — silent data loss.

GitPet detects this using the stash-misses-untracked lint and reports a warning with a `-u` suggestion. It does not silently rewrite the command; the user must choose the suggestion and preview it.

Layer 2 also includes 6 more contextual lints:
- stash-pop-empty: warns when popping from an empty stash stack.
- pull-dirty-tree: warns when pulling or merging with uncommitted files and nothing preserving them — unless --autostash is present.
- unresolved-conflicts: blocks operations while conflicted files remain.
- operation-in-progress: when a rebase or merge is paused, only --continue, --skip, --abort, staging fixes, or read-only inspection are permitted.
- ff-only-on-diverged: blocks a fast-forward pull on a diverged branch and suggests rebase.
- push-while-behind: warns when pushing a branch that is behind upstream.

Live Git writes are disabled by default and require explicit opt-in via GITPET_ALLOW_WRITES=true. The executor records headBefore and headAfter hashes; these are recovery references, not a guarantee that every action can be rolled back with one click.

This allows GitPet to move beyond simple command validation and toward true situational awareness.

Now that we've covered how GitPet thinks and protects users, I'll hand things over to David to demonstrate how these capabilities deliver day-to-day value for developers."

---

David (Slides 7–9)

Slide 7: Repository Workspace — Multi-Lane DAG & Working Tree Studio
"Thank you, Lucas.

One of the most powerful features of GitPet is the Repository Workspace, which you can reach at the #repository route.

Git repositories naturally evolve into complex branching structures, especially in large teams. Developers often struggle to understand branch divergence, merge history, feature development paths, and overall repository state.

On the left, our Interactive Multi-Lane DAG Visualizer translates complex Git histories into an intuitive SVG topological graph. Rather than drawing an unreadable linear git log, our normalizer — gitDagNormalizer.ts — sorts commits topologically, assigns them to parallel branch lanes, and connects them with smooth cubic bezier spline curves.

GitPet models 11 distinct commit roles: the checked-out HEAD, the upstream HEAD pointer, local ahead commits, remote behind commits, the highlighted Merge Base double-ring node, fork points, conflict points, and hazards. Clicking any commit node opens an inspector drawer displaying author, timestamp, parent hashes, and full commit messages.

On the right, our Working Tree & Diff Studio provides file search, individual checkbox staging controls, Stage All and Unstage All controls, and unified syntax-highlighted diffs with line gutters and addition/deletion counters. Developers can stage files selectively, inspect stash snapshots, and request an AI Conventional Commit based on staged diff data.

The repository page also surfaces an in-memory session audit history. Some operation-specific recovery controls exist, but the history is not immutable and does not make every action recoverable.

By reducing the effort required to understand repository structure, GitPet helps developers make faster and more informed decisions."

Slide 8: CI/CD Telemetry — From Failure to Remediation
"Another major challenge in software development is troubleshooting CI/CD failures.

The CI/CD Pipeline Telemetry Workspace at the #cicd route bridges local development with continuous integration and deployment pipelines.

Our 5-Stage Pipeline Progression Tracker monitors:
1. Lint and Static Analysis
2. Unit and Integration Tests
3. Security and CVE Scan
4. Container Artifact Build
5. Deployment and Staging Rollout

Clicking any pipeline stage expands example logs supplied by the selected scenario. In the scenario shown, linting passed but the test stage failed on a token refresh timeout; this is not a live CI run.

GitPet solves two major platform engineering headaches here.

First, Flaky Test Triage. The scenario shows a sample pass rate and a quarantine control. The control does not edit a test file, alter a pipeline, or notify QA.

Second, Supply Chain Security. The scenario displays a seeded CVE example; the app is not performing a live dependency scan or opening a Dependabot pull request.

GitPet moves developers from a generic red build badge to the exact root cause and an actionable remediation path in seconds."

Slide 9: Pull Request Intelligence — Turnaround to Merge
"Pull requests are a critical collaboration point for development teams. However, review bottlenecks, incomplete reviews, and communication gaps can slow delivery.

In the Pull Request Intelligence Workspace at the #pr route, GitPet surfaces critical review telemetry:
- Approval Display: scenario-provided approval counts, for example 1 of 2; these are not fetched from branch protection rules.
- Review Turnaround Clock: measures queue wait times, for example 3 days waiting in review, to highlight team review bottlenecks.
- Mergeability Diagnostic: verifies merge conflict status and CI check results.

Below, review comments are anchored to example file paths and line numbers. The current reply composer fills an editable example response locally; it does not send the review thread to Gemini or post a comment to GitHub.

The Squash and Merge control demonstrates a local UI state change; it does not merge a remote PR, prune a branch, or generate a changelog automatically.

This reduces friction within the review process and improves overall team collaboration. The result is higher development velocity without sacrificing quality.

I'll now pass things over to Faris, who will walk through our scoring engines, architecture, and closing."

---

Faris (Slides 10–13)

Slide 10: Release Gate — Automated 5-Pillar Scorecard
"Thank you, David.

Ultimately, all development activity leads toward a release decision. One of the challenges organizations face is determining whether a release is truly ready.

GitPet addresses this with an advisory score in the Release Gate Workspace at #release. The local engine — releaseReadiness.ts — computes five weighted dimensions:
1. Tests Passing, 25 percent weight. Target: 100 percent passing.
2. Code Coverage, 20 percent weight. Target: at least 80 percent line coverage.
3. Vulnerability Count, 25 percent weight. Target: zero high or critical CVEs.
4. PR Approvals, 15 percent weight. Target: all required peer approvals met.
5. Branch Freshness, 15 percent weight. Target: synchronized with upstream main.

The weighted sum produces an overall score from 0 to 100. A score of 90 or above is Ready to Ship, shown in green. 70 to 89 is Caution or Review, shown in amber. Below 70 is Blocked, shown in red.

In the scenario shown on screen, the displayed score is 78 percent, Caution or Review. The optional POST /api/ai/release-readiness endpoint can request Gemini synthesis when configured. Vulnerabilities and approvals in this demo are scenario inputs, not a live scan or branch-protection check. Remediate with Byte opens guidance; it does not fix the blocker automatically.

Users can copy a Markdown summary or download the calculated JSON report. These are not signed compliance artifacts, and the sign-off control does not deploy.

This enables more consistent decision-making and reduces the likelihood of unexpected issues reaching production."

Slide 11: Risk Scorecard — 0–100 HP Dynamic Health Pool
"One of the central concepts in GitPet is repository health. Byte's health is not an arbitrary mood — it is a deterministic calculation based on the current app state.

The Risk Scorecard Workspace at #risk computes a score from the current app state, which may be a sandbox scenario rather than live telemetry. It applies deductions across seven DevSecOps dimensions:
1. Branch Divergence: 0 to -35 points for ahead/behind drift, detached HEAD, and work-loss hazards.
2. Failed and Flaky Tests: 0 to -28 points for build failures and intermittent suites.
3. Secrets and Security Policies: 0 to -30 points for exposed API keys or public storage buckets.
4. Open CVE Vulnerabilities: 0 to -22 points for high or critical dependency CVEs.
5. Code Smells and Debt: 0 to -15 points for dirty file sprawl and lint debt.
6. Unreviewed PR Lag: 0 to -15 points for stale reviews beyond 3 days.
7. Large PR Scope: 0 to -8 points for changesets exceeding 400 lines or 15 files.

In the scenario on screen, the repository sits at 68 HP — minus 15 for branch divergence, minus 12 for open vulnerabilities, and minus 6 for uncommitted working-tree sprawl.

Developers can filter factors by All, Hazards, Warnings, and Healthy. A remediation action opens Byte with diagnostic context; it offers guidance rather than automatically fixing the factor.

This allows organizations to identify trends early and address problems before they affect delivery timelines or production systems."

Slide 12: Production Architecture & Security Boundaries
"Let's take a quick look at how GitPet is built, designed with strict separation of concerns across deliberate trust boundaries.

On the left is the React 19 Frontend SPA, built with TypeScript 5.8, Vite 6, TailwindCSS 4, Motion, and the Web Audio API for rich ambient aesthetics. The browser never executes Git commands directly.

Requests pass through the Node.js Express server on port 3004. It provides REST and WebSocket routes, redaction/sanitization helpers, an in-memory FIFO audit buffer capped at 200 events, temporary image previews, and optional Basic Auth when credentials are configured.

Supported Git actions pass through safety.ts and executor.ts. The policy includes 8 hard-block rules, 7 contextual lints, and parser/allowlist checks. Execution uses argv-based child_process.execFile; live writes require GITPET_ALLOW_WRITES=true. Other UI actions are not GitHub or CI integrations.

The repository data options include a local on-disk Git scan at /api/git/live-status and a configured public GitHub fixture at /api/repo/live. This does not make the CI/CD or PR pages live integrations.

Google Gemini Cloud Services are reached via the @google/genai SDK, version 2.4.0, across multi-tier fallback chains, with Live Audio streaming over the WebSocket at /live using the gemini-3.1-flash-live-preview model, and avatar generation through the gemini-3.1-flash-image model.

The key architectural principle is strict separation of concerns: the model provides reasoning, the gateway provides mediation, the policy engine provides enforcement, the human provides authorization, and the executor performs only the allowed operation. The external AI service cannot directly execute a command in the local repository.

That design principle helps us maintain both productivity and trust."

Slide 13: Conclusion — Ambient DevSecOps & Live Launch
"To conclude, GitPet demonstrates five core ideas.

First, ambient awareness. The app visualizes its selected state through 18 physical symptoms and a dynamic 0 to 100 HP health pool.

Second, grounded multimodal assistance. Tiered Gemini Flash reasoning — 3.1 Lite, 3.6 Flash, and 3.7 Flash — real-time Live Audio WebSocket streaming, and custom avatar styling through the Pet Image Studio.

Third, integrated DevSecOps views. GitPet brings Git topology and working-tree views together with scenario-driven CI/CD, PR, readiness, and risk screens.

Fourth, bounded Git actions. Deterministic policy checks, preview, and explicit write opt-in constrain supported Git execution; they do not provide a universal rollback guarantee.

Fifth, engineering evidence. The project includes 31 automated Vitest tests, threat-model and governance documentation, an SRE runbook, and SBOM tooling. These artifacts alone do not establish production readiness.

GitPet makes DevSecOps health ambient, explainable, and safely actionable.

You can launch the platform locally right now with npm run dev on port 3004 at http://localhost:3004.

On behalf of Team 05, Ribbon Patrol, thank you for your time at AWS Community Day Ottawa 2026. We're happy to take any questions."
