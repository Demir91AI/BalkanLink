import { Check, X } from "lucide-react";

const rows: { label: string; free: string; premium: string }[] = [
  { label: "Musterformulari",  free: "❌",             premium: "✅ Svi uključeni"       },
  { label: "Smart Guides",     free: "❌",             premium: "✅ Svi koraci"          },
  { label: "Viza Navigator",   free: "Osnovno",        premium: "✅ Kompletno"           },
  { label: "Dokumenten-Check", free: "2,99€/kom",      premium: "✅ 5×/dan gratis"       },
  { label: "Nebenkosten-Scan", free: "1× ukupno",      premium: "✅ Neograničeno"        },
  { label: "Šabloni",          free: "✅ 2 gratis",    premium: "✅ Svi + PDF"           },
  { label: "Asistent",         free: "⚠️ 5/dan",      premium: "✅ Neograničeno"        },
  { label: "DeutschTrainer",   free: "3 lekcije/nivo", premium: "✅ 240 lekcija"         },
  { label: "Sprachassistent",  free: "3/500",          premium: "✅ 500 rečenica"        },
  { label: "Wertgutschein",    free: "❌",             premium: "✅ Amazon 30€"          },
  { label: "Pro oglasi",       free: "1,99€/7 dana ili 4,99€/30 dana",   premium: "✅ Gratis (max 10 dana)"},
];

export default function PricingComparisonTable() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-center mb-6">
        Besplatno vs. Premium
      </h2>
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left py-3 px-4 font-semibold">
                Funkcija
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <span className="inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs">
                  0€
                </span>
              </th>
              <th className="text-center py-3 px-4 font-semibold">
                <span
                  className="inline-block rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: "hsl(var(--gold))" }}
                >
                  9,99€/mj.
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.label}
                className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}
              >
                <td className="py-2.5 px-4 font-medium">{r.label}</td>
                <td className="py-2.5 px-4 text-center text-xs">
                  {r.free}
                </td>
                <td className="py-2.5 px-4 text-center text-xs font-medium">
                  {r.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
