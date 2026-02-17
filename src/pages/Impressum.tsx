export default function Impressum() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-6 text-3xl font-bold">Impressum</h1>
      <div className="prose prose-sm text-muted-foreground space-y-4">
        <p><strong>Angaben gemäß § 5 TMG</strong></p>
        <p>BalkanDE<br />Musterstraße 1<br />12345 Berlin<br />Deutschland</p>
        <p><strong>Kontakt:</strong><br />E-Mail: info@balkande.de</p>
        <p><strong>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</strong><br />BalkanDE Team</p>
        <p className="text-xs">Hinweis: Die Kontaktdaten auf dieser Seite sind Platzhalter und müssen vor der Veröffentlichung mit echten Daten ersetzt werden.</p>
      </div>
    </div>
  );
}
