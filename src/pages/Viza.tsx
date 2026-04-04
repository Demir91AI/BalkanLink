import { useState } from "react";
import { ChevronLeft, Home as HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { COUNTRY_CONTENT } from "@/data/vizaNavigatorContent";
import { VisaContentRenderer } from "@/components/visaNavigator/VisaContentRenderer";
import VisaRightPanel from "@/components/visaNavigator/VisaRightPanel";

export default function Viza() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    setSelectedRoute(null);
  };

  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);

  // Sidebar country list
  const euCountries = COUNTRY_CONTENT.filter(c => c.isEU);
  const nonEuCountries = COUNTRY_CONTENT.filter(c => !c.isEU);

  const GOLD = '#C9A84C';

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <div className="max-w-[1280px] mx-auto px-12 py-8">
        {/* Nav */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1 text-[14px] text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors">
            <HomeIcon size={16} />
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-[28px] font-bold text-[#2D2D2D]">Viza Navigator</h1>
          <p className="text-[16px] text-[#6B6B6B] mt-1">Sve o vizama, boravišnim dozvolama i stalnom boravku — po državama</p>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 mb-8">
          <button onClick={() => { setSelectedCountry(null); setSelectedRoute(null); }}
            className="text-[13px] transition-colors hover:underline"
            style={{ color: selectedCountry ? '#9CA3AF' : '#2D2D2D', fontWeight: selectedCountry ? 400 : 500 }}>
            Viza Navigator
          </button>
          {selectedCountry && country && (
            <>
              <span className="text-[13px] text-[#9CA3AF]">›</span>
              <button onClick={() => setSelectedRoute(null)}
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
        <div className="flex gap-6">
          {/* LEFT SIDEBAR — Country list */}
          <div className="w-[220px] flex-shrink-0">
            <div className="sticky top-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: GOLD }}>
                EU države
              </p>
              <div className="flex flex-col gap-1.5 mb-5">
                {euCountries.map(c => (
                  <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-150 hover:bg-[#FFF8EC]"
                    style={{
                      background: selectedCountry === c.code ? '#FFF8EC' : 'transparent',
                      border: selectedCountry === c.code ? `1.5px solid ${GOLD}` : '1.5px solid transparent',
                    }}>
                    <img src={c.flag} alt="" className="h-5 rounded-sm" />
                    <span className="text-[14px]" style={{ fontWeight: selectedCountry === c.code ? 700 : 500, color: selectedCountry === c.code ? GOLD : '#2D2D2D' }}>
                      {c.name}
                    </span>
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#166534' }}>EU</span>
                  </button>
                ))}
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: GOLD }}>
                Zapadni Balkan
              </p>
              <div className="flex flex-col gap-1.5">
                {nonEuCountries.map(c => (
                  <button key={c.code} onClick={() => handleSelectCountry(c.code)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-150 hover:bg-[#FFF8EC]"
                    style={{
                      background: selectedCountry === c.code ? '#FFF8EC' : 'transparent',
                      border: selectedCountry === c.code ? `1.5px solid ${GOLD}` : '1.5px solid transparent',
                    }}>
                    <img src={c.flag} alt="" className="h-5 rounded-sm" />
                    <span className="text-[14px]" style={{ fontWeight: selectedCountry === c.code ? 700 : 500, color: selectedCountry === c.code ? GOLD : '#2D2D2D' }}>
                      {c.name}
                    </span>
                    <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FEF9C3', color: '#854D0E' }}>WB</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER — Main content */}
          <div className="flex-1 min-w-0">
            <div className="transition-all duration-200" style={{ animation: "fadeSlideIn 200ms ease" }}
              key={`${selectedCountry}-${selectedRoute}`}>
              <VisaContentRenderer
                selectedCountry={selectedCountry}
                selectedRoute={selectedRoute}
                onSelectRoute={(routeId) => setSelectedRoute(routeId)}
                onBack={() => setSelectedRoute(null)}
              />
            </div>
          </div>

          {/* RIGHT PANEL */}
          <VisaRightPanel selectedCountry={selectedCountry} selectedRoute={selectedRoute} onSelectRoute={setSelectedRoute} />
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
