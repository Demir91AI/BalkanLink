import { useState, useCallback } from "react";
import { MAX_LEVEL } from "@/lib/trainer/types";

interface TrainerProgress {
  xp: number;
  streak: number;
  lastDate: string;
  completedLessons: string[];
  level: number;
}

const STORAGE_KEY = "balkanlink_trainer";

function load(): TrainerProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed._v3) {
        localStorage.removeItem(STORAGE_KEY);
        return { xp: 0, streak: 0, lastDate: "", completedLessons: [], level: 1 };
      }
      return parsed;
    }
  } catch {}
  return { xp: 0, streak: 0, lastDate: "", completedLessons: [], level: 1 };
}

function save(p: TrainerProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...p, _v3: true }));
}

/** XP thresholds: level N requires N*100 total XP, capped at MAX_LEVEL */
function computeLevel(xp: number): number {
  const lvl = Math.floor(xp / 100) + 1;
  return Math.min(lvl, MAX_LEVEL);
}

export function useTrainerProgress() {
  const [progress, setProgress] = useState<TrainerProgress>(load);

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
      save(next);
      return next;
    });
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      const next = { ...prev, completedLessons: [...prev.completedLessons, lessonId] };
      save(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: TrainerProgress = { xp: 0, streak: 0, lastDate: "", completedLessons: [], level: 1 };
    save(fresh);
    setProgress(fresh);
  }, []);

  return { progress, addXp, completeLesson, resetProgress };
}
