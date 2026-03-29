import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import SubpageNav from "@/components/SubpageNav";

const levels = [
  { code: "A1", name: "Grundlagen" },
  { code: "A2", name: "Alltag" },
  { code: "B1", name: "Kommunizieren" },
  { code: "B2", name: "Komplexe Situationen" },
  { code: "C1", name: "Beruflich" },
  { code: "C2", name: "Professionell" },
];

const topics = [
  "Bewerbung", "Telefon", "Büro", "Vertrag", "Bank",
  "Versicherung", "Beim Arzt", "Im Supermarkt", "Sich vorstellen", "Auf dem Amt",
];

const comparisonData = [
  { label: "Osnovne info o formularima", free: true, premium: true },
  { label: "Najčešće greške", free: true, premium: true },
  { label: "5 Deutsch lekcija po nivou", free: true, premium: true },
  { label: "Smart Guide korak po korak", free: false, premium: true },
  { label: "Kompletni Deutsch kurs A1-C2", free: false, premium: true },
  { label: "Musterformulari", free: false, premium: true },
  { label: "Dokumenten-Check", free: false, premium: true },
  { label: "AI Asistent unlimited", free: false, premium: true },
  { label: "Deadline tracker", free: false, premium: true },
  { label: "Amazon voucher program", free: false, premium: true },
];

type DeutschTab = "nivoi" | "ucis" | "voucher";

