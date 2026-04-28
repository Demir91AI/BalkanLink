// Extract all string paths under indices 0 (HR), 1 (SI), 5 (MK), 6 (AL), 7 (XK)
// from src/data/vizaNavigatorContent.ts into a JSON file we can translate.
import fs from "node:fs";
import path from "node:path";

const SRC = path.resolve("src/data/vizaNavigatorContent.ts");
const src = fs.readFileSync(SRC, "utf8");

// Strip TS bits to get a JS object: take from "= [" to final "];"
const start = src.indexOf("const COUNTRY_CONTENT");
const arrStart = src.indexOf("[", start);
const arrEnd = src.lastIndexOf("];");
const arrSrc = src.substring(arrStart, arrEnd + 1);

// Use eval in a safe sandboxed Function (no external refs)
let arr;
try {
  arr = new Function(`return ${arrSrc};`)();
} catch (e) {
  console.error("Failed to parse:", e.message);
  process.exit(1);
}

const TARGET_INDICES = [0, 1, 5, 6, 7]; // HR, SI, MK, AL, XK

function walk(node, prefix, out) {
  if (typeof node === "string") {
    out.push({ path: prefix, text: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, prefix ? `${prefix}.${i}` : String(i), out));
    return;
  }
  if (node && typeof node === "object") {
    for (const k of Object.keys(node)) {
      // Skip non-translatable fields
      if (["code", "flag", "embassyUrl", "isEU", "schengenFree", "formKey", "downloadUrl", "url"].includes(k)) continue;
      walk(node[k], prefix ? `${prefix}.${k}` : k, out);
    }
  }
}

const out = [];
for (const idx of TARGET_INDICES) {
  walk(arr[idx], String(idx), out);
}

fs.writeFileSync("scripts/viza-bs-strings.json", JSON.stringify(out, null, 2));
console.log(`Extracted ${out.length} strings from indices ${TARGET_INDICES.join(",")}`);
console.log("Per index:");
for (const idx of TARGET_INDICES) {
  const c = out.filter(e => e.path.startsWith(idx + ".")).length;
  console.log(`  ${idx}: ${c}`);
}
