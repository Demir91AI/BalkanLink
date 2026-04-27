#!/usr/bin/env bun
// Transforms each *GuideContent.tsx into a thin wrapper that exports
//   const GUIDE_KEY = "...";
//   const BASE: GuideContent = { header: {...}, steps: [...] };
// and renders <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}>.
//
// Strategy: import each module as ESM, extract STEPS via dynamic eval is
// fragile in TS. We use a regex-based parser focused on the *exact* shape
// every existing guide follows.

import * as fs from "fs";
import * as path from "path";

const DIR = "src/components/guides";
const KEY_MAP: Record<string, string> = {
  AnfrageNichterreichbarkeitGuideContent: "anfrageNichterreichbarkeit",
  AnlageBBGuideContent: "anlageBB",
  AnlageEKGuideContent: "anlageEK",
  AnlageEKSGuideContent: "anlageEKS",
  AnlageHGGuideContent: "anlageHG",
  AnlageKDUGuideContent: "anlageKDU",
  AnlageKIGuideContent: "anlageKI",
  AnlageMEBGuideContent: "anlageMEB",
  AnlageSEGuideContent: "anlageSE",
  AnlageSVGuideContent: "anlageSV",
  AnlageUFGuideContent: "anlageUF",
  AnlageUH1GuideContent: "anlageUH1",
  AnlageUH2GuideContent: "anlageUH2",
  AnlageUH3GuideContent: "anlageUH3",
  AnlageVEGuideContent: "anlageVE",
  AnlageVMGuideContent: "anlageVM",
  AnlageWEPGuideContent: "anlageWEP",
  AntragsruecknahmeGuideContent: "antragsruecknahme",
  ArbeitsbescheinigungGuideContent: "arbeitsbescheinigung",
  BurgergeldGuideContent: "burgergeld",
  ElterngeldGuideContent: "elterngeld",
  HauptantragGuideContent: "hauptantrag",
  KinderzuschlagGuideContent: "kinderzuschlag",
  KrankenkasseGuideContent: "krankenkasse",
  KrippengeldBayernGuideContent: "krippengeldBayern",
  MutterschaftsgeldGuideContent: "mutterschaftsgeld",
  SteuerIdGuideContent: "steuerId",
  WeiterbewilligungGuideContent: "weiterbewilligung",
  WirtschaftlicheJugendhilfeGuideContent: "wirtschaftlicheJugendhilfe",
  WohngeldGuideContent: "wohngeld",
};

function extractStepsBlock(src: string): string | null {
  // Match: const STEPS: StepData[] = [ ... ];
  const startMarker = /const\s+STEPS\s*:\s*StepData\[\]\s*=\s*\[/;
  const m = startMarker.exec(src);
  if (!m) return null;
  let i = m.index + m[0].length - 1; // position at the opening '['
  // walk forward tracking bracket depth, ignoring brackets inside strings/templates
  let depth = 0;
  let inStr: string | null = null;
  let escape = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (escape) { escape = false; continue; }
    if (inStr) {
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        return src.slice(m.index + m[0].length - 1, i + 1); // includes [ ... ]
      }
    }
  }
  return null;
}

