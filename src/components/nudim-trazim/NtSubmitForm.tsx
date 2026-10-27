import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
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

interface Props {
  onClose: () => void;
}

export default function NtSubmitForm({ onClose }: Props) {
  const { t } = useTranslation("pages");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.type || !form.title || !form.category || !form.city || !form.description || !form.contact_type || !form.contact_value) {
      toast.error(t("classifieds.form.errorRequired"));
      return;
    }
    if (!form.agreed) {
      toast.error(t("classifieds.form.errorAgree"));
      return;
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

    import("@/lib/admin-notify").then(({ notifyAdmin }) => {
      notifyAdmin("admin-new-business", {
        kind: "classified",
        name: form.title.trim(),
        category: form.category,
        city: form.city.trim(),
        description: form.description.trim(),
        contact: `${form.contact_type}: ${form.contact_value.trim()}`,
        createdAt: new Date().toISOString(),
      });
    }).catch(() => {});

    toast.success(t("classifieds.form.success"));
    onClose();
  };

  return (
    <Card className="border-border/60">
      <CardHeader>
        <CardTitle className="text-xl">{t("classifieds.form.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("classifieds.form.subtitle")}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("classifieds.form.typeLabel")} *</Label>
              <Select value={form.type} onValueChange={(v) => set("type", v)}>
                <SelectTrigger><SelectValue placeholder={t("classifieds.form.selectPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="nudim">{t("classifieds.form.offering")}</SelectItem>
                  <SelectItem value="trazim">{t("classifieds.form.seeking")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("classifieds.form.categoryLabel")} *</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v)}>
                <SelectTrigger><SelectValue placeholder={t("classifieds.form.selectPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  {NT_CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{t(`classifieds.categories.${c.value}`, c.label)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("classifieds.form.titleLabel")} *</Label>
            <Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder={t("classifieds.form.titlePlaceholder")} />
          </div>

          <div className="space-y-2">
            <Label>{t("classifieds.form.cityLabel")} *</Label>
            <Input value={form.city} onChange={(e) => set("city", e.target.value)} placeholder={t("classifieds.form.cityPlaceholder")} />
          </div>

          <div className="space-y-2">
            <Label>{t("classifieds.form.descriptionLabel")} *</Label>
            <Textarea
              value={form.description}
              onChange={(e) => {
                if (e.target.value.length <= 300) set("description", e.target.value);
              }}
              placeholder={t("classifieds.form.descriptionPlaceholder")}
              rows={4}
              maxLength={300}
            />
            <p className="text-xs text-muted-foreground text-right">{form.description.length}/300</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("classifieds.form.contactTypeLabel")} *</Label>
              <Select value={form.contact_type} onValueChange={(v) => set("contact_type", v)}>
                <SelectTrigger><SelectValue placeholder={t("classifieds.form.selectPlaceholder")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="phone">{t("classifieds.form.contactTypePhone")}</SelectItem>
                  <SelectItem value="email">{t("classifieds.form.contactTypeEmail")}</SelectItem>
                  <SelectItem value="message">{t("classifieds.form.contactTypeMessage")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("classifieds.form.contactValueLabel")} *</Label>
              <Input
                value={form.contact_value}
                onChange={(e) => set("contact_value", e.target.value)}
                placeholder={t("classifieds.form.contactValuePlaceholder")}
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
              {t("classifieds.form.agree")}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" /> {t("classifieds.form.submit")}
            </Button>
            <Button type="button" variant="ghost" onClick={onClose}>
              {t("classifieds.form.cancel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
