export interface PaperField {
  form: string; page: number; sec: string; de: string; only?: boolean;
  what: string; where: string; example: string; mistake: string;
}
export interface PilotDetail {
  title: string; meaning: string; help: string;
  what?: string; where?: string; example?: string; mistake?: string;
}
export interface FieldGroup extends PaperField {
  id: string; title: string; meaning: string; help: string;
}
export interface FieldExpansion extends FieldGroup { after: string }

/** Original records are not copied/replaced. Expansions follow the native form order. */
export function paperGroups(kg1: PaperField[], ank: PaperField[], details: Record<string, PilotDetail>, extras: FieldExpansion[]): FieldGroup[] {
  return ([...kg1.map((r, i) => ({ ...r, id: `kg1-${i}` })), ...ank.map((r, i) => ({ ...r, id: `ank-${i}` }))]).flatMap((r) => {
    const detail = details[r.id];
    if (!detail) return [];
    return [{ ...r, ...detail }, ...extras.filter((e) => e.after === r.id)];
  });
}

export const KINDERGELD_PDFS = {
  KG1: "https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba017202.pdf",
  "Anlage Kind": "https://www.arbeitsagentur.de/datei/kg1-anlagekind_ba017207.pdf",
} as const;
export const FORMS_URL = "https://www.arbeitsagentur.de/familie-und-kinder/downloads-familie-und-kinder/formulare-kindergeld";
export const BZST_ID_URL = "https://www.bzst.de/DE/Privatpersonen/SteuerlicheIdentifikationsnummer/FAQ/faq_node.html";