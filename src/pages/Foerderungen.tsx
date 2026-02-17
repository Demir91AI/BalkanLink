import { ArrowRight, HandCoins } from "lucide-react";

const items = [
  {
    title: "Wohngeld",
    desc: "Stambeni dodatak za osobe sa niskim primanjima.",
    law: "WoGG",
    link: "https://www.gesetze-im-internet.de/wogg/",
  },
  {
    title: "Bürgergeld",
    desc: "Osnovna naknada za tražitelje posla.",
    law: "SGB II",
    link: "https://www.gesetze-im-internet.de/sgb_2/",
  },
  {
    title: "Aufstiegs-BAföG",
    desc: "Podrška za stručno usavršavanje i majstorske ispite.",
    law: "AFBG",
    link: "https://www.gesetze-im-internet.de/afbg/",
  },
  {
    title: "Pflegeunterstützungsgeld",
    desc: "Naknada za zaposlene koji njegu člana porodice.",
    law: "SGB XI",
    link: "https://www.gesetze-im-internet.de/sgb_11/",
  },
  {
    title: "Weitere staatliche Hilfen",
    desc: "Pregled dodatnih državnih pomoći i naknada.",
    law: "SGB XII",
    link: "https://www.gesetze-im-internet.de/sgb_12/",
  },
];

export default function Foerderungen() {
  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Förderungen & Zuschüsse
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Državne pomoći i naknade na koje imaš pravo.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <HandCoins className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{item.title}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    <span className="font-medium">Zakon:</span> {item.law} —{" "}
                    <a
                      href={item.link}
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
