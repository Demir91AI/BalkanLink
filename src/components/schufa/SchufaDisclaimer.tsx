import { useEffect, useState } from "react";
import { ClipboardCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const STORAGE_KEY = "schufa_disclaimer_accepted_v1";

interface Props {
  onAccept: () => void;
}

/**
 * Blocking disclaimer overlay — kao kod Asistenta.
 * Pojavljuje se prvi put kad korisnik otvori simulator.
 * Versionirano (_v1) — kad se zakonski okvir promijeni, traži se novi pristanak.
 */
export default function SchufaDisclaimer({ onAccept }: Props) {
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
                Važna napomena prije korištenja
              </h2>
              <p className="mt-1 text-sm text-[hsl(var(--gold))] font-medium">
                BalkanLink Bonitet Simulator
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-white/80 leading-relaxed">
            <div className="flex gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              <p className="text-amber-100">
                <strong className="text-amber-300">Ovo NIJE zvanični Schufa Score.</strong> Ovo je
                edukativna orijentaciona procjena bazirana na javno dostupnim faktorima koje Schufa
                Holding AG navodi u svom scoring modelu.
              </p>
            </div>

            <ul className="space-y-2.5 list-disc list-inside">
              <li>
                Procjena je <strong className="text-white">indikativna</strong> i bazirana na opštim
                faktorima — stvarni Schufa Score zavisi od podataka koje Schufa posjeduje o tebi, a
                ti podaci nam <strong className="text-white">NISU dostupni</strong>.
              </li>
              <li>
                Za zvaničnu informaciju <strong className="text-white">OBAVEZNO zatraži besplatni "Datenkopie nach Art. 15 DSGVO"</strong>
                {" "}direktno od Schufa Holding AG (1× godišnje besplatno).
              </li>
              <li>
                Banke, stanodavci i poslodavci koriste{" "}
                <strong className="text-white">isključivo zvanični Schufa Score</strong> — ne ovu procjenu.
              </li>
              <li>
                BalkanLink ne snosi odgovornost za odluke donesene na osnovu ove edukativne procjene.
                Ovo nije pravni ni finansijski savjet.
              </li>
              <li>
                Tvoji podaci se obrađuju <strong className="text-white">isključivo u tvom browseru</strong> —
                ništa se ne šalje na server i ništa se ne čuva.
              </li>
            </ul>

            <a
              href="https://www.meineschufa.de/de/datenkopie"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[hsl(var(--gold))] hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Zvanični besplatni Schufa Datenkopie zahtjev
            </a>
          </div>

          <div className="mt-6 space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <label className="flex items-start gap-3 cursor-pointer text-sm text-white/90">
              <Checkbox
                checked={check1}
                onCheckedChange={(v) => setCheck1(v === true)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-[hsl(var(--gold))] data-[state=checked]:border-[hsl(var(--gold))]"
              />
              <span>Razumijem da ovo <strong>nije zvanični Schufa Score</strong>.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer text-sm text-white/90">
              <Checkbox
                checked={check2}
                onCheckedChange={(v) => setCheck2(v === true)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-[hsl(var(--gold))] data-[state=checked]:border-[hsl(var(--gold))]"
              />
              <span>Razumijem da je ovo <strong>edukativna orijentaciona procjena</strong>.</span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer text-sm text-white/90">
              <Checkbox
                checked={check3}
                onCheckedChange={(v) => setCheck3(v === true)}
                className="mt-0.5 border-white/40 data-[state=checked]:bg-[hsl(var(--gold))] data-[state=checked]:border-[hsl(var(--gold))]"
              />
              <span>Razumijem da za zvaničnu informaciju moram zatražiti <strong>Datenkopie</strong> od Schufe.</span>
            </label>
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
              {allChecked ? "Slažem se i nastavljam →" : "Označi sve za nastavak"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="h-12 text-white/60 hover:text-white hover:bg-white/5"
            >
              Otkaži
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
