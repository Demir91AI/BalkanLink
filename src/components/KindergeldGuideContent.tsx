import { useNavigate } from "react-router-dom";
import { AlertTriangle, ClipboardList, PenLine, Clock } from "lucide-react";

export default function KindergeldGuideContent() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* ─── DIO 1: Info header ─── */}
      <div className="space-y-4">
        <div>
          <h1 className="font-heading text-xl font-extrabold sm:text-2xl">Dječji dodatak (Kindergeld)</h1>
          <p className="mt-1 text-xs text-muted-foreground">Izvor: Familienkasse pri Saveznoj agenciji za rad</p>
          <p className="mt-0.5 text-xs text-muted-foreground">Formular: Zahtjev za dječji dodatak (KG1)</p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko može podnijeti zahtjev
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Roditelji sa prebivalištem u Njemačkoj, za svako dijete do 18. godine (do 25. uz školovanje).
          </p>
          <p className="mt-3 text-xs">
            <span className="font-semibold flex items-center gap-1">
              <Clock className="h-3 w-3" /> Vrijeme obrade:
            </span>
            <span className="text-muted-foreground">4–6 sedmica od podnošenja zahtjeva.</span>
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Šta treba pripremiti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-muted-foreground">Popunjen obrazac KG1</li>
            <li className="text-xs text-muted-foreground">Rodni list djeteta (original ili ovjerena kopija)</li>
            <li className="text-xs text-muted-foreground">Prijava prebivališta (Meldebescheinigung)</li>
            <li className="text-xs text-muted-foreground">Steuer-ID roditelja i djeteta</li>
            <li className="text-xs text-muted-foreground">Kopija pasoša ili lične karte</li>
            <li className="text-xs text-muted-foreground">Boravišna dozvola (ako ste iz ne-EU zemlje)</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            <li className="text-xs text-red-600 dark:text-red-300">Nepotpuna dokumentacija — rodni list djeteta zaboravljen</li>
            <li className="text-xs text-red-600 dark:text-red-300">Pogrešan IBAN ili ime vlasnika računa</li>
            <li className="text-xs text-red-600 dark:text-red-300">Steuernummer umjesto Steuer-ID</li>
            <li className="text-xs text-red-600 dark:text-red-300">Nedostaje potpis supružnika</li>
          </ul>
        </div>
      </div>

      {/* ─── DIO 2: Musterformular kartica ─── */}
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#111827", border: "1px solid #3B82F6" }}
      >
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">Vježbaj na Musterformlaru</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#EAB308" }}>
          Popuni kao original — pa znaš tačno šta ide gdje
        </p>
        <p className="mt-2 text-[13px] text-gray-400">
          Interaktivna kopija originalnog KG1 formulara. Bez državnih obilježja — samo za učenje i vježbu.
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Original KG1 formulara dostupan na službenoj stranici Familienkasse.
        </p>
        <button
          onClick={() => navigate("/formulari/kindergeld/muster")}
          className="mt-4 w-full font-bold text-white py-3 px-6 rounded-[10px]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          📋 Otvori Musterformular →
        </button>
      </div>

      {/* ─── DIO 3: Link na original ─── */}
      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">
          Original KG1 formular preuzmi direktno od Bundesagentur für Arbeit
        </p>
        <a
          href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#3B82F6" }}
        >
          🔗 Preuzmi originalni KG1 formular (PDF)
        </a>
      </div>
    </div>
  );
}