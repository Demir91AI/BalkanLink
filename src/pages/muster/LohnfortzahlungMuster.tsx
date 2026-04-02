import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature } from "@/components/muster/MusterFormBase";

const LS_KEY = "lohnfortzahlung-muster-data";
const PDF_URL = "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung/online-ratgeber-krankenversicherung/krankenversicherung/entgeltfortzahlung.html";

const initial = () => ({
  anFamilienname: "", anVorname: "", anGeburtsdatum: "", anPersonalnr: "",
  anStrasse: "", anPlz: "", anOrt: "",
  anTelefon: "", anEmail: "",
  anKrankenkasse: "", anVersichertennr: "",
  agName: "", agAnschrift: "", agAbteilung: "", agAnsprechpartner: "",
  beschaeftigtSeit: "", wochenstunden: "", bruttoMonat: "",
  arbeitsverhaeltnis: "",
  erkrankungAb: "", voraussichtlichBis: "", erstbescheinigung: "",
  arbeitsunfall: "", unfallDatum: "", unfallOrt: "",
  arztName: "", arztAnschrift: "", arztTelefon: "",
  diagnoseMitgeteilt: "",
  vorerkrankungJa: "", vorerkrankungVon: "", vorerkrankungBis: "", vorerkrankungGrund: "",
  stationaerJa: "", krankenhausName: "", stationaerVon: "", stationaerBis: "",
  kindKrankJa: "", kindName: "", kindGeb: "", kindKrankVon: "", kindKrankBis: "",
  krankengeldbeantragt: "", krankengelAb: "",
  sigOrt: "", sigDatum: "",
});

