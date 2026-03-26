import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Exercise } from "@/lib/trainer/types";

interface CacheKey {
  level: string;
  topic: string;
  stageType: string;
  count: number;
}

const cache = new Map<string, Exercise[]>();

function cacheKey(k: CacheKey): string {
  return `${k.level}::${k.topic}::${k.stageType}::${k.count}`;
}

export function useGeneratedExercises() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(
    async (
      level: string,
      topic: string,
      stageType: string,
      count: number
    ): Promise<Exercise[]> => {
      const key = cacheKey({ level, topic, stageType, count });

      // Return cached if available
      const cached = cache.get(key);
      if (cached) return cached;

      // Abort previous in-flight request
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const { data, error: fnError } = await supabase.functions.invoke(
          "generate-trainer-exercises",
          {
            body: { level, topic, stageType, count },
          }
        );

        if (fnError) throw new Error(fnError.message);
        if (data?.error) throw new Error(data.error);

        const exercises: Exercise[] = data?.exercises ?? [];
        if (exercises.length > 0) {
          cache.set(key, exercises);
        }
        return exercises;
      } catch (e: any) {
        if (e?.name === "AbortError") return [];
        const msg = e?.message || "Fehler beim Generieren";
        setError(msg);
        console.error("Exercise generation error:", msg);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearCache = useCallback(() => cache.clear(), []);

  return { generate, loading, error, clearCache };
}
