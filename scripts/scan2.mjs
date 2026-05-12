import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
const cands = [
  ['UStErklaerung_Muster_2024', 'https://www.bundesfinanzministerium.de/Content/DE/Downloads/BMF_Schreiben/Steuerarten/Umsatzsteuer/2023-11-06-muster-der-umsatzsteuererklaerung-2024.pdf?__blob=publicationFile&v=4'],
  // ELSTER printable forms via ESt portal - usually XFA. Try BZSt:
  ['Steuer_ID_Antrag_BZSt', 'https://www.bzst.de/SharedDocs/Downloads/DE/Steuerliche_IDNr/antrag_idnr.pdf?__blob=publicationFile&v=4'],
  // BAMF - integration  
  ['BAMF_Verpflichtungserklaerung', 'https://www.bamf.de/SharedDocs/Anlagen/DE/Forschung/Verpflichtungserklaerung.pdf?__blob=publicationFile&v=2'],
  // Bundeswehr Personalausweis - none
  // Krankenkasse — TK actual 
  ['TK_Mitgliedschaft', 'https://www.tk.de/resource/blob/2007282/d4f3c5c5b1c9e6f3e2c5e8b4f3a7e8c9/mitgliedsantrag-data.pdf'],
  // Familienkasse Anlage Auslandskind (KG 51) 
  ['KG51_Anlage_Auslandskind', 'https://www.arbeitsagentur.de/datei/kg51-anlage-auslandskind_ba014286.pdf'],
  ['KG2_Anlage_Kind', 'https://www.arbeitsagentur.de/datei/kg2-anlage-kind_ba036591.pdf'],
  ['KG2a_Anlage_18plus', 'https://www.arbeitsagentur.de/datei/kg2a-anlage-kind-uebe-18_ba036592.pdf'],
  // ALG II / Bürgergeld Anlagen
  ['BG_Anlage_KAS', 'https://www.arbeitsagentur.de/datei/anlage-kas_ba036020.pdf'],
  ['BG_Anlage_EK', 'https://www.arbeitsagentur.de/datei/anlage-ek_ba036021.pdf'],
  ['BG_Anlage_KdU', 'https://www.arbeitsagentur.de/datei/anlage-kdu_ba036022.pdf'],
  ['BG_Anlage_VM', 'https://www.arbeitsagentur.de/datei/anlage-vm_ba036023.pdf'],
];
for (const [name, url] of cands) {
  try {
    const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!r.ok) { console.log(`HTTP${r.status} ${name}`); continue; }
    const buf = Buffer.from(await r.arrayBuffer());
    if (!buf.slice(0,4).toString().includes('PDF')) { console.log(`NOTPDF ${name} (${buf.length}B)`); continue; }
    fs.writeFileSync(`/tmp/c_${name}.pdf`, buf);
    try {
      const d = await PDFDocument.load(buf, { ignoreEncryption: true });
      const f = d.getForm().getFields();
      console.log(`${f.length>0?'✅':'⚠️ '} ${name}: ${f.length} fields, ${(buf.length/1024).toFixed(0)}KB`);
    } catch(e) { console.log(`LOAD-ERR ${name}`); }
  } catch(e) { console.log(`FETCH-ERR ${name}: ${e.message.slice(0,60)}`); }
}
