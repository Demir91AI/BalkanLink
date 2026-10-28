import { describe, it, expect, vi } from "vitest";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { assistantGuideProjection } from "../../scripts/generate-assistant-guides";
import { GUIDE_SNAPSHOT } from "../../supabase/functions/chat-assistant/guide-snapshot";
import * as guides from "../../supabase/functions/chat-assistant/guide-context";
import { meterStream } from "../../supabase/functions/_shared/usage";
import { getAllFormEntries } from "./form-catalog";
import { isValidProductionRoute } from "./canonical-routes";
import { autoLinkAssistantText } from "./assistant-links";

const question = "Dobio sam dijete u Njemačkoj, kako podnijeti zahtjev za Kindergeld?";
function endpoint(premium = true, reservation = { ok: true, mode: "full" }, callAI = true) {
  let handler: (r: Request) => Promise<Response> = async () => new Response();
  const commit = vi.fn(async () => {}), release = vi.fn(async () => {}), reserve = vi.fn(async () => reservation);
  const fetchMock = vi.fn(async (_url: string, _init?: RequestInit) => new Response(guides.guideReplyStream("mock general answer")));
  const source = readFileSync("supabase/functions/chat-assistant/index.ts", "utf8").replace(/^import .*;\n/gm, "");
  const js = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
  vm.runInNewContext(js, {
    serve: (h: typeof handler) => { handler = h; }, FORM_CATALOG: guides.ASSISTANT_CATALOG,
    ...guides, fetch: fetchMock, Request, Response, ReadableStream, TextEncoder, console: { log() {}, error() {} },
    Deno: { env: { get: () => "isolated" } },
    createClient: () => ({ auth: { getClaims: async () => ({ data: { claims: { sub: "isolated" } } }) }, rpc: async (name: string) => ({ data: name === "_entitlement_core" ? { full_access: premium } : [], error: null }) }),
    reserveUsage: reserve, commitUsage: commit, releaseUsage: release, meterStream,
    assistantGate: () => callAI ? { callAI: true } : { callAI: false, body: { errorCode: "QUOTA_EXHAUSTED" }, status: 429 },
  });
  return { handler, commit, release, reserve, fetchMock };
}
const request = (text: string, language = "bs", page = "/formulari/wohngeld", preceding: guides.GuideMessage[] = []) => new Request("http://localhost/test", { method: "POST", headers: { Authorization: "Bearer isolated" }, body: JSON.stringify({ messages: [...preceding, { role: "user", content: text }], language, currentPage: page }) });

describe("assistant guide projection and routing", () => {
  it("is exactly the current catalog, four locale steps and recorded sources", () => {
    expect(GUIDE_SNAPSHOT).toEqual(assistantGuideProjection());
    expect(GUIDE_SNAPSHOT.catalog.map(f => f.slug)).toEqual(getAllFormEntries().map(f => f.slug));
  });
  for (const [text, slug] of [[question,"kindergeld"],["Šta je Anmeldung?","anmeldung"],["Kako podnijeti Wohngeld?","wohngeld"],["Schüler-BAföG","schueler-bafoeg"],["Steuer-ID","steuer-id"],["Krankenkasse","krankenkasse"]]) it(`resolves ${slug}`, () => {
    expect(guides.detectAssistantGuide(text)).toBe(slug);
    expect(isValidProductionRoute(guides.assistantGuideRoute(slug))).toBe(true);
  });
  it("never guesses unknown or multiple-topic guides from an unrelated current page", () => {
    expect(guides.detectAssistantGuide("nepoznati zahtjev")).toBeNull();
    expect(guides.resolveSourceGuide("nepoznati zahtjev", "/formulari/kindergeld")).toBeNull();
    expect(guides.resolveSourceGuide("Kindergeld i Wohngeld")).toBeNull();
    expect(guides.assistantGuideRoute(null)).toBe("/formulari");
  });
  it("inherits only explicit contextual questions from exact localized guide URLs", () => {
    expect(guides.resolveSourceGuide("Pitaj o ovom", "/de/formulari/kindergeld")).toBe("kindergeld");
    expect(guides.resolveSourceGuide("Pitaj o ovom", "/formulari/kindergeld-fake")).toBeNull();
  });
  it("all catalog slugs validate in four locale paths; unknown, suffix and traversal do not", () => {
    for (const f of getAllFormEntries()) for (const prefix of ["", "/de", "/hr", "/sr"]) expect(isValidProductionRoute(`${prefix}/formulari/${f.slug}?from=chat#step`)).toBe(true);
    for (const path of ["/formulari/fake", "/de/formulari/fake", "/formulari/kindergeld/more", "/formulari/../admin"]) expect(isValidProductionRoute(path)).toBe(false);
  });
  it("Markdown labels, official links and code survive keyword auto-linking", () => {
    const text = "[Kindergeld vodič](/formulari/kindergeld) [Familienkasse Kindergeld](https://www.arbeitsagentur.de/kindergeld) `Kindergeld`";
    expect(autoLinkAssistantText(text, [[/Kindergeld/g, "/formulari/kindergeld"]])).toBe(text);
    expect(autoLinkAssistantText("Kindergeld i Kindergeld", [[/Kindergeld/g, "/formulari/kindergeld"]])).toBe("[Kindergeld](/formulari/kindergeld) i Kindergeld");
  });
  it("Anmeldung is locality-qualified and Wohngeld never silently selects Bayern", () => {
    expect(GUIDE_SNAPSHOT.sources.anmeldung.kind).toBe("local");
    expect(GUIDE_SNAPSHOT.sources.anmeldung.label).toContain("Brandenburg");
    expect(GUIDE_SNAPSHOT.sources.wohngeld.url).toBe("https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99107023037000");
    expect(guides.buildSourceGuideReply("wohngeld", "bs")).not.toContain("stmb.bayern.de");
  });
});

