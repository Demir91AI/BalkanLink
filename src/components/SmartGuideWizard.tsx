import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/integrations/supabase/types";

type FormField = Tables<"form_fields">;

const sections = [
  { key: "antragsteller", title: "Schritt 1: Antragstellende Person", desc: "Tvoji lični podaci" },
  { key: "partner", title: "Schritt 2: Partner / Drugi roditelj", desc: "Podaci o partneru u domaćinstvu" },
  { key: "zahlung", title: "Schritt 3: Zahlungsweg (Plaćanje)", desc: "IBAN i podaci o računu" },
  { key: "bescheid", title: "Schritt 4: Bescheid-Empfänger", desc: "Adresa za prijem odluke" },
  { key: "kinder", title: "Schritt 5: Kinder (Djeca)", desc: "Informacije o djeci" },
  { key: "unterschrift", title: "Schritt 6: Unterschrift (Potpis)", desc: "Potpis i datum" },
];

interface Props {
  fields: FormField[];
  pdfUrl: string;
}

export default function SmartGuideWizard({ fields, pdfUrl }: Props) {
  const [step, setStep] = useState(0);
  const currentSection = sections[step];

  const sectionFields = fields.filter((f) => f.section === currentSection.key);

  return (
    <div className="mt-4 space-y-4">
      {/* Step indicator */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {sections.map((s, i) => (
          <button
            key={s.key}
            onClick={() => setStep(i)}
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition ${
              i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-2xl border bg-card p-5">
        <h3 className="font-bold text-sm">{currentSection.title}</h3>
        <p className="mb-4 text-xs text-muted-foreground">{currentSection.desc}</p>

        {sectionFields.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Nema mapiranih polja za ovaj korak.</p>
        ) : (
          <div className="space-y-4">
            {sectionFields.map((field) => (
              <div key={field.id} className="rounded-xl border bg-background p-4">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <p className="text-xs font-bold text-primary">{field.label_de}</p>
                </div>
                <p className="text-xs font-medium">{field.label_bs}</p>

                {field.help_text_bs && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground">Šta upisati ovdje:</p>
                    <p className="text-xs">{field.help_text_bs}</p>
                  </div>
                )}

                {field.example && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground">Primjer:</p>
                    <p className="text-xs font-mono bg-muted/50 rounded px-2 py-1 inline-block">{field.example}</p>
                  </div>
                )}

                {field.where_to_find_bs && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground">Gdje to nađeš:</p>
                    <p className="text-xs">{field.where_to_find_bs}</p>
                  </div>
                )}

                {field.common_mistakes_bs && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground">Najčešće greške:</p>
                    <p className="text-xs text-red-600 dark:text-red-400">{field.common_mistakes_bs}</p>
                  </div>
                )}

                {field.format_hint_bs && (
                  <div className="mt-2">
                    <p className="text-[10px] font-semibold text-muted-foreground">Kako upisati:</p>
                    <p className="text-xs">{field.format_hint_bs}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" disabled={step === 0} onClick={() => setStep(step - 1)}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
        </Button>
        <span className="text-[10px] text-muted-foreground">{step + 1} / {sections.length}</span>
        <Button variant="outline" size="sm" disabled={step === sections.length - 1} onClick={() => setStep(step + 1)}>
          Dalje <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Link to official PDF */}
      <div className="text-center">
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline">
          <FileText className="h-3 w-3" /> Otvori službeni PDF u novom tabu
        </a>
      </div>
    </div>
  );
}
