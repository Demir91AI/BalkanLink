import Breadcrumbs from "./Breadcrumbs";

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface SectionHeaderProps {
  onBack: () => void;
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function SectionHeader({ onBack, breadcrumbs, title, subtitle, icon }: SectionHeaderProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <Breadcrumbs onBack={onBack} items={breadcrumbs} variant="dark" />

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
