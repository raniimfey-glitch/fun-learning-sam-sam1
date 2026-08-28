import React, { useState } from "react";
import { X, ExternalLink, Loader2, CheckCircle } from "lucide-react";
import { AppItem, Language } from "../types";
import { translations, getCategoryLabel, getAppName, getAppAge } from "../utils/i18n";

interface PreviewModalProps {
  app: AppItem | null;
  isDone?: boolean;
  onToggleDone?: () => void;
  onClose: () => void;
  lang: Language;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  app,
  isDone,
  onToggleDone,
  onClose,
  lang,
}) => {
  const t = translations[lang];
  const [isLoading, setIsLoading] = useState(true);

  if (!app) return null;

  const isPaid = !!(app.paid && app.paidPass && app.paidPass.trim() !== "");

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 md:p-6 animate-fade-in font-tajawal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-xl shrink-0">
              {app.icon || "📱"}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base font-tajawal">
                {getAppName(app, lang)}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {getCategoryLabel(app.cat, lang)} • {getAppAge(app, lang)} • {isPaid ? <span className="text-amber-600 dark:text-amber-400 font-bold">💎 {t.paid}</span> : <span className="text-emerald-600 dark:text-emerald-400 font-bold">✨ {t.free}</span>}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Frame Wrap */}
        <div className="relative flex-1 min-h-[380px] bg-slate-100 dark:bg-slate-950">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-[#1aab8a]" />
              <span className="text-xs font-medium">{t.loading}</span>
            </div>
          )}
          <iframe
            src={app.url}
            title={getAppName(app, lang)}
            onLoad={() => setIsLoading(false)}
            className="w-full h-full min-h-[420px] border-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 text-xs flex-wrap">
          <div className="flex items-center gap-2">
            {onToggleDone && (
              <button
                onClick={onToggleDone}
                className={`px-4 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                  isDone
                    ? "bg-emerald-600 text-white"
                    : "bg-amber-500 hover:bg-amber-600 text-white animate-pulse"
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>{isDone ? `${t.completed} 🎉` : `${t.markDone} (+10 pts) 🏆`}</span>
              </button>
            )}
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-500 font-medium hidden sm:inline">{app.age}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {t.close}
            </button>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#1aab8a] to-[#0d8060] text-white font-bold flex items-center gap-1.5 hover:brightness-110 shadow-sm"
            >
              <span>{t.openFullscreen}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

