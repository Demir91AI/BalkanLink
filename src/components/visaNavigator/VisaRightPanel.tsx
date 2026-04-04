import { Globe, ExternalLink, Clock } from "lucide-react";
import { COUNTRY_CONTENT } from "@/data/vizaNavigatorContent";
import TrustSystem from "./TrustSystem";

const GOLD = '#C9A84C';

const QUICK_LINKS = [
  { label: "Make it in Germany", url: "https://www.make-it-in-germany.com/de/visum-aufenthalt" },
  { label: "BAMF — Migration", url: "https://www.bamf.de/DE/Themen/MigrationAufenthalt/migrationaufenthalt-node.html" },
  { label: "Your Europe — EU", url: "https://europa.eu/youreurope/citizens/index_de.htm" },
  { label: "Auswärtiges Amt", url: "https://www.auswaertiges-amt.de/de/service/visa-einreise-aufenthalt" },
];

interface Props {
  selectedCountry: string | null;
  selectedRoute: string | null;
  onSelectRoute: (routeId: string) => void;
}

const VisaRightPanel = ({ selectedCountry, selectedRoute, onSelectRoute }: Props) => {
  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);
  const route = selectedRoute && country ? country.routes.find(r => r.id === selectedRoute) : null;

  return (
    <div
      className="w-[280px] flex-shrink-0 bg-white rounded-2xl sticky top-6 overflow-y-auto"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        padding: 24,
        maxHeight: "calc(100vh - 48px)",
        scrollbarWidth: "none",
      }}
    >
      {/* STATE 3: Country + Route */}
      {country && route ? (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-[16px] text-[#2D2D2D]">{route.title}</h3>
            <p className="text-[13px] text-[#6B6B6B] mt-1 line-clamp-3">{route.subtitle}</p>
          </div>
          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Legal basis */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-1.5" style={{ color: GOLD }}>
              Pravni osnov
            </p>
            <span className="text-[13px] font-mono rounded-md px-2.5 py-1 inline-block" style={{ background: "#F5F0E8" }}>
              {route.legalBasis}
            </span>
          </div>

          {/* Sources */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: GOLD }}>
              Zvanični izvori
            </p>
            <div className="flex flex-col gap-1">
              {route.sources.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[#6B6B6B] hover:text-[#C9A84C] transition-colors">
                  <ExternalLink size={14} style={{ color: GOLD }} />
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Musterformulare count */}
          {route.musterformulare.length > 0 && (
            <>
              <div className="h-px" style={{ background: "#F0EAD8" }} />
              <div className="rounded-lg p-3" style={{ background: '#1E293B' }}>
                <p className="text-[12px] text-white font-semibold mb-1">📋 Musterformulari</p>
                <p className="text-[11px] text-[#94A3B8]">{route.musterformulare.length} interaktivn{route.musterformulare.length === 1 ? 'i' : 'a'} formular{route.musterformulare.length === 1 ? '' : 'a'} za vježbu</p>
              </div>
            </>
          )}

          <div className="h-px" style={{ background: "#F0EAD8" }} />
          <TrustSystem variant="compact" showSources={false} />
        </div>
      ) : country ? (
        /* STATE 2: Country selected, no route */
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={country.flag} alt="" className="h-7 rounded-sm" />
            <span className="font-bold text-[18px] text-[#2D2D2D]">{country.name}</span>
          </div>
          <span
            className="inline-block text-[12px] font-semibold px-3 py-0.5 rounded-[20px]"
            style={country.isEU
              ? { background: "#DCFCE7", color: "#166534" }
              : { background: "#FEF9C3", color: "#854D0E" }
            }
          >
            {country.isEU ? "EU član" : "Zapadni Balkan"}
          </span>

          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Embassy */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: GOLD }}>
              Ambasada
            </p>
            <a
              href={country.embassyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-lg px-4 py-2.5 text-[13px] text-[#2D2D2D] transition-colors hover:bg-[#FFF8EC]"
              style={{ border: "1px solid #E0D8C8" }}
            >
              {country.embassyName}
              <ExternalLink size={14} />
            </a>
            <p className="text-[11px] text-[#9CA3AF] mt-2">{country.embassyNote}</p>
          </div>

          <div className="h-px" style={{ background: "#F0EAD8" }} />

          {/* Quick routes for non-EU */}
          {!country.isEU && (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-2" style={{ color: GOLD }}>
                Putevi dolaska
              </p>
              <div className="flex flex-wrap gap-2">
                {country.routes.slice(0, 3).map(r => (
                  <button
                    key={r.id}
                    onClick={() => onSelectRoute(r.id)}
                    className="text-[12px] px-3 py-1.5 rounded-[20px] cursor-pointer transition-colors hover:border-[#C9A84C] hover:bg-[#FFF3DC]"
                    style={{ background: "#FFF8EC", border: "1px solid #E8D9B0" }}
                  >
                    {r.title.split(' ')[0]} {r.title.split(' ')[1] || ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="h-px" style={{ background: "#F0EAD8" }} />
          <TrustSystem variant="compact" showSources={false} />
        </div>
      ) : (
        /* STATE 1: Nothing selected */
        <div className="flex flex-col items-center text-center space-y-4">
          <Globe size={48} style={{ color: GOLD }} />
          <h3 className="font-bold text-[20px] text-[#2D2D2D]">Viza Navigator</h3>
          <p className="text-[14px] text-[#6B6B6B] max-w-[260px]">Izaberi svoju zemlju porijekla za personalizovane vizne informacije.</p>

          <div className="w-full h-px my-6" style={{ background: "#F0EAD8" }} />

          <div className="w-full text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3" style={{ color: GOLD }}>
              Korisni linkovi
            </p>
            <div className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[13px] text-[#4A4A4A] hover:text-[#C9A84C] transition-colors"
                >
                  <ExternalLink size={14} style={{ color: GOLD }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaRightPanel;
