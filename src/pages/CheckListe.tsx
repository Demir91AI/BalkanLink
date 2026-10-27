/**
 * Premium Checklists hub page.
 * Lists all checklists as cards, premium ones gated visually.
 */
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import PageNavBar from "@/components/navigation/PageNavBar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CHECKLISTS } from "@/lib/checklists-data";
import { useLocalizedNavigate } from "@/hooks/useLocalizedHref";
import { usePremiumAccess } from "@/hooks/usePremiumAccess";


const ACCENTS: Record<string, string> = {
  emerald: "bg-emerald-500",
  amber: "bg-amber-500",
  indigo: "bg-indigo-500",
  rose: "bg-rose-500",
  blue: "bg-blue-500",
  violet: "bg-violet-500",
  teal: "bg-teal-500",
  orange: "bg-orange-500",
};

export default function CheckListe() {
  const { t } = useTranslation("checklists");
  const navigate = useLocalizedNavigate();

  return (
    <>
      <SEO title={t("hub.seo.title")} description={t("hub.seo.description")} path="/check-liste" />
      <div className="mx-auto max-w-4xl px-4 py-6 pb-28">
        <PageNavBar showShare shareTitle={t("hub.title")} />

        <div className="mt-4 mb-6 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{t("hub.title")}</h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t("hub.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CHECKLISTS.map((cl) => {
            const Icon = cl.icon;
            return (
              <Card
                key={cl.id}
                className="relative rounded-2xl border border-border hover:border-[hsl(var(--gold))]/40 hover:shadow-md transition-all cursor-pointer group"
              >
                <CardContent className="p-5" onClick={() => navigate(`/check-liste/${cl.id}`)}>
                  <div className="flex items-start justify-between mb-3 pr-10">
                    <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl shadow-sm", ACCENTS[cl.accent])}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold mb-1 leading-snug">{t(`${cl.id}.title`)}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                    {t(`${cl.id}.subtitle`)}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                    <span>{t("hub.stats.documents", { count: cl.counts.documents })}</span>
                    <span>·</span>
                    <span>{t("hub.stats.steps", { count: cl.counts.steps })}</span>
                  </div>
                  <div className="flex items-center justify-end text-xs font-medium text-foreground/80 group-hover:text-[hsl(var(--gold))] transition-colors">
                    {t("hub.ctaOpen")}
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground italic text-center">{t("hub.footerNote")}</p>
      </div>
    </>
  );
}
