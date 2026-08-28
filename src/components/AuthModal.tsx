import React, { useState } from "react";
import { X, UserPlus, LogIn } from "lucide-react";
import { UserProfile, Language } from "../types";
import { translations } from "../utils/i18n";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (name: string, email: string) => void;
  currentProfile: UserProfile;
  lang: Language;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
  currentProfile,
  lang,
}) => {
  const t = translations[lang];
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState(currentProfile.name || "");
  const [email, setEmail] = useState(currentProfile.email || "");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onSaveProfile(name || email.split("@")[0], email);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in font-tajawal">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1aab8a] via-[#12977c] to-[#0d8060] p-6 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 start-3 p-1 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mb-2">
            <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg font-tajawal">{t.authTitle}</h3>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              tab === "login"
                ? "text-[#1aab8a] border-b-2 border-[#1aab8a]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t.authLoginTab}
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-3 text-xs font-bold transition-colors ${
              tab === "signup"
                ? "text-[#1aab8a] border-b-2 border-[#1aab8a]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {t.authSignupTab}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {tab === "signup" && (
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                {t.authFullName}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.authFullNamePlaceholder}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1aab8a]"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              {t.authEmail}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1aab8a]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
              {t.authPassword}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-[#1aab8a]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#1aab8a] to-[#0d8060] text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110 shadow-md shadow-emerald-500/20 pt-3"
          >
            {tab === "login" ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{tab === "login" ? t.authLoginTab : t.authSignupTab}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

