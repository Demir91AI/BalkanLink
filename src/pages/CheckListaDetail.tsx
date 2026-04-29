import { useParams, Navigate } from "react-router-dom";
import ChecklistPage from "@/components/checklists/ChecklistPage";
import { getChecklist } from "@/lib/checklists-data";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export default function CheckListaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const localize = useLocalizedHref();
  const cl = slug ? getChecklist(slug) : undefined;
  if (!cl) return <Navigate to={localize("/check-liste")} replace />;
  return <ChecklistPage checklist={cl} />;
}
