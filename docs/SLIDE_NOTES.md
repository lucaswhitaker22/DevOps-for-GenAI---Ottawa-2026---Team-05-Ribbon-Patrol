# GitPet Demo Presentation — Speaker Notes

**Project:** GitPet — Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05)  
**Event:** DevOps for GenAI Hackathon 2026, Ottawa  
**Estimated Duration:** 10–12 minutes  

Each note below is written to sound natural when spoken — not read like slide text. Notes are aligned 1:1 with the 13 slides in `PRESENTATION_SLIDES.md`.

---

## Slide 1: Title & Problem Hook

GitPet is an ambient DevSecOps companion that turns repository, pipeline, review, and security signals into an expressive virtual pet named Byte. Byte helps developers notice problems, understand the evidence, and resolve issues safely — without giving an AI agent unrestricted control. We are Team 05, Ribbon Patrol: Aliasgar Husain, Lucas Whitaker, David Castetti, and Faris Nour.

Before I show the solution, let me frame the three problems we set out to solve. First, context fragmentation: developers lose track of local versus remote drift, stash states, upstream divergence, and PR review comments until a pull or rebase fails catastrophically. Second, the excessive-agency dilemma: autonomous AI agents with shell execution can accidentally force-push, discard uncommitted changes, or trigger destructive rebases without the developer understanding the blast radius. Third, inaccessible telemetry: complex Git DAG topologies, detached HEADs, flaky test suites, and multi-file merge conflicts are intimidating and time-consuming to decipher through terminal logs alone.

Keep this tight — 60 seconds max. The goal is to make judges feel the pain before showing the solution. Open on the Companion page with Byte visible.

---

## Slide 2: The Solution — Notice, Understand, Resolve

GitPet follows a three-step loop: Notice, Understand, Resolve. First, Byte signals a problem through posture, aura colour, sound, and health score — 18 expressive symptom states map directly to Git and infrastructure conditions. Second, Gemini AI explains the condition in plain language with evidence citations, confidence ratings, 7-factor risk breakdowns, and reversal plans. Third, GitPet proposes a bounded, reversible action that the developer must review and approve in a preview modal before anything is written.

Byte is therefore a live visualization of DevSecOps health, not only a mascot. The pet's posture isn't decorative — it's a real-time data representation of your repository's posture.

Four core differentiators set GitPet apart. It is ambient and non-intrusive — it sits beside your editor with passive awareness. It enforces bounded AI agency — mandatory human-in-the-loop preview, pre-computed reversal commands, and a 2-layer safety engine with zero force-push. It integrates multimodal AI — Gemini Flash reasoning across three model tiers, Live Audio WebSocket streaming, Image avatar generation, and TTS speech synthesis. And it provides DevSecOps intelligence — a 7-factor risk score engine, interactive multi-lane Git DAG visualizer, CI/CD and PR intelligence drawers, and dual live and sandbox modes.

Point to Byte on screen. Explain the health bar — for example, 68 percent HP with an amber aura means Attention. Emphasize that GitPet doesn't replace the developer's judgment — it augments it with visible telemetry and safe, reversible actions.

---

## Slide 3: Live AI Chat & Multi-Persona Assistance

GitPet offers four conversational personas so developers can choose the expertise they need. Byte Mascot provides friendly, approachable guidance with witty developer humour. Senior Architect focuses on deep DAG topology, rebase versus merge strategy, and branch architecture. Safety Auditor examines risk, rollback safety, stash verification, and clean resets. Git Tutor teaches Git internals — blobs, trees, commit objects, and the staging index.

Three model tiers let developers balance speed and depth. The Fast tier uses gemini-3.1-flash-lite for instant status checks and one-liner answers. The General tier uses gemini-3.6-flash for standard chat, tutoring, and repository analysis. The Deep Reasoning tier uses gemini-3.7-flash for complex multi-branch conflicts and architecture guidance.

Every AI response includes an evidence signals box citing concrete repo data — current branch, upstream divergence, dirty file list, conflict markers. It includes a confidence rating — High, Medium, or Low with a numeric percentage. It includes a risk badge — Safe, Caution, Protected, or Hazard. It includes a recommended safe action card with verified shell commands, syntax highlighting, one-click copy, expected outcome, and a pre-computed reversal command. And it includes a preview diff and scope button that opens the human-in-the-loop confirmation modal.

Developers can also use categorized prompt chips for one-click access: status report and diagnostics, work-loss risk assessment, explain branch divergence, review PR and reviewer feedback, and CI/CD test failure diagnosis.

