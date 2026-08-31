# 🐕 Feature 01: Ambient Companion (`#companion`)

The **Ambient Companion** workspace represents the emotional and operational mission control center of GitPet. It translates cold Git and infrastructure telemetry into expressive physical postures, ambient lighting auras, interactive sound cues, and multi-turn conversational guidance powered by Google Gemini.

---

## 🌟 Key Functional Capabilities

```
+------------------------------------+-------------------------------------------+
| [🐕 Pixel Mascot Canvas]           | [Multi-Turn Gemini Companion]             |
| Status: Attention • Uneasy & Alert | Role: Byte Mascot | Architect | Auditor   |
| Health: 68% HP [========------]    | Model: Fast | General | Deep Reasoning    |
| Speech: "Behind remote by 3!"      |                                           |
| Actions: [🐾 Pet] [☕ Fuel] [💬 Ask]| "Hello! I'm Byte. Behind by 3 commits.    |
|                                    | Stash your work before pulling!"          |
+------------------------------------+-------------------------------------------+
| [4-Card Live Telemetry Quick Deck] | [Recommended Safe Action Card]            |
| 🌲 Branch Drift  | ⚡ CI/CD Health  | Command: `git stash && git pull ...`      |
| 🔀 PR Intelligence | 🚀 Release Gate| [Preview Diff]  [Confirm Safe Fix]        |
+------------------------------------+-------------------------------------------+
```

### 1. Pixel Mascot Graphic & 18 Symptom Auras (`PixelPetGraphic.tsx`)
Byte dynamically maps repository health and DevSecOps events into 18 physical symptom states:

| Symptom Key | Trigger Condition | Visual Appearance & Aura | Emotional Mood |
| :--- | :--- | :--- | :--- |
| `healthy` | 100% synchronized, clean working tree | Smiling expression, green halo glow | Relaxed & Playful |
| `behind_remote` | Commits behind upstream origin | Backpack posture, looking over shoulder | Uneasy & Alert |
| `local_uncommitted` | Modified or untracked files in tree | Carrying stacked papers, amber aura | Busy & Watchful |
| `conflict` | Unresolved merge conflict markers | Tangled in yarn ball, spiral eyes | Distressed & Tangled |
| `hazard_unsafe` | Work-loss hazard (pulling over dirty tree) | Shielded turtle shell, grayscale contrast | Guarded & Defensive (0% HP) |
| `failed_build` | CI/CD build step exited with non-zero | Sick thermometer expression, fever blush | Distressed & Ill |
| `flaky_tests` | Intermittent test failures in spec suites | Dizzy eyes, spinning stars | Confused & Dizzy |
| `vulnerability` | High/critical CVEs in dependencies | Defective armor shield, pulsing beacon | Shielded & Cautious |
| `pr_changes_requested` | Reviewer requested code changes | Holding notepad and pencil | Patient & Waiting |
| `pr_pending_review` | PR waiting on approvals | Looking at hourglass | Patient |
| `pr_conflicted` | PR branch conflicts with base | Tangled ribbon | Blocked |
| `pr_approved` | All PR checks green & approvals met | Party hat, celebration sparkles | Joyful & Triumphant |
| `lost_map` | Terraform state backend lock unavailable | Broken compass, lost expression | Disoriented |
| `smoke_cloud` | Kubernetes pod crash or missing env vars | Coughing expression, smoke cloud | Choked & Alarmed |
| `shield_cracked` | Cloud security policy deviation | Shattered blue shield | Security Alert |

#### Autonomous Physical Loops:
* **Natural Blinking**: Eyes automatically blink every 3.2 to 5.2 seconds with a 160ms animation window.
* **Cursor Tracking**: Mascot pupils and head position follow mouse coordinates across the container (`handleMouseMove`).
* **Grayscale Safety Interlock**: If health drops to `0%` or status is `Unsafe`, the pet automatically desaturates to indicate high danger.

---

### 2. Interactive Action Dock

Located directly at the base of the avatar canvas:
* **🐾 Pet Mascot (`Spacebar`)**: Synthesizes purring audio, produces floating heart particles, and boosts mascot mood.
* **☕ Fuel Mascot**: Hands Byte a steaming coffee mug, playing coffee slurping audio and applying a `+100 Energy` boost.
* **🎩 Outfit Customizer**: Cycles through wearable accessories:
  * *Classic Bot* (Standard pixel mascot)
  * *Dev Headphones* (Noise-canceling gaming headset)
  * *AR Cyber Visor* (Neon cybernetic sunglasses)
  * *Hot Coffee Mug* (Handheld thermal mug)
  * *Patrol Badge* (Ribbon DevSecOps gold star badge)
  * *Git Wizard Hat* (Pointed magical hat)
* **💬 Ask Quip**: Prompts Byte to cycle through quick developer pro-tips regarding atomic commits, linear history, and stash hygiene.

---

### 3. Live Telemetry Mission Control Quick Deck

Directly underneath the mascot stage, 4 interactive telemetry cards provide real-time status and instant navigation into full pages:
1. **🌲 Branch Drift & Tree**: Displays `↑ ahead` / `↓ behind` commit counts and dirty file counts. Clicking navigates to `#repository`.
2. **⚡ Pipeline & Test Health**: Displays CI build pass/fail status, test pass rate %, and open CVE count. Clicking navigates to `#cicd`.
3. **🔀 PR Intelligence**: Displays active PR number, review state, and reviewer waiting days. Clicking navigates to `#pr`.
4. **🚀 Release Gate**: Displays 5-pillar deployment readiness score % and ship gate sign-off status. Clicking navigates to `#release`.

---

### 4. Multi-Turn Gemini Conversational Stream (`ChatStream.tsx`)

A dedicated conversational stream providing evidence-based repository advice and verified safe Git actions:

* **Role Personas**:
  * **Byte Mascot**: Friendly, encouraging, ambient companion with witty developer humor.
  * **Senior Architect**: Deep DAG topology, merge-base analysis, and long-term branching strategies.
  * **Safety Auditor**: Zero data loss compliance, strict reversal commands, and blast radius auditing.
  * **Git Tutor**: Pedagogical mental models explaining Git internals (blobs, trees, commit objects, index).
* **Model Speed & Depth Tiers**:
  * **Fast**: Instant responses powered by `gemini-2.5-flash`.
  * **General**: Balanced latency and reasoning depth.
  * **Deep Reasoning**: Complex structural analysis powered by `gemini-2.5-pro`.
* **Evidence Signals Box**: Every diagnosis cites concrete repository data points (current branch, upstream divergence, dirty file list, conflicting markers).
* **Recommended Safe Action Card**:
  * Formats verified shell commands with syntax highlighting.
  * 1-Click terminal copy button with visual confirmation.
  * Displays expected outcome and pre-computed safe reversal command.
  * **Preview Diff & Scope Button**: Opens the human-in-the-loop preview confirmation modal.
  * **Confirm & Execute Button**: Executes the verified bounded action.
* **Categorized Prompt Chips**: Instant 1-click prompts for common developer questions:
  * `📊 Status report & diagnostics`
  * `🚨 Work-loss risk assessment`
  * `🌲 Explain branch divergence`
  * `🔀 Review PR & reviewer feedback`
  * `⚡ CI/CD test failure diagnosis`
