import React, { useState } from 'react';
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
  const [openSections, setOpenSections] = useState<string[]>(['vorabzustimmung', 'procedure']);
  const toggle = (id: string) => setOpenSections(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  const isOpen = (id: string) => openSections.includes(id);

  const isKosovo = countryCode === 'xk';

  const stats = [
    { label: 'Godišnji kontingent', value: '50.000', sub: 'viza za sve WB zemlje zajedno' },
    { label: 'Trajanje zakona', value: 'Trajno', sub: 'bez roka isteka' },
    { label: 'Provjera prioriteta', value: 'NEMA', sub: 'Vorrangprüfung ukinuta' },
    { label: 'Kvalifikacije', value: 'NISU', sub: 'bez nostrifikacije' },
  ];

  const procedureSteps = [
    { n: 1, text: 'Pronađeš posao — njemacki poslodavac ti daje ugovor ili obavezujuću ponudu posla' },
    { n: 2, text: 'Poslodavac traži Vorabzustimmung na arbeitsagentur.de/westbalkanregelung — dobijaš Kundennummer' },
    { n: 3, text: 'Sa Kundennummer zakažeš termin u ambasadi (prioritetni red, brže nego bez Vorabzustimmung)' },
    { n: 4, text: 'Predaješ EzB (popunjava POSLODAVAC, ne ti!), Vorabzustimmung, pasoš, 2 digitalne biometrijske fotografije' },
    { n: 5, text: 'Platiš 75 € vizne naknade i čekaš 4–8 sedmica na D-vizu' },
    { n: 6, text: 'Ulaziš u Njemačku — u roku 14 dana obavezna Anmeldung (prijava adrese) u Einwohnermeldeamt' },
    { n: 7, text: 'PRIJE isteka D-vize — apliciraš za Aufenthaltserlaubnis §18 u lokalnoj Ausländerbehörde (100–110 €)' },
  ];

  return (
    <div style={{ background: 'linear-gradient(145deg, rgba(201,168,76,0.09) 0%, rgba(201,168,76,0.03) 100%)', border: '1.5px solid rgba(201,168,76,0.38)', borderRadius: 16, marginBottom: 20, overflow: 'hidden' }}>

      {/* HEADER */}
      <div style={{ background: 'rgba(201,168,76,0.13)', borderBottom: '1px solid rgba(201,168,76,0.22)', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', flexShrink: 0 }} />
          <Zap size={16} color={GOLD} />
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'rgba(252,211,77,0.97)', margin: 0, letterSpacing: '0.03em' }}>
            WESTBALKAN-REGELUNG — AKTIVAN
          </h2>
          <span style={{ background: 'rgba(34,197,94,0.18)', color: '#4ADE80', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, marginLeft: 'auto' }}>
            § 26 Abs. 2 BeschV
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', margin: '10px 0 0', lineHeight: 1.65 }}>
          Poseban zakon koji ti omogućava rad u Njemačkoj <strong style={{ color: 'rgba(252,211,77,0.90)' }}>bez priznatih kvalifikacija</strong> i <strong style={{ color: 'rgba(252,211,77,0.90)' }}>bez provjere prioriteta</strong> — vrijedi za BiH, Srbiju, Crnu Goru, Sjevernu Makedoniju, Albaniju i Kosovo.
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

      {/* ACCORDION SECTIONS */}

      {/* 1. Vorabzustimmung */}
      <AccordionSection
        id="vorabzustimmung"
        isOpen={isOpen('vorabzustimmung')}
        onToggle={() => toggle('vorabzustimmung')}
        icon={<span>⚡</span>}
        title="Vorabzustimmung — Ključna novina od juna 2024"
        badge={{ text: 'PREPORUČENO', color: '#22C55E' }}
      >
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 14 }}>
          <strong style={{ color: CHARCOAL }}>Vorabzustimmung</strong> = prethodna saglasnost Bundesagentur für Arbeit (BA). Tvoj njemacki poslodavac je traži <strong style={{ color: 'rgba(252,211,77,0.90)' }}>ONLINE, PRIJE nego što ti zakažeš termin</strong> u ambasadi.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
          {[
            { icon: '✅', text: 'Sa Vorabzustimmung dobijaš Kundennummer → prioritetno zakazivanje termina u ambasadi' },
            { icon: '✅', text: 'Brža obrada zahtjeva — ambasada ima zaseban red za prijave s Vorabzustimmung' },
            { icon: '✅', text: 'Manji rizik odbijanja — BA je već odobrila zaposlenje' },
            { icon: '⚠️', text: 'Bez Vorabzustimmung: moraš čekati losverfahren (izvlačenje termina) — mnogo sporije!' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.55 }}>{item.text}</p>
            </div>
          ))}
        </div>
        <a href="https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung"
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
          <ExternalLink size={12} /> arbeitsagentur.de — Vorabzustimmung
        </a>
      </AccordionSection>

      {/* 2. Termini u ambasadi */}
      <AccordionSection
        id="embassy"
        isOpen={isOpen('embassy')}
        onToggle={() => toggle('embassy')}
        icon={<MapPin size={15} color="rgba(147,197,253,0.90)" />}
        title={`Termini — ${embassyName}`}
        badge={isKosovo ? { text: 'VisaMetric', color: '#F59E0B' } : { text: 'TAGESAKTUELL', color: '#60A5FA' }}
      >
        <div style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.65 }}>{embassyNote}</p>
        </div>
        {isKosovo ? (
          <div style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.30)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <AlertTriangle size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: 'rgba(252,211,77,0.90)', margin: 0, lineHeight: 1.60, fontWeight: 600 }}>
                KOSOVO: Vize se apliciraju ISKLJUČIVO kroz VisaMetric — nikako direktno u ambasadu! Naknada: 30 € + 30 € dostava pasoša DHL-om.
              </p>
            </div>
          </div>
        ) : (
          <div style={{ background: 'rgba(59,130,246,0.10)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
            <p style={{ fontSize: 13, color: 'rgba(147,197,253,0.90)', margin: 0, lineHeight: 1.60 }}>
              💡 <strong>Kako provjeriti termine:</strong> Otvori ambasadinu stranicu svako jutro rano (između 7–9h). Termini se objavljuju tagesaktuell — isti dan i nestaju brzo. Preporučujemo: postavi podsjetnik na telefonu svako jutro.
            </p>
          </div>
        )}
        <a href={embassyUrl}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>
          <ExternalLink size={12} /> Otvori stranicu ambasade
        </a>
        {isKosovo && (
          <a href="https://www.visametric.com/Kosovo/Germany/de"
            target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#F59E0B', fontSize: 12, textDecoration: 'none', fontWeight: 600, marginLeft: 16 }}>
            <ExternalLink size={12} /> VisaMetric Kosovo
          </a>
        )}
      </AccordionSection>

      {/* 3. Korak-po-korak procedura */}
      <AccordionSection
        id="procedure"
        isOpen={isOpen('procedure')}
        onToggle={() => toggle('procedure')}
        icon={<span>🗺️</span>}
        title="Korak-po-korak procedura"
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
            ⚠️ <strong>Najčešća greška:</strong> Početi raditi s D-vizom bez Aufenthaltserlaubnisa — krivično djelo! Uvijek aplicirati za Aufenthaltserlaubnis PRIJE isteka D-vize.
          </p>
        </div>
      </AccordionSection>

      {/* 4. Ko može aplicirati i koji sektori */}
      <AccordionSection
        id="sectors"
        isOpen={isOpen('sectors')}
        onToggle={() => toggle('sectors')}
        icon={<Users size={15} color="rgba(167,243,208,0.90)" />}
        title="Ko može aplicirati i koji sektori?"
      >
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: 12 }}>
          Westbalkan-Regelung vrijedi za <strong style={{ color: CHARCOAL }}>SVE sektore</strong> — nema ograničenja na određenu djelatnost:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 14 }}>
          {['🔨 Građevina', '🍽️ Gastro / hoteli', '🏥 Njega i zdravstvo', '🚛 Logistika i transport', '🏭 Industrija i proizvodnja', '💻 IT i tehnologija', '🧹 Čišćenje i servis', '🌾 Poljoprivreda'].map((s, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.20)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'rgba(255,255,255,0.80)' }}>{s}</div>
          ))}
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.60, margin: 0 }}>
          <strong style={{ color: 'rgba(252,211,77,0.90)' }}>Jedini uslov:</strong> imaš posao s njemackim poslodavcem koji ti daje ugovor. Kvalifikacije, diploma, prethodno iskustvo — nije obavezno.
        </p>
      </AccordionSection>

      {/* 5. Put ka stalnom boravku */}
      <AccordionSection
        id="path"
        isOpen={isOpen('path')}
        onToggle={() => toggle('path')}
        icon={<Shield size={15} color={GOLD} />}
        title="Put ka stalnom boravku"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 16, flexWrap: 'wrap', rowGap: 8 }}>
          {[
            { label: 'Westbalkan viza', sub: 'D-viza, 6 mj.' },
            { label: 'Aufenthaltserlaubnis', sub: '§18, 1–2 god.' },
            { label: 'Obnova AE', sub: 'svake 2 god.' },
            { label: 'Niederlassungserlaubnis', sub: 'nakon 5 god. + B1' },
          ].map((step, i, arr) => (
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
          {[
            '5 godina zakonitog boravka u Njemačkoj',
            'Položen B1 njemacki (integracijski kurs ili vanjski ispit)',
            'Min. 60 mjeseci penzijskog osiguranja (DRV)',
            'Osigurana egzistencija bez socijalne pomoći',
            'Apliciraj za Niederlassungserlaubnis §9 i Daueraufenthalt-EU §9a ISTOVREMENO!',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <CheckCircle size={13} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.78)', margin: 0, lineHeight: 1.55 }}>{item}</p>
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
        title="Korisni eksterni linkovi"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Bundesagentur für Arbeit — Westbalkanregelung (poslodavac traži Vorabzustimmung ovdje)', url: 'https://www.arbeitsagentur.de/unternehmen/fachkraefte-ausland/westbalkanregelung' },
            { label: 'Make it in Germany — Westbalkan informacije', url: 'https://www.make-it-in-germany.com/de/visum-aufenthalt' },
            { label: 'BAMF — Arbeit §18 AufenthG', url: 'https://www.bamf.de/DE/Themen/MigrationAufenthalt/ZuwandererDrittstaaten/Arbeit/arbeit-node.html' },
            { label: 'Gesetze im Internet — § 26 BeschV (originalni zakon)', url: 'https://www.gesetze-im-internet.de/beschv_2013/__26.html' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', lineHeight: 1.45 }}>
              <ExternalLink size={13} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{link.label}</span>
            </a>
          ))}
          <a href={embassyUrl} target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: GOLD, fontSize: 13, textDecoration: 'none', lineHeight: 1.45 }}>
            <ExternalLink size={13} style={{ flexShrink: 0, marginTop: 2 }} />
            <span>{embassyName} — termini i informacije</span>
          </a>
        </div>
      </AccordionSection>

    </div>
  );
};
