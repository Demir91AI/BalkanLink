import { Link } from "react-router-dom";
import { ArrowRight, FileEdit, Calculator, Wrench } from "lucide-react";

const tools = [
  {
    title: "Kündigung Wohnung Generator",
    desc: "Generiši otkazno pismo za stan prema njemačkom pravu.",
    icon: FileEdit,
    type: "generator",
  },
  {
    title: "Kündigung Arbeitsvertrag Generator",
    desc: "Generiši otkazno pismo za radni ugovor.",
    icon: FileEdit,
    type: "generator",
  },
  {
    title: "Widerspruch Generator",
    desc: "Generiši prigovor na rješenje institucije.",
    icon: FileEdit,
    type: "generator",
  },
  {
    title: "Brutto-Netto Rechner",
    desc: "Izračunaj svoju neto platu na osnovu bruto iznosa.",
    icon: Calculator,
    type: "rechner",
  },
  {
    title: "Wohngeld-Rechner",
    desc: "Provjeri da li imaš pravo na stambeni dodatak.",
    icon: Calculator,
    type: "rechner",
    externalLink: "https://www.bmwsb.bund.de/SharedDocs/downloads/Webs/BMWSB/DE/veroeffentlichungen/wohnen/wohngeld/WoGRechner.html",
  },
  {
    title: "Elterngeld-Rechner",
    desc: "Izračunaj koliki roditeljski dodatak ti pripada.",
    icon: Calculator,
    type: "rechner",
    externalLink: "https://familienportal.de/familienportal/meta/egr",
  },
];

export default function Generatoren() {
  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Tools & Generatoren
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Generatori dokumenata i kalkulatori za tvoje potrebe.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <FileEdit className="h-4 w-4 text-primary" /> Generatoren
            </h2>
          </div>
          <div className="space-y-3">
            {tools
              .filter((t) => t.type === "generator")
              .map((tool, idx) => (
                <div
                  key={idx}
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

          <div className="mb-6 mt-10">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <Calculator className="h-4 w-4 text-primary" /> Rechner
            </h2>
          </div>
          <div className="space-y-3">
            {tools
              .filter((t) => t.type === "rechner")
              .map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <tool.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold">{tool.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{tool.desc}</p>
                    {tool.externalLink ? (
                      <a
                        href={tool.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Zum offiziellen Rechner <ArrowRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <p className="mt-2 text-xs font-medium text-primary">Uskoro dostupno</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
