import { AppItem, ReviewItem, UserProfile } from "../types";
import { DEFAULT_APPS } from "../data/initialApps";

const KEYS = {
  APPS: "ranimfay_apps_v2",
  FAVS: "ranimfay_favs",
  DONE: "ranimfay_done",
  DARK: "ranimfay_dark",
  CATS: "ranimfay_custom_cats",
  UNLOCKED: "ranimfay_unlocked",
  USER: "ranimfay_user_profile",
  REVIEWS: "ranimfay_app_reviews",
  VISITED: "ranimfay_visited"
};

export const getStoredApps = (): AppItem[] => {
  try {
    const data = localStorage.getItem(KEYS.APPS);
    if (!data) return DEFAULT_APPS;
    let stored: AppItem[] = JSON.parse(data);
    let updated = false;

    // Remove specific deprecated/deleted apps
    const removedUrls = new Set([
      "https://literate-goggles-rho.vercel.app/",
      "https://glowing-froyo-595e54.netlify.app/",
      "https://fun-islamic-edu.netlify.app/"
    ]);
    const beforeCount = stored.length;
    stored = stored.filter(
      (app) =>
        !removedUrls.has(app.url) &&
        !app.name.includes("النَّجمة الصَّغيرة تتعلَّم الحروف")
    );
    if (stored.length !== beforeCount) {
      updated = true;
    }

    // Direct URL replacements for updated apps
    const urlReplacements: Record<string, string> = {
      "https://solid-palm-tree-uw9a.vercel.app/": "https://fun-learning-tarkib-calimat-djomal.vercel.app/",
      "https://special-fishstick-seven.vercel.app/": "https://fun-learning-soroban-v5.vercel.app/",
      "https://bookish-guide.vercel.app/": "https://fun-learning-man-ana-v2.vercel.app/",
      "https://fun-learning-the-big-nembers.vercel.app/": "https://fun-learning-the-big-numbers-advent.vercel.app/",
      "https://measuring-liquid-capacity.vercel.app/": "https://fun-learning-interactive-measuring.vercel.app/",
      "https://fun-learning-my-interactive-watch.vercel.app/": "https://fun-learning-my-interactive-clock.vercel.app/"
    };

    // Sync URLs and metadata for default apps if they changed in DEFAULT_APPS
    stored = stored.map((app) => {
      let currentApp = { ...app };
      if (urlReplacements[currentApp.url]) {
        currentApp.url = urlReplacements[currentApp.url];
        updated = true;
      }
      if (currentApp.name === "الأباكوس — سوروبان" || currentApp.name.includes("السروبان")) {
        currentApp.name = "السروبان — الأباكوس التفاعلي";
        currentApp.url = "https://fun-learning-soroban-v5.vercel.app/";
        updated = true;
      }
      if (currentApp.name === "عالم الأعداد الكبيرة") {
        currentApp.name = "مغامرة الأعداد الكبيرة";
        currentApp.url = "https://fun-learning-the-big-numbers-advent.vercel.app/";
        updated = true;
      }
      if (currentApp.name.includes("تركيب الكلمات")) {
        currentApp.url = "https://fun-learning-tarkib-calimat-djomal.vercel.app/";
        updated = true;
      }
      if (currentApp.name.includes("من أنا")) {
        currentApp.url = "https://fun-learning-man-ana-v2.vercel.app/";
        updated = true;
      }
      if (currentApp.name.includes("السعة") || currentApp.name.includes("السعات") || currentApp.name === "القياس التفاعلي ووحدات القياس") {
        currentApp.name = "قياس السعات التفاعلي";
        currentApp.url = "https://fun-learning-interactive-measuring.vercel.app/";
        updated = true;
      }
      if (currentApp.name.includes("الساعة") || currentApp.name.includes("ساعتي")) {
        currentApp.name = "ساعتي التفاعلية";
        currentApp.url = "https://fun-learning-my-interactive-clock.vercel.app/";
        updated = true;
      }
      if (currentApp.name.includes("التاء المربوطة") || currentApp.name.includes("مغامرة التاء")) {
        currentApp.name = "التاء المربوطة والمفتوحة";
        currentApp.url = "https://fun-learning-adventure-of-taa.vercel.app/";
        updated = true;
      }

      const defaultMatch = DEFAULT_APPS.find((d) => d.name === currentApp.name || d.url === currentApp.url);
      if (defaultMatch) {
        if (defaultMatch.url !== currentApp.url) {
          updated = true;
          currentApp.url = defaultMatch.url;
        }
        if (!currentApp.nameEn && defaultMatch.nameEn) currentApp.nameEn = defaultMatch.nameEn;
        if (!currentApp.nameFr && defaultMatch.nameFr) currentApp.nameFr = defaultMatch.nameFr;
        if (!currentApp.descEn && defaultMatch.descEn) currentApp.descEn = defaultMatch.descEn;
        if (!currentApp.descFr && defaultMatch.descFr) currentApp.descFr = defaultMatch.descFr;
      }
      return currentApp;
    });

    // Remove duplicates by URL
    const seenUrls = new Set<string>();
    const prevLen = stored.length;
    stored = stored.filter((app) => {
      if (seenUrls.has(app.url)) return false;
      seenUrls.add(app.url);
      return true;
    });
    if (stored.length !== prevLen) {
      updated = true;
    }

    // Merge any missing default apps
    const storedUrls = new Set(stored.map((a) => a.url));
    const missingDefaults = DEFAULT_APPS.filter((a) => !storedUrls.has(a.url));
    if (missingDefaults.length > 0) {
      stored = [...stored, ...missingDefaults];
      updated = true;
    }

    if (updated) {
      localStorage.setItem(KEYS.APPS, JSON.stringify(stored));
    }
    return stored;
  } catch {
    return DEFAULT_APPS;
  }
};

