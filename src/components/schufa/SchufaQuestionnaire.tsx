import { useState } from "react";
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
  label: string;
  hint?: string;
}

const ADDRESS_OPTS: Option<AddressChanges>[] = [
  { value: "0-1", label: "0-1 promjene" },
  { value: "2-3", label: "2-3 promjene" },
  { value: "4+", label: "4+ promjene" },
];

const LOAN_OPTS: Option<ActiveLoans>[] = [
  { value: "0", label: "Nemam kredit" },
  { value: "1", label: "1 kredit" },
  { value: "2-3", label: "2-3 kredita" },
  { value: "4+", label: "4+ kredita" },
];

const CARD_OPTS: Option<CardCount>[] = [
  { value: "0", label: "Nemam" },
  { value: "1-2", label: "1-2 kartice" },
  { value: "3-4", label: "3-4 kartice" },
  { value: "5+", label: "5+ kartica" },
];

const DISPO_OPTS: Option<DispoUsage>[] = [
  { value: "none", label: "Nemam Dispo (nema dispokredita)" },
  {
    value: "approved_unused",
    label: "✓ Imam odobren Dispo, ne koristim ga",
    hint: "Idealno: pozitivan signal za Schufu, banka ti vjeruje",
  },
  {
    value: "occasional",
    label: "Imam Dispo, povremeno koristim",
    hint: "Neutralno — Schufa NE vidi tvoj saldo",
  },
  {
    value: "constant",
    label: "Stalno sam u Dispo minusu (3+ mj)",
    hint: "Schufa još ne vidi, ali rizik od Mahnunga raste",
  },
  {
    value: "mahnung",
    label: "⚠️ Dobio sam Mahnung zbog Dispo",
    hint: "Negativeintrag u Schufi, ostaje 3 godine",
  },
  {
    value: "cancelled",
    label: "❌ Banka mi je otkazala Dispo",
    hint: "Teški Negativeintrag — vrlo loše",
  },
];

const BILLS_OPTS: Option<UnpaidBills>[] = [
  { value: "none", label: "Sve plaćeno na vrijeme" },
  { value: "one", label: "1 neplaćeni račun (Mahnung)" },
  { value: "multiple", label: "Više neplaćenih računa" },
  { value: "inkasso", label: "⚠️ Aktivan Inkasso postupak" },
];

const INQUIRY_OPTS: Option<SchufaInquiries>[] = [
  { value: "0-2", label: "0-2 (malo prijava)" },
  { value: "3-5", label: "3-5 (prosječno)" },
  { value: "6-10", label: "6-10 (mnogo)" },
  { value: "11+", label: "11+ (vrlo mnogo)" },
];

const INSOLVENCY_OPTS: Option<Insolvency>[] = [
  { value: "no", label: "Nikad" },
  { value: "discharged", label: "Da, završeno (Restschuldbefreiung)" },
  { value: "active", label: "Da, aktivno" },
];

export default function SchufaQuestionnaire({ onSubmit }: Props) {
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
              <strong className="text-white">Anonimno:</strong> Sve odgovore obrađujemo isključivo u
              tvom browseru. Ništa se ne šalje na server, ništa se ne čuva.
            </span>
          </p>
        </div>

        {/* 1. Godine boravka */}
        <Question label="1. Koliko godina živiš u Njemačkoj?">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={20}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="flex-1 accent-[hsl(var(--gold))]"
              aria-label="Godine boravka u Njemačkoj"
            />
            <span className="min-w-[80px] text-right font-bold text-[hsl(var(--gold))] text-lg">
              {years === 20 ? "20+" : years} {years === 1 ? "god" : "god"}
            </span>
          </div>
        </Question>

        {/* 2. Promjene adrese */}
        <Question
          label="2. Koliko puta si mijenjao adresu u zadnjih 5 godina?"
          tooltip="Česte prijave/odjave (Anmeldung) Schufa tumači kao nestabilnost."
        >
          <RadioGrid options={ADDRESS_OPTS} value={address} onChange={setAddress} />
        </Question>

        {/* 3. Aktivni krediti */}
        <Question
          label="3. Koliko aktivnih kredita / leasing ugovora imaš?"
          tooltip="Stambeni kredit, auto leasing, potrošački kredit, mobitel na rate..."
        >
          <RadioGrid options={LOAN_OPTS} value={loans} onChange={setLoans} />
        </Question>

        {/* 4. Kreditne kartice */}
        <Question label="4. Koliko kreditnih kartica posjeduješ?">
          <RadioGrid options={CARD_OPTS} value={cards} onChange={setCards} />
        </Question>

        {/* 5. Bankovni računi */}
        <Question label="5. Koliko bankovnih računa (Girokonto) imaš otvoreno?">
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={6}
              value={accounts}
              onChange={(e) => setAccounts(Number(e.target.value))}
              className="flex-1 accent-[hsl(var(--gold))]"
              aria-label="Broj bankovnih računa"
            />
            <span className="min-w-[80px] text-right font-bold text-[hsl(var(--gold))] text-lg">
              {accounts === 6 ? "6+" : accounts}
            </span>
          </div>
        </Question>

        {/* 6. DISPO — najnijansiranije pitanje */}
        <Question
          label="6. Kako koristiš Dispokredit?"
          tooltip="Schufa NE VIDI tvoj saldo na računu. Vidi samo da li imaš odobren Dispo i da li si dobio Mahnung."
        >
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
                  {opt.label}
                </div>
                {opt.hint && (
                  <div className={`text-xs mt-1 ${dispo === opt.value ? "text-[hsl(var(--gold))]" : "text-white/45"}`}>
                    {opt.hint}
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-lg bg-blue-500/10 border border-blue-500/30 p-3 text-xs text-blue-100">
            <p className="font-bold text-blue-200 mb-1">💡 Mit / Istina o Dispo:</p>
            <p>
              <strong>Mit:</strong> "Dispo uništava Schufu."<br />
              <strong>Istina:</strong> Sam Dispo je <strong>pozitivan signal</strong> (banka ti vjeruje).
              Problem nastaje samo ako ne plaćaš 90+ dana ili banka otkaže Dispo.
            </p>
          </div>
        </Question>

        {/* 7. Neplaćeni računi */}
        <Question
          label="7. Imaš li neplaćenih računa, Mahnunga ili Inkasso poziva?"
          tooltip="Mahnung nakon 90 dana neplaćanja se prijavljuje Schufi i ostaje 3 godine."
        >
          <RadioGrid options={BILLS_OPTS} value={bills} onChange={setBills} />
        </Question>

        {/* 8. Schufa upiti */}
        <Question
          label="8. Koliko si se prijavljivao za stanove/kredite u zadnjih 12 mjeseci?"
          tooltip="Svaka prijava na stan ili kredit = 1 Schufa upit. Više upita = veća percepcija rizika."
        >
          <RadioGrid options={INQUIRY_OPTS} value={inquiries} onChange={setInquiries} />
        </Question>

        {/* 9. Insolvencija */}
        <Question label="9. Da li si ikad imao Privatinsolvenciju?">
          <RadioGrid options={INSOLVENCY_OPTS} value={insolvency} onChange={setInsolvency} />
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
            Izračunaj indikativnu procjenu
            <ChevronRight className="h-5 w-5 ml-1" />
          </Button>
          <p className="mt-3 text-center text-xs text-white/40">
            Procjena se izračunava lokalno · ništa se ne šalje na server
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
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
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
          {opt.label}
        </button>
      ))}
    </div>
  );
}
