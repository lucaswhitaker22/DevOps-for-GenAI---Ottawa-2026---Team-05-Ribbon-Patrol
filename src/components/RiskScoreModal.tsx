import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  GitBranch,
  Bug,
  KeyRound,
  FileCode,
  Lock,
  Clock,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { RepositoryState, RiskScoreBreakdown, RiskFactorItem } from '../types';
import { computeRepositoryHealth } from '../data/mockScenarios';

interface RiskScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onRemediateFactor?: (factor: RiskFactorItem) => void;
}

export const RiskScoreModal: React.FC<RiskScoreModalProps> = ({
  isOpen,
  onClose,
  state,
  onRemediateFactor,
}) => {
  const [selectedFactorId, setSelectedFactorId] = useState<string | null>(null);

  const healthData = computeRepositoryHealth(state);
  const breakdown: RiskScoreBreakdown =
    state.riskBreakdown ||
    healthData.riskBreakdown || {
      overallScore: state.healthPercentage || 82,
      healthLevel: state.healthLevel || 'Attention',
      riskCategory:
        state.healthLevel === 'Unsafe'
          ? 'Critical Risk'
          : state.healthLevel === 'Blocked'
          ? 'High Risk'
          : state.healthLevel === 'Attention'
          ? 'Moderate Risk'
          : 'Low Risk',
      summary: 'Data-driven repository risk score evaluating 7 DevOps and Git health dimensions.',
      factors: [
        {
          id: 'branch_divergence',
          name: 'Branch Divergence',
          impact: -10,
          status: 'warning',
          details: 'Active branch has 3 incoming commits from upstream origin.',
          recommendation: 'Fast-forward pull or rebase onto upstream.',
        },
        {
          id: 'failed_tests',
          name: 'Failed & Flaky Tests',
          impact: 0,
          status: 'good',
          details: 'All 18 unit and integration test suites passing.',
          recommendation: 'Maintain continuous test validation.',
        },
        {
          id: 'secrets_detected',
          name: 'Secrets & Policy Compliance',
          impact: 0,
          status: 'good',
          details: 'Zero plaintext tokens or AWS/GCP credentials in commit diffs.',
          recommendation: 'Keep secrets securely in environment vaults.',
        },
        {
          id: 'code_smells',
          name: 'Code Smells & Debt',
          impact: -4,
          status: 'good',
          details: 'Working tree contains 2 uncommitted modified files.',
          recommendation: 'Review diffs and create atomic commits.',
        },
        {
          id: 'vulnerabilities',
          name: 'Open Vulnerabilities',
          impact: 0,
          status: 'good',
          details: 'Zero known high/critical CVEs in package lock.',
          recommendation: 'Run dependency vulnerability audits regularly.',
        },
        {
          id: 'unreviewed_commits',
          name: 'Unreviewed Commits & PR Lag',
          impact: -4,
          status: 'warning',
          details: 'PR #214 waiting 3 days for peer review feedback.',
          recommendation: 'Ping requested reviewers to unblock approval queue.',
        },
        {
          id: 'large_pr_size',
          name: 'Large PR Size',
          impact: 0,
          status: 'good',
          details: 'Diff size is compact (< 300 lines changed).',
          recommendation: 'Keep PRs modular and incremental.',
        },
      ],
    };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 70) return 'text-amber-500 stroke-amber-500';
    if (score >= 40) return 'text-orange-500 stroke-orange-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    if (score >= 70) return 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
    if (score >= 40) return 'bg-orange-50 dark:bg-orange-950/80 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
    return 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800';
  };

  const getFactorIcon = (id: string) => {
    switch (id) {
      case 'branch_divergence':
        return <GitBranch className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'failed_tests':
        return <Bug className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'secrets_detected':
        return <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'code_smells':
        return <FileCode className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'vulnerabilities':
        return <Lock className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'unreviewed_commits':
        return <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'large_pr_size':
      default:
        return <Layers className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-slate-100"
        >
          {/* Modal Header */}
          <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold flex items-center gap-2">
                  <span>Repository Risk Score</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                    Data-Driven HP
                  </span>
                </h2>
                <p className="text-xs text-slate-400 font-mono">{state.repoName} ({state.currentBranch.name})</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
            {/* Top Score Banner & Gauge */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                {/* Health Score Radial Gauge */}
                <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-200 dark:text-slate-700 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={`${getScoreColor(breakdown.overallScore)} stroke-current transition-all duration-1000 ease-out`}
                      strokeDasharray={`${breakdown.overallScore}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900 dark:text-slate-100 font-mono">{breakdown.overallScore}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">HP</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                      Health Score: {breakdown.overallScore}/100
                    </h3>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getScoreBg(breakdown.overallScore)}`}>
                      {breakdown.riskCategory}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm leading-relaxed">
                    {breakdown.summary}
                  </p>
                </div>
              </div>

              <div className="text-right sm:border-l sm:border-slate-200 dark:sm:border-slate-700 sm:pl-5 text-xs text-slate-500 dark:text-slate-400 shrink-0">
                <div className="font-semibold text-slate-700 dark:text-slate-300">Health Level</div>
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 capitalize">{breakdown.healthLevel}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-mono">7 factors evaluated</div>
              </div>
            </div>

            {/* 7 Risk Factors Grid List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Risk Dimensions & Factors</span>
                </h4>
                <span className="text-[11px] text-slate-400">Click a factor to inspect or remediate</span>
              </div>

              <div className="space-y-2.5">
                {breakdown.factors.map((factor) => {
                  const isSelected = selectedFactorId === factor.id;
                  const isDeducted = factor.impact < 0;

                  return (
                    <div
                      key={factor.id}
                      onClick={() => setSelectedFactorId(isSelected ? null : factor.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-400 dark:border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/40 ring-2 ring-indigo-500/10 shadow-xs'
                          : factor.status === 'critical'
                          ? 'border-rose-200 dark:border-rose-800 bg-rose-50/30 dark:bg-rose-950/30 hover:bg-rose-50/60 dark:hover:bg-rose-950/50'
                          : isDeducted
                          ? 'border-amber-200 dark:border-amber-800 bg-amber-50/30 dark:bg-amber-950/30 hover:bg-amber-50/60 dark:hover:bg-amber-950/50'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 shrink-0">
                            {getFactorIcon(factor.id)}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                                {factor.name}
                              </span>
                              {factor.status === 'good' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Passing
                                </span>
                              ) : factor.status === 'critical' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 px-1.5 py-0.2 rounded border border-rose-200 dark:border-rose-800">
                                  <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" /> Critical
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-1.5 py-0.2 rounded border border-amber-200 dark:border-amber-800">
                                  <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Warning
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 truncate mt-0.5">{factor.details}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className={`text-xs font-mono font-bold px-2 py-1 rounded-lg border ${
                              isDeducted
                                ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                                : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            }`}
                          >
                            {factor.impact === 0 ? '0 pts' : `${factor.impact} pts`}
                          </span>
                          <ChevronRight
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              isSelected ? 'rotate-90 text-indigo-600 dark:text-indigo-400' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Expanded Factor Details & Remediation Suggestion */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700 space-y-2.5"
                        >
                          <div className="p-3 bg-white dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                              Diagnostic Finding
                            </span>
                            <p className="text-slate-800 dark:text-slate-200 font-medium">{factor.details}</p>
                          </div>

                          <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/50 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-xs flex items-center justify-between gap-3">
                            <div className="space-y-0.5">
                              <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                Recommended Remediation
                              </span>
                              <p className="text-indigo-800 dark:text-indigo-300 text-[11px] font-medium">{factor.recommendation}</p>
                            </div>

                            {onRemediateFactor && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemediateFactor(factor);
                                  onClose();
                                }}
                                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-xs shrink-0 flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                              >
                                <span>Remediate</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Score automatically updates as Git, PR, and CI/CD states change.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
