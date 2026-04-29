import type { Locale } from "./site-config";

export type BlogCategoryId =
  | "personal-status"
  | "real-estate"
  | "commercial"
  | "criminal"
  | "labor";

export type BlogTagId =
  | "egypt-law"
  | "saudi-law"
  | "divorce"
  | "contracts"
  | "registration"
  | "guide";

export interface BlogPost {
  slug: string;
  category: BlogCategoryId;
  tags: BlogTagId[];
  fieldKey?: string; // links to a practice area name (matches translations.fields entries by index)
  fieldIndex?: number;
  date: string;
  ar: { title: string; description: string; body: string };
  en: { title: string; description: string; body: string };
}

export const CATEGORIES: Record<BlogCategoryId, { ar: string; en: string }> = {
  "personal-status": { ar: "الأحوال الشخصية", en: "Personal Status" },
  "real-estate": { ar: "العقاري", en: "Real Estate" },
  commercial: { ar: "التجاري", en: "Commercial" },
  criminal: { ar: "الجنائي", en: "Criminal" },
  labor: { ar: "العمل", en: "Labor" },
};

export const TAGS: Record<BlogTagId, { ar: string; en: string }> = {
  "egypt-law": { ar: "القانون المصري", en: "Egyptian Law" },
  "saudi-law": { ar: "القانون السعودي", en: "Saudi Law" },
  divorce: { ar: "الطلاق والخلع", en: "Divorce" },
  contracts: { ar: "العقود", en: "Contracts" },
  registration: { ar: "التسجيل", en: "Registration" },
  guide: { ar: "دليل", en: "Guide" },
};

export const POSTS: BlogPost[] = [
  {
    slug: "khulaa-procedures",
    category: "personal-status",
    tags: ["egypt-law", "divorce", "guide"],
    fieldIndex: 2, // قانون الأحوال الشخصية
    date: "2025-03-12",
    ar: {
      title: "إجراءات الخلع في القانون المصري",
      description: "دليل شامل لخطوات وإجراءات دعوى الخلع وحقوق الزوجة.",
      body: "نستعرض في هذا المقال خطوات رفع دعوى الخلع، الشروط القانونية، والمستندات المطلوبة، مع توضيح حقوق الزوجة المالية بعد صدور الحكم.",
    },
    en: {
      title: "Khul' (No-Fault Divorce) Procedures in Egyptian Law",
      description: "A complete guide to the steps and rights involved in a Khul' case.",
      body: "This article reviews the steps of filing a Khul' case, the legal requirements, the required documents, and the wife's financial rights after a ruling is issued.",
    },
  },
  {
    slug: "saudi-real-estate",
    category: "real-estate",
    tags: ["saudi-law", "registration", "guide"],
    fieldIndex: 6, // القانون الدولي الخاص (closest) — display only
    date: "2025-02-20",
    ar: {
      title: "نظام التسجيل العقاري في المملكة العربية السعودية",
      description: "كل ما تحتاج معرفته عن إجراءات التسجيل العقاري الجديد.",
      body: "نشرح آلية التسجيل العيني للعقار، الفرق بينه وبين التسجيل الشخصي، وأثره على حماية الملكية في المملكة العربية السعودية.",
    },
    en: {
      title: "Real Estate Registration in Saudi Arabia",
      description: "Everything you need to know about the new real estate registration process.",
      body: "We explain the in-rem registration system, how it differs from personal registration, and its impact on property protection in Saudi Arabia.",
    },
  },
  {
    slug: "commercial-contracts",
    category: "commercial",
    tags: ["contracts", "egypt-law", "saudi-law"],
    fieldIndex: 1, // القانون التجاري
    date: "2025-01-15",
    ar: {
      title: "أهمية صياغة العقود التجارية",
      description: "كيف تحمي نفسك قانونياً من خلال عقد محكم الصياغة.",
      body: "نناقش العناصر الجوهرية في صياغة العقود التجارية، شروط التحكيم، وآليات فض النزاعات لضمان حماية حقوق الأطراف.",
    },
    en: {
      title: "The Importance of Drafting Commercial Contracts",
      description: "Protect yourself legally with a well-drafted contract.",
      body: "We discuss the essential elements of drafting commercial contracts, arbitration clauses, and dispute resolution mechanisms to safeguard parties' rights.",
    },
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function postsByCategory(cat: BlogCategoryId): BlogPost[] {
  return POSTS.filter((p) => p.category === cat);
}

export function postsByTag(tag: BlogTagId): BlogPost[] {
  return POSTS.filter((p) => p.tags.includes(tag));
}

export function postsByField(fieldIndex: number): BlogPost[] {
  return POSTS.filter((p) => p.fieldIndex === fieldIndex);
}

export function relatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPost(slug);
  if (!current) return [];
  const scored = POSTS.filter((p) => p.slug !== slug).map((p) => {
    let score = 0;
    if (p.category === current.category) score += 3;
    score += p.tags.filter((t) => current.tags.includes(t)).length;
    return { p, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.p);
}

export function localized(post: BlogPost, locale: Locale) {
  return locale === "ar" ? post.ar : post.en;
}
