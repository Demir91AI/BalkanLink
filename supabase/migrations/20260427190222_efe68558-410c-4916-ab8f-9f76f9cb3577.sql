-- Lock down handle_new_user trigger function (trigger fires regardless)
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Enable RLS on realtime.messages and restrict subscriptions to per-user topics
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users subscribe to own topics only" ON realtime.messages;
CREATE POLICY "Users subscribe to own topics only"
ON realtime.messages
FOR SELECT
TO authenticated
USING (
  realtime.topic() LIKE 'chat:' || auth.uid()::text
  OR realtime.topic() LIKE 'user:' || auth.uid()::text || ':%'
  OR realtime.topic() = 'public:community_listings'
);