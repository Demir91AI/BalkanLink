import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { navigateBackOrHome } from "@/lib/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ORIGIN_COUNTRIES, DIRECTORY_CATEGORIES, GERMAN_CITIES } from "@/lib/directory-constants";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().trim().min(2, "Min 2 characters").max(100),
  category: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  origin_country: z.string().min(1, "Required"),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function DirectorySubmit() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      city: "",
      origin_country: "",
      address: "",
      phone: "",
      website: "",
      description: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error(t("dir.loginRequired"));
      navigate("/login");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("directory_listings").insert({
      name: values.name,
      category: values.category,
      city: values.city,
      origin_country: values.origin_country,
      address: values.address || null,
      phone: values.phone || null,
      website: values.website || null,
      description: values.description || null,
    });
    setSubmitting(false);

    if (error) {
      toast.error(t("dir.submitError"));
      return;
    }

    toast.success(t("dir.submitSuccess"));
    navigate("/directory");
  };

  return (
    <div className="container max-w-2xl py-8">
      <button onClick={() => navigateBackOrHome(navigate)} className="back-button">
        <ChevronLeft className="h-4 w-4" /> Nazad
      </button>

      <h1 className="mb-2 text-2xl font-bold">{t("dir.submitTitle")}</h1>
      <p className="mb-8 text-muted-foreground">{t("dir.submitSubtitle")}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dir.fieldName")} *</FormLabel>
                <FormControl><Input {...field} maxLength={100} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dir.fieldCategory")} *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {DIRECTORY_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dir.fieldCity")} *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      {GERMAN_CITIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="origin_country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dir.fieldOrigin")} *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    {ORIGIN_COUNTRIES.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        <span className="mr-2">{c.flag}</span>{c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dir.fieldAddress")}</FormLabel>
                <FormControl><Input {...field} maxLength={200} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dir.fieldPhone")}</FormLabel>
                  <FormControl><Input {...field} maxLength={30} type="tel" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("dir.fieldWebsite")}</FormLabel>
                  <FormControl><Input {...field} maxLength={200} placeholder="https://" /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("dir.fieldDescription")}</FormLabel>
                <FormControl><Textarea {...field} maxLength={500} rows={3} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <Send className="mr-2 h-4 w-4" />
            {submitting ? t("dir.submitting") : t("dir.submit")}
          </Button>
        </form>
      </Form>
    </div>
  );
}
