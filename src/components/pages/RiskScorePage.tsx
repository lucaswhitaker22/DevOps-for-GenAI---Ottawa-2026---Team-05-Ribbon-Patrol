import React, { useState } from 'react';
import {
  ArrowLeft,
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
import { RepositoryState, RiskScoreBreakdown, RiskFactorItem, ActivePageId } from '../../types';
import { computeRepositoryHealth } from '../../data/mockScenarios';

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
          details: 'Working tree contains uncommitted modified files.',
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
          details: 'PR #214 waiting for peer review feedback.',
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

  const selectedFactor =
    breakdown.factors.find((f) => f.id === selectedFactorId) ||
    breakdown.factors.find((f) => f.status === 'critical') ||
    breakdown.factors.find((f) => f.status === 'warning') ||
    breakdown.factors[0];

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-500 stroke-emerald-500';
    if (score >= 70) return 'text-amber-500 stroke-amber-500';
    if (score >= 40) return 'text-orange-500 stroke-orange-500';
    return 'text-rose-500 stroke-rose-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 70) return 'bg-amber-50 text-amber-700 border-amber-200';
    if (score >= 40) return 'bg-orange-50 text-orange-700 border-orange-200';
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

  const getFactorIcon = (id: string) => {
    switch (id) {
      case 'branch_divergence':
        return <GitBranch className="w-4 h-4 text-purple-600" />;
      case 'failed_tests':
        return <Bug className="w-4 h-4 text-rose-600" />;
      case 'secrets_detected':
        return <KeyRound className="w-4 h-4 text-amber-600" />;
      case 'code_smells':
        return <FileCode className="w-4 h-4 text-blue-600" />;
      case 'vulnerabilities':
        return <Lock className="w-4 h-4 text-rose-600" />;
      case 'unreviewed_commits':
        return <Clock className="w-4 h-4 text-indigo-600" />;
      case 'large_pr_size':
      default:
        return <Layers className="w-4 h-4 text-slate-600" />;
    }
  };

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (breakdown.overallScore / 100) * circumference;

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
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  7-Factor Repository Risk Score & HP
                </h1>
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200">
                  Data-Driven Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluates branch drift, test reliability, security posture, uncommitted diffs, and PR turnaround velocity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Banner Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl border border-slate-700/60 shadow-md">
        <div className="md:col-span-4 flex items-center gap-5 justify-center md:justify-start border-b md:border-b-0 md:border-r border-slate-700 pb-4 md:pb-0 md:pr-6">
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} className="stroke-slate-800" strokeWidth="8" fill="transparent" />
              <circle
                cx="50"
                cy="50"
                r={radius}
                className={`${getScoreColor(breakdown.overallScore)} transition-all duration-700`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black tracking-tight">{breakdown.overallScore}%</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Health HP</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-400 font-medium">Risk Level</div>
            <div className="text-lg font-extrabold text-white mt-0.5">{breakdown.riskCategory}</div>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border mt-2 ${getScoreBg(breakdown.overallScore)}`}>
              {breakdown.healthLevel} Condition
            </span>
          </div>
        </div>

        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
              Repository Diagnostics
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-100">{state.symptomTitle}</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{state.symptomDescription}</p>
        </div>
      </div>

      {/* 7-Factor Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Factor List */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>7 Health Assessment Factors</span>
            <span className="text-xs text-slate-400 font-mono">Weighted Impact</span>
          </h2>

          <div className="space-y-2">
            {breakdown.factors.map((factor) => {
              const isSelected = (selectedFactorId || selectedFactor?.id) === factor.id;
              return (
                <button
                  key={factor.id}
                  onClick={() => setSelectedFactorId(factor.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-50/80 border-indigo-300 ring-2 ring-indigo-200 shadow-2xs font-semibold'
                      : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-slate-200/80 shadow-2xs">
                      {getFactorIcon(factor.id)}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{factor.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono truncate block max-w-xs sm:max-w-md">
                        {factor.details}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        factor.impact < 0 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {factor.impact === 0 ? '+0' : `${factor.impact}%`}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Factor Drilldown & Remediation Action */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs space-y-4">
          {selectedFactor ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    {getFactorIcon(selectedFactor.id)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{selectedFactor.name}</h3>
                    <span className="text-xs text-slate-400 font-mono">
                      Impact: {selectedFactor.impact}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-semibold text-slate-600 block">Factor Assessment</span>
                <p className="text-xs text-slate-800 leading-relaxed">{selectedFactor.details}</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-200/70 space-y-2">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  Remediation Guidance
                </span>
                <p className="text-xs text-indigo-950 font-medium leading-relaxed">
                  {selectedFactor.recommendation}
                </p>
              </div>

              {onRemediateFactor && (
                <button
                  onClick={() => onRemediateFactor(selectedFactor)}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-indigo-200" />
                  <span>Ask Byte for Step-by-Step Fix</span>
                </button>
              )}
            </>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <ShieldCheck className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-xs font-medium text-slate-600">Select a factor to view remediation details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
