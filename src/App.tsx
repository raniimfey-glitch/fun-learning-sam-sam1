import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Home, Sparkles, BookOpen, Layers } from "lucide-react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { FilterBar } from "./components/FilterBar";
import { AppGrid } from "./components/AppGrid";
import { PreviewModal } from "./components/PreviewModal";
import { UnlockModal } from "./components/UnlockModal";
import { AuthModal } from "./components/AuthModal";
import { JourneyModal } from "./components/JourneyModal";
import { RatingModal } from "./components/RatingModal";
import { AdminModal } from "./components/AdminModal";
import { AiTutorModal } from "./components/AiTutorModal";
import { AboutModal } from "./components/AboutModal";
import { Toast } from "./components/Toast";

import { AppItem, ReviewItem, UserProfile, ViewportMode, Language } from "./types";
import {
  getStoredApps,
  saveStoredApps,
  getStoredFavs,
  saveStoredFavs,
  getStoredDone,
  saveStoredDone,
  getStoredUnlocked,
  saveStoredUnlocked,
  getStoredCustomCats,
  saveStoredCustomCats,
  getUserProfile,
  saveUserProfile,
  getStoredReviews,
  saveStoredReviews,
  getStoredVisited,
  saveStoredVisited,
} from "./utils/storage";
import { BADGES_LIST, normalizeCategory } from "./data/initialApps";
import {
  translations,
  getCategoryLabel,
  getStoredLanguage,
  saveStoredLanguage,
  applyDocumentLanguage,
} from "./utils/i18n";

