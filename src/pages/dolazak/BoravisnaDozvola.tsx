import MembershipOffer from "@/components/membership/MembershipOffer";
import { label } from "@/lib/de-labels";
import PlusCtaLabel from "@/components/paywall/PlusCtaLabel";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft, Search, ChevronRight, AlertTriangle, ClipboardList,
  PenLine, ExternalLink, Info, Lock, Crown, Check, FileText,
  Briefcase, GraduationCap, Users, RefreshCw, Award, Plane,
} from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { visaTypes, type VisaType } from "@/lib/visa-data";
import { getGuideBySlug } from "@/lib/guide-data";
import { VISA_COUNTRIES } from "@/data/visaNavigatorData";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useHistorySearchState } from "@/hooks/useHistorySearchState";
import { cn } from "@/lib/utils";

import FormSmartGuide from "@/components/FormSmartGuide";
import LegalDisclaimer from "@/components/LegalDisclaimer";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05 },
});

const ROUTE_ITEMS = [
  { id: "first_arrival", key: "route_first_arrival", icon: Plane },
  { id: "work", key: "route_work", icon: Briefcase },
  { id: "blue_card", key: "route_blue_card", icon: Award },
  { id: "family", key: "route_family", icon: Users },
  { id: "study", key: "route_study", icon: GraduationCap },
  { id: "extension", key: "route_extension", icon: RefreshCw },
  { id: "permanent", key: "route_permanent", icon: Award },
];

/* ─── Visual Paywall (non-blocking) ─── */
function VisaPaywall(_props: { visaLabel: string }) {
  return <div className="dark mt-6"><MembershipOffer variant="compact" /></div>;
}

