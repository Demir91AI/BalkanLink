import { useNavigate } from "react-router-dom";

interface MusterCTAProps {
  formName: string;
  institution: string;
  musterPath: string;
  pdfUrl: string;
}

export default function MusterCTA({ formName, institution, musterPath, pdfUrl }: MusterCTAProps) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="rounded-2xl p-6 text-center"
        style={{ backgroundColor: "#111827", border: "1px solid #3B82F6" }}
      >
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">Vježbaj na Musterformularu</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: "#EAB308" }}>
          Popuni kao original — pa znaš tačno šta ide gdje
        </p>
        <p className="mt-2 text-[13px] text-gray-400">
          Interaktivna kopija originalnog {formName} formulara. Bez državnih obilježja — samo za učenje i vježbu.
        </p>
        <p className="mt-1 text-[11px] text-gray-500">
          Original {formName} formulara dostupan na službenoj stranici {institution}.
        </p>
        <button
          onClick={() => navigate(musterPath)}
          className="mt-4 w-full font-bold text-white py-3 px-6 rounded-[10px]"
          style={{ backgroundColor: "#3B82F6" }}
        >
          📋 Otvori Musterformular →
        </button>
      </div>

      <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "#1F2937" }}>
        <p className="text-[13px] text-gray-400">
          Original {formName} formular preuzmi direktno od {institution}
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 text-sm font-medium"
          style={{ color: "#3B82F6" }}
        >
          🔗 Preuzmi originalni {formName} formular (PDF)
        </a>
      </div>
    </>
  );
}
