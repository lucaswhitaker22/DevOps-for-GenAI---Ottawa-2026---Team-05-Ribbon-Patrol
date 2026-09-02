# 🐕 Feature 01: Ambient Companion (`#companion`)

The **Ambient Companion** workspace serves as the operational and emotional mission control center of GitPet. It translates repository drift, pipeline state, and infrastructure telemetry into expressive physical postures, ambient lighting auras, interactive sound cues, and multi-turn conversational guidance powered by Google Gemini.

---

## 🌟 Key Functional Capabilities

```
┌────────────────────────────────────────┬───────────────────────────────────────────┐
│ [🐕 Pixel Mascot Stage (PetStage.tsx)] │ [Multi-Turn Gemini Companion Stream]      │
│ Status: Attention • Uneasy & Alert     │ Persona: Byte | Architect | Auditor | Tutor│
│ Health: 68 HP [========------] 68%     │ Tier: Fast (Lite) | General | Deep Flash  │
│ Dialogue: "Branch is 3 commits behind! │                                           │
│ Stash local files before pulling."     │ "Hello! I noticed origin/main advanced by │
│                                        │ 3 commits. Let's inspect the diff!"       │
│ Actions: [🐾 Pet] [☕ Fuel] [🎩 Outfit] │                                           │
├────────────────────────────────────────┴───────────────────────────────────────────┤
│ [4-Card Live Telemetry Mission Control Deck]                                       │
│ 🌲 Branch Drift: ↑0 ↓3 | ⚡ CI/CD: Passing (100%) | 🔀 PR #214: Waiting 3d | 🚀 Release: 88%│
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Recommended Safe Action Card]                                                     │
│ Command: `git stash push -u -m "wip" && git pull --rebase origin feature/cart`     │
│ Confidence: High (95%) • Risk: Caution • Reversal: `git rebase --abort`            │
│ [🔍 Preview Diff & Scope]  [⚡ Confirm & Execute Action]                           │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Pixel Mascot Graphic & 18 Physical Symptoms (`PixelPetGraphic.tsx`)

Byte dynamically renders 18 distinct physical symptoms based on observed repository, CI/CD, pull request, and cloud infrastructure telemetry:

| Symptom Key | Trigger Condition | Visual Appearance & Accessories | Emotional Mood |
| :--- | :--- | :--- | :--- |
| `clean_sync` | 0 commits ahead/behind, clean working tree | Playful wagging tail, vibrant green halo aura | Relaxed & Cheerful |
| `behind_remote` | Local branch behind upstream tracking branch | Pulling forward on leash, looking over shoulder | Uneasy & Alert |
| `unpushed_work` | Local commits ahead of upstream | Heavy backpack with commit stars | Focused & Burdened |
| `merge_conflict` | Conflicting markers in working tree | Tangled in red & gray yarn, spiral eyes | Distressed & Tangled |
| `stale_branch` | Merged feature branch inactive >30 days | Sleepy nightcap, dusty cobwebs | Drowsy & Inactive |
| `detached_head` | HEAD checked out directly to commit hash | Wandering compass & floating question mark | Lost & Inquiring |
| `destructive_hazard`| Upstream force-push with dirty working tree | Frozen grayscale avatar, crimson alert barrier | **Guarded & Unsafe (0 HP)** |
| `failed_build` | CI/CD build step exited with non-zero code | Sick bot with fever thermometer, flushed cheeks | Distressed & Ill |
| `flaky_tests` | Intermittent test failures in test specs | Trembling companion with sweat drops | Confused & Shaking |
| `vulnerability_risk`| High/Critical CVE flagged in package lock | Shielded metallic armor with pulsing beacon | Armored & Cautious |
| `deploy_success` | CD pipeline deployed cleanly to production | Party hat with confetti particles & fireworks | Triumphant & Celebrating |
| `pr_changes_requested`| Reviewer requested code changes on PR | Review clipboard with red indicator mark | Attentive & Reviewing |
| `pr_pending_review` | PR waiting >3 days for initial peer review | Tapping foot with animated hourglass timer | Patient & Waiting |
| `pr_conflicted` | PR branch has merge conflicts with base | Warning signposts with jagged ribbon | Blocked & Concerned |
| `pr_approved_ready` | PR has required approvals & green CI | Golden approval stamp & green ribbon badge | Confident & Ready |
| `lost_map` | Terraform remote state lock stuck/unavailable | Holding upside-down map, walking in circles | Disoriented & Searching |
| `smoke_cloud` | Kubernetes pod CrashLoopBackOff / missing env | Running through smoke with soot marks | Choked & Alarmed |
| `shield_cracked` | Cloud storage bucket allows anonymous access | Cracked blue shield in defensive posture | Security Alerted |

### Autonomous Physical Loops:
* **Natural Eye Blinking**: Eyes automatically blink every 3.2 to 5.2 seconds with a 160ms animation window.
* **Dynamic Cursor Tracking**: Pupils and head orientation follow mouse coordinates across the container viewport (`handleMouseMove`).
* **Grayscale Safety Interlock**: When health reaches `0 HP` (`destructive_hazard`), the canvas automatically desaturates to indicate high hazard.

---

## 2. Interactive Action Dock

Positioned directly beneath the companion stage:
* **🐾 Pet Mascot (`Spacebar` shortcut)**: Synthesizes purring Web Audio cues, triggers floating heart particles, and boosts mascot mood.
* **☕ Fuel Mascot**: Hands Byte a steaming coffee mug, playing slurping audio and applying a `+100 Energy` boost.
* **🎩 Outfit Customizer**: Cycles through 6 collectible accessories:
  1. *Classic Bot* (Standard pixel mascot)
  2. *Dev Headphones* (Noise-canceling gaming headset)
  3. *AR Cyber Visor* (Neon cybernetic visor)
  4. *Hot Coffee Mug* (Handheld thermal mug)
  5. *Patrol Badge* (Ribbon DevSecOps gold badge)
  6. *Git Wizard Hat* (Pointed magical hat)
* **💬 Ask Quip**: Prompts Byte to cycle through witty, educational repository hygiene pro-tips.

---

## 3. Live Telemetry Mission Control Quick Deck

Directly underneath the mascot stage, 4 interactive telemetry cards provide real-time status and instant navigation into full pages:
1. **🌲 Branch Drift & Tree**: Displays `↑ ahead` / `↓ behind` commit counts and dirty file counts. Clicking navigates to `#repository`.
2. **⚡ Pipeline & Test Health**: Displays CI build pass/fail status, test pass rate %, and open CVE count. Clicking navigates to `#cicd`.
3. **🔀 PR Intelligence**: Displays active PR number, review state, and reviewer waiting days. Clicking navigates to `#pr`.
4. **🚀 Release Gate**: Displays 5-pillar deployment readiness score % and ship gate sign-off status. Clicking navigates to `#release`.

