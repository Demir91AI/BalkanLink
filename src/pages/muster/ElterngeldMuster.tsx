import { useState, useCallback } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import DownloadFilledPdfButton from "@/components/muster/DownloadFilledPdfButton";
import MusterPrintStyles from "@/components/muster/MusterPrintStyles";

const LS_KEY = "elterngeld-muster-data";
const PDF_URL = "https://familienportal.de/familienportal/rechner-antraege/antragsformulare";

const blankChild = () => ({ nachname: "", vorname: "", gebdatum: "", aktenzeichen: "", behinderung: false });
const blankParent = () => ({
  nachname: "", vorname: "", geburtsname: "", geburtsdatum: "", geschlecht: "",
  strasse: "", plzOrt: "", steuerId: "", beruf: "", telefon: "", email: "",
  kindschaftsverhaeltnis: "", kvSonstiges: "",
  familienstand: "", familienstandSeit: "",
  zusammenlebend: false, alleinerziehend: false,
  kinderImHaushalt: "",
  staatsang: "", staatsangLand: "",
  /* Sekcija 4 */
  wohnsitzTyp: "", wohnsitzSeit: "", auslandVon: "", auslandBis: "",
  erwerbDE: false, erwerbAusland: "", elternzeit: "", elternzeitGrund: "",
  entgeltersatz: "",
  /* Sekcija 5A */
  basisOnly: false, basisVon: "", basisBis: "", basisWeitere: "",
  basisMindest: false, basisAusErwerb: false,
  /* Sekcija 5B */
  egPlus: false, egPlusKombi: false, egPlusMindest: false, egPlusAusErwerb: false,
  /* Sekcija 7 */
  erwerbBezug: "", erwerbBezugSeit: "", erwerbBezugStunden: "",
  berufsbildungEnde: "", tagespflegeKinder: "",
  /* Sekcija 8 */
  betreuung: "", betreuungVon: "", betreuungBis: "",
  /* Sekcija 10 */
  kvArt: "", kvKasse: "", kvMitglied: "", kvTagegeld: "",
  /* Sekcija 11 */
  mutterschutzgeld: "", mutterschutzVon: "", mutterschutzBis: "",
  agZuschuss: "", dienstbezuege: "", beamtenZuschuss: false,
  auslandLeistung: "", auslandBei: "",
  /* Sekcija 12 */
  sonstigeLeistung: "", slVon1: "", slBis1: "", slArt1: "",
  slVon2: "", slBis2: "", slArt2: "",
  slVorGeburt: "", slVorSeit: "", slVorBis: "",
  vergleichbareAusl: "", vergleichbareBei: "",
  /* Sekcija 13 */
  einkommenAngestellt: "", einkommenSelbst: "", selbstArt: "",
  ausklammerung: [] as string[], ausklammerungDatum: "", ausklammerungAktenzeichen: "",
  /* Sekcija 14 */
  agEinverstaendnis: false, agTelefon: "", agAnschrift: "",
  /* Sekcija 15 */
  iban: "", bic: "", kontoinhaber: "", geldinstitut: "",
});

const initial = () => ({
  /* Sekcija 1 */
  kNachname: "", kVorname: "", kGeburtsdatum: "", kGeburtsort: "", kET: "",
  mehrling: "", mehrlingAnzahl: "", mehrlingNamen: "",
  adoptionDatum: "", behinderung: "",
  /* Sekcija 2 */
  e1: blankParent(), e2: blankParent(),
  /* Sekcija 3 */
  einkommensgrenze: "",
  /* Sekcija 5C */
  partnerbonus: false, partnerbonusMonate: "",
  e1PBStunden: "", e2PBStunden: "",
  /* Sekcija 6 */
  alleinerziehendExtra: "", alleinerziehendBonus: false,
  alleinerziehendBonusMonate: "", alleinerziehendStunden: "",
  /* Sekcija 9 */
  weitereKinder: [blankChild(), blankChild(), blankChild()],
  einKindBehinderung: false,
  /* Sekcija 16 */
  anmerkungen: "",
  /* Sekcija 17 */
  sigOrt: "", sigDatum: "",
});

type FormData = ReturnType<typeof initial>;

const InfoBox = ({ children, variant = "blue" }: { children: React.ReactNode; variant?: "blue" | "yellow" }) => {
  const bg = variant === "yellow" ? "#fefce8" : "#eff6ff";
  const border = variant === "yellow" ? "#fde68a" : "#bfdbfe";
  return <div style={{ background: bg, border: `2px solid ${border}`, borderRadius: 12, padding: 14, marginBottom: 14, fontSize: 11, lineHeight: 1.5 }}>{children}</div>;
};

const Radio = ({ name, options, value, onChange }: { name: string; options: string[]; value: string; onChange: (v: string) => void }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    {options.map(o => <label key={o} style={S.chk}><input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} />{o}</label>)}
  </div>
);

const Check = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) => (
  <label style={{ ...S.chk, marginBottom: 4 }}><input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />{label}</label>
);

