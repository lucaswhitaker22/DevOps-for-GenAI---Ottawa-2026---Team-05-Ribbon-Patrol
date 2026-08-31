import React, { useState } from 'react';
import {
  Plus,
  AlertTriangle,
  ShieldAlert,
  RefreshCw,
  Layers,
  Activity,
  Github,
  Loader2,
  ChevronDown,
  Zap,
} from 'lucide-react';
import { ScenarioPreset, LiveScanState } from '../types';
import { LIVE_REPO, LIVE_REPO_BRANCHES } from '../data/liveRepoConfig';

interface ScenarioSwitcherProps {
  scenarios: ScenarioPreset[];
  activeScenarioId: string;
  onSelectScenario: (scenario: ScenarioPreset) => void;
  onInjectRemoteCommit: () => void;
  onInjectLocalEdit: () => void;
  onInjectConflict: () => void;
  onInjectUnsafeRisk: () => void;
  onResetToClean: () => void;
  isLiveMode?: boolean;
  onToggleLiveMode?: () => void;
  onRefreshLive?: () => void;
  liveScanState?: LiveScanState;
  activeLiveBranch: string | null;
  isLiveLoading: boolean;
  onSelectLiveBranch: (branch: string) => void;
}

export const ScenarioSwitcher: React.FC<ScenarioSwitcherProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  onInjectRemoteCommit,
  onInjectLocalEdit,
  onInjectConflict,
  onInjectUnsafeRisk,
  onResetToClean,
  isLiveMode = false,
  onToggleLiveMode,
  onRefreshLive,
  liveScanState,
  activeLiveBranch,
  isLiveLoading,
  onSelectLiveBranch,
}) => {
  const [showSimMenu, setShowSimMenu] = useState(false);

  const activeScenario = scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  // Group scenarios into categories
  const gitScenarios = scenarios.filter(
    (s) => !s.id.startsWith('cicd_') && !s.id.startsWith('pr_')
  );
  const cicdScenarios = scenarios.filter((s) => s.id.startsWith('cicd_'));
  const prScenarios = scenarios.filter((s) => s.id.startsWith('pr_'));

  return (
    <div
      id="scenario-switcher-bar"
      className="w-full bg-white rounded-2xl border border-slate-200/90 p-3 shadow-xs space-y-2.5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Mode Toggle & Categorized Scenario Dropdown */}
        <div className="flex items-center gap-2.5 flex-wrap flex-1">
          {/* Mode Segmented Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => isLiveMode && onToggleLiveMode && onToggleLiveMode()}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                !isLiveMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sandbox Presets
            </button>

            <button
              id="live-workspace-mode-btn"
              onClick={() => !isLiveMode && onToggleLiveMode && onToggleLiveMode()}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLiveMode ? 'bg-emerald-600 text-white shadow-xs' : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${isLiveMode ? 'animate-pulse' : ''}`} />
              <span>Live Local Git</span>
            </button>
          </div>

          {!isLiveMode ? (
            /* Categorized Preset Selector Dropdown */
            <div className="relative flex-1 max-w-md">
              <select
                value={activeScenarioId}
                onChange={(e) => {
                  const target = scenarios.find((s) => s.id === e.target.value);
                  if (target) onSelectScenario(target);
                }}
                className="w-full text-xs font-bold rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-purple-500/20"
              >
                <optgroup label="🌱 Git Repository Scenarios">
                  {gitScenarios.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.title} ({sc.badge})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="⚡ CI/CD Pipeline Health">
                  {cicdScenarios.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.title} ({sc.badge})
                    </option>
                  ))}
                </optgroup>

                <optgroup label="🔀 Pull Request Intelligence">
                  {prScenarios.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.title} ({sc.badge})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          ) : (
            /* Live Repo Branch Selector */
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={activeLiveBranch || ''}
                onChange={(e) => e.target.value && onSelectLiveBranch(e.target.value)}
                disabled={isLiveLoading}
                className="text-xs font-semibold rounded-xl border border-emerald-300 px-3 py-1.5 bg-emerald-50 text-emerald-900 cursor-pointer"
              >
                <option value="" disabled>
                  Select branch to inspect…
                </option>
                {LIVE_REPO_BRANCHES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              {onRefreshLive && (
                <button
                  onClick={onRefreshLive}
                  disabled={liveScanState?.loading}
                  className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${liveScanState?.loading ? 'animate-spin' : ''}`} />
                  <span>Scan Repo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Anomaly Simulator Dropdown Menu */}
        {!isLiveMode && (
          <div className="relative shrink-0">
            <button
              onClick={() => setShowSimMenu(!showSimMenu)}
              className="px-3 py-1.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center gap-2 transition-all shadow-2xs cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Anomaly</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showSimMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Inject Repository Event
                </div>

                <button
                  onClick={() => {
                    onInjectRemoteCommit();
                    setShowSimMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 text-slate-700 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-3.5 h-3.5 text-amber-500" /> +1 Remote Commit
                  </span>
                </button>

                <button
                  onClick={() => {
                    onInjectLocalEdit();
                    setShowSimMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-blue-50 text-slate-700 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-3.5 h-3.5 text-blue-500" /> +1 Uncommitted Edit
                  </span>
                </button>

                <button
                  onClick={() => {
                    onInjectConflict();
                    setShowSimMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-rose-50 text-rose-700 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-500" /> Merge Conflict
                  </span>
                </button>

                <button
                  onClick={() => {
                    onInjectUnsafeRisk();
                    setShowSimMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-rose-100 text-rose-900 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Hazard State (0%)
                  </span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    onResetToClean();
                    setShowSimMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 text-emerald-800 font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600" /> Reset to Clean (100%)
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Active Preset Description Summary */}
      {!isLiveMode && activeScenario && (
        <div className="px-1 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="truncate">
            <strong className="text-slate-800">{activeScenario.title}:</strong> {activeScenario.description}
          </span>
        </div>
      )}
    </div>
  );
};

