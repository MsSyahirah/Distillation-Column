import React, { useState } from 'react';
import { ThemeMode } from '../types/distillation';
import { FLOW_STEPS } from '../data/distillationData';
import { DistillationDiagram } from './DistillationDiagram';
import {
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Gauge,
  Sparkles,
  Layers,
  Flame
} from 'lucide-react';

interface Stage2Props {
  theme: ThemeMode;
  reducedMotion: boolean;
  onNextStage: () => void;
  onPrevStage: () => void;
  onMarkStageComplete: (stage: number) => void;
  onLogFlowAction: (actionType: string, target: string, input: string, result: string) => void;
}

export const Stage2Flow: React.FC<Stage2Props> = ({
  theme,
  reducedMotion,
  onNextStage,
  onPrevStage,
  onMarkStageComplete,
  onLogFlowAction
}) => {
  const isDark = theme === 'dcs-dark';

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [activeStepId, setActiveStepId] = useState<number | null>(null);

  const speeds = [0.5, 1.0, 1.5, 2.0];

  const handleStepSelect = (stepId: number | null) => {
    setActiveStepId(stepId);
    onMarkStageComplete(2);
    if (stepId === null) {
      onLogFlowAction('Flow Mode Selected', 'All Streams Active', 'Full Column View', 'Viewed');
    } else {
      const stepObj = FLOW_STEPS.find((s) => s.id === stepId);
      onLogFlowAction(
        'Flow Step Viewed',
        `Step ${stepId}: ${stepObj?.title || ''}`,
        stepObj?.streamName || '',
        'Completed Step'
      );
    }
  };

  const handleNextStep = () => {
    if (activeStepId === null) {
      handleStepSelect(1);
    } else if (activeStepId < 5) {
      handleStepSelect(activeStepId + 1);
    } else {
      handleStepSelect(null);
    }
  };

  const handlePrevStep = () => {
    if (activeStepId === null) {
      handleStepSelect(5);
    } else if (activeStepId > 1) {
      handleStepSelect(activeStepId - 1);
    } else {
      handleStepSelect(null);
    }
  };

  const handleReplay = () => {
    setActiveStepId(1);
    setIsPlaying(true);
    onLogFlowAction('Flow Replay', 'Step 1: Feed Introduction', 'Replay clicked', 'Restarted');
  };

  const handleSpeedChange = (s: number) => {
    setSpeed(s);
    onLogFlowAction('Animation Speed Changed', 'Flow Speed Deck', `${s}x Speed`, 'Applied');
  };

  const activeStepData = activeStepId ? FLOW_STEPS.find((s) => s.id === activeStepId) : null;

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-500">
            <span>Stage 2 of 5</span>
            <span>·</span>
            <span>Process Flow Dynamics</span>
          </div>
          <h2 className="text-xl font-bold mt-0.5">Follow the Flow</h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Track ascending vapour (amber) and descending liquid (cyan) moving in counter-current flow through the trays.
          </p>
        </div>

        {/* Global Playback & Speed Controls */}
        <div className="flex items-center flex-wrap gap-2 shrink-0">
          <button
            onClick={() => {
              const nextState = !isPlaying;
              setIsPlaying(nextState);
              onLogFlowAction(
                'Flow Playback Toggled',
                'Animation Deck',
                nextState ? 'Play' : 'Pause',
                'Updated'
              );
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold text-xs transition-colors ${
              isPlaying
                ? isDark
                  ? 'bg-amber-950/60 border-amber-700 text-amber-300'
                  : 'bg-amber-50 border-amber-300 text-amber-800'
                : isDark
                ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Play Flow'}</span>
          </button>

          <button
            onClick={handleReplay}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs transition-colors ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Restart flow animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Replay</span>
          </button>

          <div
            className={`flex items-center gap-1 p-1 rounded-lg border text-xs ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {speeds.map((s) => (
              <button
                key={s}
                onClick={() => handleSpeedChange(s)}
                className={`px-2 py-0.5 rounded font-mono font-medium text-xs transition-all ${
                  speed === s
                    ? 'bg-sky-600 text-white font-bold'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`lg:col-span-7 rounded-xl border p-4 transition-all ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1 overflow-x-auto">
              <button
                onClick={() => handleStepSelect(null)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                  activeStepId === null
                    ? 'bg-sky-600 text-white'
                    : isDark
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All Streams
              </button>
              {FLOW_STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleStepSelect(s.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    activeStepId === s.id
                      ? 'bg-sky-600 text-white font-bold'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Step {s.id}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevStep}
                className={`p-1.5 rounded border transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title="Previous step"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextStep}
                className={`p-1.5 rounded border transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
                title="Next step"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <DistillationDiagram
            theme={theme}
            showLabels={true}
            isPlaying={isPlaying}
            speed={speed}
            reducedMotion={reducedMotion}
            activeFlowStep={activeStepId}
            highlightedIds={activeStepData ? activeStepData.highlightNodes : []}
          />
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-sky-500/40 shadow-lg'
                : 'bg-white border-sky-300 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-2 border-b pb-3 mb-3 border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  {activeStepData ? `Step ${activeStepData.id} of 5` : 'Full System Overview'}
                </span>
                <h3 className="text-base font-bold">
                  {activeStepData ? activeStepData.title : 'Continuous Counter-Current Flow'}
                </h3>
              </div>
            </div>

            {activeStepData ? (
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Stream: {activeStepData.streamName}</span>
                </div>

                <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {activeStepData.description}
                </p>

                <div
                  className={`p-3 rounded-lg border text-xs leading-relaxed ${
                    isDark
                      ? 'bg-slate-800/60 border-slate-700 text-sky-200'
                      : 'bg-sky-50/70 border-sky-200 text-sky-900'
                  }`}
                >
                  <span className="font-bold text-sky-500 block mb-1">
                    Operator Shop-Floor Note:
                  </span>
                  {activeStepData.operatorNote}
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  All fluid streams are currently running simultaneously. Notice how:
                </p>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold shrink-0">▲</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      <strong>Rising Vapour (Amber):</strong> Generated in the reboiler, climbs upward through the trays to the overhead condenser.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-500 font-bold shrink-0">▼</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      <strong>Descending Liquid (Cyan):</strong> Reflux liquid is introduced at the top, washing down heavy molecules through the trays into the sump.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0">▶</span>
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                      <strong>Raw Feed (Green):</strong> Enters midway, replenishing the column continuously.
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-sky-500 font-semibold pt-1">
                  Tip: Use the 'Step 1' to 'Step 5' buttons above to isolate and study each path individually!
                </p>
              </div>
            )}
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold">How Vapour & Liquid Contact Creates Separation</h4>
            </div>
            <div className={`text-xs space-y-2.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <p>
                On each tray inside the column, hot rising vapour directly bubbles through cooler descending liquid.
              </p>
              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="font-semibold text-slate-200 dark:text-slate-100 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-sky-500" />
                  <span>The Two Simultaneous Transfers:</span>
                </div>
                <div className="space-y-1 pl-2">
                  <p>
                    <strong className="text-amber-500">1. Light Molecules:</strong> The more volatile component in the liquid evaporates into the rising vapour.
                  </p>
                  <p>
                    <strong className="text-sky-500">2. Heavy Molecules:</strong> The less volatile component in the vapour condenses into the cooler liquid and flows down.
                  </p>
                </div>
              </div>
              <p className="font-semibold text-sky-600 dark:text-sky-400">
                Key takeaway: Because of this contact, the vapour becomes progressively richer in the more volatile component as it rises to the top!
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={onPrevStage}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back: Equipment</span>
            </button>

            <button
              onClick={onNextStage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>Next: Predict & Observe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
