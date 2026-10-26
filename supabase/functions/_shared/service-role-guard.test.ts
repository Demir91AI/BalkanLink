import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { isServiceRoleToken } from "./service-role-guard.ts";

const b64 = (o: unknown) => btoa(JSON.stringify(o)).replaceAll("=", "").replaceAll("+", "-").replaceAll("/", "_");
const forged = `${b64({ alg: "HS256" })}.${b64({ role: "service_role" })}.fakesig`;
const anon = `${b64({ alg: "HS256" })}.${b64({ role: "anon" })}.sig`;

Deno.test("rejects empty and non-service tokens without network", async () => {
  let called = false;
  const f = (() => { called = true; return Promise.resolve(new Response("", { status: 200 })); }) as typeof fetch;
  assertEquals(await isServiceRoleToken("", "https://x", f), false);
  assertEquals(await isServiceRoleToken(anon, "https://x", f), false);
  assertEquals(await isServiceRoleToken("garbage", "https://x", f), false);
  assertEquals(called, false);
});

Deno.test("rejects forged service_role payload when auth server refuses it", async () => {
  const f = (() => Promise.resolve(new Response("{}", { status: 401 }))) as typeof fetch;
  assertEquals(await isServiceRoleToken(forged, "https://x", f), false);
});

Deno.test("accepts when auth server verifies the key", async () => {
  const f = (() => Promise.resolve(new Response("{}", { status: 200 }))) as typeof fetch;
  assertEquals(await isServiceRoleToken(forged, "https://x", f), true);
});

Deno.test("fails closed on network error", async () => {
  const f = (() => Promise.reject(new Error("down"))) as typeof fetch;
  assertEquals(await isServiceRoleToken(forged, "https://x", f), false);
});
