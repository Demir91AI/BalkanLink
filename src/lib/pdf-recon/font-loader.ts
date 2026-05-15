/**
 * Unicode TTF embedder for pdf-lib (1:1 visa form reconstruction).
 * Noto Sans pokriva bosanske, hrvatske, srpske i njemačke dijakritike.
 *
 * Fontovi se nalaze u /public/fonts/, fetchaju se lazy pri PRVOM klik-u na
 * "Preuzmi popunjen službeni obrazac (1:1)" — ne usporavaju initial load.
 * Subset embedding (samo korišćeni glifovi) → finalni PDF ostaje ~70-120KB.
 */
import { PDFDocument, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";

const REG_URL = "/fonts/NotoSans-Regular.ttf";
const BOLD_URL = "/fonts/NotoSans-Bold.ttf";

let regBytes: ArrayBuffer | null = null;
let boldBytes: ArrayBuffer | null = null;

async function fetchOnce(url: string, cache: ArrayBuffer | null): Promise<ArrayBuffer> {
  if (cache) return cache;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Font fetch failed (${res.status}): ${url}`);
  return res.arrayBuffer();
}

export interface ReconFonts {
  regular: PDFFont;
  bold: PDFFont;
}

export async function loadReconFonts(doc: PDFDocument): Promise<ReconFonts> {
  doc.registerFontkit(fontkit);
  if (!regBytes) regBytes = await fetchOnce(REG_URL, regBytes);
  if (!boldBytes) boldBytes = await fetchOnce(BOLD_URL, boldBytes);
  const regular = await doc.embedFont(regBytes, { subset: true });
  const bold = await doc.embedFont(boldBytes, { subset: true });
  return { regular, bold };
}
