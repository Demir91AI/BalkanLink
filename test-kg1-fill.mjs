import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { buildKindergeldFieldFills, initialKindergeldData } from './src/lib/kindergeld-fields.ts';

const bytes = fs.readFileSync('public/muster/kg1-antrag-kindergeld-2026.pdf');
const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
const form = doc.getForm();

const data = {
  ...initialKindergeldData(),
  steuerId1: '12345678901',
  titel: '',
  familienname: 'Kovač',
  vorname: 'Maja',
  geburtsname: 'Petrović',
  geburtsdatum: '1990-03-15',
  geburtsort: 'Sarajevo',
  geschlecht: 'weiblich',
  staatsangehoerigkeit: 'bosnisch-herzegowinisch',
  anschrift: 'Berliner Str. 45, 10115 Berlin',
  familienstand: 'verheiratet',
  familienstandSeit: '2018-06-20',
  hasPartner: true,
  steuerId2: '98765432109',
  pFamilienname: 'Kovač',
  pVorname: 'Damir',
  pGeburtsname: '',
  pGeburtsdatum: '1988-07-22',
  pStaatsangehoerigkeit: 'bosnisch-herzegowinisch',
  pGeschlecht: 'männlich',
  pAnschrift: 'Berliner Str. 45, 10115 Berlin',
  iban: 'DE89370400440532013000',
  bic: 'COBADEFFXXX',
  bank: 'Commerzbank',
  kontoinhaber: 'self',
  khName: '',
  hasOther: false,
  bName: '', bVorname: '', bAnschrift: '',
  kinder: [
    { vorname: 'Lena', geburtsdatum: '2020-05-03', geschlecht: 'weiblich', familienkasse: '' },
    { vorname: 'Marko', geburtsdatum: '2022-09-11', geschlecht: 'männlich', familienkasse: '' },
  ],
  ort: 'Berlin',
  datum: '2026-05-12',
};

const fills = buildKindergeldFieldFills(data);
console.log(`Total fills: ${fills.length}`);
let ok = 0; const missing = [];
for (const f of fills) {
  try {
    if (f.type === 'text') form.getTextField(f.name).setText(f.value ?? '');
    else form.getCheckBox(f.name).check();
    ok++;
  } catch (e) { missing.push(`${f.type}:${f.name} → ${e.message?.slice(0, 60)}`); }
}
console.log(`OK: ${ok}, MISSING: ${missing.length}`);
if (missing.length) console.log(missing.join('\n'));

const out = await doc.save();
fs.writeFileSync('/tmp/kg1-test-filled.pdf', out);
console.log('Written /tmp/kg1-test-filled.pdf');
