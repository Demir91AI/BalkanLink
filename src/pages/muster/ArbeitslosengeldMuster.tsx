import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "arbeitslosengeld-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/ba013384.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", steuerId: "", svNummer: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  arbeitgeber: "", agAnschrift: "", beschaeftigungBeginn: "", beschaeftigungEnde: "", grundBeendigung: "", bruttomonatslohn: "", wochenstunden: "",
  arbeitsbereitAb: "", einschraenkungen: "", schwerbehinderung: "", gdb: "",
  algFrueher: "", algVon: "", algBis: "", krankengeld: "", mutterschaftsgeld: "",
  sigOrt: "", sigDatum: "",
});

export default function ArbeitslosengeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="alg-root" title="Antrag auf Arbeitslosengeld" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der Agentur für Arbeit einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Sozialversicherungsnummer" value={f.svNummer} onChange={v => set("svNummer", v)} /><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Letzte Beschäftigung" />
        <div style={S.row}><Field label="Letzter Arbeitgeber: Firma" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /></div>
        <div style={S.row}><Field label="Anschrift des Arbeitgebers" value={f.agAnschrift} onChange={v => set("agAnschrift", v)} /></div>
        <div style={S.row}><Field label="Beginn der Beschäftigung" type="date" value={f.beschaeftigungBeginn} onChange={v => set("beschaeftigungBeginn", v)} /><Field label="Ende der Beschäftigung" type="date" value={f.beschaeftigungEnde} onChange={v => set("beschaeftigungEnde", v)} /></div>
        <div><div style={S.lbl}>Grund der Beendigung</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 8 }}>
            {["Kündigung durch Arbeitgeber", "Eigenkündigung", "Aufhebungsvertrag", "Ablauf Befristung"].map(g => (
              <label key={g} style={S.chk}><input type="radio" name="grundBeendigung" checked={f.grundBeendigung === g} onChange={() => set("grundBeendigung", g)} />{g}</label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Bruttomonatslohn zuletzt (€)" value={f.bruttomonatslohn} onChange={v => set("bruttomonatslohn", v)} /><Field label="Wochenstunden zuletzt" value={f.wochenstunden} onChange={v => set("wochenstunden", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Verfügbarkeit" />
        <div style={S.row}><Field label="Arbeitsbereit ab" type="date" value={f.arbeitsbereitAb} onChange={v => set("arbeitsbereitAb", v)} /></div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Einschränkungen der Arbeitsfähigkeit?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="einschraenkungen" checked={f.einschraenkungen === o} onChange={() => set("einschraenkungen", o)} />{o}</label>))}</div></div>
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Schwerbehinderung?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="schwerbehinderung" checked={f.schwerbehinderung === o} onChange={() => set("schwerbehinderung", o)} />{o}</label>))}</div></div>
          {f.schwerbehinderung === "Ja" && <Field label="GdB" width={80} value={f.gdb} onChange={v => set("gdb", v)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Vorherige Leistungen" />
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>ALG früher bezogen?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="algFrueher" checked={f.algFrueher === o} onChange={() => set("algFrueher", o)} />{o}</label>))}</div></div>
        </div>
        {f.algFrueher === "Ja" && <div style={S.row}><Field label="von" type="date" value={f.algVon} onChange={v => set("algVon", v)} /><Field label="bis" type="date" value={f.algBis} onChange={v => set("algBis", v)} /></div>}
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Krankengeld aktuell?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="krankengeld" checked={f.krankengeld === o} onChange={() => set("krankengeld", o)} />{o}</label>))}</div></div>
          <div style={{ flex: 1 }}><div style={S.lbl}>Mutterschaftsgeld?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="mutterschaftsgeld" checked={f.mutterschaftsgeld === o} onChange={() => set("mutterschaftsgeld", o)} />{o}</label>))}</div></div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
