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

  // Breathing, floating, jitter & antenna physics
  const nervousJitterX = isFlakyTests ? (frame % 2 === 0 ? -1 : 1) : 0;
  const danceY = isDeploySuccess ? (frame % 2 === 0 ? -2 : 0) : 0;
  const bobY = (isSleeping ? (frame % 2 === 0 ? 0 : 1) : frame === 1 || frame === 3 ? -1 : 0) + danceY;
  const antWiggleL = frame === 1 ? -1 : frame === 3 ? 1 : 0;
  const antWiggleR = frame === 1 ? 1 : frame === 3 ? -1 : 0;

  // Eye tracking offset (-1, 0, 1)
  const lookX = Math.max(-1, Math.min(1, Math.round(mousePos.x / 2.2))) + nervousJitterX;
  const lookY = Math.max(-1, Math.min(1, Math.round(mousePos.y / 2.2)));

  // --- 16-BIT PROFESSIONAL PALETTE (4-5 shade ramps per color) ---
  const P = {
    // Outlines & Selective Outlining (Selout)
    OUTLINE: '#190628',
    OUTLINE_SOFT: '#2E0C42',
    OUTLINE_LIGHT: '#4A1869',

    // Ribbon Pink/Magenta Ramp (Left Body & Chassis)
    PINK_HL: '#FFAEE4',
    PINK_LIGHT: '#FF5BAE',
    PINK_MID: '#E61E7B',
    PINK_DARK: '#A80851',
    PINK_DEEP: '#690031',

    // Ribbon Purple/Violet Ramp (Right Body & Chassis)
    PURPLE_HL: '#E7BDFF',
    PURPLE_LIGHT: '#B868FF',
    PURPLE_MID: '#8725E6',
    PURPLE_DARK: '#590FB8',
    PURPLE_DEEP: '#35007A',

    // Sick Toxic Green Ramp (Failed Build)
    SICK_GREEN_HL: '#A7F3D0',
    SICK_GREEN: '#34D399',
    SICK_GREEN_DARK: '#059669',

    // Metallic Chassis Bezel (Titanium Slate Ramp)
    METAL_HL: '#94A3B8',
    METAL_LIGHT: '#64748B',
    METAL_MID: '#334155',
    METAL_DARK: '#1E293B',

    // CRT Screen Glass Display
    SCREEN_BG: isFailedBuild ? '#DCFCE7' : '#EDF2F7',
    SCREEN_LIGHT: '#FFFFFF',
    SCREEN_SHADOW: '#CBD5E1',
    SCREEN_GLARE: 'rgba(255, 255, 255, 0.45)',

    // Expressive Eyes & Face
    EYE_DARK: '#120926',
    EYE_IRIS: '#3B1566',
    EYE_SHINE: '#FFFFFF',
    EYE_SHINE_SUBTLE: '#E0C8FF',
    BLUSH: '#FF6492',
    BLUSH_SOFT: '#FFB8CF',
    LED_ORANGE: '#FF9900',
    LED_GREEN: '#10B981',
    LED_RED: '#EF4444',

    // Sitting Rug / Cushion Ramp
    RUG_HL: '#F3E8FF',
    RUG_LIGHT: '#D8B4FE',
    RUG_MID: '#A855F7',
    RUG_DARK: '#7E22CE',
    RUG_DEEP: '#581C87',
    RUG_SHADOW: '#3B0764',

    // Accent Ramps (Gold, Cyan, Red, Green)
    GOLD_HL: '#FEF08A',
    GOLD: '#F59E0B',
    GOLD_DARK: '#B45309',

    CYAN_HL: '#A5F3FC',
    CYAN: '#06B6D4',
    CYAN_DARK: '#0E7490',

    RED_HL: '#FCA5A5',
    RED: '#EF4444',
    RED_DARK: '#991B1B',

    GREEN_HL: '#6EE7B7',
    GREEN: '#10B981',
    GREEN_DARK: '#047857',
  };

  const scale = 4; // 4px per pixel grid unit (48x48 grid = 192x192 canvas)

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

  // --- 1. SITTING MAT / CLOUD RUG (High-detail 16-bit rounded pillow cushion) ---
  const rugPixels: PixelRect[] = [
    // Outer Selective Outline
    { x: 8, y: 39, w: 32, h: 6, c: P.OUTLINE },
    { x: 10, y: 38, w: 28, h: 8, c: P.OUTLINE },
    { x: 13, y: 37, w: 22, h: 10, c: P.OUTLINE },

    // Rug Base Layer (Dark Purple)
    { x: 9, y: 40, w: 30, h: 4, c: P.RUG_DARK },
    { x: 11, y: 39, w: 26, h: 6, c: P.RUG_MID },
    { x: 14, y: 38, w: 20, h: 8, c: P.RUG_LIGHT },

    // Top Highlight Surface
    { x: 15, y: 38, w: 18, h: 2, c: P.RUG_HL },
    { x: 12, y: 39, w: 24, h: 2, c: P.RUG_LIGHT },

    // Bottom Ambient Shadow Ramps
    { x: 11, y: 43, w: 26, h: 1, c: P.RUG_DEEP },
    { x: 13, y: 44, w: 22, h: 1, c: P.RUG_SHADOW },
  ];

  // --- 2. ROBOT CHUBBY BODY & SITTING PAWS ---
  const bodyPixels: PixelRect[] = [
    // Body Outline Frame
    { x: 15, y: 28, w: 18, h: 10, c: P.OUTLINE },
    { x: 16, y: 27, w: 16, h: 12, c: P.OUTLINE },

    // Left Body Half (Ribbon Pink 4-Tone Ramp or Sick Green Ramp)
    { x: 16, y: 28, w: 8, h: 10, c: isFailedBuild ? P.SICK_GREEN : P.PINK_MID },
    { x: 16, y: 28, w: 4, h: 8, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_LIGHT },
    { x: 17, y: 28, w: 2, h: 6, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_HL },
    { x: 16, y: 36, w: 8, h: 2, c: isFailedBuild ? P.SICK_GREEN_DARK : P.PINK_DARK },

    // Right Body Half (Ribbon Purple 4-Tone Ramp)
    { x: 24, y: 28, w: 8, h: 10, c: P.PURPLE_MID },
    { x: 24, y: 28, w: 4, h: 8, c: P.PURPLE_LIGHT },
    { x: 28, y: 28, w: 4, h: 10, c: P.PURPLE_DARK },
    { x: 24, y: 36, w: 8, h: 2, c: P.PURPLE_DEEP },

    // Center Chest Ribbon Core LED
    { x: 23, y: 30, w: 2, h: 4, c: P.OUTLINE },
    { x: 23, y: 31, w: 2, h: 2, c: isHazard || isFailedBuild ? P.RED : isClean || isDeploySuccess ? P.GREEN : P.GOLD },
    { x: 23, y: 31, w: 1, h: 1, c: P.GOLD_HL },

    // Left Cute Sitting Paw / Leg
    { x: 12, y: 32, w: 5, h: 6, c: P.OUTLINE },
    { x: 13, y: 33, w: 3, h: 4, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_LIGHT },
    { x: 13, y: 33, w: 2, h: 2, c: P.PINK_HL },
    { x: 13, y: 36, w: 3, h: 1, c: P.PINK_DARK },
    // Toe Pad Details
    { x: 13, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 15, y: 35, w: 1, h: 1, c: P.BLUSH },

    // Right Cute Sitting Paw / Leg
    { x: 31, y: 32, w: 5, h: 6, c: P.OUTLINE },
    { x: 32, y: 33, w: 3, h: 4, c: P.PURPLE_LIGHT },
    { x: 32, y: 33, w: 2, h: 2, c: P.PURPLE_HL },
    { x: 32, y: 36, w: 3, h: 1, c: P.PURPLE_DARK },
    // Toe Pad Details
    { x: 32, y: 35, w: 1, h: 1, c: P.BLUSH },
    { x: 34, y: 35, w: 1, h: 1, c: P.BLUSH },

    // Tiny Left Arm (Wave / Hold Position)
    { x: 13, y: 28, w: 3, h: 5, c: P.OUTLINE },
    { x: 14, y: 29, w: 1, h: 3, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_LIGHT },

    // Tiny Right Arm
    { x: 32, y: 28, w: 3, h: 5, c: P.OUTLINE },
    { x: 33, y: 29, w: 1, h: 3, c: P.PURPLE_LIGHT },
  ];

  // --- 3. RETRO TV HEAD CHASSIS & CRT BEZEL ---
  const tvHeadPixels: PixelRect[] = [
    // Outer TV Chassis Selective Outline
    { x: 10, y: 8, w: 28, h: 20, c: P.OUTLINE },
    { x: 9, y: 10, w: 30, h: 16, c: P.OUTLINE },
    { x: 12, y: 7, w: 24, h: 22, c: P.OUTLINE },

    // Left Ear Speaker Pad (Pink metallic speaker grille)
    { x: 6, y: 14, w: 4, h: 8, c: P.OUTLINE },
    { x: 7, y: 15, w: 2, h: 6, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_LIGHT },
    { x: 7, y: 15, w: 1, h: 6, c: P.PINK_HL },
    { x: 8, y: 16, w: 1, h: 4, c: P.PINK_DARK },

    // Right Ear Speaker Pad (Purple metallic speaker grille)
    { x: 38, y: 14, w: 4, h: 8, c: P.OUTLINE },
    { x: 39, y: 15, w: 2, h: 6, c: P.PURPLE_LIGHT },
    { x: 39, y: 15, w: 1, h: 6, c: P.PURPLE_HL },
    { x: 40, y: 16, w: 1, h: 4, c: P.PURPLE_DARK },

    // --- TV Chassis Left Half (Pink Dual Ramp or Sick Green Ramp) ---
    { x: 10, y: 8, w: 14, h: 20, c: isFailedBuild ? P.SICK_GREEN : P.PINK_MID },
    { x: 9, y: 10, w: 15, h: 16, c: isFailedBuild ? P.SICK_GREEN : P.PINK_MID },
    { x: 12, y: 7, w: 12, h: 22, c: isFailedBuild ? P.SICK_GREEN : P.PINK_MID },
    // Pink Highlights (Top-Left 16-bit Specular Curves)
    { x: 12, y: 8, w: 11, h: 2, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_HL },
    { x: 10, y: 10, w: 2, h: 14, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_HL },
    { x: 11, y: 9, w: 2, h: 2, c: '#FFFFFF' },

    // --- TV Chassis Right Half (Purple Dual Ramp) ---
    { x: 24, y: 8, w: 14, h: 20, c: P.PURPLE_MID },
    { x: 24, y: 10, w: 15, h: 16, c: P.PURPLE_MID },
    { x: 24, y: 7, w: 12, h: 22, c: P.PURPLE_MID },
    // Purple Shadows (Bottom-Right Ambient Occlusion Ramps)
    { x: 36, y: 10, w: 3, h: 16, c: P.PURPLE_DARK },
    { x: 14, y: 27, w: 22, h: 2, c: P.PURPLE_DEEP },

    // Screen Outer Bezel (Titanium Slate Inner Border)
    { x: 13, y: 10, w: 22, h: 16, c: P.METAL_DARK },
    { x: 12, y: 11, w: 24, h: 14, c: P.METAL_DARK },

    // Screen CRT Face (Clean Silver-Cream or Sick Light Green Display)
    { x: 14, y: 11, w: 20, h: 14, c: P.SCREEN_BG },
    { x: 13, y: 12, w: 22, h: 12, c: P.SCREEN_BG },

    // Screen Inner Rim Highlights & Glass Bevel
    { x: 14, y: 11, w: 20, h: 1, c: P.SCREEN_LIGHT },
    { x: 13, y: 12, w: 1, h: 11, c: P.SCREEN_LIGHT },
    { x: 14, y: 24, w: 20, h: 1, c: P.SCREEN_SHADOW },
    { x: 33, y: 12, w: 1, h: 12, c: P.SCREEN_SHADOW },

    // Power / Diagnostic Status LED (Bottom Center Bezel)
    { x: 23, y: 26, w: 2, h: 1, c: isHazard || isFailedBuild ? P.LED_RED : isClean || isDeploySuccess ? P.LED_GREEN : P.LED_ORANGE },
  ];

  // --- 4. 16-BIT SWAYING ANTENNAS WITH METALLIC GLOW ORBS ---
  const antennaPixels: PixelRect[] = [
    // Left Antenna Stem & Glowing Pink Orb
    { x: 16 + antWiggleL, y: 5, w: 2, h: 3, c: P.OUTLINE },
    { x: 15 + antWiggleL, y: 1, w: 4, h: 4, c: P.OUTLINE },
    { x: 16 + antWiggleL, y: 2, w: 2, h: 2, c: isFailedBuild ? P.SICK_GREEN_HL : P.PINK_LIGHT },
    { x: 16 + antWiggleL, y: 2, w: 1, h: 1, c: P.PINK_HL },

    // Right Antenna Stem & Glowing Purple Star/Orb
    { x: 30, y: 6, w: 2, h: 2, c: P.OUTLINE },
    { x: 31 + antWiggleR, y: 3, w: 2, h: 3, c: P.OUTLINE },
    { x: 31 + antWiggleR, y: 0, w: 5, h: 4, c: P.OUTLINE },
    { x: 32 + antWiggleR, y: 1, w: 3, h: 2, c: P.PURPLE_LIGHT },
    { x: 32 + antWiggleR, y: 1, w: 1, h: 1, c: P.PURPLE_HL },
  ];

  // --- 5. 16-BIT ULTRA-EXPRESSIVE ANIME FACE & EYES ---
  const renderFace = () => {
    // 1. Failed Build (Sick Pet with Dizzy x x Eyes & Thermometer in Mouth)
    if (isFailedBuild) {
      return (
        <g>
          {/* Left Sick 'x' Eye */}
          <line x1={16 * scale} y1={(14 + bobY) * scale} x2={20 * scale} y2={(18 + bobY) * scale} stroke={P.RED} strokeWidth={2 * scale} strokeLinecap="square" />
          <line x1={20 * scale} y1={(14 + bobY) * scale} x2={16 * scale} y2={(18 + bobY) * scale} stroke={P.RED} strokeWidth={2 * scale} strokeLinecap="square" />

          {/* Right Sick 'x' Eye */}
          <line x1={27 * scale} y1={(14 + bobY) * scale} x2={31 * scale} y2={(18 + bobY) * scale} stroke={P.RED} strokeWidth={2 * scale} strokeLinecap="square" />
          <line x1={31 * scale} y1={(14 + bobY) * scale} x2={27 * scale} y2={(18 + bobY) * scale} stroke={P.RED} strokeWidth={2 * scale} strokeLinecap="square" />

          {/* Green Sick Blush */}
          <rect x={14 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.SICK_GREEN} rx={1} />
          <rect x={30 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.SICK_GREEN} rx={1} />

          {/* Fever Thermometer sticking out of mouth */}
          <rect x={21 * scale} y={(20 + bobY) * scale} width={8 * scale} height={1.5 * scale} fill="#FFFFFF" stroke={P.OUTLINE} strokeWidth={0.5 * scale} />
          <rect x={27 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.RED} />
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

          {/* Nervous Sweatdrop near forehead */}
          <g transform={`translate(${33 * scale}, ${(9 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={1.5 * scale} height={1 * scale} fill={P.CYAN_HL} />
            <rect x={0} y={1 * scale} width={2.5 * scale} height={3 * scale} fill={P.CYAN} />
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

    // 3. Deploy Success (Celebratory Kawaii Joy ^ ^ Eyes)
    if (isDeploySuccess || reactionType === 'pet') {
      return (
        <g>
          {/* Left Joyful Arc Eye */}
          <rect x={16 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          <rect x={15 * scale} y={(17 + bobY) * scale} width={1.5 * scale} height={3 * scale} fill={P.EYE_DARK} />
          <rect x={20 * scale} y={(17 + bobY) * scale} width={1.5 * scale} height={3 * scale} fill={P.EYE_DARK} />

          {/* Right Joyful Arc Eye */}
          <rect x={27 * scale} y={(16 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          <rect x={26 * scale} y={(17 + bobY) * scale} width={1.5 * scale} height={3 * scale} fill={P.EYE_DARK} />
          <rect x={31 * scale} y={(17 + bobY) * scale} width={1.5 * scale} height={3 * scale} fill={P.EYE_DARK} />

          {/* Bright Blush Ovals */}
          <rect x={14 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />
          <rect x={30 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />

          {/* Open Happy Smile with Tongue */}
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={23 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.BLUSH} />
        </g>
      );
    }

    // A. Sleeping Face (Stale Branch)
    if (isSleeping) {
      return (
        <g>
          {/* Closed Curved Sleeping Eyes ^ _ ^ */}
          <rect x={16 * scale} y={(17 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          <rect x={27 * scale} y={(17 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          {/* Blush Bars */}
          <rect x={15 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH} rx={1} />
          <rect x={29 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH} rx={1} />
          {/* Cute Cat Snoozing Mouth (u_u) */}
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={1} />
        </g>
      );
    }

    // C. Natural Blinking Frame
    if (isBlinking) {
      return (
        <g>
          <rect x={16 * scale} y={(17 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          <rect x={27 * scale} y={(17 + bobY) * scale} width={5 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          <rect x={15 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH} rx={1} />
          <rect x={29 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.BLUSH} rx={1} />
          <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
        </g>
      );
    }

    // D. Conflicted / Dizzy Face (Merge Conflict)
    if (isConflicted) {
      return (
        <g>
          {/* Left Dizzy Spiral Eye */}
          <rect x={16 * scale} y={(15 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={17 * scale} y={(16 + bobY) * scale} width={3 * scale} height={3 * scale} fill={P.RED} />
          <rect x={18 * scale} y={(17 + bobY) * scale} width={1 * scale} height={1 * scale} fill="#FFFFFF" />

          {/* Right Dizzy Spiral Eye */}
          <rect x={27 * scale} y={(15 + bobY) * scale} width={5 * scale} height={5 * scale} fill={P.EYE_DARK} rx={1} />
          <rect x={28 * scale} y={(16 + bobY) * scale} width={3 * scale} height={3 * scale} fill={P.RED} />
          <rect x={29 * scale} y={(17 + bobY) * scale} width={1 * scale} height={1 * scale} fill="#FFFFFF" />

          {/* Squiggly Dizzy Mouth */}
          <rect x={21 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
          <rect x={23 * scale} y={(21 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
          <rect x={25 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1 * scale} fill={P.EYE_DARK} />
        </g>
      );
    }

    // E. Destructive Hazard (Alarmed Big Eyes)
    if (isHazard) {
      return (
        <g>
          {/* Left Alarmed Eye with Warning Pupil */}
          <rect x={16 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} fill="#FFFFFF" />
          <rect x={16 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} stroke={P.EYE_DARK} strokeWidth={scale} fill="none" />
          <rect x={18 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.RED} />

          {/* Right Alarmed Eye with Warning Pupil */}
          <rect x={27 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} fill="#FFFFFF" />
          <rect x={27 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} stroke={P.EYE_DARK} strokeWidth={scale} fill="none" />
          <rect x={28 * scale} y={(16 + bobY) * scale} width={2 * scale} height={3 * scale} fill={P.RED} />

          {/* Trembling 'O' Mouth */}
          <rect x={22 * scale} y={(20 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
        </g>
      );
    }

    // F. DEFAULT: High-Detail 16-Bit Glossy Anime Eyes with Sub-pixel Glints
    const eyeL_X = 16 + lookX;
    const eyeL_Y = 15 + lookY;
    const eyeR_X = 27 + lookX;
    const eyeR_Y = 15 + lookY;

    return (
      <g>
        {/* Left Glossy Anime Eye (5x6 Grid) */}
        <rect x={16 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} fill={P.EYE_DARK} rx={1.5} />
        {/* Left Eye Bottom Iris Tone */}
        <rect x={16 * scale} y={(18 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_IRIS} />
        {/* Left Eye Primary Glint (Top Left Specular Sparkle) */}
        <rect x={(eyeL_X) * scale} y={(eyeL_Y + bobY) * scale} width={2 * scale} height={2 * scale} fill={P.EYE_SHINE} />
        {/* Left Eye Secondary Glint (Bottom Right Micro-dot) */}
        <rect x={(eyeL_X + 2) * scale} y={(eyeL_Y + 2 + bobY) * scale} width={1 * scale} height={1 * scale} fill={P.EYE_SHINE_SUBTLE} />

        {/* Right Glossy Anime Eye (5x6 Grid) */}
        <rect x={27 * scale} y={(14 + bobY) * scale} width={5 * scale} height={6 * scale} fill={P.EYE_DARK} rx={1.5} />
        {/* Right Eye Bottom Iris Tone */}
        <rect x={27 * scale} y={(18 + bobY) * scale} width={5 * scale} height={2 * scale} fill={P.EYE_IRIS} />
        {/* Right Eye Primary Glint */}
        <rect x={(eyeR_X) * scale} y={(eyeR_Y + bobY) * scale} width={2 * scale} height={2 * scale} fill={P.EYE_SHINE} />
        {/* Right Eye Secondary Glint */}
        <rect x={(eyeR_X + 2) * scale} y={(eyeR_Y + 2 + bobY) * scale} width={1 * scale} height={1 * scale} fill={P.EYE_SHINE_SUBTLE} />

        {/* Cute Cheeks Blush */}
        <rect x={14 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />
        <rect x={30 * scale} y={(19 + bobY) * scale} width={4 * scale} height={2 * scale} fill={P.BLUSH} rx={1} />

        {/* Cute Mouth Expression */}
        {reactionType === 'coffee' ? (
          <g>
            <rect x={22 * scale} y={(19 + bobY) * scale} width={4 * scale} height={3 * scale} fill={P.EYE_DARK} rx={1} />
            <rect x={23 * scale} y={(20 + bobY) * scale} width={2 * scale} height={1.5 * scale} fill={P.BLUSH} />
          </g>
        ) : (
          <g>
            {/* Cute Cat W-mouth curve */}
            <rect x={22 * scale} y={(20 + bobY) * scale} width={4 * scale} height={1.5 * scale} fill={P.EYE_DARK} rx={1} />
            <rect x={21 * scale} y={(19 + bobY) * scale} width={1 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
            <rect x={26 * scale} y={(19 + bobY) * scale} width={1 * scale} height={1.5 * scale} fill={P.EYE_DARK} />
          </g>
        )}
      </g>
    );
  };

  // --- 6. PROPS & SYMPTOM VISUALIZATIONS ---
  const renderSymptomProps = () => {
    // 1. Failed Build Ice Pack & Toxic Drops
    if (isFailedBuild) {
      return (
        <g>
          {/* Ice Pack on Head */}
          <rect x={18 * scale} y={(2 + bobY) * scale} width={12 * scale} height={5 * scale} fill={P.CYAN_HL} rx={2} />
          <rect x={21 * scale} y={(0 + bobY) * scale} width={6 * scale} height={2 * scale} fill={P.RED} rx={1} />
          {/* Toxic Sick Vapor Particles */}
          <g opacity={frame % 2 === 0 ? 0.9 : 0.4}>
            <circle cx={10 * scale} cy={(14 + bobY) * scale} r={1.5 * scale} fill={P.SICK_GREEN} />
            <circle cx={38 * scale} cy={(12 + bobY) * scale} r={2 * scale} fill={P.SICK_GREEN} />
          </g>
        </g>
      );
    }

    // 2. Vulnerability Cyber Shield
    if (isVulnerability) {
      return (
        <g>
          {/* Front Metallic Security Shield Badge */}
          <g transform={`translate(${18 * scale}, ${(25 + bobY) * scale})`}>
            {/* Shield Outline */}
            <path d={`M 0 0 L ${12 * scale} 0 L ${12 * scale} ${8 * scale} L ${6 * scale} ${14 * scale} L 0 ${8 * scale} Z`} fill={P.CYAN_DARK} stroke={P.OUTLINE} strokeWidth={1 * scale} />
            {/* Shield Surface */}
            <path d={`M ${1 * scale} ${1 * scale} L ${11 * scale} ${1 * scale} L ${11 * scale} ${7.5 * scale} L ${6 * scale} ${13 * scale} L ${1 * scale} ${7.5 * scale} Z`} fill={P.CYAN} />
            {/* Center Security Lock Emblem */}
            <rect x={4.5 * scale} y={4 * scale} width={3 * scale} height={4 * scale} fill={P.GOLD_HL} rx={0.5} />
            <rect x={5.2 * scale} y={2.5 * scale} width={1.6 * scale} height={2 * scale} fill="none" stroke={P.GOLD_HL} strokeWidth={0.8 * scale} />
          </g>
          {/* Cyber Energy Barrier Oval */}
          <ellipse cx={24 * scale} cy={(24 + bobY) * scale} rx={22 * scale} ry={20 * scale} fill="none" stroke={P.CYAN_HL} strokeWidth={1.5 * scale} strokeDasharray="6 3" opacity={0.7} />
        </g>
      );
    }

    // 3. Deploy Success Golden Party Crown & Confetti
    if (isDeploySuccess) {
      return (
        <g>
          {/* Golden Party Crown */}
          <g transform={`translate(${17 * scale}, ${(1 + bobY) * scale})`}>
            <polygon points={`0,6 ${3 * scale},0 ${7 * scale},4 ${11 * scale},0 ${14 * scale},6`} fill={P.GOLD} stroke={P.OUTLINE} strokeWidth={0.5 * scale} />
            <circle cx={3 * scale} cy={1 * scale} r={1 * scale} fill={P.RED} />
            <circle cx={7 * scale} cy={4 * scale} r={1 * scale} fill={P.CYAN_HL} />
            <circle cx={11 * scale} cy={1 * scale} r={1 * scale} fill={P.RED} />
          </g>
          {/* Confetti Particles */}
          <rect x={(8 + (frame % 3 * 2)) * scale} y={(6 + (frame % 4 * 2)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.PINK_HL} />
          <rect x={(36 - (frame % 3 * 2)) * scale} y={(8 + (frame % 2 * 3)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.GOLD_HL} />
          <rect x={(40 - (frame % 4 * 2)) * scale} y={(18 + (frame % 3 * 2)) * scale} width={1.5 * scale} height={1.5 * scale} fill={P.CYAN_HL} />
        </g>
      );
    }

    // Snoozing Nightcap & Floating Zs
    if (isSleeping) {
      return (
        <g>
          {/* Pixel Nightcap on Head */}
          <rect x={17 * scale} y={(2 + bobY) * scale} width={14 * scale} height={6 * scale} fill={P.PURPLE_LIGHT} rx={1} />
          <rect x={15 * scale} y={(6 + bobY) * scale} width={18 * scale} height={3 * scale} fill="#FFFFFF" rx={1} />
          <rect x={10 * scale} y={(1 + bobY) * scale} width={8 * scale} height={5 * scale} fill={P.PURPLE_DARK} rx={1} />
          <rect x={7 * scale} y={(2 + bobY) * scale} width={4 * scale} height={4 * scale} fill={P.GOLD_HL} rx={1} />

          {/* Floating Zzz Bubbles */}
          <g opacity={frame % 2 === 0 ? 0.95 : 0.6}>
            <rect x={36 * scale} y={(6 - (frame % 3)) * scale} width={5 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={39 * scale} y={(7.5 - (frame % 3)) * scale} width={2 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={36 * scale} y={(9 - (frame % 3)) * scale} width={5 * scale} height={1.5 * scale} fill={P.PURPLE_LIGHT} />
          </g>
        </g>
      );
    }

    // Behind Remote (Cyber Leash Strain)
    if (isBehind) {
      return (
        <g>
          <path
            d={`M ${35 * scale} ${(30 + bobY) * scale} Q ${42 * scale} ${(30 + bobY) * scale} ${46 * scale} ${(26 + (frame % 2)) * scale}`}
            fill="none"
            stroke={P.GOLD}
            strokeWidth={3}
            strokeDasharray="4 2"
          />
          {/* Sweatdrop */}
          <g transform={`translate(${37 * scale}, ${(10 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={1 * scale} fill={P.CYAN_HL} />
            <rect x={0} y={1 * scale} width={3 * scale} height={3 * scale} fill={P.CYAN} />
          </g>
        </g>
      );
    }

    // Adventurer Backpack (Unpushed Work)
    if (isUnpushed) {
      return (
        <g transform={`translate(${7 * scale}, ${(24 + bobY) * scale})`}>
          <rect x={0} y={0} width={6 * scale} height={10 * scale} fill="#92400E" rx={1} />
          <rect x={1 * scale} y={1 * scale} width={4 * scale} height={8 * scale} fill="#D97706" />
          <rect x={2 * scale} y={4 * scale} width={2 * scale} height={2 * scale} fill={P.GOLD_HL} />
        </g>
      );
    }

    // Merge Conflict Rainbow Wires
    if (isConflicted) {
      return (
        <g>
          <path
            d={`M ${10 * scale} ${(22 + bobY) * scale} L ${38 * scale} ${(32 + bobY) * scale} M ${10 * scale} ${(32 + bobY) * scale} L ${38 * scale} ${(22 + bobY) * scale}`}
            stroke={P.RED}
            strokeWidth="3"
            strokeDasharray="4 3"
          />
        </g>
      );
    }

    // Destructive Hazard Siren & Shield
    if (isHazard) {
      return (
        <g>
          {/* Flashing Siren */}
          <rect
            x={22 * scale}
            y={(2 + bobY) * scale}
            width={4 * scale}
            height={5 * scale}
            fill={frame % 2 === 0 ? P.RED : P.GOLD_HL}
            rx={1}
          />
          <rect x={21 * scale} y={(7 + bobY) * scale} width={6 * scale} height={1 * scale} fill={P.OUTLINE} />

          {/* Mini Riot Shield */}
          <g transform={`translate(${20 * scale}, ${(28 + bobY) * scale})`}>
            <rect x={0} y={0} width={8 * scale} height={10 * scale} fill={P.RED} rx={2} />
            <rect x={1 * scale} y={1 * scale} width={6 * scale} height={8 * scale} fill="#991B1B" />
            <rect x={3 * scale} y={3 * scale} width={2 * scale} height={4 * scale} fill="#FFFFFF" />
          </g>
        </g>
      );
    }

    // Detached Head Floating Halo
    if (isDetached) {
      return (
        <g>
          <rect x={17 * scale} y={(1 + bobY) * scale} width={14 * scale} height={2 * scale} fill={P.CYAN_HL} rx={1} />
          <rect x={16 * scale} y={(2 + bobY) * scale} width={16 * scale} height={1 * scale} fill={P.CYAN} />
        </g>
      );
    }

    // Clean Sync Sparkles
    if (isClean) {
      return (
        <g>
          <g transform={`translate(${(39 + (frame % 2)) * scale}, ${(6 - (frame % 2)) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={4 * scale} fill={P.GREEN} />
            <rect x={0} y={1 * scale} width={3 * scale} height={1.5 * scale} fill={P.GREEN} />
            <rect x={1 * scale} y={1 * scale} width={1 * scale} height={1 * scale} fill={P.GREEN_HL} />
          </g>
          <g transform={`translate(${(5 - (frame % 2)) * scale}, ${(10 + (frame % 2)) * scale})`}>
            <rect x={1 * scale} y={0} width={1 * scale} height={4 * scale} fill={P.GREEN} />
            <rect x={0} y={1 * scale} width={3 * scale} height={1.5 * scale} fill={P.GREEN} />
            <rect x={1 * scale} y={1 * scale} width={1 * scale} height={1 * scale} fill={P.GREEN_HL} />
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
            <rect x={12 * scale} y={(6 + bobY) * scale} width={24 * scale} height={3 * scale} fill={P.OUTLINE} rx={1} />
            {/* Left Ear-cup */}
            <rect x={6 * scale} y={(13 + bobY) * scale} width={5 * scale} height={10 * scale} fill={P.CYAN} rx={1.5} />
            <rect x={7 * scale} y={(15 + bobY) * scale} width={3 * scale} height={(frame % 3 + 4) * scale} fill={P.CYAN_HL} />
            {/* Right Ear-cup */}
            <rect x={37 * scale} y={(13 + bobY) * scale} width={5 * scale} height={10 * scale} fill={P.CYAN} rx={1.5} />
            <rect x={38 * scale} y={(15 + bobY) * scale} width={3 * scale} height={((frame + 1) % 3 + 4) * scale} fill={P.CYAN_HL} />
          </g>
        );

      case 'cyber_visor':
        return (
          <g>
            <rect x={13 * scale} y={(13 + bobY) * scale} width={22 * scale} height={5 * scale} fill={P.CYAN} opacity={0.92} rx={1} />
            <rect x={14 * scale} y={(14 + bobY) * scale} width={20 * scale} height={3 * scale} fill="#EC4899" />
            <rect x={(15 + ((frame * 5) % 16)) * scale} y={(13 + bobY) * scale} width={3 * scale} height={5 * scale} fill="#FFFFFF" />
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
          <g transform={`translate(${22 * scale}, ${(30 + bobY) * scale})`}>
            <rect x={1 * scale} y={0} width={4 * scale} height={6 * scale} fill={P.GOLD} rx={1} />
            <rect x={0} y={1 * scale} width={6 * scale} height={4 * scale} fill={P.GOLD} rx={1} />
            <rect x={2 * scale} y={2 * scale} width={2 * scale} height={2 * scale} fill={P.GOLD_HL} />
          </g>
        );

      case 'wizard_hat':
        return (
          <g transform={`translate(${14 * scale}, ${(0 + bobY) * scale})`}>
            <rect x={0} y={8 * scale} width={20 * scale} height={3 * scale} fill={P.PURPLE_DARK} rx={1} />
            <rect x={4 * scale} y={5 * scale} width={12 * scale} height={3 * scale} fill={P.PURPLE_MID} />
            <rect x={7 * scale} y={2 * scale} width={8 * scale} height={3 * scale} fill={P.PURPLE_LIGHT} />
            <rect x={9 * scale} y={0} width={4 * scale} height={2 * scale} fill={P.PURPLE_HL} />
            <rect x={10 * scale} y={4 * scale} width={2 * scale} height={2 * scale} fill={P.GOLD_HL} />
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
        scaleX: [1, 1.14, 0.92, 1.05, 1],
        scaleY: [1, 0.86, 1.12, 0.96, 1],
        y: [0, -12, 0],
      };
    }
    if (reactionType === 'coffee') {
      return {
        scaleX: [1, 0.9, 1.1, 0.98, 1],
        scaleY: [1, 1.16, 0.86, 1.02, 1],
        y: [0, -16, 0],
      };
    }
    if (reactionType === 'sparkle') {
      return {
        scaleX: [1, 1.1, 0.95, 1],
        scaleY: [1, 1.1, 0.95, 1],
        rotate: [0, -5, 5, 0],
      };
    }
    return {
      y: isUnsafe ? 0 : isHovered ? -6 : 0,
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
        className="w-56 h-56 drop-shadow-lg overflow-visible select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* CRT Glass Diagonal Sheen Highlight */}
        <defs>
          <linearGradient id="crtGlare" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 16-Bit Cloud Cushion / Rug */}
        {draw(rugPixels)}

        {/* Chubby Sitting Body & Feet */}
        {draw(bodyPixels)}

        {/* Swaying Antennas */}
        {draw(antennaPixels)}

        {/* Rounded TV Head Chassis & Slate Bezel */}
        {draw(tvHeadPixels)}

        {/* Glass Screen Reflection Sheen Overlay */}
        <rect
          x={14 * scale}
          y={(11 + bobY) * scale}
          width={20 * scale}
          height={14 * scale}
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
