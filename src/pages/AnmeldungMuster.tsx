import { useState } from "react";
import { useNavigate } from "react-router-dom";

const printCSS = `
@media print {
  body > * { display:none!important }
  body > #anm-root { display:block!important }
  #anm-root { background:#fff!important }
  #anm-root > * { display:none!important }
  #anm-root > .anm-scale { display:block!important }
  .anm-scale > #anm-paper { display:block!important; box-shadow:none!important; margin:0!important; transform:none!important; max-width:100%!important; padding:20px!important }
}
@media (max-width:768px) {
  .anm-scale { transform:scale(0.48); transform-origin:top center; margin-bottom:-600px }
}
`;

const S = {
  page: { minHeight: "100vh", background: "#0B0F1A", fontFamily: "Arial, sans-serif", fontSize: 11, color: "#111" } as React.CSSProperties,
  nav: { background: "#0d1526", padding: "6px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" } as React.CSSProperties,
  navBtn: { background: "transparent", border: "none", cursor: "pointer", color: "#9CA3AF", fontSize: 14 } as React.CSSProperties,
  disc: { background: "hsl(48,96%,89%)", border: "2px solid #EAB308", borderRadius: 6, padding: 12, margin: "12px auto", maxWidth: 794 } as React.CSSProperties,
  paper: { maxWidth: 794, margin: "0 auto 40px", background: "#fff", padding: 40, boxShadow: "0 0 30px rgba(0,0,0,0.5)", color: "#111" } as React.CSSProperties,
  secHead: { background: "#e5e7eb", padding: "5px 8px", display: "flex", alignItems: "center", gap: 8, marginBottom: 8, textTransform: "uppercase" as const, fontWeight: 700, fontSize: 11, letterSpacing: 0.5 },
  secNum: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: 22, border: "2px solid #374151", fontWeight: 700, fontSize: 12 } as React.CSSProperties,
  sec: { border: "1px solid #d1d5db", padding: 10, marginBottom: 14 } as React.CSSProperties,
  row: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" as const } as React.CSSProperties,
  lbl: { fontSize: 9, color: "#6b7280", marginBottom: 2 } as React.CSSProperties,
  inp: { border: "1px solid #9ca3af", background: "#fff", fontSize: 11, padding: "2px 4px", outline: "none", width: "100%", boxSizing: "border-box" as const } as React.CSSProperties,
  chk: { display: "flex", alignItems: "center", gap: 4, fontSize: 10, cursor: "pointer", marginRight: 10 } as React.CSSProperties,
  footer: { fontSize: 8, color: "#6b7280", textAlign: "center" as const, borderTop: "1px solid #d1d5db", paddingTop: 8, marginTop: 16 },
  sigLine: { borderBottom: "1px solid #374151", height: 50, marginBottom: 4 } as React.CSSProperties,
  warn: { background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 4, padding: "6px 8px", fontSize: 10, color: "#b91c1c", marginTop: 6 } as React.CSSProperties,
  note: { background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: 4, padding: "6px 8px", fontSize: 10, color: "#92400e", marginTop: 6 } as React.CSSProperties,
};

const Field = ({ label, flex, width, type, value, onChange }: { label: string; flex?: number; width?: string | number; type?: string; value?: string; onChange?: (v: string) => void }) => (
  <div style={{ flex: flex ?? 1, minWidth: width ?? 0 }}>
    <div style={S.lbl}>{label}</div>
    <input style={{ ...S.inp, width: width ?? "100%" }} type={type ?? "text"} value={value ?? ""} onChange={e => onChange?.(e.target.value)} />
  </div>
);

const SecHeader = ({ num, title }: { num: number; title: string }) => (
  <div style={S.secHead}><span style={S.secNum}>{num}</span>{title}</div>
);

const LS_KEY = "anmeldung-muster-data";

const initial = () => ({
  // Sekcija 1
  strasse: "", hausnummer: "", plz: "", wohnort: "", staat: "Deutschland", stockwerk: "", einzugsdatum: "",
  // Sekcija 2
  familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "",
  staatsangehoerigkeit: "", familienstand: "", religion: "",
  // Sekcija 3
  zuzugArt: "ausland" as string, altStrasse: "", altPlz: "", altWohnort: "", altStaat: "",
  // Sekcija 4
  wgbVorhanden: false, wgbName: "", wgbDatum: "",
  // Sekcija 5
  famMitziehend: false,
  familien: [
    { familienname: "", vorname: "", geburtsdatum: "", verwandtschaft: "" },
    { familienname: "", vorname: "", geburtsdatum: "", verwandtschaft: "" },
    { familienname: "", vorname: "", geburtsdatum: "", verwandtschaft: "" },
  ],
  // Sekcija 6
  ort: "", datum: "",
  // Header
  headerEinzug: "",
});

