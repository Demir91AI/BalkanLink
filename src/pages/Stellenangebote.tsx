import { useNavigate } from "react-router-dom";
import { Briefcase, ExternalLink, Info } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";
import PageNavBar from "@/components/navigation/PageNavBar";
import { SEO } from "@/components/SEO";

const portals = [
  { name: "Indeed Deutschland", url: "https://de.indeed.com", desc: "Globalni job portal sa tisućama oglasa." },
  { name: "StepStone", url: "https://www.stepstone.de", desc: "Jedan od najvećih portala za posao u Njemačkoj." },
  { name: "XING Jobs", url: "https://www.xing.com/jobs", desc: "Poslovna mreža i job oglasi." },
  { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs/search/?location=Deutschland", desc: "Međunarodni portal, odlično za stručnjake." },
  { name: "Bundesagentur für Arbeit", url: "https://www.arbeitsagentur.de/jobsuche", desc: "Zvanična agencija za zapošljavanje." },
  { name: "Monster.de", url: "https://www.monster.de", desc: "Klasičan job portal za sve branše." },
];

export default function Stellenangebote() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ background: '#F5F0E8' }}>
      <SEO title="Posao u Njemačkoj — Job Portali" description="Pretraži poslove u Njemačkoj na najvećim portalima — Indeed, StepStone, XING, LinkedIn, Bundesagentur für Arbeit." path="/stellenangebote" />
      <div style={{ background: '#F5F0E8' }} className="px-4 pt-8 pb-6 max-w-3xl mx-auto">
        <PageNavBar onBack={() => navigateBackOrHome(navigate)} />
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-3 py-1">
          <Briefcase className="h-3.5 w-3.5 text-[#C9A84C]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A84C]">Pretraga poslova</span>
        </div>
        <h1 className="text-2xl font-bold text-[#2D2D2D] mt-2">Pretraži sve portale za posao</h1>
        <p className="text-sm text-[#6B6B6B] mt-1">Direktni linkovi na najveće njemačke job portale.</p>
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
            BalkanLink prikazuje preporučene job portale u Njemačkoj. Prijave i oglasi nalaze se na originalnim stranicama.
          </p>
        </div>
      </div>
    </div>
  );
}
