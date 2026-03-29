/**
 * Prosječni troškovi života po pokrajini — statički pregled za 2025.
 */

const BUNDESLAENDER: {
  name: string;
  rent: string;
  rentRange: string;
  food: string;
  transport: string;
  total: string;
  startkapital: string;
  note?: string;
}[] = [
  {
    name: "Bayern (München, Nürnberg, Augsburg)",
    rent: "1.400–1.900€",
    rentRange: "München ~1.900€, Nürnberg ~1.100€, manji gradovi ~850€",
    food: "450–600€",
    transport: "49–80€",
    total: "2.000–2.700€",
    startkapital: "10.000–15.000€",
    note: "Najskuplji region. München je ekstremno skup za stanovanje.",
  },
  {
    name: "Hessen (Frankfurt, Wiesbaden, Darmstadt)",
    rent: "1.100–1.500€",
    rentRange: "Frankfurt ~1.400€, Kassel ~750€, manji gradovi ~700€",
    food: "400–550€",
    transport: "49–75€",
    total: "1.700–2.200€",
    startkapital: "8.000–12.000€",
  },
  {
    name: "Hamburg",
    rent: "1.100–1.500€",
    rentRange: "Centar ~1.400€, periferija ~1.000€",
    food: "400–550€",
    transport: "49–70€",
    total: "1.700–2.200€",
    startkapital: "8.000–12.000€",
  },
  {
    name: "Baden-Württemberg (Stuttgart, Karlsruhe, Mannheim)",
    rent: "1.000–1.400€",
    rentRange: "Stuttgart ~1.300€, Karlsruhe ~950€, manji gradovi ~750€",
    food: "400–550€",
    transport: "49–70€",
    total: "1.600–2.100€",
    startkapital: "8.000–11.000€",
  },
  {
    name: "Berlin",
    rent: "900–1.300€",
    rentRange: "Centar ~1.200€, Spandau/Marzahn ~850€",
    food: "400–500€",
    transport: "49€",
    total: "1.500–2.000€",
    startkapital: "7.000–10.000€",
    note: "Stanovi teško dostupni — ogromna potražnja.",
  },
  {
    name: "NRW (Düsseldorf, Köln, Dortmund, Essen)",
    rent: "800–1.200€",
    rentRange: "Düsseldorf/Köln ~1.100€, Dortmund ~700€, Essen ~650€",
    food: "400–500€",
    transport: "49–65€",
    total: "1.400–1.900€",
    startkapital: "7.000–10.000€",
  },
  {
    name: "Niedersachsen (Hannover, Braunschweig, Oldenburg)",
    rent: "700–1.000€",
    rentRange: "Hannover ~950€, Oldenburg ~750€, manji gradovi ~600€",
    food: "350–500€",
    transport: "49–60€",
    total: "1.200–1.700€",
    startkapital: "6.000–9.000€",
  },
  {
    name: "Bremen",
    rent: "650–900€",
    rentRange: "Bremen centar ~850€, periferija ~650€",
    food: "350–450€",
    transport: "49€",
    total: "1.200–1.500€",
    startkapital: "5.500–8.000€",
  },
  {
    name: "Schleswig-Holstein (Kiel, Lübeck)",
    rent: "650–900€",
    rentRange: "Kiel ~800€, Lübeck ~750€, manji gradovi ~600€",
    food: "350–450€",
    transport: "49–55€",
    total: "1.100–1.500€",
    startkapital: "5.500–8.000€",
  },
  {
    name: "Rheinland-Pfalz (Mainz, Koblenz, Trier)",
    rent: "700–1.000€",
    rentRange: "Mainz ~950€, Trier ~700€, manji gradovi ~600€",
    food: "350–500€",
    transport: "49–60€",
    total: "1.200–1.600€",
    startkapital: "6.000–9.000€",
  },
  {
    name: "Saarland (Saarbrücken)",
    rent: "550–750€",
    rentRange: "Saarbrücken ~700€, manji gradovi ~500€",
    food: "350–450€",
    transport: "49€",
    total: "1.000–1.400€",
    startkapital: "5.000–7.000€",
  },
  {
    name: "Sachsen (Leipzig, Dresden, Chemnitz)",
    rent: "550–800€",
    rentRange: "Leipzig ~750€, Dresden ~700€, Chemnitz ~500€",
    food: "350–450€",
    transport: "49€",
    total: "1.000–1.400€",
    startkapital: "5.000–7.500€",
  },
  {
    name: "Thüringen (Erfurt, Jena, Weimar)",
    rent: "500–750€",
    rentRange: "Jena ~700€, Erfurt ~650€, manji gradovi ~450€",
    food: "300–450€",
    transport: "49€",
    total: "900–1.300€",
    startkapital: "4.500–7.000€",
  },
  {
    name: "Sachsen-Anhalt (Magdeburg, Halle)",
    rent: "450–650€",
    rentRange: "Halle ~600€, Magdeburg ~550€, manji gradovi ~400€",
    food: "300–400€",
    transport: "49€",
    total: "900–1.200€",
    startkapital: "4.500–6.500€",
  },
  {
    name: "Brandenburg (Potsdam, Cottbus)",
    rent: "500–800€",
    rentRange: "Potsdam ~750€ (blizu Berlina), Cottbus ~450€",
    food: "350–450€",
    transport: "49€",
    total: "1.000–1.400€",
    startkapital: "5.000–7.500€",
  },
  {
    name: "Mecklenburg-Vorpommern (Rostock, Schwerin)",
    rent: "450–650€",
    rentRange: "Rostock ~600€, Schwerin ~500€, manji gradovi ~400€",
    food: "300–400€",
    transport: "49€",
    total: "850–1.200€",
    startkapital: "4.000–6.500€",
  },
];

