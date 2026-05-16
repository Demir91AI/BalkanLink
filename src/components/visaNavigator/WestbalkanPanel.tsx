import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, ChevronDown, Zap, MapPin, CheckCircle, ArrowRight, Users, Shield, AlertTriangle } from 'lucide-react';

const GOLD = '#C9A84C';
const CHARCOAL = 'rgba(255,255,255,0.92)';

interface AccordionProps {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  title: string;
  badge?: { text: string; color: string };
  children: React.ReactNode;
}

const AccordionSection: React.FC<AccordionProps> = ({ isOpen, onToggle, icon, title, badge, children }) => (
  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
    <button
      onClick={onToggle}
      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
    >
      <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
      <span style={{ fontSize: 14, fontWeight: 700, color: CHARCOAL, flex: 1 }}>{title}</span>
      {badge && (
        <span style={{ background: `${badge.color}22`, color: badge.color, borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, marginRight: 6, flexShrink: 0 }}>
          {badge.text}
        </span>
      )}
      <ChevronDown size={16} color={GOLD} style={{ flexShrink: 0, transition: 'transform 250ms', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
    </button>
    {isOpen && (
      <div style={{ padding: '0 20px 18px 20px' }}>
        {children}
      </div>
    )}
  </div>
);

interface Props {
  countryCode: string;
  embassyName: string;
  embassyUrl: string;
  embassyNote: string;
}

export const WestbalkanPanel: React.FC<Props> = ({ countryCode, embassyName, embassyUrl, embassyNote }) => {
  const { t } = useTranslation('pages');
  const wb = (key: string) => t(`visa.renderer.wbPanel.${key}`);

  const [openSections, setOpenSections] = useState<string[]>(['vorabzustimmung', 'procedure']);
  const toggle = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  const isOpen = (id: string) => openSections.includes(id);

  const isKosovo = countryCode === 'xk';

  const stats = [
    { label: wb('stat1Label'), value: wb('stat1Value'), sub: wb('stat1Sub') },
    { label: wb('stat2Label'), value: wb('stat2Value'), sub: wb('stat2Sub') },
    { label: wb('stat3Label'), value: wb('stat3Value'), sub: wb('stat3Sub') },
    { label: wb('stat4Label'), value: wb('stat4Value'), sub: wb('stat4Sub') },
  ];

  const procedureSteps = [
    { n: 1, text: wb('step1') },
    { n: 2, text: wb('step2') },
    { n: 3, text: wb('step3') },
    { n: 4, text: wb('step4') },
    { n: 5, text: wb('step5') },
    { n: 6, text: wb('step6') },
    { n: 7, text: wb('step7') },
  ];

  const pathSteps = [
    { label: wb('pathStep1Label'), sub: wb('pathStep1Sub') },
    { label: wb('pathStep2Label'), sub: wb('pathStep2Sub') },
    { label: wb('pathStep3Label'), sub: wb('pathStep3Sub') },
    { label: wb('pathStep4Label'), sub: wb('pathStep4Sub') },
  ];

  const pathReqs = ['pathReq1', 'pathReq2', 'pathReq3', 'pathReq4', 'pathReq5'];
  const sectorKeys = ['sector1', 'sector2', 'sector3', 'sector4', 'sector5', 'sector6', 'sector7', 'sector8'];

  const externalLinks = [
    { label: wb('link1'), url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
    { label: wb('link2'), url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' },
    { label: wb('link3'), url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
    { label: wb('link4'), url: 'https://www.gesetze-im-internet.de/beschv_2013/__26.html' },
    { label: `${embassyName} — ${wb('embassyLinkLabel')}`, url: embassyUrl },
  ];

  return (
    <div style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 100%)', border: '1.5px solid rgba(201,168,76,0.38)', borderRadius: 16, marginBottom: 20, overflow: 'hidden' }}>

      {/* HEADER */}
      <div style={{ background: 'rgba(201,168,76,0.13)', borderBottom: '1px solid rgba(201,168,76,0.22)', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
          <Zap size={16} color={GOLD} />
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'rgba(252,211,77,0.97)', margin: 0, letterSpacing: '0.03em' }}>
            {wb('headerTitle')}
          </h2>
          <span style={{ background: 'rgba(34,197,94,0.18)', color: '#4ADE80', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, marginLeft: 'auto' }}>
            {wb('headerLaw')}
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', margin: '10px 0 0', lineHeight: 1.65 }}>
          {wb('headerDesc')}
        </p>
      </div>

      {/* KEY STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '16px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background: 'rgba(0,0,0,0.22)', borderRadius: 10, padding: '11px 14px' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>{s.label}</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: GOLD, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', marginTop: 5, lineHeight: 1.4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 1. Vorabzustimmung */}
      <AccordionSection
        id="vorabzustimmung"
        isOpen={isOpen('vorabzustimmung')}
        onToggle={() => toggle('vorabzustimmung')}
        icon={<span>⚡</span>}
        title={wb('vorabTitle')}
        badge={{ text: wb('vorabBadge'), color: '#22C55E' }}
      >
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 14 }}>
          {wb('vorabDesc')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {(['vorab1', 'vorab2', 'vorab3'] as const).map((k, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0 }}>✅</span>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.55 }}>{wb(k)}</p>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0 }}>⚠️</span>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.55 }}>{wb('vorab4')}</p>
          </div>
        </div>
        <a href="https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
          <ExternalLink size={12} /> {wb('vorabLink')}
        </a>
      </AccordionSection>

      {/* 2. Termini u ambasadi */}
      <AccordionSection
        id="embassy"
        isOpen={isOpen('embassy')}
        onToggle={() => toggle('embassy')}
        icon={<MapPin size={15} color="rgba(147,197,253,0.90)" />}
        title={`Termini — ${embassyName}`}
        badge={isKosovo ? { text: wb('kosovoMetricBadge'), color: '#F59E0B' } : { text: wb('embassyBadge'), color: '#60A5FA' }}
      >
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.65 }}>{embassyNote}</p>
        </div>
        {isKosovo ? (
          <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.30)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <AlertTriangle size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: 'rgba(252,211,77,0.90)', margin: 0, lineHeight: 1.60, fontWeight: 600 }}>
                {wb('kosovoWarning')}
              </p>
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: 'rgba(147,197,253,0.90)', margin: 0, lineHeight: 1.60 }}>
              {wb('embassyTip')}
            </p>
          </div>
        )}
        <a href={embassyUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
          <ExternalLink size={12} /> {wb('embassyOpenLink')}
        </a>
        {isKosovo && (
          <a href="https://www.visametric.com/Kosovo/Germany/de" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F59E0B', fontSize: 12, textDecoration: 'none', fontWeight: 600, marginLeft: 16 }}>
            <ExternalLink size={12} /> {wb('visametricLink')}
          </a>
        )}
      </AccordionSection>

      {/* 3. Korak-po-korak procedura */}
      <AccordionSection
        id="procedure"
        isOpen={isOpen('procedure')}
        onToggle={() => toggle('procedure')}
        icon={<span>🗺️</span>}
        title={wb('procedureTitle')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {procedureSteps.map((step) => (
            <div key={step.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ minWidth: 28, height: 28, borderRadius: '50%', background: GOLD, color: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, flexShrink: 0 }}>
                {step.n}
              </div>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.80)', margin: 0, lineHeight: 1.60, paddingTop: 4 }}>{step.text}</p>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(239,68,68,0.10)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '10px 14px', marginTop: 14 }}>
          <p style={{ fontSize: 12, color: 'rgba(252,165,165,0.90)', margin: 0, lineHeight: 1.55 }}>
            {wb('procedureWarning')}
          </p>
        </div>
      </AccordionSection>

      {/* 4. Ko može aplicirati i koji sektori */}
      <AccordionSection
        id="sectors"
        isOpen={isOpen('sectors')}
        onToggle={() => toggle('sectors')}
        icon={<Users size={15} color="rgba(167,243,208,0.90)" />}
        title={wb('sectorsTitle')}
      >
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 12 }}>
          {wb('sectorsDesc')}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {sectorKeys.map((k, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'rgba(255,255,255,0.80)' }}>{wb(k)}</div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.60, margin: 0 }}>
          {wb('sectorsCondition')}
        </p>
      </AccordionSection>

      {/* 5. Put ka stalnom boravku */}
      <AccordionSection
        id="path"
        isOpen={isOpen('path')}
        onToggle={() => toggle('path')}
        icon={<Shield size={15} color={GOLD} />}
        title={wb('pathTitle')}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, flexWrap: 'wrap', rowGap: 8 }}>
          {pathSteps.map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>{step.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.50)', marginTop: 3 }}>{step.sub}</div>
              </div>
              {i < arr.length - 1 && <ArrowRight size={14} color={GOLD} style={{ margin: '0 4px', flexShrink: 0 }} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pathReqs.map((k, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <CheckCircle size={13} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.55 }}>{wb(k)}</p>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* 6. Korisni linkovi */}
      <AccordionSection
        id="links"
        isOpen={isOpen('links')}
        onToggle={() => toggle('links')}
        icon={<ExternalLink size={14} color={GOLD} />}
        title={wb('linksTitle')}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {externalLinks.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', lineHeight: 1.45 }}>
              <ExternalLink size={13} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </AccordionSection>

    </div>
  );
};
