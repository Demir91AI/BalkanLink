import { useState, useEffect, useCallback } from "react";
import { SEO } from "@/components/SEO";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock } from "lucide-react";
import PageNavBar from "@/components/navigation/PageNavBar";
import { COUNTRY_CONTENT } from "@/data/vizaNavigatorContent";
import { VisaContentRenderer } from "@/components/visaNavigator/VisaContentRenderer";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSubscription } from "@/hooks/useSubscription";
import PremiumModal from "@/components/paywall/PremiumModal";

export default function Viza() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isPremium } = useSubscription();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const selectedCountry = searchParams.get("country") || null;
  const selectedRoute = searchParams.get("route") || null;

  const handleSelectCountry = useCallback((code: string) => {
    setSearchParams({ country: code }, { replace: false });
  }, [setSearchParams]);

  const handleSelectRoute = useCallback((routeId: string) => {
    if (selectedCountry) {
      setSearchParams({ country: selectedCountry, route: routeId }, { replace: false });
    }
  }, [selectedCountry, setSearchParams]);

  const handleClearAll = useCallback(() => {
    setSearchParams({}, { replace: false });
  }, [setSearchParams]);

  const handleClearRoute = useCallback(() => {
    if (selectedCountry) {
      setSearchParams({ country: selectedCountry }, { replace: false });
    }
  }, [selectedCountry, setSearchParams]);

  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);

  // Sidebar country list
  const euCountries = COUNTRY_CONTENT.filter(c => c.isEU);
  const nonEuCountries = COUNTRY_CONTENT.filter(c => !c.isEU);

  

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <SEO title="Viza Navigator — Boravišna Dozvola u Njemačkoj" description="Saznaj koje dokumente trebaš za vizu ili boravišnu dozvolu, ovisno o državljanstvu." path="/viza" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        {/* Nav */}
        <PageNavBar />

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-[28px] font-bold text-[#2D2D2D]">{t("visaNavigator.title")}</h1>
          <p className="text-[16px] text-[#6B6B6B] mt-1">{t("visaNavigator.subtitle")}</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8 overflow-x-auto whitespace-nowrap">
          <button onClick={handleClearAll}
            className="text-[13px] transition-colors hover:underline"
            style={{ color: selectedCountry ? '#9CA3AF' : '#2D2D2D', fontWeight: selectedCountry ? 400 : 500 }}>
            {t("visaNavigator.title")}
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

        {/* 3-col layout: Sidebar | Main | Right Panel */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SIDEBAR — Country list */}
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" className="text-[hsl(var(--gold))]">
                {t("visaNavigator.sidebar_eu")}
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

              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" className="text-[hsl(var(--gold))]">
                {t("visaNavigator.sidebar_balkan")}
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
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" className="text-[hsl(var(--gold))]">
                    {t("visaNavigator.sidebar_routes")}
                  </p>
                  <div className="flex flex-col gap-1">
                    {country.routes.map(r => {
                      const active = selectedRoute === r.id;
                      return (
                        <button key={r.id} onClick={() => handleSelectRoute(r.id)}
                          className="text-left px-3 py-2 transition-all duration-150 hover:bg-[#FFF8EC]"
                          style={{
                            background: active ? '#FFF8EC' : 'transparent',
                            borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                            borderRadius: 6,
                          }}>
                          <span className="text-[13px] block" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : '#2D2D2D' }}>
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
                {country.routes.map(r => {
                  const active = selectedRoute === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRoute(r.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                        active
                          ? "border-[#C9A84C] bg-[#FFF8EC] text-[#C9A84C] font-bold"
                          : "border-border/40 text-[#6B6B6B] hover:bg-[#FFF8EC]"
                      }`}
                    >
                      {r.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* CENTER — Main content */}
          <div className="flex-1 min-w-0">
            <div className="transition-all duration-200" style={{ animation: "fadeSlideIn 200ms ease" }}
              key={`${selectedCountry}-${selectedRoute}`}>
              {selectedRoute && !isPremium ? (
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
                  <div className="blur-sm select-none pointer-events-none">
                    <VisaContentRenderer
                      selectedCountry={selectedCountry}
                      selectedRoute={selectedRoute}
                      onSelectRoute={handleSelectRoute}
                      onBack={handleClearRoute}
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card/80 backdrop-blur-sm z-10">
                    <Lock className="h-7 w-7 text-primary" />
                    <p className="text-sm font-semibold text-foreground text-center px-4">
                      {t("paywall.stepLocked")}
                    </p>
                    <button
                      onClick={() => setShowPremiumModal(true)}
                      className="rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                      className="bg-[hsl(var(--gold))]" style={{}}
                    >
                      {t("paywall.unlockPremium")}
                    </button>
                  </div>
                </div>
              ) : (
                <VisaContentRenderer
                  selectedCountry={selectedCountry}
                  selectedRoute={selectedRoute}
                  onSelectRoute={handleSelectRoute}
                  onBack={handleClearRoute}
                />
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="hidden md:block">
            <VisaRightPanel selectedCountry={selectedCountry} selectedRoute={selectedRoute} onSelectRoute={handleSelectRoute} />
          </div>
        </div>
      </div>

      <PremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        trigger="viza"
      />

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}