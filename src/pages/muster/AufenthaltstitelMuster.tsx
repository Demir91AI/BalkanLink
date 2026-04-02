import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "aufenthaltstitel-muster-data";
const PDF_URL = "https://www.bamf.de/SharedDocs/Anlagen/DE/MigrationAufenthalt/Aufenthaltstitel/aufenthaltstitel-verlaengerung.html";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", geburtsland: "",
  staatsangehoerigkeit: "", steuerid: "",
  strasse: "", plz: "", ort: "",
  telefon: "", email: "",
  passNr: "", passAusgestellt: "", passGueltigBis: "", passArt: "",
  aktuellerTitel: "", aktuellerTitelBis: "", aktenzeichen: "",
  aufenthaltszweck: "", aufenthaltSeit: "",
  arbeitgeber: "", arbeitgeberAnschrift: "", taetigkeit: "", arbeitsvertragBis: "",
  bruttoEinkommen: "", erwerbstaetig: "",
  familienstand: "", ehepartnerName: "", ehepartnerGeb: "", ehepartnerStaatsa: "", ehepartnerAufenthaltstitel: "",
  kinderJa: "", kind1Name: "", kind1Geb: "", kind2Name: "", kind2Geb: "", kind3Name: "", kind3Geb: "",
  krankenversicherung: "", kvName: "", kvNummer: "",
  wohnflaeche: "", miete: "", mietvertragVorhanden: "",
  vorstrafe: "", ausweisungsgrund: "",
  sigOrt: "", sigDatum: "",
  auslaenderbehoerde: "",
});

