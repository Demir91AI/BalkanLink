import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import fontUrl from "@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url";
import { downloadBlob } from "@/lib/pdf-fill-kindergeld";
import {
  KG_OFFICIAL, buildKindergeldDatenblatt, filledChildren, planKg, validateKg,
  type KgData, type KgError, type KgFlags, type YesNo,
} from "@/lib/kindergeld-assistant/datenblatt";

type Step = "situation" | "applicant" | "partner" | "children" | "bank" | "review";
const ORDER: Step[] = ["situation", "applicant", "partner", "children", "bank", "review"];
const STEP_PATHS: Record<Step, (p: string) => boolean> = {
  situation: (p) => p === "crossBorder" || p === "hasPartner",
  applicant: (p) => ["familienname", "vorname", "geburtsdatum", "staatsangehoerigkeit", "steuerId1", "strasse", "plz", "wohnort"].includes(p),
  partner: (p) => p.startsWith("e") || p === "steuerId2",
  children: (p) => p.startsWith("kinder"),
  bank: (p) => p === "iban" || p === "khName",
  review: () => true,
};
const today = () => new Date().toISOString().slice(0, 10);

const box: React.CSSProperties = { marginBottom: 18, padding: 16, background: "#F8FAFC", border: "1px solid #CBD5E1", borderRadius: 10, color: "#0F172A" };
const inp: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #94A3B8", borderRadius: 8, fontSize: 15, background: "#fff", color: "#0F172A", boxSizing: "border-box" };
const btn = (primary: boolean): React.CSSProperties => ({ minHeight: 44, padding: "10px 16px", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", border: primary ? "none" : "1px solid #94A3B8", background: primary ? "#1E3A8A" : "#fff", color: primary ? "#fff" : "#0F172A" });
const link: React.CSSProperties = { color: "#1D4ED8", textDecoration: "underline" };

interface Props {
  f: KgData;
  set: (key: string, val: string) => void;
  setKind: (i: number, key: string, val: string) => void;
}

/** Deterministic Kindergeld Asistent. Edits the existing page state; no storage, no network beyond the bundled font. */
export default function KindergeldAssistent({ f, set, setKind }: Props) {
  const { t } = useTranslation("forms");
  const k = (s: string) => t(`musterFlow.kindergeld.assistant.${s}`);
  const [flags, setFlags] = useState<KgFlags>({ crossBorder: "", hasPartner: "" });
  const [step, setStep] = useState<Step>("situation");
  const [errors, setErrors] = useState<KgError[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [kidSlots, setKidSlots] = useState(() => Math.max(1, filledChildren(f).length));

  const visible = ORDER.filter((s) => s !== "partner" || flags.hasPartner === "yes");
  const idx = visible.indexOf(step);
  const errFor = (path: string) => errors.find((e) => e.path === path);
  const plan = useMemo(() => planKg(f, flags, today()), [f, flags]);

  const next = () => {
    const errs = validateKg(f, flags, today()).filter((e) => STEP_PATHS[step](e.path));
    setErrors(errs);
    if (!errs.length && idx < visible.length - 1) setStep(visible[idx + 1]);
  };
  const back = () => { setErrors([]); if (idx > 0) setStep(visible[idx - 1]); };

  const download = async () => {
    setBusy(true); setMsg(null);
    try {
      const fontBytes = new Uint8Array(await (await fetch(fontUrl)).arrayBuffer());
      const r = await buildKindergeldDatenblatt(f, flags, { today: today(), fontBytes });
      if (!("bytes" in r)) {
        const fail = r as { code: string; errors?: KgError[] };
        setMsg(k(fail.code === "VALIDATION_FAILED" ? "errors.fix" : "errors.pdf"));
        if (fail.errors) setErrors(fail.errors);
        return;
      }
      downloadBlob(new Blob([r.bytes as BlobPart], { type: "application/pdf" }), "Kindergeld-Ausfuellhilfe-nicht-amtlich.pdf");
    } catch { setMsg(k("errors.pdf")); } finally { setBusy(false); }
  };

  const field = (label: string, key: keyof KgData, type = "text") => {
    const e = errFor(key as string);
    return (
      <label style={{ display: "block", marginBottom: 12, fontSize: 13, fontWeight: 600 }}>
        {label}
        <input type={type} style={{ ...inp, marginTop: 4, borderColor: e ? "#B91C1C" : "#94A3B8" }} value={(f[key] as string) ?? ""}
          aria-invalid={!!e} onChange={(ev) => set(key as string, ev.target.value)} />
        {e && <span role="alert" style={{ color: "#B91C1C", fontSize: 12 }}>{k(`errors.${e.code}`)}</span>}
      </label>
    );
  };
  const yesNo = (name: keyof KgFlags, q: string, hint?: string) => (
    <fieldset style={{ border: "none", padding: 0, margin: "0 0 14px" }}>
      <legend style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{q}</legend>
      {hint && <div style={{ fontSize: 12, color: "#334155", marginBottom: 6 }}>{hint}</div>}
      <div style={{ display: "flex", gap: 8 }}>
        {(["yes", "no"] as YesNo[]).map((v) => (
          <button key={v} type="button" aria-pressed={flags[name] === v} onClick={() => setFlags((p) => ({ ...p, [name]: v }))}
            style={{ ...btn(flags[name] === v), flex: 1 }}>{k(v)}</button>
        ))}
      </div>
      {errFor(name) && <span role="alert" style={{ color: "#B91C1C", fontSize: 12 }}>{k("errors.UNANSWERED")}</span>}
    </fieldset>
  );

  return (
    <section aria-labelledby="kg-asistent-title" data-testid="kindergeld-assistent">
      <div style={{ ...box, background: "#FFFBEB", borderColor: "#D97706" }} data-testid="kg-official-box">
        <div style={{ fontWeight: 700, marginBottom: 6 }}>{k("official.title")}</div>
        <div style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 8 }}>{k("official.body")}</div>
        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, lineHeight: 1.8 }}>
          <li><a style={link} href={KG_OFFICIAL.online} target="_blank" rel="noopener noreferrer">{k("official.online")}</a></li>
          <li><a style={link} href={KG_OFFICIAL.kg1} target="_blank" rel="noopener noreferrer">{k("official.kg1")}</a></li>
          <li><a style={link} href={KG_OFFICIAL.ank} target="_blank" rel="noopener noreferrer">{k("official.ank")}</a></li>
          <li><a style={link} href={KG_OFFICIAL.formsPage} target="_blank" rel="noopener noreferrer">{k("official.formsPage")}</a></li>
        </ul>
      </div>

      <div style={box}>
        <h2 id="kg-asistent-title" style={{ fontSize: 17, fontWeight: 800, margin: "0 0 4px" }}>{k("title")}</h2>
        <p style={{ fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>{k("intro")}</p>
        <div style={{ fontSize: 12, color: "#334155", marginBottom: 12 }} aria-live="polite">
          {k("stepOf").replace("{{n}}", String(idx + 1)).replace("{{total}}", String(visible.length))} — <strong>{k(`steps.${step}`)}</strong>
        </div>

        {step === "situation" && (<>
          {yesNo("hasPartner", k("q.hasPartner"))}
          {yesNo("crossBorder", k("q.crossBorder"), k("q.crossBorderHint"))}
          {flags.crossBorder === "yes" && <div role="note" style={{ fontSize: 13, padding: 10, background: "#FEF3C7", borderRadius: 8 }}>{k("notes.cross_border_official_check")}</div>}
        </>)}

        {step === "applicant" && (<>
          {field("Familienname", "familienname")}{field("Vorname", "vorname")}{field("Geburtsdatum", "geburtsdatum", "date")}
          {field("Staatsangehörigkeit", "staatsangehoerigkeit")}{field("Steuerliche Identifikationsnummer (11)", "steuerId1")}
          {field("Straße, Hausnummer", "strasse")}{field("PLZ", "plz")}{field("Wohnort", "wohnort")}
        </>)}

        {step === "partner" && (<>
          {field("Familienname", "eFamilienname")}{field("Vorname", "eVorname")}{field("Geburtsdatum", "eGeburtsdatum", "date")}
          {field("Staatsangehörigkeit", "eStaatsangehoerigkeit")}{field("Steuerliche Identifikationsnummer (11)", "steuerId2")}
        </>)}

        {step === "children" && (<>
          <p style={{ fontSize: 13, marginTop: 0 }}>{k("children.hint")}</p>
          {errFor("kinder") && <div role="alert" style={{ color: "#B91C1C", fontSize: 12, marginBottom: 8 }}>{k("errors.NO_CHILDREN")}</div>}
          {Array.from({ length: kidSlots }, (_, i) => {
            const c = f.kinder[i]; const ev = errFor(`kinder.${i}.vorname`); const ed = errFor(`kinder.${i}.geburtsdatum`);
            return (
              <div key={i} style={{ border: "1px solid #CBD5E1", borderRadius: 8, padding: 12, marginBottom: 10 }} data-testid={`kg-child-${i}`}>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{k("children.child").replace("{{n}}", String(i + 1))}</div>
                <label style={{ display: "block", fontSize: 13, marginBottom: 8 }}>Vorname
                  <input style={{ ...inp, marginTop: 4 }} aria-invalid={!!ev} value={c.vorname} onChange={(e) => setKind(i, "vorname", e.target.value)} />
                  {ev && <span role="alert" style={{ color: "#B91C1C", fontSize: 12 }}>{k(`errors.${ev.code}`)}</span>}
                </label>
                <label style={{ display: "block", fontSize: 13, marginBottom: 8 }}>Geburtsdatum
                  <input type="date" style={{ ...inp, marginTop: 4 }} aria-invalid={!!ed} value={c.geburtsdatum} onChange={(e) => setKind(i, "geburtsdatum", e.target.value)} />
                  {ed && <span role="alert" style={{ color: "#B91C1C", fontSize: 12 }}>{k(`errors.${ed.code}`)}</span>}
                </label>
                <label style={{ display: "block", fontSize: 13 }}>Geschlecht
                  <select style={{ ...inp, marginTop: 4 }} value={c.geschlecht} onChange={(e) => setKind(i, "geschlecht", e.target.value)}>
                    <option value="">—</option><option value="m">männlich</option><option value="w">weiblich</option><option value="d">divers</option>
                  </select>
                </label>
                {kidSlots > 1 && i === kidSlots - 1 && (
                  <button type="button" style={{ ...btn(false), marginTop: 8 }} onClick={() => { ["vorname", "geburtsdatum", "geschlecht"].forEach((key) => setKind(i, key, "")); setKidSlots(kidSlots - 1); }}>{k("children.remove")}</button>
                )}
              </div>
            );
          })}
          {kidSlots < f.kinder.length
            ? <button type="button" style={btn(false)} onClick={() => setKidSlots(kidSlots + 1)}>{k("children.add")}</button>
            : <p style={{ fontSize: 12 }}>{k("children.max")}</p>}
        </>)}

        {step === "bank" && (<>
          {field("IBAN", "iban")}{field("BIC", "bic")}{field("Bank", "bank")}
          <fieldset style={{ border: "none", padding: 0, margin: "0 0 12px" }}>
            <legend style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>{k("q.accountHolder")}</legend>
            <label style={{ display: "block", fontSize: 13, marginBottom: 4 }}><input type="radio" name="kg-kh" checked={f.kontoinhaber !== "other"} onChange={() => set("kontoinhaber", "self")} /> {k("q.accountSelf")}</label>
            <label style={{ display: "block", fontSize: 13 }}><input type="radio" name="kg-kh" checked={f.kontoinhaber === "other"} onChange={() => set("kontoinhaber", "other")} /> {k("q.accountOther")}</label>
          </fieldset>
          {f.kontoinhaber === "other" && (<>{field("Kontoinhaber(in) – Familienname", "khName")}{field("Kontoinhaber(in) – Vorname", "khVorname")}</>)}
        </>)}

        {step === "review" && (
          <div data-testid="kg-review">
            <div role="status" style={{ padding: 10, borderRadius: 8, marginBottom: 10, fontSize: 13, background: plan.coveredBySheet ? "#EFF6FF" : "#FEF3C7" }}>
              {k(plan.coveredBySheet ? "review.covered" : "review.incomplete")}
            </div>
            <ul style={{ fontSize: 13, lineHeight: 1.6, paddingLeft: 18 }}>
              <li>{k("review.docs").replace("{{n}}", String(plan.documents[1].count))}</li>
              {plan.notes.map((n) => <li key={n}>{k(`notes.${n}`)}</li>)}
            </ul>
            <button type="button" style={{ ...btn(true), width: "100%" }} disabled={busy} onClick={download}>
              {busy ? k("nav.generating") : k("nav.download")}
            </button>
            <p style={{ fontSize: 12, color: "#334155", marginTop: 8 }}>{k("privacy")}</p>
          </div>
        )}

        {msg && <div role="alert" style={{ color: "#B91C1C", fontSize: 13, marginTop: 8 }}>{msg}</div>}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {idx > 0 && <button type="button" style={{ ...btn(false), flex: 1 }} onClick={back}>{k("nav.back")}</button>}
          {step !== "review" && <button type="button" style={{ ...btn(true), flex: 1 }} onClick={next}>{k("nav.next")}</button>}
        </div>
      </div>
    </section>
  );
}
