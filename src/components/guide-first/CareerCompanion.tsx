import { useTranslation } from "react-i18next";
import ProcedureCompanion from "./ProcedureCompanion";
import type { ArrivalProcedure } from "@/lib/guide-first/arrival-model";
import { CAREER_LINKS, CAREER_VERIFIED_ON, type CareerSlug } from "@/lib/guide-first/career-model";

/** Locale-data career companion; memory-only gate, no inputs or storage. */
export default function CareerCompanion({ slug }: { slug: CareerSlug }) {
  const { t } = useTranslation("pages");
  const content = t(`careerCompanions.guides.${slug}`, { returnObjects: true }) as ArrivalProcedure;
  const links = CAREER_LINKS[slug].map((link) => ({ url: link.url, label: t(`careerCompanions.ui.links.${link.key}`) }));
  return <ProcedureCompanion key={slug} slug={slug} content={content} links={links} verifiedOn={CAREER_VERIFIED_ON} variant={slug} />;
}
