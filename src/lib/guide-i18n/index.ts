// Runtime localizer for *GuideContent.tsx components.
// Source language for guide TSX files is BHS (bs). For DE/HR/SR we apply
// a flat-key overlay (header.title, steps.0.whatToWrite, ...) on top of the
// BHS base, returning ready-to-render { header, steps }.

import type { StepData } from "@/components/guides/SmartGuideWizardShared";
import { guideOverlay as overlayDe } from "./overlay.de";
import { guideOverlay as overlayHr } from "./overlay.hr";
import { guideOverlay as overlaySr } from "./overlay.sr";

export interface GuideHeader {
  title: string;
  source: string;
  formName: string;
  whoCanApply: string;
  processingTime: string;
  requirements?: string[];
  commonMistakes?: string[];
}

export interface GuideContent {
  header: GuideHeader;
  steps: StepData[];
}

type Lang = "bs" | "de" | "hr" | "sr";

const overlays: Record<Exclude<Lang, "bs">, Record<string, Record<string, string>>> = {
  de: overlayDe as unknown as Record<string, Record<string, string>>,
  hr: overlayHr as unknown as Record<string, Record<string, string>>,
  sr: overlaySr as unknown as Record<string, Record<string, string>>,
};

function applyOverlay<T>(base: T, flat: Record<string, string> | undefined): T {
  if (!flat) return base;
  const cloned: any = structuredClone(base);
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let cur: any = cloned;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      const idx = /^\d+$/.test(k) ? Number(k) : k;
      if (cur[idx] == null) {
        // create intermediate as array if next key is numeric, else object
        const nextIsNum = /^\d+$/.test(parts[i + 1]);
        cur[idx] = nextIsNum ? [] : {};
      }
      cur = cur[idx];
    }
    const lastK = parts[parts.length - 1];
    const lastIdx: any = /^\d+$/.test(lastK) ? Number(lastK) : lastK;
    cur[lastIdx] = value;
  }
  return cloned as T;
}

export function localizeGuide(
  guideKey: string,
  base: GuideContent,
  lang: Lang,
): GuideContent {
  if (lang === "bs") return base;
  const dict = overlays[lang]?.[guideKey];
  if (!dict) return base;
  return applyOverlay(base, dict);
}
