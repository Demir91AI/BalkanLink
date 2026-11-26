/** Official federal directory inspected 26.11.2026. Directory-linked ≠ Land page or PDF verified.
 * A safe official route is available for all 16 Länder; no new PDF editions are admitted.
 * No residence inference, eligibility decisions, form hosting, network or answer persistence.
 */
import { EG_LAND_SOURCES, EG_MIN_BIRTH, type EgLand } from "./elterngeld-shared-2025";
import { isoDateValid } from "../engine/strict-acroform";
export const ELTERNGELD_DIRECTORY = "https://familienportal.de/familienportal/rechner-antraege/antragsformulare-126232";
export const ELTERNGELD_OFFICE_LOOKUP = "https://familienportal.de/dynamic/action/familienportal/125008/suche";
export const ELTERNGELD_APPLICATION_GUIDANCE = "https://familienportal.de/familienportal/familienleistungen/elterngeld/faq/wie-kann-ich-elterngeld-beantragen--124762";
export const ELTERNGELD_STATE_ROUTES = {
  BW: "https://www.l-bank.de/produkte/familienfoerderung/elterngeld.html",
  BY: "https://www.zbfs.bayern.de/familie/elterngeld/antraege/index.php",
  BE: "http://www.berlin.de/sen/jugend/familie-und-kinder/finanzielle-leistungen/elterngeld-und-elternzeit/",
  BB: "https://service.brandenburg.de/service/de/verwaltungsleistungen/leistungen-suchen/?bus_id=100036807&bus_type=pst&bus_searchWord=elterngeld&bus_lng=de_DE",
  HB: "https://www.service.bremen.de/sixcms/detail.php?gsid=bremen128.c.9168.de&asl=bremen02.c.730.de",
  HH: "https://www.hamburg.de/service/info/11981756/n0/",
  HE: "https://www.familienatlas.de/themen/geld/finanzielle-hilfen/elterngeld",
  MV: "http://www.lagus.mv-regierung.de/Soziales/Elterngeld_ElterngeldPlus/",
  NI: "https://www.ms.niedersachsen.de/startseite/jugend_amp_familie/familien_kinder_und_jugendliche/familien/elterngeld_elterngeld_plus/das-elterngeld-13791.html",
  NW: "https://familienportal.nrw/elterngeld",
  RP: "https://mffki.rlp.de/themen/familie/gute-zukunft-fuer-alle-kinder-und-eltern/finanzielle-leistungen/elterngeld",
  SL: "https://service.buergerdienste-saar.de/Elterngeld-Onlineantrag/",
  SN: "https://amt24.sachsen.de/zufi/leistungen/6000384",
  ST: "https://ms.sachsen-anhalt.de/themen/familie/familienratgeber/familien-mit-kleinkindern/arbeit-und-finanzen/direkte-hilfen",
  SH: "https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/LASG/Aufgaben/KinderUndEltern/Download/BEEG-Formulare",
  TH: "https://thformular.thueringen.de/buerger/?r=Elterngeld",
} as const;
export type ElterngeldLand = keyof typeof ELTERNGELD_STATE_ROUTES;
export function resolveElterngeldRoute(land: string, birth: string, today: string) {
  if (!Object.prototype.hasOwnProperty.call(ELTERNGELD_STATE_ROUTES, land)) return { ok: false as const, code: "LAND_REQUIRED" as const };
  if (!isoDateValid(birth, today)) return { ok: false as const, code: "INVALID_BIRTH" as const };
  const selected = land as ElterngeldLand;
  const linked = ELTERNGELD_STATE_ROUTES[selected];
  const original = EG_LAND_SOURCES[selected as EgLand];
  return { ok: true as const, land: selected,
    // Do not upgrade unverified HTTP links by guessing. Use the verified HTTPS directory instead.
    officialRoute: linked.startsWith("https://") ? linked : ELTERNGELD_DIRECTORY,
    directory: ELTERNGELD_DIRECTORY, officeLookup: ELTERNGELD_OFFICE_LOOKUP,
    directoryCheckedOn: "2026-11-26", landPageIndependentlyVerified: false as const,
    pdfGeneration: false as const,
    reason: birth < EG_MIN_BIRTH ? "EDITION_UNSUPPORTED" as const
      : original?.status === "verified" ? "MAPPING_INCOMPLETE" as const : "LAND_EDITION_UNSUPPORTED" as const,
  };
}