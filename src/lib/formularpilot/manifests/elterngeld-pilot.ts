/**
 * Elterngeld pilot states — official form editions (Bayern, Baden-Württemberg).
 * Verified 2026-10-26 by downloading from the official pages below (read-only, no decryption).
 * Nothing is "tested": hosting/reuse rights are unconfirmed and no golden fill test exists.
 */
import type { FormEdition } from "../service-coverage";

const ZBFS = "https://www.zbfs.bayern.de/imperia/md/content/zbfs_intranet/produktgruppe_i/formulare/beeg-antrag";
export const ZBFS_ROUTING_URL = "https://www.zbfs.bayern.de/zustaendigkeitenfinder.php";
export const BW_ROUTING_URL = "https://www.service-bw.de/zufi/leistungen/1224";
export const BW_ONLINE_URL =
  "https://www.behoerden-serviceportal.de/onlineantraege/onlineantrag?prozessKey=m6000081.elterngeldantrag3&oeId=L100022.OE.6015220&leistungId=99041006017000";

const common = { verifiedAt: "2026-10-26", status: "needs_review" as const };

/** ZBFS lists paper forms strictly by the child's birth date. Births before 2021-09-01: no form offered. */
export const BAYERN_EDITIONS: FormEdition[] = [
  { ...common, validFrom: "2021-09-01", validUntil: "2024-04-01", versionLabel: "ZBFS 09/2021",
    sourceUrl: `${ZBFS}/202109_antragsunterlagen_gesamt.pdf`, technology: "acroform", fieldCount: 1061,
    sha256: "1d6bc147322a538c14c15dc56e7fe49a050432b38a1bdaa022d4404446f12477" },
  { ...common, validFrom: "2024-04-01", validUntil: "2025-01-01", versionLabel: "ZBFS 04/2024",
    sourceUrl: `${ZBFS}/2024_04_antragsunterlagen_gesamt.pdf`, technology: "acroform", fieldCount: 1058,
    sha256: "0192f7fd5a83d27cfddef1162f5314373065415e1af1906355b5d059a03c5660" },
  { ...common, validFrom: "2025-01-01", validUntil: "2025-04-01", versionLabel: "ZBFS 01/2025",
    sourceUrl: `${ZBFS}/2025_01_antragsunterlagen_gesamt.pdf`, technology: "acroform", fieldCount: 737,
    sha256: "8de18fdb2f5fa605b266e7e47a40984dae251e41fe0f60f66e7387bbf09cba7e" },
  { ...common, validFrom: "2025-04-01", validUntil: "2025-05-01", versionLabel: "ZBFS 04/2025",
    sourceUrl: `${ZBFS}/042025_elterngeldantrag_gesamt.pdf`, technology: "acroform", fieldCount: 737,
    sha256: "38d97717d77b1a38706a16fdc9c36c5bd265ae5c89623ae64ab88165ee6e4c54" },
  { ...common, validFrom: "2025-05-01", versionLabel: "ZBFS 05/2025",
    sourceUrl: `${ZBFS}/052025_elterngeldantrag_gesamt.pdf`, technology: "acroform", fieldCount: 1024,
    sha256: "3ca0389ca824e664c74c9fb0c32a255683db5f8b273469a03424e3b9ed5d1584",
    note: "Bundled public/muster/elterngeld-bayern-2025.pdf has identical field names but a different hash (re-saved with PDF24, 2026-04-29) — not the authentic file. The old registry pdfUrl returns 404." },
];

/**
 * BW: L-Bank. Primary procedure is the online application (service-bw); its output must still be
 * printed, signed by both parents and posted to L-Bank. The paper PDF has NO form fields (flat).
 */
export const BW_EDITIONS: FormEdition[] = [
  { ...common, validFrom: "2025-05-01", versionLabel: "L-Bank Antragsformular (ab 01.05.2025)",
    sourceUrl: "https://www.l-bank.de/download/version/3a88f9e9-e3f6-48a0-8b2b-a3c284331eb9/20250125_antragelterngeld_homepage_12.23_27-01-2025.pdf",
    technology: "flat", fieldCount: 0,
    sha256: "7cafae8da9c017066bbb05234072512baf5792304eace6d7f2cf2109ed7abc5e",
    note: "Link-to-edition mapping on l-bank.de needs human confirmation (file name says 01/2025, list says ab 01.05.2025). Flat PDF: no AcroForm fill possible; guide + official link only." },
];
