import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, FileText, Clock, MapPin, Zap, Info, Euro, ChevronRight, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '@/hooks/useSubscription';
import { useAuth } from '@/contexts/AuthContext';
import VisaGateCard from './VisaGateCard';
import { getLocalizedCountryContent } from '@/data/viza-i18n';
import { DEV_MODE } from '@/lib/dev-mode';
import { WestbalkanPanel } from './WestbalkanPanel';

const loadForm = (formKey: string) => {
  const formMap: Record<string, () => Promise<{ default: React.FC }>> = {
    VisaWorkForm1: () => import('../formulare/muster/VisaWorkForm1').catch(() => ({ default: () => null as any })),
    VisaWorkForm2: () => import('../formulare/muster/VisaWorkForm2').catch(() => ({ default: () => null as any })),
    VisaBluecardForm: () => import('../formulare/muster/VisaBluecardForm').catch(() => ({ default: () => null as any })),
    VisaFamilyForm: () => import('../formulare/muster/VisaFamilyForm').catch(() => ({ default: () => null as any })),
    VisaStudyForm: () => import('../formulare/muster/VisaStudyForm').catch(() => ({ default: () => null as any })),
    VisaPermanentForm1: () => import('../formulare/muster/VisaPermanentForm1').catch(() => ({ default: () => null as any })),
    VisaPermanentForm2: () => import('../formulare/muster/VisaPermanentForm2').catch(() => ({ default: () => null as any })),
    VisaAusbildungVidex: () => import('../formulare/muster/VisaWorkForm1').catch(() => ({ default: () => null as any })),
    VisaAusbildungAufenthalt: () => import('../formulare/muster/VisaWorkForm1').catch(() => ({ default: () => null as any })),
    VisaAusbildungCV: () => import('../formulare/muster/VisaWorkForm1').catch(() => ({ default: () => null as any })),
  };
  return formMap[formKey];
};

interface Props {
  selectedCountry: string | null;
  selectedRoute: string | null;
  onSelectRoute: (routeId: string) => void;
  onBack: () => void;
}

const GOLD = '#C9A84C';
const CHARCOAL = 'rgba(255,255,255,0.92)';

const FREE_STEPS = 0;
const FREE_ERRORS = 0;

const Card = ({ children, bg = 'rgba(255,255,255,0.04)', border = 'rgba(255,255,255,0.10)', mb = 16 }: { children: React.ReactNode; bg?: string; border?: string; mb?: number }) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 24px', marginBottom: mb, boxShadow: '0 2px 12px rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)' }}>
    {children}
  </div>
);

const CardHeader = ({ icon: Icon, color = GOLD, title }: { icon: React.FC<any>; color?: string; title: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
    <Icon size={18} color={color} />
    <h3 style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, margin: 0 }}>{title}</h3>
  </div>
);

const StepCircle = ({ n }: { n: number }) => (
  <div style={{ minWidth: 32, height: 32, borderRadius: '50%', background: GOLD, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{n}</div>
);

const InlineFormPlaceholder = ({ title, onClose, closeLabel }: { title: string; onClose: () => void; closeLabel: string }) => (
  <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.30)', borderRadius: 12, padding: 32, textAlign: 'center', position: 'relative' }}>
    <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>×</button>
    <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
    <h3 style={{ color: CHARCOAL, marginBottom: 8 }}>{title}</h3>
    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>{closeLabel}</p>
  </div>
);

/** Blurred placeholder for locked content */
const BlurredBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    <div className="pointer-events-none select-none" style={{ filter: 'blur(5px)', opacity: 0.5 }} aria-hidden="true">
      {children}
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <Lock className="h-4 w-4 text-[rgba(255,255,255,0.55)]" />
    </div>
  </div>
);

