import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
const bytes = fs.readFileSync('/tmp/kiz-ank.pdf');
const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
const form = doc.getForm();
const fields = form.getFields();
console.log('TOTAL FIELDS:', fields.length);
for (const f of fields) {
  console.log(f.constructor.name, '|', f.getName());
}
