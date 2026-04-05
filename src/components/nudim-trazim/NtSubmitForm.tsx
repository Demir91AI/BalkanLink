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
import { useSectionT } from "@/hooks/useSectionT";
import { toast } from "sonner";

interface Props {
  onClose: () => void;
  onProClick?: () => void;
}

export default function NtSubmitForm({ onClose, onProClick }: Props) {
  const st = useSectionT();
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
      toast.error(st("nt.fillAll"));
      return;
    }
    if (!form.agreed) {
      toast.error(st("nt.acceptTerms"));
      return;
    }
    toast.success(st("nt.submitSuccess"));
    onClose();
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">{st("nt.formTitle")}</CardTitle>
        <p className="text-sm text-muted-foreground">{st("nt.formDesc")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{st("nt.adType")} *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue placeholder={st("nt.select")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nudim">{st("nt.offerDe")}</SelectItem>
                  <SelectItem value="trazim">{st("nt.seekDe")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{st("nt.category")} *</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger><SelectValue placeholder={st("nt.select")} /></SelectTrigger>
                <SelectContent>
                  {NT_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{st("nt.adTitle")} *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={st("nt.adTitlePlaceholder")} />
          </div>

          <div className="space-y-2">
            <Label>{st("nt.city")} *</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder={st("nt.cityExample")} />
          </div>

          <div className="space-y-2">
            <Label>{st("nt.description")} *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder={st("nt.descPlaceholder")}
              rows={4}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{st("nt.contactVia")} *</Label>
              <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                <SelectTrigger><SelectValue placeholder={st("nt.select")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">{st("nt.phone")}</SelectItem>
                  <SelectItem value="email">{st("nt.email")}</SelectItem>
                  <SelectItem value="message">{st("nt.message")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{st("nt.contactData")} *</Label>
              <Input
                value={form.contact_value}
                onChange={(e) => set("contact_value", e.target.value)}
                placeholder={st("nt.contactPlaceholder")}
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
              {st("nt.agreeTerms")}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> {st("nt.submitFree")}
            </Button>
            {onProClick && (
              <Button
                type="button"
                variant="outline"
                className="gap-2 border-[hsl(var(--gold))]/40 text-[hsl(var(--gold))] hover:bg-[hsl(var(--gold))]/10"
                onClick={onProClick}
              >
                <Star className="h-4 w-4" /> {st("nt.highlightPro")}
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={onClose}>
              {st("nt.cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
