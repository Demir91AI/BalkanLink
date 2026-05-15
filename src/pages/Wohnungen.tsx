import { useNavigate } from "react-router-dom";
import { Building, ExternalLink, Info } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";
import PageNavBar from "@/components/navigation/PageNavBar";
import { SEO } from "@/components/SEO";

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
    <div className="min-h-screen" style={{ background: '#F5F0E8' }}>
      <SEO title="Stanovi u Njemačkoj — Portali za Pretragu" description="Direktni linkovi na najveće njemačke portale za stanove i sobe — ImmoScout24, Immowelt, WG-Gesucht, Kleinanzeigen i drugi." path="/wohnungen" />
      <div style={{ background: '#F5F0E8' }} className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <PageNavBar onBack={() => navigateBackOrHome(navigate)} />
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-3 py-1">
          <Building className="h-3.5 w-3.5 text-[#C9A84C]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">Pretraga stanova</span>
        </div>
        <h1 className="text-2xl font-bold text-[#2D2D2D] mt-2">Pretraži sve portale za stanove</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Klikni na sajt koji ti odgovara — otvorit će se direktno.</p>
        <p className="text-xs text-[#9CA3AF] mt-0.5">Samo preusmjeravanje na eksterne stranice</p>
      </div>

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
