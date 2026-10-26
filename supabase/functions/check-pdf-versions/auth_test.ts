import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { rejectUnlessServiceRole } from "./auth.ts";

const req = (auth?: string) =>
  new Request("https://x/check-pdf-versions", { method: "POST", headers: auth ? { Authorization: auth } : {} });
const H = { "Access-Control-Allow-Origin": "*" };

Deno.test("anonymous request is rejected with 403 and CORS", async () => {
  const res = await rejectUnlessServiceRole(req(), H, () => Promise.resolve(false));
  assertEquals(res?.status, 403);
  assertEquals(res?.headers.get("Access-Control-Allow-Origin"), "*");
  assertEquals(await res?.json(), { error: "Forbidden" });
});

Deno.test("forged token is rejected when verification fails", async () => {
  let seen = "";
  const res = await rejectUnlessServiceRole(req("Bearer forged.token.sig"), H, (t) => { seen = t; return Promise.resolve(false); });
  assertEquals(res?.status, 403);
  assertEquals(seen, "forged.token.sig");
  await res?.body?.cancel();
});

Deno.test("verified service-role key may proceed", async () => {
  assertEquals(await rejectUnlessServiceRole(req("Bearer good"), H, () => Promise.resolve(true)), null);
});

Deno.test("verifier error fails closed via real guard (no network for anon token)", async () => {
  const res = await rejectUnlessServiceRole(req("Bearer not-a-jwt"), H);
  assertEquals(res?.status, 403);
  await res?.body?.cancel();
});
