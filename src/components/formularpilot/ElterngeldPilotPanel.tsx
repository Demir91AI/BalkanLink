/**
 * Development-only integrated Elterngeld flow (shared original Stand 08/2025, verified Länder only).
 * Scope of this UI: one applying single parent ("nur ich", section 2.a ticked), minimum-amount income
 * branch, optional maternity benefits, Basis/Plus months, German account. Every other branch routes
 * to the official Land application and is labelled as such — it is never a PDF.
 * Answers and the user's PDFs stay in component memory only: nothing is uploaded, stored, logged or sent.
 */
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import fontUrl from "@/assets/fonts/liberation-sans/LiberationSans-Regular.ttf?url";
import { Button } from "@/components/ui/button";
import { downloadBlob } from "@/lib/pdf-form-engine";
import { EG_LAND_SOURCES, type EgLand } from "@/lib/formularpilot/forms/elterngeld-shared-2025";
import { ELTERNGELD_STATE_ROUTES, resolveElterngeldRoute, ELTERNGELD_OFFICE_LOOKUP } from "@/lib/formularpilot/forms/elterngeld-jurisdiction";
import { prepareElterngeldPackage, requiredAnnexes, type PackageAnswers, type AnnexKind } from "@/lib/formularpilot/forms/elterngeld-package";
import { STA_EDITIONS_BY_LAND } from "@/lib/formularpilot/forms/elterngeld-anlage-staatsangehoerigkeit";
import type { Familienstand, Geschlecht, Kv } from "@/lib/formularpilot/forms/elterngeld-shared-2025-parents";
import type { MonthMode } from "@/lib/formularpilot/forms/elterngeld-shared-2025-plan";

const today = () => new Date().toISOString().slice(0, 10);
const inputCls = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-foreground";
const LANDS = Object.keys(ELTERNGELD_STATE_ROUTES) as (keyof typeof ELTERNGELD_STATE_ROUTES)[];
const pdfLand = (l: string): l is EgLand => (EG_LAND_SOURCES as Record<string, { status: string }>)[l]?.status === "verified";

interface Ui {
  land: string;
  cV: string; cN: string; cB: string; anzahl: string; premature: boolean; due: string; disability: boolean;
  v: string; n: string; b: string; g: Geschlecht | ""; fs: Familienstand | ""; str: string; nr: string; plz: string; ort: string; seitGeburt: boolean; inDeSeit: string;
  steuerId: string; nat: "deutsch" | "andere" | ""; staKind: "eu" | "andere" | "staatenlos"; staat: string; kv: Kv | ""; vnr: string; kk: string; kkOrt: string;
  singleReason: "entlastung" | "unmoeglich" | "kindeswohl"; einkommen: PackageAnswers["household"]["einkommen"] | "";
  minimum: "" | "yes" | "no"; maternity: boolean; mFrom: string; mTo: string; gkv: boolean; employer: boolean; consent: boolean;
  months: MonthMode[]; hours: boolean; bank: string; iban: string; phone: string; email: string;
}
const empty = (): Ui => ({ land: "", cV: "", cN: "", cB: "", anzahl: "1", premature: false, due: "", disability: false, v: "", n: "", b: "", g: "", fs: "", str: "", nr: "", plz: "", ort: "",
  seitGeburt: true, inDeSeit: "", steuerId: "", nat: "", staKind: "andere", staat: "", kv: "", vnr: "", kk: "", kkOrt: "", singleReason: "entlastung", einkommen: "", minimum: "",
  maternity: false, mFrom: "", mTo: "", gkv: true, employer: false, consent: false, months: Array<MonthMode>(32).fill("none"), hours: false, bank: "", iban: "", phone: "", email: "" });

