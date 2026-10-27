import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import i18n from "i18next";
import "../src/i18n";
import "../src/index.css";
import KindergeldGuideContent from "@/components/KindergeldGuideContent";
import WohngeldGuideContent from "@/components/guides/WohngeldGuideContent";
import BurgergeldGuideContent from "@/components/guides/BurgergeldGuideContent";
import FormFreeContent from "@/components/FormFreeContent";
import FormSmartGuide from "@/components/FormSmartGuide";
import OfficialNextStep from "@/components/guide-first/OfficialNextStep";
import { getGuideBySlug } from "@/lib/guide-data";
const q = new URLSearchParams(location.search);
i18n.changeLanguage(q.get("lang") || "bs");
const slug = q.get("slug") || "kindergeld";
const g = getGuideBySlug(slug);
const body = slug === "kindergeld" ? <KindergeldGuideContent /> : slug === "wohngeld" ? <><WohngeldGuideContent /><OfficialNextStep slug={slug} /></> : slug === "burgergeld" ? <><BurgergeldGuideContent /><OfficialNextStep slug={slug} /></> : g ? <><FormFreeContent guide={g} lang="bs" /><FormSmartGuide guide={g} lang="bs" /><OfficialNextStep slug={slug} /></> : <p>no guide</p>;
createRoot(document.getElementById("root")!).render(
  <MemoryRouter><div style={{ background: "#020617" }}><div className="guide-dark-surface min-h-screen bg-background px-4 pt-6 pb-28" data-testid="guide-dark-surface">{body}</div></div></MemoryRouter>);