export default function ElterngeldMuster() {
  const [f, setF] = useState<FormData>(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial();
  });

  const set = useCallback((k: string, v: any) => setF(p => ({ ...p, [k]: v })), []);
  const setE = useCallback((which: "e1" | "e2", k: string, v: any) => setF(p => ({ ...p, [which]: { ...p[which], [k]: v } })), []);
  const setWk = useCallback((i: number, k: string, v: string) => setF(p => {
    const wk = [...p.weitereKinder]; wk[i] = { ...wk[i], [k]: v }; return { ...p, weitereKinder: wk };
  }), []);

  const isAlleinerziehend = f.e1.alleinerziehend;

  const ParentBlock = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which];
    const prefix = `${which}-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num} {num === 1 ? "(in der Regel die Mutter)" : "(Vater oder anderer Elternteil)"}</div>
        <div style={S.row}><Field label="Nachname" value={e.nachname} onChange={v => setE(which, "nachname", v)} /></div>
        <div style={S.row}><Field label="Vorname" value={e.vorname} onChange={v => setE(which, "vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsname (falls abweichend)" value={e.geburtsname} onChange={v => setE(which, "geburtsname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum (tt.mm.jjjj)" type="date" value={e.geburtsdatum} onChange={v => setE(which, "geburtsdatum", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Geschlecht</div>
          <Radio name={prefix + "geschlecht"} options={["weiblich", "männlich", "divers", "offen"]} value={e.geschlecht} onChange={v => setE(which, "geschlecht", v)} />
        </div>
        <div style={S.row}><Field label="Straße / Hausnummer" value={e.strasse} onChange={v => setE(which, "strasse", v)} /></div>
        <div style={S.row}><Field label="PLZ / Wohnort" value={e.plzOrt} onChange={v => setE(which, "plzOrt", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Steuer-Identifikationsnummer</div><IdBoxes count={11} value={e.steuerId} onChange={v => setE(which, "steuerId", v)} /></div>
        <div style={S.row}><Field label="Zuletzt ausgeübter Beruf" value={e.beruf} onChange={v => setE(which, "beruf", v)} /></div>
        <div style={S.row}><Field label="Telefonnummer (freiwillig)" value={e.telefon} onChange={v => setE(which, "telefon", v)} /><Field label="E-Mail (freiwillig)" value={e.email} onChange={v => setE(which, "email", v)} /></div>

        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Kindschaftsverhältnis</div>
          <Radio name={prefix + "kv"} options={["Leibliches Kind", "Sonstiges"]} value={e.kindschaftsverhaeltnis} onChange={v => setE(which, "kindschaftsverhaeltnis", v)} />
          {e.kindschaftsverhaeltnis === "Sonstiges" && <Field label="z.B. Adoptionspflege, Kind des Ehepartners" value={e.kvSonstiges} onChange={v => setE(which, "kvSonstiges", v)} />}
        </div>

        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Familienstand</div>
          <Radio name={prefix + "fam"} options={["Verheiratet", "Ledig", "Unverheiratet zusammenlebend", "Alleinerziehend"]} value={e.familienstand} onChange={v => { setE(which, "familienstand", v); if (which === "e1") setE("e1", "alleinerziehend", v === "Alleinerziehend"); }} />
          {e.familienstand === "Verheiratet" && <Field label="seit" type="date" value={e.familienstandSeit} onChange={v => setE(which, "familienstandSeit", v)} />}
        </div>

        <div style={S.row}><Field label="Gesamtzahl Kinder im Haushalt" value={e.kinderImHaushalt} onChange={v => setE(which, "kinderImHaushalt", v)} /></div>

        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Staatsangehörigkeit</div>
          <Radio name={prefix + "staat"} options={["Deutsch", "EU/EWR/Schweiz", "Andere"]} value={e.staatsang} onChange={v => setE(which, "staatsang", v)} />
          {(e.staatsang === "EU/EWR/Schweiz" || e.staatsang === "Andere") && <Field label="Land" value={e.staatsangLand} onChange={v => setE(which, "staatsangLand", v)} />}
        </div>
      </div>
    );
  };

  const ParentSec4 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s4-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Wohnsitz / gewöhnlicher Aufenthalt</div>
          <Radio name={prefix + "wohnsitz"} options={["Deutschland seit Geburt", "Deutschland seit", "Ausland"] } value={e.wohnsitzTyp} onChange={v => setE(which, "wohnsitzTyp", v)} />
          {e.wohnsitzTyp === "Deutschland seit" && <Field label="Monat/Jahr" value={e.wohnsitzSeit} onChange={v => setE(which, "wohnsitzSeit", v)} />}
          {e.wohnsitzTyp === "Ausland" && <div style={S.row}><Field label="von" value={e.auslandVon} onChange={v => setE(which, "auslandVon", v)} /><Field label="bis" value={e.auslandBis} onChange={v => setE(which, "auslandBis", v)} /></div>}
        </div>
        <div style={{ marginBottom: 8 }}>
          <Check label="Erwerbstätigkeit in Deutschland" checked={e.erwerbDE} onChange={v => setE(which, "erwerbDE", v)} />
          <Field label="Erwerbstätigkeit im Ausland — Land" value={e.erwerbAusland} onChange={v => setE(which, "erwerbAusland", v)} />
        </div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Elternzeit / unbezahlte Freistellung</div>
          <Radio name={prefix + "elternzeit"} options={["Nein", "Ja"]} value={e.elternzeit} onChange={v => setE(which, "elternzeit", v)} />
          {e.elternzeit === "Ja" && <Field label="Grund" value={e.elternzeitGrund} onChange={v => setE(which, "elternzeitGrund", v)} />}
        </div>
        <div><div style={S.lbl}>Entgeltersatzleistungen (ALG I, Krankengeld etc.)</div>
          <Radio name={prefix + "entgelt"} options={["Nein", "Ja"]} value={e.entgeltersatz} onChange={v => setE(which, "entgeltersatz", v)} />
        </div>
      </div>
    );
  };

  const ParentSec5A = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s5a-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <Check label="Ich beantrage ausschließlich BasisElterngeld" checked={e.basisOnly} onChange={v => setE(which, "basisOnly", v)} />
        {e.basisOnly && <>
          <div style={S.row}><Field label="Von LM" value={e.basisVon} onChange={v => setE(which, "basisVon", v)} /><Field label="Bis einschl. LM" value={e.basisBis} onChange={v => setE(which, "basisBis", v)} /></div>
          <Field label="Weitere LM" value={e.basisWeitere} onChange={v => setE(which, "basisWeitere", v)} />
          <Check label="Als Mindestbetrag (300 €)" checked={e.basisMindest} onChange={v => setE(which, "basisMindest", v)} />
          <Check label="Aus Erwerbseinkommen vor Geburt" checked={e.basisAusErwerb} onChange={v => setE(which, "basisAusErwerb", v)} />
        </>}
      </div>
    );
  };

  const ParentSec5B = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which];
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <Check label="Ich beantrage ElterngeldPlus" checked={e.egPlus} onChange={v => setE(which, "egPlus", v)} />
        <Check label="In Kombination mit BasisElterngeld" checked={e.egPlusKombi} onChange={v => setE(which, "egPlusKombi", v)} />
        <Check label="Als Mindestbetrag (150 €)" checked={e.egPlusMindest} onChange={v => setE(which, "egPlusMindest", v)} />
        <Check label="Aus Erwerbseinkommen vor Geburt" checked={e.egPlusAusErwerb} onChange={v => setE(which, "egPlusAusErwerb", v)} />
      </div>
    );
  };

  const ParentSec7 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s7-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={S.lbl}>Erwerbstätigkeit im Bezugszeitraum</div>
        <Radio name={prefix + "erwerb"} options={["Keine Erwerbstätigkeit", "Erwerbstätigkeit", "Berufsbildung", "Tagespflege"]} value={e.erwerbBezug} onChange={v => setE(which, "erwerbBezug", v)} />
        {e.erwerbBezug === "Erwerbstätigkeit" && <div style={S.row}><Field label="seit/ab" value={e.erwerbBezugSeit} onChange={v => setE(which, "erwerbBezugSeit", v)} /><Field label="Wochenstunden" value={e.erwerbBezugStunden} onChange={v => setE(which, "erwerbBezugStunden", v)} /></div>}
        {e.erwerbBezug === "Berufsbildung" && <Field label="Voraussichtliches Ende" value={e.berufsbildungEnde} onChange={v => setE(which, "berufsbildungEnde", v)} />}
        {e.erwerbBezug === "Tagespflege" && <Field label="Anzahl der Kinder" value={e.tagespflegeKinder} onChange={v => setE(which, "tagespflegeKinder", v)} />}
      </div>
    );
  };

  const ParentSec8 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s8-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <Radio name={prefix + "betr"} options={["Ständig ab Geburt", "Zeitweise", "Nicht im Haushalt"]} value={e.betreuung} onChange={v => setE(which, "betreuung", v)} />
        {e.betreuung === "Zeitweise" && <div style={S.row}><Field label="vom" value={e.betreuungVon} onChange={v => setE(which, "betreuungVon", v)} /><Field label="bis" value={e.betreuungBis} onChange={v => setE(which, "betreuungBis", v)} /></div>}
      </div>
    );
  };

  const ParentSec10 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s10-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <Radio name={prefix + "kv"} options={["GKV pflichtversichert", "GKV freiwillig", "Familienversichert", "Privat versichert", "Freie Heilfürsorge"]} value={e.kvArt} onChange={v => setE(which, "kvArt", v)} />
        {(e.kvArt === "GKV pflichtversichert" || e.kvArt === "GKV freiwillig" || e.kvArt === "Familienversichert") && <>
          <Field label="Krankenkasse" value={e.kvKasse} onChange={v => setE(which, "kvKasse", v)} />
          <Field label="Mitgliedsnummer" value={e.kvMitglied} onChange={v => setE(which, "kvMitglied", v)} />
        </>}
        {e.kvArt === "Privat versichert" && <div><div style={S.lbl}>Krankentagegeldanspruch?</div><Radio name={prefix + "tage"} options={["Ja", "Nein"]} value={e.kvTagegeld} onChange={v => setE(which, "kvTagegeld", v)} /></div>}
      </div>
    );
  };

  const ParentSec11 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s11-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Mutterschaftsgeld</div>
          <Radio name={prefix + "mg"} options={["Nein", "Ja"]} value={e.mutterschutzgeld} onChange={v => setE(which, "mutterschutzgeld", v)} />
          {e.mutterschutzgeld === "Ja" && <div style={S.row}><Field label="Mutterschutzfrist vom" type="date" value={e.mutterschutzVon} onChange={v => setE(which, "mutterschutzVon", v)} /><Field label="bis" type="date" value={e.mutterschutzBis} onChange={v => setE(which, "mutterschutzBis", v)} /></div>}
        </div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>AG-Zuschuss zum Mutterschaftsgeld</div>
          <Radio name={prefix + "agz"} options={["Nein", "Ja"]} value={e.agZuschuss} onChange={v => setE(which, "agZuschuss", v)} />
        </div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Dienst-/Anwärterbezüge ab Geburt</div>
          <Radio name={prefix + "dienst"} options={["Nein", "Ja"]} value={e.dienstbezuege} onChange={v => setE(which, "dienstbezuege", v)} />
          {e.dienstbezuege === "Ja" && <Check label="Zuschuss nach beamtenrechtlichen Verordnungen" checked={e.beamtenZuschuss} onChange={v => setE(which, "beamtenZuschuss", v)} />}
        </div>
        <div><div style={S.lbl}>Vergleichbare ausländische Leistungen</div>
          <Radio name={prefix + "ausl"} options={["Nein", "Ja"]} value={e.auslandLeistung} onChange={v => setE(which, "auslandLeistung", v)} />
          {e.auslandLeistung === "Ja" && <Field label="Beantragt bei" value={e.auslandBei} onChange={v => setE(which, "auslandBei", v)} />}
        </div>
      </div>
    );
  };

  const ParentSec12 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s12-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Sonstige Leistungen (ALG I, Krankengeld etc.)</div>
          <Radio name={prefix + "sl"} options={["Nein", "Ja"]} value={e.sonstigeLeistung} onChange={v => setE(which, "sonstigeLeistung", v)} />
          {e.sonstigeLeistung === "Ja" && <>
            <div style={S.row}><Field label="Von" type="date" value={e.slVon1} onChange={v => setE(which, "slVon1", v)} /><Field label="Bis" type="date" value={e.slBis1} onChange={v => setE(which, "slBis1", v)} /><Field label="Art" value={e.slArt1} onChange={v => setE(which, "slArt1", v)} /></div>
            <div style={S.row}><Field label="Von" type="date" value={e.slVon2} onChange={v => setE(which, "slVon2", v)} /><Field label="Bis" type="date" value={e.slBis2} onChange={v => setE(which, "slBis2", v)} /><Field label="Art" value={e.slArt2} onChange={v => setE(which, "slArt2", v)} /></div>
            <div style={{ marginBottom: 8 }}><div style={S.lbl}>Leistung bereits vor der Geburt bezogen?</div>
              <Radio name={prefix + "slvor"} options={["Nein", "Ja"]} value={e.slVorGeburt} onChange={v => setE(which, "slVorGeburt", v)} />
              {e.slVorGeburt === "Ja" && <div style={S.row}><Field label="seit" type="date" value={e.slVorSeit} onChange={v => setE(which, "slVorSeit", v)} /><Field label="bis" type="date" value={e.slVorBis} onChange={v => setE(which, "slVorBis", v)} /></div>}
            </div>
          </>}
        </div>
        <div><div style={S.lbl}>Dem Elterngeld vergleichbare ausländische Leistungen</div>
          <Radio name={prefix + "va"} options={["Nein", "Ja"]} value={e.vergleichbareAusl} onChange={v => setE(which, "vergleichbareAusl", v)} />
          {e.vergleichbareAusl === "Ja" && <Field label="Beantragt bei" value={e.vergleichbareBei} onChange={v => setE(which, "vergleichbareBei", v)} />}
        </div>
      </div>
    );
  };

  const ParentSec13 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which]; const prefix = `${which}-s13-`;
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Einkommen aus nichtselbständiger Erwerbstätigkeit</div>
          <Radio name={prefix + "ang"} options={["Nein", "Ja (auch Minijob oder Midijob)"]} value={e.einkommenAngestellt} onChange={v => setE(which, "einkommenAngestellt", v)} />
          {e.einkommenAngestellt?.startsWith("Ja") && <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>→ Anlage N ausfüllen</div>}
        </div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Selbständige Erwerbstätigkeit / Gewinneinkünfte</div>
          <Radio name={prefix + "selbst"} options={["Nein", "Ja"]} value={e.einkommenSelbst} onChange={v => setE(which, "einkommenSelbst", v)} />
          {e.einkommenSelbst === "Ja" && <>
            <Radio name={prefix + "selbstart"} options={["Land- u. Forstwirtschaft", "Gewerbebetrieb", "Selbständige Arbeit"]} value={e.selbstArt} onChange={v => setE(which, "selbstArt", v)} />
            <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>→ Anlage G oder GuN ausfüllen</div>
          </>}
        </div>
        <div style={{ marginBottom: 8 }}>
          <details>
            <summary style={{ fontSize: 11, fontWeight: 600, cursor: "pointer", marginBottom: 4 }}>Ausklammerungstatbestände</summary>
            <div style={{ paddingLeft: 8 }}>
              {["Mutterschaftsgeld vor Geburt dieses Kindes", "Mutterschaftsgeld vor Geburt eines älteren Kindes", "Elterngeldbezug für älteres Kind", "Einkommensverlust wegen schwangerschaftsbedingter Krankheit", "Keine Ausklammerung"].map(a => (
                <Check key={a} label={a} checked={(e.ausklammerung || []).includes(a)} onChange={v => {
                  const arr = [...(e.ausklammerung || [])];
                  if (v) arr.push(a); else { const idx = arr.indexOf(a); if (idx >= 0) arr.splice(idx, 1); }
                  setE(which, "ausklammerung", arr);
                }} />
              ))}
              {(e.ausklammerung || []).includes("Mutterschaftsgeld vor Geburt eines älteren Kindes") && <Field label="geb. am" type="date" value={e.ausklammerungDatum} onChange={v => setE(which, "ausklammerungDatum", v)} />}
              {(e.ausklammerung || []).includes("Elterngeldbezug für älteres Kind") && <Field label="Aktenzeichen" value={e.ausklammerungAktenzeichen} onChange={v => setE(which, "ausklammerungAktenzeichen", v)} />}
            </div>
          </details>
        </div>
      </div>
    );
  };

  const ParentSec14 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which];
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <Check label="Einverstanden, dass Elterngeldstelle meinen AG kontaktiert (freiwillig)" checked={e.agEinverstaendnis} onChange={v => setE(which, "agEinverstaendnis", v)} />
        {e.agEinverstaendnis && <>
          <Field label="Telefonnummer AG" value={e.agTelefon} onChange={v => setE(which, "agTelefon", v)} />
          <Field label="Anschrift AG" value={e.agAnschrift} onChange={v => setE(which, "agAnschrift", v)} />
        </>}
      </div>
    );
  };

  const ParentSec15 = ({ which, num }: { which: "e1" | "e2"; num: number }) => {
    const e = f[which];
    return (
      <div style={{ flex: 1, minWidth: 280 }}>
        <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 8 }}>Elternteil {num}</div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={e.iban} onChange={v => setE(which, "iban", v)} /></div>
        <Field label="BIC (bei Auslandszahlung)" value={e.bic} onChange={v => setE(which, "bic", v)} />
        <Field label="Kontoinhaber/in (wenn nicht Antragsteller/in)" value={e.kontoinhaber} onChange={v => setE(which, "kontoinhaber", v)} />
        <Field label="Geldinstitut" value={e.geldinstitut} onChange={v => setE(which, "geldinstitut", v)} />
      </div>
    );
  };

  const dualCol = (a: React.ReactNode, b: React.ReactNode) => (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>{a}{b}</div>
  );

  const showEgPlus = f.e1.egPlus || f.e1.egPlusKombi || f.e2.egPlus || f.e2.egPlusKombi;

  return (
    <MusterFormBase rootId="eg-root" title="Antrag auf Elterngeld" subtitle="Musterformular BEEG — BalkanLink — nur zur Orientierung — Stand 01/2025 — Für Geburten ab 01.01.2025" pdfUrl={PDF_URL} pdfLabel="Sve Antragsformulare po Bundesländer →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Elterngeldstelle einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <InfoBox>📋 <strong>Šta je Elterngeld?</strong><br />Elterngeld je naknada za roditelje koji ostanu kod kuće ili smanje rad nakon rođenja djeteta. Iznosi od 300€ do 1.800€ mjesečno, ovisno o prethodnoj plaći. Podnosi se u Elterngeldstelle.</InfoBox>
      <InfoBox variant="yellow">⚠️ <strong>Svaki Bundesland ima svoj formular!</strong><br />Elterngeld formular se razlikuje od savezne države do savezne države. Na linku ispod možeš pronaći tačan formular za tvoj Bundesland. Odaberi svoju saveznu državu i preuzmi odgovarajući PDF.</InfoBox>

      {/* SEKCIJA 1 */}
      <div style={S.sec}>
        <SecHeader num={1} title="Kind, für das Elterngeld beantragt wird" />
        <InfoBox>ℹ️ Original Geburtsurkunde sa svrhom "Elterngeld" mora biti priložena uz zahtjev.</InfoBox>
        <div style={S.row}><Field label="Nachname des Kindes" value={f.kNachname} onChange={v => set("kNachname", v)} /><Field label="Vorname(n) des Kindes" value={f.kVorname} onChange={v => set("kVorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.kGeburtsdatum} onChange={v => set("kGeburtsdatum", v)} /><Field label="Geburtsort" value={f.kGeburtsort} onChange={v => set("kGeburtsort", v)} /></div>
        <div style={S.row}><Field label="Voraussichtlicher Entbindungstermin laut Mutterpass" type="date" value={f.kET} onChange={v => set("kET", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Mehrlingsgeburt?</div>
          <Radio name="mehrling" options={["Ja", "Nein"]} value={f.mehrling} onChange={v => set("mehrling", v)} />
          {f.mehrling === "Ja" && <div style={S.row}><Field label="Anzahl" width={60} value={f.mehrlingAnzahl} onChange={v => set("mehrlingAnzahl", v)} /><Field label="Vorname(n)" value={f.mehrlingNamen} onChange={v => set("mehrlingNamen", v)} /></div>}
        </div>
        <div style={{ marginBottom: 8 }}><Field label="Bei Adoption: Datum der Haushaltsaufnahme" type="date" value={f.adoptionDatum} onChange={v => set("adoptionDatum", v)} /></div>
        <div><div style={S.lbl}>Behinderung des Kindes?</div>
          <Radio name="behinderung" options={["Ja (Bescheinigung beilegen)", "Nein"]} value={f.behinderung} onChange={v => set("behinderung", v)} />
        </div>
        <InfoBox>ℹ️ <strong>Voraussichtlicher Entbindungstermin:</strong><br />Upisuje se datum iz Mutterpassa. Bitan je ako je dijete rođeno 6+ sedmica prerano — tada se može tražiti produženi Bezugszeitraum.</InfoBox>
      </div>

      {/* SEKCIJA 2 */}
      <div style={S.sec}>
        <SecHeader num={2} title="Persönliche Angaben" />
        <InfoBox>ℹ️ Sekcija 2 se mora ispuniti za <strong>OBA roditelja</strong>, čak i ako samo jedan podnosi zahtjev, i čak i ako ne žive zajedno.</InfoBox>
        {dualCol(<ParentBlock which="e1" num={1} />, <ParentBlock which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Ko ima pravo na Elterngeld?</strong><br />EU/EWR državljani imaju ista prava kao njemački. Ostali stranci moraju imati Niederlassungserlaubnis ili Aufenthaltserlaubnis koji dozvoljava rad. Važno: prihod oba roditelja u kalendarskoj godini prije rođenja ne smije prelaziti 200.000 € zajedno.</InfoBox>
      </div>

      {/* SEKCIJA 3 */}
      <div style={S.sec}>
        <SecHeader num={3} title="Erklärung zur Einkommensgrenze" />
        <InfoBox>ℹ️ <strong>Einkommensgrenze 2025:</strong><br />Ako zajednički prihod para u godini PRIJE rođenja prelazi 200.000 €, nema prava na Elterngeld. Za samohrane roditelje vrijedi samo njihov prihod.</InfoBox>
        <div style={S.lbl}>Das zu versteuernde Einkommen im Kalenderjahr vor der Geburt wird die Einkommensgrenze von 200.000 Euro:</div>
        <Radio name="einkommensgrenze" options={["Sicher nicht überschreiten", "Voraussichtlich nicht überschreiten", "Möglicherweise überschreiten", "Sicher überschreiten"]} value={f.einkommensgrenze} onChange={v => set("einkommensgrenze", v)} />
      </div>

      {/* SEKCIJA 4 */}
      <div style={S.sec}>
        <SecHeader num={4} title="Wohnsitz / Auslandsbezug" />
        {dualCol(<ParentSec4 which="e1" num={1} />, <ParentSec4 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Auslandsbezug:</strong><br />Ako jedan roditelj radi u drugoj EU/EWR zemlji, mogu postojati posebna pravila. Preporučujemo konsultaciju sa Elterngeldstelle.</InfoBox>
      </div>

      {/* SEKCIJA 5A */}
      <div style={S.sec}>
        <SecHeader num={5} title="A — Bestimmung Leistungsart: BasisElterngeld" />
        <InfoBox variant="yellow">ℹ️ <strong>Tri vrste Elterngeld:</strong><br />• BasisElterngeld: 300€–1.800€/mj., do 14. Lebensmonat<br />• ElterngeldPlus: polovina iznosa, ali dvostruko duže<br />• Partnerschaftsbonus: dodatna 2–4 mjeseca ako oba roditelja rade 24–32 h/sedmično istovremeno</InfoBox>
        {dualCol(<ParentSec5A which="e1" num={1} />, <ParentSec5A which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>BasisElterngeld pravila:</strong><br />• Minimum 2, maksimum 12 Lebensmonate po roditelju<br />• Istovremeni Bezug moguć samo 1 mjesec unutar prvih 12 LM<br />• 13. i 14. LM — istovremeni Bezug nije moguć<br />• Ako se prihod smanjuje kod oba roditelja → 2 dodatna Partnermonate (ukupno 14)</InfoBox>
      </div>

      {/* SEKCIJA 5B */}
      <div style={S.sec}>
        <SecHeader num={5} title="B — ElterngeldPlus" />
        {dualCol(<ParentSec5B which="e1" num={1} />, <ParentSec5B which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>ElterngeldPlus:</strong><br />Umjesto 1 mjeseca BasisElterngeld = 2 mjeseca ElterngeldPlus. Maksimalno do 32. Lebensmonat. Korisno za roditelje koji rade part-time.</InfoBox>
      </div>

      {/* SEKCIJA 5C */}
      <div style={S.sec}>
        <SecHeader num={5} title="C — Partnerschaftsbonus" />
        <Check label="Wir beanspruchen zusammen Partnerschaftsbonus" checked={f.partnerbonus} onChange={v => set("partnerbonus", v)} />
        {f.partnerbonus && <>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Zusammenhängende Lebensmonate</div>
            <Radio name="pbMonate" options={["2", "3", "4"]} value={f.partnerbonusMonate} onChange={v => set("partnerbonusMonate", v)} />
          </div>
          <div style={S.row}><Field label="ET1 — Voraussichtliche Wochenstunden" value={f.e1PBStunden} onChange={v => set("e1PBStunden", v)} /><Field label="ET2 — Voraussichtliche Wochenstunden" value={f.e2PBStunden} onChange={v => set("e2PBStunden", v)} /></div>
        </>}
        <InfoBox>ℹ️ <strong>Partnerschaftsbonus:</strong><br />Oba roditelja moraju raditi 24–32 h/sedmično u ISTIM Lebensmonaten. Minimum 2 Monate. Bonusmonate = ElterngeldPlus uz posebnih 2–4 mjeseca.</InfoBox>
      </div>

      {/* SEKCIJA 6 — samo za alleinerziehende */}
      {isAlleinerziehend && (
        <div style={S.sec}>
          <SecHeader num={6} title="Alleinerziehende" />
          <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich lebe nicht mit dem anderen Elternteil zusammen und die Voraussetzungen für den Steuerentlastungsbetrag nach § 24b EStG liegen vor.</p>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Ich beantrage daher weitere Monate als:</div>
            <Radio name="alleinerziehendExtra" options={["Zwei weitere LM als BasisElterngeld", "Vier weitere LM als ElterngeldPlus"]} value={f.alleinerziehendExtra} onChange={v => set("alleinerziehendExtra", v)} />
          </div>
          <Check label="Ich beantrage Bonusmonate" checked={f.alleinerziehendBonus} onChange={v => set("alleinerziehendBonus", v)} />
          {f.alleinerziehendBonus && <>
            <Radio name="aeBonusMonate" options={["2", "3", "4"]} value={f.alleinerziehendBonusMonate} onChange={v => set("alleinerziehendBonusMonate", v)} />
            <Field label="Wochenarbeitszeit (Stunden)" value={f.alleinerziehendStunden} onChange={v => set("alleinerziehendStunden", v)} />
          </>}
          <InfoBox>ℹ️ <strong>Samohrani roditelji:</strong><br />Mogu primati Elterngeld do 14 LM (+ 2 Partnermonate). Bonusmonate: dodatnih 2–4 LM ElterngeldPlus ako rade 24–32 h/sedmično.</InfoBox>
        </div>
      )}

      {/* SEKCIJA 7 */}
      <div style={S.sec}>
        <SecHeader num={7} title="Umfang der Erwerbstätigkeit im Bezugszeitraum" />
        {dualCol(<ParentSec7 which="e1" num={1} />, <ParentSec7 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Maximalne radno sati:</strong><br />Dok se prima Elterngeld, smije se raditi maksimalno 32 sata sedmično u prosjeku. Više od 32 h = gubitak prava za taj mjesec.</InfoBox>
      </div>

      {/* SEKCIJA 8 */}
      <div style={S.sec}>
        <SecHeader num={8} title="Betreuung und Erziehung" />
        {dualCol(<ParentSec8 which="e1" num={1} />, <ParentSec8 which="e2" num={2} />)}
      </div>

      {/* SEKCIJA 9 */}
      <div style={S.sec}>
        <SecHeader num={9} title="Weitere Kinder im Haushalt (Geschwisterbonus)" />
        <InfoBox>ℹ️ <strong>Geschwisterbonus:</strong><br />Ako u domaćinstvu živi još jedno dijete ispod 3 godine ILI dvoje djece ispod 6 godina → Elterngeld se povećava za 10%, minimalno 75€/mj.</InfoBox>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, marginBottom: 8 }}>
          <thead><tr>{["Nachname, Vorname", "Geburts-/Adoptionsdatum", "Aktenzeichen"].map(h => <th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>)}</tr></thead>
          <tbody>{f.weitereKinder.map((k, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={`${k.nachname}${k.vorname ? ", " + k.vorname : ""}`} onChange={e => { const [n, v] = e.target.value.split(", "); setWk(i, "nachname", n || ""); setWk(i, "vorname", v || ""); }} /></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.gebdatum} onChange={e => setWk(i, "gebdatum", e.target.value)} /></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.aktenzeichen} onChange={e => setWk(i, "aktenzeichen", e.target.value)} /></td>
            </tr>
          ))}</tbody>
        </table>
        <Check label="Bei einem Kind liegt eine Behinderung vor (Nachweis beilegen — Altersgrenze dann 14 Jahre)" checked={f.einKindBehinderung} onChange={v => set("einKindBehinderung", v)} />
      </div>

      {/* SEKCIJA 10 */}
      <div style={S.sec}>
        <SecHeader num={10} title="Krankenversicherung" />
        {dualCol(<ParentSec10 which="e1" num={1} />, <ParentSec10 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>GKV za vrijeme Elternzeit:</strong><br />Zaposleni koji su GKV osigurani ostaju besplatno osigurani za vrijeme Elternzeit. Privatno osigurani moraju sami plaćati doprinose.</InfoBox>
      </div>

      {/* SEKCIJA 11 */}
      <div style={S.sec}>
        <SecHeader num={11} title="Mutterschaftsleistungen" />
        {dualCol(<ParentSec11 which="e1" num={1} />, <ParentSec11 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Mutterschaftsgeld i Elterngeld:</strong><br />Mutterschaftsgeld se uračunava u Elterngeld. Mjeseci u kojima se prima Mutterschaftsgeld automatski se smatraju BasisElterngeld-Monaten.</InfoBox>
      </div>

      {/* SEKCIJA 12 */}
      <div style={S.sec}>
        <SecHeader num={12} title="Anzurechnende Einnahmen im Bezugszeitraum" />
        {dualCol(<ParentSec12 which="e1" num={1} />, <ParentSec12 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Anzurechnende Einnahmen:</strong><br />ALG I, Krankengeld i slične naknade smanjuju Elterngeld iznad 300€. Minimalni iznos od 300€ ostaje uvijek.</InfoBox>
      </div>

      {/* SEKCIJA 13 */}
      <div style={S.sec}>
        <SecHeader num={13} title="Einkommen vor Geburt des Kindes" />
        <InfoBox variant="yellow">ℹ️ <strong>Bemessungszeitraum:</strong><br />Elterngeld se računa na osnovu prihoda iz 12 kalendarskih mjeseci PRIJE mjeseca rođenja. Mjeseci s Mutterschaftsgeld, Elterngeld za starije dijete ili bolešću povezanom s trudnoćom se preskaču (Ausklammerung).</InfoBox>
        {dualCol(<ParentSec13 which="e1" num={1} />, <ParentSec13 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Zašto je Ausklammerung važna?</strong><br />Ako su u Bemessungszeitraum bili mjeseci s nižim prihodom zbog trudnoće ili Elternzeit za starije dijete, ti mjeseci se izbacuju i koriste bolji mjeseci umjesto njih. To može značajno povećati Elterngeld.</InfoBox>
      </div>

      {/* SEKCIJA 14 */}
      <div style={S.sec}>
        <SecHeader num={14} title="Freiwillige Angaben zum Arbeitgeber" />
        {dualCol(<ParentSec14 which="e1" num={1} />, <ParentSec14 which="e2" num={2} />)}
        <InfoBox>ℹ️ <strong>Ova saglasnost je dobrovoljna.</strong><br />Ubrzava obradu jer Elterngeldstelle može direktno kontaktirati poslodavca. Bez saglasnosti moraš sam donijeti sve dokumente.</InfoBox>
      </div>

      {/* SEKCIJA 15 */}
      <div style={S.sec}>
        <SecHeader num={15} title="Bankverbindung" />
        {dualCol(<ParentSec15 which="e1" num={1} />, <ParentSec15 which="e2" num={2} />)}
      </div>

      {/* SEKCIJA 16 */}
      <div style={S.sec}>
        <SecHeader num={16} title="Anmerkungen" />
        <textarea style={{ ...S.inp, minHeight: 60, width: "100%" }} value={f.anmerkungen} onChange={e => set("anmerkungen", e.target.value)} />
      </div>

      {/* SEKCIJA 17 */}
      <div style={S.sec}>
        <SecHeader num={17} title="Datum und Unterschrift" />
        <InfoBox variant="yellow">⚠️ Antrag mora potpisati <strong>OBA roditelja</strong>. Izuzetak: jedino ako jedan roditelj ima isključivo starateljstvo (alleiniges Sorgerecht).</InfoBox>
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Signature label="Unterschrift Elternteil 1" />
          <Signature label="Unterschrift Elternteil 2" />
        </div>

        <div style={{ marginTop: 16, fontSize: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>ANLAGEN — Obavezno:</div>
          <div>□ Original-Geburtsurkunde (sa svrhom "Elterngeld")</div>
          <div>□ Anlage N (ako je bio angestellt)</div>
          <div>□ Anlage G / GuN (ako je bio selbständig)</div>
          <div style={{ fontWeight: 700, marginTop: 8, marginBottom: 4 }}>Po potrebi:</div>
          <div>□ Anlage EG+ (ElterngeldPlus ili Partnerschaftsbonus)</div>
          <div>□ Anlage EA (dijete rođeno 6+ sedmica prerano)</div>
          <div>□ Bescheinigung der Krankenkasse über Mutterschaftsgeld</div>
          <div>□ Nachweis Steuerklasse II (Alleinerziehende)</div>
          <div>□ Letzter Steuerbescheid (Gewinneinkünfte)</div>
        </div>
      </div>

    </MusterFormBase>
  );
}
