import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Globalni scroll-to-top na svaku promjenu rute.
 *
 * - Pokreće se na SVAKU promjenu pathname (uključujući POP, PUSH, REPLACE)
 *   jer korisnik očekuje da svaka navigacija u novu sekciju počne s vrha.
 * - Koristi `requestAnimationFrame` da osigura da je novi sadržaj montiran
 *   prije scroll poziva (inače se desi da `min-h-screen` layout pomjeri
 *   scroll poziciju nakon scrollTo).
 * - `behavior: "auto"` = instant scroll bez animacije (validna alternativa
 *   za "instant" koji nije u svim tipovima).
 * - Onemogućava browser native scroll restoration jer ona zna vratiti
 *   korisnika na dno prethodne stranice.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Dvostruki rAF: prvi čeka commit, drugi čeka layout/paint.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        // Fallback za neke mobilne browsere
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return null;
}
