# 🛠️ Feature 07: Specialized Modals & Tools

GitPet provides an array of global modals and utility subsystems accessible from anywhere in the application.

---

## 🌟 Key Functional Capabilities

| Modal Name | Shortcut / Trigger | Core Technology | Primary Functionality |
| :--- | :--- | :--- | :--- |
| **AI Conventional Commit Generator** | Header button / Repo view | `@google/genai` (Gemini 2.5 Flash) | Generates standardized semantic commits conforming to Conventional Commits 1.0.0 based on active diffs. |
| **Preview Changes & Approval Gate** | "Preview Changes" buttons | Safety Engine (`safety.ts`) | Mandatory human-in-the-loop approval gate showing command, blast radius, affected files, and reversal steps. |
| **Quick Command Palette** | `⌘K` / `Ctrl+K` | React + Fuzzy Search | Global fuzzy command bar for instant page navigation, scenario switching, action rollbacks, and audio toggling. |
| **Live Voice & Vision Streaming** | Microphone trigger | Gemini Live Audio WebSocket | Real-time bidirectional voice conversation with Byte using streaming audio. |
| **Image Studio (Avatar Studio)** | Avatar menu | Gemini Imagen (`gemini-3.1-flash-image`)| Custom mascot avatar generation and editing using text prompts. |
| **Pitch Deck Presentation Modal** | `P` key | React Presentation Deck | In-app 7-slide pitch deck covering the problem, architecture, DevSecOps safety model, and demo highlights. |

---

### 1. AI Conventional Commit Generator Modal (`AICommitGeneratorModal.tsx`)
* **Endpoint**: `POST /api/ai/commit`
* **Input Schema**:
  ```json
  {
    "diffContext": "diff --git a/src/auth.ts b/src/auth.ts...",
    "commitType": "feat",
    "scope": "cart",
    "breakingChange": false
  }
  ```
* **Semantic Type Selection**: Select or generate commits conforming to `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, or `ci`.
* **Scope & Subject Formatting**: Formats commit header with proper scope syntax (e.g. `feat(cart): implement multi-currency checkout`).
* **Breaking Change Alerts**: Flags breaking API changes with `BREAKING CHANGE:` footer notices.
* **Diff Context Aware**: Ingests active working tree diffs to suggest accurate commit subjects.
* **1-Click Apply / Copy**: Copy formatted message or send directly to the assistant.

---

### 2. Preview Changes & Diff Confirmation Modal (`PreviewChangesModal.tsx`)
* **Endpoint**: `POST /api/git/preview-action`
* **Human-in-the-Loop Safety Enforcement**: Ensures zero blind command execution.
* **Blast Radius Calculation**: Lists every file affected by the command and classifies file mutations.
* **Pre-Computed Reversal Step**: Shows the exact command required to undo the action (e.g., `git stash pop`, `git rebase --abort`).
* **Explicit Execution Confirmation**: Action executes only after explicit developer approval, routing to `POST /api/git/execute-action`.

---

### 3. Quick Command Palette (`QuickPaletteModal.tsx`)
* **Global Access**: Trigger with `⌘K` (macOS) or `Ctrl+K` (Windows/Linux).
* **Fuzzy Filtering**: Search across commands, scenarios, navigation routes, and actions.
* **Instant Rollback**: 1-click rollback of the last executed command.
* **Audio & Mascot Shortcuts**: Toggle audio mute or pet Byte directly from the keyboard.

---

### 4. Live Voice Streaming (`LiveVoiceModal.tsx`)
* **Endpoint**: `WebSocket ws://localhost:3001/live`
* **Bidirectional PCM Audio**: Streams audio at 16kHz/24kHz to the Gemini Live API via WebSockets.
* **Real-time Voice Feedback**: Talk directly with Byte to diagnose repository issues hands-free.
* **Real-time Live Audio Waveform**: Animated visual equalizer reflecting active audio input levels.

---

### 5. Pet Avatar Studio (`ImageStudioModal.tsx`)
* **Endpoints**: `POST /api/ai/images/generate`, `POST /api/ai/images/edit`, `POST /api/ai/images/:id/approve`
* **Mascot Customization**: Generates custom avatar variations using `gemini-3.1-flash-image`.
* **Ephemeral Asset Registry**: 30-minute preview lifecycle before applying to the active stage.
* **Aesthetic SVG Fallback**: Guaranteed offline fallback generator if remote image generation is unavailable.

---

### 6. Pitch Deck Presentation Modal (`PitchDeckModal.tsx`)
* **Instant Presentation**: Press `P` anywhere in the app to open the 7-slide pitch deck:
  1. *Title & Problem*: The Hidden State Crisis in Developer Workflows.
  2. *The Solution*: GitPet — DevSecOps Ambient Companion.
  3. *Architecture*: Multi-Tier Gemini Intelligence + 2-Layer Safety Gate.
  4. *7-Factor Risk & 5-Pillar Gate*: Data-Driven Scoring Engine.
  5. *Live Workspace vs Sandbox*: Dual-Mode Operational Realism.
  6. *Security & Governance*: NIST AI RMF 1.0 & Zero Force-Push Guarantee.
  7. *Team Ribbon Patrol*: Team Credits & Submission Checklist.
