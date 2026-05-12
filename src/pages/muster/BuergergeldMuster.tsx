import { useState } from "react";
import { useTranslation } from "react-i18next";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import { fillBuergergeldPdf, downloadBlob, type BuergergeldFormData } from "@/lib/pdf-fill-buergergeld";

const LS_KEY = "buergergeld-muster-data";
const PDF_URL = "/muster/buergergeld-hauptantrag-2026.pdf";

const TABS = [
  { key: "ha", label: "Hauptantrag (HA)" },
  { key: "ek", label: "Einkommenserklärung (EK)" },
  { key: "kdu", label: "Kosten der Unterkunft (KDU)" },
  { key: "vm", label: "Vermögenserklärung (VM)" },
] as const;
type Tab = typeof TABS[number]["key"];

const Info = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: 10, margin: "8px 0", fontSize: 10, color: "#1e3a5f", lineHeight: 1.5 }}>{children}</div>
);

const Radio = ({ name, value, options, onChange }: { name: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{options.map(o => (<label key={o} style={S.chk}><input type="radio" name={name} checked={value === o} onChange={() => onChange(o)} />{o}</label>))}</div>
);

const CheckAmount = ({ label, checked, amount, onCheck, onAmount }: { label: string; checked: boolean; amount: string; onCheck: (v: boolean) => void; onAmount: (v: string) => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
    <label style={S.chk}><input type="checkbox" checked={checked} onChange={e => onCheck(e.target.checked)} />{label}</label>
    {checked && <input style={{ ...S.inp, width: 100 }} placeholder="€" value={amount} onChange={e => onAmount(e.target.value)} />}
  </div>
);

const emptyPerson = () => ({ name: "", vorname: "", geburtsdatum: "", verwandtschaft: "", eigenesEinkommen: "", eigenesVermoegen: "" });
const emptyEkPerson = () => ({ erwerbstaetig: "", art: "", arbeitgeber: "", brutto: "", netto: "", wochenstunden: "", kindergeld: "", kindergeldAmt: "", unterhalt: "", unterhaltAmt: "", rente: "", renteAmt: "", krankengeld: "", krankengeldAmt: "", elterngeld: "", elterngeldAmt: "", wohngeld: "", wohngeldAmt: "", mieteinnahmen: "", mieteinnahmenAmt: "", kapitalertraege: "", sonstigeEink: "", sonstigeEinkArt: "", sonstigeEinkAmt: "", keinEinkommen: false, zahltUnterhalt: "", unterhaltAnWen: "", unterhaltBetrag: "", sigOrt: "", sigDatum: "" });
const emptyVmPerson = () => ({ giroIban: "", giroGuthaben: "", sparGuthaben: "", festgeld: "", bargeld: "", aktien: "", krypto: "", sonstigesWp: "", leben: "", privatRente: "", bauspar: "", weitereImmo: "", immoArt: "", immoWert: "", immoAdresse: "", kfz: "", kfzMarke: "", kfzBaujahr: "", kfzWert: "", kfz2: "", kfz2Marke: "", kfz2Baujahr: "", kfz2Wert: "", schmuck: "", beteiligungen: "", forderungen: "", sonstigesVm: "", sonstigesVmArt: "", sigOrt: "", sigDatum: "" });

const initial = () => ({
  tab: "ha" as Tab,
  familienname: "", vorname: "", geburtsdatum: "", geburtsort: "", steuerId: "", svNummer: "", staatsangehoerigkeit: "",
  aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  weiterePersonen: "Nein",
  personen: Array.from({ length: 5 }, emptyPerson),
  erwerbstaetig: "", arbeitgeber: "", wochenstunden: "", erwerbSeit: "",
  jobcenterGemeldet: "", schulabschluss: "", berufsausbildung: "",
  sigOrt: "", sigDatum: "",
  ekPersonen: Array.from({ length: 5 }, emptyEkPerson),
  wohnart: "", kaltmiete: "", nebenkosten: "", heizkosten: "", warmwasserEnthalten: "", warmwasser: "", garage: "",
  vermieterName: "", vermieterStrasse: "", vermieterPlz: "", vermieterOrt: "", mietvertrag: "", mietvertragSeit: "",
  wohnflaeche: "", zimmer: "", personenImHaushalt: "",
  strom: "", gas: "", fernwaerme: "",
  kduSigOrt: "", kduSigDatum: "",
  vmPersonen: Array.from({ length: 5 }, emptyVmPerson),
});

export default function BuergergeldMuster() {
  const { t } = useTranslation("forms");
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const [generating, setGenerating] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const set = (k: string, v: any) => setF(p => ({ ...p, [k]: v }));
  const setPerson = (i: number, k: string, v: string) => setF(p => { const ps = [...p.personen]; ps[i] = { ...ps[i], [k]: v }; return { ...p, personen: ps }; });
  const setEk = (i: number, k: string, v: any) => setF(p => { const ps = [...p.ekPersonen]; ps[i] = { ...ps[i], [k]: v }; return { ...p, ekPersonen: ps }; });
  const setVm = (i: number, k: string, v: any) => setF(p => { const ps = [...p.vmPersonen]; ps[i] = { ...ps[i], [k]: v }; return { ...p, vmPersonen: ps }; });

  const toPdfData = (): BuergergeldFormData => ({
    familienname: f.familienname, vorname: f.vorname, geburtsdatum: f.geburtsdatum,
    geburtsort: f.geburtsort, staatsangehoerigkeit: f.staatsangehoerigkeit,
    steuerId: f.steuerId, svNummer: f.svNummer,
    strasse: f.strasse, plz: f.plz, ort: f.ort, telefon: f.telefon,
    iban: f.iban, kontoinhaber: f.kontoinhaber || `${f.vorname} ${f.familienname}`.trim(),
    aufenthaltstitelArt: f.aufenthaltstitelArt,
    erwerbstaetig: (f.erwerbstaetig as "Ja" | "Nein" | "") || "",
    arbeitgeber: f.arbeitgeber,
    weiterePersonen: (f.weiterePersonen as "Ja" | "Nein" | "") || "",
    sigDatum: f.sigDatum,
  });

  const handleAutoFill = async () => {
    setPdfError(null); setGenerating(true);
    try {
      const blob = await fillBuergergeldPdf(toPdfData());
      const fname = `Buergergeld-HA-${f.familienname || "antrag"}.pdf`.replace(/\s+/g, "_");
      downloadBlob(blob, fname);
    } catch (e) {
      setPdfError(e instanceof Error ? e.message : String(e));
    } finally { setGenerating(false); }
  };

  const gesamtMiete = [f.kaltmiete, f.nebenkosten, f.heizkosten, f.warmwasserEnthalten === "Nein" ? f.warmwasser : "0", f.garage].reduce((s, v) => s + (parseFloat(v) || 0), 0);

  const getGesamtVermoegen = (i: number) => {
    const v = f.vmPersonen[i];
    return [v.giroGuthaben, v.sparGuthaben, v.festgeld, v.bargeld, v.aktien, v.krypto, v.sonstigesWp, v.leben, v.privatRente, v.bauspar, v.immoWert, v.kfzWert, v.kfz2Wert, v.schmuck, v.beteiligungen, v.forderungen, v.sonstigesVm].reduce((s, x) => s + (parseFloat(x as string) || 0), 0);
  };

  const personCount = f.weiterePersonen === "Ja" ? f.personen.filter(p => p.name || p.vorname).length + 1 : 1;

  return (
    <MusterFormBase rootId="bg-root" title="Antrag auf Bürgergeld" subtitle={t("musterFlow.buergergeld.subtitle", "Musterformular — BalkanLink — nur zur Orientierung")} pdfUrl={PDF_URL} pdfLabel={t("musterFlow.buergergeld.originalLink", "Preuzmi prazan originalni HA PDF →")} footerNote={t("musterFlow.buergergeld.footerNote", "Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Jobcenter einreichen • BalkanLink ist keine staatliche Stelle")} lsKey={LS_KEY} formularId="buergergeld" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <Info>
        📋 Bürgergeld se podnosi u 4 dijela. Svi dijelovi se predaju zajedno u Jobcenter. Ovaj Musterformular ti pomaže da se upoznaš sa svakim poljem.
      </Info>

      {/* Tab navigation */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
        {TABS.map(tb => (
          <button key={tb.key} onClick={() => set("tab", tb.key)} style={{ padding: "8px 12px", fontSize: 11, fontWeight: f.tab === tb.key ? 700 : 400, background: f.tab === tb.key ? "#1d4ed8" : "#e5e7eb", color: f.tab === tb.key ? "#fff" : "#374151", border: "none", borderRadius: 6, cursor: "pointer", flex: "1 1 auto", minWidth: 120 }}>{tb.label}</button>
        ))}
      </div>

      {/* ===== TAB 1: HAUPTANTRAG ===== */}
      {f.tab === "ha" && (<>
        <div style={{ marginBottom: 18, padding: 16, background: "#ECFDF5", border: "2px solid #10B981", borderRadius: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#065F46", marginBottom: 6 }}>
            ✅ {t("musterFlow.buergergeld.autofillTitle", "Popuni online → preuzmi 1:1 originalni Jobcenter HA PDF")}
          </div>
          <div style={{ fontSize: 12, color: "#065F46", lineHeight: 1.55, marginBottom: 12 }}>
            {t("musterFlow.buergergeld.autofillBody", "Tvoji HA podaci se popunjavaju u zvanični Bürgergeld Hauptantrag (Stand 04/2026) lokalno u tvom browseru — ništa ne ide na server. Anlage EK / KDU / VM popunjavaš zasebno.")}
          </div>
          <button
            onClick={handleAutoFill}
            disabled={generating}
            style={{ background: generating ? "#9CA3AF" : "#15803d", color: "#fff", border: "none", padding: "12px 18px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: generating ? "wait" : "pointer", boxShadow: "0 4px 12px rgba(21,128,61,0.3)" }}
          >
            {generating ? t("musterFlow.buergergeld.generating", "Generiram PDF…") : `📄 ${t("musterFlow.buergergeld.downloadFilled", "Preuzmi popunjeni HA PDF")}`}
          </button>
          {pdfError && <div style={{ marginTop: 8, color: "#DC2626", fontSize: 12 }}>⚠ {pdfError}</div>}
        </div>
        <Info>Hauptantrag je osnova zahtjeva. Ovdje se upisuju lični podaci, podaci o zajedničkom domaćinstvu i bankovni račun.</Info>

        <div style={S.sec}>
          <SecHeader num={1} title="Persönliche Daten Antragsteller/in" />
          <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Vorname" value={f.vorname} onChange={v => set("vorname", v)} /></div>
          <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
          <div style={{ marginBottom: 6 }}><div style={S.lbl}>Steuerliche Identifikationsnummer</div><IdBoxes count={11} value={f.steuerId} onChange={v => set("steuerId", v)} /></div>
          <div style={S.row}><Field label="Sozialversicherungsnummer" value={f.svNummer} onChange={v => set("svNummer", v)} /></div>
          <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
          <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
          <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
          <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
          <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
          <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber/in" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
          <Info>ℹ️ Steuer-ID vs. Sozialversicherungsnummer: Steuer-ID = 11 cifara, dobija se automatski. Sozialversicherungsnummer = na zelenoj SV karti, format: XX 123456 X 123 X</Info>
        </div>

        <div style={S.sec}>
          <SecHeader num={2} title="Bedarfsgemeinschaft" />
          <div><div style={S.lbl}>Antrag für weitere Personen?</div>
            <Radio name="weiterePersonen" value={f.weiterePersonen} options={["Ja", "Nein"]} onChange={v => set("weiterePersonen", v)} />
          </div>
          <Info>ℹ️ Bedarfsgemeinschaft je zajedništvo osoba koje zajedno žive i dijele troškove. Svaka osoba u domaćinstvu mora biti upisana — suprug/a, djeca, partner.</Info>
          {f.weiterePersonen === "Ja" && f.personen.map((p, i) => (
            <div key={i} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: i < 4 ? "1px dashed #d1d5db" : "none" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#374151", marginBottom: 4 }}>Person {i + 1}</div>
              <div style={S.row}><Field label="Familienname" value={p.name} onChange={v => setPerson(i, "name", v)} /><Field label="Vorname" value={p.vorname} onChange={v => setPerson(i, "vorname", v)} /><Field label="Geburtsdatum" type="date" value={p.geburtsdatum} onChange={v => setPerson(i, "geburtsdatum", v)} /></div>
              <div style={{ marginBottom: 6 }}><div style={S.lbl}>Verwandtschaft</div>
                <Radio name={`verwandtschaft${i}`} value={p.verwandtschaft} options={["Ehegatte/Lebenspartner", "Kind", "Sonstige"]} onChange={v => setPerson(i, "verwandtschaft", v)} />
              </div>
              <div style={S.row}>
                <div style={{ flex: 1 }}><div style={S.lbl}>Eigenes Einkommen?</div><Radio name={`eigenesEinkommen${i}`} value={p.eigenesEinkommen} options={["Ja", "Nein"]} onChange={v => setPerson(i, "eigenesEinkommen", v)} /></div>
                <div style={{ flex: 1 }}><div style={S.lbl}>Eigenes Vermögen über 15.000 €?</div><Radio name={`eigenesVermoegen${i}`} value={p.eigenesVermoegen} options={["Ja", "Nein"]} onChange={v => setPerson(i, "eigenesVermoegen", v)} /></div>
              </div>
            </div>
          ))}
        </div>

        <div style={S.sec}>
          <SecHeader num={3} title="Aktueller Status" />
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Aktuell erwerbstätig?</div><Radio name="erwerbstaetig" value={f.erwerbstaetig} options={["Ja", "Nein"]} onChange={v => set("erwerbstaetig", v)} /></div>
          {f.erwerbstaetig === "Ja" && <div style={S.row}><Field label="Arbeitgeber" value={f.arbeitgeber} onChange={v => set("arbeitgeber", v)} /><Field label="seit" type="date" value={f.erwerbSeit} onChange={v => set("erwerbSeit", v)} /><Field label="Wochenstunden" value={f.wochenstunden} onChange={v => set("wochenstunden", v)} /></div>}
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Beim Jobcenter / Arbeitsagentur gemeldet?</div><Radio name="jobcenterGemeldet" value={f.jobcenterGemeldet} options={["Ja", "Nein"]} onChange={v => set("jobcenterGemeldet", v)} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Schulabschluss</div><Radio name="schulabschluss" value={f.schulabschluss} options={["kein", "Hauptschule", "Realschule", "Abitur"]} onChange={v => set("schulabschluss", v)} /></div>
          <div><div style={S.lbl}>Berufsausbildung</div><Radio name="berufsausbildung" value={f.berufsausbildung} options={["keine", "abgeschlossen", "in Ausbildung"]} onChange={v => set("berufsausbildung", v)} /></div>
        </div>

        <div style={S.sec}>
          <SecHeader num={4} title="Unterschrift" />
          <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
          <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        </div>
      </>)}

      {/* ===== TAB 2: EINKOMMENSERKLÄRUNG ===== */}
      {f.tab === "ek" && (<>
        <Info>Einkommenserklärung se ispunjava za SVAKU osobu u Bedarfsgemeinschaft posebno. Ovdje prijavljuješ sve prihode — i male iznose.</Info>
        {Array.from({ length: personCount }).map((_, i) => {
          const ek = f.ekPersonen[i] || emptyEkPerson();
          return (
            <div key={i} style={{ ...S.sec, borderColor: "#93c5fd" }}>
              <SecHeader num={i + 1} title={i === 0 ? "Antragsteller/in" : `Person ${i + 1}${f.personen[i - 1]?.name ? ` — ${f.personen[i - 1].name}` : ""}`} />

              <div style={{ marginBottom: 8 }}><div style={S.lbl}>Einkommen aus Erwerbstätigkeit</div>
                <Radio name={`ekErwerbstaetig${i}`} value={ek.erwerbstaetig} options={["Ja", "Nein"]} onChange={v => setEk(i, "erwerbstaetig", v)} />
              </div>
              {ek.erwerbstaetig === "Ja" && (<>
                <div style={{ marginBottom: 6 }}><div style={S.lbl}>Art</div><Radio name={`ekArt${i}`} value={ek.art} options={["Angestellt", "Minijob", "Selbstständig"]} onChange={v => setEk(i, "art", v)} /></div>
                <div style={S.row}><Field label="Arbeitgeber" value={ek.arbeitgeber} onChange={v => setEk(i, "arbeitgeber", v)} /></div>
                <div style={S.row}><Field label="Bruttolohn (€/Monat)" value={ek.brutto} onChange={v => setEk(i, "brutto", v)} /><Field label="Nettolohn (€/Monat)" value={ek.netto} onChange={v => setEk(i, "netto", v)} /><Field label="Wochenstunden" value={ek.wochenstunden} onChange={v => setEk(i, "wochenstunden", v)} /></div>
                <Info>ℹ️ Minijob (do 603 €/mj.) se i dalje mora prijaviti, ali se djelimično ne uračunava u Bürgergeld.</Info>
              </>)}

              <div style={{ marginTop: 8 }}><div style={{ ...S.lbl, fontWeight: 600 }}>Sonstige Einnahmen</div></div>
              <CheckAmount label="Kindergeld" checked={ek.kindergeld === "Ja"} amount={ek.kindergeldAmt} onCheck={v => setEk(i, "kindergeld", v ? "Ja" : "")} onAmount={v => setEk(i, "kindergeldAmt", v)} />
              <CheckAmount label="Unterhalt (primljeni)" checked={ek.unterhalt === "Ja"} amount={ek.unterhaltAmt} onCheck={v => setEk(i, "unterhalt", v ? "Ja" : "")} onAmount={v => setEk(i, "unterhaltAmt", v)} />
              <CheckAmount label="Rente / Pension" checked={ek.rente === "Ja"} amount={ek.renteAmt} onCheck={v => setEk(i, "rente", v ? "Ja" : "")} onAmount={v => setEk(i, "renteAmt", v)} />
              <CheckAmount label="Krankengeld" checked={ek.krankengeld === "Ja"} amount={ek.krankengeldAmt} onCheck={v => setEk(i, "krankengeld", v ? "Ja" : "")} onAmount={v => setEk(i, "krankengeldAmt", v)} />
              <CheckAmount label="Elterngeld" checked={ek.elterngeld === "Ja"} amount={ek.elterngeldAmt} onCheck={v => setEk(i, "elterngeld", v ? "Ja" : "")} onAmount={v => setEk(i, "elterngeldAmt", v)} />
              <CheckAmount label="Wohngeld" checked={ek.wohngeld === "Ja"} amount={ek.wohngeldAmt} onCheck={v => setEk(i, "wohngeld", v ? "Ja" : "")} onAmount={v => setEk(i, "wohngeldAmt", v)} />
              <CheckAmount label="Mieteinnahmen" checked={ek.mieteinnahmen === "Ja"} amount={ek.mieteinnahmenAmt} onCheck={v => setEk(i, "mieteinnahmen", v ? "Ja" : "")} onAmount={v => setEk(i, "mieteinnahmenAmt", v)} />
              <CheckAmount label="Kapitalerträge (€/Jahr)" checked={ek.kapitalertraege === "Ja"} amount={ek.kapitalertraege === "Ja" ? ek.kapitalertraege : ""} onCheck={v => setEk(i, "kapitalertraege", v ? "Ja" : "")} onAmount={v => setEk(i, "kapitalertraege", v)} />
              <CheckAmount label="Sonstige" checked={ek.sonstigeEink === "Ja"} amount={ek.sonstigeEinkAmt} onCheck={v => setEk(i, "sonstigeEink", v ? "Ja" : "")} onAmount={v => setEk(i, "sonstigeEinkAmt", v)} />
              {ek.sonstigeEink === "Ja" && <div style={S.row}><Field label="Art" value={ek.sonstigeEinkArt} onChange={v => setEk(i, "sonstigeEinkArt", v)} /></div>}
              <label style={{ ...S.chk, marginTop: 4 }}><input type="checkbox" checked={!!ek.keinEinkommen} onChange={e => setEk(i, "keinEinkommen", e.target.checked)} /><TOpt value="Kein Einkommen" /></label>

              <Info>ℹ️ Zašto se Kindergeld upisuje? Kindergeld se prima kao prihod i oduzima od Bürgergelda. Ne gubi se — samo se uračunava.</Info>

              <div style={{ marginTop: 8 }}><div style={S.lbl}>Unterhaltszahlungen (gezahlte)</div>
                <Radio name={`zahltUnterhalt${i}`} value={ek.zahltUnterhalt} options={["Ja", "Nein"]} onChange={v => setEk(i, "zahltUnterhalt", v)} />
              </div>
              {ek.zahltUnterhalt === "Ja" && <div style={S.row}><Field label="An wen" value={ek.unterhaltAnWen} onChange={v => setEk(i, "unterhaltAnWen", v)} /><Field label="Betrag (€/Monat)" value={ek.unterhaltBetrag} onChange={v => setEk(i, "unterhaltBetrag", v)} /></div>}

              <div style={{ ...S.row, marginTop: 10 }}><Field label="Ort" value={ek.sigOrt} onChange={v => setEk(i, "sigOrt", v)} /><Field label="Datum" type="date" value={ek.sigDatum} onChange={v => setEk(i, "sigDatum", v)} /></div>
              <Signature label="Unterschrift" />
            </div>
          );
        })}
      </>)}

      {/* ===== TAB 3: KOSTEN DER UNTERKUNFT ===== */}
      {f.tab === "kdu" && (<>
        <Info>KDU je obrazac o troškovima stanovanja. Jobcenter preuzima stanarinu i režije ako su u dozvoljenim granicama. Iznosi se razlikuju po gradu/okrugu.</Info>

        <div style={S.sec}>
          <SecHeader num={1} title="Art des Wohnraums" />
          <Radio name="wohnart" value={f.wohnart} options={["Mietwohnung", "Untermiete", "Wohngemeinschaft (WG)", "Eigentumswohnung / Haus", "Wohnheim"]} onChange={v => set("wohnart", v)} />
        </div>

        <div style={S.sec}>
          <SecHeader num={2} title="Mietkosten" />
          <div style={S.row}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Betriebskosten / Nebenkosten (€/Monat)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /></div>
          <div style={S.row}><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
          <Info>ℹ️ Angemessene Miete: Jobcenter plaća stanarinu samo do određenog iznosa koji zavisi od veličine grada i broja osoba. Ako je stanarina previsoka, možete dobiti obavijest da se preselite u jeftiniji stan.</Info>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Warmwasserkosten enthalten in Heizkosten?</div><Radio name="warmwasserEnthalten" value={f.warmwasserEnthalten} options={["Ja", "Nein"]} onChange={v => set("warmwasserEnthalten", v)} /></div>
          {f.warmwasserEnthalten === "Nein" && <div style={S.row}><Field label="Warmwasser (€/Monat)" value={f.warmwasser} onChange={v => set("warmwasser", v)} /></div>}
          <div style={S.row}><Field label="Garagenmiete (€/Monat)" value={f.garage} onChange={v => set("garage", v)} /></div>
          <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 6, padding: 8, fontSize: 11, fontWeight: 600 }}>Gesamtmiete inkl. NK: {gesamtMiete.toFixed(2)} €/Monat</div>
        </div>

        <div style={S.sec}>
          <SecHeader num={3} title="Vermieter" />
          <div style={S.row}><Field label="Name / Firma" value={f.vermieterName} onChange={v => set("vermieterName", v)} /></div>
          <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.vermieterStrasse} onChange={v => set("vermieterStrasse", v)} /><Field label="PLZ" width={80} value={f.vermieterPlz} onChange={v => set("vermieterPlz", v)} /><Field label="Ort" flex={1} value={f.vermieterOrt} onChange={v => set("vermieterOrt", v)} /></div>
          <div style={{ marginBottom: 8 }}><div style={S.lbl}>Mietvertrag vorhanden?</div><Radio name="mietvertrag" value={f.mietvertrag} options={["Ja", "Nein"]} onChange={v => set("mietvertrag", v)} /></div>
          {f.mietvertrag === "Ja" && <div style={S.row}><Field label="Mietvertrag seit (Datum)" type="date" value={f.mietvertragSeit} onChange={v => set("mietvertragSeit", v)} /></div>}
        </div>

        <div style={S.sec}>
          <SecHeader num={4} title="Wohnungsgröße" />
          <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /><Field label="Anzahl der Zimmer" value={f.zimmer} onChange={v => set("zimmer", v)} /><Field label="Anzahl Personen im Haushalt" value={f.personenImHaushalt} onChange={v => set("personenImHaushalt", v)} /></div>
          <Info>ℹ️ Pravilo za veličinu stana: 1 osoba = do 50 m², 2 osobe = do 60 m², svaka dodatna osoba = +10 m² (okvirno, zavisi od grada)</Info>
        </div>

        <div style={S.sec}>
          <SecHeader num={5} title="Energiekosten (ako su odvojeni od stanarine)" />
          <div style={S.row}><Field label="Strom (€/Monat)" value={f.strom} onChange={v => set("strom", v)} /><Field label="Gas (€/Monat)" value={f.gas} onChange={v => set("gas", v)} /><Field label="Fernwärme (€/Monat)" value={f.fernwaerme} onChange={v => set("fernwaerme", v)} /></div>
        </div>

        <div style={S.sec}>
          <div style={S.row}><Field label="Ort" value={f.kduSigOrt} onChange={v => set("kduSigOrt", v)} /><Field label="Datum" type="date" value={f.kduSigDatum} onChange={v => set("kduSigDatum", v)} /></div>
          <Signature label="Unterschrift" />
        </div>
      </>)}

      {/* ===== TAB 4: VERMÖGENSERKLÄRUNG ===== */}
      {f.tab === "vm" && (<>
        <Info>Vermögenserklärung je izjava o imetku. Moraš prijaviti svu imovinu. Dozvoljeni iznos je 15.000 € po osobi (2024). Kuća u kojoj živiš i jedan auto se ne računaju.</Info>
        {Array.from({ length: personCount }).map((_, i) => {
          const v = f.vmPersonen[i] || emptyVmPerson();
          return (
            <div key={i} style={{ ...S.sec, borderColor: "#fbbf24" }}>
              <SecHeader num={i + 1} title={i === 0 ? "Antragsteller/in" : `Person ${i + 1}${f.personen[i - 1]?.name ? ` — ${f.personen[i - 1].name}` : ""}`} />

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Bankguthaben und Bargeld</div>
              <div style={S.row}><Field label="Girokonto IBAN" value={v.giroIban} onChange={x => setVm(i, "giroIban", x)} /><Field label="Guthaben (€)" value={v.giroGuthaben} onChange={x => setVm(i, "giroGuthaben", x)} /></div>
              <div style={S.row}><Field label="Sparkonto / Tagesgeld (€)" value={v.sparGuthaben} onChange={x => setVm(i, "sparGuthaben", x)} /><Field label="Festgeld / Termingeld (€)" value={v.festgeld} onChange={x => setVm(i, "festgeld", x)} /></div>
              <div style={S.row}><Field label="Bargeld (€)" value={v.bargeld} onChange={x => setVm(i, "bargeld", x)} /></div>
              <Info>ℹ️ Zašto se prijavljuju svi računi? Jobcenter može provjeriti stanje računa kod Bundeszentralamt für Steuern. Netačni podaci mogu biti kazneni prekršaj.</Info>

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Wertpapiere / Investitionen</div>
              <div style={S.row}><Field label="Aktien, Fonds, ETFs (€)" value={v.aktien} onChange={x => setVm(i, "aktien", x)} /><Field label="Kryptowährungen (€)" value={v.krypto} onChange={x => setVm(i, "krypto", x)} /><Field label="Sonstiges (€)" value={v.sonstigesWp} onChange={x => setVm(i, "sonstigesWp", x)} /></div>

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Versicherungen</div>
              <div style={S.row}><Field label="Lebensversicherung Rückkaufwert (€)" value={v.leben} onChange={x => setVm(i, "leben", x)} /><Field label="Priv. Rentenversicherung (€)" value={v.privatRente} onChange={x => setVm(i, "privatRente", x)} /><Field label="Bausparvertrag (€)" value={v.bauspar} onChange={x => setVm(i, "bauspar", x)} /></div>

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Immobilien (außer selbst genutztes Wohneigentum)</div>
              <div style={{ marginBottom: 6 }}><div style={S.lbl}>Weitere Immobilien?</div><Radio name={`weitereImmo${i}`} value={v.weitereImmo} options={["Ja", "Nein"]} onChange={x => setVm(i, "weitereImmo", x)} /></div>
              {v.weitereImmo === "Ja" && <div style={S.row}><Field label="Art" value={v.immoArt} onChange={x => setVm(i, "immoArt", x)} /><Field label="Wert (€)" value={v.immoWert} onChange={x => setVm(i, "immoWert", x)} /><Field label="Adresse" value={v.immoAdresse} onChange={x => setVm(i, "immoAdresse", x)} /></div>}
              <Info>ℹ️ Vlastita nekretnina: Kuća ili stan u kojoj ŽIVIŠ se NE računa kao imovina. Sve ostale nekretnine (npr. iznajmljeni stan) se prijavljuju.</Info>

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Kraftfahrzeuge</div>
              <div style={{ marginBottom: 6 }}><div style={S.lbl}>KFZ vorhanden?</div><Radio name={`kfz${i}`} value={v.kfz} options={["Ja", "Nein"]} onChange={x => setVm(i, "kfz", x)} /></div>
              {v.kfz === "Ja" && (<>
                <div style={S.row}><Field label="Marke/Modell" value={v.kfzMarke} onChange={x => setVm(i, "kfzMarke", x)} /><Field label="Baujahr" value={v.kfzBaujahr} onChange={x => setVm(i, "kfzBaujahr", x)} /><Field label="Wert (€)" value={v.kfzWert} onChange={x => setVm(i, "kfzWert", x)} /></div>
                <div style={{ marginBottom: 6 }}><div style={S.lbl}>Zweites KFZ?</div><Radio name={`kfz2${i}`} value={v.kfz2} options={["Ja", "Nein"]} onChange={x => setVm(i, "kfz2", x)} /></div>
                {v.kfz2 === "Ja" && <div style={S.row}><Field label="Marke/Modell" value={v.kfz2Marke} onChange={x => setVm(i, "kfz2Marke", x)} /><Field label="Baujahr" value={v.kfz2Baujahr} onChange={x => setVm(i, "kfz2Baujahr", x)} /><Field label="Wert (€)" value={v.kfz2Wert} onChange={x => setVm(i, "kfz2Wert", x)} /></div>}
              </>)}
              <Info>ℹ️ Jedan auto je dozvoljen. Vrijednost ispod oko 7.500 € obično se ne uzima u obzir. Drugi auto mora biti prodan ili prijavljen.</Info>

              <div style={{ ...S.lbl, fontWeight: 600, marginTop: 6 }}>Sonstiges Vermögen</div>
              <div style={S.row}><Field label="Schmuck / Kunst (€)" value={v.schmuck} onChange={x => setVm(i, "schmuck", x)} /><Field label="Unternehmensbeteiligungen (€)" value={v.beteiligungen} onChange={x => setVm(i, "beteiligungen", x)} /></div>
              <div style={S.row}><Field label="Forderungen / Darlehen (€)" value={v.forderungen} onChange={x => setVm(i, "forderungen", x)} /><Field label="Sonstiges: Art" value={v.sonstigesVmArt} onChange={x => setVm(i, "sonstigesVmArt", x)} /><Field label="Wert (€)" value={v.sonstigesVm} onChange={x => setVm(i, "sonstigesVm", x)} /></div>

              <div style={{ background: "#fef3c7", border: "1px solid #fbbf24", borderRadius: 6, padding: 8, fontSize: 11, fontWeight: 600, marginTop: 8 }}>Gesamtvermögen: {getGesamtVermoegen(i).toFixed(2)} €</div>
              <Info>ℹ️ Schonvermögen 2024: 15.000 € po odrasloj osobi se ne mora trošiti. Za djecu važi posebni iznos.</Info>

              <div style={{ ...S.row, marginTop: 10 }}><Field label="Ort" value={v.sigOrt} onChange={x => setVm(i, "sigOrt", x)} /><Field label="Datum" type="date" value={v.sigDatum} onChange={x => setVm(i, "sigDatum", x)} /></div>
              <Signature label="Unterschrift" />
            </div>
          );
        })}
      </>)}

    </MusterFormBase>
  );
}
