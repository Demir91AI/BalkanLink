
-- Notification preferences for classified ads
CREATE TABLE public.classifieds_notification_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category text NOT NULL,
  enabled boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, category)
);

-- Enable RLS
ALTER TABLE public.classifieds_notification_preferences ENABLE ROW LEVEL SECURITY;

-- Users can read own preferences
CREATE POLICY "Users can read own notification prefs"
  ON public.classifieds_notification_preferences
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Users can insert own preferences
CREATE POLICY "Users can insert own notification prefs"
  ON public.classifieds_notification_preferences
  FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Users can update own preferences
CREATE POLICY "Users can update own notification prefs"
  ON public.classifieds_notification_preferences
  FOR UPDATE TO authenticated
  USING (user_id = auth.uid());

-- Users can delete own preferences
CREATE POLICY "Users can delete own notification prefs"
  ON public.classifieds_notification_preferences
  FOR DELETE TO authenticated
  USING (user_id = auth.uid());

-- Service role full access for edge function
CREATE POLICY "Service role can manage all notification prefs"
  ON public.classifieds_notification_preferences
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