export default function Paketi() {
  const [tab, setTab] = useState<DeutschTab>("nivoi");

  return (
    <div className="min-h-screen" style={{ background: "#0B0F1A" }}>
      <SubpageNav />

      {/* HERO */}
      <section className="py-14 text-center px-4">
        <h1 className="text-[28px] font-bold text-white">Sve na jednom mjestu</h1>
        <p className="mt-2 text-[#EAB308] text-lg font-semibold">
          Jedan paket. Sve uključeno. Bez iznenađenja.
        </p>
      </section>

      <div className="container max-w-2xl space-y-10 pb-16 px-4">

        {/* SEKCIJA 1 — GLAVNI PAKET */}
        <div className="relative rounded-2xl border-2 border-[#EAB308] p-6 md:p-8" style={{ background: "#111827" }}>
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#22C55E] px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
            ⭐ NAJPOPULARNIJE
          </span>
          <h2 className="text-[22px] font-bold text-white mt-2">BalkanLink Premium</h2>
          <p className="mt-2">
            <span className="text-[40px] font-bold text-[#EAB308]">9.99€</span>
            <span className="text-[16px] text-[#9CA3AF] ml-1">/mjesečno</span>
          </p>
          <p className="text-[13px] text-[#9CA3AF] mt-1">
            Bez ugovora • Otkaži kad hoćeš • Pristup odmah
          </p>
          <div className="h-px bg-[#374151] my-5" />
          <ul className="space-y-2.5 text-[14px] text-white">
            {[
              "Svi Smart Guide vodiči korak po korak",
              "Kompletni Deutsch kurs A1 do C2",
              "Musterformulari za sve formulare",
              "Dokumenten-Check — AI analiza pisama",
              "BalkanLink Asistent unlimited",
              "Deadline tracker i personalni plan",
              "Pristup svim novim sadržajima",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-[#22C55E] mt-0.5 shrink-0" />
                <span>{f}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0">🎁</span>
              <span>Amazon voucher do 15€ nakon završetka kursa</span>
            </li>
          </ul>
          <Link
            to="/login"
            className="mt-6 block w-full rounded-[10px] bg-[#EAB308] py-3.5 text-center font-bold text-black transition hover:bg-[#EAB308]/90"
          >
            Aktiviraj Premium →
          </Link>
          <p className="mt-2 text-[11px] text-[#9CA3AF] text-center">
            5 lekcija Deutsch kursa besplatno za sve korisnike
          </p>
        </div>

        {/* SEKCIJA 2 — DEUTSCH KURS DETALJI */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#EAB308] text-center mb-4">
            🎓 Šta uključuje Deutsch kurs
          </h3>
          {/* Tabs */}
          <div className="flex justify-center gap-1 rounded-full p-1 mx-auto w-fit" style={{ background: "#1F2937" }}>
            {(["nivoi", "ucis", "voucher"] as DeutschTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-1.5 text-[12px] font-semibold transition ${
                  tab === t ? "bg-[#EAB308] text-black" : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {t === "nivoi" ? "Nivoi" : t === "ucis" ? "Šta učiš" : "Amazon voucher"}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-xl p-5" style={{ background: "#111827" }}>
            {tab === "nivoi" && (
              <>
                <p className="text-[14px] text-[#9CA3AF] mb-4">
                  Premium uključuje kompletni kurs od A1 do C2 — svi nivoi, sve lekcije, dostupno dok si Premium član.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {levels.map((l) => (
                    <div key={l.code} className="rounded-lg p-3" style={{ background: "#1F2937" }}>
                      <span className="inline-block rounded bg-[#EAB308] px-1.5 py-0.5 text-[10px] font-bold text-black">
                        {l.code}
                      </span>
                      <p className="text-[13px] text-white mt-1">{l.name}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === "ucis" && (
              <div className="flex flex-wrap gap-2">
                {topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#374151] px-3 py-1.5 text-[12px] text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            {tab === "voucher" && (
              <div className="rounded-xl border border-[#EAB308] p-4" style={{ background: "#FEF3C7" }}>
                <p className="text-[15px] font-bold text-[#92400E]">🎁 Wertgutschein Program</p>
                <p className="mt-2 text-[13px] text-[#92400E]">
                  Završi 100% kursa → dobijaš Amazon.de voucher!
                </p>
                <ul className="mt-3 space-y-1 text-[13px] text-[#92400E]">
                  <li>• A1 + A2 kompletno → 5€ Amazon voucher</li>
                  <li>• B1 + B2 kompletno → 10€ Amazon voucher</li>
                  <li>• C1 + C2 kompletno → 15€ Amazon voucher</li>
                </ul>
                <p className="mt-3 text-[12px] font-semibold text-[#92400E]">⚠️ Uvjeti:</p>
                <ul className="mt-1 space-y-0.5 text-[12px] text-[#92400E]">
                  <li>• Samo za aktivne Premium članove</li>
                  <li>• 100% završenost svih lekcija i zadataka</li>
                  <li>• Provjera ručno u roku 7 radnih dana</li>
                  <li>• Voucher se šalje na registrovani email</li>
                  <li>• Jedan voucher po korisniku po paru nivoa</li>
                  <li>• BalkanLink zadržava pravo provjere autentičnosti</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* SEKCIJA 3 — JEDNOKRATNI FORMULARI */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#EAB308] text-center mb-1">
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
                { ok: false, t: "Deutsch kurs nije uključen" },
              ].map((f) => (
                <li key={f.t} className="flex items-start gap-2">
                  {f.ok ? (
                    <Check className="h-4 w-4 text-[#22C55E] mt-0.5 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 text-[#EF4444] mt-0.5 shrink-0" />
                  )}
                  <span className={f.ok ? "text-white" : "text-[#9CA3AF]"}>{f.t}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/formulari"
              className="mt-5 block w-full rounded-[10px] border-2 border-[#EAB308] py-3 text-center font-bold text-[#EAB308] transition hover:bg-[#EAB308]/10"
            >
              Odaberi formular →
            </Link>
            <p className="mt-2 text-[11px] text-[#9CA3AF] text-center">
              Nadoplati do Premium u bilo koje vrijeme
            </p>
          </div>
        </div>

        {/* SEKCIJA 4 — BESPLATNO VS PREMIUM */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9CA3AF] text-center mb-5">
            BESPLATNO VS. PREMIUM
          </h3>

          {/* Desktop table */}
          <div className="hidden md:block rounded-xl overflow-hidden border border-[#374151]">
            <table className="w-full text-[13px]">
              <thead>
                <tr style={{ background: "#1F2937" }}>
                  <th className="text-left py-3 px-4 text-[#9CA3AF] font-semibold">Funkcija</th>
                  <th className="py-3 px-4 text-[#9CA3AF] font-semibold text-center">Besplatno</th>
                  <th className="py-3 px-4 text-[#EAB308] font-semibold text-center">Premium 9.99€</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-t border-[#374151]" style={{ background: "#111827" }}>
                    <td className="py-2.5 px-4 text-white">{row.label}</td>
                    <td className="py-2.5 px-4 text-center">
                      {row.free ? (
                        <Check className="h-4 w-4 text-[#22C55E] mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-[#EF4444] mx-auto" />
                      )}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <Check className="h-4 w-4 text-[#22C55E] mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {comparisonData.map((row, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg px-4 py-2.5" style={{ background: "#111827" }}>
                <span className="text-[13px] text-white flex-1">{row.label}</span>
                <div className="flex gap-4 shrink-0 ml-3">
                  {row.free ? (
                    <Check className="h-4 w-4 text-[#22C55E]" />
                  ) : (
                    <X className="h-4 w-4 text-[#EF4444]" />
                  )}
                  <Check className="h-4 w-4 text-[#22C55E]" />
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/login"
            className="mt-5 block w-full rounded-[10px] bg-[#EAB308] py-3.5 text-center font-bold text-black transition hover:bg-[#EAB308]/90"
          >
            Aktiviraj Premium za 9.99€/mj →
          </Link>
        </div>

        {/* SEKCIJA 5 — OGLAŠAVANJE */}
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#EAB308] text-center mb-1">
            📢 Imaš firmu? Balkanci te traže ovdje.
          </h3>
          <p className="text-[13px] text-[#9CA3AF] text-center mb-5">
            Postavi svoju firmu pred 10.000+ Balkanaca u Njemačkoj
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Premium Showcase */}
            <div className="relative rounded-2xl border border-[#EAB308] p-5" style={{ background: "#111827" }}>
              <span className="absolute -top-2.5 left-4 rounded-full bg-[#EAB308] px-2.5 py-0.5 text-[10px] font-bold text-black">
                ⭐ PREPORUČENO
              </span>
              <h4 className="text-[16px] font-bold text-white mt-2">Premium Prezentacija</h4>
              <p className="text-[22px] font-bold text-[#EAB308] mt-1">19.99€<span className="text-[13px] text-[#9CA3AF] font-normal">/mj</span></p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Velika kartica s fotografijama</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Slideshow slika</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Top pozicija</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Direktan kontakt</li>
              </ul>
              <Link
                to="/directory/submit"
                className="mt-4 block w-full rounded-[10px] bg-[#EAB308] py-2.5 text-center font-bold text-black text-[13px] transition hover:bg-[#EAB308]/90"
              >
                Postani vidljiv →
              </Link>
            </div>

            {/* Banner */}
            <div className="rounded-2xl border border-[#374151] p-5" style={{ background: "#111827" }}>
              <h4 className="text-[16px] font-bold text-white">Banner Prezentacija</h4>
              <p className="text-[22px] font-bold text-white mt-1">9.99€<span className="text-[13px] text-[#9CA3AF] font-normal">/mj</span></p>
              <ul className="mt-3 space-y-1.5 text-[13px] text-white">
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Rotirajući banner</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Vidljiv na više stranica</li>
                <li className="flex items-start gap-2"><Check className="h-3.5 w-3.5 text-[#22C55E] mt-0.5 shrink-0" />Direktan kontakt</li>
              </ul>
              <Link
                to="/directory/submit"
                className="mt-4 block w-full rounded-[10px] border-2 border-[#EAB308] py-2.5 text-center font-bold text-[#EAB308] text-[13px] transition hover:bg-[#EAB308]/10"
              >
                Postani vidljiv →
              </Link>
            </div>
          </div>

          <p className="mt-4 text-[13px] text-[#9CA3AF] text-center">
            📧 Kontaktiraj nas →{" "}
            <a href="mailto:info@balkanlink.de" className="text-[#EAB308] hover:underline">
              info@balkanlink.de
            </a>
          </p>
        </div>

        {/* FOOTER DISCLAIMER */}
        <div className="rounded-lg p-4 text-center" style={{ background: "#1F2937" }}>
          <p className="text-[12px] text-[#9CA3AF]">
            Sve cijene uključuju PDV. Premium pretplata se može otkazati u bilo koje vrijeme.
            Jednokratne kupovine su trajne. Wertgutschein program podliježe uvjetima navedenim u AGB.
          </p>
          <Link to="/agb" className="mt-2 inline-block text-[12px] text-[#EAB308] hover:underline">
            Pročitaj kompletne uvjete →
          </Link>
        </div>
      </div>
    </div>
  );
}
