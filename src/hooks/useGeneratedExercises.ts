import { useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Exercise } from "@/lib/trainer/types";

const BATCH_SIZE = 15;

const cache = new Map<string, Exercise[]>();

function cacheKey(level: string, topic: string, stageType: string): string {
  return `${level}::${topic}::${stageType}`;
}

export function useGeneratedExercises() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef(false);

  const generate = useCallback(
    async (
      level: string,
      topic: string,
      stageType: string,
      count: number
    ): Promise<Exercise[]> => {
      const key = cacheKey(level, topic, stageType);

      const cached = cache.get(key);
      if (cached && cached.length >= count) return cached.slice(0, count);

      abortRef.current = false;
      setLoading(true);
      setError(null);

      const allExercises: Exercise[] = cached ? [...cached] : [];

      try {
        const remaining = count - allExercises.length;
        const batches = Math.ceil(remaining / BATCH_SIZE);

        for (let i = 0; i < batches; i++) {
          if (abortRef.current) break;

          const batchCount = Math.min(BATCH_SIZE, remaining - i * BATCH_SIZE);

          let lastErr: string | null = null;
          let batchExercises: Exercise[] = [];

          // Retry up to 3 times with increasing delay for transient 503s
          for (let attempt = 0; attempt < 3; attempt++) {
            const { data, error: fnError } = await supabase.functions.invoke(
              "generate-trainer-exercises",
              { body: { level, topic, stageType, count: batchCount } }
            );

            if (fnError) {
              lastErr = fnError.message;
              // Retry on 503/network errors
              if (attempt < 2) {
                await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
                continue;
              }
              throw new Error(lastErr);
            }
            if (data?.error) {
              lastErr = data.error;
              if (attempt < 2 && (data.error.includes("unavailable") || data.error.includes("try again"))) {
                await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
                continue;
              }
              throw new Error(lastErr);
            }

            batchExercises = data?.exercises ?? [];
            break; // Success
          }

          allExercises.push(...batchExercises);
          cache.set(key, [...allExercises]);
        }

        return allExercises.slice(0, count);
      } catch (e: any) {
        const msg = e?.message || "Fehler beim Generieren";
        setError(msg);
        console.error("Exercise generation error:", msg);
        // Return whatever we have so far
        return allExercises;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearCache = useCallback(() => cache.clear(), []);

  return { generate, loading, error, clearCache };
}
