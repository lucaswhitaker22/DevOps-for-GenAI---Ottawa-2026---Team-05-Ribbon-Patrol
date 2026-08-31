# 🛡️ Feature 08: Safety & DevSecOps Governance

GitPet bridges agentic automation and strict DevSecOps safety protocols through a **2-Layer Safety Verification Engine**, guaranteed reversibility, and secret redaction.

---

## 🌟 Key Functional Capabilities

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer
    participant UI as React UI (Preview Modal)
    participant BE as Express API Gateway
    participant Guard as Safety Engine (safety.ts)
    participant Runner as Safe Executor (executor.ts)
    participant Git as Git CLI Subprocess

    Dev->>UI: Clicks "Run Safe Action"
    UI->>BE: POST /api/git/execute-action { command, targetFiles, expectedRisk }
    BE->>Guard: evaluateCommand(command, stateContext)
    alt Destructive / Force Push Detected
        Guard-->>BE: REJECT: Policy violation (e.g. force push prohibited)
        BE-->>UI: 400 Bad Request { error, policyViolation: true }
        UI-->>Dev: Alert: Action blocked by safety boundary
    else Safe / Bounded Command
        Guard-->>BE: ACCEPT: Command verified
        BE->>Runner: executeApprovedCommand(command)
        alt GITPET_ALLOW_WRITES == 'true'
            Runner->>Git: execFile('git', argv, { timeout: 10000 })
            Git-->>Runner: stdout / stderr
            Runner-->>BE: { success: true, stdout }
        else Dry-Run Mode (Default)
            Runner-->>BE: { success: true, simulated: true, output: "[Dry-run verified]" }
        end
        BE-->>UI: 200 OK { executionResult, newHealthPercentage }
        UI-->>Dev: Green checkmark + Sound + Reversal step logged
    end
```

---

### 1. The 2-Layer Safety Policy Engine (`safety.ts`)

#### Layer 1: Static Rule Verification (Deterministic)
* **Zero Force-Push Policy**: Prohibits destructive commands including:
  * `git push --force` or `git push -f`
  * `git push origin +branch`
  * `git reset --hard` (unless preceded by a verified safety stash)
  * `git clean -fdx`
  * `git branch -D`
* **Command Whitelisting**: Restricts execution strictly to bounded, non-destructive Git operations:
  * `git stash push`, `git stash pop`, `git stash apply`
  * `git fetch origin`, `git pull --rebase`
  * `git commit -m`, `git add`
  * `git checkout -b`, `git switch`
  * `git rebase --abort`, `git merge --abort`

#### Layer 2: Contextual Lints
* Evaluates current repository context before approving commands:
  * Verifies working tree is clean or stashed before permitting a branch switch or rebase.
  * Blocks pulls if local modifications conflict with upstream patches.

---

### 2. Pre-Computed Reversal Commands
Every suggested action is paired with an immutable, deterministic safe reversal command:

| Proposed Action | Reversal Command |
| :--- | :--- |
| `git stash push -m "gitpet_backup"` | `git stash pop` |
| `git pull --rebase origin main` | `git rebase --abort` |
| `git merge origin/main` | `git merge --abort` |
| `git commit -m "feat: ..."` | `git reset --soft HEAD~1` |
| `git checkout -b feature/new` | `git checkout -` |

---

### 3. Automated Secret Token Redaction
* Automatically scans prompt inputs, diff snippets, and terminal output for high-entropy secrets:
  * GitHub Personal Access Tokens (`ghp_`, `github_pat_`)
  * AWS Access Keys (`AKIA[0-9A-Z]{16}`)
  * Google Cloud API Keys (`AIza[0-9A-Za-z-_]{35}`)
  * Private SSH Keys (`-----BEGIN OPENSSH PRIVATE KEY-----`)
* Redacts detected secrets with `[REDACTED_SECRET]` before transmission to generative AI models.

---

### 4. Bounded Agency Execution Modes
* **Dry-Run Mode (Default)**:
  * Validates command syntax, checks blast radius, and simulates outcome without writing to the disk.
* **Verified Write Mode (`GITPET_ALLOW_WRITES=true`)**:
  * Executes approved commands using `child_process.execFile` with argument arrays to prevent shell injection vulnerabilities.
  * Enforces a 10,000ms hard execution timeout.
