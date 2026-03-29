import { useState } from "react";

type Origin = "noneu" | "eu";
type Job = "yes" | "no";
type Family = "solo" | "partner" | "family";
type City = "muenchen" | "frankfurt" | "berlin" | "stuttgart" | "klein";

const CITY_OPTIONS: { value: City; label: string; sqm: number }[] = [
  { value: "muenchen", label: "München / Bayern", sqm: 22 },
  { value: "frankfurt", label: "Frankfurt / Hamburg", sqm: 17 },
  { value: "berlin", label: "Berlin / Düsseldorf / Köln", sqm: 15 },
  { value: "stuttgart", label: "Stuttgart / Nürnberg", sqm: 13 },
  { value: "klein", label: "Manji gradovi / Ostala mjesta", sqm: 9 },
];

const CITY_LABELS: Record<City, string> = {
  muenchen: "München / Bayern",
  frankfurt: "Frankfurt / Hamburg",
  berlin: "Berlin / Düsseldorf / Köln",
  stuttgart: "Stuttgart / Nürnberg",
  klein: "Manji gradovi",
};

const AREA = 75;
const NEBENKOSTEN_SQM = 3;
const NEBENKOSTEN = NEBENKOSTEN_SQM * AREA; // 225

export default function CostCalculator() {
  const [city, setCity] = useState<City>("berlin");
  const [origin, setOrigin] = useState<Origin>("noneu");
  const [hasJob, setHasJob] = useState<Job>("yes");
  const [family, setFamily] = useState<Family>("solo");
  const [showResult, setShowResult] = useState(false);

  const sqm = CITY_OPTIONS.find((c) => c.value === city)!.sqm;
  const kaltmiete = sqm * AREA;
  const warmmiete = kaltmiete + NEBENKOSTEN;
  const kaucija = kaltmiete * 3;
  const prvaKirija = warmmiete;
  const hrana = family === "solo" ? 500 : family === "partner" ? 900 : 1400;
  const putniTroskovi = origin === "eu" ? 150 : 250;
  const admin = 200;
  const buffer = hasJob === "yes" ? 1000 : 3000;
  const porodicaDodatak = family === "family" ? 2000 : 0;

  const totalStart = kaucija + prvaKirija + putniTroskovi + admin + hrana + buffer + porodicaDodatak;
  const mjesecno = warmmiete + hrana + 100 + 30 + 200;

  const reset = () => setShowResult(false);
  const fmt = (n: number) => n.toLocaleString("de-DE");

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-bold text-foreground mb-4">💰 Koliko para trebaš pripremiti?</h3>

      <div className="space-y-4">
        {/* City */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Koji grad / region?</label>
          <select
            value={city}
            onChange={(e) => { setCity(e.target.value as City); reset(); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            {CITY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label} (~{c.sqm}€/m²)</option>
            ))}
          </select>
        </div>

        {/* Origin */}
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1.5">Odakle dolaziš?</label>
          <select
            value={origin}
            onChange={(e) => { setOrigin(e.target.value as Origin); reset(); }}
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
                onClick={() => { setHasJob(v); reset(); }}
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
            onChange={(e) => { setFamily(e.target.value as Family); reset(); }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
          >
            <option value="solo">Samo ja</option>
            <option value="partner">Ja + partner</option>
            <option value="family">Porodica s djecom</option>
          </select>
        </div>

        <button
          onClick={() => setShowResult(true)}
          className="w-full rounded-lg bg-[hsl(var(--brand-orange))] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
        >
          Izračunaj
        </button>

        {showResult && (
          <div className="rounded-xl border border-border bg-background p-4 space-y-1">
            <p className="text-sm font-bold text-foreground mb-3">
              📊 Tvoja procjena za {CITY_LABELS[city]}:
            </p>

            {/* Rent breakdown */}
            <Row label={`Stan (${AREA}m², Kaltmiete)`} value={kaltmiete} suffix="/mj" />
            <Row label="+ Nebenkosten" value={NEBENKOSTEN} suffix="/mj" />
            <div className="border-t border-border pt-1 mt-1">
              <Row label="= Warmmiete ukupno" value={warmmiete} suffix="/mj" bold />
            </div>

            {/* One-time costs */}
            <p className="text-xs font-bold text-foreground pt-3 pb-1 uppercase tracking-wide">Jednokratni troškovi</p>
            <Row label="Kaution (3 kirije)" value={kaucija} />
            <Row label="Prva kirija + Nebenkosten" value={prvaKirija} />
            <Row label="Putni troškovi" value={putniTroskovi} />
            <Row label="Admin (prijevodi, apostille)" value={admin} />
            <Row label={`Hrana i život (prvi mj)`} value={hrana} />
            <Row label={hasJob === "yes" ? "Buffer za nepredviđeno" : "Buffer (bez posla)"} value={buffer} />
            {family === "family" && <Row label="Porodica dodatak" value={porodicaDodatak} />}

            <div className="border-t border-border pt-3 mt-3">
              <p className="text-base font-bold text-[hsl(var(--brand-orange))]">
                💰 UKUPNO ZA POČETAK: ~{fmt(totalStart)}€
              </p>
            </div>

            {/* Monthly costs */}
            <p className="text-xs font-bold text-foreground pt-4 pb-1 uppercase tracking-wide">
              📅 Mjesečni troškovi nakon dolaska
            </p>
            <Row label="Kirija (Warmmiete)" value={warmmiete} />
            <Row label="Hrana" value={hrana} />
            <Row label="Prevoz (ÖPNV mjesečna)" value={100} />
            <Row label="Mobitel" value={30} />
            <Row label="Ostalo" value={200} />

            <div className="border-t border-border pt-3 mt-2">
              <p className="text-base font-bold text-foreground">
                = UKUPNO MJESEČNO: ~{fmt(mjesecno)}€
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mt-3 rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3">
              <p className="text-xs text-muted-foreground">
                ⚠️ Ovo je orijentaciona procjena bazirana na prosječnim cijenama 2025. Stvarni troškovi zavise od konkretne lokacije i situacije.
                <br />
                <span className="text-[10px]">Izvor: Statistisches Bundesamt, empirica 2025</span>
              </p>
            </div>

            {/* Tip box */}
            <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-semibold text-foreground">Savjet:</span> Balkanci koji dolaze često podcijene troškove stana. U Münchenu 75m² stan košta ~1.875€ toplo (Warmmiete) — planirati realno!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, suffix, bold }: { label: string; value: number; suffix?: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={`${bold ? "font-bold" : "font-semibold"} text-foreground`}>
        ~{value.toLocaleString("de-DE")}€{suffix || ""}
      </span>
    </div>
  );
}
