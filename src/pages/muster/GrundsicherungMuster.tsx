import { useState } from "react";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "grundsicherung-muster-data";
const PDF_URL = "https://www.deutscher-verein.de/de/uploads/hauptnavigation/downloads/sososo/vordruck-antrag-grundsicherung-im-alter-und-bei-erwerbsminderung-sgbxii.pdf";

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

const emptyKind = () => ({ name: "", vorname: "", geburtsjahr: "", wohnort: "" });

const initial = () => ({
  familienname: "", geburtsname: "", vorname: "", geburtsdatum: "", geburtsort: "", geburtsland: "", geschlecht: "",
  staatsangehoerigkeit: "", aufenthaltstitelArt: "", aufenthaltstitelBis: "",
  rentenversicherungsnr: "", strasse: "", plz: "", ort: "", telefon: "", email: "", iban: "", bic: "", kontoinhaber: "",
  antragsgrund: "", erwerbsminderungNachweis: "", erwerbsminderungSeit: "",
  wohnart: "", kaltmiete: "", nebenkosten: "", heizkosten: "", wohnflaeche: "",
  pflegeheim: "", pflegeheimName: "", eigenanteil: "",
  altersrente: "", altersrenteAmt: "", emRente: "", emRenteAmt: "", witwenrente: "", witwenrenteAmt: "",
  betriebsrente: "", betriebsrenteAmt: "", auslandRente: "", auslandRenteLand: "", auslandRenteAmt: "",
  erwerbseinkommen: "", erwerbseinkommenAmt: "", unterhalt: "", unterhaltAmt: "",
  mieteinnahmen: "", mieteinnahmenAmt: "", kapitalertraege: "", kapitalertraegeAmt: "",
  sonstigeEink: "", sonstigeEinkArt: "", sonstigeEinkAmt: "",
  bankguthaben: "", wertpapiere: "", lebensversicherung: "", kfz: "", kfzWert: "",
  weitereImmo: "", sonstigesVm: "", sonstigesVmArt: "", sonstigesVmWert: "",
  verheiratet: "", partnerName: "", partnerVorname: "", partnerGeburtsdatum: "",
  partnerEinkommen: "", partnerVermoegen: "",
  kvArt: "", kvKasse: "", kvBeitrag: "",
  kinderJa: "", kinder: [emptyKind(), emptyKind(), emptyKind()],
  sozialamt: "", sigOrt: "", sigDatum: "",
});

