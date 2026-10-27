import MembershipOffer from "@/components/membership/MembershipOffer";
import { useNavigate } from "react-router-dom";
import { hasManagedBackHistory, useHistorySearchState } from "@/hooks/useHistorySearchState";
import { useSubscription } from "@/hooks/useSubscription";
import type { Guide } from "@/lib/guide-data";
import SmartGuide, { type GuideBlockKind } from "@/components/guide-first/SmartGuide";
import { useGuideContext } from "@/components/guide-first/GuideContext";

type LangKey = "de" | "bs" | "en";
const FREE_STEPS = 2;
export default function FormSmartGuide({ guide, lang }: { guide: Guide; lang: LangKey }) {
  const navigate = useNavigate();
  const { searchParams, setSearchState } = useHistorySearchState();
  const { isPremium } = useSubscription();
  const context = useGuideContext();
  const steps = guide.steps[lang]?.length ? guide.steps[lang] : guide.steps.bs;
  const raw = Number(searchParams.get("guideStep") ?? "1");
  const step = Number.isFinite(raw) ? Math.min(Math.max(raw - 1, 0), Math.max(steps.length - 1, 0)) : 0;
  const go = (next: number) => {
    const n = !isPremium && next >= FREE_STEPS ? FREE_STEPS : next;
    if (n === step - 1 && hasManagedBackHistory("blGuideStep")) { navigate(-1); return; }
    setSearchState({ guideStep: n === 0 ? null : String(n + 1) }, { state: { blGuideStep: true } });
  };
  return <SmartGuide id={guide.slug} source={context?.source} currentStep={step} onStepChange={go}
    isLocked={(i) => !isPremium && i >= FREE_STEPS} lockedContent={<MembershipOffer variant="compact" />}
    steps={steps.map((s, i) => ({ id: String(i), title: s.field,
      blocks: [ { kind: "action" as const, text: s.instruction }, ...(s.cards ?? []).flatMap((c) => {
        const values: [GuideBlockKind, string][] = [["action", c.whatToWrite], ["where", c.whereToFind], ["format", c.format], ["mistake", c.commonMistakes], ["empty", c.whenToLeaveEmpty], ["example", c.example]];
        return values.flatMap(([kind, text]) => text ? [{ kind, text }] : []);
      }) ] }))} />;
}
