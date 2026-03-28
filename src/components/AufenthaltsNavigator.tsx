import { useState } from "react";

const countries = [
  { id: "bih", flag: "🇧🇦", name: "BiH", full: "Bosna i Hercegovina", group: "wb" },
  { id: "srb", flag: "🇷🇸", name: "Srbija", full: "Srbija", group: "wb" },
  { id: "mne", flag: "🇲🇪", name: "Crna Gora", full: "Crna Gora", group: "wb" },
  { id: "mkd", flag: "🇲🇰", name: "Makedonija", full: "Sjeverna Makedonija", group: "wb" },
  { id: "alb", flag: "🇦🇱", name: "Albanija", full: "Albanija", group: "wb" },
  { id: "xk",  flag: "🇽🇰", name: "Kosovo", full: "Kosovo", group: "xk" },
  { id: "hrv", flag: "🇭🇷", name: "Hrvatska", full: "Hrvatska", group: "eu" },
  { id: "svn", flag: "🇸🇮", name: "Slovenija", full: "Slovenija", group: "eu" },
];

const embassyLinks: Record<string, { name: string; url: string } | null> = {
  bih: { name: "Ambasada Njemačke u Sarajevu", url: "https://sarajevo.diplo.de" },
  srb: { name: "Ambasada Njemačke u Beogradu", url: "https://belgrad.diplo.de" },
  mne: { name: "Ambasada Njemačke u Podgorici", url: "https://podgorica.diplo.de" },
  mkd: { name: "Ambasada Njemačke u Skoplju", url: "https://skopje.diplo.de" },
  alb: { name: "Ambasada Njemačke u Tirani", url: "https://tirana.diplo.de" },
  xk:  { name: "Ambasada Njemačke u Prištini", url: "https://pristina.diplo.de" },
  hrv: null,
  svn: null,
};

