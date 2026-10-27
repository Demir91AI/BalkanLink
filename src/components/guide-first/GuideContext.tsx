import { createContext, useContext } from "react";
import type { GuideSource } from "@/lib/guide-first/official-sources";

export const GuideContext = createContext<{ slug: string; source: GuideSource } | null>(null);
export const useGuideContext = () => useContext(GuideContext);