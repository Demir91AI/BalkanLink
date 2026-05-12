import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
const bytes = fs.readFileSync('/dev-server/public/muster/kg1-antrag-kindergeld-2026.pdf');
const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
console.log('Pages:', doc.getPageCount());
const form = doc.getForm();
const fields = form.getFields();
console.log('Total fields:', fields.length);
for (const f of fields) {
  console.log(`${f.constructor.name}\t${f.getName()}`);
}