const wbSections = (country: string) => [
  {
    id: "first",
    icon: "✈️",
    title: "Dolazim prvi put — trebam vizu",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          {country === "xk"
            ? "Kosovo ima visa-free od 2024. za Schengen zonu (kratki boravak do 90 dana). Za rad i duži boravak, potrebna je radna viza."
            : "Western Balkans Regulierung ti daje lakši pristup njemačkom tržištu rada bez prethodnog priznavanja diplome u određenim sektorima."}
        </p>
        <Steps steps={[
          { n: 1, text: "Odredi tip vize: Radna (Arbeitsvisum), Job-Seeker, Studijska ili Spajanje porodice" },
          { n: 2, text: "Prikupi dokumentaciju: pasoš, biometrijska foto, dokaz o smještaju, finansijska sredstva, zdravstveno osiguranje, ugovor o radu" },
          { n: 3, text: "Zakaži termin na Ambasadi Njemačke u tvojoj zemlji" },
          { n: 4, text: "Čekaj odluku — obično 4–12 sedmica" },
        ]} />
        <Warning text="Dolazak turistskom vizom pa pokušaj promjene statusa unutar Njemačke — u većini slučajeva ne funkcioniše. Apliciraj iz matične zemlje!" />
      </div>
    ),
  },
  {
    id: "extend",
    icon: "🔄",
    title: "Već sam u Njemačkoj — produžujem",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          Produženje se radi kod lokalnog Ausländerbehörde-a (ABH).
        </p>
        <Steps steps={[
          { n: 1, text: "Zakaži termin na ABH-u NAJMANJE 6–8 sedmica prije isteka dozvole" },
          { n: 2, text: "Prikupi: pasoš, trenutnu dozvolu, Anmeldebestätigung, dokaz svrhe (ugovor o radu / potvrda fakulteta), platne liste, Krankenversicherungsnachweis, biometrijska foto" },
          { n: 3, text: "Dođi na termin — ABH produžuje na licu mjesta ili šalje poštom" },
        ]} />
        <Tip text="Ako je termin zakazan prije isteka, dozvola se automatski smatra aktivnom do odluke — traži Fiktionsbescheinigung na šalteru!" />
      </div>
    ),
  },
  {
    id: "status",
    icon: "🎓",
    title: "Promjena statusa: Student → Posao",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          Nakon završetka studija imaš <strong style={{ color: "#f1f5f9" }}>18 mjeseci</strong> za traženje posla u Njemačkoj.
        </p>
        <Steps steps={[
          { n: 1, text: "Odmah po završetku studija — idi na ABH i traži Aufenthaltserlaubnis zur Jobsuche (18 mj.)" },
          { n: 2, text: "Nađi posao koji odgovara tvojoj struci" },
          { n: 3, text: "Apliciraj za Aufenthaltserlaubnis zur Beschäftigung na ABH-u" },
          { n: 4, text: "Potrebno: diploma, ugovor o radu, eventualno priznavnje diplome (anabin.kmk.org)" },
        ]} />
        <Warning text="Ne čekaj istek studentske vize! Odmah po diplomi — na ABH." />
      </div>
    ),
  },
  {
    id: "blue",
    icon: "💙",
    title: "Plava karta — Blaue Karte EU",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          Za visokokvalifikovane stručnjake — brži put do stalnog boravka.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
          <InfoCard label="Opće struke" value="~45.300 €/god." sub="minimalna plata" color="#3b82f6" />
          <InfoCard label="IT, inženjering, medicina" value="~41.000 €/god." sub="manjkave struke" color="#10b981" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Prednosti</p>
          {["Stalni boravak već nakon 21 mj. (uz B1 njemački) ili 33 mj.", "Lakše spajanje porodice", "Mobilnost unutar EU nakon 18 mj."].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
              <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>{t}</span>
            </div>
          ))}
        </div>
        <Steps steps={[
          { n: 1, text: "Pribavi ugovor o radu koji zadovoljava plafon" },
          { n: 2, text: "Provjeri priznavnje diplome: anabin.kmk.org" },
          { n: 3, text: "Apliciraj na ABH-u ili ambasadi" },
        ]} />
      </div>
    ),
  },
  {
    id: "family",
    icon: "👨‍👩‍👧",
    title: "Spajanje porodice — Familienzusammenführung",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          Bračni partner aplicira na Ambasadi Njemačke u matičnoj zemlji.
        </p>
        <div style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: 8, padding: 12, marginBottom: 16 }}>
          <p style={{ fontSize: 13, color: "#fbbf24", margin: 0 }}>⏳ Realno čekanje: <strong>3–12 mjeseci</strong> ovisno o ambasadi</p>
        </div>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Potrebna dokumentacija</p>
        {["Vjenčani list (ovjeren i preveden)", "Dokaz o prihodima sponzora (zadnje 3 platne liste)", "Dokaz o stanu (Mietvertrag)", "A1 certifikat iz njemačkog (Goethe Institut ili sl.)", "Biometrijska fotografija"].map((d, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={{ color: "#6366f1", flexShrink: 0 }}>•</span>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>{d}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "permanent",
    icon: "🏠",
    title: "Stalni boravak — Niederlassungserlaubnis",
    content: (
      <div>
        <p style={{ marginBottom: 12, color: "#94a3b8", fontSize: 14 }}>
          Krajnji cilj — boraviš trajno, bez obnavljanja.
        </p>
        <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Opći uslovi (§9 AufenthG)</p>
        {[
          "5 godina zakonskog boravka u Njemačkoj",
          "Osigurana egzistencija (bez socijalne pomoći)",
          "Uplate u penziono osiguranje (60 mj.)",
          "Dovoljno stambenog prostora",
          "Znanje njemačkog — minimum B1",
          "Osnovno poznavanje pravnog poretka",
        ].map((u, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <span style={{ color: "#10b981", flexShrink: 0 }}>✓</span>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>{u}</span>
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <p style={{ fontSize: 13, color: "#64748b", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Posebni slučajevi — brže</p>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", color: "#64748b", paddingBottom: 6, fontWeight: 500 }}>Slučaj</th>
                <th style={{ textAlign: "right", color: "#64748b", paddingBottom: 6, fontWeight: 500 }}>Min. period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Plava karta EU", "21–33 mj."],
                ["§18c visoka kvalifikacija", "3 godine"],
                ["Bračni partner njemačkog državljanina", "3 godine"],
              ].map(([s, p], i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={{ color: "#94a3b8", padding: "8px 0" }}>{s}</td>
                  <td style={{ color: "#6366f1", textAlign: "right", padding: "8px 0", fontWeight: 600 }}>{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
];

function Steps({ steps }: { steps: { n: number; text: string }[] }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {steps.map((s) => (
        <div key={s.n} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0,
          }}>{s.n}</div>
          <span style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, paddingTop: 2 }}>{s.text}</span>
        </div>
      ))}
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: 12 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#fca5a5" }}>⚠️ <strong>Česta greška:</strong> {text}</p>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: 12 }}>
      <p style={{ margin: 0, fontSize: 13, color: "#6ee7b7" }}>✅ {text}</p>
    </div>
  );
}

function InfoCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33`, borderRadius: 10, padding: 12 }}>
      <p style={{ margin: "0 0 4px", fontSize: 12, color: "#64748b" }}>{label}</p>
      <p style={{ margin: "0 0 2px", fontSize: 18, fontWeight: 700, color }}>{value}</p>
      <p style={{ margin: 0, fontSize: 11, color: "#475569" }}>{sub}</p>
    </div>
  );
}

function Accordion({ sections }: { sections: { id: string; icon: string; title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {sections.map((s) => (
        <div key={s.id} style={{
          background: "rgba(255,255,255,0.03)",
          border: open === s.id ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          overflow: "hidden",
          transition: "border-color 0.2s",
        }}>
          <button
            onClick={() => setOpen(open === s.id ? null : s.id)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between",
              alignItems: "center", padding: "14px 16px",
              background: "none", border: "none", cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 15 }}>{s.title}</span>
            </span>
            <span style={{
              color: "#6366f1", fontSize: 18, transition: "transform 0.2s",
              transform: open === s.id ? "rotate(180deg)" : "rotate(0deg)",
              display: "inline-block",
            }}>›</span>
          </button>
          {open === s.id && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />
              {s.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EUContent({ country }: { country: { group: string; full: string } }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🇪🇺</div>
      <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Sloboda kretanja
      </h3>
      <p style={{ color: "#94a3b8", fontSize: 15, maxWidth: 400, margin: "0 auto 24px", lineHeight: 1.7 }}>
        Kao {country.group === "eu" ? "EU" : ""} državljanin <strong style={{ color: "#e2e8f0" }}>{country.full}</strong>, imaš pravo slobodnog kretanja i rada unutar EU — uključujući Njemačku.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, margin: "0 auto" }}>
        {[
          { icon: "✅", text: "Nema vize ni Aufenthaltstitel" },
          { icon: "✅", text: "Slobodan pristup tržištu rada" },
          { icon: "📋", text: "Trebaš Anmeldung (prijava boravišta)" },
          { icon: "🔒", text: "Trebaš Krankenversicherung" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "center",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10, padding: "10px 14px",
          }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ color: "#94a3b8", fontSize: 14 }}>{item.text}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24 }}>
        <a href="/anmeldung" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "white", textDecoration: "none",
          padding: "10px 20px", borderRadius: 10, fontSize: 14, fontWeight: 600,
        }}>
          📋 Vidi Anmeldung vodič →
        </a>
      </div>
    </div>
  );
}

export default function AufenthaltsNavigator() {
  const [active, setActive] = useState("bih");
  const country = countries.find((c) => c.id === active);
  const embassy = embassyLinks[active];
  const isEU = country.group === "eu";

  return (
    <div style={{
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#0f172a",
      minHeight: "100vh",
      padding: "32px 16px",
      color: "#e2e8f0",
    }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>🗂️</span>
            <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, background: "linear-gradient(135deg, #e2e8f0, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Aufenthaltstitel Navigator
            </h1>
          </div>
          <p style={{ color: "#64748b", fontSize: 15, margin: 0 }}>
            Odaberi svoju zemlju i pronađi pravi put do boravka u Njemačkoj.
          </p>
        </div>

        {/* Country Tabs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          marginBottom: 28,
        }}>
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                padding: "10px 6px",
                background: active === c.id
                  ? "linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))"
                  : "rgba(255,255,255,0.03)",
                border: active === c.id
                  ? "1px solid rgba(99,102,241,0.5)"
                  : "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 22 }}>{c.flag}</span>
              <span style={{ fontSize: 11, color: active === c.id ? "#a5b4fc" : "#64748b", fontWeight: 500, textAlign: "center" }}>
                {c.name}
              </span>
            </button>
          ))}
        </div>

        {/* Active Country Card */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
        }}>
          {/* Card Header */}
          <div style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            flexWrap: "wrap", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 36 }}>{country.flag}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>{country.full}</h2>
                <span style={{
                  fontSize: 12, padding: "2px 10px", borderRadius: 999, fontWeight: 600,
                  background: isEU ? "rgba(16,185,129,0.15)" : country.group === "xk" ? "rgba(251,191,36,0.15)" : "rgba(99,102,241,0.15)",
                  color: isEU ? "#6ee7b7" : country.group === "xk" ? "#fbbf24" : "#a5b4fc",
                  border: isEU ? "1px solid rgba(16,185,129,0.3)" : country.group === "xk" ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(99,102,241,0.3)",
                }}>
                  {isEU ? "🇪🇺 EU članica" : country.group === "xk" ? "⭐ Poseban status" : "🌍 Western Balkans"}
                </span>
              </div>
            </div>
            {embassy && (
              <a
                href={embassy.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: 13, color: "#6366f1", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: 6,
                  background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)",
                  padding: "6px 12px", borderRadius: 8,
                }}
              >
                🔗 {embassy.name}
              </a>
            )}
          </div>

          {/* Card Content */}
          <div style={{ padding: "24px" }}>
            {isEU ? (
              <EUContent country={country} />
            ) : (
              <Accordion sections={wbSections(country.id)} />
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "🏛️ BAMF", url: "https://www.bamf.de" },
            { label: "🌐 Make it in Germany", url: "https://www.make-it-in-germany.com" },
            { label: "🎓 Anabin — diplome", url: "https://anabin.kmk.org" },
          ].map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" style={{
              fontSize: 13, color: "#64748b", textDecoration: "none",
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)",
              padding: "6px 14px", borderRadius: 8, transition: "color 0.15s",
            }}>{l.label}</a>
          ))}
        </div>

        <p style={{ marginTop: 20, fontSize: 12, color: "#334155", textAlign: "center" }}>
          BalkanLink — Vodič za Balkan u Njemačkoj · Informacije su informativan karakter, uvijek provjeri sa ABH-om ili advokatom.
        </p>
      </div>
    </div>
  );
}
