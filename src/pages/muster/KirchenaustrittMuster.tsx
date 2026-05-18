import { useState } from "react";
import MusterFormBase, { S, Field, SecHeader, Signature, TOpt } from "@/components/muster/MusterFormBase";
import MusterDisclaimer from "@/components/muster/MusterDisclaimer";
import PrivacyGuarantee from "@/components/muster/PrivacyGuarantee";

const LS_KEY = "kirchenaustritt-muster-data";

const initial = () => ({
  familienname: "", geburtsname: "", vorname: "", geburtsdatum: "", geburtsort: "", staatsangehoerigkeit: "",
  strasse: "", plz: "", ort: "", telefon: "",
  religionsgemeinschaft: "", andereReligion: "",
  ausweis: "", ausweisnummer: "", gueltigBis: "",
  standesamt: "", sigOrt: "", sigDatum: "",
});

export default function KirchenaustrittMuster() {
  const [f, setF] = useState(() => { try { const s = localStorage.getItem(LS_KEY); if (s) return { ...initial(), ...JSON.parse(s) }; } catch {} return initial(); });
  const set = (k: string, v: string) => setF(p => ({ ...p, [k]: v }));

  return (
    <MusterFormBase rootId="ka-root" title="Erklärung zum Kirchenaustritt" subtitle="Musterformular — BalkanLink — nur zur Orientierung" pdfUrl="https://www.kirchenaustritt.de" pdfLabel="Mehr Infos zu Kirchenaustritt →" footerNote="Musterformular zur Orientierung • Alle Angaben ohne Gewähr • Original beim zuständigen Standesamt / Amtsgericht einreichen • BalkanLink ist keine staatliche Stelle" lsKey={LS_KEY} formularId="kirchenaustritt" data={f} onSave={() => localStorage.setItem(LS_KEY, JSON.stringify(f))} onReset={() => { localStorage.removeItem(LS_KEY); setF(initial()); }}>

      <MusterDisclaimer formKey="kirchenaustritt"><></></MusterDisclaimer>
      <PrivacyGuarantee />
      <div style={{ marginBottom: 18, padding: 14, background: "#FFFBEB", border: "2px solid #F59E0B", borderRadius: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E", marginBottom: 6 }}>🏛️ Kirchenaustritt se prijavljuje LIČNO u Standesamt ili Amtsgericht</div>
        <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.55 }}>Istupanje iz crkve zahtijeva lični dolazak u nadležni Standesamt ili Amtsgericht uz ličnu kartu ili pasoš i plaćanje administrativne takse (5–30 €). U nekim pokrajinama dostupan je i online servis. Ovaj vodič te priprema za proceduru i objašnjava šta tačno treba reći referentu.</div>
      </div>

      <div style={S.sec}>
        <SecHeader num={1} title="Persönliche Daten" />
        <div style={S.row}><Field label="Familienname" value={f.familienname} onChange={v => set("familienname", v)} /><Field label="Geburtsname (falls abweichend)" value={f.geburtsname} onChange={v => set("geburtsname", v)} /></div>
        <div style={S.row}><Field label="Vorname(n)" value={f.vorname} onChange={v => set("vorname", v)} /></div>
        <div style={S.row}><Field label="Geburtsdatum" type="date" value={f.geburtsdatum} onChange={v => set("geburtsdatum", v)} /><Field label="Geburtsort" value={f.geburtsort} onChange={v => set("geburtsort", v)} /></div>
        <div style={S.row}><Field label="Staatsangehörigkeit" value={f.staatsangehoerigkeit} onChange={v => set("staatsangehoerigkeit", v)} /></div>
        <div style={S.row}><Field label="Straße, Hausnr." flex={2} value={f.strasse} onChange={v => set("strasse", v)} /><Field label="PLZ" width={80} value={f.plz} onChange={v => set("plz", v)} /><Field label="Ort" flex={1} value={f.ort} onChange={v => set("ort", v)} /></div>
        <div style={S.row}><Field label="Telefon" value={f.telefon} onChange={v => set("telefon", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={2} title="Religionsgemeinschaft" />
        <p style={{ fontSize: 10, fontStyle: "italic", margin: "0 0 8px" }}>Ich erkläre hiermit meinen Austritt aus:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Römisch-Katholische Kirche", "Evangelische Kirche (EKD)", "Evangelisch-Lutherische Kirche", "Evangelisch-Reformierte Kirche", "Altkatholische Kirche"].map(r => (
            <label key={r} style={S.chk}><input type="radio" name="religion" checked={f.religionsgemeinschaft === r} onChange={() => set("religionsgemeinschaft", r)} />{r}</label>
          ))}
          <label style={S.chk}><input type="radio" name="religion" checked={f.religionsgemeinschaft === "Andere"} onChange={() => set("religionsgemeinschaft", "Andere")} /><TOpt value="Andere Religionsgemeinschaft:" /></label>
          {f.religionsgemeinschaft === "Andere" && <input style={{ ...S.inp, width: "100%" }} value={f.andereReligion} onChange={e => set("andereReligion", e.target.value)} />}
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={3} title="Hinweise" />
        <div style={{ background: "#eff6ff", border: "1px solid #93c5fd", borderRadius: 4, padding: 8, fontSize: 10, color: "#1e40af" }}>
          Der Kirchenaustritt wird wirksam mit Ablauf des Kalendermonats, in dem die Erklärung abgegeben wird. Gebühr: je nach Bundesland zwischen 0 € und 30 €. Ausweis/Pass zur Vorlage beim Standesamt mitbringen.
        </div>
      </div>

      <div style={S.sec}>
        <SecHeader num={4} title="Identitätsnachweis" />
        <div style={{ marginBottom: 6 }}><div style={S.lbl}>Ausweisdokument</div>
          <div style={{ display: "flex", gap: 16 }}>{["Personalausweis", "Reisepass"].map(a => (<label key={a} style={S.chk}><input type="radio" name="ausweis" checked={f.ausweis === a} onChange={() => set("ausweis", a)} />{a}</label>))}</div>
        </div>
        <div style={S.row}><Field label="Ausweisnummer" value={f.ausweisnummer} onChange={v => set("ausweisnummer", v)} /><Field label="Gültig bis" type="date" value={f.gueltigBis} onChange={v => set("gueltigBis", v)} /></div>
      </div>

      <div style={S.sec}>
        <SecHeader num={5} title="Datum und Unterschrift" />
        <div style={S.row}><Field label="Ort" value={f.sigOrt} onChange={v => set("sigOrt", v)} /><Field label="Datum" type="date" value={f.sigDatum} onChange={v => set("sigDatum", v)} /></div>
        <div style={{ marginTop: 12 }}><Signature label="Unterschrift" /></div>
        <div style={{ marginTop: 8 }}><Field label="Zuständiges Standesamt / Amtsgericht" value={f.standesamt} onChange={v => set("standesamt", v)} /></div>
      </div>

    </MusterFormBase>
  );
}