export default function App() {
  // Multilingual State (ar, en, fr)
  const [lang, setLang] = useState<Language>(getStoredLanguage);

  useEffect(() => {
    saveStoredLanguage(lang);
    applyDocumentLanguage(lang);
  }, [lang]);

  const t = translations[lang];

  // Viewport Mode State (Responsive Viewport Selector)
  const [viewportMode, setViewportMode] = useState<ViewportMode>("full");

  // Manual Theme State (Strictly manual toggle saved in localStorage)
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem("ranimfay_dark") === "1";
  });

  // Data States
  const [apps, setApps] = useState<AppItem[]>(getStoredApps);
  const [favs, setFavs] = useState<Record<number, boolean>>(getStoredFavs);
  const [done, setDone] = useState<Record<number, boolean>>(getStoredDone);
  const [visited, setVisited] = useState<Record<number, boolean>>(getStoredVisited);
  const [unlocked, setUnlocked] = useState<Record<number, boolean>>(getStoredUnlocked);
  const [customCats, setCustomCats] = useState<string[]>(getStoredCustomCats);
  const [user, setUser] = useState<UserProfile>(getUserProfile);
  const [reviews, setReviews] = useState<Record<number, ReviewItem[]>>(getStoredReviews);

  // Filter States
  const [currentView, setCurrentView] = useState<"home" | "apps">("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [paidFilter, setPaidFilter] = useState<"all" | "free" | "paid">("all");

  const handleGoHome = () => {
    setCurrentView("home");
    setSelectedCategory("all");
    setSearchQuery("");
    window.scrollTo(0, 0);
  };

  const handleSelectCategoryAndNavigate = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView("apps");
    window.scrollTo(0, 0);
  };

  // Modal States
  const [previewApp, setPreviewApp] = useState<AppItem | null>(null);
  const [unlockAppIndex, setUnlockAppIndex] = useState<number | null>(null);
  const [ratingAppIndex, setRatingAppIndex] = useState<number | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isJourneyOpen, setIsJourneyOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAiTutorOpen, setIsAiTutorOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Toast Notification State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Sync Dark Theme Class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("ranimfay_dark", "1");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("ranimfay_dark", "0");
    }
  }, [isDark]);

  // Manual Theme Toggle Handler
  const handleToggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      showToast(next ? t.toastNightMode : t.toastDayMode);
      return next;
    });
  };

  // Action Handlers
  const handleToggleFav = (index: number) => {
    const updated = { ...favs, [index]: !favs[index] };
    if (!updated[index]) delete updated[index];
    setFavs(updated);
    saveStoredFavs(updated);
    showToast(updated[index] ? t.toastFavAdded : t.toastFavRemoved);
  };

  const handleOpenPreview = (index: number) => {
    const targetApp = apps[index];
    if (!targetApp) return;

    // Mark app as visited
    if (!visited[index]) {
      const updatedVisited = { ...visited, [index]: true };
      setVisited(updatedVisited);
      saveStoredVisited(updatedVisited);
    }

    setPreviewApp(targetApp);
  };

  const handleToggleDone = (index: number) => {
    const targetApp = apps[index];
    if (!targetApp) return;

    const isCurrentlyDone = !!done[index];
    const isVisited = !!visited[index] || isCurrentlyDone;

    // If user has not opened/previewed the app yet, block auto-completing and prompt them to open preview first!
    if (!isVisited && !isCurrentlyDone) {
      showToast(t.toastMustPreviewFirst);
      // Auto open preview so they can try it and complete it
      const updatedVisited = { ...visited, [index]: true };
      setVisited(updatedVisited);
      saveStoredVisited(updatedVisited);
      setPreviewApp(targetApp);
      return;
    }

    const updatedDone = { ...done, [index]: !isCurrentlyDone };
    if (isCurrentlyDone) delete updatedDone[index];

    setDone(updatedDone);
    saveStoredDone(updatedDone);

    // Ensure visited is set
    if (!visited[index]) {
      const updatedVisited = { ...visited, [index]: true };
      setVisited(updatedVisited);
      saveStoredVisited(updatedVisited);
    }

    // Update User Profile & Points
    const today = new Date().toLocaleDateString("ar-DZ");
    let updatedCompleted = [...user.completed];

    if (isCurrentlyDone) {
      updatedCompleted = updatedCompleted.filter((item) => item.idx !== index);
    } else {
      updatedCompleted.push({ idx: index, name: targetApp.name, date: today });
    }

    const newPoints = isCurrentlyDone ? Math.max(0, user.points - 10) : user.points + 10;

    // Check Badges
    const earnedBadges: string[] = [];
    BADGES_LIST.forEach((b) => {
      if (updatedCompleted.length >= b.req) {
        earnedBadges.push(b.id);
      }
    });

    const updatedProfile: UserProfile = {
      ...user,
      points: newPoints,
      completed: updatedCompleted,
      badges: earnedBadges,
    };

    setUser(updatedProfile);
    saveUserProfile(updatedProfile);

    showToast(!isCurrentlyDone ? t.toastDoneSuccess : t.toastDoneRemoved);
  };

  const handleUnlockApp = (passcode: string): boolean => {
    if (unlockAppIndex === null) return false;
    const targetApp = apps[unlockAppIndex];

    if (targetApp && targetApp.paidPass?.trim() === passcode) {
      const updatedUnlocked = { ...unlocked, [unlockAppIndex]: true };
      setUnlocked(updatedUnlocked);
      saveStoredUnlocked(updatedUnlocked);

      setPreviewApp(targetApp);
      setUnlockAppIndex(null);
      showToast(t.unlockSuccess);
      return true;
    }
    return false;
  };

  const handleAddReview = (appIndex: number, stars: number, comment: string) => {
    const newReview: ReviewItem = {
      stars,
      comment,
      userName: user.name || "زائر متعلم",
      createdAt: new Date().toISOString(),
    };

    const currentAppReviews = reviews[appIndex] || [];
    const updatedReviews = {
      ...reviews,
      [appIndex]: [newReview, ...currentAppReviews],
    };

    setReviews(updatedReviews);
    saveStoredReviews(updatedReviews);
    showToast("🌟 شُكْراً لك على تقييم التَّطبيق!");
  };

  const handleSaveApp = (appObj: AppItem, editIndex: number) => {
    let updatedApps = [...apps];
    if (editIndex >= 0) {
      updatedApps[editIndex] = appObj;
    } else {
      updatedApps = [appObj, ...updatedApps];
    }

    setApps(updatedApps);
    saveStoredApps(updatedApps);

    // Register Custom Category if needed
    if (appObj.cat && !customCats.includes(appObj.cat)) {
      const updatedCats = [...customCats, appObj.cat];
      setCustomCats(updatedCats);
      saveStoredCustomCats(updatedCats);
    }
  };

  const handleDeleteApp = (index: number) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا التطبيق؟")) return;
    const updated = apps.filter((_, i) => i !== index);
    setApps(updated);
    saveStoredApps(updated);
    showToast("تم حذف التطبيق من القائمة");
  };

  const handleDeleteCustomCat = (catName: string) => {
    const updated = customCats.filter((c) => c !== catName);
    setCustomCats(updated);
    saveStoredCustomCats(updated);
    showToast(`تم حذف تصنيف "${catName}"`);
  };

  const handleExportData = () => {
    const data = { version: "2.3", date: new Date().toISOString(), apps };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ranimfay-apps-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast("📤 تم تصدير النسخة الاحتياطية بنجاح");
  };

  const handleImportData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        const importedApps = data.apps || data;
        if (Array.isArray(importedApps)) {
          setApps(importedApps);
          saveStoredApps(importedApps);
          showToast(`📥 تم استيراد ${importedApps.length} تطبيق بنجاح`);
        }
      } catch {
        showToast("❌ ملف غير صالح");
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefault = () => {
    if (!window.confirm("هل تريد استعادة البيانات الافتراضية الأصلية؟")) return;
    localStorage.removeItem("ranimfay_apps_v2");
    window.location.reload();
  };

  // Filter Logic
  const filteredApps = apps.filter((app) => {
    const matchesCat =
      selectedCategory === "all" ||
      normalizeCategory(app.cat) === normalizeCategory(selectedCategory);
    const hay = `${app.name} ${app.desc} ${app.cat}`.toLowerCase();
    const matchesQuery = !searchQuery || hay.includes(searchQuery.toLowerCase());

    const isPaid = !!(app.paid && app.paidPass && app.paidPass.trim() !== "");
    if (paidFilter === "paid" && !isPaid) return false;
    if (paidFilter === "free" && isPaid) return false;

    return matchesCat && matchesQuery;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 flex flex-col font-cairo ${
      viewportMode !== "full" ? "bg-slate-200/90 dark:bg-slate-950/90 p-0 sm:p-4 items-center" : "bg-gradient-to-b from-[#edf8f5] via-[#f4faf8] to-[#ebf6f2] dark:from-[#12141f] dark:to-[#0c0d15]"
    }`}>
      {/* Active Viewport Mode Top Notification Ribbon */}
      {viewportMode !== "full" && (
        <div className="w-full max-w-5xl mb-2 px-3 py-1.5 rounded-xl bg-slate-900 text-slate-100 text-xs flex items-center justify-between font-bold shadow-md border border-slate-800 animate-fade-in">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-amber-300">
              معاينة حجم {viewportMode === "mobile" ? "الهاتف" : "الجهاز اللوحي"}
            </span>
          </div>
          <button
            onClick={() => setViewportMode("full")}
            className="px-2.5 py-0.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-[11px] font-semibold transition-all cursor-pointer"
          >
            استعادة الحجم الكامل ✕
          </button>
        </div>
      )}

      {/* Main App Frame / Container */}
      <div className={`w-full flex-1 flex flex-col transition-all duration-300 ${
        viewportMode === "mobile"
          ? "max-w-[414px] bg-gradient-to-b from-[#edf8f5] via-[#f4faf8] to-[#ebf6f2] dark:bg-[#12141f] shadow-2xl rounded-3xl border-4 border-slate-700/60 dark:border-slate-700 overflow-hidden min-h-[calc(100vh-60px)]"
          : viewportMode === "tablet"
          ? "max-w-[820px] bg-gradient-to-b from-[#edf8f5] via-[#f4faf8] to-[#ebf6f2] dark:bg-[#12141f] shadow-2xl rounded-3xl border-4 border-slate-700/60 dark:border-slate-700 overflow-hidden min-h-[calc(100vh-60px)]"
          : "min-h-screen text-[#1a2230] dark:text-[#e8eaf2]"
      }`}>
        {/* Top Header */}
        <Header
          user={user}
          isDark={isDark}
          onToggleDark={handleToggleDark}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenJourney={() => setIsJourneyOpen(true)}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenAiTutor={() => setIsAiTutorOpen(true)}
          onOpenAbout={() => setIsAboutOpen(true)}
          onGoHome={handleGoHome}
          viewportMode={viewportMode}
          onViewportChange={setViewportMode}
          lang={lang}
          onLanguageChange={setLang}
        />

        {/* Main Container */}
        <main className="flex-1">
        {currentView === "home" ? (
          /* ==================== VIEW 1: الواجهة الرئيسية ==================== */
          <div className="animate-fade-in space-y-4">
            {/* Hero Section */}
            <Hero lang={lang} />

            {/* Sticky Filter Bar */}
            <div className="sticky top-[56px] sm:top-[60px] z-30 bg-white/85 dark:bg-[#12141f]/95 backdrop-blur-xl border-y border-emerald-500/20 dark:border-slate-800 transition-colors shadow-sm">
              <FilterBar
                searchQuery={searchQuery}
                onSearchChange={(query) => {
                  setSearchQuery(query);
                  if (query.trim()) setCurrentView("apps");
                }}
                selectedCategory={selectedCategory}
                onCategorySelect={(cat) => handleSelectCategoryAndNavigate(cat)}
                customCategories={customCats}
                lang={lang}
              />
            </div>
          </div>
        ) : (
          /* ==================== VIEW 2: واجهة التطبيقات ==================== */
          <div className="animate-fade-in pb-12">
            {/* Top Return Banner & Subject Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-[#1aab8a] to-teal-700 text-white shadow-lg shadow-emerald-700/20 border-b border-emerald-500/30">
              <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleGoHome}
                    title={t.returnToHome}
                    aria-label={t.returnToHome}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white backdrop-blur-sm transition-all active:scale-95 shadow-sm cursor-pointer shrink-0"
                  >
                    {lang === "ar" ? <ArrowRight className="w-5 h-5" /> : <ArrowLeft className="w-5 h-5" />}
                  </button>

                  <div className="flex flex-col">
                    <span className="text-xs text-amber-200 font-bold drop-shadow-xs">{t.appsSection}</span>
                    <h1 className="text-base md:text-xl font-black font-tajawal drop-shadow-xs">
                      {selectedCategory === "all"
                        ? t.allEducationalApps
                        : `${t.appsForSubject} ${getCategoryLabel(selectedCategory, lang)}`}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="bg-white/25 border border-white/40 px-3.5 py-1 rounded-full text-xs font-black text-white shadow-inner backdrop-blur-md">
                    {filteredApps.length} {filteredApps.length === 1 ? t.appSingular : t.appsCount}
                  </span>
                </div>
              </div>
            </div>

            {/* App Grid */}
            <div className="mt-6">
              <AppGrid
                apps={filteredApps}
                favs={favs}
                done={done}
                visited={visited}
                unlocked={unlocked}
                reviews={reviews}
                onToggleFav={(idx) => {
                  const realIdx = apps.findIndex((a) => a.name === filteredApps[idx].name);
                  handleToggleFav(realIdx >= 0 ? realIdx : idx);
                }}
                onToggleDone={(idx) => {
                  const realIdx = apps.findIndex((a) => a.name === filteredApps[idx].name);
                  handleToggleDone(realIdx >= 0 ? realIdx : idx);
                }}
                onOpenPreview={(idx) => {
                  const realIdx = apps.findIndex((a) => a.name === filteredApps[idx].name);
                  handleOpenPreview(realIdx >= 0 ? realIdx : idx);
                }}
                onOpenUnlock={(idx) => {
                  const realIdx = apps.findIndex((a) => a.name === filteredApps[idx].name);
                  setUnlockAppIndex(realIdx >= 0 ? realIdx : idx);
                }}
                onOpenRating={(idx) => {
                  const realIdx = apps.findIndex((a) => a.name === filteredApps[idx].name);
                  setRatingAppIndex(realIdx >= 0 ? realIdx : idx);
                }}
                lang={lang}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs font-tajawal space-y-1">
        <div className="font-extrabold text-black dark:text-amber-300 text-xs sm:text-sm">
          {t.footerAuthor}
        </div>
        <div className="text-[11px] sm:text-xs text-slate-900 dark:text-emerald-300 font-bold">
          {t.footerRights}
        </div>
      </footer>
      </div>

      {/* Modals */}
      {(() => {
        const activePreviewRealIndex = previewApp
          ? apps.findIndex((a) => a.name === previewApp.name)
          : -1;
        return (
          <PreviewModal
            app={previewApp}
            isDone={activePreviewRealIndex >= 0 ? !!done[activePreviewRealIndex] : false}
            onToggleDone={() => {
              if (activePreviewRealIndex >= 0) {
                handleToggleDone(activePreviewRealIndex);
              }
            }}
            onClose={() => setPreviewApp(null)}
            lang={lang}
          />
        );
      })()}

      <UnlockModal
        app={unlockAppIndex !== null ? apps[unlockAppIndex] : null}
        onUnlock={handleUnlockApp}
        onClose={() => setUnlockAppIndex(null)}
        lang={lang}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentProfile={user}
        onSaveProfile={(name, email) => {
          const updated = { ...user, name, email };
          setUser(updated);
          saveUserProfile(updated);
          showToast(`${t.authWelcomeUser} ${name}! 👋`);
        }}
        lang={lang}
      />

      <JourneyModal
        isOpen={isJourneyOpen}
        onClose={() => setIsJourneyOpen(false)}
        user={user}
        apps={apps}
        lang={lang}
      />

      <RatingModal
        app={ratingAppIndex !== null ? apps[ratingAppIndex] : null}
        appIndex={ratingAppIndex || 0}
        reviews={ratingAppIndex !== null ? reviews[ratingAppIndex] || [] : []}
        onAddReview={handleAddReview}
        onClose={() => setRatingAppIndex(null)}
        lang={lang}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        apps={apps}
        onSaveApp={handleSaveApp}
        onDeleteApp={handleDeleteApp}
        customCategories={customCats}
        onDeleteCustomCat={handleDeleteCustomCat}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetDefault={handleResetDefault}
      />

      <AiTutorModal
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        apps={apps}
        lang={lang}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        lang={lang}
      />

      <Toast message={toastMsg} />
    </div>
  );
}
