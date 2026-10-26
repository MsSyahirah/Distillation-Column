import React from 'react';
import { ThemeMode } from '../types/distillation';
import { GraduationCap, Award, Shield } from 'lucide-react';

interface FooterProps {
  theme: ThemeMode;
  onOpenTeacherModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onOpenTeacherModal }) => {
  const isDark = theme === 'dcs-dark';

  return (
    <footer className={`border-t mt-12 py-6 px-4 transition-colors ${
      isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        {/* Author Credit - Mandatory on all screens */}
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/10 text-amber-500">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-slate-100">
              Explore the Distillation Tower
            </span>
            <span className="mx-1.5 opacity-40">·</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              Created by Ms Syahirah
            </span>
            <span className="opacity-70 ml-1">
              (ITE Chemical Process Technology)
            </span>
          </div>
        </div>

        {/* Pedagogical Safety & Model Notice */}
        <div className="flex items-center gap-4 text-[11px]">
          <span className="opacity-75">
            Simplified Conceptual Teaching Model for Student Operators
          </span>
          <button
            onClick={onOpenTeacherModal}
            className="hover:underline text-sky-500 font-semibold"
          >
            Scientific Assumptions
          </button>
        </div>
      </div>
    </footer>
  );
};
