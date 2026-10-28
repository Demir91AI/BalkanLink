/** Source-pinned SGB II companions; employer SGB III paper references are not authenticated BEA mappings. */
export const FINAL_SPECIALIST_SLUGS = ["anlage-hg", "anlage-meb", "anlage-uf", "anlage-se", "anlage-uh1", "anlage-uh2", "anlage-uh3", "nichterreichbarkeit", "arbeitsbescheinigung", "antragsruecknahme"] as const;
export const GRUNDSICHERUNG_SLUGS = ["hauptantrag", "weiterbewilligung", "anlage-kdu", "anlage-ek", "anlage-vm", "anlage-ki", "anlage-wep", "anlage-eks", "anlage-sv", "anlage-bb", "anlage-ve", ...FINAL_SPECIALIST_SLUGS] as const;
export type GrundsicherungSlug = typeof GRUNDSICHERUNG_SLUGS[number];
export function isGrundsicherungSlug(slug: string): slug is GrundsicherungSlug {
  return GRUNDSICHERUNG_SLUGS.some((item) => item === slug);
}

export const BA_FORMS_INDEX = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/downloads-arbeitslos-arbeit-finden";
export const BA_FILLING_NOTES = "https://www.arbeitsagentur.de/grundsicherung/ausfuellhinweise";
export const VERIFIED_PDFS: Record<GrundsicherungSlug, { url: string; edition: string; pages: number; sha256Prefix: string }> = {
  hauptantrag: { url: "https://www.arbeitsagentur.de/datei/antrag-sgb2_ba042689.pdf", edition: "10/2026", pages: 8, sha256Prefix: "ca83914379b236b2" },
  weiterbewilligung: { url: "https://www.arbeitsagentur.de/datei/weiterbewilligung-sgb2_ba042699.pdf", edition: "10/2026", pages: 6, sha256Prefix: "cd1b875257256fb6" },
  "anlage-kdu": { url: "https://www.arbeitsagentur.de/datei/anlagekdu_ba032980.pdf", edition: "10/2026", pages: 3, sha256Prefix: "c451fabb6f3110d6" },
  "anlage-ek": { url: "https://www.arbeitsagentur.de/datei/anlageek_ba032960.pdf", edition: "10/2026", pages: 4, sha256Prefix: "78218d99991efbfa" },
  "anlage-vm": { url: "https://www.arbeitsagentur.de/datei/anlagevm_ba033055.pdf", edition: "10/2026", pages: 6, sha256Prefix: "dd0f8cebc3049d45" },
  "anlage-ki": { url: "https://www.arbeitsagentur.de/datei/anlageki_ba033000.pdf", edition: "10/2026", pages: 5, sha256Prefix: "6c7f97165fca5f84" },
  "anlage-wep": { url: "https://www.arbeitsagentur.de/datei/anlagewep_ba033100.pdf", edition: "10/2026", pages: 7, sha256Prefix: "de9e9b6249d88278" },
  "anlage-eks": { url: "https://www.arbeitsagentur.de/datei/anlageeks_ba033540.pdf", edition: "10/2026", pages: 9, sha256Prefix: "c1cac86eb8632d52" },
  "anlage-sv": { url: "https://www.arbeitsagentur.de/datei/anlagesv_ba033005.pdf", edition: "10/2026", pages: 2, sha256Prefix: "c24b142bf6086501" },
  "anlage-bb": { url: "https://www.arbeitsagentur.de/datei/anlagebb_ba032985.pdf", edition: "10/2026", pages: 2, sha256Prefix: "7f113da78445bc9e" },
  "anlage-ve": { url: "https://www.arbeitsagentur.de/datei/anlageve_ba033130.pdf", edition: "10/2026", pages: 2, sha256Prefix: "acd507c0efa4e563" },
  "anlage-hg": { url: "https://www.arbeitsagentur.de/datei/anlagehg_ba032950.pdf", edition: "10/2026", pages: 2, sha256Prefix: "40f602a40f07d86d" },
  "anlage-meb": { url: "https://www.arbeitsagentur.de/datei/anlagemeb_ba032955.pdf", edition: "10/2026", pages: 4, sha256Prefix: "99f63a4bc79ed286" },
  "anlage-uf": { url: "https://www.arbeitsagentur.de/datei/anlageuf_ba032970.pdf", edition: "10/2026", pages: 7, sha256Prefix: "0a68d2af8621cc51" },
  "anlage-se": { url: "https://www.arbeitsagentur.de/datei/anlagese_ba032975.pdf", edition: "10/2026", pages: 3, sha256Prefix: "621c1240f1776efe" },
  "anlage-uh1": { url: "https://www.arbeitsagentur.de/datei/anlageuh1_ba032990.pdf", edition: "10/2026", pages: 3, sha256Prefix: "3bc7d4141d154fc4" },
  "anlage-uh2": { url: "https://www.arbeitsagentur.de/datei/anlageuh2_ba032995.pdf", edition: "10/2026", pages: 3, sha256Prefix: "94c26600242f8f52" },
  "anlage-uh3": { url: "https://www.arbeitsagentur.de/datei/anlageuh3_ba033050.pdf", edition: "10/2026", pages: 4, sha256Prefix: "73b0d29ad99cf64d" },
  nichterreichbarkeit: { url: "https://www.arbeitsagentur.de/datei/anfrage-ortsabwesenheit_ba147389.pdf", edition: "05/2026", pages: 3, sha256Prefix: "d923daa62b74de65" },
  arbeitsbescheinigung: { url: "https://www.arbeitsagentur.de/datei/arbeitsbescheinigung_ba013140.pdf", edition: "08/2023", pages: 9, sha256Prefix: "df7833909444b0e7" },
  antragsruecknahme: { url: "https://www.arbeitsagentur.de/datei/erklaerung-der-antragsruecknahme_ba053139.pdf", edition: "07/2026", pages: 1, sha256Prefix: "dac24aea00365bad" },
};