export default function AufenthaltstitelMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="at-root" title="Antrag auf Verlängerung der Aufenthaltserlaubnis" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Infos zur Verlängerung (BAMF) →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Ausländerbehörde einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname(n)" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum (tt.mm.jjjj)" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerid} onChange={v => set("steuerid", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Reisedokument / Pass" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Dokumentart</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Reisepass", "Nationalpass", "Reiseausweis für Flüchtlinge", "Reiseausweis für Staatenlose", "Sonstiges"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="passArt" checked={f.passArt === o} onChange={() => set("passArt", o)} />{o}</label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Pass-/Ausweisnummer" value={f.passNr} onChange={v => set("passNr", v)} /><Field label="Ausgestellt am" type="date" value={f.passAusgestellt} onChange={v => set("passAusgestellt", v)} /><Field label="Gültig bis" type="date" value={f.passGueltigBis} onChange={v => set("passGueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Aktueller Aufenthaltstitel" />
        <div style={S.row}><Field label="Art des aktuellen Aufenthaltstitels" flex={2} value={f.aktuellerTitel} onChange={v => set("aktuellerTitel", v)} /><Field label="Gültig bis" type="date" value={f.aktuellerTitelBis} onChange={v => set("aktuellerTitelBis", v)} /></div>
        <div style={S.row}><Field label="Aktenzeichen der Ausländerbehörde" value={f.aktenzeichen} onChange={v => set("aktenzeichen", v)} /></div>
        <div style={S.row}>
          <div style={{ flex: 1 }}>
            <div style={S.lbl}>Aufenthaltszweck</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {["Erwerbstätigkeit (§ 18)", "Blaue Karte EU (§ 18g)", "Familiennachzug (§ 27–36)", "Studium / Ausbildung (§ 16–17)", "Humanitäre Gründe (§ 22–26)", "Sonstiges"].map(o => (
                <label key={o} style={S.chk}><input type="radio" name="aufenthaltszweck" checked={f.aufenthaltszweck === o} onChange={() => set("aufenthaltszweck", o)} />{o}</label>
              ))}
            </div>
          </div>
        </div>
        <div style={S.row}><Field label="In Deutschland aufhältig seit" type="date" value={f.aufenthaltSeit} onChange={v => set("aufenthaltSeit", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Erwerbstätigkeit / Lebensunterhalt" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Aktuell erwerbstätig?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erwerbstaetig" checked={f.erwerbstaetig === o} onChange={() => set("erwerbstaetig", o)} />{o}</label>))}</div>
        </div>
        {f.erwerbstaetig === "Ja" && <>
          <div style={S.row}><Field label="Arbeitgeber (Name)" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="Anschrift des Arbeitgebers" value={f.arbeitgeberAnschrift} onChange={v => set("arbeitgeberAnschrift", v)} /></div>
          <div style={S.row}><Field label="Tätigkeit / Beruf" value={f.taetigkeit} onChange={v => set("taetigkeit", v)} /><Field label="Arbeitsvertrag befristet bis" type="date" value={f.arbeitsvertragBis} onChange={v => set("arbeitsvertragBis", v)} /></div>
          <div style={S.row}><Field label="Monatliches Bruttoeinkommen (€)" value={f.bruttoEinkommen} onChange={v => set("bruttoEinkommen", v)} /></div>
        </>}
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Familienangehörige" />
        <div style={S.row}><Field label="Familienstand" value={f.familienstand} onChange={v => set("familienstand", v)} /></div>
        <div style={S.row}><Field label="Ehepartner/in — Name" value={f.ehepartnerName} onChange={v => set("ehepartnerName", v)} /><Field label="Geburtsdatum" type="date" value={f.ehepartnerGeb} onChange={v => set("ehepartnerGeb", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit Ehepartner/in" value={f.ehepartnerStaatsa} onChange={v => set("ehepartnerStaatsa", v)} /><Field label="Aufenthaltstitel Ehepartner/in" value={f.ehepartnerAufenthaltstitel} onChange={v => set("ehepartnerAufenthaltstitel", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Kinder im Haushalt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="kinderJa" checked={f.kinderJa === o} onChange={() => set("kinderJa", o)} />{o}</label>))}</div>
        </div>
        {f.kinderJa === "Ja" && <>
          <div style={S.row}><Field label="Kind 1 — Name" value={f.kind1Name} onChange={v => set("kind1Name", v)} /><Field label="Geburtsdatum" type="date" value={f.kind1Geb} onChange={v => set("kind1Geb", v)} /></div>
          <div style={S.row}><Field label="Kind 2 — Name" value={f.kind2Name} onChange={v => set("kind2Name", v)} /><Field label="Geburtsdatum" type="date" value={f.kind2Geb} onChange={v => set("kind2Geb", v)} /></div>
          <div style={S.row}><Field label="Kind 3 — Name" value={f.kind3Name} onChange={v => set("kind3Name", v)} /><Field label="Geburtsdatum" type="date" value={f.kind3Geb} onChange={v => set("kind3Geb", v)} /></div>
        </>}
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Krankenversicherung" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Art der Krankenversicherung</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Gesetzlich (GKV)", "Privat (PKV)", "Familienversichert"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="krankenversicherung" checked={f.krankenversicherung === o} onChange={() => set("krankenversicherung", o)} />{o}</label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Name der Krankenkasse" value={f.kvName} onChange={v => set("kvName", v)} /><Field label="Versichertennummer" value={f.kvNummer} onChange={v => set("kvNummer", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="Wohnsituation" />
        <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Monatliche Miete (€)" value={f.miete} onChange={v => set("miete", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Mietvertrag vorhanden?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="mietvertragVorhanden" checked={f.mietvertragVorhanden === o} onChange={() => set("mietvertragVorhanden", o)} />{o}</label>))}</div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="Zusätzliche Angaben" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Vorstrafen in Deutschland oder im Ausland?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vorstrafe" checked={f.vorstrafe === o} onChange={() => set("vorstrafe", o)} />{o}</label>))}</div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Liegen Ausweisungsgründe vor?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="ausweisungsgrund" checked={f.ausweisungsgrund === o} onChange={() => set("ausweisungsgrund", o)} />{o}</label>))}</div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={9} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift Antragsteller/in" /></div>
        <div style={S.row}><Field label="Zuständige Ausländerbehörde" value={f.auslaenderbehoerde} onChange={v => set("auslaenderbehoerde", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
