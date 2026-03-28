import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── types ─── */
interface FormData {
  steuerIdAntrag: string;
  familienname: string;
  vorname: string;
  geburtsname: string;
  geburtsdatum: string;
  geburtsort: string;
  geschlecht: string;
  staatsangehoerigkeit: string;
  strasse: string;
  plz: string;
  wohnort: string;
  staat: string;
  telefon: string;
  familienstand: string;
  /* partner */
  partnerSteuerId: string;
  partnerName: string;
  partnerGeburt: string;
  partnerStaat: string;
  partnerGeschlecht: string;
  partnerAnschrift: string;
  /* bank */
  iban: string;
  bic: string;
  bank: string;
  kontoinhaber: string;
  kontoinhaberName: string;
  /* kinder */
  anzahlKinder: string;
  /* unterschrift */
  ortUnterschrift: string;
  datumUnterschrift: string;
}

const empty: FormData = {
  steuerIdAntrag: "",
  familienname: "",
  vorname: "",
  geburtsname: "",
  geburtsdatum: "",
  geburtsort: "",
  geschlecht: "",
  staatsangehoerigkeit: "",
  strasse: "",
  plz: "",
  wohnort: "",
  staat: "Deutschland",
  telefon: "",
  familienstand: "",
  partnerSteuerId: "",
  partnerName: "",
  partnerGeburt: "",
  partnerStaat: "",
  partnerGeschlecht: "",
  partnerAnschrift: "",
  iban: "",
  bic: "",
  bank: "",
  kontoinhaber: "self",
  kontoinhaberName: "",
  anzahlKinder: "1",
  ortUnterschrift: "",
  datumUnterschrift: "",
};

/* ─── styles ─── */
const PAGE_BG = "#0B0F1A";
const CARD_BG = "#111827";
const INPUT_BG = "#1F2937";
const INPUT_BORDER = "#374151";
const ACCENT = "#EAB308";
const LINK_BLUE = "#3B82F6";

const sectionTitleClass = "text-sm font-bold uppercase tracking-wide mb-4";
const inputClass =
  "w-full rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition-colors";

function inputStyle(error?: boolean, valid?: boolean) {
  return {
    backgroundColor: INPUT_BG,
    border: `1px solid ${error ? "#EF4444" : valid ? "#22C55E" : INPUT_BORDER}`,
  };
}

const focusCss = `
  .muster-input:focus { border-color: ${ACCENT} !important; }
`;

