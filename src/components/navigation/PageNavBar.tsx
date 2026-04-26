import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";

interface Props {
  onBack?: () => void;
  inline?: boolean;
  /** Override auto-derived breadcrumb labels for specific path segments */
  labelOverrides?: Record<string, string>;
  /** Hide the breadcrumb trail (only show Nazad/Početna) */
  hideBreadcrumbs?: boolean;
}

// Default mapping for known route segments → human-readable Bosnian labels
const DEFAULT_LABELS: Record<string, string> = {
  formulari: "Formulari",
  dolazak: "Dolazak u Njemačku",
  "pocni-ovdje": "Počni ovdje",
  viza: "Viza",
  "deutsch-trainer": "Deutsch Trainer",
  "dokumenten-check": "Provjera dokumenata",
  "nudim-trazim": "Nudim / Tražim",
  "radno-pravo": "Radno pravo",
  biznis: "Biznis u Njemačkoj",
  stellenangebote: "Poslovi",
  wohnungen: "Stanovi",
  kalkulatori: "Kalkulatori",
  vorlagen: "Šabloni",
  familie: "Porodica",
  foerderungen: "Podrške",
  premium: "Premium",
  paketi: "Paketi",
  qa: "Pitanja i odgovori",
  directory: "Imenik",
  ambasade: "Ambasade",
  "ambasade-konzulati": "Ambasade i konzulati",
  "nach-deutschland": "U Njemačku",
  "zivot-savjeti": "Život – savjeti",
  "trebam-pomoc": "Trebam pomoć",
  mietrecht: "Mietrecht",
  generatoren: "Generatori",
  "brutto-netto-rechner": "Brutto / Netto",
  bussgeld: "Bussgeld",
  mitgliedschaft: "Članstvo",
  impressum: "Impressum",
  datenschutz: "Zaštita podataka",
  disclaimer: "Disclaimer",
  agb: "Uslovi korištenja",
  nutzungsbedingungen: "Uslovi korištenja",
  "ki-hinweis": "Napomena o asistentu",
  "cookie-richtlinie": "Kolačići",
  dsa: "DSA",
  profil: "Profil",
  "moji-podaci": "Moji podaci",
  "historija-placanja": "Historija plaćanja",
  missions: "Ambasade",
  // dolazak children
  "prijava-prebivalista": "Prijava prebivališta",
  "boravisna-dozvola": "Boravišna dozvola",
  "steuer-id-i-porezna-klasa": "Steuer-ID / porezna klasa",
  "zdravstveno-osiguranje": "Zdravstveno osiguranje",
  "bankovni-racun": "Bankovni račun",
  "prvi-koraci": "Prvi koraci",
  sozialversicherung: "Socijalno osiguranje",
  rundfunkbeitrag: "Rundfunkbeitrag",
  fuehrerschein: "Vozačka dozvola",
  "auto-anmelden": "Registracija auta",
};

function humanize(segment: string): string {
  return decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PageNavBar({ onBack, inline, labelOverrides, hideBreadcrumbs }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigateBackOrHome(navigate);
    }
  };

  // Build breadcrumb segments (strip optional /de prefix)
  const rawPath = location.pathname.replace(/\/+$/, "");
  const stripped = rawPath.replace(/^\/de(?=\/|$)/, "");
  const hadDePrefix = rawPath.startsWith("/de/") || rawPath === "/de";
  const segments = stripped.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const subPath = "/" + segments.slice(0, idx + 1).join("/");
    const href = hadDePrefix ? "/de" + subPath : subPath;
    const label =
      labelOverrides?.[seg] ?? DEFAULT_LABELS[seg] ?? humanize(seg);
    return { label, href, isLast: idx === segments.length - 1 };
  });

  return (
    <div className={inline ? "" : "mb-4"}>
      {/* Row 1: Back + Home */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleBack}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]"
        >
          <ChevronLeft className="h-4 w-4" />
          Nazad
        </button>
        <button
          onClick={() => navigate(hadDePrefix ? "/de" : "/")}
          className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]"
        >
          <Home className="h-4 w-4" />
          Početna
        </button>
      </div>

      {/* Row 2: Breadcrumb trail */}
      {!hideBreadcrumbs && crumbs.length > 0 && (
        <nav
          aria-label="breadcrumb"
          className="mt-2 flex flex-wrap items-center gap-1 px-3 text-[12px]"
        >
          <button
            onClick={() => navigate(hadDePrefix ? "/de" : "/")}
            className="font-medium text-[#8a8a8a] hover:text-[#2D2D2D] transition-colors"
          >
            Početna
          </button>
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3 text-[#bdbdbd]" />
              {c.isLast ? (
                <span className="font-semibold text-[#2D2D2D]" aria-current="page">
                  {c.label}
                </span>
              ) : (
                <button
                  onClick={() => navigate(c.href)}
                  className="font-medium text-[#8a8a8a] hover:text-[#2D2D2D] transition-colors"
                >
                  {c.label}
                </button>
              )}
            </span>
          ))}
        </nav>
      )}
    </div>
  );
}
