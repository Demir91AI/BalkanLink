export default function CookieRichtlinie() {
  return (
    <div className="container max-w-3xl py-16">
      <h1 className="mb-10 text-3xl font-bold">Cookie-Richtlinie &amp; Einwilligung</h1>
      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Was sind Cookies?</h2>
          <p>
            Cookies sind kleine Textdateien, die von Websites auf dem Endgerät des Nutzers gespeichert werden.
            Sie dienen dazu, die Nutzung einer Website effizienter und benutzerfreundlicher zu gestalten.
            Neben klassischen Cookies können auch ähnliche Technologien (z. B. localStorage, sessionStorage)
            zum Einsatz kommen.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Technisch notwendige Cookies / Speicherungen</h2>
          <p>
            Diese Plattform verwendet ausschließlich technisch notwendige Speichertechnologien,
            die für den ordnungsgemäßen Betrieb der Plattform erforderlich sind. Dazu gehören:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Spracheinstellungen:</strong> Speicherung der gewählten Sprache im localStorage</li>
            <li><strong>Authentifizierung:</strong> Sitzungs-Token für angemeldete Nutzer</li>
            <li><strong>Cookie-Consent:</strong> Speicherung Ihrer Cookie-Einstellungen</li>
            <li><strong>Formular-Zwischenspeicherung:</strong> Temporäre Speicherung von Formulareingaben</li>
          </ul>
          <p className="mt-2">
            Diese Speicherungen sind für die Bereitstellung der von Ihnen ausdrücklich angeforderten Dienste
            unbedingt erforderlich und bedürfen keiner gesonderten Einwilligung
            (§ 25 Abs. 2 Nr. 2 TDDDG).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Optionale Cookies / Analyse</h2>
          <p>
            Derzeit werden <strong>keine optionalen Cookies</strong>, Analyse-Tools oder Tracking-Dienste eingesetzt.
            Es erfolgt kein Marketing-Tracking und keine Weitergabe von Nutzungsdaten an Dritte.
          </p>
          <p className="mt-2">
            Sollte zukünftig ein Analyse-Tool eingesetzt werden (z. B. datenschutzfreundliche Web-Analyse),
            erfolgt dies ausschließlich mit Ihrer ausdrücklichen, vorherigen Einwilligung (Opt-in) und
            unter Einsatz von IP-Anonymisierung. Die Einwilligung wird über ein Cookie-Banner eingeholt.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Cookie-Banner</h2>
          <p>
            Beim ersten Besuch der Plattform wird Ihnen ein Cookie-Banner angezeigt, über das Sie folgende
            Optionen haben:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>„Alle akzeptieren"</strong> – Zustimmung zu allen Kategorien (sofern optionale Cookies vorhanden)</li>
            <li><strong>„Nur notwendige"</strong> – Nur technisch erforderliche Speicherungen werden aktiviert</li>
            <li><strong>„Einstellungen"</strong> – Individuelle Auswahl der Cookie-Kategorien</li>
          </ul>
          <p className="mt-2">
            Da derzeit keine optionalen Cookies eingesetzt werden, dient das Banner primär der Transparenz
            und Information gemäß § 25 TDDDG und Art. 6 Abs. 1 lit. a DSGVO.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Widerruf der Einwilligung</h2>
          <p>
            Eine erteilte Einwilligung kann jederzeit und ohne Angabe von Gründen widerrufen werden.
            Die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung bleibt unberührt.
          </p>
          <p className="mt-2">
            Den Widerruf können Sie wie folgt ausüben:
          </p>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li>Über die Cookie-Einstellungen im Footer der Plattform</li>
            <li>Durch Löschen der Cookies und des lokalen Speichers in Ihrem Browser</li>
            <li>Per E-Mail an: <a href="mailto:kontakt@balkanlink.de" className="text-primary hover:underline">kontakt@balkanlink.de</a></li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Rechtsgrundlagen</h2>
          <ul className="ml-4 mt-1 list-disc space-y-1">
            <li><strong>Technisch notwendige Cookies:</strong> § 25 Abs. 2 Nr. 2 TDDDG (keine Einwilligung erforderlich)</li>
            <li><strong>Optionale Cookies (zukünftig):</strong> § 25 Abs. 1 TDDDG i.V.m. Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)</li>
          </ul>
        </section>

        <section>
          <p className="text-xs text-muted-foreground/60">Stand: März 2026</p>
        </section>
      </div>
    </div>
  );
}
