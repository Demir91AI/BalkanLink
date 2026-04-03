import { Link } from "react-router-dom";
import { Settings, FileText } from "lucide-react";
import { useForms } from "@/hooks/useFormData";
import { Button } from "@/components/ui/button";
import PageNav from "@/components/navigation/PageNav";

export default function AdminForms() {
  const { data: forms } = useForms();

  return (
    <>
    <SubpageNav />
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="font-heading text-2xl font-extrabold mb-6">Admin — Forms</h1>
      <div className="space-y-3">
        {(forms ?? []).map(f => (
          <div key={f.id} className="flex items-center justify-between rounded-xl border bg-card p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="font-bold text-sm">{f.name}</p>
                <p className="text-xs text-muted-foreground">{f.slug} · Status: {f.status}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to={`/admin/forms/${f.slug}/mapper`}>
                <Settings className="mr-1 h-3 w-3" /> Mapper
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
