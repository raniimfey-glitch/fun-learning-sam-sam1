import React, { useState } from "react";
import { X, Star, Send } from "lucide-react";
import { AppItem, ReviewItem, Language } from "../types";
import { translations } from "../utils/i18n";

interface RatingModalProps {
  app: AppItem | null;
  appIndex: number;
  reviews: ReviewItem[];
  onAddReview: (appIndex: number, stars: number, comment: string) => void;
  onClose: () => void;
  lang: Language;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  app,
  appIndex,
  reviews,
  onAddReview,
  onClose,
  lang,
}) => {
  const t = translations[lang];
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  if (!app) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddReview(appIndex, stars, comment.trim());
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-tajawal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1aab8a] to-[#0d8060] p-4 text-white flex items-center justify-between">
          <h3 className="font-bold text-sm md:text-base font-tajawal flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-300 fill-current" />
            <span>{t.ratingTitle} — {app.name}</span>
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Rating Form */}
          <form onSubmit={handleSubmit} className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                {t.ratingChooseStars}
              </span>
              <div className="flex justify-center gap-1 text-amber-400 text-2xl">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStars(s)}
                    className="hover:scale-125 transition-transform"
                  >
                    {s <= stars ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.ratingCommentPlaceholder}
                rows={2}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1aab8a] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-gradient-to-r from-[#1aab8a] to-[#0d8060] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.ratingSubmit}</span>
            </button>
          </form>

          {/* Reviews list */}
          <div>
            <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-2 font-tajawal">
              {t.ratingReviewsHeading} ({reviews.length})
            </h4>

            {reviews.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">
                {t.ratingNoReviews}
              </p>
            ) : (
              <div className="space-y-2">
                {reviews.map((r, i) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs space-y-1 border border-slate-100 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between text-slate-500">
                      <span className="font-bold text-slate-700 dark:text-slate-200">
                        {r.userName}
                      </span>
                      <div className="text-amber-400">
                        {"★".repeat(r.stars)}
                        {"☆".repeat(5 - r.stars)}
                      </div>
                    </div>
                    {r.comment && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {r.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