function toAnswers(u: Ui): PackageAnswers {
  const gesetzlich = u.kv === "pflicht" || u.kv === "freiwillig";
  const periods: Record<string, { from: string; to: string }> = {};
  if (u.gkv) periods.gkv = { from: u.mFrom, to: u.mTo };
  if (u.employer) periods.employer = { from: u.mFrom, to: u.mTo };
  const a: PackageAnswers = {
    child: { vorname: u.cV, nachname: u.cN, geburtsdatum: u.cB, anzahl: Number(u.anzahl), fruehgeboren: u.premature, behinderung: u.disability, ...(u.premature ? { errechneterTermin: u.due } : {}) },
    household: {
      alleinerziehend: { entlastung: u.singleReason === "entlastung", unmoeglich: u.singleReason === "unmoeglich", kindeswohl: u.singleReason === "kindeswohl" },
      as: { vorname: u.v, nachname: u.n, geburtsdatum: u.b, geschlecht: u.g as Geschlecht, familienstand: u.fs as Familienstand, wohnsitzDE: true, seitGeburt: u.seitGeburt,
        ...(u.seitGeburt ? {} : { inDeSeit: u.inDeSeit }), adresse: { strasse: u.str, nr: u.nr, plz: u.plz, ort: u.ort }, steuerId: u.steuerId.replace(/\s/g, ""),
        staatsangehoerigkeit: (u.nat || undefined) as "deutsch" | "andere" | undefined, nato: false, diplomat: false, kv: (u.kv || undefined) as Kv | undefined,
        ...(gesetzlich ? { versichertennummer: u.vnr, kkName: u.kk, kkOrt: u.kkOrt } : {}), imHaushalt: true, beziehung: "leiblich" },
      kindAdresse: "wie_as", einkommen: u.einkommen as PackageAnswers["household"]["einkommen"], antragstellende: "nur_ich", weitereKinderImHaushalt: 0, weitereKinder: [],
    },
    income: { as: { minimum: true, confirmsMax32Hours: true }, biologicalMother: u.maternity ? { kind: "benefits", periods, gkvDataConsent: u.gkv && u.consent } : { kind: "none" } },
    plan: { as: { months: u.months, max32HoursConfirmed: u.hours, parentalLeave: [], paidLeave: { kind: "none" } }, ...(u.maternity ? { biologicalMotherApplicant: "as" as const } : {}) },
    final: { as: { bank: { kind: "account", bank: u.bank, iban: u.iban, country: "DE", holder: { kind: "self" } }, ...(u.phone ? { phone: u.phone } : {}), ...(u.email ? { email: u.email } : {}) } },
  };
  if (u.nat === "andere") {
    const parent = { vorname: u.v, nachname: u.n, geburtsdatum: u.b }, child = { vorname: u.cV, nachname: u.cN, geburtsdatum: u.cB };
    a.sta = { as: { parent, child, answer: u.staKind === "staatenlos" ? { kind: "staatenlos" } : u.staKind === "eu" ? { kind: "eu", staat: u.staat, freizuegigkeitEntzogen: false } : { kind: "andere", staat: u.staat } } };
  }
  return a;
}

