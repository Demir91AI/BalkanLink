export interface PaperField {
  form: string; page: number; sec: string; de: string; only?: boolean;
  what: string; where: string; example: string; mistake: string;
}
export interface PilotDetail {
  title: string; meaning: string; help: string;
  de?: string;
  what?: string; where?: string; example?: string; mistake?: string;
}
export interface FieldTerm {
  id: string;
  de: string;
  translation: string;
  meaning: string;
}
export interface FieldGroup extends PaperField {
  id: string; title: string; meaning: string; help: string;
  terms?: FieldTerm[];
}
export interface FieldExpansion extends FieldGroup { after: string }

/** Original records are not copied/replaced. Expansions follow the native form order. */
export function paperGroups(kg1: PaperField[], ank: PaperField[], details: Record<string, PilotDetail>, extras: FieldExpansion[], terms: Record<string, FieldTerm[]> = {}): FieldGroup[] {
  return ([...kg1.map((r, i) => ({ ...r, id: `kg1-${i}` })), ...ank.map((r, i) => ({ ...r, id: `ank-${i}` }))]).flatMap((r) => {
    const detail = details[r.id];
    if (!detail) return [];
    return [{ ...r, ...detail }, ...extras.filter((e) => e.after === r.id)].map((g) => ({ ...g, terms: terms[g.id] }));
  });
}

export const KINDERGELD_PDFS = {
  KG1: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf",
  "Anlage Kind": "https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba033765.pdf",
} as const;
export const FORMS_URL = "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld";
export const BZST_ID_URL = "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html";