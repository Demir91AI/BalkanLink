import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-hg-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  vVorname: "", vNachname: "",
  bgPersonVorname: "", bgPersonNachname: "", verwandtschaft: "",
  finanziell: "nein", finWer: "", finBetrag: "", finWieOft: "",
  eigentuemer: "nein", kostenlos: "nein", monatKosten: "", gesamtKosten: "",
  sigDatum: "",
});

export default function AnlageHGMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  const Radio = ({ name, value }: { name: string; value: string }) => (
    <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o.toLowerCase()} onChange={() => set(name, o.toLowerCase())} />{o}</label>))}</div>
  );

  return (
    <MusterFormBase rootId="hg-root" title="Anlage HG — Haushaltsgemeinschaft" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-hg" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-hg"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage HG možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Verwandte/Verschwägerte Person" />
        <div style={S.row}><Field label="5. Vorname" value={f.vVorname} onChange={v => set("vVorname", v)} /><Field label="6. Nachname" value={f.vNachname} onChange={v => set("vNachname", v)} /></div>
        <div style={S.row}><Field label="7. BG-Person Vorname" value={f.bgPersonVorname} onChange={v => set("bgPersonVorname", v)} /><Field label="8. BG-Person Nachname" value={f.bgPersonNachname} onChange={v => set("bgPersonNachname", v)} /></div>
        <Field label="9. Verwandtschaftsverhältnis" value={f.verwandtschaft} onChange={v => set("verwandtschaft", v)} />
        <div style={{ marginTop: 8, marginBottom: 8 }}><div style={S.lbl}>10. Finanzielle Unterstützung?</div><Radio name="finanziell" value={f.finanziell} /></div>
        {f.finanziell === "ja" && <>
          <Field label="11. Wer erhält Unterstützung?" value={f.finWer} onChange={v => set("finWer", v)} />
          <div style={S.row}><Field label="12. Betrag" value={f.finBetrag} onChange={v => set("finBetrag", v)} /><Field label="13. Wie oft?" value={f.finWieOft} onChange={v => set("finWieOft", v)} /></div>
        </>}
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Angaben zur Unterkunft" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>15. Verwandte Person ist Eigentümer/Mieter?</div><Radio name="eigentuemer" value={f.eigentuemer} /></div>
        {f.eigentuemer === "ja" && <>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>18. Wohnen Sie kostenlos?</div><Radio name="kostenlos" value={f.kostenlos} /></div>
          {f.kostenlos === "nein" && <div style={S.row}>
            <Field label="19. Monatliche Kosten an Verwandte" value={f.monatKosten} onChange={v => set("monatKosten", v)} />
            <Field label="20. Gesamtkosten der Unterkunft" value={f.gesamtKosten} onChange={v => set("gesamtKosten", v)} />
          </div>}
        </>}
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
