import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { ChevronLeft, Search, Check, Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useFormFields, useFieldMappings } from "@/hooks/useFormData";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminFormMapper() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const formSlug = slug ?? "kindergeld-kg1";
  const { data: fields } = useFormFields(formSlug);
  const { data: mappings } = useFieldMappings(formSlug);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [mapForm, setMapForm] = useState({ page: 1, x: 0, y: 0, width: 100, height: 30 });

  const allFields = fields ?? [];
  const allMappings = mappings ?? [];

  const mappedKeys = useMemo(() => new Set(allMappings.map(m => m.field_key)), [allMappings]);
  const mapped = allFields.filter(f => mappedKeys.has(f.field_key)).length;
  const total = allFields.length;
  const pct = total > 0 ? Math.round((mapped / total) * 100) : 0;

  const filtered = allFields.filter(f =>
    !search || f.label_de.toLowerCase().includes(search.toLowerCase()) || f.label_bs.toLowerCase().includes(search.toLowerCase()) || f.field_key.toLowerCase().includes(search.toLowerCase())
  );

  const unmapped = allFields.filter(f => !mappedKeys.has(f.field_key));

  const handleSave = async () => {
    if (!selectedField) return;
    // Upsert: delete old mapping then insert new
    await supabase.from("field_mapping").delete().eq("form_slug", formSlug).eq("field_key", selectedField);
    const { error } = await supabase.from("field_mapping").insert({
      form_slug: formSlug,
      field_key: selectedField,
      page_number: mapForm.page,
      x: mapForm.x,
      y: mapForm.y,
      width: mapForm.width,
      height: mapForm.height,
    });
    if (!error) {
      toast({ title: "Gespeichert!" });
      queryClient.invalidateQueries({ queryKey: ["field_mapping", formSlug] });
    }
  };

  const handleExport = () => {
    const json = JSON.stringify(allMappings, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${formSlug}-mappings.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      try {
        const data = JSON.parse(text) as Array<{ field_key: string; page_number: number; x: number; y: number; width: number; height: number }>;
        for (const item of data) {
          await supabase.from("field_mapping").delete().eq("form_slug", formSlug).eq("field_key", item.field_key);
          await supabase.from("field_mapping").insert({
            form_slug: formSlug,
            field_key: item.field_key,
            page_number: item.page_number,
            x: item.x, y: item.y, width: item.width, height: item.height,
          });
        }
        queryClient.invalidateQueries({ queryKey: ["field_mapping", formSlug] });
        toast({ title: `Imported ${data.length} mappings` });
      } catch {
        toast({ title: "Invalid JSON", variant: "destructive" });
      }
    };
    input.click();
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
        <ChevronLeft className="h-4 w-4" /> Nazad
      </button>
      <h1 className="font-heading text-xl font-extrabold mb-4">{"Formular-Mapper"} — {formSlug}</h1>

      {/* Coverage */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Badge variant="outline" className="text-xs">
          {"Abdeckung"}: {mapped}/{total} ({pct}%)
        </Badge>
        <div className="h-2 flex-1 max-w-xs rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
        <Button variant="outline" size="sm" className="text-xs" onClick={handleExport}>
          <Download className="mr-1 h-3 w-3" /> {"Exportieren"}
        </Button>
        <Button variant="outline" size="sm" className="text-xs" onClick={handleImport}>
          <Upload className="mr-1 h-3 w-3" /> {"Importieren"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Left: Field list */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9 text-xs" placeholder={"Felder suchen..."} value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="max-h-[500px] space-y-1 overflow-y-auto rounded-xl border p-2">
            {filtered.map(f => (
              <button
                key={f.field_key}
                onClick={() => setSelectedField(f.field_key)}
                className={`w-full rounded-lg px-3 py-2 text-left text-xs transition flex items-center gap-2 ${
                  f.field_key === selectedField ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {mappedKeys.has(f.field_key) && <Check className="h-3 w-3 text-green-500 shrink-0" />}
                <div>
                  <span className="font-medium">{f.label_de}</span>
                  <br />
                  <span className="text-[10px] opacity-70">{f.field_key}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Unmapped list */}
          {unmapped.length > 0 && (
            <div>
              <p className="text-xs font-bold text-red-500 mb-1">{"Nicht zugeordnet"} ({unmapped.length})</p>
              <div className="max-h-[150px] space-y-0.5 overflow-y-auto text-[10px] text-muted-foreground">
                {unmapped.map(f => <p key={f.field_key}>• {f.field_key} — {f.label_de}</p>)}
              </div>
            </div>
          )}
        </div>

        {/* Right: PDF + mapping form */}
        <div className="space-y-4">
          <iframe
            src={`https://www.arbeitsagentur.de/datei/kg1-antrag-kindergeld_ba036550.pdf#page=1`}
            className="h-[600px] w-full rounded-xl border"
            title="PDF Mapper"
          />

          {selectedField ? (
            <div className="rounded-xl border bg-card p-4 space-y-3">
              <p className="text-xs font-bold">Mapping: <span className="text-primary">{selectedField}</span></p>
              <div className="grid grid-cols-5 gap-2">
                <div>
                  <label className="text-[10px] text-muted-foreground">Page</label>
                  <Input type="number" min={1} max={2} className="text-xs h-8" value={mapForm.page} onChange={e => setMapForm(p => ({ ...p, page: +e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">X</label>
                  <Input type="number" className="text-xs h-8" value={mapForm.x} onChange={e => setMapForm(p => ({ ...p, x: +e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">Y</label>
                  <Input type="number" className="text-xs h-8" value={mapForm.y} onChange={e => setMapForm(p => ({ ...p, y: +e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">W</label>
                  <Input type="number" className="text-xs h-8" value={mapForm.width} onChange={e => setMapForm(p => ({ ...p, width: +e.target.value }))} />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground">H</label>
                  <Input type="number" className="text-xs h-8" value={mapForm.height} onChange={e => setMapForm(p => ({ ...p, height: +e.target.value }))} />
                </div>
              </div>
              <Button size="sm" className="text-xs" onClick={handleSave}>
                <Check className="mr-1 h-3 w-3" /> {"Gespeichert!".replace("!", "")}
              </Button>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed p-6 text-center">
              <p className="text-xs text-muted-foreground">{"Feld wählen"}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
