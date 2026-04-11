-- Step 1: Drop existing foreign key constraint if it exists
ALTER TABLE profiles
DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Step 2: Re-add with CASCADE so profile auto-deletes when auth user is deleted
ALTER TABLE profiles
ADD CONSTRAINT profiles_id_fkey
  FOREIGN KEY (id)
  REFERENCES auth.users(id)
  ON DELETE CASCADE;

-- Step 3: Add explicit DELETE policy so users can delete their own profile
CREATE POLICY "users_can_delete_own_profile"
ON profiles
FOR DELETE
TO authenticated
USING (id = auth.uid());