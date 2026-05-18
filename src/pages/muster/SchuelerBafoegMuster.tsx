import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "schueler-bafoeg-muster-data";
const PDF_URL = "https://www.xn--bafg-7qa.de/bafoeg/de/antrag-stellen/alle-antragsformulare/alle-antragsformulare_node.html";

const Info = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: 10, margin: "8px 0", fontSize: 10, color: "#1e3a5f", lineHeight: 1.5 }}>{children}</div>
);
const Radio = ({ name, value, options, onChange }: { name: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{options.map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} />{o}</label>))}</div>
);

const emptyElternteil = () => ({ name: "", vorname: "", geburtsdatum: "", adresse: "", beruf: "", bruttojahreseinkommen: "" });
const emptyGeschwister = () => ({ name: "", geburtsdatum: "", ausbildungsart: "", schule: "" });

const initial = () => ({
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "",
  elternStrasse: "", elternPlz: "", elternOrt: "",
  telefon: "", email: "", iban: "", bic: "",
  schulart: "", sonstigeSchulart: "", schuleName: "", schuleStrasse: "", schulePlz: "", schuleOrt: "",
  ausbildungsgang: "", beginn: "", ende: "", aktuellesSchuljahr: "",
  wohnung: "", monatlicheMiete: "", entfernungKm: "", fahrzeitMin: "",
  eigenesEinkommen: "", einkommensart: "", einkommenNetto: "", eigenesVermoegen: "",
  eltern: [emptyElternteil(), emptyElternteil()],
  elternVerheiratet: "", elternGetrennt: "", getrenntSeit: "", elternteilVerstorben: "",
  unterhaltVonEltern: "", unterhaltNichtGezahlt: "", unterhaltGrund: "",
  geschwisterJa: "", geschwister: [emptyGeschwister(), emptyGeschwister(), emptyGeschwister()],
  krankenversicherung: "", kvKasse: "", kvBeitrag: "",
  amt: "", sigOrt: "", sigDatum: "",
});

