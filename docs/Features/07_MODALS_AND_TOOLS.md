# 🛠️ Feature 07: Specialized Modals & Global Tools

GitPet provides an integrated suite of global modal dialogs, interactive tools, and voice/image studios accessible from anywhere in the application.

---

## 🌟 Key Functional Capabilities

| Modal / Tool Name | Shortcut / Trigger | Core Technology | Primary Functionality |
| :--- | :--- | :--- | :--- |
| **AI Conventional Commit Generator** | Header button / Repo view | `@google/genai` (Gemini 3.1 Flash Lite) | Drafts semantic commits conforming to Conventional Commits 1.0.0 based on active diffs. |
| **Preview Changes & Safety Gate** | "Preview Changes" buttons | Safety Engine (`safety.ts`) | Mandatory human-in-the-loop approval gate showing command line, blast radius, and reversal steps. |
| **Quick Command Palette** | `⌘K` / `Ctrl+K` | React + Fuzzy Search | Global fuzzy command bar for instant page navigation, scenario switching, action rollbacks, and settings. |
| **Live Voice Audio Streaming** | Microphone icon in header | Gemini Live Audio WebSocket (`/live`)| Low-latency bidirectional voice conversation with Byte using streaming PCM audio. |
| **Pet Avatar Studio (Image Studio)** | Palette icon in header | Gemini Image (`gemini-3.1-flash-image`)| Custom mascot avatar generation and visual editing with 30-minute ephemeral preview registry. |
| **Release Readiness Modal** | Header button / Telemetry deck | 5-Pillar Scorecard Engine | Interactive 5-pillar deployment readiness scorecard with AI synthesis and sign-off exports. |
| **Risk Score Modal** | Header badge / HP gauge | 7-Factor Health Pool Engine | Deep-dive modal inspecting the 7-factor repository health pool and deduction breakdown. |

---

## 1. AI Conventional Commit Generator (`AICommitGeneratorModal.tsx`)

* **Semantic Type Selection**: Generates commits conforming to standard types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`, `ci`.
* **Scope & Subject Formatting**: Applies proper Conventional Commits format (e.g. `feat(cart): implement quantity stepper counter`).
* **Breaking Change Detection**: Flags breaking API adjustments with `BREAKING CHANGE:` footer notices.
* **Diff Context Aware**: Ingests active working tree diffs to suggest accurate commit subjects.
* **1-Click Apply & Copy**: Copy formatted message or stage and commit directly.

---

## 2. Preview Changes & Human Approval Gate (`PreviewChangesModal.tsx`)

* **Human-in-the-Loop Enforcement**: Ensures zero blind command execution.
* **Dry-Run Safety Report**: Displays safety verdict (`allow`, `warn`, `block`) and safety findings.
* **Blast Radius Analysis**: Lists all affected files and classifies file mutations.
* **Pre-Computed Reversal Step**: Shows the exact command required to undo the action (e.g., `git stash pop`, `git rebase --abort`).
* **Execution Trigger**: Action executes only upon explicit user confirmation, routing to `POST /api/git/execute-action`.

---

## 3. Quick Command Palette (`QuickPaletteModal.tsx`)

* **Global Access**: Trigger with `⌘K` (macOS) or `Ctrl+K` (Windows/Linux).
* **Fuzzy Search**: Filter across commands, scenarios, navigation routes, and actions.
* **Instant Rollback**: 1-click rollback of the last executed command.
* **Audio & Theme Shortcuts**: Toggle audio mute (`M`), pet Byte (`Spacebar`), or switch dark/light theme directly from the keyboard.

---

## 4. Live Voice Streaming (`LiveVoiceModal.tsx`)

* **Endpoint**: `WebSocket ws://localhost:3004/live`
* **Bidirectional PCM Streaming**: Streams audio at 16kHz/24kHz to `gemini-3.1-flash-live-preview`.
* **Real-time Transcription**: Live text transcript displaying user speech and companion responses.
* **Hands-Free Diagnosis**: Talk directly with Byte to diagnose repository issues hands-free.

---

## 5. Pet Avatar Studio (`ImageStudioModal.tsx`)

* **Endpoints**: `POST /api/ai/images/generate`, `POST /api/ai/images/edit`, `POST /api/ai/images/:id/approve`
* **Mascot Customization**: Generates custom avatar variations using `gemini-3.1-flash-image`.
* **30-Minute Preview Registry**: Ephemeral registry holding generated previews until user explicitly approves them.
* **Dynamic SVG Fallback**: Guaranteed offline fallback generator creating styled SVGs if remote image generation is offline.

---

## 6. Release Readiness Modal (`ReleaseReadinessModal.tsx`)

* Accessible from the top bar or companion deck.
* Renders the interactive gauge, 5-pillar breakdown, blocker inventory, and sign-off actions.

---

## 7. Risk Score Modal (`RiskScoreModal.tsx`)

* Accessible from the health badge or companion stage.
* Renders the 0–100 HP health pool, factor deduction breakdown, and remediation links.
