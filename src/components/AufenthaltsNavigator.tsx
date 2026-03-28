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
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
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
        <Warning text="Dolazak turistkom vizom pa pokušaj promjene statusa unutar Njemačke — u većini slučajeva ne funkcioniše. Apliciraj iz matične zemlje!" />
      </div>
    ),
  },
  {
    id: "extend",
    icon: "🔄",
    title: "Već sam u Njemačkoj — produžujem",
    content: (
      <div>
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
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
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
          Nakon završetka studija imaš <strong className="text-slate-100">18 mjeseci</strong> za traženje posla u Njemačkoj.
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
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
          Za visokokvalifikovane stručnjake — brži put do stalnog boravka.
        </p>
        <div className="aufenthalt-info-grid mb-4">
          <InfoCard label="Opće struke" value="~45.300 €/god." sub="minimalna plata" color="#3b82f6" />
          <InfoCard label="IT, inženjering, medicina" value="~41.000 €/god." sub="manjkave struke" color="#10b981" />
        </div>
        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Prednosti</p>
          {["Stalni boravak već nakon 21 mj. (uz B1 njemački) ili 33 mj.", "Lakše spajanje porodice", "Mobilnost unutar EU nakon 18 mj."].map((t, i) => (
            <div key={i} className="flex gap-2 mb-1.5 items-start">
              <span className="text-emerald-500 shrink-0">✓</span>
              <span className="text-slate-400 text-sm">{t}</span>
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
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
          Bračni partner aplicira na Ambasadi Njemačke u matičnoj zemlji.
        </p>
        <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}>
          <p className="m-0 text-sm" style={{ color: "#fbbf24" }}>⏳ Realno čekanje: <strong>3–12 mjeseci</strong> ovisno o ambasadi</p>
        </div>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Potrebna dokumentacija</p>
        {["Vjenčani list (ovjeren i preveden)", "Dokaz o prihodima sponzora (zadnje 3 platne liste)", "Dokaz o stanu (Mietvertrag)", "A1 certifikat iz njemačkog (Goethe Institut ili sl.)", "Biometrijska fotografija"].map((d, i) => (
          <div key={i} className="flex gap-2 mb-1.5">
            <span className="text-indigo-400 shrink-0">•</span>
            <span className="text-slate-400 text-sm">{d}</span>
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
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">
          Krajnji cilj — boraviš trajno, bez obnavljanja.
        </p>
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Opći uslovi (§9 AufenthG)</p>
        {[
          "5 godina zakonskog boravka u Njemačkoj",
          "Osigurana egzistencija (bez socijalne pomoći)",
          "Uplate u penziono osiguranje (60 mj.)",
          "Dovoljno stambenog prostora",
          "Znanje njemačkog — minimum B1",
          "Osnovno poznavanje pravnog poretka",
        ].map((u, i) => (
          <div key={i} className="flex gap-2 mb-1.5">
            <span className="text-emerald-500 shrink-0">✓</span>
            <span className="text-slate-400 text-sm">{u}</span>
          </div>
        ))}
        <div className="mt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Posebni slučajevi — brže</p>
          <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className="text-left text-slate-500 pb-1.5 font-medium">Slučaj</th>
                <th className="text-right text-slate-500 pb-1.5 font-medium">Min. period</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Plava karta EU", "21–33 mj."],
                ["§18c visoka kvalifikacija", "3 godine"],
                ["Bračni partner njemačkog državljanina", "3 godine"],
              ].map(([s, p], i) => (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td className="text-slate-400 py-2">{s}</td>
                  <td className="text-indigo-400 text-right py-2 font-semibold">{p}</td>
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
    <div className="mb-4">
      {steps.map((s) => (
        <div key={s.n} className="flex gap-3 mb-2.5 items-start">
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>{s.n}</div>
          <span className="text-slate-400 text-sm leading-relaxed pt-0.5">{s.text}</span>
        </div>
      ))}
    </div>
  );
}

function Warning({ text }: { text: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
      <p className="m-0 text-sm" style={{ color: "#fca5a5" }}>⚠️ <strong>Česta greška:</strong> {text}</p>
    </div>
  );
}

function Tip({ text }: { text: string }) {
  return (
    <div className="rounded-lg p-3" style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}>
      <p className="m-0 text-sm" style={{ color: "#6ee7b7" }}>✅ {text}</p>
    </div>
  );
}

function InfoCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}33` }}>
      <p className="m-0 mb-1 text-xs text-slate-500">{label}</p>
      <p className="m-0 mb-0.5 text-lg font-bold" style={{ color }}>{value}</p>
      <p className="m-0 text-xs text-slate-600">{sub}</p>
    </div>
  );
}

function Accordion({ sections }: { sections: { id: string; icon: string; title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2">
      {sections.map((s) => (
        <div key={s.id} className="rounded-xl overflow-hidden transition-colors duration-200"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: open === s.id ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.07)",
          }}>
          <button
            onClick={() => setOpen(open === s.id ? null : s.id)}
            className="aufenthalt-accordion-btn"
          >
            <span className="flex gap-2.5 items-center">
              <span className="text-lg">{s.icon}</span>
              <span className="title text-slate-200 font-semibold text-[15px]">{s.title}</span>
            </span>
            <span className="text-indigo-500 text-lg inline-block transition-transform duration-200"
              style={{ transform: open === s.id ? "rotate(180deg)" : "rotate(0deg)" }}>›</span>
          </button>
          {open === s.id && (
            <div className="px-4 pb-4">
              <div className="h-px mb-4" style={{ background: "rgba(255,255,255,0.06)" }} />
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
    <div className="text-center py-10 px-5 md:px-8">
      <div className="text-6xl mb-4">🇪🇺</div>
      <h3 className="text-slate-200 text-xl md:text-2xl font-bold mb-3">
        Sloboda kretanja
      </h3>
      <p className="text-slate-400 text-sm md:text-base max-w-[400px] mx-auto mb-6 leading-relaxed">
        Kao {country.group === "eu" ? "EU" : ""} državljanin <strong className="text-slate-200">{country.full}</strong>, imaš pravo slobodnog kretanja i rada unutar EU — uključujući Njemačku.
      </p>
      <div className="flex flex-col gap-2.5 max-w-[360px] mx-auto">
        {[
          { icon: "✅", text: "Nema vize ni Aufenthaltstitel" },
          { icon: "✅", text: "Slobodan pristup tržištu rada" },
          { icon: "📋", text: "Trebaš Anmeldung (prijava boravišta)" },
          { icon: "🔒", text: "Trebaš Krankenversicherung" },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 items-center rounded-xl px-3.5 py-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <span className="text-lg">{item.icon}</span>
            <span className="text-slate-400 text-sm">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <a href="/anmeldung" className="inline-flex items-center gap-2 text-white no-underline px-5 py-2.5 rounded-xl text-sm font-semibold w-full md:w-auto justify-center"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
          📋 Vidi Anmeldung vodič →
        </a>
      </div>
    </div>
  );
}

export default function AufenthaltsNavigator() {
  const [active, setActive] = useState("bih");
  const country = countries.find((c) => c.id === active)!;
  const embassy = embassyLinks[active];
  const isEU = country.group === "eu";

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-200"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0f172a" }}>
      <div className="max-w-[720px] mx-auto">

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-2xl md:text-3xl">🗂️</span>
            <h1 className="text-xl md:text-2xl font-extrabold m-0"
              style={{ background: "linear-gradient(135deg, #e2e8f0, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Aufenthaltstitel Navigator
            </h1>
          </div>
          <p className="text-slate-500 text-sm md:text-base m-0">
            Odaberi svoju zemlju i pronađi pravi put do boravka u Njemačkoj.
          </p>
        </div>

        {/* Country Tabs */}
        <div className="aufenthalt-country-grid mb-6 md:mb-7">
          {countries.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`aufenthalt-country-btn ${active === c.id ? "active" : ""}`}
            >
              <span className="flag">{c.flag}</span>
              <span className="name">{c.full}</span>
            </button>
          ))}
        </div>

        {/* Active Country Card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}>
          {/* Card Header */}
          <div className="aufenthalt-card-header">
            <div className="flex items-center gap-3">
              <span className="text-3xl md:text-4xl">{country.flag}</span>
              <div>
                <h2 className="m-0 text-lg md:text-xl font-bold text-slate-100">{country.full}</h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                  style={{
                    background: isEU ? "rgba(16,185,129,0.15)" : country.group === "xk" ? "rgba(251,191,36,0.15)" : "rgba(99,102,241,0.15)",
                    color: isEU ? "#6ee7b7" : country.group === "xk" ? "#fbbf24" : "#a5b4fc",
                    border: isEU ? "1px solid rgba(16,185,129,0.3)" : country.group === "xk" ? "1px solid rgba(251,191,36,0.3)" : "1px solid rgba(99,102,241,0.3)",
                  }}>
                  {isEU ? "🇪🇺 EU članica" : country.group === "xk" ? "⭐ Poseban status" : "🌍 Western Balkans"}
                </span>
              </div>
            </div>
            {embassy && (
              <a href={embassy.url} target="_blank" rel="noreferrer"
                className="text-sm no-underline flex items-center gap-1.5 rounded-lg px-3 py-1.5 w-full md:w-auto justify-center"
                style={{ color: "#6366f1", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}>
                🔗 {embassy.name}
              </a>
            )}
          </div>

          {/* Card Content */}
          <div className="aufenthalt-card-content">
            {isEU ? (
              <EUContent country={country} />
            ) : (
              <Accordion sections={wbSections(country.id)} />
            )}
          </div>
        </div>

        {/* Footer Links */}
        <div className="aufenthalt-footer-links">
          {[
            { label: "🏛️ BAMF", url: "https://www.bamf.de" },
            { label: "🌐 Make it in Germany", url: "https://www.make-it-in-germany.com" },
            { label: "🎓 Anabin — diplome", url: "https://anabin.kmk.org" },
          ].map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer"
              className="text-sm no-underline rounded-lg px-3.5 py-1.5 transition-colors text-center"
              style={{ color: "#64748b", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
              {l.label}
            </a>
          ))}
        </div>

        <p className="mt-5 text-xs text-slate-700 text-center">
          BalkanLink — Vodič za Balkan u Njemačkoj · Informacije su informativan karakter, uvijek provjeri sa ABH-om ili advokatom.
        </p>
      </div>
    </div>
  );
}
