import React from "react";
import { Trophy, Award, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { UserProfile, BadgeDef, AppItem, Language } from "../types";
import { BADGES_LIST } from "../data/initialApps";
import { translations } from "../utils/i18n";

interface JourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  apps: AppItem[];
  lang: Language;
}

export const JourneyModal: React.FC<JourneyModalProps> = ({
  isOpen,
  onClose,
  user,
  apps,
  lang,
}) => {
  const t = translations[lang];
  if (!isOpen) return null;

  const completedCount = user.completed.length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fade-in font-tajawal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1aab8a] via-[#12977c] to-[#0d8060] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              title={t.close}
            >
              {lang === "ar" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
            </button>
            <h2 className="font-bold text-base md:text-lg font-tajawal flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-300" />
              <span>{t.journeyTitle} — {user.name}</span>
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-start">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-2xl text-center border border-emerald-200 dark:border-emerald-800">
              <span className="text-2xl font-extrabold text-[#1aab8a] block">
                {completedCount}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.journeyCompletedApps}
              </span>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-2xl text-center border border-amber-200 dark:border-amber-800">
              <span className="text-2xl font-extrabold text-amber-500 block">
                {user.points}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.journeyPoints}
              </span>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/40 p-3.5 rounded-2xl text-center border border-purple-200 dark:border-purple-800">
              <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 block">
                {user.badges.length}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {t.journeyBadges}
              </span>
            </div>
          </div>

          {/* Badges Section */}
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-1.5 font-tajawal">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{t.journeyBadgesHeading}</span>
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {BADGES_LIST.map((badge) => {
                const isEarned = completedCount >= badge.req;

                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      isEarned
                        ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                    }`}
                  >
                    <span className="text-lg">{badge.icon}</span>
                    <div className="text-start">
                      <div className="font-bold">{badge.label}</div>
                      <div className="text-[10px] text-slate-400">
                        {isEarned ? (lang === "ar" ? "مكتسبة ✓" : lang === "fr" ? "Obtenu ✓" : "Earned ✓") : `${badge.req} apps`}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completed Apps Timeline */}
          <div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-1.5 font-tajawal">
              <CheckCircle className="w-4 h-4 text-[#1aab8a]" />
              <span>{t.journeyCompletedRecent}</span>
            </h3>

            {user.completed.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                {t.journeyNoCompleted}
              </div>
            ) : (
              <div className="space-y-2">
                {user.completed.map((item, i) => {
                  const targetApp = apps[item.idx];

                  return (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between gap-3 text-xs border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">
                          {targetApp?.icon || "📱"}
                        </span>
                        <span className="font-bold text-slate-800 dark:text-slate-100">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

