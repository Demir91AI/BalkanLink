import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
export default function PageNav({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="page-nav-row">
      <button className="page-nav-btn page-nav-btn--back" onClick={() => (onBack ? onBack() : navigate(-1))}>
        Nazad
      </button>
      <button className="page-nav-btn page-nav-btn--home" onClick={() => navigate("/")} aria-label="Početna">
        <Home size={18} color="#FFFFFF" style={{ display: "block" }} />
      </button>
    </div>
  );
}
