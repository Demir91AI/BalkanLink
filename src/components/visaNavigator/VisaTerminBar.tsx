/**
 * VisaTerminBar — sticky bar sa direktnim linkovima na rktermin sistem
 * njemačkih ambasada u zemljama Balkana. Termin je #1 pain point.
 *
 * URL-ovi vode na zvanični Auswärtiges Amt rktermin booking sistem.
 * locationCode-ovi su standardni (sara, belg, podg, skop, pris, tira).
 */

const EMBASSIES = [
  { flag: "🇧🇦", city: "Sarajevo", country: "BiH",   code: "sarajew" },
  { flag: "🇷🇸", city: "Beograd",  country: "Srbija", code: "belgrad" },
  { flag: "🇲🇪", city: "Podgorica", country: "Crna Gora", code: "podgorica" },
  { flag: "🇲🇰", city: "Skoplje",  country: "S. Makedonija", code: "skopje" },
  { flag: "🇽🇰", city: "Priština", country: "Kosovo", code: "pristina" },
  { flag: "🇦🇱", city: "Tirana",   country: "Albanija", code: "tirana" },
];

const RKTERMIN_BASE =
  "https://service2.diplo.de/rktermin/extern/choose_realmList.do?locationCode=";

export default function VisaTerminBar() {
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
      </div>
      <div style={{ fontSize: 11, color: "#CBD5E1", marginBottom: 10, lineHeight: 1.5 }}>
        Termin je obavezan korak prije bilo kakvog podnošenja. Klik → zvanični{" "}
        <code style={{ background: "#1E293B", padding: "1px 6px", borderRadius: 4, color: "#E2E8F0" }}>
          service2.diplo.de
        </code>{" "}
        rktermin sistem Auswärtiges Amt-a. Čekanje 1–8 mjeseci — što ranije, to bolje.
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {EMBASSIES.map((e) => (
          <a
            key={e.code}
            href={RKTERMIN_BASE + e.code}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(252, 211, 77, 0.12)",
              border: "1px solid rgba(252, 211, 77, 0.4)",
              color: "#FCD34D",
              padding: "8px 12px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={(ev) => {
              ev.currentTarget.style.background = "rgba(252, 211, 77, 0.22)";
              ev.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(ev) => {
              ev.currentTarget.style.background = "rgba(252, 211, 77, 0.12)";
              ev.currentTarget.style.transform = "translateY(0)";
            }}
            title={`Njemačka ambasada ${e.city} (${e.country}) — rktermin`}
          >
            <span style={{ fontSize: 14 }}>{e.flag}</span>
            <span>{e.city}</span>
          </a>
        ))}
      </div>
      <div style={{ marginTop: 10, fontSize: 10, color: "#94A3B8", fontStyle: "italic" }}>
        💡 Tip: Termini se otvaraju ponedjeljkom ujutro (CET). Provjeri svaki dan u 7:00–8:00h.
      </div>
    </div>
  );
}
