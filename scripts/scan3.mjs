import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
const H = { 
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'application/pdf,*/*',
  'Accept-Language': 'de-DE,de;q=0.9',
  'Referer': 'https://www.arbeitsagentur.de/'
};
const cands = [
  // BG anlages — different IDs that might exist
  ['BG_Anlage_EK', 'https://www.arbeitsagentur.de/datei/anlage-ek_ba036020.pdf'],
  ['BG_Anlage_KAS', 'https://www.arbeitsagentur.de/datei/anlage-kas_ba036021.pdf'],
  ['BG_Anlage_KDU', 'https://www.arbeitsagentur.de/datei/anlage-kdu_ba036022.pdf'],
  ['BG_Anlage_VE', 'https://www.arbeitsagentur.de/datei/anlage-ve_ba036023.pdf'],
  ['BG_Anlage_VM', 'https://www.arbeitsagentur.de/datei/anlage-vm_ba036024.pdf'],
  ['BG_Anlage_KI', 'https://www.arbeitsagentur.de/datei/anlage-ki_ba036025.pdf'],
  ['BG_Anlage_HG', 'https://www.arbeitsagentur.de/datei/anlage-hg_ba036026.pdf'],
  ['BG_Anlage_WEP', 'https://www.arbeitsagentur.de/datei/anlage-wep_ba036027.pdf'],
];
for (const [name, url] of cands) {
  try {
    const r = await fetch(url, { redirect:'follow', headers: H });
    const buf = Buffer.from(await r.arrayBuffer());
    if (!r.ok || !buf.slice(0,4).toString().includes('PDF')) { console.log(`HTTP${r.status} ${name}`); continue; }
    fs.writeFileSync(`/tmp/c_${name}.pdf`, buf);
    try {
      const d = await PDFDocument.load(buf, { ignoreEncryption: true });
      const f = d.getForm().getFields();
      console.log(`${f.length>0?'✅':'⚠️ '} ${name}: ${f.length} fields, ${(buf.length/1024).toFixed(0)}KB`);
    } catch(e) { console.log(`LOAD-ERR ${name}: ${e.message.slice(0,60)}`); }
  } catch(e) { console.log(`FETCH ${name}: ${e.message.slice(0,60)}`); }
}