export default function LohnfortzahlungMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="lf-root" title="Krankmeldung / Lohnfortzahlung im Krankheitsfall" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl={PDF_URL} pdfLabel="Infos zur Entgeltfortzahlung (BMG) →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Arbeitsunfähigkeitsbescheinigung (AU) wird digital vom Arzt an die Krankenkasse übermittelt • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <div style={S.sec}>
        <SecHeader num={1} title="Angaben zur / zum Beschäftigten" />
        <div style={S.row}><Field label="Familienname" value={f.anFamilienname} onChange={v => set("anFamilienname", v)} /><Field label="Vorname" value={f.anVorname} onChange={v => set("anVorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum (tt.mm.jjjj)" type="date" value={f.anGeburtsdatum} onChange={v => set("anGeburtsdatum", v)} /><Field label="Personalnummer" value={f.anPersonalnr} onChange={v => set("anPersonalnr", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.anStrasse} onChange={v => set("anStrasse", v)} /><Field label="PLZ" width={80} value={f.anPlz} onChange={v => set("anPlz", v)} /><Field label="Ort" flex={1} value={f.anOrt} onChange={v => set("anOrt", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.anTelefon} onChange={v => set("anTelefon", v)} /><Field label="E-Mail" value={f.anEmail} onChange={v => set("anEmail", v)} /></div>
        <div style={S.row}><Field label="Krankenkasse" value={f.anKrankenkasse} onChange={v => set("anKrankenkasse", v)} /><Field label="Versichertennummer" value={f.anVersichertennr} onChange={v => set("anVersichertennr", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Angaben zum Arbeitgeber" />
        <div style={S.row}><Field label="Name / Firma" value={f.agName} onChange={v => set("agName", v)} /><Field label="Abteilung" value={f.agAbteilung} onChange={v => set("agAbteilung", v)} /></div>
        <div style={S.row}><Field label="Anschrift" flex={2} value={f.agAnschrift} onChange={v => set("agAnschrift", v)} /><Field label="Ansprechpartner/in" value={f.agAnsprechpartner} onChange={v => set("agAnsprechpartner", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Beschäftigungsverhältnis" />
        <div style={S.row}><Field label="Beschäftigt seit" type="date" value={f.beschaeftigtSeit} onChange={v => set("beschaeftigtSeit", v)} /><Field label="Wochenstunden" value={f.wochenstunden} onChange={v => set("wochenstunden", v)} /><Field label="Bruttolohn (€/Monat)" value={f.bruttoMonat} onChange={v => set("bruttoMonat", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Art des Arbeitsverhältnisses</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Unbefristet", "Befristet", "Teilzeit", "Minijob", "Ausbildung", "Probezeit"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="arbeitsverhaeltnis" checked={f.arbeitsverhaeltnis === o} onChange={() => set("arbeitsverhaeltnis", o)} />{o}</label>
            ))}
          </div>
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Arbeitsunfähigkeit (Krankmeldung)" />
        <div style={S.row}><Field label="Arbeitsunfähig seit (Datum)" type="date" value={f.erkrankungAb} onChange={v => set("erkrankungAb", v)} /><Field label="Voraussichtlich bis" type="date" value={f.voraussichtlichBis} onChange={v => set("voraussichtlichBis", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Art der Bescheinigung</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {["Erstbescheinigung", "Folgebescheinigung"].map(o => (
              <label key={o} style={S.chk}><input type="radio" name="erstbescheinigung" checked={f.erstbescheinigung === o} onChange={() => set("erstbescheinigung", o)} />{o}</label>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Arbeitsunfall / Berufskrankheit?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="arbeitsunfall" checked={f.arbeitsunfall === o} onChange={() => set("arbeitsunfall", o)} />{o}</label>))}</div>
        </div>
        {f.arbeitsunfall === "Ja" && (
          <div style={S.row}><Field label="Unfalldatum" type="date" value={f.unfallDatum} onChange={v => set("unfallDatum", v)} /><Field label="Unfallort" value={f.unfallOrt} onChange={v => set("unfallOrt", v)} /></div>
        )}
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Behandelnder Arzt / Ärztin" />
        <div style={S.row}><Field label="Name des Arztes / der Ärztin" value={f.arztName} onChange={v => set("arztName", v)} /></div>
        <div style={S.row}><Field label="Praxisanschrift" flex={2} value={f.arztAnschrift} onChange={v => set("arztAnschrift", v)} /><Field label="Telefon" value={f.arztTelefon} onChange={v => set("arztTelefon", v)} /></div>
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Diagnose dem Arbeitgeber mitgeteilt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="diagnoseMitgeteilt" checked={f.diagnoseMitgeteilt === o} onChange={() => set("diagnoseMitgeteilt", o)} />{o}</label>))}</div>
        </div>
        <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 4, padding: 8, fontSize: 10, color: "#92400e", marginTop: 4 }}>
          ℹ️ Hinweis: Der Arbeitgeber hat keinen Anspruch auf die Diagnose. Die AU-Bescheinigung (gelber Schein) wird seit 2023 digital vom Arzt an die Krankenkasse übermittelt (eAU). Der Arbeitgeber ruft sie elektronisch ab.
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={6} title="Vorerkrankung (gleiche Diagnose)" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>In den letzten 12 Monaten wegen gleicher Krankheit arbeitsunfähig?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="vorerkrankungJa" checked={f.vorerkrankungJa === o} onChange={() => set("vorerkrankungJa", o)} />{o}</label>))}</div>
        </div>
        {f.vorerkrankungJa === "Ja" && <>
          <div style={S.row}><Field label="Von" type="date" value={f.vorerkrankungVon} onChange={v => set("vorerkrankungVon", v)} /><Field label="Bis" type="date" value={f.vorerkrankungBis} onChange={v => set("vorerkrankungBis", v)} /></div>
          <div style={S.row}><Field label="Grund / Zusammenhang" flex={2} value={f.vorerkrankungGrund} onChange={v => set("vorerkrankungGrund", v)} /></div>
        </>}
        <div style={{ background: "#fef3c7", border: "1px solid #f59e0b", borderRadius: 4, padding: 8, fontSize: 10, color: "#92400e", marginTop: 8 }}>
          ℹ️ Wichtig: Bei gleicher Krankheit besteht der Anspruch auf Lohnfortzahlung für max. 6 Wochen (42 Kalendertage). Bei Vorerkrankung innerhalb von 12 Monaten werden die Tage zusammengerechnet.
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={7} title="Stationärer Aufenthalt" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Stationäre Behandlung (Krankenhaus)?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="stationaerJa" checked={f.stationaerJa === o} onChange={() => set("stationaerJa", o)} />{o}</label>))}</div>
        </div>
        {f.stationaerJa === "Ja" && <>
          <div style={S.row}><Field label="Krankenhaus" value={f.krankenhausName} onChange={v => set("krankenhausName", v)} /></div>
          <div style={S.row}><Field label="Von" type="date" value={f.stationaerVon} onChange={v => set("stationaerVon", v)} /><Field label="Bis" type="date" value={f.stationaerBis} onChange={v => set("stationaerBis", v)} /></div>
        </>}
      </div>

      <div style={S.sec}>
        <SecHeader num={8} title="Kinderkrankengeld (§ 45 SGB V)" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Freistellung wegen erkranktem Kind?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein"].map(o => (<label key={o} style={S.chk}><input type="radio" name="kindKrankJa" checked={f.kindKrankJa === o} onChange={() => set("kindKrankJa", o)} />{o}</label>))}</div>
        </div>
        {f.kindKrankJa === "Ja" && <>
          <div style={S.row}><Field label="Name des Kindes" value={f.kindName} onChange={v => set("kindName", v)} /><Field label="Geburtsdatum" type="date" value={f.kindGeb} onChange={v => set("kindGeb", v)} /></div>
          <div style={S.row}><Field label="Krank von" type="date" value={f.kindKrankVon} onChange={v => set("kindKrankVon", v)} /><Field label="Krank bis" type="date" value={f.kindKrankBis} onChange={v => set("kindKrankBis", v)} /></div>
        </>}
      </div>

      <div style={S.sec}>
        <SecHeader num={9} title="Krankengeld (nach 6 Wochen)" />
        <div style={{ marginBottom: 8 }}>
          <div style={S.lbl}>Krankengeld bei der Krankenkasse beantragt?</div>
          <div style={{ display: "flex", gap: 16 }}>{["Ja", "Nein", "Noch nicht"].map(o => (<label key={o} style={S.chk}><input type="radio" name="krankengeldbeantragt" checked={f.krankengeldbeantragt === o} onChange={() => set("krankengeldbeantragt", o)} />{o}</label>))}</div>
        </div>
        {f.krankengeldbeantragt === "Ja" && (
          <div style={S.row}><Field label="Krankengeld ab (Datum)" type="date" value={f.krankengelAb} onChange={v => set("krankengelAb", v)} /></div>
        )}
        <div style={{ background: "#dbeafe", border: "1px solid #3b82f6", borderRadius: 4, padding: 8, fontSize: 10, color: "#1e40af", marginTop: 8 }}>
          ℹ️ Nach 6 Wochen Lohnfortzahlung zahlt die Krankenkasse Krankengeld (ca. 70% des Bruttolohns, max. 90% Netto). Antrag bei der Krankenkasse stellen. Krankengeld wird max. 78 Wochen innerhalb von 3 Jahren gezahlt.
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={10} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift Arbeitnehmer/in" /></div>
      </div>

    </MusterFormBase>
  );
}
