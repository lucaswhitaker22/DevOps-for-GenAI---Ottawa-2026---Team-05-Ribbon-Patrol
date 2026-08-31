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
  RotateCcw,
  Sparkles,
  GitBranch,
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

  const gitScenarios = scenarios.filter(
    (s) => !s.id.startsWith('cicd_') && !s.id.startsWith('pr_')
  );
  const cicdScenarios = scenarios.filter((s) => s.id.startsWith('cicd_'));
  const prScenarios = scenarios.filter((s) => s.id.startsWith('pr_'));

  return (
    <div
      id="scenario-switcher-bar"
      className="w-full bg-white rounded-3xl border border-slate-200/90 p-4 shadow-xs space-y-3"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        {/* Left: Mode Toggle & Preset Dropdown */}
        <div className="flex items-center gap-3 flex-wrap flex-1">
          {/* Mode Segmented Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60">
            <button
              onClick={() => isLiveMode && onToggleLiveMode && onToggleLiveMode()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                !isLiveMode
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Sandbox Presets
            </button>

            <button
              id="live-workspace-mode-btn"
              onClick={() => !isLiveMode && onToggleLiveMode && onToggleLiveMode()}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                isLiveMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${isLiveMode ? 'animate-pulse' : ''}`} />
              <span>Live Local Git</span>
            </button>
          </div>

          {!isLiveMode ? (
            /* Categorized Preset Selector Dropdown */
            <div className="relative flex-1 min-w-[260px] max-w-lg">
              <select
                value={activeScenarioId}
                onChange={(e) => {
                  const target = scenarios.find((s) => s.id === e.target.value);
                  if (target) onSelectScenario(target);
                }}
                className="w-full text-xs font-bold rounded-2xl border border-slate-200 bg-slate-50/90 px-3.5 py-2.5 text-slate-900 cursor-pointer hover:bg-slate-100/80 transition-colors focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 shadow-2xs"
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
                className="text-xs font-semibold rounded-2xl border border-emerald-300 px-3.5 py-2 bg-emerald-50 text-emerald-950 cursor-pointer shadow-2xs"
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
                  className="px-3 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50 transition-colors"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${liveScanState?.loading ? 'animate-spin' : ''}`} />
                  <span>Scan Repo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right: Quick Anomaly Injectors */}
        {!isLiveMode && (
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={onInjectRemoteCommit}
              title="Inject +1 remote commit to simulate branch drift"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-amber-50 hover:text-amber-800 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              +1 Remote
            </button>

            <button
              onClick={onInjectLocalEdit}
              title="Inject +1 uncommitted working tree edit"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-blue-50 hover:text-blue-800 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              +1 Edit
            </button>

            <button
              onClick={onInjectConflict}
              title="Inject merge conflict"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-50 hover:bg-rose-50 hover:text-rose-800 text-slate-700 border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            >
              Conflict
            </button>

            <button
              onClick={onResetToClean}
              title="Reset repository to clean 100% health"
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clean</span>
            </button>
          </div>
        )}
      </div>

      {/* Active Scenario Description Banner */}
      {!isLiveMode && activeScenario && (
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-center justify-between gap-2">
          <div className="truncate">
            <span className="font-bold text-slate-900">{activeScenario.title}: </span>
            <span className="text-slate-600">{activeScenario.description}</span>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700 shrink-0">
            {activeScenario.badge}
          </span>
        </div>
      )}
    </div>
  );
};