This is the key demo moment. Switch to the Behind Main scenario using the Scenario Switcher. Watch Byte's posture change — pulling on leash, amber aura. Click the prompt chip for a status report. Show the AI response — evidence box, confidence score, recommended action card. Highlight the reversal command displayed alongside the action. Make sure the Gemini API key is configured so responses are live. If the API is unavailable, the fallback rule-based engine still produces a structured response — mention this resilience.

---

## Slide 4: The 2-Layer Safety Engine

This is the most important slide for judges. Prompt instructions alone are not a security guarantee — the model is instructed to avoid unsafe commands, but that is guidance, not a guarantee. The safety engine is the boundary that actually holds. It is provider-agnostic — it behaves identically whether the command came from Gemini, the rule engine, or manual input.

Layer 1 is static rules — universal danger invariants that block operations at the code level. Force-push is blocked in favour of force-with-lease. Hard reset is blocked in favour of reset --keep. Clean, force-branch-delete, stash-destroy, remote-ref-delete, history rewriting via filter-branch or --filter-repo, checkout of paths that would overwrite uncommitted edits, and shell injection metacharacters are all rejected entirely. Non-git commands like sudo, rm, and curl are blocked — git is the only binary on the whitelist.

Layer 2 is contextual lints — working-tree aware checks that evaluate live repository state. If you try to stash while untracked files exist, it suggests stash push -u. If you try to push while behind upstream, it tells you to pull or rebase first. If you try to pull or merge with a dirty tree and nothing preserving your changes, it warns you. If conflicts are unresolved, it blocks further operations until they are resolved. If a fast-forward pull is attempted on a diverged branch, it suggests rebase instead. If an operation like a rebase or merge is in progress, only continue, skip, and abort are permitted. If you try to pop an empty stash, it warns against it.

Execution uses two modes. Dry-run mode is the default — it validates syntax, checks blast radius, and simulates outcome with zero disk writes. Verified write mode requires explicitly setting GITPET_ALLOW_WRITES to true. Even then, commands execute via child_process.execFile with argv arrays — never shell pass-through — with a 60-second hard timeout. Every action is paired with a pre-computed reversal command: stash push reverses with stash pop, pull rebase reverses with rebase abort, merge reverses with merge abort, commit reverses with reset soft HEAD tilde 1, and checkout new branch reverses with checkout dash.

Verification includes 31 automated Vitest tests across security, executor, and markdown suites. Tests validate secret masking, prompt injection blocking, destructive command rejection, contextual lints, human approval gates, and markdown XSS defense. The CI pipeline runs TypeScript lint, Vitest, Gitleaks secret scan, npm audit, and build verification.

For the demo: click Preview Changes on the recommended action from Slide 3. Show the preview modal — exact command, blast radius, affected files, reversal step. Say: even if the AI hallucinated a git push force, the safety engine would hard-block it at the code level. Optionally run npm test in the terminal to show 31 tests passing live. The AI is guidance; this module is the guarantee.

---

## Slide 5: Repository DAG Graph & Diffs

The repository workspace makes Git history and working-tree state easier to understand. The multi-lane DAG visualizer renders commit lineage across parallel visual lanes — a main trunk lane tracking upstream origin commits, a local feature lane tracking local branch commits, and secondary lanes for diverged branches and forks. Commit roles are colour-coded: HEAD, upstream HEAD, local ahead, remote behind, merge base, fork point, detached, conflicted, hazard, sync clean, and collapsed run. An interactive inspector lets you click any commit node to view hash, author, message, parent hashes, and timestamp. The SVG topology engine uses cubic bezier spline paths with animated HEAD pulsing and double-ring merge base highlights.

The working tree and side-by-side diffs viewer provides a file search filter for real-time dirty changeset search, checkbox file staging for selective staging and unstaging, and status indicators — modified in amber, staged in green, untracked in slate, and conflicted in red. The syntax-highlighted diff viewer shows line-by-line unified diffs with addition and deletion counts and line gutters. The AI Commit Generator integrates directly to draft Conventional Commits from active diffs.

Stash stack management provides a snapshot inventory with stash index, message, timestamp, and file count, plus one-click restore to working tree with toast confirmation. An immutable audit trail records every executed command with timestamp, description, and shell command, with one-click rollback that executes the pre-computed safe reversal — and a safeguard that verifies the working tree is clean or stashed before executing.

