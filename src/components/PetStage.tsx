import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Coffee,
  GitBranch,
  FileCode,
  Zap,
  GitPullRequest,
  ShieldCheck,
  Rocket,
  ArrowUpRight,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { RepositoryState, HealthLevel, ActivePageId, RecommendedAction } from '../types';
import {
  playPetChirpSound,
  playPurrSound,
  playCoffeeSlurpSound,
  playAccessoryEquipSound,
} from '../utils/audioEffects';
import { PixelPetGraphic } from './PixelPetGraphic';
import { calculateReleaseReadiness } from '../utils/releaseReadiness';

export type MascotAccessory =
  | 'none'
  | 'headphones'
  | 'cyber_visor'
  | 'coffee_mug'
  | 'gold_badge'
  | 'wizard_hat';

interface PetStageProps {
  state: RepositoryState;
  onPetClick?: () => void;
  petTriggerTimestamp?: number;
  customAvatarUrl?: string;
  onOpenImageStudio?: () => void;
  onNavigate?: (page: ActivePageId) => void;
  onOpenPipelineDrawer?: () => void;
  onOpenPRDrawer?: () => void;
  onOpenRiskModal?: () => void;
  pendingAction?: RecommendedAction | null;
  onPreviewAction?: (action: RecommendedAction) => void;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  text: string;
  type: 'heart' | 'coffee' | 'sparkle' | 'shield';
}

const ACCESSORY_LIST: { id: MascotAccessory; label: string; icon: string }[] = [
  { id: 'none', label: 'Classic Bot', icon: '🤖' },
  { id: 'headphones', label: 'Dev Headphones', icon: '🎧' },
  { id: 'cyber_visor', label: 'AR Cyber Visor', icon: '👓' },
  { id: 'coffee_mug', label: 'Hot Coffee Mug', icon: '☕' },
  { id: 'gold_badge', label: 'Patrol Badge', icon: '🎀' },
  { id: 'wizard_hat', label: 'Git Wizard Hat', icon: '🎩' },
];

const MASCOT_QUIPS = [
  "I'm keeping your branch drift and uncommitted work safe!",
  "Pro-tip: Atomic commits make rebasing painless.",
  "Remember to pull before pushing to keep history linear!",
  "Stashing your work first ensures zero overwrite risk.",
  "PR Pro-tip: Address reviewer comments promptly to land features fast!",
  "CI Pipeline Pro-tip: Quarantine flaky tests early!",
  "You're doing great! Let's ship clean code today.",
  "Beep boop! Ready to help you ship flawless code.",
];

