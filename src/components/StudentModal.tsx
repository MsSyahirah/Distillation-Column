import React, { useState } from 'react';
import { ThemeMode, StudentProfile } from '../types/distillation';
import { User, X, Check, GraduationCap } from 'lucide-react';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
  student: StudentProfile;
  onSaveStudent: (name: string, className: string) => void;
}

export const StudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  theme,
  student,
  onSaveStudent
}) => {
  if (!isOpen) return null;
  const isDark = theme === 'dcs-dark';

  const [name, setName] = useState<string>(student.name || '');
  const [className, setClassName] = useState<string>(student.className || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveStudent(name.trim(), className.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className={`relative w-full max-w-md rounded-2xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className={`px-5 py-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Student Profile Information</h3>
              <p className="text-[11px] text-slate-400">Recorded for Ms Syahirah's review</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg border transition-colors ${
              isDark ? 'border-slate-700 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-400 block mb-1">
              Your Full Name:
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nurul Syahirah"
              className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div>
            <label className="font-bold text-slate-400 block mb-1">
              Your Class / Cohort:
            </label>
            <input
              type="text"
              required
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g. CPT 2A / ITE College East"
              className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
                isDark 
                  ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600' 
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className={`p-3 rounded-lg border leading-relaxed ${
            isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <p className="flex items-center gap-1.5 font-semibold text-sky-500 mb-0.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Independent Classroom Work</span>
            </p>
            <p className="text-[11px]">
              No passwords or logins are required. Your responses and quiz results are saved directly on this browser for you and Ms Syahirah to inspect and print.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Details</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
