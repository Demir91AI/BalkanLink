import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ORIGIN_COUNTRIES, DIRECTORY_CATEGORIES, GERMAN_CITIES } from "@/lib/directory-constants";
import { Send } from "lucide-react";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";

const schema = z.object({
  name: z.string().trim().min(2, "Minimalno 2 karaktera").max(100),
  category: z.string().min(1, "Obavezno polje"),
  city: z.string().min(1, "Obavezno polje"),
  origin_country: z.string().min(1, "Obavezno polje"),
  address: z.string().trim().max(200).optional().or(z.literal("")),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  description: z.string().trim().max(500).optional().or(z.literal("")),
});

type FormValues = z.infer<typeof schema>;

export default function DirectorySubmit() {
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
      toast.error("Anmeldung erforderlich");
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
      toast.error("Fehler beim Senden.");
      return;
    }

    import("@/lib/admin-notify").then(({ notifyAdmin }) => {
      notifyAdmin("admin-new-business", {
        kind: "directory",
        name: values.name,
        category: values.category,
        city: values.city,
        description: values.description || null,
        contact: values.phone || values.website || null,
        createdAt: new Date().toISOString(),
      });
    }).catch(() => {});

    toast.success("Erfolgreich hinzugefügt!");
    navigate("/directory");
  };

  return (
    <div className="container max-w-2xl py-8">
      <Breadcrumbs />

      <h1 className="mb-2 text-2xl font-bold">{"Dodaj firmu"}</h1>
      <p className="mb-8 text-muted-foreground">{"Dodaj svoju firmu u imenik"}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{"Name"} *</FormLabel>
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
                  <FormLabel>{"Kategorija"} *</FormLabel>
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
                  <FormLabel>{"Grad"} *</FormLabel>
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
                <FormLabel>{"Zemlja porijekla"} *</FormLabel>
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
                <FormLabel>{"Adresa"}</FormLabel>
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
                  <FormLabel>{"Telefon"}</FormLabel>
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
                  <FormLabel>{"Web stranica"}</FormLabel>
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
                <FormLabel>{"Opis"}</FormLabel>
                <FormControl><Textarea {...field} maxLength={500} rows={3} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <Send className="mr-2 h-4 w-4" />
            {submitting ? "Šaljem..." : "Pošalji"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