describe("actual staged assistant handler, isolated dependencies", () => {
  for (const lang of ["bs","hr","sr","de"]) for (const topic of ["kindergeld","anmeldung","wohngeld"] as const) it(`${topic}/${lang}: real handler returns source steps and metered stream, without model calls`, async () => {
    const e = endpoint(); const response = await e.handler(request(topic === "kindergeld" ? question : `Šta je ${topic}?`, lang));
    const body = await response.text();
    expect(response.headers.get("X-Guide-Slug")).toBe(topic);
    expect(body).toContain(`/formulari/${topic}`);
    expect(body).toContain(GUIDE_SNAPSHOT.sources[topic].verifiedOn);
    const ids = topic === "kindergeld" ? ["documents", "portal", "submit"] : topic === "anmeldung" ? ["move", "housing", "submit"] : ["office", "evidence", "submit"];
    for (const step of GUIDE_SNAPSHOT.locales[lang as guides.GuideLocale].guides[topic].steps.filter(s => ids.includes(s.id))) expect(body).toContain(step.title);
    expect(e.reserve).toHaveBeenCalledTimes(1); expect(e.commit).toHaveBeenCalledTimes(1); expect(e.release).not.toHaveBeenCalled(); expect(e.fetchMock).not.toHaveBeenCalled();
  });
  it("free detailed requests retain their existing gate and get official source/guide overview only", async () => {
    const e = endpoint(false); const r = await e.handler(request("Kindergeld korak po korak")); const body = await r.json();
    expect(body.premium_required).toBe(true); expect(body.content).toContain("/formulari/kindergeld");
    expect(body.content).toContain(GUIDE_SNAPSHOT.sources.kindergeld.url); expect(e.reserve).not.toHaveBeenCalled();
  });
  it("unknown form intent redirects to catalog, never Kindergeld", async () => {
    const e = endpoint(false); const r = await e.handler(request("kako popuniti nepoznato")); const body = await r.json();
    expect(body.guideSlug).toBeNull(); expect(body.content).toContain("](/formulari)"); expect(body.content).not.toContain("kindergeld");
  });
  it("unknown general topic keeps ordinary conversation and adds uncertainty constraints", async () => {
    const e = endpoint(); await (await e.handler(request("Šta je nepoznata usluga?"))).text();
    expect(e.fetchMock).toHaveBeenCalledTimes(1);
    const init = e.fetchMock.mock.calls[0]?.[1] as RequestInit | undefined;
    expect(JSON.parse(String(init?.body)).messages[0].content).toContain("Never invent a /formulari/ slug");
  });
  it("quota rejection happens before sourced answer or model call", async () => {
    const e = endpoint(true, { ok: false, mode: "full" }, false); const r = await e.handler(request(question));
    expect(r.status).toBe(429); expect((await r.json()).errorCode).toBe("QUOTA_EXHAUSTED"); expect(e.commit).not.toHaveBeenCalled(); expect(e.fetchMock).not.toHaveBeenCalled();
  });
  it("unsafe requests retain safety-first behavior before guide or quota processing", async () => {
    const e = endpoint(); const body = await (await e.handler(request("Kindergeld prevara"))).json();
    expect(body.safety_blocked).toBe(true); expect(e.reserve).not.toHaveBeenCalled(); expect(e.fetchMock).not.toHaveBeenCalled();
  });
});

