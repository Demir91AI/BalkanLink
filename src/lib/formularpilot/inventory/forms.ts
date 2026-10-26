/**
 * FormularPilot inventory — every form/template found in the repository (2026-10-26).
 * Evidence: public/muster, src/lib/pdf-fill-*.ts, src/pages/muster, App.tsx routes,
 * src/lib/form-catalog.ts, src/lib/vorlagen-templates.ts, src/lib/elterngeld-bundeslaender.ts.
 * Nothing is "tested": no variant has an authentic official file + golden read-back + rights.
 */
import type { InventoryEntry, InventoryVariant } from "./types";

const CHECKED = "2026-10-26";
const STD_ACCEPT = [
  "authentic official file obtained from issuer; sha256 + version recorded",
  "preflight manifest with native field names/types passes",
  "fill-and-read-back golden test with synthetic data passes",
  "edition selection by effective/birth date tested",
  "authority destination via official lookup or verified entry",
  "annexes + signatures listed to user; user review/confirm step",
  "hosting/reuse rights documented by owner/lawyer",
];

const bundled = (
  id: string, file: string, fields: number, extra: Partial<InventoryVariant> = {},
): InventoryVariant => ({
  id, bundledFile: file, pdfTech: "acroform", fieldCount: fields,
  provenance: "unverified", readiness: "needs_review",
  blockers: ["no authentic official comparison", "rights unknown", "no golden test"], ...extra,
});

/* ---------- Elterngeld: 16 states ---------- */
const eg = (
  st: string, file: string | undefined, url: string | undefined, http: number | undefined,
  fields: number | undefined, extra: Partial<InventoryVariant> = {},
): InventoryVariant => ({
  id: `elterngeld-${st}`, appliesTo: st, bundledFile: file, officialUrl: url,
  officialUrlCheck: http ? { status: http, checkedAt: CHECKED } : undefined,
  pdfTech: file ? "acroform" : "unknown", fieldCount: fields,
  provenance: file ? "unverified" : "not_applicable",
  readiness: file ? "needs_review" : "blocked",
  blockers: file
    ? ["single edition used for all birth dates", "no authentic comparison", "rights unknown"]
    : ["no bundled form; official route only"],
  ...extra,
});
const SHARED_531 = "byte-identical file reused for bb/hh/rp/sh — state-specific edition not proven";

export const ELTERNGELD_VARIANTS: InventoryVariant[] = [
  eg("bw", undefined, "https://www.l-bank.de/dokumente/lbank/familie/elterngeld/antrag-elterngeld.pdf", 404, undefined,
    { pdfTech: "flat", blockers: ["state list URL returns 404", "official paper form is flat (0 fields) — see elterngeld-pilot.ts"] }),
  eg("by", "elterngeld-bayern-2025.pdf", "https://www.zbfs.bayern.de/imperia/md/content/zbfs/erziehungsgeld/antraege/antrag_elterngeld_05_2025.pdf", 404, 1024,
    { provenance: "differs_from_official", blockers: ["bundled hash differs from official 05/2025 (PDF24 re-save)", "5 birth-date editions exist, live uses one", "state list URL returns 404", "rights unknown"] }),
  eg("be", "elterngeld-berlin-2025.pdf", "https://berlin.de/jugendamt-pankow/_assets/fachdienst-2/dokumente/250313-elterngeldantrag-hauptantrag.pdf", 200, 533),
  eg("bb", "elterngeld-brandenburg-2025.pdf", "https://service.stadt-brandenburg.de/dienstleistungen/-/egov-bis-detail/dokument/175334/download?_9_WAR_vrportlet_priv_r_p_action=bisview-dienstleistung-show", 200, 531,
    { blockers: [SHARED_531, "source is a city portal, not state authority", "rights unknown"] }),
  eg("hb", "elterngeld-bremen-2025.pdf", "https://buergerservice.bremen.de/sixcms/media.php/5/Elterngeldantrag%20%E2%80%93%20nur%20f%C3%BCr%20Geburten%20ab%20dem%2001.04.2025.pdf", 403, 673,
    { blockers: ["official URL returned 403 to automated check", "valid only for births from 01.04.2025 per filename", "rights unknown"] }),
  eg("hh", "elterngeld-hamburg-2025.pdf", "https://fhh1.hamburg.de/Dibis/form/pdf/Antrag_auf_Elterngeld_fuer_Geburten_ab_dem_01.04.2025_Stand_08_25.pdf", 200, 531,
    { blockers: [SHARED_531, "valid only for births from 01.04.2025 per filename", "rights unknown"] }),
  eg("he", undefined, undefined, undefined, undefined),
  eg("mv", "elterngeld-mecklenburg-vorpommern-2025.pdf", "https://www.lagus.mv-regierung.de/serviceassistent/download?id=1682724", 200, undefined,
    { pdfTech: "encrypted", readiness: "blocked", blockers: ["bundled file is encrypted; pdf-lib cannot load it — live fill likely fails", "do not decrypt"] }),
  eg("ni", "elterngeld-niedersachsen-2025.pdf", "https://www.ms.niedersachsen.de/download/205792/Antrag_auf_Elterngeld_gueltig_fuer_Geburten_ab_dem_01.04.2025.pdf", 200, 531),
  eg("nw", undefined, undefined, undefined, undefined, { blockers: ["ELFE online procedure; guide + link only"] }),
  eg("rp", "elterngeld-rheinland-pfalz-2025.pdf", "https://mffki.rlp.de/fileadmin/07/Dokumente/Themen/Familie/Gute_Zukunft_fuer_alle_Kinder_und_Eltern/Elterngeld/2025_08_1_Einheitlicher_Elterngeldantrag.pdf", 200, 531,
    { blockers: [SHARED_531, "rights unknown"] }),
  eg("sl", undefined, undefined, undefined, undefined),
  eg("sn", undefined, undefined, undefined, undefined, { blockers: ["Amt24 online procedure; guide + link only"] }),
  eg("st", "elterngeld-sachsen-anhalt-2025.pdf", "https://lvwa.sachsen-anhalt.de/fileadmin/Bibliothek/Politik_und_Verwaltung/LVWA/LVwA/Dokumente/5_famgesjugvers/502/Dateien_502.a/Elterngeld/Antrag_Elterngeld_0825.pdf", 200, 530),
  eg("sh", "elterngeld-schleswig-holstein-2025.pdf", "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/1_EinheitlicherElterngeldantrag.pdf?__blob=publicationFile&v=3", 200, 531,
    { blockers: [SHARED_531, "rights unknown"] }),
  eg("th", "elterngeld-thueringen-2025.pdf", "https://thformular.thueringen.de/thueform/cfs/eject/gen?MANDANTID=18&FORMUID=BEEG-071-DE-FL", 200, 657),
];

