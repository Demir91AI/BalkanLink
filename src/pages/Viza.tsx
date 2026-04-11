import { useState, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthGate from "@/components/AuthGate";
import { Button } from "@/components/ui/button";
import PageNavBar from "@/components/navigation/PageNavBar";
import { COUNTRY_CONTENT } from "@/data/vizaNavigatorContent";
import { VisaContentRenderer } from "@/components/visaNavigator/VisaContentRenderer";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";
import { useSubscription } from "@/hooks/useSubscription";

const FREE_ROUTES = 2;

export default function Viza() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPremium } = useSubscription();
  const [showRouteLock, setShowRouteLock] = useState(false);

  const selectedCountry = searchParams.get("country") || null;
  const selectedRoute = searchParams.get("route") || null;

  const handleSelectCountry = useCallback((code: string) => {
    setSearchParams({ country: code }, { replace: false });
    setShowRouteLock(false);
  }, [setSearchParams]);

  const handleSelectRoute = useCallback((routeId: string) => {
    if (selectedCountry) {
      const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);
      if (country && !country.isEU) {
        const routeIndex = country.routes.findIndex(r => r.id === routeId);
        if (!isPremium && routeIndex >= FREE_ROUTES) {
          setShowRouteLock(true);
          // Don't set route in URL for locked routes
          setSearchParams({ country: selectedCountry }, { replace: false });
          return;
        }
      }
      setShowRouteLock(false);
      setSearchParams({ country: selectedCountry, route: routeId }, { replace: false });
    }
  }, [selectedCountry, setSearchParams, isPremium]);

  const handleClearAll = useCallback(() => {
    setSearchParams({}, { replace: false });
    setShowRouteLock(false);
  }, [setSearchParams]);

  const handleClearRoute = useCallback(() => {
    if (selectedCountry) {
      setSearchParams({ country: selectedCountry }, { replace: false });
      setShowRouteLock(false);
    }
  }, [selectedCountry, setSearchParams]);

  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);

  // Sidebar country list
  const euCountries = COUNTRY_CONTENT.filter(c => c.isEU);
  const nonEuCountries = COUNTRY_CONTENT.filter(c => !c.isEU);

  const isRouteLocked = (routeIndex: number, isEU: boolean) => {
    return !isEU && !isPremium && routeIndex >= FREE_ROUTES;
  };

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <SEO title="Viza Navigator — Boravišna Dozvola u Njemačkoj" description="Saznaj koje dokumente trebaš za vizu ili boravišnu dozvolu, ovisno o državljanstvu." path="/viza" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        {/* Nav */}
        <PageNavBar />

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-[28px] font-bold text-[#2D2D2D]">{"Visa Navigator"}</h1>
          <p className="text-[16px] text-[#6B6B6B] mt-1">{"Pronađi pravi status za tvoju situaciju"}</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={handleClearAll}
            className="text-[13px] transition-colors hover:underline"
            style={{ color: selectedCountry ? '#9CA3AF' : '#2D2D2D', fontWeight: selectedCountry ? 400 : 500 }}>
            {"Visa Navigator"}
          </button>
          {selectedCountry && country && (
            <>
              <span className="text-[13px] text-[#9CA3AF]">›</span>
              <button onClick={handleClearRoute}
                className="text-[13px] transition-colors hover:underline"
                style={{ color: selectedRoute ? '#9CA3AF' : '#2D2D2D', fontWeight: selectedRoute ? 400 : 500 }}>
                {country.name}
              </button>
            </>
          )}
          {selectedRoute && country && (
            <>
              <span className="text-[13px] text-[#9CA3AF]">›</span>
              <span className="text-[13px] text-[#2D2D2D] font-medium">
                {country.routes.find(r => r.id === selectedRoute)?.title || selectedRoute}
              </span>
            </>
          )}
        </div>

        {/* Premium banner */}
        {!isPremium && (
          <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 rounded-xl border-2 border-[hsl(var(--gold))]/30 bg-[#FFF8EC] px-5 py-4">
            <Lock className="h-5 w-5 text-[hsl(var(--gold))] shrink-0" />
            <p className="text-sm text-[#2D2D2D] flex-1">
              <strong>{"Viza Navigator — prva 2 puta besplatno."}</strong>{" "}
              {"Otključaj sve viza-puteve sa Premium paketom."}
            </p>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => navigate("/premium")}
                className="rounded-full bg-[hsl(var(--gold))] px-4 py-2 text-xs font-bold text-[#0f1f3d] hover:opacity-90 transition-opacity">
                {"Premium — 9,99€/mjesečno"}
              </button>
              <button onClick={() => navigate("/paketi")}
                className="rounded-full border border-border px-4 py-2 text-xs font-semibold hover:bg-muted transition-colors">
                {"Saznaj više"}
              </button>
            </div>
          </div>
        )}

        {/* 3-col layout: Sidebar | Main | Right Panel */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SIDEBAR — Country list */}
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">
                {"EU-Länder"}
              </p>
              <div className="flex flex-col gap-1 mb-5">
                {euCountries.map(c => {
                  const active = selectedCountry === c.code;
                  return (
                    <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                      className="flex items-center gap-2.5 px-3 py-2 text-left transition-all duration-150 hover:bg-[#FFF8EC]"
                      style={{
                        background: active ? '#FFF8EC' : 'transparent',
                        borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                        borderRadius: 6,
                      }}>
                      <img src={c.flag} alt="" className="h-5 rounded-sm" />
                      <span className="text-[14px]" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : '#2D2D2D' }}>
                        {c.name}
                      </span>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#166534' }}>EU</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">
                {"Balkanländer"}
              </p>
              <div className="flex flex-col gap-1">
                {nonEuCountries.map(c => {
                  const active = selectedCountry === c.code;
                  return (
                    <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                      className="flex items-center gap-2.5 px-3 py-2 text-left transition-all duration-150 hover:bg-[#FFF8EC]"
                      style={{
                        background: active ? '#FFF8EC' : 'transparent',
                        borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                        borderRadius: 6,
                      }}>
                      <img src={c.flag} alt="" className="h-5 rounded-sm" />
                      <span className="text-[14px]" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : '#2D2D2D' }}>
                        {c.name}
                      </span>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FEF9C3', color: '#854D0E' }}>WB</span>
                    </button>
                  );
                })}
              </div>

              {/* Route list when non-EU country selected */}
              {country && !country.isEU && (
                <>
                  <div className="h-px my-4" style={{ background: '#F0EAD8' }} />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">
                    {"Routen"}
                  </p>
                  <div className="flex flex-col gap-1">
                    {country.routes.map((r, routeIndex) => {
                      const active = selectedRoute === r.id;
                      const locked = isRouteLocked(routeIndex, false);
                      return (
                        <button key={r.id} onClick={() => handleSelectRoute(r.id)}
                          className={`text-left px-3 py-2 transition-all duration-150 hover:bg-[#FFF8EC] ${locked ? 'opacity-50' : ''}`}
                          style={{
                            background: active ? '#FFF8EC' : 'transparent',
                            borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                            borderRadius: 6,
                          }}>
                          <span className="text-[13px] block flex items-center gap-1.5" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : '#2D2D2D' }}>
                            {locked && <Lock className="h-3 w-3 shrink-0 inline" />}
                            {r.title}
                          </span>
                          <span className="text-[11px] block" style={{ color: '#9CA3AF', fontFamily: 'monospace' }}>
                            {r.legalBasis.split('+')[0].trim()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* MOBILE COUNTRY SELECTOR */}
          <div className="md:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {COUNTRY_CONTENT.map(c => {
                const active = selectedCountry === c.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => handleSelectCountry(c.code)}
                    className={`shrink-0 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border transition-all ${
                      active
                        ? "border-[#C9A84C] bg-[#FFF8EC] text-[#C9A84C] font-bold"
                        : "border-border/40 text-[#2D2D2D] hover:bg-[#FFF8EC]"
                    }`}
                  >
                    <img src={c.flag} alt="" className="h-4 rounded-sm" />
                    {c.name}
                  </button>
                );
              })}
            </div>
            {country && !country.isEU && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-2 scrollbar-hide">
                {country.routes.map((r, routeIndex) => {
                  const active = selectedRoute === r.id;
                  const locked = isRouteLocked(routeIndex, false);
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRoute(r.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                        active
                          ? "border-[#C9A84C] bg-[#FFF8EC] text-[#C9A84C] font-bold"
                          : locked
                          ? "border-border/40 text-[#6B6B6B]/40 opacity-50"
                          : "border-border/40 text-[#6B6B6B] hover:bg-[#FFF8EC]"
                      }`}
                    >
                      {locked && "🔒 "}{r.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CENTER — Main content */}
          <div className="flex-1 min-w-0">
            <div className="transition-all duration-200" style={{ animation: "fadeSlideIn 200ms ease" }}
              key={`${selectedCountry}-${selectedRoute}-${showRouteLock}`}>
              {showRouteLock && !isPremium ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="rounded-2xl border-2 border-[hsl(var(--gold))]/20 bg-card p-8 max-w-md">
                    <Lock className="h-10 w-10 text-[hsl(var(--gold))] mx-auto mb-4" />
                     <h3 className="text-lg font-bold text-foreground">
                       {"Ovaj put je dostupan samo sa Premium paketom"}
                     </h3>
                     <p className="text-sm text-muted-foreground mt-2">
                       {"Prva 2 puta po zemlji su besplatna. Otključaj sve viza-puteve."}
                    </p>
                    <Button
                      onClick={() => navigate("/paketi")}
                      className="mt-6 w-full rounded-full py-3.5 text-sm font-bold"
                      style={{
                        background: 'linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-dark)))',
                        color: 'hsl(var(--gold-foreground))',
                      }}
                    >
                      {"BalkanLink Premium — 9,99€/mjesečno"}
                    </Button>
                  </div>
                </div>
              ) : (
                <AuthGate>
                  <VisaContentRenderer
                    selectedCountry={selectedCountry}
                    selectedRoute={selectedRoute}
                    onSelectRoute={handleSelectRoute}
                    onBack={handleClearRoute}
                  />
                </AuthGate>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="hidden md:block">
            <VisaRightPanel selectedCountry={selectedCountry} selectedRoute={selectedRoute} onSelectRoute={handleSelectRoute} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
