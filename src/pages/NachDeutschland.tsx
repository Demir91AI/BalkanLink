import { useLanguage } from "@/contexts/LanguageContext";
import { getMigrationCountries, type CategoryKey } from "@/lib/migration-data";
import { Briefcase, GraduationCap, BookOpen, Heart, Award, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight, Globe, ArrowLeft, Info } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";


const ICON_FOR_KEY: Record<CategoryKey, React.ElementType> = {
  work: Briefcase,
  education: GraduationCap,
  study: BookOpen,
  fsj: Heart,
  recognition: Award,
};

export default function NachDeutschland() {
  const { t, language } = useLanguage();
  const { countryCode, categoryKey } = useParams<{ countryCode?: string; categoryKey?: string }>();
  const navigate = useNavigate();
  const countries = getMigrationCountries(language);

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const selectedCategory = selectedCountry?.categories.find((c) => c.key === categoryKey);

  // Country list → back to homepage
  // Country selected → back to country list
  // Category selected → back to country
  const handleBack = () => navigateBackOrHome(navigate);

  // Country selection view
  if (!selectedCountry) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft /> Nazad
        </button>
        <h1 className="text-2xl font-bold text-foreground mb-2">{t("migration.title")}</h1>
        <p className="text-sm text-muted-foreground mb-6">{t("migration.subtitle")}</p>

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{t("migration.disclaimer")}</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">{t("migration.selectCountry")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => navigate(`/nach-deutschland/${country.code}`)}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-[hsl(var(--brand-orange))]/50 hover:shadow-md group"
            >
              <span className="text-3xl">{country.flag}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground group-hover:text-[hsl(var(--brand-orange))]">
                  {t(`migration.country.${country.code}`)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {country.isEU ? t("migration.euMember") : t("migration.westbalkan")}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--brand-orange))]" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Category selection view
  if (!selectedCategory) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <button onClick={handleBack} className="back-button">
          <ArrowLeft /> Nazad
        </button>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{selectedCountry.flag}</span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t(`migration.country.${selectedCountry.code}`)}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedCountry.isEU ? t("migration.euMember") : t("migration.westbalkan")}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 mt-4 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{t("migration.disclaimer")}</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">{t("migration.selectCategory")}</h2>
        <div className="grid gap-3">
          {selectedCountry.categories.map((cat) => {
            const Icon = ICON_FOR_KEY[cat.key as CategoryKey] || Briefcase;
            return (
              <button
                key={cat.key}
                onClick={() => navigate(`/nach-deutschland/${selectedCountry.code}/${cat.key}`)}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-[hsl(var(--brand-orange))]/50 hover:shadow-md group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[hsl(var(--primary))]/10">
                  <Icon className="h-5 w-5 text-[hsl(var(--primary))]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground group-hover:text-[hsl(var(--brand-orange))]">
                    {t(`migration.cat.${cat.key}`)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cat.visaRequired === true
                      ? `⚠️ ${t("migration.visaRequired")}`
                      : cat.visaRequired === false
                      ? `✅ ${t("migration.noVisa")}`
                      : `ℹ️ ${t("migration.visaConditional")}`}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--brand-orange))]" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Category detail view
  const Icon = ICON_FOR_KEY[selectedCategory.key as CategoryKey] || Briefcase;

  return (
    <div className="container max-w-4xl py-8 px-4">
      <button onClick={handleBack} className="back-button">
        <ArrowLeft /> Nazad
      </button>

      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{selectedCountry.flag}</span>
        <h1 className="text-xl font-bold text-foreground">
          {t(`migration.country.${selectedCountry.code}`)} – {t(`migration.cat.${selectedCategory.key}`)}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-4 ml-10">
        {selectedCountry.isEU ? t("migration.euMember") : t("migration.westbalkan")}
      </p>

      <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
        <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">{t("migration.disclaimer")}</p>
      </div>

      {/* Visa status */}
      <div className={`rounded-xl border p-4 mb-4 ${
        selectedCategory.visaRequired === false
          ? "border-green-500/30 bg-green-500/5"
          : "border-amber-500/30 bg-amber-500/5"
      }`}>
        <h3 className="text-sm font-semibold text-foreground mb-1">{t("migration.visaQuestion")}</h3>
        <p className="text-sm font-medium">
          {selectedCategory.visaRequired === true
            ? `⚠️ ${t("migration.visaYes")}`
            : selectedCategory.visaRequired === false
            ? `✅ ${t("migration.visaNo")}`
            : `ℹ️ ${t("migration.visaDepends")}`}
        </p>
      </div>

      {/* Legal basis */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
          {t("migration.legalBasis")}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{selectedCategory.legalBasis}</p>
      </div>

      {/* Requirements */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("migration.requirements")}</h3>
        <ul className="space-y-2">
          {selectedCategory.requirements.map((req, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{t("migration.steps")}</h3>
        <ol className="space-y-3">
          {selectedCategory.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Službene informacije */}
      <div className="rounded-xl border bg-card p-4 text-center">
        <h3 className="mb-3 flex items-center justify-center gap-1.5 text-sm font-bold">
          <Info className="h-4 w-4 text-primary" /> {t("migration.officialInfo")}
        </h3>
        <a
          href={selectedCategory.officialLinks[0]?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 rounded-lg px-5 py-2.5 transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-4 w-4" />
          {lk === "de" ? "Offizielle Seite öffnen" : lk === "en" ? "Open official page" : "Otvori službenu stranicu"}
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          Svi podaci dolaze iz službenih državnih izvora.
        </p>
      </div>
    </div>
  );
}