export default function SchuelerBafoegMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setEltern = (i: number, k: string, v: string) => setF(p => { const e = [...p.eltern]; e[i] = { ...e[i], [k]: v }; return { ...p, eltern: e }; });
  const setGeschw = (i: number, k: string, v: string) => setF(p => { const g = [...p.geschwister]; g[i] = { ...g[i], [k]: v }; return { ...p, geschwister: g }; });

  return (
    <MusterFormBase rootId="sbaf-root" title="Antrag auf Ausbildungsförderung — Schüler-BAföG" subtitle="Amt für Ausbildungsförderung (Schülerbereich) — Musterformular — BalkanLink" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni BAföG formular (PDF) →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Amt für Ausbildungsförderung einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <Info>📋 Šta je Schüler-BAföG? Državna pomoć za učenike koji pohađaju određene škole — npr. Fachoberschule, Berufsfachschule, Gymnasium (ako ne žive kod roditelja). Razlikuje se od Studenten-BAföG po tome što se NE vraća kao kredit — isplaćuje se kao poklon.</Info>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur Person (Schüler/in)" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={{ fontSize: 10, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>Anschrift während der Ausbildung:</div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={{ fontSize: 10, fontWeight: 600, marginTop: 8, marginBottom: 4 }}>Anschrift bei Eltern (falls abweichend):</div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.elternStrasse} onChange={v => set("elternStrasse", v)} /><Field label="PLZ" width={80} value={f.elternPlz} onChange={v => set("elternPlz", v)} /><Field label="Ort" flex={1} value={f.elternOrt} onChange={v => set("elternOrt", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /></div>
        <Info>ℹ️ Dvije adrese: Upisuješ adresu gdje živiš za vrijeme škole I adresu roditelja. Ovo je bitno jer Schüler-BAföG se u pravilu daje samo ako ne možeš da ideš u školu od kuće roditelja.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zur Ausbildung" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Art der Schule</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Gymnasium (Oberstufe, Kl. 11–13)", "Fachoberschule (FOS)", "Berufsfachschule (BFS)", "Berufsaufbauschule", "Fachschule", "Abendrealschule / Abendgymnasium", "Kolleg"].map(a => (<label key={a} style={S.chk}><input type="radio" name="schulart" checked={f.schulart === a} onChange={() => set("schulart", a)} />{a}</label>))}
            <label style={S.chk}><input type="radio" name="schulart" checked={f.schulart === "Sonstiges"} onChange={() => set("schulart", "Sonstiges")} /><TOpt value="Sonstiges:" /></label>
          </div>
          {f.schulart === "Sonstiges" && <input style={{ ...S.inp, width: "100%", marginTop: 4 }} value={f.sonstigeSchulart} onChange={e => set("sonstigeSchulart", e.target.value)} />}
        </div>
        <div style={S.row}><Field label="Name der Schule" value={f.schuleName} onChange={v => set("schuleName", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.schuleStrasse} onChange={v => set("schuleStrasse", v)} /><Field label="PLZ" width={80} value={f.schulePlz} onChange={v => set("schulePlz", v)} /><Field label="Ort" flex={1} value={f.schuleOrt} onChange={v => set("schuleOrt", v)} /></div>
        <div style={S.row}><Field label="Ausbildungsgang / Klasse / Fachrichtung" value={f.ausbildungsgang} onChange={v => set("ausbildungsgang", v)} /></div>
        <div style={S.row}><Field label="Beginn der Ausbildung" type="date" value={f.beginn} onChange={v => set("beginn", v)} /><Field label="Voraussichtliches Ende" type="date" value={f.ende} onChange={v => set("ende", v)} /><Field label="Aktuelles Schuljahr / Klasse" value={f.aktuellesSchuljahr} onChange={v => set("aktuellesSchuljahr", v)} /></div>
        <Info>ℹ️ Ko ima pravo na Schüler-BAföG? Ne dobijaju svi učenici — samo oni koji pohađaju određene vrste škola I koji moraju živjeti van roditeljskog doma jer je škola predaleko. Standardne Hauptschule i Realschule obično ne daju pravo na BAföG.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Wohnsituation während der Ausbildung" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Wohnst du während der Ausbildung:</div>
          <Radio name="wohnung" value={f.wohnung} options={["Bei den Eltern", "In eigener Wohnung / Untermiete", "Im Internat / Wohnheim", "In einer WG"]} onChange={v => set("wohnung", v)} />
        </div>
        <Info>ℹ️ Zašto je stanovanje presudno? Schüler-BAföG se može dobiti uglavnom ako NE živiš kod roditelja. Izuzeci postoje ako škola nije dostupna javnim prevozom u razumnom vremenu od roditeljskog doma.</Info>
        <div style={S.row}><Field label="Monatliche Miete / Heimkosten (€)" value={f.monatlicheMiete} onChange={v => set("monatlicheMiete", v)} /><Field label="Entfernung Elternhaus → Schule (km)" value={f.entfernungKm} onChange={v => set("entfernungKm", v)} /><Field label="Fahrzeit ÖPNV (Min.)" value={f.fahrzeitMin} onChange={v => set("fahrzeitMin", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Eigenes Einkommen und Vermögen" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Eigenes Einkommen?</div><Radio name="eigenesEinkommen" value={f.eigenesEinkommen} options={["Ja", "Nein"]} onChange={v => set("eigenesEinkommen", v)} /></div>
        {f.eigenesEinkommen === "Ja" && (<>
          <div style={{ marginBottom: 6 }}><div style={S.lbl}>Art</div><Radio name="einkommensart" value={f.einkommensart} options={["Minijob", "Ausbildungsvergütung", "Sonstiges"]} onChange={v => set("einkommensart", v)} /></div>
          <div style={S.row}><Field label="Betrag netto (€/Monat)" value={f.einkommenNetto} onChange={v => set("einkommenNetto", v)} /></div>
        </>)}
        <div style={S.row}><Field label="Eigenes Vermögen (€)" value={f.eigenesVermoegen} onChange={v => set("eigenesVermoegen", v)} /></div>
        <Info>ℹ️ Vlastita primanja smanjuju BAföG. Minijob do 603 €/mj. se djelimično ne uzima u obzir. Više od toga smanjuje tvoj BAföG iznos.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Angaben zu den Eltern" />
        {f.eltern.map((el, i) => (
          <div key={i} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: i === 0 ? "1px dashed #d1d5db" : "none" }}>
            <div style={{ fontSize: 10, fontWeight: 600, marginBottom: 4 }}>Elternteil {i + 1}</div>
            <div style={S.row}><Field label="Familienname" value={el.name} onChange={v => setEltern(i, "name", v)} /><Field label="Vorname" value={el.vorname} onChange={v => setEltern(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={el.geburtsdatum} onChange={v => setEltern(i, "geburtsdatum", v)} /></div>
            <div style={S.row}><Field label="Anschrift (falls abweichend)" value={el.adresse} onChange={v => setEltern(i, "adresse", v)} /></div>
            <div style={S.row}><Field label="Beruf / Tätigkeit" value={el.beruf} onChange={v => setEltern(i, "beruf", v)} /><Field label="Bruttojahreseinkommen (€, vorletztes Jahr)" value={el.bruttojahreseinkommen} onChange={v => setEltern(i, "bruttojahreseinkommen", v)} /></div>
          </div>
        ))}
        <Info>ℹ️ Zašto se upisuju primanja roditelja? Schüler-BAföG zavisi od prihoda roditelja. Koristi se prihod od PRETPROŠLE godine (npr. za 2024 → prihodi iz 2022). Ako su prihodi roditelja previsoki, nema BAföG.</Info>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Eltern verheiratet?</div><Radio name="elternVerheiratet" value={f.elternVerheiratet} options={["Ja", "Nein"]} onChange={v => set("elternVerheiratet", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Eltern getrennt / geschieden?</div><Radio name="elternGetrennt" value={f.elternGetrennt} options={["Ja", "Nein"]} onChange={v => set("elternGetrennt", v)} /></div>
        {f.elternGetrennt === "Ja" && <div style={S.row}><Field label="Seit" type="date" value={f.getrenntSeit} onChange={v => set("getrenntSeit", v)} /></div>}
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Elternteil verstorben?</div><Radio name="elternteilVerstorben" value={f.elternteilVerstorben} options={["Elternteil 1", "Elternteil 2", "Nein"]} onChange={v => set("elternteilVerstorben", v)} /></div>
        <div style={S.row}><Field label="Unterhalt von Eltern (€/Monat)" value={f.unterhaltVonEltern} onChange={v => set("unterhaltVonEltern", v)} /></div>
        <div style={{ marginBottom: 6 }}><label style={S.chk}><input type="checkbox" checked={f.unterhaltNichtGezahlt === "Ja"} onChange={e => set("unterhaltNichtGezahlt", e.target.checked ? "Ja" : "")} /><TOpt value="Unterhalt wird nicht gezahlt" /></label></div>
        {f.unterhaltNichtGezahlt === "Ja" && <div style={S.row}><Field label="Grund" value={f.unterhaltGrund} onChange={v => set("unterhaltGrund", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Geschwister" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Geschwister in Ausbildung / Studium?</div><Radio name="geschwisterJa" value={f.geschwisterJa} options={["Ja", "Nein"]} onChange={v => set("geschwisterJa", v)} /></div>
        {f.geschwisterJa === "Ja" && f.geschwister.map((g, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={S.row}><Field label="Name" value={g.name} onChange={v => setGeschw(i, "name", v)} /><Field label="Geburtsdatum" type="date" value={g.geburtsdatum} onChange={v => setGeschw(i, "geburtsdatum", v)} /><Field label="Ausbildungsart" value={g.ausbildungsart} onChange={v => setGeschw(i, "ausbildungsart", v)} /><Field label="Schule/Hochschule" value={g.schule} onChange={v => setGeschw(i, "schule", v)} /></div>
          </div>
        ))}
        <Info>ℹ️ Zašto se upisuje braća/sestre? Ako i braća ili sestre studiraju ili idu u školu, to povećava tvoje šanse na BAföG jer se freibeträge za roditelje smanjuju.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="Krankenversicherung" />
        <Radio name="krankenversicherung" value={f.krankenversicherung} options={["Familienversichert über Eltern (GKV)", "Eigene gesetzliche KV", "Private KV"]} onChange={v => set("krankenversicherung", v)} />
        {f.krankenversicherung === "Eigene gesetzliche KV" && <div style={{ ...S.row, marginTop: 6 }}><Field label="Krankenkasse" value={f.kvKasse} onChange={v => set("kvKasse", v)} /></div>}
        {(f.krankenversicherung === "Eigene gesetzliche KV" || f.krankenversicherung === "Private KV") && <div style={S.row}><Field label="Monatlicher Beitrag (€)" value={f.kvBeitrag} onChange={v => set("kvBeitrag", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift Schüler/in" /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift Elternteil 1 (wenn minderjährig)" /></div>
        <div style={{ ...S.row, marginTop: 8 }}><Field label="Zuständiges Amt für Ausbildungsförderung" value={f.amt} onChange={v => set("amt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