function extractHeaderProps(src: string): Record<string, string> | null {
  const open = src.indexOf("<GuideInfoHeader");
  if (open < 0) return null;
  // find end of opening tag (self-closing /> or ending >)
  let i = open;
  let depth = 0;
  let inStr: string | null = null;
  let braceDepth = 0;
  let escape = false;
  let endIdx = -1;
  for (; i < src.length; i++) {
    const c = src[i];
    if (escape) { escape = false; continue; }
    if (inStr) {
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (braceDepth === 0 && (c === '"' || c === "'")) { inStr = c; continue; }
    if (c === "{") braceDepth++;
    else if (c === "}") braceDepth--;
    else if (c === "<") depth++;
    else if (c === ">" && braceDepth === 0) {
      // check self-closing
      if (src[i - 1] === "/") { endIdx = i + 1; break; }
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }
  if (endIdx < 0) return null;
  const tag = src.slice(open, endIdx);
  // collect props by scanning name=...
  const props: Record<string, string> = {};
  // Use a manual scan for prop=value pairs.
  let p = "<GuideInfoHeader".length + open;
  // shift to after the tag name
  p = open + "<GuideInfoHeader".length;
  while (p < endIdx) {
    // skip whitespace
    while (p < endIdx && /\s/.test(src[p])) p++;
    if (src[p] === "/" || src[p] === ">") break;
    // read identifier
    const nameStart = p;
    while (p < endIdx && /[A-Za-z0-9_]/.test(src[p])) p++;
    const name = src.slice(nameStart, p);
    if (!name) break;
    if (src[p] !== "=") { props[name] = "true"; continue; }
    p++; // skip =
    // value: either "..." or {...}
    if (src[p] === '"' || src[p] === "'") {
      const q = src[p];
      p++;
      const vStart = p;
      let esc = false;
      while (p < endIdx) {
        if (esc) { esc = false; p++; continue; }
        if (src[p] === "\\") { esc = true; p++; continue; }
        if (src[p] === q) break;
        p++;
      }
      props[name] = JSON.stringify(src.slice(vStart, p));
      p++;
    } else if (src[p] === "{") {
      // balanced braces
      p++;
      const vStart = p;
      let bd = 1;
      let s: string | null = null;
      let e = false;
      while (p < endIdx && bd > 0) {
        const c = src[p];
        if (e) { e = false; p++; continue; }
        if (s) {
          if (c === "\\") { e = true; p++; continue; }
          if (c === s) s = null;
          p++; continue;
        }
        if (c === '"' || c === "'" || c === "`") { s = c; p++; continue; }
        if (c === "{") bd++;
        else if (c === "}") { bd--; if (bd === 0) break; }
        p++;
      }
      props[name] = src.slice(vStart, p);
      p++;
    }
  }
  return props;
}

// children = JSX between </GuideInfoHeader> (or self-close end) and <SmartGuideWizardShared>
function extractMidContent(src: string): string {
  const headerStart = src.indexOf("<GuideInfoHeader");
  if (headerStart < 0) return "";
  // find matching close: either self-close /> from opening tag, or the literal </GuideInfoHeader>
  // Easier: locate <SmartGuideWizardShared, walk back from that point to find the start of preceding JSX block
  const wizard = src.indexOf("<SmartGuideWizardShared");
  if (wizard < 0) return "";
  // Find end of opening header tag
  // re-use extractHeaderProps logic for finding endIdx
  let i = headerStart;
  let braceDepth = 0;
  let inStr: string | null = null;
  let escape = false;
  let depth = 0;
  let headerEndIdx = -1;
  for (; i < src.length; i++) {
    const c = src[i];
    if (escape) { escape = false; continue; }
    if (inStr) {
      if (c === "\\") { escape = true; continue; }
      if (c === inStr) inStr = null;
      continue;
    }
    if (braceDepth === 0 && (c === '"' || c === "'")) { inStr = c; continue; }
    if (c === "{") braceDepth++;
    else if (c === "}") braceDepth--;
    else if (c === "<") depth++;
    else if (c === ">" && braceDepth === 0) {
      if (src[i - 1] === "/") { headerEndIdx = i + 1; break; }
      depth--;
      if (depth === 0) { headerEndIdx = i + 1; break; }
    }
  }
  if (headerEndIdx < 0) return "";
  // Check if header had a matching close tag instead of self-closing
  const closeTagIdx = src.indexOf("</GuideInfoHeader>", headerEndIdx);
  let afterHeader = headerEndIdx;
  if (closeTagIdx > 0 && closeTagIdx < wizard) {
    afterHeader = closeTagIdx + "</GuideInfoHeader>".length;
  }
  return src.slice(afterHeader, wizard).trim();
}

const files = fs.readdirSync(DIR).filter(
  (f) => f.endsWith("GuideContent.tsx") && KEY_MAP[f.replace(/\.tsx$/, "")],
);

let ok = 0, skipped = 0;
for (const file of files) {
  const compName = file.replace(/\.tsx$/, "");
  const guideKey = KEY_MAP[compName];
  const fullPath = path.join(DIR, file);
  const src = fs.readFileSync(fullPath, "utf8");

  const stepsBlock = extractStepsBlock(src);
  const headerProps = extractHeaderProps(src);

  if (!stepsBlock || !headerProps) {
    console.log(`SKIP ${file} (could not parse)`);
    skipped++;
    continue;
  }

  // Check if 'free' prop is on SmartGuideWizardShared
  const freeMatch = src.match(/<SmartGuideWizardShared[^>]*\bfree\b/);
  const isFree = !!freeMatch;

  // Extract any JSX between header and wizard (legal disclaimers, info boxes)
  const midContent = extractMidContent(src);

  // Build header object literal
  // headerProps values are already valid JS expressions (string-quoted JSON or raw {...})
  const headerLines: string[] = [];
  const fieldOrder = ["title","source","formName","whoCanApply","processingTime","requirements","commonMistakes"];
  for (const f of fieldOrder) {
    if (headerProps[f] != null) headerLines.push(`    ${f}: ${headerProps[f]},`);
  }

  const out = `import LocalizedGuide from "./LocalizedGuide";
import type { GuideContent } from "@/lib/guide-i18n";
import type { StepData } from "./SmartGuideWizardShared";

const GUIDE_KEY = ${JSON.stringify(guideKey)};

const STEPS: StepData[] = ${stepsBlock};

const BASE: GuideContent = {
  header: {
${headerLines.join("\n")}
  },
  steps: STEPS,
};

export default function ${compName}() {
  return (
    <LocalizedGuide guideKey={GUIDE_KEY} base={BASE}${isFree ? " free" : ""}>
${midContent ? "      " + midContent.replace(/\n/g, "\n      ") : ""}
    </LocalizedGuide>
  );
}
`;
  fs.writeFileSync(fullPath, out, "utf8");
  ok++;
}
console.log(`Transformed ${ok} guides, skipped ${skipped}.`);
