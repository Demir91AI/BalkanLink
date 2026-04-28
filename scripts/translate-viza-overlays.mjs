// Translate the extracted BS strings to HR, SR, DE via Lovable AI Gateway
// and write overlay files. Existing overlays for indices 2,3,4 (BA,RS,ME) are preserved.
import fs from "node:fs";

const API_KEY = process.env.LOVABLE_API_KEY;
const ENDPOINT = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash";

const all = JSON.parse(fs.readFileSync("scripts/viza-bs-strings.json", "utf8"));

const PROMPTS = {
  hr: `Prevedi sa bosanskog na HRVATSKI (ijekavica). Zadrži NJEMAČKE termine kakvi jesu (Anmeldung, Aufenthaltserlaubnis, AufenthG, Bundesagentur, Westbalkan, Vorabzustimmung, EzB, Ausländerbehörde, Ausbildung, Niederlassungserlaubnis, Sperrkonto, Verpflichtungserklärung, Einwohnermeldeamt, Wohnungsgeberbestätigung, Steuer-ID, Lebenslauf, Goethe-Institut, Apostille, Schengen, FreizügG/EU, Daueraufenthalt, Kammer, IHK, HWK, BAMF, GKV, PKV, AOK, DAK, TK, BeschV, Botschaft, Auslandsportal, VisaMetric, Trusti, Verwaltungsgericht, Remonstration, Jobsuche, Jobcenter, Sparkasse, Commerzbank, DKB, N26, ALTE, telc, ÖSD, TestDaF, Antrag, Aufenthaltstitel, VIDEX). Sačuvaj emoji, brojeve, simbole i URL-ove. Vrati SAMO prevod, bez objašnjenja.`,
  sr: `Prevedi sa bosanskog na SRPSKI (EKAVICA, latinica). Zadrži NJEMAČKE termine kakvi jesu (Anmeldung, Aufenthaltserlaubnis, AufenthG, Bundesagentur, Westbalkan, Vorabzustimmung, EzB, Ausländerbehörde, Ausbildung, Niederlassungserlaubnis, Sperrkonto, Verpflichtungserklärung, Einwohnermeldeamt, Wohnungsgeberbestätigung, Steuer-ID, Lebenslauf, Goethe-Institut, Apostille, Schengen, FreizügG/EU, Daueraufenthalt, Kammer, IHK, HWK, BAMF, GKV, PKV, AOK, DAK, TK, BeschV, Botschaft, Auslandsportal, VisaMetric, Trusti, Verwaltungsgericht, Remonstration, Jobsuche, Jobcenter, Sparkasse, Commerzbank, DKB, N26, ALTE, telc, ÖSD, TestDaF, Antrag, Aufenthaltstitel, VIDEX). Promijeni ije/je u e (npr. mjesec→mesec, dijete→dete, vrijeme→vreme, sjeverna→severna). Sačuvaj emoji, brojeve, simbole i URL-ove. Vrati SAMO prevod.`,
  de: `Übersetze vom Bosnischen ins DEUTSCHE. Behalte deutsche Fachbegriffe (Anmeldung, Aufenthaltserlaubnis, AufenthG, etc.) unverändert. Behalte Emojis, Zahlen, Symbole und URLs. Antworte NUR mit der Übersetzung, ohne Erklärungen.`,
};

async function translateBatch(texts, lang) {
  const numbered = texts.map((t, i) => `[${i}] ${t}`).join("\n---\n");
  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: PROMPTS[lang] + ` Vrati prevode u istom formatu: [0] prevod\n---\n[1] prevod\n---\n... Tačno ${texts.length} stavki.` },
      { role: "user", content: numbered },
    ],
  };
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${lang}: ${res.status} ${await res.text()}`);
  const data = await res.json();
  const content = data.choices[0].message.content;
  const parts = content.split(/\n---\n/);
  const result = new Array(texts.length).fill(null);
  for (const p of parts) {
    const m = p.match(/^\s*\[(\d+)\]\s*([\s\S]*?)\s*$/);
    if (m) {
      const idx = parseInt(m[1], 10);
      if (idx >= 0 && idx < texts.length) result[idx] = m[2].trim();
    }
  }
  return result;
}

const BATCH = 25;

async function translateAll(lang) {
  console.log(`\n=== ${lang.toUpperCase()} ===`);
  const out = [];
  for (let i = 0; i < all.length; i += BATCH) {
    const slice = all.slice(i, i + BATCH);
    const texts = slice.map(e => e.text);
    let translations;
    try {
      translations = await translateBatch(texts, lang);
    } catch (e) {
      console.error(`Batch ${i} failed:`, e.message);
      translations = texts.map(() => null);
    }
    for (let j = 0; j < slice.length; j++) {
      const t = translations[j];
      out.push({ path: slice[j].path, text: t || slice[j].text });
    }
    console.log(`  ${Math.min(i + BATCH, all.length)}/${all.length}`);
  }
  return out;
}

function loadExisting(file) {
  const src = fs.readFileSync(file, "utf8");
  const j = src.substring(src.indexOf("["), src.lastIndexOf("]") + 1);
  return JSON.parse(j);
}

const KEEP_INDICES = new Set(["2", "3", "4"]);

function mergeOverlay(existing, fresh) {
  const kept = existing.filter(e => KEEP_INDICES.has(e.path.split(".")[0]));
  const freshFiltered = fresh.filter(e => !KEEP_INDICES.has(e.path.split(".")[0]));
  return [...kept, ...freshFiltered];
}

function writeOverlay(file, lang, overlay) {
  const header = `// Auto-generated translation overlay. Do not edit by hand.\n// Source: viza.${lang}.json\nexport const overlay = `;
  fs.writeFileSync(file, header + JSON.stringify(overlay) + ";\n");
}

const targets = [
  { lang: "hr", file: "src/data/viza-i18n/hr.ts" },
  { lang: "sr", file: "src/data/viza-i18n/sr.ts" },
  { lang: "de", file: "src/data/viza-i18n/de.ts" },
];

for (const { lang, file } of targets) {
  const fresh = await translateAll(lang);
  const existing = loadExisting(file);
  const merged = mergeOverlay(existing, fresh);
  writeOverlay(file, lang, merged);
  console.log(`Wrote ${file} (${merged.length} entries)`);
}
console.log("\nDone.");
