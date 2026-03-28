import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  partnerSteuerId: string;
  partnerName: string;
  partnerGeburt: string;
  partnerStaat: string;
  partnerGeschlecht: string;
  partnerAnschrift: string;
  iban: string;
  bic: string;
  bank: string;
  kontoinhaber: string;
  kontoinhaberName: string;
  anzahlKinder: string;
  kindergeldBisher: string;
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
  kindergeldBisher: "",
  ortUnterschrift: "",
  datumUnterschrift: "",
};

const inputClass =
  "w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600";

const famStandOptions = [
  "ledig",
  "verheiratet",
  "in eingetragener Lebenspartnerschaft",
  "geschieden",
  "verwitwet",
  "dauernd getrennt lebend",
];

function SectionCard({ nr, title, children }: { nr: number; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-blue-800 mb-4 border-b border-gray-200 pb-2">
        {nr}. {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-xs font-medium text-gray-700 mb-1">
      {text}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

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
    if (!/^\d{11}$/.test(form.steuerIdAntrag)) errs.push("Steuer-ID muss genau 11 Ziffern haben");
    if (!form.familienname.trim()) errs.push("Familienname fehlt");
    if (!form.vorname.trim()) errs.push("Vorname fehlt");
    if (!form.geburtsdatum) errs.push("Geburtsdatum fehlt");
    if (!form.geburtsort.trim()) errs.push("Geburtsort fehlt");
    if (!form.geschlecht) errs.push("Geschlecht fehlt");
    if (!form.staatsangehoerigkeit.trim()) errs.push("Staatsangehörigkeit fehlt");
    if (!form.strasse.trim()) errs.push("Straße/Hausnummer fehlt");
    if (!/^\d{5}$/.test(form.plz)) errs.push("PLZ muss 5 Ziffern haben");
    if (!form.wohnort.trim()) errs.push("Wohnort fehlt");
    if (!form.familienstand) errs.push("Familienstand fehlt");
    if (!form.iban.trim() || !form.iban.toUpperCase().startsWith("DE")) errs.push("IBAN muss mit DE beginnen");
    if (!form.ortUnterschrift.trim()) errs.push("Ort (Unterschrift) fehlt");
    if (!form.datumUnterschrift) errs.push("Datum (Unterschrift) fehlt");
    setErrors(errs);
    setSuccess(errs.length === 0);
    if (errs.length > 0) {
      setTimeout(() => document.getElementById("muster-result")?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BalkanLink header bar */}
      <div className="bg-gray-900 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/formulari/kindergeld")} className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" /> Nazad
          </button>
          <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition">
            <Home className="h-4 w-4" />
          </button>
        </div>
        <span className="text-xs font-bold tracking-wider text-yellow-400">BALKANLINK</span>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Antrag auf Kindergeld — KG1</h1>
          <p className="text-xs text-gray-500 mt-1">Musterformular · Bundesagentur für Arbeit · Stand September 2025</p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-lg p-4 border-2 border-yellow-400 bg-yellow-50">
          <p className="text-sm text-gray-800 leading-relaxed">
            ⚠️ <strong>Musterformular — nur zur Orientierung.</strong> Dies ist eine Übungsversion des offiziellen KG1-Formulars der Bundesagentur für Arbeit (Stand September 2025). Es ersetzt nicht das offizielle Dokument.
          </p>
          <a
            href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            🔗 Zum offiziellen KG1-Formular →
          </a>
        </div>

        {/* ── Sekcija 1 ── */}
        <SectionCard nr={1} title="Angaben zur antragstellenden Person">
          <div>
            <Label text="Kindergeld-Nr." />
            <input disabled className={`${inputClass} cursor-not-allowed !bg-gray-100`} placeholder="Wird von der Familienkasse vergeben" />
          </div>

          <div>
            <Label text="Steuerliche Identifikationsnummer" required />
            <input
              className={inputClass}
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
              <input className={inputClass} value={form.familienname} onChange={set("familienname")} />
            </div>
            <div>
              <Label text="Vorname" required />
              <input className={inputClass} value={form.vorname} onChange={set("vorname")} />
            </div>
          </div>

          <div>
            <Label text="Geburtsname aus früherer Ehe" />
            <input className={inputClass} value={form.geburtsname} onChange={set("geburtsname")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Geburtsdatum" required />
              <input type="date" className={inputClass} value={form.geburtsdatum} onChange={set("geburtsdatum")} />
            </div>
            <div>
              <Label text="Geburtsort" required />
              <input className={inputClass} value={form.geburtsort} onChange={set("geburtsort")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Geschlecht" required />
              <select className={inputClass} value={form.geschlecht} onChange={set("geschlecht")}>
                <option value="">— wählen —</option>
                <option value="männlich">männlich</option>
                <option value="weiblich">weiblich</option>
                <option value="divers">divers</option>
              </select>
            </div>
            <div>
              <Label text="Staatsangehörigkeit" required />
              <input className={inputClass} value={form.staatsangehoerigkeit} onChange={set("staatsangehoerigkeit")} />
              <p className="text-[10px] mt-1 text-amber-600 font-medium">⚠ Nicht EU/EWR? Aufenthaltstitel beifügen!</p>
            </div>
          </div>

          <div>
            <Label text="Straße/Platz, Hausnummer" required />
            <input className={inputClass} value={form.strasse} onChange={set("strasse")} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label text="Postleitzahl" required />
              <input
                className={inputClass}
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
              <input className={inputClass} value={form.wohnort} onChange={set("wohnort")} />
            </div>
            <div>
              <Label text="Staat" />
              <input className={inputClass} value={form.staat} onChange={set("staat")} />
            </div>
          </div>

          <div>
            <Label text="Telefon" />
            <input className={inputClass} value={form.telefon} onChange={set("telefon")} />
          </div>

          <div>
            <Label text="Familienstand" required />
            <div className="space-y-1.5 mt-1">
              {famStandOptions.map((opt) => (
                <label key={opt} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                  <input type="radio" name="familienstand" value={opt} checked={form.familienstand === opt} onChange={set("familienstand")} className="accent-blue-600" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* ── Sekcija 2 ── */}
        <SectionCard nr={2} title="Angaben zum Ehepartner / Lebenspartner">
          <div>
            <Label text="Steuerliche Identifikationsnummer" />
            <input
              className={inputClass}
              maxLength={11}
              value={form.partnerSteuerId}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 11);
                setForm((p) => ({ ...p, partnerSteuerId: v }));
              }}
              placeholder="11 Ziffern"
            />
          </div>
          <div>
            <Label text="Familienname, Vorname, Titel" />
            <input className={inputClass} value={form.partnerName} onChange={set("partnerName")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Geburtsdatum" />
              <input type="date" className={inputClass} value={form.partnerGeburt} onChange={set("partnerGeburt")} />
            </div>
            <div>
              <Label text="Staatsangehörigkeit" />
              <input className={inputClass} value={form.partnerStaat} onChange={set("partnerStaat")} />
            </div>
          </div>
          <div>
            <Label text="Geschlecht" />
            <select className={inputClass} value={form.partnerGeschlecht} onChange={set("partnerGeschlecht")}>
              <option value="">— wählen —</option>
              <option value="männlich">männlich</option>
              <option value="weiblich">weiblich</option>
              <option value="divers">divers</option>
            </select>
          </div>
          <div>
            <Label text="Anschrift (wenn abweichend)" />
            <input className={inputClass} placeholder="Nur ausfüllen wenn abweichend" value={form.partnerAnschrift} onChange={set("partnerAnschrift")} />
          </div>
        </SectionCard>

        {/* ── Sekcija 3 ── */}
        <SectionCard nr={3} title="Angaben zum Zahlungsweg">
          <div>
            <Label text="IBAN" required />
            <input className={inputClass} placeholder="DE00 0000 0000 0000 0000 00" value={form.iban} onChange={set("iban")} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="BIC" />
              <input className={inputClass} value={form.bic} onChange={set("bic")} />
            </div>
            <div>
              <Label text="Bank / Finanzinstitut" />
              <input className={inputClass} value={form.bank} onChange={set("bank")} />
            </div>
          </div>
          <div>
            <Label text="Kontoinhaber" />
            <div className="space-y-1.5 mt-1">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="radio" name="kontoinhaber" value="self" checked={form.kontoinhaber === "self"} onChange={set("kontoinhaber")} className="accent-blue-600" />
                Antragstellende Person
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="radio" name="kontoinhaber" value="other" checked={form.kontoinhaber === "other"} onChange={set("kontoinhaber")} className="accent-blue-600" />
                Andere Person
              </label>
            </div>
            {form.kontoinhaber === "other" && (
              <div className="mt-3">
                <Label text="Familienname, Vorname des Kontoinhabers" />
                <input className={inputClass} value={form.kontoinhaberName} onChange={set("kontoinhaberName")} />
              </div>
            )}
          </div>
        </SectionCard>

        {/* ── Sekcija 4 ── */}
        <SectionCard nr={4} title="Angaben zu Kindern">
          <div>
            <Label text="Anzahl Anlage Kind" />
            <input type="number" min={1} className={`${inputClass} w-24`} value={form.anzahlKinder} onChange={set("anzahlKinder")} />
          </div>
          <p className="text-[11px] text-gray-500">
            Für jedes Kind eine gesonderte <strong>Anlage Kind</strong> einreichen.
          </p>
        </SectionCard>

        {/* ── Sekcija 5 ── */}
        <SectionCard nr={5} title="Bisheriger Bezug von Kindergeld">
          <div>
            <Label text="Wurde bereits Kindergeld beantragt oder bezogen?" />
            <div className="space-y-1.5 mt-1">
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="radio" name="kindergeldBisher" value="nein" checked={form.kindergeldBisher === "nein"} onChange={set("kindergeldBisher")} className="accent-blue-600" />
                Nein, erstmaliger Antrag
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="radio" name="kindergeldBisher" value="ja" checked={form.kindergeldBisher === "ja"} onChange={set("kindergeldBisher")} className="accent-blue-600" />
                Ja, Kindergeld wurde bereits bezogen
              </label>
            </div>
          </div>
          <p className="text-[11px] text-gray-500">
            Falls ja — bisherige Kindergeld-Nr. und Familienkasse angeben.
          </p>
        </SectionCard>

        {/* ── Sekcija 6 ── */}
        <SectionCard nr={6} title="Unterschrift">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label text="Ort" required />
              <input className={inputClass} value={form.ortUnterschrift} onChange={set("ortUnterschrift")} />
            </div>
            <div>
              <Label text="Datum" required />
              <input type="date" className={inputClass} value={form.datumUnterschrift} onChange={set("datumUnterschrift")} />
            </div>
          </div>
          <div className="rounded border border-dashed border-gray-300 bg-gray-50 p-3 text-center">
            <p className="text-xs text-gray-400 italic">Unterschrift — nur auf dem Original-Formular</p>
          </div>
        </SectionCard>

        {/* ── Buttons ── */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 gap-2" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Zurücksetzen
          </Button>
          <Button className="flex-1 gap-2 font-bold bg-blue-700 hover:bg-blue-800 text-white" onClick={validate}>
            <CheckCircle2 className="h-4 w-4" /> Angaben prüfen
          </Button>
        </div>

        {/* ── Result ── */}
        <div id="muster-result">
          {success && (
            <div className="rounded-lg p-4 border-2 border-green-500 bg-green-50">
              <p className="text-sm font-semibold text-green-700">✅ Alle Pflichtfelder ausgefüllt!</p>
              <p className="text-xs text-green-600 mt-1">Jetzt das Original bei der Familienkasse einreichen.</p>
            </div>
          )}
          {errors.length > 0 && (
            <div className="rounded-lg p-4 border-2 border-red-400 bg-red-50">
              <p className="text-sm font-semibold text-red-700">❌ Folgende Felder prüfen:</p>
              <ul className="mt-2 space-y-1 pl-4 list-disc">
                {errors.map((e, i) => (
                  <li key={i} className="text-xs text-red-600">{e}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* ── Final disclaimer ── */}
        <p className="text-[11px] text-gray-400 text-center leading-relaxed pb-6">
          BalkanLink ist eine edukative Plattform. Dieses Musterformular dient ausschließlich zur Übung. Das Original muss bei der zuständigen Familienkasse eingereicht werden.
        </p>
      </div>
    </div>
  );
}
