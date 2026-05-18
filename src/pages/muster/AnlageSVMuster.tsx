import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-sv-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  privatKV: "nein", selbststaendig: "nein", beamte: "nein", ueber55: "nein",
  zuschussJa: false, beitragPKV: "", beitragBasistarif: "",
  sigDatum: "",
});

export default function AnlageSVMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  const Radio = ({ name, value }: { name: string; value: string }) => (
    <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o.toLowerCase()} onChange={() => set(name, o.toLowerCase())} />{o}</label>))}</div>
  );

  return (
    <MusterFormBase rootId="sv-root" title="Anlage SV — Sozialversicherung" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-sv" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-sv"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage SV možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Betroffene Person" />
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Kranken- und Pflegeversicherung" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>8. Privat krankenversichert?</div><Radio name="privatKV" value={f.privatKV} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>9. Hauptberuflich selbstständig?</div><Radio name="selbststaendig" value={f.selbststaendig} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>10. Beamtenstatus / Beihilfeberechtigung?</div><Radio name="beamte" value={f.beamte} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>11. (ab 55 Jahre) Besondere Versicherungshistorie?</div><Radio name="ueber55" value={f.ueber55} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Zuschuss zu Versicherungsbeiträgen" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>12. Zuschuss beantragen?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="zuschuss" checked={f.zuschussJa === (o === "Ja")} onChange={() => set("zuschussJa", o === "Ja")} />{o}</label>))}</div>
        </div>
        {f.zuschussJa && <>
          <Field label="Monatlicher PKV-Beitrag" value={f.beitragPKV} onChange={v => set("beitragPKV", v)} />
          <Field label="Beitrag im Basistarif" value={f.beitragBasistarif} onChange={v => set("beitragBasistarif", v)} />
        </>}
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
