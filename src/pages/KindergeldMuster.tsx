import { useNavigate } from "react-router-dom";

const PDF_URL = "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf";
const VIEWER_URL = `https://docs.google.com/viewer?url=${encodeURIComponent(PDF_URL)}&embedded=true`;

const KindergeldMusterPDF = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <div className="bg-[#0d1526] px-4 py-2 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-muted-foreground bg-transparent border-none cursor-pointer text-sm">← Nazad</button>
        <span className="text-[#EAB308] font-bold text-[15px]">BL BalkanLink</span>
        <button onClick={() => navigate("/")} className="text-muted-foreground bg-transparent border-none cursor-pointer text-[15px]">🏠</button>
      </div>

      <div className="max-w-[820px] mx-auto px-4 py-4">
        <div className="bg-[hsl(48,96%,89%)] border-2 border-[#EAB308] rounded-md p-3 mb-3">
          <p className="font-bold text-[#92400e] text-xs m-0 mb-1">
            ⚠️ Musterformular — Ovo je prikaz originalnog KG1 formulara. Popuni ga ovdje za vježbu, ali original predaj lično u Familienkasse. BalkanLink nije državni portal.
          </p>
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer" className="text-[#1d4ed8] text-xs">
            🔗 Preuzmi originalni PDF →
          </a>
        </div>

        <iframe
          src={VIEWER_URL}
          title="KG1 Kindergeld Formular"
          className="w-full border-none rounded"
          style={{ height: "85vh" }}
        />

        <p className="text-xs text-muted-foreground text-center mt-3 mb-8">
          Dies ist ein Musterformular zur Orientierung. Maßgeblich ist das offizielle Formular der zuständigen Behörde.
        </p>
      </div>
    </div>
  );
};

export default KindergeldMusterPDF;
