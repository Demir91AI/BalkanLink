import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

const candidates = [
  // Steuer (BMF — typically AcroForm)
  ['ESt1A_Mantelbogen_2024', 'https://www.formulare-bfinv.de/ffw/form/display.do?%24context=39E80E2D6B72E63A60A1'],
  ['Lohnsteuerermassigung_2025', 'https://www.formulare-bfinv.de/ffw/form/download.do?ffw_path=/ffw/form/0030/00301056_a/2025/0030_1056_a_25.pdf'],
  ['Anlage_Kind_2024', 'https://www.formulare-bfinv.de/ffw/form/download.do?ffw_path=/ffw/form/0030/00302100_a/2024/0030_2100_a_24.pdf'],
  ['ELStAM_Steuerklassenwechsel', 'https://www.formulare-bfinv.de/ffw/form/download.do?ffw_path=/ffw/form/0030/00302450/2024/0030_2450_24.pdf'],
  // Familienkasse — typically XFA (skip duplicates)
  // Krankenkassen
  ['TK_Familienversicherung', 'https://www.tk.de/resource/blob/2007282/d4f3c5c5b1c9e6f3e2c5e8b4f3a7e8c9/familienversicherung-data.pdf'],
  // BAföG
  ['BAfoeG_Formblatt1', 'https://www.bafoeg-rechner.de/Formulare/01.pdf'],
  // Wohngeldbescheinigung der Familienkasse  
  ['Wohngeldbescheinigung_Vermieter', 'https://www.muenchen.de/dam/jcr:b3a7e9f3-1234-5678-9abc-def012345678/wohngeld-vermieterbescheinigung.pdf'],
  // Mutterschaftsgeld (Mutterschaftsgeldstelle)
  ['Mutterschaftsgeld_Antrag', 'https://www.mutterschaftsgeld.de/static/MGSAntrag.pdf'],
  // Anmeldung KFZ
  ['SEPA_Lastschrift_KFZ', 'https://www.kba.de/SharedDocs/Downloads/DE/Themen/ZahlungenStraf/sepa_lastschriftmandat.pdf'],
  // Krankenversicherung BB
  ['AOK_Mitgliedschaft', 'https://www.aok.de/inhalt/antrag-mitgliedschaft.pdf'],
];

for (const [name, url] of candidates) {
  const dest = `/tmp/cand_${name}.pdf`;
  try {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.log(`❌ ${name}: HTTP ${res.status}`); continue; }
    const buf = Buffer.from(await res.arrayBuffer());
    if (!buf.slice(0, 4).toString().includes('PDF')) { console.log(`❌ ${name}: not a PDF (${buf.length} B)`); continue; }
    fs.writeFileSync(dest, buf);
    try {
      const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
      const fields = doc.getForm().getFields();
      console.log(`${fields.length > 0 ? '✅' : '⚠️ '} ${name}: ${fields.length} fields, ${(buf.length/1024).toFixed(0)} KB`);
      if (fields.length > 0 && fields.length < 200) {
        const sample = fields.slice(0, 5).map(f => `${f.constructor.name}:${f.getName()}`).join(' | ');
        console.log(`     sample: ${sample}`);
      }
    } catch (e) {
      console.log(`❌ ${name}: pdf-lib load error (${String(e.message).slice(0,80)})`);
    }
  } catch (e) {
    console.log(`❌ ${name}: fetch error (${String(e.message).slice(0,80)})`);
  }
}