The DAG visualizer is technically impressive — it computes lane indices from branch topology and renders bezier spline curves. Don't go too deep on the math; focus on the visual impact and how it makes Git topology intuitive. For the demo: navigate to the Repository page, show the DAG graph with diverged branches, point out HEAD, merge base, local ahead, and remote behind. Click a commit node to show the inspector panel. Switch to the Working Tree and Diffs tab to show dirty files with staging checkboxes and the diff viewer. Switch to the Stashes tab to show the stash snapshot inventory.

---

## Slide 6: CI/CD Pipeline Telemetry

The CI/CD workspace follows pipeline stages from linting through staging verification. Stage 1 is Lint and Format — code style enforcement. Stage 2 is Unit Tests — test suite execution. Stage 3 is Security Audit — supply chain vulnerability checking. Stage 4 is Deploy Staging — pre-deployment health check. Each stage shows status indicators — success in green, failed in red pulse, pending in slate, warning in amber — with duration metrics and expandable terminal logs showing line-by-line build output.

Flaky test suite diagnostics surface tests that pass and fail intermittently without source changes. GitPet shows failure telemetry including pass rate percentage, failures over the last 10 runs, and the last failing commit SHA. A quarantine action lets you click to isolate flaky tests from blocking deployment.

Supply chain security and CVE scanning identifies known vulnerabilities in third-party packages. Each vulnerability includes severity scoring — High, Critical, Medium, or Low — the affected version, a recommended safe target version, and an option to draft a Dependabot patch for automated dependency bumping.

Keep this to 45 seconds. The CI/CD page is visually rich but self-explanatory. Focus on the flaky test quarantine and CVE remediation — those are unique features judges won't have seen elsewhere. For the demo: switch to the CI/CD Build Failure scenario, navigate to the CI/CD page, show the failed pipeline stage and click to expand terminal logs. Point to the flaky test diagnostics panel with 70 percent pass rate. Point to the CVE scan panel showing CVE-2026-8819 at High Severity.

---

## Slide 7: Pull Request Intelligence

The pull request workspace combines review status, approval thresholds, turnaround time, mergeability, and inline comments into one view. PR telemetry tracks metadata — PR number, title, author, source branch to target branch, and review status. Approval counting shows current approvals versus the required threshold — for example, 1 of 2 required. A review turnaround clock highlights bottlenecks — for example, 3 days waiting. Mergeability assessment shows real-time clean, conflicted, or blocked status.

Inline review threads link reviewer comments to specific files and line numbers — for example, src/auth/authService.ts line 42. Comments carry status tags — open or resolved — and reviewer identity tags with author handles.

The AI resolution response draft composer is the highlight. With one click, Byte generates a professional reply detailing code adjustments and added unit tests. The interactive reply box lets you edit the drafted response or type a custom reply, then click Reply to append to the thread. Once checks, approvals, and conflicts are resolved, the squash-and-merge action becomes available — it triggers a simulated merge with celebration feedback. GitPet can also generate a PR changelog producing conventional release notes summarizing features, fixes, and breaking changes.

45 seconds. For the demo: switch to the PR 214 Changes Requested scenario, navigate to the PR Intelligence page. Show review metrics — 1 of 2 approvals, 3 days waiting, changes requested. Show inline review comments linked to file and line. Click Draft AI Resolution Response to show the AI-generated reply. The AI resolution reply drafting shows Gemini understanding review context and generating a professional developer response.

---

## Slide 8: Release Gate & 7-Factor Risk Score

GitPet combines two scoring systems into one health model. The Release Gate uses five weighted pillars to evaluate deployment readiness. Tests passing carries 25 percent weight with a target of 100 percent passing. Code coverage carries 20 percent weight with a target of at least 80 percent line coverage. Vulnerabilities carries 25 percent weight with a target of zero High or Critical CVEs. PR approvals carries 15 percent weight with a target of at least 2 peer approvals. Branch freshness carries 15 percent weight with a target of zero commits behind.

Status classification has three tiers. Ready to Ship in green requires a score of at least 85 percent with zero blockers and zero warnings — the Sign Off Release button becomes armed. Caution or Review in amber covers scores from 70 to 84 percent or when non-critical warnings are present. Blocked in red covers scores below 70 percent or when any blocker is active — a failing build, high CVE, or pending PR changes. Every blocker links to a remediation workflow, and teams can export both a readable Markdown summary and a machine-readable JSON artifact.

