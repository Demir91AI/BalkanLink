import { bearerToken, isServiceRoleToken } from "../_shared/service-role-guard.ts";

// Returns a 403 Response when the caller is not a signature-verified
// service-role key; returns null when the request may proceed.
export async function rejectUnlessServiceRole(
  req: Request,
  headers: Record<string, string>,
  verify: (token: string) => Promise<boolean> = (t) => isServiceRoleToken(t),
): Promise<Response | null> {
  if (await verify(bearerToken(req))) return null;
  return new Response(JSON.stringify({ error: "Forbidden" }), {
    status: 403,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
