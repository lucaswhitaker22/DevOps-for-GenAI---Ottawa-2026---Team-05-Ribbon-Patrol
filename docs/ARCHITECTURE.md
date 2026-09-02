# Architecture & System Design Document: GitPet

**Project:** GitPet (Ambient DevSecOps Repository Companion)  
**Version:** 1.0.0-production (August 2026)  
**Team:** Ribbon Patrol (Team 05)  
**Standards:** C4 Architecture Model / NIST AI RMF 1.0 / OWASP DevSecOps Reference Architecture  
**Repository:** [lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol](https://github.com/lucaswhitaker22/DevOps-for-GenAI---Ottawa-2026---Team-05-Ribbon-Patrol)  

---

## 1. System Context Architecture (C4 Level 1)

GitPet operates as an ambient DevSecOps intelligence layer sitting directly beside the software developer's workstation. It continuously ingests telemetry from local Git repositories, live public GitHub fixtures, and CI/CD pipelines, synthesizes findings using Google Gemini models, and safely executes bounded, human-confirmed remediation actions.

```mermaid
graph TD
    %% Styling Definitions
    classDef dev fill:#1e1b4b,stroke:#7c3aed,stroke-width:2px,color:#ffffff;
    classDef platform fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    classDef external fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#f8fafc;
    classDef gemini fill:#042f2e,stroke:#14b8a6,stroke-width:2px,color:#ffffff;

    Dev["Developer / DevOps Engineer<br/>(User)"]:::dev

    subgraph GitPetSystem ["GitPet Platform (Port 3004)"]
        Frontend["GitPet React 19 Frontend<br/>(Multi-Page Dashboard, Pixel Canvas, Web Audio)"]:::platform
        Backend["GitPet Node.js / Express Gateway<br/>(Safety Gate, Executor, Audit Buffer)"]:::platform
    end

    subgraph LocalAndRemoteSources ["Workspace & Repository Sources"]
        LocalGit["Local Git Repository & CLI<br/>(Read-Only Scanner / Safe Argv Executor)"]:::external
        GitHubFixture["Public GitHub Test Fixture<br/>(farisnour/gitpet-acme-corp-ecommerce-store)"]:::external
    end

    subgraph GoogleCloudGenAI ["Google Gemini Cloud Platform (@google/genai v2.4.0)"]
        GeminiFast["Fast Tier: gemini-3.1-flash-lite<br/>(Quick Diagnostics & Commit Messages)"]:::gemini
        GeminiGeneral["General Tier: gemini-3.6-flash<br/>(Conversational Chat & Status Reports)"]:::gemini
        GeminiDeep["Deep Tier: gemini-3.7-flash<br/>(Complex Rebase & Architecture Analysis)"]:::gemini
        GeminiLive["Live Voice: gemini-3.1-flash-live-preview<br/>(Low-Latency Bidirectional Audio WebSocket)"]:::gemini
        GeminiImage["Image Studio: gemini-3.1-flash-image<br/>(Custom Avatar Generation & Visual Editing)"]:::gemini
        GeminiTTS["Speech Synthesis: gemini-3.1-flash-tts-preview<br/>(Companion Spoken Audio)"]:::gemini
    end

    %% User Interactions
    Dev <-->|"Interactive UI / Quick Palette (Cmd+K) / Sound Cues"| Frontend
    Dev <-->|"Real-Time Voice Streaming"| Frontend

    %% Internal Communication
    Frontend <-->|"HTTP REST API & WebSocket (/live)"| Backend

    %% Backend Integrations
    Backend <-->|"Read-Only Git Scans / Safe Argv Execution"| LocalGit
    Backend <-->|"REST API Sync (Branches, PRs, CI Steps)"| GitHubFixture

    %% AI Integrations
    Backend <-->|"Structured Prompts & Context (TLS 1.3 / Redacted Keys)"| GeminiFast
    Backend <-->|"Multi-Turn Conversational Reasoning"| GeminiGeneral
    Backend <-->|"Deep DAG & Rebase Analysis"| GeminiDeep
    Backend <-->|"Bidirectional PCM Audio Streaming"| GeminiLive
    Backend <-->|"Image Generation & Edits (30m Ephemeral Registry)"| GeminiImage
    Backend <-->|"Text to PCM Audio (24kHz Zephyr Voice)"| GeminiTTS
```

---

## 2. Container Architecture (C4 Level 2)

The GitPet platform consists of two high-performance containers running concurrently on the host: a React 19 Single Page Application (SPA) and a Node.js/Express API gateway with embedded WebSocket streaming.

```mermaid
graph TB
    %% Styling
    classDef client fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#ffffff;
    classDef gateway fill:#2a2b36,stroke:#7c3aed,stroke-width:2px,color:#ffffff;
    classDef store fill:#064e3b,stroke:#10b981,stroke-width:1px,color:#ffffff;
    classDef ext fill:#1e293b,stroke:#475569,stroke-width:1px,color:#ffffff;

    subgraph ClientContainer ["Frontend Container (React 19 + Vite 6 + Tailwind 4)"]
        SPA["App.tsx State Orchestrator<br/>(Hash Router, Theme State, Scenario Manager)"]:::client
        AudioEffects["audioEffects.ts & audioStreamer.ts<br/>(Web Audio Synthesis & PCM Encoder)"]:::client
        Normalizer["gitDagNormalizer.ts & diffParser.ts<br/>(Topological Lineage & Unified Diff Parser)"]:::client
        ReleaseCalc["releaseReadiness.ts<br/>(5-Pillar Scorecard Calculation)"]:::client
    end

    subgraph ServerContainer ["Backend Gateway Container (Node.js 20+ / Express 4.21)"]
        ExpressApp["server.ts Express Router<br/>(14 REST Endpoints)"]:::gateway
        WSServer["WebSocket Server (/live)<br/>(ws 8.21 Streaming Gateway)"]:::gateway
        SafetyEngine["safety.ts<br/>(2-Layer Safety Policy: 8 Static + 7 Contextual)"]:::gateway
        Executor["executor.ts<br/>(Pure Argv Child Process Executor)"]:::gateway
        AuthMiddleware["auth.ts<br/>(Timing-Safe Constant-Time Basic Auth)"]:::gateway
        GitHubService["githubClient.ts<br/>(Octokit-free REST Client & Rate Limiting)"]:::gateway
        
        %% In-Memory Stores
        AuditBuffer[("FIFO Ring Buffer<br/>(Max 200 Audit Events)")]:::store
        AssetRegistry[("Asset Registry<br/>(30-Min TTL Preview Store)")]:::store
        FallbackEngine[("Deterministic Rule Engine<br/>(Zero API Key Offline Fallback)")]:::store
    end

    subgraph ExternalServices ["External Boundaries"]
        GitCLI["Local Git CLI (process.cwd)"]:::ext
        GitHubAPI["GitHub REST API"]:::ext
        GeminiAPI["Google Gemini Cloud APIs"]:::ext
    end

    %% Client Internal
    SPA --> AudioEffects
    SPA --> Normalizer
    SPA --> ReleaseCalc

    %% Client to Server
    SPA <-->|"HTTP JSON Requests"| ExpressApp
    SPA <-->|"Bidirectional Audio WebSocket"| WSServer

    %% Server Internal
    ExpressApp --> AuthMiddleware
    ExpressApp --> SafetyEngine
    ExpressApp --> Executor
    ExpressApp --> GitHubService
    ExpressApp --> AuditBuffer
    ExpressApp --> AssetRegistry
    ExpressApp --> FallbackEngine
    WSServer --> AuditBuffer

    %% Server to External
    Executor <-->|"execFile('git', argv)"| GitCLI
    GitHubService <-->|"HTTPS GET"| GitHubAPI
    ExpressApp <-->|"GoogleGenAI SDK (@google/genai)"| GeminiAPI
    WSServer <-->|"ai.live.connect"| GeminiAPI
```

---

## 3. Component Architecture (C4 Level 3)

### 3.1 Frontend Component Architecture

GitPet organizes the user interface into 6 dedicated full-page workspaces, global modal dialogues, and headless utility engines:

```mermaid
graph TB
    classDef core fill:#1e293b,stroke:#0f172a,color:#f8fafc;
    classDef page fill:#1e1b4b,stroke:#7c3aed,stroke-width:2px,color:#ffffff;
    classDef modal fill:#1e3a8a,stroke:#3b82f6,stroke-width:1px,color:#ffffff;
    classDef util fill:#064e3b,stroke:#10b981,stroke-width:1px,color:#ffffff;

    App["App.tsx<br/>Root Orchestrator & State Container"]:::core
    Sidebar["SidebarNav.tsx<br/>Collapsible Responsive Sidebar"]:::core
    TopBar["TopBar.tsx<br/>Breadcrumb Header & Controls"]:::core

    subgraph DedicatedPages ["6 Full-Page Workspaces"]
        P1["#companion: PetStage.tsx & ChatStream.tsx<br/>Pixel Mascot, 18 Symptoms, 4 Personas"]:::page
        P2["#repository: RepositoryPage.tsx<br/>GitDagVisualizer.tsx & DiffViewer.tsx"]:::page
        P3["#cicd: CICDPage.tsx<br/>5-Stage Progression & Flaky Quarantine"]:::page
        P4["#pr: PRIntelligencePage.tsx<br/>Turnaround Clock, Inline Threads, AI Reply"]:::page
        P5["#release: ReleaseReadinessPage.tsx<br/>5-Pillar Scorecard & Compliance Export"]:::page
        P6["#risk: RiskScorePage.tsx<br/>7-Factor HP Pool & Category Filters"]:::page
    end

    subgraph GlobalModals ["Global Modals & Utility Dialogs"]
        M1["AICommitGeneratorModal.tsx (Conventional Commits 1.0.0)"]:::modal
        M2["PreviewChangesModal.tsx (Dry-Run Approval Gate)"]:::modal
        M3["QuickPaletteModal.tsx (Command Palette ⌘K)"]:::modal
        M4["LiveVoiceModal.tsx (Live Audio Streaming UI)"]:::modal
        M5["ImageStudioModal.tsx (Pet Avatar Studio)"]:::modal
        M6["ReleaseReadinessModal.tsx (5-Pillar Gate Modal)"]:::modal
        M7["RiskScoreModal.tsx (7-Factor Health Breakdown)"]:::modal
    end

    subgraph HeadlessEngines ["Utility & Normalization Engines"]
        U1["gitDagNormalizer.ts (DAG Lane Routing & Topo Sort)"]:::util
        U2["diffParser.ts (Unified Diff Hunk Parsing)"]:::util
        U3["releaseReadiness.ts (5-Pillar Mathematical Formula)"]:::util
        U4["audioEffects.ts & audioStreamer.ts (Web Audio & PCM)"]:::util
    end

    App --> Sidebar
    App --> TopBar
    App --> P1 & P2 & P3 & P4 & P5 & P6
    App --> M1 & M2 & M3 & M4 & M5 & M6 & M7

    P2 --> U1 & U2
    P5 --> U3
    P1 --> U4
    M4 --> U4
```

### 3.2 Backend Subsystem Architecture (`server.ts` & `src/server/`)

```mermaid
graph LR
    classDef router fill:#2a2b36,stroke:#7c3aed,stroke-width:2px,color:#ffffff;
    classDef safety fill:#7c2d12,stroke:#ef4444,stroke-width:2px,color:#ffffff;
    classDef exec fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#ffffff;
    classDef auth fill:#854d0e,stroke:#eab308,stroke-width:2px,color:#ffffff;
    classDef data fill:#1e293b,stroke:#475569,stroke-width:1px,color:#ffffff;

    Router["Express Router (server.ts)"]:::router

    subgraph SafetySubsystem ["Safety & Execution Subsystem"]
        Auth["auth.ts<br/>basicAuth() with timingSafeEqual"]:::auth
        SafetyGate["safety.ts<br/>evaluateCommand(cmd, context)"]:::safety
        StaticRules["Static Rules (8 Rules)<br/>force-push, hard-reset, clean, etc."]:::safety
        ContextLints["Contextual Lints (7 Lints)<br/>stash-misses-untracked, diverged-ff, etc."]:::safety
        Executor["executor.ts<br/>executeApprovedCommand()"]:::exec
    end

    subgraph TelemetrySubsystem ["Observability & Telemetry"]
        Audit["logRequestAudit()<br/>In-Memory Ring Buffer (max 200)"]:::data
        LiveScanner["scanLiveWorkspace()<br/>detectInProgressOperation()"]:::data
        AssetStore["assetRegistry<br/>RegisteredAsset (30m TTL)"]:::data
    end

    Router --> Auth
    Router --> SafetyGate
    SafetyGate --> StaticRules
    SafetyGate --> ContextLints
    Router --> Executor
    Executor --> SafetyGate
    Router --> Audit
    Router --> LiveScanner
    Router --> AssetStore
```

---

## 4. Core Data Flows & Interaction Sequences (C4 Level 4)

### Sequence 1: Live Workspace Scanning & Telemetry Ingestion
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as React Frontend
    participant Gateway as Express Gateway (server.ts)
    participant Git as Local Git Worktree
    participant Audit as Telemetry Ring Buffer

    User->>UI: Toggles "Live Workspace Mode"
    UI->>Gateway: GET /api/git/live-status
    Gateway->>Git: git rev-parse --is-inside-work-tree
    Gateway->>Git: git rev-parse --git-dir (Probe rebase-merge, MERGE_HEAD, etc.)
    Gateway->>Git: git branch --show-current / git status --porcelain=v1
    Gateway->>Git: git log -n 12 / git stash list
    Git-->>Gateway: Raw git metadata & status hunks
    Gateway->>Gateway: computeRepositoryHealth(liveState)
    Gateway->>Audit: logRequestAudit('/api/git/live-status', 200, latency)
    Gateway-->>UI: 200 OK { liveState, 7-factor health, primarySymptom }
    UI->>UI: Updates PixelPetGraphic aura, TopBar status, and DAG graph
```

### Sequence 2: Conversational Chat Reasoning & Safe Action Recommendation
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as ChatStream.tsx
    participant Gateway as Express Gateway (/api/ai/chat)
    participant Safety as safety.ts
    participant Gemini as Google Gemini Cloud API
    participant Fallback as Offline Rule Engine

    User->>UI: "Status report! What is blocking my pull?"
    UI->>Gateway: POST /api/ai/chat { message, role, tier, state }
    Gateway->>Gateway: Sanitize secrets in prompt (AIza..., ghp_..., sk-...)
    Gateway->>Gateway: Route model chain (Fast: 3.1-lite | Gen: 3.6-flash | Deep: 3.7-flash)
    alt Gemini API Key Present & Available
        Gateway->>Gemini: generateContent({ systemInstruction: rolePrompt, contents })
        Gemini-->>Gateway: AI response text with proposed git command
    else API Key Missing / 429 Quota Exhausted / Offline
        Gateway->>Fallback: generateRuleBasedAction(state, userPrompt)
        Fallback-->>Gateway: Deterministic explanation & safe action
    end
    Gateway->>Safety: evaluateCommand(action.command, state)
    Safety-->>Gateway: SafetyReport { verdict: 'allow'|'warn'|'block', findings }
    Gateway-->>UI: 200 OK { reply, recommendedAction, safety, evidencePoints }
    UI->>UI: Renders markdown response, evidence box, and Safe Action Card
```

### Sequence 3: Dry-Run Safety Preview & Human-in-the-Loop Confirmation
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as PreviewChangesModal.tsx
    participant Gateway as Express Gateway (/api/git/preview-action)
    participant Safety as safety.ts (Layer 1 + Layer 2)
    participant Executor as executor.ts

    User->>UI: Clicks "Preview Diff & Scope"
    UI->>Gateway: POST /api/git/preview-action { command: "git stash push -u && git pull --rebase" }
    Gateway->>Executor: executeApprovedCommand(command, root, context, { dryRun: true })
    Executor->>Safety: evaluateCommand(command, context)
    Safety->>Safety: Check 8 Static Rules (No force-push, no clean, no hard reset)
    Safety->>Safety: Check 7 Contextual Lints (Untracked files, diverged pull, paused rebase)
    Safety-->>Executor: SafetyReport { verdict: 'allow', findings: [] }
    Executor-->>Gateway: ExecutionResult { dryRun: true, steps, writesDisabled }
    Gateway-->>UI: 200 OK { safety, steps, affectedFiles, reversalStep }
    UI->>UI: Displays dry-run report, blast radius, and reversal command (git rebase --abort)
```

### Sequence 4: Bounded Git Command Execution
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as PreviewChangesModal.tsx
    participant Gateway as Express Gateway (/api/git/execute-action)
    participant Executor as executor.ts
    participant Safety as safety.ts
    participant Git as Git CLI Subprocess

    User->>UI: Clicks "Confirm & Run Safe Action"
    UI->>Gateway: POST /api/git/execute-action { command }
    Gateway->>Executor: executeApprovedCommand(command, root, liveContext, { dryRun: false })
    Executor->>Safety: evaluateCommand(command, liveContext) (Re-evaluate at execution time)
    alt Safety Verdict is 'block'
        Safety-->>Executor: Refused by policy
        Executor-->>Gateway: 400 Bad Request { success: false, message }
        Gateway-->>UI: Displays error toast
    else Safety Verdict is 'allow' or 'warn'
        alt GITPET_ALLOW_WRITES !== 'true'
            Executor-->>Gateway: Refused: Writes disabled on server
            Gateway-->>UI: 400 Error (Set GITPET_ALLOW_WRITES=true)
        else GITPET_ALLOW_WRITES === 'true'
            Executor->>Git: git rev-parse HEAD (Capture headBefore anchor)
            loop For each command in chain
                Executor->>Git: execFile('git', argv, { timeout: 60000 })
                Git-->>Executor: { stdout, stderr, exitCode }
            end
            Executor->>Git: git rev-parse HEAD (Capture headAfter anchor)
            Gateway->>Gateway: Re-scan live workspace state
            Gateway-->>UI: 200 OK { success: true, steps, newState }
            UI->>UI: Plays success chime, triggers confetti, updates health & symptom
        end
    end
```

### Sequence 5: Bidirectional Gemini Live Audio Streaming
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as LiveVoiceModal.tsx
    participant Gateway as WebSocket Server (/live)
    participant GeminiLive as Gemini Live API (gemini-3.1-flash-live-preview)

    User->>UI: Clicks Microphone Icon
    UI->>Gateway: Connect WebSocket ws://localhost:3004/live
    Gateway->>GeminiLive: ai.live.connect({ model: 'gemini-3.1-flash-live-preview', modalities: [AUDIO] })
    GeminiLive-->>Gateway: Session Established
    Gateway-->>UI: { type: 'ready', message: 'Connected' }
    
    loop Real-Time Audio Exchange
        User->>UI: Speaks: "Byte, do I have uncommitted work?"
        UI->>Gateway: { type: 'audio', audio: 'base64_pcm_chunk_16khz' }
        Gateway->>GeminiLive: sendRealtimeInput({ audio: pcmData })
        GeminiLive-->>Gateway: onmessage: { modelTurn: { parts: [audioChunk, textChunk] } }
        Gateway-->>UI: { type: 'audio', audio: pcmOut } + { type: 'text', text: "You have 2 modified files!" }
        UI->>UI: Streams audio via Web Audio API & renders real-time transcript
    end
```

### Sequence 6: Ephemeral Image Generation, Editing & Promotion
```mermaid
sequenceDiagram
    autonumber
    actor User as Developer
    participant UI as ImageStudioModal.tsx
    participant Gateway as Express Gateway (/api/ai/images/*)
    participant Registry as In-Memory Asset Registry
    participant GeminiImg as Gemini 3.1 Flash Image

    User->>UI: Types prompt: "Cyberpunk neon Byte with headphones"
    UI->>Gateway: POST /api/ai/images/generate { prompt, aspectRatio: "1:1" }
    Gateway->>GeminiImg: generateContent({ model: 'gemini-3.1-flash-image', contents })
    GeminiImg-->>Gateway: Base64 PNG image candidate
    Gateway->>Registry: Register ephemeral asset { id: 'prev_m18x', expiresAt: now + 30m }
    Gateway-->>UI: 200 OK { assetId: 'prev_m18x', imageUrl, status: 'preview' }
    UI->>UI: Displays preview in studio gallery with 30-minute timer

    User->>UI: Clicks "Approve & Apply Avatar"
    UI->>Gateway: POST /api/ai/images/prev_m18x/approve
    Gateway->>Registry: Set asset.status = 'approved', update currentApprovedAssetId
    Gateway-->>UI: 200 OK { approvedAsset, currentApprovedAssetId }
    UI->>UI: PetStage immediately updates active avatar graphic
```

### Sequence 7: 5-Pillar Release Readiness Synthesis & Sign-Off
```mermaid
sequenceDiagram
    autonumber
    actor User as Release Engineer
    participant UI as ReleaseReadinessPage.tsx
    participant Gateway as Express Gateway (/api/ai/release-readiness)
    participant Calc as releaseReadiness.ts
    participant Gemini as Gemini 3.6/3.7 Flash

    User->>UI: Navigates to #release
    UI->>Gateway: POST /api/ai/release-readiness { state }
    Gateway->>Calc: calculateReleaseReadiness(state)
    Calc-->>Gateway: Base report (Score: 78%, status: 'amber', 1 blocker)
    Gateway->>Gemini: generateContent({ prompt: "Analyze 5 pillars...", schema: JSON })
    Gemini-->>Gateway: JSON { headline, executiveSummary, canShip: false, keyBlockers }
    Gateway-->>UI: 200 OK { report: { overallScore: 78, headline, canShip, blockers } }
    UI->>UI: Renders interactive gauge, blocker remediation buttons, and export actions
    User->>UI: Clicks "Download JSON Compliance Artifact"
    UI->>User: Downloads release-readiness-acme-corp-2026-08-20.json
```

---

## 5. Security Architecture & Threat Boundaries

```mermaid
graph TD
    classDef trusted fill:#14532d,stroke:#22c55e,stroke-width:2px,color:#ffffff;
    classDef boundary fill:#7c2d12,stroke:#ef4444,stroke-width:2px,color:#ffffff;
    classDef untrusted fill:#1e293b,stroke:#64748b,stroke-width:1px,color:#f8fafc;

    subgraph UntrustedZone ["Untrusted Network / Client Viewport"]
        Browser["Browser DOM / React SPA Client"]:::untrusted
        UserInput["User Input / Chat Prompts / Web Audio"]:::untrusted
    end

    subgraph TrustBoundary1 ["Trust Boundary 1: Gateway Ingress"]
        BasicAuth["HTTP Basic Auth (crypto.timingSafeEqual)"]:::boundary
        PayloadLimit["Express JSON Body Parser (25MB Limit)"]:::boundary
    end

    subgraph TrustedGateway ["Trusted Gateway Core (Node.js)"]
        Sanitizer["Secret Token Redaction Engine<br/>(AIza..., ghp_..., sk-..., Bearer...)"]:::trusted
        SafetyGate["safety.ts (8 Static Rules + 7 Contextual Lints)"]:::trusted
        Executor["executor.ts (child_process.execFile with argv arrays)"]:::trusted
        WriteOptIn["Write Opt-In Gate (GITPET_ALLOW_WRITES=true)"]:::trusted
    end

    subgraph TrustBoundary2 ["Trust Boundary 2: External Execution"]
        GitCLI["Local Filesystem / Git CLI Subprocess"]:::boundary
        GeminiCloud["Google Gemini Cloud APIs (TLS 1.3)"]:::boundary
    end

    Browser & UserInput --> TrustBoundary1
    TrustBoundary1 --> Sanitizer
    Sanitizer --> SafetyGate
    SafetyGate --> WriteOptIn
    WriteOptIn --> Executor
    Executor --> GitCLI
    Sanitizer --> GeminiCloud
```

### Security Defenses:
1. **Argv Child Process Execution**: Commands never pass through a system shell (`sh`, `bash`, `cmd.exe`, `powershell`). Commands are split using quote-aware tokenization into argument arrays (`['git', 'pull', '--rebase']`), neutralizing command injection vulnerabilities.
2. **Contextual Untracked File Protection**: `safety.ts` detects untracked files in the working directory before approving `git stash`, preventing silent data loss.
3. **Strict Zero Force-Push Policy**: Prohibits un-leased force pushes (`--force`), destructive resets (`--hard`), and unmerged branch drops (`-D`).
4. **Secret Token Redaction**: Scans all prompt inputs and repository diffs for high-entropy API keys and tokens before sending context to Google Gemini.
5. **Timing-Safe Basic Authentication**: Optional HTTP Basic Auth verified using `crypto.timingSafeEqual` to eliminate timing side-channel attacks.

---

## 6. Deployment & Runtime Topology

GitPet supports two runtime topologies:

### Development Runtime (`npm run dev`):
* Express server runs via `tsx watch server.ts`.
* Vite dev server is embedded as Express middleware (`appType: 'spa'`).
* Vite HMR watcher excludes non-source repository files (`docs/**`, `.git/**`, `metadata.json`, screenshots) to prevent full page reloads and state loss during live repository scans.

### Production Runtime (`npm run build` && `npm run start`):
* Frontend is compiled to optimized static assets in `dist/` via `vite build`.
* Backend server is compiled and bundled into a single CommonJS file (`dist/server.cjs`) via `esbuild`.
* Express serves static assets from `dist/` and acts as a SPA fallback router for non-API routes.
* Dockerized deployment available via multi-stage `Dockerfile` and `docker-compose.yml`.
