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

    // Sync URLs for default apps if they changed in DEFAULT_APPS
    stored = stored.map((app) => {
      const defaultMatch = DEFAULT_APPS.find((d) => d.name === app.name);
      if (defaultMatch && defaultMatch.url !== app.url) {
        updated = true;
        return { ...app, url: defaultMatch.url };
      }
      return app;
    });

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
