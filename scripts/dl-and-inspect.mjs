import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
const anlagen = [
  ['ek', 'anlageek_ba013053.pdf'],
  ['eks', 'anlageeks_ba013054.pdf'],
  ['hg', 'anlagehg_ba013055.pdf'],
  ['kdu', 'anlagekdu_ba013056.pdf'],
  ['ki', 'anlageki_ba013057.pdf'],
  ['meb', 'anlagemeb_ba013060.pdf'],
  ['sv', 'anlagesv_ba013063.pdf'],
  ['uh1', 'anlageuh1_ba032990.pdf'],
  ['ve', 'anlageve_ba013069.pdf'],
  ['vm', 'anlagevm_ba013070.pdf'],
  ['wep', 'anlagewep_ba013071.pdf'],
];
const outDir = 'public/muster';
fs.mkdirSync(outDir, { recursive: true });
const allFields = {};
for (const [code, file] of anlagen) {
  const url = `https://www.arbeitsagentur.de/datei/${file}`;
  const r = await fetch(url, { redirect:'follow', headers:{'User-Agent':'Mozilla/5.0'}});
  const buf = Buffer.from(await r.arrayBuffer());
  const dest = path.join(outDir, `bg-anlage-${code}-2026.pdf`);
  fs.writeFileSync(dest, buf);
  const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
  const fields = doc.getForm().getFields().map(f => ({ type: f.constructor.name, name: f.getName() }));
  allFields[code] = fields;
  console.log(`${code}: ${fields.length} fields → ${dest}`);
}
fs.writeFileSync('scripts/anlagen-fields.json', JSON.stringify(allFields, null, 2));
console.log('Saved scripts/anlagen-fields.json');
