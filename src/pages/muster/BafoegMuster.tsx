import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import { fillBafoegPdf, downloadBlob, type BafoegFormData } from "@/lib/pdf-fill-bafoeg";

const LS_KEY = "bafoeg-muster-data";
const PDF_URL = "https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html";

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "",
  ausbildungsArt: "", sonstigeAusbildung: "", schuleName: "", studiengang: "", immatrikuliertSeit: "", voraussichtlichesEnde: "", semester: "", ausbildungsortPlz: "", ausbildungsort: "",
  eigenesEinkommen: "", einkommensart: "", eigenesVermoegen: "", sparVermoegen: "", aktienVermoegen: "", sonstigesVermoegen: "",
  bafoegFrueher: "", bafoegVon: "", bafoegBis: "", bafoegAmt: "",
  eltern: [
    { name: "", vorname: "", geburtsdatum: "", strasse: "", plz: "", ort: "", beruf: "", arbeitgeber: "", bruttojahreseinkommen: "", unterhalt: "" },
    { name: "", vorname: "", geburtsdatum: "", strasse: "", plz: "", ort: "", beruf: "", arbeitgeber: "", bruttojahreseinkommen: "", unterhalt: "" },
  ],
  elternVerheiratet: "", elternGetrennt: "", getrenntSeit: "", elternteilVerstorben: "",
  wohnung: "", monatlicheMiete: "",
  krankenversicherung: "", kvKasse: "", kvBeitrag: "",
  amt: "", sigOrt: "", sigDatum: "",
});

