
DROP POLICY IF EXISTS "Senders can read own messages" ON messages;
DROP POLICY IF EXISTS "Users can read own messages" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;
DROP POLICY IF EXISTS "Users can delete own messages" ON messages;
DROP POLICY IF EXISTS "Anyone can read messages" ON messages;
DROP POLICY IF EXISTS "Anyone can insert messages" ON messages;
DROP TRIGGER IF EXISTS on_message_created ON messages;
DROP TRIGGER IF EXISTS on_message_updated ON messages;
DROP TABLE IF EXISTS messages CASCADE;
