import { useState } from "react";

type Origin = "noneu" | "eu";
type Job = "yes" | "no";
type Family = "solo" | "partner" | "family";

export default function CostCalculator() {
  const [origin, setOrigin] = useState<Origin>("noneu");
  const [hasJob, setHasJob] = useState<Job>("yes");
  const [family, setFamily] = useState<Family>("solo");
  const [showResult, setShowResult] = useState(false);

  const travel = origin === "eu" ? 100 : 200;
  const kaution = 1800;
  const rent = 600;
  const food = 400;
  const admin = 150;
  let extra = 0;
  if (hasJob === "no") extra += 1500;
  if (family === "partner") extra += 1500;
  if (family === "family") extra += 3000;
  const total = travel + kaution + rent + food + admin + extra;

  const handleCalculate = () => setShowResult(true);

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-bold text-foreground mb-4">💰 Koliko para trebaš pripremiti?</h3>

      <div className="space-y-4">
        {/* Origin */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Odakle dolaziš?</label>
          <select
            value={origin}
            onChange={(e) => { setOrigin(e.target.value as Origin); setShowResult(false); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            <option value="noneu">BiH / Srbija / Kosovo / Makedonija / Albanija / Crna Gora</option>
            <option value="eu">Hrvatska / Slovenija</option>
          </select>
        </div>

        {/* Job */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Imaš li već posao u Njemačkoj?</label>
          <div className="flex gap-3">
            {(["yes", "no"] as const).map((v) => (
              <button
                key={v}
                onClick={() => { setHasJob(v); setShowResult(false); }}
                className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                  hasJob === v
                    ? "border-[hsl(var(--brand-orange))] bg-[hsl(var(--brand-orange))]/15 text-[hsl(var(--brand-orange))]"
                    : "border-border bg-background text-muted-foreground hover:bg-accent"
                }`}
              >
                {v === "yes" ? "Da" : "Ne"}
              </button>
            ))}
          </div>
        </div>

        {/* Family */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Broj ukućana</label>
          <select
            value={family}
            onChange={(e) => { setFamily(e.target.value as Family); setShowResult(false); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            <option value="solo">Samo ja</option>
            <option value="partner">Ja + partner</option>
            <option value="family">Porodica s djecom</option>
          </select>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full rounded-lg bg-[hsl(var(--brand-orange))] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
        >
          Izračunaj
        </button>

        {showResult && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-2">
            <p className="text-sm font-bold text-foreground mb-3">📊 Tvoja procjena:</p>
            <Row label="Putni troškovi" value={travel} />
            <Row label="Kaution (depozit za stan)" value={kaution} />
            <Row label="Prva kirija" value={rent} />
            <Row label="Hrana i život (prvi mj)" value={food} />
            <Row label="Administrativni troškovi" value={admin} />
            {hasJob === "no" && <Row label="Buffer (bez posla)" value={1500} />}
            {family === "partner" && <Row label="Partner dodatak" value={1500} />}
            {family === "family" && <Row label="Porodica dodatak" value={3000} />}

            <div className="border-t border-border pt-3 mt-3">
              <p className="text-base font-bold text-[hsl(var(--brand-orange))]">
                💰 UKUPNO PREPORUČENO: {total.toLocaleString("de-DE")}€
              </p>
            </div>

            <div className="mt-3 rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3">
              <p className="text-xs text-muted-foreground">
                ⚠️ Ovo je orijentaciona procjena. Stvarni troškovi zavise od grada i situacije.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">~{value}€</span>
    </div>
  );
}
