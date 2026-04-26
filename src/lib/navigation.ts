import type { NavigateFunction } from "react-router-dom";

/**
 * Posebna mapiranja za rute kod kojih "jedan segment unazad" ne vodi
 * na logičnog roditelja (jer parent ruta ne postoji ili pripada drugoj sekciji).
 *
 * Ključ = prefiks rute (bez završne kose crte, bez /de prefiksa).
 * Vrijednost = stvarni roditeljski path na koji vraćamo.
 *
 * Primjeri:
 *   /musterformular/kindergeld   → /formulari   (nema /musterformular index stranice)
 *   /firma/neka-firma            → /directory   (nema /firma index)
 */
const PARENT_OVERRIDES: { prefix: string; parent: string }[] = [
  { prefix: "/musterformular", parent: "/formulari" },
  { prefix: "/firma", parent: "/directory" },
  { prefix: "/smart-guide", parent: "/formulari" },
  { prefix: "/guide", parent: "/formulari" },
  { prefix: "/admin/forms", parent: "/admin/forms" }, // /admin/forms/:slug/mapper → /admin/forms
];

/**
 * Hijerarhijska "Nazad" navigacija (breadcrumb stil).
 *
 * Umjesto pravog browser back-a (koji može preskočiti više nivoa odjednom
 * ako korisnik jednim klikom dođe do duboke stranice), ova funkcija ide
 * jedan segment URL-a unazad:
 *   /formulari/krankenkasse  →  /formulari
 *   /formulari               →  /
 *   /dolazak/anmeldung       →  /dolazak
 *
 * Posebne rute (vidi PARENT_OVERRIDES) imaju eksplicitno definisanog roditelja.
 *
 * Ako smo već na rootu, ostajemo tu.
 */
export function navigateBackOrHome(navigate: NavigateFunction) {
  const path = window.location.pathname.replace(/\/+$/, "");

  // Ukloni eventualni /de prefiks (i18n routing) prije računanja parent puta
  const stripped = path.replace(/^\/de(?=\/|$)/, "");
  const hadDePrefix = path.startsWith("/de/") || path === "/de";

  if (!stripped || stripped === "/") {
    navigate("/");
    return;
  }

  // 1) Provjeri posebna mapiranja
  for (const { prefix, parent } of PARENT_OVERRIDES) {
    // Mora biti striktni "child" — npr. /musterformular/xyz, ne sam /musterformular
    if (stripped.startsWith(prefix + "/") && stripped !== prefix) {
      const target = hadDePrefix && parent !== "/" ? "/de" + parent : parent;
      navigate(target);
      return;
    }
  }

  // 2) Default: skini posljednji segment
  const segments = stripped.split("/").filter(Boolean);
  segments.pop();
  const parent = segments.length ? "/" + segments.join("/") : "/";

  navigate(hadDePrefix && parent !== "/" ? "/de" + parent : parent);
}
