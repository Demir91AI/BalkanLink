import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "arbeitslosengeld-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", steuerId: "", svNummer: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  arbeitgeber: "", agStrasse: "", agPlz: "", agOrt: "",
  beschaeftigungBeginn: "", beschaeftigungEnde: "", grundBeendigung: "", sonstigerGrund: "",
  bruttomonatslohn: "", wochenstunden: "", berufsbezeichnung: "",
  weitereAG: "Nein",
  ag2Name: "", ag2Von: "", ag2Bis: "", ag2Brutto: "",
  ag3Name: "", ag3Von: "", ag3Bis: "", ag3Brutto: "",
  sofortArbeitsfaehig: "", arbeitsbereitAb: "",
  vollzeit: "", maxWochenstunden: "",
  einschraenkungen: "", schwerbehinderung: "", gdb: "", ausweisNr: "",
  algFrueher: "", algVon: "", algBis: "", algAgentur: "",
  krankengeld: "", mutterschaftsgeld: "", sperrzeit: "",
  agentur: "", sigOrt: "", sigDatum: "",
});

export default function ArbeitslosengeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="alg-root" title="Antrag auf Arbeitslosengeld (ALG I)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der Agentur für Arbeit einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Sozialversicherungsnummer (XX XXXXXX X XXX X)" value={f.svNummer} onChange={v => set("svNummer", v)} /><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber/in" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Letzte Beschäftigung" />
        <div style={S.row}><Field label="Name des Arbeitgebers" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /></div>
        <div style={S.row}><Field label="Anschrift: Straße, Hausnr." flex={2} value={f.agStrasse} onChange={v => set("agStrasse", v)} /><Field label="PLZ" width={80} value={f.agPlz} onChange={v => set("agPlz", v)} /><Field label="Ort" flex={1} value={f.agOrt} onChange={v => set("agOrt", v)} /></div>
        <div style={S.row}><Field label="Beginn der Beschäftigung" type="date" value={f.beschaeftigungBeginn} onChange={v => set("beschaeftigungBeginn", v)} /><Field label="Ende der Beschäftigung" type="date" value={f.beschaeftigungEnde} onChange={v => set("beschaeftigungEnde", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Grund der Beendigung</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Kündigung durch Arbeitgeber", "Eigenkündigung", "Aufhebungsvertrag (einvernehmlich)", "Ablauf der Befristung"].map(g => (
              <label key={g} style={S.chk}><input type="radio" name="grundBeendigung" checked={f.grundBeendigung === g} onChange={() => set("grundBeendigung", g)} />{g}</label>
            ))}
            <label style={S.chk}><input type="radio" name="grundBeendigung" checked={f.grundBeendigung === "Sonstiges"} onChange={() => set("grundBeendigung", "Sonstiges")} /><TOpt value="Sonstiger Grund:" /></label>
            {f.grundBeendigung === "Sonstiges" && <input style={{ ...S.inp, width: "100%" }} value={f.sonstigerGrund} onChange={e => set("sonstigerGrund", e.target.value)} />}
          </div>
        </div>
        <div style={S.row}><Field label="Letzter Bruttolohn (€/Monat)" value={f.bruttomonatslohn} onChange={v => set("bruttomonatslohn", v)} /><Field label="Wochenstunden zuletzt" value={f.wochenstunden} onChange={v => set("wochenstunden", v)} /></div>
        <div style={S.row}><Field label="Berufsbezeichnung / Tätigkeit" value={f.berufsbezeichnung} onChange={v => set("berufsbezeichnung", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Weitere Beschäftigungen (letzte 2 Jahre)" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Weitere Arbeitgeber in den letzten 2 Jahren?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="weitereAG" checked={f.weitereAG === o} onChange={() => set("weitereAG", o)} />{o}</label>))}</div>
        </div>
        {f.weitereAG === "Ja" && (<>
          <div style={S.row}><Field label="Arbeitgeber 2" value={f.ag2Name} onChange={v => set("ag2Name", v)} /><Field label="von" type="date" value={f.ag2Von} onChange={v => set("ag2Von", v)} /><Field label="bis" type="date" value={f.ag2Bis} onChange={v => set("ag2Bis", v)} /><Field label="Brutto (€)" value={f.ag2Brutto} onChange={v => set("ag2Brutto", v)} /></div>
          <div style={S.row}><Field label="Arbeitgeber 3" value={f.ag3Name} onChange={v => set("ag3Name", v)} /><Field label="von" type="date" value={f.ag3Von} onChange={v => set("ag3Von", v)} /><Field label="bis" type="date" value={f.ag3Bis} onChange={v => set("ag3Bis", v)} /><Field label="Brutto (€)" value={f.ag3Brutto} onChange={v => set("ag3Brutto", v)} /></div>
        </>)}
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Verfügbarkeit und Gesundheit" />
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Sofort arbeitsfähig und arbeitsbereit?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="sofortArbeitsfaehig" checked={f.sofortArbeitsfaehig === o} onChange={() => set("sofortArbeitsfaehig", o)} />{o}</label>))}</div></div>
        </div>
        <div style={S.row}><Field label="Arbeitsbereit ab (Datum)" type="date" value={f.arbeitsbereitAb} onChange={v => set("arbeitsbereitAb", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Vollzeit verfügbar?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vollzeit" checked={f.vollzeit === o} onChange={() => set("vollzeit", o)} />{o}</label>))}</div>
          {f.vollzeit === "Nein" && <div style={{ ...S.row, marginTop: 4 }}><Field label="Max. Wochenstunden" width={100} value={f.maxWochenstunden} onChange={v => set("maxWochenstunden", v)} /></div>}
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Körperliche Einschränkungen?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="einschraenkungen" checked={f.einschraenkungen === o} onChange={() => set("einschraenkungen", o)} />{o}</label>))}</div></div>
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Schwerbehinderung?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="schwerbehinderung" checked={f.schwerbehinderung === o} onChange={() => set("schwerbehinderung", o)} />{o}</label>))}</div></div>
          {f.schwerbehinderung === "Ja" && <><Field label="GdB" width={60} value={f.gdb} onChange={v => set("gdb", v)} /><Field label="Ausweis-Nr." value={f.ausweisNr} onChange={v => set("ausweisNr", v)} /></>}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Leistungen und Vorgeschichte" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>ALG früher bezogen?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="algFrueher" checked={f.algFrueher === o} onChange={() => set("algFrueher", o)} />{o}</label>))}</div>
          {f.algFrueher === "Ja" && <div style={{ ...S.row, marginTop: 4 }}><Field label="von" type="date" value={f.algVon} onChange={v => set("algVon", v)} /><Field label="bis" type="date" value={f.algBis} onChange={v => set("algBis", v)} /><Field label="bei Agentur für Arbeit" value={f.algAgentur} onChange={v => set("algAgentur", v)} /></div>}
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Krankengeld aktuell?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="krankengeld" checked={f.krankengeld === o} onChange={() => set("krankengeld", o)} />{o}</label>))}</div></div>
          <div style={{ flex: 1 }}><div style={S.lbl}>Mutterschaftsgeld?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="mutterschaftsgeld" checked={f.mutterschaftsgeld === o} onChange={() => set("mutterschaftsgeld", o)} />{o}</label>))}</div></div>
        </div>
        <div><div style={S.lbl}>Sperrzeit in den letzten 12 Monaten?</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="sperrzeit" checked={f.sperrzeit === o} onChange={() => set("sperrzeit", o)} />{o}</label>))}</div></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständige Agentur für Arbeit" value={f.agentur} onChange={v => set("agentur", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
