import { AlertTriangle, ClipboardList, PenLine, Clock, CheckCircle } from "lucide-react";
interface Props {
  title: string;
  source: string;
  formName: string;
  whoCanApply: string;
  processingTime: string;
  requirements?: string[];
  commonMistakes?: string[];
}

const GOLD = '#C9A84C';

export default function GuideInfoHeader({ title, source, formName, whoCanApply, processingTime, requirements, commonMistakes }: Props) {
  return (
    <div className="space-y-4">
      {/* Title block */}
      <div>
        <h1 className="text-xl font-extrabold text-[#2D2D2D] sm:text-2xl">{title}</h1>
        <p className="mt-1 text-xs text-[#9CA3AF]">{"Quelle"}: {source}</p>
        <p className="mt-0.5 text-xs text-[#9CA3AF]">{"Formular"}: {formName}</p>
      </div>

      {/* Who can apply + processing time */}
      <div className="rounded-xl border border-[#E5DCC8] bg-white p-4">
        <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#2D2D2D]">
          <PenLine className="h-3.5 w-3.5" style={{ color: GOLD }} /> {"Wer kann einen Antrag stellen"}
        </h3>
        <p className="text-xs text-[#6B6B6B] leading-relaxed">{whoCanApply}</p>
        <p className="mt-3 flex items-center gap-1 text-xs">
          <Clock className="h-3 w-3" style={{ color: GOLD }} />
          <span className="font-semibold text-[#2D2D2D]">{"Bearbeitungszeit"}:</span>
          <span className="text-[#6B6B6B]">{processingTime}</span>
        </p>
      </div>

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <div className="rounded-xl border border-[#E5DCC8] bg-white p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-[#2D2D2D]">
            <ClipboardList className="h-3.5 w-3.5" style={{ color: GOLD }} /> {"Was vorbereitet werden muss"}
          </h3>
          <ul className="space-y-1.5">
            {requirements.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[#6B6B6B]">
                <CheckCircle className="h-3 w-3 mt-0.5 shrink-0" style={{ color: GOLD }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Common mistakes */}
      {commonMistakes && commonMistakes.length > 0 && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold text-red-700">
            <AlertTriangle className="h-3.5 w-3.5" /> {"Häufigste Fehler, die zur Ablehnung führen"}
          </h3>
          <ul className="space-y-1.5">
            {commonMistakes.map((m, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-red-600">
                <span className="font-bold text-red-400 shrink-0">✕</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
