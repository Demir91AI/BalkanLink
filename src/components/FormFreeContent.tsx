import { AlertTriangle, ClipboardList, PenLine, Clock } from "lucide-react";
import { Guide, getOfficialUrl } from "@/lib/guide-data";

type LangKey = "de" | "bs" | "en";

interface FormFreeContentProps {
  guide: Guide;
  lang: LangKey;
}

/** Free content shown to all users: intro, who, docs, mistakes, processing time */
export default function FormFreeContent({ guide, lang }: FormFreeContentProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">{guide.title[lang]}</h1>
        <p className="mt-1 text-xs text-muted-foreground">Izvor: {guide.authority[lang]}</p>
        {guide.formName && (
          <p className="mt-0.5 text-xs text-muted-foreground">Formular: {guide.formName[lang]}</p>
        )}
      </div>

      {/* Who can apply */}
      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <PenLine className="h-3.5 w-3.5 text-primary" /> Ko može podnijeti zahtjev
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">{guide.who[lang]}</p>
        <p className="mt-3 text-xs">
          <span className="font-semibold flex items-center gap-1">
            <Clock className="h-3 w-3" /> Vrijeme obrade:
          </span>
          <span className="text-muted-foreground">{guide.processingTime[lang]}</span>
        </p>
      </div>

      {/* Documents needed */}
      <div className="rounded-2xl border border-border/60 bg-card p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold">
          <ClipboardList className="h-3.5 w-3.5 text-primary" /> Šta treba pripremiti
        </h3>
        <ul className="space-y-1 pl-4 list-disc">
          {guide.documents[lang].map((d, i) => (
            <li key={i} className="text-xs text-muted-foreground">{d}</li>
          ))}
        </ul>
      </div>

      {/* Common mistakes */}
      {guide.commonMistakes[lang].length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700 dark:text-red-400">
            <AlertTriangle className="h-3.5 w-3.5" /> Najčešće greške
          </h3>
          <ul className="space-y-1 pl-4 list-disc">
            {guide.commonMistakes[lang].map((m, i) => (
              <li key={i} className="text-xs text-red-600 dark:text-red-300">{m}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Official link — small text */}
      {getOfficialUrl(guide) && (
        <a
          href={getOfficialUrl(guide)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-[12px] text-muted-foreground hover:text-foreground transition-colors"
        >
          🔗 Provjeri na službenoj stranici →
        </a>
      )}
    </div>
  );
}