export default function AnmeldungMuster() {
  const navigate = useNavigate();
  const [f, setF] = useState(() => {
    try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {}
    return initial();
  });
  const [saved, setSaved] = useState(false);

  const set = (key: string, val: string | boolean) => setF(p => ({ ...p, [key]: val }));
  const setFam = (i: number, key: string, val: string) => setF(p => {
    const fam = [...p.familien]; fam[i] = { ...fam[i], [key]: val }; return { ...p, familien: fam };
  });

  const isNonEU = f.staatsangehoerigkeit !== "" && !["deutschland", "germany", "deutsch", "österreich", "austria", "schweiz", "switzerland", "frankreich", "france", "italien", "italy", "spanien", "spain", "niederlande", "netherlands", "belgien", "belgium", "polen", "poland", "tschechien", "czech", "dänemark", "denmark", "schweden", "sweden", "finnland", "finland", "irland", "ireland", "portugal", "griechenland", "greece", "kroatien", "croatia", "bulgarien", "bulgaria", "rumänien", "romania", "ungarn", "hungary", "slowakei", "slovakia", "slowenien", "slovenia", "estland", "estonia", "lettland", "latvia", "litauen", "lithuania", "luxemburg", "luxembourg", "malta", "zypern", "cyprus"].includes(f.staatsangehoerigkeit.toLowerCase());

  const religionOptions = [
    { value: "", label: "— bitte wählen —" },
    { value: "ohne", label: "ohne Angabe / konfessionslos" },
    { value: "evangelisch", label: "evangelisch" },
    { value: "katholisch", label: "römisch-katholisch" },
    { value: "islamisch", label: "islamisch" },
    { value: "sonstige", label: "sonstige" },
  ];

  const familienstandList = [
    { value: "ledig", label: "ledig" },
    { value: "verheiratet", label: "verheiratet" },
    { value: "verwitwet", label: "verwitwet" },
    { value: "geschieden", label: "geschieden" },
    { value: "lebenspartnerschaft", label: "eingetragene Lebenspartnerschaft" },
  ];

  return (
    <div id="anm-root" style={S.page}>
      <style>{printCSS}</style>
      {/* NAV */}
      <div style={S.nav}>
        <button style={S.navBtn} onClick={() => navigate(-1)}>← Nazad</button>
        <span style={{ color: "#EAB308", fontWeight: 700, fontSize: 15 }}>BL BalkanLink</span>
        <button style={S.navBtn} onClick={() => navigate("/")}>🏠</button>
      </div>

      {/* DISCLAIMER */}
      <div style={{ padding: "0 16px" }}>
        <div style={S.disc}>
          <p style={{ fontWeight: 700, color: "#92400e", fontSize: 12, margin: 0 }}>
            ⚠️ Musterformular zur Orientierung — Meldeschein-Felder variieren je nach Stadt/Gemeinde. Das offizielle Formular findest du beim zuständigen Bürgeramt deiner Stadt.
          </p>
          <a href="https://www.bundesmeldeportal.de" target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontSize: 12 }}>
            🔗 Bürgeramt online finden → bundesmeldeportal.de
          </a>
        </div>
      </div>

      {/* PAPER */}
      <div className="anm-scale" style={{ padding: "0 16px" }}>
        <div id="anm-paper" style={S.paper}>

          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Anmeldung bei der Meldebehörde</div>
              <div style={{ fontSize: 9, color: "#6b7280" }}>Musterformular — BalkanLink — nur zur Orientierung</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={S.lbl}>Einzugsdatum</div>
              <input style={{ ...S.inp, width: 140 }} type="date" value={f.headerEinzug} onChange={e => set("headerEinzug", e.target.value)} />
            </div>
          </div>

          {/* SEKCIJA 1 — Neue Wohnanschrift */}
          <div style={S.sec}>
            <SecHeader num={1} title="Neue Wohnanschrift" />
            <div style={S.row}>
              <Field label="Straße" flex={3} value={f.strasse} onChange={v => set("strasse", v)} />
              <Field label="Hausnummer" flex={1} value={f.hausnummer} onChange={v => set("hausnummer", v)} />
            </div>
            <div style={S.row}>
              <Field label="Postleitzahl" width={80} value={f.plz} onChange={v => set("plz", v)} />
              <Field label="Wohnort" flex={1} value={f.wohnort} onChange={v => set("wohnort", v)} />
              <Field label="Staat" width={120} value={f.staat} onChange={v => set("staat", v)} />
            </div>
            <div style={S.row}>
              <Field label="Stockwerk / Wohnungsnummer" flex={1} value={f.stockwerk} onChange={v => set("stockwerk", v)} />
            </div>
            <div style={S.row}>
              <Field label="Seit wann bewohnt (Einzugsdatum)" type="date" flex={1} value={f.einzugsdatum} onChange={v => set("einzugsdatum", v)} />
            </div>
          </div>

          {/* SEKCIJA 2 — Angaben zur meldepflichtigen Person */}
          <div style={S.sec}>
            <SecHeader num={2} title="Angaben zur meldepflichtigen Person" />
            <div style={S.row}>
              <Field label="Familienname" flex={3} value={f.familienname} onChange={v => set("familienname", v)} />
              <Field label="Titel" flex={1} value={f.titel} onChange={v => set("titel", v)} />
            </div>
            <div style={S.row}>
              <Field label="Vorname(n)" flex={1} value={f.vorname} onChange={v => set("vorname", v)} />
            </div>
            <div style={S.row}>
              <Field label="Geburtsname" flex={1} value={f.geburtsname} onChange={v => set("geburtsname", v)} />
            </div>
            <div style={S.row}>
              <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} />
              <Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} />
              <div style={{ flex: 1 }}>
                <div style={S.lbl}>Geschlecht</div>
                <select style={S.inp} value={f.geschlecht} onChange={e => set("geschlecht", e.target.value)}>
                  <option value="">—</option>
                  <option value="männlich">männlich</option>
                  <option value="weiblich">weiblich</option>
                  <option value="divers">divers</option>
                </select>
              </div>
            </div>
            <div style={S.row}>
              <Field label="Staatsangehörigkeit" flex={1} value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} />
            </div>
            {isNonEU && (
              <div style={{ background: "#fff7ed", border: "1px solid #fb923c", borderRadius: 4, padding: "6px 8px", fontSize: 10, color: "#c2410c", marginBottom: 8 }}>
                ⚠️ Aufenthaltstitel mitbringen!
              </div>
            )}
            <div>
              <div style={S.lbl}>Familienstand</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {familienstandList.map(fs => (
                  <label key={fs.value} style={S.chk}>
                    <input type="radio" name="familienstand" checked={f.familienstand === fs.value} onChange={() => set("familienstand", fs.value)} />
                    {fs.label}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={S.lbl}>Religion / Konfession</div>
              <select style={{ ...S.inp, width: 260 }} value={f.religion} onChange={e => set("religion", e.target.value)}>
                {religionOptions.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            {f.religion && f.religion !== "ohne" && f.religion !== "" && (
              <div style={S.note}>
                ⚠️ Kirchensteuer wird automatisch abgezogen wenn Konfession angegeben!
              </div>
            )}
          </div>

          {/* SEKCIJA 3 — Bisherige Wohnanschrift */}
          <div style={S.sec}>
            <SecHeader num={3} title="Bisherige Wohnanschrift" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 8 }}>
              <label style={S.chk}>
                <input type="radio" name="zuzugArt" checked={f.zuzugArt === "ausland"} onChange={() => set("zuzugArt", "ausland")} />
                Zuzug aus dem Ausland
              </label>
              <label style={S.chk}>
                <input type="radio" name="zuzugArt" checked={f.zuzugArt === "inland"} onChange={() => set("zuzugArt", "inland")} />
                Umzug innerhalb Deutschland
              </label>
            </div>
            <div style={S.row}>
              <Field label="Straße, Hausnummer" flex={2} value={f.altStrasse} onChange={v => set("altStrasse", v)} />
              <Field label="PLZ" width={80} value={f.altPlz} onChange={v => set("altPlz", v)} />
              <Field label="Wohnort" flex={1} value={f.altWohnort} onChange={v => set("altWohnort", v)} />
              <Field label="Staat" width={120} value={f.altStaat} onChange={v => set("altStaat", v)} />
            </div>
            {f.zuzugArt === "ausland" && (
              <div style={S.note}>
                ℹ️ Bei erstem Zuzug aus dem Ausland: Adresse im Herkunftsland angeben
              </div>
            )}
          </div>

          {/* SEKCIJA 4 — Wohnungsgeberbestätigung */}
          <div style={S.sec}>
            <SecHeader num={4} title="Wohnungsgeberbestätigung" />
            <label style={{ ...S.chk, marginBottom: 8 }}>
              <input type="checkbox" checked={f.wgbVorhanden} onChange={() => set("wgbVorhanden", !f.wgbVorhanden)} />
              Wohnungsgeberbestätigung liegt vor
            </label>
            {!f.wgbVorhanden && (
              <div style={S.warn}>
                ⚠️ Ohne Wohnungsgeberbestätigung ist keine Anmeldung möglich! Stanodavac mora potpisati potvrdu.
              </div>
            )}
            <div style={S.row}>
              <Field label="Name des Wohnungsgebers (Vermieter)" flex={2} value={f.wgbName} onChange={v => set("wgbName", v)} />
              <Field label="Datum der Bestätigung" type="date" flex={1} value={f.wgbDatum} onChange={v => set("wgbDatum", v)} />
            </div>
          </div>

          {/* SEKCIJA 5 — Mitziehende Familienangehörige */}
          <div style={S.sec}>
            <SecHeader num={5} title="Mitziehende Familienangehörige (optional)" />
            <label style={{ ...S.chk, marginBottom: 8 }}>
              <input type="checkbox" checked={f.famMitziehend} onChange={() => set("famMitziehend", !f.famMitziehend)} />
              Familienangehörige ziehen mit ein
            </label>
            {f.famMitziehend && (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    {["Familienname", "Vorname", "Geburtsdatum", "Verwandtschaftsverhältnis"].map(h => (
                      <th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.familien.map((fam, i) => (
                    <tr key={i}>
                      <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                        <input style={{ ...S.inp, border: "none" }} value={fam.familienname} onChange={e => setFam(i, "familienname", e.target.value)} />
                      </td>
                      <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                        <input style={{ ...S.inp, border: "none" }} value={fam.vorname} onChange={e => setFam(i, "vorname", e.target.value)} />
                      </td>
                      <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                        <input style={{ ...S.inp, border: "none" }} type="date" value={fam.geburtsdatum} onChange={e => setFam(i, "geburtsdatum", e.target.value)} />
                      </td>
                      <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                        <input style={{ ...S.inp, border: "none" }} value={fam.verwandtschaft} onChange={e => setFam(i, "verwandtschaft", e.target.value)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* SEKCIJA 6 — Datum und Unterschrift */}
          <div style={S.sec}>
            <SecHeader num={6} title="Datum und Unterschrift" />
            <div style={S.row}>
              <Field label="Ort" value={f.ort} onChange={v => set("ort", v)} />
              <Field label="Datum" type="date" value={f.datum} onChange={v => set("datum", v)} />
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={S.sigLine} />
              <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>Unterschrift — nur auf dem Original beim Bürgeramt</div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={S.footer}>
            Musterformular zur Orientierung • Das offizielle Formular erhältst du beim Bürgeramt deiner Stadt • BalkanLink ist keine staatliche Stelle
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ padding: "0 16px 40px", maxWidth: 794, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => {
            localStorage.setItem(LS_KEY, JSON.stringify(f));
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          style={{ display: "block", background: "#EAB308", color: "#111", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", width: "100%", boxSizing: "border-box" }}
        >
          💾 Sačuvaj unose
        </button>
        {saved && <div style={{ textAlign: "center", color: "#22c55e", fontWeight: 600, fontSize: 14 }}>✅ Podaci sačuvani!</div>}
        <button
          onClick={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}
          style={{ display: "block", background: "transparent", color: "#9CA3AF", border: "2px solid #6b7280", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", width: "100%", boxSizing: "border-box" }}
        >
          🔄 Poništi sve
        </button>
      </div>
    </div>
  );
}
