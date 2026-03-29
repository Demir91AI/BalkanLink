import { useState } from "react";
import { motion } from "framer-motion";
import { calculateBenefits } from "./chatUtils";

interface Props {
  onResult: (resultText: string) => void;
  onCancel: () => void;
}

const CALC_STEPS = [
  { key: "brutto", question: "Kolika ti je bruto plaća? (€/mj)", type: "number" as const },
  { key: "children", question: "Koliko djece imaš?", type: "number" as const },
  { key: "childAges", question: "Koliko godina imaju tvoja djeca? (npr. 3, 7)", type: "text" as const },
  { key: "yearsInDE", question: "Koliko dugo živiš u Njemačkoj? (godine)", type: "number" as const },
  { key: "married", question: "Jesi li oženjen/udata?", type: "choice" as const },
];

export default function ChatBenefitCalc({ onResult, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [inputVal, setInputVal] = useState("");

  const current = CALC_STEPS[step];

  const handleSubmit = () => {
    if (current.type !== "choice" && !inputVal.trim()) return;
    const newAnswers = { ...answers, [current.key]: inputVal };
    setAnswers(newAnswers);
    setInputVal("");

    if (step < CALC_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const result = calculateBenefits({
        brutto: parseInt(newAnswers.brutto) || 0,
        children: parseInt(newAnswers.children) || 0,
        childAges: newAnswers.childAges || "",
        yearsInDE: parseInt(newAnswers.yearsInDE) || 0,
        married: newAnswers.married === "da",
      });
      onResult(result);
    }
  };

  const handleChoice = (val: string) => {
    const newAnswers = { ...answers, [current.key]: val };
    setAnswers(newAnswers);

    if (step < CALC_STEPS.length - 1) {
      setStep(step + 1);
    } else {
      const result = calculateBenefits({
        brutto: parseInt(newAnswers.brutto) || 0,
        children: parseInt(newAnswers.children) || 0,
        childAges: newAnswers.childAges || "",
        yearsInDE: parseInt(newAnswers.yearsInDE) || 0,
        married: val === "da",
      });
      onResult(result);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3 px-1">
      {/* Previous answers */}
      {Object.entries(answers).map(([key, val], i) => (
        <div key={key} className="space-y-1.5">
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-none px-4 py-2.5 text-[13px] text-white/90 max-w-[88%]" style={{ background: "#1F2937" }}>
              {CALC_STEPS[i].question}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-xl rounded-br-none px-4 py-2.5 text-[13px] text-black max-w-[88%] bg-[hsl(45,93%,49%)]">
              {val}
            </div>
          </div>
        </div>
      ))}

      {/* Current question */}
      {current && (
        <motion.div key={step} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="space-y-2.5">
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-none px-4 py-2.5 text-[13px] text-white/90 max-w-[88%]" style={{ background: "#1F2937" }}>
              {current.question}
            </div>
          </div>

          {current.type === "choice" ? (
            <div className="flex gap-2 pl-2">
              <button onClick={() => handleChoice("da")} className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-white/80 hover:bg-white/[0.07] hover:border-[hsl(45,93%,49%)]/30 active:scale-[0.98] transition-all">
                Da
              </button>
              <button onClick={() => handleChoice("ne")} className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[12px] font-medium text-white/80 hover:bg-white/[0.07] hover:border-[hsl(45,93%,49%)]/30 active:scale-[0.98] transition-all">
                Ne
              </button>
            </div>
          ) : (
            <div className="flex gap-2 pl-2">
              <input
                type={current.type === "number" ? "number" : "text"}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder={current.type === "number" ? "0" : "Unesi..."}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[13px] text-white outline-none placeholder:text-white/25 focus:border-[hsl(45,93%,49%)]/40"
                autoFocus
              />
              <button onClick={handleSubmit} className="rounded-xl px-4 py-2.5 text-[12px] font-bold text-black transition-all hover:brightness-110 active:scale-95" style={{ background: "linear-gradient(135deg, #EAB308, #F59E0B)" }}>
                →
              </button>
            </div>
          )}

          <button onClick={onCancel} className="text-[10px] text-white/20 hover:text-white/40 transition-colors pl-2">
            Otkaži
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
