import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { User } from "@supabase/supabase-js";

interface PricingCardProps {
  icon: ReactNode;
  title: string;
  price: string;
  period: string;
  badge?: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  small?: boolean;
  user: User | null;
  isPremium: boolean;
  rank?: number;
  children?: ReactNode;
}

export default function PricingCard({
  icon,
  title,
  price,
  period,
  badge,
  features,
  cta,
  highlight,
  small,
  user,
  isPremium,
  rank,
  children,
}: PricingCardProps) {
  return (
    <div
      id="products"
      className={cn(
        "rounded-2xl border bg-card p-6 md:p-8 shadow-sm transition-all",
        highlight && "border-2 border-[hsl(var(--gold))]/40 ring-2 ring-[hsl(var(--gold))]/10 shadow-md",
        small && "max-w-xl"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10 ring-1 ring-[hsl(var(--gold))]/20">
            {icon}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={cn("font-bold", small ? "text-base" : "text-lg")}>{title}</h3>
              {badge && (
                <Badge className="bg-[hsl(var(--gold))] text-[hsl(var(--gold-foreground))] text-[10px] font-bold">
                  {badge}
                </Badge>
              )}
            </div>
            <p className="mt-1">
              <span className={cn("font-heading font-extrabold", small ? "text-2xl" : "text-3xl")}>{price}</span>
              <span className="ml-1 text-sm text-muted-foreground">{period}</span>
            </p>
          </div>
        </div>

        <div className="sm:text-right shrink-0">
          {isPremium ? (
            <p className="text-sm font-medium text-[hsl(var(--gold))]">Aktiv ✓</p>
          ) : (
            <Button
              className={cn(
                "rounded-xl",
                highlight
                  ? "btn-gold-gradient"
                  : "border-[hsl(var(--gold))] text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
              )}
              variant={highlight ? "default" : "outline"}
              asChild
            >
              {user ? <span>{cta}</span> : <Link to="/login">{cta}</Link>}
            </Button>
          )}
        </div>
      </div>

      <ul className={cn("mt-5 space-y-2", small ? "text-sm" : "text-sm")}>
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--gold))]" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {children}
    </div>
  );
}
