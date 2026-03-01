import { Link } from "react-router-dom";
import { FileText, Crown, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useForms } from "@/hooks/useFormData";

const placeholders = [
  { slug: "buergergeld", name: "Bürgergeld Antrag", desc: "Zahtjev za socijalnu pomoć" },
  { slug: "wohngeld", name: "Wohngeld Antrag", desc: "Zahtjev za stambeni dodatak" },
  { slug: "kuendigung", name: "Kündigung Arbeitsvertrag", desc: "Otkaz ugovora o radu" },
  { slug: "krankengeld", name: "Krankengeld Antrag", desc: "Zahtjev za naknadu za bolovanje" },
  { slug: "aufenthalt", name: "Aufenthaltstitel Verlängerung", desc: "Produženje boravišne dozvole" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "OK") return <Badge variant="outline" className="border-green-500/30 text-green-600 text-[10px]"><CheckCircle2 className="mr-1 h-3 w-3" />OK</Badge>;
  if (status === "Suspect") return <Badge variant="outline" className="border-yellow-500/30 text-yellow-600 text-[10px]"><AlertTriangle className="mr-1 h-3 w-3" />Suspect</Badge>;
  return <Badge variant="outline" className="border-red-500/30 text-red-600 text-[10px]"><XCircle className="mr-1 h-3 w-3" />Blocked</Badge>;
}

export default function FormCenter() {
  const { data: forms, isLoading } = useForms();

  const dbForms = forms ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-extrabold sm:text-3xl">Formulari — Smart Guide</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Interaktivna pomoć za popunjavanje njemačkih formulara. Svako polje objašnjeno na bosanskom.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* DB forms */}
        {dbForms.map((form) => (
          <div key={form.id} className="flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <Badge className="bg-gold/10 text-gold text-[10px] border-gold/20">
                  <Crown className="mr-1 h-3 w-3" /> PREMIUM
                </Badge>
              </div>
              <h3 className="font-bold text-sm">{form.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{form.authority_name}</p>
              <div className="mt-2">
                <StatusBadge status={form.status} />
              </div>
            </div>
            <Button
              className="mt-4 w-full rounded-xl text-xs"
              size="sm"
              disabled={form.status === "Blocked"}
              asChild={form.status !== "Blocked"}
            >
              {form.status === "Blocked" ? (
                <span>PDF trenutno nije dostupan</span>
              ) : (
                <Link to={`/formulari/${form.slug}`}>Otvori Smart Guide</Link>
              )}
            </Button>
          </div>
        ))}

        {/* Placeholder forms */}
        {placeholders.map((p) => (
          <div key={p.slug} className="flex flex-col justify-between rounded-2xl border bg-card/50 p-5 opacity-60">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <Badge variant="outline" className="text-[10px]">Uskoro</Badge>
              </div>
              <h3 className="font-bold text-sm">{p.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <Button className="mt-4 w-full rounded-xl text-xs" size="sm" disabled>
              Uskoro dostupno
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
