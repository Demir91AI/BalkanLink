import { Link } from "react-router-dom";
import { ArrowRight, Home, FileText, CreditCard, Heart, Landmark, ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const T: Record<string, Record<string, string>> = {
  bs: {
    title: "Počni ovdje",
    subtitle: "Najvažniji koraci za tvoj početak u Njemačkoj.",
    anmeldung: "Prijava prebivališta", anmeldungDesc: "Prijavi svoju adresu u roku od 14 dana.",
    aufenthalt: "Boravišna dozvola", aufenthaltDesc: "Viza, plava karta ili slobodan pristup — saznaj šta ti treba.",
    steuer: "Steuer-ID i porezna klasa", steuerDesc: "Poreski broj dobijaš automatski nakon prijave.",
    kranken: "Zdravstveno osiguranje", krankenDesc: "Javno ili privatno — obavezno za sve.",
    bank: "Bankovni račun", bankDesc: "Otvori račun u prvoj sedmici.",
    schritte: "Prvi koraci", schritteDesc: "Kompletna lista za prve sedmice.",
  },
  de: {
    title: "Hier starten",
    subtitle: "Die wichtigsten Schritte für deinen Start in Deutschland.",
    anmeldung: "Anmeldung & Wohnsitz", anmeldungDesc: "Melde deine Adresse innerhalb von 14 Tagen an.",
    aufenthalt: "Aufenthalt & Visum", aufenthaltDesc: "Visum, Blaue Karte oder freier Zugang — finde heraus, was du brauchst.",
    steuer: "Steuer-ID & Steuerklasse", steuerDesc: "Die Steuer-ID bekommst du automatisch nach der Anmeldung.",
    kranken: "Krankenversicherung", krankenDesc: "Gesetzlich oder privat — Pflicht für alle.",
    bank: "Bankkonto eröffnen", bankDesc: "Eröffne dein Konto in der ersten Woche.",
    schritte: "Erste Schritte", schritteDesc: "Die vollständige Checkliste für die ersten Wochen.",
  },
  en: {
    title: "Start here",
    subtitle: "The most important steps for your start in Germany.",
    anmeldung: "Registration & Residence", anmeldungDesc: "Register your address within 14 days.",
    aufenthalt: "Residence Permit & Visa", aufenthaltDesc: "Visa, Blue Card or free access — find out what you need.",
    steuer: "Tax ID & Tax Class", steuerDesc: "You receive your tax ID automatically after registration.",
    kranken: "Health Insurance", krankenDesc: "Public or private — mandatory for everyone.",
    bank: "Open Bank Account", bankDesc: "Open your account in the first week.",
    schritte: "First Steps", schritteDesc: "The complete checklist for the first weeks.",
  },
  sq: {
    title: "Fillo këtu",
    subtitle: "Hapat më të rëndësishëm për fillimin tënd në Gjermani.",
    anmeldung: "Regjistrimi i adresës", anmeldungDesc: "Regjistro adresën brenda 14 ditësh.",
    aufenthalt: "Leja e qëndrimit", aufenthaltDesc: "Viza, Karta Blu ose qasje e lirë.",
    steuer: "Steuer-ID & klasa tatimore", steuerDesc: "Numrin tatimor e merr automatikisht.",
    kranken: "Sigurimi shëndetësor", krankenDesc: "Publik ose privat — i detyrueshëm.",
    bank: "Llogari bankare", bankDesc: "Hape llogarinë në javën e parë.",
    schritte: "Hapat e parë", schritteDesc: "Lista e plotë për javët e para.",
  },
  mk: {
    title: "Почни тука",
    subtitle: "Најважните чекори за твојот почеток во Германија.",
    anmeldung: "Пријава на адреса", anmeldungDesc: "Пријави ја адресата во рок од 14 дена.",
    aufenthalt: "Дозвола за престој", aufenthaltDesc: "Виза, Сина карта или слободен пристап.",
    steuer: "Steuer-ID & даночна класа", steuerDesc: "Даночниот број го добиваш автоматски.",
    kranken: "Здравствено осигурување", krankenDesc: "Јавно или приватно — задолжително.",
    bank: "Банкарска сметка", bankDesc: "Отвори сметка во првата недела.",
    schritte: "Први чекори", schritteDesc: "Комплетна листа за првите недели.",
  },
};

function pt(lang: string, key: string): string {
  const g = ["bs", "hr", "sr", "me"].includes(lang) ? "bs" : ["sq", "xk"].includes(lang) ? "sq" : lang === "mk" ? "mk" : lang === "de" ? "de" : "en";
  return T[g]?.[key] ?? T.en[key] ?? key;
}

const cards = [
  { icon: Home, titleKey: "anmeldung", descKey: "anmeldungDesc", to: "/dolazak/prijava-prebivalista" },
  { icon: FileText, titleKey: "aufenthalt", descKey: "aufenthaltDesc", to: "/dolazak/boravisna-dozvola" },
  { icon: CreditCard, titleKey: "steuer", descKey: "steuerDesc", to: "/dolazak/steuer-id-i-porezna-klasa" },
  { icon: Heart, titleKey: "kranken", descKey: "krankenDesc", to: "/dolazak/zdravstveno-osiguranje" },
  { icon: Landmark, titleKey: "bank", descKey: "bankDesc", to: "/dolazak/bankovni-racun" },
  { icon: ClipboardList, titleKey: "schritte", descKey: "schritteDesc", to: "/dolazak/prvi-koraci" },
];

export default function PocniOvdje() {
  const { language } = useLanguage();

  return (
    <>
      <section className="border-b bg-primary py-10">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {pt(language, "title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            {pt(language, "subtitle")}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.titleKey}
                to={card.to}
                className="group flex items-start gap-4 rounded-xl border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <card.icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold">{pt(language, card.titleKey)}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {pt(language, card.descKey)}
                  </p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
