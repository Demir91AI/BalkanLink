import { useState, useCallback, useEffect, useRef } from "react";
import { MAX_LEVEL } from "@/lib/trainer/types";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface TrainerProgress {
  xp: number;
  streak: number;
  lastDate: string;
  completedLessons: string[];
  level: number;
}

const STORAGE_KEY = "balkanlink_trainer";
const EMPTY: TrainerProgress = { xp: 0, streak: 0, lastDate: "", completedLessons: [], level: 1 };

function loadLocal(): TrainerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed._v3) { localStorage.removeItem(STORAGE_KEY); return { ...EMPTY }; }
      return parsed;
    }
  } catch {}
  return { ...EMPTY };
}

function saveLocal(p: TrainerProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...p, _v3: true }));
}

function computeLevel(xp: number): number {
  return Math.min(Math.floor(xp / 100) + 1, MAX_LEVEL);
}

/** Debounced DB sync — avoids spamming on every answer */
function useDebouncedSync() {
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const sync = useCallback((userId: string, p: TrainerProgress) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      await supabase.from("trainer_progress").upsert({
        user_id: userId,
        xp: p.xp,
        streak: p.streak,
        level: p.level,
        completed_lessons: p.completedLessons,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" });
    }, 1500);
  }, []);
  return sync;
}

export function useTrainerProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<TrainerProgress>(loadLocal);
  const [dbLoaded, setDbLoaded] = useState(false);
  const syncToDb = useDebouncedSync();

  // Load from DB on login — merge with local (take the better one)
  useEffect(() => {
    if (!user) { setDbLoaded(false); return; }
    let cancelled = false;

    (async () => {
      const { data } = await supabase
        .from("trainer_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (cancelled) return;

      const local = loadLocal();

      if (data) {
        const db: TrainerProgress = {
          xp: data.xp ?? 0,
          streak: data.streak ?? 0,
          lastDate: "",
          completedLessons: (data.completed_lessons as string[]) ?? [],
          level: data.level ?? 1,
        };

        // Merge: take whichever has more progress
        const merged: TrainerProgress = {
          xp: Math.max(local.xp, db.xp),
          streak: Math.max(local.streak, db.streak),
          lastDate: local.lastDate,
          completedLessons: [...new Set([...local.completedLessons, ...db.completedLessons])],
          level: Math.max(local.level, db.level),
        };
        merged.level = computeLevel(merged.xp);
        saveLocal(merged);
        setProgress(merged);
        // Sync merged back to DB if local had more
        if (merged.xp > db.xp || merged.completedLessons.length > db.completedLessons.length) {
          syncToDb(user.id, merged);
        }
      } else {
        // No DB record yet — push local to DB
        if (local.xp > 0 || local.completedLessons.length > 0) {
          syncToDb(user.id, local);
        }
      }
      setDbLoaded(true);
    })();

    return () => { cancelled = true; };
  }, [user?.id]);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      let streak = prev.streak;
      if (prev.lastDate === yesterday) streak += 1;
      else if (prev.lastDate !== today) streak = 1;

      const newXp = prev.xp + amount;
      const newLevel = computeLevel(newXp);
      const next = { ...prev, xp: newXp, streak, lastDate: today, level: newLevel };
      saveLocal(next);
      if (user) syncToDb(user.id, next);
      return next;
    });
  }, [user, syncToDb]);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
      saveLocal(next);
      if (user) syncToDb(user.id, next);
      return next;
    });
  }, [user, syncToDb]);

  const resetProgress = useCallback(() => {
    const fresh: TrainerProgress = { ...EMPTY };
    saveLocal(fresh);
    setProgress(fresh);
    if (user) syncToDb(user.id, fresh);
  }, [user, syncToDb]);

  return { progress, addXp, completeLesson, resetProgress };
}
