import { useState } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import AnmeldungGuideContent from "@/components/AnmeldungGuideContent";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "anmeldung-muster-v2-data";
const PDF_URL = "https://service.berlin.de/dienstleistung/120686/";

const initial = () => ({
  einzugsdatum: "", strasse: "", hausnummer: "", zusatz: "", plz: "", ort: "", staat: "Deutschland",
  beiWem: "",
  familienname: "", geburtsname: "", vorname: "", geburtsdatum: "", geburtsort: "", geburtsland: "",
  geschlecht: "", staatsangehoerigkeit1: "", staatsangehoerigkeit2: "",
  familienstand: "", religion: "",
  ausweis: "", dokumentnr: "", ausgestelltAm: "", gueltigBis: "",
  erstanmeldung: "",
  altStrasse: "", altPlz: "", altOrt: "", altLand: "",
  p2Familienname: "", p2Vorname: "", p2Geburtsdatum: "", p2Geschlecht: "", p2Staatsangehoerigkeit: "", p2Familienstand: "",
  p3Familienname: "", p3Vorname: "", p3Geburtsdatum: "", p3Geschlecht: "", p3Staatsangehoerigkeit: "", p3Familienstand: "",
  sigOrt: "", sigDatum: "",
});

export default function AnmeldungMusterV2() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="anm2-root" title="Anmeldung bei der Meldebehörde" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Einwohnermeldeamt / Bürgeramt einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur Wohnung" />
        <div style={S.row}><Field label="Einzugsdatum (tt.mm.jjjj)" type="date" value={f.einzugsdatum} onChange={v => set("einzugsdatum", v)} /></div>
        <div style={S.row}><Field label="Straße" flex={3} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="Hausnummer" flex={1} value={f.hausnummer} onChange={v => set("hausnummer", v)} /></div>
        <div style={S.row}><Field label="Wohnungsnummer / Zusatz" value={f.zusatz} onChange={v => set("zusatz", v)} /></div>
        <div style={S.row}><Field label="Postleitzahl" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Staat" value={f.staat} onChange={v => set("staat", v)} /></div>
        <div><div style={S.lbl}>Bei wem eingezogen?</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Eigentümer/in", "Hauptmieter/in", "Untermieter/in"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="beiWem" checked={f.beiWem === o} onChange={() => set("beiWem", o)} /><TOpt value={o} /></label>
            ))}
          </div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zur Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname (falls abweichend)" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Vorname(n) — Rufname bitte unterstreichen" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Geschlecht</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["männlich", "weiblich", "divers", "ohne Angabe"].map(g => (
              <label key={g} style={S.chk}><input type="radio" name="geschlecht" checked={f.geschlecht === g} onChange={() => set("geschlecht", g)} /><TOpt value={g} /></label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Staatsangehörigkeit (1.)" value={f.staatsangehoerigkeit1} onChange={v => set("staatsangehoerigkeit1", v)} /><Field label="ggf. 2. Staatsangehörigkeit" value={f.staatsangehoerigkeit2} onChange={v => set("staatsangehoerigkeit2", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Familienstand</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["ledig", "verheiratet", "verwitwet", "geschieden", "eingetragene Lebenspartnerschaft", "durch Tod aufgelöst"].map(fs => (
              <label key={fs} style={S.chk}><input type="radio" name="familienstand" checked={f.familienstand === fs} onChange={() => set("familienstand", fs)} /><TOpt value={fs} /></label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Religionszugehörigkeit (freiwillig)" value={f.religion} onChange={v => set("religion", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Ausweisdokument</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
            {["Personalausweis", "Reisepass", "Aufenthaltstitel"].map(a => (
              <label key={a} style={S.chk}><input type="radio" name="ausweis" checked={f.ausweis === a} onChange={() => set("ausweis", a)} /><TOpt value={a} /></label>
            ))}
          </div>
        </div>
        <div style={S.row}><Field label="Dokumentnummer" value={f.dokumentnr} onChange={v => set("dokumentnr", v)} /><Field label="Ausgestellt am" type="date" value={f.ausgestelltAm} onChange={v => set("ausgestelltAm", v)} /><Field label="Gültig bis" type="date" value={f.gueltigBis} onChange={v => set("gueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Bisherige Wohnung (Ummeldung)" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
          <label style={S.chk}><input type="radio" name="erstanmeldung" checked={f.erstanmeldung === "Ja"} onChange={() => set("erstanmeldung", "Ja")} /><TOpt value="Erstanmeldung in Deutschland (kein Vorwohnsitz)" /></label>
          <label style={S.chk}><input type="radio" name="erstanmeldung" checked={f.erstanmeldung === "Nein"} onChange={() => set("erstanmeldung", "Nein")} /><TOpt value="Ummeldung — bisherige Anschrift:" /></label>
        </div>
        {f.erstanmeldung === "Nein" && (
          <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.altStrasse} onChange={v => set("altStrasse", v)} /><Field label="PLZ" width={80} value={f.altPlz} onChange={v => set("altPlz", v)} /><Field label="Ort" flex={1} value={f.altOrt} onChange={v => set("altOrt", v)} /><Field label="Land" value={f.altLand} onChange={v => set("altLand", v)} /></div>
        )}
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Weitere Personen (Mitziehende)" />
        <div style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px", color: "#6b7280" }}>Person 2</div>
        <div style={S.row}><Field label="Familienname" value={f.p2Familienname} onChange={v => set("p2Familienname", v)} /><Field label="Vorname" value={f.p2Vorname} onChange={v => set("p2Vorname", v)} /><Field label="Geburtsdatum" type="date" value={f.p2Geburtsdatum} onChange={v => set("p2Geburtsdatum", v)} /></div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Geschlecht</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["männlich", "weiblich", "divers"].map(g => (<label key={g} style={S.chk}><input type="radio" name="p2Geschlecht" checked={f.p2Geschlecht === g} onChange={() => set("p2Geschlecht", g)} /><TOpt value={g} /></label>))}</div></div>
          <Field label="Staatsangehörigkeit" value={f.p2Staatsangehoerigkeit} onChange={v => set("p2Staatsangehoerigkeit", v)} />
          <Field label="Familienstand" value={f.p2Familienstand} onChange={v => set("p2Familienstand", v)} />
        </div>
        <div style={{ fontSize: 10, fontStyle: "italic", margin: "12px 0 8px", color: "#6b7280" }}>Person 3</div>
        <div style={S.row}><Field label="Familienname" value={f.p3Familienname} onChange={v => set("p3Familienname", v)} /><Field label="Vorname" value={f.p3Vorname} onChange={v => set("p3Vorname", v)} /><Field label="Geburtsdatum" type="date" value={f.p3Geburtsdatum} onChange={v => set("p3Geburtsdatum", v)} /></div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Geschlecht</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["männlich", "weiblich", "divers"].map(g => (<label key={g} style={S.chk}><input type="radio" name="p3Geschlecht" checked={f.p3Geschlecht === g} onChange={() => set("p3Geschlecht", g)} /><TOpt value={g} /></label>))}</div></div>
          <Field label="Staatsangehörigkeit" value={f.p3Staatsangehoerigkeit} onChange={v => set("p3Staatsangehoerigkeit", v)} />
          <Field label="Familienstand" value={f.p3Familienstand} onChange={v => set("p3Familienstand", v)} />
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
