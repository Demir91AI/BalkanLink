import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
const read = (p: string) => readFileSync(p, "utf8");

describe("00.07 security fixes", () => {
  it("email functions authorize service callers only via the verified guard", () => {
    for (const f of ["send-reengagement-emails", "process-email-queue", "send-transactional-email"]) {
      const s = read(`supabase/functions/${f}/index.ts`);
      expect(s).toContain("isServiceRoleToken(");
      expect(s).not.toMatch(/role\s*(!==|===)\s*'service_role'\)\s*\{/);
    }
    expect(read("supabase/functions/send-transactional-email/index.ts")).toContain("const isService = await isServiceRoleToken(token)");
  });
  it("page views do not send visitor IPs to an external geolocation service", () => {
    const s = read("supabase/functions/track-page-view/index.ts");
    expect(s).not.toMatch(/geojs|ipapi|ipinfo|fetch\(/);
  });
  it("staged SQL removes public TTS insert and restricts the two RPCs", () => {
    const s = read("docs/staged/security-00-07.sql");
    expect(s).toContain('DROP POLICY IF EXISTS "Service role can upload TTS audio"');
    expect(s).toMatch(/REVOKE EXECUTE ON FUNCTION public\.redeem_trial_code\(uuid, text\) FROM PUBLIC, anon, authenticated/);
    expect(s).toContain("_user_id = auth.uid()");
  });
  it("legitimate callers stay compatible", () => {
    expect(read("supabase/functions/redeem-trial/index.ts")).toMatch(/admin\.rpc\("redeem_trial_code"/);
    expect(read("src/hooks/usePremiumAccess.ts")).toContain('_user_id: user.id');
  });
});
