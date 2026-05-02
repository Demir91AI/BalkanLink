import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SEO } from "@/components/SEO";
import { useSearchParams } from "react-router-dom";
import PageNavBar from "@/components/navigation/PageNavBar";
import { getLocalizedCountryContent } from "@/data/viza-i18n";
import { VisaContentRenderer } from "@/components/visaNavigator/VisaContentRenderer";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";

export default function Viza() {
  const { t, i18n } = useTranslation("pages");
  const [searchParams, setSearchParams] = useSearchParams();

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

  const COUNTRY_CONTENT = useMemo(() => getLocalizedCountryContent(i18n.language), [i18n.language]);
  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);

  const euCountries = COUNTRY_CONTENT.filter(c => c.isEU);
  const nonEuCountries = COUNTRY_CONTENT.filter(c => !c.isEU);

  return (
    <div className="min-h-screen bg-[#020617] text-white/90">
      <SEO title={t("visa.navTitle")} description={t("visa.subtitle")} path="/viza" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        <PageNavBar
          variant="dark"
          onBack={selectedRoute ? handleClearRoute : selectedCountry ? handleClearAll : undefined}
        />

        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-white">
            {selectedRoute && country
              ? country.routes.find(r => r.id === selectedRoute)?.title || t("visa.navTitle")
              : selectedCountry && country
              ? country.name
              : t("visa.navTitle")}
          </h1>
          <p className="text-[16px] text-white/60 mt-1">{t("visa.navSubtitle")}</p>
        </div>

        {/* 3-col layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SIDEBAR */}
          <div className="hidden md:block w-[220px] flex-shrink-0">
            <div className="sticky top-6 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">{t("visa.sidebar.euCountries")}</p>
              <div className="flex flex-col gap-1 mb-5">
                {euCountries.map(c => {
                  const active = selectedCountry === c.code;
                  return (
                    <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                      className="flex items-center gap-2.5 px-3 py-2 text-left transition-all duration-150 hover:bg-white/[0.06] rounded-md"
                      style={{
                        background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                        borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                      }}>
                      <img src={c.flag} alt="" className="h-5 rounded-sm" loading="lazy" decoding="async" />
                      <span className="text-[14px]" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : 'rgba(255,255,255,0.85)' }}>
                        {c.name}
                      </span>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300">EU</span>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">{t("visa.sidebar.balkanCountries")}</p>
              <div className="flex flex-col gap-1">
                {nonEuCountries.map(c => {
                  const active = selectedCountry === c.code;
                  return (
                    <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                      className="flex items-center gap-2.5 px-3 py-2 text-left transition-all duration-150 hover:bg-white/[0.06] rounded-md"
                      style={{
                        background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                        borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                      }}>
                      <img src={c.flag} alt="" className="h-5 rounded-sm" loading="lazy" decoding="async" />
                      <span className="text-[14px]" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : 'rgba(255,255,255,0.85)' }}>
                        {c.name}
                      </span>
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300">WB</span>
                    </button>
                  );
                })}
              </div>

              {/* Route list when non-EU country selected */}
              {country && !country.isEU && (
                <>
                  <div className="h-px my-4 bg-white/10" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 text-[hsl(var(--gold))]">{t("visa.sidebar.routes")}</p>
                  <div className="flex flex-col gap-1">
                    {country.routes.map((r) => {
                      const active = selectedRoute === r.id;
                      return (
                        <button key={r.id} onClick={() => handleSelectRoute(r.id)}
                          className="text-left px-3 py-2 transition-all duration-150 hover:bg-white/[0.06] rounded-md"
                          style={{
                            background: active ? 'rgba(201,168,76,0.12)' : 'transparent',
                            borderLeft: active ? '3px solid hsl(var(--gold))' : '3px solid transparent',
                          }}>
                          <span className="text-[13px] block" style={{ fontWeight: active ? 700 : 500, color: active ? 'hsl(var(--gold))' : 'rgba(255,255,255,0.85)' }}>
                            {r.title}
                          </span>
                          <span className="text-[11px] block text-white/40" style={{ fontFamily: 'monospace' }}>
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
                        ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] font-bold"
                        : "border-white/15 text-white/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    <img src={c.flag} alt="" className="h-4 rounded-sm" loading="lazy" decoding="async" />
                    {c.name}
                  </button>
                );
              })}
            </div>
            {country && !country.isEU && (
              <div className="flex gap-2 overflow-x-auto pb-2 mt-2 scrollbar-hide">
                {country.routes.map((r) => {
                  const active = selectedRoute === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSelectRoute(r.id)}
                      className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-medium border transition-all ${
                        active
                          ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] font-bold"
                          : "border-white/15 text-white/65 hover:bg-white/[0.06]"
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
              <VisaContentRenderer
                selectedCountry={selectedCountry}
                selectedRoute={selectedRoute}
                onSelectRoute={handleSelectRoute}
                onBack={handleClearRoute}
              />
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
