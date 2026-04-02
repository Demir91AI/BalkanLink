import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "anlage-eks-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/anlage-eks_ba015344.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", bgNummer: "",
  bVorname: "", bNachname: "", bGeburtsdatum: "",
  vorlaeufig: true, bewZeitraumVon: "", bewZeitraumBis: "",
  firmenname: "", fStrasse: "", fNr: "", fPlz: "", fOrt: "",
  gewerbe: "", beginn: "", rechtsform: "",
  einnahmenA1: "", privatentnahmenA2: "", umsatzsteuerA5: "",
  raumkostenB3: "", versicherungenB4: "", werbungB5: "",
  telefonB11: "", vorsteuerB17: "", umsatzsteuerFaB18: "",
  sigDatum: "", sigDatumSelbst: "",
});

export default function AnlageEKSMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="eks-root" title="Anlage EKS — Einkommen Selbständige" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Antragstellende Person" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="BG-Nummer" value={f.bgNummer} onChange={v => set("bgNummer", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Selbständige Person" />
        <div style={S.row}><Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} /><Field label="Nachname" value={f.bNachname} onChange={v => set("bNachname", v)} /><Field label="Geburtsdatum" type="date" value={f.bGeburtsdatum} onChange={v => set("bGeburtsdatum", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Vorläufig oder Abschließend" />
        <div style={{ display: "flex", gap: 16 }}>
          <label style={S.chk}><input type="radio" name="art" checked={f.vorlaeufig} onChange={() => set("vorlaeufig", true)} /> Vorläufig</label>
          <label style={S.chk}><input type="radio" name="art" checked={!f.vorlaeufig} onChange={() => set("vorlaeufig", false)} /> Abschließend</label>
        </div>
        <div style={S.row}><Field label="Bewilligungszeitraum von" value={f.bewZeitraumVon} onChange={v => set("bewZeitraumVon", v)} /><Field label="bis" value={f.bewZeitraumBis} onChange={v => set("bewZeitraumBis", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Firmendaten" />
        <Field label="Firmenname" value={f.firmenname} onChange={v => set("firmenname", v)} />
        <div style={S.row}><Field label="Straße" value={f.fStrasse} onChange={v => set("fStrasse", v)} /><Field label="Nr." value={f.fNr} onChange={v => set("fNr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.fPlz} onChange={v => set("fPlz", v)} /><Field label="Ort" value={f.fOrt} onChange={v => set("fOrt", v)} /></div>
        <div style={S.row}><Field label="Gewerbe" value={f.gewerbe} onChange={v => set("gewerbe", v)} /><Field label="Beginn" value={f.beginn} onChange={v => set("beginn", v)} /><Field label="Rechtsform" value={f.rechtsform} onChange={v => set("rechtsform", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="Tabelle A — Einnahmen (monatlich)" />
        <div style={S.row}><Field label="A1 Betriebseinnahmen (€)" value={f.einnahmenA1} onChange={v => set("einnahmenA1", v)} /><Field label="A2 Privatentnahmen (€)" value={f.privatentnahmenA2} onChange={v => set("privatentnahmenA2", v)} /><Field label="A5.1 Umsatzsteuer (€)" value={f.umsatzsteuerA5} onChange={v => set("umsatzsteuerA5", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="Tabelle B — Ausgaben (monatlich)" />
        <div style={S.row}><Field label="B3 Raumkosten (€)" value={f.raumkostenB3} onChange={v => set("raumkostenB3", v)} /><Field label="B4 Versicherungen (€)" value={f.versicherungenB4} onChange={v => set("versicherungenB4", v)} /><Field label="B5 Werbung (€)" value={f.werbungB5} onChange={v => set("werbungB5", v)} /></div>
        <div style={S.row}><Field label="B11 Telefon (€)" value={f.telefonB11} onChange={v => set("telefonB11", v)} /><Field label="B17 Vorsteuer (€)" value={f.vorsteuerB17} onChange={v => set("vorsteuerB17", v)} /><Field label="B18 USt ans FA (€)" value={f.umsatzsteuerFaB18} onChange={v => set("umsatzsteuerFaB18", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={7} title="Unterschriften" />
        <Signature label="Unterschrift Antragsteller" />
        <Signature label="Unterschrift Selbständige Person" />
      </div>
    </MusterFormBase>
  );
}
