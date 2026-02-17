import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type QaItem = Tables<"qa_items">;

interface UseQaItemsOptions {
  search?: string;
  category?: string;
}

export function useQaItems({ search, category }: UseQaItemsOptions = {}) {
  return useQuery({
    queryKey: ["qa_items", search, category],
    queryFn: async () => {
      let query = supabase
        .from("qa_items")
        .select("*")
        .order("last_updated", { ascending: false });

      if (category) {
        query = query.eq("category", category);
      }
      if (search) {
        query = query.or(
          `question.ilike.%${search}%,short_answer.ilike.%${search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as QaItem[];
    },
  });
}

export function useQaItem(id: string) {
  return useQuery({
    queryKey: ["qa_item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("qa_items")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data as QaItem;
    },
    enabled: !!id,
  });
}
