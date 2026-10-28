import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertTriangle, ScrollText, FileText, GitCompareArrows } from "lucide-react";
import { SEO } from "@/components/SEO";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DVOJNO_DRZAVLJANSTVO_COUNTRIES,
  DEFAULT_COUNTRY_ID,
  type CitizenshipStatus,
} from "@/data/dvojnoDrzavljanstvoContent";

const STATUS_BADGE: Record<
  CitizenshipStatus,
  { bg: string; text: string; border: string; icon: typeof CheckCircle2 }
> = {
  ok: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  okEu: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    icon: CheckCircle2,
  },
  warning: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-300",
    icon: AlertTriangle,
  },
};

type LangKey = "bs" | "hr" | "sr" | "de";

const COMPARISON_I18N: Record<LangKey, {
  trigger: string;
  intro: string;
  th: { criterion: string; before: string; after: string };
  rows: Array<{ k: string; b: string; a: string; highlight?: boolean }>;
  noteTitle: string;
  note: string;
}> = {
  bs: {
    trigger: "Šta se promijenilo? Stari vs. novi zakon",
    intro: "Pregled ključnih razlika između starog i novog Zakona o državljanstvu (StARModG, na snazi od 27.06.2024.).",
    th: { criterion: "Kriterij", before: "Prije 27.06.2024.", after: "Od 27.06.2024." },
    rows: [
      { k: "Min. boravak", b: "8 godina", a: "5 godina" },
      { k: "Matično državljanstvo", b: "❌ U pravilu se moralo odreći", a: "✅ Njemačka više ne traži odricanje — zadržavanje zavisi od zakona zemlje porijekla" },
      { k: "EU državljani", b: "✅ Oduvijek izuzetak", a: "✅ Kao i dosad" },
      { k: "Djeca rođena u DE", b: "Roditelj mora 8g. boravka", a: "Roditelj mora 5g. boravka" },
      { k: "Opcijska obaveza (djeca)", b: "✅ Postoji — birali do 21g.", a: "❌ Ukinuta" },
      { k: "Gastarbajteri", b: "Puni test + B1 pismeno", a: "Samo usmeno sporazumijevanje" },
      { k: "Jezik", b: "B1 pismeno i usmeno", a: "B1 (gastarbajteri: samo usmeno)" },
      { k: "\"Turbo\" naturalizacija (3g.)", b: "❌ Nije postojala", a: "⚠️ Uvedena 27.06.2024., UKINUTA 30.10.2025. — danas najmanje 5 godina", highlight: true },
    ],
    noteTitle: "Uvjeti koji se NISU promijenili",
    note: "B1 jezik + Einbürgerungstest, vlastito osiguranje troškova života (bez Bürgergeld/Sozialhilfe), čista kaznena evidencija, potvrda vjernosti Ustavu. Kraći boravak važi samo u zakonom predviđenim slučajevima, npr. supružnici njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG).",
  },
  hr: {
    trigger: "Šta se promijenilo? Stari vs. novi zakon",
    intro: "Pregled ključnih razlika između starog i novog Zakona o državljanstvu (StARModG, na snazi od 27.06.2024.).",
    th: { criterion: "Kriterij", before: "Prije 27.06.2024.", after: "Od 27.06.2024." },
    rows: [
      { k: "Min. boravak", b: "8 godina", a: "5 godina" },
      { k: "Matično državljanstvo", b: "❌ U pravilu se moralo odreći", a: "✅ Njemačka više ne traži odricanje — zadržavanje zavisi od zakona zemlje porijekla" },
      { k: "EU državljani", b: "✅ Oduvijek izuzetak", a: "✅ Kao i dosad" },
      { k: "Djeca rođena u DE", b: "Roditelj mora 8g. boravka", a: "Roditelj mora 5g. boravka" },
      { k: "Opcijska obaveza (djeca)", b: "✅ Postoji — birali do 21g.", a: "❌ Ukinuta" },
      { k: "Gastarbajteri", b: "Puni test + B1 pismeno", a: "Samo usmeno sporazumijevanje" },
      { k: "Jezik", b: "B1 pismeno i usmeno", a: "B1 (gastarbajteri: samo usmeno)" },
      { k: "\"Turbo\" naturalizacija (3g.)", b: "❌ Nije postojala", a: "⚠️ Uvedena 27.06.2024., UKINUTA 30.10.2025. — danas najmanje 5 godina", highlight: true },
    ],
    noteTitle: "Uvjeti koji se NISU promijenili",
    note: "B1 jezik + Einbürgerungstest, vlastito osiguranje troškova života (bez Bürgergeld/Sozialhilfe), čista kaznena evidencija, potvrda vjernosti Ustavu. Kraći boravak važi samo u zakonom predviđenim slučajevima, npr. supružnici njemačkih državljana: u pravilu 3 godine boravka i 2 godine braka (§ 9 StAG).",
  },
  sr: {
    trigger: "Šta se promenilo? Stari vs. novi zakon",
    intro: "Pregled ključnih razlika između starog i novog Zakona o državljanstvu (StARModG, na snazi od 27.06.2024.).",
    th: { criterion: "Kriterijum", before: "Pre 27.06.2024.", after: "Od 27.06.2024." },
    rows: [
      { k: "Min. boravak", b: "8 godina", a: "5 godina" },
      { k: "Matično državljanstvo", b: "❌ Po pravilu je moralo da se odrekne", a: "✅ Nemačka više ne traži odricanje — zadržavanje zavisi od zakona zemlje porekla" },
      { k: "EU državljani", b: "✅ Oduvijek izuzetak", a: "✅ Kao i dosad" },
      { k: "Deca rođena u DE", b: "Roditelj mora 8g. boravka", a: "Roditelj mora 5g. boravka" },
      { k: "Opcijska obaveza (deca)", b: "✅ Postoji — birali do 21g.", a: "❌ Ukinuta" },
      { k: "Gastarbajteri", b: "Puni test + B1 pismeno", a: "Samo usmeno sporazumevanje" },
      { k: "Jezik", b: "B1 pismeno i usmeno", a: "B1 (gastarbajteri: samo usmeno)" },
      { k: "\"Turbo\" naturalizacija (3g.)", b: "❌ Nije postojala", a: "⚠️ Uvedena 27.06.2024., UKINUTA 30.10.2025. — danas najmanje 5 godina", highlight: true },
    ],
    noteTitle: "Uslovi koji se NISU promenili",
    note: "B1 jezik + Einbürgerungstest, vlastito osiguranje troškova života (bez Bürgergeld/Sozialhilfe), čista krivična evidencija, potvrda vernosti Ustavu. Kraći boravak važi samo u zakonom predviđenim slučajevima, npr. supružnici nemačkih državljana: po pravilu 3 godine boravka i 2 godine braka (§ 9 StAG).",
  },
  de: {
    trigger: "Was hat sich geändert? Altes vs. neues Recht",
    intro: "Übersicht der wichtigsten Änderungen durch das Staatsangehörigkeitsmodernisierungsgesetz (StARModG, in Kraft seit 27.06.2024).",
    th: { criterion: "Kriterium", before: "Vor dem 27.06.2024", after: "Ab dem 27.06.2024" },
    rows: [
      { k: "Mindestaufenthalt", b: "8 Jahre", a: "5 Jahre" },
      { k: "Bisherige Staatsangehörigkeit", b: "❌ Musste in der Regel aufgegeben werden", a: "✅ Deutschland verlangt keine Aufgabe mehr — ob sie erhalten bleibt, regelt das Recht des Herkunftsstaats" },
      { k: "EU-Bürger", b: "✅ Immer ausgenommen", a: "✅ Wie bisher" },
      { k: "In DE geborene Kinder", b: "Elternteil braucht 8 Jahre", a: "Elternteil braucht 5 Jahre" },
      { k: "Optionspflicht (Kinder)", b: "✅ Galt bis zum 21. Lj.", a: "❌ Abgeschafft" },
      { k: "Gastarbeitergeneration", b: "Voller Test + B1 schriftlich", a: "Nur mündliche Verständigung" },
      { k: "Sprache", b: "B1 schriftlich + mündlich", a: "B1 (Gastarbeiter: nur mündlich)" },
      { k: "\"Turbo\"-Einbürgerung (3 J.)", b: "❌ Nicht vorhanden", a: "⚠️ Am 27.06.2024 eingeführt, am 30.10.2025 abgeschafft — heute mindestens 5 Jahre", highlight: true },
    ],
    noteTitle: "Unveränderte Voraussetzungen",
    note: "B1-Sprachkenntnisse + Einbürgerungstest, eigenständige Sicherung des Lebensunterhalts (kein Bürgergeld/Sozialhilfe), keine Vorstrafen, Bekenntnis zur freiheitlichen demokratischen Grundordnung. Kürzere Aufenthaltszeiten gelten nur in gesetzlich geregelten Fällen, z. B. Ehegatten Deutscher: in der Regel 3 Jahre Aufenthalt und 2 Jahre Ehe (§ 9 StAG).",
  },
};

