import { FileText, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  musterSlug: string;
  pdfUrl: string;
  pdfLabel: string;
}

export default function MusterformularCTA({ musterSlug, pdfUrl, pdfLabel }: Props) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-4">
      <p className="text-sm font-bold">📋 Sljedeći koraci</p>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate(`/musterformular/${musterSlug}`)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <FileText className="h-3.5 w-3.5" />
          Otvori Musterformular
        </button>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-background px-5 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {pdfLabel}
        </a>
      </div>
    </div>
  );
}
