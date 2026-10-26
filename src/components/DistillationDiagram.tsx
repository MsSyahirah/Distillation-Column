import React from 'react';
import { EquipmentComponent, HydraulicPhenomenon, ThemeMode } from '../types/distillation';
import { EQUIPMENT_COMPONENTS } from '../data/distillationData';

interface DistillationDiagramProps {
  theme: ThemeMode;
  showLabels: boolean;
  selectedComponentId?: string | null;
  onSelectComponent?: (comp: EquipmentComponent) => void;
  isPlaying?: boolean;
  speed?: number; // 0.5, 1, 1.5, 2
  reducedMotion?: boolean;
  activeFlowStep?: number | null; // 1 to 5
  vapourSpeedFactor?: number;
  liquidSpeedFactor?: number;
  vapourDensity?: 'low' | 'normal' | 'high';
  reboilerLevel?: 'low' | 'normal' | 'high';
  refluxDrumLevel?: 'low' | 'normal' | 'high';
  hydraulicPhenomenon?: HydraulicPhenomenon;
  highlightedIds?: string[];
  isLabellingMode?: boolean;
  droppedLabels?: Record<string, string>;
  activeHotspotId?: string | null;
  onHotspotClick?: (spotId: string) => void;
}

export const DistillationDiagram: React.FC<DistillationDiagramProps> = ({
  theme,
  showLabels,
  selectedComponentId,
  onSelectComponent,
  isPlaying = true,
  speed = 1,
  reducedMotion = false,
  activeFlowStep = null,
  vapourSpeedFactor = 1,
  liquidSpeedFactor = 1,
  vapourDensity = 'normal',
  reboilerLevel = 'normal',
  refluxDrumLevel = 'normal',
  hydraulicPhenomenon = 'none',
  highlightedIds = [],
  isLabellingMode = false,
  droppedLabels = {},
  activeHotspotId = null,
  onHotspotClick
}) => {
  const isDark = theme === 'dcs-dark';

  // Theme-aware color variables
  const vesselStroke = isDark ? '#94A3B8' : '#334155';
  const vesselFill = isDark ? '#1E293B' : '#F1F5F9';
  const trayMetal = isDark ? '#64748B' : '#94A3B8';
  const liquidFill = isDark ? '#0284C7' : '#0EA5E9';
  const liquidStroke = '#0284C7';
  const vapourStroke = '#F97316';
  const feedStroke = '#10B981';
  const pipeStroke = isDark ? '#475569' : '#CBD5E1';
  const textFill = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';

  // Animation duration calculation
  const baseVapourDuration = reducedMotion || !isPlaying ? 0 : 2 / (speed * vapourSpeedFactor);
  const baseLiquidDuration = reducedMotion || !isPlaying ? 0 : 2 / (speed * liquidSpeedFactor);

  const getStrokeDashStyle = (duration: number, reverse: boolean = false) => {
    if (duration === 0) return {};
    return {
      strokeDasharray: '8 8',
      animation: `${reverse ? 'flow-backward' : 'flow-forward'} ${duration}s linear infinite`
    };
  };

  const isHighlighted = (id: string) => {
    if (selectedComponentId === id) return true;
    if (highlightedIds.includes(id)) return true;
    return false;
  };

  const handleComponentClick = (id: string) => {
    if (isLabellingMode && onHotspotClick) {
      onHotspotClick(id);
      return;
    }
    if (onSelectComponent) {
      const comp = EQUIPMENT_COMPONENTS.find((c) => c.id === id);
      if (comp) onSelectComponent(comp);
    }
  };

  // Reboiler & Drum liquid heights
  const reboilerLiquidHeight = reboilerLevel === 'high' ? 36 : reboilerLevel === 'low' ? 16 : 26;
  const drumLiquidHeight = refluxDrumLevel === 'high' ? 30 : refluxDrumLevel === 'low' ? 12 : 22;

  // Tray liquid pool height based on phenomenon
  const trayLiquidHeight =
    hydraulicPhenomenon === 'dumping'
      ? 1.5
      : hydraulicPhenomenon === 'weeping'
      ? 4
      : hydraulicPhenomenon === 'flooding'
      ? 38
      : 6;

  const trayOffsets = [0, 55, 110, 165, 220];

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-opacity-50 select-none">
      <svg
        viewBox="0 0 820 620"
        className="w-full h-auto max-h-[580px] drop-shadow-sm transition-all"
        style={{ touchAction: 'manipulation' }}
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="arrow-vapour"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#F97316" />
          </marker>
          <marker
            id="arrow-liquid"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
          </marker>
          <marker
            id="arrow-feed"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#10B981" />
          </marker>

          {/* Gradients */}
          <linearGradient id="vapourGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#FB923C" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="foamGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#FDE68A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="columnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={isDark ? '#1E293B' : '#F8FAFC'} />
            <stop offset="50%" stopColor={isDark ? '#0F172A' : '#FFFFFF'} />
            <stop offset="100%" stopColor={isDark ? '#1E293B' : '#F8FAFC'} />
          </linearGradient>

          {/* Filter for glow */}
          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38BDF8" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* ================= BACKGROUND GRID (Process mimic feel) ================= */}
        <g opacity={isDark ? 0.15 : 0.08}>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={isDark ? '#64748B' : '#94A3B8'} strokeWidth="0.5" />
          </pattern>
          <rect width="820" height="620" fill="url(#grid)" />
        </g>

        {/* ================= CONNECTING PROCESS PIPES (Base Gray) ================= */}
        <g stroke={pipeStroke} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Feed Pipe into Column */}
          <path d="M 120 330 L 260 330" />

          {/* Top Vapour Outlet pipe from Tower to Condenser */}
          <path d="M 330 110 L 330 75 L 500 75" />

          {/* Condenser Outlet to Reflux Drum */}
          <path d="M 570 105 L 570 170" />

          {/* Reflux Drum bottom outlet to Split Tee */}
          <path d="M 570 230 L 570 260" />

          {/* Split Tee to Distillate Product */}
          <path d="M 570 260 L 710 260" />

          {/* Split Tee to Reflux Line (going left back to Column top) */}
          <path d="M 570 260 L 450 260 L 450 170 L 390 170" />

          {/* Column Bottoms to Reboiler Line */}
          <path d="M 330 510 L 330 550 L 440 550" />

          {/* Reboiler Vapour return line into Column base */}
          <path d="M 470 450 L 470 430 L 390 430" />

          {/* Bottoms Product Outlet pipe */}
          <path d="M 530 550 L 680 550" />
        </g>

        {/* ================= ANIMATED FLOW STREAM OVERLAYS ================= */}
        {/* 1. Feed Stream (Emerald / Green) */}
        <g className="transition-opacity duration-300">
          <path
            d="M 120 330 L 255 330"
            stroke={feedStroke}
            strokeWidth="4"
            fill="none"
            style={getStrokeDashStyle(baseLiquidDuration)}
          />
          <circle cx="120" cy="330" r="4" fill={feedStroke} />
        </g>

        {/* 2. Top Overhead Vapour Stream (Amber / Orange, or mixed cyan carry-over during Flooding) */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 2 && activeFlowStep !== 3 && activeFlowStep !== 4 ? 0.3 : 1}
        >
          <path
            d="M 330 110 L 330 75 L 495 75"
            stroke={hydraulicPhenomenon === 'flooding' ? '#0284C7' : vapourStroke}
            strokeWidth={vapourDensity === 'high' ? 6 : vapourDensity === 'low' ? 3 : 4}
            fill="none"
            markerEnd={hydraulicPhenomenon === 'flooding' ? 'url(#arrow-liquid)' : 'url(#arrow-vapour)'}
            style={getStrokeDashStyle(baseVapourDuration)}
          />
        </g>

        {/* 3. Condensed Liquid to Drum */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 4 && activeFlowStep !== 5 ? 0.3 : 1}
        >
          <path
            d="M 570 105 L 570 165"
            stroke={liquidStroke}
            strokeWidth="4"
            fill="none"
            markerEnd="url(#arrow-liquid)"
            style={getStrokeDashStyle(baseLiquidDuration)}
          />
        </g>

        {/* 4. Reflux Liquid Returning to Top Tray (Leftward & Upward) */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 3 && activeFlowStep !== 5 ? 0.3 : 1}
        >
          <path
            d="M 570 260 L 450 260 L 450 170 L 395 170"
            stroke={liquidStroke}
            strokeWidth={liquidSpeedFactor > 1.4 ? 6 : 4}
            fill="none"
            markerEnd="url(#arrow-liquid)"
            style={getStrokeDashStyle(baseLiquidDuration, true)}
          />
        </g>

        {/* 5. Distillate Take-off Stream (Rightward) */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 5 ? 0.3 : 1}
        >
          <path
            d="M 570 260 L 705 260"
            stroke={liquidStroke}
            strokeWidth="4"
            fill="none"
            markerEnd="url(#arrow-liquid)"
            style={getStrokeDashStyle(baseLiquidDuration)}
          />
        </g>

        {/* 6. Bottom Liquid to Reboiler */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 2 ? 0.3 : 1}
        >
          <path
            d="M 330 510 L 330 550 L 435 550"
            stroke={liquidStroke}
            strokeWidth="4"
            fill="none"
            markerEnd="url(#arrow-liquid)"
            style={getStrokeDashStyle(baseLiquidDuration)}
          />
        </g>

        {/* 7. Reboiler Boiled Vapour Return Line */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 2 && activeFlowStep !== 3 ? 0.3 : 1}
        >
          <path
            d="M 470 450 L 470 430 L 395 430"
            stroke={vapourStroke}
            strokeWidth={vapourDensity === 'high' ? 6 : vapourDensity === 'low' ? 3 : 4}
            fill="none"
            markerEnd="url(#arrow-vapour)"
            style={getStrokeDashStyle(baseVapourDuration, true)}
          />
        </g>

        {/* 8. Bottoms Product Stream */}
        <g
          className="transition-opacity duration-300"
          opacity={activeFlowStep && activeFlowStep !== 2 ? 0.3 : 1}
        >
          <path
            d="M 530 550 L 675 550"
            stroke={liquidStroke}
            strokeWidth="4"
            fill="none"
            markerEnd="url(#arrow-liquid)"
            style={getStrokeDashStyle(baseLiquidDuration)}
          />
        </g>

        {/* ================= EQUIPMENT: DISTILLATION COLUMN (C-101) ================= */}
        <g
          id="comp-column-shell"
          className="cursor-pointer group"
          onClick={() => handleComponentClick('column-shell')}
          filter={isHighlighted('column-shell') ? 'url(#activeGlow)' : undefined}
        >
          {/* Main Tower Body with rounded heads */}
          <path
            d="M 270 140 C 270 100, 390 100, 390 140 L 390 490 C 390 530, 270 530, 270 490 Z"
            fill="url(#columnGrad)"
            stroke={isHighlighted('column-shell') ? '#38BDF8' : vesselStroke}
            strokeWidth={isHighlighted('column-shell') ? '4' : '3'}
          />

          {/* Skirt / Base support legs */}
          <path d="M 275 495 L 265 545" stroke={vesselStroke} strokeWidth="4" />
          <path d="M 385 495 L 395 545" stroke={vesselStroke} strokeWidth="4" />
          <line x1="260" y1="545" x2="400" y2="545" stroke={vesselStroke} strokeWidth="3" />

          {/* Column Sump liquid holdup (Higher during Dumping or Weeping) */}
          {(() => {
            const sumpTopY =
              hydraulicPhenomenon === 'dumping'
                ? 448
                : hydraulicPhenomenon === 'weeping' || hydraulicPhenomenon === 'flooding'
                ? 460
                : 475;
            return (
              <>
                <path
                  d={`M 271 ${sumpTopY} C 271 ${sumpTopY}, 330 ${sumpTopY + 5}, 389 ${sumpTopY} L 389 490 C 389 528, 271 528, 271 490 Z`}
                  fill="url(#liquidGrad)"
                  opacity="0.85"
                />
                <line
                  x1="275"
                  y1={sumpTopY}
                  x2="385"
                  y2={sumpTopY}
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
              </>
            );
          })()}
        </g>

        {/* ================= COLUMN INTERNALS: TRAYS & DOWNCOMERS ================= */}
        <g
          id="comp-trays-downcomers"
          className="cursor-pointer"
          onClick={() => handleComponentClick('trays-downcomers')}
          filter={isHighlighted('trays-downcomers') ? 'url(#activeGlow)' : undefined}
        >
          {/* FLOODING FULL COLUMN SUBMERGENCE OVERLAY */}
          {hydraulicPhenomenon === 'flooding' && (
            <g className={reducedMotion ? '' : 'animate-flood-surge'}>
              <rect
                x="272"
                y="135"
                width="116"
                height="330"
                rx="6"
                fill="url(#liquidGrad)"
                opacity="0.72"
              />
              {/* Downcomers completely choked with backed-up liquid */}
              <rect x="365" y="170" width="23" height="240" fill="#0284C7" opacity="0.9" />
              <rect x="272" y="170" width="23" height="240" fill="#0284C7" opacity="0.9" />
            </g>
          )}

          {/* 5 Representational Trays */}
          {trayOffsets.map((offsetY, idx) => {
            const isRightDowncomer = idx % 2 === 0;
            const deckX1 = isRightDowncomer ? 272 : 295;
            const deckX2 = isRightDowncomer ? 365 : 388;
            const weirX = isRightDowncomer ? 365 : 295;
            const downcomerX = isRightDowncomer ? 375 : 285;

            return (
              <g key={idx} transform={`translate(0, ${offsetY})`}>
                {/* Tray deck (perforated sieve plate) */}
                <line x1={deckX1} y1="180" x2={deckX2} y2="180" stroke={trayMetal} strokeWidth="3.5" />
                {/* Sieve holes representation */}
                <line
                  x1={deckX1 + 8}
                  y1="180"
                  x2={deckX2 - 8}
                  y2="180"
                  stroke={isDark ? '#F8FAFC' : '#0F172A'}
                  strokeWidth="1.5"
                  strokeDasharray="2 4"
                />
                {/* Weir dam */}
                <line x1={weirX} y1="180" x2={weirX} y2="172" stroke={trayMetal} strokeWidth="2.5" />
                {/* Downcomer chute going down to next tray */}
                <line
                  x1={downcomerX}
                  y1="180"
                  x2={downcomerX}
                  y2="235"
                  stroke={trayMetal}
                  strokeWidth="2"
                  strokeDasharray="2 2"
                />

                {/* Liquid pool on tray */}
                <rect
                  x={isRightDowncomer ? 273 : 295}
                  y={180 - trayLiquidHeight}
                  width="92"
                  height={trayLiquidHeight}
                  fill={liquidFill}
                  opacity={hydraulicPhenomenon === 'dumping' ? 0.35 : 0.75}
                />

                {/* FOAMING LAYER ON TRAY */}
                {hydraulicPhenomenon === 'foaming' && (
                  <g className={reducedMotion ? '' : 'animate-foam-swell'}>
                    <rect
                      x={isRightDowncomer ? 273 : 295}
                      y="154"
                      width="92"
                      height="20"
                      rx="4"
                      fill="url(#foamGrad)"
                      opacity="0.9"
                    />
                    {/* Frothy bubbles inside foam layer */}
                    <circle cx={deckX1 + 18} cy="164" r="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <circle cx={deckX1 + 32} cy="160" r="4.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <circle cx={deckX1 + 48} cy="165" r="3.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <circle cx={deckX1 + 64} cy="159" r="4.5" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    <circle cx={deckX1 + 78} cy="163" r="4" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
                    {/* Foam spilling into downcomer */}
                    <circle cx={downcomerX} cy="188" r="4" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
                  </g>
                )}

                {/* ENTRAINMENT LIQUID SPRAY CARRYOVER */}
                {hydraulicPhenomenon === 'entrainment' && idx > 0 && (
                  <g className={reducedMotion ? '' : 'animate-spray-up'}>
                    <circle cx={deckX1 + 22} cy="172" r="2.8" fill="#38BDF8" />
                    <circle cx={deckX1 + 45} cy="165" r="3.2" fill="#0284C7" />
                    <circle cx={deckX1 + 68} cy="170" r="2.8" fill="#38BDF8" />
                    <path
                      d={`M ${deckX1 + 35} 174 L ${deckX1 + 35} 142`}
                      stroke="#38BDF8"
                      strokeWidth="1.8"
                      strokeDasharray="2 3"
                      markerEnd="url(#arrow-liquid)"
                    />
                    <path
                      d={`M ${deckX1 + 60} 174 L ${deckX1 + 60} 142`}
                      stroke="#38BDF8"
                      strokeWidth="1.8"
                      strokeDasharray="2 3"
                      markerEnd="url(#arrow-liquid)"
                    />
                  </g>
                )}

                {/* WEEPING DRIPS THROUGH TRAY HOLES */}
                {hydraulicPhenomenon === 'weeping' && (
                  <g className={reducedMotion ? '' : 'animate-weep-drip'}>
                    <circle cx={deckX1 + 20} cy="186" r="2.5" fill="#0284C7" />
                    <circle cx={deckX1 + 48} cy="192" r="2.5" fill="#38BDF8" />
                    <circle cx={deckX1 + 72} cy="184" r="2.5" fill="#0284C7" />
                  </g>
                )}

                {/* DUMPING HEAVY STREAMS THROUGH TRAY HOLES */}
                {hydraulicPhenomenon === 'dumping' && (
                  <g>
                    <line
                      x1={deckX1 + 18}
                      y1="181"
                      x2={deckX1 + 18}
                      y2="232"
                      stroke="#0284C7"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      className={reducedMotion ? '' : 'animate-dump-stream'}
                    />
                    <line
                      x1={deckX1 + 46}
                      y1="181"
                      x2={deckX1 + 46}
                      y2="232"
                      stroke="#38BDF8"
                      strokeWidth="3.5"
                      strokeDasharray="6 4"
                      className={reducedMotion ? '' : 'animate-dump-stream'}
                    />
                    <line
                      x1={deckX1 + 74}
                      y1="181"
                      x2={deckX1 + 74}
                      y2="232"
                      stroke="#0284C7"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      className={reducedMotion ? '' : 'animate-dump-stream'}
                    />
                  </g>
                )}

                {/* Feed inlet nozzle mark on middle tray */}
                {idx === 2 && <circle cx="270" cy="180" r="3.5" fill={feedStroke} />}
              </g>
            );
          })}

          {/* Vapour rising through trays (Animated upward bubbling glyphs) */}
          {isPlaying && !reducedMotion && hydraulicPhenomenon !== 'dumping' && (
            <g opacity="0.85">
              <circle cx="310" cy="380" r="3" fill="#FB923C" className="animate-bubble-pulse" />
              <circle cx="340" cy="375" r="2.5" fill="#FB923C" className="animate-bubble-pulse" />
              <circle cx="325" cy="325" r="3.5" fill="#FB923C" className="animate-bubble-pulse" />
              <circle cx="355" cy="270" r="3" fill="#FB923C" className="animate-bubble-pulse" />
              <circle cx="315" cy="215" r="2.5" fill="#FB923C" className="animate-bubble-pulse" />
              <circle cx="335" cy="155" r="3" fill="#FB923C" className="animate-bubble-pulse" />

              {/* Liquid droplet falling through downcomers (disabled during Dumping since downcomers run dry) */}
              <circle cx="375" cy="205" r="2.5" fill="#38BDF8" className="animate-liquid-drop" />
              <circle cx="285" cy="260" r="2.5" fill="#38BDF8" className="animate-liquid-drop" />
              <circle cx="375" cy="315" r="2.5" fill="#38BDF8" className="animate-liquid-drop" />
              <circle cx="285" cy="370" r="2.5" fill="#38BDF8" className="animate-liquid-drop" />
              <circle cx="375" cy="425" r="2.5" fill="#38BDF8" className="animate-liquid-drop" />
            </g>
          )}

          {/* Explanatory Counter-current Direction Arrows inside tower */}
          <g opacity={isDark ? 0.75 : 0.85}>
            {/* Vapour rising indication (faint during dumping/weeping) */}
            <g opacity={hydraulicPhenomenon === 'dumping' ? 0.2 : hydraulicPhenomenon === 'weeping' ? 0.45 : 1}>
              <path d="M 320 440 L 320 405" stroke="#F97316" strokeWidth="2" markerEnd="url(#arrow-vapour)" />
              <path d="M 340 350 L 340 315" stroke="#F97316" strokeWidth="2" markerEnd="url(#arrow-vapour)" />
              <path d="M 325 255 L 325 220" stroke="#F97316" strokeWidth="2" markerEnd="url(#arrow-vapour)" />
              <path d="M 330 160 L 330 130" stroke="#F97316" strokeWidth="2" markerEnd="url(#arrow-vapour)" />
            </g>

            {/* Liquid falling indication in downcomers (hidden during dumping) */}
            {hydraulicPhenomenon !== 'dumping' && (
              <g>
                <path d="M 375 195 L 375 225" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
                <path d="M 285 250 L 285 280" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
                <path d="M 375 305 L 375 335" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
                <path d="M 285 360 L 285 390" stroke="#0284C7" strokeWidth="2" markerEnd="url(#arrow-liquid)" />
              </g>
            )}
          </g>

          {/* ACTIVE HYDRAULIC PHENOMENON BADGE OVERLAY ON TOWER */}
          {hydraulicPhenomenon !== 'none' && (
            <g transform="translate(155, 195)">
              <rect
                x="-95"
                y="-16"
                width="190"
                height="32"
                rx="6"
                fill={isDark ? '#451A03' : '#FEF3C7'}
                stroke="#F59E0B"
                strokeWidth="2"
              />
              <text
                x="0"
                y="4"
                fill={isDark ? '#FDE68A' : '#92400E'}
                fontSize="10"
                fontWeight="800"
                textAnchor="middle"
              >
                {hydraulicPhenomenon === 'foaming' && '⚠ TRAY FOAMING ACTIVE'}
                {hydraulicPhenomenon === 'entrainment' && '⚠ LIQUID ENTRAINMENT'}
                {hydraulicPhenomenon === 'weeping' && '⚠ TRAY WEEPING ACTIVE'}
                {hydraulicPhenomenon === 'dumping' && '⚠ SEVERE TRAY DUMPING'}
                {hydraulicPhenomenon === 'flooding' && '⚠ COLUMN FLOODING (HIGH ΔP)'}
              </text>
              <line x1="95" y1="0" x2="115" y2="0" stroke="#F59E0B" strokeWidth="2" strokeDasharray="3 2" />
            </g>
          )}
        </g>

        {/* ================= EQUIPMENT: FEED INLET NOZZLE & VALVE ================= */}
        <g
          id="comp-feed-inlet"
          className="cursor-pointer"
          onClick={() => handleComponentClick('feed-inlet')}
          filter={isHighlighted('feed-inlet') ? 'url(#activeGlow)' : undefined}
        >
          {/* Feed Nozzle flange */}
          <rect x="256" y="322" width="6" height="16" fill={trayMetal} stroke={vesselStroke} strokeWidth="1" />
          {/* Feed Valve symbol */}
          <polygon points="175,322 195,338 195,322 175,338" fill={isDark ? '#334155' : '#E2E8F0'} stroke={vesselStroke} strokeWidth="1.5" />
          <line x1="185" y1="330" x2="185" y2="318" stroke={vesselStroke} strokeWidth="2" />
          <circle cx="185" cy="316" r="4" fill={feedStroke} />
          {/* Feed Source Box */}
          <rect x="60" y="315" width="60" height="30" rx="4" fill={isDark ? '#1E293B' : '#FFFFFF'} stroke={feedStroke} strokeWidth="2" />
          <text x="90" y="334" fill={feedStroke} fontSize="11" fontWeight="700" textAnchor="middle">FEED</text>
        </g>

        {/* ================= EQUIPMENT: OVERHEAD CONDENSER (E-101) ================= */}
        <g
          id="comp-overhead-condenser"
          className="cursor-pointer"
          onClick={() => handleComponentClick('overhead-condenser')}
          filter={isHighlighted('overhead-condenser') ? 'url(#activeGlow)' : undefined}
        >
          <rect
            x="500"
            y="48"
            width="140"
            height="55"
            rx="12"
            fill={vesselFill}
            stroke={isHighlighted('overhead-condenser') ? '#38BDF8' : vesselStroke}
            strokeWidth={isHighlighted('overhead-condenser') ? '3.5' : '2.5'}
          />
          <line x1="530" y1="52" x2="530" y2="99" stroke={trayMetal} strokeWidth="1.5" />
          <line x1="570" y1="52" x2="570" y2="99" stroke={trayMetal} strokeWidth="1.5" />
          <line x1="610" y1="52" x2="610" y2="99" stroke={trayMetal} strokeWidth="1.5" />
          <path d="M 525 35 L 525 48" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arrow-liquid)" />
          <path d="M 615 48 L 615 35" stroke="#38BDF8" strokeWidth="3" markerEnd="url(#arrow-liquid)" />
          <text x="525" y="28" fill="#38BDF8" fontSize="9" fontWeight="600" textAnchor="middle">CW IN (Cold)</text>
          <text x="615" y="28" fill="#38BDF8" fontSize="9" fontWeight="600" textAnchor="middle">CW OUT</text>
          <text x="570" y="80" fill={textFill} fontSize="11" fontWeight="700" textAnchor="middle">
            CONDENSER
          </text>
        </g>

        {/* ================= EQUIPMENT: REFLUX DRUM (V-101) ================= */}
        <g
          id="comp-reflux-drum"
          className="cursor-pointer"
          onClick={() => handleComponentClick('reflux-drum')}
          filter={isHighlighted('reflux-drum') ? 'url(#activeGlow)' : undefined}
        >
          <rect
            x="515"
            y="170"
            width="110"
            height="60"
            rx="20"
            fill={vesselFill}
            stroke={isHighlighted('reflux-drum') ? '#38BDF8' : vesselStroke}
            strokeWidth={isHighlighted('reflux-drum') ? '3.5' : '2.5'}
          />
          <rect x="530" y="230" width="12" height="12" fill={vesselStroke} />
          <rect x="595" y="230" width="12" height="12" fill={vesselStroke} />
          <path
            d={`M 525 ${230 - drumLiquidHeight} L 615 ${230 - drumLiquidHeight} A 15 15 0 0 1 625 220 L 515 220 A 15 15 0 0 1 525 ${230 - drumLiquidHeight} Z`}
            fill="url(#liquidGrad)"
            opacity="0.85"
          />
          <text x="570" y="200" fill={textFill} fontSize="11" fontWeight="700" textAnchor="middle">
            REFLUX DRUM
          </text>
          <text x="570" y="215" fill={textMuted} fontSize="9" textAnchor="middle">
            (Accumulator)
          </text>
        </g>

        {/* ================= EQUIPMENT: REFLUX LINE & VALVE ================= */}
        <g
          id="comp-reflux-line"
          className="cursor-pointer"
          onClick={() => handleComponentClick('reflux-line')}
          filter={isHighlighted('reflux-line') ? 'url(#activeGlow)' : undefined}
        >
          <circle cx="500" cy="260" r="14" fill={isDark ? '#334155' : '#E2E8F0'} stroke={vesselStroke} strokeWidth="2" />
          <polygon points="494,252 508,260 494,268" fill="#0284C7" />
          <polygon points="420,162 436,178 436,162 420,178" fill={isDark ? '#334155' : '#E2E8F0'} stroke={vesselStroke} strokeWidth="1.5" />
          <line x1="428" y1="170" x2="428" y2="158" stroke={vesselStroke} strokeWidth="2" />
          <circle cx="428" cy="156" r="3.5" fill="#0284C7" />
          <rect x="400" y="132" width="75" height="18" rx="3" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke="#0284C7" strokeWidth="1" />
          <text x="437" y="145" fill="#0284C7" fontSize="10" fontWeight="700" textAnchor="middle">
            ▼ REFLUX
          </text>
        </g>

        {/* ================= EQUIPMENT: DISTILLATE OUTLET ================= */}
        <g
          id="comp-distillate-outlet"
          className="cursor-pointer"
          onClick={() => handleComponentClick('distillate-outlet')}
          filter={isHighlighted('distillate-outlet') ? 'url(#activeGlow)' : undefined}
        >
          <polygon points="630,252 646,268 646,252 630,268" fill={isDark ? '#334155' : '#E2E8F0'} stroke={vesselStroke} strokeWidth="1.5" />
          <line x1="638" y1="260" x2="638" y2="248" stroke={vesselStroke} strokeWidth="2" />
          <circle cx="638" cy="246" r="3.5" fill="#0284C7" />
          <rect x="690" y="245" width="115" height="30" rx="4" fill={isDark ? '#1E293B' : '#FFFFFF'} stroke="#0284C7" strokeWidth="2" />
          <text x="747" y="264" fill="#0284C7" fontSize="10" fontWeight="700" textAnchor="middle">
            ► DISTILLATE (Top)
          </text>
        </g>

        {/* ================= EQUIPMENT: REBOILER (E-102) ================= */}
        <g
          id="comp-reboiler"
          className="cursor-pointer"
          onClick={() => handleComponentClick('reboiler')}
          filter={isHighlighted('reboiler') ? 'url(#activeGlow)' : undefined}
        >
          <rect
            x="440"
            y="450"
            width="130"
            height="70"
            rx="18"
            fill={vesselFill}
            stroke={isHighlighted('reboiler') ? '#38BDF8' : vesselStroke}
            strokeWidth={isHighlighted('reboiler') ? '3.5' : '2.5'}
          />
          <path
            d="M 455 490 Q 470 475, 485 490 T 515 490 T 545 490"
            fill="none"
            stroke="#EF4444"
            strokeWidth="3.5"
          />
          <path d="M 455 450 L 455 435" stroke="#EF4444" strokeWidth="2.5" markerEnd="url(#arrow-vapour)" />
          <text x="455" y="428" fill="#EF4444" fontSize="9" fontWeight="600" textAnchor="middle">STEAM IN</text>
          <path d="M 545 520 L 545 535" stroke="#94A3B8" strokeWidth="2" />
          <text x="545" y="546" fill={textMuted} fontSize="8" textAnchor="middle">CONDENSATE</text>

          <path
            d={`M 445 ${520 - reboilerLiquidHeight} L 565 ${520 - reboilerLiquidHeight} A 10 10 0 0 1 570 515 L 440 515 A 10 10 0 0 1 445 ${520 - reboilerLiquidHeight} Z`}
            fill="url(#liquidGrad)"
            opacity="0.75"
          />
          <text x="505" y="475" fill={textFill} fontSize="11" fontWeight="700" textAnchor="middle">
            REBOILER
          </text>
          <text x="505" y="505" fill="#EF4444" fontSize="8" fontWeight="600" textAnchor="middle">
            ▲ Heat Source
          </text>
        </g>

        {/* ================= EQUIPMENT: BOTTOMS OUTLET ================= */}
        <g
          id="comp-bottoms-outlet"
          className="cursor-pointer"
          onClick={() => handleComponentClick('bottoms-outlet')}
          filter={isHighlighted('bottoms-outlet') ? 'url(#activeGlow)' : undefined}
        >
          <polygon points="600,542 616,558 616,542 600,558" fill={isDark ? '#334155' : '#E2E8F0'} stroke={vesselStroke} strokeWidth="1.5" />
          <line x1="608" y1="550" x2="608" y2="538" stroke={vesselStroke} strokeWidth="2" />
          <circle cx="608" cy="536" r="3.5" fill="#6366F1" />
          <rect x="670" y="535" width="130" height="30" rx="4" fill={isDark ? '#1E293B' : '#FFFFFF'} stroke="#6366F1" strokeWidth="2" />
          <text x="735" y="554" fill="#6366F1" fontSize="10" fontWeight="700" textAnchor="middle">
            ▼ BOTTOMS (Heavy)
          </text>
        </g>

        {/* ================= COMPONENT LABELS / ANNOTATIONS ================= */}
        {showLabels && !isLabellingMode && (
          <g className="transition-opacity duration-300">
            <g transform="translate(330, 95)">
              <rect x="-65" y="-12" width="130" height="22" rx="4" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={vesselStroke} strokeWidth="1.5" />
              <text x="0" y="4" fill={textFill} fontSize="10" fontWeight="700" textAnchor="middle">
                TOWER (C-101)
              </text>
            </g>

            {hydraulicPhenomenon === 'none' && (
              <g transform="translate(230, 240)">
                <rect x="-55" y="-12" width="95" height="22" rx="4" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={trayMetal} strokeWidth="1.5" />
                <text x="-7" y="3" fill={textFill} fontSize="9" fontWeight="600" textAnchor="middle">
                  Trays & Weirs
                </text>
                <line x1="40" y1="0" x2="55" y2="0" stroke={trayMetal} strokeWidth="1.5" />
              </g>
            )}

            <g transform="translate(190, 305)">
              <rect x="-45" y="-10" width="90" height="20" rx="3" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={feedStroke} strokeWidth="1.5" />
              <text x="0" y="4" fill={feedStroke} fontSize="9" fontWeight="700" textAnchor="middle">
                ▶ Feed Inlet
              </text>
            </g>

            <g transform="translate(420, 65)">
              <rect x="-55" y="-10" width="110" height="20" rx="3" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={vapourStroke} strokeWidth="1.5" />
              <text x="0" y="4" fill={vapourStroke} fontSize="9" fontWeight="700" textAnchor="middle">
                ▲ Rising Vapour
              </text>
            </g>

            <g transform="translate(440, 420)">
              <rect x="-50" y="-10" width="100" height="20" rx="3" fill={isDark ? '#0F172A' : '#FFFFFF'} stroke={vapourStroke} strokeWidth="1.5" />
              <text x="0" y="4" fill={vapourStroke} fontSize="9" fontWeight="700" textAnchor="middle">
                ▲ Boiled Vapour
              </text>
            </g>
          </g>
        )}

        {/* ================= LABELLING ACTIVITY DROP TARGET ZONES ================= */}
        {isLabellingMode && (
          <g>
            {EQUIPMENT_COMPONENTS.map((comp) => {
              const dropped = droppedLabels[comp.id];
              const isTargetActive = activeHotspotId === comp.id;
              const { labelX, labelY } = comp.targetRegion;

              return (
                <g
                  key={comp.id}
                  transform={`translate(${labelX}, ${labelY})`}
                  className="cursor-pointer group"
                  onClick={() => onHotspotClick && onHotspotClick(comp.id)}
                >
                  <rect
                    x="-65"
                    y="-16"
                    width="130"
                    height="32"
                    rx="6"
                    fill={dropped ? (isDark ? '#064E3B' : '#DCFCE7') : isTargetActive ? (isDark ? '#0369A1' : '#E0F2FE') : (isDark ? '#1E293B' : '#F1F5F9')}
                    stroke={dropped ? '#10B981' : isTargetActive ? '#0284C7' : (isDark ? '#64748B' : '#94A3B8')}
                    strokeWidth={isTargetActive ? '2.5' : '1.5'}
                    strokeDasharray={dropped ? 'none' : '4 3'}
                  />
                  <text
                    x="0"
                    y="4"
                    fill={dropped ? (isDark ? '#6EE7B7' : '#15803D') : textFill}
                    fontSize="10"
                    fontWeight="700"
                    textAnchor="middle"
                  >
                    {dropped ? dropped : isTargetActive ? 'Click label below' : '? Drop / Click Here'}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* ================= DUAL-CODED LEGEND (Bottom Left) ================= */}
        <g transform="translate(20, 560)">
          <rect
            x="0"
            y="0"
            width="250"
            height="46"
            rx="6"
            fill={isDark ? '#0F172A' : '#FFFFFF'}
            stroke={vesselStroke}
            strokeWidth="1"
            opacity="0.9"
          />
          <g transform="translate(14, 18)">
            <line x1="0" y1="0" x2="22" y2="0" stroke={vapourStroke} strokeWidth="3.5" markerEnd="url(#arrow-vapour)" />
            <text x="32" y="4" fill={vapourStroke} fontSize="11" fontWeight="700">
              ▲ Vapour (Gas)
            </text>
          </g>
          <g transform="translate(132, 18)">
            <line x1="0" y1="0" x2="22" y2="0" stroke={liquidStroke} strokeWidth="3.5" markerEnd="url(#arrow-liquid)" />
            <text x="32" y="4" fill={liquidStroke} fontSize="11" fontWeight="700">
              ▼ Liquid (Condensate)
            </text>
          </g>
          <text x="14" y="38" fill={textMuted} fontSize="9">
            Notice: Dual-coded with color, arrow directions, and explicit labels.
          </text>
        </g>
      </svg>
    </div>
  );
};
