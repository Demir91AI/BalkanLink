import { useState, useMemo } from "react";
import { SEO } from "@/components/SEO";
import { Car, Smartphone, TrafficCone, ParkingSquare, Wine, AlertTriangle, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type OffenseType,
  calculateFine,
  speedTableInnerorts,
  speedTableAusserorts,
  otherOffensesTable,
} from "@/lib/bussgeld-data";
import PageNav from "@/components/navigation/PageNav";

const offenseOptions: { value: OffenseType; label: string; icon: typeof Car }[] = [
  { value: "speed", label: "Brzina", icon: Car },
  { value: "phone", label: "Telefon", icon: Smartphone },
  { value: "redLight", label: "Crveno svjetlo", icon: TrafficCone },
  { value: "parking", label: "Parkiranje", icon: ParkingSquare },
  { value: "alcohol", label: "Alkohol", icon: Wine },
];

const topMistakes = [
  { emoji: "📱", title: "Telefon u vožnji", sub: "100€ + 1 bod", offense: "phone" as OffenseType },
  { emoji: "🚦", title: "Crveno svjetlo", sub: "do 200€ + bodovi", offense: "redLight" as OffenseType },
  { emoji: "🚗", title: "Zona 30 (brzina)", sub: "najčešće kazne", offense: "speed" as OffenseType },
  { emoji: "🚫", title: "Parkiranje", sub: "česte kazne", offense: "parking" as OffenseType },
];

export default function BussgeldAssistent() {
  const [offense, setOffense] = useState<OffenseType>("speed");
  const [kmOver, setKmOver] = useState(15);
  const [innerorts, setInnerorts] = useState(true);
  const [longRed, setLongRed] = useState(false);

  const result = useMemo(
    () => calculateFine(offense, { kmOver, innerorts, longRed }),
    [offense, kmOver, innerorts, longRed]
  );

  const handleQuickCard = (o: OffenseType) => {
    setOffense(o);
    if (o === "speed") {
      setKmOver(21);
      setInnerorts(true);
    }
    // scroll to calculator
    document.getElementById("rechner")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pb-16">
      <SEO title="Bußgeld Asistent — Kazne u Saobraćaju" description="Provjeri kolika je kazna za saobraćajne prekršaje u Njemačkoj — brzina, alkohol, parking, mobitel." path="/bussgeld" />
      <PageNav />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/40 py-10 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
            Provjeri kaznu u Njemačkoj{" "}
            <span className="text-primary">u 5 sekundi</span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Brzo, jasno i bez komplikacija – saznaj koliko te košta prekršaj
          </p>
        </div>
      </section>

      {/* Top Mistakes – horizontal scroll */}
      <section className="px-4 -mt-2 mb-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🚨 Najčešće greške
          </h2>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {topMistakes.map((m) => (
              <button
                key={m.offense}
                onClick={() => handleQuickCard(m.offense)}
                className="snap-start shrink-0 w-40 rounded-xl border border-border bg-card p-4 text-left shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              >
                <span className="text-2xl">{m.emoji}</span>
                <p className="mt-2 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {m.title}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{m.sub}</p>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 mt-2 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section id="rechner" className="px-4 mb-8 scroll-mt-4">
        <Card className="mx-auto max-w-3xl shadow-lg border-border/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Izračunaj svoju kaznu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Offense type */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">
                Vrsta prekršaja
              </label>
              <Select value={offense} onValueChange={(v) => setOffense(v as OffenseType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {offenseOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      <span className="flex items-center gap-2">
                        <o.icon className="h-4 w-4" />
                        {o.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed-specific inputs */}
            {offense === "speed" && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Koliko km/h preko ograničenja?{" "}
                    <span className="text-primary font-bold">{kmOver} km/h</span>
                  </label>
                  <Slider
                    value={[kmOver]}
                    onValueChange={([v]) => setKmOver(v)}
                    min={1}
                    max={70}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 km/h</span>
                    <span>70 km/h</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Lokacija
                  </label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={innerorts ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInnerorts(true)}
                      className="flex-1"
                    >
                      🏙️ Grad (innerorts)
                    </Button>
                    <Button
                      type="button"
                      variant={!innerorts ? "default" : "outline"}
                      size="sm"
                      onClick={() => setInnerorts(false)}
                      className="flex-1"
                    >
                      🛣️ Van naselja (außerorts)
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Red light sub-option */}
            {offense === "redLight" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Trajanje crvenog
                </label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={!longRed ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLongRed(false)}
                    className="flex-1"
                  >
                    Kratko crveno (&lt;1s)
                  </Button>
                  <Button
                    type="button"
                    variant={longRed ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLongRed(true)}
                    className="flex-1"
                  >
                    Dugo crveno (&gt;1s)
                  </Button>
                </div>
              </div>
            )}

            {/* === RESULT === */}
            <div className="rounded-xl border border-border bg-muted/30 p-5 mt-2">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">💰 Kazna</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{result.amount}€</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">🚗 Bodovi</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-foreground">{result.points}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">🚫 Zabrana</p>
                  <p className={`text-2xl sm:text-3xl font-extrabold ${result.ban ? "text-destructive" : "text-[hsl(var(--success))]"}`}>
                    {result.ban ? "DA" : "NE"}
                  </p>
                </div>
              </div>
              {result.banDuration && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Trajanje zabrane: <strong>{result.banDuration}</strong>
                </p>
              )}
            </div>

            {/* Explanation */}
            <div className="rounded-lg bg-primary/5 border border-primary/10 p-4">
              <p className="text-sm text-foreground leading-relaxed">
                🧠 <strong>Objašnjenje:</strong> {result.explanation}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Reference Tables */}
      <section className="px-4 mb-8">
        <div className="mx-auto max-w-3xl">
          <Tabs defaultValue="speed" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="speed">📊 Brzi pregled (brzina)</TabsTrigger>
              <TabsTrigger value="other">📋 Ostali prekršaji</TabsTrigger>
            </TabsList>

            <TabsContent value="speed" className="mt-4 space-y-4">
              {/* Innerorts */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold">🏙️ U gradu (innerorts)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">km/h preko</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Kazna</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Bodovi</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Zabrana</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speedTableInnerorts.map((row) => (
                          <tr key={row.range} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-2 font-medium text-foreground">{row.range}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.amount}€</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.points}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.ban}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Außerorts */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold">🛣️ Van naselja (außerorts)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">km/h preko</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Kazna</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Bodovi</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Zabrana</th>
                        </tr>
                      </thead>
                      <tbody>
                        {speedTableAusserorts.map((row) => (
                          <tr key={row.range} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-2 font-medium text-foreground">{row.range}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.amount}€</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.points}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.ban}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="other" className="mt-4">
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/50">
                          <th className="px-3 py-2 text-left font-medium text-muted-foreground">Prekršaj</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Kazna</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Bodovi</th>
                          <th className="px-3 py-2 text-right font-medium text-muted-foreground">Zabrana</th>
                        </tr>
                      </thead>
                      <tbody>
                        {otherOffensesTable.map((row) => (
                          <tr key={row.offense} className="border-b border-border/50 last:border-0">
                            <td className="px-3 py-2 font-medium text-foreground">{row.offense}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.amount}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.points}</td>
                            <td className="px-3 py-2 text-right text-foreground">{row.ban}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="px-4 mb-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            ⚖️ Sve informacije su informativnog karaktera i bez garancije. Za tačne i važeće podatke koristite službene izvore (
            <a
              href="https://www.bussgeldkatalog.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              bussgeldkatalog.org
            </a>
            ).
          </p>
        </div>
      </section>
    </div>
  );
}
