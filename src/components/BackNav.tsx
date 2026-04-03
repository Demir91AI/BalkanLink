import { useNavigate, Link } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";

interface BackNavProps {
  className?: string;
}

export default function BackNav({ className = "" }: BackNavProps) {
  const navigate = useNavigate();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => navigateBackOrHome(navigate)}
        className="back-button"
      >
        <ChevronLeft className="h-4 w-4" /> Nazad
      </button>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E0D0] bg-white px-3 py-2 text-sm text-[#6B6B6B] transition-colors hover:bg-[hsl(var(--warm-cream))] hover:text-[hsl(var(--gold))] hover:shadow-sm"
        aria-label="Početna"
      >
        <Home className="h-4 w-4" />
      </Link>
    </div>
  );
}