export default function GrundsicherungMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));
  const setKind = (i: number, k: string, v: string) => setF(p => { const ks = [...p.kinder]; ks[i] = { ...ks[i], [k]: v }; return { ...p, kinder: ks }; });

  return (
    <MusterFormBase rootId="gs-root" title="Antrag auf Grundsicherung im Alter und bei Erwerbsminderung (SGB XII)" subtitle="Sozialamt — Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Preuzmi originalni PDF →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim Sozialamt einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="grundsicherung" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="grundsicherung"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFFBEB", border: "2px solid #F59E0B", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>🏛️ Grundsicherung im Alter se podnosi lično ili poštom u Sozialamt</div>
        <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55 }}>Ne postoji jedinstveni federalni PDF za Grundsicherung — formular zavisi od vašeg grada/Landkreisa i dobija se direktno u Sozialamt-u ili preuzima sa web stranice vašeg Sozialamta. Ovaj vodič te priprema za razgovor s referentom i objašnjava sva standardna polja.</div>
      </div>

      <Info>📋 Šta je Grundsicherung? Socijalna pomoć za osobe koje imaju 67+ godina ili su trajno nesposobne za rad, a nemaju dovoljno prihoda. Razlikuje se od Bürgergelda — ovdje nema obaveze traženja posla.</Info>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur antragstellenden Person" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname" value={f.geburtsname} onChange={v => set("geburtsname", v)} /><Field label="Vorname(n)" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /><Field label="Geburtsland" value={f.geburtsland} onChange={v => set("geburtsland", v)} /></div>
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Geschlecht</div><Radio name="geschlecht" value={f.geschlecht} options={["männlich", "weiblich", "divers"]} onChange={v => set("geschlecht", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Aufenthaltstitel (Nicht-EU): Art" value={f.aufenthaltstitelArt} onChange={v => set("aufenthaltstitelArt", v)} /><Field label="Gültig bis" type="date" value={f.aufenthaltstitelBis} onChange={v => set("aufenthaltstitelBis", v)} /></div>
        <div style={S.row}><Field label="Rentenversicherungsnummer" value={f.rentenversicherungsnr} onChange={v => set("rentenversicherungsnr", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /><Field label="E-Mail" value={f.email} onChange={v => set("email", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>IBAN</div><IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} /></div>
        <div style={S.row}><Field label="BIC" value={f.bic} onChange={v => set("bic", v)} /><Field label="Kontoinhaber/in" value={f.kontoinhaber} onChange={v => set("kontoinhaber", v)} /></div>
        <Info>ℹ️ Rentenversicherungsnummer — nalazi se na zelenoj Sozialversicherungsausweis karti ili u dopisu od Deutsche Rentenversicherung.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Grund des Antrags" />
        <Radio name="antragsgrund" value={f.antragsgrund} options={["67. Lebensjahr vollendet", "Dauerhaft voll erwerbsgemindert (unter 67)"]} onChange={v => set("antragsgrund", v)} />
        {f.antragsgrund === "Dauerhaft voll erwerbsgemindert (unter 67)" && (<>
          <div style={{ marginTop: 6, marginBottom: 6 }}><div style={S.lbl}>Nachweis</div><Radio name="erwerbsminderungNachweis" value={f.erwerbsminderungNachweis} options={["Rentenbescheid", "Gutachten der Rentenversicherung"]} onChange={v => set("erwerbsminderungNachweis", v)} /></div>
          <div style={S.row}><Field label="Erwerbsminderung anerkannt seit" type="date" value={f.erwerbsminderungSeit} onChange={v => set("erwerbsminderungSeit", v)} /></div>
        </>)}
        <Info>ℹ️ Dauerhaft voll erwerbsgemindert znači da medicinskim nalazom nije moguće raditi ni 3 sata dnevno, trajno. Privremena nesposobnost za rad ovdje ne važi.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Wohnsituation" />
        <Radio name="wohnart" value={f.wohnart} options={["Eigene Mietwohnung", "Wohneigentum", "Bei Angehörigen (ohne Miete)", "Pflegeheim / Seniorenheim", "Betreutes Wohnen"]} onChange={v => set("wohnart", v)} />
        {(f.wohnart === "Eigene Mietwohnung" || f.wohnart === "Betreutes Wohnen") && (<>
          <div style={{ ...S.row, marginTop: 8 }}><Field label="Kaltmiete (€/Monat)" value={f.kaltmiete} onChange={v => set("kaltmiete", v)} /><Field label="Nebenkosten (€/Monat)" value={f.nebenkosten} onChange={v => set("nebenkosten", v)} /><Field label="Heizkosten (€/Monat)" value={f.heizkosten} onChange={v => set("heizkosten", v)} /></div>
          <div style={S.row}><Field label="Wohnfläche (m²)" value={f.wohnflaeche} onChange={v => set("wohnflaeche", v)} /></div>
        </>)}
        {f.wohnart === "Pflegeheim / Seniorenheim" && (<>
          <div style={{ ...S.row, marginTop: 8 }}><Field label="Name der Einrichtung" value={f.pflegeheimName} onChange={v => set("pflegeheimName", v)} /><Field label="Monatlicher Eigenanteil (€)" value={f.eigenanteil} onChange={v => set("eigenanteil", v)} /></div>
        </>)}
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Renten und Einkommen" />
        <CheckAmount label="Deutsche Altersrente (€/Monat netto)" checked={f.altersrente === "Ja"} amount={f.altersrenteAmt} onCheck={v => set("altersrente", v ? "Ja" : "")} onAmount={v => set("altersrenteAmt", v)} />
        <CheckAmount label="Erwerbsminderungsrente (€/Monat netto)" checked={f.emRente === "Ja"} amount={f.emRenteAmt} onCheck={v => set("emRente", v ? "Ja" : "")} onAmount={v => set("emRenteAmt", v)} />
        <CheckAmount label="Witwen-/Witwerrente (€/Monat netto)" checked={f.witwenrente === "Ja"} amount={f.witwenrenteAmt} onCheck={v => set("witwenrente", v ? "Ja" : "")} onAmount={v => set("witwenrenteAmt", v)} />
        <CheckAmount label="Betriebsrente (€/Monat netto)" checked={f.betriebsrente === "Ja"} amount={f.betriebsrenteAmt} onCheck={v => set("betriebsrente", v ? "Ja" : "")} onAmount={v => set("betriebsrenteAmt", v)} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <label style={S.chk}><input type="checkbox" checked={f.auslandRente === "Ja"} onChange={e => set("auslandRente", e.target.checked ? "Ja" : "")} /><TOpt value="Ausländische Rente" /></label>
          {f.auslandRente === "Ja" && (<><input style={{ ...S.inp, width: 80 }} placeholder="Land" value={f.auslandRenteLand} onChange={e => set("auslandRenteLand", e.target.value)} /><input style={{ ...S.inp, width: 80 }} placeholder="€/Monat" value={f.auslandRenteAmt} onChange={e => set("auslandRenteAmt", e.target.value)} /></>)}
        </div>
        <CheckAmount label="Erwerbseinkommen (€/Monat netto)" checked={f.erwerbseinkommen === "Ja"} amount={f.erwerbseinkommenAmt} onCheck={v => set("erwerbseinkommen", v ? "Ja" : "")} onAmount={v => set("erwerbseinkommenAmt", v)} />
        <CheckAmount label="Unterhalt (€/Monat)" checked={f.unterhalt === "Ja"} amount={f.unterhaltAmt} onCheck={v => set("unterhalt", v ? "Ja" : "")} onAmount={v => set("unterhaltAmt", v)} />
        <CheckAmount label="Mieteinnahmen (€/Monat)" checked={f.mieteinnahmen === "Ja"} amount={f.mieteinnahmenAmt} onCheck={v => set("mieteinnahmen", v ? "Ja" : "")} onAmount={v => set("mieteinnahmenAmt", v)} />
        <CheckAmount label="Kapitalerträge (€/Jahr)" checked={f.kapitalertraege === "Ja"} amount={f.kapitalertraegeAmt} onCheck={v => set("kapitalertraege", v ? "Ja" : "")} onAmount={v => set("kapitalertraegeAmt", v)} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <label style={S.chk}><input type="checkbox" checked={f.sonstigeEink === "Ja"} onChange={e => set("sonstigeEink", e.target.checked ? "Ja" : "")} /><TOpt value="Sonstige" /></label>
          {f.sonstigeEink === "Ja" && (<><input style={{ ...S.inp, width: 100 }} placeholder="Art" value={f.sonstigeEinkArt} onChange={e => set("sonstigeEinkArt", e.target.value)} /><input style={{ ...S.inp, width: 80 }} placeholder="€" value={f.sonstigeEinkAmt} onChange={e => set("sonstigeEinkAmt", e.target.value)} /></>)}
        </div>
        <Info>ℹ️ Grundsicherung pokriva razliku. Ako primaš 400 € penzije a minimum je 600 €, Sozialamt plaća razliku od 200 €. Prijavi SVE prihode.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Vermögen" />
        <div style={S.row}><Field label="Bankguthaben gesamt (€)" value={f.bankguthaben} onChange={v => set("bankguthaben", v)} /><Field label="Wertpapiere / Aktien (€)" value={f.wertpapiere} onChange={v => set("wertpapiere", v)} /></div>
        <div style={S.row}><Field label="Lebensversicherung / Rückkaufwert (€)" value={f.lebensversicherung} onChange={v => set("lebensversicherung", v)} /></div>
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Kraftfahrzeug?</div><Radio name="kfz" value={f.kfz} options={["Ja", "Nein"]} onChange={v => set("kfz", v)} /></div>
        {f.kfz === "Ja" && <div style={S.row}><Field label="Wert (€)" value={f.kfzWert} onChange={v => set("kfzWert", v)} /></div>}
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Immobilien (außer selbst genutztem Heim)?</div><Radio name="weitereImmo" value={f.weitereImmo} options={["Ja", "Nein"]} onChange={v => set("weitereImmo", v)} /></div>
        <div style={S.row}><Field label="Sonstiges Vermögen: Art" value={f.sonstigesVmArt} onChange={v => set("sonstigesVmArt", v)} /><Field label="Wert (€)" value={f.sonstigesVmWert} onChange={v => set("sonstigesVmWert", v)} /></div>
        <Info>ℹ️ Dozvoljeni imetak (Schonvermögen): Oko 10.000 € (2024) se može zadržati. Vlastita kuća / stan u kojoj živiš se NE računa. Nakit i predmeti za svakodnevnu upotrebu se ne računaju.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Ehegatte / Lebenspartner" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Verheiratet / eingetragene Partnerschaft?</div><Radio name="verheiratet" value={f.verheiratet} options={["Ja", "Nein"]} onChange={v => set("verheiratet", v)} /></div>
        {f.verheiratet === "Ja" && (<>
          <div style={S.row}><Field label="Familienname" value={f.partnerName} onChange={v => set("partnerName", v)} /><Field label="Vorname" value={f.partnerVorname} onChange={v => set("partnerVorname", v)} /><Field label="Geburtsdatum" type="date" value={f.partnerGeburtsdatum} onChange={v => set("partnerGeburtsdatum", v)} /></div>
          <div style={S.row}><Field label="Rente / Einkommen (€/Monat netto)" value={f.partnerEinkommen} onChange={v => set("partnerEinkommen", v)} /><Field label="Eigenes Vermögen (€)" value={f.partnerVermoegen} onChange={v => set("partnerVermoegen", v)} /></div>
        </>)}
        <Info>ℹ️ Prihodi partnera se uzimaju u obzir. Ako suprug/a ima dovoljno prihoda, tvoja Grundsicherung se smanjuje.</Info>
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="Krankenversicherung" />
        <Radio name="kvArt" value={f.kvArt} options={["Gesetzlich versichert (GKV)", "Privat versichert (PKV)", "Nicht versichert"]} onChange={v => set("kvArt", v)} />
        {f.kvArt === "Gesetzlich versichert (GKV)" && <div style={{ ...S.row, marginTop: 6 }}><Field label="Krankenkasse" value={f.kvKasse} onChange={v => set("kvKasse", v)} /></div>}
        {f.kvArt === "Privat versichert (PKV)" && <div style={{ ...S.row, marginTop: 6 }}><Field label="Monatlicher Beitrag (€)" value={f.kvBeitrag} onChange={v => set("kvBeitrag", v)} /></div>}
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="Unterhaltspflichtige Kinder" />
        <div style={{ marginBottom: 8 }}><div style={S.lbl}>Haben Sie Kinder?</div><Radio name="kinderJa" value={f.kinderJa} options={["Ja", "Nein"]} onChange={v => set("kinderJa", v)} /></div>
        <Info>ℹ️ Djeca do 100.000 € prihoda godišnje NE moraju plaćati uzdržavanje roditelju koji prima Grundsicherung. Sozialamt to ne traži automatski.</Info>
        {f.kinderJa === "Ja" && f.kinder.map((k, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={S.row}><Field label="Name" value={k.name} onChange={v => setKind(i, "name", v)} /><Field label="Vorname" value={k.vorname} onChange={v => setKind(i, "vorname", v)} /><Field label="Geburtsjahr" value={k.geburtsjahr} onChange={v => setKind(i, "geburtsjahr", v)} /><Field label="Wohnort" value={k.wohnort} onChange={v => setKind(i, "wohnort", v)} /></div>
          </div>
        ))}
      </div>

      <div style={S.sec}>
        <SecHeader num={9} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ ...S.row, marginTop: 8 }}><Field label="Zuständiges Sozialamt" value={f.sozialamt} onChange={v => set("sozialamt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
