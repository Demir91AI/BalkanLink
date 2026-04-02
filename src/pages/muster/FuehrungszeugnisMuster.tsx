import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "fuehrungszeugnis-muster-data";
const PDF_URL = "https://www.bundesjustizamt.de/DE/Themen/Buergerdienste/Fuehrungszeugnis";

const initial = () => ({
  familienname: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geburtsland: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "",
  art: "",
  zweck: "", sonstigerZweck: "", vorlageBei: "",
  zahlungsart: "", iban: "",
  meldebehoerde: "", sigOrt: "", sigDatum: "",
});

export default function FuehrungszeugnisMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="fz-root" title="Antrag auf Erteilung eines Führungszeugnisses" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Mehr Infos beim Bundesjustizamt →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Meldebehörde einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname(n)" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Art des Führungszeugnisses" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Führungszeugnis zur Vorlage bei einer Behörde",
            "Führungszeugnis zur Vorlage bei einem privaten Arbeitgeber",
            "Europäisches Führungszeugnis",
            "Erweitertes Führungszeugnis (Tätigkeiten mit Kindern/Jugendlichen)",
          ].map(a => (<label key={a} style={S.chk}><input type="radio" name="art" checked={f.art === a} onChange={() => set("art", a)} />{a}</label>))}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Verwendungszweck" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          {["Bewerbung / Arbeit", "Ehrenamtliche Tätigkeit mit Kindern", "Ausländerbehörde / Aufenthaltstitel"].map(z => (
            <label key={z} style={S.chk}><input type="radio" name="zweck" checked={f.zweck === z} onChange={() => set("zweck", z)} />{z}</label>
          ))}
          <label style={S.chk}><input type="radio" name="zweck" checked={f.zweck === "Sonstiges"} onChange={() => set("zweck", "Sonstiges")} />Sonstiges:</label>
          {f.zweck === "Sonstiges" && <input style={{ ...S.inp, width: "100%" }} value={f.sonstigerZweck} onChange={e => set("sonstigerZweck", e.target.value)} />}
        </div>
        <div style={S.row}><Field label="Vorlage bei (Behörde / Firma)" value={f.vorlageBei} onChange={v => set("vorlageBei", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Gebühren" />
        <div style={{ fontSize: 10, marginBottom: 8, color: "#374151" }}>Gebühr: <strong>13,00 €</strong></div>
        <div><div style={S.lbl}>Zahlungsart</div><div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["SEPA-Lastschrift", "Überweisung"].map(z => (<label key={z} style={S.chk}><input type="radio" name="zahlungsart" checked={f.zahlungsart === z} onChange={() => set("zahlungsart", z)} />{z}</label>))}</div></div>
        {f.zahlungsart === "SEPA-Lastschrift" && <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN (für SEPA)</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständige Meldebehörde" value={f.meldebehoerde} onChange={v => set("meldebehoerde", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
