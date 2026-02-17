import { Link } from "react-router-dom";
import { ArrowRight, FileText, Home, CreditCard, Heart, Landmark, ClipboardList } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const steps = [
  {
    icon: Home,
    title: "Anmeldung & Wohnsitz",
    description: "Prijavi svoje prebivalište u Njemačkoj — prvi i najvažniji korak.",
    content: [
      "Odmah nakon dolaska u Njemačku moraš prijaviti svoje prebivalište (Wohnsitzanmeldung) u roku od 14 dana.",
      "Za prijavu ti treba: pasoš, ugovor o najmu (Mietvertrag) i potvrda stanodavca (Wohnungsgeberbestätigung).",
      "Idi u nadležni Bürgeramt ili Einwohnermeldeamt u svom gradu.",
    ],
    law: "BMG — Bundesmeldegesetz",
    source: "https://www.gesetze-im-internet.de/bmg/",
  },
  {
    icon: FileText,
    title: "Aufenthalt & Visum",
    description: "Boravišna dozvola, viza, plava karta — koji tip ti treba?",
    content: [
      "Državljani EU ne trebaju vizu. Državljani trećih zemalja trebaju boravišnu dozvolu (Aufenthaltstitel).",
      "Vrste: Aufenthaltserlaubnis, Blaue Karte EU, Niederlassungserlaubnis.",
      "Zahtjev se podnosi kod Ausländerbehörde u tvom gradu.",
    ],
    law: "AufenthG — Aufenthaltsgesetz",
    source: "https://www.gesetze-im-internet.de/aufenthg_2004/",
    source2: "https://www.bamf.de/",
  },
  {
    icon: CreditCard,
    title: "Steuer-ID & Steuerklasse",
    description: "Poreski identifikacioni broj i porezna klasa — kako ih dobiti.",
    content: [
      "Steuer-ID (porezni identifikacioni broj) dobijaš automatski poštom nakon prijave prebivališta.",
      "Steuerklasse (porezna klasa) zavisi od bračnog statusa: I, II, III, IV, V ili VI.",
      "Promjenu steuerklase možeš zatražiti kod Finanzamta.",
    ],
    law: "EStG — Einkommensteuergesetz",
    source: "https://www.gesetze-im-internet.de/estg/",
    source2: "https://www.bundesfinanzministerium.de/",
  },
  {
    icon: Heart,
    title: "Krankenversicherung wählen",
    description: "Javno ili privatno osiguranje — šta je bolje za tebe.",
    content: [
      "Zdravstveno osiguranje je obavezno u Njemačkoj.",
      "Javno osiguranje (GKV): obavezno za zaposlene sa platom do granice oslobođenja.",
      "Privatno osiguranje (PKV): za samozaposlene i zaposlene iznad granice.",
    ],
    law: "SGB V — Sozialgesetzbuch",
    source: "https://www.gesetze-im-internet.de/sgb_5/",
    source2: "https://www.bundesgesundheitsministerium.de/",
  },
  {
    icon: Landmark,
    title: "Bankkonto eröffnen",
    description: "Otvori bankovni račun — bez njega ništa ne funkcioniše.",
    content: [
      "Za otvaranje računa ti treba: pasoš i potvrda o prijavi prebivališta (Meldebescheinigung).",
      "Svaka banka u Njemačkoj mora ponuditi osnovni račun (Basiskonto) prema zakonu.",
      "Preporučujemo da račun otvoriš u prvoj sedmici nakon dolaska.",
    ],
    law: "ZKG — Zahlungskontengesetz",
    source: "https://www.gesetze-im-internet.de/zkg/",
  },
  {
    icon: ClipboardList,
    title: "Erste Schritte nach Ankunft",
    description: "Kompletna lista koraka za prve sedmice u Njemačkoj.",
    content: [
      "1. Prijavi prebivalište (Anmeldung)",
      "2. Otvori bankovni račun",
      "3. Zaključi zdravstveno osiguranje",
      "4. Zatraži Steuer-ID",
      "5. Prijavi se kod Ausländerbehörde (ako je potrebno)",
      "6. Registruj se kod Arbeitsagentur (ako tražiš posao)",
    ],
    law: "BMG, AufenthG, SGB V",
    source: "https://www.gesetze-im-internet.de/bmg/",
  },
];

export default function PocniOvdje() {
  const { t } = useLanguage();

  return (
    <>
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.new.title")}
          </h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">
            Korak po korak vodič za tvoj početak u Njemačkoj.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <div className="space-y-6">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold">{step.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 pl-14">
                  {step.content.map((line, i) => (
                    <p key={i} className="text-sm leading-relaxed text-foreground/80">
                      {line}
                    </p>
                  ))}
                </div>

                <div className="mt-4 border-t pt-3 pl-14">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Gesetzliche Grundlage:</span> {step.law}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-3">
                    <a
                      href={step.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      Offizielle Quelle <ArrowRight className="h-3 w-3" />
                    </a>
                    {step.source2 && (
                      <a
                        href={step.source2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Weitere Quelle <ArrowRight className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
