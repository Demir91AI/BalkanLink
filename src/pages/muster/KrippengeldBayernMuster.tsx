import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "krippengeld-bayern-muster-data";
const PDF_URL = "https://www.zbfs.bayern.de/familie/krippengeld/";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "",
  strasse: "", plz: "", ort: "",
  telefon: "", email: "",
  partnerVorname: "", partnerNachname: "", partnerGeburtsdatum: "",
  kindVorname: "", kindNachname: "", kindGeburtsdatum: "",
  einrichtungName: "", einrichtungStrasse: "", einrichtungPLZ: "", einrichtungOrt: "",
  betreuungBeginn: "", monatlicheGebuehr: "",
  iban: "", bic: "", kontoinhaber: "",
  bemerkungen: "",
});

export default function KrippengeldBayernMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="krg-root" title="Antrag auf Krippengeld (Bayern)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original beim ZBFS Bayern herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="krippengeld-bayern" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="krippengeld-bayern"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFFBEB", border: "2px solid #F59E0B", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>🏛️ Krippengeld (Bayern) se podnosi u nadležnom Jugendamt-u ili online</div>
        <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55 }}>Subvencija za troškove vrtića u Bavarskoj (KiBiG-Subvention) podnosi se u nadležnom Jugendamt-u prema adresi stanovanja ili online putem KiBiG.web sistema. Neke općine prihvataju i prijave poštom. Ovaj vodič objašnjava uvjete i šta pripremiti za razgovor s referentom.</div>
      </div>
      <MusterIntroBlock formKey="krippengeldbayern" paperId="krg-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} />
        <Field label="Straße" value={f.strasse} onChange={v => set("strasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Partner / weiterer Elternteil" />
        <div style={S.row}><Field label="Vorname" value={f.partnerVorname} onChange={v => set("partnerVorname", v)} /><Field label="Nachname" value={f.partnerNachname} onChange={v => set("partnerNachname", v)} /></div>
        <Field label="Geburtsdatum" type="date" value={f.partnerGeburtsdatum} onChange={v => set("partnerGeburtsdatum", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Kind (unter 3 Jahren)" />
        <div style={S.row}><Field label="Vorname" value={f.kindVorname} onChange={v => set("kindVorname", v)} /><Field label="Nachname" value={f.kindNachname} onChange={v => set("kindNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.kindGeburtsdatum} onChange={v => set("kindGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Betreuungseinrichtung (Krippe / Tagespflege)" />
        <Field label="Name der Einrichtung" value={f.einrichtungName} onChange={v => set("einrichtungName", v)} />
        <Field label="Straße" value={f.einrichtungStrasse} onChange={v => set("einrichtungStrasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.einrichtungPLZ} onChange={v => set("einrichtungPLZ", v)} /><Field label="Ort" value={f.einrichtungOrt} onChange={v => set("einrichtungOrt", v)} /></div>
        <div style={S.row}><Field label="Betreuung beginnt am" type="date" value={f.betreuungBeginn} onChange={v => set("betreuungBeginn", v)} /><Field label="Monatliche Gebühr (EUR)" value={f.monatlicheGebuehr} onChange={v => set("monatlicheGebuehr", v)} /></div>
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>Hinweis: Krippengeld 100 € / Monat (Stand 2026).</p>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bankverbindung" />
        <div style={S.row}><Field label="IBAN" value={f.iban} onChange={v => set("iban", v)} /><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
        <Field label="Kontoinhaber" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="F. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
