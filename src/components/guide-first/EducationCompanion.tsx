import { useTranslation } from "react-i18next";
import ProcedureCompanion from "./ProcedureCompanion";
import type { ArrivalProcedure } from "@/lib/guide-first/arrival-model";
import { EDUCATION_LINKS, EDUCATION_VERIFIED_ON, type EducationSlug } from "@/lib/guide-first/education-model";

/** Existing companion flow, all choices in mounted memory only. */
export default function EducationCompanion({ slug }: { slug: EducationSlug }) {
  const { t } = useTranslation("pages");
  const content = t(`educationCompanions.guides.${slug}`, { returnObjects: true }) as ArrivalProcedure;
  const links = EDUCATION_LINKS[slug].map((link) => ({ url: link.url, label: t(`educationCompanions.ui.links.${link.key}`) }));
  return <ProcedureCompanion key={slug} slug={slug} content={content} links={links} verifiedOn={EDUCATION_VERIFIED_ON} variant={slug} />;
}