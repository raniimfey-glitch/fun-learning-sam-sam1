import React from "react";
import { AppItem, ReviewItem, Language } from "../types";
import { AppCard } from "./AppCard";
import { Search } from "lucide-react";
import { translations } from "../utils/i18n";

interface AppGridProps {
  apps: AppItem[];
  favs: Record<number, boolean>;
  done: Record<number, boolean>;
  visited?: Record<number, boolean>;
  unlocked: Record<number, boolean>;
  reviews: Record<number, ReviewItem[]>;
  onToggleFav: (index: number) => void;
  onToggleDone: (index: number) => void;
  onOpenPreview: (index: number) => void;
  onOpenUnlock: (index: number) => void;
  onOpenRating: (index: number) => void;
  lang: Language;
}

export const AppGrid: React.FC<AppGridProps> = ({
  apps,
  favs,
  done,
  visited = {},
  unlocked,
  reviews,
  onToggleFav,
  onToggleDone,
  onOpenPreview,
  onOpenUnlock,
  onOpenRating,
  lang,
}) => {
  const t = translations[lang];

  if (apps.length === 0) {
    return (
      <div className="py-16 text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <Search className="w-8 h-8" />
        </div>
        <p className="text-slate-600 dark:text-slate-300 font-medium">
          {t.noAppsFound}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 max-w-6xl mx-auto px-4 pb-16">
      {apps.map((app, index) => (
        <AppCard
          key={`${app.name}-${index}`}
          app={app}
          index={index}
          isFav={!!favs[index]}
          isDone={!!done[index]}
          isVisited={!!visited[index] || !!done[index]}
          isUnlocked={!!unlocked[index]}
          reviews={reviews[index] || []}
          onToggleFav={onToggleFav}
          onToggleDone={onToggleDone}
          onOpenPreview={onOpenPreview}
          onOpenUnlock={onOpenUnlock}
          onOpenRating={onOpenRating}
          lang={lang}
        />
      ))}
    </div>
  );
};

