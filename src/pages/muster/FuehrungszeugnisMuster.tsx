import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "fuehrungszeugnis-muster-data";
const PDF_URL = "https://www.bundesjustizamt.de/DE/Themen/Buergerdienste/Fuehrungszeugnis";

const initial = () => ({
  familienname: "", geburtsname: "", vorname: "", geburtsdatum: "", geburtsort: "", geburtsland: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "",
  art: "",
  vorlageName: "", vorlageAnschrift: "", zweck: "", sonstigerZweck: "",
  ausweis: "", ausweisnummer: "", ausgestelltAm: "", gueltigBis: "",
  zahlungsart: "", iban: "",
  meldebehoerde: "", sigOrt: "", sigDatum: "",
});

export default function FuehrungszeugnisMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="fz-root" title="Antrag auf Erteilung eines Führungszeugnisses" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Mehr Infos beim Bundesjustizamt →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Meldebehörde einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="fuehrungszeugnis" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="fuehrungszeugnis"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#EFF6FF", border: "2px solid #3B82F6", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 6 }}>🌐 Führungszeugnis se naručuje ISKLJUČIVO ONLINE ili u Bürgeramt-u</div>
        <div style={{ fontSize: 12, color: "#1E3A8A", lineHeight: 1.55, marginBottom: 12 }}>Potvrda o nekažnjavanju (Führungszeugnis) naručuje se isključivo online na portalu Bundesjustizamta ili lično u Bürgeramt-u uz ličnu kartu/pasoš. Nema PDF formulara koji se preuzima — prijava je digitalna ili šalterska. Ovaj vodič objašnjava koje vrste Führungszeugnis postoje i šta pripremiti.</div>
        <a href="https://www.bundesjustizamt.de/DE/Themen/Strafrecht/Fuehrungszeugnis/Fuehrungszeugnis_node.html" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#1D4ED8", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>🔗 Naruči Führungszeugnis online →</a>
      </div>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname (falls abweichend)" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Vorname(n) — Rufname bitte unterstreichen" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Art des Führungszeugnisses" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            "Führungszeugnis Belegart O (Vorlage bei einer Behörde)",
            "Führungszeugnis Belegart N (Vorlage bei privatem Arbeitgeber / Organisation)",
            "Europäisches Führungszeugnis (für EU-Bürger zur Vorlage im Ausland)",
            "Erweitertes Führungszeugnis Belegart OE / NE (Tätigkeiten mit Kindern und Jugendlichen)",
          ].map(a => (<label key={a} style={S.chk}><input type="radio" name="art" checked={f.art === a} onChange={() => set("art", a)} />{a}</label>))}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Verwendungszweck" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 6px", color: "#6b7280" }}>Vorlage bei folgender Stelle:</p>
        <div style={S.row}><Field label="Name der Behörde / des Arbeitgebers" value={f.vorlageName} onChange={v => set("vorlageName", v)} /></div>
        <div style={S.row}><Field label="Anschrift" value={f.vorlageAnschrift} onChange={v => set("vorlageAnschrift", v)} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
          {["Bewerbung / neue Arbeitsstelle", "Ehrenamtliche Tätigkeit mit Minderjährigen", "Ausländerbehörde / Aufenthaltstitel", "Gewerbeanmeldung"].map(z => (
            <label key={z} style={S.chk}><input type="radio" name="zweck" checked={f.zweck === z} onChange={() => set("zweck", z)} />{z}</label>
          ))}
          <label style={S.chk}><input type="radio" name="zweck" checked={f.zweck === "Sonstiges"} onChange={() => set("zweck", "Sonstiges")} /><TOpt value="Sonstiges:" /></label>
          {f.zweck === "Sonstiges" && <input style={{ ...S.inp, width: "100%" }} value={f.sonstigerZweck} onChange={e => set("sonstigerZweck", e.target.value)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Identitätsnachweis" />
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Ausweisdokument</div>
          <div style={{ display: "flex", gap: 16 }}>{["Personalausweis", "Reisepass"].map(a => (<label key={a} style={S.chk}><input type="radio" name="ausweis" checked={f.ausweis === a} onChange={() => set("ausweis", a)} />{a}</label>))}</div>
        </div>
        <div style={S.row}><Field label="Ausweisnummer" value={f.ausweisnummer} onChange={v => set("ausweisnummer", v)} /><Field label="Ausgestellt am" type="date" value={f.ausgestelltAm} onChange={v => set("ausgestelltAm", v)} /><Field label="Gültig bis" type="date" value={f.gueltigBis} onChange={v => set("gueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Gebühren" />
        <div style={{ fontSize: 10, marginBottom: 8, color: "#374151" }}>Gebühr: <strong>13,00 €</strong></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Zahlungsweise</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>{["SEPA-Lastschrift", "Überweisung", "Bar bei der Behörde"].map(z => (<label key={z} style={S.chk}><input type="radio" name="zahlungsart" checked={f.zahlungsart === z} onChange={() => set("zahlungsart", z)} />{z}</label>))}</div>
        </div>
        {f.zahlungsart === "SEPA-Lastschrift" && <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Antrag einzureichen bei: Meldebehörde des Wohnorts" value={f.meldebehoerde} onChange={v => set("meldebehoerde", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