export const saveStoredApps = (apps: AppItem[]): void => {
  localStorage.setItem(KEYS.APPS, JSON.stringify(apps));
};

export const getStoredFavs = (): Record<number, boolean> => {
  try {
    const data = localStorage.getItem(KEYS.FAVS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredFavs = (favs: Record<number, boolean>): void => {
  localStorage.setItem(KEYS.FAVS, JSON.stringify(favs));
};

export const getStoredDone = (): Record<number, boolean> => {
  try {
    const data = localStorage.getItem(KEYS.DONE);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredDone = (done: Record<number, boolean>): void => {
  localStorage.setItem(KEYS.DONE, JSON.stringify(done));
};

export const getStoredUnlocked = (): Record<number, boolean> => {
  try {
    const data = localStorage.getItem(KEYS.UNLOCKED);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredUnlocked = (unlocked: Record<number, boolean>): void => {
  localStorage.setItem(KEYS.UNLOCKED, JSON.stringify(unlocked));
};

export const getStoredCustomCats = (): string[] => {
  try {
    const data = localStorage.getItem(KEYS.CATS);
    const parsed: string[] = data ? JSON.parse(data) : [];
    return parsed.filter(
      (cat) =>
        cat &&
        !["لغة عربية", "اللغة العربية", "رياضيات", "علوم", "إسلامية", "ألعاب", "تربية مدنية", "تاريخ", "جغرافيا"].includes(cat.trim())
    );
  } catch {
    return [];
  }
};

export const saveStoredCustomCats = (cats: string[]): void => {
  localStorage.setItem(KEYS.CATS, JSON.stringify(cats));
};

export const getUserProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(KEYS.USER);
    if (data) return JSON.parse(data);
  } catch {}
  return {
    name: "زائر متعلم",
    email: "",
    points: 0,
    completed: [],
    badges: []
  };
};

export const saveUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(KEYS.USER, JSON.stringify(profile));
};

export const getStoredReviews = (): Record<number, ReviewItem[]> => {
  try {
    const data = localStorage.getItem(KEYS.REVIEWS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredReviews = (reviews: Record<number, ReviewItem[]>): void => {
  localStorage.setItem(KEYS.REVIEWS, JSON.stringify(reviews));
};

export const getStoredVisited = (): Record<number, boolean> => {
  try {
    const data = localStorage.getItem(KEYS.VISITED);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

export const saveStoredVisited = (visited: Record<number, boolean>): void => {
  localStorage.setItem(KEYS.VISITED, JSON.stringify(visited));
};
