import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

const forms = [
  { title: "Anmeldung", desc: "Prijava prebivališta u Njemačkoj.", law: "BMG", link: "https://www.gesetze-im-internet.de/bmg/" },
  { title: "Steuerklasse wechseln", desc: "Promjena porezne klase.", law: "EStG", link: "https://www.gesetze-im-internet.de/estg/" },
  { title: "Wohngeld", desc: "Zahtjev za stambeni dodatak.", law: "WoGG", link: "https://www.gesetze-im-internet.de/wogg/" },
  { title: "Bürgergeld", desc: "Zahtjev za građansku naknadu.", law: "SGB II", link: "https://www.gesetze-im-internet.de/sgb_2/" },
  { title: "Pflegegrad", desc: "Zahtjev za stepen njege.", law: "SGB XI", link: "https://www.gesetze-im-internet.de/sgb_11/" },
  { title: "Kindergeld", desc: "Zahtjev za dječji dodatak.", law: "EStG §62", link: "https://www.gesetze-im-internet.de/estg/__62.html" },
  { title: "Elterngeld", desc: "Zahtjev za roditeljski dodatak.", law: "BEEG", link: "https://www.gesetze-im-internet.de/beeg/" },
  { title: "Kita-Kostenübernahme", desc: "Zahtjev za pokrivanje troškova vrtića.", law: "SGB VIII", link: "https://www.gesetze-im-internet.de/sgb_8/" },
  { title: "Unterhaltsvorschuss", desc: "Zahtjev za alimentacijski predujam.", law: "UhVorschG", link: "https://www.gesetze-im-internet.de/uhvorschg/" },
  { title: "BAföG", desc: "Zahtjev za studentsku potporu.", law: "BAföG", link: "https://www.gesetze-im-internet.de/baf_g/" },
  { title: "Widerspruch", desc: "Prigovor na rješenje institucije.", law: "VwVfG", link: "https://www.gesetze-im-internet.de/vwvfg/" },
];

export default function Formulare() {
  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Formulare & Anträge
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Svi zahtjevi i formulari — sa zakonskom osnovom i korak-po-korak uputstvom.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {forms.map((form, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{form.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{form.desc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">Zakon:</span> {form.law} —{" "}
                    <a
                      href={form.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:no-underline"
                    >
                      Službeni izvor
                    </a>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
