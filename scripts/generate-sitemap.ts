// Runs before `vite dev` and `vite build`; writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://balkanlink.de";
const LOCALES = ["de", "hr", "sr"] as const;

interface Entry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  localized?: boolean; // emit hreflang alternates for de/hr/sr
}

const entries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", localized: true },
  // Hubs
  { path: "/dolazak", changefreq: "weekly", priority: "0.9", localized: true },
  { path: "/zivot", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/familie", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/foerderungen", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/radno-pravo", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/biznis", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/porezi", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/probleme", changefreq: "monthly", priority: "0.7", localized: true },
  // Tools
  { path: "/viza", changefreq: "monthly", priority: "0.9", localized: true },
  { path: "/anerkennung-navigator", changefreq: "monthly", priority: "0.8", localized: true },
  { path: "/dokumenten-check", changefreq: "monthly", priority: "0.8", localized: true },
  { path: "/deutsch-trainer", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/asistent", changefreq: "monthly", priority: "0.7", localized: true },
  { path: "/anmeldung-simulator", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/schufa-simulator", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/nebenkosten-scan", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/brutto-netto-rechner", changefreq: "monthly", priority: "0.7", localized: true },
  { path: "/kalkulatori", changefreq: "monthly", priority: "0.7", localized: true },
  { path: "/bussgeld", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/mietrecht", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/bonitet", changefreq: "monthly", priority: "0.6", localized: true },
  // Forms hubs + pages
  { path: "/formulare", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/formulari", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/vorlagen", changefreq: "weekly", priority: "0.8", localized: true },
  { path: "/check-liste", changefreq: "weekly", priority: "0.7", localized: true },
  // Musterformulare
  { path: "/musterformular/anmeldung", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/kindergeld", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/elterngeld", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/buergergeld", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/wohngeld", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/arbeitslosengeld", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/bafoeg", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/einbuergerung", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/fuehrungszeugnis", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/grundsicherung", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/integrationskurs", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/kinderzuschlag", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/kirchenaustritt", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/schueler-bafoeg", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/steuerklasse", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/wirtschaftliche-jugendhilfe", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/arbeitsbescheinigung", changefreq: "monthly", priority: "0.7" },
  { path: "/musterformular/antragsruecknahme", changefreq: "monthly", priority: "0.7" },
  { path: "/formulari/kindergeld/muster", changefreq: "monthly", priority: "0.6" },
  { path: "/formulari/anmeldung/muster", changefreq: "monthly", priority: "0.6" },
  // Dolazak subpages
  { path: "/dolazak/prvi-koraci", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/prijava-prebivalista", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/boravisna-dozvola", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/bankovni-racun", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/zdravstveno-osiguranje", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/sozialversicherung", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/steuer-id-i-porezna-klasa", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/rundfunkbeitrag", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/auto-anmelden", changefreq: "monthly", priority: "0.7" },
  { path: "/dolazak/fuehrerschein", changefreq: "monthly", priority: "0.7" },
  // Other
  { path: "/nach-deutschland", changefreq: "monthly", priority: "0.8", localized: true },
  { path: "/directory", changefreq: "weekly", priority: "0.7", localized: true },
  { path: "/stellenangebote", changefreq: "daily", priority: "0.8", localized: true },
  { path: "/wohnungen", changefreq: "daily", priority: "0.8", localized: true },
  { path: "/nudim-trazim", changefreq: "daily", priority: "0.7", localized: true },
  { path: "/pitaj-dijasporu", changefreq: "daily", priority: "0.7", localized: true },
  { path: "/qa", changefreq: "weekly", priority: "0.6", localized: true },
  { path: "/paketi", changefreq: "monthly", priority: "0.6", localized: true },
  { path: "/pricing", changefreq: "monthly", priority: "0.6" },
  // Legal
  { path: "/impressum", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/datenschutz", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/nutzungsbedingungen", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/cookie-richtlinie", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/disclaimer", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/dsa", changefreq: "yearly", priority: "0.3", localized: true },
  { path: "/ki-hinweis", changefreq: "yearly", priority: "0.3", localized: true },
];

function urlNode(e: Entry): string {
  const lines = [`  <url>`, `    <loc>${BASE_URL}${e.path}</loc>`];
  if (e.localized) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="bs" href="${BASE_URL}${e.path}" />`);
    for (const l of LOCALES) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/${l}${e.path === "/" ? "" : e.path}" />`);
    }
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}${e.path}" />`);
  }
  if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
  if (e.priority) lines.push(`    <priority>${e.priority}</priority>`);
  lines.push(`  </url>`);
  return lines.join("\n");
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `        xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
  ...entries.map(urlNode),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