---

## 4. Multi-Turn Gemini Conversational Stream (`ChatStream.tsx`)

The companion chat stream provides contextual reasoning, evidence citations, and safe execution triggers:

### 1. The 4 Role Personas
* **Byte (Mascot)**: Friendly, energetic companion dog who speaks with developer humor and warmth.
* **Senior Architect**: Principal Git & Infrastructure Architect analyzing DAG topologies, merge base ancestors, and rebase strategies.
* **Safety Auditor**: Compliance auditor focusing on 100% data loss prevention, stash preservation, and rollback readiness.
* **Git Tutor**: Interactive teacher explaining Git's internal object model (blobs, trees, commit objects, staging index).

### 2. Multi-Tier Model Selection
* **Fast Tier (`gemini-3.1-flash-lite`)**: Ultra-fast status checks, one-liner queries, and commit message suggestions.
* **General Tier (`gemini-3.6-flash`)**: Standard chat, tutoring, and repository analysis.
* **Deep Tier (`gemini-3.7-flash`)**: Deep rebase conflict resolution, DAG analysis, and release sign-offs.

### 3. Structured Evidence Signals
Every AI recommendation surfaces verified repository data points (current branch, upstream tracking branch, dirty file list, conflicting markers, commit drift).

### 4. Recommended Safe Action Card
* **Syntax Highlighting**: Formatted shell command block with 1-click copy action.
* **Confidence & Blast Radius**: High/Medium/Low confidence ratings and expected outcome.
* **Pre-Computed Reversal Step**: Clear reversal command (e.g. `git stash pop`, `git rebase --abort`).
* **Preview Diff & Scope Button**: Opens the human-in-the-loop preview confirmation modal.
* **Confirm & Execute Button**: Executes the bounded action via pure argv child process.
