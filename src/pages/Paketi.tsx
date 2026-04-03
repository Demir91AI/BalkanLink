import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X, Crown, Flame } from "lucide-react";
import PageNav from "@/components/navigation/PageNav";

const comparisonData = [
  { label: "Osnovne info o formularima", free: true, premium: true },
  { label: "Najčešće greške", free: true, premium: true },
  { label: "5 Deutsch lekcija po nivou", free: true, premium: true },
  { label: "Besplatni oglas", free: true, premium: true },
  { label: "Smart Guide korak po korak", free: false, premium: true },
  { label: "Kompletni BalkanLink Deutsch A1-C2", free: false, premium: true },
  { label: "Musterformulari", free: false, premium: true },
  { label: "Dokumenten-Check (1/dan)", free: false, premium: true },
  { label: "AI Asistent unlimited", free: false, premium: true },
  { label: "Deadline tracker", free: false, premium: true },
  { label: "2 istaknuta oglasa/mj", free: false, premium: true },
  { label: "Amazon voucher program", free: false, premium: true },
];

const pillExamples = [
  "🔧 Tražim Elektriker",
  "🚗 Prijevoz za Bosnu",
  "🏠 Keramičar",
  "👶 Čuvanje djece",
];

export default function Paketi() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <PageNav />

      {/* HERO */}
      <section className="py-14 text-center px-4">
        <h1 className="text-[28px] font-bold text-white">Sve na jednom mjestu</h1>
        <p className="mt-2 text-[hsl(var(--gold))] text-lg font-semibold">
          Jedan paket. Sve uključeno. Bez iznenađenja.
        </p>
      </section>

      <div className="container max-w-2xl space-y-10 pb-16 px-4">

        {/* ═══ SEKCIJA 1 — GLAVNI PAKET ═══ */}
        <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))] p-6 md:p-8" style={{ background: "#111827" }}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[hsl(var(--success))] px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
            ⭐ NAJPOPULARNIJE
          </span>
          <h2 className="text-[22px] font-bold text-white mt-2">BalkanLink Premium</h2>

          <div className="mt-4 flex justify-center">
            <div className="flex rounded-full p-1" style={{ background: "#1F2937" }}>
              <button
                onClick={() => setYearly(false)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${!yearly ? "bg-[hsl(var(--gold))] text-black" : "text-[#9CA3AF] hover:text-white"}`}
              >
                Mjesečno
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${yearly ? "bg-[hsl(var(--gold))] text-black" : "text-[#9CA3AF] hover:text-white"}`}
              >
                Godišnje
              </button>
            </div>
          </div>

          {!yearly ? (
            <div className="mt-4">
              <p>
                <span className="text-[40px] font-bold text-[hsl(var(--gold))]">9.99€</span>
                <span className="text-[16px] text-[#9CA3AF] ml-1">/mjesečno</span>
              </p>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                Bez ugovora • Otkaži kad hoćeš • Pristup odmah
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <span className="inline-block rounded-full bg-[hsl(var(--success))] px-2.5 py-0.5 text-[10px] font-bold text-white mb-2">
                Uštedi 2 mjeseca + 30€ Amazon!
              </span>
              <p>
                <span className="text-[16px] text-[#9CA3AF] line-through mr-2">119.88€</span>
                <span className="text-[40px] font-bold text-[hsl(var(--gold))]">99.90€</span>
                <span className="text-[16px] text-[#9CA3AF] ml-1">/godišnje</span>
              </p>
              <p className="text-[13px] text-[#9CA3AF] mt-1">
                = 8.33€/mj • Uštedi 19.98€ • + 30€ Amazon voucher odmah
              </p>
            </div>
          )}

          <div className="h-px bg-[#374151] my-5" />

          <ul className="space-y-2.5 text-[14px] text-white">
            {[
              "Svi Smart Guide vodiči korak po korak",
              "Kompletni BalkanLink Deutsch A1 do C2",
              "Musterformulari za sve formulare",
              "Dokumenten-Check — 1 provjera dnevno",
              "BalkanLink Asistent unlimited",
              "Deadline tracker i personalni plan",
              "2 istaknuta oglasa mjesečno",
              "Pristup svim novim sadržajima",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[hsl(var(--success))] mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">🎁</span>
              <span>Amazon voucher program za BalkanLink Deutsch</span>
            </li>
          </ul>

          <Link
            to="/login"
            className="mt-6 block w-full rounded-[10px] bg-[hsl(var(--gold))] py-3.5 text-center font-bold text-black transition hover:opacity-90"
          >
            Aktiviraj Premium →
          </Link>
          <p className="mt-2 text-[11px] text-[#9CA3AF] text-center">
            5 lekcija BalkanLink Deutsch besplatno za sve korisnike
          </p>
        </div>

        {/* ═══ SEKCIJA 2 — WERTGUTSCHEIN ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold))] text-center mb-4">
            🎁 Wertgutschein Program
          </h3>
          <div className="rounded-xl border border-[hsl(var(--gold))] p-5" style={{ background: "#FEF3C7" }}>
            <p className="text-[14px] font-semibold text-[#92400E]">
              Završi BalkanLink Deutsch → dobijaš nagradu!
            </p>
            <ul className="mt-3 space-y-1.5 text-[13px] text-[#92400E]">
              <li>• A1 + A2 kompletno → <b>1 mjesec Premium gratis</b></li>
              <li>• B1 + B2 kompletno → <b>2 mjeseca Premium gratis</b></li>
              <li>• C1 + C2 kompletno → <b>3 mjeseca Premium gratis</b></li>
            </ul>
            <p className="mt-4 text-[13px] font-bold text-[#92400E]">⭐ ZUSÄTZLICHER RABATT:</p>
            <p className="mt-1 text-[13px] text-[#92400E]">
              Godišnji Premium Abo + završiš A1 do C2 kompletno<br />
              → <b>30€ Amazon.de Gutschein kao bonus za lojalnost</b>
            </p>
            <p className="mt-4 text-[12px] font-semibold text-[#92400E]">⚠️ Uvjeti:</p>
            <ul className="mt-1 space-y-0.5 text-[12px] text-[#92400E]">
              <li>- Mora biti aktivan Godišnji Premium Abo</li>
              <li>- 100% završenost SVIH nivoa A1 do C2</li>
              <li>- Provjera ručno u roku 7 radnih dana</li>
              <li>- Jedan voucher po korisniku</li>
              <li>- BalkanLink zadržava pravo provjere autentičnosti</li>
            </ul>
          </div>
        </div>

        {/* ═══ SEKCIJA 3 — JEDNOKRATNI FORMULARI ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold))] text-center mb-1">
            📋 Samo jedan formular?
          </h3>
          <p className="text-[13px] text-[#9CA3AF] text-center mb-4">
            Ne trebaš Premium — plati samo što trebaš
          </p>
          <div className="rounded-2xl border border-[#374151] p-6" style={{ background: "#111827" }}>
            <p>
              <span className="text-[32px] font-bold text-white">3.99€</span>
              <span className="text-[14px] text-[#9CA3AF] ml-1">/ po formularu</span>
            </p>
            <ul className="mt-4 space-y-2 text-[14px]">
              {[
                { ok: true, t: "Kompletni Smart Guide za odabrani formular" },
                { ok: true, t: "Musterformular interaktivni" },
                { ok: true, t: "Doživotni pristup tom formularu" },
                { ok: false, t: "Ostali formulari nisu uključeni" },
                { ok: false, t: "BalkanLink Deutsch nije uključen" },
                { ok: false, t: "Istaknuti oglasi nisu uključeni" },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-2">
                  {f.ok ? (
                    <Check className="h-4 w-4 text-[hsl(var(--success))] mt-0.5 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  )}
                  <span className={f.ok ? "text-white" : "text-[#9CA3AF]"}>{f.t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/formulari"
              className="mt-5 block w-full rounded-[10px] border-2 border-[hsl(var(--gold))] py-3 text-center font-bold text-[hsl(var(--gold))] transition hover:bg-[hsl(var(--gold))]/10"
            >
              Odaberi formular →
            </Link>
          </div>
        </div>

        {/* ═══ SEKCIJA 4 — DOKUMENTEN-CHECK ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold))] text-center mb-1">
            📄 Dokumenten-Check
          </h3>
          <p className="text-[13px] text-[#9CA3AF] text-center mb-4">
            AI analiza dokumenata i pisama na tvojem jeziku
          </p>
          <div className="rounded-2xl border border-[#374151] p-6" style={{ background: "#111827" }}>
            <p>
              <span className="text-[32px] font-bold text-white">2.99€</span>
              <span className="text-[14px] text-[#9CA3AF] ml-1">/ po dokumentu</span>
            </p>
            <ul className="mt-4 space-y-2 text-[14px]">
              {[
                { ok: true, t: "2.99€ po dokumentu bez pretplate" },
                { ok: true, t: "Premium uključuje 1 provjeru dnevno" },
                { ok: true, t: "AI analiza — objašnjenje + koraci" },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-[hsl(var(--success))] mt-0.5 shrink-0" />
                  <span className="text-white">{f.t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/dokumenten-check"
              className="mt-5 block w-full rounded-[10px] border-2 border-[hsl(var(--gold))] py-3 text-center font-bold text-[hsl(var(--gold))] transition hover:bg-[hsl(var(--gold))]/10"
            >
              Provjeri dokument →
            </Link>
          </div>
        </div>

        {/* ═══ SEKCIJA 5 — COMMUNITY OGLASI ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold))] text-center mb-1">
            📣 Nudim / Tražim — Community oglasi
          </h3>
          <p className="text-[13px] text-[#9CA3AF] text-center mb-4">
            Tražiš majstora? Nudiš uslugu? Putuješ u Bosnu? Objavi odmah.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-5">
            {pillExamples.map((p) => (
              <span key={p} className="rounded-full border border-[#374151] px-3 py-1 text-[11px] text-[#9CA3AF]">
                {p}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Besplatni */}
            <div className="rounded-2xl border border-[#374151] p-5" style={{ background: "#111827" }}>
              <h4 className="text-[15px] font-bold text-white">Besplatan oglas</h4>
              <p className="text-[28px] font-bold text-[hsl(var(--success))] mt-1">0€</p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                {["Objavi besplatno", "Standardna lista", "Sortiranje po datumu", "Dostupan svima"].map(t => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--success))] mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
              <Link
                to="/nudim-trazim"
                className="mt-4 block w-full rounded-[10px] border-2 border-[hsl(var(--success))] py-2.5 text-center font-bold text-[hsl(var(--success))] text-[13px] transition hover:bg-[hsl(var(--success))]/10"
              >
                Objavi oglas →
              </Link>
            </div>

            {/* PRO */}
            <div className="relative rounded-2xl p-5" style={{ background: "#111827", border: "1px solid rgba(251,146,60,0.6)", boxShadow: "0 0 16px rgba(251,146,60,0.18)" }}>
              <span className="absolute -top-2.5 left-4 rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg, #FB923C, #F97316)" }}>
                🔥 Pro oglas
              </span>
              <h4 className="text-[15px] font-bold text-white mt-1">🔥 Pro oglas</h4>
              <p className="mt-1">
                <span className="text-[28px] font-bold text-white">2.99€</span>
                <span className="text-[13px] text-[#9CA3AF] ml-1">/ 7 dana</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                {["Vrh liste", "Iznad free oglasa", "Badge + glow", "Više pregleda", "Do 5 slika"].map(t => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-orange-400 mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-[#9CA3AF]">Po isteku vraća se u normalnu listu</p>
              <Link
                to="/nudim-trazim"
                className="mt-4 block w-full rounded-[10px] py-2.5 text-center font-bold text-white text-[13px] transition hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #FB923C, #F97316)" }}
              >
                Istakni oglas →
              </Link>
            </div>

            {/* PREMIUM */}
            <div className="relative rounded-2xl border-2 border-[hsl(var(--gold))]/40 p-5" style={{ background: "#111827", boxShadow: "0 0 20px rgba(234,179,8,0.15)" }}>
              <span className="absolute -top-2.5 right-3 rounded-full bg-[hsl(var(--gold))] px-2.5 py-0.5 text-[10px] font-bold text-black">
                Best Value
              </span>
              <h4 className="text-[15px] font-bold text-white mt-1">⭐ Premium</h4>
              <p className="mt-1">
                <span className="text-[28px] font-bold text-[hsl(var(--gold))]">9.99€</span>
                <span className="text-[13px] text-[#9CA3AF] ml-1">/ mjesec</span>
              </p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                {["2 Pro oglasa/mj", "Svaki 7 dana", "Na različitim oglasima", "Max 2 aktivna", "Dodatni 2.99€ nakon toga"].map(t => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--gold))] mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
              <p className="mt-2 text-[10px] text-[#9CA3AF]">Uštedi i istakni oglase bez dodatnog plaćanja</p>
              <Link
                to="/login"
                className="mt-4 block w-full rounded-[10px] bg-[hsl(var(--gold))] py-2.5 text-center font-bold text-black text-[13px] transition hover:opacity-90"
              >
                Postani Premium →
              </Link>
            </div>
          </div>

          {/* Info block */}
          <div className="mt-4 rounded-xl border border-[#374151] p-4" style={{ background: "#0f1520" }}>
            <p className="text-[13px] text-[#9CA3AF]">
              💡 <strong className="text-white">Kako funkcioniše?</strong> Pro oglasi su istaknuti iznad ostalih i donose više pregleda. Premium uključuje 2 takva isticanja mjesečno.
            </p>
          </div>
        </div>

        {/* ═══ SEKCIJA 6 — FIRMA OGLAŠAVANJE ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(var(--gold))] text-center mb-1">
            🏢 Oglašavanje za firme
          </h3>
          <p className="text-[13px] text-[#9CA3AF] text-center mb-5">
            Imaš registrovanu firmu? Postavi se pred zajednicom Balkanaca u Njemačkoj.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative rounded-2xl border border-[hsl(var(--gold))] p-5" style={{ background: "#111827" }}>
              <span className="absolute -top-2.5 left-4 rounded-full bg-[hsl(var(--gold))] px-2.5 py-0.5 text-[10px] font-bold text-black">
                ⭐ PREPORUČENO
              </span>
              <h4 className="text-[16px] font-bold text-white mt-2">Premium Prezentacija</h4>
              <p className="text-[22px] font-bold text-[hsl(var(--gold))] mt-1">19.99€<span className="text-[13px] text-[#9CA3AF] font-normal">/mj</span></p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                {["Velika kartica s fotografijama", "Slideshow slika", "Top pozicija na stranici", "Direktan kontakt dugme"].map(t => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--success))] mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
              <Link to="/directory/submit" className="mt-4 block w-full rounded-[10px] bg-[hsl(var(--gold))] py-2.5 text-center font-bold text-black text-[13px] transition hover:opacity-90">
                Postani vidljiv →
              </Link>
            </div>

            <div className="rounded-2xl border border-[#374151] p-5" style={{ background: "#111827" }}>
              <h4 className="text-[16px] font-bold text-white">Banner Prezentacija</h4>
              <p className="text-[22px] font-bold text-white mt-1">9.99€<span className="text-[13px] text-[#9CA3AF] font-normal">/mj</span></p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                {["Rotirajući banner", "Vidljiv na više stranica", "Direktan kontakt"].map(t => (
                  <li key={t} className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[hsl(var(--success))] mt-0.5 shrink-0" />{t}</li>
                ))}
              </ul>
              <Link to="/directory/submit" className="mt-4 block w-full rounded-[10px] border-2 border-[hsl(var(--gold))] py-2.5 text-center font-bold text-[hsl(var(--gold))] text-[13px] transition hover:bg-[hsl(var(--gold))]/10">
                Postani vidljiv →
              </Link>
            </div>
          </div>

          <p className="mt-4 text-[13px] text-[#9CA3AF] text-center">
            📧 Kontaktiraj nas →{" "}
            <a href="mailto:info@balkanlink.de" className="text-[hsl(var(--gold))] hover:underline">info@balkanlink.de</a>
          </p>
        </div>

        {/* ═══ SEKCIJA 7 — BESPLATNO VS PREMIUM ═══ */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9CA3AF] text-center mb-5">
            BESPLATNO VS. PREMIUM
          </h3>

          <div className="hidden md:block rounded-xl overflow-hidden border border-[#374151]">
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ background: "#1F2937" }}>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Funkcija</th>
                  <th className="py-3 px-4 text-[#9CA3AF] font-semibold text-center">Besplatno</th>
                  <th className="py-3 px-4 text-[hsl(var(--gold))] font-semibold text-center">Premium 9.99€</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-t border-[#374151]" style={{ background: "#111827" }}>
                    <td className="py-2.5 px-4 text-white">{row.label}</td>
                    <td className="py-2.5 px-4 text-center">
                      {row.free ? <Check className="h-4 w-4 text-[hsl(var(--success))] mx-auto" /> : <X className="h-4 w-4 text-destructive mx-auto" />}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <Check className="h-4 w-4 text-[hsl(var(--success))] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-2">
            {comparisonData.map((row, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-4 py-2.5" style={{ background: "#111827" }}>
                <span className="text-[13px] text-white flex-1">{row.label}</span>
                <div className="flex gap-4 shrink-0 ml-3">
                  {row.free ? <Check className="h-4 w-4 text-[hsl(var(--success))]" /> : <X className="h-4 w-4 text-destructive" />}
                  <Check className="h-4 w-4 text-[hsl(var(--success))]" />
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/login"
            className="mt-5 block w-full rounded-[10px] bg-[hsl(var(--gold))] py-3.5 text-center font-bold text-black transition hover:opacity-90"
          >
            Aktiviraj Premium za 9.99€/mj →
          </Link>
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="rounded-lg p-4 text-center" style={{ background: "#1F2937" }}>
          <p className="text-[12px] text-[#9CA3AF]">
            Alle Preise gemäß §19 UStG ohne Umsatzsteuer. Premium pretplata se može otkazati u bilo koje vrijeme.
            Jednokratne kupovine su trajne. Wertgutschein program podliježe uvjetima navedenim u AGB.
            PRO oglasi automatski ističu nakon odabranog perioda. Dokumenten-Check: 2.99€ po dokumentu ili 1 dnevno za Premium.
          </p>
          <Link to="/agb" className="mt-2 inline-block text-[12px] text-[hsl(var(--gold))] hover:underline">
            Pročitaj kompletne uvjete →
          </Link>
        </div>
      </div>
    </div>
  );
}