export default function DvojnoDrzavljanstvo() {
  const { t, i18n } = useTranslation("dvojnoDrzavljanstvo");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedId =
    searchParams.get("zemlja") ||
    searchParams.get("country") ||
    DEFAULT_COUNTRY_ID;

  const country = useMemo(
    () =>
      DVOJNO_DRZAVLJANSTVO_COUNTRIES.find((c) => c.id === selectedId) ??
      DVOJNO_DRZAVLJANSTVO_COUNTRIES[0],
    [selectedId],
  );

  const handleSelect = (id: string) => {
    setSearchParams({ zemlja: id }, { replace: false });
  };

  const statusKey: "ok" | "okEu" | "warning" = country.status;
  const statusBadge = STATUS_BADGE[statusKey];
  const StatusIcon = statusBadge.icon;
  const statusText = t(
    statusKey === "ok"
      ? "status.ok"
      : statusKey === "okEu"
        ? "status.okEu"
        : "status.warning",
  );

  return (
    <div className="min-h-screen" style={{ background: "#F5F0E8" }}>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        path="/dvojno-drzavljanstvo"
      />
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-8">
        <Breadcrumbs variant="light" />

        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))]">
              <ScrollText className="h-5 w-5" />
            </div>
            <h1 className="text-[28px] sm:text-[32px] font-bold text-[#2D2D2D] leading-tight">
              {t("page.title")}
            </h1>
          </div>
          <p className="text-[15px] sm:text-[16px] text-[#6B6B6B] max-w-2xl">
            {t("page.subtitle")}
          </p>
        </header>

        {/* Info banner — novi njemački zakon */}
        <section
          className="mb-7 rounded-2xl border border-[#BFD8E8] bg-gradient-to-br from-[#EAF4FA] to-[#F4FAFD] p-4 sm:p-5"
          aria-labelledby="info-banner-title"
        >
          <div className="flex gap-3">
            <div className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center bg-[#1F6FB2]/10 text-[#1F6FB2]">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h2
                id="info-banner-title"
                className="text-[14px] font-bold text-[#1B4F7E] mb-1"
              >
                {t("page.infoBannerTitle")}
              </h2>
              <p className="text-[13.5px] leading-relaxed text-[#2D4760]">
                {t("page.infoBannerBody")}
              </p>
            </div>
          </div>
        </section>

        {/* Comparison: old vs new law */}
        {(() => {
          const lang = (["bs", "hr", "sr", "de"].includes(i18n.language) ? i18n.language : "bs") as LangKey;
          const cmp = COMPARISON_I18N[lang];
          return (
            <section className="mb-7" aria-label={cmp.trigger}>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="comparison" className="border-0">
                  <AccordionTrigger
                    className="rounded-2xl border border-[#E5DFC9] bg-white px-4 sm:px-5 py-4 text-left hover:no-underline shadow-sm hover:shadow-md transition-all data-[state=open]:rounded-b-none data-[state=open]:border-b-0"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className="h-9 w-9 shrink-0 rounded-lg flex items-center justify-center bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]">
                        <GitCompareArrows className="h-5 w-5" />
                      </div>
                      <span className="text-[14px] sm:text-[15px] font-bold text-[#2D2D2D]">
                        {cmp.trigger}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="rounded-b-2xl border border-t-0 border-[#E5DFC9] bg-white px-4 sm:px-5 pb-5 pt-0">
                    <p className="text-[13px] text-[#6B6B6B] mb-4 leading-relaxed">
                      {cmp.intro}
                    </p>

                    <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-[#F0EAD8]">
                      <table className="w-full text-[13px] sm:text-[13.5px] border-collapse min-w-[560px]">
                        <thead>
                          <tr className="bg-[#FFF8EC] text-[#8A6B1F]">
                            <th className="text-left font-bold px-3 sm:px-4 py-3 border-b border-[#E5DFC9] w-[34%]">
                              {cmp.th.criterion}
                            </th>
                            <th className="text-left font-bold px-3 sm:px-4 py-3 border-b border-[#E5DFC9] w-[33%]">
                              {cmp.th.before}
                            </th>
                            <th className="text-left font-bold px-3 sm:px-4 py-3 border-b border-[#E5DFC9] w-[33%]">
                              {cmp.th.after}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cmp.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              className={
                                row.highlight
                                  ? "bg-amber-50/80 border-t border-amber-200"
                                  : idx % 2 === 0
                                    ? "bg-white border-t border-[#F0EAD8]"
                                    : "bg-[#FBF8F0] border-t border-[#F0EAD8]"
                              }
                            >
                              <td className={`px-3 sm:px-4 py-3 align-top font-semibold ${row.highlight ? "text-amber-900" : "text-[#2D2D2D]"}`}>
                                {row.k}
                              </td>
                              <td className={`px-3 sm:px-4 py-3 align-top leading-relaxed ${row.highlight ? "text-amber-900/90" : "text-[#3D3D3D]"}`}>
                                {row.b}
                              </td>
                              <td className={`px-3 sm:px-4 py-3 align-top leading-relaxed ${row.highlight ? "text-amber-900/90 font-medium" : "text-[#3D3D3D]"}`}>
                                {row.a}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 rounded-xl border border-[#E5E5E5] bg-[#F5F5F2] p-4">
                      <p className="text-[12.5px] font-bold text-[#4A4A4A] mb-1 uppercase tracking-wide">
                        {cmp.noteTitle}
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#3D3D3D]">
                        {cmp.note}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          );
        })()}


        <Link
          to="/dvojno-drzavljanstvo/einbuergerung-vodic"
          className="mb-7 flex items-center justify-between gap-3 rounded-2xl border-2 border-[hsl(var(--gold))]/30 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0 rounded-xl flex items-center justify-center bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]">
              <FileText className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-[14px] sm:text-[15px] font-bold text-[#2D2D2D] mb-0.5">
                {t("einbuergerung.ctaCard.title")}
              </p>
              <p className="text-[12.5px] sm:text-[13px] text-[#6B6B6B] truncate">
                {t("einbuergerung.ctaCard.subtitle")}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold whitespace-nowrap"
            style={{
              background: "hsl(var(--gold))",
              color: "hsl(var(--gold-foreground))",
            }}
          >
            {t("einbuergerung.ctaCard.cta")}
          </span>
        </Link>

        <div
          className="mb-6 -mx-4 px-4 sm:mx-0 sm:px-0 flex gap-2 overflow-x-auto scrollbar-hide"
          role="tablist"
          aria-label={t("page.title")}
        >
          {DVOJNO_DRZAVLJANSTVO_COUNTRIES.map((c) => {
            const active = c.id === country.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={active}
                onClick={() => handleSelect(c.id)}
                className="shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium border transition-all"
                style={{
                  background: active ? "#FFF8EC" : "white",
                  borderColor: active ? "#C9A84C" : "#E5DFC9",
                  color: active ? "#8A6B1F" : "#2D2D2D",
                  fontWeight: active ? 700 : 500,
                  boxShadow: active
                    ? "0 1px 2px rgba(201, 168, 76, 0.15)"
                    : "none",
                }}
              >
                <span aria-hidden="true" className="text-[16px] leading-none">
                  {c.flag}
                </span>
                <span>{t(`countries.${c.id}.name`)}</span>
              </button>
            );
          })}
        </div>

        {/* Active country card */}
        <article
          className="rounded-2xl bg-white border border-[#E5DFC9] shadow-sm p-5 sm:p-7 animate-fade-in"
          key={country.id}
        >
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="text-[36px] leading-none select-none"
              >
                {country.flag}
              </span>
              <h2 className="text-[22px] sm:text-[24px] font-bold text-[#2D2D2D]">
                {t(`countries.${country.id}.name`)}
              </h2>
            </div>

            <div
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[12.5px] font-semibold ${statusBadge.bg} ${statusBadge.text} ${statusBadge.border}`}
            >
              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{statusText}</span>
            </div>
          </div>

          <Accordion
            type="single"
            collapsible
            defaultValue={country.sectionKeys[0]}
            className="w-full divide-y divide-[#F0EAD8]"
          >
            {country.sectionKeys.map((sectionKey) => (
              <AccordionItem
                key={sectionKey}
                value={sectionKey}
                className="border-b-0"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#2D2D2D] hover:no-underline py-4">
                  {t(
                    `countries.${country.id}.sections.${sectionKey}.title`,
                  )}
                </AccordionTrigger>
                <AccordionContent className="text-[14.5px] leading-relaxed text-[#3D3D3D] pb-5">
                  {t(
                    `countries.${country.id}.sections.${sectionKey}.body`,
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </article>

        {/* Bottom disclaimer */}
        <aside
          className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 sm:p-5"
          role="note"
        >
          <div className="flex gap-3">
            <AlertTriangle
              className="h-5 w-5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div>
              <p className="text-[13px] font-bold text-amber-900 mb-1">
                {t("disclaimer.title")}
              </p>
              <p className="text-[13px] leading-relaxed text-amber-900/90">
                {t("disclaimer.body")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
