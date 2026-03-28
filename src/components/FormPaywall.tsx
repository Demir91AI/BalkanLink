import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface FormPaywallProps {
  formLabel: string;
}

export default function FormPaywall({ formLabel }: FormPaywallProps) {
  const { user } = useAuth();
  const destination = user ? "/premium" : "/login";

  return (
    <div
      className="rounded-2xl border border-[#EAB308] p-6 text-center"
      style={{ background: "#111827" }}
    >
      {/* Lock icon */}
      <span className="text-[40px]">🔒</span>

      {/* Title */}
      <h3 className="mt-3 text-[20px] font-bold text-white">
        Smart Guide — korak po korak
      </h3>

      {/* Subtitle */}
      <p className="mt-2 text-[14px] text-[#9CA3AF] max-w-md mx-auto">
        Kompletan vodič kroz svako polje formulara — objašnjenje, primjer i
        najčešće greške za svaki korak.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 w-full max-w-sm mx-auto">
        {/* Single form button */}
        <Link
          to={destination}
          className="block w-full rounded-[10px] border-2 border-[#EAB308] bg-transparent px-6 py-3 text-[14px] font-bold text-[#EAB308] text-center transition hover:bg-[#EAB308]/10"
        >
          🔓 Otključaj ovaj formular — 3.99€
        </Link>

        {/* Premium button with badge */}
        <div className="relative">
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-[#22C55E] px-2.5 py-0.5 text-[10px] font-bold text-white whitespace-nowrap">
            POPULARNO
          </span>
          <Link
            to={destination}
            className="block w-full rounded-[10px] bg-[#EAB308] px-6 py-3 text-center font-bold text-black transition hover:bg-[#EAB308]/90"
          >
            <span className="text-[14px]">⭐ BalkanLink Premium — 9.99€/mjesec</span>
            <span className="block text-[11px] font-medium mt-0.5 text-black/70">
              Svi formulari + cijela platforma
            </span>
          </Link>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-[11px] text-[#9CA3AF]">
        BalkanLink je edukativna platforma. Sadržaj nije pravni savjet.
      </p>
    </div>
  );
}
