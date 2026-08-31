# Operations & SRE Runbook: GitPet
**Service:** GitPet DevSecOps AI Companion  
**Maintainer:** Team 05 - Ribbon Patrol  
**SLO Target:** 99.9% Uptime | <800ms Average Telemetry Response | 0 Unintended Data Losses

---

## 1. System Architecture & Component Health

```
                                  +------------------------------------+
                                  |     Web Browser / React 19 UI      |
                                  | (Pet Stage, DAG, CI/CD & PR Drawers)
                                  +-----------------+------------------+
                                                    | HTTP & WebSocket
                                                    v
+----------------------------------------------------------------------------------------------------+
| Node.js / Express Server (Port 3004)                                                               |
|                                                                                                    |
|  - GET  /api/health            -> Service uptime, memory RSS, models, writes flag, asset count    |
|  - GET  /api/audit-logs        -> FIFO array of live audited API events (max 200 events)           |
|  - GET  /api/git/live-status   -> Safe, read-only scanner of local workspace git repository        |
|  - GET  /api/repo/live         -> Live branch status scanner for public GitHub fixture             |
|  - POST /api/git/preview-action -> Dry-run safety validator for proposed Git commands             |
|  - POST /api/git/execute-action -> Live workspace safe command execution (argv, no shell)        |
|  - POST /api/ai/chat           -> Multi-turn Gemini AI reasoning with safety policy enforcement    |
|  - POST /api/gitpet/analyze    -> Structured JSON repository analysis & action recommendation      |
|  - POST /api/ai/images/generate -> Generates 1:1 pet avatars with 30-minute preview TTL            |
|  - POST /api/ai/images/:id/approve -> Promotes preview avatar to active pet asset set             |
|  - POST /api/voice/tts         -> Gemini TTS speech synthesis (Zephyr voice)                       |
|  - WS   /live                  -> Bidirectional Gemini Live Audio streaming session                |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Health Monitoring & Observability

### Health Check Endpoint: `GET /api/health`
Query the health check to inspect operational metrics:
```bash
curl -s http://localhost:3004/api/health | jq .
```

**Example Response:**
```json
{
  "requestId": "health_m1b8k_9a8f",
  "status": "healthy",
  "service": "GitPet DevSecOps AI Engine",
  "geminiAvailable": true,
  "writesEnabled": false,
  "workspaceRoot": "C:\\Users\\workspace\\repo",
  "geminiModelPrimary": "gemini-3.6-flash",
  "geminiModelPro": "gemini-3.7-flash",
  "timestamp": "2026-08-31T15:45:00.000Z",
  "uptimeSeconds": 1840,
  "memoryUsageMb": 72,
  "assetStats": {
    "registeredCount": 1,
    "currentApprovedId": "asset_default_byte"
  },
  "telemetry": {
    "totalAuditedRequests": 24,
    "averageLatencyMs": 185
  }
}
```

### Audit Logs Endpoint: `GET /api/audit-logs?limit=20`
Inspect recent requests, latencies, model invocations, and human approval flags:
```bash
curl -s http://localhost:3004/api/audit-logs?limit=20 | jq .
```

---

## 3. Incident Response & Troubleshooting

### Scenario A: Gemini API Key Missing or Quota Exhausted
- **Symptoms:** `/api/health` reports `"geminiAvailable": false`, or chat responses indicate `aiUnavailable: true`.
- **System Behavior:** Automatic graceful degradation. The application cascades through the model fallback chain (`gemini-3.6-flash` -> `gemini-3.5-flash` -> `gemini-flash-latest`), and if all models are exhausted, transparently serves deterministic rule-based guidance without crashing.
- **Remediation:** Check `GEMINI_API_KEY` in `.env` or verify quota limits in Google AI Studio.

### Scenario B: Accidental Live Workspace Modification Prevention
- **Symptoms:** Developer clicks "Confirm" in Live Workspace mode, but gets a safety block.
- **System Behavior:** Working as intended. `src/server/safety.ts` blocks any command violating safety rules (`--force`, `reset --hard`, `clean`, `branch -D`, or commands mid-rebase).
- **Remediation:** Review the finding message in the preview modal and use the suggested safe alternative (e.g. `--force-with-lease` or `stash -u`).

### Scenario C: WebSocket Connection Dropped on `/live`
- **Symptoms:** Live voice modal shows reconnecting banner or fallback notification.
- **System Behavior:** Automatic client-side retry with seamless fallback to client-assisted SpeechRecognition.
- **Remediation:** Ensure port 3004 is unblocked and firewall permits WebSocket upgrades (`Upgrade: websocket`).

---

## 4. Disaster Recovery & Emergency Rollback Procedures

If an accidental Git mutation occurs despite preview boundaries, follow standard reversal steps:

| State | Recovery Command |
| :--- | :--- |
| **Stashed work needs restoring** | `git stash pop` or `git stash apply stash@{0}` |
| **Branch switched unintentionally** | `git switch -` |
| **Accidental merge in progress** | `git merge --abort` |
| **Accidental rebase in progress** | `git rebase --abort` |
| **Revert to previous commit safely** | `git reset --keep HEAD@{1}` |

---

## 5. Capacity & Scalability Plan

- **Concurrency:** Node.js event loop handles 1,000+ active WebSocket connections per core.
- **Memory Footprint:** In-memory asset and audit buffers are strictly capped (max 200 FIFO entries, <100MB RSS memory).
- **Cost Controls:** Default model is set to `gemini-3.6-flash` with aggressive token caps (`maxOutputTokens: 500`) to maintain cost efficiency at scale.
