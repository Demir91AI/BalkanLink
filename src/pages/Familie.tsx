import { Link } from "react-router-dom";
import { ArrowRight, Baby, BookOpen, GraduationCap, HandCoins, Heart, Users } from "lucide-react";

const sections = [
  {
    title: "Kindergeld",
    icon: Baby,
    desc: "Dječji dodatak — za svako dijete do 18. godine (ili duže uz školovanje).",
    link: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld",
  },
  {
    title: "Kinderzuschlag",
    icon: HandCoins,
    desc: "Dodatak za djecu za porodice sa niskim primanjima.",
    link: "https://www.arbeitsagentur.de/familie-und-kinder/kinderzuschlag",
  },
  {
    title: "Elterngeld",
    icon: Users,
    desc: "Roditeljski dodatak — naknada za roditelje nakon rođenja djeteta.",
    link: "https://www.bmfsfj.de/",
  },
  {
    title: "Bildung & Teilhabe",
    icon: BookOpen,
    desc: "Lernförderung, Schulessen, Schulbedarf, Sport & Musik, Klassenfahrten.",
    link: "https://www.gesetze-im-internet.de/sgb_2/",
  },
  {
    title: "Kita & Betreuung",
    icon: Heart,
    desc: "Kita-Gebühren Zuschuss, Kostenübernahme Tagespflege.",
    link: "https://www.gesetze-im-internet.de/sgb_8/",
  },
  {
    title: "Mutterschaftsgeld",
    icon: Heart,
    desc: "Naknada za majke u periodu prije i nakon porođaja.",
    link: "https://www.gesetze-im-internet.de/muschg/",
  },
  {
    title: "Unterhaltsvorschuss",
    icon: HandCoins,
    desc: "Alimentacijski predujam za samohrane roditelje.",
    link: "https://www.gesetze-im-internet.de/uhvorschg/",
  },
  {
    title: "BAföG / Schüler-BAföG",
    icon: GraduationCap,
    desc: "Financijska podrška za studente i učenike.",
    link: "https://www.gesetze-im-internet.de/baf_g/",
  },
];

export default function Familie() {
  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            Familie & Kinder
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Sve naknade i prava za porodice sa djecom u Njemačkoj.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-lg border bg-card p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2 className="text-sm font-semibold">{item.title}</h2>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  Službeni izvor <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
