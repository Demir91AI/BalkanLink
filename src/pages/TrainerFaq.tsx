import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { navigateBackOrHome } from "@/lib/navigation";

export default function TrainerFaq() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const faqs = [
    { q: t("trainerFaq.q1"), a: t("trainerFaq.a1") },
    { q: t("trainerFaq.q2"), a: t("trainerFaq.a2") },
    { q: t("trainerFaq.q3"), a: t("trainerFaq.a3") },
    { q: t("trainerFaq.q4"), a: t("trainerFaq.a4") },
    { q: t("trainerFaq.q5"), a: t("trainerFaq.a5") },
    { q: t("trainerFaq.q6"), a: t("trainerFaq.a6") },
    { q: t("trainerFaq.q7"), a: t("trainerFaq.a7") },
    { q: t("trainerFaq.q8"), a: t("trainerFaq.a8") },
    { q: t("trainerFaq.q9"), a: t("trainerFaq.a9") },
  ];

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> {t("trainerFaq.back")}
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                {t("trainerFaq.title")}
              </h1>
              <p className="text-xs text-primary-foreground/70">
                {t("trainerFaq.subtitle")}
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
            {t("trainerFaq.backToTrainer")}
          </Button>
          <Button
            onClick={() => navigate("/deutsch-trainer/preise")}
            className="h-10 rounded-xl bg-gold font-bold text-gold-foreground hover:bg-gold-light"
          >
            {t("trainerFaq.viewPackages")}
          </Button>
        </div>
      </div>
    </>
  );
}
