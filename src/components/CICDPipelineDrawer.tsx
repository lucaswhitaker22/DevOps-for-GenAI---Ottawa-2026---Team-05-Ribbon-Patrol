import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Play,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Shield,
  Zap,
  Activity,
  Flame,
  Bug,
  Terminal,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { RepositoryState, CICDPipelineState } from '../types';

interface CICDPipelineDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  state: RepositoryState;
  onSimulatePipelineEvent?: (type: 'failed_build' | 'flaky_tests' | 'vulnerability' | 'deploy_success') => void;
}

export const CICDPipelineDrawer: React.FC<CICDPipelineDrawerProps> = ({
  isOpen,
  onClose,
  state,
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Passed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5" /> Failed
          </span>
        );
      case 'warning':
      case 'flaky':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5" /> Warning / Flaky
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <Activity className="w-3.5 h-3.5" /> {status}
          </span>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/30 flex items-center justify-center text-indigo-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold flex items-center gap-2">
                      <span>CI/CD Pipeline Companion</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-400/20">
                        {pipeline.pipelineId}
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400">Real-time build health, test flakiness & security scans</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Scroll Area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Pipeline Event Simulation Quick Action Dock */}
                {onSimulatePipelineEvent && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
                    <h3 className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Simulate CI/CD Pipeline Events</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => onSimulatePipelineEvent('failed_build')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200/80 flex items-center gap-1.5 transition-colors text-left"
                      >
                        <XCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>Failed Build 🤢</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSimulatePipelineEvent('flaky_tests')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200/80 flex items-center gap-1.5 transition-colors text-left"
                      >
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        <span>Flaky Tests 😰</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSimulatePipelineEvent('vulnerability')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/80 flex items-center gap-1.5 transition-colors text-left"
                      >
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span>Vulnerability 🛡️</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSimulatePipelineEvent('deploy_success')}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 flex items-center gap-1.5 transition-colors text-left"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Deploy Green 🎉</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Pipeline Summary Card */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Status</span>
                    {getStatusBadge(pipeline.buildStatus)}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400 font-medium">Test Pass Rate</span>
                      <div className="text-lg font-extrabold text-slate-900 font-mono flex items-center gap-1">
                        <span>{pipeline.passRate}%</span>
                        {pipeline.passRate < 100 && <span className="text-xs font-normal text-amber-600">({pipeline.testHealth})</span>}
                      </div>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="text-[11px] text-slate-400 font-medium">Deploy Target</span>
                      <div className="text-sm font-bold text-slate-800 capitalize flex items-center gap-1 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{pipeline.deployTarget}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Execution Steps Timeline */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-indigo-600" />
                    <span>Pipeline Execution Steps</span>
                  </h3>

                  <div className="space-y-2">
                    {pipeline.pipelineSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs flex flex-col gap-1.5 transition-all ${
                          step.status === 'failed'
                            ? 'bg-rose-50/60 border-rose-200'
                            : step.status === 'warning'
                            ? 'bg-amber-50/60 border-amber-200'
                            : 'bg-white border-slate-200/80'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-semibold text-slate-800">
                            {step.status === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {step.status === 'failed' && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                            {step.status === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />}
                            {step.status === 'pending' && <RotateCw className="w-4 h-4 text-slate-400 shrink-0" />}
                            <span>{step.name}</span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">{step.duration}</span>
                        </div>

                        {step.logSummary && (
                          <div className="bg-slate-900 text-slate-200 font-mono text-[11px] p-2.5 rounded-lg overflow-x-auto leading-relaxed">
                            <span className="text-rose-400 font-bold">$ </span>
                            {step.logSummary}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flaky Test Analysis */}
                {pipeline.flakyTests.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Bug className="w-4 h-4 text-amber-600" />
                      <span>Flaky Test Monitor ({pipeline.flakyTests.length})</span>
                    </h3>

                    <div className="space-y-2">
                      {pipeline.flakyTests.map((ft) => (
                        <div key={ft.id} className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1">
                          <div className="flex items-center justify-between font-semibold text-amber-900">
                            <span className="truncate">{ft.name}</span>
                            <span className="px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded font-mono font-bold">
                              {ft.failureRate}% flaky
                            </span>
                          </div>
                          <div className="text-[11px] text-amber-700 flex items-center justify-between">
                            <span>Suite: {ft.suite}</span>
                            <span className="font-mono">Commit #{ft.lastFailedCommit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Vulnerability Report */}
                {pipeline.vulnerabilities.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-rose-600" />
                      <span>Security Vulnerability Scan ({pipeline.vulnerabilities.length})</span>
                    </h3>

                    <div className="space-y-2">
                      {pipeline.vulnerabilities.map((v) => (
                        <div key={v.id} className="p-3 bg-rose-50/70 border border-rose-200 rounded-xl text-xs space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-rose-950">
                            <span className="flex items-center gap-1.5">
                              <span className="px-1.5 py-0.5 bg-rose-600 text-white text-[10px] rounded font-mono">
                                {v.cveId}
                              </span>
                              <span>{v.package}</span>
                            </span>
                            <span className="uppercase text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                              {v.severity}
                            </span>
                          </div>
                          <p className="text-slate-700 text-[11px] leading-snug">{v.title}</p>
                          <div className="text-[11px] font-mono bg-white p-2 rounded border border-rose-200/60 text-slate-800 flex items-center justify-between">
                            <span>Fix: {v.remediation}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                <span>Last updated: {pipeline.lastRunTime}</span>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
