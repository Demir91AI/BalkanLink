import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, CheckCircle, AlertTriangle, FileText, Clock, MapPin, Zap, Info, Printer, Euro, ChevronRight, Lock } from 'lucide-react';
import { useSubscription } from '@/hooks/useSubscription';
import PremiumModal from '@/components/paywall/PremiumModal';
import { COUNTRY_CONTENT } from '../../data/vizaNavigatorContent';
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
const CHARCOAL = '#1A1A2E';

const Card = ({ children, bg = '#FFFFFF', border = '#F0EAD8', mb = 16 }: { children: React.ReactNode; bg?: string; border?: string; mb?: number }) => (
  <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: '20px 24px', marginBottom: mb, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
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
  <div style={{ background: 'white', border: '1px solid #E8D9B0', borderRadius: 12, padding: 32, textAlign: 'center', position: 'relative' }}>
    <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>×</button>
    <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
    <h3 style={{ color: CHARCOAL, marginBottom: 8 }}>{title}</h3>
    <p style={{ color: '#6B6B6B', fontSize: 14 }}>{closeLabel}</p>
  </div>
);

export const VisaContentRenderer: React.FC<Props> = ({ selectedCountry, selectedRoute, onSelectRoute, onBack }) => {
  const [openFormKey, setOpenFormKey] = useState<string | null>(null);
  const [LoadedForm, setLoadedForm] = useState<React.FC | null>(null);
  const [premiumModalOpen, setPremiumModalOpen] = useState(false);
  const openFormRef = useRef<HTMLDivElement>(null);
  const { isPremium } = useSubscription();

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
    <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B6B6B' }}>
      <FileText size={56} style={{ margin: '0 auto 20px', display: 'block', opacity: 0.2, color: CHARCOAL }} />
      <h2 style={{ fontSize: 22, fontWeight: 700, color: CHARCOAL, marginBottom: 8 }}>{"Willkommen im Visa Navigator"}</h2>
      <p style={{ fontSize: 15, lineHeight: 1.7 }}>{"Wähle ein Land aus dem linken Menü, um Informationen zu Visa und Aufenthaltsgenehmigungen zu finden."}</p>
    </div>
  );

  const route = selectedRoute ? country.routes.find(r => r.id === selectedRoute) : null;

  // ── EU FLOW ──
  if (country.isEU) {
    const r = country.routes[0];
    return (
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#DCFCE7', color: '#166534', borderRadius: 20, padding: '4px 16px', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
          {"🇪🇺 EU — Freizügigkeit"}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <img src={country.flag} alt={country.name} style={{ height: 28, borderRadius: 3 }} />
          <h1 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, margin: 0 }}>{country.name}</h1>
        </div>

        <p style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 24 }}>{r.subtitle}</p>

        {!isPremium && (
          <>
            <div className="relative">
              <div className="pointer-events-none select-none max-h-72 overflow-hidden" style={{ filter: 'blur(4px)' }} aria-hidden="true">
                <VisaDetailCards route={r} GOLD={GOLD} CHARCOAL={CHARCOAL} />
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-3 px-6 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
                    <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
                  </div>
                  <p className="text-sm font-bold">Detaljne informacije su dostupne Premium korisnicima</p>
                  <button
                    onClick={() => setPremiumModalOpen(true)}
                    className="h-9 rounded-xl px-5 text-xs font-bold text-white"
                    style={{ background: 'hsl(var(--gold))' }}
                  >
                    Otključaj Premium — 9.99€/mjes.
                  </button>
                </div>
              </div>
            </div>
            <PremiumModal isOpen={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} trigger="guide" />
          </>
        )}

        {isPremium && <VisaDetailCards route={r} GOLD={GOLD} CHARCOAL={CHARCOAL} />}

        <div style={{ background: '#F9F6F0', borderRadius: 10, padding: '14px 18px', fontSize: 12, color: '#9CA3AF' }}>
          <Info size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          {"BalkanLink bietet informative Hinweise. Dies ist keine Rechtsberatung. Stand 2026."}
        </div>
      </div>
    );
  }

  // ── NON-EU: NO ROUTE SELECTED ──
  if (!route) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <img src={country.flag} alt={country.name} style={{ height: 28, borderRadius: 3 }} />
          <h1 style={{ fontSize: 26, fontWeight: 700, color: CHARCOAL, margin: 0 }}>{country.name}</h1>
          <span style={{ background: '#FEF9C3', color: '#854D0E', borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 600 }}>{"Westbalkan"}</span>
        </div>

        {/* Embassy */}
        <div style={{ background: '#FFF8EC', border: '1px solid #E8D9B0', borderRadius: 10, padding: '12px 16px', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <MapPin size={16} color={GOLD} />
            <span style={{ fontSize: 14, fontWeight: 600, color: CHARCOAL }}>{country.embassyName}</span>
          </div>
          <a href={country.embassyUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 13, textDecoration: 'none' }}>
            {"Öffnen"} <ExternalLink size={14} />
          </a>
        </div>

        <p style={{ fontSize: 13, color: '#6B6B6B', marginBottom: 12 }}>{country.embassyNote}</p>

        {/* Schengen free note */}
        {country.schengenFree && (
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
            <Info size={14} color="#3B82F6" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 13, color: '#1D4ED8' }}>{country.schengenNote}</span>
          </div>
        )}

        {/* Kosovo specific */}
        {country.code === 'xk' && country.kosovoNote && (
          <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: 10, padding: '12px 16px', marginBottom: 12 }}>
            <AlertTriangle size={14} color="#D97706" style={{ marginRight: 8, verticalAlign: 'middle' }} />
            <span style={{ fontSize: 13, color: '#92400E', fontWeight: 600 }}>{country.kosovoNote}</span>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, color: CHARCOAL, marginBottom: 16 }}>{"Wähle deine Situation"}</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {country.routes.map(r => (
            <div key={r.id} onClick={() => onSelectRoute(r.id)}
              style={{ background: 'white', border: '1.5px solid #F0EAD8', borderRadius: 12, padding: '18px 20px', cursor: 'pointer', transition: 'all 200ms ease' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = GOLD; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#F0EAD8'; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF', fontFamily: 'monospace' }}>{r.legalBasis}</div>
                </div>
                <ChevronRight size={18} color={GOLD} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── NON-EU: ROUTE SELECTED ──
  return (
    <div>
      {/* Back */}
      <button onClick={onBack}
        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: GOLD, cursor: 'pointer', fontSize: 14, marginBottom: 20, padding: 0, fontWeight: 600 }}>
        {"← Zurück zu den Routen"}
      </button>

      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>
        <img src={country.flag} alt="" style={{ height: 14, verticalAlign: 'middle', marginRight: 6, borderRadius: 2 }} />
        {country.name} › <span style={{ color: CHARCOAL, fontWeight: 500 }}>{route.title}</span>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 700, color: CHARCOAL, marginBottom: 4 }}>{route.title}</h1>
      <p style={{ fontSize: 13, fontFamily: 'monospace', color: '#9CA3AF', marginBottom: 8 }}>{route.legalBasis}</p>
      <p style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.7, marginBottom: 24 }}>{route.subtitle}</p>

      {/* Westbalkan highlight — FREE intro */}
      {route.westbalkanNote && (
        <div style={{ background: '#FFF8EC', border: '1px solid #E8D9B0', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Zap size={18} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#92400E', margin: '0 0 6px' }}>{"Westbalkan-Regelung aktiv!"}</p>
              <p style={{ fontSize: 13, color: '#4A4A4A', margin: 0, lineHeight: 1.6 }}>{route.westbalkanNote}</p>
              <a href="https://www.make-it-in-germany.com/de/visum-aufenthalt/arten/arbeit/westbalkan-regelung"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: GOLD, fontSize: 12, marginTop: 8, textDecoration: 'none' }}>
                {"Mehr erfahren"} <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Kosovo note — FREE */}
      {route.kosovoNote && (
        <div style={{ background: '#FEF9C3', border: '1px solid #FDE68A', borderRadius: 12, padding: '14px 18px', marginBottom: 16 }}>
          <AlertTriangle size={16} color="#D97706" style={{ marginRight: 8, verticalAlign: 'middle' }} />
          <span style={{ fontSize: 13, color: '#92400E', fontWeight: 600 }}>{route.kosovoNote}</span>
        </div>
      )}

      {/* PREMIUM GATED: detailed steps, docs, costs, errors, sources, forms */}
      {!isPremium && (
        <>
          <div className="relative">
            <div className="pointer-events-none select-none max-h-72 overflow-hidden" style={{ filter: 'blur(4px)' }} aria-hidden="true">
              <NonEURouteDetails route={route} GOLD={GOLD} CHARCOAL={CHARCOAL} openFormKey={null} handleOpenForm={() => {}} LoadedForm={null} openFormRef={null} />
            </div>
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3 px-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
                  <Lock className="h-5 w-5 text-[hsl(var(--gold))]" />
                </div>
                <p className="text-sm font-bold">Detaljne informacije su dostupne Premium korisnicima</p>
                <button
                  onClick={() => setPremiumModalOpen(true)}
                  className="h-9 rounded-xl px-5 text-xs font-bold text-white"
                  style={{ background: 'hsl(var(--gold))' }}
                >
                  Otključaj Premium — 9.99€/mjes.
                </button>
              </div>
            </div>
          </div>
          <PremiumModal isOpen={premiumModalOpen} onClose={() => setPremiumModalOpen(false)} trigger="guide" />
        </>
      )}

      {isPremium && (
        <NonEURouteDetails route={route} GOLD={GOLD} CHARCOAL={CHARCOAL} openFormKey={openFormKey} handleOpenForm={handleOpenForm} LoadedForm={LoadedForm} openFormRef={openFormRef} />
      )}

      {/* Disclaimer */}
      <div style={{ background: '#F9F6F0', borderRadius: 10, padding: '14px 18px', fontSize: 12, color: '#9CA3AF' }}>
        <Info size={13} style={{ marginRight: 6, verticalAlign: 'middle' }} />
        {"BalkanLink bietet informative Hinweise. Dies ist keine Rechtsberatung. Stand 2026."}
        <br />
        <AlertTriangle size={12} style={{ marginRight: 4, verticalAlign: 'middle', marginTop: 4 }} />
        {"Prüfe die Informationen immer direkt bei der zuständigen Behörde."}
      </div>
    </div>
  );
};

