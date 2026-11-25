/**
 * Development-only FormularPilot slice for the official BA Anlage SV.
 * Answers and the user's PDF stay in component memory: nothing is uploaded, stored, logged or sent.
 */
import { useState } from "react";
import { useTranslation } from "react-i18next";
import fontUrl from "@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/pdf-form-engine";
import { prepareAnlageSv, svNeedsQ11, svOffersZuschuss, SV_OFFICIAL_URL, SV_HINTS_URL, SV_SOURCE, type SvAnswers, type SvValidationError, type YesNo } from "@/lib/formularpilot/forms/anlage-sv";

const empty = (): SvAnswers => ({ vorname: "", nachname: "", geburtsdatum: "", bVorname: "", bNachname: "", bGeburtsdatum: "" });
const today = () => new Date().toISOString().slice(0, 10);
const inputCls = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground";

export default function SvPilotPanel() {
  const { t } = useTranslation("pages");
  const [pdf, setPdf] = useState<Uint8Array | null>(null);
  const [a, setA] = useState<SvAnswers>(empty);
  const [errors, setErrors] = useState<SvValidationError[]>([]);
  const [status, setStatus] = useState("");
  const [review, setReview] = useState(false);

  const upd = (n: SvAnswers) => {
    // Drop answers that no longer apply so hidden questions never reach the PDF.
    if (!svNeedsQ11(n, today())) n = { ...n, versFrei: undefined };
    if (!svOffersZuschuss(n)) n = { ...n, zuschuss: undefined };
    setA(n); setStatus(""); setReview(false);
  };
  const set = <K extends keyof SvAnswers>(k: K, v: SvAnswers[K]) => upd({ ...a, [k]: v });
  const errText = (f: string) => { const e = errors.find((x) => x.field === f); return e ? t(`kduPilot.err.${e.code}`) : null; };
  const alert = (f: string) => errText(f) && <span role="alert" className="text-xs text-destructive">{errText(f)}</span>;

  const text = (k: "vorname" | "nachname" | "bgNr" | "bVorname" | "bNachname", opt = false) => (
    <label className="block text-sm" key={k}>
      <span className="text-foreground">{t(`svPilot.f.${k}`)}{opt && <span className="text-muted-foreground"> · {t("kduPilot.optional")}</span>}</span>
      <input className={inputCls} autoComplete="off" value={a[k] ?? ""} aria-invalid={!!errText(k)} onChange={(e) => set(k, e.target.value)} />
      {alert(k)}
    </label>
  );
  const date = (k: "geburtsdatum" | "bGeburtsdatum") => (
    <label className="block text-sm">
      <span className="text-foreground">{t(`svPilot.f.${k}`)}</span>
      <input type="date" className={inputCls} value={a[k]} aria-invalid={!!errText(k)} onChange={(e) => set(k, e.target.value)} />
      {alert(k)}
    </label>
  );
  const yn = (k: "pkv" | "selbstaendig" | "beihilfe" | "versFrei" | "zuschuss") => (
    <fieldset className="text-sm">
      <legend className="text-foreground">{t(`svPilot.q.${k}`)}</legend>
      <div className="mt-1 flex gap-4">
        {(["ja", "nein"] as YesNo[]).map((o) => (
          <label key={o} className="flex items-center gap-2"><input type="radio" name={`sv-${k}`} checked={a[k] === o} onChange={() => set(k, o)} />{t(`svPilot.o.${o}`)}</label>
        ))}
      </div>
      {alert(k)}
    </fieldset>
  );

  async function run(download: boolean) {
    if (!pdf) { setStatus("NO_PDF"); return; }
    setStatus("busy");
    const font = new Uint8Array(await (await fetch(fontUrl)).arrayBuffer());
    const r = await prepareAnlageSv(pdf, a, { today: today(), fontBytes: font });
    if ("code" in r) { setErrors(r.validation ?? []); setStatus(r.code); setReview(false); return; }
    setErrors([]);
    if (!download) { setReview(true); setStatus(""); return; }
    downloadBlob(new Blob([r.bytes as unknown as ArrayBuffer], { type: "application/pdf" }), "Anlage-SV-ausgefuellt.pdf");
    setStatus("ok");
  }

  const q11 = svNeedsQ11(a, today()), q12 = svOffersZuschuss(a);
  return (
    <section data-testid="sv-pilot" aria-labelledby="sv-pilot-h" className="my-6 space-y-4 rounded-xl border border-border bg-card p-4 text-card-foreground">
      <h3 id="sv-pilot-h" className="text-lg font-semibold">{t("svPilot.title")}</h3>
      <p className="text-sm text-muted-foreground">{t("kduPilot.devNotice")}</p>
      <p className="text-sm text-muted-foreground">{t("kduPilot.privacy")}</p>
      <p className="text-xs text-muted-foreground">{t("svPilot.source")}: {SV_SOURCE}</p>
      <ol className="list-decimal space-y-1 pl-5 text-sm">
        <li><a className="text-primary underline" href={SV_OFFICIAL_URL} target="_blank" rel="noopener noreferrer">{t("kduPilot.step1")}</a></li>
        <li><label className="block">{t("kduPilot.step2")}
          <input data-testid="sv-file" type="file" accept="application/pdf,.pdf" className="mt-1 block text-sm"
            onChange={async (e) => { const f = e.target.files?.[0]; setStatus(""); setReview(false); setPdf(f ? new Uint8Array(await f.arrayBuffer()) : null); }} />
        </label></li>
        <li>{t("kduPilot.step3")} <a className="text-primary underline" href={SV_HINTS_URL} target="_blank" rel="noopener noreferrer">{t("kduPilot.hints")}</a></li>
      </ol>
      <p className="text-sm text-muted-foreground">{t("svPilot.scope")}</p>
      <h4 className="font-medium">{t("svPilot.secA")}</h4>
      <div className="grid gap-3 sm:grid-cols-2">{text("vorname")}{text("nachname")}{date("geburtsdatum")}{text("bgNr", true)}</div>
      <h4 className="font-medium">{t("svPilot.secB")}</h4>
      <Button type="button" variant="outline" size="sm" onClick={() => upd({ ...a, bVorname: a.vorname, bNachname: a.nachname, bGeburtsdatum: a.geburtsdatum })}>{t("svPilot.sameAsA")}</Button>
      <div className="grid gap-3 sm:grid-cols-2">{text("bVorname")}{text("bNachname")}{date("bGeburtsdatum")}</div>
      <h4 className="font-medium">{t("svPilot.secC")}</h4>
      {yn("pkv")}{yn("selbstaendig")}{yn("beihilfe")}
      {q11 && yn("versFrei")}
      {q12 ? (<><h4 className="font-medium">{t("svPilot.secD")}</h4>{yn("zuschuss")}{a.zuschuss === "ja" && <p className="text-sm text-muted-foreground">{t("svPilot.zuschussProof")}</p>}</>)
        : (a.pkv && a.selbstaendig && a.beihilfe && (!q11 || a.versFrei) && <p data-testid="sv-gkv-note" className="text-sm text-muted-foreground">{t("svPilot.allNo")}</p>)}
      <p className="text-sm text-muted-foreground">{t("kduPilot.signature")}</p>
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => run(false)} disabled={status === "busy"}>{t("kduPilot.check")}</Button>
        <Button type="button" onClick={() => run(true)} disabled={status === "busy" || !review}>{t("kduPilot.download")}</Button>
        <Button type="button" variant="ghost" onClick={() => { setA(empty()); setPdf(null); setErrors([]); setStatus(""); setReview(false); }}>{t("kduPilot.clear")}</Button>
      </div>
      <div aria-live="polite" className="text-sm">
        {review && status === "" && <p data-testid="sv-review-ok">{t("kduPilot.reviewOk")}</p>}
        {status === "ok" && <p data-testid="sv-done">{t("kduPilot.done")}</p>}
        {status && status !== "busy" && status !== "ok" && <p role="alert" data-testid="sv-block" className="text-destructive">{t(status === "PREFLIGHT_FAILED" ? "svPilot.preflight" : `kduPilot.block.${status}`)}</p>}
      </div>
    </section>
  );
}
