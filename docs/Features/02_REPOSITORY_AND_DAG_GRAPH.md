# 🌲 Feature 02: Repository Details & DAG Graph (`#repository`)

The **Repository Details & DAG Graph** workspace provides a full-page, multi-tab environment for deep repository inspection, multi-lane topological DAG graph visualization, syntax-highlighted diffs, and stash management.

---

## 🌟 Key Functional Capabilities

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│ [Header] Repository Details & DAG Graph • feature/cart • 0 ahead | 3 behind        │
│ [Tabs] (•) Interactive DAG Graph   ( ) Working Tree & Diffs (2)   ( ) Stashes (1)  │
│ Actions: [✨ AI Conventional Commit]  [↩️ Rollback Last Action]                      │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Interactive SVG Multi-Lane DAG Visualizer (GitDagVisualizer.tsx)]                 │
│                                                                                    │
│ Lane 0 (main)           Lane 1 (feature/cart)                                      │
│      │                        * [HEAD] feat(cart): add quantity stepper            │
│      * c90e14 (origin/cart)   │                                                    │
│      * b412d0                 │                                                    │
│      │ \                     /                                                     │
│      │  * 8a1f49 (Merge Base)                                                      │
│      * 4f82a1 (Initial commit)                                                     │
├────────────────────────────────────────────────────────────────────────────────────┤
│ [Working Tree Diff Viewer (DiffViewer.tsx)]                                        │
│ Search: [ cart...          ]  [☑ Stage All / Unstage All]                          │
│ ☑ src/components/cart/CartDrawer.tsx (+18 / -4) [modified]                         │
│ ☑ src/services/pricingService.ts (+12 / -1) [modified]                             │
└────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1. Interactive Multi-Lane DAG Visualizer (`GitDagVisualizer.tsx`)

The Git DAG Visualizer translates Git commit DAGs into an interactive, multi-lane topological graph:

### 1. Lane Assignment Engine
* **Lane 0 (Primary Trunk / Main)**: Renders the primary production or upstream tracking branch.
* **Lane 1 (Current Feature Branch)**: Renders the developer's checked-out feature branch.
* **Lane 2+ (Divergent / Fork Branches)**: Renders secondary feature branches and remote divergence.

### 2. Commit Node Roles & Visual Semantics

| Commit Role | SVG Node Styling | Meaning in DAG |
| :--- | :--- | :--- |
| `head` | Solid blue/purple ring with pulsing outer glow | Active checked-out commit pointer |
| `upstream_head` | Cyan dashed border with remote branch badge | Latest commit on remote tracking branch |
| `local_ahead` | Emerald border with `↑` arrow badge | Local commits not yet pushed upstream |
| `remote_behind`| Amber border with `↓` arrow badge | Remote commits not yet pulled locally |
| `merge_base` | Double-ring gold stroke | Common ancestor between local and upstream |
| `fork_point` | Purple fork icon badge | Commit where feature branch diverged |
| `detached` | Orange dashed border with question mark | Floating commit in detached HEAD state |
| `conflicted` | Crimson border with alert indicator | Commit containing active merge conflicts |
| `hazard` | Flashing red-on-black hazard border | Upstream force-pushed / rewritten commit |

### 3. Cubic Bezier Spline Edge Routing
Edges connecting parent-child commits are calculated using smooth cubic bezier curves:
$$\text{Path} = \mathbf{M}(x_1, y_1) \;\mathbf{C}(x_1, y_{\text{mid}}, x_2, y_{\text{mid}}, x_2, y_2)$$
This produces organic visual branches when diverging or merging back into trunk lanes.

### 4. Interactive Commit Inspector Drawer
Clicking any commit node opens an inspector drawer displaying:
* Full and short commit hash (`H` and `h`).
* Author name and email (`Sarah Chen <sarah@acme.dev>`).
* Full commit message.
* Parent commit hashes (`P`).
* Relative and ISO timestamps (`timestamp` and `timestampIso`).

---

## 2. Working Tree & Syntax-Highlighted Diffs (`DiffViewer.tsx`)

### 1. File Search & Filtering
Real-time filtering of working tree changesets by filename or directory path.

### 2. Checkbox File Staging
* Selectively stage or unstage individual files via interactive checkboxes.
* **Stage All / Unstage All**: 1-click toggle to stage or unstage the entire working directory.

### 3. Syntax-Highlighted Diff Viewer
* Line-by-line unified diff rendering.
* Clear addition counts (`+N`, emerald) and deletion counts (`-M`, rose).
* Monospace line number gutters with dark/light theme syntax colors.

### 4. Integrated AI Commit Generator Trigger
Click **AI Conventional Commit** in the page header to immediately draft a semantic commit message based on active diffs.

---

## 3. Git Stash Stack Management

* **Snapshot Inventory**: Lists all active stash entries (`stash@{0}`, `stash@{1}`) created by safety syncs or manual commands.
* **Stash Metadata**: Inspect stash index, commit message, creation timestamp, and count of preserved files.
* **1-Click Restore Action**: Click **Restore to Working Tree** on any stash card to restore changes with toast notification confirmation.

---

## 4. Immutable Safety Audit Trail & Rollback

* **Session Execution History**: Every command executed through GitPet is recorded with an exact timestamp, description, and shell command.
* **1-Click Rollback**: Click **Rollback Last Action** to execute the pre-computed safe reversal command of the most recent action.
* **Rollback Safeguard**: Verifies the working tree is preserved or stashed before executing a rollback, preventing accidental overwrites.
