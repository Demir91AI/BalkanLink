import { Check, X } from "lucide-react";

const rows = [
  { label: "Grundinformationen", free: true, premium: true },
  { label: "Allgemeine Erklärungen", free: true, premium: true },
  { label: "Konkrete Schritt-für-Schritt Anleitung", free: false, premium: true },
  { label: "Fehler vermeiden", free: false, premium: true },
  { label: "Schnell zum Ergebnis", free: false, premium: true },
];

export default function PricingFreeVsPremium() {
  return (
    <div className="rounded-xl border bg-card p-6 md:p-8">
      <h3 className="mb-4 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Kostenlos vs. Premium
      </h3>

      {/* Desktop */}
      <div className="hidden sm:block overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-5 py-3 text-left font-semibold">Funktion</th>
              <th className="px-5 py-3 text-center font-semibold">Free</th>
              <th className="relative px-5 py-3 text-center font-semibold">
                <div className="absolute -top-px left-0 right-0 h-0.5 bg-[hsl(var(--gold))]" />
                ✨ Premium
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0 hover:bg-muted/30 transition-colors">
                <td className="px-5 py-2.5">{row.label}</td>
                <td className="px-5 py-2.5 text-center">
                  {row.free ? (
                    <Check className="mx-auto h-4 w-4 text-emerald-500" />
                  ) : (
                    <X className="mx-auto h-4 w-4 text-muted-foreground/30" />
                  )}
                </td>
                <td className="bg-[hsl(var(--gold))]/[0.03] px-5 py-2.5 text-center">
                  <Check className="mx-auto h-4 w-4 text-[hsl(var(--gold))]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-xs font-semibold text-muted-foreground">Free</h4>
          <ul className="space-y-2">
            {rows.map((row, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                {row.free ? (
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                ) : (
                  <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/30" />
                )}
                <span className={row.free ? "" : "text-muted-foreground/50"}>{row.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border-2 border-[hsl(var(--gold))]/30 p-4 ring-1 ring-[hsl(var(--gold))]/10">
          <h4 className="mb-2 text-xs font-semibold">✨ Premium</h4>
          <ul className="space-y-2">
            {rows.map((row, i) => (
              <li key={i} className="flex items-start gap-2 text-xs">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--gold))]" />
                <span>{row.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
