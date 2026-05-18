import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "integrationskurs-muster-data";
const PDF_URL = "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/Teilnehmer/antrag-zulass-integrationskurs.pdf";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "",
  deutschkenntnisse: "", muttersprache: "", weiteresprachen: "", leseSchreib: "",
  kursart: "",
  berechtigung: "", kostenbefreiung: "", nachweisKostenbefreiung: "", bescheidVorhanden: "",
  kursort: "", zeit: "", kinderbetreuung: "", anzahlKinder: "", alterKinder: "",
  sigOrt: "", sigDatum: "",
});

export default function IntegrationskursMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ik-root" title="Antrag auf Zulassung zum Integrationskurs" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim BAMF einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel: Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Sprachkenntnisse" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Deutschkenntnisse vorhanden?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Keine Kenntnisse", "Geringe Grundkenntnisse (unter A1)", "Grundkenntnisse A1", "Grundkenntnisse A2", "Mittelstufe B1"].map(d => (
              <label key={d} style={S.chk}><input type="radio" name="deutschkenntnisse" checked={f.deutschkenntnisse === d} onChange={() => set("deutschkenntnisse", d)} />{d}</label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Muttersprache" value={f.muttersprache} onChange={v => set("muttersprache", v)} /><Field label="Weitere Sprachen" value={f.weiteresprachen} onChange={v => set("weiteresprachen", v)} /></div>
        <div><div style={S.lbl}>Lese- und Schreibkenntnisse in Muttersprache</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{["Ja, vollständig", "Teilweise", "Nein (Alphabetisierung nötig)"].map(l => (<label key={l} style={S.chk}><input type="radio" name="leseSchreib" checked={f.leseSchreib === l} onChange={() => set("leseSchreib", l)} />{l}</label>))}</div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Gewünschte Kursart" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Allgemeiner Integrationskurs (standard)",
            "Eltern- und Frauenintegrationskurs (mit Kinderbetreuung)",
            "Jugendintegrationskurs (unter 27 Jahren)",
            "Alphabetisierungskurs (für Teilnehmer ohne Lese-/Schreibkenntnisse)",
            "Förderkurs (für besondere Förderbedarfe)",
          ].map(k => (
            <label key={k} style={S.chk}><input type="radio" name="kursart" checked={f.kursart === k} onChange={() => set("kursart", k)} />{k}</label>
          ))}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Berechtigung und Kostenübernahme" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Ich beantrage die Teilnahme:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {[
              "Auf Verpflichtung durch Ausländerbehörde",
              "Auf Verpflichtung durch Jobcenter / Agentur für Arbeit",
              "Freiwillig als EU-Bürger/in",
              "Freiwillig als Drittstaatsangehörige/r",
            ].map(b => (
              <label key={b} style={S.chk}><input type="radio" name="berechtigung" checked={f.berechtigung === b} onChange={() => set("berechtigung", b)} />{b}</label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Kostenbefreiung beantragt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="kostenbefreiung" checked={f.kostenbefreiung === o} onChange={() => set("kostenbefreiung", o)} />{o}</label>))}</div>
        </div>
        {f.kostenbefreiung === "Ja" && (<>
          <div style={S.row}><Field label="Nachweis (Bürgergeld / Grundsicherung)" value={f.nachweisKostenbefreiung} onChange={v => set("nachweisKostenbefreiung", v)} /></div>
          <div><div style={S.lbl}>Bescheid vorhanden</div><div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="bescheidVorhanden" checked={f.bescheidVorhanden === o} onChange={() => set("bescheidVorhanden", o)} />{o}</label>))}</div></div>
        </>)}
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Kursort und Zeitpräferenz" />
        <div style={S.row}><Field label="Bevorzugter Kursort / Stadtteil" value={f.kursort} onChange={v => set("kursort", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Bevorzugte Zeit</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Vormittag (8–12 Uhr)", "Nachmittag (12–17 Uhr)", "Abend (17–20 Uhr)"].map(z => (<label key={z} style={S.chk}><input type="radio" name="zeit" checked={f.zeit === z} onChange={() => set("zeit", z)} />{z}</label>))}
          </div>
        </div>
        <div><div style={S.lbl}>Kinderbetreuung während des Kurses benötigt?</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 6 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="kinderbetreuung" checked={f.kinderbetreuung === o} onChange={() => set("kinderbetreuung", o)} />{o}</label>))}</div>
          {f.kinderbetreuung === "Ja" && <div style={S.row}><Field label="Anzahl Kinder" width={60} value={f.anzahlKinder} onChange={v => set("anzahlKinder", v)} /><Field label="Alter" value={f.alterKinder} onChange={v => set("alterKinder", v)} /></div>}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <p style={{ fontSize: 9, color: "#6b7280", marginTop: 8 }}>Antrag einzureichen bei: Zugelassenem Kursträger / BAMF-Büro</p>
      </div>

    </MusterFormBase>
  );
}
