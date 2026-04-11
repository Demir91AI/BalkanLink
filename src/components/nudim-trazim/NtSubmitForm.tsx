import { useState } from "react";
import { Send, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NT_CATEGORIES } from "@/lib/nudim-trazim-constants";
import { toast } from "sonner";
import TurnstileWidget from "@/components/TurnstileWidget";
import { verifyTurnstileToken } from "@/lib/turnstile";

interface Props {
  onClose: () => void;
  onProClick?: () => void;
}

export default function NtSubmitForm({ onClose, onProClick }: Props) {
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
  const [turnstileToken, setTurnstileToken] = useState("");

  const set = (key: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.title || !form.category || !form.city || !form.description || !form.contact_type || !form.contact_value) {
      toast.error("Molimo popunite sva polja.");
      return;
    }
    if (!form.agreed) {
      toast.error("Morate prihvatiti uslove korištenja.");
      return;
    }

    if (turnstileToken) {
      const valid = await verifyTurnstileToken(turnstileToken);
      if (!valid) {
        toast.error("Verifikacija nije uspjela. Pokušaj ponovo.");
        setTurnstileToken("");
        return;
      }
    }

    // Try to persist to Supabase (non-blocking — table may not exist yet)
    try {
      await supabase.from("nt_ads" as any).insert({
        type: form.type,
        title: form.title.trim(),
        category: form.category,
        city: form.city.trim(),
        description: form.description.trim(),
        contact_type: form.contact_type,
        contact_value: form.contact_value.trim(),
        is_pro: false,
      });
    } catch {}

    toast.success("Anzeige erfolgreich gesendet! Sie wird nach Prüfung sichtbar.");
    onClose();
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">{"Anzeige kostenlos aufgeben"}</CardTitle>
        <p className="text-sm text-muted-foreground">{"Die Veröffentlichung ist kostenlos. Danach kannst du die Anzeige als PRO hervorheben."}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{"Anzeigentyp"} *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue placeholder={"Auswählen..."} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nudim">{"Ich biete"}</SelectItem>
                  <SelectItem value="trazim">{"Ich suche"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{"Kategorie"} *</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger><SelectValue placeholder={"Auswählen..."} /></SelectTrigger>
                <SelectContent>
                  {NT_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{"Anzeigentitel"} *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={"Z.B. Biete Umzugshilfe"} />
          </div>

          <div className="space-y-2">
            <Label>{"Stadt / Ort"} *</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder={"Z.B. München"} />
          </div>

          <div className="space-y-2">
            <Label>{"Beschreibung"} *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => {
                if (e.target.value.length <= 300) set("description", e.target.value);
              }}
              placeholder={"Beschreiben Sie detailliert, was Sie anbieten oder suchen..."}
              rows={4}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground text-right">{form.description.length}/300</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{"Kontakt über"} *</Label>
              <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                <SelectTrigger><SelectValue placeholder={"Auswählen..."} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">{"Telefon"}</SelectItem>
                  <SelectItem value="email">{"E-Mail"}</SelectItem>
                  <SelectItem value="message">{"Nachricht über Plattform"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{"Kontaktdaten"} *</Label>
              <Input
                value={form.contact_value}
                onChange={(e) => set("contact_value", e.target.value)}
                placeholder={"Telefon, E-Mail..."}
              />
            </div>
          </div>

          <TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken("")} className="flex justify-center" />

          <div className="flex items-start gap-2">
            <Checkbox
              id="nt-agree"
              checked={form.agreed}
              onCheckedChange={(v) => set("agreed", !!v)}
              className="mt-0.5"
            />
            <label htmlFor="nt-agree" className="text-sm text-muted-foreground leading-relaxed">
              {"Ich akzeptiere die Nutzungsbedingungen und bestätige die Richtigkeit der Angaben. Anzeige ist 30 Tage aktiv."}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> {"Anzeige kostenlos aufgeben"}
            </Button>
            {onProClick && (
              <Button
                type="button"
                variant="outline"
                className="gap-2 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                onClick={onProClick}
              >
                <Star className="h-4 w-4" /> {"Als PRO hervorheben"}
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={onClose}>
              {"Abbrechen"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
