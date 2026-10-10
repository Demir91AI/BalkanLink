CREATE TABLE public.editorial_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind text NOT NULL CHECK (kind IN ('news','blog')),
  category text NOT NULL CHECK (category IN ('arbeit','aufenthalt','familie','steuern','sozialleistungen','alltag')),
  lang text NOT NULL DEFAULT 'bs' CHECK (lang IN ('bs','hr','sr','de')),
  slug text NOT NULL CHECK (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(slug) <= 120),
  title text NOT NULL CHECK (length(title) BETWEEN 3 AND 200),
  excerpt text NOT NULL DEFAULT '' CHECK (length(excerpt) <= 500),
  body text NOT NULL DEFAULT '' CHECK (length(body) <= 60000),
  what_it_means text,
  is_law_change boolean NOT NULL DEFAULT false,
  legal_status text CHECK (legal_status IN ('proposal','adopted','effective')),
  effective_date date,
  primary_sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  related_links jsonb NOT NULL DEFAULT '[]'::jsonb,
  source_name text,
  source_url text CHECK (source_url IS NULL OR source_url ~ '^https://'),
  author_name text NOT NULL DEFAULT 'BalkanLink Redakcija',
  original_published_at timestamptz,
  verified_at timestamptz,
  workflow_status text NOT NULL DEFAULT 'draft' CHECK (workflow_status IN ('draft','review','approved','published','archived')),
  correction_note text,
  is_demo boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lang, slug)
);

GRANT SELECT ON public.editorial_articles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.editorial_articles TO authenticated;
GRANT ALL ON public.editorial_articles TO service_role;
ALTER TABLE public.editorial_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public reads published articles" ON public.editorial_articles
  FOR SELECT TO anon, authenticated USING (workflow_status = 'published');
CREATE POLICY "Admins read all articles" ON public.editorial_articles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins insert articles" ON public.editorial_articles
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update articles" ON public.editorial_articles
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete articles" ON public.editorial_articles
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX editorial_articles_public_idx ON public.editorial_articles (kind, lang, workflow_status, published_at DESC);

CREATE TABLE public.editorial_article_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id uuid NOT NULL REFERENCES public.editorial_articles(id) ON DELETE CASCADE,
  snapshot jsonb NOT NULL,
  workflow_status text NOT NULL,
  changed_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.editorial_article_revisions TO authenticated;
GRANT ALL ON public.editorial_article_revisions TO service_role;
ALTER TABLE public.editorial_article_revisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read revisions" ON public.editorial_article_revisions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.editorial_validate()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
DECLARE src jsonb;
BEGIN
  NEW.updated_at := now();
  IF jsonb_typeof(NEW.primary_sources) <> 'array' OR jsonb_typeof(NEW.related_links) <> 'array' THEN
    RAISE EXCEPTION 'primary_sources and related_links must be arrays';
  END IF;
  FOR src IN SELECT * FROM jsonb_array_elements(NEW.primary_sources) LOOP
    IF coalesce(src->>'url','') !~ '^https://' THEN
      RAISE EXCEPTION 'Every primary source needs an https:// URL';
    END IF;
  END LOOP;
  IF NEW.workflow_status = 'published' THEN
    IF TG_OP = 'INSERT' OR OLD.workflow_status NOT IN ('approved','published') THEN
      RAISE EXCEPTION 'Article must be approved before publishing';
    END IF;
    IF NEW.is_law_change THEN
      IF jsonb_array_length(NEW.primary_sources) < 1 THEN
        RAISE EXCEPTION 'Law-change articles require at least one official primary source';
      END IF;
      IF NEW.legal_status IS NULL THEN
        RAISE EXCEPTION 'Law-change articles require a legal status';
      END IF;
      IF NEW.verified_at IS NULL THEN
        RAISE EXCEPTION 'Law-change articles require a verification date';
      END IF;
    END IF;
    IF NEW.published_at IS NULL THEN NEW.published_at := now(); END IF;
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER editorial_validate_trg BEFORE INSERT OR UPDATE ON public.editorial_articles
  FOR EACH ROW EXECUTE FUNCTION public.editorial_validate();

CREATE OR REPLACE FUNCTION public.editorial_snapshot()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.editorial_article_revisions (article_id, snapshot, workflow_status, changed_by)
  VALUES (OLD.id, to_jsonb(OLD), OLD.workflow_status, auth.uid());
  RETURN NEW;
END $$;
REVOKE EXECUTE ON FUNCTION public.editorial_snapshot() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER editorial_snapshot_trg AFTER UPDATE ON public.editorial_articles
  FOR EACH ROW EXECUTE FUNCTION public.editorial_snapshot();