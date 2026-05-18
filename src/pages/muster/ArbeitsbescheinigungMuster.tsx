import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "arbeitsbescheinigung-muster-data";
const PDF_URL = "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/arbeitslosengeld";

const initial = () => ({
  agName: "", agStrasse: "", agPLZ: "", agOrt: "",
  apEntgelt: "", apEntgeltTel: "", apPersonal: "", apPersonalTel: "",
  betriebsnummer: "",
  anVorname: "", anNachname: "", anStrasse: "", anPLZ: "", anOrt: "", rvNummer: "",
  zeitraumVon: "", zeitraumBis: "", beruf: "", beschOrt: "", enddatum: "",
  kuendigungAm: "", kuendigungZum: "", kuendigungDurch: "ag",
  schriftlich: "ja", betriebsbedingt: "nein",
  abfindungJa: "nein", abfindungBetrag: "", betriebszugehoerigkeit: "",
  urlaubsabgeltungJa: "nein", urlaubBis: "",
  kuendigungsfrist: "", fristende: "monatsende",
  sigDatum: "",
});

export default function ArbeitsbescheinigungMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ab-root" title="Arbeitsbescheinigung § 57 SGB II" subtitle="Musterformular — BalkanLink — nur zur Orientierung • ⚠️ NUR VOM ARBEITGEBER AUSZUFÜLLEN" pdfUrl={PDF_URL} pdfLabel="Original bei Agentur für Arbeit →" footerNote="Musterformular zur Orientierung • NUR vom Arbeitgeber auszufüllen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 8, padding: 10, marginBottom: 12, fontSize: 10, color: "#991b1b" }}>⚠️ Dieses Formular wird ausschließlich vom Arbeitgeber ausgefüllt!</div>
      <div style={S.sec}>
        <SecHeader num={1} title="A. Angaben zum Arbeitgeber" />
        <Field label="1. Name des Unternehmens" value={f.agName} onChange={v => set("agName", v)} />
        <div style={S.row}><Field label="Straße" value={f.agStrasse} onChange={v => set("agStrasse", v)} /><Field label="PLZ" width={80} value={f.agPLZ} onChange={v => set("agPLZ", v)} /><Field label="Ort" value={f.agOrt} onChange={v => set("agOrt", v)} /></div>
        <div style={S.row}><Field label="6. Ansprechpartner Entgelt" value={f.apEntgelt} onChange={v => set("apEntgelt", v)} /><Field label="Tel." value={f.apEntgeltTel} onChange={v => set("apEntgeltTel", v)} /></div>
        <div style={S.row}><Field label="8. Ansprechpartner Personal" value={f.apPersonal} onChange={v => set("apPersonal", v)} /><Field label="Tel." value={f.apPersonalTel} onChange={v => set("apPersonalTel", v)} /></div>
        <Field label="10. Betriebsnummer" value={f.betriebsnummer} onChange={v => set("betriebsnummer", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Angaben zum Arbeitnehmer" />
        <div style={S.row}><Field label="Vorname" value={f.anVorname} onChange={v => set("anVorname", v)} /><Field label="Nachname" value={f.anNachname} onChange={v => set("anNachname", v)} /></div>
        <div style={S.row}><Field label="Straße" value={f.anStrasse} onChange={v => set("anStrasse", v)} /><Field label="PLZ" width={80} value={f.anPLZ} onChange={v => set("anPLZ", v)} /><Field label="Ort" value={f.anOrt} onChange={v => set("anOrt", v)} /></div>
        <Field label="18. Rentenversicherungsnummer" value={f.rvNummer} onChange={v => set("rvNummer", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Beschäftigungsverhältnis" />
        <div style={S.row}><Field label="19. Zeitraum von" type="date" value={f.zeitraumVon} onChange={v => set("zeitraumVon", v)} /><Field label="bis" type="date" value={f.zeitraumBis} onChange={v => set("zeitraumBis", v)} /></div>
        <div style={S.row}><Field label="20. Letzte Berufsbezeichnung" value={f.beruf} onChange={v => set("beruf", v)} /><Field label="21. Beschäftigungsort" value={f.beschOrt} onChange={v => set("beschOrt", v)} /></div>
        <Field label="22. Enddatum" type="date" value={f.enddatum} onChange={v => set("enddatum", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Beendigung" />
        <div style={S.row}><Field label="23. Kündigung am" type="date" value={f.kuendigungAm} onChange={v => set("kuendigungAm", v)} /><Field label="zum" type="date" value={f.kuendigungZum} onChange={v => set("kuendigungZum", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>24. Beendet durch</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[["ag", "Arbeitgeber"], ["an", "Arbeitnehmer"], ["aufhebung", "Aufhebungsvertrag"]].map(([k, l]) => (
              <label key={k} style={S.chk}><input type="radio" name="durch" checked={f.kuendigungDurch === k} onChange={() => set("kuendigungDurch", k)} /> {l}</label>
            ))}
          </div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Leistungen bei Beendigung" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Urlaubsabgeltung?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="urlaub" checked={f.urlaubsabgeltungJa === o.toLowerCase()} onChange={() => set("urlaubsabgeltungJa", o.toLowerCase())} />{o}</label>))}</div>
        </div>
        {f.urlaubsabgeltungJa === "ja" && <Field label="Urlaub bis" type="date" value={f.urlaubBis} onChange={v => set("urlaubBis", v)} />}
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Abfindung?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="abfindung" checked={f.abfindungJa === o.toLowerCase()} onChange={() => set("abfindungJa", o.toLowerCase())} />{o}</label>))}</div>
        </div>
        {f.abfindungJa === "ja" && <>
          <Field label="56. Abfindung (Brutto)" value={f.abfindungBetrag} onChange={v => set("abfindungBetrag", v)} />
          <Field label="57. Betriebszugehörigkeit (Jahre)" value={f.betriebszugehoerigkeit} onChange={v => set("betriebszugehoerigkeit", v)} />
        </>}
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="F. Kündigungsfrist" />
        <Field label="62. Kündigungsfrist" value={f.kuendigungsfrist} onChange={v => set("kuendigungsfrist", v)} />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>63. Fristende</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {[["woche", "Ende Woche"], ["15", "15. des Monats"], ["monatsende", "Monatsende"], ["quartal", "Quartalsende"]].map(([k, l]) => (
              <label key={k} style={S.chk}><input type="radio" name="fristende" checked={f.fristende === k} onChange={() => set("fristende", k)} /> {l}</label>
            ))}
          </div>
        </div>
      </div>
      <div style={S.sec}>
        <SecHeader num={7} title="G. Unterschrift Arbeitgeber" />
        <Signature label="Unterschrift und Firmenstempel" />
      </div>
    </MusterFormBase>
  );
}
