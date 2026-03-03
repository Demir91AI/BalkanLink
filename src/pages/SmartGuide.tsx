import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertTriangle, FileText, ExternalLink, BookOpen, ClipboardList, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getGuideBySlug } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

export default function SmartGuide() {
  const { slug } = useParams<{ slug: string }>();
  const guide = getGuideBySlug(slug ?? "");
  const [step, setStep] = useState(0);
  const lang: LangKey = "bs";

  if (!guide) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-muted-foreground">Vodič nije pronađen.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/formulari">Nazad na formulare</Link>
        </Button>
      </div>
    );
  }

  const steps = guide.steps[lang];
  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <Link to="/formulari" className="mb-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3 w-3" /> Nazad na formulare
        </Link>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{guide.title[lang]}</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Izvor: {guide.authority[lang]}
        </p>
        {guide.formName && (
          <p className="mt-1 text-xs text-muted-foreground">
            Formular: {guide.formName[lang]}
          </p>
        )}
      </div>

      {/* Top info sections */}
      <div className="mb-6 space-y-4">
        {/* Rejection reasons */}
        {guide.commonMistakes[lang].length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
              <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške koje dovode do odbijanja
            </h3>
            <ul className="space-y-1 pl-4 list-disc">
              {guide.commonMistakes[lang].map((m, i) => (
                <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Documents to prepare */}
        <div className="rounded-2xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <ClipboardList className="h-3.5 w-3.5 text-primary" /> Dokumenti koje treba pripremiti
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            {guide.documents[lang].map((d, i) => (
              <li key={i} className="text-xs text-muted-foreground">{d}</li>
            ))}
          </ul>
        </div>

        {/* Processing time & who */}
        <div className="rounded-2xl border bg-card p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
            <PenLine className="h-3.5 w-3.5 text-primary" /> Ko podnosi zahtjev
          </h3>
          <p className="text-xs text-muted-foreground">{guide.who[lang]}</p>
          <p className="mt-2 text-xs">
            <span className="font-semibold">Vrijeme obrade:</span>{" "}
            <span className="text-muted-foreground">{guide.processingTime[lang]}</span>
          </p>
        </div>
      </div>

      {/* Step-by-step wizard */}
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Korak {step + 1} / {steps.length}
          </span>
        </div>

        {/* Step pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-medium transition ${
                i === step
                  ? "bg-primary text-primary-foreground"
                  : i < step
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Current step content */}
        <div className="rounded-2xl border bg-card p-5">
          <div className="mb-1 flex items-center gap-2">
            <Badge variant="outline" className="text-[10px]">
              <BookOpen className="mr-1 h-3 w-3" /> Korak {step + 1}
            </Badge>
          </div>
          <h3 className="font-bold text-sm mt-2">{current.field}</h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{current.instruction}</p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Nazad
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={step === steps.length - 1}
            onClick={() => setStep(step + 1)}
          >
            Dalje <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Official links */}
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        {guide.onlineLink && (
          <a
            href={guide.onlineLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline"
          >
            <ExternalLink className="h-3 w-3" /> Online portal
          </a>
        )}
        {guide.officialInfoUrl && (
          <a
            href={guide.officialInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground underline"
          >
            <FileText className="h-3 w-3" /> Službene informacije
          </a>
        )}
      </div>
    </div>
  );
}
