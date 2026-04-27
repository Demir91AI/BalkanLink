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
    status: "available",
    accent: "border-l-orange-500",
    routes: {
      bs: "/porezi/rokovi-i-kazne",
      de: "/steuern/fristen-und-strafen",
      hr: "/porezi/rokovi-i-kazne",
      sr: "/porezi/rokovi-i-kazne",
    },
  },
  {
    id: "deductions",
    icon: Wallet,
    status: "available",
    accent: "border-l-green-500",
    routes: {
      bs: "/porezi/sta-mogu-odbiti",
      de: "/steuern/was-kann-ich-absetzen",
      hr: "/porezi/sto-mogu-odbiti",
      sr: "/porezi/sta-mogu-odbiti",
    },
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
    status: "available",
    accent: "border-l-indigo-500",
    routes: {
      bs: "/porezi/elster-vodic",
      de: "/steuern/elster-anleitung",
      hr: "/porezi/elster-vodic",
      sr: "/porezi/elster-vodic",
    },
  },
  {
    id: "family",
    icon: Heart,
    status: "available",
    accent: "border-l-pink-500",
    routes: {
      bs: "/porezi/porodica-i-klase",
      de: "/steuern/familie-und-steuerklassen",
      hr: "/porezi/obitelj-i-klase",
      sr: "/porezi/porodica-i-klase",
    },
  },
  {
    id: "studentsTrainees",
    icon: GraduationCap,
    status: "available",
    accent: "border-l-purple-500",
    routes: {
      bs: "/porezi/studenti-i-pripravnici",
      de: "/steuern/studenten-und-azubis",
      hr: "/porezi/studenti-i-naucnici",
      sr: "/porezi/studenti-i-pripravnici",
    },
  },
  {
    id: "selfEmployed",
    icon: Briefcase,
    status: "available",
    accent: "border-l-amber-500",
    routes: {
      bs: "/porezi/samostalni-i-freelancer",
      de: "/steuern/selbststaendige-und-freelancer",
      hr: "/porezi/samostalni-i-freelancer",
      sr: "/porezi/samostalni-i-freelancer",
    },
  },
  {
    id: "rentalIncome",
    icon: Building2,
    status: "available",
    accent: "border-l-cyan-500",
    routes: {
      bs: "/porezi/prihodi-od-izdavanja",
      de: "/steuern/mieteinkuenfte",
      hr: "/porezi/prihodi-od-najma",
      sr: "/porezi/prihodi-od-izdavanja",
    },
  },
  {
    id: "mistakes",
    icon: AlertTriangle,
    status: "available",
    accent: "border-l-red-500",
    routes: {
      bs: "/porezi/najcesce-greske",
      de: "/steuern/haeufigste-fehler",
      hr: "/porezi/najceste-pogreske",
      sr: "/porezi/najcesce-greske",
    },
  },
];
