# Software Bill of Materials (SBOM) & Supply Chain Security

**Project:** GitPet (Ribbon DevSecOps Assistant)  
**License:** MIT License  
**Compliance Standard:** OpenSSF Supply Chain Security Guidelines / CycloneDX Compatible

---

## 1. Direct Dependencies & Licensing

| Package Name | Version | License | Ecosystem | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `@google/genai` | `^2.4.0` | Apache-2.0 | npm | Official Google Gemini SDK (Gemini 3.6/3.7, Live Audio, Images, TTS) |
| `react` | `^19.0.1` | MIT | npm | Reactive UI rendering engine |
| `react-dom` | `^19.0.1` | MIT | npm | DOM renderer for React 19 |
| `express` | `^4.21.2` | MIT | npm | Backend HTTP & REST API gateway server |
| `ws` | `^8.21.3` | MIT | npm | WebSocket server for low-latency live audio streaming |
| `motion` | `^12.23.24` | MIT | npm | Smooth hardware-accelerated animations for pet stage & UI |
| `lucide-react` | `^0.546.0` | ISC | npm | Accessible UI icon library |
| `canvas-confetti` | `^1.9.4` | ISC | npm | Streak celebration and level-up visual particle effects |
| `react-markdown` | `^10.1.0` | MIT | npm | Secure Markdown rendering in chat stream |
| `remark-gfm` | `^4.0.1` | MIT | npm | GitHub Flavored Markdown support (tables, checklists, strikethrough) |
| `@tailwindcss/vite` | `^4.1.14` | MIT | npm | Tailwind CSS v4 Vite integration |
| `dotenv` | `^17.2.3` | BSD-2-Clause | npm | Environment variable management |

---

## 2. Development & Tooling Dependencies

| Package Name | Version | License | Purpose |
| :--- | :--- | :--- | :--- |
| `vite` | `^6.2.3` | MIT | Next-generation frontend build tooling and HMR dev server |
| `typescript` | `~5.8.2` | Apache-2.0 | Static type safety and contract enforcement |
| `vitest` | `^4.1.11` | MIT | Unit, security, and executor test runner |
| `tailwindcss` | `^4.1.14` | MIT | Utility-first CSS styling engine v4 |
| `esbuild` | `^0.25.0` | MIT | Ultra-fast Node server bundling for production |
| `tsx` | `^4.21.0` | MIT | TypeScript execution engine for dev server watcher |
| `@types/express` | `^4.17.21` | MIT | TypeScript definitions for Express |
| `@types/node` | `^22.20.1` | MIT | TypeScript definitions for Node.js runtime |
| `@types/ws` | `^8.18.1` | MIT | TypeScript definitions for WebSocket server |
| `@types/canvas-confetti` | `^1.9.0` | MIT | TypeScript definitions for canvas-confetti |

---

## 3. Supply Chain Security Controls

1. **Automated Vulnerability Auditing:** Continuous `npm audit` run in CI/CD pipeline.
2. **Deterministic Locking:** `package-lock.json` committed to prevent dependency drift or unverified transitive resolution.
3. **Reproducible SBOM Extraction:** Generate a fresh complete JSON dependency inventory at any time with:
   ```bash
   npm run sbom
   ```
