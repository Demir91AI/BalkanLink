import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { navigateBackOrHome } from "@/lib/navigation";

export default function TrainerFaq() {
  const navigate = useNavigate();
  const faqs = [
    { q: "Was ist in der Free-Version enthalten?", a: "Du bekommst 3 Lektionen pro Niveau mit Aufgaben und 3 Sprachassistent-Sätze pro Lektion – kostenlos." },
    { q: "Was ist im Ultimate-Paket enthalten?", a: "Mit Ultimate erhältst du alle Lektionen, vollen Sprachassistenten-Zugriff und dynamisch generierte Aufgaben." },
    { q: "Kann ich kostenlos testen?", a: "Ja, die ersten 3 Lektionen pro Niveau sind komplett kostenlos und sofort verfügbar." },
    { q: "Für wen ist das geeignet?", a: "Für alle, die Deutsch in realen Alltagssituationen trainieren möchten – ob Anfänger (A1) oder Fortgeschrittene (C2)." },
    { q: "Wie funktioniert die Preisstruktur?", a: "Du kannst einzelne Niveaus kaufen oder Pakete wählen. Pakete sind günstiger und bieten einen Wertgutschein bei 100% Abschluss." },
    { q: "Was ist der Wertgutschein?", a: "Als Premium-Nutzer erhältst du bei 100% Abschluss einen Wertgutschein. Die Prüfung erfolgt manuell durch BalkanLink. Details in den Bonusbedingungen." },
    { q: "Ist Ultimate ein Abo?", a: "Nein. Alle Käufe sind einmalige Zahlungen. Du zahlst einmal und hast dauerhaften Zugriff." },
    { q: "Wie funktioniert das XP-System?", a: "Jede richtige Antwort gibt +1 XP. Dein Fortschritt wird gespeichert. Maximal erreichbar: Level 15." },
    { q: "Muss ich Grammatik lernen?", a: "Nein. BalkanLink Deutsch fokussiert auf praktische Situationen. Grammatik lernst du nebenbei." },
  ];

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                {"Häufige Fragen — BalkanLink Deutsch"}
              </h1>
              <p className="text-xs text-primary-foreground/70">
                {"Alles Wichtige auf einen Blick"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-2xl py-6 space-y-6">
        <Accordion type="single" collapsible className="rounded-xl border bg-card">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b last:border-0 px-5"
            >
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
            {"Zurück zum Trainer"}
          </Button>
          <Button
            onClick={() => navigate("/deutsch-trainer/preise")}
            className="h-10 rounded-xl bg-gold font-bold text-gold-foreground hover:bg-gold-light"
          >
            {"Pakete ansehen"}
          </Button>
        </div>
      </div>
    </>
  );
}
