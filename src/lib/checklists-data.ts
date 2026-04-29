/**
 * Premium Checklists registry.
 *
 * Each checklist is a Premium-gated, printable PDF-ready guide
 * for a major German bureaucratic process.
 *
 * Content (titles, sections, items) lives in i18n namespace `checklists`
 * under the key `<id>.*`. This file only carries structural metadata
 * (icon, slug, premium tier, section item counts).
 *
 * 4 languages required: bs (default), de, hr, sr.
 */
import {
  Baby,
  Wallet,
  Home,
  HeartHandshake,
  GraduationCap,
  Flag,
  FileSpreadsheet,
  MapPin,
  type LucideIcon,
} from "lucide-react";

export interface ChecklistDef {
  /** Stable id, also slug & i18n key prefix */
  id: string;
  icon: LucideIcon;
  /** Color accent (HSL token suffix) */
  accent: "emerald" | "amber" | "indigo" | "rose" | "blue" | "violet" | "teal" | "orange";
  /** Number of items in each section (driven from i18n) */
  counts: {
    documents: number; // documents to collect
    steps: number; // step-by-step procedure
    deadlines: number; // important deadlines
    warnings: number; // common pitfalls
    tips: number; // pro tips
  };
  /** True = Premium only. False = free preview. */
  premium: boolean;
  /** Optional external official link */
  officialLink?: string;
}

export const CHECKLISTS: ChecklistDef[] = [
  {
    id: "kindergeld",
    icon: Baby,
    accent: "emerald",
    counts: { documents: 8, steps: 6, deadlines: 3, warnings: 5, tips: 4 },
    premium: true,
    officialLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-anspruch-hoehe-dauer",
  },
  {
    id: "buergergeld",
    icon: Wallet,
    accent: "amber",
    counts: { documents: 10, steps: 7, deadlines: 3, warnings: 6, tips: 4 },
    premium: true,
    officialLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  },
  {
    id: "wohngeld",
    icon: Home,
    accent: "blue",
    counts: { documents: 9, steps: 6, deadlines: 3, warnings: 5, tips: 4 },
    premium: true,
    officialLink: "https://www.bmwsb.bund.de/Webs/BMWSB/DE/themen/stadt-wohnen/wohnraumfoerderung/wohngeld/wohngeld-node.html",
  },
  {
    id: "elterngeld",
    icon: HeartHandshake,
    accent: "rose",
    counts: { documents: 9, steps: 6, deadlines: 4, warnings: 5, tips: 4 },
    premium: true,
    officialLink: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/elterngeld",
  },
  {
    id: "anerkennung",
    icon: GraduationCap,
    accent: "indigo",
    counts: { documents: 9, steps: 7, deadlines: 3, warnings: 6, tips: 5 },
    premium: true,
    officialLink: "https://www.anerkennung-in-deutschland.de/",
  },
  {
    id: "einbuergerung",
    icon: Flag,
    accent: "violet",
    counts: { documents: 10, steps: 7, deadlines: 3, warnings: 6, tips: 5 },
    premium: true,
    officialLink: "https://www.bmi.bund.de/DE/themen/verfassung/staatsangehoerigkeit/staatsangehoerigkeit-node.html",
  },
  {
    id: "steuererklaerung",
    icon: FileSpreadsheet,
    accent: "teal",
    counts: { documents: 10, steps: 6, deadlines: 4, warnings: 6, tips: 5 },
    premium: true,
    officialLink: "https://www.elster.de/eportal/start",
  },
  {
    id: "anmeldung",
    icon: MapPin,
    accent: "orange",
    counts: { documents: 7, steps: 5, deadlines: 3, warnings: 5, tips: 4 },
    premium: false, // free — onboarding hook
  },
];

export const CHECKLIST_HUB_PATH: Record<string, string> = {
  bs: "/check-liste",
  hr: "/check-liste",
  sr: "/check-liste",
  de: "/checklisten",
};

export function getChecklist(slug: string): ChecklistDef | undefined {
  return CHECKLISTS.find((c) => c.id === slug);
}