export default function CostCalculator() {
  return (
    <div className="mb-8 space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-base font-bold text-foreground mb-2">
          💰 Koliko para trebaš pripremiti za Njemačku? (2025)
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Realni troškovi po pokrajini — kirija (Warmmiete, ~60–75m²), hrana, prevoz i koliko minimalno treba ponijeti sa Balkana za početak.
        </p>

        {/* Šta ulazi u startkapital */}
        <div className="rounded-lg border border-border bg-muted/50 p-4 mb-5">
          <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
            📦 Šta uključuje "Startkapital"?
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><span className="font-semibold text-foreground">Kaution</span> — depozit za stan (obično 3 hladne kirije)</li>
            <li><span className="font-semibold text-foreground">Prva kirija</span> — Warmmiete (kirija + Nebenkosten)</li>
            <li><span className="font-semibold text-foreground">Hrana i život</span> — za prvi mjesec dok se snadjete</li>
            <li><span className="font-semibold text-foreground">Putni troškovi</span> — avion/bus sa Balkana (~150–250€)</li>
            <li><span className="font-semibold text-foreground">Admin troškovi</span> — prijevodi, apostille, pasoš (~200€)</li>
            <li><span className="font-semibold text-foreground">Buffer</span> — za nepredviđene troškove (1.000–3.000€ zavisno imaš li posao)</li>
          </ul>
          <p className="text-[11px] text-muted-foreground mt-2">
            ⚠️ Ako dolaziš <span className="font-semibold">bez posla</span>, računi sa većim bufferom. Sa <span className="font-semibold">porodicom</span> dodaj još ~2.000€.
          </p>
        </div>

        {/* Tabela po pokrajini */}
        <div className="space-y-3">
          {BUNDESLAENDER.map((bl) => (
            <details
              key={bl.name}
              className="group rounded-lg border border-border bg-background overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-4 py-3 hover:bg-accent/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-foreground">{bl.name}</span>
                </div>
                <div className="flex items-center gap-3 ml-3 shrink-0">
                  <span className="text-xs font-bold text-[hsl(var(--brand-orange))]">
                    {bl.startkapital}
                  </span>
                  <svg
                    className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </summary>

              <div className="px-4 pb-4 pt-1 border-t border-border space-y-2">
                <Row label="🏠 Kirija (Warmmiete)" value={bl.rent} />
                <p className="text-[11px] text-muted-foreground pl-5 -mt-1">{bl.rentRange}</p>
                <Row label="🛒 Hrana (mjesečno)" value={bl.food} />
                <Row label="🚌 Prevoz (Deutschlandticket+)" value={bl.transport} />
                <Row label="📱 Mobitel + internet" value="30–50€" />
                <Row label="🧾 Ostalo (odjeća, higijena…)" value="150–250€" />

                <div className="border-t border-border pt-2 mt-2">
                  <Row label="= Ukupno mjesečno" value={bl.total} bold />
                </div>

                <div className="border-t-2 border-[hsl(var(--brand-orange))]/40 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[hsl(var(--brand-orange))]">
                      💰 Startkapital (ponijeti sa sobom):
                    </span>
                    <span className="text-sm font-bold text-[hsl(var(--brand-orange))]">
                      {bl.startkapital}
                    </span>
                  </div>
                </div>

                {bl.note && (
                  <div className="mt-2 rounded-md bg-[hsl(var(--brand-orange))]/5 border border-[hsl(var(--brand-orange))]/20 px-3 py-2">
                    <p className="text-[11px] text-muted-foreground">⚠️ {bl.note}</p>
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-5 rounded-lg border border-[hsl(var(--brand-orange))]/30 bg-[hsl(var(--brand-orange))]/5 p-3">
          <p className="text-xs text-muted-foreground">
            ⚠️ Sve cifre su orijentacione i bazirane na prosječnim cijenama za 2025. godinu (stan ~60–75m², Warmmiete). Stvarni troškovi zavise od tačne lokacije, veličine stana i životnog stila.
            <br />
            <span className="text-[10px]">Izvori: Statistisches Bundesamt, empirica, immowelt.de — 2025</span>
          </p>
        </div>

        {/* Savjet */}
        <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-semibold text-foreground">Savjet:</span> Balkanci koji dolaze često podcijene troškove stana i kaucije. U Münchenu sam Kaution može biti 4.000–5.000€. Uvijek planiraj minimalno 3 mjeseca unaprijed — i <span className="font-semibold text-foreground">nikad ne dolazi bez barem startkapitala</span> za tvoj region.
          </p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={bold ? "font-semibold text-foreground" : "text-muted-foreground"}>{label}</span>
      <span className={`${bold ? "font-bold" : "font-semibold"} text-foreground`}>{value}</span>
    </div>
  );
}