const BG_ANLAGEN: [string, number][] = [
  ["ek", 68], ["eks", 358], ["hg", 22], ["kdu", 77], ["ki", 63], ["meb", 38],
  ["sv", 14], ["uh1", 41], ["ve", 15], ["vm", 196], ["wep", 104],
];

export const PDF_FILL_FORMS: InventoryEntry[] = ([
  {
    id: "kindergeld-kg1", name: "Kindergeld KG1 + Anlage Kind", category: "Porodica", kind: "pdf_fill",
    routes: ["/musterformular/kindergeld", "/formulari/kindergeld/muster", "/muster/kindergeld/preview"],
    callers: ["src/lib/pdf-fill-kindergeld.ts", "src/pages/muster/KindergeldMuster.tsx"],
    issuer: "Bundesagentur für Arbeit — Familienkasse", scope: "federal",
    variantSelectors: ["none by state; office by applicant residence + special cases"],
    variants: [
      bundled("kg1", "kg1-antrag-kindergeld-2026.pdf", 95, {
        pdfTech: "acroform_with_xfa", provenance: "differs_from_official", readiness: "blocked",
        officialUrl: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
        blockers: ["official is XFA + encrypted, change not permitted", "bundled is a modified/decrypted derivative", "see manifests/kindergeld-kg1.ts"],
      }),
      bundled("kg1-ank", "kg1-anlage-kind-2026.pdf", 0, {
        pdfTech: "not_pdf", provenance: "differs_from_official", readiness: "blocked",
        officialUrl: "https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf",
        blockers: ["bundled file is 9 bytes 'not found' — broken"],
      }),
    ],
    outputMethod: "filled_pdf_download", authorityRouting: "authority-routing.ts",
    annexes: ["Anlage Kind (per child)"], signaturesRequired: "yes", rights: "unknown",
    tests: ["src/lib/formularpilot/manifests/kindergeld-kg1.test.ts"], acceptance: [...STD_ACCEPT, "non-XFA authentic source or guide-only fallback"],
  },
  {
    id: "elterngeld", name: "Elterngeld Antrag", category: "Porodica", kind: "pdf_fill",
    routes: ["/musterformular/elterngeld"],
    callers: ["src/lib/pdf-fill-elterngeld.ts", "src/pages/muster/ElterngeldMuster.tsx", "src/lib/elterngeld-bundeslaender.ts"],
    issuer: "State Elterngeldstellen (per Bundesland)", scope: "state",
    variantSelectors: ["child's residence Bundesland", "child's birth date (edition)"],
    variants: ELTERNGELD_VARIANTS,
    outputMethod: "filled_pdf_download", mappingCoverage: "32 fields mapped (Bayern-derived names)",
    authorityRouting: "authority-routing.ts", annexes: ["Anlage EG+/Partnerschaftsbonus (state-specific)", "Geburtsurkunde", "Einkommensnachweise"],
    signaturesRequired: "yes", rights: "unknown",
    tests: ["src/lib/formularpilot/manifests/elterngeld-pilot.test.ts", "src/lib/formularpilot/jurisdiction.test.ts"],
    acceptance: [...STD_ACCEPT, "one verified variant per state AND per birth-date edition"],
  },
  {
    id: "buergergeld-hauptantrag", name: "Bürgergeld Hauptantrag", category: "Bürgergeld", kind: "pdf_fill",
    routes: ["/musterformular/buergergeld"], callers: ["src/lib/pdf-fill-buergergeld.ts", "src/pages/muster/BuergergeldMuster.tsx"],
    issuer: "Bundesagentur für Arbeit / Jobcenter", scope: "district_or_municipal",
    variantSelectors: ["Jobcenter by residence", "Stand/version"],
    variants: [bundled("hauptantrag", "buergergeld-hauptantrag-2026.pdf", 116)],
    outputMethod: "filled_pdf_download", authorityRouting: "not_modelled",
    annexes: BG_ANLAGEN.map(([c]) => `Anlage ${c.toUpperCase()}`), signaturesRequired: "yes", rights: "unknown",
    tests: [], acceptance: [...STD_ACCEPT, "Jobcenter locator link instead of address"],
  },
  {
    id: "buergergeld-anlagen", name: "Bürgergeld Anlagen (11)", category: "Bürgergeld", kind: "pdf_fill",
    routes: ["/musterformular/buergergeld"], callers: ["src/lib/pdf-fill-buergergeld-anlagen.ts"],
    issuer: "Bundesagentur für Arbeit / Jobcenter", scope: "district_or_municipal",
    variantSelectors: ["household situation decides which Anlagen"],
    variants: BG_ANLAGEN.map(([c, n]) => bundled(`anlage-${c}`, `bg-anlage-${c}-2026.pdf`, n)),
    outputMethod: "filled_pdf_download", mappingCoverage: "header fields only (name/BG-Nummer)",
    authorityRouting: "not_modelled", annexes: [], signaturesRequired: "yes", rights: "unknown",
    tests: [], acceptance: STD_ACCEPT,
  },
  ...([
    ["kinderzuschlag", "Kinderzuschlag KiZ1", "Porodica", "/musterformular/kinderzuschlag", "pdf-fill-kinderzuschlag.ts", "KinderzuschlagMuster.tsx", "Bundesagentur für Arbeit — Familienkasse", "federal", "kiz1-antrag-2026.pdf", 74],
    ["mutterschaftsgeld", "Mutterschaftsgeld (BAS)", "Porodica", "/musterformular/mutterschaftsgeld", "pdf-fill-mutterschaftsgeld.ts", "MutterschaftsgeldMuster.tsx", "Bundesamt für Soziale Sicherung", "agency", "mutterschaftsgeld-bas-2026.pdf", 129],
    ["bafoeg", "BAföG Formblatt 1", "Obrazovanje", "/musterformular/bafoeg", "pdf-fill-bafoeg.ts", "BafoegMuster.tsx", "Amt für Ausbildungsförderung", "district_or_municipal", "bafoeg-formblatt-01-2025.pdf", 213],
    ["integrationskurs", "Integrationskurs BAMF 630.007", "Integracija", "/musterformular/integrationskurs", "pdf-fill-integrationskurs.ts", "IntegrationskursMuster.tsx", "BAMF", "agency", "integrationskurs-bamf-630007.pdf", 28],
    ["ezb", "Erklärung zum Beschäftigungsverhältnis", "Vize", "visa forms (VisaWorkForm1/2, VisaBluecardForm)", "pdf-fill-ezb.ts", "../components/formulare/muster/VisaWorkForm2.tsx", "Bundesagentur für Arbeit", "federal", "ezb-ba047549.pdf", 69],
  ] as const).map(([id, name, cat, route, lib, page, issuer, scope, file, n]): InventoryEntry => ({
    id, name, category: cat, kind: "pdf_fill", routes: [route],
    callers: [`src/lib/${lib}`, `src/pages/muster/${page}`], issuer, scope,
    variantSelectors: ["Stand/version"], variants: [bundled(id, file, n)],
    outputMethod: "filled_pdf_download", authorityRouting: "not_modelled", annexes: [],
    signaturesRequired: "yes", rights: "unknown", tests: [], acceptance: STD_ACCEPT,
  })),
] satisfies InventoryEntry[] as InventoryEntry[]).map((e): InventoryEntry => {
  if (e.id === "integrationskurs") return {
    ...e,
    callers: [...e.callers, "src/lib/formularpilot/forms/integrationskurs-630007.ts (dev pipeline, not wired)"],
    mappingCoverage: "28/28 native fields mapped in dev pipeline; legacy live mapping 12 fields, no status box, writes page-2 date without exemption",
    annexes: ["copy of ID/residence document", "page 2 proofs only when cost exemption requested"],
    tests: ["src/lib/formularpilot/forms/integrationskurs-630007.test.ts"],
    variants: e.variants.map((v) => ({
      ...v, officialUrl: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kursteilnehmer/AntraegeAlle/630-007_antrag-zulassung-integrationskurs-ausl_pdf.html?nn=453250",
      readiness: "blocked" as const,
      blockers: [
        "bundled edition 630.007w 01/2026 superseded by 630.007x 07/2026 (BAMF page dated 22.07.2026)",
        "07/2026 PDF not retrievable on 2026-10-26 (404/timeout) — hash/fields unknown",
        "official BAMF page now offers only the Bundesportal online application (no PDF link)",
        "BAMF office: user must use official BAMF-NAvI Behörden finder; no address verified",
        "rights unknown",
      ],
    })),
  };
  if (e.id === "mutterschaftsgeld") return {
    ...e,
    callers: [...e.callers, "src/lib/formularpilot/manifests/mutterschaftsgeld-bas.ts"],
    variants: e.variants.map((v) => ({
      ...v, provenance: "differs_from_official" as const,
      officialUrl: "https://www.bundesamtsozialesicherung.de/fileadmin/redaktion/Mutterschaftsgeld/2026_Antragsformular.pdf",
      officialUrlCheck: { status: 200, checkedAt: CHECKED },
      blockers: ["same fields/text as official but bytes differ (re-saved)", "rights unknown", "no golden test yet"],
    })),
  };
  if (e.id === "kinderzuschlag") return {
    ...e,
    callers: [...e.callers, "src/lib/formularpilot/manifests/kinderzuschlag-kiz1.ts"],
    variants: e.variants.map((v) => ({
      ...v, pdfTech: "acroform_with_xfa" as const, provenance: "differs_from_official" as const, readiness: "blocked" as const,
      officialUrl: "https://www.arbeitsagentur.de/datei/kiz1-antrag_ba036540.pdf",
      officialUrlCheck: { status: 200, checkedAt: CHECKED },
      blockers: ["official is XFA + encrypted, change not permitted", "bundled is a modified derivative (hash differs)", "see manifests/kinderzuschlag-kiz1.ts",
        "lawful fallback built: non-official answer sheet (forms/kinderzuschlag-answer-sheet.ts), not wired"],
    })),
  };
  return e;
});