function VisaDetail({ visa }: { visa: VisaType }) {
  const { isPremium } = useAuth();
  const guide = visa.guideSlug ? getGuideBySlug(visa.guideSlug) : null;

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">{visa.icon}</span>
          <h2 className="font-heading text-xl font-extrabold">{visa.title}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{visa.titleDe}</p>
        <p className="mt-2 text-sm text-foreground/80">{visa.desc}</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/20">
        <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
          <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
          {"Napomena: Postupci i zahtjevi mogu se malo razlikovati ovisno o saveznoj pokrajini i nadležnom organu."}
        </p>
      </div>

      <motion.div {...fade(0)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <PenLine className="h-3.5 w-3.5 text-primary" /> {"Ko se može prijaviti"}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.whoCanApply.map((w, i) => (
            <li key={i} className="text-xs text-muted-foreground">{w}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fade(1)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <ClipboardList className="h-3.5 w-3.5 text-primary" /> {"Osnovni uslovi"}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.basicRequirements.map((r, i) => (
            <li key={i} className="text-xs text-muted-foreground">{r}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fade(2)} className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <FileText className="h-3.5 w-3.5 text-primary" /> {"Potrebna dokumenta"}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.documents.map((d, i) => (
            <li key={i} className="text-xs text-muted-foreground">{d}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fade(3)} className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
          <AlertTriangle className="h-3.5 w-3.5" /> {"Česte greške"}
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {visa.commonMistakes.map((m, i) => (
            <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fade(4)} className="rounded-2xl border border-border/60 bg-card p-4 text-center">
        <h3 className="mb-2 flex items-center justify-center gap-1.5 text-xs font-bold">
          <Info className="h-3.5 w-3.5 text-primary" /> {"Zvanične informacije"}
        </h3>
        <a
          href={visa.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
        >
          <ExternalLink className="h-3.5 w-3.5" /> {"Offizielle Seite öffnen"}
        </a>
      </motion.div>

      {guide && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
                Smart Guide – korak po korak
              </span>
            </div>
          </div>
          <FormSmartGuide guide={guide} lang="bs" />
          {!isPremium && <VisaPaywall visaLabel={visa.title} />}
        </>
      )}

      {!guide && (
        <>
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-4 text-xs font-semibold text-muted-foreground">
                Smart Guide – korak po korak
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-border/60 bg-card p-8 text-center">
            <Badge variant="outline" className="mb-3 text-xs">
              <Lock className="mr-1 h-3 w-3" /> {"Demnächst verfügbar"}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {"Der Smart Guide für \\".replace("\"VISA_NAME\"", `„${visa.title}"`)}
            </p>
          </div>
          {!isPremium && <VisaPaywall visaLabel={visa.title} />}
        </>
      )}

      <LegalDisclaimer />
    </div>
  );
}

/* ─── Sidebar Group ─── */
function SidebarGroup({
  label,
  children,
  defaultOpen = true,
}: {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[hsl(var(--gold))] hover:text-[hsl(var(--gold-light))] transition-colors"
      >
        {label}
        <ChevronRight
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-90"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-0.5 mt-1">{children}</div>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BoravisnaDozvola() {
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");
  const { searchParams, setSearchState } = useHistorySearchState();
  const isMobile = useIsMobile();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const q = search.toLowerCase();
  const filtered = visaTypes.filter(
    (v) =>
      v.title.toLowerCase().includes(q) ||
      v.desc.toLowerCase().includes(q) ||
      v.titleDe.toLowerCase().includes(q)
  );

  const selectedVisaId = searchParams.get("visa");
  const activeVisa = visaTypes.find((v) => v.id === selectedVisaId);

  const euCountries = VISA_COUNTRIES.filter((c) => c.group === "eu");
  const balkanCountries = VISA_COUNTRIES.filter((c) => c.group === "western_balkans");

  const handleCountryClick = (code: string) => {
    setSelectedCountry(code);
    setSelectedRoute(null);
    // Also try to find matching visa
    const country = VISA_COUNTRIES.find((c) => c.code === code);
    if (country?.isEU) {
      // For EU countries, show EU info in main panel
      setSearchState({ visa: null }, { state: { blInternalBack: true } });
    }
  };

  const handleRouteClick = (routeId: string) => {
    setSelectedRoute(routeId);
    // Map route to existing visa type
    const mapping: Record<string, string> = {
      work: "arbeitsvisum",
      blue_card: "blue-card",
      family: "familiennachzug",
      study: "studienvisum",
      extension: "verlaengerung",
      permanent: "niederlassungserlaubnis",
      first_arrival: "arbeitsvisum",
      status_change: "arbeitsvisum",
    };
    const visaId = mapping[routeId];
    if (visaId) {
      setSearchState({ visa: visaId }, { state: { blInternalBack: true } });
    }
  };

  // Mobile: show detail
  if (isMobile && activeVisa) {
    return (
      <div className="px-4 py-6">
        <Breadcrumbs />
        <VisaDetail visa={activeVisa} />
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-10">
        <div className="container max-w-5xl">
          <Breadcrumbs variant="dark" />
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {label("title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            {label("subtitle")}
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="container max-w-5xl">
          {/* Disclaimer */}
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              {label("disclaimer")}
            </p>
          </div>

          <div className="flex gap-6">
            {/* Sidebar */}
            <aside className={cn("shrink-0", isMobile ? "w-full" : "sticky top-20 self-start w-72")}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={"Visa suchen…"}
                  className="pl-9 h-10 text-sm rounded-xl border-border/60 bg-card"
                />
              </div>

              {/* Group 1: EU */}
              <SidebarGroup label={label("sidebar_eu")}>
                {euCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryClick(country.code)}
                    className={cn(
                      "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all duration-200",
                      selectedCountry === country.code
                        ? "border-l-[3px] border-l-[#C9A84C] bg-[#FFF8EC] font-medium text-foreground"
                        : "border-l-[3px] border-l-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <img src={country.flagUrl} alt="" className="h-[18px] w-auto rounded-[2px] shrink-0" loading="lazy" decoding="async" />
                    <span>{label(country.nameKey)}</span>
                    <Badge variant="outline" className="ml-auto text-[9px] px-1.5 py-0 border-emerald-300 text-emerald-600 shrink-0">
                      {label("badge_eu")}
                    </Badge>
                  </button>
                ))}
              </SidebarGroup>

              {/* Group 2: Western Balkans */}
              <SidebarGroup label={label("sidebar_balkan")}>
                {balkanCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleCountryClick(country.code)}
                    className={cn(
                      "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all duration-200",
                      selectedCountry === country.code
                        ? "border-l-[3px] border-l-[#C9A84C] bg-[#FFF8EC] font-medium text-foreground"
                        : "border-l-[3px] border-l-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <img src={country.flagUrl} alt="" className="h-[18px] w-auto rounded-[2px] shrink-0" loading="lazy" decoding="async" />
                    <span>{label(country.nameKey)}</span>
                  </button>
                ))}
              </SidebarGroup>

              {/* Group 3: Routes */}
              <SidebarGroup label={label("sidebar_routes")}>
                {ROUTE_ITEMS.map((route) => {
                  const Icon = route.icon;
                  return (
                    <button
                      key={route.id}
                      onClick={() => handleRouteClick(route.id)}
                      className={cn(
                        "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm whitespace-nowrap transition-all duration-200",
                        selectedRoute === route.id
                          ? "border-l-[3px] border-l-[#C9A84C] bg-[#FFF8EC] font-medium text-foreground"
                          : "border-l-[3px] border-l-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{label(route.key)}</span>
                    </button>
                  );
                })}
              </SidebarGroup>

              {/* Legacy visa list (filtered) */}
              {search && (
                <nav className="space-y-1.5 mt-4 border-t border-border/40 pt-4">
                  {filtered.map((visa) => (
                    <button
                      key={visa.id}
                      onClick={() =>
                        setSearchState(
                          { visa: visa.id },
                          { state: { blInternalBack: true } }
                        )
                      }
                      className={cn(
                        "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        visa.id === selectedVisaId
                          ? "border-primary/40 bg-primary/5 shadow-sm"
                          : "border-border/40 bg-card hover:border-gold/40 hover:shadow-sm"
                      )}
                    >
                      <span className="text-xl shrink-0">{visa.icon}</span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("font-semibold truncate", visa.id === selectedVisaId && "text-primary")}>
                          {visa.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">{visa.desc}</p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <p className="px-3 py-6 text-xs text-muted-foreground text-center">{"Nema rezultata."}</p>
                  )}
                </nav>
              )}
            </aside>

            {/* Detail */}
            {!isMobile && (
              <main className="min-w-0 flex-1">
                {activeVisa ? (
                  <VisaDetail visa={activeVisa} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/5 mb-6">
                      <FileText className="h-10 w-10 text-primary/40" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground/70">{label("welcome_title")}</h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      {label("welcome_text")}
                    </p>
                  </div>
                )}
              </main>
            )}
          </div>

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
