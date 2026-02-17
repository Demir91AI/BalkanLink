export default function Datenschutz() {
  return (
    <div className="container max-w-2xl py-16">
      <h1 className="mb-6 text-3xl font-bold">Datenschutzerklärung</h1>
      <div className="space-y-6 text-sm text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Datenschutz auf einen Blick</h2>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Datenerfassung auf dieser Website</h2>
          <p>Wir erheben nur die für die Nutzung des Dienstes notwendigen Daten: E-Mail-Adresse und Passwort (gehasht). Wir erheben keine Namen, Adressen oder Telefonnummern.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Ihre Rechte</h2>
          <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung und Löschung Ihrer Daten. Sie können Ihr Konto jederzeit in den Einstellungen löschen.</p>
        </section>
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Zahlungsdaten</h2>
          <p>Zahlungen werden über Stripe abgewickelt. Wir speichern keine Kreditkartendaten. Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe.</p>
        </section>
        <p className="text-xs">Hinweis: Diese Datenschutzerklärung ist ein Entwurf und muss vor der Veröffentlichung von einem Rechtsanwalt geprüft werden.</p>
      </div>
    </div>
  );
}
