import { useNavigate } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

/* ────────────── PDF styles ────────────── */
const s = StyleSheet.create({
  page: { padding: 28, fontSize: 8, fontFamily: "Helvetica", color: "#111" },
  header: { marginBottom: 10, borderBottom: "1.5pt solid #333", paddingBottom: 6 },
  title: { fontSize: 16, fontWeight: "bold", fontFamily: "Helvetica-Bold" },
  subtitle: { fontSize: 7, color: "#666", marginTop: 2 },
  secRow: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#e5e7eb",
    padding: "3 6", marginTop: 8, borderTop: "1pt solid #6b7280", borderBottom: "1pt solid #6b7280",
  },
  secNum: {
    width: 14, height: 14, border: "1.5pt solid #111", marginRight: 6,
    alignItems: "center", justifyContent: "center",
  },
  secNumText: { fontSize: 8, fontFamily: "Helvetica-Bold" },
  secTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", textTransform: "uppercase" },
  row: { flexDirection: "row", borderBottom: "0.5pt solid #9ca3af" },
  cell: { borderRight: "0.5pt solid #9ca3af", padding: "3 5", justifyContent: "flex-start" },
  cellLast: { padding: "3 5", justifyContent: "flex-start" },
  lbl: { fontSize: 6.5, color: "#555", marginBottom: 1.5, fontFamily: "Helvetica-Bold" },
  val: { fontSize: 8, minHeight: 11, borderBottom: "0.5pt solid #bbb", marginTop: 1 },
  valPlaceholder: { fontSize: 7, color: "#aaa", minHeight: 11, borderBottom: "0.5pt solid #bbb", marginTop: 1 },
  note: { fontSize: 6, color: "#888", marginTop: 1 },
  checkRow: { flexDirection: "row", flexWrap: "wrap", gap: 2, marginTop: 2 },
  checkItem: { flexDirection: "row", alignItems: "center", marginRight: 8, marginBottom: 2 },
  checkBox: { width: 7, height: 7, border: "0.75pt solid #555", marginRight: 3 },
  checkLabel: { fontSize: 7 },
  sigLine: { borderBottom: "0.75pt solid #333", height: 28, marginTop: 6 },
  sigCaption: { fontSize: 6, color: "#666", marginTop: 2 },
  footer: {
    position: "absolute", bottom: 16, left: 28, right: 28,
    borderTop: "0.5pt solid #ccc", paddingTop: 4, textAlign: "center",
  },
  footerText: { fontSize: 6, color: "#999" },
  fullRow: { borderBottom: "0.5pt solid #9ca3af", padding: "3 5" },
});

/* ────────────── helpers ────────────── */
const Sec = ({ num, title }: { num: string; title: string }) => (
  <View style={s.secRow}>
    <View style={s.secNum}><Text style={s.secNumText}>{num}</Text></View>
    <Text style={s.secTitle}>{title}</Text>
  </View>
);

const Field = ({ label, placeholder, width, note }: { label: string; placeholder?: string; width?: string | number; note?: string }) => (
  <View style={[s.cell, width ? { width } : { flex: 1 }]}>
    <Text style={s.lbl}>{label}</Text>
    <Text style={s.valPlaceholder}>{placeholder || " "}</Text>
    {note && <Text style={s.note}>{note}</Text>}
  </View>
);

const FieldLast = ({ label, placeholder, width, note }: { label: string; placeholder?: string; width?: string | number; note?: string }) => (
  <View style={[s.cellLast, width ? { width } : { flex: 1 }]}>
    <Text style={s.lbl}>{label}</Text>
    <Text style={s.valPlaceholder}>{placeholder || " "}</Text>
    {note && <Text style={s.note}>{note}</Text>}
  </View>
);

const CheckBoxes = ({ label, options }: { label: string; options: string[] }) => (
  <View style={s.fullRow}>
    <Text style={s.lbl}>{label}</Text>
    <View style={s.checkRow}>
      {options.map((o) => (
        <View key={o} style={s.checkItem}>
          <View style={s.checkBox} />
          <Text style={s.checkLabel}>{o}</Text>
        </View>
      ))}
    </View>
  </View>
);

