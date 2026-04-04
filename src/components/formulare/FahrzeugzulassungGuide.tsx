import { useTranslation } from "react-i18next";
import {
  ExternalLink,
  AlertTriangle,
  MapPin,
  Clock,
  FileText,
  CheckCircle2,
  Users,
  Car,
  ListOrdered,
  Globe,
  Link as LinkIcon,
} from "lucide-react";

function BoldDash({ text }: { text: string }) {
  const idx = text.indexOf(" — ");
  if (idx < 0) return <span>{text}</span>;
  return (
    <span className="text-muted-foreground leading-relaxed">
      <strong className="text-foreground">{text.substring(0, idx)}</strong>
      {text.substring(idx)}
    </span>
  );
}

export default function FahrzeugzulassungGuide() {
  const { t } = useTranslation("formulare");

  const types = ["fz_type1", "fz_type2", "fz_type3", "fz_type4", "fz_type5", "fz_type6"];
  const whos = ["fz_who1", "fz_who2", "fz_who3", "fz_who4", "fz_who5", "fz_who6"];
  const docs = ["fz_doc1", "fz_doc2", "fz_doc3", "fz_doc4", "fz_doc5", "fz_doc6", "fz_doc7", "fz_doc8", "fz_doc9"];
  const steps = ["fz_step1", "fz_step2", "fz_step3", "fz_step4", "fz_step5", "fz_step6", "fz_step7", "fz_step8", "fz_step9"];
  const regs = ["fz_reg1", "fz_reg2", "fz_reg3", "fz_reg4", "fz_reg5", "fz_reg6", "fz_reg7", "fz_reg8"];
  const costs = ["fz_cost1", "fz_cost2", "fz_cost3", "fz_cost4", "fz_cost5", "fz_cost6", "fz_cost7", "fz_cost8"];
  const imports = ["fz_imp1", "fz_imp2", "fz_imp3", "fz_imp4", "fz_imp5"];
  const errors = ["fz_err1", "fz_err2", "fz_err3", "fz_err4", "fz_err5", "fz_err6", "fz_err7", "fz_err8"];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">🚗 {t("fz_title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t("fz_subtitle")}</p>
      </div>

      {/* S1 — What is it */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Car className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s1")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("fz_what")}</p>
        <ul className="space-y-1.5">
          {types.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S2 — Who must register */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Users className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s2")}
        </h2>
        <ul className="space-y-2">
          {whos.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S3 — Documents */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <FileText className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s3")}
        </h2>
        <ul className="space-y-1.5">
          {docs.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S4 — Steps */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <ListOrdered className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s4")}
        </h2>
        <ol className="space-y-2.5">
          {steps.map((key, i) => (
            <li key={key} className="flex items-start gap-3 text-sm">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/10 text-[10px] font-bold text-[#C9A84C]">
                {i + 1}
              </span>
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ol>
      </section>

      {/* S5 — Registration types */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Car className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s5")}
        </h2>
        <ul className="space-y-1.5">
          {regs.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S6 — Where */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <MapPin className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s6")}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t("fz_where")}</p>
      </section>

      {/* S7 — Costs */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Clock className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s7")}
        </h2>
        <ul className="space-y-1.5">
          {costs.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              {t(key)}
            </li>
          ))}
        </ul>
      </section>

      {/* S8 — Import */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <Globe className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s8")}
        </h2>
        <p className="text-sm font-medium text-foreground">{t("fz_imp_intro")}</p>
        <ul className="space-y-1.5">
          {imports.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-[#C9A84C]" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S9 — Mistakes */}
      <section className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#EF4444]">
          <AlertTriangle className="h-4 w-4 text-[#EF4444]" /> {t("fz_s9")}
        </h2>
        <ul className="space-y-1.5">
          {errors.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-destructive" />
              <BoldDash text={t(key)} />
            </li>
          ))}
        </ul>
      </section>

      {/* S10 — Links */}
      <section className="rounded-xl border bg-card p-5 space-y-3">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
          <LinkIcon className="h-4 w-4 text-[#C9A84C]" /> {t("fz_s10")}
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href={t("fz_link1_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("fz_link1_label")}
          </a>
          <a
            href={t("fz_link2_url")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("fz_link2_label")}
          </a>
        </div>
        <p className="text-center text-xs italic text-muted-foreground">{t("fz_source")}</p>
      </section>
    </div>
  );
}
