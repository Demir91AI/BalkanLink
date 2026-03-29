import { useState, useMemo, useRef, useEffect } from "react";
import { Search } from "lucide-react";

type Origin = "noneu" | "eu";
type Job = "yes" | "no";
type Family = "solo" | "partner" | "family";

interface CityRegion {
  label: string;
  sqm: number;
  cities: string[];
}

const REGIONS: CityRegion[] = [
  {
    label: "München / Bayern",
    sqm: 22,
    cities: ["München", "Augsburg", "Nürnberg", "Regensburg", "Ingolstadt", "Würzburg", "Fürth", "Erlangen", "Rosenheim", "Bamberg"],
  },
  {
    label: "Frankfurt / Hamburg",
    sqm: 17,
    cities: ["Frankfurt am Main", "Hamburg", "Offenbach", "Wiesbaden", "Mainz", "Darmstadt"],
  },
  {
    label: "Berlin / Düsseldorf / Köln",
    sqm: 15,
    cities: ["Berlin", "Düsseldorf", "Köln", "Bonn", "Potsdam", "Leverkusen", "Neuss"],
  },
  {
    label: "Stuttgart / Nürnberg",
    sqm: 13,
    cities: ["Stuttgart", "Heilbronn", "Karlsruhe", "Mannheim", "Pforzheim", "Esslingen", "Ludwigsburg", "Reutlingen", "Ulm"],
  },
  {
    label: "Manji gradovi / Ostala mjesta",
    sqm: 9,
    cities: [
      "Leipzig", "Dresden", "Dortmund", "Essen", "Bremen", "Hannover", "Duisburg", "Bochum",
      "Wuppertal", "Bielefeld", "Münster", "Braunschweig", "Kiel", "Chemnitz", "Halle",
      "Magdeburg", "Freiburg", "Erfurt", "Rostock", "Kassel", "Saarbrücken", "Oldenburg",
      "Osnabrück", "Göttingen", "Wolfsburg", "Cottbus", "Schwerin", "Jena", "Trier",
    ],
  },
];

const ALL_CITIES = REGIONS.flatMap((r) =>
  r.cities.map((c) => ({ name: c, region: r.label, sqm: r.sqm }))
);

const AREA = 75;
const NEBENKOSTEN = 3 * AREA; // 225

export default function CostCalculator() {
  const [query, setQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<{ name: string; region: string; sqm: number } | null>(null);
  const [open, setOpen] = useState(false);
  const [origin, setOrigin] = useState<Origin>("noneu");
  const [hasJob, setHasJob] = useState<Job>("yes");
  const [family, setFamily] = useState<Family>("solo");
  const [showResult, setShowResult] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ALL_CITIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  const sqm = selectedCity?.sqm ?? 15;
  const regionLabel = selectedCity?.region ?? "Berlin / Düsseldorf / Köln";

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

  const pickCity = (c: typeof ALL_CITIES[number]) => {
    setSelectedCity(c);
    setQuery(c.name);
    setOpen(false);
    reset();
  };

  const pickRegion = (r: CityRegion) => {
    setSelectedCity({ name: r.label, region: r.label, sqm: r.sqm });
    setQuery(r.label);
    setOpen(false);
    reset();
  };

  return (
    <div className="mb-8 rounded-xl border border-border bg-card p-5">
      <h3 className="text-base font-bold text-foreground mb-4">💰 Koliko para trebaš pripremiti?</h3>

      <div className="space-y-4">
        {/* City search */}
        <div ref={wrapperRef} className="relative">
          <label className="block text-xs font-semibold text-foreground mb-1.5">Koji grad / region?</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={query}
              placeholder="Upiši grad (npr. München, Berlin...)"
              onChange={(e) => { setQuery(e.target.value); setOpen(true); reset(); }}
              onFocus={() => setOpen(true)}
              className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {open && (
            <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg max-h-64 overflow-y-auto">
              {/* Show search results if typing */}
              {query.trim() && filtered.length > 0 && (
                <div>
                  {filtered.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => pickCity(c)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span className="text-foreground">{c.name}</span>
                      <span className="text-xs text-muted-foreground">~{c.sqm}€/m²</span>
                    </button>
                  ))}
                </div>
              )}

              {/* No results */}
              {query.trim() && filtered.length === 0 && (
                <p className="px-3 py-2.5 text-sm text-muted-foreground">Nema rezultata</p>
              )}

              {/* Default: show regions when empty */}
              {!query.trim() && (
                <div>
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Odaberi region</p>
                  {REGIONS.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => pickRegion(r)}
                      className="w-full text-left px-3 py-2.5 text-sm hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span className="text-foreground">{r.label}</span>
                      <span className="text-xs text-muted-foreground">~{r.sqm}€/m²</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {selectedCity && (
            <p className="mt-1 text-xs text-muted-foreground">
              Region: {selectedCity.region} — ~{selectedCity.sqm}€/m²
            </p>
          )}
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
              📊 Tvoja procjena za {selectedCity?.name ?? regionLabel}:
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
            <Row label="Hrana i život (prvi mj)" value={hrana} />
            <Row label={hasJob === "yes" ? "Buffer za nepredviđeno" : "Buffer (bez posla)"} value={buffer} />
            {family === "family" && <Row label="Porodica dodatak" value={porodicaDodatak} />}

            <div className="border-t-2 border-[hsl(var(--brand-orange))]/50 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[hsl(var(--brand-orange))]">💰 UKUPNO ZA POČETAK:</span>
                <span className="text-lg font-bold text-[hsl(var(--brand-orange))]">~{fmt(totalStart)}€</span>
              </div>
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

            <div className="border-t-2 border-border pt-3 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-foreground">= UKUPNO MJESEČNO:</span>
                <span className="text-lg font-bold text-foreground">~{fmt(mjesecno)}€</span>
              </div>
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
