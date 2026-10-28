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
export type GuideMessage = { role: string; content: unknown };
export type SourceTopic = keyof typeof GUIDE_SNAPSHOT.sources;
const followUp = /^(?:priprema|dokumenti|koji dokumenti(?: mi trebaju)?|šta pripremiti|sta pripremiti|što pripremiti|portal|online|papir|predaja|slanje|potpis|svi koraci|sve korake|nastavi|dalje|novorođenče(?: u (?:njemačkoj|nemačkoj))?|novorođenče|beba|punoljetno dijete|punoletno dete|dijete u inostranstvu|dete u inostranstvu|unterlagen|vorbereitung|welche unterlagen|einreichung|unterschrift|alle schritte|weiter|neugeborenes(?: in deutschland)?|volljähriges kind|kind im ausland)[?.!\s]*$/i;

/** Inherit only a bounded short answer and an immediately established, sourced topic. */
export function resolveConversationGuide(messages: GuideMessage[], currentPage = ""): SourceTopic | null {
  const last = messages[messages.length - 1];
  if (last?.role !== "user" || typeof last.content !== "string") return null;
  const explicit = resolveSourceGuide(last.content, currentPage);
  if (explicit) return explicit;
  if (!followUp.test(last.content.trim())) return null;
  const preceding = messages.slice(0, -1).reverse();
  const previousUser = preceding.find(m => m.role === "user");
  const previousAssistant = preceding.find(m => m.role === "assistant");
  if (!previousUser || typeof previousUser.content !== "string") return null;
  const prior = resolveSourceGuide(previousUser.content);
  if (prior) return prior;
  // A prior short answer may continue a verified chat reply, not arbitrary topic mentions.
  if (followUp.test(previousUser.content.trim()) && typeof previousAssistant?.content === "string") {
    const matches = [...previousAssistant.content.matchAll(/\]\(\/formulari\/(kindergeld|anmeldung|wohngeld)\)/g)].map(m => m[1]);
    const topics = new Set(matches);
    if (topics.size === 1) return matches[0] as SourceTopic;
  }
  return null;
}

export function buildConversationGuideReply(slug: SourceTopic, language: string, messages: GuideMessage[], overview = false): string {
  if (overview) return buildSourceGuideReply(slug, language, true);
  const locale = GUIDE_SNAPSHOT.locales[guideLocale(language)];
  const guide = locale.guides[slug];
  const text = typeof messages.at(-1)?.content === "string" ? String(messages.at(-1)?.content).toLowerCase() : "";
  // Use only this topic's current segment; facts from an earlier, unrelated task are not intake.
  let start = messages.length - 1;
  while (start > 0) {
    const m = messages[start - 1];
    if (m.role === "user" && typeof m.content === "string" && !followUp.test(m.content.trim()) && resolveSourceGuide(m.content) !== slug) break;
    start--;
  }
  const userContext = messages.slice(start).filter(m => m.role === "user" && typeof m.content === "string").map(m => String(m.content).toLowerCase()).join("\n");
  const source = GUIDE_SNAPSHOT.sources[slug];
  const footer = buildSourceGuideReply(slug, language, true).split(`**${locale.ui.sources}**`)[1];
  const closing = `${locale.ui.limits}\n\n${locale.ui.checked.replace("{{date}}", source.verifiedOn)}\n\n**${locale.ui.sources}**${footer}`;
  if (slug === "kindergeld") {
    const special = /(?:punoljet|punolet|volljähr|(?:ima|hat)\s+(?:18|19|2\d)\s*(?:godin|jahr))/i.test(userContext) ? "adult" :
      /(?:inostranstv|inozemstv|ausland|drugoj državi|drugoj zemlji|anderen staat|anderen land)/i.test(userContext) ? "cross" : null;
    if (special) {
      const entry = locale.guides.kindergeld.special[special];
      return [`**${entry.title}**`, entry.body, locale.guides.kindergeld.special.depends,
        `[${entry.cta}](${GUIDE_SNAPSHOT.specialLinks[special]})`, closing].join("\n\n");
    }
    const newborn = /(?:novorođen|novorodjen|neugebor|beba|(?:dobio|dobila|dobili|geboren|geburt).*(?:dijete|dete|kind|njemač|nemač|deutschland))/i.test(userContext);
    if (!newborn) return [locale.ui.conversation.kindergeldQuestion, closing].join("\n\n");
  }
  let ids: string[];
  if (/svi koraci|sve korake|alle schritte/.test(text)) ids = guide.steps.map(s => s.id);
  else if (/dokumenti|priprem|unterlagen|vorbereitung/.test(text)) ids = slug === "kindergeld" ? ["documents", "prepare"] : slug === "anmeldung" ? ["housing", "prepare"] : ["evidence"];
  else if (/portal|online|papir/.test(text)) ids = slug === "kindergeld" ? ["portal"] : slug === "anmeldung" ? ["move", "submit"] : ["office", "fill"];
  else if (/predaja|slanje|potpis|einreichung|unterschrift/.test(text)) ids = slug === "kindergeld" ? ["submit", "after"] : slug === "anmeldung" ? ["submit", "after"] : ["submit", "after"];
  else ids = slug === "kindergeld" ? ["documents", "portal", "submit"] : slug === "anmeldung" ? ["move", "housing", "submit"] : ["office", "evidence", "submit"];
  const selected = guide.steps.filter(s => ids.includes(s.id));
  return [`**${guide.title}**`, selected.map((s, i) => `${i + 1}. **${s.title}**\n${"concise" in s ? s.concise : s.action}`).join("\n\n"),
    slug === "anmeldung" ? locale.ui.conversation.local : slug === "wohngeld" ? locale.ui.conversation.wohngeld : "",
    locale.ui.conversation.next, closing].filter(Boolean).join("\n\n");
}

/** Visa stays on its existing model path and accounting; only bounded sourced navigation is injected. */
export function visaNavigationContext(language: string): string {
  const { ui } = GUIDE_SNAPSHOT.locales[guideLocale(language)];
  return `${ui.conversation.visa}\n[${GUIDE_SNAPSHOT.visaSource.label}](${GUIDE_SNAPSHOT.visaSource.url})\nNo recorded verifiedOn for this portal in the source registry; do not invent a date. Use existing conversation facts, ask at most one missing question; never ask a repeated question.`;
}
export function guideReplyStream(content: string): ReadableStream<Uint8Array> {
  return new ReadableStream({ start(controller) {
    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\ndata: [DONE]\n\n`));
    controller.close();
  } });
}