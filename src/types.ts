export interface AppItem {
  id?: string;
  name: string;
  nameEn?: string;
  nameFr?: string;
  desc: string;
  descEn?: string;
  descFr?: string;
  url: string;
  cat: string;
  age: string;
  ageEn?: string;
  ageFr?: string;
  icon: string;
  paid?: boolean;
  paidPass?: string;
}

export interface ReviewItem {
  id?: string;
  stars: number;
  comment: string;
  userName: string;
  createdAt?: string;
}

export interface AppRatingSummary {
  avg: number;
  count: number;
}

export interface UserProfile {
  name: string;
  email: string;
  points: number;
  completed: { idx: number; name: string; date: string }[];
  badges: string[];
}

export interface BadgeDef {
  id: string;
  icon: string;
  label: string;
  req: number;
}

export interface CategoryColor {
  bg: string;
  color: string;
}

export type ViewportMode = "full" | "tablet" | "mobile";

export type Language = "ar" | "en" | "fr";
