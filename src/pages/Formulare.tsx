import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, ChevronDown, ExternalLink, Download, CheckCircle2,
  Building2, Baby, Heart, Stethoscope, XCircle, Landmark, Crown, Lock,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import LegalDisclaimer from "@/components/LegalDisclaimer";

type LangKey = "de" | "bs" | "en";
function getLk(lang: string): LangKey {
  if (lang === "de") return "de";
  if (lang === "en") return "en";
  return "bs";
}

/* ── Category data ── */
interface GuideCategory {
  id: string;
  icon: typeof FileText;
  title: { de: string; bs: string; en: string };
  description: { de: string; bs: string; en: string };
  documents: { de: string[]; bs: string[]; en: string[] };
  steps: { de: string[]; bs: string[]; en: string[] };
  officialLink: string;
  officialLinkLabel: string;
  templateLink?: string;
}

const categories: GuideCategory[] = [
  {
    id: "anmeldung",
    icon: Building2,
    title: { de: "Anmeldung & Ummeldung", bs: "Prijava i odjava prebivališta", en: "Registration & Re-registration" },
    description: {
      de: "Innerhalb von 14 Tagen nach dem Einzug müssen Sie sich beim Einwohnermeldeamt anmelden. Bei Umzug innerhalb der Stadt ist eine Ummeldung nötig.",
      bs: "U roku od 14 dana od useljenja morate se prijaviti u nadležnom uredu. Kod preseljenja unutar grada potrebna je odjava/prijava.",
      en: "You must register at the residents' office within 14 days of moving in. Moving within the city requires re-registration.",
    },
    documents: {
      de: ["Personalausweis / Reisepass", "Wohnungsgeberbestätigung", "Mietvertrag (empfohlen)", "Ggf. Heirats-/Geburtsurkunde"],
      bs: ["Lična karta / pasoš", "Potvrda stanodavca (Wohnungsgeberbestätigung)", "Ugovor o najmu (preporučeno)", "Eventualno vjenčani list / rodni list"],
      en: ["ID / Passport", "Landlord confirmation", "Rental contract (recommended)", "Marriage/birth certificate if applicable"],
    },
    steps: {
      de: [
        "Termin beim Bürgeramt online buchen (z.B. über service.berlin.de oder lokale Webseite).",
        "Wohnungsgeberbestätigung vom Vermieter ausfüllen lassen.",
        "Alle Dokumente (Ausweis, Bestätigung, ggf. Mietvertrag) mitbringen.",
        "Vor Ort das Anmeldeformular ausfüllen und abgeben.",
        "Meldebescheinigung sofort mitnehmen — für Bankkonto, Steuer-ID etc. nötig.",
      ],
      bs: [
        "Rezervišite termin online kod nadležnog ureda (Bürgeramt).",
        "Neka vam stanodavac popuni potvrdu (Wohnungsgeberbestätigung).",
        "Ponesete sve dokumente: pasoš, potvrdu, ugovor o najmu.",
        "Na licu mjesta popunite formular za prijavu.",
        "Odmah preuzmite potvrdu o prijavi — treba vam za banku, porezni ID itd.",
      ],
      en: [
        "Book an appointment online at the local citizens' office.",
        "Have your landlord fill out the housing confirmation.",
        "Bring all documents: ID, confirmation, rental contract.",
        "Fill out the registration form on-site.",
        "Take the registration certificate — needed for bank, tax ID, etc.",
      ],
    },
    officialLink: "https://service.berlin.de/dienstleistung/120686/",
    officialLinkLabel: "Bürgeramt Online-Termin",
  },
  {
    id: "kindergeld",
    icon: Baby,
    title: { de: "Kindergeld beantragen", bs: "Zahtjev za Kindergeld", en: "Apply for Child Benefit" },
    description: {
      de: "Kindergeld wird für jedes Kind bis 18 Jahre gezahlt (bis 25 bei Ausbildung). Der Antrag wird bei der Familienkasse gestellt.",
      bs: "Kindergeld se isplaćuje za svako dijete do 18. godine (do 25. uz školovanje). Zahtjev se podnosi kod Familienkasse.",
      en: "Child benefit is paid for every child under 18 (up to 25 if in education). Apply at the Family Benefits Office.",
    },
    documents: {
      de: ["Geburtsurkunde des Kindes", "Steuer-ID (Elternteil + Kind)", "Meldebescheinigung", "Aufenthaltstitel (Nicht-EU)", "Ggf. Schulbescheinigung (ab 18)"],
      bs: ["Rodni list djeteta", "Porezni ID (roditelj + dijete)", "Potvrda o prijavi", "Boravišna dozvola (ne-EU)", "Potvrda škole (od 18. godine)"],
      en: ["Child's birth certificate", "Tax ID (parent + child)", "Registration certificate", "Residence permit (non-EU)", "School certificate (from 18)"],
    },
    steps: {
      de: [
        "Formular KG1 (Hauptantrag) und Anlage Kind (KG1-AnlKi) herunterladen.",
        "Persönliche Daten, Steuer-ID und Bankverbindung eintragen.",
        "Für jedes Kind eine separate Anlage Kind ausfüllen.",
        "Alle Nachweise (Geburtsurkunde, Meldebescheinigung) beifügen.",
        "An die zuständige Familienkasse senden — online oder per Post.",
        "Bearbeitungszeit: ca. 4–6 Wochen. Nachzahlung ab Geburt möglich.",
      ],
      bs: [
        "Preuzmite formular KG1 i prilog za dijete (KG1-AnlKi).",
        "Unesite lične podatke, porezni ID i podatke o bankovnom računu.",
        "Za svako dijete popunite poseban prilog.",
        "Priložite dokaze (rodni list, potvrda o prijavi).",
        "Pošaljite nadležnoj Familienkasse — online ili poštom.",
        "Obrada traje 4–6 sedmica. Moguća retroaktivna isplata od rođenja.",
      ],
      en: [
        "Download form KG1 and child attachment (KG1-AnlKi).",
        "Enter personal data, tax ID, and bank details.",
        "Fill out a separate attachment for each child.",
        "Attach proof (birth certificate, registration).",
        "Send to the responsible Family Benefits Office — online or by post.",
        "Processing: approx. 4–6 weeks. Retroactive payment from birth possible.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/familie-und-kinder/kindergeld-beantragen",
    officialLinkLabel: "Familienkasse Online",
  },
  {
    id: "elterngeld",
    icon: Heart,
    title: { de: "Elterngeld beantragen", bs: "Zahtjev za Elterngeld", en: "Apply for Parental Allowance" },
    description: {
      de: "Elterngeld ersetzt 65–67% des Nettoeinkommens nach der Geburt. Der Antrag muss innerhalb von 3 Monaten gestellt werden.",
      bs: "Elterngeld nadoknađuje 65–67% neto primanja nakon porođaja. Zahtjev mora biti podnesen u roku od 3 mjeseca.",
      en: "Parental allowance replaces 65–67% of net income after birth. Must be applied within 3 months.",
    },
    documents: {
      de: ["Geburtsurkunde (Original)", "Gehaltsnachweise (12 Monate)", "Arbeitgeberbescheinigung", "Krankenversicherungsnachweis", "Mutterschaftsgeldbescheinigung"],
      bs: ["Rodni list (original)", "Platne liste (12 mjeseci)", "Potvrda poslodavca", "Zdravstveno osiguranje", "Potvrda o porodiljskom dodatku"],
      en: ["Birth certificate (original)", "Salary slips (12 months)", "Employer certificate", "Health insurance proof", "Maternity benefit certificate"],
    },
    steps: {
      de: [
        "Zuständige Elterngeldstelle des Bundeslandes finden.",
        "Antrag herunterladen oder online über elterngeld-digital.de stellen.",
        "Bezugsmonate für beide Elternteile festlegen (max. 14 Monate Basiselterngeld).",
        "Einkommensnachweise der letzten 12 Monate vor Geburt beifügen.",
        "Arbeitgeberbescheinigung über geplante Elternzeit anfordern.",
        "Antrag innerhalb von 3 Monaten nach Geburt einreichen!",
      ],
      bs: [
        "Pronađite nadležnu Elterngeldstelle vaše savezne države.",
        "Preuzmite zahtjev ili ga podnesite online na elterngeld-digital.de.",
        "Odredite mjesece korištenja za oba roditelja (max. 14 mjeseci).",
        "Priložite dokaze o primanjima za 12 mjeseci prije porođaja.",
        "Zatražite potvrdu od poslodavca o roditeljskom odsustvu.",
        "Podnesite zahtjev u roku od 3 mjeseca od porođaja!",
      ],
      en: [
        "Find the parental allowance office of your federal state.",
        "Download the form or apply online at elterngeld-digital.de.",
        "Define benefit months for both parents (max. 14 months basic).",
        "Attach income proof for 12 months before birth.",
        "Request employer certificate for parental leave.",
        "Submit within 3 months after birth!",
      ],
    },
    officialLink: "https://www.elterngeld-digital.de",
    officialLinkLabel: "Elterngeld Digital",
  },
  {
    id: "krankenversicherung",
    icon: Stethoscope,
    title: { de: "Krankenversicherung anmelden", bs: "Prijava zdravstvenog osiguranja", en: "Register Health Insurance" },
    description: {
      de: "In Deutschland besteht Versicherungspflicht. Arbeitnehmer werden automatisch versichert, Selbständige müssen sich selbst anmelden.",
      bs: "U Njemačkoj postoji obavezno osiguranje. Zaposlenici su automatski osigurani, samostalni moraju se sami prijaviti.",
      en: "Health insurance is mandatory in Germany. Employees are automatically insured; self-employed must register themselves.",
    },
    documents: {
      de: ["Meldebescheinigung", "Arbeitsvertrag oder Gewerbeanmeldung", "Reisepass / Aufenthaltstitel", "Ggf. Nachweis Vorversicherung", "Bankverbindung"],
      bs: ["Potvrda o prijavi", "Ugovor o radu ili prijava obrta", "Pasoš / boravišna dozvola", "Eventualno dokaz prethodnog osiguranja", "Bankovni podaci"],
      en: ["Registration certificate", "Employment contract or business registration", "Passport / residence permit", "Proof of prior insurance if applicable", "Bank details"],
    },
    steps: {
      de: [
        "Gesetzliche Krankenkasse wählen (z.B. AOK, TK, Barmer, DAK).",
        "Online-Antrag auf der Webseite der Krankenkasse ausfüllen.",
        "Meldebescheinigung und Arbeitsvertrag hochladen oder per Post senden.",
        "Versichertenkarte (eGK) wird innerhalb von 2–3 Wochen zugesendet.",
        "Arbeitgeber über die gewählte Kasse informieren.",
      ],
      bs: [
        "Odaberite zdravstvenu blagajnu (AOK, TK, Barmer, DAK itd.).",
        "Popunite online zahtjev na stranici blagajne.",
        "Učitajte ili pošaljite potvrdu o prijavi i ugovor o radu.",
        "Kartica osiguranika (eGK) stiže za 2–3 sedmice.",
        "Obavijestite poslodavca o odabranoj blagajni.",
      ],
      en: [
        "Choose a statutory health insurer (AOK, TK, Barmer, DAK, etc.).",
        "Fill out the online application on the insurer's website.",
        "Upload or mail registration certificate and employment contract.",
        "Insurance card (eGK) arrives within 2–3 weeks.",
        "Inform your employer about your chosen insurer.",
      ],
    },
    officialLink: "https://www.krankenkassen.de",
    officialLinkLabel: "Krankenkassen-Vergleich",
  },
  {
    id: "kuendigung",
    icon: XCircle,
    title: { de: "Kündigungsschreiben", bs: "Otkazno pismo", en: "Termination Letter" },
    description: {
      de: "Ein Kündigungsschreiben muss schriftlich erfolgen und bestimmte Fristen einhalten. Hier findest du eine Schritt-für-Schritt Anleitung.",
      bs: "Otkazno pismo mora biti u pisanom obliku i poštovati rokove. Ovdje pronalazite korak-po-korak uputstvo.",
      en: "A termination letter must be in writing and observe notice periods. Here's a step-by-step guide.",
    },
    documents: {
      de: ["Arbeitsvertrag (für Kündigungsfristen)", "Personalausweis", "Ggf. ärztliches Attest (Sonderkündigung)"],
      bs: ["Ugovor o radu (za rokove otkazivanja)", "Lična karta", "Eventualno ljekarski nalaz (vanredni otkaz)"],
      en: ["Employment contract (for notice periods)", "ID", "Medical certificate if applicable (special termination)"],
    },
    steps: {
      de: [
        "Kündigungsfrist im Arbeitsvertrag oder Tarifvertrag prüfen (Standard: 4 Wochen zum 15. oder Monatsende).",
        "Schriftliches Kündigungsschreiben verfassen — handschriftliche Unterschrift ist Pflicht!",
        "Adressat: Arbeitgeber mit vollständigem Firmennamen und Adresse.",
        "Datum, eigener Name, Betreff 'Kündigung' und gewünschtes Enddatum angeben.",
        "Persönlich gegen Empfangsbestätigung übergeben ODER per Einschreiben senden.",
        "Kopie des Schreibens und Zustellnachweis aufbewahren.",
      ],
      bs: [
        "Provjerite otkazni rok u ugovoru o radu (standard: 4 sedmice do 15. ili kraja mjeseca).",
        "Sastavite pismeni otkaz — vlastoručni potpis je obavezan!",
        "Primalac: poslodavac sa punim imenom firme i adresom.",
        "Navedite datum, vaše ime, naslov 'Kündigung' i željeni datum prestanka.",
        "Predajte lično uz potvrdu prijema ILI pošaljite preporučenom poštom.",
        "Sačuvajte kopiju pisma i dokaz o dostavi.",
      ],
      en: [
        "Check notice period in your contract (standard: 4 weeks to the 15th or end of month).",
        "Write a formal letter — handwritten signature required!",
        "Addressee: employer with full company name and address.",
        "Include date, your name, subject 'Kündigung', and desired end date.",
        "Hand-deliver with receipt confirmation OR send via registered mail.",
        "Keep a copy and proof of delivery.",
      ],
    },
    officialLink: "https://www.arbeitsagentur.de/arbeitslos-arbeit-finden/kuendigung",
    officialLinkLabel: "Agentur für Arbeit",
  },
  {
    id: "jobcenter",
    icon: Landmark,
    title: { de: "Jobcenter & Behördengänge", bs: "Jobcenter i uredske obaveze", en: "Jobcenter & Office Visits" },
    description: {
      de: "Beim Jobcenter können Bürgergeld, Weiterbildungen und Eingliederungshilfen beantragt werden. Hier der Ablauf.",
      bs: "Kod Jobcentera možete zatražiti Bürgergeld, dodatno obrazovanje i pomoć pri integraciji. Evo kako.",
      en: "At the Jobcenter you can apply for Bürgergeld, further education, and integration support. Here's how.",
    },
    documents: {
      de: ["Personalausweis / Aufenthaltstitel", "Meldebescheinigung", "Mietvertrag + Nebenkostenabrechnung", "Kontoauszüge (3 Monate)", "Arbeitsvertrag / Kündigung", "Einkommensnachweise"],
      bs: ["Lična karta / boravišna dozvola", "Potvrda o prijavi", "Ugovor o najmu + režije", "Izvodi iz računa (3 mjeseca)", "Ugovor o radu / otkaz", "Dokazi o primanjima"],
      en: ["ID / residence permit", "Registration certificate", "Rental contract + utilities", "Bank statements (3 months)", "Employment contract / termination", "Income proof"],
    },
    steps: {
      de: [
        "Online arbeitsuchend melden unter jobcenter.digital.",
        "Erstgespräch-Termin wird automatisch vergeben.",
        "Alle Dokumente zum Termin mitbringen (Checkliste beachten).",
        "Antrag auf Bürgergeld ausfüllen — Sachbearbeiter hilft vor Ort.",
        "Kosten der Unterkunft (KdU) werden separat geprüft.",
        "Eingliederungsvereinbarung besprechen und unterschreiben.",
        "Regelmäßige Folgetermine wahrnehmen.",
      ],
      bs: [
        "Prijavite se online kao tražilac posla na jobcenter.digital.",
        "Automatski dobijate termin za prvi razgovor.",
        "Ponesete sve dokumente na termin.",
        "Popunite zahtjev za Bürgergeld — službenik pomaže na licu mjesta.",
        "Troškovi stanovanja se provjeravaju odvojeno.",
        "Dogovorite i potpišite sporazum o integraciji.",
        "Redovno dolazite na zakazane termine.",
      ],
      en: [
        "Register as job-seeking online at jobcenter.digital.",
        "An initial meeting is automatically scheduled.",
        "Bring all documents to the appointment.",
        "Fill out the Bürgergeld application — staff help on-site.",
        "Housing costs are reviewed separately.",
        "Discuss and sign the integration agreement.",
        "Attend regular follow-up appointments.",
      ],
    },
    officialLink: "https://www.jobcenter.digital",
    officialLinkLabel: "Jobcenter Digital",
  },
];

const pageTitles = {
  de: { title: "Formulare & Hilfe", subtitle: "Praktische Schritt-für-Schritt Anleitungen für alle wichtigen Behördengänge." },
  bs: { title: "Formulari & Pomoć", subtitle: "Praktična uputstva korak po korak za sve važne uredske obaveze." },
  en: { title: "Forms & Help", subtitle: "Practical step-by-step guides for all important administrative tasks." },
};

const labels = {
  de: { documents: "Benötigte Dokumente", steps: "Schritt-für-Schritt Anleitung", officialLink: "Offizieller Link", template: "Vorlage herunterladen", premiumTitle: "Vollständige Anleitung nur mit BalkanLink Plus", premiumDesc: "Erhalte alle Schritte, Vorlagen und Dokument-Checklisten.", premiumCta: "Plus freischalten", loginCta: "Anmelden" },
  bs: { documents: "Potrebni dokumenti", steps: "Korak po korak uputstvo", officialLink: "Zvanični link", template: "Preuzmi predložak", premiumTitle: "Kompletno uputstvo samo sa BalkanLink Plus", premiumDesc: "Dobij sve korake, predloške i liste dokumenata.", premiumCta: "Aktiviraj Plus", loginCta: "Prijavi se" },
  en: { documents: "Required Documents", steps: "Step-by-Step Guide", officialLink: "Official Link", template: "Download Template", premiumTitle: "Full guide available with BalkanLink Plus", premiumDesc: "Get all steps, templates, and document checklists.", premiumCta: "Unlock Plus", loginCta: "Sign in" },
};

export default function Formulare() {
  const { language } = useLanguage();
  const { isPremium, user } = useAuth();
  const lk = getLk(language);
  const t = pageTitles[lk];
  const l = labels[lk];

  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <>
      {/* Hero */}
      <section className="border-b bg-primary py-12">
        <div className="container text-center">
          <h1 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t.title}</h1>
          <p className="mt-2 text-sm text-primary-foreground/80 md:text-base">{t.subtitle}</p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container max-w-3xl space-y-3">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-xl border bg-card shadow-sm"
              >
                {/* Header */}
                <button
                  onClick={() => toggle(cat.id)}
                  className="group flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-gold/10 group-hover:text-gold">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-bold">{cat.title[lk]}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{cat.description[lk]}</p>
                  </div>
                  <ChevronDown className={`ml-auto h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Expandable content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t px-5 pb-6 pt-5 space-y-5">
                        {/* Description */}
                        <p className="text-sm leading-relaxed text-muted-foreground">{cat.description[lk]}</p>

                        {/* Documents — always visible (free preview) */}
                        <div>
                          <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                            <FileText className="h-3.5 w-3.5" /> {l.documents}
                          </h3>
                          <ul className="space-y-1.5">
                            {cat.documents[lk].map((doc, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                                {doc}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Steps — gated behind Plus */}
                        {isPremium ? (
                          <>
                            <div>
                              <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                                <Crown className="h-3.5 w-3.5 text-gold" /> {l.steps}
                              </h3>
                              <ol className="space-y-2">
                                {cat.steps[lk].map((step, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">
                                      {i + 1}
                                    </span>
                                    <span className="text-muted-foreground leading-relaxed">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            {/* Official link */}
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={cat.officialLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-lg bg-gold/10 px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold/20"
                              >
                                <ExternalLink className="h-4 w-4" />
                                {cat.officialLinkLabel}
                              </a>
                              {cat.templateLink && (
                                <a
                                  href={cat.templateLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                                >
                                  <Download className="h-4 w-4" />
                                  {l.template}
                                </a>
                              )}
                            </div>
                          </>
                        ) : (
                          /* Premium lock for non-Plus users */
                          <div className="relative">
                            {/* Blurred preview of first 2 steps */}
                            <div className="pointer-events-none select-none blur-[5px] opacity-40 max-h-24 overflow-hidden" aria-hidden="true">
                              <ol className="space-y-2">
                                {cat.steps[lk].slice(0, 2).map((step, i) => (
                                  <li key={i} className="flex items-start gap-3 text-sm">
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/10 text-[10px] font-bold text-gold">{i + 1}</span>
                                    <span className="text-muted-foreground">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>

                            <div className="relative -mt-2 flex flex-col items-center rounded-xl border border-gold/15 bg-gradient-to-b from-muted/60 to-muted/30 px-5 py-8 text-center backdrop-blur-sm">
                              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/20">
                                <Lock className="h-5 w-5 text-gold" />
                              </div>
                              <p className="mb-1 text-sm font-bold">{l.premiumTitle}</p>
                              <p className="mb-5 max-w-xs text-xs text-muted-foreground">{l.premiumDesc}</p>
                              <Button className="btn-gold-gradient rounded-xl px-6" asChild>
                                <Link to={user ? "/premium" : "/login"}>
                                  <Crown className="mr-2 h-4 w-4" />
                                  {user ? l.premiumCta : l.loginCta}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          <LegalDisclaimer />
        </div>
      </section>
    </>
  );
}
