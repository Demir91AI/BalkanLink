import { useState } from "react";
import MusterIntroBlock from "@/components/muster/MusterIntroBlock";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "nichterreichbarkeit-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  abwesendVon: "", abwesendBis: "",
  grund: "", zielort: "",
  erreichbarTel: "", erreichbarEmail: "",
  bemerkungen: "",
});

export default function NichterreichbarkeitMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ne-root" title="Nichterreichbarkeit — Antrag auf Ortsabwesenheit" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="nichterreichbarkeit" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="nichterreichbarkeit"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFF7ED", border: "2px solid #EA580C", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#9A3412", marginBottom: 6 }}>📋 Prijava privremene nedostupnosti — obavijesti Jobcenter UNAPRIJED</div>
        <div style={{ fontSize: 12, color: "#7C2D12", lineHeight: 1.55, marginBottom: 10 }}>Privremena nedostupnost (odmor, putovanje u inozemstvo) mora biti prijavljena Jobcenteru UNAPRIJED — pisano, e-mailom ili lično. Ako si na Bürgergeld-u, nedostupnost duže od 3 tjedna zahtijeva pisano odobrenje. Ovaj obrazac koristiš kao osnovu za prijavu.</div>
        <a href="https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#EA580C", color: "#fff", padding: "10px 16px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>🔗 Pronađi svoji Jobcenter →</a>
      </div>
      <MusterIntroBlock formKey="nichterreichbarkeit" paperId="ne-root-paper" />
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Zeitraum der Abwesenheit" />
        <div style={S.row}><Field label="Abwesend von" type="date" value={f.abwesendVon} onChange={v => set("abwesendVon", v)} /><Field label="Abwesend bis" type="date" value={f.abwesendBis} onChange={v => set("abwesendBis", v)} /></div>
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280" }}>Hinweis: max. 3 Wochen pro Kalenderjahr ohne Verlust des Bürgergeld-Anspruchs.</p>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Grund & Zielort" />
        <Field label="Grund (z.B. Urlaub, Familienbesuch, Krankheit)" value={f.grund} onChange={v => set("grund", v)} />
        <Field label="Zielort / Adresse" value={f.zielort} onChange={v => set("zielort", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Erreichbarkeit während der Abwesenheit" />
        <div style={S.row}><Field label="Telefon" value={f.erreichbarTel} onChange={v => set("erreichbarTel", v)} /><Field label="E-Mail" value={f.erreichbarEmail} onChange={v => set("erreichbarEmail", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
  );
}
