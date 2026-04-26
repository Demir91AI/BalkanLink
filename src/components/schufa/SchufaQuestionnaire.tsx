import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type {
  SimInput,
  DispoUsage,
  CardCount,
  ActiveLoans,
  AddressChanges,
  SchufaInquiries,
  UnpaidBills,
  Insolvency,
} from "@/lib/schufa-simulator";

interface Props {
  onSubmit: (input: SimInput) => void;
}

interface Option<T extends string> {
  value: T;
  /** i18n key inside `schufa.questionnaire.*` */
  labelKey: string;
  hintKey?: string;
}

const ADDRESS_OPTS: Option<AddressChanges>[] = [
  { value: "0-1", labelKey: "address.01" },
  { value: "2-3", labelKey: "address.23" },
  { value: "4+", labelKey: "address.4plus" },
];

const LOAN_OPTS: Option<ActiveLoans>[] = [
  { value: "0", labelKey: "loans.0" },
  { value: "1", labelKey: "loans.1" },
  { value: "2-3", labelKey: "loans.23" },
  { value: "4+", labelKey: "loans.4plus" },
];

const CARD_OPTS: Option<CardCount>[] = [
  { value: "0", labelKey: "cards.0" },
  { value: "1-2", labelKey: "cards.12" },
  { value: "3-4", labelKey: "cards.34" },
  { value: "5+", labelKey: "cards.5plus" },
];

const DISPO_OPTS: Option<DispoUsage>[] = [
  { value: "none", labelKey: "dispo.none" },
  { value: "approved_unused", labelKey: "dispo.approvedUnused", hintKey: "dispo.approvedUnusedHint" },
  { value: "occasional", labelKey: "dispo.occasional", hintKey: "dispo.occasionalHint" },
  { value: "constant", labelKey: "dispo.constant", hintKey: "dispo.constantHint" },
  { value: "mahnung", labelKey: "dispo.mahnung", hintKey: "dispo.mahnungHint" },
  { value: "cancelled", labelKey: "dispo.cancelled", hintKey: "dispo.cancelledHint" },
];

const BILLS_OPTS: Option<UnpaidBills>[] = [
  { value: "none", labelKey: "bills.none" },
  { value: "one", labelKey: "bills.one" },
  { value: "multiple", labelKey: "bills.multiple" },
  { value: "inkasso", labelKey: "bills.inkasso" },
];

const INQUIRY_OPTS: Option<SchufaInquiries>[] = [
  { value: "0-2", labelKey: "inquiries.02" },
  { value: "3-5", labelKey: "inquiries.35" },
  { value: "6-10", labelKey: "inquiries.610" },
  { value: "11+", labelKey: "inquiries.11plus" },
];

const INSOLVENCY_OPTS: Option<Insolvency>[] = [
  { value: "no", labelKey: "insolvency.no" },
  { value: "discharged", labelKey: "insolvency.discharged" },
  { value: "active", labelKey: "insolvency.active" },
];

