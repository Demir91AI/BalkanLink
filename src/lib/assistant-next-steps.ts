import { ASSISTANT_CATALOG, ASSISTANT_GUIDE_SLUGS, assistantGuideRoute } from "../../supabase/functions/chat-assistant/guide-context";

/**
 * Deterministic next-step cards shown after an assistant answer.
 * Selected only from the verified guide catalog and fixed internal routes —
 * never from model output, never claiming the user is entitled to anything,
 * and without any extra model call.
 */
export type NextStepCard =
  | { kind: "route"; to: string; labelKey: string; labelVars?: Record<string, string> }
  | { kind: "ask"; questionKey: string; labelKey: string; vars: Record<string, string> };

const VISA_RE = /\b(viz[aeu]|vizn\w*|visum|visa|aufenthaltstitel|blue card|plava karta)\b/iu;

export function nextStepCards(input: {
  guideSlug?: string | null;
  userText?: string;
  isValidRoute: (path: string) => boolean;
  excludeRoutes?: string[];
}): NextStepCard[] {
  const exclude = new Set(input.excludeRoutes ?? []);
  const out: NextStepCard[] = [];
  const slug = input.guideSlug && ASSISTANT_GUIDE_SLUGS.has(input.guideSlug) ? input.guideSlug : null;

  if (slug) {
    const label = ASSISTANT_CATALOG.find(f => f.slug === slug)?.label ?? slug;
    const vars = { topic: label };
    const route = assistantGuideRoute(slug);
    if (!exclude.has(route) && input.isValidRoute(route)) {
      out.push({ kind: "route", to: route, labelKey: "assistantNext.openGuide", labelVars: vars });
    }
    out.push({ kind: "ask", questionKey: "assistantNext.askDocsQ", labelKey: "assistantNext.askDocs", vars });
    out.push({ kind: "ask", questionKey: "assistantNext.askConditionsQ", labelKey: "assistantNext.askConditions", vars });
    return out.slice(0, 3);
  }

  if (input.userText && VISA_RE.test(input.userText)) {
    if (!exclude.has("/viza") && input.isValidRoute("/viza")) {
      out.push({ kind: "route", to: "/viza", labelKey: "assistantNext.openVisa" });
    }
    out.push({ kind: "ask", questionKey: "assistantNext.askVisaDocsQ", labelKey: "assistantNext.askVisaDocs", vars: {} });
    return out.slice(0, 3);
  }

  // Unknown topic: no cards rather than a guessed route.
  return [];
}
