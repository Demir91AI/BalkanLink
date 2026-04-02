import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "elterngeld-muster-data";
const PDF_URL = "https://www.familienatlas.de/fileadmin/familienatlas/Downloads/Elterngeld/Antrag_auf_Elterngeld_01.pdf";

const initial = () => ({
  kVorname: "", kNachname: "", kGeburtsdatum: "", kGeburtsort: "", kGeschlecht: "", kSteuerId: "", kAdoptiert: "",
  vorname: "", familienname: "", geburtsdatum: "", steuerId: "", staatsangehoerigkeit: "", strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", alleinerziehend: "",
  e2Familienname: "", e2Vorname: "", e2Geburtsdatum: "", e2SteuerId: "", e2Staatsangehoerigkeit: "", e2Strasse: "", e2Plz: "", e2Ort: "",
  artElterngeld: "", bezugVon: "", bezugBis: "", wochenarbeitszeit: "",
  erwerbstaetig: "", artBeschaeftigung: "", nettoEinkommen: "", arbeitgeber: "", arbeitszeit: "",
  weitereKinder: "", wk: [{ vorname: "", geburtsdatum: "" }, { vorname: "", geburtsdatum: "" }, { vorname: "", geburtsdatum: "" }],
  sigOrt: "", sigDatum: "",
});

