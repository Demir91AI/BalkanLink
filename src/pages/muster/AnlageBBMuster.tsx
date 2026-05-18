import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-bb-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  artDesBedarf: "", bedarfZeitpunkt: "", zahlungsrhythmus: "einmalig",
  begruendung: "",
  hoeheBekanntJa: true, betrag: "", kostenvoranschlag: true,
  vorschussJa: false, vorschussBetrag: "",
  sigDatum: "",
});

export default function AnlageBBMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="bb-root" title="Anlage BB — Besonderer Bedarf" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-bb" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-bb"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage BB možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Betroffene Person" />
        <p style={{ fontSize: 10, fontStyle: "italic", color: "#6b7280", margin: "0 0 8px" }}>Falls abweichend von Abschnitt A</p>
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Angaben zum Bedarf" />
        <Field label="8. Art des besonderen Bedarfs" value={f.artDesBedarf} onChange={v => set("artDesBedarf", v)} />
        <div style={{ marginTop: 8 }}>
          <div style={S.lbl}>9. Zahlungsrhythmus</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["einmalig", "monatlich", "vierteljährlich", "halbjährlich", "sonstig"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="rhythmus" checked={f.zahlungsrhythmus === o} onChange={() => set("zahlungsrhythmus", o)} /> {o}</label>
            ))}
          </div>
        </div>
        <Field label="Zeitpunkt" value={f.bedarfZeitpunkt} onChange={v => set("bedarfZeitpunkt", v)} />
        <Field label="10. Begründung (Pflicht)" value={f.begruendung} onChange={v => set("begruendung", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="Höhe und Vorschuss" />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>11. Höhe bereits bekannt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="hoeheB" checked={f.hoeheBekanntJa === (o === "Ja")} onChange={() => set("hoeheBekanntJa", o === "Ja")} />{o}</label>))}</div>
        </div>
        <Field label="12. Betrag in Euro" value={f.betrag} onChange={v => set("betrag", v)} />
        <div style={{ marginBottom: 6 }}>
          <div style={S.lbl}>13. Vorschuss benötigt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vorschuss" checked={f.vorschussJa === (o === "Ja")} onChange={() => set("vorschussJa", o === "Ja")} />{o}</label>))}</div>
        </div>
        {f.vorschussJa && <Field label="14. Vorschuss-Betrag" value={f.vorschussBetrag} onChange={v => set("vorschussBetrag", v)} />}
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="D. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
