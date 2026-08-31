import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { TopBar } from './components/TopBar';
import { SidebarNav } from './components/SidebarNav';
import { PetStage } from './components/PetStage';
import { ChatStream } from './components/ChatStream';
import { ScenarioSwitcher } from './components/ScenarioSwitcher';
import { AICommitGeneratorModal } from './components/AICommitGeneratorModal';
import { PreviewChangesModal } from './components/PreviewChangesModal';
import { QuickPaletteModal } from './components/QuickPaletteModal';
import { RepositoryPage } from './components/pages/RepositoryPage';
import { CICDPage } from './components/pages/CICDPage';
import { PRIntelligencePage } from './components/pages/PRIntelligencePage';
import { ReleaseReadinessPage } from './components/pages/ReleaseReadinessPage';
import { RiskScorePage } from './components/pages/RiskScorePage';
import {
  isAudioMuted,
  toggleAudioMuted,
  subscribeAudioMute,
  playSyncSuccessSound,
  playConflictAlertSound,
  playPetChirpSound,
} from './utils/audioEffects';
import {
  MVP_SCENARIO,
  ALL_SCENARIOS,
  INITIAL_PRACTICE_STATS,
  computeRepositoryHealth,
  CLEAN_HEALTHY_SCENARIO,
  CONFLICT_SCENARIO,
  UNSAFE_LOSS_RISK_SCENARIO,
  FAILED_BUILD_SCENARIO,
  FLAKY_TESTS_SCENARIO,
  VULNERABILITY_SCENARIO,
  DEPLOYMENT_SUCCESS_SCENARIO,
  PR_CHANGES_REQUESTED_SCENARIO,
  PR_PENDING_REVIEW_SCENARIO,
  PR_CONFLICTED_SCENARIO,
  PR_APPROVED_READY_SCENARIO,
  LOST_MAP_SCENARIO,
  SMOKE_CLOUD_SCENARIO,
  SHIELD_CRACKED_SCENARIO,
} from './data/mockScenarios';
import {
  RepositoryState,
  ChatMessage,
  RecommendedAction,
  PracticeStats,
  ScenarioPreset,
  FileChange,
  ChatRole,
  ModelTier,
  ChatHistoryEntry,
  LiveScanState,
  RiskFactorItem,
  ActivePageId,
} from './types';

