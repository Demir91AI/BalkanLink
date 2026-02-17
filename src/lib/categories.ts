import {
  Plane,
  Building2,
  Briefcase,
  Car,
  Receipt,
  HeartPulse,
  Users,
  Scale,
  ShieldAlert,
  LucideIcon,
} from "lucide-react";

export interface CategoryInfo {
  label: string;
  slug: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryInfo[] = [
  { label: "Dolazak", slug: "dolazak", icon: Plane },
  { label: "Stan", slug: "stan", icon: Building2 },
  { label: "Posao", slug: "posao", icon: Briefcase },
  { label: "Auto", slug: "auto", icon: Car },
  { label: "Porezi", slug: "porezi", icon: Receipt },
  { label: "Zdravstvo", slug: "zdravstvo", icon: HeartPulse },
  { label: "Porodica", slug: "porodica", icon: Users },
  { label: "Prava i pomoći", slug: "prava-i-pomoci", icon: Scale },
  { label: "Problemi", slug: "problemi", icon: ShieldAlert },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c])
);

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return CATEGORY_MAP[slug];
}
