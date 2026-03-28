import { useNavigate, Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function SubpageNav() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="border-b bg-background">
      <div className="container flex items-center gap-1 py-1">
        <button
          onClick={handleBack}
          className="border-none bg-transparent cursor-pointer px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#EAB308]"
        >
          ← Nazad
        </button>
        <Link
          to="/"
          className="border-none bg-transparent cursor-pointer px-3 py-2 text-sm text-[#9CA3AF] transition-colors hover:text-[#EAB308]"
        >
          <Home className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
