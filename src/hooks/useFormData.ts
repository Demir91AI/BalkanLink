import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useForms() {
  return useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const { data, error } = await supabase.from("forms").select("*").order("name");
      if (error) throw error;
      return data;
    },
  });
}

export function useFormBySlug(slug: string) {
  return useQuery({
    queryKey: ["form", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .eq("slug", slug)
        .single();
      if (error) throw error;
      return data;
    },
  });
}

export function useFormFields(formSlug: string) {
  return useQuery({
    queryKey: ["form_fields", formSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("form_fields")
        .select("*")
        .eq("form_slug", formSlug)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });
}

export function useFieldMappings(formSlug: string) {
  return useQuery({
    queryKey: ["field_mapping", formSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("field_mapping")
        .select("*")
        .eq("form_slug", formSlug);
      if (error) throw error;
      return data;
    },
  });
}