describe("bounded conversational guidance", () => {
  const message = (content: string) => ({ role: "user", content });
  for (const lang of ["bs","hr","sr","de"] as const) {
    it(`${lang}: asks only missing Kindergeld case, not personal details; known newborn does not repeat it`, () => {
      const q = guides.buildConversationGuideReply("kindergeld", lang, [message("Kindergeld")]);
      expect(q).toContain(GUIDE_SNAPSHOT.locales[lang].ui.conversation.kindergeldQuestion);
      const reply = guides.buildConversationGuideReply("kindergeld", lang, [message(question)]);
      expect(reply).not.toContain(GUIDE_SNAPSHOT.locales[lang].ui.conversation.kindergeldQuestion);
      expect(reply.match(/\n\n\d\. \*\*/g)).toHaveLength(3);
      expect(reply).toContain(GUIDE_SNAPSHOT.sources.kindergeld.url);
    });
    it(`${lang}: documents follow-up keeps newborn context and selects preparation only`, async () => {
      const preceding = [message(question), { role: "assistant", content: guides.buildConversationGuideReply("kindergeld", lang, [message(question)]) }];
      const e = endpoint(); const r = await e.handler(request("Dokumenti", lang, "/formulari/wohngeld", preceding)); const text = await r.text();
      expect(r.headers.get("X-Guide-Slug")).toBe("kindergeld");
      expect(text).toContain(GUIDE_SNAPSHOT.locales[lang].guides.kindergeld.steps[1].title);
      expect(text).not.toContain(GUIDE_SNAPSHOT.locales[lang].guides.kindergeld.steps[5].title);
      expect(e.reserve).toHaveBeenCalledTimes(1);expect(e.commit).toHaveBeenCalledTimes(1);expect(e.fetchMock).not.toHaveBeenCalled();
    });
    it(`${lang}: special cases never reuse newborn steps`, () => {
      for (const [text, special] of [["Kindergeld punoljetno dijete", "adult"], ["Kindergeld dijete u inostranstvu", "cross"]] as const) {
        const reply = guides.buildConversationGuideReply("kindergeld", lang, [message(text)]);
        expect(reply).toContain(GUIDE_SNAPSHOT.specialLinks[special]);
        expect(reply).not.toContain(GUIDE_SNAPSHOT.locales[lang].guides.kindergeld.steps[1].title);
      }
    });
    it(`${lang}: local guides prepare evidence, qualify jurisdiction and do not invent forms`, () => {
      for (const topic of ["anmeldung", "wohngeld"] as const) {
        const reply = guides.buildConversationGuideReply(topic, lang, [message(topic)]);
        expect(reply.match(/\n\n\d\. \*\*/g)).toHaveLength(3);
        expect(reply).toContain(GUIDE_SNAPSHOT.locales[lang].ui.conversation[topic === "anmeldung" ? "local" : "wohngeld"]);
        expect(reply).not.toContain("stmb.bayern.de");
        expect(reply).toContain(GUIDE_SNAPSHOT.sources[topic].url);
      }
    });
    it(`${lang}: all steps remain available on explicit request`, () => {
      const reply = guides.buildConversationGuideReply("kindergeld", lang, [message(question), message("svi koraci")]);
      for (const s of GUIDE_SNAPSHOT.locales[lang].guides.kindergeld.steps) expect(reply).toContain(s.title);
    });
    it(`${lang}: visa retains the exact model and metering path with bounded official navigation`, async () => {
      const e = endpoint();await (await e.handler(request("Trebam vizu za Njemačku, državljanin sam BiH", lang))).text();
      const body = JSON.parse(String(e.fetchMock.mock.calls[0]?.[1]?.body));
      expect(body.model).toBe("google/gemini-2.5-flash");expect(body.max_tokens).toBe(1024);
      expect(body.messages[0].content).toContain(GUIDE_SNAPSHOT.locales[lang].ui.conversation.visa);
      expect(body.messages[0].content).toContain(GUIDE_SNAPSHOT.visaSource.url);
      expect(e.reserve).toHaveBeenCalledTimes(1);expect(e.commit).toHaveBeenCalledTimes(1);
    });
    it(`${lang}: unknown topic is never forced into the prior guide`, async () => {
      const e=endpoint();await (await e.handler(request("Šta je nepoznata usluga?",lang,"/formulari/kindergeld",[message(question)]))).text();
      expect(e.fetchMock).toHaveBeenCalledTimes(1);
      const body=JSON.parse(String(e.fetchMock.mock.calls[0]?.[1]?.body));
      expect(body.messages[0].content).toContain("Unknown facts remain unknown");
    });
  }
  it("one short case answer inherits the question; arbitrary answers and topic switches do not", () => {
    expect(guides.resolveConversationGuide([message("Kindergeld"),message("novorođenče u Njemačkoj")])).toBe("kindergeld");
    expect(guides.resolveConversationGuide([message(question),message("koliko imam prava na novac?")])).toBeNull();
    expect(guides.resolveConversationGuide([message(question),message("Wohngeld")])).toBe("wohngeld");
    expect(guides.resolveConversationGuide([message("Kindergeld i Wohngeld"),message("Dokumenti")])).toBeNull();
  });
  it("uncertain quota still stops follow-up replies before any content or model", async () => {
    const e=endpoint(true,{ok:false,mode:"full"},false);const r=await e.handler(request("Dokumenti","bs","",[message(question)]));
    expect(r.status).toBe(429);expect(e.commit).not.toHaveBeenCalled();expect(e.fetchMock).not.toHaveBeenCalled();
  });
});