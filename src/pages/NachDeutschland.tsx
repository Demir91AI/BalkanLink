import { SEO } from "@/components/SEO";
import { getMigrationCountries, type CategoryKey } from "@/lib/migration-data";
import { Briefcase, GraduationCap, BookOpen, Heart, Award, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight, Globe, Info } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useParams, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import GdjePocetiTimeline from "@/components/migration/GdjePocetiTimeline";
import CostCalculator from "@/components/migration/CostCalculator";
import CountryInfoBox from "@/components/migration/CountryInfoBox";

const ICON_FOR_KEY: Record<CategoryKey, React.ElementType> = {
  work: Briefcase,
  education: GraduationCap,
  study: BookOpen,
  fsj: Heart,
  recognition: Award,
};

export default function NachDeutschland() {
  const { countryCode, categoryKey } = useParams<{ countryCode?: string; categoryKey?: string }>();
  const navigate = useNavigate();
  const countries = getMigrationCountries(language);

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const selectedCategory = selectedCountry?.categories.find((c) => c.key === categoryKey);

  const handleBack = () => navigateBackOrHome(navigate);

  // Country selection view
  if (!selectedCountry) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <SEO title="Nach Deutschland — Vodič za Dolazak" description="Sve informacije za dolazak u Njemačku — viza, posao, studij, spajanje porodice. Po zemljama." path="/nach-deutschland" />
        <PageNavBar onBack={handleBack} />
        <h1 className="text-2xl font-bold text-foreground mb-2">{"Ankunft in Deutschland"}</h1>
        <p className="text-sm text-muted-foreground mb-6">{"Wähle dein Land und erfahre wie du nach Deutschland kommst."}</p>

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{"Informationen dienen zur Orientierung."}</p>
        </div>

        {/* Gdje početi timeline */}
        <GdjePocetiTimeline />

        {/* Cost calculator */}
        <CostCalculator />

        <h2 className="text-lg font-semibold mb-4">{"Land wählen"}</h2>
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
                  {country.isEU ? "EU-Mitglied — freier Zugang" : "Westbalkan — Visum erforderlich"}
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
        <PageNavBar onBack={handleBack} />

        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{selectedCountry.flag}</span>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{t(`migration.country.${selectedCountry.code}`)}</h1>
            <p className="text-sm text-muted-foreground">
              {selectedCountry.isEU ? "EU-Mitglied — freier Zugang" : "Westbalkan — Visum erforderlich"}
            </p>
          </div>
        </div>

        {/* Country-specific info box */}
        <CountryInfoBox isEU={selectedCountry.isEU} />

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">{"Informationen dienen zur Orientierung."}</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">{"Kategorie wählen"}</h2>
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
                      ? `⚠️ ${"Visum erforderlich"}`
                      : cat.visaRequired === false
                      ? `✅ ${"Kein Visum erforderlich"}`
                      : `ℹ️ ${"Situationsabhängig"}`}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--brand-orange))]" />
              </button>
            );
          })}
        </div>

        {/* Cost calculator */}
        <div className="mt-8">
          <CostCalculator />
        </div>
      </div>
    );
  }

  // Category detail view
  const Icon = ICON_FOR_KEY[selectedCategory.key as CategoryKey] || Briefcase;

  return (
    <div className="container max-w-4xl py-8 px-4">
      <PageNavBar onBack={handleBack} />

      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{selectedCountry.flag}</span>
        <h1 className="text-xl font-bold text-foreground">
          {t(`migration.country.${selectedCountry.code}`)} – {t(`migration.cat.${selectedCategory.key}`)}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-4 ml-10">
        {selectedCountry.isEU ? "EU-Mitglied — freier Zugang" : "Westbalkan — Visum erforderlich"}
      </p>

      {/* Country-specific info box */}
      <CountryInfoBox isEU={selectedCountry.isEU} />

      <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
        <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">{"Informationen dienen zur Orientierung."}</p>
      </div>

      {/* Visa status */}
      <div className={`rounded-xl border p-4 mb-4 ${
        selectedCategory.visaRequired === false
          ? "border-green-500/30 bg-green-500/5"
          : "border-amber-500/30 bg-amber-500/5"
      }`}>
        <h3 className="text-sm font-semibold text-foreground mb-1">{"Brauche ich ein Visum?"}</h3>
        <p className="text-sm font-medium">
          {selectedCategory.visaRequired === true
            ? `⚠️ ${"Ja, Visum erforderlich"}`
            : selectedCategory.visaRequired === false
            ? `✅ ${"Nein, kein Visum nötig (EU)"}`
            : `ℹ️ ${"Abhängig von Tätigkeit und Qualifikation"}`}
        </p>
      </div>

      {/* Legal basis */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
          {"Rechtsgrundlage"}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{selectedCategory.legalBasis}</p>
      </div>

      {/* Requirements */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">{"Voraussetzungen"}</h3>
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
        <h3 className="text-sm font-semibold text-foreground mb-3">{"Schritt für Schritt"}</h3>
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
          <Info className="h-4 w-4 text-primary" /> {"Offizielle Informationen"}
        </h3>
        <a
          href={selectedCategory.officialLinks[0]?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 rounded-lg px-5 py-2.5 transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-4 w-4" />
          {"Offizielle Informationen"}
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          {"Alle Daten stammen aus offiziellen Quellen."}
        </p>
      </div>
    </div>
  );
}