export default function SchufaQuestionnaire({ onSubmit }: Props) {
  const { t } = useTranslation("schufa");
  const [years, setYears] = useState<number>(3);
  const [accounts, setAccounts] = useState<number>(1);
  const [address, setAddress] = useState<AddressChanges>("0-1");
  const [loans, setLoans] = useState<ActiveLoans>("0");
  const [cards, setCards] = useState<CardCount>("1-2");
  const [dispo, setDispo] = useState<DispoUsage>("none");
  const [bills, setBills] = useState<UnpaidBills>("none");
  const [inquiries, setInquiries] = useState<SchufaInquiries>("0-2");
  const [insolvency, setInsolvency] = useState<Insolvency>("no");

  const handleSubmit = () => {
    onSubmit({
      yearsInGermany: years,
      addressChanges: address,
      activeLoans: loans,
      cardCount: cards,
      bankAccounts: accounts,
      dispo,
      unpaidBills: bills,
      schufaInquiries: inquiries,
      insolvency,
    });
  };

  return (
    <TooltipProvider>
      <div className="space-y-7">
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 text-sm text-white/70">
          <p className="flex items-start gap-2">
            <Info className="h-4 w-4 shrink-0 text-[hsl(var(--gold))] mt-0.5" />
            <span>
              <strong className="text-white">{t("questionnaire.anonymousLabel")}</strong>{" "}
              {t("questionnaire.anonymousBody")}
            </span>
          </p>
        </div>

        <Question label={t("questionnaire.q1")}>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={20}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="flex-1 accent-[hsl(var(--gold))]"
              aria-label={t("questionnaire.q1Aria")}
            />
            <span className="min-w-[80px] text-right font-bold text-[hsl(var(--gold))] text-lg">
              {years === 20 ? "20+" : years} {t("questionnaire.q1Suffix")}
            </span>
          </div>
        </Question>

        <Question label={t("questionnaire.q2")} tooltip={t("questionnaire.q2Tooltip")}>
          <RadioGrid options={ADDRESS_OPTS} value={address} onChange={setAddress} t={t} />
        </Question>

        <Question label={t("questionnaire.q3")} tooltip={t("questionnaire.q3Tooltip")}>
          <RadioGrid options={LOAN_OPTS} value={loans} onChange={setLoans} t={t} />
        </Question>

        <Question label={t("questionnaire.q4")}>
          <RadioGrid options={CARD_OPTS} value={cards} onChange={setCards} t={t} />
        </Question>

        <Question label={t("questionnaire.q5")}>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={6}
              value={accounts}
              onChange={(e) => setAccounts(Number(e.target.value))}
              className="flex-1 accent-[hsl(var(--gold))]"
              aria-label={t("questionnaire.q5Aria")}
            />
            <span className="min-w-[80px] text-right font-bold text-[hsl(var(--gold))] text-lg">
              {accounts === 6 ? "6+" : accounts}
            </span>
          </div>
        </Question>

        <Question label={t("questionnaire.q6")} tooltip={t("questionnaire.q6Tooltip")}>
          <div className="space-y-2">
            {DISPO_OPTS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setDispo(opt.value)}
                className={`w-full text-left rounded-xl px-4 py-3 border transition-all ${
                  dispo === opt.value
                    ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <div className={`text-sm font-medium ${dispo === opt.value ? "text-white" : "text-white/85"}`}>
                  {t(`questionnaire.${opt.labelKey}`)}
                </div>
                {opt.hintKey && (
                  <div className={`text-xs mt-1 ${dispo === opt.value ? "text-[hsl(var(--gold))]" : "text-white/45"}`}>
                    {t(`questionnaire.${opt.hintKey}`)}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-xs text-blue-100">
            <p className="font-bold text-blue-200 mb-1">{t("questionnaire.q6MythTitle")}</p>
            <p>
              <strong>{t("questionnaire.q6MythLabel")}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: t("questionnaire.q6MythBody") }} />
              <br />
              <strong>{t("questionnaire.q6TruthLabel")}</strong>{" "}
              <span dangerouslySetInnerHTML={{ __html: t("questionnaire.q6TruthBody") }} />
            </p>
          </div>
        </Question>

        <Question label={t("questionnaire.q7")} tooltip={t("questionnaire.q7Tooltip")}>
          <RadioGrid options={BILLS_OPTS} value={bills} onChange={setBills} t={t} />
        </Question>

        <Question label={t("questionnaire.q8")} tooltip={t("questionnaire.q8Tooltip")}>
          <RadioGrid options={INQUIRY_OPTS} value={inquiries} onChange={setInquiries} t={t} />
        </Question>

        <Question label={t("questionnaire.q9")}>
          <RadioGrid options={INSOLVENCY_OPTS} value={insolvency} onChange={setInsolvency} t={t} />
        </Question>

        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            className="w-full h-14 font-bold text-base text-[hsl(225,45%,6%)] transition-all hover:scale-[1.01]"
            style={{
              background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
              boxShadow: "0 4px 24px hsla(43,70%,53%,0.35)",
            }}
          >
            {t("questionnaire.submit")}
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
          <p className="mt-3 text-center text-xs text-white/40">
            {t("questionnaire.submitNote")}
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}

function Question({
  label,
  tooltip,
  children,
}: {
  label: string;
  tooltip?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5">
      <div className="flex items-start justify-between gap-2 mb-4">
        <h3 className="text-base font-bold text-white leading-snug">{label}</h3>
        {tooltip && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="shrink-0 text-white/40 hover:text-[hsl(var(--gold))]">
                <Info className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-[260px] text-xs">
              {tooltip}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      {children}
    </div>
  );
}

function RadioGrid<T extends string>({
  options,
  value,
  onChange,
  t,
}: {
  options: Option<T>[];
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
  t: (key: string) => string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`text-left rounded-xl px-4 py-3 border transition-all text-sm ${
            value === opt.value
              ? "border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-white font-medium"
              : "border-white/10 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10"
          }`}
        >
          {t(`questionnaire.${opt.labelKey}`)}
        </button>
      ))}
    </div>
  );
}
