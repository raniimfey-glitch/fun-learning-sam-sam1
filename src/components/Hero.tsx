import React from "react";
import { Sparkles, GraduationCap, Award, BookOpen } from "lucide-react";
import { Language } from "../types";
import { translations } from "../utils/i18n";

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <section className="pt-4 pb-3 px-4 max-w-5xl mx-auto">
      <div className="glass-card rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-amber-50/90 dark:from-slate-900/95 dark:via-emerald-950/60 dark:to-slate-900/95 border-2 border-emerald-400/50 dark:border-emerald-500/40 shadow-xl shadow-emerald-500/10 text-center relative overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute -top-12 -right-12 w-52 h-52 bg-gradient-to-br from-emerald-400/25 to-teal-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-52 h-52 bg-gradient-to-br from-amber-400/25 to-orange-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-white/40 dark:bg-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          {/* Platform Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1aab8a] via-teal-600 to-[#0d8060] text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/30 ring-2 ring-white/60 dark:ring-emerald-500/30">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 animate-pulse" />
            <span className="tracking-wide">{t.heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight font-tajawal">
            <span className="text-slate-900 dark:text-white drop-shadow-xs">{t.heroTitlePrefix} </span>
            <span className="bg-gradient-to-r from-emerald-600 via-[#1aab8a] to-teal-700 dark:from-amber-300 dark:to-amber-200 bg-clip-text text-transparent drop-shadow-sm">{t.heroTitleHighlight}</span>
          </h1>

          {/* Platform Description Container for High Contrast */}
          <div className="bg-white/90 dark:bg-slate-900/95 border-2 border-emerald-400/30 dark:border-emerald-500/50 p-4 sm:p-5 rounded-2xl max-w-2xl mx-auto shadow-md shadow-emerald-600/5 backdrop-blur-md">
            <p className="text-sm sm:text-base md:text-lg text-slate-800 dark:text-amber-100 leading-relaxed font-extrabold">
              {t.heroDesc}
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1.5">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-emerald-500/40 dark:border-emerald-500/60 text-emerald-950 dark:text-emerald-300 text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-500/10 hover:shadow-lg hover:border-emerald-500 transition-all">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.heroBadgeCurriculum}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-amber-500/40 dark:border-amber-500/60 text-amber-950 dark:text-amber-300 text-xs sm:text-sm font-extrabold shadow-md shadow-amber-500/10 hover:shadow-lg hover:border-amber-500 transition-all">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.heroBadgeInteractive}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/95 dark:bg-slate-800/95 border-2 border-teal-500/40 dark:border-teal-500/60 text-teal-950 dark:text-teal-300 text-xs sm:text-sm font-extrabold shadow-md shadow-teal-500/10 hover:shadow-lg hover:border-teal-500 transition-all">
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{t.heroBadgeLanguage}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};




