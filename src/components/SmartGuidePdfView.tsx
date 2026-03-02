import { FileText, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Tables } from "@/integrations/supabase/types";

type FormField = Tables<"form_fields">;

interface Props {
  fields: FormField[];
  pdfUrl: string;
  activeField: string | null;
  onFieldSelect: (key: string | null) => void;
}

export default function SmartGuidePdfView({ fields, pdfUrl, activeField, onFieldSelect }: Props) {
  const { t } = useLanguage();
  const selectedField = fields.find((f) => f.field_key === activeField);

  return (
    <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_340px]">
      {/* Left: PDF embed */}
      <div className="rounded-2xl border bg-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium flex items-center gap-1"><FileText className="h-3 w-3" /> {t("sg.pdfPreview")}</p>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:underline flex items-center gap-1">
            {t("sg.openNewTab")} <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <iframe
          src={`${pdfUrl}#page=1`}
          className="h-[600px] w-full rounded-xl border"
          title="PDF pregled"
        />
        <p className="mt-2 text-[10px] text-muted-foreground text-center">
          {t("sg.clickFieldHint")}
        </p>
      </div>

      {/* Right: Field list + help panel */}
      <div className="space-y-3">
        <p className="text-xs font-bold">{t("sg.fieldsOnForm")}</p>
        <div className="max-h-[300px] space-y-1 overflow-y-auto rounded-xl border p-2">
          {fields.map((f) => (
            <button
              key={f.field_key}
              onClick={() => onFieldSelect(f.field_key === activeField ? null : f.field_key)}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs transition ${
                f.field_key === activeField
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <span className="font-medium">{f.label_de}</span>
              <br />
              <span className="text-[10px] opacity-70">{f.label_bs}</span>
            </button>
          ))}
        </div>

        {/* Help panel */}
        {selectedField ? (
          <div className="rounded-2xl border bg-card p-4 space-y-3">
            <div>
              <p className="text-xs font-bold text-primary">{selectedField.label_de}</p>
              <p className="text-xs font-medium">{selectedField.label_bs}</p>
            </div>
            {selectedField.help_text_bs && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground">Šta upisati ovdje:</p>
                <p className="text-xs">{selectedField.help_text_bs}</p>
              </div>
            )}
            {selectedField.example && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground">Primjer:</p>
                <p className="text-xs font-mono bg-muted/50 rounded px-2 py-1 inline-block">{selectedField.example}</p>
              </div>
            )}
            {selectedField.where_to_find_bs && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground">Gdje to nađeš:</p>
                <p className="text-xs">{selectedField.where_to_find_bs}</p>
              </div>
            )}
            {selectedField.common_mistakes_bs && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground">Najčešće greške:</p>
                <p className="text-xs text-red-600 dark:text-red-400">{selectedField.common_mistakes_bs}</p>
              </div>
            )}
            {selectedField.format_hint_bs && (
              <div>
                <p className="text-[10px] font-semibold text-muted-foreground">Kako upisati:</p>
                <p className="text-xs">{selectedField.format_hint_bs}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed p-6 text-center">
            <p className="text-xs text-muted-foreground">{t("sg.clickToExplain")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
