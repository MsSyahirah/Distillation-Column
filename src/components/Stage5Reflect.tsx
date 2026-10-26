import React, { useState } from 'react';
import { ThemeMode, StudentProfile } from '../types/distillation';
import {
  Copy,
  Check,
  PenTool,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  FileText,
  Share2,
  GraduationCap,
  Save,
  Download
} from 'lucide-react';

interface Stage5Props {
  theme: ThemeMode;
  student: StudentProfile;
  onUpdateReflection: (reflection: {
    understood: string;
    unsure: string;
    questionForTeacher: string;
  }) => void;
  onOpenTeacherReview: () => void;
  onDownloadCSV: () => void;
  onPrevStage: () => void;
  onMarkStageComplete: (stage: number) => void;
}

export const Stage5Reflect: React.FC<Stage5Props> = ({
  theme,
  student,
  onUpdateReflection,
  onOpenTeacherReview,
  onDownloadCSV,
  onPrevStage,
  onMarkStageComplete
}) => {
  const isDark = theme === 'dcs-dark';

  const [understood, setUnderstood] = useState<string>(student.reflection.understood || '');
  const [unsure, setUnsure] = useState<string>(student.reflection.unsure || '');
  const [question, setQuestion] = useState<string>(student.reflection.questionForTeacher || '');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const handleSave = () => {
    onUpdateReflection({
      understood,
      unsure,
      questionForTeacher: question
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
    if (understood.trim() || unsure.trim() || question.trim()) {
      onMarkStageComplete(5);
    }
  };

  const getMiroFormattedText = () => {
    return `[DISTILLATION TOWER LESSON REFLECTION]
Student: ${student.name || 'Anonymous'} | Class: ${student.className || 'ITE CPT'}
Instructor: Ms Syahirah

🟢 ONE THING I UNDERSTAND:
${understood || '(Not filled yet)'}

🟡 ONE THING I AM STILL UNSURE ABOUT:
${unsure || '(Not filled yet)'}

🔵 ONE QUESTION I WANT TO ASK MS SYAHIRAH:
${question || '(Not filled yet)'}

Quiz Score: ${student.quizScore}/5`;
  };

  const handleCopyMiro = () => {
    handleSave();
    const text = getMiroFormattedText();
    navigator.clipboard.writeText(text);
    setCopiedType('miro');
    setTimeout(() => setCopiedType(null), 3000);
  };

  const handleCopyMarkdown = () => {
    handleSave();
    const md = `### Distillation Tower Lesson Reflection
**Student:** ${student.name || 'Student'} (${student.className || 'ITE'})  
**Instructor:** Ms Syahirah  
**Quiz Score:** ${student.quizScore}/5  

1. **One thing I understand:**  
   ${understood || '_None provided_'}

2. **One thing I am still unsure about:**  
   ${unsure || '_None provided_'}

3. **One question I want to ask Ms Syahirah:**  
   ${question || '_None provided_'}`;

    navigator.clipboard.writeText(md);
    setCopiedType('markdown');
    setTimeout(() => setCopiedType(null), 3000);
  };

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
            <span>Stage 5 of 5</span>
            <span>·</span>
            <span>Student Reflection</span>
          </div>
          <h2 className="text-xl font-bold mt-0.5">Reflect & Connect</h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Solidify your chemical process intuition by recording your takeaways and questions for Ms Syahirah.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            onClick={() => {
              handleSave();
              onDownloadCSV();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Download Monitoring CSV</span>
          </button>

          <button
            onClick={onOpenTeacherReview}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border font-semibold text-xs transition-colors ${
              isDark
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300 hover:bg-amber-500/20'
                : 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-500" />
            <span>Open Teacher Review & Print Slip</span>
          </button>
        </div>
      </div>

      {/* Main Form & Export Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div
          className={`lg:col-span-7 rounded-xl border p-6 space-y-5 transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
          }`}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. One thing I understand clearly:</span>
            </label>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              e.g., Why rising vapour is richer in lighter components, or the role of the reboiler and condenser.
            </p>
            <textarea
              value={understood}
              onChange={(e) => setUnderstood(e.target.value)}
              placeholder="Write your understanding here in simple English..."
              rows={3}
              className={`w-full p-3 rounded-lg border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>2. One thing I am still unsure about:</span>
            </label>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              e.g., Downcomer hydraulics, tray weeping vs flooding, or how reflux ratio changes distillate rate.
            </p>
            <textarea
              value={unsure}
              onChange={(e) => setUnsure(e.target.value)}
              placeholder="What feels tricky or needs another explanation?..."
              rows={3}
              className={`w-full p-3 rounded-lg border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sky-500 flex items-center gap-1.5">
              <PenTool className="w-3.5 h-3.5" />
              <span>3. One question I want to ask Ms Syahirah:</span>
            </label>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              A specific question you can bring to your next tutorial, lab session, or Miro board discussion.
            </p>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Dear Ms Syahirah, could you clarify..."
              rows={3}
              className={`w-full p-3 rounded-lg border text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                isDark
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Reflection</span>
              </button>
              {saveToast && (
                <span className="text-xs text-emerald-500 font-semibold">✓ Saved successfully!</span>
              )}
            </div>

            <span className="text-xs text-slate-400">
              Student: {student.name || 'Anonymous'} ({student.className || 'Not set'})
            </span>
          </div>
        </div>

        {/* Copy & Submission Export Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className={`p-5 rounded-xl border transition-all ${
              isDark
                ? 'bg-slate-900 border-sky-500/40 shadow-lg'
                : 'bg-white border-sky-300 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-2 border-b pb-3 mb-3 border-slate-200 dark:border-slate-800">
              <Share2 className="w-4 h-4 text-sky-500" />
              <h3 className="text-sm font-bold">Export CSV or Copy for Miro / LMS</h3>
            </div>

            <p className={`text-xs leading-relaxed mb-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Download a full <strong>.CSV Monitoring File</strong> containing all your predictions, quiz scores, and timestamped actions, or copy your reflection for Miro.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  handleSave();
                  onDownloadCSV();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download Full Student Action CSV</span>
              </button>

              <button
                onClick={handleCopyMiro}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                {copiedType === 'miro' ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span>{copiedType === 'miro' ? 'Copied to Clipboard!' : 'Copy Formatted for Miro'}</span>
              </button>

              <button
                onClick={handleCopyMarkdown}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border font-semibold text-xs transition-colors ${
                  isDark
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                }`}
              >
                {copiedType === 'markdown' ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                <span>{copiedType === 'markdown' ? 'Copied Markdown!' : 'Copy Markdown Summary'}</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Preview of Miro Text:
              </span>
              <pre
                className={`p-3 rounded-lg text-[11px] font-mono whitespace-pre-wrap max-h-40 overflow-y-auto ${
                  isDark ? 'bg-slate-950 text-slate-300' : 'bg-slate-100 text-slate-800'
                }`}
              >
                {getMiroFormattedText()}
              </pre>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500">
                Ready for Teacher Inspection?
              </h4>
            </div>
            <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Ms Syahirah can view this device’s live action log, scenario predictions, and completion slip in the Teacher Review Panel.
            </p>
            <button
              onClick={onOpenTeacherReview}
              className="w-full py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors"
            >
              Open Teacher Review & Action Monitor
            </button>
          </div>

          <div className="flex justify-start">
            <button
              onClick={onPrevStage}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back: Check Understanding</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
