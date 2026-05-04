import MusterFormBase from "@/components/muster/MusterFormBase";

const PDF_URL = "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf";
const PREVIEW_URL = "/muster/kindergeld/preview";

export default function AntragGenericMuster() {
  const openPreview = () => {
    window.open(PREVIEW_URL, "_blank", "noopener,noreferrer,width=900,height=1100");
  };

  return (
    <MusterFormBase
      rootId="kg1-launcher"
      title="Antrag Kindergeld — Musterformular"
      subtitle="KG1-Übungsvorlage BalkanLink — ohne staatliche Kennzeichen"
      pdfUrl={PDF_URL}
      pdfLabel="Preuzmi originalni Kindergeld PDF →"
      footerNote="Musterformular zur Orientierung • BalkanLink ist keine staatliche Stelle"
      lsKey="kg1-muster-data"
      formularId="kg1-muster"
      data={{}}
      onSave={() => { /* preview handles its own save */ }}
      onReset={() => {
        try { localStorage.removeItem("kg1-muster-data"); } catch { /* ignore */ }
      }}
    >
      <div style={{ padding: "8px 0 16px", textAlign: "center" }}>
        <div style={{
          background: "#FEF3C7",
          border: "2px solid #EAB308",
          borderRadius: 8,
          padding: 16,
          marginBottom: 20,
          fontSize: 13,
          color: "#78350f",
          textAlign: "left",
          lineHeight: 1.5,
        }}>
          <strong>⚠️ SAMO PRIMJER (Musterformular)</strong><br />
          Ovaj dokument je <strong>edukativni primjer</strong> u stilu originalnog Kindergeld zahtjeva (KG1).
          NE MOŽE se poslati u Behörde. Za zvaničan zahtjev koristite originalni PDF.
        </div>

        <p style={{ fontSize: 14, color: "#374151", marginBottom: 20, lineHeight: 1.6 }}>
          Musterformular se otvara u <strong>novom prozoru/tabu</strong> kao A4 dokument.
          Možeš koristiti <strong>zoom</strong> (Ctrl/⌘ +/− ili pinch na mobitelu),
          popunjavati polja (automatski se čuvaju lokalno) i preuzeti kao PDF.
        </p>

        <button
          onClick={openPreview}
          style={{
            background: "#EAB308",
            color: "#111",
            border: "none",
            padding: "14px 24px",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 4px 12px rgba(234,179,8,0.3)",
          }}
        >
          📄 Otvori Musterformular u novom prozoru →
        </button>

        <div style={{ marginTop: 20, fontSize: 12, color: "#6b7280" }}>
          Tvoji unosi se čuvaju lokalno u pretraživaču (localStorage). Brisanjem cookies-a nestaju.
        </div>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1d4ed8", fontSize: 13, fontWeight: 600 }}
          >
            🔗 Preuzmi originalni Kindergeld KG1 PDF (Familienkasse)
          </a>
        </div>
      </div>
    </MusterFormBase>
  );
}
