import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "antragsruecknahme-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "",
  strasse: "", hausnummer: "", plz: "", ort: "",
  kundennummer: "", bgNummer: "",
  antragsdatum: "",
  sigDatum: "",
});

export default function AntragsruecknahmeMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ar-root" title="Erklärung der Antragsrücknahme" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 10, color: "#991b1b", lineHeight: 1.6 }}>
        ⚠️ <strong>UPOZORENJE:</strong> Povlačenje zahtjeva je NEOPOZIVO! Nakon predaje, zahtjev važi kao da nikad nije podnesen. Zdravstveno osiguranje preko Jobcentra odmah prestaje.
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Angaben zur Person" />
        <div style={S.row}><Field label="1. Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="2. Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <Field label="3. Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} />
        <div style={S.row}><Field label="4. Straße" flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="5. Hausnr." width={70} value={f.hausnummer} onChange={v => set("hausnummer", v)} /></div>
        <div style={S.row}><Field label="6. PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="7. Wohnort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="8. Kundennummer" value={f.kundennummer} onChange={v => set("kundennummer", v)} /><Field label="9. BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Erklärung der Rücknahme" />
        <Field label="10. Antragsdatum (ursprünglicher Bürgergeld-Antrag)" type="date" value={f.antragsdatum} onChange={v => set("antragsdatum", v)} />
        <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: 10, marginTop: 8, fontSize: 10, color: "#1e3a5f", lineHeight: 1.6 }}>
          <p><strong>Vorgedruckter Text:</strong></p>
          <p style={{ marginTop: 4 }}>Ich habe am oben genannten Datum einen Antrag auf Bürgergeld gestellt. Hiermit erkläre ich, dass ich diesen Antrag zurücknehme.</p>
          <p style={{ marginTop: 6 }}>Mir ist bekannt:</p>
          <p>✓ Die Rücknahme kann nicht widerrufen werden.</p>
          <p>✓ Leistungen sind frühestens ab neuem Antragsdatum möglich.</p>
          <p>✓ Der Krankenversicherungsschutz über das Jobcenter entfällt.</p>
          <p style={{ marginTop: 4, fontWeight: 700 }}>⚠️ Dieses Dokument ist ohne Unterschrift gültig.</p>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="Einreichung" />
        <p style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>Das Formular beim zuständigen Jobcenter einreichen (persönlich, per Post oder online). Unterschrift ist optional.</p>
        <Signature label="Datum der Einreichung (optional)" />
      </div>
    </MusterFormBase>
  );
}
