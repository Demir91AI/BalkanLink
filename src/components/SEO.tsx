import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { stripGermanPrefix } from '@/lib/i18n-paths';

interface SEOProps {
  /** Direct title — takes priority over titleKey. */
  title?: string;
  /** Direct description — takes priority over descKey. */
  description?: string;
  /** i18n key for the title (e.g. 'pages:home.heroHeadline'). */
  titleKey?: string;
  /** i18n key for the description. */
  descKey?: string;
  /** Path to the page WITHOUT /de prefix (BS canonical). e.g. '/dokumenten-check'. */
  path?: string;
}

const BASE_URL = 'https://www.balkanlink.de';
const OG_IMAGE = BASE_URL + '/og-image.png';

const DEFAULTS = {
  bs: {
    title: 'BalkanLink — Formulari, Viza i Savjeti za Balkance u Njemačkoj',
    desc: 'Sve što ti treba za život u Njemačkoj — musterformulari, viza navigator, asistent, deutsch kurs.',
  },
  de: {
    title: 'BalkanLink — Formulare, Visa und Wegweiser für Ihr Leben in Deutschland',
    desc: 'Alles, was Sie für das Leben in Deutschland brauchen — Musterformulare, Visa-Navigator, Assistent, Deutschkurs.',
  },
} as const;

function buildBsHref(path: string): string {
  const p = stripGermanPrefix(path);
  return `${BASE_URL}${p === '/' ? '' : p}` || BASE_URL;
}

function buildDeHref(path: string): string {
  const p = stripGermanPrefix(path);
  if (p === '/' || p === '') return `${BASE_URL}/de`;
  return `${BASE_URL}/de${p}`;
}

export const SEO = ({ title, description, titleKey, descKey, path = '' }: SEOProps) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'de' ? 'de' : 'bs') as 'bs' | 'de';

  const resolvedTitle = title ?? (titleKey ? t(titleKey) : DEFAULTS[lang].title);
  const resolvedDesc = description ?? (descKey ? t(descKey) : DEFAULTS[lang].desc);
  const fullTitle =
    resolvedTitle && resolvedTitle !== DEFAULTS[lang].title
      ? `${resolvedTitle} | BalkanLink`
      : DEFAULTS[lang].title;

  const bsHref = buildBsHref(path);
  const deHref = buildDeHref(path);
  const canonical = lang === 'de' ? deHref : bsHref;
  const ogLocale = lang === 'de' ? 'de_DE' : 'bs_BA';
  const ogLocaleAlt = lang === 'de' ? 'bs_BA' : 'de_DE';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={resolvedDesc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* hreflang alternates */}
      <link rel="alternate" hrefLang="bs" href={bsHref} />
      <link rel="alternate" hrefLang="de" href={deHref} />
      <link rel="alternate" hrefLang="x-default" href={bsHref} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={resolvedDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BalkanLink" />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={ogLocaleAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={resolvedDesc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};
