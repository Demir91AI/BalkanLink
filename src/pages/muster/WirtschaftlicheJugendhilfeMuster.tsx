import { useState, useCallback } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import WirtschaftlicheJugendhilfeGuideContent from "@/components/guides/WirtschaftlicheJugendhilfeGuideContent";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "wijuhi-muster-data";
const PDF_URL = "https://www.gesetze-im-internet.de/sgb_8/";

const HILFEARTEN = [
  { value: "p28", label: "Erziehungsberatung (§ 28)" },
  { value: "p30", label: "Erziehungsbeistand (§ 30)" },
  { value: "p31", label: "Sozialpädagogische Familienhilfe (§ 31)" },
  { value: "p29", label: "Soziale Gruppenarbeit (§ 29)" },
  { value: "p32", label: "Erziehung in einer Tagesgruppe (§ 32)" },
  { value: "p33", label: "Vollzeitpflege — Pflegefamilie (§ 33)" },
  { value: "p34", label: "Heimerziehung (§ 34)" },
  { value: "p35", label: "Intensive sozialpädagogische Einzelbetreuung (§ 35)" },
  { value: "p35a", label: "Eingliederungshilfe seelisch behindert (§ 35a)" },
  { value: "p41", label: "Hilfe für junge Volljährige (§ 41)" },
];

const ANLAGEN = [
  "Kopija lične karte / Aufenthaltstitel podnositelja",
  "Kopija lične karte / Aufenthaltstitel djeteta",
  "Geburtsurkunde djeteta (internacionalna)",
  "Sorgerechtsbeschluss (kod razvoda)",
  "Lohnabrechnung zadnja 3 mjeseca",
  "Mietvertrag",
  "Schulzeugnisse (zadnje 1–2 godine)",
  "Pisana izjava razrednika",
  "Pisana preporuka ljekara/psihologa/terapeuta",
  "Kindergeld-Bescheid",
];

const initial = () => ({
  // Antragsteller
  aFamilienname: "Kovač",
  aVorname: "Maja",
  aGeburtsdatum: "1988-03-14",
  aGeburtsort: "Bihać, Bosnien und Herzegowina",
  aStaatsangehoerigkeit: "bosanskohercegovačko",
  aAufenthaltstitel: "Niederlassungserlaubnis (§ 9 AufenthG)",
  aStrasse: "Rosenheimer Str. 12",
  aPlz: "81669",
  aWohnort: "München",
  aTelefon: "+49 152 12345678",
  aEmail: "maja.kovac@example.com",
  aFamilienstand: "razvedena (od 2022)",
  aBeruf: "medicinska sestra (Teilzeit, 25h/sedmica)",
  aEinkommen: "1.850 €",

  // Personensorge
  sorge: "alleinige" as "alleinige" | "gemeinsame" | "drugo",
  sorgeBeschluss: "Familiengericht München, 18.06.2022, Az. 543 F 2341/22",
  sorgeDrugo: "",

  // Jugendamt
  jaName: "Stadt München",
  jaAbteilung: "Sozialreferat – Stadtjugendamt, Bezirkssozialarbeit Au-Haidhausen",
  jaStrasse: "Sankt-Martin-Straße 53",
  jaPlz: "81669",
  jaOrt: "München",

  // Dijete
  kFamilienname: "Kovač",
  kVorname: "Adis",
  kGeburtsdatum: "2011-09-22",
  kGeburtsort: "München, Deutschland",
  kStaat: "bosanskohercegovačko",
  kAufenthalt: "Niederlassungserlaubnis (§ 35 AufenthG)",
  kAdresse: "Rosenheimer Str. 12, 81669 München (kod majke)",
  kSchule: "Mittelschule an der Wörthstraße, 8. razred",
  kKv: "AOK Bayern (kod majke)",

  // Drugi roditelj
  dFamilienname: "Novak",
  dVorname: "Damir",
  dGeburtsdatum: "1983-11-02",
  dAdresse: "Hochstr. 45, 81669 München",
  dTelefon: "+49 176 87654321",
  dSorge: "nema Personensorge, ima Umgangsrecht (svaki drugi vikend)",
  dUnterhalt: "da, 420 € mjesečno (Düsseldorfer Tabelle)",

  // Hilfeart
  hilfearten: ["p30"] as string[],
  hilfeartDrugo: "",
  umfang: "ambulantna podrška, 4–6 sati sedmično, prvobitno 6 mjeseci",

  // Begründung
  begruendung:
    "Moj sin Adis (14) posljednjih 8 mjeseci pokazuje sve veće probleme u školi i kod kuće:\n\n• U školi: 23 izostanka bez opravdanja, ocjene pale sa prosjeka 2,8 na 4,1, dvije suspenzije zbog tučnjava.\n\n• Kod kuće: povučenost, eksplozivnost, tri puta prespavao kod nepoznatih prijatelja bez najave, pronađene cigarete u martu 2026.\n\n• Porodična situacija: razvod 2022. Otac viđa Adisa svaki drugi vikend, ali tokom posjeta često dolazi do svađa između mene i bivšeg muža. Nova veza oca u februaru 2026. dodatno uznemirila Adisa.\n\n• Već poduzeto: u decembru 2025. dva puta privatno kod psihologa (preporuka pedijatra). Psiholog je preporučio strukturisanu pedagošku podršku 1-na-1.\n\n• Cilj: muški pedagoški uzor (Erziehungsbeistand) sa kojim Adis može razgovarati otvoreno, koji ga može voditi kroz strukturisane aktivnosti i pomoći mu da uspostavi rutinu u školi. Adis je pristao na ideju.",

  // Anlagen
  anlagen: ANLAGEN.map(() => true),

  // Saglasnost
  saglasnost: true,

  // Potpis
  ort: "München",
  datum: "2026-04-25",
});

