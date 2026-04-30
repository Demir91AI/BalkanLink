import type { NavigateFunction } from "react-router-dom";

/**
 * Posebna mapiranja za rute kod kojih "jedan segment unazad" ne vodi
 * na logičnog roditelja (jer parent ruta ne postoji ili pripada drugoj sekciji).
 *
 * Ključ = prefiks rute (bez završne kose crte, bez jezičkog prefiksa).
 * Vrijednost = stvarni roditeljski path na koji vraćamo.
 */
const PARENT_OVERRIDES: { prefix: string; parent: string; exact?: boolean }[] = [
  // Exact-match overrides (provjeravaju se prije prefix pravila)
  { prefix: "/musterformular/einbuergerung", parent: "/dvojno-drzavljanstvo/einbuergerung-vodic", exact: true },
  // Prefix overrides
  { prefix: "/musterformular", parent: "/formulari" },
  { prefix: "/firma", parent: "/directory" },
  { prefix: "/smart-guide", parent: "/formulari" },
  { prefix: "/guide", parent: "/formulari" },
  { prefix: "/admin/forms", parent: "/admin/forms" },
];

/** Podržani jezički prefiksi (proširivo). BS je default i nema prefiks. */
const LANG_PREFIXES = ["de", "hr", "sr"] as const;

/** Izdvoji jezički prefiks iz path-a (npr. "/de/foo" → { lang: "de", rest: "/foo" }). */
function extractLangPrefix(path: string): { lang: string | null; rest: string } {
  for (const lang of LANG_PREFIXES) {
    const re = new RegExp(`^/${lang}(?=/|$)`);
    if (re.test(path)) {
      return { lang, rest: path.replace(re, "") || "/" };
    }
  }
  return { lang: null, rest: path };
}

/** Spoji jezički prefiks nazad na izračunati parent path. */
function withLang(lang: string | null, parent: string): string {
  if (!lang) return parent;
  if (parent === "/" || parent === "") return `/${lang}`;
  return `/${lang}${parent}`;
}

/**
 * Hijerarhijska "Nazad" navigacija (breadcrumb stil).
 *
 * Pravila:
 *   - skida se jedan URL segment unazad (`/a/b/c` → `/a/b`)
 *   - jezički prefiks (`/de`) se očuva ali ne broji kao segment
 *   - PARENT_OVERRIDES za rute bez prirodnog parenta (`/musterformular/...` → `/formulari`)
 *   - trailing slash, query (`?...`) i hash (`#...`) se uredno čiste
 *   - ako smo na rootu (sa ili bez jezičkog prefiksa), ostajemo tu
 */
export function navigateBackOrHome(navigate: NavigateFunction) {
  // Uzmi samo pathname; ignoriši query/hash (oni ne utiču na hijerarhiju)
  let path = window.location.pathname || "/";

  // Skini trailing slash-eve (osim ako je sam root)
  path = path.replace(/\/{2,}/g, "/").replace(/\/+$/, "") || "/";

  // Izdvoji jezički prefiks
  const { lang, rest } = extractLangPrefix(path);
  const cleanRest = rest.replace(/\/+$/, "") || "/";

  // Već smo na rootu sekcije (sa ili bez jezika)
  if (cleanRest === "/" || cleanRest === "") {
    navigate(lang ? `/${lang}` : "/");
    return;
  }

  // 1) Posebna mapiranja
  for (const { prefix, parent } of PARENT_OVERRIDES) {
    if (cleanRest.startsWith(prefix + "/") && cleanRest !== prefix) {
      navigate(withLang(lang, parent));
      return;
    }
  }

  // 2) Default: skini posljednji segment
  const segments = cleanRest.split("/").filter(Boolean);
  segments.pop();
  const parent = segments.length ? "/" + segments.join("/") : "/";

  navigate(withLang(lang, parent));
}
