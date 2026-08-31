import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Rocket,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Bug,
  Layers,
  GitPullRequest,
  GitBranch,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  ClipboardCheck,
  FileText,
  Clock,
  Check,
} from 'lucide-react';
import { RepositoryState, ReleaseReadinessReport, ReleasePillarId, ActivePageId } from '../../types';
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
  const [report, setReport] = useState<ReleaseReadinessReport>(() => calculateReleaseReadiness(state));
  const [selectedPillar, setSelectedPillar] = useState<ReleasePillarId>('vulnerabilities');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  useEffect(() => {
    const base = calculateReleaseReadiness(state);
    setReport(base);
    if (base.metrics.vulnerabilities.status === 'failed') {
      setSelectedPillar('vulnerabilities');
    } else if (base.metrics.testsPassing.status === 'failed') {
      setSelectedPillar('tests_passing');
    } else if (base.metrics.prApprovals.status === 'failed') {
      setSelectedPillar('pr_approvals');
    }
  }, [state]);

  const handleRefreshAI = async () => {
    setIsLoadingAI(true);
    try {
      const res = await fetch('/api/ai/release-readiness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.report) {
          setReport(data.report);
        }
      }
    } catch (err) {
      console.warn('Failed to refresh AI release readiness:', err);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handleCopySummary = () => {
    const text = `${report.headline}\n\nOverall Readiness: ${report.overallScore}% (${report.statusLabel})\n` +
      `• Tests Passing: ${report.metrics.testsPassing.value}\n` +
      `• Code Coverage: ${report.metrics.coverage.value}\n` +
      `• Vulnerabilities: ${report.metrics.vulnerabilities.value}\n` +
      `• PR Approvals: ${report.metrics.prApprovals.value}\n` +
      `• Branch Freshness: ${report.metrics.branchFreshness.value}\n\n` +
      `Evaluated by GitPet Release Readiness Advisor.`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const getPillarIcon = (id: ReleasePillarId) => {
    switch (id) {
      case 'tests_passing':
        return <Bug className="w-4 h-4 text-emerald-500" />;
      case 'coverage':
        return <Layers className="w-4 h-4 text-blue-500" />;
      case 'vulnerabilities':
        return <ShieldAlert className="w-4 h-4 text-rose-500" />;
      case 'pr_approvals':
        return <GitPullRequest className="w-4 h-4 text-purple-500" />;
      case 'branch_freshness':
        return <GitBranch className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: 'passed' | 'warning' | 'failed') => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pass
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Warn
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Block
          </span>
        );
    }
  };

  const activePillarData =
    Object.values(report.metrics).find((m) => m.id === selectedPillar) || report.metrics.vulnerabilities;

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.overallScore / 100) * circumference;

  const scoreColor =
    report.overallScore >= 85
      ? 'text-emerald-500 stroke-emerald-500'
      : report.overallScore >= 70
      ? 'text-amber-500 stroke-amber-500'
      : 'text-rose-500 stroke-rose-500';

  const scoreBg =
    report.overallScore >= 85
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : report.overallScore >= 70
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-rose-50 text-rose-700 border-rose-200';

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
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Release Readiness Advisor & Gate
                </h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                  5-Pillar Gate
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive automated verification across security CVEs, unit tests, code coverage, PR approvals, and branch freshness.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefreshAI}
              disabled={isLoadingAI}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin text-purple-600' : ''}`} />
              <span>{isLoadingAI ? 'Evaluating...' : 'Re-evaluate'}</span>
            </button>

            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <ClipboardCheck className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Banner Card: Overall Score & AI Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-800/40 shadow-md">
        <div className="md:col-span-4 flex items-center gap-5 justify-center md:justify-start border-b md:border-b-0 md:border-r border-indigo-800/40 pb-4 md:pb-0 md:pr-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} className="stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`${scoreColor} transition-all duration-700`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight">{report.overallScore}%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Readiness</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium">Shipment Gate</div>
            <div className="text-lg font-extrabold text-white mt-0.5">{report.statusLabel}</div>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border mt-2 ${scoreBg}`}>
              {report.canShip ? '✅ Ready to Deploy' : '🛑 Release Blockers Found'}
            </span>
          </div>
        </div>

        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
              AI Release Advisor Assessment
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-100">{report.headline}</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{report.executiveSummary}</p>
        </div>
      </div>

      {/* 5-Pillar Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {Object.values(report.metrics).map((m) => {
          const isSelected = selectedPillar === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setSelectedPillar(m.id)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-50/80 border-indigo-400 ring-2 ring-indigo-300/40 shadow-xs'
                  : 'bg-white hover:bg-slate-50 border-slate-200/90 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div className="p-2 rounded-xl bg-slate-100">{getPillarIcon(m.id)}</div>
                {getStatusBadge(m.status)}
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block truncate">{m.name}</span>
                <span className="text-sm font-black font-mono text-slate-900 mt-1 block">{m.value}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Deep Dive & Blocker Resolution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                {getPillarIcon(activePillarData.id)}
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">{activePillarData.name} Drilldown</h2>
                <span className="text-xs text-slate-500 font-mono">Status: {activePillarData.status.toUpperCase()}</span>
              </div>
            </div>
            {getStatusBadge(activePillarData.status)}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-slate-600 block">Measured Value</span>
            <div className="text-xl font-bold font-mono text-slate-900">{activePillarData.value}</div>
            <p className="text-xs text-slate-700 leading-relaxed">{activePillarData.details}</p>
          </div>

          <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/70 space-y-2">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              Recommended Gate Action
            </span>
            <p className="text-xs text-indigo-950 font-medium">{activePillarData.recommendation}</p>
          </div>
        </div>

        {/* Active Blockers & Safe Quick Fix Actions */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Release Blocker Actions ({report.blockers.length})
          </h2>

          {report.blockers.length === 0 ? (
            <div className="py-8 text-center text-slate-400">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-700">Zero Release Blockers</p>
              <p className="text-[11px] text-slate-400">All 5 release pillars meet or exceed minimum deployment thresholds.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {report.blockers.map((b, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/60 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-rose-900 block">{b}</span>
                    <span className="text-[11px] text-rose-700">Action required before production tagging</span>
                  </div>
                  {onRemediateBlocker && (
                    <button
                      onClick={() => onRemediateBlocker(b)}
                      className="px-2.5 py-1 rounded-lg font-bold bg-rose-600 hover:bg-rose-700 text-white shrink-0 transition-colors cursor-pointer"
                    >
                      Fix
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
