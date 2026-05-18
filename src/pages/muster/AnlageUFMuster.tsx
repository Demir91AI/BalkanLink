import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-uf-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/buergergeld";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  gVorname: "", gNachname: "", gGeburtsdatum: "", krankenkasse: "", kvNummer: "", rvTraeger: "", rvNummer: "",
  unfallTag: "", unfallOrt: "", schadensnummer: "",
  sVorname: "", sNachname: "", sStrasse: "", sPLZ: "", sOrt: "", versicherer: "",
  verfahrenLaeuft: "nein", anwalt: "nein", anwaltName: "",
  verletzungen: "", gutachtenVorhanden: "nein",
  polizeiAufgenommen: "nein", strafverfahren: "nein",
  unfallart: "verkehr",
  sigDatum: "",
});

export default function AnlageUFMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  const Radio = ({ name, value }: { name: string; value: string }) => (
    <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o.toLowerCase()} onChange={() => set(name, o.toLowerCase())} />{o}</label>))}</div>
  );

  return (
    <MusterFormBase rootId="uf-root" title="Anlage UF — Unfallfragebogen" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="anlage-uf" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="anlage-uf"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Ova Anlage ima autofill u sklopu Bürgergeld Musterformulara</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Popunjeni PDF za Anlage UF možeš preuzeti direktno sa <strong>Bürgergeld Musterformular</strong> stranice — upiši svoje podatke tamo, pa klikni dugme za konkretnu Anlagu u donjem gridu. Ovdje možeš proučiti polja kao pripremu.</div>
        <a href="/musterformular/buergergeld" style={{ display: "inline-block", background: "#15803d", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>📋 Idi na Bürgergeld Musterformular →</a>
      </div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Geschädigte Person" />
        <div style={S.row}><Field label="Vorname" value={f.gVorname} onChange={v => set("gVorname", v)} /><Field label="Nachname" value={f.gNachname} onChange={v => set("gNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.gGeburtsdatum} onChange={v => set("gGeburtsdatum", v)} /></div>
        <div style={S.row}><Field label="Krankenkasse" value={f.krankenkasse} onChange={v => set("krankenkasse", v)} /><Field label="KV-Nummer" value={f.kvNummer} onChange={v => set("kvNummer", v)} /></div>
        <div style={S.row}><Field label="Rentenversicherungsträger" value={f.rvTraeger} onChange={v => set("rvTraeger", v)} /><Field label="RV-Nummer" value={f.rvNummer} onChange={v => set("rvNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Unfalldaten" />
        <div style={S.row}><Field label="12. Tag des Unfalls" type="date" value={f.unfallTag} onChange={v => set("unfallTag", v)} /><Field label="14. Schadensnummer" value={f.schadensnummer} onChange={v => set("schadensnummer", v)} /></div>
        <Field label="13. Ort des Unfalls" value={f.unfallOrt} onChange={v => set("unfallOrt", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Schädiger" />
        <div style={S.row}><Field label="Vorname" value={f.sVorname} onChange={v => set("sVorname", v)} /><Field label="Nachname" value={f.sNachname} onChange={v => set("sNachname", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.sStrasse} onChange={v => set("sStrasse", v)} /><Field label="PLZ" width={80} value={f.sPLZ} onChange={v => set("sPLZ", v)} /><Field label="Ort" value={f.sOrt} onChange={v => set("sOrt", v)} /></div>
        <Field label="Haftpflichtversicherer" value={f.versicherer} onChange={v => set("versicherer", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Schadensersatz & F. Verletzungen" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>27. Schadensersatzverfahren läuft?</div><Radio name="verfahrenLaeuft" value={f.verfahrenLaeuft} /></div>
        {f.verfahrenLaeuft === "ja" && <>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Anwaltliche Vertretung?</div><Radio name="anwalt" value={f.anwalt} /></div>
          {f.anwalt === "ja" && <Field label="Name des Anwalts" value={f.anwaltName} onChange={v => set("anwaltName", v)} />}
        </>}
        <Field label="36. Beschreibung der Verletzungen" value={f.verletzungen} onChange={v => set("verletzungen", v)} />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>37. Ärztliches Gutachten vorhanden?</div><Radio name="gutachtenVorhanden" value={f.gutachtenVorhanden} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="G. Polizei & H. Unfallart" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>38. Polizeilich aufgenommen?</div><Radio name="polizeiAufgenommen" value={f.polizeiAufgenommen} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>39. Strafverfahren?</div><Radio name="strafverfahren" value={f.strafverfahren} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>40. Art des Unfalls</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[["arbeit", "Arbeitsunfall"], ["verkehr", "Verkehrsunfall"], ["sonstig", "Sonstiges"]].map(([k, l]) => (
              <label key={k} style={S.chk}><input type="radio" name="unfallart" checked={f.unfallart === k} onChange={() => set("unfallart", k)} /> {l}</label>
            ))}
          </div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={7} title="L. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
