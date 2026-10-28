import { useTranslation } from "react-i18next";
import ProcedureCompanion from "./ProcedureCompanion";
import type { ArrivalProcedure } from "@/lib/guide-first/arrival-model";
import { DOCUMENTS_LINKS, DOCUMENTS_VERIFIED_ON, type DocumentsSlug } from "@/lib/guide-first/documents-model";

/** No selectors for religion, disability or applicant facts; no persistence. */
export default function DocumentsCompanion({ slug }: { slug: DocumentsSlug }) {
  const { t } = useTranslation("pages");
  const content = t(`documentsCompanions.guides.${slug}`, { returnObjects: true }) as ArrivalProcedure;
  const links = DOCUMENTS_LINKS[slug].map(link => ({ url: link.url, label: t(`documentsCompanions.ui.links.${link.key}`) }));
  return <ProcedureCompanion key={slug} slug={slug} content={content} links={links} verifiedOn={DOCUMENTS_VERIFIED_ON} variant={slug} />;
}