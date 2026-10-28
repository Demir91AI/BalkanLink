import { useCallback, useState } from "react";
import { loadState, storeState, type LearningState } from "@/lib/trainer/core/learning-state";

/** Device-local resume/review state with write-through persistence. */
export function useLearningState() {
  const [state, setState] = useState<LearningState>(loadState);
  const update = useCallback((fn: (s: LearningState) => LearningState) => {
    setState((prev) => { const next = fn(prev); storeState(next); return next; });
  }, []);
  return { state, update };
}
