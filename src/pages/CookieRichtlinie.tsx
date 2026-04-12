import { useState } from "react";
import PageNavBar from "@/components/navigation/PageNavBar";

export default function CookieRichtlinie() {
  const [analytics, setAnalytics] = useState(() => {
    try {
      const s = localStorage.getItem("bl-cookie-consent");
      return s ? JSON.parse(s).statistics ?? false : false;
    } catch { return false; }
  });

  const handleSave = () => {
    localStorage.setItem("bl-cookie-consent", JSON.stringify({
      necessary: true,
      functional: false,
      statistics: analytics,
      marketing: false,
    }));
    alert("Postavke su sačuvane.");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pb-28">
      <PageNavBar />
      <h1 className="mb-2 text-3xl font-bold">Postavke kolačića</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Cookie-Einstellungen — upravljanje kolačićima i lokalnom pohranom
      </p>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Šta su kolačići?</h2>
          <p>
            Kolačići su male tekstualne datoteke u pregledaču. Pored klasičnih kolačića,
            BalkanLink koristi <strong className="text-foreground">localStorage</strong> i{" "}
            <strong className="text-foreground">sessionStorage</strong> — mehanizme lokalne
            pohrane koji su ograničeni na tvoj uređaj i nikad se ne šalju automatski na server.
          </p>
          <p className="mt-2 text-xs opacity-70">
            Pravna osnova: §25 TDDDG u vezi s čl. 6 st. 1 tač. a DSGVO (saglasnost)
            i §25 st. 2 TDDDG (tehnički neophodni).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Vrste podataka</h2>

          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-4 mt-3">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-green-300">✓ Tehnički neophodni</p>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
                Uvijek aktivno
              </span>
            </div>
            <p className="mt-2 text-xs">
              Neophodni za rad platforme. Ne mogu se isključiti.
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1 text-xs">
              <li>Autentifikacijski token — drži te prijavljenim</li>
              <li>Postavke saglasnosti za kolačiće — bilježi tvoj odabir (12 mj.)</li>
              <li>Napredak u DeutschTraineru — lokalno, do sinhronizacije s računom</li>
            </ul>
            <p className="mt-2 text-xs opacity-60">
              Pravna osnova: §25 st. 2 TDDDG (tehnička neophodnost)
            </p>
          </div>

          <div className="rounded-md border border-border p-4 mt-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">📊 Analitički podaci (opcionalno)</p>
              <button
                onClick={() => setAnalytics(!analytics)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${analytics ? "bg-primary" : "bg-muted"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${analytics ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
            <p className="mt-2 text-xs">
              Anonimni podaci o korištenju koji nam pomažu poboljšati platformu.
              IP adresa se u potpunosti anonimizira. Nema prosljeđivanja reklamerima.
            </p>
            <p className="mt-2 text-xs opacity-60">
              Status: {analytics ? "Aktivirani ste za anonimnu analitiku" : "Analitika isključena"}<br />
              Pravna osnova: čl. 6 st. 1 tač. a DSGVO (isključivo uz tvoju aktivaciju)
            </p>
          </div>

          <div className="rounded-md border border-border p-4 mt-4 opacity-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-foreground">🎯 Marketinški kolačići</p>
              <span className="rounded-full bg-muted px-3 py-1 text-xs">Nije u upotrebi</span>
            </div>
            <p className="mt-2 text-xs">
              BalkanLink <strong className="text-foreground">ne koristi</strong> marketinške
              kolačiće, retargeting piksele ni reklamne mreže (Google Ads, Meta Pixel itd.).
              Platforma je bez reklama i bez praćenja za reklamne svrhe.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Brisanje kolačića u pregledaču</h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong className="text-foreground">Chrome:</strong> Postavke → Privatnost i sigurnost → Obriši podatke</li>
            <li><strong className="text-foreground">Firefox:</strong> Postavke → Privatnost → Kolačići i podaci stranice</li>
            <li><strong className="text-foreground">Safari:</strong> Postavke → Privatnost → Upravljanje podacima</li>
            <li><strong className="text-foreground">Edge:</strong> Postavke → Privatnost → Izbriši podatke pregledavanja</li>
          </ul>
          <p className="mt-2 text-xs opacity-70">
            Brisanjem svih kolačića možeš biti odjavan/a i izgubiti lokalni napredak u DeutschTraineru.
          </p>
        </section>

        <section>
          <p className="text-xs opacity-60">Verzija: April 2026</p>
        </section>

        <div className="pt-2">
          <button
            onClick={handleSave}
            className="rounded-md bg-primary px-6 py-2 text-sm font-medium
              text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Sačuvaj postavke
          </button>
        </div>

      </div>
    </div>
  );
}
