import React from 'react';
import { ThemeMode, StudentProfile } from '../types/distillation';
import { TEACHER_ASSUMPTIONS, PREDICTION_SCENARIOS } from '../data/distillationData';
import {
  X,
  Printer,
  GraduationCap,
  CheckCircle2,
  Clock,
  BookOpen,
  FileCheck,
  User,
  ShieldCheck,
  Download,
  Activity,
  Sliders
} from 'lucide-react';

interface TeacherReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  student: StudentProfile;
  onDownloadCSV: () => void;
}

export const TeacherReviewModal: React.FC<TeacherReviewModalProps> = ({
  isOpen,
  onClose,
  theme,
  student,
  onDownloadCSV
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dcs-dark';

  const handlePrint = () => {
    window.print();
  };

  const scenarioPreds = student.scenarioPredictions || {};
  const actionLog = student.actionLog || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div
        className={`relative w-full max-w-5xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden my-auto ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`px-6 py-4 border-b flex flex-wrap items-center justify-between gap-3 ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-500">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Teacher Review & Student Action Monitor
              </h2>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
                Created by Ms Syahirah · ITE Chemical Process Technology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onDownloadCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
              title="Download comprehensive CSV report of student predictions, quiz scores, and action log"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV Report ({actionLog.length} actions)</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
              title="Print or save PDF of student progress slip"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-slate-700 text-slate-400 hover:text-white'
                  : 'border-slate-200 text-slate-600 hover:text-black'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Printable Report Section */}
          <div id="printable-student-report" className="space-y-6">
            {/* Student Identification & Session Summary */}
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between border-b pb-3 mb-3 border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-sky-500" />
                  <span className="font-bold text-sm">Student Record</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Session: {new Date(student.startedAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Student Name
                  </span>
                  <span className="font-bold text-sm text-sky-500">
                    {student.name || 'Not provided'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Class / Cohort
                  </span>
                  <span className="font-bold text-sm">{student.className || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Quiz Score
                  </span>
                  <span className="font-bold text-sm text-emerald-500 tabular-nums">
                    {student.quizScore} / 5 Correct
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Scenarios Predicted
                  </span>
                  <span className="font-bold text-sm text-amber-500 tabular-nums">
                    {Object.keys(scenarioPreds).length} / {PREDICTION_SCENARIOS.length}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider">
                    Actions Logged
                  </span>
                  <span className="font-bold text-sm tabular-nums">{actionLog.length} events</span>
                </div>
              </div>
            </div>

            {/* Stages Checklist */}
            <div
              className={`p-4 rounded-xl border ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-sky-500" />
                <span>Lesson Stages Verification</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {[
                  { num: 1, label: '01. Equipment' },
                  { num: 2, label: '02. Flow Paths' },
                  { num: 3, label: '03. Predict & Observe' },
                  { num: 4, label: '04. Check Understanding' },
                  { num: 5, label: '05. Reflection' }
                ].map((st) => {
                  const done = student.completedStages.includes(st.num);
                  return (
                    <div
                      key={st.num}
                      className={`p-2 rounded-lg border flex items-center justify-between text-xs font-semibold ${
                        done
                          ? isDark
                            ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
                            : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : isDark
                          ? 'bg-slate-900 border-slate-800 text-slate-500'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      <span>{st.label}</span>
                      {done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <span className="text-[10px] opacity-70">Incomplete</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage 3 Simulation Scenario Predictions Table */}
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="font-bold text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-500" />
                <span>Stage 3: Simulation Scenario Predictions & Hydraulic Checks</span>
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className={`border-b text-[11px] uppercase tracking-wider ${
                        isDark
                          ? 'border-slate-800 text-slate-400'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <th className="py-2 pr-3">Scenario</th>
                      <th className="py-2 px-3">Purity Prediction</th>
                      <th className="py-2 px-3">Pressure (ΔP) Prediction</th>
                      <th className="py-2 px-3">Written Hypothesis</th>
                      <th className="py-2 pl-3">Behaviour / Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/70">
                    {PREDICTION_SCENARIOS.map((sc) => {
                      const p = scenarioPreds[sc.id];
                      return (
                        <tr key={sc.id}>
                          <td className="py-2 pr-3 font-semibold">{sc.shortLabel}</td>
                          <td className="py-2 px-3">
                            {p ? (
                              <span
                                className={
                                  p.predictedPurity === sc.expectedPurityImpact
                                    ? 'text-emerald-500 font-semibold'
                                    : 'text-amber-500'
                                }
                              >
                                {p.predictedPurity}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3">
                            {p ? (
                              <span
                                className={
                                  p.predictedPressure === sc.expectedPressureImpact
                                    ? 'text-emerald-500 font-semibold'
                                    : 'text-amber-500'
                                }
                              >
                                {p.predictedPressure}
                              </span>
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>
                          <td className="py-2 px-3 max-w-xs truncate">
                            {p?.writtenHypothesis || <span className="text-slate-400">-</span>}
                          </td>
                          <td className="py-2 pl-3">
                            {p ? (
                              <span>
                                {p.behaviourCorrect ? '✅ Behaviour' : '⚠️ Behaviour'} ·{' '}
                                {p.actionCorrect ? '✅ Action' : '⚠️ Action'}
                              </span>
                            ) : (
                              <span className="text-slate-400">Not attempted</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Student Reflection Answers */}
            <div
              className={`p-5 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className="font-bold text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>Student Reflection Responses</span>
              </h3>

              <div className="space-y-3">
                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="font-bold text-emerald-500 block mb-1">
                    1. One thing understood:
                  </span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    {student.reflection.understood ||
                      '(Student has not yet completed this reflection prompt)'}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="font-bold text-amber-500 block mb-1">
                    2. One thing still unsure about:
                  </span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    {student.reflection.unsure ||
                      '(Student has not yet completed this reflection prompt)'}
                  </p>
                </div>

                <div
                  className={`p-3 rounded-lg border ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <span className="font-bold text-sky-500 block mb-1">
                    3. Question for Ms Syahirah:
                  </span>
                  <p className={isDark ? 'text-slate-200' : 'text-slate-800'}>
                    {student.reflection.questionForTeacher ||
                      '(Student has not yet written a question)'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chronological Student Action Log Table */}
          <div
            className={`p-5 rounded-xl border space-y-3 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <h3 className="font-bold text-sm">
                  Chronological Student Action Log ({actionLog.length} Recorded Events)
                </h3>
              </div>
              <button
                onClick={onDownloadCSV}
                className="flex items-center gap-1 text-emerald-500 hover:underline font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export to CSV</span>
              </button>
            </div>

            <div className="max-h-60 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`sticky top-0 text-[10px] uppercase tracking-wider ${
                    isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <tr>
                    <th className="p-2">#</th>
                    <th className="p-2">Time</th>
                    <th className="p-2">Stage</th>
                    <th className="p-2">Action Type</th>
                    <th className="p-2">Target / Scenario</th>
                    <th className="p-2">Student Input / Prediction</th>
                    <th className="p-2">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-[11px]">
                  {actionLog.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-4 text-center text-slate-400">
                        Interactions will appear here automatically as the student clicks components, predicts scenarios, and answers questions.
                      </td>
                    </tr>
                  ) : (
                    actionLog.map((evt, idx) => (
                      <tr key={evt.id}>
                        <td className="p-2 font-mono text-slate-400 tabular-nums">{idx + 1}</td>
                        <td className="p-2 font-mono whitespace-nowrap tabular-nums">
                          {new Date(evt.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-2 whitespace-nowrap">{evt.stage}</td>
                        <td className="p-2 font-semibold text-sky-500 whitespace-nowrap">
                          {evt.actionType}
                        </td>
                        <td className="p-2">{evt.target}</td>
                        <td className="p-2 max-w-xs truncate">{evt.studentInput}</td>
                        <td className="p-2 font-semibold text-emerald-500">{evt.result}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Teacher Content Review & Scientific Assumptions Reference */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-bold text-sm">
                  Instructor Content Guide & Scientific Assumptions
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Curriculum design assumptions formulated for ITE Chemical Process Technology fundamentals.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {TEACHER_ASSUMPTIONS.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border leading-relaxed ${
                    isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sky-500">{item.topic}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.assumption}
                    </span>
                  </div>
                  <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                    {item.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className={`px-6 py-3 border-t flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
          }`}
        >
          <span className="text-[11px] text-slate-400">
            Explore the Distillation Tower · Created by Ms Syahirah
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
