import { GUIDE_SNAPSHOT } from "./guide-snapshot.ts";

export const ASSISTANT_CATALOG = GUIDE_SNAPSHOT.catalog;
export const ASSISTANT_GUIDE_SLUGS = new Set<string>(ASSISTANT_CATALOG.map(f => f.slug));
const aliases: Record<string, string> = {
  "dječji dodatak": "kindergeld", "djecji dodatak": "kindergeld", "dečji dodatak": "kindergeld", "dodatak za djecu": "kindergeld",
  "prijava adrese": "anmeldung", "prijava prebivališta": "anmeldung", "ummeldung": "anmeldung",
  "pomoć za stan": "wohngeld", "pomoć za kiriju": "wohngeld", "pomoć za najamninu": "wohngeld",
  "bürgergeld": "hauptantrag", "burgergeld": "hauptantrag", "buergergeld": "hauptantrag",
  "bafög": "bafoeg", "bafog": "bafoeg", "baфög": "bafoeg",
  "führungszeugnis": "fuehrungszeugnis", "fuhrungszeugnis": "fuehrungszeugnis",
  "steuerklasse": "steuerklassenwechsel", "familienversicherung": "krankenkasse",
  "mutterschutz": "mutterschaftsgeld", "sozialhilfe": "grundsicherung",
};
const keywords = [...ASSISTANT_CATALOG.flatMap(f => [[f.slug, f.slug], [f.label.toLowerCase(), f.slug]]), ...Object.entries(aliases)]
  .sort((a, b) => b[0].length - a[0].length);
export function detectAssistantGuide(text: string): string | null {
  const lower = text.toLowerCase();
  const matches = new Set(keywords.filter(([word]) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^\\p{L}\\p{N}-])${escaped}(?=$|[^\\p{L}\\p{N}-])`, "u").test(lower);
  }).map(([,slug]) => slug));
  // Multiple topics are not silently reduced to an unrelated single guide.
  return matches.size === 1 ? [...matches][0] : null;
}
export function assistantGuideRoute(slug: string | null): string {
  return slug && ASSISTANT_GUIDE_SLUGS.has(slug) ? `/formulari/${slug}` : "/formulari";
}
export type GuideLocale = keyof typeof GUIDE_SNAPSHOT.locales;
export function guideLocale(lang: string): GuideLocale {
  return lang === "de" || lang === "hr" || lang === "sr" ? lang : "bs";
}
export function resolveSourceGuide(text: string, currentPage = ""): keyof typeof GUIDE_SNAPSHOT.sources | null {
  let slug = detectAssistantGuide(text);
  // Only explicit page-relative questions inherit the page; unknown questions never do.
  if (!slug && /^(pitaj o ovom|objasni (mi )?(ovo|ovu stranicu)|šta je ovo|sta je ovo|was ist das|erkläre diese seite)[?.!\s]*$/i.test(text.trim())) {
    slug = currentPage.replace(/^\/(de|hr|sr)(?=\/)/, "").split(/[?#]/)[0].match(/^\/formulari\/([^/]+)$/)?.[1] ?? null;
  }
  return slug === "kindergeld" || slug === "anmeldung" || slug === "wohngeld" ? slug : null;
}
/** Verbatim existing guide steps, not generated personal advice or live source retrieval. */
export function buildSourceGuideReply(slug: keyof typeof GUIDE_SNAPSHOT.sources, language: string, overview = false): string {
  const { ui, guides } = GUIDE_SNAPSHOT.locales[guideLocale(language)];
  const guide = guides[slug];
  const source = GUIDE_SNAPSHOT.sources[slug];
  const links = [{ url: source.url, label: source.label }, ...("extraLinks" in source ? source.extraLinks : [])];
  return [
    `**${guide.title}**`,
    overview ? ui.redirect : guide.steps.map((step, i) => `${i + 1}. **${step.title}** — ${step.action}`).join("\n\n"),
    "variation" in guide ? guide.variation : "",
    ui.limits,
    ui.checked.replace("{{date}}", source.verifiedOn),
    `**${ui.sources}**\n${links.map(link => `- [${link.label}](${link.url})`).join("\n")}`,
    `👉 [${ui.open}](${assistantGuideRoute(slug)})`,
  ].filter(Boolean).join("\n\n");
}
export function guideRedirectReply(language: string): string {
  const ui = GUIDE_SNAPSHOT.locales[guideLocale(language)].ui;
  return `${ui.unknown}\n\n👉 [${ui.open}](/formulari)`;
}
export function guideReplyStream(content: string): ReadableStream<Uint8Array> {
  return new ReadableStream({ start(controller) {
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\ndata: [DONE]\n\n`));
    controller.close();
  } });
}