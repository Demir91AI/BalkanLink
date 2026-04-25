
-- Set immutable search_path on email queue functions
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pgmq;
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pgmq;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pgmq;

-- Enforce user_id NOT NULL on mreza_payments to prevent orphaned payment records
DELETE FROM public.mreza_payments WHERE user_id IS NULL;
ALTER TABLE public.mreza_payments ALTER COLUMN user_id SET NOT NULL;
