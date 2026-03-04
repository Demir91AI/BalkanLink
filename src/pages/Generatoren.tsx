import { useState, useMemo } from "react";
import { ExternalLink, Calculator, AlertTriangle, Euro } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/contexts/LanguageContext";

/* ───────── OFFICIAL CALCULATORS ───────── */
const officialTools = [
  { titleKey: "tools.kindergeld", descKey: "tools.kindergeld.desc", url: "https://familienportal.de/familienportal/meta/egr" },
  { titleKey: "tools.kinderzuschlag", descKey: "tools.kinderzuschlag.desc", url: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag-verstehen/kiz-lotse" },
  { titleKey: "tools.buergergeld", descKey: "tools.buergergeld.desc", url: "https://www.jobcenter.digital/jc/de/grundsicherung/rechner/index.html" },
  { titleKey: "tools.elterngeld", descKey: "tools.elterngeld.desc", url: "https://familienportal.de/familienportal/meta/egr" },
  { titleKey: "tools.rente", descKey: "tools.rente.desc", url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Online-Services/Online-Rechner/online_rechner.html" },
];

/* ───────── BRUTTO-NETTO APPROXIMATION ───────── */
function calcNetto(brutto: number, klasse: number, kirche: boolean, kinder: boolean) {
  // Simplified German tax/contribution approximation (2024 rates)
  const yearly = brutto * 12;

  // Income tax approximation (simplified progressive)
  let tax = 0;
  if (yearly > 11604) {
    if (yearly <= 17005) {
      const y = (yearly - 11604) / 10000;
      tax = (922.98 * y + 1400) * y;
    } else if (yearly <= 66760) {
      const y = (yearly - 17005) / 10000;
      tax = (181.19 * y + 2397) * y + 1025.38;
    } else if (yearly <= 277825) {
      tax = 0.42 * yearly - 10602.13;
    } else {
      tax = 0.45 * yearly - 18936.88;
    }
  }

  // Steuerklasse adjustments (very simplified)
  if (klasse === 3) tax *= 0.6;
  if (klasse === 5) tax *= 1.4;
  if (klasse === 4) tax *= 1.0;
  if (klasse === 2) tax *= 0.85;

  const monthlyTax = Math.max(0, tax / 12);

  // Solidaritätszuschlag (5.5% of tax, only if tax > threshold)
  const soli = monthlyTax > 81.17 ? monthlyTax * 0.055 : 0;

  // Kirchensteuer (8-9% of income tax)
  const kirchensteuer = kirche ? monthlyTax * 0.09 : 0;

  // Social contributions (employee share, 2024 rates, capped)
  const rv = Math.min(brutto, 7550) * 0.093;   // Rentenversicherung 9.3%
  const kv = Math.min(brutto, 5175) * 0.082;   // Krankenversicherung ~8.2% (incl. Zusatzbeitrag)
  const pv = Math.min(brutto, 5175) * (kinder ? 0.017 : 0.023); // Pflegeversicherung
  const av = Math.min(brutto, 7550) * 0.013;   // Arbeitslosenversicherung 1.3%

  const totalSocial = rv + kv + pv + av;
  const totalDeductions = monthlyTax + soli + kirchensteuer + totalSocial;
  const netto = brutto - totalDeductions;

  return {
    netto: Math.round(netto * 100) / 100,
    tax: Math.round(monthlyTax * 100) / 100,
    soli: Math.round(soli * 100) / 100,
    kirche: Math.round(kirchensteuer * 100) / 100,
    rv: Math.round(rv * 100) / 100,
    kv: Math.round(kv * 100) / 100,
    pv: Math.round(pv * 100) / 100,
    av: Math.round(av * 100) / 100,
    totalSocial: Math.round(totalSocial * 100) / 100,
  };
}

export default function Generatoren() {
  const { t } = useLanguage();
  const [brutto, setBrutto] = useState(3000);
  const [klasse, setKlasse] = useState(1);
  const [kirche, setKirche] = useState(false);
  const [kinder, setKinder] = useState(false);
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => calcNetto(brutto, klasse, kirche, kinder), [brutto, klasse, kirche, kinder]);

  const handleCalc = () => setCalculated(true);

  const fmt = (n: number) => n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t("tools.pageTitle")}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t("tools.pageSubtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">

          {/* ── Brutto-Netto Rechner ── */}
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Euro className="h-4 w-4 text-primary" />
              {t("tools.bruttoNetto")}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{t("tools.bruttoNetto.desc")}</p>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>{t("tools.bruttoSalary")}</Label>
                <Input
                  type="number"
                  min={0}
                  value={brutto}
                  onChange={e => { setBrutto(Number(e.target.value)); setCalculated(false); }}
                  placeholder="3000"
                />
              </div>
              <div className="space-y-2">
                <Label>{t("tools.steuerklasse")}</Label>
                <Select value={String(klasse)} onValueChange={v => { setKlasse(Number(v)); setCalculated(false); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5].map(k => <SelectItem key={k} value={String(k)}>Steuerklasse {k}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={kirche} onCheckedChange={v => { setKirche(v); setCalculated(false); }} />
                <Label className="text-sm">{t("tools.kirchensteuer")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={kinder} onCheckedChange={v => { setKinder(v); setCalculated(false); }} />
                <Label className="text-sm">{t("tools.kinder")}</Label>
              </div>
            </div>

            <Button onClick={handleCalc} className="w-full sm:w-auto">
              {t("tools.calculate")}
            </Button>

            {calculated && (
              <div className="mt-4 space-y-3 rounded-lg border bg-muted/30 p-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <span className="text-sm font-medium">{t("tools.bruttoSalary")}</span>
                  <span className="font-bold">{fmt(brutto)} €</span>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex justify-between"><span>{t("tools.incomeTax")}</span><span>-{fmt(result.tax)} €</span></div>
                  <div className="flex justify-between"><span>Solidaritätszuschlag</span><span>-{fmt(result.soli)} €</span></div>
                  {kirche && <div className="flex justify-between"><span>{t("tools.kirchensteuer")}</span><span>-{fmt(result.kirche)} €</span></div>}
                  <div className="flex justify-between"><span>Rentenversicherung (9,3%)</span><span>-{fmt(result.rv)} €</span></div>
                  <div className="flex justify-between"><span>Krankenversicherung (~8,2%)</span><span>-{fmt(result.kv)} €</span></div>
                  <div className="flex justify-between"><span>Pflegeversicherung</span><span>-{fmt(result.pv)} €</span></div>
                  <div className="flex justify-between"><span>Arbeitslosenversicherung (1,3%)</span><span>-{fmt(result.av)} €</span></div>
                </div>

                <div className="flex items-center justify-between border-t pt-2">
                  <span className="text-sm font-bold text-primary">{t("tools.estimatedNetto")}</span>
                  <span className="text-lg font-extrabold text-primary">≈ {fmt(result.netto)} €</span>
                </div>
              </div>
            )}
          </div>

          {/* ── Official Rechner ── */}
          <div className="mb-4 mt-12">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              {t("tools.officialTitle")}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">{t("tools.officialDesc")}</p>
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
