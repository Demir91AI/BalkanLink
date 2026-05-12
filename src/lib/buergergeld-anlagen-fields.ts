/**
 * Bürgergeld Anlage PDFs — header (Antragsteller) field mapping.
 *
 * Svih 11 Anlagen (EK, EKS, HG, KDU, KI, MEB, SV, UH1, VE, VM, WEP) dijele isti
 * `txtfPersonVorname` / `txtfPersonNachname` / `datePersonGebDatum` / `txtfBGNr`
 * header. Wizard popunjava te 4 zajedničke stavke za svaku Anlage. Detaljna
 * polja (npr. dijete u KI, kirija u KDU, kfz u VM) imaju zasebne mappere ispod
 * — popunjavamo samo ono za što već imamo wizard data, ostalo korisnik upisuje
 * ručno u službenom PDF readeru.
 */
import { type FieldFill } from "@/lib/pdf-form-engine";

export type AnlageCode = "ek" | "eks" | "hg" | "kdu" | "ki" | "meb" | "sv" | "uh1" | "ve" | "vm" | "wep";

export interface AnlageBaseData {
  // Antragsteller (svuda)
  vorname: string;
  familienname: string;
  geburtsdatum: string; // ISO
  bgNr?: string;
  // Anschrift (KDU+)
  strasse?: string;
  plz?: string;
  ort?: string;
  // KDU
  wohnart?: string; // Mietwohnung | Eigentumswohnung / Haus | ...
  kaltmiete?: string;
  nebenkosten?: string;
  heizkosten?: string;
  // KI — prvo dijete iz BG
  kindVorname?: string;
  kindNachname?: string;
  kindGeburtsdatum?: string;
  // VM — prvi KFZ
  kfzMarke?: string;
  kfzBaujahr?: string;
  kfzWert?: string;
  // EK — arbeitgeber prvog
  arbeitgeber?: string;
}

const isoToDe = (iso?: string): string => {
  if (!iso) return "";
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
};

const splitStrasse = (input?: string): [string, string] => {
  const t = (input ?? "").trim();
  if (!t) return ["", ""];
  const m = t.match(/^(.+?)\s+(\d+\s*[a-zA-Z]?)$/);
  return m ? [m[1].trim(), m[2].trim()] : [t, ""];
};

export function buildAnlageFieldFills(code: AnlageCode, d: AnlageBaseData): FieldFill[] {
  const out: FieldFill[] = [];
  const text = (name: string, value: string) => {
    if (value && value.trim()) out.push({ name, type: "text", value });
  };
  const check = (name: string, on: boolean) => {
    if (on) out.push({ name, type: "check" });
  };

  // ===== Universal: Antragsteller header =====
  // MEB koristi prefiks "Anl" → txtfAnlPersonVorname
  if (code === "meb") {
    text("txtfAnlPersonVorname", d.vorname);
    text("txtfAnlPersonNachname", d.familienname);
  } else {
    text("txtfPersonVorname", d.vorname);
    text("txtfPersonNachname", d.familienname);
  }
  text("datePersonGebDatum", isoToDe(d.geburtsdatum));
  text("txtfBGNr", d.bgNr ?? "");

  // ===== Anlage-specific dodaci =====
  if (code === "kdu") {
    const [str, hnr] = splitStrasse(d.strasse);
    text("txtfPersonStr", str);
    text("txtfPersonHausNr", hnr);
    text("txtfPersonPlz", d.plz ?? "");
    text("txtfPersonOrt", d.ort ?? "");
    // Wohnart
    check("chbxWohnenMiete", (d.wohnart || "").toLowerCase().includes("miet"));
    check("chbxWohnenEigentum", (d.wohnart || "").toLowerCase().includes("eigentum"));
    // Bedarf — Grundmiete + Nebenkosten + Heizkosten
    if (d.kaltmiete) { check("chbxBedarfGrundmiete", true); text("numfBedarfGrundmiete", d.kaltmiete); }
    if (d.nebenkosten) { check("chbxBedarfNebenkosten", true); text("numfBedarfNebenkosten", d.nebenkosten); }
    if (d.heizkosten) { check("chbxBedarfHeizkosten", true); text("numfBedarfHeizkosten", d.heizkosten); }
  }

  if (code === "ki") {
    text("txtfKindVorname", d.kindVorname ?? "");
    text("txtfKindNachname", d.kindNachname ?? "");
    text("dateKindGebDatum", isoToDe(d.kindGeburtsdatum));
  }

  if (code === "vm") {
    text("txtfKfZNameZ1", d.kfzMarke ?? "");
    text("txtfKfZModellZ1", d.kfzMarke ?? "");
    text("dateKfZBaujahrZ1", d.kfzBaujahr ?? "");
    text("numfKfZWertZ1", d.kfzWert ?? "");
  }

  if (code === "ek") {
    text("txtfAGName", d.arbeitgeber ?? "");
  }

  return out;
}
