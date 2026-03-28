import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ═══════════════ print CSS ═══════════════ */
const printCSS = `
@media print {
  body > *:not(#kg1-root) { display: none !important; }
  #kg1-root { background: white !important; }
  #kg1-root > *:not(#kg1-paper) { display: none !important; }
  #kg1-paper {
    transform: none !important;
    box-shadow: none !important;
    margin: 0 !important;
    width: 100% !important;
    min-height: auto !important;
  }
}
`;

/* ═══════════════ component ═══════════════ */
const KindergeldMusterPDF = () => {
  const navigate = useNavigate();
  const [f, setF] = useState<Record<string, string>>({
    staat: "Deutschland",
    kontoinhaber: "antragsteller",
    anzahlKinder: "1",
    bisherigesKG: "nein",
  });

  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  /* ── tiny helpers ── */
  const inp = (key: string, ph = "", extra: React.CSSProperties = {}) => (
    <input
      value={f[key] || ""}
      onChange={(e) => set(key, e.target.value)}
      placeholder={ph}
      style={{
        width: "100%", border: "1px solid #9ca3af", background: "#fff",
        fontSize: 11, padding: "2px 4px", outline: "none", color: "#111",
        boxSizing: "border-box", fontFamily: "Arial, sans-serif", ...extra,
      }}
    />
  );

  const dateInp = (key: string) => (
    <input
      type="date"
      value={f[key] || ""}
      onChange={(e) => set(key, e.target.value)}
      style={{
        width: "100%", border: "1px solid #9ca3af", fontSize: 10,
        padding: "2px 4px", outline: "none", fontFamily: "Arial, sans-serif",
      }}
    />
  );

  const sel = (key: string, opts: string[]) => (
    <select
      value={f[key] || ""}
      onChange={(e) => set(key, e.target.value)}
      style={{
        width: "100%", border: "1px solid #9ca3af", fontSize: 10,
        padding: "2px", outline: "none", fontFamily: "Arial, sans-serif",
      }}
    >
      <option value="">—</option>
      {opts.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  const lbl = (t: string, req = false) => (
    <div style={{ fontSize: 7, color: "#555", marginBottom: 1, fontWeight: 600 }}>
      {t}{req && <span style={{ color: "#dc2626" }}> *</span>}
    </div>
  );

  const rb = (name: string, value: string, label: string) => (
    <label style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, cursor: "pointer" }}>
      <input type="radio" name={name} checked={f[name] === value} onChange={() => set(name, value)} style={{ width: 9, height: 9 }} />
      {label}
    </label>
  );

  /* ── section header ── */
  const sec = (num: string, title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#e5e7eb", border: "1px solid #9ca3af", padding: "4px 8px", marginTop: 10 }}>
      <div style={{ width: 16, height: 16, border: "2px solid #111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: "bold", flexShrink: 0 }}>{num}</div>
      <span style={{ fontSize: 9, fontWeight: "bold", textTransform: "uppercase", letterSpacing: 0.5 }}>{title}</span>
    </div>
  );

  /* ── table row / cell wrappers ── */
  const Row = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
    <div style={{ display: "flex", borderBottom: "0.5px solid #9ca3af", ...style }}>{children}</div>
  );
  const Cell = ({ children, w, flex, style }: { children: React.ReactNode; w?: string | number; flex?: number; style?: React.CSSProperties }) => (
    <div style={{ width: w, flex, borderRight: "0.5px solid #9ca3af", padding: "3px 5px", ...style }}>{children}</div>
  );
  const CellLast = ({ children, w, flex, style }: { children: React.ReactNode; w?: string | number; flex?: number; style?: React.CSSProperties }) => (
    <div style={{ width: w, flex, padding: "3px 5px", ...style }}>{children}</div>
  );

  const familienstandOpts = ["ledig", "verheiratet", "eingetragene Lebenspartnerschaft", "geschieden", "verwitwet", "dauernd getrennt lebend"];

  return (
    <div id="kg1-root" style={{ minHeight: "100vh", background: "#0B0F1A" }}>
      <style>{printCSS}</style>

      {/* ── top bar ── */}
      <div className="no-print" style={{ background: "#0d1526", padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate(-1)} style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: 13 }}>← Nazad</button>
        <span style={{ color: "#EAB308", fontWeight: "bold", fontSize: 15 }}>BL BalkanLink</span>
        <button onClick={() => navigate("/")} style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer", fontSize: 15 }}>🏠</button>
      </div>

      {/* ── disclaimer ── */}
      <div className="no-print" style={{ maxWidth: 820, margin: "0 auto", padding: "12px 16px 0" }}>
        <div style={{ background: "#fefce8", border: "2px solid #EAB308", borderRadius: 6, padding: "10px 14px", marginBottom: 10 }}>
          <p style={{ fontWeight: "bold", color: "#92400e", fontSize: 12, margin: "0 0 4px" }}>⚠️ Musterformular — nur zur Orientierung</p>
          <p style={{ color: "#78350f", fontSize: 11, margin: "0 0 6px" }}>Übungsversion des KG1-Formulars (Stand Sept. 2025). Ersetzt nicht das offizielle Dokument.</p>
          <a href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontSize: 11 }}>🔗 Zum offiziellen KG1-Formular →</a>
        </div>
      </div>

      {/* ── A4 paper ── */}
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 40px" }}>
        <div
          id="kg1-paper"
          style={{
            width: 794, minHeight: 1123, background: "#fff", boxShadow: "0 0 30px rgba(0,0,0,0.5)",
            padding: 40, fontFamily: "Arial, sans-serif", fontSize: 11, color: "#111",
            transformOrigin: "top center",
          }}
          className="kg1-scale"
        >
          {/* ── Header ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #333", paddingBottom: 8, marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: "bold" }}>Antrag auf Kindergeld</div>
              <div style={{ fontSize: 8, color: "#666", marginTop: 2 }}>Musterformular KG 1 — BalkanLink — nur zur Orientierung</div>
            </div>
            <div style={{ textAlign: "right" }}>
              {lbl("Kindergeld-Nr.")}
              <input disabled style={{ width: 110, border: "1px solid #ccc", background: "#f3f4f6", fontSize: 10, padding: "2px 4px", color: "#999" }} placeholder="wird zugeteilt" />
            </div>
          </div>

          {/* ── 1 ── */}
          {sec("1", "Angaben zur antragstellenden Person")}
          <Row>
            <CellLast flex={1}>
              {lbl("Steuerliche Identifikationsnummer", true)}
              <div style={{ fontSize: 7, color: "#888", marginBottom: 2 }}>(zwingend auszufüllen — 11 Ziffern)</div>
              {inp("steuerID", "z.B. 65 929 310 054")}
              <div style={{ fontSize: 7, color: "#aaa", marginTop: 1 }}>⚠ Nicht die Steuernummer (Format 12/345/67890)</div>
            </CellLast>
          </Row>
          <Row>
            <Cell w="28%">{lbl("Familienname", true)}{inp("familienname")}</Cell>
            <Cell w="10%">{lbl("Titel")}{inp("titel", "Dr.")}</Cell>
            <Cell w="26%">{lbl("Vorname", true)}{inp("vorname")}</Cell>
            <CellLast flex={1}>{lbl("Geburtsname / früherer Name")}{inp("geburtsname")}</CellLast>
          </Row>
          <Row>
            <Cell w="16%">{lbl("Geburtsdatum", true)}{dateInp("geburtsdatum")}</Cell>
            <Cell w="20%">{lbl("Geburtsort", true)}{inp("geburtsort")}</Cell>
            <Cell w="14%">{lbl("Geschlecht", true)}{sel("geschlecht", ["männlich", "weiblich", "divers"])}</Cell>
            <CellLast flex={1}>
              {lbl("Staatsangehörigkeit", true)}{inp("staatsangehoerigkeit", "z.B. Bosnien und Herzegowina")}
              {f.staatsangehoerigkeit && f.staatsangehoerigkeit !== "Deutschland" && (
                <div style={{ fontSize: 7, color: "#d97706", marginTop: 1 }}>* Nicht EU/EWR? Aufenthaltstitel beifügen!</div>
              )}
            </CellLast>
          </Row>
          <Row>
            <Cell flex={3}>{lbl("Straße / Hausnr.", true)}{inp("strasse")}</Cell>
            <Cell w="12%">{lbl("PLZ", true)}{inp("plz", "12345")}</Cell>
            <Cell flex={2}>{lbl("Wohnort", true)}{inp("wohnort")}</Cell>
            <CellLast w="14%">{lbl("Staat")}{inp("staat")}</CellLast>
          </Row>
          <div style={{ borderBottom: "0.5px solid #9ca3af", padding: "4px 5px" }}>
            {lbl("Familienstand", true)}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", marginTop: 2 }}>
              {familienstandOpts.map((fs) => (
                <label key={fs} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, cursor: "pointer" }}>
                  <input type="radio" name="familienstand" checked={f.familienstand === fs} onChange={() => set("familienstand", fs)} style={{ width: 9, height: 9 }} />
                  {fs}
                </label>
              ))}
            </div>
          </div>

          {/* ── 2 ── */}
          {sec("2", "Angaben zum Ehepartner / Lebenspartner")}
          <Row>
            <Cell w="28%">{lbl("Steuer-ID")}{inp("steuerID2", "11 Ziffern")}</Cell>
            <Cell flex={1}>{lbl("Familienname, Vorname, Titel")}{inp("name2")}</Cell>
            <Cell w="15%">{lbl("Geburtsdatum")}{dateInp("geburtsdatum2")}</Cell>
            <CellLast w="18%">{lbl("Staatsangehörigkeit")}{inp("staat2")}</CellLast>
          </Row>
          <Row>
            <Cell w="14%">{lbl("Geschlecht")}{sel("geschlecht2", ["männlich", "weiblich", "divers"])}</Cell>
            <CellLast flex={1}>{lbl("Anschrift (wenn abweichend)")}{inp("anschrift2", "Nur ausfüllen wenn abweichend")}</CellLast>
          </Row>

          {/* ── 3 ── */}
          {sec("3", "Angaben zum Zahlungsweg")}
          <Row>
            <Cell flex={2}>{lbl("IBAN", true)}{inp("iban", "DE00 0000 0000 0000 0000 00")}</Cell>
            <Cell w="18%">{lbl("BIC")}{inp("bic")}</Cell>
            <CellLast flex={1}>{lbl("Bank / Finanzinstitut", true)}{inp("bank")}</CellLast>
          </Row>
          <div style={{ borderBottom: "0.5px solid #9ca3af", padding: "4px 5px" }}>
            {lbl("Kontoinhaber(in) ist")}
            <div style={{ display: "flex", gap: 16, marginTop: 2 }}>
              {rb("kontoinhaber", "antragsteller", "antragstellende Person (wie Nr. 1)")}
              {rb("kontoinhaber", "andere", "nicht antragstellende Person, sondern:")}
            </div>
            {f.kontoinhaber === "andere" && (
              <div style={{ marginTop: 4, maxWidth: 300 }}>
                {lbl("Familienname, Vorname")}{inp("kontoinhaberName")}
              </div>
            )}
          </div>

          {/* ── 4 ── */}
          {sec("4", "Bescheid-Empfänger (optional)")}
          <div style={{ borderBottom: "0.5px solid #9ca3af", padding: "4px 5px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 9, cursor: "pointer" }}>
              <input type="checkbox" checked={f.andereBescheid === "yes"} onChange={(e) => set("andereBescheid", e.target.checked ? "yes" : "")} />
              Bescheid an andere Person senden
            </label>
            {f.andereBescheid === "yes" && (
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <div style={{ flex: 1 }}>{lbl("Name")}{inp("bescheidName")}</div>
                <div style={{ flex: 2 }}>{lbl("Anschrift")}{inp("bescheidAnschrift")}</div>
              </div>
            )}
          </div>

          {/* ── 5 ── */}
          {sec("5", "Angaben zu Kindern")}
          <div style={{ borderBottom: "0.5px solid #9ca3af", padding: "4px 5px" }}>
            <div style={{ fontSize: 9, color: "#555", marginBottom: 4 }}>Für jedes Kind eine gesonderte „Anlage Kind" einreichen.</div>
            <Row style={{ border: "none", borderBottom: "none" }}>
              <Cell w="20%" style={{ border: "none", padding: "0 5px 0 0" }}>
                {lbl("Anzahl Anlage Kind")}
                <input type="number" min={1} max={10} value={f.anzahlKinder} onChange={(e) => set("anzahlKinder", e.target.value)}
                  style={{ width: 45, border: "1px solid #9ca3af", fontSize: 11, padding: "2px 4px", outline: "none" }} />
              </Cell>
              <CellLast flex={1} style={{ padding: 0 }}>
                {lbl("Wurde bereits Kindergeld beantragt?")}
                <div style={{ display: "flex", gap: 14, marginTop: 2 }}>
                  {rb("bisherigesKG", "nein", "Nein, erstmaliger Antrag")}
                  {rb("bisherigesKG", "ja", "Ja, wurde bereits bezogen")}
                </div>
                {f.bisherigesKG === "ja" && (
                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <div style={{ flex: 1 }}>{lbl("Kindergeld-Nr.")}{inp("bisherigeKGNr")}</div>
                    <div style={{ flex: 2 }}>{lbl("Bei welcher Familienkasse?")}{inp("bisherigeFK")}</div>
                  </div>
                )}
              </CellLast>
            </Row>
          </div>

          {/* ── 6 ── */}
          {sec("6", "Datum und Unterschrift")}
          <div style={{ padding: "6px 5px" }}>
            <div style={{ fontSize: 9, color: "#555", fontStyle: "italic", marginBottom: 6 }}>
              Ich versichere, dass meine Angaben in diesem Antrag vollständig und wahrheitsgemäß sind.
            </div>
            <Row style={{ borderBottom: "none" }}>
              <Cell flex={1} style={{ borderRight: "none", padding: "0 8px 0 0" }}>
                {lbl("Ort")}{inp("ort")}
              </Cell>
              <CellLast flex={1} style={{ padding: 0 }}>
                {lbl("Datum")}{dateInp("datum")}
              </CellLast>
            </Row>
            <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderBottom: "1px solid #333" }} />
                <div style={{ fontSize: 7, color: "#888", marginTop: 2 }}>Unterschrift antragstellende Person</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 36, borderBottom: "1px solid #333" }} />
                <div style={{ fontSize: 7, color: "#888", marginTop: 2 }}>Unterschrift Ehepartner / Lebenspartner</div>
              </div>
            </div>
          </div>

          {/* ── Paper footer ── */}
          <div style={{ borderTop: "1px solid #ccc", marginTop: 16, paddingTop: 6, textAlign: "center" }}>
            <div style={{ fontSize: 7, color: "#aaa" }}>Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei Familienkasse einreichen</div>
          </div>
        </div>
      </div>

      {/* ── Print button ── */}
      <div className="no-print" style={{ textAlign: "center", paddingBottom: 32 }}>
        <button
          onClick={() => window.print()}
          style={{
            background: "#EAB308", color: "#000", border: "none", borderRadius: 6,
            padding: "12px 32px", fontSize: 14, fontWeight: "bold", cursor: "pointer",
          }}
        >
          🖨️ Odštampaj / Sačuvaj kao PDF
        </button>
      </div>

      {/* ── mobile scale + print hide ── */}
      <style>{`
        @media (max-width: 768px) {
          .kg1-scale {
            transform: scale(0.45);
            margin-bottom: -600px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 860px) {
          .kg1-scale {
            transform: scale(0.85);
            margin-bottom: -100px !important;
          }
        }
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default KindergeldMusterPDF;
