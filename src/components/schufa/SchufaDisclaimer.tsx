import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ClipboardCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const STORAGE_KEY = "schufa_disclaimer_accepted_v1";

interface Props {
  onAccept: () => void;
}

/**
 * Blocking disclaimer overlay — i18n via "schufa" namespace.
 * Versionirano (_v1) — kad se zakonski okvir promijeni, traži se novi pristanak.
 */
export default function SchufaDisclaimer({ onAccept }: Props) {
  const { t } = useTranslation("schufa");
  const [show, setShow] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (accepted === "true") {
      onAccept();
    } else {
      setShow(true);
    }
  }, [onAccept]);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
    onAccept();
  };

  const allChecked = check1 && check2 && check3;
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="schufa-disclaimer-title"
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[hsl(var(--gold))]/30 shadow-2xl"
        style={{
          background: "linear-gradient(160deg, hsl(220,50%,8%,0.98), hsl(225,45%,6%,0.99))",
        }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start gap-4 mb-5">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,60%,42%))" }}
            >
              <ClipboardCheck className="h-6 w-6 text-[hsl(225,45%,6%)]" />
            </div>
            <div>
              <h2 id="schufa-disclaimer-title" className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {t("disclaimer.title")}
              </h2>
              <p className="mt-1 text-sm text-[hsl(var(--gold))] font-medium">
                {t("disclaimer.subtitle")}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <div className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <p className="text-amber-100">
                <strong className="text-amber-300">{t("disclaimer.warningStrong")}</strong>{" "}
                {t("disclaimer.warningBody")}
              </p>
            </div>

            <ul className="space-y-2.5 list-disc list-inside">
              <li>
                {t("disclaimer.bullet1", {
                  strong1: t("disclaimer.bullet1Strong1"),
                  strong2: t("disclaimer.bullet1Strong2"),
                })
                  .split(/(\{\{strong[12]\}\}|<\/?strong>)/)
                  .map((s, i) =>
                    s === t("disclaimer.bullet1Strong1") || s === t("disclaimer.bullet1Strong2") ? (
                      <strong key={i} className="text-white">{s}</strong>
                    ) : (
                      <span key={i}>{s}</span>
                    )
                  )}
              </li>
              <li>
                <strong className="text-white">{t("disclaimer.bullet2Strong")}</strong>{" "}
                {t("disclaimer.bullet2", { strong: "" }).replace(/\{\{strong\}\}\s*/, "")}
              </li>
              <li>
                {t("disclaimer.bullet3", { strong: "" }).split(/\{\{strong\}\}/)[0]}
                <strong className="text-white">{t("disclaimer.bullet3Strong")}</strong>
                {t("disclaimer.bullet3", { strong: "" }).split(/\{\{strong\}\}/)[1]}
              </li>
              <li>{t("disclaimer.bullet4")}</li>
              <li>
                {t("disclaimer.bullet5", { strong: "" }).split(/\{\{strong\}\}/)[0]}
                <strong className="text-white">{t("disclaimer.bullet5Strong")}</strong>
                {t("disclaimer.bullet5", { strong: "" }).split(/\{\{strong\}\}/)[1]}
              </li>
            </ul>

            <a
              href="https://www.meineschufa.de/de/datenkopie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[hsl(var(--gold))] hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              {t("disclaimer.officialLink")}
            </a>
          </div>

          <div className="mt-6 space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
            {[
              { state: check1, set: setCheck1, key: "check1" as const },
              { state: check2, set: setCheck2, key: "check2" as const },
              { state: check3, set: setCheck3, key: "check3" as const },
            ].map(({ state, set, key }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer text-sm text-white/90">
                <Checkbox
                  checked={state}
                  onCheckedChange={(v) => set(v === true)}
                  className="mt-0.5 border-white/40 data-[state=checked]:bg-[hsl(var(--gold))] data-[state=checked]:border-[hsl(var(--gold))]"
                />
                <span dangerouslySetInnerHTML={{ __html: t(`disclaimer.${key}`) }} />
              </label>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleAccept}
              disabled={!allChecked}
              className="flex-1 h-12 font-bold text-base text-[hsl(225,45%,6%)] disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:scale-[1.02]"
              style={{
                background: allChecked
                  ? "linear-gradient(135deg, hsl(43,70%,53%), hsl(38,65%,45%))"
                  : "hsl(0,0%,30%)",
                boxShadow: allChecked ? "0 4px 20px hsla(43,70%,53%,0.35)" : "none",
              }}
            >
              {allChecked ? t("disclaimer.ctaAccept") : t("disclaimer.ctaWaiting")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="h-12 text-white/60 hover:text-white hover:bg-white/5"
            >
              {t("disclaimer.ctaCancel")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