The 7-Factor Risk Scorecard aggregates into the Health Pool. Branch divergence and drift can deduct up to 35 points. Failed and flaky tests can deduct up to 28. Secrets and security policies can deduct up to 30. Open vulnerabilities can deduct up to 22. Code smells and debt can deduct up to 15. Unreviewed commits and PR lag can deduct up to 15. Large PR size can deduct up to 8. The formula is simple: calculated score equals max of 0 or 100 minus the sum of deductions. That score controls Byte's visual state — Healthy at 80 to 100 HP in green, Attention at 45 to 79 HP in amber, Blocked below 45 HP or when conflicts are detected in orange, and Unsafe at 0 HP or when a destructive hazard is detected in grayscale.

The key insight is that Byte's visual health state is directly computed from these 7 factors. The mascot and the detailed scorecard always represent the same underlying data. For the demo: navigate to the Release Gate page and show the 5-pillar grid, overall score, and active blockers. Navigate to the Risk Scorecard page and show the 7-factor breakdown, HP gauge, and category filters. Click a factor's Remediate with Byte to show it jumping back to the Companion with a pre-filled prompt.

---

## Slide 9: Multimodal AI — Voice & Image Studio

Developers can interact with Byte through text, live voice, speech synthesis, and avatar generation — and each mode includes a fallback so the application remains functional if an external AI service is unavailable.

Live voice and vision streaming uses the Gemini Live API with gemini-3.1-flash-live-preview for bidirectional 16kHz PCM audio streaming over WebSocket. Real-time text transcription lets you see Byte's responses as text while audio streams. An animated audio waveform provides a visual equalizer reflecting active audio input levels. Security controls are strict: the microphone is inactive by default with an explicit permission gate, pulsating visual recording indicators alert when streaming, closing the modal instantly severs the WebSocket and releases media tracks, and zero cloud recording means audio frames are processed ephemerally and never persisted. The fallback is the Web Speech API.

The Pet Avatar Studio uses gemini-3.1-flash-image for custom mascot avatar generation and iterative editing. It is text-prompt driven — describe your custom pet and generate pixel-art sprites. An ephemeral asset registry enforces a 30-minute preview TTL before explicit approval to the active set. An aesthetic SVG fallback generator guarantees offline image generation if the remote service is unavailable. Endpoints include generate, edit, and approve.

Text-to-speech synthesis uses gemini-3.1-flash-tts-preview with the Zephyr voice. The fallback is the browser SpeechSynthesis API.

Multi-tier model fallback chains ensure resilience across all tiers. Fast falls back from gemini-3.1-flash-lite to gemini-3.6-flash to gemini-flash-latest. General falls back from gemini-3.6-flash to gemini-3.5-flash to gemini-flash-latest. Deep falls back from gemini-3.7-flash to gemini-3.6-flash to gemini-flash-latest. Image falls back to the offline SVG generator. Live Voice falls back to the Web Speech API. TTS falls back to browser SpeechSynthesis.

This is the wow-factor moment. If you can do a live voice conversation, do it — it's the most memorable part of the demo. If not, at least show the UI and explain the WebSocket streaming architecture. Emphasize the zero-recording privacy stance. For the demo: click the microphone icon to open the Live Voice Modal and show the audio waveform visualization. If comfortable, speak a brief question to Byte and show the transcription. Open the Image Studio from the avatar menu and show the prompt input and generation interface. Mention that every modality has a fallback — the app never breaks if an API is unavailable.

---

## Slide 10: Architecture & Tech Stack

GitPet is built on a production-shaped architecture. A React 19 and TypeScript frontend connects to an Express gateway server through REST and WebSocket interfaces. The gateway manages AI access, secret redaction, validation, audit events, safety checks, and repository execution. This separation is critical — it prevents an AI response from directly becoming a shell command. The AI can suggest, but only the safety engine and executor can act.

The technology stack is modern and deliberate. The frontend uses React 19, TypeScript, Vite, TailwindCSS v4, Motion (Framer Motion), Lucide Icons, react-markdown with remark-gfm, and Canvas Confetti. The backend uses Node.js, Express, WebSocket, tsx for development, and esbuild for production bundling. AI integration uses the Google Gemini SDK for chat, live audio, image, and TTS. Testing uses Vitest with 31 automated tests. CI/CD runs on GitHub Actions with lint, test, Gitleaks, npm audit, build, and SBOM generation.

