import { ExternalLink, FileText, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const GOLD = '#C9A84C';

interface FormSource {
  label: string;
  url: string;
}

interface FormMeta {
  agency: string;
  musterSlug?: string;
  onlineUrl?: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Optional: additional official sources to show alongside the primary one. */
  extraSources?: FormSource[];
  /** Optional: short hint shown under the sources block (e.g. "Formular se preuzima sa stranice lokalnog Jugendamt-a."). */
  sourceHint?: string;
}

/** Used as a safety net so every form always shows an "Zvanični izvor(i)" block. */
const DEFAULT_META: FormMeta = {
  agency: "Nadležna njemačka institucija",
  sourceLabel: "Bund.de — Verwaltungsportal",
  sourceUrl: "https://www.bund.de",
  sourceHint:
    "Formular se preuzima sa stranice nadležne lokalne ustanove (općina/Kreis/Land). Provjerite kod svog ureda za važeću verziju.",
};

const FORM_META: Record<string, FormMeta> = {
  "kindergeld":         { agency: "Familienkasse / BA",           musterSlug: "kindergeld",         sourceLabel: "Bundesagentur für Arbeit",     sourceUrl: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld" },
  "elterngeld":         { agency: "Elterngeldstelle",             musterSlug: "elterngeld",         sourceLabel: "Familienportal (BMFSFJ)",      sourceUrl: "https://familienportal.de" },
  "anmeldung":          { agency: "Einwohnermeldeamt",            musterSlug: "anmeldung",          sourceLabel: "Einwohnermeldeamt (lokal)",    sourceUrl: "https://www.bmi.bund.de" },
  "steuer-id":          { agency: "Bundeszentralamt f. Steuern",                                    sourceLabel: "bzst.de — Steuer-ID",          sourceUrl: "https://www.bzst.de" },
  "krankenkasse":       { agency: "GKV",                                                            sourceLabel: "GKV-Spitzenverband",           sourceUrl: "https://www.gkv-spitzenverband.de" },
  "hauptantrag":        { agency: "Jobcenter",                    musterSlug: "buergergeld",        sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "weiterbewilligung":  { agency: "Jobcenter",                    musterSlug: "buergergeld",        sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "wohngeld":           { agency: "Wohngeldstelle",               musterSlug: "wohngeld",           sourceLabel: "BMWSB — Wohngeld",             sourceUrl: "https://www.bmwsb.bund.de" },
  "bafoeg":             { agency: "Amt f. Ausbildungsförderung",  musterSlug: "bafoeg",             sourceLabel: "BAföG.de",                    sourceUrl: "https://www.bafoeg.de" },
  "schueler-bafoeg":    { agency: "Amt f. Ausbildungsförderung",  musterSlug: "schueler-bafoeg",    sourceLabel: "BAföG.de",                    sourceUrl: "https://www.bafoeg.de" },
  "fuehrungszeugnis":   { agency: "Bundesamt für Justiz",         musterSlug: "fuehrungszeugnis",   sourceLabel: "bundesjustizamt.de",           sourceUrl: "https://www.bundesjustizamt.de" },
  "kirchenaustritt":    { agency: "Amtsgericht (lokal)",          musterSlug: "kirchenaustritt",    sourceLabel: "Bund.de — Verwaltungsportal", sourceUrl: "https://www.bund.de", sourceHint: "Istupanje se prijavljuje lokalno (Standesamt ili Amtsgericht, zavisno od pokrajine) — provjeri kod svog grada." },
  "integrationskurs":   { agency: "BAMF",                         musterSlug: "integrationskurs",   sourceLabel: "bamf.de — Integrationskurs",   sourceUrl: "https://www.bamf.de" },
  "kinderzuschlag":     { agency: "Familienkasse",                musterSlug: "kinderzuschlag",     sourceLabel: "BA — Kinderzuschlag",          sourceUrl: "https://www.arbeitsagentur.de/kinderzuschlag" },
  "steuerklassenwechsel":{ agency: "Finanzamt",                   musterSlug: "steuerklasse",       sourceLabel: "Elster.de",                   sourceUrl: "https://www.elster.de" },
  "arbeitslosengeld":   { agency: "Agentur für Arbeit",           musterSlug: "arbeitslosengeld",   sourceLabel: "BA — ALG I",                  sourceUrl: "https://www.arbeitsagentur.de" },
  "mutterschaftsgeld":  { agency: "Krankenkasse / BA",                                              onlineUrl: "https://www.mutterschaftsgeld.de", sourceLabel: "Mutterschaftsgeld-Stelle",     sourceUrl: "https://www.mutterschaftsgeld.de" },
  "fuehrerschein":      { agency: "Fahrerlaubnisbehörde",                                           onlineUrl: "https://www.kba.de/DE/Themen/ZentraleRegister/FAER/faer_node.html", sourceLabel: "KBA — Führerschein",           sourceUrl: "https://www.kba.de" },
  "fahrzeugzulassung":  { agency: "Zulassungsstelle (lokal)",                                       onlineUrl: "https://www.kba.de/DE/Home/home_node.html", sourceLabel: "KBA — Fahrzeuge",              sourceUrl: "https://www.kba.de" },
  "grundsicherung":     { agency: "Sozialamt",                    musterSlug: "grundsicherung",     sourceLabel: "BMAS — Grundsicherung",        sourceUrl: "https://www.bmas.de" },
  "krippengeld-bayern": { agency: "Landesamt Bayern",                                               onlineUrl: "https://www.zbfs.bayern.de/familie/krippengeld/", sourceLabel: "Bayern.de",                   sourceUrl: "https://www.stmas.bayern.de" },
  "anlage-bb":          { agency: "Jobcenter",                    musterSlug: "anlage-bb",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-sv":          { agency: "Jobcenter",                    musterSlug: "anlage-sv",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-ve":          { agency: "Jobcenter",                    musterSlug: "anlage-ve",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-hg":          { agency: "Jobcenter",                    musterSlug: "anlage-hg",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-meb":         { agency: "Jobcenter",                    musterSlug: "anlage-meb",         sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-uf":          { agency: "Jobcenter",                    musterSlug: "anlage-uf",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-se":          { agency: "Jobcenter",                    musterSlug: "anlage-se",          sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-kdu":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-ek":          { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-eks":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-vm":          { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-wep":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-ki":          { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-uh1":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-uh2":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "anlage-uh3":         { agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "nichterreichbarkeit":{ agency: "Jobcenter",                                                      onlineUrl: "https://jobcenter.digital", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "arbeitsbescheinigung":{ agency: "Agentur für Arbeit",           musterSlug: "arbeitsbescheinigung", sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "antragsruecknahme":  { agency: "Jobcenter",                    musterSlug: "antragsruecknahme",  sourceLabel: "Jobcenter Digital — Online Antrag", sourceUrl: "https://jobcenter.digital" },
  "wirtschaftliche-jugendhilfe": {
    agency: "Jugendamt (lokal)",
    musterSlug: "wirtschaftliche-jugendhilfe",
    sourceLabel: "SGB VIII § 27 — Hilfe zur Erziehung (gesetze-im-internet.de)",
    sourceUrl: "https://www.gesetze-im-internet.de/sgb_8/__27.html",
    extraSources: [
      { label: "BMFSFJ — Kinder- und Jugendhilfe", url: "https://www.bmfsfj.de/bmfsfj/themen/kinder-und-jugend/kinder-und-jugendhilfe" },
      { label: "LWL — Wirtschaftliche Jugendhilfe", url: "https://www.lwl-landesjugendamt.de/de/unsere-handlungsfelder/wirtschaftliche-jugendhilfe-kostenerstattung/" },
    ],
    sourceHint:
      "Ne postoji jedinstveni federalni obrazac. Konkretan formular preuzima se sa stranice lokalnog Jugendamt-a (Stadt/Landkreis).",
  },
};

interface Props {
  activeSlug: string | null;
  formLabel?: string;
  formDesc?: string;
}

export default function FormRightPanel({ activeSlug, formLabel, formDesc }: Props) {
  const { t } = useTranslation("pages");
  const meta = activeSlug ? FORM_META[activeSlug] ?? DEFAULT_META : null;

  const panelStyle: React.CSSProperties = {
    width: 260,
    flexShrink: 0,
    background: '#FFFFFF',
    borderRadius: 14,
    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
    border: '1px solid #F0EAD8',
    position: 'sticky',
    top: 24,
    maxHeight: 'calc(100vh - 96px)',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  };

  // EMPTY STATE
  if (!activeSlug || !meta) return (
    <div style={panelStyle}>
      <div style={{ padding: 20 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Globe size={40} color={GOLD} style={{ margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: 13, color: '#6B6B6B', lineHeight: 1.6 }}>
            {t("guideFirst.panelEmpty")}
          </p>
        </div>
        <div style={{ borderTop: '1px solid #F0EAD8', paddingTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Korisni linkovi</p>
          {[
            { label: 'Bundesagentur für Arbeit', url: 'https://www.arbeitsagentur.de' },
            { label: 'BAMF', url: 'https://www.bamf.de' },
            { label: 'BMFSFJ — Familienportal', url: 'https://familienportal.de' },
            { label: 'Make it in Germany', url: 'https://www.make-it-in-germany.com' },
          ].map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, color: GOLD, fontSize: 12, textDecoration: 'none', marginBottom: 8 }}>
              <ExternalLink size={12} />{l.label}
            </a>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #F0EAD8', paddingTop: 12, marginTop: 4 }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5 }}>
            BalkanLink pruža informativne smjernice. Stand 2026.
          </p>
        </div>
      </div>
    </div>
  );

  // FORM SELECTED STATE
  return (
    <div style={panelStyle}>
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: '#FFF8EC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={14} color={GOLD} />
          </div>
          <span style={{ fontSize: 12, color: '#6B6B6B' }}>Formular</span>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', marginBottom: 4 }}>{formLabel}</h3>
        {formDesc && <p style={{ fontSize: 12, color: '#6B6B6B', marginBottom: 12, lineHeight: 1.5 }}>{formDesc}</p>}

        <div style={{ borderTop: '1px solid #F0EAD8', paddingTop: 12, marginBottom: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Nadležna institucija</p>
          <p style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600 }}>{meta.agency}</p>
        </div>


        {meta.onlineUrl && (
          <a
            href={meta.onlineUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 8, width: '100%', padding: '11px 14px', marginBottom: 12,
              background: '#1E293B', color: 'white', borderRadius: 9,
              fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}
          >
            🌐 Online zahtjev →
          </a>
        )}
        <div style={{ borderTop: '1px solid #F0EAD8', paddingTop: 12 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            {meta.extraSources && meta.extraSources.length > 0 ? 'Zvanični izvori' : 'Zvanični izvor'}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#4A4A4A', fontSize: 12, textDecoration: 'none', lineHeight: 1.4 }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = GOLD)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4A4A4A')}
            >
              <ExternalLink size={11} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>{meta.sourceLabel}</span>
            </a>
            {meta.extraSources?.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'flex-start', gap: 6, color: '#4A4A4A', fontSize: 12, textDecoration: 'none', lineHeight: 1.4 }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = GOLD)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#4A4A4A')}
              >
                <ExternalLink size={11} color={GOLD} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
          {meta.sourceHint && (
            <p style={{ fontSize: 11, color: '#6B6B6B', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
              {meta.sourceHint}
            </p>
          )}
        </div>

        <div style={{ borderTop: '1px solid #F0EAD8', paddingTop: 10, marginTop: 12 }}>
          <p style={{ fontSize: 11, color: '#9CA3AF', lineHeight: 1.5 }}>
            BalkanLink pruža informativne smjernice i ne predstavlja pravni savjet. Stand 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