/* ────────────── PDF Document ────────────── */
const KG1Document = () => (
  <Document title="KG1 Musterformular — BalkanLink" author="BalkanLink">
    <Page size="A4" style={s.page}>
      {/* Header */}
      <View style={s.header}>
        <Text style={s.title}>Antrag auf Kindergeld</Text>
        <Text style={s.subtitle}>Musterformular KG 1 — BalkanLink — nur zur Orientierung</Text>
      </View>

      {/* ── 1 ── */}
      <Sec num="1" title="Angaben zur antragstellenden Person" />
      <View style={s.row}>
        <View style={[s.cell, { flex: 1 }]}>
          <Text style={s.lbl}>Steuerliche Identifikationsnummer (zwingend)</Text>
          <Text style={s.valPlaceholder}>11 Ziffern — z.B. 65 929 310 054</Text>
          <Text style={s.note}>⚠ Nicht die Steuernummer (12/345/67890)</Text>
        </View>
      </View>
      <View style={s.row}>
        <Field label="Familienname" width="30%" />
        <Field label="Titel" width="12%" placeholder="Dr." />
        <Field label="Vorname" width="28%" />
        <FieldLast label="Geburtsname / früherer Name" />
      </View>
      <View style={s.row}>
        <Field label="Geburtsdatum" width="18%" placeholder="TT.MM.JJJJ" />
        <Field label="Geburtsort" width="22%" />
        <Field label="Geschlecht" width="15%" placeholder="m / w / d" />
        <FieldLast label="Staatsangehörigkeit" placeholder="z.B. BiH" note="Nicht EU/EWR? Aufenthaltstitel beifügen!" />
      </View>
      <View style={s.row}>
        <Field label="Straße / Hausnr." width="40%" />
        <Field label="PLZ" width="12%" placeholder="12345" />
        <Field label="Wohnort" width="28%" />
        <FieldLast label="Staat" placeholder="Deutschland" />
      </View>
      <CheckBoxes
        label="Familienstand"
        options={["ledig", "verheiratet", "eingetragene Lebenspartnerschaft", "geschieden", "verwitwet", "dauernd getrennt lebend"]}
      />

      {/* ── 2 ── */}
      <Sec num="2" title="Angaben zum Ehepartner / Lebenspartner" />
      <View style={s.row}>
        <Field label="Steuerliche Identifikationsnummer" width="30%" placeholder="11 Ziffern" />
        <Field label="Familienname, Vorname, Titel" />
        <Field label="Geburtsdatum" width="16%" placeholder="TT.MM.JJJJ" />
        <FieldLast label="Staatsangehörigkeit" width="18%" />
      </View>
      <View style={s.row}>
        <Field label="Geschlecht" width="14%" placeholder="m / w / d" />
        <FieldLast label="Anschrift (wenn abweichend)" placeholder="Nur ausfüllen wenn abweichend" />
      </View>

      {/* ── 3 ── */}
      <Sec num="3" title="Angaben zum Zahlungsweg" />
      <View style={s.row}>
        <Field label="IBAN" width="40%" placeholder="DE00 0000 0000 0000 0000 00" />
        <Field label="BIC" width="20%" />
        <FieldLast label="Bank / Finanzinstitut" />
      </View>
      <CheckBoxes
        label="Kontoinhaber(in) ist"
        options={["antragstellende Person (Nr. 1)", "nicht antragstellende Person, sondern: _______________"]}
      />

      {/* ── 4 ── */}
      <Sec num="4" title="Bescheid-Empfänger (optional)" />
      <View style={s.fullRow}>
        <Text style={s.lbl}>Bescheid an andere Person senden?</Text>
        <View style={s.row}>
          <Field label="Name" width="35%" />
          <FieldLast label="Anschrift" />
        </View>
      </View>

      {/* ── 5 ── */}
      <Sec num="5" title="Angaben zu Kindern" />
      <View style={s.fullRow}>
        <Text style={[s.note, { marginBottom: 3 }]}>Für jedes Kind eine gesonderte „Anlage Kind" einreichen.</Text>
        <View style={s.row}>
          <Field label="Anzahl Anlage Kind" width="25%" placeholder="1" />
          <Field label="Wurde bereits Kindergeld bezogen?" width="35%" placeholder="Nein / Ja" />
          <Field label="Kindergeld-Nr." width="20%" />
          <FieldLast label="Familienkasse" />
        </View>
      </View>

      {/* ── 6 ── */}
      <Sec num="6" title="Datum und Unterschrift" />
      <View style={s.fullRow}>
        <Text style={[s.note, { fontStyle: "italic", marginBottom: 4 }]}>
          Ich versichere, dass meine Angaben in diesem Antrag und den beigefügten Unterlagen vollständig und wahrheitsgemäß sind.
        </Text>
        <View style={s.row}>
          <Field label="Ort" width="40%" />
          <FieldLast label="Datum" placeholder="TT.MM.JJJJ" />
        </View>
        <View style={{ flexDirection: "row", gap: 16, marginTop: 4 }}>
          <View style={{ flex: 1 }}>
            <View style={s.sigLine} />
            <Text style={s.sigCaption}>Unterschrift antragstellende Person</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.sigLine} />
            <Text style={s.sigCaption}>Unterschrift Ehepartner/Lebenspartner</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={s.footer}>
        <Text style={s.footerText}>
          Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original bei Familienkasse einreichen
        </Text>
      </View>
    </Page>
  </Document>
);

/* ────────────── Page wrapper ────────────── */
const KindergeldMusterPDF = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0B0F1A" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2" style={{ background: "#0d1526" }}>
        <button onClick={() => navigate(-1)} className="text-sm" style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>← Nazad</button>
        <span className="font-bold" style={{ color: "#EAB308", fontSize: 15 }}>BL BalkanLink</span>
        <button onClick={() => navigate("/")} className="text-sm" style={{ color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}>🏠</button>
      </div>

      {/* Disclaimer */}
      <div className="mx-auto w-full" style={{ maxWidth: 820, padding: "12px 16px 0" }}>
        <div style={{ background: "#fefce8", border: "2px solid #EAB308", borderRadius: 6, padding: "10px 14px", marginBottom: 10 }}>
          <p style={{ fontWeight: "bold", color: "#92400e", fontSize: 12, margin: "0 0 4px" }}>⚠️ Musterformular — nur zur Orientierung</p>
          <p style={{ color: "#78350f", fontSize: 11, margin: "0 0 6px" }}>
            Übungsversion des KG1-Formulars der Bundesagentur für Arbeit (Stand September 2025). Ersetzt nicht das offizielle Dokument.
          </p>
          <a
            href="https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1d4ed8", fontSize: 11 }}
          >
            🔗 Zum offiziellen KG1-Formular →
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1" style={{ minHeight: 0 }}>
        <PDFViewer width="100%" height="100%" style={{ border: "none" }}>
          <KG1Document />
        </PDFViewer>
      </div>
    </div>
  );
};

export default KindergeldMusterPDF;