/* ── Helper: EU detail cards ── */
function VisaDetailCards({ route, GOLD, CHARCOAL }: { route: any; GOLD: string; CHARCOAL: string }) {
  return (
    <>
      <Card>
        <CardHeader icon={CheckCircle} color="#22C55E" title={"Schnellübersicht"} />
        {route.steps.map((step: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
            <StepCircle n={i + 1} />
            <p style={{ fontSize: 14, color: '#2D2D2D', lineHeight: 1.6, margin: 0, paddingTop: 6 }}>{step}</p>
          </div>
        ))}
      </Card>

      <Card>
        <CardHeader icon={FileText} title={"Erforderliche Dokumente"} />
        {route.documents.map((doc: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: 3 }} />
            <p style={{ fontSize: 14, color: '#2D2D2D', margin: 0 }}>{doc}</p>
          </div>
        ))}
      </Card>

      {route.costs.length > 0 && (
        <Card>
          <CardHeader icon={Euro} title={"Kosten"} />
          {route.costs.map((c: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>•</span>
              <p style={{ fontSize: 14, color: '#2D2D2D', margin: 0 }}>{c}</p>
            </div>
          ))}
        </Card>
      )}

      {route.errors.length > 0 && (
        <Card bg="#FEF2F2" border="#FECACA">
          <CardHeader icon={AlertTriangle} color="#EF4444" title={"Häufige Fehler"} />
          {route.errors.map((err: string, i: number) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <span style={{ color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>✕</span>
              <p style={{ fontSize: 14, color: '#7F1D1D', margin: 0 }}>{err}</p>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <CardHeader icon={ExternalLink} title={"Nützliche Links"} />
        {route.sources.map((s: any, i: number) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>
            <ExternalLink size={14} />{s.label}
          </a>
        ))}
      </Card>
    </>
  );
}

/* ── Helper: Non-EU route detail cards ── */
function NonEURouteDetails({ route, GOLD, CHARCOAL, openFormKey, handleOpenForm, LoadedForm, openFormRef }: {
  route: any; GOLD: string; CHARCOAL: string;
  openFormKey: string | null; handleOpenForm: (k: string) => void; LoadedForm: React.FC | null; openFormRef: React.RefObject<HTMLDivElement> | null;
}) {
  return (
    <>
      {/* Ausbildung highlight */}
      {route.ausbildungHighlight && route.ausbildungHighlight.length > 0 && (
        <div style={{ background: '#FFF8EC', border: '1px solid #E8D9B0', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Zap size={18} color={GOLD} style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#92400E', margin: '0 0 10px' }}>{"Ausbildung — wichtige Hinweise"}</p>
              {route.ausbildungHighlight.map((item: string, i: number) => (
                <p key={i} style={{ fontSize: 13, color: '#4A4A4A', margin: '0 0 4px', lineHeight: 1.6 }}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Country-specific notes */}
      {route.countryNotes && route.countryNotes.length > 0 && (
        <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <Info size={18} color="#3B82F6" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', margin: '0 0 10px' }}>
                {"Hinweise für dein Land"}
                {route.countryBadge && (
                  <span style={{ marginLeft: 8, background: '#DBEAFE', color: '#1E40AF', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{route.countryBadge}</span>
                )}
              </p>
              {route.countryNotes.map((note: string, i: number) => (
                <p key={i} style={{ fontSize: 13, color: '#1E3A5F', margin: '0 0 6px', lineHeight: 1.6 }}>{note}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      <Card>
        <CardHeader icon={CheckCircle} color="#22C55E" title={"Schritte"} />
        {route.steps.map((step: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
            <StepCircle n={i + 1} />
            <p style={{ fontSize: 14, color: '#2D2D2D', lineHeight: 1.6, margin: 0, paddingTop: 6 }}>{step}</p>
          </div>
        ))}
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader icon={FileText} title={"Erforderliche Dokumente"} />
        {route.documents.map((doc: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <CheckCircle size={14} color="#22C55E" style={{ flexShrink: 0, marginTop: 3 }} />
            <p style={{ fontSize: 14, color: '#2D2D2D', margin: 0, lineHeight: 1.5 }}>{doc}</p>
          </div>
        ))}
      </Card>

      {/* Costs */}
      <Card>
        <CardHeader icon={Euro} title={"Kosten"} />
        {route.costs.map((c: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <span style={{ color: GOLD, fontWeight: 700, flexShrink: 0 }}>•</span>
            <p style={{ fontSize: 14, color: '#2D2D2D', margin: 0 }}>{c}</p>
          </div>
        ))}
      </Card>

      {/* Errors */}
      <Card bg="#FEF2F2" border="#FECACA">
        <CardHeader icon={AlertTriangle} color="#EF4444" title={"Fehler die man vermeiden sollte"} />
        {route.errors.map((err: string, i: number) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <span style={{ color: '#EF4444', fontWeight: 700, flexShrink: 0 }}>✕</span>
            <p style={{ fontSize: 14, color: '#7F1D1D', margin: 0 }}>{err}</p>
          </div>
        ))}
      </Card>

      {/* Sources */}
      <Card>
        <CardHeader icon={ExternalLink} title={"Offizielle Quellen"} />
        {route.sources.map((s: any, i: number) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', marginBottom: 8 }}>
            <ExternalLink size={14} />{s.label}
          </a>
        ))}
        <p style={{ fontSize: 11, color: '#9CA3AF', margin: 0, marginTop: 8 }}>{"Offizielle Quellen"}</p>
      </Card>

      {/* Musterformulare */}
      {route.musterformulare.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: '#1E293B', borderRadius: 14, padding: 24 }}>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📋</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: '0 0 4px' }}>{"Musterformulare"}</h3>
              <p style={{ fontSize: 13, color: GOLD, margin: '0 0 8px', fontWeight: 600 }}>{"Übe das Ausfüllen von Formularen"}</p>
              <p style={{ fontSize: 13, color: '#94A3B8', margin: 0 }}>{"Interaktive Simulation — Übung, kein Originaldokument."}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {route.musterformulare.map((form: any, i: number) => (
                <div key={i} style={{ background: '#0F172A', borderRadius: 10, padding: 16, border: openFormKey === form.formKey ? `1.5px solid ${GOLD}` : '1.5px solid #334155' }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'white', margin: '0 0 4px' }}>{form.title}</p>
                  <p style={{ fontSize: 12, color: '#94A3B8', margin: '0 0 12px' }}>{form.subtitle}</p>
                  <button onClick={() => handleOpenForm(form.formKey)}
                    style={{ width: '100%', padding: '10px', background: '#2563EB', color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 8 }}>
                    📋 {openFormKey === form.formKey ? "Formular schließen" : "Formular öffnen"}
                  </button>
                  {form.downloadUrl && (
                    <button onClick={() => window.print()}
                      style={{ width: '100%', padding: '8px', background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                      <Printer size={12} /> {"PDF-Vorschau"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Render open form */}
          {openFormKey && openFormRef && (
            <div ref={openFormRef} style={{ marginTop: 16, transition: 'border-color 0.3s ease', borderRadius: 14, border: `2px solid ${GOLD}`, padding: 2 }}>
              {LoadedForm
                ? <div style={{ position: 'relative' }}>
                    <button onClick={() => handleOpenForm(openFormKey)}
                      style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, background: '#EF4444', color: 'white', border: 'none', borderRadius: 6, padding: '6px 14px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                      Zatvori
                    </button>
                    <LoadedForm />
                  </div>
                : <InlineFormPlaceholder
                    title={route.musterformulare.find((f: any) => f.formKey === openFormKey)?.title || openFormKey}
                    onClose={() => handleOpenForm(openFormKey)}
                    closeLabel={"Formular verfügbar"}
                  />
              }
            </div>
          )}
        </div>
      )}
    </>
  );
}
