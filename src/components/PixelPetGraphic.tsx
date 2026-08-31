import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SymptomType, HealthLevel } from '../types';
import { MascotAccessory } from './PetStage';

interface PixelPetGraphicProps {
  symptom: SymptomType;
  healthLevel: HealthLevel;
  isHovered: boolean;
  mousePos: { x: number; y: number };
  isBlinking: boolean;
  reactionType: 'idle' | 'pet' | 'coffee' | 'sparkle';
  accessory: MascotAccessory;
}

export interface PixelRect {
  x: number;
  y: number;
  w?: number;
  h?: number;
  c: string;
}

export const PixelPetGraphic: React.FC<PixelPetGraphicProps> = ({
  symptom,
  healthLevel,
  isHovered,
  mousePos,
  isBlinking,
  reactionType,
  accessory,
}) => {
  const [frame, setFrame] = useState(0);

  // 4-frame retro clock for natural pixel animation
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 220);
    return () => clearInterval(timer);
  }, []);

  const isUnsafe = healthLevel === 'Unsafe';
  const isSleeping = symptom === 'stale_branch';
  const isConflicted = symptom === 'merge_conflict';
  const isHazard = symptom === 'destructive_hazard';
  const isBehind = symptom === 'behind_remote';
  const isUnpushed = symptom === 'unpushed_work';
  const isDetached = symptom === 'detached_head';
  const isClean = symptom === 'clean_sync';
  const isFailedBuild = symptom === 'failed_build';
  const isFlakyTests = symptom === 'flaky_tests';
  const isVulnerability = symptom === 'vulnerability_risk';
  const isDeploySuccess = symptom === 'deploy_success';
  const isPRChangesRequested = symptom === 'pr_changes_requested';
  const isPRPendingReview = symptom === 'pr_pending_review';
  const isPRConflicted = symptom === 'pr_conflicted';
  const isPRApprovedReady = symptom === 'pr_approved_ready';
  const isLostMap = symptom === 'lost_map';
  const isSmokeCloud = symptom === 'smoke_cloud';
  const isShieldCracked = symptom === 'shield_cracked';

  // Breathing, floating, jitter & antenna physics
  const nervousJitterX = isFlakyTests || isPRPendingReview ? (frame % 2 === 0 ? -1 : 1) : 0;
  const danceY = isDeploySuccess || isPRApprovedReady ? (frame % 2 === 0 ? -2 : 0) : 0;
  const bobY = (isSleeping ? (frame % 2 === 0 ? 0 : 1) : frame === 1 || frame === 3 ? -1 : 0) + danceY;
  const antWiggleL = frame === 1 ? -1 : frame === 3 ? 1 : 0;
  const antWiggleR = frame === 1 ? 1 : frame === 3 ? -1 : 0;

  // Eye tracking offset (-1, 0, 1)
  const lookX = Math.max(-1, Math.min(1, Math.round(mousePos.x / 2.2))) + nervousJitterX;
  const lookY = Math.max(-1, Math.min(1, Math.round(mousePos.y / 2.2)));

  // --- MASTER 16-BIT RETRO COLOR PALETTES ---
  const P = {
    // Outlines & Selective Outlining (Selout)
    OUTLINE_DARK: '#120422',
    OUTLINE: '#20083B',
    OUTLINE_SOFT: '#37125C',
    OUTLINE_LIGHT: '#561E87',

    // Ribbon Pink / Neon Magenta Ramp (Left Side & Bevels)
    PINK_SPECULAR: '#FFFFFF',
    PINK_HL: '#FFD6F0',
    PINK_LIGHT: '#FF7AC6',
    PINK_MID: '#E61E7B',
    PINK_DARK: '#A40E53',
    PINK_DEEP: '#62032F',

    // Ribbon Purple / Cosmic Violet Ramp (Right Side & Bevels)
    PURPLE_SPECULAR: '#FFFFFF',
    PURPLE_HL: '#EED6FF',
    PURPLE_LIGHT: '#B975FF',
    PURPLE_MID: '#8324E8',
    PURPLE_DARK: '#54109E',
    PURPLE_DEEP: '#310463',

    // Sick Toxic Ramp (Failed Build)
    SICK_HL: '#DCFCE7',
    SICK_LIGHT: '#6EE7B7',
    SICK_MID: '#10B981',
    SICK_DARK: '#047857',
    SICK_DEEP: '#064E3B',

    // Metallic Slate & Dark Bezel Ramp
    METAL_SPECULAR: '#F8FAFC',
    METAL_HL: '#CBD5E1',
    METAL_LIGHT: '#64748B',
    METAL_MID: '#334155',
    METAL_DARK: '#1E293B',
    METAL_DEEP: '#0F172A',

    // CRT Screen Glass Display Ramp
    SCREEN_BG: isFailedBuild ? '#E6FBF0' : '#F1F5F9',
    SCREEN_LIGHT: '#FFFFFF',
    SCREEN_SHADOW: '#CBD5E1',
    SCREEN_DARK_SHADOW: '#94A3B8',

    // Anime Eyes & Face Ramps
    EYE_DARK: '#0D041A',
    EYE_SOCKET: '#1E0B38',
    EYE_IRIS_TOP: '#38125E',
    EYE_IRIS_BOT: '#6B21A8',
    EYE_GLINT_MAIN: '#FFFFFF',
    EYE_GLINT_SUB: '#F3E8FF',
    BLUSH: '#FF4D88',
    BLUSH_SOFT: '#FFA6C5',

    // Floating Levitation Cushion / Dock Ramp
    DOCK_HL: '#FAF5FF',
    DOCK_LIGHT: '#E9D5FF',
    DOCK_MID: '#C084FC',
    DOCK_VIOLET: '#9333EA',
    DOCK_DARK: '#6B21A8',
    DOCK_DEEP: '#4C1D95',
    DOCK_SHADOW: '#1E0B38',

    // Status Core Glow Ramps
    CORE_GREEN_HL: '#A7F3D0',
    CORE_GREEN: '#10B981',
    CORE_GREEN_DARK: '#047857',

    CORE_GOLD_HL: '#FEF08A',
    CORE_GOLD: '#F59E0B',
    CORE_GOLD_DARK: '#B45309',

    CORE_RED_HL: '#FECACA',
    CORE_RED: '#EF4444',
    CORE_RED_DARK: '#B91C1C',

    CORE_CYAN_HL: '#CFFAFE',
    CORE_CYAN: '#06B6D4',
    CORE_CYAN_DARK: '#0E7490',
  };

  const scale = 4; // 4px per pixel unit (48x48 grid = 192x192 base canvas)

  const draw = (pixels: PixelRect[]) => {
    return pixels.map((p, i) => (
      <rect
        key={i}
        x={(p.x + nervousJitterX) * scale}
        y={(p.y + bobY) * scale}
        width={(p.w || 1) * scale}
        height={(p.h || 1) * scale}
        fill={p.c}
        shapeRendering="crispEdges"
      />
    ));
  };

  // --- 1. SLEEK 16-BIT LEVITATION DOCK / PLUSH SEAT ---
  const dockPixels: PixelRect[] = [
    // Outer Ambient Shadow & Base Edge
    { x: 9, y: 39, w: 30, h: 6, c: P.OUTLINE_DARK },
    { x: 11, y: 38, w: 26, h: 8, c: P.OUTLINE_DARK },
    { x: 14, y: 37, w: 20, h: 10, c: P.OUTLINE_DARK },

    // Deep Base Foundation
    { x: 10, y: 41, w: 28, h: 3, c: P.DOCK_DEEP },
    { x: 12, y: 43, w: 24, h: 2, c: P.DOCK_SHADOW },

    // Mid Tone Body
    { x: 10, y: 39, w: 28, h: 3, c: P.DOCK_DARK },
    { x: 11, y: 38, w: 26, h: 4, c: P.DOCK_VIOLET },

    // Top Upper Cushion Surface
    { x: 12, y: 37, w: 24, h: 3, c: P.DOCK_MID },
    { x: 14, y: 37, w: 20, h: 2, c: P.DOCK_LIGHT },
    { x: 16, y: 37, w: 16, h: 1, c: P.DOCK_HL },

    // Neon Accent Ring / Core Trim
    { x: 13, y: 40, w: 22, h: 1, c: isHazard || isFailedBuild ? P.CORE_RED : isClean || isDeploySuccess ? P.CORE_GREEN : P.DOCK_LIGHT },
    { x: 16, y: 40, w: 16, h: 1, c: isHazard || isFailedBuild ? P.CORE_RED_HL : isClean || isDeploySuccess ? P.CORE_GREEN_HL : P.DOCK_HL },
  ];

  // --- 2. CHUBBY ROBOTIC BODY, CORE REACTOR & PAWS ---
  const bodyPixels: PixelRect[] = [
    // Outer Body Frame & Selout
    { x: 15, y: 27, w: 18, h: 11, c: P.OUTLINE },
    { x: 16, y: 26, w: 16, h: 13, c: P.OUTLINE },
    { x: 17, y: 25, w: 14, h: 14, c: P.OUTLINE_DARK },

    // --- LEFT TORSO HALF (Ribbon Pink Ramp or Sick Green) ---
    { x: 16, y: 27, w: 8, h: 10, c: isFailedBuild ? P.SICK_MID : P.PINK_MID },
    { x: 16, y: 27, w: 4, h: 8, c: isFailedBuild ? P.SICK_LIGHT : P.PINK_LIGHT },
    { x: 17, y: 27, w: 2, h: 5, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    { x: 16, y: 35, w: 8, h: 2, c: isFailedBuild ? P.SICK_DARK : P.PINK_DARK },
    { x: 17, y: 36, w: 7, h: 1, c: isFailedBuild ? P.SICK_DEEP : P.PINK_DEEP },

    // --- RIGHT TORSO HALF (Cosmic Violet Ramp) ---
    { x: 24, y: 27, w: 8, h: 10, c: P.PURPLE_MID },
    { x: 24, y: 27, w: 4, h: 8, c: P.PURPLE_LIGHT },
    { x: 28, y: 27, w: 4, h: 10, c: P.PURPLE_DARK },
    { x: 24, y: 35, w: 8, h: 2, c: P.PURPLE_DARK },
    { x: 24, y: 36, w: 7, h: 1, c: P.PURPLE_DEEP },

    // Central Seam Highlight / Tone
    { x: 23, y: 27, w: 1, h: 9, c: isFailedBuild ? P.SICK_DARK : P.PINK_DEEP },
    { x: 24, y: 27, w: 1, h: 9, c: P.PURPLE_DEEP },

    // --- CHEST REACTOR CORE LED ---
    { x: 22, y: 29, w: 4, h: 5, c: P.OUTLINE_DARK },
    { x: 23, y: 30, w: 2, h: 3, c: isHazard || isFailedBuild ? P.CORE_RED_DARK : isClean || isDeploySuccess ? P.CORE_GREEN_DARK : P.CORE_GOLD_DARK },
    { x: 23, y: 30, w: 2, h: 2, c: isHazard || isFailedBuild ? P.CORE_RED : isClean || isDeploySuccess ? P.CORE_GREEN : P.CORE_GOLD },
    { x: 23, y: 30, w: 1, h: 1, c: isHazard || isFailedBuild ? P.CORE_RED_HL : isClean || isDeploySuccess ? P.CORE_GREEN_HL : P.CORE_GOLD_HL },

    // --- LEFT SITTING PAW ---
    { x: 12, y: 32, w: 6, h: 6, c: P.OUTLINE },
    { x: 13, y: 33, w: 4, h: 4, c: isFailedBuild ? P.SICK_MID : P.PINK_LIGHT },
    { x: 13, y: 33, w: 2, h: 2, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    { x: 13, y: 36, w: 4, h: 1, c: isFailedBuild ? P.SICK_DARK : P.PINK_DARK },
    // Soft Toe Pad Details
    { x: 13, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 15, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 14, y: 34, w: 1, h: 1, c: P.BLUSH_SOFT },

    // --- RIGHT SITTING PAW ---
    { x: 30, y: 32, w: 6, h: 6, c: P.OUTLINE },
    { x: 31, y: 33, w: 4, h: 4, c: P.PURPLE_LIGHT },
    { x: 31, y: 33, w: 2, h: 2, c: P.PURPLE_HL },
    { x: 31, y: 36, w: 4, h: 1, c: P.PURPLE_DARK },
    // Soft Toe Pad Details
    { x: 32, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 34, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 33, y: 34, w: 1, h: 1, c: P.BLUSH_SOFT },

    // --- CUTE ROBOTIC ARMS ---
    // Left Arm
    { x: 13, y: 28, w: 3, h: 5, c: P.OUTLINE },
    { x: 14, y: 29, w: 2, h: 3, c: isFailedBuild ? P.SICK_LIGHT : P.PINK_LIGHT },
    { x: 14, y: 29, w: 1, h: 2, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    // Right Arm
    { x: 32, y: 28, w: 3, h: 5, c: P.OUTLINE },
    { x: 32, y: 29, w: 2, h: 3, c: P.PURPLE_LIGHT },
    { x: 33, y: 29, w: 1, h: 2, c: P.PURPLE_HL },
  ];

  // --- 3. HIGH-END 16-BIT CRT MONITOR HEAD CHASSIS ---
  const tvHeadPixels: PixelRect[] = [
    // Outer Selective Outline Silhouette (Smoothly beveled corners)
    { x: 10, y: 7, w: 28, h: 21, c: P.OUTLINE },
    { x: 9, y: 9, w: 30, h: 17, c: P.OUTLINE },
    { x: 12, y: 6, w: 24, h: 23, c: P.OUTLINE_DARK },

    // --- LEFT ROTARY SPEAKER / EAR DIAL ---
    { x: 5, y: 13, w: 5, h: 9, c: P.OUTLINE },
    { x: 6, y: 14, w: 3, h: 7, c: isFailedBuild ? P.SICK_MID : P.PINK_MID },
    { x: 6, y: 14, w: 1, h: 7, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    { x: 8, y: 15, w: 1, h: 5, c: isFailedBuild ? P.SICK_DARK : P.PINK_DARK },
    { x: 7, y: 16, w: 1, h: 3, c: P.OUTLINE_DARK }, // Speaker grill slit

    // --- RIGHT ROTARY SPEAKER / EAR DIAL ---
    { x: 38, y: 13, w: 5, h: 9, c: P.OUTLINE },
    { x: 39, y: 14, w: 3, h: 7, c: P.PURPLE_MID },
    { x: 39, y: 14, w: 1, h: 7, c: P.PURPLE_HL },
    { x: 41, y: 15, w: 1, h: 5, c: P.PURPLE_DARK },
    { x: 40, y: 16, w: 1, h: 3, c: P.OUTLINE_DARK }, // Speaker grill slit

    // --- LEFT TV CHASSIS HALF (Pink / Magenta 5-Tone Bevels) ---
    { x: 10, y: 8, w: 14, h: 19, c: isFailedBuild ? P.SICK_MID : P.PINK_MID },
    { x: 9, y: 10, w: 15, h: 15, c: isFailedBuild ? P.SICK_MID : P.PINK_MID },
    { x: 12, y: 7, w: 12, h: 21, c: isFailedBuild ? P.SICK_MID : P.PINK_MID },
    // Top-Left Glossy Specular Bevels
    { x: 12, y: 7, w: 11, h: 2, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    { x: 10, y: 9, w: 2, h: 14, c: isFailedBuild ? P.SICK_HL : P.PINK_HL },
    { x: 11, y: 8, w: 3, h: 2, c: P.PINK_SPECULAR },
    { x: 10, y: 24, w: 14, h: 2, c: isFailedBuild ? P.SICK_DARK : P.PINK_DARK },

    // --- RIGHT TV CHASSIS HALF (Cosmic Violet 5-Tone Bevels) ---
    { x: 24, y: 8, w: 14, h: 19, c: P.PURPLE_MID },
    { x: 24, y: 10, w: 15, h: 15, c: P.PURPLE_MID },
    { x: 24, y: 7, w: 12, h: 21, c: P.PURPLE_MID },
    // Top-Right Highlights & Bottom Shadows
    { x: 24, y: 7, w: 11, h: 1, c: P.PURPLE_LIGHT },
    { x: 36, y: 10, w: 2, h: 14, c: P.PURPLE_DARK },
    { x: 37, y: 11, w: 1, h: 12, c: P.PURPLE_DEEP },
    { x: 24, y: 24, w: 14, h: 2, c: P.PURPLE_DEEP },

    // Central Chassis Seam
    { x: 23, y: 7, w: 1, h: 20, c: isFailedBuild ? P.SICK_DARK : P.PINK_DEEP },
    { x: 24, y: 7, w: 1, h: 20, c: P.PURPLE_DEEP },

    // --- TITANIUM SLATE SCREEN BEZEL ---
    { x: 12, y: 10, w: 24, h: 15, c: P.METAL_DEEP },
    { x: 13, y: 9, w: 22, h: 17, c: P.METAL_DEEP },
    { x: 13, y: 10, w: 22, h: 15, c: P.METAL_DARK },
    // Bezel Inner Specular Line
    { x: 13, y: 10, w: 22, h: 1, c: P.METAL_MID },
    { x: 13, y: 11, w: 1, h: 13, c: P.METAL_MID },

    // --- CRT GLASS SCREEN DISPLAY ---
    { x: 14, y: 11, w: 20, h: 13, c: P.SCREEN_BG },
    { x: 13, y: 12, w: 22, h: 11, c: P.SCREEN_BG },

    // Screen Inner Rim Highlights & Bevel
    { x: 14, y: 11, w: 20, h: 1, c: P.SCREEN_LIGHT },
    { x: 13, y: 12, w: 1, h: 10, c: P.SCREEN_LIGHT },
    { x: 14, y: 23, w: 20, h: 1, c: P.SCREEN_SHADOW },
    { x: 34, y: 12, w: 1, h: 11, c: P.SCREEN_SHADOW },

    // Status Indicator LED (Bottom Bezel)
    { x: 23, y: 25, w: 2, h: 1, c: isHazard || isFailedBuild ? P.CORE_RED : isClean || isDeploySuccess ? P.CORE_GREEN : P.CORE_GOLD },
    { x: 23, y: 25, w: 1, h: 1, c: isHazard || isFailedBuild ? P.CORE_RED_HL : isClean || isDeploySuccess ? P.CORE_GREEN_HL : P.CORE_GOLD_HL },
  ];

  // --- 4. DYNAMIC 16-BIT SWAYING ANTENNAS WITH NEON GLOW ORBS ---
  const antennaPixels: PixelRect[] = [
    // Left Antenna Stem & Neon Pink Glow Orb
    { x: 16 + antWiggleL, y: 4, w: 2, h: 3, c: P.OUTLINE },
    { x: 15 + antWiggleL, y: 1, w: 4, h: 4, c: P.OUTLINE },
    { x: 16 + antWiggleL, y: 2, w: 2, h: 2, c: isFailedBuild ? P.SICK_LIGHT : P.PINK_LIGHT },
    { x: 16 + antWiggleL, y: 2, w: 1, h: 1, c: isFailedBuild ? P.SICK_HL : P.PINK_SPECULAR },

    // Right Antenna Stem & Neon Violet Glow Orb
    { x: 30, y: 5, w: 2, h: 2, c: P.OUTLINE },
    { x: 31 + antWiggleR, y: 3, w: 2, h: 3, c: P.OUTLINE },
    { x: 30 + antWiggleR, y: 0, w: 5, h: 4, c: P.OUTLINE },
    { x: 31 + antWiggleR, y: 1, w: 3, h: 2, c: P.PURPLE_LIGHT },
    { x: 31 + antWiggleR, y: 1, w: 1, h: 1, c: P.PURPLE_SPECULAR },
  ];

  // --- 5. HIGH-EXPRESSION 16-BIT ANIME FACE & EYES ENGINE ---
  const renderFace = () => {
    // 1. Failed Build (Sick with Dizzy x x Eyes & Thermometer)
    if (isFailedBuild) {
      return (
        <g>
          {/* Left Sick 'x' Eye */}
          <line x1={16 * scale} y1={(14 + bobY) * scale} x2={20 * scale} y2={(18 + bobY) * scale} stroke={P.CORE_RED} strokeWidth={2 * scale} strokeLinecap="square" />
          <line x1={20 * scale} y1={(14 + bobY) * scale} x2={16 * scale} y2={(18 + bobY) * scale} stroke={P.CORE_RED} strokeWidth={2 * scale} strokeLinecap="square" />

          {/* Right Sick 'x' Eye */}
          <line x1={27 * scale} y1={(14 + bobY) * scale} x2={31 * scale} y2={(18 + bobY) * scale} stroke={P.CORE_RED} strokeWidth={2 * scale} strokeLinecap="square" />
          <line x1={31 * scale} y1={(14 + bobY) * scale} x2={27 * scale} y2={(18 + bobY) * scale} stroke={P.CORE_RED} strokeWidth={2 * scale} strokeLinecap="square" />

          {/* Sick Cheek Flush */}
          <rect x={14 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.SICK_LIGHT} rx={1} />
          <rect x={30 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.SICK_LIGHT} rx={1} />

          {/* Fever Thermometer */}
          <rect x={21 * scale} y={(19.5 + bobY) * scale} width={8 * scale} height={1.5 * scale} fill="#FFFFFF" stroke={P.OUTLINE} strokeWidth={0.5 * scale} />
          <rect x={27 * scale} y={(19.5 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.CORE_RED} />
        </g>
      );
    }

    // 2. Flaky Tests (Nervous Trembling Pet with Wide Shaky O_O Eyes & Wavy Mouth)
    if (isFlakyTests) {
      return (
        <g>
          {/* Left Wide Anxious Eye */}
          <rect x={16 * scale} y={(14 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={2} />
          <rect x={17 * scale} y={(15 + bobY) * scale} width={3 * scale} height={3 * scale} fill="#FFFFFF" />
          <rect x={(18 + nervousJitterX) * scale} y={(16 + bobY) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />

          {/* Right Wide Anxious Eye */}
          <rect x={27 * scale} y={(14 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={2} />
          <rect x={28 * scale} y={(15 + bobY) * scale} width={3 * scale} height={3 * scale} fill="#FFFFFF" />
          <rect x={(29 + nervousJitterX) * scale} y={(16 + bobY) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />

          {/* Forehead Sweatdrop */}
          <g transform={`translate(${33 * scale}, ${(9 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={1.5 * scale} height={1 * scale} fill={P.CORE_CYAN_HL} />
            <rect x={0} y={1 * scale} width={2.5 * scale} height={3 * scale} fill={P.CORE_CYAN} />
          </g>

          {/* Wavy Nervous Mouth */}
          <path
            d={`M ${21 * scale} ${(20 + bobY) * scale} Q ${23 * scale} ${(22 + bobY) * scale} ${25 * scale} ${(20 + bobY) * scale} T ${28 * scale} ${(20 + bobY) * scale}`}
            fill="none"
            stroke={P.EYE_DARK}
            strokeWidth={1.5 * scale}
          />
        </g>
      );
    }

    // 3. Deploy Success & Happy Reaction (Kawaii Joy Crescent Arc Eyes)
    if (isDeploySuccess || isPRApprovedReady || reactionType === 'pet') {
      return (
        <g>
          {/* Left Joyful Crescent Arc Eye */}
          <rect x={16 * scale} y={(15 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={15 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={19 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />

          {/* Right Joyful Crescent Arc Eye */}
          <rect x={27 * scale} y={(15 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={26 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={30 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />

          {/* Rosy Anime Cheeks */}
          <rect x={14 * scale} y={(18 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />
          <rect x={30 * scale} y={(18 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />

          {/* Open Joyful Smile */}
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1.5} />
          <rect x={23 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.BLUSH} rx={0.5} />
        </g>
      );
    }

    // 4. Stale Branch / Sleeping (Peaceful Snoozing Arc Eyes)
    if (isSleeping) {
      return (
        <g>
          {/* Peaceful Sleeping Eyelids ( ˘ ᵕ ˘ ) */}
          <rect x={16 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.5} />
          <rect x={27 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.5} />
          {/* Gentle Blush */}
          <rect x={14 * scale} y={(18 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH_SOFT} rx={0.8} />
          <rect x={30 * scale} y={(18 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH_SOFT} rx={0.8} />
          {/* Sweet Resting Smile */}
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.7} />
        </g>
      );
    }

    // 5. Natural Blink Animation Frame
    if (isBlinking) {
      return (
        <g>
          <rect x={16 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.5} />
          <rect x={27 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.5} />
          <rect x={14 * scale} y={(18 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH_SOFT} rx={0.8} />
          <rect x={30 * scale} y={(18 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH_SOFT} rx={0.8} />
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.7} />
        </g>
      );
    }

    // 6. Conflicted / Dizzy Face (Merge Conflict)
    if (isConflicted || isPRConflicted) {
      return (
        <g>
          {/* Left Dizzy Spiral Eye */}
          <rect x={16 * scale} y={(14 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={17 * scale} y={(15 + bobY) * scale} width={3 * scale} height={3 * scale} fill={P.CORE_RED} />
          <rect x={18 * scale} y={(16 + bobY) * scale} width={1 * scale} height={1 * scale} fill="#FFFFFF" />

          {/* Right Dizzy Spiral Eye */}
          <rect x={27 * scale} y={(14 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={28 * scale} y={(15 + bobY) * scale} width={3 * scale} height={3 * scale} fill={P.CORE_RED} />
          <rect x={29 * scale} y={(16 + bobY) * scale} width={1 * scale} height={1 * scale} fill="#FFFFFF" />

          {/* Dizzy Jagged Mouth */}
          <rect x={21 * scale} y={(19.5 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
          <rect x={23 * scale} y={(20.5 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
          <rect x={25 * scale} y={(19.5 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
        </g>
      );
    }

    // 7. Destructive Hazard (Alarmed Big Pupils)
    if (isHazard) {
      return (
        <g>
          {/* Left Alarmed Eye */}
          <rect x={16 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} fill="#FFFFFF" rx={1} />
          <rect x={16 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} stroke={P.EYE_DARK} strokeWidth={scale} fill="none" rx={1} />
          <rect x={18 * scale} y={(15.5 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.CORE_RED} />

          {/* Right Alarmed Eye */}
          <rect x={27 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} fill="#FFFFFF" rx={1} />
          <rect x={27 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} stroke={P.EYE_DARK} strokeWidth={scale} fill="none" rx={1} />
          <rect x={28 * scale} y={(15.5 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.CORE_RED} />

          {/* Alarmed 'O' Mouth */}
          <rect x={22 * scale} y={(19.5 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
        </g>
      );
    }

    // 8. DEFAULT: High-End 16-Bit Glossy Anime Eyes with Sub-pixel Glints
    const eyeL_X = 16 + lookX;
    const eyeL_Y = 14 + lookY;
    const eyeR_X = 27 + lookX;
    const eyeR_Y = 14 + lookY;

    return (
      <g>
        {/* Left Anime Eye (5x6 Shaded Grid) */}
        <rect x={16 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} fill={P.EYE_DARK} rx={1.5} />
        {/* Shaded Iris Ramp */}
        <rect x={16 * scale} y={(16.5 + bobY) * scale} width={5 * scale} height={3 * scale} fill={P.EYE_IRIS_TOP} />
        <rect x={16 * scale} y={(17.5 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_IRIS_BOT} />
        {/* Primary Specular Star Glint */}
        <rect x={eyeL_X * scale} y={(eyeL_Y + bobY) * scale} width={2 * scale} height={2 * scale} fill={P.EYE_GLINT_MAIN} />
        {/* Secondary Micro Sparkle Glint */}
        <rect x={(eyeL_X + 2) * scale} y={(eyeL_Y + 2.5 + bobY) * scale} width={1 * scale} height={1 * scale} fill={P.EYE_GLINT_SUB} />

        {/* Right Anime Eye (5x6 Shaded Grid) */}
        <rect x={27 * scale} y={(13.5 + bobY) * scale} width={5 * scale} height={6 * scale} fill={P.EYE_DARK} rx={1.5} />
        {/* Shaded Iris Ramp */}
        <rect x={27 * scale} y={(16.5 + bobY) * scale} width={5 * scale} height={3 * scale} fill={P.EYE_IRIS_TOP} />
        <rect x={27 * scale} y={(17.5 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_IRIS_BOT} />
        {/* Primary Specular Star Glint */}
        <rect x={eyeR_X * scale} y={(eyeR_Y + bobY) * scale} width={2 * scale} height={2 * scale} fill={P.EYE_GLINT_MAIN} />
        {/* Secondary Micro Sparkle Glint */}
        <rect x={(eyeR_X + 2) * scale} y={(eyeR_Y + 2.5 + bobY) * scale} width={1 * scale} height={1 * scale} fill={P.EYE_GLINT_SUB} />

        {/* Cute Cheeks Blush */}
        <rect x={14 * scale} y={(18.5 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />
        <rect x={30 * scale} y={(18.5 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />

        {/* Dynamic Mouth Expression */}
        {reactionType === 'coffee' ? (
          <g>
            <rect x={22 * scale} y={(18.5 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
            <rect x={23 * scale} y={(19.5 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.BLUSH} />
          </g>
        ) : (
          <g>
            {/* Cute Cat W-mouth curve */}
            <rect x={22 * scale} y={(19.5 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={0.7} />
            <rect x={21 * scale} y={(18.5 + bobY) * scale} width={1 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
            <rect x={26 * scale} y={(18.5 + bobY) * scale} width={1 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          </g>
        )}
      </g>
    );
  };

  // --- 6. 16-BIT SYMPTOM PROPS & VISUAL EFFECTS ---
  const renderSymptomProps = () => {
    // 0a. Lost Map (Upside-down map & spinning compass)
    if (isLostMap) {
      return (
        <g>
          {/* Upside Down Map held in front */}
          <g transform={`translate(${10 * scale}, ${(22 + bobY) * scale}) rotate(180, ${6 * scale}, ${6 * scale})`}>
            <rect x={0} y={0} width={12 * scale} height={9 * scale} fill="#FEF08A" stroke={P.OUTLINE} strokeWidth={0.5 * scale} rx={1} />
            <path d={`M ${2 * scale} ${2 * scale} L ${5 * scale} ${7 * scale} L ${9 * scale} ${3 * scale}`} fill="none" stroke={P.CORE_RED} strokeWidth={1 * scale} />
            <circle cx={9 * scale} cy={3 * scale} r={1 * scale} fill={P.CORE_CYAN} />
            <rect x={3 * scale} y={4 * scale} width={2 * scale} height={2 * scale} fill={P.CORE_GOLD_DARK} />
          </g>
          {/* Walking in circles indicator arrows */}
          <g opacity={frame % 2 === 0 ? 0.9 : 0.4} transform={`translate(${34 * scale}, ${(12 + bobY) * scale})`}>
            <path d={`M 0 4 A 4 4 0 1 1 6 6`} fill="none" stroke={P.CORE_GOLD} strokeWidth={1.5 * scale} strokeDasharray="3 2" />
            <polygon points={`6,6 8,4 4,4`} fill={P.CORE_GOLD} />
          </g>
        </g>
      );
    }

    // 0b. Smoke Cloud (Running through smoke & soot marks)
    if (isSmokeCloud) {
      return (
        <g>
          {/* Soot marks on pet face */}
          <g transform={`translate(${16 * scale}, ${(14 + bobY) * scale})`}>
            <circle cx={2 * scale} cy={2 * scale} r={1.5 * scale} fill="#334155" opacity={0.7} />
            <circle cx={14 * scale} cy={3 * scale} r={2 * scale} fill="#334155" opacity={0.8} />
            <circle cx={8 * scale} cy={8 * scale} r={1.2 * scale} fill="#334155" opacity={0.6} />
          </g>
          {/* Billowing Smoke Puffs around mascot */}
          <g opacity={frame % 2 === 0 ? 0.85 : 0.5}>
            <circle cx={(6 + (frame % 2)) * scale} cy={(16 - (frame % 3)) * scale} r={5 * scale} fill="#64748B" opacity={0.6} />
            <circle cx={(38 - (frame % 2)) * scale} cy={(14 - (frame % 2)) * scale} r={6 * scale} fill="#475569" opacity={0.7} />
            <circle cx={(24 + (frame % 3)) * scale} cy={(4 - (frame % 2)) * scale} r={7 * scale} fill="#334155" opacity={0.5} />
          </g>
        </g>
      );
    }

    // 0c. Shield Cracked (Cracked Shield & Defensive Stance)
    if (isShieldCracked) {
      return (
        <g>
          {/* Cracked Shield Prop */}
          <g transform={`translate(${16 * scale}, ${(22 + bobY) * scale})`}>
            <path d={`M 0 0 L ${16 * scale} 0 L ${16 * scale} ${10 * scale} L ${8 * scale} ${18 * scale} L 0 ${10 * scale} Z`} fill={P.CORE_RED_DARK} stroke={P.OUTLINE} strokeWidth={1 * scale} />
            <path d={`M ${1.5 * scale} ${1.5 * scale} L ${14.5 * scale} ${1.5 * scale} L ${14.5 * scale} ${9 * scale} L ${8 * scale} ${16.5 * scale} L ${1.5 * scale} ${9 * scale} Z`} fill={P.CORE_RED} />
            <path d={`M ${8 * scale} 0 L ${6 * scale} ${5 * scale} L ${10 * scale} ${9 * scale} L ${7 * scale} ${14 * scale}`} fill="none" stroke="#FEE2E2" strokeWidth={1.5 * scale} />
            <circle cx={4 * scale} cy={5 * scale} r={1.5 * scale} fill={P.CORE_GOLD_HL} />
          </g>
          {/* Defensive Energy Grid */}
          <ellipse cx={24 * scale} cy={(24 + bobY) * scale} rx={23 * scale} ry={21 * scale} fill="none" stroke={P.CORE_RED} strokeWidth={1.5 * scale} strokeDasharray="5 3" opacity={0.8} />
        </g>
      );
    }

    // 1. Failed Build Ice Pack & Toxic Drops
    if (isFailedBuild) {
      return (
        <g>
          {/* Ice Pack on Head */}
          <rect x={18 * scale} y={(2 + bobY) * scale} width={12 * scale} height={5 * scale} fill={P.CORE_CYAN_HL} rx={2} />
          <rect x={21 * scale} y={(0 + bobY) * scale} width={6 * scale} height={2 * scale} fill={P.CORE_RED} rx={1} />
          {/* Toxic Vapor Particles */}
          <g opacity={frame % 2 === 0 ? 0.9 : 0.4}>
            <circle cx={10 * scale} cy={(14 + bobY) * scale} r={1.5 * scale} fill={P.SICK_MID} />
            <circle cx={38 * scale} cy={(12 + bobY) * scale} r={2 * scale} fill={P.SICK_MID} />
          </g>
        </g>
      );
    }

    // 2. Vulnerability Cyber Shield
    if (isVulnerability) {
      return (
        <g>
          {/* Front Security Shield Badge */}
          <g transform={`translate(${18 * scale}, ${(25 + bobY) * scale})`}>
            <path d={`M 0 0 L ${12 * scale} 0 L ${12 * scale} ${8 * scale} L ${6 * scale} ${14 * scale} L 0 ${8 * scale} Z`} fill={P.CORE_CYAN_DARK} stroke={P.OUTLINE} strokeWidth={1 * scale} />
            <path d={`M ${1 * scale} ${1 * scale} L ${11 * scale} ${1 * scale} L ${11 * scale} ${7.5 * scale} L ${6 * scale} ${13 * scale} L ${1 * scale} ${7.5 * scale} Z`} fill={P.CORE_CYAN} />
            <rect x={4.5 * scale} y={4 * scale} width={3 * scale} height={4 * scale} fill={P.CORE_GOLD_HL} rx={0.5} />
            <rect x={5.2 * scale} y={2.5 * scale} width={1.6 * scale} height={2 * scale} fill="none" stroke={P.CORE_GOLD_HL} strokeWidth={0.8 * scale} />
          </g>
          {/* Cyber Energy Barrier Oval */}
          <ellipse cx={24 * scale} cy={(24 + bobY) * scale} rx={22 * scale} ry={20 * scale} fill="none" stroke={P.CORE_CYAN_HL} strokeWidth={1.5 * scale} strokeDasharray="6 3" opacity={0.7} />
        </g>
      );
    }

    // 3. Deploy Success Golden Party Crown & Shimmering Confetti
    if (isDeploySuccess || isPRApprovedReady) {
      return (
        <g>
          {/* Golden Party Crown */}
          <g transform={`translate(${17 * scale}, ${(1 + bobY) * scale})`}>
            <polygon points={`0,6 ${3 * scale},0 ${7 * scale},4 ${11 * scale},0 ${14 * scale},6`} fill={P.CORE_GOLD} stroke={P.OUTLINE} strokeWidth={0.5 * scale} />
            <circle cx={3 * scale} cy={1 * scale} r={1 * scale} fill={P.CORE_RED} />
            <circle cx={7 * scale} cy={4 * scale} r={1 * scale} fill={P.CORE_CYAN_HL} />
            <circle cx={11 * scale} cy={1 * scale} r={1 * scale} fill={P.CORE_RED} />
          </g>
          {/* Confetti Particles */}
          <rect x={(8 + ((frame % 3) * 2)) * scale} y={(6 + ((frame % 4) * 2)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.PINK_HL} />
          <rect x={(36 - ((frame % 3) * 2)) * scale} y={(8 + ((frame % 2) * 3)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.CORE_GOLD_HL} />
          <rect x={(40 - ((frame % 4) * 2)) * scale} y={(18 + ((frame % 3) * 2)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.CORE_CYAN_HL} />
        </g>
      );
    }

    // 4. PR Changes Requested (Review Clipboard)
    if (isPRChangesRequested) {
      return (
        <g>
          <g transform={`translate(${6 * scale}, ${(22 + bobY) * scale})`}>
            <rect x={0} y={0} width={8 * scale} height={12 * scale} fill={P.CORE_GOLD_DARK} rx={1} stroke={P.OUTLINE} strokeWidth={0.5 * scale} />
            <rect x={1 * scale} y={1 * scale} width={6 * scale} height={10 * scale} fill="#FFFFFF" />
            <rect x={2.5 * scale} y={-1.5 * scale} width={3 * scale} height={2 * scale} fill={P.METAL_HL} rx={0.5} />
            <line x1={2.5 * scale} y1={4 * scale} x2={5.5 * scale} y2={7 * scale} stroke={P.CORE_RED} strokeWidth={1 * scale} />
            <line x1={5.5 * scale} y1={4 * scale} x2={2.5 * scale} y2={7 * scale} stroke={P.CORE_RED} strokeWidth={1 * scale} />
          </g>
        </g>
      );
    }

    // 5. PR Pending Review (Hourglass Timer Bubble)
    if (isPRPendingReview) {
      return (
        <g transform={`translate(${38 * scale}, ${(6 + bobY) * scale})`}>
          <circle cx={4 * scale} cy={4 * scale} r={5 * scale} fill={P.PURPLE_LIGHT} stroke={P.OUTLINE} strokeWidth={0.8 * scale} />
          <path d={`M ${2.5 * scale} ${2 * scale} L ${5.5 * scale} ${2 * scale} L ${4 * scale} ${4 * scale} L ${5.5 * scale} ${6 * scale} L ${2.5 * scale} ${6 * scale} Z`} fill={P.CORE_GOLD_HL} />
        </g>
      );
    }

    // 6. Snoozing Nightcap & Floating Zs (Stale Branch)
    if (isSleeping) {
      return (
        <g>
          {/* Pixel Nightcap on Head */}
          <rect x={17 * scale} y={(2 + bobY) * scale} width={14 * scale} height={6 * scale} fill={P.PURPLE_LIGHT} rx={1} />
          <rect x={15 * scale} y={(6 + bobY) * scale} width={18 * scale} height={3 * scale} fill="#FFFFFF" rx={1} />
          <rect x={10 * scale} y={(1 + bobY) * scale} width={8 * scale} height={5 * scale} fill={P.PURPLE_DARK} rx={1} />
          <rect x={7 * scale} y={(2 + bobY) * scale} width={4 * scale} height={4 * scale} fill={P.CORE_GOLD_HL} rx={1} />

          {/* Floating Zzz Bubbles */}
          <g opacity={frame % 2 === 0 ? 0.95 : 0.6}>
            <rect x={36 * scale} y={(6 - (frame % 3)) * scale} width={5 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={39 * scale} y={(7.5 - (frame % 3)) * scale} width={2 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={36 * scale} y={(9 - (frame % 3)) * scale} width={5 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
          </g>
        </g>
      );
    }

    // 7. Behind Remote (Taut Cyber Leash & Strain)
    if (isBehind) {
      return (
        <g>
          <path
            d={`M ${35 * scale} ${(29 + bobY) * scale} Q ${42 * scale} ${(29 + bobY) * scale} ${46 * scale} ${(25 + (frame % 2)) * scale}`}
            fill="none"
            stroke={P.CORE_GOLD}
            strokeWidth={3}
            strokeDasharray="4 2"
          />
          {/* Sweatdrop */}
          <g transform={`translate(${37 * scale}, ${(10 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={1 * scale} fill={P.CORE_CYAN_HL} />
            <rect x={0} y={1 * scale} width={3 * scale} height={3 * scale} fill={P.CORE_CYAN} />
          </g>
        </g>
      );
    }

    // 8. Adventurer Backpack (Unpushed Work)
    if (isUnpushed) {
      return (
        <g transform={`translate(${7 * scale}, ${(24 + bobY) * scale})`}>
          <rect x={0} y={0} width={6 * scale} height={10 * scale} fill="#92400E" rx={1} />
          <rect x={1 * scale} y={1 * scale} width={4 * scale} height={8 * scale} fill="#D97706" />
          <rect x={2 * scale} y={4 * scale} width={2 * scale} height={2 * scale} fill={P.CORE_GOLD_HL} />
        </g>
      );
    }

    // 9. Merge Conflict Rainbow Wires
    if (isConflicted) {
      return (
        <g>
          <path
            d={`M ${10 * scale} ${(22 + bobY) * scale} L ${38 * scale} ${(32 + bobY) * scale} M ${10 * scale} ${(32 + bobY) * scale} L ${38 * scale} ${(22 + bobY) * scale}`}
            stroke={P.CORE_RED}
            strokeWidth="3"
            strokeDasharray="4 3"
          />
        </g>
      );
    }

    // 10. Destructive Hazard Siren
    if (isHazard) {
      return (
        <g>
          {/* Flashing Siren */}
          <rect
            x={22 * scale}
            y={(2 + bobY) * scale}
            width={4 * scale}
            height={5 * scale}
            fill={frame % 2 === 0 ? P.CORE_RED : P.CORE_GOLD_HL}
            rx={1}
          />
          <rect x={21 * scale} y={(7 + bobY) * scale} width={6 * scale} height={1 * scale} fill={P.OUTLINE} />

          {/* Mini Riot Shield */}
          <g transform={`translate(${20 * scale}, ${(28 + bobY) * scale})`}>
            <rect x={0} y={0} width={8 * scale} height={10 * scale} fill={P.CORE_RED} rx={2} />
            <rect x={1 * scale} y={1 * scale} width={6 * scale} height={8 * scale} fill="#991B1B" />
            <rect x={3 * scale} y={3 * scale} width={2 * scale} height={4 * scale} fill="#FFFFFF" />
          </g>
        </g>
      );
    }

    // 11. Detached Head Floating Halo
    if (isDetached) {
      return (
        <g>
          <rect x={17 * scale} y={(1 + bobY) * scale} width={14 * scale} height={2 * scale} fill={P.CORE_CYAN_HL} rx={1} />
          <rect x={16 * scale} y={(2 + bobY) * scale} width={16 * scale} height={1 * scale} fill={P.CORE_CYAN} />
        </g>
      );
    }

    // 12. Clean Sync Sparkles
    if (isClean) {
      return (
        <g>
          <g transform={`translate(${(39 + (frame % 2)) * scale}, ${(6 - (frame % 2)) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={4 * scale} fill={P.CORE_GREEN} />
            <rect x={0} y={1 * scale} width={3 * scale} height={1.5 * scale} fill={P.CORE_GREEN} />
            <rect x={1 * scale} y={1 * scale} width={1 * scale} height={1 * scale} fill={P.CORE_GREEN_HL} />
          </g>
          <g transform={`translate(${(5 - (frame % 2)) * scale}, ${(10 + (frame % 2)) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={4 * scale} fill={P.CORE_GREEN} />
            <rect x={0} y={1 * scale} width={3 * scale} height={1.5 * scale} fill={P.CORE_GREEN} />
            <rect x={1 * scale} y={1 * scale} width={1 * scale} height={1 * scale} fill={P.CORE_GREEN_HL} />
          </g>
        </g>
      );
    }

    return null;
  };

  // --- 7. 16-BIT WEARABLE ACCESSORIES ---
  const renderAccessory = () => {
    switch (accessory) {
      case 'headphones':
        return (
          <g>
            <rect x={12 * scale} y={(5.5 + bobY) * scale} width={24 * scale} height={3 * scale} fill={P.OUTLINE} rx={1} />
            {/* Left Ear-cup */}
            <rect x={5 * scale} y={(12.5 + bobY) * scale} width={5 * scale} height={10 * scale} fill={P.CORE_CYAN} rx={1.5} />
            <rect x={6 * scale} y={(14.5 + bobY) * scale} width={3 * scale} height={((frame % 3) + 4) * scale} fill={P.CORE_CYAN_HL} />
            {/* Right Ear-cup */}
            <rect x={38 * scale} y={(12.5 + bobY) * scale} width={5 * scale} height={10 * scale} fill={P.CORE_CYAN} rx={1.5} />
            <rect x={39 * scale} y={(14.5 + bobY) * scale} width={3 * scale} height={(((frame + 1) % 3) + 4) * scale} fill={P.CORE_CYAN_HL} />
          </g>
        );

      case 'cyber_visor':
        return (
          <g>
            <rect x={13 * scale} y={(12.5 + bobY) * scale} width={22 * scale} height={5 * scale} fill={P.CORE_CYAN} opacity={0.92} rx={1} />
            <rect x={14 * scale} y={(13.5 + bobY) * scale} width={20 * scale} height={3 * scale} fill="#EC4899" />
            <rect x={(15 + ((frame * 5) % 16)) * scale} y={(12.5 + bobY) * scale} width={3 * scale} height={5 * scale} fill="#FFFFFF" />
          </g>
        );

      case 'coffee_mug':
        return (
          <g transform={`translate(${34 * scale}, ${(27 + bobY) * scale})`}>
            <rect x={0} y={0} width={6 * scale} height={7 * scale} fill="#FFFFFF" rx={1} />
            <rect x={1 * scale} y={1 * scale} width={4 * scale} height={5 * scale} fill="#78350F" />
            <rect x={6 * scale} y={1 * scale} width={2 * scale} height={5 * scale} fill="#FFFFFF" />
            <rect x={2 * scale} y={2 * scale} width={2 * scale} height={3 * scale} fill={P.PINK_LIGHT} />
            <g opacity={frame % 2 === 0 ? 0.9 : 0.4}>
              <rect x={2 * scale} y={-3 * scale - (frame % 2) * scale} width={1 * scale} height={2 * scale} fill="#CBD5E1" />
              <rect x={4 * scale} y={-4 * scale - (frame % 2) * scale} width={1 * scale} height={2 * scale} fill="#CBD5E1" />
            </g>
          </g>
        );

      case 'gold_badge':
        return (
          <g transform={`translate(${22 * scale}, ${(29.5 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={4 * scale} height={6 * scale} fill={P.CORE_GOLD} rx={1} />
            <rect x={0} y={1 * scale} width={6 * scale} height={4 * scale} fill={P.CORE_GOLD} rx={1} />
            <rect x={2 * scale} y={2 * scale} width={2 * scale} height={2 * scale} fill={P.CORE_GOLD_HL} />
          </g>
        );

      case 'wizard_hat':
        return (
          <g transform={`translate(${14 * scale}, ${(0 + bobY) * scale})`}>
            <rect x={0} y={8 * scale} width={20 * scale} height={3 * scale} fill={P.PURPLE_DARK} rx={1} />
            <rect x={4 * scale} y={5 * scale} width={12 * scale} height={3 * scale} fill={P.PURPLE_MID} />
            <rect x={7 * scale} y={2 * scale} width={8 * scale} height={3 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={9 * scale} y={0} width={4 * scale} height={2 * scale} fill={P.PURPLE_HL} />
            <rect x={10 * scale} y={4 * scale} width={2 * scale} height={2 * scale} fill={P.CORE_GOLD_HL} />
          </g>
        );

      default:
        return null;
    }
  };

  // Squash & Stretch Motion Physics
  const getPhysics = () => {
    if (reactionType === 'pet') {
      return {
        scaleX: [1, 1.12, 0.94, 1.04, 1],
        scaleY: [1, 0.88, 1.10, 0.96, 1],
        y: [0, -10, 0],
      };
    }
    if (reactionType === 'coffee') {
      return {
        scaleX: [1, 0.92, 1.08, 0.98, 1],
        scaleY: [1, 1.14, 0.88, 1.02, 1],
        y: [0, -14, 0],
      };
    }
    if (reactionType === 'sparkle') {
      return {
        scaleX: [1, 1.08, 0.96, 1],
        scaleY: [1, 1.08, 0.96, 1],
        rotate: [0, -4, 4, 0],
      };
    }
    return {
      y: isUnsafe ? 0 : isHovered ? -5 : 0,
      scaleX: 1,
      scaleY: 1,
    };
  };

  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      animate={getPhysics()}
      transition={
        reactionType !== 'idle'
          ? { duration: 0.5, ease: 'easeOut' }
          : { duration: 0.2 }
      }
    >
      <svg
        viewBox="0 0 192 192"
        className="w-56 h-56 drop-shadow-xl overflow-visible select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* CRT Glass Diagonal Sheen Highlight */}
        <defs>
          <linearGradient id="crtGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 16-Bit Levitation Dock / Cushion */}
        {draw(dockPixels)}

        {/* Chubby Sitting Body & Feet */}
        {draw(bodyPixels)}

        {/* Swaying Antennas */}
        {draw(antennaPixels)}

        {/* Rounded TV Head Chassis & Bezel */}
        {draw(tvHeadPixels)}

        {/* Glass Screen Reflection Sheen Overlay */}
        <rect
          x={14 * scale}
          y={(11 + bobY) * scale}
          width={20 * scale}
          height={13 * scale}
          fill="url(#crtGlare)"
          pointerEvents="none"
          shapeRendering="crispEdges"
        />

        {/* High-Detail 16-Bit Anime Face & Eyes */}
        {renderFace()}

        {/* Symptom Props */}
        {renderSymptomProps()}

        {/* Wearable Accessories */}
        {renderAccessory()}
      </svg>
    </motion.div>
  );
};