export default function WirtschaftlicheJugendhilfeMuster() {
  const [f, setF] = useState(() => {
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s) return { ...initial(), ...JSON.parse(s) };
    } catch {}
    return initial();
  });

  const set = useCallback((key: string, val: any) => setF(p => ({ ...p, [key]: val })), []);
  const toggleHilfe = useCallback(
    (v: string) =>
      setF(p => ({
        ...p,
        hilfearten: p.hilfearten.includes(v) ? p.hilfearten.filter((x: string) => x !== v) : [...p.hilfearten, v],
      })),
    [],
  );
  const toggleAnlage = useCallback(
    (i: number) =>
      setF(p => {
        const a = [...p.anlagen];
        a[i] = !a[i];
        return { ...p, anlagen: a };
      }),
    [],
  );

  return (
    <>
    <MusterFormBase
      rootId="wijuhi-root"
      title="Antrag auf Hilfe zur Erziehung"
      subtitle="Musterformular nach § 27 SGB VIII — BalkanLink — nur zur Orientierung"
      pdfUrl={PDF_URL}
      pdfLabel="Pravni osnov: SGB VIII (gesetze-im-internet.de) →"
      footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim zuständigen Jugendamt einreichen • BalkanLink ist keine staatliche Stelle • Stand 2026"
      lsKey={LS_KEY}
      formularId="wirtschaftliche-jugendhilfe"
      data={f}
      onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))}
      onReset={() => {
        localStorage.removeItem(LS_KEY);
        setF(initial());
      }}
    >
      <MusterDisclaimer formKey="wirtschaftliche-jugendhilfe"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFFBEB", border: "2px solid #F59E0B", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>🏛️ Wirtschaftliche Jugendhilfe se inicira RAZGOVOROM u Jugendamt-u</div>
        <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55 }}>Finansijska pomoć za odgoj djeteta (SGB VIII, §§ 27 ff.) ne podnosi se putem standardnog PDF formulara — inicijalni korak je razgovor s referentom u Jugendamt-u koji procjenjuje situaciju i otvara postupak. Ovaj vodič objašnjava koja prava postoje i šta referent traži.</div>
      </div>
      {/* Adresa Jugendamt-a */}
      <div style={S.sec}>
        <SecHeader num={0} title="An das zuständige Jugendamt" />
        <div style={S.row}>
          <Field label="Stadt / Landkreis" flex={2} value={f.jaName} onChange={v => set("jaName", v)} />
          <Field label="Abteilung" flex={3} value={f.jaAbteilung} onChange={v => set("jaAbteilung", v)} />
        </div>
        <div style={S.row}>
          <Field label="Straße, Hausnummer" flex={2} value={f.jaStrasse} onChange={v => set("jaStrasse", v)} />
          <Field label="PLZ" width={80} value={f.jaPlz} onChange={v => set("jaPlz", v)} />
          <Field label="Ort" flex={1} value={f.jaOrt} onChange={v => set("jaOrt", v)} />
        </div>
      </div>

      {/* SEKCIJA 1 — Antragsteller */}
      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur antragstellenden Person (Personensorgeberechtigte/r)" />
        <div style={S.row}>
          <Field label="Familienname" flex={2} value={f.aFamilienname} onChange={v => set("aFamilienname", v)} />
          <Field label="Vorname" flex={2} value={f.aVorname} onChange={v => set("aVorname", v)} />
          <Field label="Geburtsdatum" type="date" value={f.aGeburtsdatum} onChange={v => set("aGeburtsdatum", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsort" flex={2} value={f.aGeburtsort} onChange={v => set("aGeburtsort", v)} />
          <Field label="Staatsangehörigkeit" flex={1} value={f.aStaatsangehoerigkeit} onChange={v => set("aStaatsangehoerigkeit", v)} />
          <Field label="Aufenthaltstitel (falls relevant)" flex={2} value={f.aAufenthaltstitel} onChange={v => set("aAufenthaltstitel", v)} />
        </div>
        <div style={S.row}>
          <Field label="Anschrift (Straße, Hausnummer)" flex={2} value={f.aStrasse} onChange={v => set("aStrasse", v)} />
          <Field label="PLZ" width={80} value={f.aPlz} onChange={v => set("aPlz", v)} />
          <Field label="Wohnort" flex={1} value={f.aWohnort} onChange={v => set("aWohnort", v)} />
        </div>
        <div style={S.row}>
          <Field label="Telefon" flex={1} value={f.aTelefon} onChange={v => set("aTelefon", v)} />
          <Field label="E-Mail" flex={1} value={f.aEmail} onChange={v => set("aEmail", v)} />
          <Field label="Familienstand" flex={1} value={f.aFamilienstand} onChange={v => set("aFamilienstand", v)} />
        </div>
        <div style={S.row}>
          <Field label="Beruf / Beschäftigung" flex={2} value={f.aBeruf} onChange={v => set("aBeruf", v)} />
          <Field label="Monatliches Nettoeinkommen" flex={1} value={f.aEinkommen} onChange={v => set("aEinkommen", v)} />
        </div>
      </div>

      {/* SEKCIJA 2 — Personensorge */}
      <div style={S.sec}>
        <SecHeader num={2} title="Personensorge (pravo roditeljske brige)" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={S.chk}>
            <input
              type="radio"
              name="sorge"
              checked={f.sorge === "alleinige"}
              onChange={() => set("sorge", "alleinige")}
            />
            Imam isključivo pravo brige (alleinige Personensorge)
          </label>
          <label style={S.chk}>
            <input
              type="radio"
              name="sorge"
              checked={f.sorge === "gemeinsame"}
              onChange={() => set("sorge", "gemeinsame")}
            />
            Imamo zajedničko pravo brige (gemeinsame Personensorge)
          </label>
          <label style={S.chk}>
            <input type="radio" name="sorge" checked={f.sorge === "drugo"} onChange={() => set("sorge", "drugo")} />
            Drugo:
          </label>
        </div>
        {f.sorge === "alleinige" && (
          <div style={{ marginTop: 8 }}>
            <Field
              label="Beschluss Familiengericht (Datum, Aktenzeichen)"
              value={f.sorgeBeschluss}
              onChange={v => set("sorgeBeschluss", v)}
            />
          </div>
        )}
        {f.sorge === "drugo" && (
          <div style={{ marginTop: 8 }}>
            <Field label="Obrazloženje" value={f.sorgeDrugo} onChange={v => set("sorgeDrugo", v)} />
          </div>
        )}
      </div>

      {/* SEKCIJA 3 — Dijete */}
      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zum Kind / Jugendlichen" />
        <div style={S.row}>
          <Field label="Familienname" flex={2} value={f.kFamilienname} onChange={v => set("kFamilienname", v)} />
          <Field label="Vorname" flex={2} value={f.kVorname} onChange={v => set("kVorname", v)} />
          <Field label="Geburtsdatum" type="date" value={f.kGeburtsdatum} onChange={v => set("kGeburtsdatum", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsort" flex={2} value={f.kGeburtsort} onChange={v => set("kGeburtsort", v)} />
          <Field label="Staatsangehörigkeit" flex={1} value={f.kStaat} onChange={v => set("kStaat", v)} />
          <Field label="Aufenthaltstitel" flex={2} value={f.kAufenthalt} onChange={v => set("kAufenthalt", v)} />
        </div>
        <div style={S.row}>
          <Field label="Adresse" flex={1} value={f.kAdresse} onChange={v => set("kAdresse", v)} />
        </div>
        <div style={S.row}>
          <Field label="Schule / Kita" flex={2} value={f.kSchule} onChange={v => set("kSchule", v)} />
          <Field label="Krankenversicherung" flex={1} value={f.kKv} onChange={v => set("kKv", v)} />
        </div>
      </div>

      {/* SEKCIJA 4 — Drugi roditelj */}
      <div style={S.sec}>
        <SecHeader num={4} title="Angaben zum anderen Elternteil" />
        <div style={S.row}>
          <Field label="Familienname" flex={2} value={f.dFamilienname} onChange={v => set("dFamilienname", v)} />
          <Field label="Vorname" flex={2} value={f.dVorname} onChange={v => set("dVorname", v)} />
          <Field label="Geburtsdatum" type="date" value={f.dGeburtsdatum} onChange={v => set("dGeburtsdatum", v)} />
        </div>
        <div style={S.row}>
          <Field label="Adresse" flex={2} value={f.dAdresse} onChange={v => set("dAdresse", v)} />
          <Field label="Telefon" flex={1} value={f.dTelefon} onChange={v => set("dTelefon", v)} />
        </div>
        <div style={S.row}>
          <Field label="Sorgerecht / Umgangsrecht" flex={1} value={f.dSorge} onChange={v => set("dSorge", v)} />
        </div>
        <div style={S.row}>
          <Field label="Unterhaltszahlungen" flex={1} value={f.dUnterhalt} onChange={v => set("dUnterhalt", v)} />
        </div>
      </div>

      {/* SEKCIJA 5 — Hilfeart */}
      <div style={S.sec}>
        <SecHeader num={5} title="Tip pomoći koji se traži (Hilfeart)" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
          {HILFEARTEN.map(h => (
            <label key={h.value} style={S.chk}>
              <input
                type="checkbox"
                checked={f.hilfearten.includes(h.value)}
                onChange={() => toggleHilfe(h.value)}
              />
              {h.label}
            </label>
          ))}
        </div>
        <div style={S.row}>
          <Field
            label="Drugo (specificirati)"
            flex={1}
            value={f.hilfeartDrugo}
            onChange={v => set("hilfeartDrugo", v)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={S.lbl}>Predloženi obim (Umfang)</div>
          <input style={S.inp} value={f.umfang} onChange={e => set("umfang", e.target.value)} />
        </div>
      </div>

      {/* SEKCIJA 6 — Begründung */}
      <div style={S.sec}>
        <SecHeader num={6} title="Detaljno obrazloženje zahtjeva (Begründung)" />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280", margin: "0 0 8px" }}>
          Opišite konkretno: situaciju u školi, situaciju kod kuće, porodičnu situaciju, već poduzete korake i cilj
          mjere. Iskreno i konkretno — bez umanjivanja ili preuveličavanja.
        </p>
        <textarea
          style={{ ...S.inp, minHeight: 220, fontFamily: "inherit", lineHeight: 1.5, padding: 8 }}
          value={f.begruendung}
          onChange={e => set("begruendung", e.target.value)}
        />
      </div>

      {/* SEKCIJA 7 — Anlagen */}
      <div style={S.sec}>
        <SecHeader num={7} title="Prilozi (Anlagen)" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {ANLAGEN.map((label, i) => (
            <label key={i} style={S.chk}>
              <input type="checkbox" checked={!!f.anlagen[i]} onChange={() => toggleAnlage(i)} />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* SEKCIJA 8 — Saglasnost */}
      <div style={S.sec}>
        <SecHeader num={8} title="Saglasnost (Einverständniserklärung)" />
        <ul style={{ fontSize: 10, lineHeight: 1.6, paddingLeft: 16, margin: "0 0 8px" }}>
          <li>Da Jugendamt prikupi potrebne informacije od škole, ljekara i drugih relevantnih institucija</li>
          <li>Da se moji lični podaci obrađuju u skladu sa Art. 6 Abs. 1c DS-GVO i §§ 67a ff. SGB X</li>
          <li>Da sam upoznat/a sa § 91 SGB VIII (mogućnost provjere doprinosa troškovima)</li>
          <li>Da me Jugendamt obavijesti o pravima po DS-GVO (Auskunft, Berichtigung, Löschung)</li>
          <li>Da je ovo dobrovoljni zahtjev i da je moja saradnja bitna za uspjeh mjere</li>
        </ul>
        <label style={{ ...S.chk, fontWeight: 600 }}>
          <input
            type="checkbox"
            checked={f.saglasnost}
            onChange={() => set("saglasnost", !f.saglasnost)}
          />
          Saglasan/a sam sa svim navedenim
        </label>
      </div>

      {/* SEKCIJA 9 — Potpis */}
      <div style={S.sec}>
        <SecHeader num={9} title="Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>
          Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind. Potpis djeteta od 15. godine života je
          obavezan; mlađi u pravilu također potpisuju ako su sposobni razumjeti zahtjev.
        </p>
        <div style={S.row}>
          <Field label="Ort" value={f.ort} onChange={v => set("ort", v)} />
          <Field label="Datum" type="date" value={f.datum} onChange={v => set("datum", v)} />
        </div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Signature label="Unterschrift antragstellende Person" />
          <Signature label="Unterschrift des Kindes / Jugendlichen (ab 15 J. obavezno)" />
        </div>
      </div>
    </MusterFormBase>
  );
}
