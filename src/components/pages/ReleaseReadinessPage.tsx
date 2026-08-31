import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowLeft,
  Download,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Flame,
  GitPullRequest,
  Lock,
} from 'lucide-react';
import { RepositoryState, ActivePageId, ReleaseReadinessReport, ReleaseReadinessMetric } from '../../types';
import { calculateReleaseReadiness } from '../../utils/releaseReadiness';

interface ReleaseReadinessPageProps {
  state: RepositoryState;
  onNavigate: (page: ActivePageId) => void;
  onRemediateBlocker?: (blockerText: string) => void;
  onOpenCommitGenerator?: () => void;
}

export const ReleaseReadinessPage: React.FC<ReleaseReadinessPageProps> = ({
  state,
  onNavigate,
  onRemediateBlocker,
  onOpenCommitGenerator,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [signedOff, setSignedOff] = useState(false);
  const report: ReleaseReadinessReport = calculateReleaseReadiness(state);

  const handleCopyMarkdown = () => {
    const markdown = `# GitPet Production Release Sign-Off Report
**Repository:** ${state.repoName}
**Branch:** ${state.currentBranch.name}
**Timestamp:** ${new Date().toISOString()}
**Overall Readiness Score:** ${report.overallScore}% (${report.statusLabel})
**Can Ship:** ${report.canShip ? 'YES' : 'NO'}

## Executive Summary
${report.executiveSummary}

## 5-Pillar Scorecard
- **Tests Passing:** ${report.metrics.testsPassing.value} (${report.metrics.testsPassing.status})
- **Code Coverage:** ${report.metrics.coverage.value} (${report.metrics.coverage.status})
- **Security Vulnerabilities:** ${report.metrics.vulnerabilities.value} (${report.metrics.vulnerabilities.status})
- **PR Review Approvals:** ${report.metrics.prApprovals.value} (${report.metrics.prApprovals.status})
- **Branch Freshness:** ${report.metrics.branchFreshness.value} (${report.metrics.branchFreshness.status})

## Active Blockers
${report.blockers.length > 0 ? report.blockers.map((b) => `- ${b}`).join('\n') : '- No active blockers. Ready to deploy.'}
`;

    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(markdown).catch(() => {});
      }
    } catch (_) {}
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `release-readiness-${state.repoName}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSignOff = () => {
    setSignedOff(true);
    setTimeout(() => setSignedOff(false), 4000);
  };

  const metricList: ReleaseReadinessMetric[] = [
    report.metrics.testsPassing,
    report.metrics.coverage,
    report.metrics.vulnerabilities,
    report.metrics.prApprovals,
    report.metrics.branchFreshness,
  ];

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
            <div className="p-3 rounded-2xl bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Release Gate & Deployment Sign-Off
                </h1>
                <span
                  className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                    report.canShip
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {report.statusLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                5-Pillar Gate • Target Branch <span className="font-bold text-slate-800">{state.currentBranch.name}</span> • Overall Score <span className="font-bold text-slate-800">{report.overallScore}%</span>
              </p>
            </div>
          </div>

          {/* Export & Sign-Off Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {onOpenCommitGenerator && (
              <button
                onClick={onOpenCommitGenerator}
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                <span>AI Conventional Commit</span>
              </button>
            )}

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedMd ? 'Copied Markdown' : 'Copy Summary'}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download JSON</span>
            </button>

            <button
              onClick={handleSignOff}
              disabled={!report.canShip || signedOff}
              className="flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all disabled:opacity-40 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{signedOff ? 'Signed Off & Deployed 🎉' : 'Sign Off Release'}</span>
            </button>
          </div>
        </div>

        {/* Executive Summary Callout */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-slate-900 block mb-1">Executive Summary</span>
          {report.executiveSummary}
        </div>
      </div>

      {/* 5-Pillar Scorecard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricList.map((metric) => {
          return (
            <div
              key={metric.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 capitalize">
                  {metric.name}
                </span>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase ${
                    metric.status === 'passed'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : metric.status === 'warning'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  {metric.status}
                </span>
              </div>

              <div className="text-sm font-mono font-bold text-slate-900">
                {metric.value}
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {metric.details}
              </p>

              {metric.recommendation && (
                <div className="pt-2 border-t border-slate-100 text-[11px] text-indigo-700 font-medium">
                  💡 {metric.recommendation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Release Blockers */}
      {report.blockers.length > 0 && (
        <div className="p-5 sm:p-6 rounded-3xl bg-rose-50/80 border border-rose-200 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-rose-950 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
            Deployment Blockers ({report.blockers.length})
          </h2>
          <ul className="space-y-2 text-xs text-rose-900">
            {report.blockers.map((b, idx) => (
              <li key={idx} className="flex items-start justify-between gap-3 p-3 rounded-2xl bg-white/80 border border-rose-200/80">
                <div className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold">•</span>
                  <span>{b}</span>
                </div>
                {onRemediateBlocker && (
                  <button
                    onClick={() => onRemediateBlocker(b)}
                    className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shrink-0 cursor-pointer shadow-2xs"
                  >
                    Remediate
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
