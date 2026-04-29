import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { buildLocalizedOnboardingSteps, type UserProfile, saveProfile, generateTodoList } from "./chatUtils";

interface Props {
  onComplete: (profile: UserProfile, todoMessage: string) => void;
}

export default function ChatOnboarding({ onComplete }: Props) {
  const { t } = useTranslation("common");
  const steps = useMemo(() => buildLocalizedOnboardingSteps((k, d) => t(k, { defaultValue: d || "" }) as string), [t]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const current = steps[step];

  const handleSelect = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      const profile: UserProfile = {
        residencyStatus: newAnswers[0],
        hasChildren: newAnswers[1],
        workStatus: newAnswers[2],
        completedAt: new Date().toISOString(),
      };
      saveProfile(profile);
      const todo = generateTodoList(profile);
      onComplete(profile, todo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3 px-1"
    >
      {answers.map((ans, i) => (
        <div key={i} className="space-y-1.5">
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-none px-4 py-2.5 text-[13px] text-white/90 max-w-[88%]" style={{ background: "#1F2937" }}>
              {steps[i].question}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="rounded-xl rounded-br-none px-4 py-2.5 text-[13px] text-black max-w-[88%] bg-[hsl(45,93%,49%)]">
              {steps[i].options.find(o => o.value === ans)?.label}
            </div>
          </div>
        </div>
      ))}

      {current && (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5"
        >
          <div className="flex justify-start">
            <div className="rounded-xl rounded-bl-none px-4 py-2.5 text-[13px] text-white/90 max-w-[88%]" style={{ background: "#1F2937" }}>
              {current.question}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pl-2">
            {current.options.map((opt, i) => (
              <motion.button
                key={opt.value}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => handleSelect(opt.value)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-left text-[12px] font-medium text-white/80 transition-all hover:bg-white/[0.07] hover:border-[hsl(45,93%,49%)]/30 active:scale-[0.98]"
              >
                {opt.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
