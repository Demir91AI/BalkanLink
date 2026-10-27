import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BadgeCheck, Building2, CircleAlert, ExternalLink, ListChecks } from "lucide-react";
import { getGuideSource } from "@/lib/guide-first/official-sources";

/**
 * Shared guide-first layout for every FormCenter service: who handles it,
 * verification status, read-only notice, the existing detailed guide, an
 * in-memory progress checklist and citations. Never adds fields or sources.
 */
export default function GuideFrame({ slug, title, children }: { slug: string; title?: string; children: ReactNode }) {
  const { t } = useTranslation("pages");
  const src = getGuideSource(slug);
  const steps = t("guideFirst.frame.steps", { returnObjects: true }) as string[];
  const [done, setDone] = useState<boolean[]>(() => steps.map(() => false));
  const authority = src.kind === "local" || !src.label ? t("guideFirst.frame.localAuthority") : src.label;

  return (
    <div data-testid="guide-frame" data-slug={slug} className="space-y-6">
      <header className="rounded-2xl border border-[hsl(var(--gold))]/25 bg-[#111B2D] p-4 sm:p-5">
        <p className="text-xs font-bold uppercase tracking-wide text-[hsl(var(--gold))]">{t("guideFirst.frame.badge")}</p>
        {title && <h2 className="mt-1 text-lg font-bold text-[#F8FAFC]">{title}</h2>}
        <p className="mt-3 flex items-start gap-2 text-sm text-[#CBD5E1]">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
          <span><strong className="text-[#F8FAFC]">{t("guideFirst.frame.authority")}:</strong> {authority}</span>
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm text-[#CBD5E1]" data-testid="guide-verify-status">
          {src.verifiedOn ? (
            <><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />{t("guideFirst.frame.verified", { date: src.verifiedOn })}</>
          ) : (
            <><CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />{t("guideFirst.frame.unverified")}</>
          )}
        </p>
        <p className="mt-2 text-xs text-[#CBD5E1]">{t("guideFirst.frame.readOnly")}</p>
      </header>

      {children}

      {src.extraLinks && src.extraLinks.length > 0 && (
        <section className="rounded-2xl border border-white/10 bg-[#18253A] p-4" data-testid="guide-extra-sources">
          <h3 className="text-sm font-bold text-[#F8FAFC]">{t("guideFirst.frame.moreSources")}</h3>
          <ul className="mt-2 space-y-2">
            {src.extraLinks.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--gold))] underline underline-offset-2">
                  {l.label}<ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-white/10 bg-[#18253A] p-4" aria-labelledby={`progress-${slug}`}>
        <h3 id={`progress-${slug}`} className="flex items-center gap-2 text-sm font-bold text-[#F8FAFC]">
          <ListChecks className="h-4 w-4 text-[hsl(var(--gold))]" />{t("guideFirst.frame.progressTitle")}
          <span className="ml-auto text-xs font-semibold text-[#CBD5E1]">{done.filter(Boolean).length}/{steps.length}</span>
        </h3>
        <ul className="mt-3 space-y-2">
          {steps.map((s, i) => (
            <li key={s}>
              <button
                type="button"
                role="checkbox"
                aria-checked={done[i]}
                onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm ${done[i] ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-[#F8FAFC]" : "border-white/15 text-[#CBD5E1]"}`}
              >
                <span aria-hidden className={`h-4 w-4 shrink-0 rounded border ${done[i] ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]" : "border-[#CBD5E1]"}`} />
                {s}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-[#CBD5E1]">{t("guideFirst.frame.progressNote")}</p>
      </section>
    </div>
  );
}
