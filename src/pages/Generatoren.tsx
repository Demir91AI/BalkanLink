import { ExternalLink, Calculator, AlertTriangle, Euro, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";

/* ───────── OFFICIAL CALCULATORS ───────── */
const officialTools = [
  { titleKey: "tools.kindergeld", descKey: "tools.kindergeld.desc", url: "https://familienportal.de/familienportal/meta/egr" },
  { titleKey: "tools.kinderzuschlag", descKey: "tools.kinderzuschlag.desc", url: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse" },
  { titleKey: "tools.buergergeld", descKey: "tools.buergergeld.desc", url: "https://www.jobcenter.digital/jc/de/grundsicherung/rechner/index.html" },
  { titleKey: "tools.elterngeld", descKey: "tools.elterngeld.desc", url: "https://familienportal.de/familienportal/meta/egr" },
  { titleKey: "tools.rente", descKey: "tools.rente.desc", url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Online-Services/Online-Rechner/online_rechner.html" },
];

export default function Generatoren() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
            <ArrowLeft /> Nazad
          </button>
          <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t("tools.pageTitle")}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t("tools.pageSubtitle")}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">

          {/* ── BalkanLink Brutto-Netto Rechner (native tool) ── */}
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Euro className="h-4 w-4 text-primary" />
              {t("tools.bruttoNetto")}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{t("tools.bruttoNetto.desc")}</p>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <p className="text-sm text-muted-foreground mb-4">
              Detaljni kalkulator sa svim poreznim klasama, doprinosima za socijalno osiguranje, Kirchensteuer i više.
            </p>
            <Link
              to="/brutto-netto-rechner"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Otvori Brutto-Netto Rechner
            </Link>
          </div>

          {/* ── Official Rechner ── */}
          <div className="mb-4 mt-12">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              {t("tools.officialTitle")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Oficijelni kalkulatori njemačkih institucija.
              <br />
              Ovi alati vode direktno na službene stranice gdje možeš provjeriti svoja prava ili izračunati iznose (Kindergeld, Bürgergeld, Elterngeld i dr.).
            </p>
          </div>

          <div className="space-y-3">
            {officialTools.map((tool) => (
              <div key={tool.titleKey} className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Calculator className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{t(tool.titleKey)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t(tool.descKey)}</p>
                  <a href={tool.url} target="_blank" rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    {t("tools.openOfficial")} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ── Disclaimer ── */}
          <div className="mt-10 flex items-start gap-2 rounded-md border border-border bg-muted/40 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("tools.disclaimer")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
