import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";

const faqs = [
  {
    q: "Was ist in der Free-Version enthalten?",
    a: "Du bekommst 5 Lektionen pro Niveau mit 30 Aufgaben und 5 Sprachassistent-Sätzen pro Lektion – komplett kostenlos.",
  },
  {
    q: "Was ist im Ultimate-Paket enthalten?",
    a: "Mit Ultimate erhältst du alle Lektionen, 300 Aufgaben pro Lektion, vollen Zugriff auf den Sprachassistent mit 100 Sätzen und dynamisch generierte Aufgaben für maximale Abwechslung.",
  },
  {
    q: "Kann ich kostenlos testen?",
    a: "Ja, die ersten 5 Lektionen pro Niveau sind komplett kostenlos und sofort verfügbar.",
  },
  {
    q: "Für wen ist das geeignet?",
    a: "Für alle, die Deutsch in realen Alltagssituationen trainieren möchten – ob Anfänger (A1) oder Fortgeschrittene (C2).",
  },
  {
    q: "Wie lange dauert eine Lektion?",
    a: "Eine Lektion dauert ca. 3–10 Minuten. Jede Lektion hat 30 (Free) oder 300 (Ultimate) Aufgaben.",
  },
  {
    q: "Ist Ultimate ein Abo?",
    a: "Nein. Ultimate ist eine einmalige Zahlung. Du zahlst einmal und hast dauerhaften Zugriff auf alle Inhalte.",
  },
  {
    q: "Muss ich Grammatik lernen?",
    a: "Nein. BalkanLink Deutsch fokussiert auf praktische Situationen. Grammatik lernst du nebenbei durch die Übungen.",
  },
];

export default function TrainerFaq() {
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                Häufige Fragen zu BalkanLink Deutsch
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Alles Wichtige auf einen Blick
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-2xl py-6 space-y-6">
        <Accordion type="single" collapsible className="rounded-xl border bg-card">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-0 px-5">
              <AccordionTrigger className="text-sm font-bold hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/deutsch-trainer")}
            className="h-10 rounded-xl font-bold"
          >
            Zurück zum Trainer
          </Button>
          <Button
            onClick={() => navigate("/deutsch-trainer/preise")}
            className="h-10 rounded-xl bg-gold font-bold text-gold-foreground hover:bg-gold-light"
          >
            Pakete ansehen
          </Button>
        </div>
      </div>
    </>
  );
}