/** Interactive Musterformular pages that print a simulation (no official PDF). */
export const PRINT_SIMULATION_SLUGS = [
  "anlage-bb", "anlage-hg", "anlage-meb", "anlage-se", "anlage-sv", "anlage-uf", "anlage-uh1", "anlage-uh2",
  "anlage-uh3", "anlage-ve", "anmeldung", "antrag-generic", "antragsruecknahme", "arbeitsbescheinigung",
  "arbeitslosengeld", "aufenthaltstitel", "einbuergerung", "fuehrungszeugnis", "grundsicherung",
  "kirchenaustritt", "krippengeld-bayern", "nationalvisum", "nichterreichbarkeit", "niederlassungserlaubnis",
  "schueler-bafoeg", "steuerklasse", "verpflichtungserklaerung", "wirtschaftliche-jugendhilfe", "wohngeld",
] as const;

/** Catalog slugs (form-catalog.ts) without own Musterformular route or fill module. */
export const PLANNED_OR_LINK_ONLY_SLUGS = [
  "steuer-id", "fuehrerschein", "fahrzeugzulassung", "weiterbewilligung", "anlage-kdu", "anlage-ek",
  "anlage-eks", "anlage-vm", "anlage-wep", "anlage-ki", "krankenkasse", "anerkennung-navigator",
  "steuerklassenwechsel",
] as const;

/** Prioritised next batch for golden tests (federal, AcroForm, single edition, no state split). */
export const NEXT_GOLDEN_BATCH = [
  { id: "integrationskurs", why: "dev pipeline + Unicode font done; blocked until BAMF publishes 07/2026 PDF" },
  { id: "mutterschaftsgeld", why: "federal BAS, AcroForm 129 fields; authenticity not yet checked" },
  { id: "elterngeld-by-05-2025", why: "authentic official 05/2025 already hash-pinned in elterngeld-pilot.ts; 32 mapped names exist" },
] as const;