export default function BafoegMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setEltern = (i: number, k: string, v: string) => setF(p => { const e = [...p.eltern]; e[i] = { ...e[i], [k]: v }; return { ...p, eltern: e }; });

  return (
    <MusterFormBase rootId="baf-root" title="Antrag auf Ausbildungsförderung (BAföG)" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Amt für Ausbildungsförderung einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="bafoeg" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="bafoeg"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>✅ Popuni online → preuzmi zvanični BAföG Formblatt 01 PDF (BMBF, Stand 2025)</div>
        <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>Tvoji podaci se popunjavaju u zvanični BAföG Formblatt 01 PDF lokalno u tvom browseru — ništa ne ide na server. Formblatt je standardni federalni obrazac koji se predaje nadležnom Amt für Ausbildungsförderung.</div>
        <button disabled style={{ background: "#9CA3AF", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "not-allowed" }}>📄 Preuzmi popunjeni BAföG Formblatt 01 (uskoro dostupno)</button>
      </div>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zur Ausbildung" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Art der Ausbildung</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Hochschule (Universität / FH)", "Fachschule", "Berufsfachschule", "Berufsaufbauschule"].map(a => (<label key={a} style={S.chk}><input type="radio" name="ausbildungsArt" checked={f.ausbildungsArt === a} onChange={() => set("ausbildungsArt", a)} />{a}</label>))}
            <label style={S.chk}><input type="radio" name="ausbildungsArt" checked={f.ausbildungsArt === "Sonstiges"} onChange={() => set("ausbildungsArt", "Sonstiges")} /><TOpt value="Sonstiges:" /></label>
          </div>
          {f.ausbildungsArt === "Sonstiges" && <input style={{ ...S.inp, width: "100%", marginTop: 4 }} value={f.sonstigeAusbildung} onChange={e => set("sonstigeAusbildung", e.target.value)} />}
        </div>
        <div style={S.row}><Field label="Name der Hochschule / Schule" value={f.schuleName} onChange={v => set("schuleName", v)} /></div>
        <div style={S.row}><Field label="Studiengang / Fachrichtung" value={f.studiengang} onChange={v => set("studiengang", v)} /></div>
        <div style={S.row}><Field label="Immatrikuliert / eingeschrieben seit" type="date" value={f.immatrikuliertSeit} onChange={v => set("immatrikuliertSeit", v)} /><Field label="Voraussichtliches Studienende" type="date" value={f.voraussichtlichesEnde} onChange={v => set("voraussichtlichesEnde", v)} /></div>
        <div style={S.row}><Field label="Aktuelles Fachsemester" value={f.semester} onChange={v => set("semester", v)} /></div>
        <div style={S.row}><Field label="Ausbildungsort PLZ" width={80} value={f.ausbildungsortPlz} onChange={v => set("ausbildungsortPlz", v)} /><Field label="Ort" flex={1} value={f.ausbildungsort} onChange={v => set("ausbildungsort", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Eigenes Einkommen und Vermögen" />
        <div style={S.row}><Field label="Eigenes Einkommen (brutto, €/Monat)" value={f.eigenesEinkommen} onChange={v => set("eigenesEinkommen", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Art des Einkommens</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{["Arbeit", "Stipendium", "Sonstiges"].map(a => (<label key={a} style={S.chk}><input type="radio" name="einkommensart" checked={f.einkommensart === a} onChange={() => set("einkommensart", a)} />{a}</label>))}</div>
        </div>
        <div style={S.row}><Field label="Eigenes Vermögen (€, Gesamtwert)" value={f.eigenesVermoegen} onChange={v => set("eigenesVermoegen", v)} /></div>
        <div style={S.row}><Field label="Davon Sparguthaben (€)" value={f.sparVermoegen} onChange={v => set("sparVermoegen", v)} /><Field label="Aktien/Fonds (€)" value={f.aktienVermoegen} onChange={v => set("aktienVermoegen", v)} /><Field label="Sonstiges (€)" value={f.sonstigesVermoegen} onChange={v => set("sonstigesVermoegen", v)} /></div>
        <div style={{ marginTop: 8 }}><div style={S.lbl}>BAföG früher erhalten?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="bafoegFrueher" checked={f.bafoegFrueher === o} onChange={() => set("bafoegFrueher", o)} />{o}</label>))}</div>
          {f.bafoegFrueher === "Ja" && <div style={{ ...S.row, marginTop: 4 }}><Field label="von" type="date" value={f.bafoegVon} onChange={v => set("bafoegVon", v)} /><Field label="bis" type="date" value={f.bafoegBis} onChange={v => set("bafoegBis", v)} /><Field label="Amt" value={f.bafoegAmt} onChange={v => set("bafoegAmt", v)} /></div>}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Angaben zu den Eltern" />
        {f.eltern.map((e, i) => (
          <div key={i} style={{ marginBottom: 12, paddingBottom: 8, borderBottom: i === 0 ? "1px dashed #d1d5db" : "none" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Elternteil {i + 1}</div>
            <div style={S.row}><Field label="Familienname" value={e.name} onChange={v => setEltern(i, "name", v)} /><Field label="Vorname" value={e.vorname} onChange={v => setEltern(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={e.geburtsdatum} onChange={v => setEltern(i, "geburtsdatum", v)} /></div>
            <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={e.strasse} onChange={v => setEltern(i, "strasse", v)} /><Field label="PLZ" width={80} value={e.plz} onChange={v => setEltern(i, "plz", v)} /><Field label="Ort" flex={1} value={e.ort} onChange={v => setEltern(i, "ort", v)} /></div>
            <div style={S.row}><Field label="Beruf / Tätigkeit" value={e.beruf} onChange={v => setEltern(i, "beruf", v)} /><Field label="Arbeitgeber" value={e.arbeitgeber} onChange={v => setEltern(i, "arbeitgeber", v)} /></div>
            <div style={S.row}><Field label="Bruttojahreseinkommen (€)" value={e.bruttojahreseinkommen} onChange={v => setEltern(i, "bruttojahreseinkommen", v)} /><Field label="Unterhalt an Antragsteller (€/Monat)" value={e.unterhalt} onChange={v => setEltern(i, "unterhalt", v)} /></div>
          </div>
        ))}
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Eltern verheiratet?</div><div style={{ display: "flex", gap: 16 }}>{["Ja"].map(o => (<label key={o} style={S.chk}><input type="radio" name="elternVerheiratet" checked={f.elternVerheiratet === o} onChange={() => set("elternVerheiratet", o)} />{o}</label>))}</div></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Eltern getrennt / geschieden?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja"].map(o => (<label key={o} style={S.chk}><input type="radio" name="elternGetrennt" checked={f.elternGetrennt === o} onChange={() => set("elternGetrennt", o)} />{o}</label>))}</div>
          {f.elternGetrennt === "Ja" && <div style={{ ...S.row, marginTop: 4 }}><Field label="Seit" type="date" value={f.getrenntSeit} onChange={v => set("getrenntSeit", v)} /></div>}
        </div>
        <div><div style={S.lbl}>Elternteil verstorben?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Elternteil 1", "Elternteil 2"].map(o => (<label key={o} style={S.chk}><input type="checkbox" checked={f.elternteilVerstorben === o} onChange={() => set("elternteilVerstorben", f.elternteilVerstorben === o ? "" : o)} />{o}</label>))}</div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Wohnsituation" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Wohne ich während der Ausbildung:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {["Bei den Eltern", "In eigenem Haushalt / Wohngemeinschaft", "Im Studentenwohnheim"].map(w => (
              <label key={w} style={S.chk}><input type="radio" name="wohnung" checked={f.wohnung === w} onChange={() => set("wohnung", w)} />{w}</label>
            ))}
          </div>
        </div>
        {f.wohnung !== "Bei den Eltern" && f.wohnung && <div style={S.row}><Field label="Monatliche Miete (€)" value={f.monatlicheMiete} onChange={v => set("monatlicheMiete", v)} /></div>}
        <div style={{ marginTop: 8 }}><div style={S.lbl}>Krankenversicherung</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
            {["Gesetzlich versichert (GKV)", "Privat versichert (PKV)", "Familienversichert (über Eltern)"].map(k => (
              <label key={k} style={S.chk}><input type="radio" name="krankenversicherung" checked={f.krankenversicherung === k} onChange={() => set("krankenversicherung", k)} />{k}</label>
            ))}
          </div>
          {f.krankenversicherung === "Gesetzlich versichert (GKV)" && <div style={S.row}><Field label="Kasse" value={f.kvKasse} onChange={v => set("kvKasse", v)} /></div>}
          {f.krankenversicherung && f.krankenversicherung !== "Familienversichert (über Eltern)" && <div style={S.row}><Field label="Monatlicher Beitrag (€)" value={f.kvBeitrag} onChange={v => set("kvBeitrag", v)} /></div>}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
          <Signature label="Unterschrift Antragsteller/in" />
          <div style={{ display: "flex", gap: 24 }}><Signature label="Unterschrift Elternteil 1" /><Signature label="Unterschrift Elternteil 2" /></div>
        </div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Amt für Ausbildungsförderung" value={f.amt} onChange={v => set("amt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
