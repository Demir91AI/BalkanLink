import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "bafoeg-muster-data";
const PDF_URL = "https://www.bafög.de/de/formulare-533.php";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "",
  ausbildungsArt: "", schuleName: "", studiengang: "", immatrikuliertSeit: "", voraussichtlichesEnde: "", semester: "", ausbildungsort: "", ausbildungsortPlz: "",
  eigenesEinkommen: "", eigenesVermoegen: "", bafoegFrueher: "",
  eltern: [
    { name: "", vorname: "", geburtsdatum: "", anschrift: "", beruf: "", bruttojahreseinkommen: "", unterhalt: "" },
    { name: "", vorname: "", geburtsdatum: "", anschrift: "", beruf: "", bruttojahreseinkommen: "", unterhalt: "" },
  ],
  elternGetrennt: "",
  beiEltern: "", monatlicheMiete: "",
  amt: "", sigOrt: "", sigDatum: "",
});

export default function BafoegMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setEltern = (i: number, k: string, v: string) => setF(p => { const e = [...p.eltern]; e[i] = { ...e[i], [k]: v }; return { ...p, eltern: e }; });

  return (
    <MusterFormBase rootId="baf-root" title="Antrag auf Ausbildungsförderung (BAföG)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Amt für Ausbildungsförderung einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zur Ausbildung" />
        <div><div style={S.lbl}>Art</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>{["Hochschule", "Schule", "Berufsausbildung"].map(a => (<label key={a} style={S.chk}><input type="radio" name="ausbildungsArt" checked={f.ausbildungsArt === a} onChange={() => set("ausbildungsArt", a)} />{a}</label>))}</div></div>
        <div style={S.row}><Field label="Name der Schule / Hochschule" value={f.schuleName} onChange={v => set("schuleName", v)} /></div>
        <div style={S.row}><Field label="Studiengang / Fachrichtung" value={f.studiengang} onChange={v => set("studiengang", v)} /></div>
        <div style={S.row}><Field label="Immatrikuliert seit" type="date" value={f.immatrikuliertSeit} onChange={v => set("immatrikuliertSeit", v)} /><Field label="Voraussichtliches Ende" type="date" value={f.voraussichtlichesEnde} onChange={v => set("voraussichtlichesEnde", v)} /></div>
        <div style={S.row}><Field label="Semesterzahl / Ausbildungsjahr" value={f.semester} onChange={v => set("semester", v)} /></div>
        <div style={S.row}><Field label="Ausbildungsort PLZ" width={80} value={f.ausbildungsortPlz} onChange={v => set("ausbildungsortPlz", v)} /><Field label="Ort" flex={1} value={f.ausbildungsort} onChange={v => set("ausbildungsort", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Eigenes Einkommen und Vermögen" />
        <div style={S.row}><Field label="Eigenes Einkommen (€/Monat)" value={f.eigenesEinkommen} onChange={v => set("eigenesEinkommen", v)} /><Field label="Eigenes Vermögen (€)" value={f.eigenesVermoegen} onChange={v => set("eigenesVermoegen", v)} /></div>
        <div><div style={S.lbl}>BAföG früher erhalten?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="bafoegFrueher" checked={f.bafoegFrueher === o} onChange={() => set("bafoegFrueher", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Angaben zu den Eltern" />
        {f.eltern.map((e, i) => (
          <div key={i} style={{ marginBottom: 12, paddingBottom: 8, borderBottom: i === 0 ? "1px dashed #d1d5db" : "none" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Elternteil {i + 1}</div>
            <div style={S.row}><Field label="Name" value={e.name} onChange={v => setEltern(i, "name", v)} /><Field label="Vorname" value={e.vorname} onChange={v => setEltern(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={e.geburtsdatum} onChange={v => setEltern(i, "geburtsdatum", v)} /></div>
            <div style={S.row}><Field label="Anschrift" value={e.anschrift} onChange={v => setEltern(i, "anschrift", v)} /></div>
            <div style={S.row}><Field label="Beruf" value={e.beruf} onChange={v => setEltern(i, "beruf", v)} /><Field label="Bruttojahreseinkommen (€)" value={e.bruttojahreseinkommen} onChange={v => setEltern(i, "bruttojahreseinkommen", v)} /><Field label="Unterhalt (€/Monat)" value={e.unterhalt} onChange={v => setEltern(i, "unterhalt", v)} /></div>
          </div>
        ))}
        <div><div style={S.lbl}>Eltern getrennt / geschieden?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="elternGetrennt" checked={f.elternGetrennt === o} onChange={() => set("elternGetrennt", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Wohnsituation" />
        <div><div style={S.lbl}>Bei Eltern?</div><div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="beiEltern" checked={f.beiEltern === o} onChange={() => set("beiEltern", o)} />{o}</label>))}</div></div>
        {f.beiEltern === "Nein" && <div style={S.row}><Field label="Monatliche Miete (€)" value={f.monatlicheMiete} onChange={v => set("monatlicheMiete", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Amt für Ausbildungsförderung" value={f.amt} onChange={v => set("amt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
