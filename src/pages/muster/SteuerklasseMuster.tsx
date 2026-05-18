import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "steuerklasse-muster-data";

const initial = () => ({
  p1Familienname: "", p1Vorname: "", p1Geburtsdatum: "", p1SteuerId: "", p1Strasse: "", p1Plz: "", p1Ort: "", p1Arbeitgeber: "", p1Bisherige: "", p1Gewuenschte: "", p1Kinderfreibetrag: "",
  p2Familienname: "", p2Vorname: "", p2Geburtsdatum: "", p2SteuerId: "", p2Arbeitgeber: "", p2Bisherige: "", p2Gewuenschte: "", p2Kinderfreibetrag: "",
  anzahlKinder: "",
  kinder: Array.from({ length: 4 }, () => ({ vorname: "", geburtsdatum: "", steuerId: "", wohnhaftBei: "" })),
  grund: "", sonstigerGrund: "",
  finanzamt: "", sigOrt: "", sigDatum: "",
});

const steuerklassen = ["I", "II", "III", "IV", "V", "VI"];
const kinderfreibetraege = ["0,0", "0,5", "1,0", "1,5", "2,0", "2,5", "3,0"];

export default function SteuerklasseMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setKind = (i: number, k: string, v: string) => setF(p => { const kinder = [...p.kinder]; kinder[i] = { ...kinder[i], [k]: v }; return { ...p, kinder }; });

  const PartnerSection = ({ num, prefix, label }: { num: number; prefix: string; label: string }) => (
    <div style={S.sec}>
      <SecHeader num={num} title={label} />
      <div style={S.row}><Field label="Familienname" value={(f as any)[prefix + "Familienname"]} onChange={v => set(prefix + "Familienname", v)} /><Field label="Vorname" value={(f as any)[prefix + "Vorname"]} onChange={v => set(prefix + "Vorname", v)} /></div>
      <div style={S.row}><Field label="Geburtsdatum" type="date" value={(f as any)[prefix + "Geburtsdatum"]} onChange={v => set(prefix + "Geburtsdatum", v)} /></div>
      <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={(f as any)[prefix + "SteuerId"]} onChange={v => set(prefix + "SteuerId", v)} /></div>
      {prefix === "p1" && (
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.p1Strasse} onChange={v => set("p1Strasse", v)} /><Field label="PLZ" width={80} value={f.p1Plz} onChange={v => set("p1Plz", v)} /><Field label="Ort" flex={1} value={f.p1Ort} onChange={v => set("p1Ort", v)} /></div>
      )}
      <div style={S.row}><Field label="Arbeitgeber (Name, Anschrift)" value={(f as any)[prefix + "Arbeitgeber"]} onChange={v => set(prefix + "Arbeitgeber", v)} /></div>
      <div style={S.row}>
        <div style={{ flex: 1 }}><div style={S.lbl}>Bisherige Steuerklasse</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{steuerklassen.map(sk => (<label key={sk} style={S.chk}><input type="radio" name={prefix + "Bisherige"} checked={(f as any)[prefix + "Bisherige"] === sk} onChange={() => set(prefix + "Bisherige", sk)} />{sk}</label>))}</div></div>
        <div style={{ flex: 1 }}><div style={S.lbl}>Gewünschte Steuerklasse</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{steuerklassen.map(sk => (<label key={sk} style={S.chk}><input type="radio" name={prefix + "Gewuenschte"} checked={(f as any)[prefix + "Gewuenschte"] === sk} onChange={() => set(prefix + "Gewuenschte", sk)} />{sk}</label>))}</div></div>
      </div>
      <div><div style={S.lbl}>Kinderfreibetragsanteil</div><div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{kinderfreibetraege.map(kb => (<label key={kb} style={S.chk}><input type="radio" name={prefix + "Kinderfreibetrag"} checked={(f as any)[prefix + "Kinderfreibetrag"] === kb} onChange={() => set(prefix + "Kinderfreibetrag", kb)} />{kb}</label>))}</div></div>
    </div>
  );

  return (
    <MusterFormBase rootId="sk-root" title="Antrag auf Steuerklassenwechsel bei Ehegatten / Lebenspartnern" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl="https://www.formulare-bfinv.de" pdfLabel="Formulare der Finanzverwaltung →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim zuständigen Finanzamt einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="steuerklassenwechsel" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="steuerklassenwechsel"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#EFF6FF", border: "2px solid #3B82F6", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#1E40AF", marginBottom: 6 }}>🌐 Steuerklassenwechsel se podnosi ONLINE putem ELSTER-a ili poštom Finanzamt-u</div>
        <div style={{ fontSize: 12, color: "#1E3A8A", lineHeight: 1.55, marginBottom: 12 }}>Promjena porezne klase nema standardni offline PDF — zahtjev se podnosi putem ELSTER portala (Antrag auf Lohnsteuer-Ermäßigung + Anlage Steuerklassenwechsel) ili printanjem ELSTER obrasca i slanjem poštom vašem Finanzamt-u. Ovaj vodič objašnjava sva polja i priprema te za popunjavanje.</div>
        <a href="https://www.elster.de/eportal/formulare-leistungen/alleformulare/elevermaessigungelstam" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "#1D4ED8", color: "#fff", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>🔗 Idi na ELSTER →</a>
      </div>

      <PartnerSection num={1} prefix="p1" label="Ehegatte / Lebenspartner 1" />
      <PartnerSection num={2} prefix="p2" label="Ehegatte / Lebenspartner 2" />

      <div style={S.sec}>
        <SecHeader num={3} title="Angaben zu den Kindern" />
        <div style={S.row}><Field label="Anzahl der Kinder" width={60} value={f.anzahlKinder} onChange={v => set("anzahlKinder", v)} /></div>
        {f.kinder.map((k, i) => (
          <div key={i} style={{ marginBottom: 8, paddingBottom: 6, borderBottom: i < 3 ? "1px dashed #e5e7eb" : "none" }}>
            <div style={{ fontSize: 9, fontWeight: 600, color: "#6b7280", marginBottom: 4 }}>Kind {i + 1}</div>
            <div style={S.row}><Field label="Vorname" value={k.vorname} onChange={v => setKind(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={k.geburtsdatum} onChange={v => setKind(i, "geburtsdatum", v)} /></div>
            <div style={S.row}>
              <Field label="Steuer-ID des Kindes" value={k.steuerId} onChange={v => setKind(i, "steuerId", v)} />
              <div style={{ flex: 1 }}><div style={S.lbl}>Wohnhaft bei</div><div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{["Elternteil 1", "Elternteil 2", "Beiden"].map(w => (<label key={w} style={S.chk}><input type="radio" name={`wohnhaft${i}`} checked={k.wohnhaftBei === w} onChange={() => setKind(i, "wohnhaftBei", w)} />{w}</label>))}</div></div>
            </div>
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Grund des Wechsels" />
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Heirat / Eintragung der Lebenspartnerschaft", "Änderung der Einkommensverhältnisse", "Aufnahme einer Erwerbstätigkeit", "Aufgabe einer Erwerbstätigkeit", "Geburt eines Kindes"].map(g => (
            <label key={g} style={S.chk}><input type="radio" name="grund" checked={f.grund === g} onChange={() => set("grund", g)} />{g}</label>
          ))}
          <label style={S.chk}><input type="radio" name="grund" checked={f.grund === "Sonstiges"} onChange={() => set("grund", "Sonstiges")} /><TOpt value="Sonstiger Grund:" /></label>
          {f.grund === "Sonstiges" && <input style={{ ...S.inp, width: "100%" }} value={f.sonstigerGrund} onChange={e => set("sonstigerGrund", e.target.value)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ display: "flex", gap: 24, marginTop: 12 }}><Signature label="Unterschrift Ehegatte/Partner 1" /><Signature label="Unterschrift Ehegatte/Partner 2" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Finanzamt" value={f.finanzamt} onChange={v => set("finanzamt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