The application is organized as a 6-page workspace architecture. The Ambient Companion page provides the pet stage, chat stream, and telemetry quick deck. The Repository and DAG page provides the DAG graph, diffs, stashes, and audit trail. The CI/CD Pipelines page provides the pipeline tracker, flaky tests, and CVE scans. The PR Intelligence page provides review metrics, inline comments, AI replies, and merge. The Release Gate page provides the 5-pillar scorecard, blockers, and artifact export. The Risk Scorecard page provides the 7-factor breakdown, HP gauge, and remediation links.

Backend API routes cover health monitoring, audit logs, live Git status, public GitHub fixture scanning, preview-action dry-run analysis, execute-action for human-approved commands, AI chat, structured repo analysis, image generation and editing, TTS, and the WebSocket live audio endpoint. All API keys are managed server-side with TLS 1.3 and zero data retention.

45 seconds. Don't read every API route aloud — just point to the slide. The architecture slide is for judges who want to verify production-grade engineering. Emphasize the separation of concerns: the gateway sits between the AI and the Git CLI, and the safety engine is the boundary that holds regardless of what the AI suggests.

---

## Slide 11: Security, Governance & Production Readiness

GitPet applies least privilege across four trust boundaries: the browser, the gateway, the repository, and the AI provider. The STRIDE threat model is addressed comprehensively. Spoofing is mitigated by strict CORS, local origin isolation, schema validation, and optional Basic Auth. Tampering is mitigated by input sanitization, role-delimited system prompts, and a regex injection detector. Repudiation is mitigated by a real-time FIFO audit log capturing timestamp, action, AI rationale, and approval status. Information disclosure is mitigated by a runtime token redactor that masks GitHub PATs, AWS keys, Google API keys, and Bearer tokens before transmission. Denial of service is mitigated by token ceilings, model fallback chains, WebSocket rate-limiting, and inactivity disconnect. Elevation of privilege is mitigated by zero shell pass-through, argv arrays only, and destructive flags blocked.

OWASP LLM Top 10 coverage is complete across all 10 categories. Prompt injection is addressed with hardened system prompts, a pre-flight sanitizer, and 31 adversarial tests. Sensitive information disclosure is addressed with regex credential masking and Gitleaks in CI. Supply chain is addressed with pinned dependencies, SBOM generation, and npm audit. Data and model poisoning is addressed with ephemeral context windows and grounded Git CLI evidence. Improper output and XSS is addressed with react-markdown, GFM, and strict HTML escaping. Excessive agency is addressed with the human-in-the-loop invariant, preview modal, and reversal commands. System prompt leakage, vector embedding weakness, hallucinations, and unbounded consumption all have dedicated defenses.

AI governance aligns with NIST AI RMF 1.0 across all nine areas: purpose and scope, risk classification, data governance, human oversight, transparency, model traceability, monitoring, change management, and incident response — all marked as MET.

The 5-tier human-in-the-loop oversight matrix escalates from passive observation to hard-blocked. Level 0 is read-only Git status and pet health display. Level 1 is AI explanations and recommendations with confidence scores. Level 2 is avatar studio generation with a 30-minute preview TTL. Level 3 is safe Git writes requiring a mandatory approver — modal diff preview plus explicit confirm. Level 4 is force-push, hard reset, and branch delete — hard rejection by the safety engine.

Production readiness evidence includes 31 automated tests at 100 percent pass rate, a CI/CD pipeline with TypeScript lint, Vitest, Gitleaks, npm audit, and build verification, a CycloneDX-compatible SBOM, an SRE runbook with health endpoints and disaster recovery procedures, observability through the health and audit-logs endpoints, and SLO targets of 99.9 percent uptime, sub-800ms telemetry latency, and zero unintended data mutations. All 15 participant guidelines and all 20 submission checklist items are marked as MET.

This slide is dense — don't read it all. Highlight three things: STRIDE and OWASP LLM Top 10 coverage, the 5-tier human oversight matrix, and 31 tests passing. Judges who want deeper evidence can reference the docs folder. For the demo: if time permits, run npm test in the terminal to show 31 tests passing, or run curl against the health endpoint to show live server status. Point to the compliance matrix — all guidelines and submission items MET.

---

## Slide 12: Demo Integrity & Live Workspace Mode

Transparency is key for P-15 compliance. GitPet clearly separates its sandbox and live modes. The sandbox is the default and contains 18 deterministic DevSecOps scenarios across four categories. Git workflows include remote sync divergence, merge conflict, detached HEAD, stale branch, unpushed work, clean healthy, and unsafe destructive loss hazard. CI/CD pipelines include build failure, flaky tests, security vulnerability, and deployment success. PR reviews include changes requested, pending review, merge conflicts, and approved ready. Cloud infrastructure includes lost map for Terraform state lock, smoke cloud for Pod CrashLoopBackOff, and shield cracked for S3 anonymous read access.

