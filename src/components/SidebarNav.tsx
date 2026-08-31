import React from 'react';
import {
  Home,
  FolderGit2,
  Zap,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Flame,
  Radio,
  Sparkles,
} from 'lucide-react';
import { ActivePageId, RepositoryState, PracticeStats } from '../types';
import { calculateReleaseReadiness } from '../utils/releaseReadiness';

interface SidebarNavProps {
  activePage: ActivePageId;
  onNavigate: (page: ActivePageId) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  state: RepositoryState;
  practiceStats: PracticeStats;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activePage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  state,
  practiceStats,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const readiness = calculateReleaseReadiness(state);

  const isHealthy = state.healthLevel === 'Healthy';
  const isAttention = state.healthLevel === 'Attention';
  const isBlocked = state.healthLevel === 'Blocked';

  const navItems: {
    id: ActivePageId;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'companion',
      label: 'Companion',
      description: 'Ambient AI avatar & chat',
      icon: Home,
    },
    {
      id: 'repository',
      label: 'Repo & Graph',
      description: 'DAG, diffs, stashes & audit',
      icon: FolderGit2,
      badge: state.workingTree.length > 0 ? `${state.workingTree.length}` : undefined,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'cicd',
      label: 'CI/CD Pipelines',
      description: 'Stages, tests & CVE scans',
      icon: Zap,
      badge: state.pipelineState?.buildStatus === 'failed' ? 'Failed' : undefined,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    },
    {
      id: 'pr',
      label: 'Pull Requests',
      description: `PR #${state.activePullRequest?.number || 214} review intelligence`,
      icon: GitPullRequest,
      badge: state.activePullRequest?.reviewStatus === 'changes_requested' ? 'Action' : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    },
    {
      id: 'release',
      label: 'Release Gate',
      description: '5-pillar ship readiness advisor',
      icon: Rocket,
      badge: `${readiness.overallScore}%`,
      badgeColor:
        readiness.overallScore >= 85
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          : readiness.overallScore >= 70
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          : 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
    },
    {
      id: 'risk',
      label: 'Risk & HP',
      description: '7-factor telemetry scorecard',
      icon: ShieldCheck,
      badge: `HP ${state.healthPercentage}%`,
      badgeColor:
        state.healthPercentage >= 85
          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
          : state.healthPercentage >= 70
          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
          : 'bg-rose-500/20 text-rose-300 border-rose-500/30 animate-pulse',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-18' : 'w-64'
        } ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header: Brand & Logo */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onNavigate('companion');
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-3 overflow-hidden cursor-pointer text-left group"
          >
            <div className="relative w-9 h-9 shrink-0 rounded-xl bg-pink-600 text-white flex items-center justify-center text-lg shadow-xs ring-1 ring-pink-400/40 group-hover:scale-105 transition-transform">
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
            {!isCollapsed && (
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-white tracking-tight text-base">GitPet</span>
                  <span className="text-[10px] font-mono text-pink-400 font-bold px-1.5 py-0.2 rounded bg-pink-500/10 border border-pink-500/20">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 truncate font-mono">{state.repoName}</p>
              </div>
            )}
          </button>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                title={isCollapsed ? `${item.label} (${item.description})` : undefined}
                className={`w-full text-left rounded-xl transition-all cursor-pointer flex items-center gap-3 ${
                  isCollapsed ? 'p-3 justify-center' : 'px-3 py-2.5'
                } ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />

                {!isCollapsed && (
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                    <div className="truncate">
                      <span className="text-xs font-semibold block leading-tight">{item.label}</span>
                      <span className="text-[10px] font-normal text-slate-400 truncate block leading-tight mt-0.5">
                        {item.description}
                      </span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border shrink-0 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Practice Streak & Collapse Toggle */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
          {!isCollapsed && (
            <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔥</span>
                  <span className="font-bold text-slate-200">Review Streak</span>
                </div>
                <span className="font-mono font-bold text-amber-400">
                  {practiceStats.cleanCommitStreak}x
                </span>
              </div>
            </div>
          )}

          {/* Collapse/Expand Toggle Button (Desktop) */}
          <button
            onClick={onToggleCollapse}
            className={`w-full py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-400 hover:text-slate-200 border border-slate-700/60 text-xs font-semibold flex items-center transition-colors cursor-pointer ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {!isCollapsed && <span>Collapse Sidebar</span>}
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
