import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import MutterschaftsgeldGuideContent from "@/components/guides/MutterschaftsgeldGuideContent";
import { fillMutterschaftsgeldPdf, downloadBlob, type MutterschaftsgeldFormData } from "@/lib/pdf-fill-mutterschaftsgeld";

const LS_KEY = "mutterschaftsgeld-muster-data";
const PDF_URL = "https://www.mutterschaftsgeld.de/";

const initial = () => ({
  vorname: "", nachname: "", geburtsdatum: "", versichertenNr: "",
  strasse: "", plz: "", ort: "",
  krankenkasse: "",
  entbindungstermin: "", tatsaechlicheGeburt: "",
  beschaeftigtBei: "", beschaeftigtSeit: "",
  schutzfristVon: "", schutzfristBis: "",
  iban: "", bic: "", kontoinhaber: "",
  bemerkungen: "",
});

export default function MutterschaftsgeldMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const [generating, setGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));

  const handleAutoFill = async () => {
    setPdfError(null); setGenerating(true);
    try {
      const data: MutterschaftsgeldFormData = {
        vorname: f.vorname, nachname: f.nachname, geburtsdatum: f.geburtsdatum,
        versichertenNr: f.versichertenNr, strasse: f.strasse, plz: f.plz, ort: f.ort,
        krankenkasse: f.krankenkasse, entbindungstermin: f.entbindungstermin,
        tatsaechlicheGeburt: f.tatsaechlicheGeburt, beschaeftigtBei: f.beschaeftigtBei,
        beschaeftigtSeit: f.beschaeftigtSeit, schutzfristVon: f.schutzfristVon,
        schutzfristBis: f.schutzfristBis, iban: f.iban, bic: f.bic, kontoinhaber: f.kontoinhaber,
      };
      const blob = await fillMutterschaftsgeldPdf(data);
      downloadBlob(blob, `Mutterschaftsgeld-BAS-${f.nachname || "antrag"}.pdf`.replace(/\s+/g, "_"));
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : String(e));
    } finally { setGenerating(false); }
  };

  return (
    <>
    <MusterFormBase rootId="msg-root" title="Antrag auf Mutterschaftsgeld" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Original bei Krankenkasse / Mutterschaftsgeldstelle →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="mutterschaftsgeld" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>
      <MusterDisclaimer formKey="mutterschaftsgeld"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Popuni online → preuzmi zvanični BAS Antrag PDF</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Za privatno osigurane i samozaposlene bez GKV Krankentagegeld-a — Bundesamt für soziale Sicherung (BAS) ima standardni PDF. Za GKV-osigurane: kontaktirajte svoju Krankenkasse direktno za njihov formular. Ovaj vodič pokriva oba slučaja.</div>
        <button onClick={handleAutoFill} disabled={generating} style={{ background: generating ? "#9CA3AF" : "#15803d", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: generating ? "wait" : "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}>
          {generating ? "Generiram PDF…" : "📄 Preuzmi popunjeni BAS Antrag"}
        </button>
        {pdfError && <div style={{ marginTop: 8, color: "#DC2626", fontSize: 12 }}>⚠ {pdfError}</div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={1} title="A. Persönliche Daten" />
        <div style={S.row}><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /><Field label="Nachname" value={f.nachname} onChange={v => set("nachname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Versichertennummer" value={f.versichertenNr} onChange={v => set("versichertenNr", v)} /></div>
        <Field label="Straße" value={f.strasse} onChange={v => set("strasse", v)} />
        <div style={S.row}><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" value={f.ort} onChange={v => set("ort", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={2} title="B. Krankenkasse" />
        <Field label="Krankenkasse (Name)" value={f.krankenkasse} onChange={v => set("krankenkasse", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={3} title="C. Schwangerschaft & Geburt" />
        <div style={S.row}><Field label="Voraussichtlicher Entbindungstermin" type="date" value={f.entbindungstermin} onChange={v => set("entbindungstermin", v)} /><Field label="Tatsächlicher Geburtstermin" type="date" value={f.tatsaechlicheGeburt} onChange={v => set("tatsaechlicheGeburt", v)} /></div>
        <div style={S.row}><Field label="Mutterschutz von" type="date" value={f.schutzfristVon} onChange={v => set("schutzfristVon", v)} /><Field label="Mutterschutz bis" type="date" value={f.schutzfristBis} onChange={v => set("schutzfristBis", v)} /></div>
      </div>
      <div style={S.sec}>
        <SecHeader num={4} title="D. Beschäftigung" />
        <Field label="Arbeitgeber" value={f.beschaeftigtBei} onChange={v => set("beschaeftigtBei", v)} />
        <Field label="Beschäftigt seit" type="date" value={f.beschaeftigtSeit} onChange={v => set("beschaeftigtSeit", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={5} title="E. Bankverbindung" />
        <div style={S.row}><Field label="IBAN" value={f.iban} onChange={v => set("iban", v)} /><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
        <Field label="Kontoinhaber" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} />
      </div>
      <div style={S.sec}>
        <SecHeader num={6} title="F. Bemerkungen & Unterschrift" />
        <Field label="Bemerkungen" value={f.bemerkungen} onChange={v => set("bemerkungen", v)} />
        <Signature label="Unterschrift antragstellende Person" />
      </div>
    </MusterFormBase>
    <div style={{ maxWidth: 800, margin: "0 auto 60px", padding: "0 16px" }}>
      <MutterschaftsgeldGuideContent />
    </div>
    </>
  );
}
