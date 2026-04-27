import { ExternalLink, FileText, CheckCircle2, AlertTriangle, Mail, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface Props {
  onRestart: () => void;
}

export default function SchufaOfficialGuide({ onRestart }: Props) {
  const { t } = useTranslation("schufa");

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
        <h2 className="text-2xl font-black text-white mb-2">{t("guide.title")}</h2>
        <p
          className="text-sm text-white/60 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t("guide.subline") }}
        />
      </div>

      {/* 4 verzije Schufa izvoda */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">{t("guide.optionsTitle")}</h3>
        <div className="space-y-3">
          <OptionCard
            recommended
            recommendedLabel={t("guide.recommended")}
            title={t("guide.opt1Title")}
            price={t("guide.free")}
            freeLabel={t("guide.free")}
            useCase={t("guide.opt1UseCase")}
            description={t("guide.opt1Description")}
            link="https://www.meineschufa.de/de/datenkopie"
            linkText={t("guide.opt1LinkText")}
          />
          <OptionCard
            title={t("guide.opt2Title")}
            price={t("guide.free")}
            freeLabel={t("guide.free")}
            useCase={t("guide.opt2UseCase")}
            description={t("guide.opt2Description")}
            link="https://www.bonify.de"
            linkText={t("guide.opt2LinkText")}
          />
          <OptionCard
            title={t("guide.opt3Title")}
            price={t("guide.opt3Price")}
            freeLabel={t("guide.free")}
            useCase={t("guide.opt3UseCase")}
            description={t("guide.opt3Description")}
            link="https://www.meineschufa.de/de/bonitaetsauskunft"
            linkText={t("guide.opt3LinkText")}
          />
          <OptionCard
            title={t("guide.opt4Title")}
            price={t("guide.opt4Price")}
            freeLabel={t("guide.free")}
            useCase={t("guide.opt4UseCase")}
            description={t("guide.opt4Description")}
            link="https://www.meineschufa.de"
            linkText={t("guide.opt4LinkText")}
          />
        </div>
      </div>

      {/* Korak po korak */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h3 className="text-base font-bold text-white mb-4">{t("guide.stepsTitle")}</h3>
        <ol className="space-y-3 text-sm text-white/80">
          <Step n={1}>
            {t("guide.step1")}{" "}
            <a
              href="https://www.meineschufa.de/de/datenkopie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--gold))] underline"
            >
              {t("guide.step1Link")}
            </a>
          </Step>
          <Step n={2}>{t("guide.step2")}</Step>
          <Step n={3}>{t("guide.step3")}</Step>
          <Step n={4}>
            <span dangerouslySetInnerHTML={{ __html: t("guide.step4") }} />
          </Step>
          <Step n={5}>
            <span dangerouslySetInnerHTML={{ __html: t("guide.step5") }} />
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
              <h4 className="text-base font-bold text-white mb-0.5">{t("guide.musterTitle")}</h4>
              <p className="text-xs text-white/60">{t("guide.musterSubline")}</p>
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
            {t("guide.musterCta")}
          </Button>
        </div>
      </div>

      {/* Šta ako su podaci netačni */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-300 mt-0.5" />
          <div className="text-sm text-red-100 leading-relaxed">
            <p className="font-bold text-red-200 mb-1">{t("guide.errorsTitle")}</p>
            <ol className="list-decimal list-inside space-y-1 mt-2">
              <li dangerouslySetInnerHTML={{ __html: t("guide.error1") }} />
              <li>{t("guide.error2")}</li>
              <li>{t("guide.error3")}</li>
              <li>
                {t("guide.error4Before")}{" "}
                <a
                  href="https://www.verbraucherzentrale.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-red-200"
                >
                  Verbraucherzentrale
                </a>{" "}
                {t("guide.error4Mid")}{" "}
                <a
                  href="https://www.bfdi.bund.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-red-200"
                >
                  BfDI
                </a>
                {t("guide.error4After")}
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
          {t("guide.ctaRestart")}
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
            {t("guide.ctaOfficial")}
          </a>
        </Button>
      </div>
    </div>
  );
}

function OptionCard({
  recommended,
  recommendedLabel,
  title,
  price,
  freeLabel,
  useCase,
  description,
  link,
  linkText,
}: {
  recommended?: boolean;
  recommendedLabel?: string;
  title: string;
  price: string;
  freeLabel: string;
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
        {recommended && recommendedLabel && (
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[hsl(var(--gold))]/20 text-[hsl(var(--gold))] flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            {recommendedLabel}
          </span>
        )}
        <h4 className="text-sm font-bold text-white">{title}</h4>
        <span className={`text-xs font-bold ml-auto ${price === freeLabel ? "text-emerald-400" : "text-white/60"}`}>
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
