/**
 * Prosječni troškovi života po pokrajini — statički pregled za 2025.
 * Podaci bazirani na: empirica, Statistisches Bundesamt, immowelt.de, Statista Q1/2025
 * Kaltmiete cifre za ~65m² stan (realnija veličina za pridošlice)
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
    rent: "1.550–2.100€",
    rentRange: "München ~2.100€, Nürnberg ~1.200€, Augsburg ~1.100€, manji gradovi ~900€",
    food: "550–700€",
    transport: "49–89€",
    total: "2.300–3.100€",
    startkapital: "12.000–18.000€",
    note: "Najskuplji region u Njemačkoj. München ima Kaltmiete ~22–25€/m² — jedan od najskupljih gradova u Evropi. Stanovi se iznajmljuju za sat vremena.",
  },
  {
    name: "Hessen (Frankfurt, Wiesbaden, Darmstadt)",
    rent: "1.350–1.800€",
    rentRange: "Frankfurt ~1.750€, Wiesbaden ~1.400€, Darmstadt ~1.350€, Kassel ~900€",
    food: "500–650€",
    transport: "49–85€",
    total: "2.000–2.700€",
    startkapital: "10.000–15.000€",
    note: "Frankfurt ima Kaltmiete ~19–21€/m². Bankarski sektor diže cijene u cijelom regionu.",
  },
  {
    name: "Hamburg",
    rent: "1.350–1.800€",
    rentRange: "Centar/HafenCity ~1.800€, Altona ~1.500€, Harburg ~1.100€",
    food: "500–650€",
    transport: "49–80€",
    total: "2.000–2.700€",
    startkapital: "10.000–15.000€",
    note: "Kaltmiete ~18–21€/m². Jako teško naći stan — konkurencija ogromna.",
  },
  {
    name: "Baden-Württemberg (Stuttgart, Karlsruhe, Freiburg)",
    rent: "1.200–1.600€",
    rentRange: "Stuttgart ~1.500€, Freiburg ~1.400€, Karlsruhe ~1.200€, Mannheim ~1.100€, manji gradovi ~850€",
    food: "500–650€",
    transport: "49–80€",
    total: "1.900–2.500€",
    startkapital: "9.000–14.000€",
    note: "Stuttgart ima Kaltmiete ~16–19€/m². Industrijski region, dobre plate ali visoke kirije.",
  },
  {
    name: "Berlin",
    rent: "1.200–1.700€",
    rentRange: "Mitte/Kreuzberg ~1.700€, Charlottenburg ~1.400€, Spandau/Marzahn ~1.000€",
    food: "500–650€",
    transport: "49€",
    total: "1.900–2.500€",
    startkapital: "9.000–14.000€",
    note: "Kaltmiete ~16–19€/m² za nove ugovore. Stanovi se nađu teško — prosječno 3–6 mjeseci traženja. Prevarantski oglasi česti!",
  },
  {
    name: "NRW (Düsseldorf, Köln, Dortmund, Essen)",
    rent: "950–1.400€",
    rentRange: "Düsseldorf ~1.350€, Köln ~1.300€, Bonn ~1.100€, Dortmund ~800€, Essen ~750€",
    food: "450–600€",
    transport: "49–75€",
    total: "1.600–2.200€",
    startkapital: "8.000–12.000€",
    note: "Velika razlika između zapada (Düsseldorf/Köln — skupo) i Ruhrgebiet (Dortmund/Essen — pristupačno).",
  },
  {
    name: "Niedersachsen (Hannover, Braunschweig, Oldenburg)",
    rent: "800–1.200€",
    rentRange: "Hannover ~1.100€, Braunschweig ~900€, Oldenburg ~850€, manji gradovi ~700€",
    food: "450–550€",
    transport: "49–65€",
    total: "1.400–1.900€",
    startkapital: "7.000–11.000€",
  },
  {
    name: "Schleswig-Holstein (Kiel, Lübeck, Flensburg)",
    rent: "750–1.100€",
    rentRange: "Kiel ~1.000€, Lübeck ~950€, Flensburg ~800€, manji gradovi ~650€",
    food: "450–550€",
    transport: "49–60€",
    total: "1.350–1.800€",
    startkapital: "6.500–10.000€",
  },
  {
    name: "Rheinland-Pfalz (Mainz, Koblenz, Trier)",
    rent: "800–1.200€",
    rentRange: "Mainz ~1.150€ (blizu Frankfurta!), Koblenz ~850€, Trier ~800€, manji gradovi ~650€",
    food: "450–550€",
    transport: "49–60€",
    total: "1.400–1.900€",
    startkapital: "7.000–10.000€",
  },
  {
    name: "Bremen",
    rent: "750–1.050€",
    rentRange: "Bremen centar ~1.000€, Bremerhaven ~700€, periferija ~750€",
    food: "450–550€",
    transport: "49€",
    total: "1.350–1.750€",
    startkapital: "6.500–9.000€",
  },
  {
    name: "Saarland (Saarbrücken)",
    rent: "600–850€",
    rentRange: "Saarbrücken ~800€, manji gradovi ~550€",
    food: "400–500€",
    transport: "49€",
    total: "1.100–1.500€",
    startkapital: "5.500–8.000€",
    note: "Jedan od najpovoljnijih regiona na zapadu Njemačke.",
  },
  {
    name: "Sachsen (Leipzig, Dresden, Chemnitz)",
    rent: "650–1.000€",
    rentRange: "Leipzig ~950€ (raste brzo!), Dresden ~900€, Chemnitz ~550€",
    food: "400–500€",
    transport: "49€",
    total: "1.200–1.600€",
    startkapital: "5.500–9.000€",
    note: "Leipzig je najbrže rastuće tržište — kirije porasle 30%+ u zadnjih 5 godina.",
  },
  {
    name: "Brandenburg (Potsdam, Cottbus, Frankfurt/Oder)",
    rent: "600–1.000€",
    rentRange: "Potsdam ~1.000€ (Berlin efekt!), Cottbus ~550€, Frankfurt/Oder ~500€",
    food: "400–500€",
    transport: "49€",
    total: "1.100–1.600€",
    startkapital: "5.500–9.000€",
    note: "Potsdam je skup jer gravitira Berlinu. Ostatak pokrajine je znatno povoljniji.",
  },
  {
    name: "Thüringen (Erfurt, Jena, Weimar)",
    rent: "550–850€",
    rentRange: "Jena ~850€ (univerzitetski grad), Erfurt ~750€, Weimar ~700€, manji gradovi ~500€",
    food: "400–500€",
    transport: "49€",
    total: "1.100–1.400€",
    startkapital: "5.000–8.000€",
  },
  {
    name: "Sachsen-Anhalt (Magdeburg, Halle)",
    rent: "500–750€",
    rentRange: "Halle ~700€, Magdeburg ~650€, manji gradovi ~450€",
    food: "400–500€",
    transport: "49€",
    total: "1.000–1.400€",
    startkapital: "4.500–7.500€",
  },
  {
    name: "Mecklenburg-Vorpommern (Rostock, Schwerin)",
    rent: "500–750€",
    rentRange: "Rostock ~700€, Schwerin ~600€, Greifswald ~600€, manji gradovi ~450€",
    food: "400–500€",
    transport: "49€",
    total: "1.000–1.350€",
    startkapital: "4.500–7.000€",
    note: "Najpovoljnija pokrajina u Njemačkoj, ali i najmanje posla — osim u turizmu i Rostocku.",
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
          Realni troškovi po pokrajini — kirija (Warmmiete, ~65m² stan), hrana, prevoz i koliko minimalno treba ponijeti sa Balkana za početak.
          <br />
          <span className="text-xs font-semibold text-foreground">Cijene za 2025. su značajno porasle</span> — Kaltmiete u prosjeku +4,7% u odnosu na 2024, hrana +3–5%.
        </p>

        {/* Šta ulazi u startkapital */}
        <div className="rounded-lg border border-border bg-muted/50 p-4 mb-5">
          <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">
            📦 Šta uključuje "Startkapital"?
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li><span className="font-semibold text-foreground">Kaution</span> — depozit za stan (obično 3 hladne kirije = može biti 2.000–5.000€!)</li>
            <li><span className="font-semibold text-foreground">Prva kirija</span> — Warmmiete (kirija + Nebenkosten ~3–4€/m²)</li>
            <li><span className="font-semibold text-foreground">Hrana i život</span> — za prvi mjesec dok se snadjete (~500–700€)</li>
            <li><span className="font-semibold text-foreground">Putni troškovi</span> — avion/bus sa Balkana (~150–300€)</li>
            <li><span className="font-semibold text-foreground">Admin troškovi</span> — prijevodi, apostille, pasoš (~200–400€)</li>
            <li><span className="font-semibold text-foreground">Buffer</span> — za nepredviđeno (1.500–3.000€ zavisno imaš li posao)</li>
          </ul>
          <p className="text-[11px] text-muted-foreground mt-2">
            ⚠️ Ako dolaziš <span className="font-semibold">bez posla</span>, trebaš veći buffer (min. 3 mjeseca kirije + troškovi). Sa <span className="font-semibold">porodicom</span> dodaj još ~2.000–4.000€.
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
                <Row label="🏠 Kirija (Warmmiete, ~65m²)" value={bl.rent} />
                <p className="text-[11px] text-muted-foreground pl-5 -mt-1">{bl.rentRange}</p>
                <Row label="🛒 Hrana (mjesečno, 1 osoba)" value={bl.food} />
                <Row label="🚌 Prevoz (Deutschlandticket 49€+)" value={bl.transport} />
                <Row label="📱 Mobitel + internet" value="35–60€" />
                <Row label="🧾 Ostalo (odjeća, higijena, kućne potrepštine)" value="200–350€" />

                <div className="border-t border-border pt-2 mt-2">
                  <Row label="= Ukupno mjesečno (1 osoba)" value={bl.total} bold />
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
            ⚠️ Sve cifre su orijentacione i bazirane na prosječnim cijenama za <strong>Q1 2025</strong>. Warmmiete = Kaltmiete + Nebenkosten (~3–4€/m²). Kaltmiete cifre za nove ugovore (Angebotsmiete) — postojeći stanari često plaćaju manje.
            <br />
            <span className="text-[10px]">Izvori: Statistisches Bundesamt, empirica Q1/2025, immowelt.de, Statista</span>
          </p>
        </div>

        {/* Savjeti */}
        <div className="mt-3 rounded-lg border border-border bg-muted/50 p-3 space-y-2">
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-semibold text-foreground">Savjet 1:</span> Balkanci koji dolaze često podcijene troškove stana i kaucije. U Münchenu sam Kaution za 65m² stan može biti <span className="font-semibold text-foreground">4.500–5.500€</span>. Nikad ne dolazi bez tog novca!
          </p>
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-semibold text-foreground">Savjet 2:</span> Hrana u Njemačkoj je 2025. znatno skuplja nego na Balkanu — <span className="font-semibold text-foreground">Lidl/Aldi cijena za 1 osobu je ~500–650€/mj</span> (ne 300€ kao što mnogi misle). Restorani su 15–25€ po obroku.
          </p>
          <p className="text-xs text-muted-foreground">
            💡 <span className="font-semibold text-foreground">Savjet 3:</span> Deutschlandticket košta 49€/mj za sav lokalni prevoz u cijeloj Njemačkoj. Ako radiš van grada, možda trebaš auto — to je dodatnih ~300–500€/mj (rata, osiguranje, gorivo).
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
