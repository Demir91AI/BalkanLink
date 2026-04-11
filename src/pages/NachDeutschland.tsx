import { SEO } from "@/components/SEO";
import { getMigrationCountries, type CategoryKey } from "@/lib/migration-data";
import { Briefcase, GraduationCap, BookOpen, Heart, Award, ExternalLink, ShieldAlert, CheckCircle2, ChevronRight, Globe, Info } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { useParams, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import GdjePocetiTimeline from "@/components/migration/GdjePocetiTimeline";
import CostCalculator from "@/components/migration/CostCalculator";
import CountryInfoBox from "@/components/migration/CountryInfoBox";

const COUNTRY_NAMES: Record<string, string> = {
  bih: "Bosna i Hercegovina",
  srb: "Srbija",
  hr: "Hrvatska",
  me: "Crna Gora",
  al: "Albanija",
  xk: "Kosovo",
  mk: "Makedonija",
  si: "Slovenija",
};

const CATEGORY_NAMES: Record<string, string> = {
  work: "Posao",
  education: "Obrazovanje / Ausbildung",
  study: "Studij",
  fsj: "Volonterska služba (FSJ/BFD)",
  recognition: "Priznavanje kvalifikacija",
};

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
  const countries = getMigrationCountries("bs");

  const selectedCountry = countries.find((c) => c.code === countryCode);
  const selectedCategory = selectedCountry?.categories.find((c) => c.key === categoryKey);

  const handleBack = () => navigateBackOrHome(navigate);

  const countryName = (code: string) => COUNTRY_NAMES[code] ?? code;
  const catName = (key: string) => CATEGORY_NAMES[key] ?? key;
  const euLabel = (isEU: boolean) => isEU ? "EU članica — slobodan pristup" : "Zapadni Balkan — potrebna viza";

  // Country selection view
  if (!selectedCountry) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <SEO title="Dolazak u Njemačku — Vodič" description="Sve informacije za dolazak u Njemačku — viza, posao, studij, spajanje porodice. Po zemljama." path="/nach-deutschland" />
        <PageNavBar onBack={handleBack} />
        <h1 className="text-2xl font-bold text-foreground mb-2">Dolazak u Njemačku</h1>
        <p className="text-sm text-muted-foreground mb-6">Izaberi svoju zemlju i saznaj kako doći u Njemačku.</p>

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Informacije služe za orijentaciju.</p>
        </div>

        <GdjePocetiTimeline />
        <CostCalculator />

        <h2 className="text-lg font-semibold mb-4">Izaberi zemlju</h2>
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
                  {countryName(country.code)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {euLabel(country.isEU)}
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
            <h1 className="text-2xl font-bold text-foreground">{countryName(selectedCountry.code)}</h1>
            <p className="text-sm text-muted-foreground">
              {euLabel(selectedCountry.isEU)}
            </p>
          </div>
        </div>

        <CountryInfoBox isEU={selectedCountry.isEU} />

        <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">Informacije služe za orijentaciju.</p>
        </div>

        <h2 className="text-lg font-semibold mb-4">Izaberi kategoriju</h2>
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
                    {catName(cat.key)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {cat.visaRequired === true
                      ? "⚠️ Potrebna viza"
                      : cat.visaRequired === false
                      ? "✅ Viza nije potrebna"
                      : "ℹ️ Zavisi od situacije"}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-[hsl(var(--brand-orange))]" />
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <CostCalculator />
        </div>
      </div>
    );
  }

  // Category detail view
  return (
    <div className="container max-w-4xl py-8 px-4">
      <PageNavBar onBack={handleBack} />

      <div className="flex items-center gap-3 mb-1">
        <span className="text-2xl">{selectedCountry.flag}</span>
        <h1 className="text-xl font-bold text-foreground">
          {countryName(selectedCountry.code)} – {catName(selectedCategory.key)}
        </h1>
      </div>
      <p className="text-sm text-muted-foreground mb-4 ml-10">
        {euLabel(selectedCountry.isEU)}
      </p>

      <CountryInfoBox isEU={selectedCountry.isEU} />

      <div className="rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3 mb-6 flex items-start gap-2">
        <ShieldAlert className="h-4 w-4 text-[hsl(var(--brand-orange))] mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground">Informacije služe za orijentaciju.</p>
      </div>

      {/* Visa status */}
      <div className={`rounded-xl border p-4 mb-4 ${
        selectedCategory.visaRequired === false
          ? "border-green-500/30 bg-green-500/5"
          : "border-amber-500/30 bg-amber-500/5"
      }`}>
        <h3 className="text-sm font-semibold text-foreground mb-1">Trebam li vizu?</h3>
        <p className="text-sm font-medium">
          {selectedCategory.visaRequired === true
            ? "⚠️ Da, viza je potrebna"
            : selectedCategory.visaRequired === false
            ? "✅ Ne, viza nije potrebna (EU)"
            : "ℹ️ Zavisi od djelatnosti i kvalifikacija"}
        </p>
      </div>

      {/* Legal basis */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[hsl(var(--primary))]" />
          Pravna osnova
        </h3>
        <p className="text-sm text-muted-foreground font-medium">{selectedCategory.legalBasis}</p>
      </div>

      {/* Requirements */}
      <div className="rounded-xl border border-border bg-card p-4 mb-4">
        <h3 className="text-sm font-semibold text-foreground mb-3">Preduslovi</h3>
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
        <h3 className="text-sm font-semibold text-foreground mb-3">Korak po korak</h3>
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
          <Info className="h-4 w-4 text-primary" /> Službene informacije
        </h3>
        <a
          href={selectedCategory.officialLinks[0]?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 rounded-lg px-5 py-2.5 transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-4 w-4" />
          Otvori službenu stranicu
        </a>
        <p className="mt-3 text-[11px] text-muted-foreground/70">
          Svi podaci su preuzeti iz službenih izvora.
        </p>
      </div>
    </div>
  );
}
