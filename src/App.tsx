import React, { useState, useEffect } from 'react';
import {
  ThemeMode,
  StudentProfile,
  EquipmentComponent,
  StudentScenarioPrediction,
  StudentActionEvent
} from './types/distillation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Stage1Equipment } from './components/Stage1Equipment';
import { Stage2Flow } from './components/Stage2Flow';
import { Stage3Predict } from './components/Stage3Predict';
import { Stage4Quiz } from './components/Stage4Quiz';
import { Stage5Reflect } from './components/Stage5Reflect';
import { TeacherReviewModal } from './components/TeacherReviewModal';
import { StudentModal } from './components/StudentModal';
import { downloadStudentMonitoringCSV } from './utils/csvExport';
import { AlertCircle } from 'lucide-react';

const STORAGE_KEY = 'ite_distillation_lesson_v1';
const THEME_KEY = 'ite_distillation_theme';
const MOTION_KEY = 'ite_distillation_reduced_motion';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'clean-light' ? 'clean-light' : 'dcs-dark';
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    return localStorage.getItem(MOTION_KEY) === 'true';
  });

  const [currentStage, setCurrentStage] = useState<number>(1);

  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          exploredEquipmentIds: parsed.exploredEquipmentIds || ['column-shell'],
          scenarioPredictions: parsed.scenarioPredictions || {},
          actionLog: parsed.actionLog || []
        };
      }
    } catch {
      // fallback
    }
    return {
      name: '',
      className: '',
      startedAt: new Date().toISOString(),
      completedStages: [1],
      exploredEquipmentIds: ['column-shell'],
      scenarioPredictions: {},
      actionLog: [],
      quizAnswers: {},
      quizSubmitted: false,
      quizScore: 0,
      quizAttempts: 0,
      labellingAnswers: {},
      labellingCompleted: false,
      reflection: {
        understood: '',
        unsure: '',
        questionForTeacher: ''
      }
    };
  });

  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState<boolean>(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
  }, [student]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dcs-dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(MOTION_KEY, String(reducedMotion));
  }, [reducedMotion]);

  // Helper to append an action event to student.actionLog
  const logStudentAction = (
    stage: string,
    actionType: string,
    target: string,
    studentInput: string,
    result: string
  ) => {
    const newEvent: StudentActionEvent = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      stage,
      actionType,
      target,
      studentInput,
      result
    };
    setStudent((prev) => ({
      ...prev,
      actionLog: [...(prev.actionLog || []), newEvent]
    }));
  };

  const markStageComplete = (stageNum: number) => {
    setStudent((prev) => {
      if (prev.completedStages.includes(stageNum)) return prev;
      return {
        ...prev,
        completedStages: [...prev.completedStages, stageNum]
      };
    });
  };

  const handleSelectStage = (stageNum: number) => {
    setCurrentStage(stageNum);
    logStudentAction(
      `Stage ${stageNum}`,
      'Stage Navigation',
      `Switched to Stage ${stageNum}`,
      `Tab ${stageNum}`,
      'Viewed'
    );
  };

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dcs-dark' ? 'clean-light' : 'dcs-dark'));
  };

  const handleToggleReducedMotion = () => {
    setReducedMotion((prev) => !prev);
  };

  const handleSaveStudent = (name: string, className: string) => {
    const newEvent: StudentActionEvent = {
      id: `${Date.now()}-profile`,
      timestamp: new Date().toISOString(),
      stage: `Stage ${currentStage}`,
      actionType: 'Student Info Updated',
      target: 'Student Profile',
      studentInput: `${name} (${className})`,
      result: 'Saved'
    };
    setStudent((prev) => ({
      ...prev,
      name,
      className,
      actionLog: [...(prev.actionLog || []), newEvent]
    }));
  };

  const handleExploreEquipment = (comp: EquipmentComponent, updatedIds: string[]) => {
    const newEvent: StudentActionEvent = {
      id: `${Date.now()}-eq`,
      timestamp: new Date().toISOString(),
      stage: 'Stage 1: Equipment',
      actionType: 'Equipment Inspected',
      target: `${comp.name} (${comp.tag})`,
      studentInput: `Category: ${comp.category}`,
      result: `Explored (${updatedIds.length}/9)`
    };
    setStudent((prev) => ({
      ...prev,
      exploredEquipmentIds: updatedIds,
      actionLog: [...(prev.actionLog || []), newEvent]
    }));
  };

  const handleSaveScenarioPrediction = (prediction: StudentScenarioPrediction) => {
    const purityMatch =
      prediction.predictedPurity === prediction.expectedPurity ? 'Purity Matched' : `Purity: ${prediction.predictedPurity}`;
    const pressureMatch =
      prediction.predictedPressure === prediction.expectedPressure ? 'Pressure Matched' : `Pressure: ${prediction.predictedPressure}`;

    const newEvent: StudentActionEvent = {
      id: `${Date.now()}-scen`,
      timestamp: new Date().toISOString(),
      stage: 'Stage 3: Predict & Observe',
      actionType: 'Scenario Prediction Submitted',
      target: prediction.scenarioTitle,
      studentInput: `Purity: ${prediction.predictedPurity} | Pressure: ${prediction.predictedPressure} | Note: ${prediction.writtenHypothesis || 'N/A'}`,
      result: `${purityMatch} · ${pressureMatch}`
    };

    setStudent((prev) => ({
      ...prev,
      scenarioPredictions: {
        ...(prev.scenarioPredictions || {}),
        [prediction.scenarioId]: prediction
      },
      actionLog: [...(prev.actionLog || []), newEvent]
    }));
  };

  const handleSaveQuizAnswers = (answers: Record<number, number>, score: number) => {
    setStudent((prev) => ({
      ...prev,
      quizAnswers: answers,
      quizScore: score,
      quizSubmitted: true,
      quizAttempts: prev.quizAttempts + 1
    }));
  };

  const handleSaveLabelling = (labels: Record<string, string>) => {
    setStudent((prev) => ({
      ...prev,
      labellingAnswers: labels,
      labellingCompleted: Object.keys(labels).length >= 8
    }));
  };

  const handleUpdateReflection = (reflection: {
    understood: string;
    unsure: string;
    questionForTeacher: string;
  }) => {
    const newEvent: StudentActionEvent = {
      id: `${Date.now()}-refl`,
      timestamp: new Date().toISOString(),
      stage: 'Stage 5: Reflect',
      actionType: 'Reflection Saved',
      target: '3 Reflection Prompts',
      studentInput: `Understood: ${reflection.understood.slice(0, 50)} | Question: ${reflection.questionForTeacher.slice(0, 50)}`,
      result: 'Saved'
    };

    setStudent((prev) => ({
      ...prev,
      reflection: {
        ...reflection,
        submittedAt: new Date().toISOString()
      },
      actionLog: [...(prev.actionLog || []), newEvent]
    }));
  };

  const handleDownloadCSV = () => {
    downloadStudentMonitoringCSV(student);
  };

  const handleResetLesson = () => {
    const fresh: StudentProfile = {
      name: student.name,
      className: student.className,
      startedAt: new Date().toISOString(),
      completedStages: [1],
      exploredEquipmentIds: ['column-shell'],
      scenarioPredictions: {},
      actionLog: [],
      quizAnswers: {},
      quizSubmitted: false,
      quizScore: 0,
      quizAttempts: 0,
      labellingAnswers: {},
      labellingCompleted: false,
      reflection: {
        understood: '',
        unsure: '',
        questionForTeacher: ''
      }
    };
    setStudent(fresh);
    setCurrentStage(1);
    setIsResetConfirmOpen(false);
  };

  const isDark = theme === 'dcs-dark';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isDark ? 'bg-[#0B1120] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Universal Top Navigation Header */}
      <Header
        currentStage={currentStage}
        onSelectStage={handleSelectStage}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        student={student}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
        onDownloadCSV={handleDownloadCSV}
        onResetLesson={() => setIsResetConfirmOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* Author Credit Sub-banner */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800/80 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              Explore the Distillation Tower
            </span>
            <span>·</span>
            <span className="text-amber-500 font-bold">Created by Ms Syahirah</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Overall Progress: {student.completedStages.length} / 5 Stages</span>
            <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-full transition-all duration-300"
                style={{ width: `${(student.completedStages.length / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Stage View Switcher */}
        {currentStage === 1 && (
          <Stage1Equipment
            theme={theme}
            reducedMotion={reducedMotion}
            onNextStage={() => handleSelectStage(2)}
            onMarkStageComplete={markStageComplete}
            exploredEquipmentIds={student.exploredEquipmentIds || ['column-shell']}
            onExploreEquipment={handleExploreEquipment}
          />
        )}

        {currentStage === 2 && (
          <Stage2Flow
            theme={theme}
            reducedMotion={reducedMotion}
            onNextStage={() => handleSelectStage(3)}
            onPrevStage={() => handleSelectStage(1)}
            onMarkStageComplete={markStageComplete}
            onLogFlowAction={(actionType, target, input, result) =>
              logStudentAction('Stage 2: Flow', actionType, target, input, result)
            }
          />
        )}

        {currentStage === 3 && (
          <Stage3Predict
            theme={theme}
            reducedMotion={reducedMotion}
            onNextStage={() => handleSelectStage(4)}
            onPrevStage={() => handleSelectStage(2)}
            onMarkStageComplete={markStageComplete}
            savedScenarioPredictions={student.scenarioPredictions || {}}
            onSaveScenarioPrediction={handleSaveScenarioPrediction}
          />
        )}

        {currentStage === 4 && (
          <Stage4Quiz
            theme={theme}
            reducedMotion={reducedMotion}
            onNextStage={() => handleSelectStage(5)}
            onPrevStage={() => handleSelectStage(3)}
            onMarkStageComplete={markStageComplete}
            savedAnswers={student.quizAnswers}
            savedLabelling={student.labellingAnswers || {}}
            onSaveAnswers={handleSaveQuizAnswers}
            onSaveLabelling={handleSaveLabelling}
            onLogQuizAction={(actionType, target, input, result) =>
              logStudentAction('Stage 4: Check Understanding', actionType, target, input, result)
            }
          />
        )}

        {currentStage === 5 && (
          <Stage5Reflect
            theme={theme}
            student={student}
            onUpdateReflection={handleUpdateReflection}
            onOpenTeacherReview={() => setIsTeacherModalOpen(true)}
            onDownloadCSV={handleDownloadCSV}
            onPrevStage={() => handleSelectStage(4)}
            onMarkStageComplete={markStageComplete}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer theme={theme} onOpenTeacherModal={() => setIsTeacherModalOpen(true)} />

      {/* Teacher Review Panel Modal */}
      <TeacherReviewModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        theme={theme}
        student={student}
        onDownloadCSV={handleDownloadCSV}
      />

      {/* Student Profile Setup Modal */}
      <StudentModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
        theme={theme}
        student={student}
        onSaveStudent={handleSaveStudent}
      />

      {/* Reset Lesson Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div
            className={`w-full max-w-sm rounded-xl border p-5 shadow-2xl space-y-4 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5 text-rose-500">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <h3 className="font-bold text-sm">Reset Lesson Progress?</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This will clear your quiz scores, scenario predictions, action log, and reflection answers so you can restart the lesson from Stage 1. Your name and class will be preserved.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                  isDark
                    ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                    : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleResetLesson}
                className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
              >
                Yes, Reset Lesson
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
