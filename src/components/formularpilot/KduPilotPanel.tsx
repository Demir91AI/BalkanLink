/**
 * Development-only FormularPilot slice for the official BA Anlage KDU.
 * Rendered only when isKduPilotEnabled(). Answers and the user's PDF stay in this
 * component's memory: nothing is uploaded, stored, logged or sent anywhere.
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import fontUrl from "@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/pdf-form-engine";
import {
  prepareAnlageKdu, KDU_OFFICIAL_URL, KDU_HINTS_URL, BEDARF, EIGENTUM, ENERGIE, HEIZART, KOCHEN, WARMWASSER,
  type KduAnswers, type KduValidationError,
} from "@/lib/formularpilot/forms/anlage-kdu";

const empty = (): KduAnswers => ({
  vorname: "", nachname: "", geburtsdatum: "", strasse: "", hausnr: "", plz: "", ort: "", personen: "", flaecheGesamt: "",
  wohnen: "", bedarf: {}, eigentum: [], energie: [], heizart: [], kochen: [], wasser: "", warmwasser: [],
});

type TextKey = "vorname" | "nachname" | "bgNr" | "strasse" | "hausnr" | "plz" | "ort" | "personen" | "baujahr" | "raeume" | "kuechen" | "baeder"
  | "flaecheGesamt" | "flaecheSelbst" | "flaecheVermietet" | "flaecheLeer" | "flaecheGewerbe";

export default function KduPilotPanel() {
  const { t } = useTranslation("pages");
  const [pdf, setPdf] = useState<Uint8Array | null>(null);
  const [a, setA] = useState<KduAnswers>(empty);
  const [errors, setErrors] = useState<KduValidationError[]>([]);
  const [status, setStatus] = useState<"" | "busy" | "ok" | string>("");
  const [review, setReview] = useState(false);

  const set = <K extends keyof KduAnswers>(k: K, v: KduAnswers[K]) => { setA((p) => ({ ...p, [k]: v })); setStatus(""); };
  const err = (f: string) => errors.find((e) => e.field === f);
  const errText = (f: string) => { const e = err(f); return e ? t(`kduPilot.err.${e.code}`) : null; };
  const toggle = <T extends string>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const text = (k: TextKey, opt = false, mode: "text" | "numeric" | "decimal" = "text") => (
    <label className="block text-sm" key={k}>
      <span className="text-foreground">{t(`kduPilot.f.${k}`)}{opt && <span className="text-muted-foreground"> · {t("kduPilot.optional")}</span>}</span>
      <input className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground" inputMode={mode} autoComplete="off"
        value={a[k] ?? ""} aria-invalid={!!err(k)} onChange={(e) => set(k, e.target.value)} />
      {errText(k) && <span role="alert" className="text-xs text-destructive">{errText(k)}</span>}
    </label>
  );
  const multi = <T extends string>(group: string, options: readonly T[], value: T[], onChange: (v: T[]) => void) => (
    <fieldset className="text-sm">
      <legend className="text-foreground">{t(`kduPilot.q.${group}`)}</legend>
      <div className="mt-1 flex flex-wrap gap-3">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2"><input type="checkbox" checked={value.includes(o)} onChange={() => onChange(toggle(value, o))} />{t(`kduPilot.o.${group}.${o}`)}</label>
        ))}
      </div>
      {errText(group) && <span role="alert" className="text-xs text-destructive">{errText(group)}</span>}
    </fieldset>
  );
  const choice = (name: string, options: string[], value: string | undefined, onChange: (v: string) => void) => (
    <fieldset className="text-sm">
      <legend className="text-foreground">{t(`kduPilot.q.${name}`)}</legend>
      <div className="mt-1 flex flex-wrap gap-3">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2"><input type="radio" name={`kdu-${name}`} checked={value === o} onChange={() => onChange(o)} />{t(`kduPilot.o.${name}.${o}`)}</label>
        ))}
      </div>
      {errText(name) && <span role="alert" className="text-xs text-destructive">{errText(name)}</span>}
    </fieldset>
  );
  const other = (k: "eigentumSonstige" | "energieSonstige" | "kochenSonstige" | "warmwasserSonstige") => (
    <label className="block text-sm">
      <span className="text-foreground">{t("kduPilot.f.other")}</span>
      <input className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground" autoComplete="off" value={a[k] ?? ""} onChange={(e) => set(k, e.target.value)} />
      {errText(k) && <span role="alert" className="text-xs text-destructive">{errText(k)}</span>}
    </label>
  );

  async function onFile(file?: File) {
    setStatus("");
    setPdf(file ? new Uint8Array(await file.arrayBuffer()) : null);
  }

  async function run(download: boolean) {
    if (!pdf) { setStatus("NO_PDF"); return; }
    setStatus("busy");
    const font = new Uint8Array(await (await fetch(fontUrl)).arrayBuffer());
    const r = await prepareAnlageKdu(pdf, a, { today: new Date().toISOString().slice(0, 10), fontBytes: font });
    if ("code" in r) { setErrors(r.validation ?? []); setStatus(r.code); setReview(false); return; }
    setErrors([]);
    if (!download) { setReview(true); setStatus(""); return; }
    downloadBlob(new Blob([r.bytes as unknown as ArrayBuffer], { type: "application/pdf" }), "Anlage-KDU-ausgefuellt.pdf");
    setStatus("ok");
  }

  function clearAll() { setA(empty()); setPdf(null); setErrors([]); setStatus(""); setReview(false); }

  const v = a.vermieter ?? { name: "", strasse: "", hausnr: "", plz: "", ort: "", iban: "" };
  const setV = (k: keyof typeof v, val: string) => set("vermieter", { ...v, [k]: val });

  return (
    <section data-testid="kdu-pilot" aria-labelledby="kdu-pilot-h" className="my-6 space-y-4 rounded-xl border border-border bg-card p-4 text-card-foreground">
      <h3 id="kdu-pilot-h" className="text-lg font-semibold">{t("kduPilot.title")}</h3>
      <p className="text-sm text-muted-foreground">{t("kduPilot.devNotice")}</p>
      <p className="text-sm text-muted-foreground">{t("kduPilot.privacy")}</p>

      <ol className="list-decimal space-y-1 pl-5 text-sm">
        <li><a className="text-primary underline" href={KDU_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">{t("kduPilot.step1")}</a></li>
        <li>
          <label className="block">{t("kduPilot.step2")}
            <input data-testid="kdu-file" type="file" accept="application/pdf,.pdf" className="mt-1 block text-sm" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
        </li>
        <li>{t("kduPilot.step3")} <a className="text-primary underline" href={KDU_HINTS_URL} target="_blank" rel="noopener noreferrer">{t("kduPilot.hints")}</a></li>
      </ol>

      <div className="grid gap-3 sm:grid-cols-2">
        {text("vorname")}{text("nachname")}
        <label className="block text-sm">
          <span className="text-foreground">{t("kduPilot.f.geburtsdatum")}</span>
          <input type="date" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground" value={a.geburtsdatum} onChange={(e) => set("geburtsdatum", e.target.value)} />
          {errText("geburtsdatum") && <span role="alert" className="text-xs text-destructive">{errText("geburtsdatum")}</span>}
        </label>
        {text("bgNr", true)}{text("strasse")}{text("hausnr")}{text("plz", false, "numeric")}{text("ort")}
        {text("personen", false, "numeric")}{text("baujahr", true, "numeric")}{text("raeume", true, "numeric")}{text("kuechen", true, "numeric")}{text("baeder", true, "numeric")}
        {text("flaecheGesamt", false, "decimal")}{text("flaecheSelbst", true, "decimal")}{text("flaecheVermietet", true, "decimal")}{text("flaecheLeer", true, "decimal")}{text("flaecheGewerbe", true, "decimal")}
      </div>

      {choice("wohnen", ["miete", "eigentum"], a.wohnen, (w) => setA((p) => ({ ...p, wohnen: w as KduAnswers["wohnen"], bedarf: {}, eigentum: [], eigentumSonstige: undefined, mehrereWohneinheiten: undefined, wohneinheiten: undefined, mieteDirekt: undefined, vermieter: undefined })))}

      {a.wohnen === "miete" && (
        <fieldset className="space-y-2 text-sm">
          <legend className="text-foreground">{t("kduPilot.q.bedarf")}</legend>
          {BEDARF.map((b) => (
            <div key={b} className="flex flex-wrap items-center gap-2">
              <label className="flex min-w-40 items-center gap-2">
                <input type="checkbox" checked={a.bedarf[b] !== undefined} onChange={() => { const n = { ...a.bedarf }; if (n[b] !== undefined) delete n[b]; else n[b] = ""; set("bedarf", n); }} />
                {t(`kduPilot.o.bedarf.${b}`)}
              </label>
              {a.bedarf[b] !== undefined && (
                <input aria-label={t("kduPilot.eurLabel", { item: t(`kduPilot.o.bedarf.${b}`) })} inputMode="decimal" className="w-32 rounded-md border border-input bg-background px-2 py-1 text-foreground"
                  value={a.bedarf[b]} onChange={(e) => set("bedarf", { ...a.bedarf, [b]: e.target.value })} />
              )}
              {errText(`bedarf.${b}`) && <span role="alert" className="text-xs text-destructive">{errText(`bedarf.${b}`)}</span>}
            </div>
          ))}
          {errText("bedarf") && <span role="alert" className="text-xs text-destructive">{errText("bedarf")}</span>}
        </fieldset>
      )}

      {a.wohnen === "eigentum" && (<>
        {choice("mehrereWohneinheiten", ["ja", "nein"], a.mehrereWohneinheiten, (x) => setA((p) => ({ ...p, mehrereWohneinheiten: x as "ja" | "nein", wohneinheiten: x === "ja" ? p.wohneinheiten : undefined })))}
        {a.mehrereWohneinheiten === "ja" && (
          <label className="block text-sm"><span>{t("kduPilot.f.wohneinheiten")}</span>
            <input inputMode="numeric" className="mt-1 w-32 rounded-md border border-input bg-background px-2 py-1 text-foreground" value={a.wohneinheiten ?? ""} onChange={(e) => set("wohneinheiten", e.target.value)} />
            {errText("wohneinheiten") && <span role="alert" className="block text-xs text-destructive">{errText("wohneinheiten")}</span>}
          </label>
        )}
        {multi("eigentum", EIGENTUM, a.eigentum, (x) => set("eigentum", x))}
        {a.eigentum.includes("Sonstiges") && other("eigentumSonstige")}
      </>)}

      {multi("energie", ENERGIE, a.energie, (x) => set("energie", x))}
      {a.energie.includes("Sonstiges") && other("energieSonstige")}
      {choice("brennstoffSelbst", ["ja", "nein"], a.brennstoffSelbst, (x) => set("brennstoffSelbst", x as "ja" | "nein"))}
      {multi("heizart", HEIZART, a.heizart, (x) => set("heizart", x))}
      {multi("kochen", KOCHEN, a.kochen, (x) => set("kochen", x))}
      {a.kochen.includes("Sonstiges") && other("kochenSonstige")}
      {choice("wasser", ["zentral", "dezentral"], a.wasser, (x) => setA((p) => ({ ...p, wasser: x as "zentral" | "dezentral", warmwasser: x === "dezentral" ? p.warmwasser : [], warmwasserSonstige: x === "dezentral" ? p.warmwasserSonstige : undefined })))}
      {a.wasser === "dezentral" && multi("warmwasser", WARMWASSER, a.warmwasser, (x) => set("warmwasser", x))}
      {a.warmwasser.includes("Sonstiges") && other("warmwasserSonstige")}

      {a.wohnen === "miete" && (<>
        {choice("mieteDirekt", ["ja", "nein"], a.mieteDirekt, (x) => setA((p) => ({ ...p, mieteDirekt: x as "ja" | "nein", vermieter: x === "ja" ? p.vermieter : undefined })))}
        {a.mieteDirekt === "ja" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {(["name", "strasse", "hausnr", "plz", "ort", "iban"] as const).map((k) => (
              <label key={k} className="block text-sm"><span>{t(`kduPilot.f.vermieter.${k}`)}</span>
                <input autoComplete="off" className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground" value={v[k]} onChange={(e) => setV(k, e.target.value)} />
                {errText(`vermieter.${k}`) && <span role="alert" className="text-xs text-destructive">{errText(`vermieter.${k}`)}</span>}
              </label>
            ))}
          </div>
        )}
      </>)}

      <p className="text-sm text-muted-foreground">{t("kduPilot.signature")}</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => run(false)} disabled={status === "busy"}>{t("kduPilot.check")}</Button>
        <Button type="button" onClick={() => run(true)} disabled={status === "busy" || !review}>{t("kduPilot.download")}</Button>
        <Button type="button" variant="ghost" onClick={clearAll}>{t("kduPilot.clear")}</Button>
      </div>
      <div aria-live="polite" className="text-sm">
        {review && status === "" && <p data-testid="kdu-review-ok">{t("kduPilot.reviewOk")}</p>}
        {status === "ok" && <p data-testid="kdu-done">{t("kduPilot.done")}</p>}
        {status && status !== "busy" && status !== "ok" && <p role="alert" data-testid="kdu-block" className="text-destructive">{t(`kduPilot.block.${status}`)}</p>}
      </div>
    </section>
  );
}
