import { describe, expect, it } from "vitest";
import bs from "@/i18n/locales/bs/dvojnoDrzavljanstvo.json";
import hr from "@/i18n/locales/hr/dvojnoDrzavljanstvo.json";
import sr from "@/i18n/locales/sr/dvojnoDrzavljanstvo.json";
import de from "@/i18n/locales/de/dvojnoDrzavljanstvo.json";
import { EINBUERGERUNG_GUIDE, getEinbuergerungGuide } from "@/data/einbuergerung-guide-i18n";
import { DUAL_CITIZENSHIP_SOURCES as S, BIH_DUAL_CITIZENSHIP_TREATY_PARTNERS } from "@/data/dual-citizenship-sources";

const L = { bs, hr, sr, de } as unknown as Record<string, any>;
const sec = (l: string, c: string) => L[l].countries[c].sections;

describe("Dual citizenship follow-up, 28 October 2026", () => {
  it("BiH lists exactly three treaties: Serbia, Croatia and Sweden, none with Germany", () => {
    expect(BIH_DUAL_CITIZENSHIP_TREATY_PARTNERS).toEqual(["Serbia", "Croatia", "Sweden"]);
    for (const l of Object.keys(L)) {
      const b = sec(l, "bih").bihLaw.body;
      expect(b).toMatch(/Švedsk|Schweden/);
      expect(b).toMatch(/Srbij|Serbien/);
      expect(b).toMatch(/Hrvatsk|Kroatien/);
      expect(b).toMatch(/nemaju međunarodni ugovor|keinen völkerrechtlichen Vertrag/);
    }
  });

  it("Kosovo cites the new Law 10/L-023 (2026) that replaced 04/L-215, Art. 4 multiple citizenship", () => {
    for (const l of Object.keys(L)) {
      const b = sec(l, "kosovo").ownLaw.body;
      expect(b).toContain("10/L-023");
      expect(b).toMatch(/zamijenio|zamenio|ersetzt/);
      expect(b).toContain("04/L-215");
      expect(b).toMatch(/(član|članak|Art\.) 4/);
      expect(b).toMatch(/(član|članku|Art\.) 18/);
    }
  });

  it("Montenegro: 119/2026 amends only Art. 11 and is not a general dual-citizenship permission", () => {
    for (const l of Object.keys(L)) {
      const b = sec(l, "crnaGora").bothLaws.body;
      expect(b).toContain("119/2026");
      expect(b).toMatch(/19\. ?8\. ?2026|19\.08\.2026/);
      expect(b).toMatch(/(član|članak|Art\.) 11/);
      expect(b).toMatch(/NIJE opće|NIJE opšte|KEINE allgemeine/);
      expect(b).toMatch(/(član|članak|Art\.) 24/);
    }
  });

  it("Albania: Law 113/2020 per MFA allows other citizenships; no renunciation into statelessness", () => {
    for (const l of Object.keys(L)) {
      const b = sec(l, "albanija").bothLaws.body;
      expect(b).toContain("113/2020");
      expect(b).toMatch(/bez državljanstva|staatenlos/);
    }
  });

  it("source URLs are the official ones", () => {
    expect(S.kosovoLaw10L023).toBe("https://gzk.rks-gov.net/ActDetail.aspx?ActID=119612");
    expect(S.montenegroGazette119_2026).toBe("https://www.sluzbenilist.me/propisi/397079");
    expect(S.bihMcpTreaties).toContain("mcp.gov.ba");
    expect(S.bihFmup).toContain("fmup.gov.ba");
    expect(S.albaniaMfa).toContain("punetejashtme.gov.al");
    expect(S.albaniaLaw113_2020Consolidated).toContain("qbz.gov.al");
    for (const u of Object.values(S)) expect(u).toMatch(/^https:\/\//);
  });

  it("naturalization guide exists in all four languages with identical structure", () => {
    const keys = ["bs", "hr", "sr", "de"] as const;
    const n = EINBUERGERUNG_GUIDE.bs.steps.length;
    expect(n).toBe(12);
    for (const k of keys) {
      const g = EINBUERGERUNG_GUIDE[k];
      expect(g.steps).toHaveLength(n);
      expect(g.header.requirements).toHaveLength(EINBUERGERUNG_GUIDE.bs.header.requirements.length);
      g.steps.forEach((s, i) => {
        expect(s.deField).toBe(EINBUERGERUNG_GUIDE.bs.steps[i].deField);
        expect(Object.keys(s).sort()).toEqual(Object.keys(EINBUERGERUNG_GUIDE.bs.steps[i]).sort());
      });
    }
    expect(getEinbuergerungGuide("de-DE")).toBe(EINBUERGERUNG_GUIDE.de);
    expect(getEinbuergerungGuide("xx")).toBe(EINBUERGERUNG_GUIDE.bs);
  });

  it("no untranslated Bosnian fallback in HR/SR/DE guide text", () => {
    const txt = (k: "hr" | "sr" | "de") => JSON.stringify({ ...EINBUERGERUNG_GUIDE[k], steps: EINBUERGERUNG_GUIDE[k].steps.map(({ deField, example, ...r }) => r) });
    expect(txt("de")).not.toMatch(/godin|zahtjev|ustanov|dokument koje|Šta|Ko može/);
    expect(txt("sr")).not.toMatch(/zahtjev|mjesec|vrijeme|njemačk/i);
    expect(txt("hr")).not.toMatch(/ustanova|pasoš|Ko može/);
    expect(EINBUERGERUNG_GUIDE.de.labels.who).not.toBe(EINBUERGERUNG_GUIDE.bs.labels.who);
  });

  it("guide: 3-year route abolished 30.10.2025, 5 years, § 9 exception, no guarantee — every language", () => {
    for (const k of ["bs", "hr", "sr", "de"] as const) {
      const g = JSON.stringify(EINBUERGERUNG_GUIDE[k]);
      expect(g).toMatch(/30\. ?10\. ?2025/);
      expect(g).toMatch(/5 (godina|Jahren|Jahre)/);
      expect(g).toContain("§ 9 StAG");
      expect(g).toMatch(/zagarantovan|zajamčen|garantier/);
      expect(g).not.toMatch(/191|Hadžić|Amina|Siemens|Bayern brže/);
    }
  });
});
