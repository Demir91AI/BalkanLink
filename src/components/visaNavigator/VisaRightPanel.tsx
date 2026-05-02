import { Globe, ExternalLink } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedCountryContent } from "@/data/viza-i18n";

interface Props {
  selectedCountry: string | null;
  selectedRoute: string | null;
  onSelectRoute: (routeId: string) => void;
}

const VisaRightPanel = ({ selectedCountry, selectedRoute, onSelectRoute }: Props) => {
  const { t, i18n } = useTranslation("pages");
  const COUNTRY_CONTENT = useMemo(() => getLocalizedCountryContent(i18n.language), [i18n.language]);
  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);
  const route = selectedRoute && country ? country.routes.find(r => r.id === selectedRoute) : null;

  // STATE 1: Nothing selected
  if (!country) return (
    <div
      className="w-[280px] flex-shrink-0 bg-white/[0.04] border border-white/10 rounded-2xl sticky top-6 overflow-y-auto"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxHeight: "calc(100vh - 48px)", scrollbarWidth: "none" }}
    >
      <div style={{ padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Globe size={40} color="#C9A84C" style={{ margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
            {t("visa.rightPanel.introBody")}
          </p>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{t("visa.rightPanel.usefulLinks")}</p>
          {[
            { label: 'BAMF', url: 'https://www.bamf.de' },
            { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com' },
            { label: 'Auswärtiges Amt', url: 'https://www.auswaertiges-amt.de' },
            { label: 'Your Europe', url: 'https://europa.eu/youreurope' }
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#C9A84C', fontSize: 12, textDecoration: 'none', marginBottom: 8 }}>
              <ExternalLink size={12} />{l.label}
            </a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 12, marginTop: 4 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            {t("visa.rightPanel.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );

  // STATE 2: Country selected, no route
  if (!route) return (
    <div
      className="w-[280px] flex-shrink-0 bg-white/[0.04] border border-white/10 rounded-2xl sticky top-6 overflow-y-auto"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxHeight: "calc(100vh - 48px)", scrollbarWidth: "none" }}
    >
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <img src={country.flag} alt={country.name} style={{ height: 22, borderRadius: 2 }} loading="lazy" decoding="async" />
          <span style={{ fontSize: 16, fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>{country.name}</span>
        </div>
        <a href={country.embassyUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.30)', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: '#C9A84C', fontWeight: 600 }}>{country.embassyName}</span>
          <ExternalLink size={14} color="#C9A84C" />
        </a>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginBottom: 16, lineHeight: 1.5 }}>{country.embassyNote}</p>
        {country.routes.slice(0, 3).map((r, i) => (
          <div key={i} onClick={() => onSelectRoute(r.id)}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 8, padding: '10px 14px', marginBottom: 8, cursor: 'pointer' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.10)'}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.88)', margin: 0 }}>{r.title}</p>
          </div>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 12, marginTop: 8 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            {t("visa.rightPanel.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );

  // STATE 3: Country + Route selected
  return (
    <div
      className="w-[280px] flex-shrink-0 bg-white/[0.04] border border-white/10 rounded-2xl sticky top-6 overflow-y-auto"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)", maxHeight: "calc(100vh - 48px)", scrollbarWidth: "none" }}
    >
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <img src={country.flag} alt="" loading="lazy" decoding="async" style={{ height: 18, borderRadius: 2 }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{country.name}</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.95)', marginBottom: 4 }}>{route.title}</h3>
        <p style={{ fontSize: 12, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)', marginBottom: 12 }}>{route.legalBasis}</p>
        <a href={country.embassyUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.30)', borderRadius: 8, padding: '10px 14px', textDecoration: 'none', marginBottom: 16, width: '100%', boxSizing: 'border-box' }}>
          <span style={{ fontSize: 12, color: '#C9A84C', fontWeight: 600 }}>{country.embassyName}</span>
          <ExternalLink size={13} color="#C9A84C" />
        </a>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{t("visa.rightPanel.officialSources")}</p>
          {route.sources.slice(0, 3).map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.78)', fontSize: 12, textDecoration: 'none', marginBottom: 6 }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#C9A84C'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.78)'}>
              <ExternalLink size={11} color="#C9A84C" />{s.label}
            </a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.10)', paddingTop: 10, marginTop: 8 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
            {t("visa.rightPanel.disclaimer")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisaRightPanel;
