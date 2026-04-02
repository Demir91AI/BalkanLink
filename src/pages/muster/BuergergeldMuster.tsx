import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "buergergeld-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/datei/ba012914.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", steuerId: "", svNummer: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  weiterePersonen: "Nein",
  personen: Array.from({ length: 4 }, () => ({ name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", sonstigeVerwandtschaft: "", eigenesEinkommen: "", eigenesVermoegen: "" })),
  kaltmiete: "", nebenkosten: "", heizkosten: "", wohnflaeche: "", zimmer: "", eigentuemer: "",
  einkommen: "Nein", einkommenArt: "", sonstigesEinkommen: "", einkommenBrutto: "", einkommenNetto: "",
  vermoegen: "", vermoegenArtWert: "",
  erwerbstaetig: "", arbeitgeber: "", wochenstunden: "", erwerbSeit: "",
  arbeitssuchend: "", schulabschluss: "", berufsausbildung: "",
  jobcenter: "", sigOrt: "", sigDatum: "",
});

export default function BuergergeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setPerson = (i: number, k: string, v: string) => setF(p => { const ps = [...p.personen]; ps[i] = { ...ps[i], [k]: v }; return { ...p, personen: ps }; });

  return (
    <MusterFormBase rootId="bg-root" title="Antrag auf Bürgergeld" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Sozialversicherungsnummer" value={f.svNummer} onChange={v => set("svNummer", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber/in" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Bedarfsgemeinschaft" />
        <div><div style={S.lbl}>Weitere Personen in der Wohnung?</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="weiterePersonen" checked={f.weiterePersonen === o} onChange={() => set("weiterePersonen", o)} />{o}</label>))}</div>
        </div>
        {f.weiterePersonen === "Ja" && f.personen.map((p, i) => (
          <div key={i} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: i < 3 ? "1px dashed #d1d5db" : "none" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Person {i + 1}</div>
            <div style={S.row}><Field label="Familienname" value={p.name} onChange={v => setPerson(i, "name", v)} /><Field label="Vorname" value={p.vorname} onChange={v => setPerson(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={p.geburtsdatum} onChange={v => setPerson(i, "geburtsdatum", v)} /></div>
            <div style={{ marginBottom: 6 }}><div style={S.lbl}>Verwandtschaft</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Ehepartner/in", "Kind", "Sonstige"].map(v => (
                  <label key={v} style={S.chk}><input type="radio" name={`verwandtschaft${i}`} checked={p.verwandtschaft === v} onChange={() => setPerson(i, "verwandtschaft", v)} />{v}</label>
                ))}
              </div>
              {p.verwandtschaft === "Sonstige" && <input style={{ ...S.inp, width: "100%", marginTop: 4 }} placeholder="Bitte angeben..." value={p.sonstigeVerwandtschaft} onChange={e => setPerson(i, "sonstigeVerwandtschaft", e.target.value)} />}
            </div>
            <div style={S.row}>
              <div style={{ flex: 1 }}><div style={S.lbl}>Eigenes Einkommen?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`eigenesEinkommen${i}`} checked={p.eigenesEinkommen === o} onChange={() => setPerson(i, "eigenesEinkommen", o)} />{o}</label>))}</div></div>
              <div style={{ flex: 1 }}><div style={S.lbl}>Eigenes Vermögen?</div><div style={{ display: "flex", gap: 12 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name={`eigenesVermoegen${i}`} checked={p.eigenesVermoegen === o} onChange={() => setPerson(i, "eigenesVermoegen", o)} />{o}</label>))}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Wohnsituation" />
        <div style={S.row}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Betriebskosten / Nebenkosten (€/Monat)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Anzahl Zimmer" value={f.zimmer} onChange={v => set("zimmer", v)} /></div>
        <div><div style={S.lbl}>Wohnungseigentümer/in?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="eigentuemer" checked={f.eigentuemer === o} onChange={() => set("eigentuemer", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Einkommen und Vermögen" />
        <div><div style={S.lbl}>Aktuell Einkommen?</div><div style={{ display: "flex", gap: 16, marginBottom: 8 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="einkommen" checked={f.einkommen === o} onChange={() => set("einkommen", o)} />{o}</label>))}</div></div>
        {f.einkommen === "Ja" && (<>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Art</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["Arbeitslohn", "Rente", "Kindergeld", "Unterhalt", "Sonstiges"].map(a => (
                <label key={a} style={S.chk}><input type="radio" name="einkommenArt" checked={f.einkommenArt === a} onChange={() => set("einkommenArt", a)} />{a}</label>
              ))}
            </div>
            {f.einkommenArt === "Sonstiges" && <input style={{ ...S.inp, width: "100%", marginTop: 4 }} placeholder="Bitte angeben..." value={f.sonstigesEinkommen} onChange={e => set("sonstigesEinkommen", e.target.value)} />}
          </div>
          <div style={S.row}><Field label="Betrag brutto (€/Monat)" value={f.einkommenBrutto} onChange={v => set("einkommenBrutto", v)} /><Field label="Betrag netto (€/Monat)" value={f.einkommenNetto} onChange={v => set("einkommenNetto", v)} /></div>
        </>)}
        <div style={{ marginTop: 8 }}><div style={S.lbl}>Vermögen vorhanden (über 15.000 €)?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vermoegen" checked={f.vermoegen === o} onChange={() => set("vermoegen", o)} />{o}</label>))}</div></div>
        {f.vermoegen === "Ja" && <div style={{ ...S.row, marginTop: 6 }}><Field label="Art und Wert des Vermögens" value={f.vermoegenArtWert} onChange={v => set("vermoegenArtWert", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Beschäftigung und Ausbildung" />
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Aktuell erwerbstätig?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erwerbstaetig" checked={f.erwerbstaetig === o} onChange={() => set("erwerbstaetig", o)} />{o}</label>))}</div></div>
        </div>
        {f.erwerbstaetig === "Ja" && (
          <div style={S.row}><Field label="Arbeitgeber" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="Wochenstunden" value={f.wochenstunden} onChange={v => set("wochenstunden", v)} /><Field label="Seit (Datum)" type="date" value={f.erwerbSeit} onChange={v => set("erwerbSeit", v)} /></div>
        )}
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Arbeitssuchend beim Jobcenter gemeldet?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="arbeitssuchend" checked={f.arbeitssuchend === o} onChange={() => set("arbeitssuchend", o)} />{o}</label>))}</div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Höchster Schulabschluss</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["Kein", "Hauptschule", "Realschule", "Abitur", "Sonstiges"].map(a => (<label key={a} style={S.chk}><input type="radio" name="schulabschluss" checked={f.schulabschluss === a} onChange={() => set("schulabschluss", a)} />{a}</label>))}</div>
        </div>
        <div><div style={S.lbl}>Berufsausbildung</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["Keine", "Abgeschlossen", "In Ausbildung", "In Studium"].map(a => (<label key={a} style={S.chk}><input type="radio" name="berufsausbildung" checked={f.berufsausbildung === a} onChange={() => set("berufsausbildung", a)} />{a}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</p>
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Jobcenter" value={f.jobcenter} onChange={v => set("jobcenter", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
