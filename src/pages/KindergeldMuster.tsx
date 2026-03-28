import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PDF_URL = "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf";

const printCSS = `
@media print {
  body > * { display:none!important }
  body > #kg1-root { display:block!important }
  #kg1-root { background:#fff!important }
  #kg1-root > * { display:none!important }
  #kg1-root > .kg1-scale { display:block!important }
  .kg1-scale > #kg1-paper { display:block!important; box-shadow:none!important; margin:0!important; transform:none!important; max-width:100%!important; padding:20px!important }
}
@media (max-width:768px) {
  .kg1-scale { transform:scale(0.48); transform-origin:top center; margin-bottom:-600px }
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
  idBox: { width: 24, height: 28, border: "1px solid #374151", textAlign: "center" as const, fontSize: 14, fontWeight: 600, padding: 0, outline: "none", background: "#fff" } as React.CSSProperties,
  ibanBox: { width: 18, height: 26, border: "1px solid #374151", textAlign: "center" as const, fontSize: 12, fontWeight: 600, padding: 0, outline: "none", background: "#fff" } as React.CSSProperties,
  chk: { display: "flex", alignItems: "center", gap: 4, fontSize: 10, cursor: "pointer", marginRight: 10 } as React.CSSProperties,
  footer: { fontSize: 8, color: "#6b7280", textAlign: "center" as const, borderTop: "1px solid #d1d5db", paddingTop: 8, marginTop: 16 },
  sigLine: { borderBottom: "1px solid #374151", height: 50, marginBottom: 4 } as React.CSSProperties,
};

const Field = ({ label, flex, width, type, value, onChange, disabled }: { label: string; flex?: number; width?: string | number; type?: string; value?: string; onChange?: (v: string) => void; disabled?: boolean }) => (
  <div style={{ flex: flex ?? 1, minWidth: width ?? 0 }}>
    <div style={S.lbl}>{label}</div>
    <input style={{ ...S.inp, width: width ?? "100%" }} type={type ?? "text"} value={value ?? ""} onChange={e => onChange?.(e.target.value)} disabled={disabled} />
  </div>
);

const IdBoxes = ({ count, value, onChange }: { count: number; value: string; onChange: (v: string) => void }) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const chars = value.padEnd(count, "").split("").slice(0, count);
  const handleKey = useCallback((i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !chars[i] && i > 0) refs.current[i - 1]?.focus();
  }, [chars]);
  const handleChange = useCallback((i: number, v: string) => {
    const c = v.slice(-1).toUpperCase();
    const arr = [...chars]; arr[i] = c;
    onChange(arr.join("").trimEnd());
    if (c && i < count - 1) refs.current[i + 1]?.focus();
  }, [chars, count, onChange]);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <input key={i} ref={el => { refs.current[i] = el; }} style={count > 15 ? S.ibanBox : S.idBox} maxLength={2} value={chars[i]?.trim() ?? ""} onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKey(i, e)} />
      ))}
    </div>
  );
};

const SecHeader = ({ num, title }: { num: number; title: string }) => (
  <div style={S.secHead}><span style={S.secNum}>{num}</span>{title}</div>
);

const initial = () => ({
  steuerId1: "", familienname: "", titel: "", vorname: "", geburtsname: "", geburtsdatum: "", geburtsort: "", geschlecht: "", staatsangehoerigkeit: "", strasse: "", plz: "", wohnort: "", staat: "Deutschland", familienstand: "",
  steuerId2: "", eFamilienname: "", eVorname: "", eTitel: "", eGeburtsdatum: "", eStaatsangehoerigkeit: "", eGeschlecht: "", eGeburtsname: "", eAnschrift: "",
  iban: "", bic: "", bank: "", kontoinhaber: "self" as string, khName: "", khVorname: "",
  bFamilienname: "", bVorname: "", bAnschrift: "",
  kinder: Array.from({ length: 5 }, () => ({ vorname: "", geburtsdatum: "", geschlecht: "", familienkasse: "" })),
  ort: "", datum: "",
});

export default function KindergeldMusterPDF() {
  const navigate = useNavigate();
  const [f, setF] = useState(initial);
  const set = (key: string, val: string) => setF(p => ({ ...p, [key]: val }));
  const setKind = (i: number, key: string, val: string) => setF(p => {
    const k = [...p.kinder]; k[i] = { ...k[i], [key]: val }; return { ...p, kinder: k };
  });

  const fsList = [
    { value: "ledig", label: "ledig" },
    { value: "verheiratet", label: "verheiratet" },
    { value: "lebenspartnerschaft", label: "in eingetragener Lebenspartnerschaft lebend" },
    { value: "geschieden", label: "geschieden" },
    { value: "verwitwet", label: "verwitwet" },
    { value: "getrennt", label: "dauernd getrennt lebend" },
  ];

  return (
    <div id="kg1-root" style={S.page}>
      <style>{printCSS}</style>
      <div style={S.nav}>
        <button style={S.navBtn} onClick={() => navigate(-1)}>← Nazad</button>
        <span style={{ color: "#EAB308", fontWeight: 700, fontSize: 15 }}>BL BalkanLink</span>
        <button style={S.navBtn} onClick={() => navigate("/")}>🏠</button>
      </div>

      <div style={{ padding: "0 16px" }}>
        <div style={S.disc}>
          <p style={{ fontWeight: 700, color: "#92400e", fontSize: 12, margin: 0 }}>
            ⚠️ Musterformular — nur zur Orientierung. BalkanLink ist eine edukative Plattform. Kein offizielles Dokument.
          </p>
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer" style={{ color: "#1d4ed8", fontSize: 12 }}>
            🔗 Preuzmi originalni PDF →
          </a>
        </div>
      </div>

      <div className="kg1-scale" style={{ padding: "0 16px" }}>
        <div id="kg1-paper" style={S.paper}>
          {/* HEADER */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>Antrag auf Kindergeld</div>
              <div style={{ fontSize: 9, color: "#6b7280" }}>Musterformular KG 1 — BalkanLink — nur zur Orientierung</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={S.lbl}>Kindergeld-Nr.</div>
              <input style={{ ...S.inp, width: 140, background: "#f3f4f6" }} disabled />
            </div>
          </div>

          {/* SEKCIJA 1 */}
          <div style={S.sec}>
            <SecHeader num={1} title="Angaben zur antragstellenden Person" />
            <div style={{ marginBottom: 6 }}>
              <div style={S.lbl}>Steuerliche Identifikationsnummer (zwingend auszufüllen)</div>
              <IdBoxes count={11} value={f.steuerId1} onChange={v => set("steuerId1", v)} />
            </div>
            <div style={S.row}>
              <Field label="Familienname" flex={3} value={f.familienname} onChange={v => set("familienname", v)} />
              <Field label="Titel" flex={1} value={f.titel} onChange={v => set("titel", v)} />
              <Field label="Vorname" flex={3} value={f.vorname} onChange={v => set("vorname", v)} />
              <Field label="Geburtsname" flex={3} value={f.geburtsname} onChange={v => set("geburtsname", v)} />
            </div>
            <div style={S.row}>
              <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} />
              <Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} />
              <div style={{ flex: 1 }}>
                <div style={S.lbl}>Geschlecht</div>
                <select style={{ ...S.inp }} value={f.geschlecht} onChange={e => set("geschlecht", e.target.value)}>
                  <option value="">—</option>
                  <option value="männlich">männlich</option>
                  <option value="weiblich">weiblich</option>
                  <option value="divers">divers</option>
                </select>
              </div>
              <Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} />
            </div>
            <div style={S.row}>
              <Field label="Anschrift (Straße, Hausnummer)" flex={1} value={f.strasse} onChange={v => set("strasse", v)} />
            </div>
            <div style={S.row}>
              <Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} />
              <Field label="Wohnort" flex={1} value={f.wohnort} onChange={v => set("wohnort", v)} />
              <Field label="Staat" width={120} value={f.staat} onChange={v => set("staat", v)} />
            </div>
            <div>
              <div style={S.lbl}>Familienstand</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {fsList.map(fs => (
                  <label key={fs.value} style={S.chk}>
                    <input type="checkbox" checked={f.familienstand === fs.value} onChange={() => set("familienstand", f.familienstand === fs.value ? "" : fs.value)} />
                    {fs.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* SEKCIJA 2 */}
          <div style={S.sec}>
            <SecHeader num={2} title="Angaben zum Ehepartner/Lebenspartner" />
            <div style={{ marginBottom: 6 }}>
              <div style={S.lbl}>Steuerliche Identifikationsnummer</div>
              <IdBoxes count={11} value={f.steuerId2} onChange={v => set("steuerId2", v)} />
            </div>
            <div style={S.row}>
              <Field label="Familienname" flex={3} value={f.eFamilienname} onChange={v => set("eFamilienname", v)} />
              <Field label="Vorname" flex={3} value={f.eVorname} onChange={v => set("eVorname", v)} />
              <Field label="Titel" flex={1} value={f.eTitel} onChange={v => set("eTitel", v)} />
            </div>
            <div style={S.row}>
              <Field label="Geburtsdatum" type="date" value={f.eGeburtsdatum} onChange={v => set("eGeburtsdatum", v)} />
              <Field label="Staatsangehörigkeit" value={f.eStaatsangehoerigkeit} onChange={v => set("eStaatsangehoerigkeit", v)} />
              <div style={{ flex: 1 }}>
                <div style={S.lbl}>Geschlecht</div>
                <select style={{ ...S.inp }} value={f.eGeschlecht} onChange={e => set("eGeschlecht", e.target.value)}>
                  <option value="">—</option>
                  <option value="männlich">männlich</option>
                  <option value="weiblich">weiblich</option>
                  <option value="divers">divers</option>
                </select>
              </div>
              <Field label="Geburtsname" value={f.eGeburtsname} onChange={v => set("eGeburtsname", v)} />
            </div>
            <div style={S.row}>
              <Field label="Anschrift" flex={1} value={f.eAnschrift} onChange={v => set("eAnschrift", v)} />
            </div>
          </div>

          {/* SEKCIJA 3 */}
          <div style={S.sec}>
            <SecHeader num={3} title="Angaben zum Zahlungsweg" />
            <div style={{ marginBottom: 6 }}>
              <div style={S.lbl}>IBAN</div>
              <IdBoxes count={22} value={f.iban} onChange={v => set("iban", v)} />
            </div>
            <div style={S.row}>
              <Field label="BIC" flex={1} value={f.bic} onChange={v => set("bic", v)} />
              <Field label="Bank / Finanzinstitut" flex={2} value={f.bank} onChange={v => set("bank", v)} />
            </div>
            <div>
              <div style={S.lbl}>Kontoinhaber/in</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "self"} onChange={() => set("kontoinhaber", "self")} /> antragstellende Person</label>
                <label style={S.chk}><input type="radio" name="kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} /> nicht antragstellende Person</label>
                {f.kontoinhaber === "other" && (
                  <div style={{ display: "flex", gap: 8, flex: 1 }}>
                    <Field label="Familienname" value={f.khName} onChange={v => set("khName", v)} />
                    <Field label="Vorname" value={f.khVorname} onChange={v => set("khVorname", v)} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEKCIJA 4 */}
          <div style={S.sec}>
            <SecHeader num={4} title="Der Bescheid soll nicht mir, sondern folgender Person zugesandt werden" />
            <div style={S.row}>
              <Field label="Familienname" value={f.bFamilienname} onChange={v => set("bFamilienname", v)} />
              <Field label="Vorname" value={f.bVorname} onChange={v => set("bVorname", v)} />
            </div>
            <div style={S.row}>
              <Field label="Anschrift" flex={1} value={f.bAnschrift} onChange={v => set("bAnschrift", v)} />
            </div>
          </div>

          {/* SEKCIJA 5 */}
          <div style={S.sec}>
            <SecHeader num={5} title="Angaben zu Kindern" />
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
              <thead>
                <tr>
                  {["Vorname des Kindes", "Geburtsdatum", "Geschlecht", "Bei welcher Familienkasse"].map(h => (
                    <th key={h} style={{ border: "1px solid #9ca3af", padding: "4px 6px", background: "#f3f4f6", fontSize: 9, color: "#6b7280", textAlign: "left", fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {f.kinder.map((k, i) => (
                  <tr key={i}>
                    <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.vorname} onChange={e => setKind(i, "vorname", e.target.value)} /></td>
                    <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} type="date" value={k.geburtsdatum} onChange={e => setKind(i, "geburtsdatum", e.target.value)} /></td>
                    <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                      <select style={{ ...S.inp, border: "none" }} value={k.geschlecht} onChange={e => setKind(i, "geschlecht", e.target.value)}>
                        <option value="">—</option>
                        <option value="m">m</option>
                        <option value="w">w</option>
                        <option value="d">d</option>
                      </select>
                    </td>
                    <td style={{ border: "1px solid #9ca3af", padding: 2 }}><input style={{ ...S.inp, border: "none" }} value={k.familienkasse} onChange={e => setKind(i, "familienkasse", e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* SEKCIJA 6 */}
          <div style={S.sec}>
            <SecHeader num={6} title="Datum und Unterschrift" />
            <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind.</p>
            <div style={S.row}>
              <Field label="Ort" value={f.ort} onChange={v => set("ort", v)} />
              <Field label="Datum" type="date" value={f.datum} onChange={v => set("datum", v)} />
            </div>
            <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={S.sigLine} />
                <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>Unterschrift antragstellende Person</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={S.sigLine} />
                <div style={{ fontSize: 9, color: "#6b7280", textAlign: "center" }}>Unterschrift Ehepartner/Lebenspartner</div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div style={S.footer}>
            Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei Familienkasse einreichen • BalkanLink ist keine staatliche Stelle
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div style={{ padding: "0 16px 40px", maxWidth: 794, margin: "0 auto" }}>
        <button onClick={() => {
          const orig = document.title;
          document.title = "BalkanLink-KG1-Musterformular";
          const restore = () => { document.title = orig; window.removeEventListener("afterprint", restore); };
          window.addEventListener("afterprint", restore);
          window.print();
        }} style={{ display: "block", background: "#EAB308", color: "#111", border: "none", padding: "12px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", textAlign: "center", width: "100%", boxSizing: "border-box" }}>
          ⬇️ Preuzmi Musterformular (PDF)
        </button>
      </div>
    </div>
  );
}
