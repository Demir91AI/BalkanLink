
-- Forms registry table
CREATE TABLE public.forms (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  authority_name text NOT NULL,
  official_pdf_url text NOT NULL,
  status text NOT NULL DEFAULT 'OK' CHECK (status IN ('OK', 'Suspect', 'Blocked')),
  version_hash text,
  last_checked_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.forms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read forms" ON public.forms FOR SELECT USING (true);
CREATE POLICY "Admins can manage forms" ON public.forms FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Form fields definitions
CREATE TABLE public.form_fields (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_slug text NOT NULL REFERENCES public.forms(slug) ON DELETE CASCADE,
  field_key text NOT NULL,
  section text,
  label_de text NOT NULL,
  label_bs text NOT NULL,
  help_text_bs text,
  example text,
  common_mistakes_bs text,
  where_to_find_bs text,
  validation_type text DEFAULT 'text' CHECK (validation_type IN ('text','date','iban','plz','phone','enum','number','checkbox')),
  format_hint_bs text,
  sort_order integer DEFAULT 0,
  UNIQUE(form_slug, field_key)
);

ALTER TABLE public.form_fields ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read form_fields" ON public.form_fields FOR SELECT USING (true);
CREATE POLICY "Admins can manage form_fields" ON public.form_fields FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Field mapping (hotspot coordinates on PDF)
CREATE TABLE public.field_mapping (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  form_slug text NOT NULL REFERENCES public.forms(slug) ON DELETE CASCADE,
  field_key text NOT NULL,
  page_number integer NOT NULL,
  x numeric NOT NULL,
  y numeric NOT NULL,
  width numeric NOT NULL,
  height numeric NOT NULL,
  UNIQUE(form_slug, field_key)
);

ALTER TABLE public.field_mapping ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read field_mapping" ON public.field_mapping FOR SELECT USING (true);
CREATE POLICY "Admins can manage field_mapping" ON public.field_mapping FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- User form access (pay-per-form)
CREATE TABLE public.user_form_access (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  form_slug text NOT NULL REFERENCES public.forms(slug) ON DELETE CASCADE,
  purchased_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'revoked')),
  UNIQUE(user_id, form_slug)
);

ALTER TABLE public.user_form_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own access" ON public.user_form_access FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own access" ON public.user_form_access FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can manage all access" ON public.user_form_access FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
