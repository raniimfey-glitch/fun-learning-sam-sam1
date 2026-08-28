import React, { useState } from "react";
import { Lock, Unlock, X } from "lucide-react";
import { AppItem, Language } from "../types";
import { translations, getAppName } from "../utils/i18n";

interface UnlockModalProps {
  app: AppItem | null;
  onUnlock: (passcode: string) => boolean;
  onClose: () => void;
  lang: Language;
}

export const UnlockModal: React.FC<UnlockModalProps> = ({ app, onUnlock, onClose, lang }) => {
  const t = translations[lang];
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  if (!app) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlock(passcode.trim());
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-tajawal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-amber-500/20">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 start-3 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center text-2xl mb-2">
            💎
          </div>
          <h3 className="font-bold text-lg font-tajawal">{t.unlockTitle}</h3>
          <p className="text-xs text-white/90">{t.unlockSubtitle}</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-center border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">{t.unlockTargetApp}</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 text-sm font-tajawal">
              {getAppName(app, lang)}
            </span>
          </div>

          <div>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder={t.unlockPasscodePlaceholder}
              className={`w-full px-4 py-2.5 text-center text-sm rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none transition-all ${
                error
                  ? "border-red-500 ring-2 ring-red-500/20"
                  : "border-slate-200 dark:border-slate-700 focus:border-amber-500"
              }`}
              autoFocus
            />
            {error && (
              <p className="text-xs text-red-500 font-bold text-center mt-2">
                {t.unlockError}
              </p>
            )}
          </div>

          <div className="space-y-2 pt-1">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:brightness-110 shadow-md shadow-amber-500/20"
            >
              <Unlock className="w-4 h-4" />
              <span>{t.unlockButton}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {t.cancel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

