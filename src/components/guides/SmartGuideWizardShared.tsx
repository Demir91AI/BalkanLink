import { useState } from "react";
import { useSubscription } from "@/hooks/useSubscription";
import AuthGate from "@/components/AuthGate";
import MembershipOffer from "@/components/membership/MembershipOffer";
import SmartGuide, { type GuideBlockKind } from "@/components/guide-first/SmartGuide";
import { useGuideContext } from "@/components/guide-first/GuideContext";

export interface StepData {
  deField: string;
  bhsField: string;
  whatToWrite: string;
  whereToFind?: string;
  format?: string;
  commonMistake: string;
  whenToLeaveEmpty?: string;
  example?: string;
  note?: string;
  /** Explicit verified official-field mapping only; default is informational. */
  fieldVerified?: boolean;
}
interface Props {
  steps: StepData[];
  free?: boolean;
  finishLabel?: string;
  onFinish?: () => void;
  guideId?: string;
}
const FREE_STEPS = 2;

/** Legacy API/access preserved; visual navigation delegates to the one template. */
export default function SmartGuideWizardShared({ steps, free = false, finishLabel, onFinish, guideId }: Props) {
  const [step, setStep] = useState(0);
  const { isPremium } = useSubscription();
  const context = useGuideContext();
  const go = (next: number) => setStep(!free && !isPremium && next >= FREE_STEPS ? FREE_STEPS : next);
  return <AuthGate><SmartGuide
    id={guideId ?? context?.slug}
    source={context?.source}
    steps={steps.map((s, i) => {
      const values: [GuideBlockKind, string | undefined][] = [
        [s.fieldVerified ? "field" : "action", s.whatToWrite], ["where", s.whereToFind],
        ["format", s.format], ["mistake", s.commonMistake], ["empty", s.whenToLeaveEmpty],
        ["example", s.example], ["note", s.note],
      ];
      return { id: String(i), title: s.bhsField || s.deField, reference: s.deField,
        blocks: values.flatMap(([kind, text]) => text ? [{ kind, text }] : []) };
    })}
    currentStep={step} onStepChange={go}
    isLocked={(i) => !free && !isPremium && i >= FREE_STEPS}
    lockedContent={<MembershipOffer variant="compact" />}
    onFinish={onFinish} finishLabel={finishLabel}
  /></AuthGate>;
}
