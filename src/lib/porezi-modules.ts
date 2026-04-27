/**
 * Porezi (Tax) Department — module registry.
 *
 * 10 modula koja se prikazuju kao kartice na /porezi (i18n mirror rute:
 * /de/steuern, /hr/porezi, /sr/porezi).
 *
 * Status:
 *   - "available" — modul ima destinaciju (rutu) i klikom vodi tamo
 *   - "coming-soon" — kartica je vidljiva ali ne klikabilna (badge "Uskoro")
 *
 * Premium: SVI moduli (osim wizarda za prvi korak) su PREMIUM.
 * Sam landing /porezi je javan (besplatan) — paywall se aktivira na klik.
 *
 * Slugovi: drže se per-language. Komponenta resolvuje pravi slug iz
 * `routes[lang]` i koristi `useLocalizedHref` da prefiksira /de, /hr, /sr.
 */
import type { LucideIcon } from "lucide-react";
import {
  HelpCircle,
  CalendarClock,
  Wallet,
  Home,
  Receipt,
  Heart,
  GraduationCap,
  Briefcase,
  Building2,
  AlertTriangle,
} from "lucide-react";

import type { SupportedLanguage } from "@/i18n";

export type ModuleStatus = "available" | "coming-soon";

export interface PoreziModule {
  /** Stable id used for i18n key lookups: porezi:modules.<id>.title */
  id: string;
  icon: LucideIcon;
  status: ModuleStatus;
  /** Tailwind border-l accent color for the card. */
  accent: string;
  /**
   * Per-language route (without lang prefix). The /porezi (or /steuern) hub
   * itself is the parent — these are appended after it.
   *
   * For coming-soon modules this is empty.
   */
  routes: Partial<Record<SupportedLanguage, string>>;
}

/**
 * Hub root path per language. The URL prefix (/de, /hr, /sr) is added
 * separately by useLocalizedHref().
 */
export const POREZI_HUB_PATH: Record<SupportedLanguage, string> = {
  bs: "/porezi",
  de: "/steuern",
  hr: "/porezi",
  sr: "/porezi",
};

export const POREZI_MODULES: PoreziModule[] = [
  {
    id: "wizard",
    icon: HelpCircle,
    status: "available",
    accent: "border-l-blue-500",
    routes: {
      bs: "/porezi/da-li-moram",
      de: "/steuern/muss-ich-ueberhaupt",
      hr: "/porezi/moram-li-uopce",
      sr: "/porezi/da-li-moram",
    },
  },
  {
    id: "deadlines",
    icon: CalendarClock,
    status: "coming-soon",
    accent: "border-l-orange-500",
    routes: {},
  },
  {
    id: "deductions",
    icon: Wallet,
    status: "coming-soon",
    accent: "border-l-green-500",
    routes: {},
  },
  {
    id: "doppelhaushalt",
    icon: Home,
    status: "available",
    accent: "border-l-teal-500",
    routes: {
      bs: "/porezi/dvostruko-domacinstvo",
      de: "/steuern/doppelte-haushaltsfuehrung",
      hr: "/porezi/dvostruko-kucanstvo",
      sr: "/porezi/dvostruko-domacinstvo",
    },
  },
  {
    id: "elsterGuide",
    icon: Receipt,
    status: "coming-soon",
    accent: "border-l-indigo-500",
    routes: {},
  },
  {
    id: "family",
    icon: Heart,
    status: "coming-soon",
    accent: "border-l-pink-500",
    routes: {},
  },
  {
    id: "studentsTrainees",
    icon: GraduationCap,
    status: "coming-soon",
    accent: "border-l-purple-500",
    routes: {},
  },
  {
    id: "selfEmployed",
    icon: Briefcase,
    status: "coming-soon",
    accent: "border-l-amber-500",
    routes: {},
  },
  {
    id: "rentalIncome",
    icon: Building2,
    status: "coming-soon",
    accent: "border-l-cyan-500",
    routes: {},
  },
  {
    id: "mistakes",
    icon: AlertTriangle,
    status: "coming-soon",
    accent: "border-l-red-500",
    routes: {},
  },
];
