import SubpageNav from "@/components/SubpageNav";

export default function KiHinweis() {
  return (
    <>
    <SubpageNav />
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Hinweis zur Nutzung künstlicher Intelligenz</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Einsatz von KI auf dieser Plattform</h2>
          <p>
            Die Plattform „BalkanLink" setzt an verschiedenen Stellen KI-gestützte Technologien ein,
            insbesondere:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Informationsassistent („Pitaj BalkanLink")</li>
            <li>Dokumenten-Check (allgemeine Erklärung von Dokumenten)</li>
            <li>Inhaltlich unterstützte Formularhilfen</li>
          </ul>
          <p className="mt-2">
            Die KI-gestützten Funktionen dienen ausschließlich der allgemeinen Information und Orientierung.
            Sie stellen <strong>keine Rechtsberatung, Steuerberatung oder sonstige professionelle Beratung</strong> dar.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Keine verbindlichen Aussagen</h2>
          <p>Der Assistent gibt keine verbindlichen Aussagen ab. Insbesondere verwendet er keine Formulierungen wie:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>„Sie haben Anspruch auf …"</li>
            <li>„Sie bekommen garantiert …"</li>
            <li>„Sie müssen zwingend …"</li>
          </ul>
          <p className="mt-2">Stattdessen werden bewusst unverbindliche Formulierungen verwendet wie:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>„In der Regel …"</li>
            <li>„Typischerweise …"</li>
            <li>„Es kann sein, dass …"</li>
            <li>„Bitte prüfen Sie dies bei der zuständigen Behörde."</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Mögliche Ungenauigkeiten</h2>
          <p>
            KI-gestützte Systeme können Fehler machen. Die Ausgaben des Assistenten können Ungenauigkeiten,
            veraltete Informationen oder unvollständige Angaben enthalten. Der Nutzer ist angehalten,
            die erhaltenen Informationen eigenständig zu prüfen und bei Bedarf offizielle Quellen zu konsultieren.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Datenschutz bei der KI-Nutzung</h2>
          <p>
            Eingegebene Texte werden ausschließlich zur Beantwortung der jeweiligen Anfrage verarbeitet und
            <strong> nicht dauerhaft gespeichert</strong>. Es erfolgt keine Protokollierung, kein Training
            mit Nutzerdaten und keine Weitergabe an Dritte.
          </p>
          <p className="mt-2">
            <strong>Wichtiger Hinweis:</strong> Bitte geben Sie keine sensiblen personenbezogenen Daten ein,
            insbesondere:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Personalausweis- oder Reisepassnummern</li>
            <li>Steuer-Identifikationsnummern</li>
            <li>IBAN oder Kreditkartendaten</li>
            <li>Gesundheitsdaten</li>
            <li>Aktenzeichen oder Bescheide</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Verbindliche Auskünfte</h2>
          <p>
            Für verbindliche rechtliche Auskünfte wenden Sie sich bitte an einen Rechtsanwalt, Steuerberater
            oder die zuständige Behörde. Die Nutzung des KI-Assistenten ersetzt in keinem Fall eine professionelle
            Beratung.
          </p>
        </section>
      </div>
    </div>
  );
}
