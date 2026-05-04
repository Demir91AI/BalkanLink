import { supabase } from "@/integrations/supabase/client";

export const ADMIN_NOTIFY_EMAIL = "kontakt@balkanlink.de";

/**
 * Fire-and-forget admin notification email. Never blocks the calling flow.
 */
export function notifyAdmin(
  templateName:
    | "admin-new-user"
    | "admin-new-payment"
    | "admin-new-review"
    | "admin-new-question"
    | "admin-new-business",
  templateData: Record<string, any>,
  idempotencyKey?: string,
) {
  try {
    supabase.functions
      .invoke("send-transactional-email", {
        body: {
          templateName,
          recipientEmail: ADMIN_NOTIFY_EMAIL,
          idempotencyKey: idempotencyKey ?? `${templateName}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          templateData,
        },
      })
      .catch((e) => console.warn(`[admin-notify:${templateName}] failed`, e));
  } catch (e) {
    console.warn(`[admin-notify:${templateName}] invoke threw`, e);
  }
}
