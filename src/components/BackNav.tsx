import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
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
      {/* Home button is injected globally by GlobalHomeButton */}
    </div>
  );
}
