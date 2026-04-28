/**
 * Shared visual primitives for all visa "Antrag" preview forms.
 *
 * They mirror the look of the official paper application AND
 * automatically render the bilingual translation under each German
 * label / section title using the central muster-i18n dictionary.
 *
 * Behaviour matches MusterFormBase:
 *   • DE language → only the German label.
 *   • BS / HR / SR → German label on top, translation in gold italic
 *     underneath, and a bilingual "z.B." example below the input.
 */
import React from "react";
import { AlertCircle, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { tTranslation, getExample } from "@/lib/muster-i18n";

type Lang = "bs" | "de" | "hr" | "sr";
const useLang = (): Lang => (useLanguage().lang as Lang) ?? "bs";

export const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const lang = useLang();
  const text = typeof children === "string" ? children : "";
  const tr = text ? tTranslation(text, lang) : null;
  return (
    <h3 className="font-bold text-[15px] border-b-2 mb-3 pb-1" style={{ borderColor: "#E0D0B0" }}>
      <span>{children}</span>
      {tr && (
        <span className="block italic font-semibold text-[12px] mt-0.5" style={{ color: "#C9A84C" }}>
          {tr}
        </span>
      )}
    </h3>
  );
};

export const GoldNote = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed"
    style={{ background: "#FFF8EC", border: "1px solid #E8D9B0", color: "#92400E" }}
  >
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: "#C9A84C" }} />{" "}
    <span>{children}</span>
  </div>
);

export const RedNote = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed"
    style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}
  >
    <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{children}</span>
  </div>
);

export const Label = ({ children }: { children: React.ReactNode }) => {
  const lang = useLang();
  const text = typeof children === "string" ? children : "";
  const tr = text ? tTranslation(text, lang) : null;
  return (
    <label className="block text-[11px] uppercase text-[#6B6B6B] mb-1 font-medium leading-tight">
      <span>{children}</span>
      {tr && (
        <span
          className="block normal-case italic font-medium text-[11px] mt-0.5"
          style={{ color: "#C9A84C" }}
        >
          {tr}
        </span>
      )}
    </label>
  );
};

export const Example = ({ children }: { children: React.ReactNode }) => {
  const lang = useLang();
  const raw = typeof children === "string" ? children : "";
  // The component is invoked with the bare example value (e.g. "Mustermann").
  // We try to find a bilingual example via the dictionary key derived from
  // the parent Field's label — but Field passes the example here directly,
  // so we just render it. Bilingual hints below inputs are handled by Field.
  return (
    <span className="italic text-[13px]" style={{ color: "#C9A84C" }}>
      {raw}
    </span>
  );
};

export const FieldRow = ({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: number;
}) => (
  <div
    className="grid gap-4 mb-3"
    style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
  >
    {children}
  </div>
);

export const Field = ({
  label,
  example,
  type = "text",
}: {
  label: string;
  example: string;
  type?: string;
}) => {
  const language = useLang();
  const labelTr = tTranslation(label, language);
  const exTr = getExample(label);
  return (
    <div>
      <label className="block text-[11px] uppercase text-[#6B6B6B] mb-1 font-medium leading-tight">
        <span>{label}</span>
        {labelTr && (
          <span
            className="block normal-case italic font-medium text-[11px] mt-0.5"
            style={{ color: "#C9A84C" }}
          >
            {labelTr}
          </span>
        )}
      </label>
      <input
        type={type}
        defaultValue={example}
        className="w-full rounded border px-2.5 py-1.5 text-sm"
        style={{ borderColor: "#C0C0C0" }}
      />
      <span className="italic text-[13px] block mt-0.5" style={{ color: "#C9A84C" }}>
        z.B. {exTr || example}
      </span>
    </div>
  );
};

export const CB = ({ checked = false, label }: { checked?: boolean; label: string }) => {
  const lang = useLang();
  const tr = tTranslation(label, lang);
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="checkbox" defaultChecked={checked} className="accent-[#C9A84C] h-4 w-4" />
      <span>
        {label}
        {tr && (
          <span className="italic ml-1" style={{ color: "#C9A84C" }}>
            ({tr})
          </span>
        )}
      </span>
    </label>
  );
};

export const PageBreak = ({ n, total = 4 }: { n: number; total?: number }) => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
    <span className="text-xs font-semibold text-muted-foreground">
      Seite {n} von {total}
    </span>
    <div className="flex-1 border-t" style={{ borderColor: "#E0D0B0" }} />
  </div>
);

// =====================================================================
// Compatibility aliases used by VisaWorkForm2.tsx (and possibly others).
// They render with the same look + bilingual behaviour as the primary
// components above so the UX stays consistent across all visa forms.
// =====================================================================
export const sectionTitle = "font-bold text-[15px] border-b-2 mb-3 pb-1";
export const labelCls = "block text-[11px] uppercase text-[#6B6B6B] mb-1 font-medium leading-tight";

export const FormField = Field;

export const BlueTip = ({ children }: { children: React.ReactNode }) => (
  <div
    className="flex items-start gap-2 rounded-lg p-3 mt-2 text-[12px] leading-relaxed"
    style={{ background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E3A8A" }}
  >
    <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" /> <span>{children}</span>
  </div>
);

export const GoldTip = GoldNote;

export const CheckRow = ({
  options,
  selected,
}: {
  options: string[];
  selected?: number;
}) => {
  const lang = useLang();
  return (
    <div className="flex flex-wrap gap-3 mt-1">
      {options.map((o, i) => {
        const tr = tTranslation(o, lang);
        return (
          <label key={o + i} className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              defaultChecked={selected === i}
              className="accent-[#C9A84C] h-4 w-4"
            />
            <span>
              {o}
              {tr && (
                <span className="italic ml-1" style={{ color: "#C9A84C" }}>
                  ({tr})
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
};

export const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline text-sm hover:text-blue-800"
  >
    {children}
  </a>
);
