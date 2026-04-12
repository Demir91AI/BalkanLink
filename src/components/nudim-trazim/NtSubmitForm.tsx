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

    // Persist ad to Supabase
    try {
      const { data: session } = await supabase.auth.getSession();
      const userId = session?.session?.user?.id;
      
      const { data: insertedAd, error: insertErr } = await supabase.from("ads" as any).insert({
        type: form.type === "nudim" ? "OFFERING" : "SEEKING",
        title: form.title.trim(),
        category: form.category,
        city: form.city.trim(),
        description: form.description.trim(),
        contact_type: form.contact_type === "phone" ? "PHONE" : "EMAIL",
        contact_value: form.contact_value.trim(),
        bundesland: "Sonstige",
        domain: "SERVICE",
        owner_email: session?.session?.user?.email || form.contact_value.trim(),
        user_id: userId,
      } as any).select("id").single();

      if (!insertErr && insertedAd) {
        // Fire notification to subscribers (non-blocking)
        supabase.functions.invoke("notify-new-classified", {
          body: {
            ad_id: (insertedAd as any).id,
            title: form.title.trim(),
            description: form.description.trim(),
            category: form.category,
          },
        }).catch(() => {});
      }
    } catch {}

    toast.success("Oglas uspješno poslan! Biće vidljiv nakon provjere.");
    onClose();
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">{"Objavi oglas besplatno"}</CardTitle>
        <p className="text-sm text-muted-foreground">{"Objavljivanje je besplatno. Nakon toga možeš istaknuti oglas kao PRO."}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{"Tip oglasa"} *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue placeholder={"Odaberi..."} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nudim">{"Nudim"}</SelectItem>
                  <SelectItem value="trazim">{"Tražim"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{"Kategorija"} *</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger><SelectValue placeholder={"Odaberi..."} /></SelectTrigger>
                <SelectContent>
                  {NT_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{"Naslov oglasa"} *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={"Npr. Nudim pomoć pri selidbi"} />
          </div>

          <div className="space-y-2">
            <Label>{"Grad / Mjesto"} *</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder={"Npr. München"} />
          </div>

          <div className="space-y-2">
            <Label>{"Opis"} *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => {
                if (e.target.value.length <= 300) set("description", e.target.value);
              }}
              placeholder={"Detaljno opišite šta nudite ili tražite..."}
              rows={4}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground text-right">{form.description.length}/300</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{"Kontakt putem"} *</Label>
              <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                <SelectTrigger><SelectValue placeholder={"Odaberi..."} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">{"Telefon"}</SelectItem>
                  <SelectItem value="email">{"E-Mail"}</SelectItem>
                  <SelectItem value="message">{"Poruka preko platforme"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{"Kontakt podaci"} *</Label>
              <Input
                value={form.contact_value}
                onChange={(e) => set("contact_value", e.target.value)}
                placeholder={"Telefon, e-mail..."}
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
              {"Prihvatam uslove korištenja i potvrđujem tačnost podataka. Oglas je aktivan 30 dana."}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> {"Objavi oglas besplatno"}
            </Button>
            {onProClick && (
              <Button
                type="button"
                variant="outline"
                className="gap-2 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                onClick={onProClick}
              >
                <Star className="h-4 w-4" /> {"Istakni kao PRO"}
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={onClose}>
              {"Otkaži"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
