import { useNavigate } from "react-router-dom";
import { Building, ChevronLeft, ExternalLink, Info } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";

const portals = [
  { name: "ImmobilienScout24", url: "https://www.immobilienscout24.de", desc: "Najveći njemački portal za stanove i kuće." },
  { name: "Immowelt", url: "https://www.immowelt.de", desc: "Široka ponuda stanova za najam i kupovinu." },
  { name: "WG-Gesucht", url: "https://www.wg-gesucht.de", desc: "Idealno za dijeljene stanove i sobe (WG)." },
  { name: "eBay Kleinanzeigen", url: "https://www.kleinanzeigen.de/s-wohnung-mieten/c203", desc: "Oglasi od privatnih osoba." },
  { name: "Wohnungsboerse", url: "https://www.wohnungsboerse.net", desc: "Alternativni portal za cijelu Njemačku." },
  { name: "Nestoria", url: "https://www.nestoria.de", desc: "Agregator više portala odjednom." },
];

export default function Wohnungen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary py-10 text-primary-foreground md:py-14">
        <div className="container max-w-3xl">
          <button onClick={() => navigateBackOrHome(navigate)} className="back-button mb-4">
            <ChevronLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
              <Building className="h-4 w-4" /> Pretraga stanova
            </div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              Preporučeni sajtovi za traženje stana u Njemačkoj
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm text-primary-foreground/75 sm:text-base">
              Klikni na sajt koji ti odgovara — otvorit će se direktno.
            </p>
          </div>
        </div>
      </section>

      {/* Portal Cards */}
      <div className="container max-w-3xl py-6 sm:py-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {portals.map((p) => (
            <div key={p.name} className="rounded-xl border border-border bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <h3 className="text-base font-bold text-foreground">{p.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Otvori sajt <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 mb-4 flex items-start gap-2.5 rounded-lg border border-border/50 bg-muted/50 p-4">
          <Info className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            BalkanLink prikazuje preporučene portale za stanove u Njemačkoj. Oglasi se nalaze na originalnim stranicama.
          </p>
        </div>
      </div>
    </div>
  );
}
