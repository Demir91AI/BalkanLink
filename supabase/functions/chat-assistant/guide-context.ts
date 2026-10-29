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

const shortCue = /^(?:a\s+|i\s+|und\s+)?(?:da|ne|ja|nein|jeste|nije|ok|okay|može|moze|kako|wie|koliko|wie ?viel|gdje|gde|wo|rok|frist|bis wann|do kada|uslov|uvjet|uslovi|uvjeti|voraussetzung|dokument|unterlagen|portal|predaj|podnosi|podnes|beantrag|novorođen|novorođenče|beba|punoljet|punolet|inostranstv|ausland|iznos|betrag|koji|koje|šta|sta|što|was|welche)/i;
/** Short context-dependent follow-ups ("Da", "a koliko?", "gdje to predajem?", "Koji su opći uslovi?"). */
export function isShortFollowUp(text: string): boolean {
  const t = text.trim();
  return t.length > 0 && t.length <= 70 && !detectAssistantGuide(t) && (followUp.test(t) || shortCue.test(t));
}
function topicOfAssistant(content: unknown): SourceTopic | null {
  if (typeof content !== "string") return null;
  const topics = new Set([...content.matchAll(/\]\(\/formulari\/(kindergeld|anmeldung|wohngeld)\)/g)].map(m => m[1]));
  return topics.size === 1 ? [...topics][0] as SourceTopic : null;
}
/** Inherit a sourced topic only through a chain of short follow-ups; a new or unknown topic ends inheritance. */
export function resolveConversationGuide(messages: GuideMessage[], currentPage = ""): SourceTopic | null {
  const last = messages[messages.length - 1];
  if (last?.role !== "user" || typeof last.content !== "string") return null;
  const explicit = resolveSourceGuide(last.content, currentPage);
  if (explicit) return explicit;
  // Another recognised (non-sourced) topic is a topic change, never inherited.
  if (detectAssistantGuide(last.content) || !isShortFollowUp(last.content)) return null;
  const preceding = messages.slice(0, -1).reverse().slice(0, 8);
  for (const m of preceding) {
    if (m.role === "assistant") { const t = topicOfAssistant(m.content); if (t) return t; continue; }
    if (m.role !== "user" || typeof m.content !== "string") return null;
    const t = resolveSourceGuide(m.content);
    if (t) return t;
    if (!isShortFollowUp(m.content)) return null;
  }
  return null;
}

/** Informational "general conditions" questions get a direct overview, never intake questions. */
export function isGeneralInfoQuestion(text: string): boolean {
  return /(?:uslov|uvjet|preduslov|preduvjet|ko (?:ima|može|moze) pravo|tko (?:ima|može) pravo|ko dobija|ko dobiva|voraussetzung|bedingung|anspruchsvoraussetz|wer (?:bekommt|erhält|hat anspruch)|ne procjenjuj|ne procenjuj|ne procjenjuj|nicht (?:bewerten|prüfen))/i.test(text);
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
  // One short relevant caveat plus the recorded source date; sources and SmartGuide last.
  const closing = `_${locale.ui.conversation.limitsShort} ${locale.ui.checked.replace("{{date}}", source.verifiedOn)}_\n\n**${locale.ui.sources}**${footer}`;
  const conv = locale.ui.conversation;
  const amount = /(?:koliko|iznos|wie ?viel|betrag|höhe|hoehe)/i.test(text);
  const deadline = /(?:\brok\b|rokov|frist|do kada|bis wann)/i.test(text);
  if (slug !== "anmeldung" && (amount || deadline)) return [deadline && !amount ? conv.deadline : conv.amount, closing].join("\n\n");
  if (slug === "wohngeld" && isGeneralInfoQuestion(text)) {
    return [`**${conv.wohngeldGeneral.title}**`, conv.wohngeldGeneral.items.map((item, i) => `${i + 1}. ${item}`).join("\n"), closing].join("\n\n");
  }
  let caseHint = "";
  if (slug === "kindergeld") {
    if (isGeneralInfoQuestion(text)) {
      const general = conv.kindergeldGeneral;
      return [`**${general.title}**`, general.items.map((item, i) => `${i + 1}. ${item}`).join("\n"), closing].join("\n\n");
    }
    const special = /(?:punoljet|punolet|volljähr|(?:ima|hat)\s+(?:18|19|2\d)\s*(?:godin|jahr))/i.test(userContext) ? "adult" :
      /(?:inostranstv|inozemstv|ausland|drugoj državi|drugoj zemlji|anderen staat|anderen land|(?:dijete|dete|djeca|deca|kind|sin|kćerk|ćerk)[^.?!\n]{0,40}\b(?:u|in|iz)\s+(?:bosn|bih|srbij|hrvatsk|crnoj gori|kosov|makedonij|albanij|serbien|kroatien|montenegro|nordmazedonien|albanien))/i.test(userContext) ? "cross" : null;
    if (special) {
      const entry = locale.guides.kindergeld.special[special];
      return [`**${entry.title}**`, entry.body, locale.guides.kindergeld.special.depends,
        `[${entry.cta}](${GUIDE_SNAPSHOT.specialLinks[special]})`, closing].join("\n\n");
    }
    const newborn = /(?:novorođen|novorodjen|neugebor|beba|(?:dobio|dobila|dobili|geboren|geburt).*(?:dijete|dete|kind|njemač|nemač|deutschland))/i.test(userContext);
    // No intake question first: a direct overview, with a one-line hint for special cases.
    if (!newborn) caseHint = conv.caseHint;
    if (/^\s*(?:kindergeld|dječji dodatak|djecji dodatak|dečji dodatak)[?.!\s]*$/i.test(text)) {
      const general = conv.kindergeldGeneral;
      return [`**${general.title}**`, general.items.map((item, i) => `${i + 1}. ${item}`).join("\n"), caseHint, conv.next, closing].join("\n\n");
    }
  }
  let ids: string[];
  if (/svi koraci|sve korake|alle schritte/.test(text)) ids = guide.steps.map(s => s.id);
  else if (/dokumenti|priprem|unterlagen|vorbereitung/.test(text)) ids = slug === "kindergeld" ? ["documents", "prepare"] : slug === "anmeldung" ? ["housing", "prepare"] : ["evidence"];
  else if (/portal|online|papir/.test(text)) ids = slug === "kindergeld" ? ["portal"] : slug === "anmeldung" ? ["move", "submit"] : ["office", "fill"];
  else if (/predaj|slanje|potpis|einreichung|unterschrift|gdje|gde|\bwo\b/.test(text)) ids = slug === "kindergeld" ? ["submit", "after"] : slug === "anmeldung" ? ["submit", "after"] : ["submit", "after"];
  else ids = slug === "kindergeld" ? ["documents", "portal", "submit"] : slug === "anmeldung" ? ["move", "housing", "submit"] : ["office", "evidence", "submit"];
  const selected = guide.steps.filter(s => ids.includes(s.id));
  return [`**${guide.title}**`, selected.map((s, i) => `${i + 1}. **${s.title}**\n${"concise" in s ? s.concise : s.action}`).join("\n\n"),
    caseHint, slug === "anmeldung" ? locale.ui.conversation.local : slug === "wohngeld" ? locale.ui.conversation.wohngeld : "",
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