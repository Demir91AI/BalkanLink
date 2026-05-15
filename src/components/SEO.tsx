import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { stripLangPrefix } from '@/lib/i18n-paths';
import type { SupportedLanguage } from '@/i18n';

interface SEOProps {
  /** Direct title — takes priority over titleKey. */
  title?: string;
  /** Direct description — takes priority over descKey. */
  description?: string;
  /** i18n key for the title (e.g. 'pages:home.heroHeadline'). */
  titleKey?: string;
  /** i18n key for the description. */
  descKey?: string;
  /** Path to the page WITHOUT language prefix (BS canonical). e.g. '/dokumenten-check'. */
  path?: string;
  /** Open Graph type — defaults to 'website'. Use 'article' for guides/blog posts. */
  type?: 'website' | 'article';
}

const BASE_URL = 'https://www.balkanlink.de';
const OG_IMAGE = BASE_URL + '/og-image.jpg?v=20260430-2';

const DEFAULTS: Record<SupportedLanguage, { title: string; desc: string }> = {
  bs: {
    title: 'BalkanLink — Formulari, Viza i Savjeti za Balkance u Njemačkoj',
    desc: 'Sve što ti treba za život u Njemačkoj — musterformulari, viza navigator, asistent, deutsch kurs.',
  },
  de: {
    title: 'BalkanLink — Formulare, Visa und Wegweiser für Ihr Leben in Deutschland',
    desc: 'Alles, was Sie für das Leben in Deutschland brauchen — Musterformulare, Visa-Navigator, Assistent, Deutschkurs.',
  },
  hr: {
    title: 'BalkanLink — Obrasci, Vize i Savjeti za Balkance u Njemačkoj',
    desc: 'Sve što ti treba za život u Njemačkoj — musterformulari, viza navigator, asistent, deutsch tečaj.',
  },
  sr: {
    title: 'BalkanLink — Formulari, Vize i Saveti za Balkance u Nemačkoj',
    desc: 'Sve što ti treba za život u Nemačkoj — musterformulari, viza navigator, asistent, deutsch kurs.',
  },
};

const OG_LOCALE: Record<SupportedLanguage, string> = {
  bs: 'bs_BA',
  de: 'de_DE',
  hr: 'hr_HR',
  sr: 'sr_RS',
};

function buildHref(path: string, lang: SupportedLanguage): string {
  const p = stripLangPrefix(path);
  if (lang === 'bs') {
    return `${BASE_URL}${p === '/' ? '' : p}` || BASE_URL;
  }
  if (p === '/' || p === '') return `${BASE_URL}/${lang}`;
  return `${BASE_URL}/${lang}${p}`;
}

const SUPPORTED: SupportedLanguage[] = ['bs', 'de', 'hr', 'sr'];

export const SEO = ({ title, description, titleKey, descKey, path = '', type = 'website' }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const raw = i18n.language as string;
  const lang: SupportedLanguage = (SUPPORTED as string[]).includes(raw)
    ? (raw as SupportedLanguage)
    : 'bs';

  const resolvedTitle = title ?? (titleKey ? t(titleKey) : DEFAULTS[lang].title);
  const resolvedDesc = description ?? (descKey ? t(descKey) : DEFAULTS[lang].desc);
  const fullTitle =
    resolvedTitle && resolvedTitle !== DEFAULTS[lang].title
      ? `${resolvedTitle} | BalkanLink`
      : DEFAULTS[lang].title;

  const canonical = buildHref(path, lang);
  const bsHref = buildHref(path, 'bs');

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates — one per supported language + x-default → BS */}
      {SUPPORTED.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={buildHref(path, l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={bsHref} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BalkanLink" />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {SUPPORTED.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};
