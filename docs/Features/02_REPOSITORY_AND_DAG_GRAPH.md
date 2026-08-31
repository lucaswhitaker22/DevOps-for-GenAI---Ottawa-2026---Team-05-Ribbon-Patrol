# 🌲 Feature 02: Repository Details & DAG Graph (`#repository`)

The **Repository Details & DAG Graph** workspace provides a full-page, multi-tab environment for deep repository inspection, multi-lane topological lineage analysis, syntax-highlighted diffs, and stash management.

---

## 🌟 Key Functional Capabilities

```
+--------------------------------------------------------------------------------+
| [Header] Repository Details & DAG Graph • feature/cart • 0 ahead | 3 behind   |
| [Tabs] (•) Interactive DAG Graph  ( ) Working Tree & Diffs (2)  ( ) Stashes (1)|
+--------------------------------------------------------------------------------+
| [Interactive SVG Multi-Lane DAG Visualizer]                                    |
| [HEAD]  commit e4f29a (feature/cart)                                          |
|   | \                                                                          |
|   |  *  commit c1b802 (origin/main)                                           |
|   |  *  commit a991fc                                                         |
|   | /                                                                          |
| [*]     commit 87bc41 (Merge Base)                                            |
+--------------------------------------------------------------------------------+
```

### 1. Interactive Multi-Lane DAG Visualizer (`GitDagVisualizer.tsx`)
* **SVG Commit Graph**: Renders commit lineage across parallel visual lanes:
  * **Main Trunk Lane**: Tracks upstream origin commits.
  * **Local Feature Lane**: Tracks local branch commits.
  * **Secondary Lanes**: Tracks diverged branches and forks.
* **Commit Roles & Nodes**:
  * `HEAD`: The currently checked-out commit pointer.
  * `local_ahead`: Commits present locally but not yet pushed to origin.
  * `remote_behind`: Upstream commits not yet merged or rebased into local.
  * `merge_base`: The most recent common ancestor between local and remote.
  * `fork_point`: Where feature branch diverged from main.
  * `conflicted`: Commits containing active file conflict markers.
* **Interactive Commit Inspector**:
  * Click any commit node in the graph to view full commit details: short hash, author name, commit message, parent hashes, and relative timestamp.
* **Legend Badges**: Header legend clearly indicates local ahead counts (`↑X`) and origin behind counts (`↓Y`).

---

### 2. Working Tree & Side-by-Side Diffs (`DiffViewer.tsx`)
* **File Search Filter**: Search through dirty working tree changesets by filename in real-time.
* **Checkbox File Staging**:
  * Selectively stage or unstage individual files using checkbox controls.
  * Click **Stage All / Unstage All** in the header for fast bulk staging.
* **Status Indicators**:
  * `modified` (Amber badge)
  * `staged` (Green badge)
  * `untracked` (Slate badge)
  * `conflicted` (Red badge)
* **Syntax-Highlighted Diff Viewer**:
  * Line-by-line unified diff inspection.
  * Clear addition counts (`+N`, emerald) and deletion counts (`-M`, rose).
  * Line number gutters and monospace font formatting.
* **AI Commit Generator Integration**:
  * Click **AI Conventional Commit** in the header to immediately draft a standardized commit based on active working tree diffs.

---

### 3. Git Stash Stack Management
* **Snapshot Inventory**: Displays all preserved working tree snapshots (`stash@{0}`, `stash@{1}`) created during safety syncs or manual actions.
* **Stash Metadata**: Inspect stash index, commit message, timestamp, and preserved file count.
* **1-Click Restore Action**:
  * Click **Restore to Working Tree** on any stash item to safely restore changes back into the active working tree with visual toast confirmation.

---

### 4. Immutable Safety Audit Trail & Rollback
* **Session Execution History**:
  * Every command executed through GitPet is recorded with an exact timestamp, description, and shell command.
* **1-Click Rollback**:
  * Click **Rollback Last Action** in the header to execute the pre-computed safe reversal command of the most recent action.
