import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { navigateBackOrHome } from "@/lib/navigation";

export default function TrainerBonusbedingungen() {
  const navigate = useNavigate();

  return (
    <>
      <section className="border-b bg-primary py-6">
        <div className="container max-w-2xl">
          <button
            onClick={() => navigateBackOrHome(navigate)}
            className="mb-3 flex items-center gap-1.5 text-sm text-primary-foreground/60 hover:text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3">
            <GraduationCap className="h-7 w-7 text-gold" />
            <div>
              <h1 className="text-lg font-black text-primary-foreground sm:text-xl">
                Bonusbedingungen
              </h1>
              <p className="text-xs text-primary-foreground/70">
                BalkanLink Deutsch – Wertgutschein-Programm
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-2xl py-6 space-y-6">
        <div className="rounded-xl border bg-card p-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <h2 className="text-base font-black text-foreground">1. Was ist der Wertgutschein?</h2>
          <p>
            Der Wertgutschein ist eine freiwillige Bonusleistung von BalkanLink. 
            Es besteht kein Rechtsanspruch auf den Erhalt eines Gutscheins.
          </p>

          <h2 className="text-base font-black text-foreground">2. Voraussetzungen</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Aktiver Premium-Zugang</strong> – Teilnahme nur für Premium-Nutzer</li>
            <li>100% Abschluss aller Aufgaben im jeweiligen Paket</li>
            <li>Kein Überspringen von Aufgaben</li>
            <li>Ausreichender Score (alle Aufgaben korrekt beantwortet)</li>
            <li>Kauf eines Pakets (A1+A2, B1+B2 oder C1+C2) – nicht für Einzelniveaus</li>
            <li>Zustimmung zu den AGB von BalkanLink</li>
          </ul>

          <h2 className="text-base font-black text-foreground">3. Staffelung</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Paket A (A1+A2): 1 Monat Premium gratis</li>
            <li>Paket B (B1+B2): 2 Monate Premium gratis</li>
            <li>Paket C (C1+C2): 3 Monate Premium gratis</li>
            <li>Alle Pakete (A1–C2) + Godišnji Premium: 30 € Amazon.de Gutschein</li>
          </ul>

          <h2 className="text-base font-black text-foreground">4. Einlösung</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Nur 1 Bonus pro Paket pro Nutzer</li>
            <li>Kein mehrfacher Bezug für dasselbe Paket</li>
            <li>Nutzer kann mehrere Freimonate sammeln (Paket A, B, C)</li>
            <li>Amazon-Gutschein (30 €) nur bei vollständigem Abschluss aller Pakete + Godišnji Premium — einmal möglich</li>
          </ul>

          <h2 className="text-base font-black text-foreground">5. Prüfung & Freigabe</h2>
          <p>
            Die Auszahlung erfolgt nicht automatisch. Nach Abschluss klickt der Nutzer auf 
            „Bonus anfordern". Die Anfrage wird durch BalkanLink geprüft und manuell freigegeben.
          </p>

          <h2 className="text-base font-black text-foreground">6. Missbrauch</h2>
          <p>
            BalkanLink behält sich das Recht vor, bei Verdacht auf Missbrauch (z.B. automatisierte 
            Antworten, Manipulation des Fortschritts) den Gutschein zu verweigern und den Nutzer 
            vom Programm auszuschließen.
          </p>

          <h2 className="text-base font-black text-foreground">7. Teilnahme</h2>
          <p>
            Die Teilnahme am Wertgutschein-Programm ist ausschließlich Premium-Nutzern vorbehalten 
            und erfordert die aktive Zustimmung zu den allgemeinen Geschäftsbedingungen (AGB) von BalkanLink.
          </p>

          <h2 className="text-base font-black text-foreground">8. Änderungen</h2>
          <p>
            BalkanLink behält sich das Recht vor, die Bonusbedingungen jederzeit zu ändern oder 
            das Programm einzustellen. Bereits erworbene Gutscheine bleiben davon unberührt.
          </p>

          <p className="text-[11px] text-muted-foreground/60 pt-4">
            Betreiber: RealCore Digital – Demir Sinanovic · Kontakt: kontakt@balkanlink.de
          </p>
        </div>
      </div>
    </>
  );
}