Live Workspace mode reads actual repository state. It has two data sources. The local host repository endpoint runs read-only git status, rev-parse, log, and stash list to compute real branch divergence, detached HEAD, uncommitted diffs, and in-progress operations. The public GitHub fixture endpoint connects to a real repository with live branch switching across main, feature/cart, fix/checkout-tax, refactor/auth-v2, and feature/oauth-login.

Writes remain disabled by default. Enabling writes requires explicit configuration with GITPET_ALLOW_WRITES set to true, plus a 4-layer safety defense: static rule interception at the code level, contextual lint inspection of the live working tree, dry-run preview simulation before prompting the user, and mandatory human confirmation with zero automated execution. Even then, execution uses execFile with argv arrays — never shell — with a fail-stop parameter approach.

Graceful fallback mechanisms ensure the app never breaks. A deterministic rule-based engine provides structured responses without a Gemini API key. Multi-tier model cascades recover from 404 and 429 errors through the fallback chain. An in-memory SVG avatar canvas provides offline image generation. The Web Speech API provides browser-native voice fallback.

Be explicit about what's sandboxed versus live. Judges appreciate honesty about demo boundaries — it builds credibility. For the demo: toggle the Live Workspace switch in the top bar to show the mode change. Point out the transcript flag indicating sandbox versus live mode. Mention that even in live mode, writes are disabled by default — you must explicitly opt in with GITPET_ALLOW_WRITES equals true.

---

## Slide 13: Team & Closing

GitPet makes DevSecOps health ambient, explainable, and safely actionable. It connects repository history, local changes, pipelines, pull requests, release readiness, security, voice, and image generation in one experience.

We are Team Ribbon Patrol: Aliasgar Husain as Project Lead, Lucas Whitaker, David Castetti, and Faris Nour.

For AI usage transparency per guideline P-06: our runtime AI integration uses Google Gemini 3.6 Flash and 3.7 Flash for LLM inference, gemini-3.1-flash-image for avatar generation, and the Gemini Live API with gemini-3.1-flash-live-preview for bidirectional audio streaming. During development, we used Google AI Studio for prompt prototyping, Antigravity with Gemini for pair-programming, Claude Code for Vitest tests and safety sanitizer refinement, and Microsoft Copilot for code completions and documentation. All AI-suggested code, safety filters, and test boundaries were fully reviewed, audited, and approved by the team.

Five key takeaways. First, ambient awareness — Byte makes repository health visible without terminal hunting. Second, bounded agency — the 2-layer safety engine guarantees zero destructive operations. Third, multimodal AI — text, voice, and image generation with graceful fallbacks. Fourth, DevSecOps intelligence — 7-factor risk scoring, DAG visualization, CI/CD and PR telemetry. Fifth, production-grade — 31 tests, STRIDE threat model, NIST AI RMF governance, SBOM, and an SRE runbook.

Most importantly, GitPet does not replace developer judgment. GitPet makes the evidence visible and keeps the developer in control.

You can try it yourself: clone the repo, install dependencies, add your Gemini API key, and run npm run dev to open localhost port 3004. If no API key is provided, the application falls back to robust rule-based responses — you can still navigate the full interface.

Close strong. Thank the judges, mention the GitHub repo URL, and invite them to try it live. If there's Q&A, be ready for: safety engine implementation details, sandbox versus live mode, model fallback chains, and how the 7-factor risk score is computed.

---

## Suggested Presentation Timing

| Segment | Slides | Duration |
| :--- | :--- | :--- |
| Opening & Problem | Slides 1–2 | ~1.5 minutes |
| Live AI Chat Demo | Slide 3 | ~1.5 minutes |
| Safety Engine | Slide 4 | ~1.5 minutes |
| Feature Walkthrough | Slides 5–9 | ~4 minutes |
| Architecture & Security | Slides 10–11 | ~1.5 minutes |
| Demo Integrity | Slide 12 | ~1 minute |
| Team & Closing | Slide 13 | ~1 minute |
| **Total** | **13 slides** | **~10–12 minutes** |

**Q&A Backup Slides:** Slides 5 through 12 can be expanded with deeper detail if judges ask about specific features. The appendix in `PRESENTATION_SLIDES.md` provides keyboard shortcuts, npm scripts, and a documentation index for quick reference.