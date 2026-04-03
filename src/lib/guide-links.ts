/**
 * CENTRAL LINK REGISTRY — Single Source of Truth for all Guide links.
 *
 * Rules:
 * - Only use stable official landing pages (no deep-links that rotate).
 * - portalUrl = official online portal / eService entry.
 * - downloadsUrl = official download/forms overview page (NOT a direct .pdf).
 * - infoUrl = official info / landing page about the topic.
 * - If a field is "" it means no verified link exists → fallback text is shown.
 *
 * To add/change a link: edit ONLY this file. GuideDetail reads from here.
 */

export interface GuideLinks {
  /** Stable URL to the official online portal / eService */
  portalUrl: string;
  /** Stable URL to official download/forms overview page */
  downloadsUrl: string;
  /** Stable URL to official info/landing page */
  infoUrl: string;
}

/**
 * Registry keyed by guide slug.
 * Every guide in guide-data.ts should have an entry here.
 */
export const guideLinkRegistry: Record<string, GuideLinks> = {
  // ===================== FAMILIE =====================
  kindergeld: {
    portalUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
    downloadsUrl: "",
    infoUrl: "https://familienportal.de/familienportal/familienleistungen/kindergeld",
  },
  kinderzuschlag: {
    portalUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag",
    downloadsUrl: "",
    infoUrl: "https://familienportal.de/familienportal/familienleistungen/kinderzuschlag",
  },
  elterngeld: {
    portalUrl: "https://www.elterngeld-digital.de",
    downloadsUrl: "",
    infoUrl: "https://familienportal.de/familienportal/familienleistungen/elterngeld",
  },
  "bildung-teilhabe": {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  unterhaltsvorschuss: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/unterhaltsvorschuss",
  },

  // ===================== WOHNEN =====================
  wohngeld: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmwsb.bund.de",
  },
  buergergeld: {
    portalUrl: "https://www.jobcenter.digital",
    downloadsUrl: "",
    infoUrl: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld",
  },
  heizkostenzuschuss: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmwsb.bund.de",
  },

  // ===================== ARBEIT =====================
  arbeitslosengeld: {
    portalUrl: "https://www.arbeitsagentur.de/arbeitslosengeld",
    downloadsUrl: "",
    infoUrl: "https://www.arbeitsagentur.de/finanzielle-hilfen/arbeitslosengeld-anspruch-hoehe-dauer",
  },
  kurzarbeitergeld: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.arbeitsagentur.de/kurzarbeit",
  },

  // ===================== GESUNDHEIT =====================
  krankengeld: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bundesgesundheitsministerium.de/krankengeld",
  },
  pflegegrad: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bundesgesundheitsministerium.de/pflege",
  },
  reha: {
    portalUrl: "https://www.eservice-drv.de/SelfServiceWeb/",
    downloadsUrl: "",
    infoUrl: "https://www.deutsche-rentenversicherung.de/DRV/DE/Reha/reha_node.html",
  },

  // ===================== BILDUNG =====================
  bafoeg: {
    portalUrl: "https://www.bafoeg-digital.de",
    downloadsUrl: "",
    infoUrl: "https://www.xn--bafg-7qa.de",
  },
  "schueler-bafoeg": {
    portalUrl: "https://www.bafoeg-digital.de",
    downloadsUrl: "",
    infoUrl: "https://www.xn--bafg-7qa.de",
  },
  lernfoerderung: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmas.de/DE/Arbeit/Grundsicherung-Buergergeld/Bildungspaket/bildungspaket.html",
  },
  "kita-zuschuss": {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/kinderbetreuung",
  },

  // ===================== ADDITIONAL =====================
  mutterschaftsgeld: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bmfsfj.de/bmfsfj/themen/familie/familienleistungen/mutterschaftsleistungen",
  },
  familienversicherung: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung",
  },
  steuerklassenwechsel: {
    portalUrl: "https://www.elster.de/eportal/start",
    downloadsUrl: "",
    infoUrl: "https://www.bundesfinanzministerium.de/Web/DE/Themen/Steuern/Formulare/formulare.html",
  },
  kirchenaustritt: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.kirchenaustritt.de",
  },
  bildungsgutschein: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.arbeitsagentur.de/karriere-und-weiterbildung/bildungsgutschein",
  },
  integrationskurs: {
    portalUrl: "",
    downloadsUrl: "",
    infoUrl: "https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
  },
};

/**
 * Resolves the links to show for a given guide slug.
 * Returns an array of { type, label, url } for rendering, plus whether a fallback hint is needed.
 */
export function resolveGuideLinks(slug: string) {
  const entry = guideLinkRegistry[slug];

  const links: { type: "portal" | "downloads" | "info"; url: string }[] = [];
  let showFallbackHint = true;

  if (entry) {
    if (entry.portalUrl) {
      links.push({ type: "portal", url: entry.portalUrl });
    }
    if (entry.downloadsUrl) {
      links.push({ type: "downloads", url: entry.downloadsUrl });
      showFallbackHint = false; // downloads page serves as PDF source
    }
    if (entry.infoUrl && entry.infoUrl !== entry.portalUrl) {
      links.push({ type: "info", url: entry.infoUrl });
    }
  }

  return { links, showFallbackHint };
}

/**
 * DEV-ONLY: Audit all guide links and log which guides have missing/empty links.
 * Call this from the browser console or a dev component.
 */
export function auditGuideLinks() {
  if (import.meta.env.PROD) return;

  const issues: string[] = [];

  for (const [slug, entry] of Object.entries(guideLinkRegistry)) {
    const missing: string[] = [];
    if (!entry.portalUrl) missing.push("portalUrl");
    if (!entry.downloadsUrl) missing.push("downloadsUrl");
    if (!entry.infoUrl) missing.push("infoUrl");

    if (missing.length > 0) {
      issues.push(`[${slug}] missing: ${missing.join(", ")}`);
    }
  }

  if (issues.length > 0) {
    console.group("🔗 Guide Link Audit");
    issues.forEach((issue) => console.warn(issue));
    console.groupEnd();
  } else {
    console.log("✅ All guide links are configured.");
  }

  return issues;
}
