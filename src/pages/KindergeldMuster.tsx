import { useState } from "react";
import { useNavigate } from "react-router-dom";

const KindergeldMusterPDF = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({
    staat: "Deutschland",
    kontoinhaber: "antragsteller",
    anzahlKinder: "1",
    bisherigesKindergeld: "nein",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);

  const set = (k: string, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!/^\d{11}$/.test((form.steuerID || "").replace(/\s/g, ""))) e.steuerID = "Tačno 11 cifara";
    if (!form.familienname) e.familienname = "Obavezno";
    if (!form.vorname) e.vorname = "Obavezno";
    if (!form.geburtsdatum) e.geburtsdatum = "Obavezno";
    if (!form.geburtsort) e.geburtsort = "Obavezno";
    if (!form.geschlecht) e.geschlecht = "Obavezno";
    if (!form.staatsangehoerigkeit) e.staatsangehoerigkeit = "Obavezno";
    if (!form.strasse) e.strasse = "Obavezno";
    if (!form.plz) e.plz = "Obavezno";
    if (!form.wohnort) e.wohnort = "Obavezno";
    if (!form.familienstand) e.familienstand = "Obavezno";
    if (!form.iban || !form.iban.toUpperCase().startsWith("DE")) e.iban = "Mora početi s DE";
    if (!form.bank) e.bank = "Obavezno";
    setErrors(e);
    setValidated(Object.keys(e).length === 0);
  };

  const reset = () => {
    setForm({ staat: "Deutschland", kontoinhaber: "antragsteller", anzahlKinder: "1", bisherigesKindergeld: "nein" });
    setErrors({});
    setValidated(false);
  };

  const fbox = (key: string, placeholder = "", style: React.CSSProperties = {}) => (
    <div style={{ position: "relative", ...style }}>
      <input
        value={form[key] || ""}
        onChange={(e) => set(key, e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%", border: errors[key] ? "1.5px solid #dc2626" : form[key] ? "1.5px solid #16a34a" : "1px solid #9ca3af",
          background: "white", fontSize: "11px", padding: "3px 4px", outline: "none", color: "#111", boxSizing: "border-box",
        }}
      />
      {errors[key] && <div style={{ fontSize: "9px", color: "#dc2626" }}>{errors[key]}</div>}
    </div>
  );

  const rb = (name: string, value: string, label: string) => (
    <label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", cursor: "pointer", color: "#111" }}>
      <input type="radio" name={name} value={value} checked={form[name] === value} onChange={() => set(name, value)} style={{ width: "10px", height: "10px" }} />
      {label}
    </label>
  );

  const cell = (children: React.ReactNode, props: { colSpan?: number; width?: string } = {}) => {
    const { colSpan, width } = props;
    return (
      <td colSpan={colSpan} style={{ border: "1px solid #6b7280", padding: "4px 6px", verticalAlign: "top", width }}>{children}</td>
    );
  };

  const lbl = (text: string, req = false) => (
    <div style={{ fontSize: "9px", color: "#374151", marginBottom: "2px", fontWeight: 500 }}>
      {text}{req && <span style={{ color: "#dc2626" }}> *</span>}
    </div>
  );

  const sec = (num: string, title: string) => (
    <tr>
      <td colSpan={6} style={{ background: "#e5e7eb", border: "1px solid #6b7280", padding: "4px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "18px", height: "18px", border: "2px solid #111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "bold", flexShrink: 0 }}>{num}</div>
          <span style={{ fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}>{title}</span>
        </div>
      </td>
    </tr>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0B0F1A" }}>
      <div style={{ background: "#EAB308", color: "#000", fontSize: "11px", textAlign: "center", padding: "4px", fontWeight: "bold" }}>
        🔧 ADMIN MODE — Premium aktivan
      </div>
      <div style={{ background: "#0d1526", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate(-1)} style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: "13px" }}>← Nazad</button>
        <span style={{ color: "#EAB308", fontWeight: "bold", fontSize: "15px" }}>BL BalkanLink</span>
        <button onClick={() => navigate("/")} style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}>🏠</button>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "16px" }}>
        <div style={{ background: "#fefce8", border: "2px solid #EAB308", borderRadius: "6px", padding: "10px 14px", marginBottom: "12px" }}>
          <p style={{ fontWeight: "bold", color: "#92400e", fontSize: "12px", margin: "0 0 4px" }}>⚠️ Musterformular — nur zur Orientierung</p>
          <p style={{ color: "#78350f", fontSize: "11px", margin: "0 0 6px" }}>Übungsversion des KG1-Formulars der Bundesagentur für Arbeit (Stand September 2025). Ersetzt nicht das offizielle Dokument.</p>
          <a href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontSize: "11px" }}>🔗 Zum offiziellen KG1-Formular →</a>
        </div>

        <div style={{ background: "white", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" }}>
          <div style={{ borderBottom: "2px solid #374151", padding: "10px 14px" }}>
            <div style={{ fontSize: "9px", color: "#6b7280" }}>Musterformular KG 1 — BalkanLink</div>
            <div style={{ fontSize: "18px", fontWeight: "bold", color: "#111", margin: "4px 0" }}>Antrag auf Kindergeld</div>
            <div style={{ fontSize: "10px", color: "#374151" }}>Bitte fügen Sie für jedes Kind eine „Anlage Kind" bei. Anzahl: {fbox("anzahlAnlage", "", { display: "inline-block", width: "40px" })}</div>
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", fontFamily: "Arial, sans-serif" }}>
            <tbody>
              {sec("1", "Angaben zur antragstellenden Person")}
              <tr>{cell(<>{lbl("Steuerliche Identifikationsnummer", true)}<div style={{ fontSize: "9px", color: "#6b7280", marginBottom: "3px" }}>(zwingend auszufüllen)</div>{fbox("steuerID", "11 Ziffern — z.B. 65929310054")}<div style={{ fontSize: "9px", color: "#9ca3af", marginTop: "2px" }}>⚠️ Nicht Steuernummer (Format 12/345/67890)</div></>, { colSpan: 6 })}</tr>
              <tr>
                {cell(<>{lbl("Familienname", true)}{fbox("familienname")}</>, { width: "25%" })}
                {cell(<>{lbl("Titel")}{fbox("titel", "Dr..")}</>, { width: "10%" })}
                {cell(<>{lbl("Vorname", true)}{fbox("vorname")}</>, { width: "25%" })}
                {cell(<>{lbl("Geburtsname / früherer Familienname")}{fbox("geburtsname")}</>, { colSpan: 3 })}
              </tr>
              <tr>
                {cell(<>{lbl("Geburtsdatum", true)}<input type="date" value={form.geburtsdatum || ""} onChange={e => set("geburtsdatum", e.target.value)} style={{ width: "100%", border: "1px solid #9ca3af", fontSize: "10px", padding: "2px", outline: "none" }} /></>, { width: "15%" })}
                {cell(<>{lbl("Geburtsort", true)}{fbox("geburtsort")}</>, { width: "20%" })}
                {cell(<>{lbl("Geschlecht", true)}<select value={form.geschlecht || ""} onChange={e => set("geschlecht", e.target.value)} style={{ width: "100%", border: "1px solid #9ca3af", fontSize: "10px", padding: "2px", outline: "none" }}><option value="">—</option><option value="m">männlich</option><option value="w">weiblich</option><option value="d">divers</option></select></>, { width: "15%" })}
                {cell(<>{lbl("Staatsangehörigkeit", true)}{fbox("staatsangehoerigkeit", "z.B. Bosnien und Herzegowina")}{form.staatsangehoerigkeit && form.staatsangehoerigkeit !== "Deutschland" && <div style={{ fontSize: "9px", color: "#d97706" }}>* Nicht EU/EWR? Aufenthaltstitel beifügen!</div>}</>, { colSpan: 3 })}
              </tr>
              <tr>{cell(<>{lbl("Anschrift", true)}<div style={{ display: "flex", gap: "6px" }}><div style={{ flex: 3 }}>{lbl("Straße / Hausnr.")}{fbox("strasse")}</div><div style={{ flex: 1 }}>{lbl("PLZ")}{fbox("plz", "12345")}</div><div style={{ flex: 2 }}>{lbl("Wohnort")}{fbox("wohnort")}</div><div style={{ flex: 1 }}>{lbl("Staat")}{fbox("staat")}</div></div></>, { colSpan: 6 })}</tr>
              <tr>{cell(<>{lbl("Familienstand", true)}{errors.familienstand && <div style={{ fontSize: "9px", color: "#dc2626" }}>{errors.familienstand}</div>}<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "3px" }}>{["ledig","verheiratet","in eingetragener Lebenspartnerschaft lebend","geschieden","verwitwet","dauernd getrennt lebend"].map(fs => <label key={fs} style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "10px", cursor: "pointer" }}><input type="radio" name="familienstand" value={fs} checked={form.familienstand === fs} onChange={() => set("familienstand", fs)} style={{ width: "10px", height: "10px" }} />{fs}</label>)}</div></>, { colSpan: 6 })}</tr>

              {sec("2", "Angaben zum Ehepartner / Lebenspartner")}
              <tr>
                {cell(<>{lbl("Steuerliche Identifikationsnummer")}{fbox("steuerID2", "11 Ziffern")}</>, { colSpan: 2 })}
                {cell(<>{lbl("Familienname, Vorname, Titel")}{fbox("name2")}</>, { colSpan: 2 })}
                {cell(<>{lbl("Geburtsdatum")}<input type="date" value={form.geburtsdatum2 || ""} onChange={e => set("geburtsdatum2", e.target.value)} style={{ width: "100%", border: "1px solid #9ca3af", fontSize: "10px", padding: "2px", outline: "none" }} /></>, {})}
                {cell(<>{lbl("Staatsangehörigkeit")}{fbox("staatsangehoerigkeit2")}</>, {})}
              </tr>
              <tr>
                {cell(<>{lbl("Geschlecht")}<select value={form.geschlecht2 || ""} onChange={e => set("geschlecht2", e.target.value)} style={{ border: "1px solid #9ca3af", fontSize: "10px", padding: "2px", outline: "none", width: "100%" }}><option value="">—</option><option value="m">männlich</option><option value="w">weiblich</option><option value="d">divers</option></select></>, { width: "15%" })}
                {cell(<>{lbl("Anschrift (wenn abweichend)")}{fbox("anschrift2", "Nur wenn abweichend")}</>, { colSpan: 5 })}
              </tr>

              {sec("3", "Angaben zum Zahlungsweg")}
              <tr>
                {cell(<>{lbl("IBAN", true)}{fbox("iban", "DE00 0000 0000 0000 0000 00")}{errors.iban && <div style={{ fontSize: "9px", color: "#dc2626" }}>{errors.iban}</div>}</>, { colSpan: 2 })}
                {cell(<>{lbl("BIC")}{fbox("bic")}</>, {})}
                {cell(<>{lbl("Bank / Finanzinstitut", true)}{fbox("bank")}</>, { colSpan: 3 })}
              </tr>
              <tr>{cell(<>{lbl("Kontoinhaber(in) ist")}<div style={{ display: "flex", gap: "16px" }}>{rb("kontoinhaber", "antragsteller", "antragstellende Person (wie unter Nr. 1)")}{rb("kontoinhaber", "andere", "nicht antragstellende Person, sondern:")}</div>{form.kontoinhaber === "andere" && <div style={{ marginTop: "4px" }}>{lbl("Familienname, Vorname")}{fbox("kontoinhaberName")}</div>}</>, { colSpan: 6 })}</tr>

              {sec("4", "Bescheid-Empfänger (optional)")}
              <tr>{cell(<><label style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", cursor: "pointer" }}><input type="checkbox" checked={form.andereBescheid === "yes"} onChange={e => set("andereBescheid", e.target.checked ? "yes" : "")} />Bescheid an andere Person senden</label>{form.andereBescheid === "yes" && <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}><div style={{ flex: 1 }}>{lbl("Name")}{fbox("bescheidName")}</div><div style={{ flex: 2 }}>{lbl("Anschrift")}{fbox("bescheidAnschrift")}</div></div>}</>, { colSpan: 6 })}</tr>

              {sec("5", "Angaben zu Kindern")}
              <tr>{cell(<><div style={{ fontSize: "10px", color: "#374151", marginBottom: "6px" }}>Für jedes Kind eine gesonderte „Anlage Kind" einreichen.</div>{lbl("Anzahl Anlage Kind")}<input type="number" min={1} max={10} value={form.anzahlKinder} onChange={e => set("anzahlKinder", e.target.value)} style={{ width: "50px", border: "1px solid #9ca3af", fontSize: "11px", padding: "2px 4px", outline: "none" }} /></>, { colSpan: 6 })}</tr>
              <tr>{cell(<>{lbl("Wurde bereits Kindergeld beantragt?")}<div style={{ display: "flex", gap: "16px" }}>{rb("bisherigesKindergeld", "nein", "Nein, erstmaliger Antrag")}{rb("bisherigesKindergeld", "ja", "Ja, wurde bereits bezogen")}</div>{form.bisherigesKindergeld === "ja" && <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}><div style={{ flex: 1 }}>{lbl("Kindergeld-Nr.")}{fbox("bisherigeKGNr")}</div><div style={{ flex: 2 }}>{lbl("Bei welcher Familienkasse?")}{fbox("bisherigeFK")}</div></div>}</>, { colSpan: 6 })}</tr>

              {sec("6", "Datum und Unterschrift")}
              <tr>{cell(<><div style={{ fontSize: "10px", color: "#374151", marginBottom: "8px", fontStyle: "italic" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</div><div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}><div style={{ flex: 1 }}>{lbl("Ort")}{fbox("ort", "Stadt")}</div><div style={{ flex: 1 }}>{lbl("Datum")}<input type="date" value={form.datum || ""} onChange={e => set("datum", e.target.value)} style={{ width: "100%", border: "1px solid #9ca3af", fontSize: "10px", padding: "2px", outline: "none" }} /></div></div><div style={{ display: "flex", gap: "24px" }}><div style={{ flex: 1 }}><div style={{ height: "40px", borderBottom: "1px solid #374151", marginBottom: "3px" }} /><div style={{ fontSize: "9px", color: "#6b7280" }}>Unterschrift antragstellende Person — nur auf dem Original</div></div><div style={{ flex: 1 }}><div style={{ height: "40px", borderBottom: "1px solid #374151", marginBottom: "3px" }} /><div style={{ fontSize: "9px", color: "#6b7280" }}>Unterschrift Ehepartner — nur auf dem Original</div></div></div></>, { colSpan: 6 })}</tr>
            </tbody>
          </table>

          <div style={{ borderTop: "1px solid #d1d5db", background: "#f9fafb", padding: "8px", textAlign: "center" }}>
            <p style={{ fontSize: "9px", color: "#9ca3af", margin: 0 }}>Musterformular zur Orientierung • Ersetzt nicht das offizielle Dokument • Alle Angaben ohne Gewähr</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <button onClick={reset} style={{ flex: 1, border: "2px solid #6b7280", background: "transparent", color: "#d1d5db", padding: "12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>🔄 Zurücksetzen</button>
          <button onClick={validate} style={{ flex: 1, background: "#EAB308", color: "#000", padding: "12px", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>✅ Angaben prüfen</button>
        </div>

        {validated && <div style={{ marginTop: "12px", background: "#14532d", border: "1px solid #16a34a", borderRadius: "6px", padding: "12px", color: "#86efac", textAlign: "center" }}><p style={{ fontWeight: "bold", margin: "0 0 6px" }}>✅ Sve ispravno! Popuni original na Familienkasse.</p><a href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa", fontSize: "12px" }}>🔗 Originalni KG1 (PDF) →</a></div>}
        {!validated && Object.keys(errors).length > 0 && <div style={{ marginTop: "12px", background: "#450a0a", border: "1px solid #dc2626", borderRadius: "6px", padding: "12px", color: "#fca5a5" }}><p style={{ fontWeight: "bold", margin: "0 0 6px" }}>⚠️ Popravi sljedeće:</p><ul style={{ margin: 0, paddingLeft: "16px", fontSize: "12px" }}>{Object.values(errors).map((e, i) => <li key={i}>{e}</li>)}</ul></div>}

        <p style={{ fontSize: "11px", color: "#6b7280", textAlign: "center", margin: "16px 0 32px" }}>BalkanLink ist eine edukative Plattform. Das Original muss bei der Familienkasse eingereicht werden.</p>
      </div>
    </div>
  );
};

export default KindergeldMusterPDF;
