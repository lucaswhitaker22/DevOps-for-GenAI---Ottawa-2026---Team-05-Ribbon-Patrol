import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
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
  Download,
  Flame,
  Clock,
  Check,
} from 'lucide-react';
import { RepositoryState, ReleaseReadinessReport, ReleasePillarId } from '../types';
import { calculateReleaseReadiness } from '../utils/releaseReadiness';

interface ReleaseReadinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onRemediateBlocker?: (blockerText: string) => void;
  onOpenCommitGenerator?: () => void;
}

export const ReleaseReadinessModal: React.FC<ReleaseReadinessModalProps> = ({
  isOpen,
  onClose,
  state,
  onRemediateBlocker,
  onOpenCommitGenerator,
}) => {
  const [report, setReport] = useState<ReleaseReadinessReport>(() => calculateReleaseReadiness(state));
  const [selectedPillar, setSelectedPillar] = useState<ReleasePillarId>('vulnerabilities');
  const [isLoadingAI, setIsLoadingAI] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Recalculate or fetch AI evaluation when state changes or modal opens
  useEffect(() => {
    if (isOpen) {
      const base = calculateReleaseReadiness(state);
      setReport(base);
      // Auto-select first failing pillar, or default to vulnerabilities
      if (base.metrics.vulnerabilities.status === 'failed') {
        setSelectedPillar('vulnerabilities');
      } else if (base.metrics.testsPassing.status === 'failed') {
        setSelectedPillar('tests_passing');
      } else if (base.metrics.prApprovals.status === 'failed') {
        setSelectedPillar('pr_approvals');
      } else if (base.metrics.branchFreshness.status === 'failed') {
        setSelectedPillar('branch_freshness');
      }
    }
  }, [isOpen, state]);

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

  if (!isOpen) return null;

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
    const getStatusBadge = (status: 'passed' | 'warning' | 'failed') => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Pass
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
            <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Warn
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-700">
            <XCircle className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Block
          </span>
        );
    }
  };

  const activePillarData = Object.values(report.metrics).find((m) => m.id === selectedPillar) || report.metrics.vulnerabilities;

  // Gauge circle math
  const radius = 42;
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
      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
      : report.overallScore >= 70
      ? 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
      : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-slate-100"
        >
          {/* Header */}
          <div className="px-5 sm:px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-xs">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-white">Release Readiness Advisor</h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/20">
                    5-Pillar Gate
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  AI-evaluated release engineering decision engine across tests, coverage, security, PRs, and branch freshness.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshAI}
                disabled={isLoadingAI}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1.5 px-2.5"
                title="Re-run AI evaluation"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingAI ? 'animate-spin text-purple-400' : ''}`} />
                <span className="hidden sm:inline">Re-evaluate</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
            {/* Top Score Banner + AI Headline Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-indigo-800/40 shadow-md">
              {/* Radial Score Gauge */}
              <div className="md:col-span-4 flex items-center gap-4 justify-center md:justify-start border-b md:border-b-0 md:border-r border-indigo-800/40 pb-4 md:pb-0 md:pr-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r={radius}
                      className="stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
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
                    <span className="text-2xl font-black tracking-tight">{report.overallScore}%</span>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">Ready</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-400 font-medium">Release Status</div>
                  <div className="text-base font-extrabold text-white mt-0.5">{report.statusLabel}</div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mt-1.5 ${scoreBg}`}>
                    {report.canShip ? '✅ Approved for Ship' : '🛑 Blocker Action Required'}
                  </span>
                </div>
              </div>

              {/* Exact Response Headline */}
              <div className="md:col-span-8 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  <span>AI Advisor Verdict</span>
                </div>
                <div
                  id="release-readiness-headline"
                  className="text-base sm:text-lg font-bold text-white leading-snug tracking-tight bg-slate-800/80 p-3 rounded-xl border border-indigo-400/30"
                >
                  &ldquo;{report.headline}&rdquo;
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {report.executiveSummary}
                </p>
              </div>
            </div>

            {/* The 5 DevOps Pillars Navigation Cards */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  5 Release Pillars Breakdown
                </h3>
                <span className="text-[11px] text-slate-400">Click a pillar to view audit details</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {Object.values(report.metrics).map((m) => {
                  const isSelected = m.id === selectedPillar;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedPillar(m.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                        isSelected
                          ? 'bg-purple-50/80 dark:bg-purple-950/60 border-purple-500 ring-2 ring-purple-400/30 shadow-xs'
                          : 'bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 w-full mb-1.5">
                        <div className="flex items-center gap-1.5">
                          {getPillarIcon(m.id)}
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{m.name}</span>
                        </div>
                        {getStatusBadge(m.status)}
                      </div>

                      <div className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-1 truncate">
                        {m.value}
                      </div>

                      <div className="mt-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            m.status === 'passed' ? 'bg-emerald-500' : m.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${m.score}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Pillar Deep Dive Card */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-700 shadow-2xs border border-slate-200 dark:border-slate-600">
                    {getPillarIcon(activePillarData.id)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <span>{activePillarData.name} Evaluation</span>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Weight: {activePillarData.weight * 100}%</span>
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{activePillarData.target}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">Pillar Score:</span>
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg border ${
                    activePillarData.status === 'passed' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' :
                    activePillarData.status === 'warning' ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700' :
                    'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700'
                  }`}>
                    {activePillarData.score}/100
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80 dark:border-slate-700">
                <div className="bg-white dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Observed Evidence</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mt-1 leading-relaxed">
                    {activePillarData.details}
                  </p>
                </div>
                <div className="bg-white dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-purple-500" /> AI Recommendation
                  </span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mt-1 leading-relaxed">
                    {activePillarData.recommendation}
                  </p>
                </div>
              </div>
            </div>

            {/* Blockers & Sign-off Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Active Blockers / Warnings */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Release Blockers & Alerts</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                    {report.blockers.length} Blockers
                  </span>
                </h4>

                {report.blockers.length > 0 ? (
                  <div className="space-y-2">
                    {report.blockers.map((b, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/60 text-xs text-rose-900 dark:text-rose-200 flex items-start justify-between gap-2"
                      >
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                          <span className="font-medium leading-tight">{b}</span>
                        </div>
                        {onRemediateBlocker && (
                          <button
                            type="button"
                            onClick={() => {
                              onRemediateBlocker(b);
                              onClose();
                            }}
                            className="text-[10px] font-bold text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 hover:underline shrink-0 bg-white dark:bg-slate-900 px-2 py-1 rounded border border-rose-200 dark:border-rose-800 cursor-pointer"
                          >
                            Fix with Byte →
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Zero release blockers detected! All criteria satisfied for clean sign-off.</span>
                  </div>
                )}
              </div>

              {/* Release Sign-off Checklist */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-between">
                  <span>Production Sign-off Checklist</span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {report.signOffChecklist.filter((c) => c.passed).length}/{report.signOffChecklist.length} Green
                  </span>
                </h4>

                <div className="space-y-2">
                  {report.signOffChecklist.map((item) => (
                    <div
                      key={item.id}
                      className={`p-2 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                        item.passed ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200/60 dark:border-emerald-800/60 text-slate-800 dark:text-slate-200' : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        <span className={`text-[11px] ${item.passed ? 'font-semibold text-emerald-950 dark:text-emerald-300' : 'text-slate-600 dark:text-slate-400'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySummary}
                className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <ClipboardCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
                <span>{copiedSummary ? 'Copied Summary!' : 'Copy Release Summary'}</span>
              </button>

              {onOpenCommitGenerator && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenCommitGenerator();
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Release Notes</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                type="button"
                disabled={!report.canShip}
                onClick={() => {
                  alert(`🚀 Release candidate verified! Dispatching deployment workflow for ${state.repoName}.`);
                  onClose();
                }}
                className={`px-5 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-xs ${
                  report.canShip
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer hover:scale-102'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-300 dark:border-slate-700'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>{report.canShip ? 'Authorize Production Ship' : 'Blocked from Release'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
