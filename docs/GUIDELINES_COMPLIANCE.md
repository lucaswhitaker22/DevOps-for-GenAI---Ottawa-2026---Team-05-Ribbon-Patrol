# Participant Guidelines & Evidence Compliance Matrix

**Project:** GitPet – Ambient DevSecOps Repository Companion  
**Team:** Ribbon Patrol (Team 05) – DevOps for GenAI Hackathon (Ottawa 2026)  
**Live URL / Demo Command:** `http://localhost:3004` (`npm run dev` or `npm run start`)

---

## Participant Compliance Checklist (P-01 to P-15)

| ID | Guideline Requirement | Status | Evidence Document / Artifact Location | Description & Implementation Summary |
| :--- | :--- | :---: | :--- | :--- |
| **P-01** | **Team size** (1–5 members per team) | **MET** | [docs/PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) | Team roster: Aliasgar Husain (Lead), Dilvir Singh Saini, Lucas Whitaker, David Castelli, Charisma Pulyala (5 members). |
| **P-02** | **Single theme** (Select one official theme/track) | **MET** | [docs/PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md#1-project-name--theme) | Theme: **DevOps for Generative AI / Agentic Automation, Developer Ergonomics & DevSecOps**. |
| **P-03** | **Real problem** (Define concrete problem & measurable outcome) | **MET** | [docs/PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md#3-problem-statement--target-users), [docs/README.md](README.md#product-objectives) | Solves context fragmentation, fear of destructive Git commands, CI/CD pipeline visibility, and cognitive overload with ambient telemetry & verifiable recovery. |
| **P-04** | **Working system** (Deliver live working use case / reproducible demo) | **MET** | [docs/README.md](README.md), Live app at `http://localhost:3004` | Full-stack interactive web application with ambient pet stage, AI persona chat, live voice streaming, Git DAG graph, CI/CD & PR drawers, and 18 scenario sandboxes. |
| **P-05** | **Production path** (Architecture, deployment, security, runbook) | **MET** | [docs/RUNBOOK.md](RUNBOOK.md), [docs/ARCHITECTURE.md](ARCHITECTURE.md) | Production build pipeline (`npm run build`), health/audit endpoints (`/api/health`, `/api/audit-logs`), and disaster recovery runbook. |
| **P-06** | **AI transparency** (Declare where GenAI/coding tools were used) | **MET** | [docs/AI_GOVERNANCE.md](AI_GOVERNANCE.md#61-development-ai-usage-disclosure), [docs/README.md](README.md#ai-usage-disclosure) | Disclosed usage of Gemini 3.6 Flash, Gemini 3.7 Flash, Gemini 3.1 Flash Live/Image, and AI-assisted pair programming during development. |
| **P-07** | **Security by design** (Threat modeling, AI/cloud/supply-chain mitigations) | **MET** | [docs/SECURITY_THREAT_MODEL.md](SECURITY_THREAT_MODEL.md), [tests/security.test.ts](../tests/security.test.ts) | STRIDE threat model, 2-layer safety policy (static + contextual), secret regex sanitization, and 31 automated security/executor tests. |
| **P-08** | **Governance** (Ownership, data handling, human oversight, escalation) | **MET** | [docs/AI_GOVERNANCE.md](AI_GOVERNANCE.md) | NIST AI RMF 1.0 aligned system card, 5-tier Human-in-the-Loop oversight matrix, and incident escalation protocols. |
| **P-09** | **Testing** (Functional, security, and failure-path tests) | **MET** | [tests/security.test.ts](../tests/security.test.ts), [tests/executor.test.ts](../tests/executor.test.ts), [tests/markdown.test.ts](../tests/markdown.test.ts), [docs/TEST_REPORT.md](TEST_REPORT.md) | 31 automated Vitest unit, security, and executor test cases covering prompt sanitization, jailbreak rejection, approval gates, contextual lints, fallback, and markdown rendering. |
| **P-10** | **Observability** (Logs, metrics, traces, operational telemetry) | **MET** | [docs/RUNBOOK.md](RUNBOOK.md#2-health-monitoring--observability), `GET /api/health`, `GET /api/audit-logs` | Structured health metrics, memory usage, API status, model latency tracking, and FIFO audit event ring buffer (max 200 events). |
| **P-11** | **Reproducibility** (Setup and dependency instructions without secrets) | **MET** | [docs/RUNBOOK.md](RUNBOOK.md), [.env.example](../.env.example) | Step-by-step setup instructions with sanitized environment variable template and zero hardcoded secrets. |
| **P-12** | **Responsible AI** (Privacy, safety, transparency, human oversight) | **MET** | [docs/AI_GOVERNANCE.md](AI_GOVERNANCE.md#3-data-governance--data-flow), [docs/SECURITY_THREAT_MODEL.md](SECURITY_THREAT_MODEL.md#llm06-excessive-agency--unsafe-tool-execution) | Ephemeral data transmission, zero model retraining, mandatory human approval gate for Git mutations, and automated reversal plans. |
| **P-13** | **No secrets** (Never commit credentials, API keys, or private tokens) | **MET** | [docs/SECURITY_THREAT_MODEL.md](SECURITY_THREAT_MODEL.md#6-verification--continuous-devsecops-pipeline), `.gitignore` | Automated Gitleaks CI workflow scan, `.gitignore` configuration, and runtime token redactor. |
| **P-14** | **Supply chain** (Third-party dependencies, licenses, SBOM) | **MET** | [docs/SBOM_MANIFEST.md](SBOM_MANIFEST.md), [package.json](../package.json) | MIT License, audited direct/transitive dependencies, and CycloneDX/JSON SBOM generation script (`npm run sbom`). |
| **P-15** | **Demo integrity** (Clearly identify mocked/stubbed components) | **MET** | [docs/DEMO_NOTES.md](DEMO_NOTES.md), [docs/LIVE_WORKSPACE.md](LIVE_WORKSPACE.md) | Explicitly details 18 deterministic demo sandbox scenarios vs. live workspace inspection mode and AI fallback behaviors. |

---

## Detailed Evidence Cross-Reference

- **Architecture & System Design:** [docs/ARCHITECTURE.md](ARCHITECTURE.md)
- **Operations & SRE Runbook:** [docs/RUNBOOK.md](RUNBOOK.md)
- **Security & Adversarial Defenses:** [docs/SECURITY_THREAT_MODEL.md](SECURITY_THREAT_MODEL.md)
- **AI System Card & Human Oversight:** [docs/AI_GOVERNANCE.md](AI_GOVERNANCE.md)
- **Testing & Verification Results:** [docs/TEST_REPORT.md](TEST_REPORT.md)
- **Supply Chain & SBOM:** [docs/SBOM_MANIFEST.md](SBOM_MANIFEST.md)
- **Demo Script & Component Fidelity:** [docs/DEMO_NOTES.md](DEMO_NOTES.md)
- **Live Workspace Mode:** [docs/LIVE_WORKSPACE.md](LIVE_WORKSPACE.md)
- **Functional Specification:** [docs/README.md](README.md)
