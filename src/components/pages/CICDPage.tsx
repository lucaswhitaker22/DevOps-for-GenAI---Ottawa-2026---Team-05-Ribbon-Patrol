import React from 'react';
import {
  ArrowLeft,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Activity,
  Bug,
  Shield,
  Clock,
  Play,
  RotateCw,
  Terminal,
  ExternalLink,
  Flame,
  Layers,
} from 'lucide-react';
import { RepositoryState, CICDPipelineState, ActivePageId } from '../../types';

interface CICDPageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onSimulatePipelineEvent?: (
    type: 'failed_build' | 'flaky_tests' | 'vulnerability' | 'deploy_success' | 'lost_map' | 'smoke_cloud' | 'shield_cracked'
  ) => void;
}

export const CICDPage: React.FC<CICDPageProps> = ({
  state,
  onNavigate,
  onSimulatePipelineEvent,
}) => {
  const pipeline: CICDPipelineState = state.pipelineState || {
    pipelineId: 'job-1001',
    buildStatus: 'passed',
    testHealth: 'healthy',
    passRate: 100,
    flakyTests: [],
    vulnerabilities: [],
    deployTarget: 'production',
    deployStatus: 'success',
    lastRunTime: 'Just now',
    pipelineSteps: [
      { name: 'Lint & Formatting', status: 'success', duration: '10s' },
      { name: 'TypeScript Compilation', status: 'success', duration: '14s' },
      { name: 'Unit & Integration Tests', status: 'success', duration: '45s' },
      { name: 'Security Audit Scan', status: 'success', duration: '20s' },
      { name: 'Deploy to Environment', status: 'success', duration: '35s' },
    ],
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" /> Passed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-4 h-4" /> Failed
          </span>
        );
      case 'warning':
      case 'flaky':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-4 h-4" /> Flaky / Warning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <Activity className="w-4 h-4" /> {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => onNavigate('companion')}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Return to Companion"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-500">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  CI/CD Build & Pipeline Telemetry
                </h1>
                {getStatusBadge(pipeline.buildStatus)}
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Pipeline <span className="font-semibold text-slate-800">#{pipeline.pipelineId}</span> • Branch{' '}
                <span className="font-semibold text-slate-800">{state.currentBranch.name}</span> • Last run{' '}
                {pipeline.lastRunTime}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-slate-500 block">Deploy Target</span>
              <span className="text-xs font-mono font-bold text-slate-900 uppercase">
                {pipeline.deployTarget} ({pipeline.deployStatus})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Test Pass Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{pipeline.passRate}%</span>
            <span className={`text-xs font-bold ${pipeline.passRate >= 90 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {pipeline.passRate >= 90 ? 'Healthy' : 'Below Gate'}
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-2">
            <div
              className={`h-full rounded-full ${pipeline.passRate >= 90 ? 'bg-emerald-500' : 'bg-rose-500'}`}
              style={{ width: `${pipeline.passRate}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Test Health</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 capitalize font-mono">{pipeline.testHealth}</span>
            <Bug className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            {pipeline.flakyTests.length} flaky {pipeline.flakyTests.length === 1 ? 'test' : 'tests'} detected
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Security Vulnerabilities</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900 font-mono">{pipeline.vulnerabilities.length}</span>
            <Shield className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-[11px] text-slate-400">
            {pipeline.vulnerabilities.length === 0 ? 'Zero CVEs detected' : 'Requires security patch'}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-semibold text-slate-500">Deployment Status</span>
          <div className="flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900 capitalize font-mono">{pipeline.deployStatus}</span>
            <span className="text-xs text-indigo-600 font-mono font-bold">{pipeline.deployTarget}</span>
          </div>
          <p className="text-[11px] text-slate-400">Automated deployment hook</p>
        </div>
      </div>

      {/* Main Grid: Pipeline Steps & Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Pipeline Execution Stages */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Pipeline Execution Sequence
            </h2>
            <span className="text-xs text-slate-400 font-mono">{pipeline.pipelineSteps.length} stages</span>
          </div>

          <div className="space-y-3">
            {pipeline.pipelineSteps.map((step, idx) => (
              <div
                key={step.name}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold font-mono">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{step.name}</span>
                    {step.logSummary && (
                      <span className="text-[11px] text-slate-500 font-mono">{step.logSummary}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {step.duration}
                  </span>
                  {getStatusBadge(step.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flaky Tests & Vulnerabilities Findings */}
        <div className="lg:col-span-5 space-y-5">
          {/* Flaky Tests */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bug className="w-4 h-4 text-amber-600" />
              Flaky Test Intelligence ({pipeline.flakyTests.length})
            </h2>

            {pipeline.flakyTests.length === 0 ? (
              <div className="py-6 text-center text-slate-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-700">No flaky tests detected</p>
                <p className="text-[11px] text-slate-400">All test suites pass deterministically</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pipeline.flakyTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-900">{t.name}</span>
                      <span className="font-mono text-[10px] text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded">
                        {t.failureRate}% failure
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-700 font-mono">Suite: {t.suite}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Security CVEs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-600" />
              Security Audit Findings ({pipeline.vulnerabilities.length})
            </h2>

            {pipeline.vulnerabilities.length === 0 ? (
              <div className="py-6 text-center text-slate-400">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-1.5" />
                <p className="text-xs font-semibold text-slate-700">Zero CVE vulnerabilities</p>
                <p className="text-[11px] text-slate-400">Dependency tree is clean and secure</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pipeline.vulnerabilities.map((v) => (
                  <div
                    key={v.id}
                    className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-900">{v.title}</span>
                      <span className="font-mono text-[10px] text-rose-800 font-bold uppercase bg-rose-100 px-1.5 py-0.2 rounded">
                        {v.severity}
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-700 font-mono">{v.cveId} • {v.package}</p>
                    <p className="text-[11px] text-rose-800 font-medium">{v.remediation}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CI/CD Scenario Simulation Hub */}
      {onSimulatePipelineEvent && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-4 h-4 text-indigo-600" />
                Simulate CI/CD Pipeline Scenarios
              </h2>
              <p className="text-xs text-slate-500">
                Trigger simulated build failures, flaky test patterns, or deployment milestones to test companion reactions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-2">
            <button
              onClick={() => onSimulatePipelineEvent('failed_build')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
            >
              Simulate Build Failure
            </button>
            <button
              onClick={() => onSimulatePipelineEvent('flaky_tests')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition-colors cursor-pointer"
            >
              Simulate Flaky Tests
            </button>
            <button
              onClick={() => onSimulatePipelineEvent('vulnerability')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer"
            >
              Simulate Security Vulnerability
            </button>
            <button
              onClick={() => onSimulatePipelineEvent('deploy_success')}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
            >
              Simulate Deploy Success 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
