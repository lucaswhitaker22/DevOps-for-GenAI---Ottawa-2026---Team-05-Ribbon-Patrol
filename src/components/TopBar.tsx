import React, { useState } from 'react';
import {
  GitBranch,
  ChevronDown,
  CheckCircle2,
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  Menu,
  Home,
  FolderGit2,
  Zap,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { RepositoryState, LiveScanState, ActivePageId } from '../types';

interface TopBarProps {
  state: RepositoryState;
  activePage: ActivePageId;
  onOpenMobileSidebar?: () => void;
  onSelectBranch: (branch: string) => void;
  onOpenQuickPalette?: () => void;
  onOpenCommitGenerator?: () => void;
  isLiveMode?: boolean;
  liveScanState?: LiveScanState;
  onRefreshLive?: () => void;
  isAudioMuted?: boolean;
  onToggleAudio?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  state,
  activePage,
  onOpenMobileSidebar,
  onSelectBranch,
  onOpenQuickPalette,
  onOpenCommitGenerator,
  isLiveMode = false,
  isAudioMuted = false,
  onToggleAudio,
}) => {
  const [showBranchMenu, setShowBranchMenu] = useState(false);

  const getPageInfo = (page: ActivePageId) => {
    switch (page) {
      case 'companion':
        return { label: 'Ambient Companion', icon: <Home className="w-4 h-4 text-pink-400" /> };
      case 'repository':
        return { label: 'Repository Details & DAG Graph', icon: <FolderGit2 className="w-4 h-4 text-indigo-400" /> };
      case 'cicd':
        return { label: 'CI/CD Pipeline Telemetry', icon: <Zap className="w-4 h-4 text-amber-400" /> };
      case 'pr':
        return { label: `Pull Request Intelligence (#${state.activePullRequest?.number || 214})`, icon: <GitPullRequest className="w-4 h-4 text-purple-400" /> };
      case 'release':
        return { label: 'Release Readiness Advisor', icon: <Rocket className="w-4 h-4 text-emerald-400" /> };
      case 'risk':
        return { label: '7-Factor Risk Score & HP', icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> };
    }
  };

  const pageInfo = getPageInfo(activePage);

  return (
    <header
      id="gitpet-header"
      className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-2.5 transition-all text-slate-100 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        {/* Left Section: Mobile Sidebar Toggle + Page Title + Branch Indicator */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Mobile Sidebar Hamburger */}
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="Open Navigation Menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Active Page Header Badge */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700/80">
              {pageInfo.icon}
            </div>
            <h1 className="text-sm font-bold text-white tracking-tight hidden sm:block">
              {pageInfo.label}
            </h1>
          </div>

          <div className="h-4 w-[1px] bg-slate-800 hidden md:block" />

          {/* Branch Selector Dropdown */}
          <div className="relative">
            <button
              id="branch-selector-button"
              onClick={() => setShowBranchMenu(!showBranchMenu)}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 transition-colors cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5 text-slate-400" />
              <span className="max-w-[120px] sm:max-w-[150px] truncate font-mono text-[11px]">
                {state.currentBranch.name}
              </span>
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
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-mono bg-slate-800/80 border border-slate-700 text-slate-300 hidden sm:flex"
          >
            <span className={state.currentBranch.aheadCount > 0 ? 'text-indigo-400 font-bold flex items-center gap-0.5' : 'text-slate-400 flex items-center gap-0.5'}>
              <ArrowUp className="w-3 h-3" />
              {state.currentBranch.aheadCount}
            </span>
            <span className="text-slate-500">/</span>
            <span className={state.currentBranch.behindCount > 0 ? 'text-amber-400 font-bold flex items-center gap-0.5' : 'text-slate-400 flex items-center gap-0.5'}>
              <ArrowDown className="w-3 h-3" />
              {state.currentBranch.behindCount}
            </span>
          </div>

          {/* Live Workspace Badge */}
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

        {/* Right Section: Quick Tools (AI Commit, ⌘K, Audio) */}
        <div className="flex items-center gap-2">
          {/* AI Conventional Commit Generator Button */}
          {onOpenCommitGenerator && (
            <button
              id="topbar-ai-commit-btn"
              onClick={onOpenCommitGenerator}
              className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white border border-purple-500 shadow-2xs transition-colors cursor-pointer"
              title="Open AI Conventional Commit Generator"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              <span className="hidden sm:inline">AI Commit</span>
            </button>
          )}

          {/* Quick Command Palette Launcher */}
          {onOpenQuickPalette && (
            <button
              id="topbar-quick-palette-btn"
              onClick={onOpenQuickPalette}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Open Command Palette (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <kbd className="text-[10px] font-mono font-bold bg-slate-900 text-slate-400 px-1.5 py-0.2 rounded border border-slate-700 hidden sm:inline">
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
        </div>
      </div>
    </header>
  );
};
