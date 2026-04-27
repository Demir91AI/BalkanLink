-- Chat messages table for cross-device sync
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for efficient per-user chronological queries
CREATE INDEX idx_chat_messages_user_created ON public.chat_messages(user_id, created_at);

-- Enable RLS
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Users can read their own messages
CREATE POLICY "Users can read own chat messages"
ON public.chat_messages
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Users can insert their own messages
CREATE POLICY "Users can insert own chat messages"
ON public.chat_messages
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

-- Users can delete their own messages (for clear chat)
CREATE POLICY "Users can delete own chat messages"
ON public.chat_messages
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Admins can manage all
CREATE POLICY "Admins can manage all chat messages"
ON public.chat_messages
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Deny anon
CREATE POLICY "Anon denied on chat_messages"
ON public.chat_messages
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;