/* ── Memory-only navigator. Answers never leave component state. ── */
export type Tri = "yes" | "no" | "unsure";
export interface NavigatorAnswers {
  kind: "initial" | "renewal" | "unsure";
  partner: Tri;
  childrenUnder15: Tri;
  children15plus: Tri;
  housing: "rent" | "owned" | "none" | "unsure";
  employed: Tri;
  selfEmployed: Tri;
  assets: Tri;
  specialNeeds: Tri;
}
export const NAVIGATOR_QUESTIONS: { id: keyof NavigatorAnswers; options: string[] }[] = [
  { id: "kind", options: ["initial", "renewal", "unsure"] },
  { id: "partner", options: ["yes", "no", "unsure"] },
  { id: "childrenUnder15", options: ["yes", "no", "unsure"] },
  { id: "children15plus", options: ["yes", "no", "unsure"] },
  { id: "housing", options: ["rent", "owned", "none", "unsure"] },
  { id: "employed", options: ["yes", "no", "unsure"] },
  { id: "selfEmployed", options: ["yes", "no", "unsure"] },
  { id: "assets", options: ["yes", "no", "unsure"] },
  { id: "specialNeeds", options: ["yes", "no", "unsure"] },
];
/** "likely" = the official form text names it for this situation; "check" = depends on facts the user is unsure about. */
export interface Suggestion { form: string; reason: string; level: "likely" | "check"; slug?: string }

export function suggestForms(a: NavigatorAnswers): Suggestion[] {
  const out: Suggestion[] = [];
  const add = (form: string, reason: string, level: Suggestion["level"], slug?: string) => out.push({ form, reason, level, slug });
  const initial = a.kind !== "renewal";
  const renewal = a.kind !== "initial";
  const lvl = (v: string) => (v === "unsure" || a.kind === "unsure" ? "check" : "likely");
  if (initial) add("HA", "ha", a.kind === "unsure" ? "check" : "likely", "hauptantrag");
  if (renewal) add("WBA", "wba", a.kind === "unsure" ? "check" : "likely", "weiterbewilligung");
  add("VM", "vm", a.kind === "unsure" ? "check" : "likely", "anlage-vm");
  add("Kontoauszüge", "statements", a.kind === "unsure" ? "check" : "likely");
  if (initial) add("EK", "ek", a.kind === "unsure" ? "check" : "likely", "anlage-ek");
  if (initial && a.partner !== "no") add("WEP", "wepPartner", lvl(a.partner), "anlage-wep");
  if (initial && a.children15plus !== "no") add("WEP", "wepChild", lvl(a.children15plus), "anlage-wep");
  if (initial && a.childrenUnder15 !== "no") add("KI", "ki", lvl(a.childrenUnder15), "anlage-ki");
  if (initial && a.housing !== "none") add("KDU", a.housing === "owned" ? "kduOwned" : "kduRent", lvl(a.housing), "anlage-kdu");
  if (renewal && a.housing !== "none") add("WBA C", "wbaHousing", lvl(a.housing), "weiterbewilligung");
  if (renewal && a.employed !== "no") add("WBA D 16", "wbaWork", lvl(a.employed), "weiterbewilligung");
  if (a.selfEmployed !== "no") add("EKS", "eks", lvl(a.selfEmployed), "anlage-eks");
  if (a.assets !== "no") add("VM", "vmAssets", lvl(a.assets), "anlage-vm");
  if (a.specialNeeds !== "no") add("MEB / BB / UH2", "special", "check");
  add("…", "other", "check");
  return out;
}