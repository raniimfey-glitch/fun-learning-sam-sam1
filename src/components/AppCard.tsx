import React from "react";
import { Star, CheckCircle, Lock, ArrowLeft, ArrowRight } from "lucide-react";
import { AppItem, ReviewItem, Language } from "../types";
import { normalizeCategory } from "../data/initialApps";
import { translations, getCategoryLabel, getAppName, getAppDesc, getAppAge } from "../utils/i18n";

interface AppCardProps {
  app: AppItem;
  index: number;
  isFav: boolean;
  isDone: boolean;
  isVisited?: boolean;
  isUnlocked: boolean;
  reviews: ReviewItem[];
  onToggleFav: (index: number) => void;
  onToggleDone: (index: number) => void;
  onOpenPreview: (index: number) => void;
  onOpenUnlock: (index: number) => void;
  onOpenRating: (index: number) => void;
  lang: Language;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  index,
  isFav,
  isDone,
  isVisited,
  isUnlocked,
  reviews,
  onToggleFav,
  onToggleDone,
  onOpenPreview,
  onOpenUnlock,
  onOpenRating,
  lang,
}) => {
  const t = translations[lang];
  const isPaid = !!(app.paid && app.paidPass && app.paidPass.trim() !== "");
  const isPlaceholder = !app.url || app.url === "رابط_هنا" || app.url === "#";

  // Calculate rating average
  const ratingCount = reviews.length;
  const ratingAvg =
    ratingCount > 0
      ? Math.round((reviews.reduce((acc, r) => acc + r.stars, 0) / ratingCount) * 10) / 10
      : 0;

  const handleAction = () => {
    if (isPlaceholder) return;
    onOpenPreview(index);
  };

  return (
    <div
      onClick={handleAction}
      className={`glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between relative cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border-2 ${
        isDone
          ? "bg-gradient-to-br from-emerald-50/95 to-teal-50/90 dark:bg-emerald-950/80 border-emerald-500 shadow-md shadow-emerald-500/10"
          : isPaid
          ? "bg-white/95 dark:bg-slate-900/95 border-amber-400 dark:border-amber-500/80 hover:border-amber-500 hover:shadow-amber-500/15"
          : "bg-white/95 dark:bg-slate-900/95 border-emerald-500/20 dark:border-slate-700 hover:border-emerald-500 hover:shadow-emerald-500/15"
      }`}
    >
      {/* Top Card Header */}
      <div>
        <div className="flex items-start justify-between gap-2.5 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-50 dark:bg-emerald-900/60 border border-emerald-300/60 dark:border-emerald-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-emerald-500/10">
              {app.icon || "📱"}
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap mb-1">
                <span className="inline-block px-2.5 py-0.5 text-xs font-black rounded-full bg-emerald-100/90 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700 shadow-2xs">
                  {getCategoryLabel(app.cat, lang)}
                </span>
                {isPaid ? (
                  <span className="inline-block px-2.5 py-0.5 text-xs font-black rounded-full bg-gradient-to-r from-amber-100 to-amber-200 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700 shadow-2xs">
                    💎 {t.paid}
                  </span>
                ) : (
                  <span className="inline-block px-2.5 py-0.5 text-xs font-black rounded-full bg-teal-100/90 dark:bg-teal-950 text-teal-950 dark:text-teal-200 border border-teal-300 dark:border-teal-700 shadow-2xs">
                    ✨ {t.free}
                  </span>
                )}
              </div>
              <h3 className="font-black text-slate-900 dark:text-amber-300 text-base sm:text-lg leading-snug font-tajawal group-hover:text-emerald-700 dark:group-hover:text-amber-200 transition-colors">
                {getAppName(app, lang)}
              </h3>
            </div>
          </div>

          {/* Fav action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(index);
            }}
            className={`p-1.5 rounded-full transition-all active:scale-90 shrink-0 ${
              isFav ? "text-amber-500 bg-amber-50 dark:bg-amber-950/60 shadow-xs ring-2 ring-amber-300/40" : "text-slate-400 dark:text-slate-300 hover:text-amber-500 hover:bg-amber-50/60"
            }`}
            title={isFav ? t.toastFavRemoved : t.toastFavAdded}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Rating Stars & Dedicated Rating Button */}
        <div className="flex items-center justify-between gap-1.5 mb-3 pt-0.5">
          <div className="flex items-center gap-1 text-sm">
            <div className="flex text-amber-400 drop-shadow-2xs">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className="text-sm">
                  {s <= Math.round(ratingAvg) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-slate-800 dark:text-amber-200 text-xs font-black">
              {ratingCount > 0 ? `(${ratingAvg})` : ""}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenRating(index);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-600 text-amber-950 dark:text-amber-200 hover:bg-amber-200/90 text-xs font-black transition-all active:scale-95 shadow-2xs hover:shadow-xs"
            title={t.ratingTitle}
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{t.rate}</span>
          </button>
        </div>

        {/* App Description - High Contrast Clear Text */}
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 font-bold leading-relaxed mb-3">
          {getAppDesc(app, lang)}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3 border-t border-emerald-500/15 dark:border-slate-800 flex items-center justify-between gap-2 text-xs">
        <span className="text-emerald-900 dark:text-emerald-300 font-black text-xs sm:text-sm bg-emerald-50/80 dark:bg-transparent px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-transparent">{getAppAge(app, lang)}</span>

        <div className="flex items-center gap-2">
          {/* Mark Done Button */}
          {!isPlaceholder && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleDone(index);
              }}
              className={`px-3 py-1 rounded-full border-2 text-xs font-black transition-all active:scale-95 flex items-center gap-1 shadow-2xs ${
                isDone
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 border-emerald-600 text-white shadow-emerald-600/30"
                  : isVisited
                  ? "border-emerald-400 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 bg-emerald-50/90 dark:hover:bg-emerald-950/40 hover:bg-emerald-100"
                  : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 hover:bg-slate-100"
              }`}
              title={
                isDone
                  ? t.completed
                  : isVisited
                  ? t.markDone
                  : t.toastMustPreviewFirst
              }
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isDone ? t.completed : t.markDone}</span>
            </button>
          )}

          {/* Status / Action Button */}
          {isPlaceholder ? (
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-black">
              ⏳ {t.comingSoon}
            </span>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenPreview(index);
              }}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1aab8a] via-teal-600 to-[#0d8060] text-white text-xs font-black flex items-center gap-1 shadow-md shadow-emerald-600/30 hover:shadow-lg hover:shadow-emerald-600/40 hover:brightness-110 active:scale-95 transition-all"
            >
              <span>{t.preview}</span>
              {lang === "ar" ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

