import React, { useState } from 'react';
import { ThemeMode, QuizQuestion } from '../types/distillation';
import { QUIZ_QUESTIONS, EQUIPMENT_COMPONENTS } from '../data/distillationData';
import { DistillationDiagram } from './DistillationDiagram';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  MousePointer,
  Award,
  Layers
} from 'lucide-react';

interface Stage4Props {
  theme: ThemeMode;
  reducedMotion: boolean;
  onNextStage: () => void;
  onPrevStage: () => void;
  onMarkStageComplete: (stage: number) => void;
  savedAnswers: Record<number, number>;
  savedLabelling: Record<string, string>;
  onSaveAnswers: (answers: Record<number, number>, score: number) => void;
  onSaveLabelling: (labels: Record<string, string>) => void;
  onLogQuizAction: (actionType: string, target: string, input: string, result: string) => void;
}

export const Stage4Quiz: React.FC<Stage4Props> = ({
  theme,
  reducedMotion,
  onNextStage,
  onMarkStageComplete,
  savedAnswers,
  savedLabelling,
  onSaveAnswers,
  onSaveLabelling,
  onLogQuizAction
}) => {
  const isDark = theme === 'dcs-dark';

  const [activeSection, setActiveSection] = useState<'labelling' | 'questions'>('labelling');

  // ---------- LABELLING STATE ----------
  const labellingTargets = EQUIPMENT_COMPONENTS.slice(0, 8);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>(savedLabelling || {});
  const [selectedBankItem, setSelectedBankItem] = useState<string | null>(null);
  const [labellingFeedback, setLabellingFeedback] = useState<string | null>(null);
  const [labellingHint, setLabellingHint] = useState<string | null>(null);

  // ---------- QUIZ QUESTIONS STATE ----------
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<number, number>>(savedAnswers);
  const [questionSubmitted, setQuestionSubmitted] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    Object.keys(savedAnswers || {}).forEach((k) => {
      initial[Number(k)] = true;
    });
    return initial;
  });
  const [showHintForQ, setShowHintForQ] = useState<Record<number, boolean>>({});

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQIndex];

  // ---------- LABELLING LOGIC ----------
  const handleBankItemClick = (compName: string) => {
    setSelectedBankItem(compName === selectedBankItem ? null : compName);
    setLabellingFeedback(null);
  };

  const handleHotspotClick = (targetId: string) => {
    if (!selectedBankItem) {
      setLabellingFeedback(
        'Please select a component label from the bank below first, then click where it belongs!'
      );
      return;
    }

    const targetComp = EQUIPMENT_COMPONENTS.find((c) => c.id === targetId);
    if (!targetComp) return;

    if (targetComp.name === selectedBankItem) {
      const newDropped = { ...droppedLabels, [targetId]: selectedBankItem };
      setDroppedLabels(newDropped);
      onSaveLabelling(newDropped);
      setSelectedBankItem(null);
      setLabellingFeedback(`Correct! ${selectedBankItem} is located right here.`);
      setLabellingHint(null);

      onLogQuizAction(
        'Component Label Placed',
        targetComp.name,
        selectedBankItem,
        `Correct (${Object.keys(newDropped).length}/8)`
      );

      if (Object.keys(newDropped).length >= 6) {
        onMarkStageComplete(4);
      }
    } else {
      setLabellingFeedback(`Not quite! "${selectedBankItem}" does not belong here.`);
      setLabellingHint(`Hint for ${selectedBankItem}: ${targetComp.purpose}`);

      onLogQuizAction(
        'Component Label Attempt',
        `Target: ${targetComp.name}`,
        `Tried: ${selectedBankItem}`,
        'Incorrect - Hint Shown'
      );
    }
  };

  const handleDragStart = (e: React.DragEvent, compName: string) => {
    e.dataTransfer.setData('text/plain', compName);
  };

  const handleResetLabelling = () => {
    setDroppedLabels({});
    onSaveLabelling({});
    setSelectedBankItem(null);
    setLabellingFeedback(null);
    setLabellingHint(null);
    onLogQuizAction('Labelling Board Reset', 'All 8 Labels', 'Reset clicked', 'Cleared');
  };

  // ---------- QUIZ LOGIC ----------
  const handleSelectOption = (optIndex: number) => {
    if (questionSubmitted[currentQ.id]) return;
    setSelectedChoices({ ...selectedChoices, [currentQ.id]: optIndex });
  };

  const handleSubmitQuestion = () => {
    const isSubmittedNow = { ...questionSubmitted, [currentQ.id]: true };
    setQuestionSubmitted(isSubmittedNow);

    const chosenIdx = selectedChoices[currentQ.id];
    const isCorrect = chosenIdx === currentQ.correctIndex;
    if (!isCorrect) {
      setShowHintForQ({ ...showHintForQ, [currentQ.id]: true });
    }

    let score = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedChoices[q.id] === q.correctIndex && isSubmittedNow[q.id]) {
        score += 1;
      }
    });

    onSaveAnswers(selectedChoices, score);
    onLogQuizAction(
      'Quiz Question Answered',
      `Q${currentQ.id}: ${currentQ.question}`,
      currentQ.options[chosenIdx] || '',
      isCorrect ? `Correct (Score: ${score}/5)` : `Incorrect (Score: ${score}/5)`
    );

    if (score >= 4) {
      onMarkStageComplete(4);
    }
  };

  const handleRetryQuestion = () => {
    const updatedSubmitted = { ...questionSubmitted, [currentQ.id]: false };
    setQuestionSubmitted(updatedSubmitted);
    onLogQuizAction('Quiz Question Retry', `Q${currentQ.id}`, 'Retry clicked', 'Re-opened');
  };

  const quizScore = QUIZ_QUESTIONS.reduce((acc, q) => {
    return selectedChoices[q.id] === q.correctIndex && questionSubmitted[q.id] ? acc + 1 : acc;
  }, 0);

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
            <span>Stage 4 of 5</span>
            <span>·</span>
            <span>Knowledge Verification</span>
          </div>
          <h2 className="text-xl font-bold mt-0.5">Check Your Understanding</h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Test yourself with the component-labelling board and 5 short concept questions with instant feedback.
          </p>
        </div>

        {/* Activity Selector Tabs */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveSection('labelling')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSection === 'labelling'
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>
              Activity 1: Label Components ({Object.keys(droppedLabels).length}/
              {labellingTargets.length})
            </span>
          </button>

          <button
            onClick={() => setActiveSection('questions')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSection === 'questions'
                ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Activity 2: Concept Quiz ({quizScore}/5)</span>
          </button>
        </div>
      </div>

      {/* ================= SECTION A: COMPONENT LABELLING ACTIVITY ================= */}
      {activeSection === 'labelling' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div
            className={`lg:col-span-7 rounded-xl border p-4 transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Click a label from the bank, then click the matching target box on the diagram
              </span>
              <button
                onClick={handleResetLabelling}
                className="flex items-center gap-1 text-xs text-rose-500 hover:underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Labels</span>
              </button>
            </div>

            <DistillationDiagram
              theme={theme}
              showLabels={false}
              isPlaying={false}
              reducedMotion={reducedMotion}
              isLabellingMode={true}
              droppedLabels={droppedLabels}
              activeHotspotId={selectedBankItem}
              onHotspotClick={handleHotspotClick}
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div
              className={`p-5 rounded-xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4 text-sky-500" />
                  <h3 className="text-sm font-bold">Component Label Bank</h3>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-500">
                  {Object.keys(droppedLabels).length} of {labellingTargets.length} matched
                </span>
              </div>

              <p className={`text-xs mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <strong>How to play:</strong> Click any label below to select it, then click the corresponding dotted box on the tower diagram.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {labellingTargets.map((comp) => {
                  const isPlaced = Object.values(droppedLabels).includes(comp.name);
                  const isSelected = selectedBankItem === comp.name;

                  return (
                    <button
                      key={comp.id}
                      onClick={() => !isPlaced && handleBankItemClick(comp.name)}
                      disabled={isPlaced}
                      draggable={!isPlaced}
                      onDragStart={(e) => handleDragStart(e, comp.name)}
                      className={`p-2.5 rounded-lg border text-xs font-semibold text-left transition-all flex items-center justify-between gap-1.5 ${
                        isPlaced
                          ? isDark
                            ? 'bg-slate-800/30 border-slate-800 text-slate-500 line-through cursor-default'
                            : 'bg-slate-100 border-slate-200 text-slate-400 line-through cursor-default'
                          : isSelected
                          ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-400'
                          : isDark
                          ? 'bg-slate-800 border-slate-700 text-slate-200 hover:border-sky-500 cursor-pointer'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 cursor-pointer'
                      }`}
                    >
                      <span className="truncate">{comp.name}</span>
                      {isPlaced && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {labellingFeedback && (
                <div
                  className={`mt-4 p-3 rounded-lg border text-xs leading-relaxed ${
                    labellingFeedback.includes('Correct')
                      ? isDark
                        ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isDark
                      ? 'bg-amber-950/60 border-amber-700 text-amber-200'
                      : 'bg-amber-50 border-amber-300 text-amber-900'
                  }`}
                >
                  <p className="font-semibold">{labellingFeedback}</p>
                  {labellingHint && (
                    <p className="mt-1 text-sky-400 dark:text-sky-300 font-normal">
                      {labellingHint}
                    </p>
                  )}
                </div>
              )}

              {Object.keys(droppedLabels).length === labellingTargets.length && (
                <div
                  className={`mt-4 p-3.5 rounded-lg border text-center ${
                    isDark
                      ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-400 text-emerald-900'
                  }`}
                >
                  <Award className="w-6 h-6 mx-auto mb-1 text-emerald-500" />
                  <p className="font-bold text-sm">Outstanding Job!</p>
                  <p className="text-xs mt-0.5 opacity-90">
                    You have correctly identified all major distillation tower components.
                  </p>
                  <button
                    onClick={() => setActiveSection('questions')}
                    className="mt-2.5 px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    Proceed to Concept Quiz
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveSection('questions')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold"
              >
                <span>Go to 5 Concept Questions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SECTION B: 5 SHORT CONCEPT QUESTIONS ================= */}
      {activeSection === 'questions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCurrent = currentQIndex === idx;
                const isAnswered = questionSubmitted[q.id];
                const isCorrect = selectedChoices[q.id] === q.correctIndex;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${
                      isCurrent
                        ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                        : isDark
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Question {q.id}</span>
                    {isAnswered &&
                      (isCorrect ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      ))}
                  </button>
                );
              })}
            </div>

            <div
              className={`p-6 rounded-xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-sky-500 uppercase tracking-wider mb-2">
                <span>Question {currentQ.id} of 5</span>
                <span>
                  {questionSubmitted[currentQ.id]
                    ? selectedChoices[currentQ.id] === currentQ.correctIndex
                      ? '✅ Correct'
                      : '❌ Needs Review'
                    : 'Unanswered'}
                </span>
              </div>

              <h3 className="text-base font-bold leading-relaxed mb-4">{currentQ.question}</h3>

              <div className="space-y-2.5">
                {currentQ.options.map((optText, optIdx) => {
                  const isSelected = selectedChoices[currentQ.id] === optIdx;
                  const isSubmitted = questionSubmitted[currentQ.id];
                  const isCorrectAnswer = optIdx === currentQ.correctIndex;

                  let style = isDark
                    ? 'bg-slate-800/40 border-slate-700 text-slate-200 hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100';

                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      style = isDark
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200 font-semibold'
                        : 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold';
                    } else if (isSelected && !isCorrectAnswer) {
                      style = isDark
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-rose-50 border-rose-400 text-rose-900';
                    }
                  } else if (isSelected) {
                    style = isDark
                      ? 'bg-sky-950 border-sky-500 text-white font-semibold'
                      : 'bg-sky-50 border-sky-500 text-sky-900 font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs leading-relaxed transition-all flex items-start gap-3 ${style}`}
                    >
                      <span className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border border-current opacity-80">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 mt-0.5">{optText}</span>
                      {isSubmitted && isCorrectAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  {questionSubmitted[currentQ.id] &&
                    selectedChoices[currentQ.id] !== currentQ.correctIndex && (
                      <button
                        onClick={handleRetryQuestion}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold text-amber-500 border-amber-500/40 hover:bg-amber-500/10 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retry Question</span>
                      </button>
                    )}
                </div>

                {!questionSubmitted[currentQ.id] ? (
                  <button
                    onClick={handleSubmitQuestion}
                    disabled={selectedChoices[currentQ.id] === undefined}
                    className={`px-5 py-2 rounded-lg font-bold text-xs transition-colors ${
                      selectedChoices[currentQ.id] !== undefined
                        ? 'bg-sky-600 hover:bg-sky-500 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (currentQIndex < QUIZ_QUESTIONS.length - 1) {
                        setCurrentQIndex(currentQIndex + 1);
                      }
                    }}
                    disabled={currentQIndex >= QUIZ_QUESTIONS.length - 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors disabled:opacity-40"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {questionSubmitted[currentQ.id] && (
                <div
                  className={`mt-4 p-4 rounded-lg border text-xs leading-relaxed ${
                    selectedChoices[currentQ.id] === currentQ.correctIndex
                      ? isDark
                        ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isDark
                      ? 'bg-rose-950/40 border-rose-700 text-rose-200'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    {selectedChoices[currentQ.id] === currentQ.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500" />
                    )}
                    <span>
                      {selectedChoices[currentQ.id] === currentQ.correctIndex
                        ? 'Why this is correct:'
                        : 'Why this is incorrect:'}
                    </span>
                  </div>
                  <p>{currentQ.explanation}</p>

                  {selectedChoices[currentQ.id] !== currentQ.correctIndex && (
                    <div className="mt-2.5 pt-2 border-t border-rose-200/40 dark:border-rose-800/40 flex items-start gap-1.5 text-amber-500 dark:text-amber-300 font-semibold">
                      <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>Helpful Hint: {currentQ.hint}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div
              className={`p-5 rounded-xl border text-center transition-all ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <Award className="w-8 h-8 text-sky-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold">Quiz Performance</h4>
              <div className="my-3">
                <span className="text-3xl font-extrabold text-sky-500 tabular-nums">
                  {quizScore}
                </span>
                <span className="text-slate-400 font-bold text-sm"> / 5 Correct</span>
              </div>

              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-sky-500 h-full transition-all duration-500"
                  style={{ width: `${(quizScore / 5) * 100}%` }}
                />
              </div>

              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {quizScore === 5
                  ? '🌟 Perfect score! You have mastered the fundamentals.'
                  : quizScore >= 3
                  ? '👍 Good progress! Review any incorrect questions to reinforce your learning.'
                  : 'Keep going! Try using the hints to rethink incorrect choices.'}
              </p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setActiveSection('labelling')}
                className={`w-full py-2 rounded-lg border text-xs font-semibold transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-300'
                    : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                Review Component Labelling
              </button>

              <button
                onClick={onNextStage}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Next: Final Reflection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
