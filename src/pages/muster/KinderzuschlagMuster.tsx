import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import KinderzuschlagGuideContent from "@/components/guides/KinderzuschlagGuideContent";

const LS_KEY = "kinderzuschlag-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", steuerId: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "",
  iban: "", bic: "", kontoinhaber: "",
  e2Familienname: "", e2Vorname: "", e2Geburtsdatum: "", e2SteuerId: "", e2ImHaushalt: "", e2Anschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", nachname: "", geburtsdatum: "", steuerId: "", kindergeld: "", imHaushalt: "", beiWem: "" })),
  einkommensart1: "", brutto1: "", netto1: "",
  einkommensart2: "", brutto2: "",
  sonstigeArt: "", sonstigeBetrag: "",
  kaltmiete: "", betriebskosten: "", heizkosten: "", wohnflaeche: "", anzahlPersonen: "",
  familienkasse: "", sigOrt: "", sigDatum: "",
});

export default function KinderzuschlagMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setKind = (i: number, k: string, v: string) => setF(p => { const kinder = [...p.kinder]; kinder[i] = { ...kinder[i], [k]: v }; return { ...p, kinder }; });

  return (
    <>
    <MusterFormBase rootId="kiz-root" title="Antrag auf Kinderzuschlag (KiZ)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Mehr Infos bei der Familienkasse →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der Familienkasse einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="kinderzuschlag" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="kinderzuschlag"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Popuni online → preuzmi 1:1 originalni Familienkasse KiZ1 PDF</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Tvoji podaci se popunjavaju u zvanični Kinderzuschlag (KiZ 1) PDF lokalno u tvom browseru — ništa ne ide na server. Preuzmi, potpiši i pošalji nadležnoj Familienkasse.</div>
        <button disabled style={{ background: "#9CA3AF", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "not-allowed" }}>📄 Preuzmi popunjeni KiZ1 PDF (uskoro dostupno)</button>
      </div>

      <div style={S.sec}>
        <SecHeader num={1} title="Antragstellende Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber/in" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zum anderen Elternteil" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px", color: "#6b7280" }}>Falls vorhanden</p>
        <div style={S.row}><Field label="Familienname" value={f.e2Familienname} onChange={v => set("e2Familienname", v)} /><Field label="Vorname" value={f.e2Vorname} onChange={v => set("e2Vorname", v)} /><Field label="Geburtsdatum" type="date" value={f.e2Geburtsdatum} onChange={v => set("e2Geburtsdatum", v)} /></div>
        <div style={S.row}><Field label="Steuerliche Identifikationsnummer" value={f.e2SteuerId} onChange={v => set("e2SteuerId", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Im selben Haushalt lebend?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="e2ImHaushalt" checked={f.e2ImHaushalt === o} onChange={() => set("e2ImHaushalt", o)} />{o}</label>))}</div>
        </div>
        {f.e2ImHaushalt === "Nein" && <div style={S.row}><Field label="Anschrift des anderen Elternteils" value={f.e2Anschrift} onChange={v => set("e2Anschrift", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zu den Kindern" />
        {f.kinder.map((k, i) => (
          <div key={i} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: i < 4 ? "1px dashed #e5e7eb" : "none" }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>Kind {i + 1}</div>
            <div style={S.row}><Field label="Vorname" value={k.vorname} onChange={v => setKind(i, "vorname", v)} /><Field label="Familienname" value={k.nachname} onChange={v => setKind(i, "nachname", v)} /><Field label="Geburtsdatum" type="date" value={k.geburtsdatum} onChange={v => setKind(i, "geburtsdatum", v)} /></div>
            <div style={S.row}><Field label="Steuer-ID des Kindes" value={k.steuerId} onChange={v => setKind(i, "steuerId", v)} /></div>
            <div style={S.row}>
              <div style={{ flex: 1 }}><div style={S.lbl}>Kindergeld wird bezogen?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`kindergeld${i}`} checked={k.kindergeld === o} onChange={() => setKind(i, "kindergeld", o)} />{o}</label>))}</div></div>
              <div style={{ flex: 1 }}><div style={S.lbl}>Kind lebt im Haushalt?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`imHaushalt${i}`} checked={k.imHaushalt === o} onChange={() => setKind(i, "imHaushalt", o)} />{o}</label>))}</div></div>
            </div>
            {k.imHaushalt === "Nein" && <div style={S.row}><Field label="Bei wem lebt das Kind?" value={k.beiWem} onChange={v => setKind(i, "beiWem", v)} /></div>}
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Einkommen der Eltern" />
        <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Antragstellende Person</div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Einkommensart</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["Arbeitslohn", "Selbstständig", "Rente", "Sonstiges"].map(a => (<label key={a} style={S.chk}><input type="radio" name="einkommensart1" checked={f.einkommensart1 === a} onChange={() => set("einkommensart1", a)} />{a}</label>))}</div>
        </div>
        <div style={S.row}><Field label="Bruttoeinkommen (€/Monat)" value={f.brutto1} onChange={v => set("brutto1", v)} /><Field label="Nettoeinkommen (€/Monat)" value={f.netto1} onChange={v => set("netto1", v)} /></div>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4, marginTop: 8 }}>Anderer Elternteil (falls zutreffend)</div>
        <div style={S.row}><Field label="Einkommensart" value={f.einkommensart2} onChange={v => set("einkommensart2", v)} /><Field label="Bruttoeinkommen (€/Monat)" value={f.brutto2} onChange={v => set("brutto2", v)} /></div>
        <div style={{ marginTop: 6 }}><div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Sonstige Einnahmen (Unterhalt, Rente, Kindergeld etc.)</div>
          <div style={S.row}><Field label="Art" value={f.sonstigeArt} onChange={v => set("sonstigeArt", v)} /><Field label="Betrag (€/Monat)" value={f.sonstigeBetrag} onChange={v => set("sonstigeBetrag", v)} /></div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Wohnsituation" />
        <div style={S.row}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Betriebskosten (€/Monat)" value={f.betriebskosten} onChange={v => set("betriebskosten", v)} /><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Anzahl Personen im Haushalt" value={f.anzahlPersonen} onChange={v => set("anzahlPersonen", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständige Familienkasse" value={f.familienkasse} onChange={v => set("familienkasse", v)} /></div>
      </div>

    </MusterFormBase>
    <div style={{ maxWidth: 800, margin: "0 auto 60px", padding: "0 16px" }}>
      <KinderzuschlagGuideContent />
    </div>
    </>
  );
}
