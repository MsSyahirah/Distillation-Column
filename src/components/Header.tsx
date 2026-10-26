import React from 'react';
import { ThemeMode, StudentProfile } from '../types/distillation';
import {
  Sun,
  Moon,
  RotateCcw,
  User,
  GraduationCap,
  Activity,
  Eye,
  HelpCircle,
  PenTool,
  Sliders,
  Download
} from 'lucide-react';

interface HeaderProps {
  currentStage: number;
  onSelectStage: (stage: number) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  student: StudentProfile;
  onOpenStudentModal: () => void;
  onOpenTeacherModal: () => void;
  onDownloadCSV: () => void;
  onResetLesson: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStage,
  onSelectStage,
  theme,
  onToggleTheme,
  reducedMotion,
  onToggleReducedMotion,
  student,
  onOpenStudentModal,
  onOpenTeacherModal,
  onDownloadCSV,
  onResetLesson
}) => {
  const isDark = theme === 'dcs-dark';

  const stages = [
    { num: 1, label: '01. Equipment', icon: Sliders },
    { num: 2, label: '02. Flow Paths', icon: Activity },
    { num: 3, label: '03. Predict & Observe', icon: Eye },
    { num: 4, label: '04. Check Understanding', icon: HelpCircle },
    { num: 5, label: '05. Reflect', icon: PenTool }
  ];

  const actionCount = student.actionLog ? student.actionLog.length : 0;

  return (
    <header
      className={`border-b transition-colors ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-100'
          : 'bg-white/90 border-slate-200 text-slate-900'
      } sticky top-0 z-40 backdrop-blur-md`}
    >
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Author zone */}
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className={`p-1.5 rounded-lg ${
                isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-700'
              }`}
            >
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-tight">
                Explore the Distillation Tower
              </h1>
              <p className={`text-xs font-semibold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                Created by Ms Syahirah{' '}
                <span className="opacity-70 font-normal">· ITE Chemical Process Technology</span>
              </p>
            </div>
          </div>
        </div>

        {/* Global Toolbar & Controls */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          {/* Student profile chip */}
          <button
            onClick={onOpenStudentModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-medium transition-colors whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:border-sky-500 text-slate-200'
                : 'bg-slate-50 border-slate-200 hover:border-sky-400 text-slate-700'
            }`}
            title="Click to view or update your student details"
          >
            <User className="w-3.5 h-3.5 text-sky-500" />
            <span>
              {student.name ? `${student.name} (${student.className || 'ITE'})` : 'Set Student Info'}
            </span>
          </button>

          {/* Direct Download CSV Button */}
          <button
            onClick={onDownloadCSV}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25'
                : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
            }`}
            title="Download CSV file to monitor all student actions, predictions, and quiz results"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CSV ({actionCount})</span>
          </button>

          {/* Teacher Review button */}
          <button
            onClick={onOpenTeacherModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-colors whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
            title="Open Teacher Review Panel, Student Action Monitor, and scientific assumptions"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher Review</span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300'
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
            aria-label="Toggle visual theme"
            title="Switch between DCS Console (Dark) and Clean Lab (Light)"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-sky-600" />
            )}
            <span className="hidden sm:inline">{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Motion toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`px-2.5 py-1.5 rounded-lg border transition-colors font-medium whitespace-nowrap shrink-0 ${
              reducedMotion
                ? isDark
                  ? 'bg-sky-900/40 border-sky-600 text-sky-300'
                  : 'bg-sky-100 border-sky-300 text-sky-800'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}
            title="Enable/disable motion animations"
          >
            {reducedMotion ? 'Motion: Off' : 'Motion: On'}
          </button>

          {/* Reset button */}
          <button
            onClick={onResetLesson}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border transition-colors text-rose-500 hover:text-rose-600 whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-slate-800 border-slate-700 hover:border-rose-800'
                : 'bg-slate-50 border-slate-200 hover:border-rose-300'
            }`}
            title="Reset lesson progress and start fresh"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Stage Navigation Tabs */}
      <div
        className={`border-t ${
          isDark ? 'border-slate-800/80 bg-slate-950/60' : 'border-slate-200/80 bg-slate-50/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar gap-1 py-1.5">
          {stages.map((stage) => {
            const isActive = currentStage === stage.num;
            const isCompleted = student.completedStages.includes(stage.num);
            const Icon = stage.icon;

            return (
              <button
                key={stage.num}
                onClick={() => onSelectStage(stage.num)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-sm'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{stage.label}</span>
                {isCompleted && (
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isActive ? 'bg-emerald-300' : 'bg-emerald-500'
                    }`}
                    title="Completed"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
