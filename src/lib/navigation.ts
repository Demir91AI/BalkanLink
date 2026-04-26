import type { NavigateFunction } from "react-router-dom";

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
 * Ako smo već na rootu, ostajemo tu.
 */
export function navigateBackOrHome(navigate: NavigateFunction) {
  const path = window.location.pathname.replace(/\/+$/, "");

  // Ukloni eventualni /de prefiks (i18n routing) prije računanja parent puta
  const stripped = path.replace(/^\/de(?=\/|$)/, "");

  if (!stripped || stripped === "/") {
    navigate("/");
    return;
  }

  const segments = stripped.split("/").filter(Boolean);
  segments.pop();
  const parent = segments.length ? "/" + segments.join("/") : "/";

  // Sačuvaj /de prefiks ako je bio prisutan
  const hadDePrefix = path.startsWith("/de/") || path === "/de";
  navigate(hadDePrefix && parent !== "/" ? "/de" + parent : parent);
}
