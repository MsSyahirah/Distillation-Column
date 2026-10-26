import React, { useState } from 'react';
import {
  ThemeMode,
  PredictionScenario,
  PredictionOption,
  StudentScenarioPrediction
} from '../types/distillation';
import { PREDICTION_SCENARIOS } from '../data/distillationData';
import { DistillationDiagram } from './DistillationDiagram';
import { TrayHydraulicsCloseUp } from './TrayHydraulicsCloseUp';
import {
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Flame,
  Sliders,
  Wrench,
  Gauge,
  Sparkles,
  Eye,
  FileText,
  Play
} from 'lucide-react';

interface Stage3Props {
  theme: ThemeMode;
  reducedMotion: boolean;
  onNextStage: () => void;
  onPrevStage: () => void;
  onMarkStageComplete: (stage: number) => void;
  savedScenarioPredictions: Record<string, StudentScenarioPrediction>;
  onSaveScenarioPrediction: (prediction: StudentScenarioPrediction) => void;
}

export const Stage3Predict: React.FC<Stage3Props> = ({
  theme,
  reducedMotion,
  onNextStage,
  onPrevStage,
  onMarkStageComplete,
  savedScenarioPredictions,
  onSaveScenarioPrediction
}) => {
  const isDark = theme === 'dcs-dark';

  const [activeCategory, setActiveCategory] = useState<
    'all' | 'operating-control' | 'tray-hydraulics'
  >('all');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('reboiler-heat-increase');

  // Simulation Scenarios Module: Purity & Pressure Prediction State
  const [predictedPurity, setPredictedPurity] = useState<
    'improves-moderately' | 'degrades' | 'maximum-equilibrium' | null
  >(null);
  const [predictedPressure, setPredictedPressure] = useState<
    'increases' | 'decreases' | 'spikes-sharply' | null
  >(null);
  const [writtenHypothesis, setWrittenHypothesis] = useState<string>('');

  // Behaviour & operator action state
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedActionOptionId, setSelectedActionOptionId] = useState<string | null>(null);

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [appliedControlSetting, setAppliedControlSetting] = useState<boolean>(false);

  const completedScenarios = Object.keys(savedScenarioPredictions || {});

  const filteredScenarios =
    activeCategory === 'all'
      ? PREDICTION_SCENARIOS
      : PREDICTION_SCENARIOS.filter((sc) => sc.category === activeCategory);

  const scenario: PredictionScenario =
    PREDICTION_SCENARIOS.find((s) => s.id === activeScenarioId) || PREDICTION_SCENARIOS[0];

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    const saved = savedScenarioPredictions?.[id];
    if (saved) {
      setPredictedPurity(
        saved.predictedPurity !== 'not-selected' ? (saved.predictedPurity as any) : null
      );
      setPredictedPressure(
        saved.predictedPressure !== 'not-selected' ? (saved.predictedPressure as any) : null
      );
      setWrittenHypothesis(saved.writtenHypothesis || '');
    } else {
      setPredictedPurity(null);
      setPredictedPressure(null);
      setWrittenHypothesis('');
    }
    setSelectedOptionId(null);
    setSelectedActionOptionId(null);
    setHasSubmitted(false);
    setAppliedControlSetting(false);
  };

  const handleCategoryChange = (cat: 'all' | 'operating-control' | 'tray-hydraulics') => {
    setActiveCategory(cat);
    const list =
      cat === 'all'
        ? PREDICTION_SCENARIOS
        : PREDICTION_SCENARIOS.filter((sc) => sc.category === cat);
    if (list.length > 0 && !list.some((s) => s.id === activeScenarioId)) {
      handleSelectScenario(list[0].id);
    }
  };

  const handleOptionSelect = (optionId: string) => {
    if (!hasSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleActionOptionSelect = (optionId: string) => {
    if (!hasSubmitted) {
      setSelectedActionOptionId(optionId);
    }
  };

  const canRunSimulation = Boolean(
    predictedPurity ||
      predictedPressure ||
      writtenHypothesis.trim().length > 0 ||
      (selectedOptionId && selectedActionOptionId)
  );

  const selectedOption: PredictionOption | undefined = scenario.options.find(
    (o) => o.id === selectedOptionId
  );

  const selectedActionOption: PredictionOption | undefined = scenario.actionOptions.find(
    (o) => o.id === selectedActionOptionId
  );

  const handleRunSimulation = () => {
    if (!canRunSimulation) return;
    setHasSubmitted(true);
    setAppliedControlSetting(true);

    const record: StudentScenarioPrediction = {
      scenarioId: scenario.id,
      scenarioTitle: scenario.title,
      predictedPurity: predictedPurity || 'not-selected',
      expectedPurity: scenario.expectedPurityImpact,
      predictedPressure: predictedPressure || 'not-selected',
      expectedPressure: scenario.expectedPressureImpact,
      writtenHypothesis: writtenHypothesis.trim(),
      behaviourChoiceText: selectedOption?.text,
      behaviourCorrect: selectedOption?.isCorrect,
      actionChoiceText: selectedActionOption?.text,
      actionCorrect: selectedActionOption?.isCorrect,
      submittedAt: new Date().toISOString()
    };

    onSaveScenarioPrediction(record);

    const nextCount = new Set([...completedScenarios, scenario.id]).size;
    if (nextCount >= 2) {
      onMarkStageComplete(3);
    }
  };

  const handleResetScenario = () => {
    setPredictedPurity(null);
    setPredictedPressure(null);
    setWrittenHypothesis('');
    setSelectedOptionId(null);
    setSelectedActionOptionId(null);
    setHasSubmitted(false);
    setAppliedControlSetting(false);
  };

  const quickPredictionChips = [
    'Higher vapour boil-up increases column pressure and strips light component.',
    'More reflux washes heavy molecules down and improves overhead purity.',
    'Excessive vapour carries liquid droplets up (entrainment) and lowers purity.',
    'Low vapour pressure lets liquid weep through tray holes, reducing ΔP and contact.'
  ];

  return (
    <div className="space-y-6">
      {/* Stage Header Banner */}
      <div
        className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-500">
            <span>Stage 3 of 5</span>
            <span>·</span>
            <span>Simulation Scenarios & Predict-Observe Lab</span>
          </div>
          <h2 className="text-xl font-bold mt-0.5">
            Simulation Scenarios: Predict & Observe Operating Changes
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Select a scenario (such as <strong>Increase Reboiler Heat</strong>, <strong>Increase Reflux Ratio</strong>, or <strong>Tray Hydraulic Malfunctions</strong>), enter your prediction for <strong>product purity</strong> and <strong>column pressure</strong>, and observe the live animation.
          </p>
        </div>

        {/* Mandatory Conceptual Teaching Model Notice Badge */}
        <div
          className={`px-3 py-2 rounded-lg border text-xs flex items-center gap-2 shrink-0 ${
            isDark
              ? 'bg-amber-950/40 border-amber-700/60 text-amber-200'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <div className="leading-tight">
            <span className="font-bold block">Simplified Conceptual Teaching Model</span>
            <span className="text-[11px] opacity-80">
              Qualitative evidence-based trends; no invented decimal numbers.
            </span>
          </div>
        </div>
      </div>

      {/* ================= SIMULATION SCENARIOS SELECTOR BAR ================= */}
      <div
        className={`p-4 rounded-xl border space-y-3 ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-sky-500">
              Simulation Scenarios Selector
            </h3>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeCategory === 'all'
                  ? 'bg-sky-600 text-white'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Scenarios ({PREDICTION_SCENARIOS.length})
            </button>
            <button
              onClick={() => handleCategoryChange('operating-control')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeCategory === 'operating-control'
                  ? 'bg-sky-600 text-white'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Operating Controls (Heat & Reflux)
            </button>
            <button
              onClick={() => handleCategoryChange('tray-hydraulics')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                activeCategory === 'tray-hydraulics'
                  ? 'bg-amber-600 text-white'
                  : isDark
                  ? 'bg-slate-800 text-amber-300 hover:bg-slate-700'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              Tray Hydraulics (Foaming · Entrainment · Weeping · Dumping · Flooding)
            </button>
          </div>
        </div>

        {/* Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {filteredScenarios.map((sc) => {
            const isCurrent = scenario.id === sc.id;
            const isDone = completedScenarios.includes(sc.id);
            const isHydraulic = sc.category === 'tray-hydraulics';

            return (
              <button
                key={sc.id}
                onClick={() => handleSelectScenario(sc.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
                  isCurrent
                    ? isHydraulic
                      ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                      : 'bg-sky-600 text-white border-sky-600 shadow-sm'
                    : isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{sc.title}</span>
                {isDone && (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isCurrent ? 'text-white' : 'text-emerald-400'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= MAIN 2-ZONE SIMULATION WORKBENCH ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Live Qualitative Process Indicators + Magnified Tray Close-Up + Full Tower Animation (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Qualitative Process Telemetry Indicators */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div
              className={`p-2.5 rounded-lg border ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Vapour Boil-Up
              </span>
              <span className="text-xs font-bold text-amber-500 mt-0.5 block">
                {!appliedControlSetting
                  ? '● Normal Baseline'
                  : scenario.simulationEffect.vapourSpeedFactor > 1.3
                  ? '▲ Elevated Traffic'
                  : scenario.simulationEffect.vapourSpeedFactor < 0.7
                  ? '▼ Low / Weak'
                  : '● Steady Normal'}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-lg border ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Reflux Liquid Flow
              </span>
              <span className="text-xs font-bold text-sky-500 mt-0.5 block">
                {!appliedControlSetting
                  ? '● Normal Baseline'
                  : scenario.simulationEffect.liquidSpeedFactor > 1.4
                  ? '▲ High Recycle'
                  : '● Normal Flow'}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-lg border ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Column Pressure (ΔP)
              </span>
              <span
                className={`text-xs font-bold mt-0.5 block ${
                  !appliedControlSetting
                    ? 'text-emerald-500'
                    : scenario.expectedPressureImpact === 'spikes-sharply'
                    ? 'text-rose-500'
                    : scenario.expectedPressureImpact === 'increases'
                    ? 'text-amber-500'
                    : 'text-sky-400'
                }`}
              >
                {!appliedControlSetting ? '● Nominal ΔP' : scenario.pressureImpactLabel}
              </span>
            </div>

            <div
              className={`p-2.5 rounded-lg border ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Product Purity Trend
              </span>
              <span
                className={`text-xs font-bold mt-0.5 block ${
                  !appliedControlSetting
                    ? 'text-emerald-500'
                    : scenario.expectedPurityImpact === 'degrades'
                    ? 'text-rose-500'
                    : 'text-emerald-400'
                }`}
              >
                {!appliedControlSetting ? '● Steady Spec' : scenario.purityImpactLabel}
              </span>
            </div>
          </div>

          {/* Magnified 2-Tray Cross-Section Visualizer */}
          <TrayHydraulicsCloseUp
            theme={theme}
            phenomenon={scenario.phenomenon}
            reducedMotion={reducedMotion}
            isApplied={appliedControlSetting}
            symptomTitle={scenario.simulationEffect.traySymptomTitle}
            symptomDescription={scenario.simulationEffect.traySymptomDescription}
          />

          {/* Full Column Diagram */}
          <div
            className={`rounded-xl border p-4 transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Full Distillation Tower Simulation
              </span>
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`font-mono px-2 py-0.5 rounded ${
                    appliedControlSetting
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold'
                      : isDark
                      ? 'bg-slate-800 text-slate-400'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {appliedControlSetting ? `Active: ${scenario.shortLabel}` : 'Normal Baseline'}
                </span>
              </div>
            </div>

            <DistillationDiagram
              theme={theme}
              showLabels={true}
              isPlaying={true}
              reducedMotion={reducedMotion}
              vapourSpeedFactor={
                appliedControlSetting ? scenario.simulationEffect.vapourSpeedFactor : 1
              }
              liquidSpeedFactor={
                appliedControlSetting ? scenario.simulationEffect.liquidSpeedFactor : 1
              }
              vapourDensity={
                appliedControlSetting ? scenario.simulationEffect.vapourDensity : 'normal'
              }
              reboilerLevel={
                appliedControlSetting ? scenario.simulationEffect.reboilerLevel : 'normal'
              }
              refluxDrumLevel={
                appliedControlSetting ? scenario.simulationEffect.refluxDrumLevel : 'normal'
              }
              hydraulicPhenomenon={appliedControlSetting ? scenario.phenomenon : 'none'}
              highlightedIds={
                scenario.category === 'tray-hydraulics'
                  ? ['trays-downcomers', 'column-shell']
                  : scenario.parameter.includes('reboiler')
                  ? ['reboiler']
                  : ['reflux-line', 'reflux-drum']
              }
            />

            {appliedControlSetting && (
              <div
                className={`mt-3 p-3 rounded-lg border text-xs flex items-center justify-between ${
                  isDark
                    ? 'bg-slate-800/80 border-slate-700 text-amber-300'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>{scenario.simulationEffect.separationNote}</span>
                </div>
                <button
                  onClick={handleResetScenario}
                  className="flex items-center gap-1 font-semibold text-sky-600 dark:text-sky-400 hover:underline shrink-0 ml-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Zone: Simulation Scenarios Prediction Entry & Evidence-Based Explanation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-sky-500/40 shadow-lg'
                : 'bg-white border-sky-300 shadow-sm'
            }`}
          >
            {/* Scenario Context Banner */}
            <div className="border-b pb-3 mb-4 border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-sky-500 uppercase tracking-wider">
                  Selected Simulation Scenario
                </span>
                <span
                  className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                    scenario.category === 'tray-hydraulics'
                      ? 'bg-amber-500/15 text-amber-500'
                      : 'bg-sky-500/15 text-sky-500'
                  }`}
                >
                  {scenario.shortLabel}
                </span>
              </div>
              <p className={`text-sm font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {scenario.controlChange}
              </p>
            </div>

            {/* ================= PART A: PREDICT PRODUCT PURITY & COLUMN PRESSURE IMPACT ================= */}
            <div className="space-y-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-500">
                <Gauge className="w-4 h-4 shrink-0" />
                <span>1. Predict Impact on Product Purity & Column Pressure</span>
              </div>

              {/* Purity Prediction Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold block">
                  Predicted Impact on Product Purity / Separation:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'improves-moderately', label: '▲ Improves / Strips' },
                    { id: 'degrades', label: '▼ Degrades / Drops' },
                    { id: 'maximum-equilibrium', label: '● Max Equilibrium' }
                  ].map((item) => {
                    const active = predictedPurity === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={hasSubmitted}
                        onClick={() => setPredictedPurity(item.id as any)}
                        className={`p-2 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                          active
                            ? 'bg-sky-600 text-white border-sky-500 shadow-sm'
                            : isDark
                            ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column Pressure Prediction Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold block">
                  Predicted Impact on Column Pressure / Tray ΔP:
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'increases', label: '▲ Rises / Increases' },
                    { id: 'decreases', label: '▼ Drops / Decreases' },
                    { id: 'spikes-sharply', label: '▲▲ Spikes (Flooding)' }
                  ].map((item) => {
                    const active = predictedPressure === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        disabled={hasSubmitted}
                        onClick={() => setPredictedPressure(item.id as any)}
                        className={`p-2 rounded-lg border text-[11px] font-semibold text-center transition-all ${
                          active
                            ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                            : isDark
                            ? 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-800'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Written Prediction Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold flex items-center justify-between">
                  <span>Enter Your Prediction (Purity, Pressure, or Flow Effect):</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    Optional starter chips below
                  </span>
                </label>
                <textarea
                  value={writtenHypothesis}
                  disabled={hasSubmitted}
                  onChange={(e) => setWrittenHypothesis(e.target.value)}
                  rows={2}
                  placeholder="Type your prediction here (e.g. 'Increasing reboiler heat generates more rising vapour, which raises column pressure...')"
                  className={`w-full p-2.5 rounded-lg border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
                {!hasSubmitted && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {quickPredictionChips.map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => setWrittenHypothesis(chip)}
                        className={`text-[10px] px-2 py-1 rounded border text-left transition-colors ${
                          isDark
                            ? 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-sky-500'
                            : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-sky-400'
                        }`}
                      >
                        + {chip}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ================= PART B: PREDICT TRAY BEHAVIOUR & OPERATOR ACTION ================= */}
            <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-2 text-xs font-bold text-amber-500">
                <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>2. {scenario.studentQuestion}</span>
              </div>

              <div className="space-y-1.5">
                {scenario.options.map((opt, idx) => {
                  const isSelected = selectedOptionId === opt.id;
                  let cardStyle = isDark
                    ? 'bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (hasSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = isDark
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-400 text-emerald-900';
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = isDark
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    cardStyle = isDark
                      ? 'bg-sky-950 border-sky-500 text-white font-medium'
                      : 'bg-sky-50 border-sky-500 text-sky-900 font-medium';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionSelect(opt.id)}
                      disabled={hasSubmitted}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${cardStyle}`}
                    >
                      <span className="font-mono font-bold mt-0.5 shrink-0">
                        {String.fromCharCode(65 + idx)}:
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {hasSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Operator Action Prediction */}
            <div className="space-y-2.5 pt-3 mt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-2 text-xs font-bold text-sky-500">
                <Wrench className="w-4 h-4 shrink-0 mt-0.5" />
                <span>3. {scenario.actionQuestion}</span>
              </div>

              <div className="space-y-1.5">
                {scenario.actionOptions.map((opt, idx) => {
                  const isSelected = selectedActionOptionId === opt.id;
                  let cardStyle = isDark
                    ? 'bg-slate-800/50 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (hasSubmitted) {
                    if (opt.isCorrect) {
                      cardStyle = isDark
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-400 text-emerald-900';
                    } else if (isSelected && !opt.isCorrect) {
                      cardStyle = isDark
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    cardStyle = isDark
                      ? 'bg-sky-950 border-sky-500 text-white font-medium'
                      : 'bg-sky-50 border-sky-500 text-sky-900 font-medium';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleActionOptionSelect(opt.id)}
                      disabled={hasSubmitted}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${cardStyle}`}
                    >
                      <span className="font-mono font-bold mt-0.5 shrink-0">
                        {idx + 1}:
                      </span>
                      <span className="flex-1">{opt.text}</span>
                      {hasSubmitted && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {hasSubmitted && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Run Simulation & Observe Button */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              {!hasSubmitted ? (
                <button
                  onClick={handleRunSimulation}
                  disabled={!canRunSimulation}
                  className={`w-full py-2.5 rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-2 ${
                    canRunSimulation
                      ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                      : isDark
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Run Simulation & Observe Impact</span>
                </button>
              ) : (
                <button
                  onClick={handleResetScenario}
                  className={`w-full py-2 rounded-lg border font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset & Predict Again</span>
                </button>
              )}
            </div>
          </div>

          {/* ================= EVIDENCE-BASED EXPLANATION PANEL ================= */}
          {hasSubmitted && (
            <div
              className={`p-5 rounded-xl border space-y-4 transition-all ${
                isDark
                  ? 'bg-slate-900 border-emerald-500/40 shadow-lg'
                  : 'bg-white border-emerald-300 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-2.5 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-bold">
                    Simplified Evidence-Based Explanation
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-500 font-bold">
                  Logged to CSV
                </span>
              </div>

              {/* Student Prediction Comparison */}
              {(predictedPurity || predictedPressure || writtenHypothesis.trim()) && (
                <div
                  className={`p-3 rounded-lg border text-xs space-y-1.5 ${
                    isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="font-bold text-sky-500 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Your Recorded Prediction vs. Simulation Outcome:</span>
                  </div>
                  {predictedPurity && (
                    <p>
                      <strong>Product Purity Prediction:</strong>{' '}
                      {predictedPurity === scenario.expectedPurityImpact ? (
                        <span className="text-emerald-500 font-semibold">
                          ✓ Matched ({scenario.purityImpactLabel})
                        </span>
                      ) : (
                        <span className="text-amber-500 font-semibold">
                          Observed trend: {scenario.purityImpactLabel}
                        </span>
                      )}
                    </p>
                  )}
                  {predictedPressure && (
                    <p>
                      <strong>Column Pressure (ΔP) Prediction:</strong>{' '}
                      {predictedPressure === scenario.expectedPressureImpact ? (
                        <span className="text-emerald-500 font-semibold">
                          ✓ Matched ({scenario.pressureImpactLabel})
                        </span>
                      ) : (
                        <span className="text-amber-500 font-semibold">
                          Observed trend: {scenario.pressureImpactLabel}
                        </span>
                      )}
                    </p>
                  )}
                  {writtenHypothesis.trim() && (
                    <p className="italic opacity-90 pt-0.5">
                      "{writtenHypothesis.trim()}"
                    </p>
                  )}
                </div>
              )}

              {/* Evidence-Based Breakdown: Purity & Pressure */}
              <div className="space-y-3 text-xs leading-relaxed">
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-sky-50/60 border-sky-200'
                  }`}
                >
                  <span className="font-bold text-sky-500 block mb-0.5">
                    Impact on Product Purity ({scenario.purityImpactLabel}):
                  </span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    {scenario.purityEvidenceExplanation}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-amber-50/60 border-amber-200'
                  }`}
                >
                  <span className="font-bold text-amber-500 block mb-0.5">
                    Impact on Column Pressure & ΔP ({scenario.pressureImpactLabel}):
                  </span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    {scenario.pressureEvidenceExplanation}
                  </p>
                </div>

                {/* Observable Cues in the Animation */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5 mb-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Observable Evidence in the Animation:</span>
                  </span>
                  <ul className="space-y-1 pl-1">
                    {scenario.observableAnimationCues.map((cue, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        <span className="text-emerald-500 font-bold">·</span>
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {selectedOption && (
                  <p className={`pt-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    <strong>Tray Behaviour Feedback:</strong> {selectedOption.explanation}
                  </p>
                )}
                {selectedActionOption && (
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    <strong>Operator Action Feedback:</strong> {selectedActionOption.explanation}
                  </p>
                )}
              </div>

              {/* Scientific Assumptions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Scientific Assumptions for this Scenario:
                </span>
                <ul className="space-y-1 text-xs">
                  {scenario.assumptions.map((assump, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-1.5 text-slate-400">
                      <span className="text-sky-500 mt-0.5">·</span>
                      <span>{assump}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Navigation CTAs */}
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
              <span>Back: Flow</span>
            </button>

            <button
              onClick={onNextStage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>Next: Check Understanding</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
