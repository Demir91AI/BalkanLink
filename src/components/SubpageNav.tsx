import { useNavigate, Link } from "react-router-dom";
import { Home, ChevronLeft } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";

export default function SubpageNav() {
  const navigate = useNavigate();

  return (
    <div className="border-b bg-background">
      <div className="container flex items-center gap-1 py-1">
        <button
          onClick={() => navigateBackOrHome(navigate)}
          className="back-button"
        >
          <ChevronLeft className="h-4 w-4" /> Nazad
        </button>
        <Link
          to="/"
          className="border-none bg-transparent cursor-pointer px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--gold))]"
        >
          <Home className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
