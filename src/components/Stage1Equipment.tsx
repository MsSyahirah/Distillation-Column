import React, { useState } from 'react';
import { EquipmentComponent, ThemeMode } from '../types/distillation';
import { EQUIPMENT_COMPONENTS } from '../data/distillationData';
import { DistillationDiagram } from './DistillationDiagram';
import { Eye, EyeOff, CheckCircle2, BookOpen, Sparkles, ArrowRight, Info } from 'lucide-react';

interface Stage1Props {
  theme: ThemeMode;
  reducedMotion: boolean;
  onNextStage: () => void;
  onMarkStageComplete: (stage: number) => void;
  exploredEquipmentIds: string[];
  onExploreEquipment: (comp: EquipmentComponent, updatedIds: string[]) => void;
}

export const Stage1Equipment: React.FC<Stage1Props> = ({
  theme,
  reducedMotion,
  onNextStage,
  onMarkStageComplete,
  exploredEquipmentIds,
  onExploreEquipment
}) => {
  const isDark = theme === 'dcs-dark';
  const [selectedComp, setSelectedComp] = useState<EquipmentComponent>(EQUIPMENT_COMPONENTS[0]);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const exploredIds =
    exploredEquipmentIds && exploredEquipmentIds.length > 0
      ? exploredEquipmentIds
      : [EQUIPMENT_COMPONENTS[0].id];

  const handleSelect = (comp: EquipmentComponent) => {
    setSelectedComp(comp);
    const updated = exploredIds.includes(comp.id)
      ? exploredIds
      : [...exploredIds, comp.id];

    onExploreEquipment(comp, updated);

    if (updated.length >= 6) {
      onMarkStageComplete(1);
    }
  };

  const categories = [
    { id: 'all', label: 'All Equipment' },
    { id: 'column', label: 'Tower Shell' },
    { id: 'internals', label: 'Trays & Weirs' },
    { id: 'overhead', label: 'Overhead Loop' },
    { id: 'bottoms', label: 'Bottoms & Reboiler' }
  ];

  const filteredComponents =
    activeCategory === 'all'
      ? EQUIPMENT_COMPONENTS
      : EQUIPMENT_COMPONENTS.filter(
          (c) =>
            c.category === activeCategory ||
            (activeCategory === 'column' && c.category === 'feed')
        );

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
            <span>Stage 1 of 5</span>
            <span>·</span>
            <span>Equipment Discovery</span>
          </div>
          <h2 className="text-xl font-bold mt-0.5">Explore the Equipment</h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Click each component on the diagram to see its name, purpose, and how it works in everyday English.
          </p>
        </div>

        {/* Toolbar & Progress */}
        <div className="flex items-center flex-wrap gap-3 shrink-0">
          <button
            onClick={() => setShowLabels(!showLabels)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              showLabels
                ? isDark
                  ? 'bg-sky-950 border-sky-700 text-sky-300'
                  : 'bg-sky-50 border-sky-300 text-sky-800'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {showLabels ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showLabels ? 'Hide Labels' : 'Show Labels'}</span>
          </button>

          <div
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
              exploredIds.length >= 6
                ? isDark
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <span>
              Explored: {exploredIds.length} / {EQUIPMENT_COMPONENTS.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Zone Sandbox Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Central Diagram (7 cols) */}
        <div
          className={`lg:col-span-7 rounded-xl border p-4 transition-all ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Click any equipment hot spot to inspect
            </span>
            <span className="text-xs text-sky-500 font-mono">P&ID Screen Mimic</span>
          </div>

          <DistillationDiagram
            theme={theme}
            showLabels={showLabels}
            selectedComponentId={selectedComp.id}
            onSelectComponent={handleSelect}
            reducedMotion={reducedMotion}
            isPlaying={true}
          />
        </div>

        {/* Right Zone: Component Inspector Card & Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-sky-500/40 shadow-lg'
                : 'bg-white border-sky-300 shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between gap-2 border-b pb-3 mb-4 border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-500 border border-sky-500/20">
                  {selectedComp.tag}
                </span>
                <h3 className="text-lg font-bold mt-1.5 leading-snug">{selectedComp.name}</h3>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-md capitalize font-medium ${
                  isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {selectedComp.category}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <div className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Purpose (What it does)</span>
                </div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {selectedComp.purpose}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>How it works in plain English</span>
                </div>
                <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {selectedComp.howItWorks}
                </p>
              </div>

              <div
                className={`p-3 rounded-lg border text-xs leading-relaxed ${
                  isDark
                    ? 'bg-slate-800/60 border-slate-700 text-amber-200'
                    : 'bg-amber-50/70 border-amber-200 text-amber-900'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-0.5 text-amber-600 dark:text-amber-400">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Everyday Analogy:</span>
                </div>
                {selectedComp.everydayAnalogy}
              </div>

              {selectedComp.technicalTerms.length > 0 && (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Technical Terms:
                  </div>
                  <div className="space-y-2">
                    {selectedComp.technicalTerms.map((term, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-xs ${
                          isDark
                            ? 'bg-slate-950/60 border-slate-800'
                            : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <span className="font-bold text-sky-500 block mb-0.5">{term.term}</span>
                        <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                          {term.simpleDefinition}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Component Selection Quick List */}
          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                All Tower Equipment
              </span>
              <span className="text-xs text-slate-500">
                {exploredIds.length} / {EQUIPMENT_COMPONENTS.length} viewed
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    activeCategory === cat.id
                      ? 'bg-sky-600 text-white'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {filteredComponents.map((comp) => {
                const isSelected = selectedComp.id === comp.id;
                const isExplored = exploredIds.includes(comp.id);

                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(comp)}
                    className={`text-left p-2 rounded-lg border text-xs font-medium transition-all flex items-center justify-between gap-1.5 ${
                      isSelected
                        ? isDark
                          ? 'bg-sky-950 border-sky-500 text-sky-200'
                          : 'bg-sky-50 border-sky-400 text-sky-900 font-bold'
                        : isDark
                        ? 'bg-slate-800/40 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate">{comp.name}</span>
                    {isExplored && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onNextStage}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <span>Next: Follow the Flow</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
