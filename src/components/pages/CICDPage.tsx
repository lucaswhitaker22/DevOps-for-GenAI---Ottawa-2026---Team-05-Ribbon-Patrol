import React, { useState } from 'react';
import {
  Zap,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowLeft,
  RefreshCw,
  FileCode,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  Terminal,
  Play,
  Flame,
} from 'lucide-react';
import { RepositoryState, ActivePageId, CICDPipelineState } from '../../types';

interface CICDPageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onSimulatePipelineEvent?: (event: 'failed_build' | 'flaky_tests' | 'vulnerability' | 'deploy_success' | 'lost_map' | 'smoke_cloud' | 'shield_cracked') => void;
}

export const CICDPage: React.FC<CICDPageProps> = ({
  state,
  onNavigate,
  onSimulatePipelineEvent,
}) => {
  const [isRerunning, setIsRerunning] = useState(false);
  const [rerunSuccess, setRerunSuccess] = useState(false);
  const [expandedStageIndex, setExpandedStageIndex] = useState<number | null>(null);

  const pipeline: CICDPipelineState = state.pipelineState || {
    pipelineId: 'pipe_1042',
    buildStatus: 'failed',
    testHealth: 'failing',
    passRate: 88,
    deployTarget: 'staging',
    deployStatus: 'failed',
    lastRunTime: '12m ago',
    pipelineSteps: [
      { name: 'Lint & Formatting', status: 'success', duration: '12s' },
      { name: 'Unit & Contract Tests', status: 'failed', duration: '48s' },
      { name: 'Security & CVE Scan', status: 'success', duration: '34s' },
      { name: 'Container Artifact Build', status: 'pending', duration: '-' },
      { name: 'Staging Smoke Verification', status: 'pending', duration: '-' },
    ],
    flakyTests: [
      { id: 'flk_1', name: 'token refresh timeout', suite: 'src/tests/auth.spec.ts', failureRate: 30, lastFailedCommit: 'a1b2c3d' },
    ],
    vulnerabilities: [
      { id: 'vuln_1', cveId: 'CVE-2026-8819', severity: 'high', package: 'jsonwebtoken@8.5.1', title: 'Signature validation bypass', remediation: 'Upgrade to jsonwebtoken@9.0.2' },
    ],
  };

  const STAGE_LOGS: Record<number, string[]> = {
    0: [
      '[00:00:01] Running eslint on 48 files...',
      '[00:00:06] Prettier format check completed: 0 violations.',
      '[00:00:12] SUCCESS: Codebase syntax and style guidelines verified.',
    ],
    1: [
      '[00:00:01] Starting vitest execution (31 test suites)...',
      '[00:00:24] PASS tests/executor.test.ts (19/19)',
      '[00:00:36] PASS tests/security.test.ts (9/9)',
      '[00:00:44] FAIL src/tests/auth.spec.ts > token refresh timeout (flaky)',
      '[00:00:48] ERROR: 1 test failed in 48s.',
    ],
    2: [
      '[00:00:01] Initializing Trivy & Snyk container scanner...',
      '[00:00:18] Scanning package.json & node_modules dependency tree...',
      '[00:00:34] SCAN COMPLETE: 1 high severity CVE identified (CVE-2026-8819).',
    ],
    3: [
      '[00:00:01] Building Docker image for production target...',
      '[00:00:15] Multi-stage build layer cache matched 8/12 layers.',
      '[00:00:30] Awaiting upstream pipeline step resolution.',
    ],
    4: [
      '[00:00:01] Staging Kubernetes namespace provisioning...',
      '[00:00:10] Helm values template verification pending.',
    ],
  };

  const handleRerunPipeline = () => {
    setIsRerunning(true);
    setRerunSuccess(false);
    setTimeout(() => {
      setIsRerunning(false);
      setRerunSuccess(true);
      setTimeout(() => setRerunSuccess(false), 4000);
    }, 2000);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => onNavigate('companion')}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="Return to Companion"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-3 rounded-2xl bg-amber-500 text-white shadow-sm ring-1 ring-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  CI/CD Pipeline Telemetry & Health
                </h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                    pipeline.buildStatus === 'passed'
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                  }`}
                >
                  {pipeline.buildStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                Run #{pipeline.pipelineId} • Branch <span className="font-bold text-slate-800 dark:text-slate-200">{state.currentBranch.name}</span> • Pass Rate <span className="font-bold text-slate-800 dark:text-slate-200">{pipeline.passRate}%</span> • Last run: {pipeline.lastRunTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleRerunPipeline}
              disabled={isRerunning}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-xs transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRerunning ? 'animate-spin' : ''}`} />
              <span>{isRerunning ? 'Rerunning CI Pipeline...' : 'Rerun Pipeline'}</span>
            </button>
            {rerunSuccess && (
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
                ✅ Pipeline re-triggered
              </span>
            )}
          </div>
        </div>

        {/* Pipeline Progression Steps */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Pipeline Stage Progression
            </h2>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Pass Rate: {pipeline.passRate}%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {pipeline.pipelineSteps.map((stage, idx) => {
              const isExpanded = expandedStageIndex === idx;
              return (
                <div
                  key={stage.name}
                  onClick={() => setExpandedStageIndex(isExpanded ? null : idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    stage.status === 'success'
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/60'
                      : stage.status === 'failed'
                      ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-300 ring-2 ring-rose-400/20 hover:bg-rose-50 dark:hover:bg-rose-950/60'
                      : 'bg-slate-50/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                    {stage.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : stage.status === 'failed' ? (
                      <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                    )}
                  </div>
                  <span className="text-xs font-bold block mt-2 leading-snug">{stage.name}</span>
                  <div className="flex items-center justify-between mt-1 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="capitalize">{stage.status}</span>
                    <span>{stage.duration}</span>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-slate-200/50 dark:border-slate-700/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>{isExpanded ? 'Hide Logs' : 'View Logs'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded Stage Log Terminal */}
          {expandedStageIndex !== null && (
            <div className="mt-4 p-4 rounded-2xl bg-slate-950 text-slate-100 font-mono text-xs space-y-2 animate-in fade-in shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Terminal className="w-3.5 h-3.5" />
                  Stage: {pipeline.pipelineSteps[expandedStageIndex].name}
                </span>
                <span className="capitalize">Status: {pipeline.pipelineSteps[expandedStageIndex].status}</span>
              </div>
              <div className="space-y-1 text-slate-300">
                {(STAGE_LOGS[expandedStageIndex] || ['[00:00:01] Initializing container step...']).map(
                  (line, i) => (
                    <div key={i} className="leading-relaxed">
                      {line}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Flaky Tests & CVE Vulnerabilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Flaky Tests */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Flaky Test Diagnostics ({pipeline.flakyTests.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tests that pass and fail intermittently without code changes.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pipeline.flakyTests.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-orange-950 dark:text-orange-300 truncate max-w-[240px]">
                    {t.suite}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-800">
                    {100 - t.failureRate}% Pass Rate
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono">
                  <span>Test: {t.name}</span>
                  <span>Commit: {t.lastFailedCommit}</span>
                </div>

                <div className="pt-2 border-t border-orange-200/60 dark:border-orange-900/60 flex items-center justify-end">
                  <button
                    onClick={() => onSimulatePipelineEvent && onSimulatePipelineEvent('flaky_tests')}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors cursor-pointer shadow-2xs"
                  >
                    Quarantine & Analyze
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CVE Security Vulnerabilities */}
        <div className="bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                Vulnerability Assessment ({pipeline.vulnerabilities.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Supply chain CVE scans on third-party dependencies.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {pipeline.vulnerabilities.map((v) => (
              <div
                key={v.id}
                className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-950 dark:text-rose-300">{v.cveId}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                    {v.severity} Severity
                  </span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 font-mono space-y-0.5">
                  <p>Affected: <span className="font-bold">{v.package}</span></p>
                  <p className="text-emerald-700 dark:text-emerald-400 font-semibold">{v.remediation}</p>
                </div>

                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 flex items-center justify-end">
                  <button
                    onClick={() => onSimulatePipelineEvent && onSimulatePipelineEvent('vulnerability')}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-2xs"
                  >
                    Draft Dependabot Patch
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
