import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

export default function TrainerFaq() {
  const navigate = useNavigate();
  const faqs = [
    { q: "Šta je uključeno u besplatnu verziju?", a: "Dobijaš 3 lekcije po nivou sa zadacima i 3 rečenice govorne pomoći po lekciji — besplatno." },
    { q: "Šta je uključeno u Ultimate paket?", a: "Sa Ultimate paketom dobijaš sve lekcije, puni pristup govornoj pomoći i dinamički generisane zadatke." },
    { q: "Mogu li besplatno testirati?", a: "Da, prvih 3 lekcija po nivou su potpuno besplatne i odmah dostupne." },
    { q: "Za koga je ovo pogodno?", a: "Za sve koji žele vježbati njemački u stvarnim svakodnevnim situacijama — od početnika (A1) do naprednih (C2)." },
    { q: "Kako funkcionira struktura cijena?", a: "Možeš kupiti pojedinačne nivoe ili pakete. Paketi su povoljniji i nude vrijednosni vaučer pri 100% završetku." },
    { q: "Šta je vrijednosni vaučer?", a: "Kao Premium korisnik dobijaš vrijednosni vaučer pri 100% završetku. Provjera se vrši ručno od strane BalkanLink-a. Detalji u bonus uslovima." },
    { q: "Kako se plaća kurs?", a: "Kurs je uključen u BalkanLink članstvo: 7 dana besplatno, zatim 19,99 € godišnje, otkazivo u svakom trenutku." },
    { q: "Kako funkcionira XP sistem?", a: "Svaki tačan odgovor donosi +1 XP. Tvoj napredak se čuva. Maksimalno dostižno: Level 15." },
    { q: "Moram li učiti gramatiku?", a: "Ne. BalkanLink Deutsch se fokusira na praktične situacije. Gramatiku učiš usput." },
  ];

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <Breadcrumbs variant="dark" />
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                Česta pitanja — BalkanLink Deutsch
              </h1>
              <p className="text-xs text-primary-foreground/70">
                Sve važno na jednom mjestu
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
            Nazad na Trainer
          </Button>
          <Button
            onClick={() => navigate("/deutsch-trainer/preise")}
            className="h-10 rounded-xl bg-gold font-bold text-gold-foreground hover:bg-gold-light"
          >
            Pogledaj pakete
          </Button>
        </div>
      </div>
    </>
  );
}