export default function App() {
  const getInitialPage = (): ActivePageId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['companion', 'repository', 'cicd', 'pr', 'release', 'risk'].includes(hash)) {
        return hash as ActivePageId;
      }
    }
    return 'companion';
  };

  const [activePage, setActivePage] = useState<ActivePageId>(getInitialPage);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [activeScenarioId, setActiveScenarioId] = useState<string>(MVP_SCENARIO.id);
  const [repoState, setRepoState] = useState<RepositoryState>(MVP_SCENARIO.state);
  const [practiceStats, setPracticeStats] = useState<PracticeStats>(INITIAL_PRACTICE_STATS);
  const [isCommitModalOpen, setIsCommitModalOpen] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<ChatRole>('byte_mascot');
  const [selectedTier, setSelectedTier] = useState<ModelTier>('general');

  // Live Workspace Scanner State
  const [isLiveMode, setIsLiveMode] = useState<boolean>(false);
  const [liveScanState, setLiveScanState] = useState<LiveScanState>({ loading: false });
  const [activeLiveBranch, setActiveLiveBranch] = useState<string | null>(null);
  const [cachedSandboxState, setCachedSandboxState] = useState<RepositoryState>(MVP_SCENARIO.state);

  const [previewAction, setPreviewAction] = useState<RecommendedAction | null>(null);
  const [executingActionId, setExecutingActionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Quick Palette & Audio State
  const [isQuickPaletteOpen, setIsQuickPaletteOpen] = useState<boolean>(false);
  const [isAudioMutedState, setIsAudioMutedState] = useState<boolean>(() => isAudioMuted());
  const [petTriggerTimestamp, setPetTriggerTimestamp] = useState<number>(0);

  // Subscribe to audio mute changes
  useEffect(() => {
    const unsubscribe = subscribeAudioMute((muted) => {
      setIsAudioMutedState(muted);
    });
    return unsubscribe;
  }, []);

  const handleNavigate = (page: ActivePageId) => {
    setActivePage(page);
    if (typeof window !== 'undefined') {
      window.location.hash = `#${page}`;
    }
  };

  // Sync state with URL hash navigation (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['companion', 'repository', 'cicd', 'pr', 'release', 'risk'].includes(hash)) {
        setActivePage(hash as ActivePageId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Alert sound when transitioning into Unsafe or Blocked states
  const prevHealthLevelRef = useRef<string>(repoState.healthLevel);
  useEffect(() => {
    if (
      (repoState.healthLevel === 'Unsafe' || repoState.healthLevel === 'Blocked') &&
      prevHealthLevelRef.current !== 'Unsafe' &&
      prevHealthLevelRef.current !== 'Blocked'
    ) {
      playConflictAlertSound();
    }
    prevHealthLevelRef.current = repoState.healthLevel;
  }, [repoState.healthLevel]);

  const handlePetByte = () => {
    setPetTriggerTimestamp(Date.now());
    playPetChirpSound();
  };

  const handleToggleAudio = () => {
    const next = toggleAudioMuted();
    setIsAudioMutedState(next);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const isMac = typeof navigator !== 'undefined' && navigator.platform?.toUpperCase().includes('MAC');
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      const activeEl = document.activeElement;
      const isEditable =
        activeEl instanceof HTMLInputElement ||
        activeEl instanceof HTMLTextAreaElement ||
        activeEl instanceof HTMLSelectElement ||
        activeEl?.getAttribute('contenteditable') === 'true' ||
        e.isComposing;

      // 1. Cmd+K / Ctrl+K -> Toggle Quick Palette
      if (isCmdOrCtrl && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsQuickPaletteOpen((prev) => !prev);
        return;
      }

      // 2. Cmd+B / Ctrl+B -> Toggle Repository Page
      if (isCmdOrCtrl && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        handleNavigate(activePage === 'repository' ? 'companion' : 'repository');
        return;
      }

      // 3. Escape key -> Strict layered close hierarchy
      if (e.key === 'Escape') {
        // Layer 1: Confirmation / Preview Modal
        if (previewAction) {
          e.preventDefault();
          setPreviewAction(null);
          return;
        }
        // Layer 2: Quick Palette
        if (isQuickPaletteOpen) {
          e.preventDefault();
          setIsQuickPaletteOpen(false);
          return;
        }
        // Layer 3: Commit Generator Modal
        if (isCommitModalOpen) {
          e.preventDefault();
          setIsCommitModalOpen(false);
          return;
        }
        return;
      }

      // 4. Space bar -> Pet Mascot (ONLY when NOT in an editable field or active modal)
      if (e.code === 'Space' || e.key === ' ') {
        if (
          !isEditable &&
          !isQuickPaletteOpen &&
          !previewAction
        ) {
          e.preventDefault();
          handlePetByte();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [
    activePage,
    previewAction,
    isQuickPaletteOpen,
    isCommitModalOpen,
  ]);

  const [auditHistory, setAuditHistory] = useState<
    { id: string; command: string; timestamp: string; description: string }[]
  >([]);

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_msg',
      sender: 'assistant',
      role: 'byte_mascot',
      modelUsed: 'gemini-3.5-flash',
      timestamp: 'Just now',
      text: `Hello! I'm **Byte**, your ambient repository companion.\n\nI monitor your repository's branch drift, uncommitted working tree diffs, and work-loss hazards in real-time.\n\nAsk me for a status report or test any scenario!`,
      evidenceSummary: {
        symptom: MVP_SCENARIO.state.symptomTitle,
        healthLevel: MVP_SCENARIO.state.healthLevel,
        evidencePoints: [
          `Branch: ${MVP_SCENARIO.state.currentBranch.name}`,
          `Behind: ${MVP_SCENARIO.state.currentBranch.behindCount} commits | Ahead: ${MVP_SCENARIO.state.currentBranch.aheadCount}`,
          `Uncommitted files: ${MVP_SCENARIO.state.workingTree.length}`,
        ],
      },
    },
  ]);

  // Handler for sending messages to Gemini API backend (/api/ai/chat)
  const handleSendMessage = async (
    userPrompt: string,
    roleOverride?: ChatRole,
    tierOverride?: ModelTier
  ) => {
    const activeRole = roleOverride || selectedRole;
    const activeTier = tierOverride || selectedTier;

    const userMsg: ChatMessage = {
      id: `msg_user_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userPrompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Build multi-turn history for the chat API
    const history: ChatHistoryEntry[] = messages
      .slice(-6)
      .map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }],
      }));

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userPrompt,
          role: activeRole,
          modelTier: activeTier,
          history,
          state: repoState,
        }),
      });

      const data = await res.json();

      if (data.success && data.reply) {
        let recAction: RecommendedAction | undefined = undefined;
        if (repoState.healthLevel !== 'Healthy' && !data.reply.includes('```')) {
          recAction = messages[0]?.recommendedAction;
        }

        const assistantMsg: ChatMessage = {
          id: `msg_asst_${Date.now()}`,
          sender: 'assistant',
          role: activeRole,
          modelUsed: data.modelUsed,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: data.reply,
          evidenceSummary: {
            symptom: repoState.symptomTitle,
            healthLevel: repoState.healthLevel,
            evidencePoints: [
              `Branch: ${repoState.currentBranch.name}`,
              `Ahead: ${repoState.currentBranch.aheadCount} | Behind: ${repoState.currentBranch.behindCount}`,
              `Uncommitted files: ${repoState.workingTree.length}`,
            ],
          },
          recommendedAction: recAction,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } else {
        const analyzeRes = await fetch('/api/gitpet/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            state: repoState,
            userMessage: userPrompt,
          }),
        });
        const analyzeData = await analyzeRes.json();

        if (analyzeData.success) {
          const fallbackAsstMsg: ChatMessage = {
            id: `msg_asst_${Date.now()}`,
            sender: 'assistant',
            role: activeRole,
            modelUsed: 'gemini-3.5-flash',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: analyzeData.explanation,
            evidenceSummary: {
              symptom: repoState.symptomTitle,
              healthLevel: repoState.healthLevel,
              evidencePoints: analyzeData.evidencePoints || [],
            },
            recommendedAction: analyzeData.recommendedAction,
          };
          setMessages((prev) => [...prev, fallbackAsstMsg]);
        }
      }
    } catch (err) {
      console.warn('API call error, using clean fallback response:', err);
      const fallbackMsg: ChatMessage = {
        id: `msg_asst_${Date.now()}`,
        sender: 'assistant',
        role: activeRole,
        modelUsed: 'gemini-3.5-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Based on current repository signals, branch **${repoState.currentBranch.name}** has ${repoState.currentBranch.behindCount} commits behind upstream with ${repoState.workingTree.length} uncommitted files.\n\nRecommended: Run \`git stash push -m "gitpet: save"\` before pulling.`,
        evidenceSummary: {
          symptom: repoState.symptomTitle,
          healthLevel: repoState.healthLevel,
          evidencePoints: [
            `Branch: ${repoState.currentBranch.name}`,
            `Behind: ${repoState.currentBranch.behindCount} commits`,
            `Working tree: ${repoState.workingTree.length} files`,
          ],
        },
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for executing the approved safe action
  const handleExecuteAction = (action: RecommendedAction) => {
    setPreviewAction(null);
    setExecutingActionId(action.id);

    setTimeout(() => {
      const previousHealth = repoState.healthPercentage;

      let updatedWorkingTree = [...repoState.workingTree];
      let updatedBehind = repoState.currentBranch.behindCount;
      let updatedAhead = repoState.currentBranch.aheadCount;
      let updatedStashes = [...repoState.stashes];
      let updatedRemoteBehind = [...repoState.remoteCommitsBehind];

      if (action.title.includes('Stash') || action.title.includes('Pull') || action.title.includes('Preserve') || action.command.includes('pre-sync')) {
        updatedBehind = 0;
        updatedRemoteBehind = [];
        if (updatedWorkingTree.length > 0) {
          updatedStashes = [
            {
              id: `stash_${Date.now()}`,
              index: updatedStashes.length,
              message: 'gitpet: emergency safety backup before sync',
              timestamp: 'Just now',
              fileCount: updatedWorkingTree.length,
              files: updatedWorkingTree.map((f) => f.path),
            },
            ...updatedStashes,
          ];
          updatedWorkingTree = [];
        }
      }

      if (action.title.includes('Conflict') || action.title.includes('Rebase')) {
        updatedWorkingTree = updatedWorkingTree.filter((f) => f.status !== 'conflicted');
      }

      if (action.title.includes('Push')) {
        updatedAhead = 0;
      }

      if (action.title.includes('Anchor') || action.title.includes('switch -c')) {
        repoState.currentBranch.isDetached = false;
        repoState.currentBranch.name = 'feat/cart-worker';
      }

      const nextBaseState: RepositoryState = {
        ...repoState,
        currentBranch: {
          ...repoState.currentBranch,
          behindCount: updatedBehind,
          aheadCount: updatedAhead,
          isDetached: false,
          isStale: false,
        },
        workingTree: updatedWorkingTree,
        remoteCommitsBehind: updatedRemoteBehind,
        stashes: updatedStashes,
        destructiveRiskWarning: undefined,
        lossRiskSummary: undefined,
      };

      const healthCalc = computeRepositoryHealth(nextBaseState);

      const finalState: RepositoryState = {
        ...nextBaseState,
        ...healthCalc,
      };

      setRepoState(finalState);
      setExecutingActionId(null);

      // Trigger celebration confetti and sync success chime
      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#10B981', '#3B82F6', '#6366F1', '#F59E0B'],
        });
      } catch (_) { }

      // Play warm ascending sync success chime
      playSyncSuccessSound();

      // Update practice stats
      setPracticeStats((prev) => ({
        ...prev,
        cleanCommitStreak: prev.cleanCommitStreak + 1,
        verifiedSyncs: prev.verifiedSyncs + 1,
        stewardshipScore: Math.min(100, prev.stewardshipScore + 2),
      }));

      // Record in audit history
      setAuditHistory((prev) => [
        {
          id: `audit_${Date.now()}`,
          command: action.command,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          description: action.title,
        },
        ...prev,
      ]);

      // Update the chat message status
      setMessages((prev) =>
        prev.map((m) =>
          m.recommendedAction?.id === action.id
            ? {
              ...m,
              executed: true,
              executionResult: {
                success: true,
                message: 'Action completed successfully! Repository state verified and clean.',
                previousHealth,
                newHealth: finalState.healthPercentage,
              },
            }
            : m
        )
      );
    }, 1200);
  };

  // Rollback last action
  const handleRollbackLastAction = () => {
    if (auditHistory.length === 0) return;
    const last = auditHistory[0];
    setAuditHistory((prev) => prev.slice(1));

    setRepoState(MVP_SCENARIO.state);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg_rollback_${Date.now()}`,
        sender: 'system',
        timestamp: 'Just now',
        text: `Rolled back: ${last.description}. Repository restored to previous state.`,
      },
    ]);
  };

  // Live Workspace Status Scanner
  const handleFetchLiveStatus = async (isInitialSwitch = false) => {
    setLiveScanState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('/api/git/live-status');
      const data = await res.json();
      if (data.repositoryUnavailable) {
        setLiveScanState({
          loading: false,
          unavailable: true,
          error: 'Current workspace is not a Git repository.',
          lastRefreshed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `msg_live_unavail_${Date.now()}`,
            sender: 'assistant',
            role: selectedRole,
            modelUsed: 'gemini-3.5-flash',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: `⚠️ **Workspace Unavailable**: The active folder is not inside a Git work tree. You can initialize one with \`git init\` or switch back to **Sandbox Presets** to test scenarios.`,
          },
        ]);
      } else if (data.success && data.state) {
        setRepoState(data.state);
        setActiveLiveBranch(data.state.currentBranch.name);
        setLiveScanState({
          loading: false,
          unavailable: false,
          error: null,
          lastRefreshed: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });

        if (isInitialSwitch) {
          const liveState = data.state as RepositoryState;
          const branch = liveState.currentBranch;
          const dirtyCount = liveState.workingTree.length;
          let summaryText = `🟢 **Live Workspace Connected**: Active branch is **${branch.name}**`;
          if (branch.upstream) {
            summaryText += ` tracking **${branch.upstream}** (${branch.aheadCount} ahead / ${branch.behindCount} behind).`;
          } else {
            summaryText += ` (no upstream configured).`;
          }
          if (dirtyCount > 0) {
            summaryText += `\n\nFound **${dirtyCount} uncommitted file(s)** in working tree.`;
          } else {
            summaryText += `\n\nWorking tree is completely clean!`;
          }

          setMessages((prev) => [
            ...prev,
            {
              id: `live_switch_${Date.now()}`,
              sender: 'assistant',
              role: selectedRole,
              modelUsed: 'gemini-3.5-flash',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              text: summaryText,
              evidenceSummary: {
                symptom: liveState.symptomTitle,
                healthLevel: liveState.healthLevel,
                evidencePoints: [
                  `Branch: ${branch.name}`,
                  branch.upstream ? `Tracking: ${branch.upstream} (↑${branch.aheadCount} / ↓${branch.behindCount})` : 'Upstream: None configured',
                  `Uncommitted files: ${dirtyCount}`,
                ],
              },
            },
          ]);
        }
      } else {
        setLiveScanState((prev) => ({
          ...prev,
          loading: false,
          error: data.error || 'Failed to scan live workspace',
        }));
      }
    } catch (err: any) {
      setLiveScanState((prev) => ({
        ...prev,
        loading: false,
        error: err?.message || 'Network error scanning live workspace',
      }));
    }
  };

  const handleToggleLiveMode = () => {
    if (!isLiveMode) {
      setCachedSandboxState(repoState);
      setIsLiveMode(true);
      handleFetchLiveStatus(true);
    } else {
      setIsLiveMode(false);
      setRepoState(cachedSandboxState);
      setMessages((prev) => [
        ...prev,
        {
          id: `sandbox_switch_${Date.now()}`,
          sender: 'assistant',
          role: selectedRole,
          modelUsed: 'gemini-3.5-flash',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: `📦 **Switched back to Sandbox Mode**.\n\nRestored previous scenario preset. You can continue simulating anomalies and test safe actions risk-free.`,
        },
      ]);
    }
  };

  const handleSelectLiveBranch = (branch: string) => {
    setActiveLiveBranch(branch);
  };

  // Scenario selection
  const handleSelectScenario = (scenario: ScenarioPreset) => {
    if (isLiveMode) {
      setIsLiveMode(false);
    }
    setActiveScenarioId(scenario.id);
    setRepoState(scenario.state);

    setMessages((prev) => [
      ...prev,
      {
        id: `scenario_switch_${Date.now()}`,
        sender: 'assistant',
        role: selectedRole,
        modelUsed: 'gemini-3.5-flash',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Loaded scenario: **${scenario.title}**.\n\n${scenario.description}`,
        evidenceSummary: {
          symptom: scenario.state.symptomTitle,
          healthLevel: scenario.state.healthLevel,
          evidencePoints: [
            scenario.state.symptomDescription,
            `Primary Symptom: ${scenario.state.primarySymptom}`,
            `Health Score: ${scenario.state.healthPercentage}%`,
          ],
        },
      },
    ]);

    setTimeout(() => {
      handleSendMessage(scenario.samplePrompt, selectedRole, selectedTier);
    }, 300);
  };

  // Sandbox Anomaly Injectors
  const handleInjectRemoteCommit = () => {
    const newCommit = {
      hash: `c_${Date.now()}`,
      shortHash: Math.random().toString(36).substring(2, 9),
      message: 'chore(deps): bump tailwind & ui tokens',
      author: 'Alex Rivera <alex@acme.dev>',
      timestamp: 'Just now',
      isRemote: true,
    };

    const nextState: RepositoryState = {
      ...repoState,
      currentBranch: {
        ...repoState.currentBranch,
        behindCount: repoState.currentBranch.behindCount + 1,
      },
      remoteCommitsBehind: [newCommit, ...repoState.remoteCommitsBehind],
    };

    const health = computeRepositoryHealth(nextState);
    setRepoState({ ...nextState, ...health });
  };

  const handleInjectLocalEdit = () => {
    const newFile: FileChange = {
      path: `src/utils/cartHelper_${Date.now().toString().slice(-4)}.ts`,
      status: 'modified',
      additions: 10,
      deletions: 2,
      diffSnippet: `+// Draft helper function\n+export function validateCart() { return true; }`,
    };

    const nextState: RepositoryState = {
      ...repoState,
      workingTree: [newFile, ...repoState.workingTree],
    };

    const health = computeRepositoryHealth(nextState);
    setRepoState({ ...nextState, ...health });
  };

  const handleInjectConflict = () => {
    setRepoState(CONFLICT_SCENARIO.state);
    setActiveScenarioId(CONFLICT_SCENARIO.id);
    handleSendMessage('Conflict alert! What files are blocking the rebase?', selectedRole, selectedTier);
  };

  const handleInjectUnsafeRisk = () => {
    setRepoState(UNSAFE_LOSS_RISK_SCENARIO.state);
    setActiveScenarioId(UNSAFE_LOSS_RISK_SCENARIO.id);
    handleSendMessage(
      'EMERGENCY: What is the work-loss risk and how do I preserve my work safely?',
      selectedRole,
      selectedTier
    );
  };

  const handleResetToClean = () => {
    setRepoState(CLEAN_HEALTHY_SCENARIO.state);
    setActiveScenarioId(CLEAN_HEALTHY_SCENARIO.id);
  };

  const handleSimulatePipelineEvent = (
    type: 'failed_build' | 'flaky_tests' | 'vulnerability' | 'deploy_success' | 'lost_map' | 'smoke_cloud' | 'shield_cracked'
  ) => {
    let preset: ScenarioPreset;
    switch (type) {
      case 'failed_build':
        preset = FAILED_BUILD_SCENARIO;
        break;
      case 'flaky_tests':
        preset = FLAKY_TESTS_SCENARIO;
        break;
      case 'vulnerability':
        preset = VULNERABILITY_SCENARIO;
        break;
      case 'deploy_success':
        preset = DEPLOYMENT_SUCCESS_SCENARIO;
        if (typeof confetti === 'function') {
          confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
        break;
      case 'lost_map':
        preset = LOST_MAP_SCENARIO;
        break;
      case 'smoke_cloud':
        preset = SMOKE_CLOUD_SCENARIO;
        break;
      case 'shield_cracked':
        preset = SHIELD_CRACKED_SCENARIO;
        break;
    }
    handleSelectScenario(preset);
  };

  const handleExecutePRAction = (actionType: 'nudge' | 'rebase' | 'changelog' | 'resolve_conflicts') => {
    if (actionType === 'nudge') {
      handleSendMessage('Please send a friendly reminder to review PR #' + (repoState.activePullRequest?.number || 214), selectedRole, selectedTier);
    } else if (actionType === 'rebase') {
      handleSendMessage('How do I rebase branch ' + repoState.currentBranch.name + ' onto main cleanly?', selectedRole, selectedTier);
    } else if (actionType === 'changelog') {
      handleSendMessage('Generate a formatted commit changelog and summary for PR #' + (repoState.activePullRequest?.number || 214), selectedRole, selectedTier);
    } else if (actionType === 'resolve_conflicts') {
      handleSendMessage('Guide me through resolving merge conflicts on PR #' + (repoState.activePullRequest?.number || 214), selectedRole, selectedTier);
    }
  };

  return (
    <div
      id="gitpet-app-root"
      className="min-h-screen bg-[#F8FAFC] text-slate-900 flex font-sans antialiased selection:bg-slate-200 selection:text-slate-900"
    >
      {/* Collapsible Sidebar Navigation */}
      <SidebarNav
        activePage={activePage}
        onNavigate={handleNavigate}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        state={repoState}
        practiceStats={practiceStats}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-18' : 'lg:pl-64'
        }`}
      >
        {/* Streamlined Top Bar */}
        <TopBar
          state={repoState}
          activePage={activePage}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSelectBranch={(branch) => {
            setRepoState((prev) => ({
              ...prev,
              currentBranch: { ...prev.currentBranch, name: branch },
            }));
          }}
          onOpenQuickPalette={() => setIsQuickPaletteOpen(true)}
          onOpenCommitGenerator={() => setIsCommitModalOpen(true)}
          isLiveMode={isLiveMode}
          liveScanState={liveScanState}
          onRefreshLive={handleFetchLiveStatus}
          isAudioMuted={isAudioMutedState}
          onToggleAudio={handleToggleAudio}
        />

        {/* Main Layout Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-5 space-y-4">
        {activePage === 'companion' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            {/* Scenario Switcher & Anomaly Sandbox Bar */}
            <ScenarioSwitcher
              scenarios={ALL_SCENARIOS}
              activeScenarioId={activeScenarioId}
              onSelectScenario={handleSelectScenario}
              onInjectRemoteCommit={handleInjectRemoteCommit}
              onInjectLocalEdit={handleInjectLocalEdit}
              onInjectConflict={handleInjectConflict}
              onInjectUnsafeRisk={handleInjectUnsafeRisk}
              onResetToClean={handleResetToClean}
              isLiveMode={isLiveMode}
              onToggleLiveMode={handleToggleLiveMode}
              onRefreshLive={handleFetchLiveStatus}
              liveScanState={liveScanState}
              activeLiveBranch={activeLiveBranch}
              isLiveLoading={liveScanState.loading}
              onSelectLiveBranch={handleSelectLiveBranch}
            />

            {/* Core Layout Grid: Pet Stage (Left) + Chat Stream (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-start">
              {/* Left Column: Pet Ambient Canvas & Posture Visualization */}
              <div className="lg:col-span-5 space-y-3.5">
                <PetStage
                  state={repoState}
                  onPetClick={handlePetByte}
                  petTriggerTimestamp={petTriggerTimestamp}
                  onNavigate={handleNavigate}
                  pendingAction={messages.find((m) => m.recommendedAction && !m.executed)?.recommendedAction}
                  onPreviewAction={(action) => setPreviewAction(action)}
                />
              </div>

              {/* Right Column: Conversational Repository Guidance Stream */}
              <div className="lg:col-span-7 h-full">
                <ChatStream
                  messages={messages}
                  isLoading={isLoading}
                  onSendMessage={handleSendMessage}
                  onPreviewAction={(action) => setPreviewAction(action)}
                  onExecuteAction={handleExecuteAction}
                  state={repoState}
                  executingActionId={executingActionId}
                  selectedRole={selectedRole}
                  setSelectedRole={setSelectedRole}
                  selectedTier={selectedTier}
                  setSelectedTier={setSelectedTier}
                  onNavigate={handleNavigate}
                />
              </div>
            </div>
          </div>
        )}

        {activePage === 'repository' && (
          <RepositoryPage
            state={repoState}
            auditHistory={auditHistory}
            onRollbackLastAction={handleRollbackLastAction}
            onOpenCommitGenerator={() => setIsCommitModalOpen(true)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'cicd' && (
          <CICDPage
            state={repoState}
            onNavigate={handleNavigate}
            onSimulatePipelineEvent={handleSimulatePipelineEvent}
          />
        )}

        {activePage === 'pr' && (
          <PRIntelligencePage
            state={repoState}
            onNavigate={handleNavigate}
            onExecutePRAction={handleExecutePRAction}
          />
        )}

        {activePage === 'release' && (
          <ReleaseReadinessPage
            state={repoState}
            onNavigate={handleNavigate}
            onRemediateBlocker={(blocker) => {
              handleSendMessage(`How do I resolve the release blocker: "${blocker}"?`, selectedRole, selectedTier);
            }}
            onOpenCommitGenerator={() => setIsCommitModalOpen(true)}
          />
        )}

        {activePage === 'risk' && (
          <RiskScorePage
            state={repoState}
            onNavigate={handleNavigate}
            onRemediateFactor={(factor: RiskFactorItem) => {
              handleSendMessage(
                `How do I remediate the "${factor.name}" repository risk factor (${factor.details})?`,
                selectedRole,
                selectedTier
              );
            }}
          />
        )}
      </main>

      {/* Preview Changes & Diff Confirmation Modal */}
      {previewAction && (
        <PreviewChangesModal
          isOpen={!!previewAction}
          onClose={() => setPreviewAction(null)}
          action={previewAction}
          state={repoState}
          onConfirmAction={() => handleExecuteAction(previewAction)}
        />
      )}

      {/* AI Conventional Commit Generator Modal */}
      <AICommitGeneratorModal
        isOpen={isCommitModalOpen}
        onClose={() => setIsCommitModalOpen(false)}
        state={repoState}
        onApplyCommit={(commitMessage) => {
          handleSendMessage(`Apply conventional commit: "${commitMessage}"`, selectedRole, selectedTier);
        }}
      />

      {/* Quick Command Palette Modal (Cmd+K / Ctrl+K) */}
      <QuickPaletteModal
        isOpen={isQuickPaletteOpen}
        onClose={() => setIsQuickPaletteOpen(false)}
        scenarios={ALL_SCENARIOS}
        onSelectScenario={handleSelectScenario}
        onNavigate={handleNavigate}
        onOpenPreviewAction={() => {
          const lastWithAction = [...messages].reverse().find((m) => m.recommendedAction && !m.executed);
          if (lastWithAction?.recommendedAction) {
            setPreviewAction(lastWithAction.recommendedAction);
          }
        }}
        hasPendingAction={messages.some((m) => m.recommendedAction && !m.executed)}
        onRollbackLastAction={handleRollbackLastAction}
        hasAuditHistory={auditHistory.length > 0}
        isLiveMode={isLiveMode}
        onToggleLiveMode={handleToggleLiveMode}
        onRefreshLive={handleFetchLiveStatus}
        onOpenPRDrawer={() => handleNavigate('pr')}
        onOpenRiskModal={() => handleNavigate('risk')}
        onOpenReleaseModal={() => handleNavigate('release')}
        isAudioMuted={isAudioMutedState}
        onToggleAudio={handleToggleAudio}
        onPetByte={handlePetByte}
      />
      </div>
    </div>
  );
}
