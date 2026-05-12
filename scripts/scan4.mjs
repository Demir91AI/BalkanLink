import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
const urls = [
  ['Anlage_EK', 'https://www.arbeitsagentur.de/datei/anlageek_ba013053.pdf'],
  ['Anlage_EKS', 'https://www.arbeitsagentur.de/datei/anlageeks_ba013054.pdf'],
  ['Anlage_HG', 'https://www.arbeitsagentur.de/datei/anlagehg_ba013055.pdf'],
  ['Anlage_KDU', 'https://www.arbeitsagentur.de/datei/anlagekdu_ba013056.pdf'],
  ['Anlage_KI', 'https://www.arbeitsagentur.de/datei/anlageki_ba013057.pdf'],
  ['Anlage_MEB', 'https://www.arbeitsagentur.de/datei/anlagemeb_ba013060.pdf'],
  ['Anlage_SV', 'https://www.arbeitsagentur.de/datei/anlagesv_ba013063.pdf'],
  ['Anlage_UH1', 'https://www.arbeitsagentur.de/datei/anlageuh1_ba032990.pdf'],
  ['Anlage_VE', 'https://www.arbeitsagentur.de/datei/anlageve_ba013069.pdf'],
  ['Anlage_VM', 'https://www.arbeitsagentur.de/datei/anlagevm_ba013070.pdf'],
  ['Anlage_WEP', 'https://www.arbeitsagentur.de/datei/anlagewep_ba013071.pdf'],
];
for (const [name, url] of urls) {
  const r = await fetch(url, { redirect:'follow', headers: { 'User-Agent':'Mozilla/5.0' }});
  if (!r.ok) { console.log(`HTTP${r.status} ${name}`); continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  if (!buf.slice(0,4).toString().includes('PDF')) { console.log(`NOTPDF ${name}`); continue; }
  fs.writeFileSync(`/tmp/c_${name}.pdf`, buf);
  try {
    const d = await PDFDocument.load(buf, { ignoreEncryption: true });
    const f = d.getForm().getFields();
    console.log(`${f.length>0?'✅':'⚠️ '} ${name}: ${f.length} fields, ${(buf.length/1024).toFixed(0)}KB`);
  } catch(e) { console.log(`❌ ${name}: ${e.message.slice(0,60)}`); }
}
