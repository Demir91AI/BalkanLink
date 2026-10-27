import { ExternalLink, Info, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getGuideSource } from "@/lib/guide-first/official-sources";

/** Consistent, non-PII "official next step" card shown under every FormCenter guide. */
export default function OfficialNextStep({ slug }: { slug: string }) {
  const { t } = useTranslation("pages");
  const src = getGuideSource(slug);
  const hasLink = src.kind !== "local" && !!src.url;
  return (
    <section
      data-testid="official-next-step"
      className="mt-8 rounded-2xl border border-[hsl(var(--gold))]/25 bg-card/60 p-5"
    >
      <div className="flex items-center gap-2 text-[hsl(var(--gold))]">
        <ShieldCheck className="h-4 w-4" />
        <h3 className="text-sm font-bold uppercase tracking-wide">{t("guideFirst.nextStep.title")}</h3>
      </div>
      {hasLink ? (
        <a
          href={src.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[hsl(var(--gold))] px-4 py-3 text-sm font-bold text-[hsl(var(--background))]"
        >
          {src.kind === "official" ? t("guideFirst.nextStep.officialBtn") : t("guideFirst.nextStep.infoBtn")}
          <ExternalLink className="h-4 w-4" />
        </a>
      ) : null}
      {hasLink && <p className="mt-2 text-center text-xs text-muted-foreground">{src.label}</p>}
      {!hasLink && <p className="mt-3 text-sm text-foreground/85">{t("guideFirst.nextStep.local")}</p>}
      <p className="mt-4 flex gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span>
          {src.verifiedOn
            ? t("guideFirst.nextStep.verified", { date: src.verifiedOn })
            : t("guideFirst.nextStep.notReverified")}{" "}
          {t("guideFirst.nextStep.noSubmit")}
        </span>
      </p>
    </section>
  );
}
