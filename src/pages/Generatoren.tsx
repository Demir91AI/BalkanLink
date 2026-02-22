import { ExternalLink, Calculator, Car, Users, Scale, AlertTriangle } from "lucide-react";

/* ───────── OFFICIAL CALCULATORS (external links only) ───────── */
interface OfficialTool {
  title: string;
  desc: string;
  url: string;
}

const officialTools: OfficialTool[] = [
  {
    title: "Kindergeld-Rechner",
    desc: "Izračunaj visinu dječijeg dodatka.",
    url: "https://familienportal.de/familienportal/meta/egr",
  },
  {
    title: "Wohngeld-Rechner",
    desc: "Provjeri pravo na stambeni dodatak.",
    url: "https://www.bmwsb.bund.de/SharedDocs/downloads/Webs/BMWSB/DE/veroeffentlichungen/wohnen/wohngeld/WoGRechner.html",
  },
  {
    title: "Bürgergeld-Rechner",
    desc: "Izračunaj visinu Bürgergeld-a.",
    url: "https://www.jobcenter.digital/jc/de/grundsicherung/rechner/index.html",
  },
  {
    title: "Elterngeld-Rechner",
    desc: "Izračunaj koliki roditeljski dodatak ti pripada.",
    url: "https://familienportal.de/familienportal/meta/egr",
  },
  {
    title: "Brutto-Netto Rechner",
    desc: "Izračunaj neto platu na osnovu bruto iznosa.",
    url: "https://www.bmf-steuerrechner.de/ekst/eingabeformekst.xhtml",
  },
  {
    title: "Rentenrechner",
    desc: "Procijeni svoju buduću penziju.",
    url: "https://www.deutsche-rentenversicherung.de/DRV/DE/Online-Dienste/online-dienste_node.html",
  },
];

/* ───────── BALKANLINK CUSTOM TOOLS (coming soon) ───────── */
interface CustomTool {
  title: string;
  desc: string;
  icon: typeof Calculator;
}

const customTools: CustomTool[] = [
  {
    title: "Familienkosten-Rechner",
    desc: "Koliko košta porodični život u Njemačkoj? Procijeni mjesečne troškove.",
    icon: Users,
  },
  {
    title: "Auto-Kosten Rechner",
    desc: "Izračunaj ukupne troškove automobila: osiguranje, porez, gorivo.",
    icon: Car,
  },
  {
    title: "Lohnt sich das? Vergleich",
    desc: "Uporedi primanja i troškove — da li se isplati?",
    icon: Scale,
  },
];

export default function Generatoren() {
  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Rechner & Tools
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Offizialne kalkulatore i korisne alate na jednom mjestu.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">

          {/* ── Official Rechner ── */}
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Calculator className="h-4 w-4 text-primary" />
              Offizielle Rechner
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Linkovi vode na zvanične stranice njemačkih institucija.
            </p>
          </div>

          <div className="space-y-3">
            {officialTools.map((tool) => (
              <div
                key={tool.title}
                className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Calculator className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{tool.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tool.desc}</p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Offiziellen Rechner öffnen
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* ── BalkanLink Custom Tools ── */}
          <div className="mb-4 mt-12">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Scale className="h-4 w-4 text-primary" />
              BalkanLink Rechner
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Vlastiti alati za procjenu troškova i poređenja.
            </p>
          </div>

          <div className="space-y-3">
            {customTools.map((tool) => (
              <div
                key={tool.title}
                className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <tool.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold">{tool.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{tool.desc}</p>
                  <p className="mt-2 text-xs font-medium text-primary">Uskoro dostupno</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Disclaimer ── */}
          <div className="mt-10 flex items-start gap-2 rounded-md border border-border bg-muted/40 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">
              Alle Berechnungen sind unverbindlich. BalkanLink übernimmt keine Haftung für die Richtigkeit externer Rechner.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
