import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  "Generatori dokumenata (otkaz stana, radni ugovor, prigovor)",
  "Schritt-für-Schritt Vorlagen za svaki zahtjev",
  "Checklisten za sve životne situacije",
  "Strukturierte Problemlösungen — korak po korak",
  "Pristup svim kalkulatorima i alatima",
  "Prioritetna podrška",
];

export default function Premium() {
  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Premium
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Otključaj sve alate i sadržaje za jednostavniji život u Njemačkoj.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container max-w-lg">
          <div className="rounded-xl border bg-card p-8 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold">Premium pristup</h2>
            </div>
            <ul className="space-y-3">
              {features.map((f, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button size="lg" className="w-full" asChild>
                <Link to="/register">Registriraj se</Link>
              </Button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Uskoro dostupno. Registriraj se da budeš obaviješten/a.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
