/**
 * VisaTerminBar — sticky bar sa direktnim linkovima na rktermin sistem
 * njemačkih ambasada u zemljama Balkana. Termin je #1 pain point.
 *
 * URL-ovi vode na zvanični Auswärtiges Amt rktermin booking sistem.
 * locationCode-ovi su standardni (sara, belg, podg, skop, pris, tira).
 *
 * Ako je `highlightCountry` proslijeđen (npr. 'rs', 'me', 'mk'...) —
 * ta ambasada se prikazuje PRVA + ima naglašen stil, ostale ostaju
 * dostupne kao fallback. Country se može auto-detektovati iz
 * `loadVisaProfile().staatsangehoerigkeit` ako prop nije zadan.
 */
import { loadVisaProfile } from "@/lib/visa-shared-profile";

const EMBASSIES = [
  { code: "sarajew",   flag: "🇧🇦", city: "Sarajevo",  country: "BiH",            match: ["ba", "bih", "bosna", "bosnien"] },
  { code: "belgrad",   flag: "🇷🇸", city: "Beograd",   country: "Srbija",         match: ["rs", "srb", "srbija", "serbien"] },
  { code: "podgorica", flag: "🇲🇪", city: "Podgorica", country: "Crna Gora",      match: ["me", "mne", "crna", "montenegro"] },
  { code: "skopje",    flag: "🇲🇰", city: "Skoplje",   country: "S. Makedonija",  match: ["mk", "mkd", "makedonija", "nordmazedonien"] },
  { code: "pristina",  flag: "🇽🇰", city: "Priština",  country: "Kosovo",         match: ["xk", "kos", "kosovo"] },
  { code: "tirana",    flag: "🇦🇱", city: "Tirana",    country: "Albanija",       match: ["al", "alb", "albanija", "albanien"] },
];

const RKTERMIN_BASE =
  "https://service2.diplo.de/rktermin/extern/choose_realmList.do?locationCode=";

function detectCountryFromProfile(): string | null {
  try {
    const p = loadVisaProfile();
    const s = (p?.staatsangehoerigkeit || "").toLowerCase().trim();
    if (!s) return null;
    for (const e of EMBASSIES) {
      if (e.match.some((m) => s.includes(m))) return e.code;
    }
  } catch {}
  return null;
}

interface Props {
  /** Embassy code (sarajew/belgrad/podgorica/skopje/pristina/tirana) to highlight + prioritize. */
  highlightCountry?: string;
}

export default function VisaTerminBar({ highlightCountry }: Props) {
  const active = (highlightCountry || detectCountryFromProfile() || "").toLowerCase();
  const sorted = active
    ? [...EMBASSIES].sort((a, b) => (a.code === active ? -1 : b.code === active ? 1 : 0))
    : EMBASSIES;
  const matched = EMBASSIES.find((e) => e.code === active);

  return (
    <div
      className="no-print"
      style={{
        marginBottom: 14,
        padding: 14,
        background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
        border: "1.5px solid #334155",
        borderRadius: 10,
        boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 13,
          color: "#FCD34D",
          marginBottom: 4,
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        🗓️ Zakaži termin direktno u njemačkoj ambasadi
        {matched && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              background: "rgba(252, 211, 77, 0.22)",
              border: "1px solid rgba(252, 211, 77, 0.5)",
              color: "#FCD34D",
              padding: "2px 8px",
              borderRadius: 999,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            Tvoja: {matched.city}
          </span>
        )}
      </div>
      <div style={{ fontSize: 11, color: "#CBD5E1", marginBottom: 10, lineHeight: 1.5 }}>
        Termin je obavezan korak prije bilo kakvog podnošenja. Klik → zvanični{" "}
        <code style={{ background: "#1E293B", padding: "1px 6px", borderRadius: 4, color: "#E2E8F0" }}>
          service2.diplo.de
        </code>{" "}
        rktermin sistem Auswärtiges Amt-a. Čekanje 1–8 mjeseci — što ranije, to bolje.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {sorted.map((e) => {
          const isActive = e.code === active;
          return (
            <a
              key={e.code}
              href={RKTERMIN_BASE + e.code}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: isActive ? "rgba(252, 211, 77, 0.28)" : "rgba(252, 211, 77, 0.12)",
                border: isActive ? "1.5px solid #FCD34D" : "1px solid rgba(252, 211, 77, 0.4)",
                color: "#FCD34D",
                padding: isActive ? "9px 14px" : "8px 12px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: isActive ? 800 : 600,
                textDecoration: "none",
                transition: "all 0.15s ease",
                boxShadow: isActive ? "0 0 0 2px rgba(252, 211, 77, 0.18)" : "none",
              }}
              onMouseEnter={(ev) => {
                ev.currentTarget.style.background = "rgba(252, 211, 77, 0.32)";
                ev.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(ev) => {
                ev.currentTarget.style.background = isActive ? "rgba(252, 211, 77, 0.28)" : "rgba(252, 211, 77, 0.12)";
                ev.currentTarget.style.transform = "translateY(0)";
              }}
              title={`Njemačka ambasada ${e.city} (${e.country}) — rktermin`}
            >
              <span style={{ fontSize: 14 }}>{e.flag}</span>
              <span>{e.city}</span>
              {isActive && <span style={{ fontSize: 10, marginLeft: 2 }}>★</span>}
            </a>
          );
        })}
      </div>
      <div style={{ marginTop: 10, fontSize: 10, color: "#94A3B8", fontStyle: "italic" }}>
        💡 Tip: Termini se otvaraju ponedjeljkom ujutro (CET). Provjeri svaki dan u 7:00–8:00h.
      </div>
    </div>
  );
}