export const VisaContentRenderer: React.FC<Props> = ({ selectedCountry, selectedRoute, onSelectRoute, onBack }) => {
  const { t, i18n } = useTranslation('pages');
  const COUNTRY_CONTENT = useMemo(() => getLocalizedCountryContent(i18n.language), [i18n.language]);
  const [openFormKey, setOpenFormKey] = useState<string | null>(null);
  const [LoadedForm, setLoadedForm] = useState<React.FC | null>(null);
  const openFormRef = useRef<HTMLDivElement>(null);
  const { isPremium } = useSubscription();
  const { user } = useAuth();
  const hasFullAccess = DEV_MODE || (!!user && isPremium);

  useEffect(() => {
    if (openFormKey && openFormRef.current) {
      const timer = setTimeout(() => {
        openFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [openFormKey, LoadedForm]);

  const handleOpenForm = async (formKey: string) => {
    if (openFormKey === formKey) {
      setOpenFormKey(null);
      setLoadedForm(null);
      return;
    }
    setOpenFormKey(formKey);
    try {
      const loader = loadForm(formKey);
      if (loader) {
        const mod = await loader();
        setLoadedForm(() => mod.default);
      }
    } catch {
      setLoadedForm(null);
    }
  };

  const country = COUNTRY_CONTENT.find(c => c.code === selectedCountry);

  // ── EMPTY STATE ──
  if (!country) return (
    <div style={{ textAlign: 'center', padding: '80px 20px', color: 'rgba(255,255,255,0.65)' }}>
      <FileText size={56} style={{ margin: '0 auto 20px', display: 'block', opacity: 0.2, color: CHARCOAL }} />
      <h2 style={{ fontSize: 22, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>{t('visa.renderer.welcome')}</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7 }}>{t('visa.renderer.welcomeBody')}</p>
    </div>
  );

  const route = selectedRoute ? country.routes.find(r => r.id === selectedRoute) : null;

  // ── EU FLOW ──
  if (country.isEU) {
    const r = country.routes[0];
    return (
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(16,185,129,0.15)', color: 'rgba(110,231,183,0.95)', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          {t('visa.renderer.freizuegigkeit')}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <img src={country.flag} alt={country.name} style={{ height: 28, borderRadius: 3 }} loading="lazy" decoding="async" />
          <h1 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, margin: 0 }}>{country.name}</h1>
        </div>

        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: 24 }}>{r.subtitle}</p>

        {/* Steps — premium only */}
        {hasFullAccess && (
          <Card>
            <CardHeader icon={CheckCircle} color="#22C55E" title={t('visa.renderer.schnelluebersicht')} />
            {r.steps.map((step: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                <StepCircle n={i + 1} />
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.6, margin: 0, paddingTop: 6 }}>{step}</p>
              </div>
            ))}
          </Card>
        )}

        {/* Documents only for premium */}
        {hasFullAccess && (
          <Card>
            <CardHeader icon={FileText} title={t('visa.renderer.requiredDocuments')} />
            {r.documents.map((doc: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <CheckCircle size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: 3 }} />
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', margin: 0 }}>{doc}</p>
              </div>
            ))}
          </Card>
        )}

        {/* Gate card */}
        {!hasFullAccess && <VisaGateCard routeTitle={r.title} />}

        {/* Full content for premium users */}
        {hasFullAccess && (
          <>
            {r.costs.length > 0 && (
              <Card>
                <CardHeader icon={Euro} title={t('visa.renderer.costs')} />
                {r.costs.map((c: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>•</span>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', margin: 0 }}>{c}</p>
                  </div>
                ))}
              </Card>
            )}

            {r.errors.length > 0 && (
              <Card bg="rgba(239,68,68,0.10)" border="rgba(239,68,68,0.30)">
                <CardHeader icon={AlertTriangle} color="#EF4444" title={t('visa.renderer.commonErrors')} />
                {r.errors.map((err: string, i: number) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>✕</span>
                    <p style={{ fontSize: 14, color: 'rgba(252,165,165,0.95)', margin: 0 }}>{err}</p>
                  </div>
                ))}
              </Card>
            )}

            <Card>
              <CardHeader icon={ExternalLink} title={t('visa.renderer.usefulLinks')} />
              {r.sources.map((s: any, i: number) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>
                  <ExternalLink size={14} />{s.label}
                </a>
              ))}
            </Card>
          </>
        )}

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 18px', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
          <Info size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {t('visa.renderer.disclaimer')}
        </div>
      </div>
    );
  }

  // ── NON-EU: NO ROUTE SELECTED ──
  if (!route) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <img src={country.flag} alt={country.name} style={{ height: 28, borderRadius: 3 }} loading="lazy" decoding="async" />
          <h1 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, margin: 0 }}>{country.name}</h1>
          <span style={{ background: 'rgba(245,158,11,0.15)', color: 'rgba(252,211,77,0.95)', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{t('visa.renderer.westbalkan')}</span>
        </div>

        <div style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.30)', borderRadius: 10, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={16} color={GOLD} />
            <span style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{country.embassyName}</span>
          </div>
          <a href={country.embassyUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 13, textDecoration: 'none' }}>
            {t('visa.renderer.openLink')} <ExternalLink size={14} />
          </a>
        </div>

        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}>{country.embassyNote}</p>

        {country.schengenFree && (
          <div style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.30)', borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
            <Info size={14} color="#3B82F6" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 13, color: 'rgba(147,197,253,0.95)' }}>{country.schengenNote}</span>
          </div>
        )}

        {country.code === 'xk' && country.kosovoNote && (
          <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.30)', borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
            <AlertTriangle size={14} color="#D97706" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 13, color: 'rgba(252,211,77,0.95)', fontWeight: 600 }}>{country.kosovoNote}</span>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: CHARCOAL, marginBottom: 16 }}>{t('visa.renderer.chooseSituation')}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {country.routes.map(r => (
            <div key={r.id} onClick={() => onSelectRoute(r.id)}
              style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.10)', borderRadius: 12, padding: '18px 20px', cursor: 'pointer', transition: 'all 200ms ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.10)'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>{r.legalBasis}</div>
                </div>
                <ChevronRight size={18} color={GOLD} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── NON-EU: ROUTE SELECTED — with free preview ──
  return (
    <div>
      {/* Back */}
      <button onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: GOLD, cursor: 'pointer', fontSize: 14, marginBottom: 20, padding: 0, fontWeight: 600 }}>
        {t('visa.renderer.backToRoutes')}
      </button>

      {/* FREE: Title + legal basis + subtitle */}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>{route.title}</h1>
      <p style={{ fontSize: 13, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{route.legalBasis}</p>
      <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.78)', lineHeight: 1.7, marginBottom: 24 }}>{route.subtitle}</p>

      {/* FREE: Westbalkan panel */}
      {route.westbalkanNote && (
        <WestbalkanPanel
          countryCode={country.code}
          embassyName={country.embassyName}
          embassyUrl={country.embassyUrl}
          embassyNote={country.embassyNote}
        />
      )}

      {/* FREE: Kosovo note */}
      {route.kosovoNote && (
        <div style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.30)', borderRadius: 12, padding: '14px 18px', marginBottom: 16 }}>
          <AlertTriangle size={16} color="#D97706" style={{ marginRight: 8, verticalAlign: 'middle' }} />
          <span style={{ fontSize: 13, color: 'rgba(252,211,77,0.95)', fontWeight: 600 }}>{route.kosovoNote}</span>
        </div>
      )}

      {/* FREE: Ausbildung highlight */}
      {route.ausbildungHighlight && route.ausbildungHighlight.length > 0 && (
        <div style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.30)', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Zap size={18} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(252,211,77,0.95)', margin: '0 0 10px' }}>{t('visa.renderer.ausbildungTitle')}</p>
              {route.ausbildungHighlight.map((item: string, i: number) => (
                <p key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: '0 0 4px', lineHeight: 1.6 }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Country-specific notes */}
      {route.countryNotes && route.countryNotes.length > 0 && (
        <div style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.30)', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Info size={18} color="#3B82F6" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(147,197,253,0.95)', margin: '0 0 10px' }}>
                {t('visa.renderer.countryNotesTitle')}
                {route.countryBadge && (
                  <span style={{ marginLeft: 8, background: 'rgba(59,130,246,0.15)', color: 'rgba(147,197,253,0.95)', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{route.countryBadge}</span>
                )}
              </p>
              {route.countryNotes.map((note: string, i: number) => (
                <p key={i} style={{ fontSize: 13, color: 'rgba(147,197,253,0.92)', margin: '0 0 6px', lineHeight: 1.6 }}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps — premium only */}
      {hasFullAccess && (
        <Card>
          <CardHeader icon={CheckCircle} color="#22C55E" title={t('visa.renderer.steps')} />
          {route.steps.map((step: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
              <StepCircle n={i + 1} />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', lineHeight: 1.6, margin: 0, paddingTop: 6 }}>{step}</p>
            </div>
          ))}
        </Card>
      )}

      {/* Documents + Errors only for premium — gate replaces them for free */}
      {hasFullAccess && (
        <Card>
          <CardHeader icon={FileText} title={t('visa.renderer.requiredDocuments')} />
          {route.documents.map((doc: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <CheckCircle size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: 3 }} />
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', margin: 0 }}>{doc}</p>
            </div>
          ))}
        </Card>
      )}

      {hasFullAccess && route.errors.length > 0 && (
        <Card bg="rgba(239,68,68,0.10)" border="rgba(239,68,68,0.30)">
          <CardHeader icon={AlertTriangle} color="#EF4444" title={t('visa.renderer.errorsToAvoid')} />
          {route.errors.map((err: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>✕</span>
              <p style={{ fontSize: 14, color: 'rgba(252,165,165,0.95)', margin: 0 }}>{err}</p>
            </div>
          ))}
        </Card>
      )}

      {/* ── GATE CARD ── shown inline after free preview */}
      {!hasFullAccess && <VisaGateCard routeTitle={route.title} />}

      {/* ── FULL CONTENT for premium users ── */}
      {hasFullAccess && (
        <>
          {/* Costs */}
          <Card>
            <CardHeader icon={Euro} title={t('visa.renderer.costs')} />
            {route.costs.map((c: string, i: number) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>•</span>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.92)', margin: 0 }}>{c}</p>
              </div>
            ))}
          </Card>

          {/* Sources */}
          <Card>
            <CardHeader icon={ExternalLink} title={t('visa.renderer.officialSources')} />
            {route.sources.map((s: any, i: number) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>
                <ExternalLink size={14} />{s.label}
              </a>
            ))}
          </Card>

          {/* Guide-first cutover 2026-10-27: Musterformulare gallery removed; official next step instead. */}
          <Card>
            <CardHeader icon={ExternalLink} title={t('visa.renderer.officialNextTitle')} />
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.88)', margin: '0 0 12px', lineHeight: 1.55 }}>{t('visa.renderer.officialNextBody')}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
              <a data-testid="visa-auslandsportal" href="https://www.auswaertiges-amt.de/de/service/visa-und-aufenthalt/auslandsportal" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 14px', borderRadius: 10, background: GOLD, color: '#020617', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                {t('visa.renderer.auslandsportalBtn')} <ExternalLink size={14} />
              </a>
              <a href="https://digital.diplo.de/visa" target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px 14px', borderRadius: 10, border: `1px solid ${GOLD}`, color: GOLD, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                {t('visa.renderer.digitalBtn')} <ExternalLink size={14} />
              </a>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.5 }}>
              <Info size={12} style={{ marginRight: 6, verticalAlign: 'middle' }} />{t('visa.renderer.officialNextNote')}
            </p>
          </Card>
        </>
      )}

      {/* Disclaimer */}
      <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: '14px 18px', fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>
        <Info size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        {t('visa.renderer.disclaimer')}
        <br />
        <AlertTriangle size={12} style={{ marginRight: 4, verticalAlign: 'middle', marginTop: 4 }} />
        {t('visa.renderer.verifyAuthority')}
      </div>
    </div>
  );
};
