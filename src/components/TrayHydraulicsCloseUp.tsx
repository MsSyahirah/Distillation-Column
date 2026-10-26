import React from 'react';
import { HydraulicPhenomenon, ThemeMode } from '../types/distillation';

interface TrayHydraulicsCloseUpProps {
  theme: ThemeMode;
  phenomenon: HydraulicPhenomenon;
  reducedMotion: boolean;
  isApplied: boolean;
  symptomTitle: string;
  symptomDescription: string;
}

export const TrayHydraulicsCloseUp: React.FC<TrayHydraulicsCloseUpProps> = ({
  theme,
  phenomenon,
  reducedMotion,
  isApplied,
  symptomTitle,
  symptomDescription
}) => {
  const isDark = theme === 'dcs-dark';
  const activePhenomenon: HydraulicPhenomenon = isApplied ? phenomenon : 'none';

  const wallStroke = isDark ? '#94A3B8' : '#334155';
  const metalStroke = isDark ? '#CBD5E1' : '#475569';
  const textFill = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';

  // Perforation X coordinates on lower tray (x from 100 to 340)
  const holeX = [130, 165, 200, 235, 270, 305];

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white border-slate-200'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500 block">
            Magnified Internal Cross-Section (2 Sieve Trays)
          </span>
          <h4 className="text-sm font-bold">
            {isApplied ? symptomTitle : 'Normal Baseline Tray Hydraulics (Healthy Bubbling Contact)'}
          </h4>
        </div>

        <span
          className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
            activePhenomenon === 'none'
              ? isDark
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
              : isDark
              ? 'bg-amber-950/70 border-amber-600 text-amber-300'
              : 'bg-amber-50 border-amber-400 text-amber-900'
          }`}
        >
          {activePhenomenon === 'none' ? 'NORMAL TRAY ACTION' : `ACTIVE: ${activePhenomenon.toUpperCase()}`}
        </span>
      </div>

      {/* Magnified SVG Cross-Section of Two Trays */}
      <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-950/70">
        <svg viewBox="0 0 520 250" className="w-full h-auto max-h-[250px]">
          <defs>
            <marker
              id="closeup-vapour"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#F97316" />
            </marker>
            <marker
              id="closeup-liquid"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <linearGradient id="closeupLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.82" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="closeupFoam" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.96" />
              <stop offset="65%" stopColor="#FDE68A" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Column Left & Right Shell Walls */}
          <line x1="50" y1="10" x2="50" y2="240" stroke={wallStroke} strokeWidth="5" />
          <line x1="450" y1="10" x2="450" y2="240" stroke={wallStroke} strokeWidth="5" />

          {/* ================= FLOODING SUBMERGENCE BACKGROUND ================= */}
          {activePhenomenon === 'flooding' && (
            <g className={reducedMotion ? '' : 'animate-flood-surge'}>
              {/* Deep backed-up liquid filling entire space between trays and downcomers */}
              <rect x="53" y="25" width="394" height="205" fill="url(#closeupLiquid)" opacity="0.78" />
              <text x="245" y="128" fill="#FFFFFF" fontSize="12" fontWeight="800" textAnchor="middle">
                ⚠ DOWNCOMERS CHOKED · TRAYS SUBMERGED IN LIQUID
              </text>
            </g>
          )}

          {/* ================= UPPER TRAY (TRAY n - Upper Stage) ================= */}
          <g>
            {/* Upper Tray Deck (x: 52 to 340, y: 65) with perforations */}
            <line x1="52" y1="65" x2="340" y2="65" stroke={metalStroke} strokeWidth="4" />
            {holeX.map((hx) => (
              <rect
                key={`up-${hx}`}
                x={hx - 6}
                y="62"
                width="12"
                height="6"
                fill={isDark ? '#090D16' : '#F8FAFC'}
              />
            ))}
            {/* Upper Outlet Weir at x=340 */}
            <line x1="340" y1="65" x2="340" y2="45" stroke={metalStroke} strokeWidth="3.5" />
            {/* Upper Downcomer Apron (sloped chute from x=395 to x=385, y=65 to y=165) */}
            <line x1="395" y1="45" x2="385" y2="165" stroke={metalStroke} strokeWidth="3" />

            {/* Liquid Pool on Upper Tray */}
            <rect
              x="53"
              y={activePhenomenon === 'dumping' ? 61 : activePhenomenon === 'weeping' ? 53 : 45}
              width="287"
              height={activePhenomenon === 'dumping' ? 4 : activePhenomenon === 'weeping' ? 12 : 20}
              fill="url(#closeupLiquid)"
            />

            {/* Liquid Flowing Down the Right Downcomer Chute (Except during Dumping) */}
            {activePhenomenon !== 'dumping' && (
              <g>
                <path
                  d="M 340 48 Q 368 50, 368 95 L 368 180"
                  stroke="#0284C7"
                  strokeWidth={activePhenomenon === 'flooding' ? 28 : 10}
                  fill="none"
                  opacity="0.8"
                />
                <path
                  d="M 418 75 L 418 155"
                  stroke="#0284C7"
                  strokeWidth="2.5"
                  markerEnd="url(#closeup-liquid)"
                />
                <text x="418" y="68" fill="#0284C7" fontSize="9" fontWeight="700" textAnchor="middle">
                  ▼ Downcomer
                </text>
              </g>
            )}
            {activePhenomenon === 'dumping' && (
              <text x="395" y="115" fill="#EF4444" fontSize="9" fontWeight="700" textAnchor="middle">
                Dry Downcomer
              </text>
            )}
          </g>

          {/* ================= LOWER TRAY (TRAY n+1 - Main Inspected Stage) ================= */}
          <g>
            {/* Lower Tray Deck (x: 100 to 448, y: 185) with perforations */}
            <line x1="100" y1="185" x2="448" y2="185" stroke={metalStroke} strokeWidth="4" />
            {holeX.map((hx) => (
              <rect
                key={`low-${hx}`}
                x={hx - 6}
                y="182"
                width="12"
                height="6"
                fill={isDark ? '#090D16' : '#F8FAFC'}
              />
            ))}
            {/* Lower Outlet Weir on Left at x=100 */}
            <line x1="100" y1="185" x2="100" y2="165" stroke={metalStroke} strokeWidth="3.5" />

            {/* Liquid Pool on Lower Tray */}
            <rect
              x="100"
              y={activePhenomenon === 'dumping' ? 181 : activePhenomenon === 'weeping' ? 173 : 163}
              width="347"
              height={activePhenomenon === 'dumping' ? 4 : activePhenomenon === 'weeping' ? 12 : 22}
              fill="url(#closeupLiquid)"
            />

            {/* Left Downcomer Overflow (Normal / Foaming / Entrainment / Weeping) */}
            {activePhenomenon !== 'dumping' && (
              <path
                d="M 100 167 Q 76 170, 76 235"
                stroke="#0284C7"
                strokeWidth={activePhenomenon === 'flooding' ? 24 : 9}
                fill="none"
                opacity="0.8"
              />
            )}
          </g>

          {/* ================= PHENOMENON-SPECIFIC ANIMATED VISUALS ================= */}

          {/* 1. NORMAL OPERATION: Healthy Vapour Bubbling & Disengagement */}
          {activePhenomenon === 'none' && (
            <g>
              {holeX.map((hx, i) => (
                <g key={i}>
                  {/* Vapour arrow entering from below */}
                  <path
                    d={`M ${hx} 232 L ${hx} 192`}
                    stroke="#F97316"
                    strokeWidth="2.2"
                    markerEnd="url(#closeup-vapour)"
                  />
                  {/* Vapour bubbles inside liquid pool */}
                  <circle
                    cx={hx}
                    cy={173 - (i % 2) * 5}
                    r="3.5"
                    fill="#FB923C"
                    className={reducedMotion ? '' : 'animate-bubble-pulse'}
                  />
                  {/* Clean disengaged vapour rising to upper tray */}
                  <path
                    d={`M ${hx} 152 L ${hx} 76`}
                    stroke="#F97316"
                    strokeWidth="2"
                    strokeDasharray="5 4"
                    markerEnd="url(#closeup-vapour)"
                  />
                </g>
              ))}
              <text x="220" y="118" fill={textMuted} fontSize="10" fontWeight="600" textAnchor="middle">
                ▲ Vapour disengages cleanly from liquid pool
              </text>
            </g>
          )}

          {/* 2. FOAMING: Thick Froth Layer Expanding into Vapour Space & Downcomers */}
          {activePhenomenon === 'foaming' && (
            <g>
              {/* Froth expansion on Upper Tray */}
              <rect
                x="53"
                y="20"
                width="287"
                height="26"
                rx="5"
                fill="url(#closeupFoam)"
                className={reducedMotion ? '' : 'animate-foam-swell'}
              />
              {/* Froth expansion on Lower Tray */}
              <g className={reducedMotion ? '' : 'animate-foam-swell'}>
                <rect x="100" y="118" width="320" height="46" rx="8" fill="url(#closeupFoam)" />
                {/* Dense trapped bubble clusters */}
                {[120, 145, 170, 195, 220, 245, 270, 295, 320, 345, 370].map((bx, idx) => (
                  <g key={idx}>
                    <circle
                      cx={bx}
                      cy={132 + (idx % 2) * 10}
                      r="8"
                      fill="#FEF3C7"
                      stroke="#F59E0B"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx={bx + 8}
                      cy={148 - (idx % 2) * 8}
                      r="7"
                      fill="#FDE68A"
                      stroke="#D97706"
                      strokeWidth="1.2"
                    />
                  </g>
                ))}
              </g>
              {holeX.map((hx, i) => (
                <path
                  key={i}
                  d={`M ${hx} 232 L ${hx} 192`}
                  stroke="#F97316"
                  strokeWidth="2.5"
                  markerEnd="url(#closeup-vapour)"
                />
              ))}
              <rect x="135" y="88" width="210" height="22" rx="4" fill={isDark ? '#451A03' : '#FEF3C7'} stroke="#F59E0B" />
              <text x="240" y="103" fill={isDark ? '#FDE68A' : '#92400E'} fontSize="10" fontWeight="800" textAnchor="middle">
                ⚠ Stable Froth Layer Refuse to Pop
              </text>
            </g>
          )}

          {/* 3. ENTRAINMENT: High-Velocity Vapour Carrying Liquid Droplets to Upper Tray */}
          {activePhenomenon === 'entrainment' && (
            <g>
              {holeX.map((hx, i) => (
                <g key={i}>
                  {/* Fast thick vapour jets */}
                  <path
                    d={`M ${hx} 235 L ${hx} 190`}
                    stroke="#F97316"
                    strokeWidth="3.5"
                    markerEnd="url(#closeup-vapour)"
                  />
                  <path
                    d={`M ${hx} 158 L ${hx} 74`}
                    stroke="#F97316"
                    strokeWidth="3"
                    strokeDasharray="6 3"
                    markerEnd="url(#closeup-vapour)"
                  />
                  {/* Entrained cyan liquid droplets blasting upward */}
                  <g className={reducedMotion ? '' : 'animate-spray-up'}>
                    <circle cx={hx - 5} cy="135" r="4" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
                    <circle cx={hx + 6} cy="110" r="3.5" fill="#38BDF8" />
                    <circle cx={hx} cy="90" r="4" fill="#0284C7" />
                  </g>
                </g>
              ))}
              <rect x="115" y="102" width="245" height="22" rx="4" fill={isDark ? '#0C4A6E' : '#E0F2FE'} stroke="#0284C7" />
              <text x="237" y="117" fill={isDark ? '#7DD3FC' : '#0369A1'} fontSize="10" fontWeight="800" textAnchor="middle">
                ▲ Heavy Liquid Spray Carried to Upper Tray!
              </text>
            </g>
          )}

          {/* 4. WEEPING: Weak Vapour Pressure · Liquid Dripping Through Perforations */}
          {activePhenomenon === 'weeping' && (
            <g>
              {holeX.map((hx, i) => (
                <g key={i}>
                  {/* Weak short vapour arrows */}
                  <path
                    d={`M ${hx + 6} 165 L ${hx + 6} 135`}
                    stroke="#F97316"
                    strokeWidth="1.5"
                    strokeDasharray="2 3"
                    opacity="0.6"
                    markerEnd="url(#closeup-vapour)"
                  />
                  {/* Liquid dripping down through upper and lower sieve holes */}
                  <g className={reducedMotion ? '' : 'animate-weep-drip'}>
                    <circle cx={hx} cy="75" r="3.8" fill="#0284C7" />
                    <circle cx={hx} cy="98" r="3.2" fill="#38BDF8" />
                    <circle cx={hx} cy="195" r="3.8" fill="#0284C7" />
                    <circle cx={hx} cy="215" r="3.2" fill="#38BDF8" />
                  </g>
                </g>
              ))}
              <rect x="115" y="118" width="245" height="22" rx="4" fill={isDark ? '#1E293B' : '#F1F5F9'} stroke="#0284C7" />
              <text x="237" y="133" fill="#0284C7" fontSize="10" fontWeight="800" textAnchor="middle">
                ▼ Liquid Leaking Down Through Sieve Holes
              </text>
            </g>
          )}

          {/* 5. DUMPING: Severe Vapour Loss · All Liquid Pouring Straight Through Holes */}
          {activePhenomenon === 'dumping' && (
            <g>
              {holeX.map((hx, i) => (
                <g key={i}>
                  {/* Heavy vertical liquid streams pouring through upper & lower tray holes */}
                  <line
                    x1={hx}
                    y1="66"
                    x2={hx}
                    y2="182"
                    stroke="#0284C7"
                    strokeWidth="4.5"
                    strokeDasharray="8 4"
                    className={reducedMotion ? '' : 'animate-dump-stream'}
                  />
                  <line
                    x1={hx}
                    y1="186"
                    x2={hx}
                    y2="242"
                    stroke="#0284C7"
                    strokeWidth="4.5"
                    strokeDasharray="8 4"
                    className={reducedMotion ? '' : 'animate-dump-stream'}
                  />
                </g>
              ))}
              <rect x="110" y="112" width="255" height="24" rx="4" fill={isDark ? '#450A0A' : '#FEE2E2'} stroke="#EF4444" />
              <text x="237" y="128" fill={isDark ? '#FCA5A5' : '#991B1B'} fontSize="10" fontWeight="800" textAnchor="middle">
                ▼▼ SEVERE DUMPING: All Liquid Drains Through Holes!
              </text>
            </g>
          )}

          {/* Structural Labels */}
          <text x="62" y="38" fill={textFill} fontSize="10" fontWeight="700">
            Upper Tray (n)
          </text>
          <text x="108" y="158" fill={textFill} fontSize="10" fontWeight="700">
            Lower Tray (n+1)
          </text>
          <text x="340" y="38" fill={textMuted} fontSize="9" fontWeight="600" textAnchor="middle">
            Weir
          </text>
        </svg>
      </div>

      {/* Explanation caption under magnified tray */}
      <p className={`text-xs mt-2.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
        {isApplied
          ? symptomDescription
          : 'Select your predictions on the right and click "Submit Prediction & Visualise" to see how this condition changes tray hydraulics.'}
      </p>
    </div>
  );
};