export const PetStage: React.FC<PetStageProps> = ({
  state,
  onPetClick,
  petTriggerTimestamp,
  customAvatarUrl,
  onOpenImageStudio,
  onNavigate,
  onOpenPipelineDrawer,
  onOpenPRDrawer,
  onOpenRiskModal,
  pendingAction,
  onPreviewAction,
}) => {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [activeAccessory, setActiveAccessory] = useState<MascotAccessory>('none');
  const [currentQuipIndex, setCurrentQuipIndex] = useState(0);
  const [bubbleText, setBubbleText] = useState<string>('');
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [reactionType, setReactionType] = useState<'idle' | 'pet' | 'coffee' | 'sparkle'>('idle');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const readiness = calculateReleaseReadiness(state);

  const handleNav = (page: ActivePageId) => {
    if (onNavigate) {
      onNavigate(page);
    } else if (page === 'cicd' && onOpenPipelineDrawer) {
      onOpenPipelineDrawer();
    } else if (page === 'pr' && onOpenPRDrawer) {
      onOpenPRDrawer();
    } else if (page === 'risk' && onOpenRiskModal) {
      onOpenRiskModal();
    }
  };

  // Update contextual bubble message based on repo state and actions
  useEffect(() => {
    if (state.primarySymptom === 'lost_map') {
      setBubbleText('🗺️ GitPet cannot verify infrastructure consistency because the state backend is unavailable.');
    } else if (state.primarySymptom === 'smoke_cloud') {
      setBubbleText('💨 Checkout deployment failed. Three pods are unable to start because DATABASE_URL is missing.');
    } else if (state.primarySymptom === 'shield_cracked') {
      setBubbleText('🛡️ Infrastructure violates security policy. Anonymous storage access detected.');
    } else if (state.primarySymptom === 'pr_changes_requested') {
      setBubbleText('📝 Your PR #214 has review comments waiting on src/auth.ts.');
    } else if (state.primarySymptom === 'pr_pending_review') {
      setBubbleText('⌛ PR #305 is waiting for reviewer approvals.');
    } else if (state.primarySymptom === 'pr_conflicted') {
      setBubbleText('🧶 PR #189 has merge conflicts with main! Rebase recommended.');
    } else if (state.primarySymptom === 'pr_approved_ready') {
      setBubbleText('🎉 PR #242 approved by reviewers! All checks green and ready to merge.');
    } else if (state.primarySymptom === 'failed_build') {
      setBubbleText('🤢 CI Build failed in job #1042! Fix compilation errors!');
    } else if (state.primarySymptom === 'flaky_tests') {
      setBubbleText('😰 Flaky tests in auth.spec.ts! Intermittent test failure detected.');
    } else if (state.primarySymptom === 'vulnerability_risk') {
      setBubbleText('🛡️ Security Alert: CVE-2026-8819 detected! Shield activated!');
    } else if (state.primarySymptom === 'deploy_success') {
      setBubbleText('🎉 Production deployment successful! All 48 services green!');
    } else if (state.healthLevel === 'Unsafe') {
      setBubbleText('🚨 Work-loss hazard! Stash or commit before pulling to stay safe.');
    } else if (state.healthLevel === 'Blocked') {
      setBubbleText('🧶 Conflict alert! Let me help you inspect conflicting files.');
    } else if (state.healthLevel === 'Attention') {
      setBubbleText(`👀 Origin is ahead by ${state.currentBranch.behindCount} commits. Ready to sync!`);
    } else {
      setBubbleText('🌿 Pristine repository! All green and synchronized.');
    }
  }, [state.healthLevel, state.primarySymptom, state.currentBranch.behindCount]);

  // Autonomous Natural Blinking Loop
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 2200;
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimeout);
  }, []);

  // Track mouse coordinates
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2 - 10;

    const dx = (e.clientX - centerX) / (rect.width / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);

    const clampedX = Math.max(-1, Math.min(1, dx)) * 3.5;
    const clampedY = Math.max(-1, Math.min(1, dy)) * 2.5;

    setMousePos({ x: clampedX, y: clampedY });
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (petTriggerTimestamp) {
      triggerPetReaction(120, 70);
    }
  }, [petTriggerTimestamp]);

  const triggerPetReaction = (x = 120, y = 70) => {
    const isUnsafe = state.healthLevel === 'Unsafe' || state.healthPercentage === 0;
    const newP: FloatingParticle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 30 - 15),
      y: y + (Math.random() * 20 - 10),
      text: isUnsafe ? '*protects branch*' : '*beeps happily*',
      type: isUnsafe ? 'shield' : 'heart',
    };

    setParticles((prev) => [...prev, newP]);
    setReactionType('pet');
    playPurrSound();

    if (!isUnsafe) {
      setBubbleText(
        Math.random() > 0.5 ? '💖 *Happy beep* thanks for the pet!' : '✨ Feeling loved & ready to code!'
      );
      setIsBubbleVisible(true);
    }

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newP.id));
    }, 1200);

    setTimeout(() => {
      setReactionType('idle');
    }, 600);
  };

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    triggerPetReaction(x, y);

    if (onPetClick) {
      onPetClick();
    }
  };

  const handleFeedCoffee = (e: React.MouseEvent) => {
    e.stopPropagation();
    playCoffeeSlurpSound();
    setReactionType('coffee');
    setActiveAccessory('coffee_mug');

    const newP: FloatingParticle = {
      id: Date.now(),
      x: 130 + (Math.random() * 20 - 10),
      y: 70,
      text: '☕ +100 Energy!',
      type: 'coffee',
    };

    setParticles((prev) => [...prev, newP]);
    setBubbleText('⚡ Fresh coffee! Code velocity boosted!');
    setIsBubbleVisible(true);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newP.id));
    }, 1200);

    setTimeout(() => {
      setReactionType('idle');
    }, 700);
  };

  const handleCycleAccessory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const currentIndex = ACCESSORY_LIST.findIndex((a) => a.id === activeAccessory);
    const nextIndex = (currentIndex + 1) % ACCESSORY_LIST.length;
    const nextAccessory = ACCESSORY_LIST[nextIndex];

    setActiveAccessory(nextAccessory.id);
    playAccessoryEquipSound();
    setReactionType('sparkle');

    const newP: FloatingParticle = {
      id: Date.now(),
      x: 120,
      y: 60,
      text: `${nextAccessory.icon} ${nextAccessory.label}`,
      type: 'sparkle',
    };

    setParticles((prev) => [...prev, newP]);
    setBubbleText(`✨ Equipped: ${nextAccessory.label}!`);
    setIsBubbleVisible(true);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newP.id));
    }, 1200);

    setTimeout(() => {
      setReactionType('idle');
    }, 600);
  };

  const handleCycleQuip = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPetChirpSound();
    const nextIndex = (currentQuipIndex + 1) % MASCOT_QUIPS.length;
    setCurrentQuipIndex(nextIndex);
    setBubbleText(MASCOT_QUIPS[nextIndex]);
    setIsBubbleVisible(true);
  };

  const getHealthTheme = (level: HealthLevel) => {
    switch (level) {
      case 'Healthy':
        return {
          glow: 'rgba(16, 185, 129, 0.12)',
          barBg: 'bg-emerald-500',
          badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2,
          moodLabel: 'Relaxed & Healthy',
          auraShadow: '0 0 50px rgba(16, 185, 129, 0.2)',
        };
      case 'Attention':
        return {
          glow: 'rgba(245, 158, 11, 0.14)',
          barBg: 'bg-amber-500',
          badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertTriangle,
          moodLabel: 'Uneasy & Alert',
          auraShadow: '0 0 50px rgba(245, 158, 11, 0.22)',
        };
      case 'Blocked':
        return {
          glow: 'rgba(249, 115, 22, 0.16)',
          barBg: 'bg-orange-500',
          badgeBg: 'bg-orange-50 text-orange-800 border-orange-200',
          icon: ShieldAlert,
          moodLabel: 'Distressed & Blocked',
          auraShadow: '0 0 50px rgba(249, 115, 22, 0.25)',
        };
      case 'Unsafe':
        return {
          glow: 'rgba(244, 63, 94, 0.2)',
          barBg: 'bg-rose-500',
          badgeBg: 'bg-rose-50 text-rose-800 border-rose-200 ring-2 ring-rose-300 animate-pulse',
          icon: ShieldAlert,
          moodLabel: 'Critical Hazard (0% HP)',
          auraShadow: '0 0 50px rgba(244, 63, 94, 0.35)',
        };
      default:
        return {
          glow: 'rgba(148, 163, 184, 0.12)',
          barBg: 'bg-slate-400',
          badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: ShieldAlert,
          moodLabel: 'Monitoring State',
          auraShadow: '0 0 35px rgba(148, 163, 184, 0.15)',
        };
    }
  };

  const isUnsafe = state.healthLevel === 'Unsafe' || state.healthPercentage === 0;
  const theme = getHealthTheme(state.healthLevel);
  const StatusIcon = theme.icon;

  return (
    <div className="space-y-3.5">
      {/* Main Avatar Stage Card */}
      <div
        ref={containerRef}
        id="gitpet-stage-container"
        className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/90 p-4 shadow-xs transition-all flex flex-col items-center select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={handleStageClick}
      >
        {/* Floating Hearts & Particle Sparks */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 1, y: p.y, x: p.x, scale: 0.6 }}
              animate={{ opacity: 0, y: p.y - 45, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className={`absolute z-30 pointer-events-none text-xs font-bold font-mono px-2 py-0.5 rounded-full shadow-xs ${
                p.type === 'heart'
                  ? 'bg-pink-100 text-pink-700 border border-pink-300'
                  : p.type === 'coffee'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : p.type === 'shield'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-purple-100 text-purple-700 border border-purple-300'
              }`}
            >
              {p.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Top Status & Health Bar */}
        <div className="w-full flex items-center justify-between gap-2 z-20 pb-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNav('risk');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition-all hover:scale-105 cursor-pointer ${theme.badgeBg}`}
            title="Click to view 7-Factor Risk Scorecard"
          >
            <StatusIcon className="w-3.5 h-3.5" />
            <span className="uppercase text-[10px] tracking-wider">{state.healthLevel}</span>
            <span className="text-slate-400 font-normal">•</span>
            <span className="text-[11px] font-normal">{theme.moodLabel}</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNav('risk');
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs hover:bg-slate-100 transition-colors cursor-pointer"
            title="Click to inspect Repository Health Breakdown"
          >
            <span className="text-[10px] font-mono font-bold text-slate-500">HP</span>
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${theme.barBg}`}
                style={{ width: `${Math.max(4, state.healthPercentage)}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-slate-800">{state.healthPercentage}%</span>
          </button>
        </div>

        {/* Center Pet Canvas Area */}
        <div className="relative py-2 flex flex-col items-center justify-center min-h-[220px]">
          {/* Animated Contextual Speech Bubble */}
          <AnimatePresence>
            {isBubbleVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-xs text-center z-20 mb-2 px-3 py-1.5 bg-slate-900 text-slate-100 text-xs font-medium rounded-2xl shadow-md border border-slate-700/80 leading-snug"
              >
                {bubbleText}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ambient Glow Aura */}
          <div
            style={{
              boxShadow: theme.auraShadow,
            }}
            className="absolute w-36 h-36 rounded-full pointer-events-none"
          />

          {/* Interactive Pixel Pet */}
          <div className={`transition-all duration-500 z-10 cursor-pointer ${isUnsafe ? 'grayscale contrast-125' : ''}`}>
            {customAvatarUrl ? (
              <img
                src={customAvatarUrl}
                alt="Custom Avatar"
                className="w-44 h-44 object-contain pixelated drop-shadow-md"
              />
            ) : (
              <PixelPetGraphic
                symptom={state.primarySymptom}
                healthLevel={state.healthLevel}
                isHovered={isHovered}
                mousePos={mousePos}
                isBlinking={isBlinking}
                reactionType={reactionType}
                accessory={activeAccessory}
              />
            )}
          </div>
        </div>

        {/* Diagnosis Caption */}
        <div className="text-center max-w-md mt-1">
          <h2 className="text-sm font-bold text-slate-900 flex items-center justify-center gap-1.5">
            {state.symptomTitle}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            {state.operatorMeaning}
          </p>
        </div>

        {/* Action Dock */}
        <div className="w-full flex items-center justify-between gap-1.5 pt-3 mt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 flex-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                triggerPetReaction();
              }}
              title="Pet Byte (Spacebar shortcut)"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-600 border border-slate-200/80 text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>🐾</span>
              <span>Pet</span>
            </button>

            <button
              type="button"
              onClick={handleFeedCoffee}
              title="Give Byte a cup of coffee"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-700 text-slate-600 border border-slate-200/80 text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>☕</span>
              <span>Fuel</span>
            </button>

            <button
              type="button"
              onClick={handleCycleAccessory}
              title="Change wearable accessory"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200/80 text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>🎩</span>
              <span>Outfit</span>
            </button>

            <button
              type="button"
              onClick={handleCycleQuip}
              title="Ask Byte for git tips"
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 border border-slate-200/80 text-[11px] font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
            >
              <span>💬</span>
              <span>Ask</span>
            </button>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-semibold text-slate-600">
              Space
            </kbd>
            <span className="hidden sm:inline">to pet</span>
          </div>
        </div>
      </div>

      {/* Live Telemetry Mission Control Quick Deck */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Branch Drift & Working Tree Card */}
        <button
          type="button"
          onClick={() => handleNav('repository')}
          className="text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-indigo-300 hover:bg-slate-50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 group-hover:scale-105 transition-transform">
              <GitBranch className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-indigo-600 flex items-center gap-0.5">
              DAG <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-bold text-slate-800 block truncate">Branch Drift & Tree</span>
            <div className="flex items-center gap-2 mt-0.5 font-mono text-xs">
              <span className={state.currentBranch.aheadCount > 0 ? 'text-indigo-600 font-bold' : 'text-slate-500'}>
                ↑{state.currentBranch.aheadCount} ahead
              </span>
              <span className="text-slate-300">|</span>
              <span className={state.currentBranch.behindCount > 0 ? 'text-amber-600 font-bold' : 'text-slate-500'}>
                ↓{state.currentBranch.behindCount} behind
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
              {state.workingTree.length} uncommitted {state.workingTree.length === 1 ? 'file' : 'files'}
            </span>
          </div>
        </button>

        {/* CI/CD & Test Health Card */}
        <button
          type="button"
          onClick={() => handleNav('cicd')}
          className="text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-amber-300 hover:bg-slate-50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-amber-600 flex items-center gap-0.5">
              CI/CD <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-bold text-slate-800 block truncate">Pipeline & Tests</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                  state.pipelineState?.buildStatus === 'failed'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {state.pipelineState?.buildStatus || 'Passed'}
              </span>
              <span className="text-[11px] font-mono text-slate-600">
                {state.pipelineState?.passRate || 100}% pass
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
              {state.pipelineState?.vulnerabilities.length || 0} CVEs detected
            </span>
          </div>
        </button>

        {/* PR Intelligence Card */}
        <button
          type="button"
          onClick={() => handleNav('pr')}
          className="text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-purple-300 hover:bg-slate-50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 group-hover:scale-105 transition-transform">
              <GitPullRequest className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-purple-600 flex items-center gap-0.5">
              PR <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-bold text-slate-800 block truncate">
              PR #{state.activePullRequest?.number || 214}
            </span>
            <span className="text-[11px] text-purple-700 font-semibold block mt-0.5 capitalize">
              {state.activePullRequest?.reviewStatus.replace('_', ' ') || 'Changes Requested'}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">
              {state.activePullRequest?.waitingDays || 3} days in review
            </span>
          </div>
        </button>

        {/* Release Gate Readiness Card */}
        <button
          type="button"
          onClick={() => handleNav('release')}
          className="text-left p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:border-emerald-300 hover:bg-slate-50 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 group-hover:scale-105 transition-transform">
              <Rocket className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 group-hover:text-emerald-600 flex items-center gap-0.5">
              Gate <ChevronRight className="w-3 h-3" />
            </span>
          </div>
          <div className="mt-2">
            <span className="text-[11px] font-bold text-slate-800 block truncate">Release Gate</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black font-mono text-slate-900">{readiness.overallScore}%</span>
              <span className={`text-[10px] font-bold ${readiness.canShip ? 'text-emerald-600' : 'text-rose-600'}`}>
                {readiness.canShip ? 'Ship Ready' : 'Blockers'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 block mt-0.5 font-mono">5-Pillar Sign-off</span>
          </div>
        </button>
      </div>
    </div>
  );
};
