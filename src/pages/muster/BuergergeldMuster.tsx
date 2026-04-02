import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "buergergeld-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/ba012914.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", steuerId: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  weiterePersonen: "Nein", personen: [{ name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", eigenesEinkommen: "" }, { name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", eigenesEinkommen: "" }, { name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", eigenesEinkommen: "" }],
  kaltmiete: "", nebenkosten: "", heizkosten: "", wohnflaeche: "", eigentuemer: "",
  einkommen: "Nein", einkommenArt: "", einkommenBetrag: "", vermoegen: "",
  erwerbstaetig: "", arbeitssuchend: "", schulabschluss: "", berufsausbildung: "",
  sigOrt: "", sigDatum: "",
});

export default function BuergergeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setPerson = (i: number, k: string, v: string) => setF(p => { const ps = [...p.personen]; ps[i] = { ...ps[i], [k]: v }; return { ...p, personen: ps }; });

  return (
    <MusterFormBase rootId="bg-root" title="Antrag auf Bürgergeld" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Bedarfsgemeinschaft" />
        <div><div style={S.lbl}>Weitere Personen im Haushalt?</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="weiterePersonen" checked={f.weiterePersonen === o} onChange={() => set("weiterePersonen", o)} />{o}</label>))}</div>
        </div>
        {f.weiterePersonen === "Ja" && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead><tr>{["Name", "Vorname", "Geburtsdatum", "Verwandtschaft", "Eigenes Einkommen?"].map(h => (<th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>))}</tr></thead>
            <tbody>{f.personen.map((p, i) => (<tr key={i}>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={p.name} onChange={e => setPerson(i, "name", e.target.value)} /></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={p.vorname} onChange={e => setPerson(i, "vorname", e.target.value)} /></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={p.geburtsdatum} onChange={e => setPerson(i, "geburtsdatum", e.target.value)} /></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><select style={{ ...S.inp, border: "none" }} value={p.verwandtschaft} onChange={e => setPerson(i, "verwandtschaft", e.target.value)}><option value="">—</option><option value="Ehepartner">Ehepartner</option><option value="Kind">Kind</option><option value="Sonstige">Sonstige</option></select></td>
              <td style={{ border: "1px solid #9ca3af", padding: 2 }}><select style={{ ...S.inp, border: "none" }} value={p.eigenesEinkommen} onChange={e => setPerson(i, "eigenesEinkommen", e.target.value)}><option value="">—</option><option value="Ja">Ja</option><option value="Nein">Nein</option></select></td>
            </tr>))}</tbody>
          </table>
        )}
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Wohnsituation" />
        <div style={S.row}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Nebenkosten (€/Monat)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /></div>
        <div><div style={S.lbl}>Wohnungseigentümer?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="eigentuemer" checked={f.eigentuemer === o} onChange={() => set("eigentuemer", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Einkommen und Vermögen" />
        <div><div style={S.lbl}>Aktuell Einkommen?</div><div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="einkommen" checked={f.einkommen === o} onChange={() => set("einkommen", o)} />{o}</label>))}</div></div>
        {f.einkommen === "Ja" && (<>
          <div><div style={S.lbl}>Art</div><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>{["Arbeitslohn", "Rente", "Kindergeld", "Unterhalt", "Sonstiges"].map(a => (<label key={a} style={S.chk}><input type="checkbox" checked={f.einkommenArt === a} onChange={() => set("einkommenArt", a)} />{a}</label>))}</div></div>
          <div style={S.row}><Field label="Betrag (€/Monat)" value={f.einkommenBetrag} onChange={v => set("einkommenBetrag", v)} /></div>
        </>)}
        <div><div style={S.lbl}>Vermögen über 15.000 €?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vermoegen" checked={f.vermoegen === o} onChange={() => set("vermoegen", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Beschäftigung" />
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Aktuell erwerbstätig?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erwerbstaetig" checked={f.erwerbstaetig === o} onChange={() => set("erwerbstaetig", o)} />{o}</label>))}</div></div>
          <div style={{ flex: 1 }}><div style={S.lbl}>Arbeitssuchend gemeldet?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="arbeitssuchend" checked={f.arbeitssuchend === o} onChange={() => set("arbeitssuchend", o)} />{o}</label>))}</div></div>
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Schulabschluss</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["kein", "Hauptschule", "Realschule", "Abitur"].map(a => (<label key={a} style={S.chk}><input type="radio" name="schulabschluss" checked={f.schulabschluss === a} onChange={() => set("schulabschluss", a)} />{a}</label>))}</div></div>
        </div>
        <div><div style={S.lbl}>Berufsausbildung</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["keine", "abgeschlossen", "in Ausbildung"].map(a => (<label key={a} style={S.chk}><input type="radio" name="berufsausbildung" checked={f.berufsausbildung === a} onChange={() => set("berufsausbildung", a)} />{a}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</p>
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
      </div>

    </MusterFormBase>
  );
}
