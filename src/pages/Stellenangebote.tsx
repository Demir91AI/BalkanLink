import { useNavigate } from "react-router-dom";
import { Briefcase, ChevronLeft, ExternalLink, Home, Info } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";

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
    <div className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="bg-primary py-10 text-primary-foreground md:py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
              <ChevronLeft className="h-4 w-4" /> Nazad
            </button>
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-[13px] font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10">
              <Home className="h-4 w-4" /> Početna
            </button>
          </div>
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium">
              <Briefcase className="h-4 w-4" /> Pretraga poslova
            </div>
            <h1 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">
              Pretraži sve velike portale za posao na jednom mjestu
            </h1>
            <p className="mx-auto mt-2 max-w-lg text-sm text-primary-foreground/75 sm:text-base">
              Direktni linkovi na najveće njemačke job portale.
            </p>
            <p className="mx-auto mt-1 text-xs text-gray-400">
              Samo preusmjeravanje na eksterne stranice
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
            BalkanLink prikazuje preporučene job portale u Njemačkoj. Prijave i oglasi nalaze se na originalnim stranicama.
          </p>
        </div>
      </div>
    </div>
  );
}
