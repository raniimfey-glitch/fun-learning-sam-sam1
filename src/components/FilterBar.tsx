import React from "react";
import { Search } from "lucide-react";
import { BUILTIN_CATEGORIES, normalizeCategory } from "../data/initialApps";
import { Language } from "../types";
import { translations, getCategoryLabel } from "../utils/i18n";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategorySelect: (cat: string) => void;
  paidFilter?: "all" | "free" | "paid";
  onPaidFilterChange?: (filter: "all" | "free" | "paid") => void;
  customCategories: string[];
  lang: Language;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  customCategories,
  lang,
}) => {
  const t = translations[lang];

  // Deduplicate and normalize categories to avoid duplicate entries
  const rawCategories = ["all", ...BUILTIN_CATEGORIES, ...customCategories];
  const seen = new Set<string>();
  const allCategories: string[] = [];

  for (const cat of rawCategories) {
    const trimmed = cat.trim();
    if (!trimmed) continue;
    const norm = normalizeCategory(trimmed);
    if (!seen.has(norm)) {
      seen.add(norm);
      allCategories.push(norm);
    }
  }

  return (
    <div className="py-4 px-4 transition-colors">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="relative max-w-lg mx-auto">
          <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 dark:text-emerald-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full ps-12 pe-5 py-3 text-base md:text-lg font-bold bg-white/95 dark:bg-slate-800 border-2 border-emerald-500/30 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/20 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 text-start transition-all shadow-md shadow-emerald-500/5"
          />
        </div>

        {/* Category Cards / Pills - Scrollable & Prominent */}
        <div className="flex items-center gap-2.5 md:gap-3 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth max-w-full">
          {allCategories.map((cat) => {
            const isActive = normalizeCategory(selectedCategory) === normalizeCategory(cat);
            const label = getCategoryLabel(cat, lang);

            // Optional helper emoji for categories
            let emoji = "📚";
            const lower = cat.toLowerCase();
            if (lower === "all") emoji = "✨";
            else if (lower.includes("عربي") || lower.includes("لغة عربية")) emoji = "📖";
            else if (lower.includes("رياضيات")) emoji = "🔢";
            else if (lower.includes("علوم")) emoji = "🔬";
            else if (lower.includes("إسلامية") || lower.includes("دين")) emoji = "🌙";
            else if (lower.includes("فرنسية")) emoji = "🗣️";
            else if (lower.includes("تاريخ") || lower.includes("جغرافيا")) emoji = "🗺️";
            else if (lower.includes("مدنية")) emoji = "🏛️";
            else if (lower.includes("إنكليزية") || lower.includes("إنجليزية")) emoji = "🌐";
            else if (lower.includes("لعب") || lower.includes("ألعاب")) emoji = "🎮";

            return (
              <button
                key={cat}
                onClick={() => onCategorySelect(cat)}
                className={`whitespace-nowrap shrink-0 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl text-sm sm:text-base md:text-lg font-black flex items-center gap-2.5 transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
                  isActive
                    ? "bg-gradient-to-r from-[#1aab8a] via-teal-600 to-[#0d8060] text-white shadow-lg shadow-emerald-600/35 ring-2 ring-emerald-400/50 scale-102"
                    : "bg-white/95 dark:bg-slate-800 border-2 border-emerald-500/25 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300 hover:shadow-md hover:shadow-emerald-500/15 hover:scale-102"
                }`}
              >
                <span className="text-lg sm:text-xl md:text-2xl drop-shadow-xs">{emoji}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


