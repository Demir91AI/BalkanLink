import { ChevronLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  onBack?: () => void;
}

export default function PageNavBar({ onBack }: Props) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-4">
      <button
        onClick={handleBack}
        className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]"
      >
        <ChevronLeft className="h-4 w-4" />
        Nazad
      </button>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1.5 text-[13px] font-medium text-[#6B6B6B] hover:text-[#2D2D2D] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#F0EAD8]"
      >
        <Home className="h-4 w-4" />
        Početna
      </button>
    </div>
  );
}
