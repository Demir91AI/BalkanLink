import { ExternalLink, FileText, CheckCircle2, AlertTriangle, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onRestart: () => void;
}

export default function SchufaOfficialGuide({ onRestart }: Props) {
  const handleDownloadMusterbrief = () => {
    const today = new Date().toLocaleDateString("de-DE");
    const content = `[Tvoje ime i prezime]
[Tvoja adresa]
[PLZ Grad]

SCHUFA Holding AG
Postfach 10 25 66
44725 Bochum

${today}

Antrag auf Datenkopie nach Art. 15 DSGVO

Sehr geehrte Damen und Herren,

hiermit beantrage ich gemäß Art. 15 DSGVO eine kostenlose Datenkopie aller über mich
gespeicherten personenbezogenen Daten (Datenkopie nach Art. 15 Abs. 3 DSGVO).

Zur Identifikation meiner Person übersende ich Ihnen meine folgenden Daten:

Name, Vorname:    [Tvoje ime i prezime]
Geburtsdatum:     [Datum rođenja: DD.MM.GGGG]
Geburtsort:       [Mjesto rođenja]
Aktuelle Anschrift: [Trenutna adresa]
Frühere Anschriften (letzte 5 Jahre):
                  [Prijašnja adresa 1]
                  [Prijašnja adresa 2]

Ich bitte um Übersendung der Auskunft per Post an meine oben genannte Adresse.

Hinweis: Die erste Datenkopie pro Kalenderjahr ist gemäß Art. 15 Abs. 3 DSGVO
unentgeltlich zu erteilen.

Mit freundlichen Grüßen


_______________________
[Tvoj potpis]
[Tvoje ime — štampano]

Anlagen: Kopie des Personalausweises / Aufenthaltstitels (geschwärzt)
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Schufa-Datenkopie-Antrag.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      <div
        className="rounded-2xl border border-[hsl(var(--gold))]/30 p-6"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,10%,0.95), hsl(225,45%,7%,0.97))",
        }}
      >
        <h2 className="text-2xl font-black text-white mb-2">Zvanični Schufa Auskunft</h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Sve što trebaš znati da dobiješ <strong className="text-white">stvarne</strong> podatke od Schufa Holding AG.
        </p>
      </div>

      {/* 4 verzije Schufa izvoda */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">Koji izvod ti treba?</h3>
        <div className="space-y-3">
          <OptionCard
            recommended
            title="Datenkopie (§15 DSGVO)"
            price="BESPLATNO"
            useCase="Za tebe lično — jednom godišnje"
            description="Kompletni izvod svih podataka koje Schufa ima o tebi. Ovo je tvoje zakonsko pravo."
            link="https://www.meineschufa.de/de/datenkopie"
            linkText="Zatraži besplatni Datenkopie"
          />
          <OptionCard
            title="bonify (besplatna app)"
            price="BESPLATNO"
            useCase="Za brzi pregled na mobitelu"
            description="App od Schufe sa pojednostavljenim prikazom score-a. Ne zamjenjuje zvanični Datenkopie."
            link="https://www.bonify.de"
            linkText="Otvori bonify"
          />
          <OptionCard
            title="Bonitätsauskunft"
            price="29,95€ jednokratno"
            useCase="Za stanodavca pri prijavi na stan"
            description="Sertifikat koji se daje stanodavcu — pokazuje samo opštu bonitetnu sliku, bez detalja."
            link="https://www.meineschufa.de/de/bonitaetsauskunft"
            linkText="Zatraži Bonitätsauskunft"
          />
          <OptionCard
            title="meineSCHUFA Plus"
            price="3,95€/mj"
            useCase="Za kontinuirano praćenje (npr. nakon insolvencije)"
            description="Online pristup, ažuriranja u realnom vremenu, push notifikacije pri promjenama."
            link="https://www.meineschufa.de"
            linkText="meineSCHUFA registracija"
          />
        </div>
      </div>

      {/* Korak po korak */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">Kako zatražiti besplatni Datenkopie — korak po korak</h3>
        <ol className="space-y-3 text-sm text-white/80">
          <Step n={1}>
            Idi na zvanični link:{" "}
            <a
              href="https://www.meineschufa.de/de/datenkopie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--gold))] underline"
            >
              meineschufa.de/de/datenkopie
            </a>
          </Step>
          <Step n={2}>
            Popuni online formular sa: ime, prezime, datum rođenja, adresa (i prijašnje adrese 5 god.).
          </Step>
          <Step n={3}>
            Pošalji kopiju pasoša/lične karte (možeš zatamniti broj pasoša — Schufa ne treba taj broj).
          </Step>
          <Step n={4}>
            Sačekaj <strong>2-4 sedmice</strong> — Datenkopie stiže poštom na tvoju adresu.
          </Step>
          <Step n={5}>
            Provjeri sve podatke. Ako je nešto netačno → odmah <strong>Berichtigungsantrag</strong>.
          </Step>
        </ol>
      </div>

      {/* Musterbrief download */}
      <div className="rounded-2xl border border-[hsl(var(--gold))]/30 bg-[hsl(var(--gold))]/5 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="shrink-0 h-12 w-12 rounded-xl bg-[hsl(var(--gold))]/15 flex items-center justify-center">
              <FileText className="h-5 w-5 text-[hsl(var(--gold))]" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-0.5">Musterbrief — Datenkopie Antrag</h4>
              <p className="text-xs text-white/60">
                Spremni obrazac na njemačkom za slanje preporučenom poštom (Einschreiben)
              </p>
            </div>
          </div>
          <Button
            onClick={handleDownloadMusterbrief}
            className="h-11 font-bold text-[hsl(225,45%,6%)] shrink-0"
            style={{
              background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Preuzmi Musterbrief
          </Button>
        </div>
      </div>

      {/* Šta ako su podaci netačni */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-300 mt-0.5" />
          <div className="text-sm text-red-100 leading-relaxed">
            <p className="font-bold text-red-200 mb-1">Ako pronađeš netačne podatke u svom Schufa izvodu:</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li>Pošalji <strong>Berichtigungsantrag</strong> (zahtjev za ispravku) Schufi i kreditoru/banci.</li>
              <li>Priloži dokaz (ugovor, potvrda o plaćanju, korespondencija).</li>
              <li>Schufa po zakonu mora reagovati u roku od 30 dana (§17 DSGVO).</li>
              <li>
                Ako odbiju → besplatna pomoć:{" "}
                <a
                  href="https://www.verbraucherzentrale.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-red-200"
                >
                  Verbraucherzentrale
                </a>{" "}
                ili podnesi prijavu pri <a
                  href="https://www.bfdi.bund.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-red-200"
                >BfDI</a>.
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={onRestart}
          variant="ghost"
          className="h-12 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 flex-1"
        >
          Ponovi simulaciju
        </Button>
        <Button
          asChild
          className="h-12 font-bold text-[hsl(225,45%,6%)] flex-1"
          style={{
            background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))",
          }}
        >
          <a href="https://www.meineschufa.de/de/datenkopie" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Zatraži zvanični Datenkopie
          </a>
        </Button>
      </div>
    </div>
  );
}

function OptionCard({
  recommended,
  title,
  price,
  useCase,
  description,
  link,
  linkText,
}: {
  recommended?: boolean;
  title: string;
  price: string;
  useCase: string;
  description: string;
  link: string;
  linkText: string;
}) {
  return (
    <div
      className={`rounded-xl p-4 border transition-all ${
        recommended
          ? "border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/5"
          : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2 mb-1.5">
        {recommended && (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Preporučeno
          </span>
        )}
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <span className={`text-xs font-bold ml-auto ${price === "BESPLATNO" ? "text-emerald-400" : "text-white/60"}`}>
          {price}
        </span>
      </div>
      <p className="text-xs text-white/50 mb-1.5">📌 {useCase}</p>
      <p className="text-xs text-white/70 mb-3 leading-relaxed">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[hsl(var(--gold))] hover:underline"
      >
        <Mail className="h-3.5 w-3.5" />
        {linkText} →
      </a>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="shrink-0 h-6 w-6 rounded-full bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] font-bold text-xs flex items-center justify-center">
        {n}
      </span>
      <span className="leading-relaxed pt-0.5">{children}</span>
    </li>
  );
}
