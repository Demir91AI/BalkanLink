import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { BadgeCheck, Building2, CircleAlert, ExternalLink } from "lucide-react";
import { getGuideSource } from "@/lib/guide-first/official-sources";
import { GuideContext } from "./GuideContext";

/**
 * Shared guide-first layout for every FormCenter service: who handles it,
 * verification status, read-only notice, the existing detailed guide, an
 * in-memory progress checklist and citations. Never adds fields or sources.
 */
export default function GuideFrame({ slug, title, children }: { slug: string; title?: string; children: ReactNode }) {
  const { t } = useTranslation("pages");
  const src = getGuideSource(slug);
  const authority = src.kind === "local" || !src.label ? t("guideFirst.frame.localAuthority") : src.label;

  return (
    <GuideContext.Provider value={{ slug, source: src }}>
    <div data-testid="guide-frame" data-slug={slug} className="space-y-6 text-foreground">
      <header className="border-b border-border py-4 sm:py-5">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">{t("guideFirst.frame.badge")}</p>
        {title && <h2 className="mt-1 text-lg font-bold text-foreground">{title}</h2>}
        <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span><strong className="text-foreground">{t("guideFirst.frame.authority")}:</strong> {authority}</span>
        </p>
        <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground" data-testid="guide-verify-status">
          {src.verifiedOn ? (
            <><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />{t("guideFirst.frame.verified", { date: src.verifiedOn })}</>
          ) : (
            <><CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />{t("guideFirst.frame.unverified")}</>
          )}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">{t("guideFirst.frame.readOnly")}</p>
      </header>

      {children}

      {src.extraLinks && src.extraLinks.length > 0 && (
        <section className="border-t border-border py-4" data-testid="guide-extra-sources">
          <h3 className="text-sm font-bold text-foreground">{t("guideFirst.frame.moreSources")}</h3>
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

    </div>
    </GuideContext.Provider>
  );
}
