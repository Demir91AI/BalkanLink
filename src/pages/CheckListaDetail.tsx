import { useParams, Navigate } from "react-router-dom";
import ChecklistPage from "@/components/checklists/ChecklistPage";
import { getChecklist } from "@/lib/checklists-data";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

export default function CheckListaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const hubHref = useLocalizedHref("/check-liste");
  const cl = slug ? getChecklist(slug) : undefined;
  if (!cl) return <Navigate to={hubHref} replace />;
  return <ChecklistPage checklist={cl} />;
}
