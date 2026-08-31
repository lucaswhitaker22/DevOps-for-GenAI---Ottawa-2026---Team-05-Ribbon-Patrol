# Live Workspace Mode

GitPet operates in two distinct modes:

| Mode | Repository Data Source | Approved Actions |
| :--- | :--- | :--- |
| **Sandbox Mode** (default) | 18 bundled DevSecOps scenarios | **Simulated.** Visual state transitions animate, transcript clearly flags simulation. |
| **Live Workspace Mode** | Real local Git workspace or public GitHub fixture | **Real execution** — runs bounded argv commands if `GITPET_ALLOW_WRITES=true`. |

Toggle **Live Workspace** in the top bar to switch between sandbox scenario fixtures and live repository inspection.

---

## 1. Dual Live Data Sources

### A. Local Host Repository (`/api/git/live-status`)
* Scans the local Git working tree using read-only `git status --porcelain=v1 -uall`, `git rev-parse`, `git log`, and `git stash list`.
* Computes real branch divergence (ahead/behind counts), detached HEAD status, uncommitted diffs, and in-progress operations (rebase, merge, cherry-pick).

### B. Public GitHub Live Fixture (`/api/repo/live`)
* Connects to the public fixture repository: [`farisnour/gitpet-acme-corp-ecommerce-store`](https://github.com/farisnour/gitpet-acme-corp-ecommerce-store).
* Supports live switching between active branches (`main`, `feature/cart-stepper`, `feature/payment-v2`, `refactor/checkout-v2`) to demonstrate real upstream drift without requiring a local dirty git repository.

---

## 2. Enabling Real Command Execution

By default, the live scanner is **read-only**. To permit GitPet to execute verified Git commands against your local repository, configure `.env`:

```bash
# Point to the repository GitPet should inspect & modify
GITPET_WORKSPACE_ROOT="/absolute/path/to/your/repo"

# Explicit write gate: must be set to "true" to allow execution
GITPET_ALLOW_WRITES=true

# Optional: HTTP Basic Authentication
GITPET_AUTH_USER="admin"
GITPET_AUTH_PASS="your-secure-password"
```

Verify your configuration via the health probe:
```bash
curl -s http://localhost:3004/api/health | jq '{writesEnabled, workspaceRoot}'
```

```json
{
  "writesEnabled": true,
  "workspaceRoot": "/absolute/path/to/your/repo"
}
```

---

## 3. Four-Layer Safety Defense for Live Writes

Even with writes enabled, four independent security layers protect your repository:

1. **Static Dangerous Rule Interceptor (`safety.ts`):**
   Refuses destructive commands (`push --force` without lease, `reset --hard`, `clean`, `branch -D`, `stash drop/clear`, and shell injection metacharacters `;&|>$`).
2. **Contextual Lint Engine (`safety.ts`):**
   Inspects the live working tree to enforce safety (e.g. requires `git stash -u` if untracked files are present, blocks non-continue commands during active rebases).
3. **Dry-Run Preview (`/api/git/preview-action`):**
   Simulates the execution against the current repository state and returns safety findings before prompting the user.
4. **Mandatory Human-in-the-Loop Confirmation:**
   Zero automated execution. The developer must inspect the exact command, targeted files, and reversal plan in the **Preview Changes Modal** before confirming execution.
5. **Fail-Stop Parameter Execution (`executor.ts`):**
   Executes commands strictly via `child_process.execFile` with argument arrays (never passing through a shell), stopping immediately on any error.

---

## 4. Troubleshooting Live Mode

| Symptom | Cause | Resolution |
| :--- | :--- | :--- |
| "Simulated in Sandbox Mode" in transcript | App is currently in Sandbox mode. | Toggle **Live Workspace** in the top bar. |
| "Live Workspace is read-only on this server" | `GITPET_ALLOW_WRITES` is not set to `true`. | Add `GITPET_ALLOW_WRITES=true` to `.env` and restart the server. |
| Byte describes the wrong repository | `GITPET_WORKSPACE_ROOT` is unset. | Set `GITPET_WORKSPACE_ROOT` in `.env` to your project directory. |
| "Workspace is not inside an active Git repository" | The target path is not a valid git work tree. | Run `git init` or point `GITPET_WORKSPACE_ROOT` to a valid git repository. |
| Action blocked with "rebase in progress" | Repository is paused in an interactive rebase. | Complete the rebase (`git rebase --continue`) or abort (`git rebase --abort`). |
