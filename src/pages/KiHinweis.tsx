export default function KiHinweis() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-8 text-3xl font-bold">KI-Hinweis</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <p>
          Der KI-Assistent auf dieser Plattform stellt keine Rechtsberatung dar.
          Er gibt ausschließlich allgemeine, unverbindliche Informationen.
        </p>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Nicht zulässige Formulierungen</h2>
          <p>Der Assistent gibt keine verbindlichen Aussagen wie:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>„Sie haben Anspruch"</li>
            <li>„Sie bekommen garantiert"</li>
            <li>„Sie müssen zwingend"</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">Zulässige Formulierungen</h2>
          <p>Der Assistent verwendet Formulierungen wie:</p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>„In der Regel"</li>
            <li>„Typischerweise"</li>
            <li>„Es kann sein"</li>
            <li>„Bitte prüfen Sie dies bei der zuständigen Behörde"</li>
          </ul>
        </section>

        <p>
          Für verbindliche rechtliche Auskünfte wenden Sie sich bitte an einen Rechtsanwalt oder die zuständige Behörde.
        </p>
      </div>
    </div>
  );
}
