import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface SectionHeaderProps {
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ onBack, breadcrumbs, title, subtitle, icon }: SectionHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="mb-6 sm:mb-8">
      {/* ROW 1: Back + Home */}
      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
        >
          <ChevronLeft className="h-4 w-4" />
          Nazad
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-[13px] font-medium text-white/50 hover:text-white/80 transition-colors px-3 py-1.5 rounded-lg hover:bg-white/[0.06]"
        >
          <Home className="h-4 w-4" />
          Početna
        </button>
      </div>

      {/* ROW 2: Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1;
            return (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3 text-white/20" />}
                {isLast ? (
                  <span className="font-semibold text-white/70">{crumb.label}</span>
                ) : (
                  <button
                    onClick={crumb.onClick}
                    className="font-medium text-white/40 hover:text-white/70 transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      )}

      {/* ROW 3: Title block */}
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-xl">
            {icon}
          </div>
        )}
        <div>
          <h2 className="text-lg font-black text-white sm:text-xl leading-tight">{title}</h2>
          {subtitle && <p className="mt-0.5 text-xs text-white/45">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
