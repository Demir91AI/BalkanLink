import { useNavigate } from "react-router-dom";

interface Props {
  musterSlug: string;
  title?: string;
  subtitle?: string;
  pdfUrl?: string;
  pdfLabel?: string;
}

export default function MusterformularCTA({
  musterSlug,
  title = "Vježbaj na Musterformularu",
  subtitle = "Popuni kao original — pa znaš tačno šta ide gdje",
  pdfUrl,
  pdfLabel = "Preuzmi originalni PDF",
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl p-6 text-center space-y-4" style={{ background: '#111827', border: '1px solid #334155' }}>
      <div>
        <div className="text-[32px] mb-3">📋</div>
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-sm font-semibold" style={{ color: '#C9A84C' }}>{subtitle}</p>
        <p className="mt-2 text-[13px] text-[#94A3B8]">
          Interaktivne kopije originalnih formulara. Bez državnih obilježja — samo za učenje i vježbu.
        </p>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => navigate(`/musterformular/${musterSlug}`)}
          className="w-full py-3 rounded-lg font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ background: '#2563EB' }}
        >
          📋 Otvori Musterformular →
        </button>
        {pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-lg text-sm font-medium text-[#94A3B8] border border-[#334155] text-center flex items-center justify-center gap-2 hover:bg-[#334155] transition-colors"
          >
            🖨️ {pdfLabel}
          </a>
        )}
      </div>
    </div>
  );
}
