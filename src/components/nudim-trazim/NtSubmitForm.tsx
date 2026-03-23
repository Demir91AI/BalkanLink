import { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NT_CATEGORIES } from "@/lib/nudim-trazim-constants";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
}

export default function NtSubmitForm({ onClose }: Props) {
  const [form, setForm] = useState({
    type: "",
    title: "",
    category: "",
    city: "",
    description: "",
    contact_type: "",
    contact_value: "",
    agreed: false,
  });

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.title || !form.category || !form.city || !form.description || !form.contact_type || !form.contact_value) {
      toast.error("Molimo popunite sva polja.");
      return;
    }
    if (!form.agreed) {
      toast.error("Morate prihvatiti pravila korištenja.");
      return;
    }
    toast.success("Oglas je uspješno poslan! Bit će vidljiv nakon provjere.");
    onClose();
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">Objavi oglas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tip oglasa *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue placeholder="Odaberi..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nudim">Nudim (Ich biete)</SelectItem>
                  <SelectItem value="trazim">Tražim (Ich suche)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kategorija *</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger><SelectValue placeholder="Odaberi..." /></SelectTrigger>
                <SelectContent>
                  {NT_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Naslov oglasa *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Npr. Nudim pomoć pri selidbi" />
          </div>

          <div className="space-y-2">
            <Label>Grad / Ort *</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Npr. München" />
          </div>

          <div className="space-y-2">
            <Label>Opis *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Opišite detaljno šta nudite ili tražite..."
              rows={4}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kontakt putem *</Label>
              <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                <SelectTrigger><SelectValue placeholder="Odaberi..." /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">Telefon</SelectItem>
                  <SelectItem value="email">E-Mail</SelectItem>
                  <SelectItem value="message">Poruka preko platforme</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Kontakt podatak *</Label>
              <Input
                value={form.contact_value}
                onChange={(e) => set("contact_value", e.target.value)}
                placeholder="Telefon, E-Mail..."
              />
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="nt-agree"
              checked={form.agreed}
              onCheckedChange={(v) => set("agreed", !!v)}
              className="mt-0.5"
            />
            <label htmlFor="nt-agree" className="text-sm text-muted-foreground leading-relaxed">
              Prihvatam pravila korištenja i potvrđujem da je sadržaj oglasa istinit.
              Oglas je aktivan 30 dana.
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> Objavi oglas
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Otkaži
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