export default function ElterngeldPilotPanel() {
  const { t } = useTranslation("pages");
  const [u, setU] = useState<Ui>(empty);
  const [files, setFiles] = useState<Partial<Record<"main" | AnnexKind, Uint8Array>>>({});
  const [result, setResult] = useState<Awaited<ReturnType<typeof prepareElterngeldPackage>> | null>(null);
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof Ui>(k: K, v: Ui[K]) => { setU({ ...u, [k]: v }); setResult(null); };
  const answers = useMemo(() => toAnswers(u), [u]);
  const needed = pdfLand(u.land) ? requiredAnnexes(u.land, answers).filter((x) => x.verifiedForLand) : [];
  const outOfScope = u.minimum === "no";
  const route = u.land ? resolveElterngeldRoute(u.land, u.cB || today(), today()) : null;

  const text = (k: keyof Ui, label: string, type = "text") => (
    <label className="block text-sm"><span className="text-foreground">{t(`egPilot.f.${label}`)}</span>
      <input type={type} className={inputCls} autoComplete="off" value={String(u[k])} onChange={(e) => set(k, e.target.value as never)} /></label>);
  const check = (k: keyof Ui, label: string) => (
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(u[k])} onChange={(e) => set(k, e.target.checked as never)} />{t(`egPilot.f.${label}`)}</label>);
  const select = (k: keyof Ui, label: string, opts: readonly string[]) => (
    <label className="block text-sm"><span className="text-foreground">{t(`egPilot.f.${label}`)}</span>
      <select className={inputCls} value={String(u[k])} onChange={(e) => set(k, e.target.value as never)}>
        <option value="">{t("egPilot.choose")}</option>{opts.map((o) => <option key={o} value={o}>{t(`egPilot.o.${label}.${o}`)}</option>)}</select></label>);
  const file = (k: "main" | AnnexKind) => (
    <label className="block text-sm">{t(`egPilot.file.${k}`)}
      <input data-testid={`eg-file-${k}`} type="file" accept="application/pdf,.pdf" className="mt-1 block text-sm"
        onChange={async (e) => { const f = e.target.files?.[0]; setResult(null); setFiles({ ...files, [k]: f ? new Uint8Array(await f.arrayBuffer()) : undefined }); }} /></label>);

  async function run() {
    setBusy(true);
    const font = new Uint8Array(await (await fetch(fontUrl)).arrayBuffer());
    setResult(await prepareElterngeldPackage(u.land as EgLand, answers, { main: files.main!, ...files } as never, today(), { fontBytes: font }));
    setBusy(false);
  }
  const download = () => { if (result?.ok) for (const f of result.files)
    downloadBlob(new Blob([f.bytes as unknown as ArrayBuffer], { type: "application/pdf" }), `Elterngeld-${f.kind}${f.role ? `-${f.role}` : ""}-ausgefuellt.pdf`); };

  const fail = result && result.ok === false ? result : null;
  const officialRoute = route?.ok && (
    <div data-testid="eg-official-route" className="space-y-1 rounded-md border border-border p-3 text-sm">
      <p className="font-medium">{t("egPilot.routeTitle")}</p>
      <p className="text-muted-foreground">{t("egPilot.routeNotPdf")}</p>
      <a className="text-primary underline" href={route.officialRoute} target="_blank" rel="noopener noreferrer">{t("egPilot.routeLink")}</a>
      <a className="block text-primary underline" href={ELTERNGELD_OFFICE_LOOKUP} target="_blank" rel="noopener noreferrer">{t("egPilot.officeLookup")}</a>
    </div>);

  return (
    <section data-testid="eg-pilot" aria-labelledby="eg-pilot-h" className="my-6 space-y-4 rounded-xl border border-border bg-card p-4 text-card-foreground">
      <h3 id="eg-pilot-h" className="text-lg font-semibold">{t("egPilot.title")}</h3>
      <p className="text-sm text-muted-foreground">{t("egPilot.devNotice")}</p>
      <p className="text-sm text-muted-foreground">{t("kduPilot.privacy")}</p>
      <p className="text-sm text-muted-foreground">{t("egPilot.scope")}</p>
      <label className="block text-sm"><span className="text-foreground">{t("egPilot.f.land")}</span>
        <select data-testid="eg-land" className={inputCls} value={u.land} onChange={(e) => set("land", e.target.value)}>
          <option value="">{t("egPilot.choose")}</option>{LANDS.map((l) => <option key={l} value={l}>{t(`egPilot.land.${l}`)}</option>)}</select></label>
      {u.land && !pdfLand(u.land) && officialRoute}
      {pdfLand(u.land) && (<>
        <ol className="list-decimal space-y-2 pl-5 text-sm">
          <li><a className="text-primary underline" href={EG_LAND_SOURCES[u.land].url} target="_blank" rel="noopener noreferrer">{t("egPilot.getMain")}</a></li>
          <li>{file("main")}</li>
        </ol>
        <h4 className="font-medium">{t("egPilot.sec.child")}</h4>
        <div className="grid gap-3 sm:grid-cols-2">{text("cV", "vorname")}{text("cN", "nachname")}{text("cB", "geburtsdatum", "date")}{text("anzahl", "anzahl", "number")}</div>
        {check("premature", "premature")}{u.premature && text("due", "due", "date")}{check("disability", "disability")}
        <h4 className="font-medium">{t("egPilot.sec.parent")}</h4>
        {select("singleReason", "singleReason", ["entlastung", "unmoeglich", "kindeswohl"])}
        <div className="grid gap-3 sm:grid-cols-2">{text("v", "vorname")}{text("n", "nachname")}{text("b", "geburtsdatum", "date")}
          {select("g", "geschlecht", ["weiblich", "männlich", "divers", "ohne Angaben"])}{select("fs", "familienstand", ["ledig", "geschieden", "verwitwet"])}
          {text("str", "strasse")}{text("nr", "nr")}{text("plz", "plz")}{text("ort", "ort")}{text("steuerId", "steuerId")}</div>
        {check("seitGeburt", "seitGeburt")}{!u.seitGeburt && text("inDeSeit", "inDeSeit", "date")}
        {select("nat", "nat", ["deutsch", "andere"])}
        {u.nat === "andere" && (<div className="grid gap-3 sm:grid-cols-2">{select("staKind", "staKind", ["eu", "andere", "staatenlos"])}{u.staKind !== "staatenlos" && text("staat", "staat")}</div>)}
        {select("kv", "kv", ["pflicht", "freiwillig", "familie", "privat", "heilfuersorge", "keine"])}
        {(u.kv === "pflicht" || u.kv === "freiwillig") && <div className="grid gap-3 sm:grid-cols-3">{text("vnr", "vnr")}{text("kk", "kk")}{text("kkOrt", "kkOrt")}</div>}
        {select("einkommen", "einkommen", ["bis175_fest", "ueber175_fest", "ueber175_vorauss", "unter175_vorauss"])}
        <h4 className="font-medium">{t("egPilot.sec.income")}</h4>
        {select("minimum", "minimum", ["yes", "no"])}
        {outOfScope && officialRoute}
        {!outOfScope && (<>
          {check("maternity", "maternity")}
          {u.maternity && (<div className="grid gap-3 sm:grid-cols-2">{text("mFrom", "mFrom", "date")}{text("mTo", "mTo", "date")}{check("gkv", "gkv")}{check("employer", "employer")}{u.gkv && check("consent", "consent")}</div>)}
          <h4 className="font-medium">{t("egPilot.sec.plan")}</h4>
          <p className="text-sm text-muted-foreground">{t("egPilot.planHint")}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">{u.months.map((m, i) => (
            <label key={i} className="text-xs">{t("egPilot.month", { n: i + 1 })}
              <select data-testid={`eg-month-${i + 1}`} className={inputCls} value={m} onChange={(e) => { const months = [...u.months]; months[i] = e.target.value as MonthMode; set("months", months); }}>
                {(["none", "basis", "plus"] as const).map((o) => <option key={o} value={o}>{t(`egPilot.o.month.${o}`)}</option>)}</select></label>))}</div>
          {check("hours", "hours")}
          <h4 className="font-medium">{t("egPilot.sec.bank")}</h4>
          <div className="grid gap-3 sm:grid-cols-2">{text("bank", "bank")}{text("iban", "iban")}{text("phone", "phone")}{text("email", "email")}</div>
          {needed.length > 0 && (<div className="space-y-2"><h4 className="font-medium">{t("egPilot.sec.annexes")}</h4>
            {needed.some((x) => x.kind === "sta") && <a className="text-sm text-primary underline" href={STA_EDITIONS_BY_LAND[u.land]?.url} target="_blank" rel="noopener noreferrer">{t("egPilot.getSta")}</a>}
            {[...new Set(needed.map((x) => x.kind))].map((k) => <div key={k}>{file(k)}</div>)}</div>)}
          <p className="text-sm text-muted-foreground">{t("egPilot.signature")}</p>
          <div className="flex flex-wrap gap-2">
            <Button data-testid="eg-check" type="button" variant="outline" onClick={run} disabled={busy || !files.main}>{t("kduPilot.check")}</Button>
            <Button data-testid="eg-download" type="button" onClick={download} disabled={!result?.ok}>{t("egPilot.downloadAll")}</Button>
            <Button type="button" variant="ghost" onClick={() => { setU(empty()); setFiles({}); setResult(null); }}>{t("kduPilot.clear")}</Button>
          </div>
        </>)}
        <div aria-live="polite" className="space-y-2 text-sm">
          {result?.ok && <p data-testid="eg-review-ok">{t("egPilot.ready", { n: result.files.length })}</p>}
          {fail?.code === "INVALID_INPUT" && (<ul role="alert" data-testid="eg-errors" className="list-disc pl-5 text-destructive">
            {fail.errors.map((e, i) => <li key={i}>{t(`egPilot.field.${e.field}`, { defaultValue: e.field })}: {t(`egPilot.err.${e.code}`, { defaultValue: t("egPilot.err.generic") })}</li>)}</ul>)}
          {fail?.code === "OFFICIAL_ROUTE" && (<div role="alert" data-testid="eg-route-required">
            <ul className="list-disc pl-5">{fail.reasons.map((r) => <li key={r}>{t(`egPilot.reason.${r}`, { defaultValue: t("egPilot.reason.generic") })}</li>)}</ul>{officialRoute}</div>)}
          {fail?.code === "ORIGINAL_MISSING" && <p role="alert" className="text-destructive">{t("egPilot.missing")}: {fail.missing.map((m) => t(`egPilot.file.${m}`)).join(", ")}</p>}
          {fail?.code === "FILL_REFUSED" && <p role="alert" data-testid="eg-refused" className="text-destructive">{t("egPilot.refused", { doc: t(`egPilot.file.${fail.document}`) })}</p>}
        </div>
      </>)}
    </section>
  );
}
