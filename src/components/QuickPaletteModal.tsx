import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Play,
  RotateCcw,
  Layers,
  Sparkles,
  Mic,
  Volume2,
  VolumeX,
  Heart,
  GitBranch,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Radio,
  GitPullRequest,
  Rocket,
  Home,
  FolderGit2,
  Zap,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { ScenarioPreset, ActivePageId } from '../types';

export interface PaletteAction {
  id: string;
  title: string;
  description: string;
  category: 'Navigation' | 'Scenarios' | 'Repository & Safety' | 'Live Workspace' | 'Companion & Studios' | 'Audio & Petting';
  icon: React.ComponentType<{ className?: string }>;
  shortcut?: string;
  badge?: string;
  badgeColor?: string;
  keywords?: string[];
  onSelect: () => void;
}

interface QuickPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenarios: ScenarioPreset[];
  onSelectScenario: (scenario: ScenarioPreset) => void;
  onNavigate?: (page: ActivePageId) => void;
  onToggleDrawer?: () => void;
  isDrawerOpen?: boolean;
  onOpenPreviewAction?: () => void;
  hasPendingAction?: boolean;
  onRollbackLastAction?: () => void;
  hasAuditHistory?: boolean;
  isLiveMode: boolean;
  onToggleLiveMode: () => void;
  onRefreshLive?: () => void;
  onOpenPRDrawer?: () => void;
  onOpenRiskModal?: () => void;
  onOpenReleaseModal?: () => void;
  onOpenVoiceModal?: () => void;
  onOpenImageStudio?: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onPetByte: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const QuickPaletteModal: React.FC<QuickPaletteModalProps> = ({
  isOpen,
  onClose,
  scenarios,
  onSelectScenario,
  onNavigate,
  onToggleDrawer,
  isDrawerOpen,
  onOpenPreviewAction,
  hasPendingAction,
  onRollbackLastAction,
  hasAuditHistory,
  isLiveMode,
  onToggleLiveMode,
  onRefreshLive,
  onOpenPRDrawer,
  onOpenRiskModal,
  onOpenReleaseModal,
  onOpenVoiceModal,
  onOpenImageStudio,
  isAudioMuted,
  onToggleAudio,
  onPetByte,
  theme = 'light',
  onToggleTheme,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input automatically whenever palette opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Build the unified list of quick palette actions
  const allActions = useMemo(() => {
    const actions: PaletteAction[] = [];

    // 1. Navigation Actions
    if (onNavigate) {
      actions.push({
        id: 'nav_companion',
        title: 'Go to Ambient Companion (Home)',
        description: 'Pet avatar, telemetry state, and conversational repository assistant',
        category: 'Navigation',
        icon: Home,
        keywords: ['home', 'companion', 'byte', 'chat', 'stage', 'avatar'],
        onSelect: () => onNavigate('companion'),
      });

      actions.push({
        id: 'nav_repository',
        title: 'Go to Repository Details & DAG Graph',
        description: 'Interactive Git DAG commit visualizer, full diff viewer, working tree, stashes, and audit trail',
        category: 'Navigation',
        icon: FolderGit2,
        badge: 'Full Page',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        keywords: ['repo', 'graph', 'dag', 'tree', 'commits', 'stashes', 'diff', 'audit'],
        onSelect: () => onNavigate('repository'),
      });

      actions.push({
        id: 'nav_cicd',
        title: 'Go to CI/CD Build & Pipeline Telemetry',
        description: 'Pipeline execution stages, pass rates, flaky tests, and CVE security scans',
        category: 'Navigation',
        icon: Zap,
        badge: 'Full Page',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        keywords: ['cicd', 'pipeline', 'build', 'tests', 'stages', 'flaky', 'vulnerabilities'],
        onSelect: () => onNavigate('cicd'),
      });

      actions.push({
        id: 'nav_pr',
        title: 'Go to Pull Request Intelligence Hub',
        description: 'Review status, reviewer comments, conflict check, and AI changelog generation',
        category: 'Navigation',
        icon: GitPullRequest,
        badge: 'Full Page',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        keywords: ['pr', 'pull request', 'review', 'comments', 'nudge', 'reviewers', 'merge'],
        onSelect: () => onNavigate('pr'),
      });

      actions.push({
        id: 'nav_release',
        title: 'Go to Release Readiness Advisor',
        description: '5-pillar release sign-off gate across tests, coverage, security, and freshness',
        category: 'Navigation',
        icon: Rocket,
        badge: 'Full Page',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        keywords: ['release', 'readiness', 'gate', 'advisor', 'ship', 'deploy'],
        onSelect: () => onNavigate('release'),
      });

      actions.push({
        id: 'nav_risk',
        title: 'Go to 7-Factor Repository Risk Score & HP',
        description: 'Detailed breakdown of repository risk dimensions and guided AI remediation',
        category: 'Navigation',
        icon: ShieldCheck,
        badge: 'Full Page',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        keywords: ['risk', 'health', 'score', 'hp', 'factors', 'diagnostics'],
        onSelect: () => onNavigate('risk'),
      });
    }

    // 2. Repository & Safety Actions
    if (onToggleDrawer) {
      actions.push({
        id: 'toggle_drawer',
        title: isDrawerOpen ? 'Close Repository Drawer' : 'Open Repository Drawer (DAG & Tree)',
        description: 'Inspect full commit history, DAG topology, active diffs, and stashes',
        category: 'Repository & Safety',
        icon: Layers,
        shortcut: '⌘B',
        keywords: ['drawer', 'graph', 'dag', 'tree', 'commits', 'stashes', 'diff'],
        onSelect: onToggleDrawer,
      });
    }

    if (onOpenRiskModal) {
      actions.push({
        id: 'open_risk_modal',
        title: 'Inspect Repository Risk Score & Health Breakdown',
        description: 'View 7 data-driven risk dimensions (Branch divergence, failed tests, secrets, CVEs, smells)',
        category: 'Repository & Safety',
        icon: ShieldAlert,
        badge: 'Risk Engine',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        keywords: ['risk', 'health', 'score', 'hp', 'factors', 'tests', 'secrets', 'vulnerabilities', 'debt'],
        onSelect: onOpenRiskModal,
      });
    }

    if (onOpenPRDrawer) {
      actions.push({
        id: 'open_pr_drawer',
        title: 'Open Pull Request Intelligence Hub',
        description: 'Inspect review status, requested reviewers, inline comments, changelog, and mergeability',
        category: 'Repository & Safety',
        icon: GitPullRequest,
        badge: 'PR Intelligence',
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
        keywords: ['pr', 'pull request', 'review', 'comments', 'nudge', 'reviewers', 'merge', 'conflict', 'changelog'],
        onSelect: onOpenPRDrawer,
      });
    }

    if (onOpenReleaseModal) {
      actions.push({
        id: 'open_release_advisor',
        title: 'Evaluate Release Readiness Advisor (5-Pillar Sign-off)',
        description: 'AI evaluation of Tests Passing, Coverage %, Vulnerability Count, PR Approvals, and Branch Freshness',
        category: 'Repository & Safety',
        icon: Rocket,
        badge: 'Release Gate',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        keywords: ['release', 'readiness', 'ship', 'deploy', 'coverage', 'tests', 'cve', 'vulnerabilities', 'pr', 'freshness', 'gate', 'advisor'],
        onSelect: onOpenReleaseModal,
      });
    }

    if (hasPendingAction && onOpenPreviewAction) {
      actions.push({
        id: 'preview_action',
        title: 'Preview Pending Recommended Action',
        description: 'Inspect file diffs and command details before confirming',
        category: 'Repository & Safety',
        icon: Sparkles,
        badge: 'Action Pending',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
        keywords: ['preview', 'diff', 'action', 'confirm', 'recommended'],
        onSelect: onOpenPreviewAction,
      });
    }

    if (hasAuditHistory && onRollbackLastAction) {
      actions.push({
        id: 'rollback_last',
        title: 'Rollback Last Executed Action',
        description: 'Revert working tree and references to prior state',
        category: 'Repository & Safety',
        icon: RotateCcw,
        badge: 'Undo',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
        keywords: ['rollback', 'undo', 'revert', 'history'],
        onSelect: onRollbackLastAction,
      });
    }

    // 3. Live Workspace Scanner Actions
    actions.push({
      id: 'toggle_live_mode',
      title: isLiveMode ? 'Switch to Sandbox Presets' : 'Switch to Live Workspace Scanner',
      description: isLiveMode
        ? 'Return to simulated repository anomalies for safe testing'
        : 'Connect directly to your local Git work tree for real-time inspection',
      category: 'Live Workspace',
      icon: isLiveMode ? Layers : Radio,
      badge: isLiveMode ? 'Sandbox' : 'Live Git',
      badgeColor: isLiveMode
        ? 'bg-slate-100 text-slate-700 border-slate-200'
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      keywords: ['live', 'workspace', 'local', 'scanner', 'sandbox', 'real'],
      onSelect: onToggleLiveMode,
    });

    if (isLiveMode && onRefreshLive) {
      actions.push({
        id: 'refresh_live_status',
        title: 'Scan Live Workspace Now',
        description: 'Re-run local Git status, branch, ahead/behind, and dirty file inspection',
        category: 'Live Workspace',
        icon: RefreshCw,
        keywords: ['scan', 'refresh', 'status', 'live', 'git'],
        onSelect: onRefreshLive,
      });
    }

    // 4. Scenarios
    scenarios.forEach((sc) => {
      let icon = GitBranch;
      if (sc.state.healthLevel === 'Unsafe') icon = ShieldAlert;
      else if (sc.state.healthLevel === 'Blocked') icon = AlertTriangle;
      else if (sc.state.healthLevel === 'Healthy') icon = CheckCircle2;

      actions.push({
        id: `scenario_${sc.id}`,
        title: `Load Scenario: ${sc.title}`,
        description: sc.description,
        category: 'Scenarios',
        icon,
        badge: sc.state.healthLevel,
        badgeColor:
          sc.state.healthLevel === 'Healthy'
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : sc.state.healthLevel === 'Attention'
            ? 'bg-amber-50 text-amber-700 border-amber-200'
            : sc.state.healthLevel === 'Blocked'
            ? 'bg-rose-50 text-rose-700 border-rose-200'
            : 'bg-rose-100 text-rose-800 border-rose-300',
        keywords: ['scenario', sc.title.toLowerCase(), sc.state.primarySymptom, sc.id],
        onSelect: () => onSelectScenario(sc),
      });
    });

    // 5. Companion & Studios
    if (onOpenVoiceModal) {
      actions.push({
        id: 'studio_voice',
        title: 'Talk to Byte (Live Voice Preview)',
        description: 'Open real-time conversational voice assistant with audio streaming',
        category: 'Companion & Studios',
        icon: Mic,
        badge: 'Live Voice',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        keywords: ['voice', 'speech', 'audio', 'talk', 'mic', 'gemini live'],
        onSelect: onOpenVoiceModal,
      });
    }

    if (onOpenImageStudio) {
      actions.push({
        id: 'studio_avatar',
        title: 'Custom Mascot Avatar Studio',
        description: 'Generate and edit custom mascot skins with Gemini Imagen',
        category: 'Companion & Studios',
        icon: Sparkles,
        keywords: ['avatar', 'image', 'skin', 'mascot', 'studio', 'imagen'],
        onSelect: onOpenImageStudio,
      });
    }


    // 6. Audio & Petting
    actions.push({
      id: 'audio_toggle',
      title: isAudioMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects',
      description: isAudioMuted
        ? 'Enable Web Audio synthesized companion sound effects'
        : 'Mute all companion chimes and alerts for quiet environments',
      category: 'Audio & Petting',
      icon: isAudioMuted ? VolumeX : Volume2,
      badge: isAudioMuted ? 'Muted' : 'Sound On',
      badgeColor: isAudioMuted ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      keywords: ['sound', 'audio', 'mute', 'unmute', 'volume', 'chime'],
      onSelect: onToggleAudio,
    });

    if (onToggleTheme) {
      actions.push({
        id: 'theme_toggle',
        title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        description: theme === 'dark'
          ? 'Switch to clean, bright daylight workspace theme'
          : 'Switch to high-contrast dark mode for low-light focus',
        category: 'Audio & Petting',
        icon: theme === 'dark' ? Sun : Moon,
        badge: theme === 'dark' ? 'Dark' : 'Light',
        badgeColor: theme === 'dark' ? 'bg-amber-950/40 text-amber-300 border-amber-700/50' : 'bg-indigo-50 text-indigo-700 border-indigo-200',
        keywords: ['dark', 'light', 'theme', 'mode', 'color', 'night', 'sun', 'moon', 'toggle'],
        onSelect: onToggleTheme,
      });
    }

    actions.push({
      id: 'pet_mascot',
      title: 'Pet Byte Mascot',
      description: 'Give Byte some love and trigger ambient reaction hearts',
      category: 'Audio & Petting',
      icon: Heart,
      shortcut: 'Space',
      keywords: ['pet', 'heart', 'purr', 'mascot', 'dog', 'byte', 'pat'],
      onSelect: onPetByte,
    });

    return actions;
  }, [
    scenarios,
    isDrawerOpen,
    hasPendingAction,
    hasAuditHistory,
    isLiveMode,
    isAudioMuted,
    onToggleDrawer,
    onOpenPreviewAction,
    onRollbackLastAction,
    onToggleLiveMode,
    onRefreshLive,
    onSelectScenario,
    onOpenVoiceModal,
    onOpenImageStudio,
    onToggleAudio,
    onPetByte,
  ]);

  // Filter actions based on query
  const filteredActions = useMemo(() => {
    if (!query.trim()) return allActions;
    const lowerQuery = query.toLowerCase().trim();
    return allActions.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(lowerQuery);
      const matchDesc = item.description.toLowerCase().includes(lowerQuery);
      const matchCategory = item.category.toLowerCase().includes(lowerQuery);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(lowerQuery));
      return matchTitle || matchDesc || matchCategory || matchKeywords;
    });
  }, [allActions, query]);

  // Keep selected index within bounds
  useEffect(() => {
    if (selectedIndex >= filteredActions.length) {
      setSelectedIndex(Math.max(0, filteredActions.length - 1));
    }
  }, [filteredActions.length, selectedIndex]);

  // Keyboard navigation within the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredActions[selectedIndex];
      if (selected) {
        onClose();
        selected.onSelect();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelectAction = (action: PaletteAction) => {
    onClose();
    action.onSelect();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="quick-palette-backdrop"
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-2xs"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Quick Command Palette"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/90">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              id="quick-palette-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or search actions (e.g., conflict, drawer, live workspace)..."
              className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none font-medium"
              autoComplete="off"
              spellCheck="false"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                className="text-xs text-slate-400 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800"
              >
                Clear
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shadow-2xs">
              ESC
            </kbd>
          </div>

          {/* Action List */}
          <div
            ref={listRef}
            className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100/60 dark:divide-slate-800/60"
            style={{ maxHeight: 'calc(80vh - 110px)' }}
          >
            {filteredActions.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40 text-slate-400" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No actions matching "{query}"</p>
                <p className="text-xs text-slate-400 mt-1">
                  Try searching for "conflict", "drawer", "live workspace", or "clean"
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                {filteredActions.map((action, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleSelectAction(action)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/60 text-indigo-950 dark:text-indigo-200 ring-1 ring-indigo-300/70 dark:ring-indigo-700/60 shadow-2xs'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs sm:text-sm font-semibold truncate leading-tight">
                              {action.title}
                            </span>
                            {action.badge && (
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded border leading-none ${
                                  action.badgeColor || 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                {action.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5 leading-tight">
                            {action.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {action.shortcut && (
                          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-2xs">
                            {action.shortcut}
                          </kbd>
                        )}
                        {isSelected && <ArrowRight className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Shortcuts Hint */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  ↑
                </kbd>
                <kbd className="px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  ↓
                </kbd>
                <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  ↵
                </kbd>
                <span>to select</span>
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <kbd className="px-1.5 py-0.2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[10px] font-mono text-slate-600 dark:text-slate-300">
                  ESC
                </kbd>
                <span>to close</span>
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-400">
              {filteredActions.length} action{filteredActions.length === 1 ? '' : 's'}
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
