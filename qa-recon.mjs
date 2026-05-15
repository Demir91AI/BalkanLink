import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

// Stub fetch for font loader (Node)
globalThis.fetch = async (url) => {
  const p = path.join("public", url.replace(/^\//, ""));
  const buf = fs.readFileSync(p);
  return { ok: true, status: 200, arrayBuffer: async () => buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) };
};

const { buildAufenthaltstitelPdf } = await import("./src/lib/pdf-recon/forms/aufenthaltstitel.ts");
const { buildEzbPdf } = await import("./src/lib/pdf-recon/forms/ezb.ts");

const profile = {
  familienname: "Kovačević", geburtsname: "Hadžić", vornamen: "Šejla Đorđe",
  geburtsdatum: "12.03.1992", geburtsort: "Sarajevo", geburtsland: "Bosnien und Herzegowina",
  staatsangehoerigkeit: "bosnisch-herzegowinisch", geschlecht: "weiblich", familienstand: "ledig",
  passNr: "BA1234567", passAusgestellt: "01.06.2023", passGueltigBis: "31.05.2033", passBehoerde: "MUP BiH Sarajevo",
  strasse: "Münchener Straße 12", plz: "10825", ort: "Berlin",
  telefon: "+49 170 1234567", email: "sejla.kovacevic@example.de",
};

const a = await buildAufenthaltstitelPdf({
  profile, zweck: "Beschäftigung (§ 18 AufenthG) — Westbalkan",
  einreiseDatum: "15.01.2026", arbeitgeber: "Bauunion GmbH",
  vorabzustimmungAA: "BA-12345678", krankenversicherung: "TK Berlin",
  bemerkungen: "Westbalkan-Regelung; Vorabzustimmung liegt vor.",
});
fs.writeFileSync("/tmp/recon-aufenth.pdf", a);

const b = await buildEzbPdf({
  profile,
  agName: "Bauunion GmbH", agAdresse: "Industriestr. 4, 12057 Berlin",
  agAnsprechpartner: "Klaus Müller", agTelefon: "+49 30 555 1234", agEmail: "k.mueller@bauunion.de",
  branche: "Bauwesen", betriebsgroesse: "47",
  taetigkeit: "Maurerin / Bauhelferin", arbeitsort: "Berlin (versch. Baustellen)",
  vertragsbeginn: "01.02.2026", vertragsende: "—", befristet: "nein",
  wochenstunden: "40", schichtarbeit: "nein",
  bruttoMonat: "2.500", bruttoStunde: "14,42",
  urlaubstage: "24", tarifvertrag: "kein",
  ortDatum: "Berlin, 20.01.2026",
});
fs.writeFileSync("/tmp/recon-ezb.pdf", b);
console.log("OK", a.length, b.length);
