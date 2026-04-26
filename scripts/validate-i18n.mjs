#!/usr/bin/env node
/**
 * i18n validation
 *
 * Scans src/ for t("...") / t('...') / t(`...`) calls and verifies that every
 * referenced key resolves in BOTH bs and de locale bundles.
 *
 * Conventions in this project:
 *   - Default namespace is "common".
 *   - Components opt into another namespace with useTranslation("pages") /
 *     useTranslation("forms") / useTranslation("errors").
 *   - Keys may include "ns:key.path" prefix to override the namespace.
 *
 * The scan is intentionally conservative: it only flags keys that are
 *   - String literals (no template interpolation we can't resolve)
 *   - Missing in either bs or de
 * It also reports keys that exist in only one locale even when no component
 * references them (orphan/stray keys).
 *
 * Usage:
 *   node scripts/validate-i18n.mjs           # report only, exit 1 on missing
 *   node scripts/validate-i18n.mjs --json    # machine-readable output
 *   node scripts/validate-i18n.mjs --warn    # never exit non-zero
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(fileURLToPath(new URL("..", import.meta.url)));
const SRC = join(ROOT, "src");
const LOCALES_DIR = join(SRC, "i18n", "locales");
const LOCALES = ["bs", "de"];
const NAMESPACES = ["common", "forms", "pages", "errors"];
const DEFAULT_NS = "common";

const args = new Set(process.argv.slice(2));
const asJson = args.has("--json");
const warnOnly = args.has("--warn");

// ---------- load locales ----------
function loadBundle(locale) {
  const bundle = {};
  for (const ns of NAMESPACES) {
    const path = join(LOCALES_DIR, locale, `${ns}.json`);
    bundle[ns] = JSON.parse(readFileSync(path, "utf8"));
  }
  return bundle;
}

function flatten(obj, prefix = "") {
  const out = new Set();
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) {
      for (const nested of flatten(v, key)) out.add(nested);
    } else {
      out.add(key);
    }
  }
  return out;
}

function hasKey(bundle, ns, key) {
  const parts = key.split(".");
  let cur = bundle[ns];
  for (const p of parts) {
    if (cur == null || typeof cur !== "object") return false;
    cur = cur[p];
  }
  return cur !== undefined && cur !== null;
}

// ---------- scan source ----------
const SOURCE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const IGNORE_DIRS = new Set([
  "node_modules", "dist", "build", ".git", ".lovable",
  "i18n", // locale data itself
]);

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (IGNORE_DIRS.has(entry)) continue;
      yield* walk(full);
    } else if (SOURCE_EXTS.has(extname(entry))) {
      yield full;
    }
  }
}

// Match: useTranslation("ns") / useTranslation('ns')
const NS_HOOK_RE = /useTranslation\(\s*["'`]([a-zA-Z_]+)["'`]\s*\)/g;
// Match t("..."), t('...'), t(`...`) — only literal, no ${...}
const T_CALL_RE = /\bt\(\s*(["'`])((?:\\.|(?!\1).)*?)\1\s*[,)]/g;

const usages = []; // { file, key, ns }

for (const file of walk(SRC)) {
  const text = readFileSync(file, "utf8");

  // Determine default namespace for this file based on the first useTranslation call.
  let fileNs = DEFAULT_NS;
  const nsMatch = NS_HOOK_RE.exec(text);
  NS_HOOK_RE.lastIndex = 0;
  if (nsMatch && NAMESPACES.includes(nsMatch[1])) {
    fileNs = nsMatch[1];
  }

  let m;
  while ((m = T_CALL_RE.exec(text)) !== null) {
    const raw = m[2];
    if (!raw || raw.includes("${") || raw.includes("\n")) continue;
    // Skip dynamic keys built with concatenation indicators
    if (raw.startsWith("$") || raw.includes("`")) continue;

    let ns = fileNs;
    let key = raw;
    const colonIdx = raw.indexOf(":");
    if (colonIdx > 0 && NAMESPACES.includes(raw.slice(0, colonIdx))) {
      ns = raw.slice(0, colonIdx);
      key = raw.slice(colonIdx + 1);
    }
    // Skip keys that look like sentences / non-key strings
    if (/\s/.test(key) || !/^[a-zA-Z0-9_.\-]+$/.test(key)) continue;

    usages.push({ file: relative(ROOT, file), ns, key });
  }
}

// ---------- validate ----------
const bundles = Object.fromEntries(LOCALES.map((l) => [l, loadBundle(l)]));
const flatBundles = Object.fromEntries(
  LOCALES.map((l) => [
    l,
    Object.fromEntries(NAMESPACES.map((ns) => [ns, flatten(bundles[l][ns])])),
  ]),
);

const missing = []; // { file, ns, key, missingIn: [...] }
const seen = new Set();
for (const u of usages) {
  const sig = `${u.ns}::${u.key}`;
  const missingIn = LOCALES.filter((l) => !hasKey(bundles[l], u.ns, u.key));
  if (missingIn.length === 0) continue;
  const dedupKey = `${sig}::${missingIn.join(",")}::${u.file}`;
  if (seen.has(dedupKey)) continue;
  seen.add(dedupKey);
  missing.push({ file: u.file, ns: u.ns, key: u.key, missingIn });
}

// Stray: keys present in one locale only (no usage requirement)
const stray = [];
for (const ns of NAMESPACES) {
  const bs = flatBundles.bs[ns];
  const de = flatBundles.de[ns];
  for (const k of bs) if (!de.has(k)) stray.push({ ns, key: k, presentIn: "bs", missingIn: "de" });
  for (const k of de) if (!bs.has(k)) stray.push({ ns, key: k, presentIn: "de", missingIn: "bs" });
}

// ---------- output ----------
if (asJson) {
  console.log(JSON.stringify({
    scannedFiles: new Set(usages.map((u) => u.file)).size,
    totalUsages: usages.length,
    missing,
    stray,
  }, null, 2));
} else {
  console.log(`\ni18n validation`);
  console.log(`  scanned usages : ${usages.length}`);
  console.log(`  unique files   : ${new Set(usages.map((u) => u.file)).size}`);
  console.log(`  locales        : ${LOCALES.join(", ")}`);
  console.log(`  namespaces     : ${NAMESPACES.join(", ")}\n`);

  if (missing.length === 0) {
    console.log("✓ No missing keys referenced in source.");
  } else {
    console.log(`✗ Missing keys: ${missing.length}`);
    const byNs = {};
    for (const m of missing) (byNs[m.ns] ||= []).push(m);
    for (const ns of Object.keys(byNs).sort()) {
      console.log(`\n  [${ns}]`);
      for (const m of byNs[ns]) {
        console.log(`    ${m.key}  →  missing in ${m.missingIn.join(", ")}  (${m.file})`);
      }
    }
  }

  if (stray.length > 0) {
    console.log(`\n⚠ Locale-asymmetric keys: ${stray.length}`);
    const byNs = {};
    for (const s of stray) (byNs[s.ns] ||= []).push(s);
    for (const ns of Object.keys(byNs).sort()) {
      console.log(`\n  [${ns}]`);
      for (const s of byNs[ns].slice(0, 50)) {
        console.log(`    ${s.key}  (only in ${s.presentIn}, missing in ${s.missingIn})`);
      }
      if (byNs[ns].length > 50) console.log(`    … and ${byNs[ns].length - 50} more`);
    }
  }
  console.log("");
}

if (!warnOnly && missing.length > 0) process.exit(1);
