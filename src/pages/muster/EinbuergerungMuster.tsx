import { useState, useCallback } from "react";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";
import EinbuergerungGuideContent from "@/components/guides/EinbuergerungGuideContent";
import MusterFormBase, { S, Field, IdBoxes, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";

const LS_KEY = "einbuergerung-muster-data";
// Zvanični obrazac varira po Bundeslandu — vodimo na centralnu stranicu BMI sa linkovima.
const PDF_URL = "https://www.bmi.bund.de/DE/themen/verfassung/staatsangehoerigkeit/einbuergerung/einbuergerung-node.html";

const initial = () => ({
  // A. Lični podaci
  familienname: "",
  geburtsname: "",
  vorname: "",
  geburtsdatum: "",
  geburtsort: "",
  geburtsland: "Bosnien und Herzegowina",
  geschlecht: "",
  staatsangehoerigkeit: "bosnisch-herzegowinisch",
  familienstand: "",

  // B. Adresa u Njemačkoj
  strasse: "",
  hausnummer: "",
  plz: "",
  wohnort: "",
  einreisedatum: "",
  meldedatum: "",

  // C. Boravišni status
  aufenthaltstitel: "",
  ausstellungsdatum: "",
  gueltigBis: "",
  aufenthaltsdauer: "",

  // D. Jezik i integracija
  sprachniveau: "B1",
  sprachzertifikat: "",
  zertifikatDatum: "",
  einbTest: "nein",
  einbTestDatum: "",
  einbTestErgebnis: "",

  // E. Prihodi / izdržavanje
  beschaeftigung: "",
  arbeitgeber: "",
  beschaeftigungSeit: "",
  bruttoMonat: "",
  nettoMonat: "",
  buergergeld: "nein",

  // F. Krivična evidencija
  vorstrafen: "nein",
  vorstrafenBegruendung: "",

  // G. Mehrstaatigkeit
  mehrstaatigkeit: "ja",

  // H. Loyalitätserklärung
  loyalitaet: false,

  // Children to be naturalized along
  kinder: Array.from({ length: 4 }, () => ({
    vorname: "",
    geburtsdatum: "",
    geschlecht: "",
    staatsangeh: "",
  })),

  // Potpis
  ort: "",
  datum: "",
});

const fsList = [
  { value: "ledig", label: "ledig" },
  { value: "verheiratet", label: "verheiratet" },
  { value: "lebenspartnerschaft", label: "in eingetragener Lebenspartnerschaft lebend" },
  { value: "geschieden", label: "geschieden" },
  { value: "verwitwet", label: "verwitwet" },
  { value: "getrennt", label: "dauernd getrennt lebend" },
];

export default function EinbuergerungMuster() {
  const [f, setF] = useState(() => {
    try {
      const s = localStorage.getItem(LS_KEY);
      if (s) return { ...initial(), ...JSON.parse(s) };
    } catch {
      /* noop */
    }
    return initial();
  });

  const set = useCallback(
    (key: string, val: string | boolean) => setF((p) => ({ ...p, [key]: val })),
    [],
  );
  const setKind = useCallback(
    (i: number, key: string, val: string) =>
      setF((p) => {
        const k = [...p.kinder];
        k[i] = { ...k[i], [key]: val };
        return { ...p, kinder: k };
      }),
    [],
  );

  const Radio = ({ name, value }: { name: string; value: string }) => (
    <div style={{ display: "flex", gap: 16 }}>
      {["Ja", "Nein"].map((o) => (
        <label key={o} style={S.chk}>
          <input
            type="radio"
            name={name}
            checked={value === o.toLowerCase()}
            onChange={() => set(name, o.toLowerCase())}
          />
          {o}
        </label>
      ))}
    </div>
  );

  return (
    <MusterFormBase
      rootId="einb-root"
      title="Antrag auf Einbürgerung in den deutschen Staatsverband"
      subtitle="Musterformular — BalkanLink — nur zur Orientierung"
      pdfUrl={PDF_URL}
      pdfLabel="Originalni obrazac kod nadležnog Einbürgerungsbehörde →"
      footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei der zuständigen Einbürgerungsbehörde einreichen • BalkanLink ist keine staatliche Stelle"
      lsKey={LS_KEY}
      formularId="einbuergerung-muster"
      data={f}
      onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))}
      onReset={() => {
        localStorage.removeItem(LS_KEY);
        setF(initial());
      }}
    >
      {/* Info banner */}
      <div
        style={{
          background: "#f0f9ff",
          border: "1px solid #bae6fd",
          borderRadius: 8,
          padding: 10,
          marginBottom: 12,
          fontSize: 10,
          color: "#1e3a5f",
          lineHeight: 1.6,
        }}
      >
        ℹ️ <strong>Stand 2026:</strong> Od 27.06.2024. (StARModG) Njemačka generalno prihvata
        višestruko državljanstvo — više se ne traži odricanje od BiH pasoša. Minimalan boravak: 5 godina
        (3 sa posebnim integracijama). Pristojba: 255 € po osobi, 51 € po djetetu.
      </div>

      {/* SEKCIJA 1 */}
      <div style={S.sec}>
        <SecHeader num={1} title="A. Angaben zur antragstellenden Person" />
        <div style={S.row}>
          <Field label="Familienname" flex={3} value={f.familienname} onChange={(v) => set("familienname", v)} />
          <Field label="Geburtsname (falls abweichend)" flex={3} value={f.geburtsname} onChange={(v) => set("geburtsname", v)} />
          <Field label="Vorname(n)" flex={3} value={f.vorname} onChange={(v) => set("vorname", v)} />
        </div>
        <div style={S.row}>
          <Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={(v) => set("geburtsdatum", v)} />
          <Field label="Geburtsort" value={f.geburtsort} onChange={(v) => set("geburtsort", v)} />
          <Field label="Geburtsland" value={f.geburtsland} onChange={(v) => set("geburtsland", v)} />
        </div>
        <div style={S.row}>
          <div style={{ flex: 1 }}>
            <div style={S.lbl}>Geschlecht</div>
            <select style={{ ...S.inp }} value={f.geschlecht} onChange={(e) => set("geschlecht", e.target.value)}>
              <option value="">—</option>
              <option value="männlich">männlich</option>
              <option value="weiblich">weiblich</option>
              <option value="divers">divers</option>
            </select>
          </div>
          <Field
            label="Aktuelle Staatsangehörigkeit"
            flex={2}
            value={f.staatsangehoerigkeit}
            onChange={(v) => set("staatsangehoerigkeit", v)}
          />
        </div>
        <div>
          <div style={S.lbl}>Familienstand</div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {fsList.map((fs) => (
              <label key={fs.value} style={S.chk}>
                <input
                  type="checkbox"
                  checked={f.familienstand === fs.value}
                  onChange={() => set("familienstand", f.familienstand === fs.value ? "" : fs.value)}
                />
                <TOpt value={fs.label} />
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* SEKCIJA 2 */}
      <div style={S.sec}>
        <SecHeader num={2} title="B. Anschrift in Deutschland" />
        <div style={S.row}>
          <Field label="Straße" flex={2} value={f.strasse} onChange={(v) => set("strasse", v)} />
          <Field label="Hausnummer" width={90} value={f.hausnummer} onChange={(v) => set("hausnummer", v)} />
        </div>
        <div style={S.row}>
          <Field label="PLZ" width={80} value={f.plz} onChange={(v) => set("plz", v)} />
          <Field label="Wohnort" flex={1} value={f.wohnort} onChange={(v) => set("wohnort", v)} />
        </div>
        <div style={S.row}>
          <Field label="Einreisedatum nach Deutschland" type="date" value={f.einreisedatum} onChange={(v) => set("einreisedatum", v)} />
          <Field label="Erstes Meldedatum (Anmeldung)" type="date" value={f.meldedatum} onChange={(v) => set("meldedatum", v)} />
        </div>
      </div>

      {/* SEKCIJA 3 */}
      <div style={S.sec}>
        <SecHeader num={3} title="C. Aufenthaltsstatus" />
        <div style={S.row}>
          <Field
            label="Art des Aufenthaltstitels"
            flex={2}
            value={f.aufenthaltstitel}
            onChange={(v) => set("aufenthaltstitel", v)}
          />
          <Field
            label="Ausgestellt am"
            type="date"
            value={f.ausstellungsdatum}
            onChange={(v) => set("ausstellungsdatum", v)}
          />
          <Field label="Gültig bis" type="date" value={f.gueltigBis} onChange={(v) => set("gueltigBis", v)} />
        </div>
        <div style={S.row}>
          <Field
            label="Ununterbrochene Aufenthaltsdauer (Jahre/Monate)"
            value={f.aufenthaltsdauer}
            onChange={(v) => set("aufenthaltsdauer", v)}
          />
        </div>
      </div>

      {/* SEKCIJA 4 */}
      <div style={S.sec}>
        <SecHeader num={4} title="D. Sprachkenntnisse und Einbürgerungstest" />
        <div style={S.row}>
          <div style={{ flex: 1 }}>
            <div style={S.lbl}>Sprachniveau Deutsch</div>
            <select
              style={{ ...S.inp }}
              value={f.sprachniveau}
              onChange={(e) => set("sprachniveau", e.target.value)}
            >
              <option value="B1">B1 (Mindestniveau)</option>
              <option value="B2">B2 (für Schnellverfahren — 3 Jahre)</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <Field
            label="Sprachzertifikat (z.B. telc, Goethe, ÖSD)"
            flex={2}
            value={f.sprachzertifikat}
            onChange={(v) => set("sprachzertifikat", v)}
          />
          <Field
            label="Datum des Zertifikats"
            type="date"
            value={f.zertifikatDatum}
            onChange={(v) => set("zertifikatDatum", v)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={S.lbl}>Einbürgerungstest bestanden?</div>
          <Radio name="einbTest" value={f.einbTest} />
        </div>
        {f.einbTest === "ja" && (
          <div style={S.row}>
            <Field
              label="Datum des Einbürgerungstests"
              type="date"
              value={f.einbTestDatum}
              onChange={(v) => set("einbTestDatum", v)}
            />
            <Field
              label="Ergebnis (z.B. 26 von 33)"
              value={f.einbTestErgebnis}
              onChange={(v) => set("einbTestErgebnis", v)}
            />
          </div>
        )}
      </div>

      {/* SEKCIJA 5 */}
      <div style={S.sec}>
        <SecHeader num={5} title="E. Sicherung des Lebensunterhalts" />
        <div style={S.row}>
          <Field
            label="Beschäftigungsverhältnis (z.B. Festanstellung, befristet, selbstständig)"
            flex={2}
            value={f.beschaeftigung}
            onChange={(v) => set("beschaeftigung", v)}
          />
          <Field label="Arbeitgeber / Auftraggeber" flex={2} value={f.arbeitgeber} onChange={(v) => set("arbeitgeber", v)} />
        </div>
        <div style={S.row}>
          <Field
            label="Beschäftigt seit"
            type="date"
            value={f.beschaeftigungSeit}
            onChange={(v) => set("beschaeftigungSeit", v)}
          />
          <Field label="Brutto monatlich (€)" value={f.bruttoMonat} onChange={(v) => set("bruttoMonat", v)} />
          <Field label="Netto monatlich (€)" value={f.nettoMonat} onChange={(v) => set("nettoMonat", v)} />
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={S.lbl}>
            Beziehe ich oder ein Familienmitglied derzeit Bürgergeld / Sozialhilfe / Grundsicherung?
          </div>
          <Radio name="buergergeld" value={f.buergergeld} />
        </div>
        {f.buergergeld === "ja" && (
          <div
            style={{
              background: "#fef2f2",
              border: "1px solid #fca5a5",
              borderRadius: 8,
              padding: 10,
              marginTop: 8,
              fontSize: 10,
              color: "#991b1b",
              lineHeight: 1.6,
            }}
          >
            ⚠️ <strong>Pažnja:</strong> Primanje Bürgergeld/Sozialhilfe/Grundsicherung obično
            diskvalifikuje za naturalizaciju. Izuzeci: Elternzeit, invaliditet, neizbježne okolnosti.
            Konsultuj se sa Einbürgerungsbehörde prije podnošenja zahtjeva.
          </div>
        )}
      </div>

      {/* SEKCIJA 6 */}
      <div style={S.sec}>
        <SecHeader num={6} title="F. Strafrechtliche Verurteilungen" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Liegen Vorstrafen vor (auch im Ausland)?</div>
          <Radio name="vorstrafen" value={f.vorstrafen} />
        </div>
        {f.vorstrafen === "ja" && (
          <Field
            label="Wenn ja: Begründung / Art der Verurteilung"
            value={f.vorstrafenBegruendung}
            onChange={(v) => set("vorstrafenBegruendung", v)}
          />
        )}
        <p style={{ fontSize: 10, color: "#6b7280", marginTop: 6, lineHeight: 1.5 }}>
          Hinweis: Geringfügige Verurteilungen (bis 90 Tagessätze Geldstrafe oder 3 Monate Freiheitsstrafe
          auf Bewährung) sind unschädlich.
        </p>
      </div>

      {/* SEKCIJA 7 */}
      <div style={S.sec}>
        <SecHeader num={7} title="G. Mehrstaatigkeit (Beibehaltung der bisherigen Staatsangehörigkeit)" />
        <div>
          <div style={S.lbl}>
            Ich beabsichtige, meine bisherige Staatsangehörigkeit beizubehalten:
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            {[
              { v: "ja", l: "Ja — möchte beibehalten" },
              { v: "nein", l: "Nein — verzichte freiwillig" },
            ].map((o) => (
              <label key={o.v} style={S.chk}>
                <input
                  type="radio"
                  name="mehrstaatigkeit"
                  checked={f.mehrstaatigkeit === o.v}
                  onChange={() => set("mehrstaatigkeit", o.v)}
                />
                <TOpt value={o.l} />
              </label>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 10, color: "#6b7280", marginTop: 8, lineHeight: 1.5 }}>
          Seit 27.06.2024 (StARModG) ist Mehrstaatigkeit generell zulässig — eine separate
          Beibehaltungsgenehmigung ist nicht mehr erforderlich.
        </p>
      </div>

      {/* SEKCIJA 8 — Children */}
      <div style={S.sec}>
        <SecHeader num={8} title="H. Miteinzubeziehende Kinder (optional)" />
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
          <thead>
            <tr>
              {["Vorname des Kindes", "Geburtsdatum", "Geschlecht", "Staatsangehörigkeit"].map((h) => (
                <th
                  key={h}
                  style={{
                    border: "1px solid #9ca3af",
                    padding: "4px 6px",
                    background: "#f3f4f6",
                    fontSize: 9,
                    color: "#6b7280",
                    textAlign: "left",
                    fontWeight: 600,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {f.kinder.map((k, i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <input
                    style={{ ...S.inp, border: "none" }}
                    value={k.vorname}
                    onChange={(e) => setKind(i, "vorname", e.target.value)}
                  />
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <input
                    style={{ ...S.inp, border: "none" }}
                    type="date"
                    value={k.geburtsdatum}
                    onChange={(e) => setKind(i, "geburtsdatum", e.target.value)}
                  />
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <select
                    style={{ ...S.inp, border: "none" }}
                    value={k.geschlecht}
                    onChange={(e) => setKind(i, "geschlecht", e.target.value)}
                  >
                    <option value="">—</option>
                    <option value="m">m</option>
                    <option value="w">w</option>
                    <option value="d">d</option>
                  </select>
                </td>
                <td style={{ border: "1px solid #9ca3af", padding: 2 }}>
                  <input
                    style={{ ...S.inp, border: "none" }}
                    value={k.staatsangeh}
                    onChange={(e) => setKind(i, "staatsangeh", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ fontSize: 10, color: "#6b7280", marginTop: 6, lineHeight: 1.5 }}>
          Ako se djeca uvezuju u zahtjev, dodaj 51 € pristojbe po djetetu.
        </p>
      </div>

      {/* SEKCIJA 9 — Loyalty */}
      <div style={S.sec}>
        <SecHeader num={9} title="I. Bekenntnis zur freiheitlich-demokratischen Grundordnung" />
        <div
          style={{
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: 8,
            padding: 10,
            marginBottom: 8,
            fontSize: 10,
            color: "#1e3a5f",
            lineHeight: 1.6,
          }}
        >
          „Ich bekenne mich zur freiheitlich-demokratischen Grundordnung des Grundgesetzes für die
          Bundesrepublik Deutschland und erkläre, dass ich keine Bestrebungen verfolge oder unterstütze,
          die gegen diese gerichtet sind. Ich erkenne die historische Verantwortung Deutschlands für
          die nationalsozialistische Unrechtsherrschaft und das daraus folgende Existenzrecht des
          Staates Israel an (gem. § 10 Abs. 1 Nr. 1 StAG)."
        </div>
        <label style={S.chk}>
          <input
            type="checkbox"
            checked={f.loyalitaet}
            onChange={(e) => set("loyalitaet", e.target.checked)}
          />
          <TOpt value="Ich bestätige die obige Erklärung." />
        </label>
      </div>

      {/* SEKCIJA 10 — Potpis */}
      <div style={S.sec}>
        <SecHeader num={10} title="J. Datum und Unterschrift" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>
          Ich versichere, dass alle Angaben vollständig und wahrheitsgemäß sind. Mir ist bekannt, dass
          falsche Angaben den Widerruf der Einbürgerung zur Folge haben können.
        </p>
        <div style={S.row}>
          <Field label="Ort" value={f.ort} onChange={(v) => set("ort", v)} />
          <Field label="Datum" type="date" value={f.datum} onChange={(v) => set("datum", v)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <Signature label="Unterschrift antragstellende Person" />
        </div>
      </div>
    </MusterFormBase>
  );
}
