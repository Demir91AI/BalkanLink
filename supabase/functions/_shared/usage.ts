// Server-side usage metering (BalkanLink 2.0 Phase 2).
// reserve → (AI call) → commit on success / release on failure. Never stores user content.
// deno-lint-ignore-file no-explicit-any
export type UsageFeature =
  | "document_analysis"
  | "assistant_reply"
  | "tts_generation"
  | "trainer_generation"
  | "nebenkosten_scan";

export interface Reservation {
  ok: boolean;
  reservation_id?: string;
  source?: string;
  mode?: "full" | "basic" | "legacy_credit";
  reason?: "quota_exhausted" | "access_required" | "daily_cap" | "subscribe_required";
  resets_at?: string | null;
  used?: number;
  limit?: number | null;
}

export async function reserveUsage(admin: any, userId: string, feature: UsageFeature): Promise<Reservation> {
  const requestId = `${feature}:${crypto.randomUUID()}`;
  const { data, error } = await admin.rpc("reserve_usage", { uid: userId, p_feature: feature, p_request_id: requestId });
  if (error) throw new Error(`reserve_usage failed: ${error.code ?? "unknown"}`);
  return data as Reservation;
}

export async function commitUsage(admin: any, r: Reservation | null) {
  if (!r?.reservation_id) return;
  const { error } = await admin.rpc("commit_usage", { reservation_id: r.reservation_id });
  if (error) console.error("[usage] commit failed", error.code);
}

export async function releaseUsage(admin: any, r: Reservation | null) {
  if (!r?.reservation_id) return;
  const { error } = await admin.rpc("release_usage", { reservation_id: r.reservation_id });
  if (error) console.error("[usage] release failed", error.code);
}

/**
 * Wrap an upstream SSE body: commit once the stream finishes or once content was delivered
 * before the client cancelled; release if the stream failed before any byte was delivered.
 */
export function meterStream(body: ReadableStream<Uint8Array>, onCommit: () => Promise<void>, onRelease: () => Promise<void>) {
  const reader = body.getReader();
  let delivered = 0;
  let settled = false;
  const settle = async (commit: boolean) => {
    if (settled) return;
    settled = true;
    await (commit ? onCommit() : onRelease());
  };
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          await settle(delivered > 0);
          controller.close();
          return;
        }
        delivered += value.byteLength;
        controller.enqueue(value);
      } catch (e) {
        await settle(false);
        controller.error(e);
      }
    },
    async cancel(reason) {
      await settle(delivered > 0);
      await reader.cancel(reason);
    },
  });
}

const QUOTA_MSG: Record<string, string> = {
  bs: "Iskoristio/la si sve odgovore Asistenta za ovaj period.",
  de: "Du hast alle Asistent-Antworten für diesen Zeitraum genutzt.",
  en: "You have used all Asistent replies for this period.",
};
const SUBSCRIBE_MSG: Record<string, string> = {
  bs: "Asistent je dio BalkanLink članstva. Aktiviraj članstvo da nastaviš.",
  de: "Der Asistent ist Teil der BalkanLink-Mitgliedschaft. Aktiviere sie, um fortzufahren.",
  en: "The Asistent is part of the BalkanLink membership. Activate it to continue.",
};

/**
 * Decide whether the assistant may call the model. Returns a ready JSON body when it must NOT
 * (no AI call happens in that case). Pure — unit-tested.
 */
export function assistantGate(r: Reservation, lang: string):
  { callAI: true } | { callAI: false; status: number; body: Record<string, unknown> } {
  if (r.ok) return { callAI: true };
  const l = lang === "de" ? "de" : lang === "en" ? "en" : "bs";
  if (r.reason === "quota_exhausted") {
    return { callAI: false, status: 200, body: { quota_exhausted: true, errorCode: "QUOTA_EXHAUSTED",
      content: QUOTA_MSG[l], used: r.used ?? null, limit: r.limit ?? null, resets_at: r.resets_at ?? null } };
  }
  if (r.reason === "subscribe_required") {
    return { callAI: false, status: 200, body: { premium_required: true, errorCode: "SUBSCRIBE_REQUIRED",
      content: SUBSCRIBE_MSG[l], redirect_url: "/cijene" } };
  }
  return { callAI: false, status: 429, body: { error: "Dnevni limit Asistenta je dostignut. Pokušaj sutra.", errorCode: "DAILY_CAP" } };
}
