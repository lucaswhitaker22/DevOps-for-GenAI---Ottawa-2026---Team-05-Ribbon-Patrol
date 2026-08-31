import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Heart,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  Download,
  Copy,
  Check,
  Filter,
} from 'lucide-react';
import { RepositoryState, ActivePageId, RiskFactorItem } from '../../types';

interface RiskScorePageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onRemediateFactor?: (factor: RiskFactorItem) => void;
}

export const RiskScorePage: React.FC<RiskScorePageProps> = ({
  state,
  onNavigate,
  onRemediateFactor,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'high' | 'medium' | 'healthy'>('all');
  const [copied, setCopied] = useState(false);

  const factors: RiskFactorItem[] = state.riskBreakdown?.factors || [
    {
      id: 'branch_divergence',
      name: 'Branch Divergence & Merge Drift',
      impact: state.currentBranch.behindCount > 0 ? -15 : 0,
      status: state.currentBranch.behindCount > 0 ? 'warning' : 'good',
      details: state.currentBranch.behindCount > 0
        ? `Local branch is behind upstream origin by ${state.currentBranch.behindCount} commits.`
        : 'Local branch is up to date with origin.',
      recommendation: 'Pull origin changes into local branch to prevent rebase divergence.',
      metricLabel: `${state.currentBranch.behindCount} commits behind`,
    },
    {
      id: 'unreviewed_commits',
      name: 'Uncommitted Working Tree Churn',
      impact: state.workingTree.length > 0 ? -20 : 0,
      status: state.workingTree.length > 0 ? 'warning' : 'good',
      details: state.workingTree.length > 0
        ? `${state.workingTree.length} modified/untracked files at risk of merge conflict overwrite.`
        : 'Working tree is clean.',
      recommendation: 'Stash or commit working tree changes before pulling from upstream.',
      metricLabel: `${state.workingTree.length} uncommitted files`,
    },
    {
      id: 'code_smells',
      name: 'Merge Conflict Hazard',
      impact: state.workingTree.some((f) => f.status === 'conflicted') ? -40 : 0,
      status: state.workingTree.some((f) => f.status === 'conflicted') ? 'critical' : 'good',
      details: state.workingTree.some((f) => f.status === 'conflicted')
        ? 'Active merge conflicts blocking compilation and linear history.'
        : 'No merge conflicts detected.',
      recommendation: 'Resolve conflict markers in affected files before merging.',
      metricLabel: state.workingTree.some((f) => f.status === 'conflicted') ? 'Conflict detected' : 'Clean',
    },
    {
      id: 'failed_tests',
      name: 'CI/CD Pipeline Build Reliability',
      impact: state.pipelineState?.buildStatus === 'failed' ? -15 : 0,
      status: state.pipelineState?.buildStatus === 'failed' ? 'warning' : 'good',
      details: state.pipelineState?.buildStatus === 'failed'
        ? 'CI build failed in recent run #1042.'
        : 'All pipeline test steps passing.',
      recommendation: 'Fix compilation errors and flaky test failures.',
      metricLabel: state.pipelineState?.buildStatus === 'failed' ? 'CI Build Failed' : 'CI Passed',
    },
    {
      id: 'vulnerabilities',
      name: 'Supply Chain CVE Vulnerabilities',
      impact: (state.pipelineState?.vulnerabilities.length || 0) > 0 ? -10 : 0,
      status: (state.pipelineState?.vulnerabilities.length || 0) > 0 ? 'warning' : 'good',
      details: (state.pipelineState?.vulnerabilities.length || 0) > 0
        ? `${state.pipelineState?.vulnerabilities.length} CVEs found in dependency manifest.`
        : 'Zero CVE vulnerabilities detected.',
      recommendation: 'Upgrade affected packages to secure patch versions.',
      metricLabel: `${state.pipelineState?.vulnerabilities.length || 0} CVEs`,
    },
  ];

  const filteredFactors = factors.filter((f) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high') return f.status === 'critical';
    if (selectedFilter === 'medium') return f.status === 'warning';
    if (selectedFilter === 'healthy') return f.status === 'good';
    return true;
  });

  const handleCopyReport = () => {
    const text = `GitPet 7-Factor Repository Risk Scorecard
Repository: ${state.repoName}
Health Score: ${state.healthPercentage}% (${state.healthLevel})
Timestamp: ${new Date().toISOString()}

Factors:
${factors.map((f) => `- [${f.status.toUpperCase()}] ${f.name} (${f.impact} pts): ${f.details}`).join('\n')}
`;
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      }
    } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <button
              onClick={() => onNavigate('companion')}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              title="Return to Companion"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="p-3 rounded-2xl bg-rose-600 text-white shadow-sm ring-1 ring-rose-500">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  7-Factor Repository Risk Scorecard
                </h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                    state.healthPercentage >= 90
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : state.healthPercentage >= 50
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {state.healthLevel} ({state.healthPercentage}% HP)
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {state.repoName} • Dynamic weighted risk assessment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Summary' : 'Copy Scorecard'}</span>
            </button>
          </div>
        </div>

        {/* Health Gauge Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-slate-500">Repository Health Pool</span>
            <span className="text-slate-900">{state.healthPercentage} / 100 HP</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                state.healthPercentage >= 90
                  ? 'bg-emerald-500'
                  : state.healthPercentage >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.max(3, state.healthPercentage)}%` }}
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100 text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedFilter === 'all' ? 'bg-slate-900 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Factors ({factors.length})
          </button>
          <button
            onClick={() => setSelectedFilter('high')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedFilter === 'high' ? 'bg-rose-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Critical Hazards ({factors.filter((f) => f.status === 'critical').length})
          </button>
          <button
            onClick={() => setSelectedFilter('medium')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedFilter === 'medium' ? 'bg-amber-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Warnings ({factors.filter((f) => f.status === 'warning').length})
          </button>
          <button
            onClick={() => setSelectedFilter('healthy')}
            className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
              selectedFilter === 'healthy' ? 'bg-emerald-600 text-white shadow-2xs font-bold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Healthy ({factors.filter((f) => f.status === 'good').length})
          </button>
        </div>
      </div>

      {/* Factor Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFactors.map((factor) => (
          <div
            key={factor.id}
            className={`p-5 rounded-3xl border shadow-xs space-y-3 bg-white ${
              factor.status === 'critical'
                ? 'border-rose-300 ring-1 ring-rose-400/20'
                : factor.status === 'warning'
                ? 'border-amber-200'
                : 'border-slate-200/90'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">{factor.name}</span>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                  factor.status === 'critical'
                    ? 'bg-rose-100 text-rose-800'
                    : factor.status === 'warning'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {factor.status === 'good' ? 'Healthy' : factor.status} ({factor.impact} pts)
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{factor.details}</p>

            {factor.recommendation && (
              <p className="text-[11px] text-slate-500 font-medium pt-1">
                💡 {factor.recommendation}
              </p>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] font-mono text-slate-400">{factor.metricLabel || ''}</span>
              {factor.status !== 'good' && onRemediateFactor && (
                <button
                  onClick={() => onRemediateFactor(factor)}
                  className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer shadow-2xs"
                >
                  Remediate with Byte
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
