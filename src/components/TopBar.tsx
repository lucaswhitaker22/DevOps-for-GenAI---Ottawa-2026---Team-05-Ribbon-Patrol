import React, { useState } from 'react';
import {
  GitBranch,
  Flame,
  ShieldCheck,
  ChevronDown,
  Layers,
  CheckCircle2,
  Award,
  RefreshCw,
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  Rocket,
} from 'lucide-react';
import { RepositoryState, PracticeStats, LiveScanState } from '../types';
import { calculateReleaseReadiness } from '../utils/releaseReadiness';

interface TopBarProps {
  state: RepositoryState;
  practiceStats: PracticeStats;
  onSelectBranch: (branch: string) => void;
  onToggleDrawer: () => void;
  onOpenQuickPalette?: () => void;
  onOpenPipelineDrawer?: () => void;
  onOpenPRDrawer?: () => void;
  onOpenCommitGenerator?: () => void;
  onOpenRiskModal?: () => void;
  onOpenReleaseModal?: () => void;
  isDrawerOpen: boolean;
  isLiveMode?: boolean;
  liveScanState?: LiveScanState;
  onRefreshLive?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  state,
  practiceStats,
  onSelectBranch,
  onToggleDrawer,
  onOpenQuickPalette,
  onOpenPipelineDrawer,
  onOpenPRDrawer,
  onOpenCommitGenerator,
  onOpenRiskModal,
  onOpenReleaseModal,
  isDrawerOpen,
  isLiveMode = false,
  liveScanState,
  onRefreshLive,
  isAudioMuted = false,
  onToggleAudio,
}) => {
  const readiness = calculateReleaseReadiness(state);
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const isHealthy = state.healthLevel === 'Healthy';
  const isAttention = state.healthLevel === 'Attention';
  const isBlocked = state.healthLevel === 'Blocked';
  const isUnsafe = state.healthLevel === 'Unsafe';

  return (
    <header
      id="gitpet-header"
      className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-2.5 transition-all text-slate-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left Section: Brand Logo + Repo & Branch Selector + Status */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Brand Mark */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center text-base shadow-xs ring-1 ring-pink-400/40">
              <span>🐕</span>
              <span
                className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full ring-2 ring-slate-900 ${
                  isHealthy
                    ? 'bg-emerald-400'
                    : isAttention
                    ? 'bg-amber-400'
                    : isBlocked
                    ? 'bg-orange-500'
                    : 'bg-rose-500 ring-2 ring-rose-300 animate-ping'
                }`}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white tracking-tight text-sm">GitPet</span>
                <span className="text-[11px] text-slate-400 font-mono hidden md:block">
                  {state.repoName}
                </span>
                {isLiveMode && (
                  <span
                    id="live-mode-badge"
                    className="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/80 flex items-center gap-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Workspace
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />

          {/* Branch Selector Dropdown */}
          <div className="relative">
            <button
              id="branch-selector-button"
              onClick={() => setShowBranchMenu(!showBranchMenu)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 transition-colors cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              <span className="max-w-[130px] truncate font-mono text-[11px]">{state.currentBranch.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showBranchMenu && (
              <div className="absolute left-0 top-full mt-1.5 w-56 bg-slate-900 text-slate-100 rounded-xl shadow-2xl border border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Select Active Branch
                </div>
                {state.allBranches.map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      onSelectBranch(b);
                      setShowBranchMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800 transition-colors ${
                      b === state.currentBranch.name ? 'text-indigo-400 font-bold bg-slate-800/60' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-mono text-[11px]">
                      <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                      {b}
                    </span>
                    {b === state.currentBranch.name && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Branch Sync Pill */}
          <div
            id="sync-status-pill"
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono bg-slate-800/80 border border-slate-700 text-slate-300"
          >
            <span className={state.currentBranch.aheadCount > 0 ? 'text-indigo-400 font-bold' : 'text-slate-400'}>
              ↑{state.currentBranch.aheadCount}
            </span>
            <span className="text-slate-500">/</span>
            <span className={state.currentBranch.behindCount > 0 ? 'text-amber-400 font-bold' : 'text-slate-400'}>
              ↓{state.currentBranch.behindCount}
            </span>
          </div>

          {/* Repository Health Score (Data-Driven HP) Badge Button */}
          {onOpenRiskModal && (
            <button
              id="topbar-health-score-btn"
              onClick={onOpenRiskModal}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700/80 transition-all cursor-pointer shadow-2xs"
              title="Click to view 7-Factor Repository Risk Score & Health Breakdown"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${
                state.healthPercentage >= 85
                  ? 'text-emerald-400'
                  : state.healthPercentage >= 70
                  ? 'text-amber-400'
                  : 'text-rose-400 animate-pulse'
              }`} />
              <span className="font-mono text-[11px] font-bold">HP {state.healthPercentage}%</span>
            </button>
          )}
        </div>

        {/* Right Section: Unified DevOps Hub & Quick Tools */}
        <div className="flex items-center gap-2">
          {/* AI Commit Generator Trigger */}
          {onOpenCommitGenerator && (
            <button
              id="topbar-ai-commit-btn"
              onClick={onOpenCommitGenerator}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white border border-purple-500 shadow-2xs transition-colors cursor-pointer"
              title="Open AI Conventional Commit & Release Generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span className="hidden sm:inline">AI Commit</span>
            </button>
          )}

          {/* Unified DevOps Hub Drawer Launchers */}
          <div className="flex items-center bg-slate-800/90 rounded-xl p-0.5 border border-slate-700/80">
            {onOpenPipelineDrawer && (
              <button
                id="topbar-cicd-pipeline-btn"
                onClick={onOpenPipelineDrawer}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-300 hover:bg-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="CI/CD Build & Test Health"
              >
                <span>⚡</span>
                <span className="hidden md:inline">CI/CD</span>
              </button>
            )}

            {onOpenPRDrawer && (
              <button
                id="topbar-pr-intelligence-btn"
                onClick={onOpenPRDrawer}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-purple-300 hover:bg-slate-700 flex items-center gap-1 transition-colors cursor-pointer"
                title="Pull Request Intelligence"
              >
                <span>🔀</span>
                <span>PR #{state.activePullRequest?.number || 214}</span>
              </button>
            )}

            {onOpenReleaseModal && (
              <button
                id="topbar-release-readiness-btn"
                onClick={onOpenReleaseModal}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  readiness.overallScore >= 85
                    ? 'text-emerald-300 hover:bg-slate-700'
                    : readiness.overallScore >= 70
                    ? 'text-amber-300 hover:bg-slate-700'
                    : 'text-rose-300 hover:bg-slate-700 animate-pulse'
                }`}
                title="Release Readiness Advisor: Tests, Coverage, CVEs, PRs & Freshness"
              >
                <Rocket className="w-3.5 h-3.5" />
                <span className="font-bold">{readiness.overallScore}% Ready</span>
              </button>
            )}
          </div>

          {/* Quick Palette Launcher Button */}
          {onOpenQuickPalette && (
            <button
              id="topbar-quick-palette-btn"
              onClick={onOpenQuickPalette}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <kbd className="text-[10px] font-mono font-bold bg-slate-900 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700">
                ⌘K
              </kbd>
            </button>
          )}

          {/* Audio Sound Toggle */}
          {onToggleAudio && (
            <button
              id="topbar-audio-toggle-btn"
              onClick={onToggleAudio}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
              title={isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>
          )}

          {/* Repository Drawer Toggle */}
          <button
            id="toggle-repo-drawer-button"
            onClick={onToggleDrawer}
            title="Toggle Repo Details Drawer"
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
              isDrawerOpen
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>
        </div>
      </div>
    </header>
  );
};
