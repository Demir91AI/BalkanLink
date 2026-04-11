import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const BASE_URL = 'https://www.balkanlink.de';
const OG_IMAGE = BASE_URL + '/og-image.png';
const DEFAULT_TITLE = 'BalkanLink — Dein Wegweiser durch das deutsche System';
const DEFAULT_DESC = 'Formulare, Visa-Navigator, KI-Assistent, Deutschkurs und Community für das Leben in Deutschland.';

export const SEO = ({ title, description, path = '' }: SEOProps) => {
  const fullTitle = title ? `${title} | BalkanLink` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="BalkanLink" />
      <meta property="og:locale" content="de_DE" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};
