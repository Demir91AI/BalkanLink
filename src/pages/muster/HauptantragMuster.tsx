import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "hauptantrag-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/antrag-arbeitslosengeld-2_ba012907.pdf";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", geburtsname: "", geburtsort: "", geburtsland: "",
  staatsangehoerigkeit: "", geschlecht: "weiblich",
  strasse: "", nr: "", plz: "", ort: "",
  telefon: "", festerWohnsitz: "nein",
  kontoinhaber: "", iban: "",
  rentenversNr: "", steuerIdNr: "", betreuer: "nein",
  aufenthalt: "nein", abSofort: true,
  familienstand: "verheiratet", erwerbsfaehig: "ja", alleinerziehend: "nein",
  schwanger: "nein", schueler: "nein", andereLeistungen: "nein",
  gkvJa: true, krankenkasse: "", pkvJa: false,
  alleinWohnend: "nein",
  sigDatum: "",
});

export default function HauptantragMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ha-root" title="Hauptantrag Bürgergeld (HA)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Jobcenter herunterladen →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /><Field label="Geschlecht" value={f.geschlecht} onChange={v => set("geschlecht", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.strasse} onChange={v => set("strasse", v)} /><Field label="Nr." value={f.nr} onChange={v => set("nr", v)} /></div>
        <div style={S.row}><Field label="PLZ" value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
        <Field label="Telefon (freiwillig)" value={f.telefon} onChange={v => set("telefon", v)} />
        <Field label="Kontoinhaberin" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} />
        <Field label="IBAN" value={f.iban} onChange={v => set("iban", v)} />
        <div style={S.row}><Field label="Rentenvers.-Nr." value={f.rentenversNr} onChange={v => set("rentenversNr", v)} /><Field label="Steuer-ID" value={f.steuerIdNr} onChange={v => set("steuerIdNr", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="C. Antragsdatum" />
        <div><label style={S.chk}><input type="checkbox" checked={f.abSofort} onChange={() => set("abSofort", !f.abSofort)} /> Ab sofort</label></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="D. Lebenssituation" />
        <Field label="Familienstand" value={f.familienstand} onChange={v => set("familienstand", v)} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 6 }}>
          {[["Erwerbsfähig", "erwerbsfaehig"], ["Alleinerziehend", "alleinerziehend"], ["Schwanger", "schwanger"], ["Schüler/Student", "schueler"]].map(([l, k]) => (
            <div key={k}>
              <div style={S.lbl}>{l}</div>
              <div style={{ display: "flex", gap: 8 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={k} checked={f[k as keyof typeof f] === o} onChange={() => set(k, o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="F. Krankenversicherung" />
        <div style={{ display: "flex", gap: 16, marginBottom: 6 }}>
          <label style={S.chk}><input type="radio" name="kv" checked={f.gkvJa} onChange={() => { set("gkvJa", true); set("pkvJa", false); }} /> GKV pflichtversichert</label>
          <label style={S.chk}><input type="radio" name="kv" checked={f.pkvJa} onChange={() => { set("pkvJa", true); set("gkvJa", false); }} /> Privatversichert</label>
        </div>
        <Field label="Krankenkasse" value={f.krankenkasse} onChange={v => set("krankenkasse", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="G. Wohnsituation" />
        <div>
          <div style={S.lbl}>Allein wohnend?</div>
          <div style={{ display: "flex", gap: 16 }}>{["ja", "nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="allein" checked={f.alleinWohnend === o} onChange={() => set("alleinWohnend", o)} /> {o === "ja" ? "Ja" : "Nein"}</label>))}</div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="I. Unterschrift" />
        <Signature label="Datum, Unterschrift" />
      </div>
    </MusterFormBase>
  );
}