export default function ElterngeldMuster() {
  const [f, setF] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial();
  });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setWk = (i: number, k: string, v: string) => setF(p => { const wk = [...p.wk]; wk[i] = { ...wk[i], [k]: v }; return { ...p, wk }; });

  return (
    <MusterFormBase rootId="eg-root" title="Antrag auf Elterngeld" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Elterngeldstelle einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      {/* SEKCIJA 1 */}
      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zum Kind" />
        <div style={S.row}><Field label="Vorname(n) des Kindes" flex={1} value={f.kVorname} onChange={v => set("kVorname", v)} /><Field label="Nachname des Kindes" flex={1} value={f.kNachname} onChange={v => set("kNachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.kGeburtsdatum} onChange={v => set("kGeburtsdatum", v)} /><Field label="Geburtsort" value={f.kGeburtsort} onChange={v => set("kGeburtsort", v)} /></div>
        <div style={S.row}>
          <div style={{ flex: 1 }}><div style={S.lbl}>Geschlecht</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {["männlich", "weiblich", "divers"].map(g => (<label key={g} style={S.chk}><input type="radio" name="kGeschlecht" checked={f.kGeschlecht === g} onChange={() => set("kGeschlecht", g)} />{g}</label>))}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer des Kindes</div><IdBoxes count={11} value={f.kSteuerId} onChange={v => set("kSteuerId", v)} /></div>
        <div><div style={S.lbl}>Ist das Kind adoptiert?</div>
          <div style={{ display: "flex", gap: 16 }}>
            {["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="kAdoptiert" checked={f.kAdoptiert === o} onChange={() => set("kAdoptiert", o)} />{o}</label>))}
          </div>
        </div>
      </div>

      {/* SEKCIJA 2 */}
      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zur antragstellenden Person" />
        <div style={S.row}><Field label="Familienname" flex={1} value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" flex={1} value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div><div style={S.lbl}>Alleinerziehend?</div>
          <div style={{ display: "flex", gap: 16 }}>
            {["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="alleinerziehend" checked={f.alleinerziehend === o} onChange={() => set("alleinerziehend", o)} />{o}</label>))}
          </div>
        </div>
      </div>

      {/* SEKCIJA 2B */}
      {f.alleinerziehend === "Nein" && (
        <div style={S.sec}>
          <SecHeader num={2} title="B — Angaben zum anderen Elternteil" />
          <div style={S.row}><Field label="Familienname" value={f.e2Familienname} onChange={v => set("e2Familienname", v)} /><Field label="Vorname" value={f.e2Vorname} onChange={v => set("e2Vorname", v)} /></div>
          <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.e2Geburtsdatum} onChange={v => set("e2Geburtsdatum", v)} /></div>
          <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.e2SteuerId} onChange={v => set("e2SteuerId", v)} /></div>
          <div style={S.row}><Field label="Staatsangehörigkeit" value={f.e2Staatsangehoerigkeit} onChange={v => set("e2Staatsangehoerigkeit", v)} /></div>
          <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.e2Strasse} onChange={v => set("e2Strasse", v)} /><Field label="PLZ" width={80} value={f.e2Plz} onChange={v => set("e2Plz", v)} /><Field label="Ort" flex={1} value={f.e2Ort} onChange={v => set("e2Ort", v)} /></div>
        </div>
      )}

      {/* SEKCIJA 3 */}
      <div style={S.sec}>
        <SecHeader num={3} title="Art des Elterngeldes" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
          {["Basiselterngeld", "ElterngeldPlus", "Partnerschaftsbonus"].map(a => (
            <label key={a} style={S.chk}><input type="radio" name="artElterngeld" checked={f.artElterngeld === a} onChange={() => set("artElterngeld", a)} />{a}</label>
          ))}
        </div>
        <div style={S.row}><Field label="Bezugszeitraum von" type="date" value={f.bezugVon} onChange={v => set("bezugVon", v)} /><Field label="bis" type="date" value={f.bezugBis} onChange={v => set("bezugBis", v)} /></div>
        <div style={S.row}><Field label="Geplante Wochenarbeitszeit im Bezugszeitraum (Stunden)" value={f.wochenarbeitszeit} onChange={v => set("wochenarbeitszeit", v)} /></div>
      </div>

      {/* SEKCIJA 4 */}
      <div style={S.sec}>
        <SecHeader num={4} title="Einkommen vor der Geburt" />
        <div><div style={S.lbl}>Erwerbstätigkeit vor der Geburt?</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
            {["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="erwerbstaetig" checked={f.erwerbstaetig === o} onChange={() => set("erwerbstaetig", o)} />{o}</label>))}
          </div>
        </div>
        {f.erwerbstaetig === "Ja" && (<>
          <div><div style={S.lbl}>Art</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              {["Angestellt", "Selbstständig", "Beamtin/Beamter"].map(a => (
                <label key={a} style={S.chk}><input type="radio" name="artBeschaeftigung" checked={f.artBeschaeftigung === a} onChange={() => set("artBeschaeftigung", a)} />{a}</label>
              ))}
            </div>
          </div>
          <div style={S.row}><Field label="Monatliches Nettoeinkommen (€)" value={f.nettoEinkommen} onChange={v => set("nettoEinkommen", v)} /><Field label="Arbeitgeber / Firma" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="Arbeitszeit (Wochenstunden)" value={f.arbeitszeit} onChange={v => set("arbeitszeit", v)} /></div>
        </>)}
      </div>

      {/* SEKCIJA 5 */}
      <div style={S.sec}>
        <SecHeader num={5} title="Weitere Kinder (Geschwisterbonus)" />
        <div><div style={S.lbl}>Weitere Kinder unter 3 Jahren im Haushalt?</div>
          <div style={{ display: "flex", gap: 16, marginBottom: 8 }}>
            {["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="weitereKinder" checked={f.weitereKinder === o} onChange={() => set("weitereKinder", o)} />{o}</label>))}
          </div>
        </div>
        {f.weitereKinder === "Ja" && (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead><tr>{["Vorname", "Geburtsdatum"].map(h => (<th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>))}</tr></thead>
            <tbody>{f.wk.map((k, i) => (<tr key={i}><td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.vorname} onChange={e => setWk(i, "vorname", e.target.value)} /></td><td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.geburtsdatum} onChange={e => setWk(i, "geburtsdatum", e.target.value)} /></td></tr>))}</tbody>
          </table>
        )}
      </div>

      {/* SEKCIJA 6 */}
      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</p>
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
          <Signature label="Unterschrift Antragstellende Person" />
          {f.alleinerziehend === "Nein" && <Signature label="Unterschrift anderer Elternteil" />}
        </div>
      </div>

    </MusterFormBase>
  );
}