/* ─── component ─── */
export default function KindergeldMuster() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({ ...empty });
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  const set = useCallback(
    (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value })),
    []
  );

  const reset = () => {
    setForm({ ...empty });
    setErrors([]);
    setSuccess(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validate = () => {
    const errs: string[] = [];
    if (form.steuerIdAntrag.length !== 11 || !/^\d{11}$/.test(form.steuerIdAntrag))
      errs.push("Steuer-ID muss genau 11 Ziffern haben");
    if (!form.familienname.trim()) errs.push("Familienname fehlt");
    if (!form.vorname.trim()) errs.push("Vorname fehlt");
    if (!form.geburtsdatum) errs.push("Geburtsdatum fehlt");
    if (!form.geburtsort.trim()) errs.push("Geburtsort fehlt");
    if (!form.geschlecht) errs.push("Geschlecht fehlt");
    if (!form.staatsangehoerigkeit.trim()) errs.push("Staatsangehörigkeit fehlt");
    if (!form.strasse.trim()) errs.push("Straße/Hausnummer fehlt");
    if (!form.plz.trim() || form.plz.length !== 5) errs.push("PLZ muss 5 Ziffern haben");
    if (!form.wohnort.trim()) errs.push("Wohnort fehlt");
    if (!form.familienstand) errs.push("Familienstand fehlt");
    if (!form.iban.trim() || !form.iban.toUpperCase().startsWith("DE"))
      errs.push("IBAN muss mit DE beginnen");
    if (!form.ortUnterschrift.trim()) errs.push("Ort (Unterschrift) fehlt");
    if (!form.datumUnterschrift) errs.push("Datum (Unterschrift) fehlt");

    setErrors(errs);
    setSuccess(errs.length === 0);

    if (errs.length > 0) {
      setTimeout(() => {
        document.getElementById("muster-result")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  /* ─── render helpers ─── */
  const Label = ({ text, required }: { text: string; required?: boolean }) => (
    <label className="block text-xs font-medium text-gray-300 mb-1">
      {text}
      {required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );

  const SectionCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="rounded-xl p-5" style={{ backgroundColor: CARD_BG }}>
      <h2 className={sectionTitleClass} style={{ color: ACCENT }}>
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const famStandOptions = [
    "ledig",
    "verheiratet",
    "in eingetragener Lebenspartnerschaft",
    "geschieden",
    "verwitwet",
    "dauernd getrennt lebend",
  ];

  return (
    <>
      <style>{focusCss}</style>
      <div className="min-h-screen px-4 py-6 mx-auto max-w-2xl" style={{ backgroundColor: PAGE_BG, color: "#fff" }}>
        {/* Nav */}
        <div className="flex items-center gap-3 mb-5">
          <button
            onClick={() => navigate("/formulari/kindergeld")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition"
          >
            <Home className="h-4 w-4" /> 🏠
          </button>
        </div>

        {/* Disclaimer */}
        <div
          className="rounded-lg p-4 mb-6"
          style={{ backgroundColor: "#FEF3C7", border: "2px solid #EAB308" }}
        >
          <p className="text-sm text-gray-800 leading-relaxed">
            ⚠️ <strong>Musterformular — nur zur Orientierung.</strong> Dies ist eine
            Übungsversion des offiziellen KG1-Formulars der Bundesagentur für Arbeit (Stand
            September 2025). Es ersetzt nicht das offizielle Dokument.
          </p>
          <a
            href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-medium"
            style={{ color: LINK_BLUE }}
          >
            🔗 Zum offiziellen KG1-Formular →
          </a>
        </div>

        <div className="space-y-5">
          {/* ── Sekcija 1 ── */}
          <SectionCard title="1. Angaben zur antragstellenden Person">
            <div>
              <Label text="Kindergeld-Nr." />
              <input
                disabled
                className={`${inputClass} muster-input cursor-not-allowed opacity-50`}
                style={inputStyle()}
                placeholder="Wird von der Familienkasse vergeben"
              />
            </div>

            <div>
              <Label text="Steuerliche Identifikationsnummer" required />
              <input
                className={`${inputClass} muster-input`}
                style={inputStyle()}
                maxLength={11}
                value={form.steuerIdAntrag}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setForm((p) => ({ ...p, steuerIdAntrag: v }));
                }}
                placeholder="11 Ziffern"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="Familienname, Titel" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.familienname} onChange={set("familienname")} />
              </div>
              <div>
                <Label text="Vorname" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.vorname} onChange={set("vorname")} />
              </div>
            </div>

            <div>
              <Label text="Geburtsname aus früherer Ehe" />
              <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.geburtsname} onChange={set("geburtsname")} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="Geburtsdatum" required />
                <input type="date" className={`${inputClass} muster-input`} style={inputStyle()} value={form.geburtsdatum} onChange={set("geburtsdatum")} />
              </div>
              <div>
                <Label text="Geburtsort" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.geburtsort} onChange={set("geburtsort")} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="Geschlecht" required />
                <select className={`${inputClass} muster-input`} style={inputStyle()} value={form.geschlecht} onChange={set("geschlecht")}>
                  <option value="">— wählen —</option>
                  <option value="männlich">männlich</option>
                  <option value="weiblich">weiblich</option>
                  <option value="divers">divers</option>
                </select>
              </div>
              <div>
                <Label text="Staatsangehörigkeit" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.staatsangehoerigkeit} onChange={set("staatsangehoerigkeit")} />
                <p className="text-[10px] mt-1" style={{ color: ACCENT }}>Nicht EU/EWR? Aufenthaltstitel beifügen!</p>
              </div>
            </div>

            <div>
              <Label text="Straße/Platz, Hausnummer" required />
              <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.strasse} onChange={set("strasse")} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label text="Postleitzahl" required />
                <input
                  className={`${inputClass} muster-input`}
                  style={inputStyle()}
                  maxLength={5}
                  value={form.plz}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 5);
                    setForm((p) => ({ ...p, plz: v }));
                  }}
                />
              </div>
              <div>
                <Label text="Wohnort" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.wohnort} onChange={set("wohnort")} />
              </div>
              <div>
                <Label text="Staat" />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.staat} onChange={set("staat")} />
              </div>
            </div>

            <div>
              <Label text="Telefon" />
              <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.telefon} onChange={set("telefon")} />
            </div>

            <div>
              <Label text="Familienstand" required />
              <div className="space-y-2 mt-1">
                {famStandOptions.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                    <input
                      type="radio"
                      name="familienstand"
                      value={opt}
                      checked={form.familienstand === opt}
                      onChange={set("familienstand")}
                      className="accent-yellow-500"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* ── Sekcija 2 ── */}
          <SectionCard title="2. Angaben zum Ehepartner / Lebenspartner">
            <div>
              <Label text="Steuerliche Identifikationsnummer" />
              <input
                className={`${inputClass} muster-input`}
                style={inputStyle()}
                maxLength={11}
                value={form.partnerSteuerId}
                onChange={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setForm((p) => ({ ...p, partnerSteuerId: v }));
                }}
              />
            </div>
            <div>
              <Label text="Familienname, Vorname, Titel" />
              <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.partnerName} onChange={set("partnerName")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="Geburtsdatum" />
                <input type="date" className={`${inputClass} muster-input`} style={inputStyle()} value={form.partnerGeburt} onChange={set("partnerGeburt")} />
              </div>
              <div>
                <Label text="Staatsangehörigkeit" />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.partnerStaat} onChange={set("partnerStaat")} />
              </div>
            </div>
            <div>
              <Label text="Geschlecht" />
              <select className={`${inputClass} muster-input`} style={inputStyle()} value={form.partnerGeschlecht} onChange={set("partnerGeschlecht")}>
                <option value="">— wählen —</option>
                <option value="männlich">männlich</option>
                <option value="weiblich">weiblich</option>
                <option value="divers">divers</option>
              </select>
            </div>
            <div>
              <Label text="Anschrift (wenn abweichend)" />
              <input className={`${inputClass} muster-input`} style={inputStyle()} placeholder="Nur ausfüllen wenn abweichend" value={form.partnerAnschrift} onChange={set("partnerAnschrift")} />
            </div>
          </SectionCard>

          {/* ── Sekcija 3 ── */}
          <SectionCard title="3. Angaben zum Zahlungsweg">
            <div>
              <Label text="IBAN" required />
              <input className={`${inputClass} muster-input`} style={inputStyle()} placeholder="DE00 0000 0000 0000 0000 00" value={form.iban} onChange={set("iban")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="BIC" />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.bic} onChange={set("bic")} />
              </div>
              <div>
                <Label text="Bank / Finanzinstitut" />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.bank} onChange={set("bank")} />
              </div>
            </div>
            <div>
              <Label text="Kontoinhaber" />
              <div className="space-y-2 mt-1">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input type="radio" name="kontoinhaber" value="self" checked={form.kontoinhaber === "self"} onChange={set("kontoinhaber")} className="accent-yellow-500" />
                  Antragstellende Person
                </label>
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input type="radio" name="kontoinhaber" value="other" checked={form.kontoinhaber === "other"} onChange={set("kontoinhaber")} className="accent-yellow-500" />
                  Andere Person
                </label>
              </div>
              {form.kontoinhaber === "other" && (
                <div className="mt-3">
                  <Label text="Familienname, Vorname des Kontoinhabers" />
                  <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.kontoinhaberName} onChange={set("kontoinhaberName")} />
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── Sekcija 4 ── */}
          <SectionCard title="4. Angaben zu Kindern">
            <div>
              <Label text="Anzahl Anlage Kind" />
              <input
                type="number"
                min={1}
                className={`${inputClass} muster-input w-24`}
                style={inputStyle()}
                value={form.anzahlKinder}
                onChange={set("anzahlKinder")}
              />
            </div>
            <p className="text-[11px] text-gray-400">
              Für jedes Kind eine gesonderte Anlage Kind einreichen.
            </p>
          </SectionCard>

          {/* ── Sekcija 5 ── */}
          <SectionCard title="5. Unterschrift">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="Ort" required />
                <input className={`${inputClass} muster-input`} style={inputStyle()} value={form.ortUnterschrift} onChange={set("ortUnterschrift")} />
              </div>
              <div>
                <Label text="Datum" required />
                <input type="date" className={`${inputClass} muster-input`} style={inputStyle()} value={form.datumUnterschrift} onChange={set("datumUnterschrift")} />
              </div>
            </div>
            <div>
              <input
                disabled
                className={`${inputClass} cursor-not-allowed opacity-50`}
                style={inputStyle()}
                value="Unterschrift — nur auf dem Original-Formular"
              />
            </div>
          </SectionCard>

          {/* ── Buttons ── */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 gap-2" onClick={reset}>
              <RotateCcw className="h-4 w-4" /> 🔄 Zurücksetzen
            </Button>
            <Button
              className="flex-1 gap-2 font-bold"
              style={{ backgroundColor: ACCENT, color: "#000" }}
              onClick={validate}
            >
              <CheckCircle2 className="h-4 w-4" /> ✅ Angaben prüfen
            </Button>
          </div>

          {/* ── Result ── */}
          <div id="muster-result">
            {success && (
              <div className="rounded-lg p-4 border-2" style={{ borderColor: "#22C55E", backgroundColor: "#052e1630" }}>
                <p className="text-sm font-semibold" style={{ color: "#22C55E" }}>
                  ✅ Alle Pflichtfelder ausgefüllt!
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Jetzt das Original bei der Familienkasse einreichen.
                </p>
              </div>
            )}
            {errors.length > 0 && (
              <div className="rounded-lg p-4 border-2" style={{ borderColor: "#EF4444", backgroundColor: "#3b000930" }}>
                <p className="text-sm font-semibold" style={{ color: "#EF4444" }}>
                  ❌ Folgende Felder prüfen:
                </p>
                <ul className="mt-2 space-y-1 pl-4 list-disc">
                  {errors.map((e, i) => (
                    <li key={i} className="text-xs" style={{ color: "#FCA5A5" }}>{e}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Final disclaimer ── */}
          <p className="text-[12px] text-gray-500 text-center leading-relaxed pb-6">
            BalkanLink ist eine edukative Plattform. Dieses Musterformular dient ausschließlich
            zur Übung. Das Original muss bei der zuständigen Familienkasse eingereicht werden.
          </p>
        </div>
      </div>
    </>
  );
}
