-- -- -- Enable UUID gen if you don't already have it
-- -- -- (Postgres 13+: prefer gen_random_uuid from pgcrypto)
-- -- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -- CREATE TABLE public.community (
-- --   id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-- --   name          varchar(500)      NOT NULL,
-- --   category      varchar(100)      NOT NULL,
-- --   sub_category  text              NOT NULL,
-- --   description   varchar(1000)     NOT NULL,
-- --   contact       varchar(100)      NOT NULL,
-- --   email         varchar(255)      NOT NULL,
-- --   address       text              NOT NULL,
-- --   in_charge     text              NOT NULL,
-- --   social_links  json              NOT NULL,   -- e.g. {"instagram":"...", "website":"..."}
-- --   logo          varchar(255),                 -- optional
-- --   image         varchar(255),                 -- optional
-- --   created_at    timestamptz       NOT NULL DEFAULT now()
-- -- );

-- -- -- Helpful indexes (optional)
-- -- CREATE INDEX community_category_idx     ON public.community (category);
-- -- CREATE INDEX community_created_at_idx   ON public.community (created_at DESC);



-- -- -- UUID helper (use pgcrypto or uuid-ossp; pick what you already enabled)
-- -- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -- CREATE TABLE public.refresh_tokens (
-- --   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-- --   token_hash  text        NOT NULL,          -- store a hashed token, never the raw token
-- --   user_id     uuid        NOT NULL,          -- who owns it
-- --   expires_at  timestamptz NOT NULL,          -- when this token dies
-- --   created_at  timestamptz NOT NULL DEFAULT now(),
-- --   revoked     boolean     NOT NULL DEFAULT false
-- -- );

-- -- -- Link to users table (adjust schema/table name if needed)
-- -- ALTER TABLE public.refresh_tokens
-- --   ADD CONSTRAINT refresh_tokens_user_fk
-- --   FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- -- -- Speed lookups & enforce uniqueness if desired
-- -- CREATE UNIQUE INDEX refresh_tokens_token_hash_uidx ON public.refresh_tokens (token_hash);
-- -- CREATE INDEX refresh_tokens_user_id_idx            ON public.refresh_tokens (user_id);
-- -- CREATE INDEX refresh_tokens_expires_at_idx         ON public.refresh_tokens (expires_at);




-- -- -- UUID generator (pick the one you use)
-- -- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -- CREATE TABLE public.users (
-- --   id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-- --   name           text        NOT NULL,
-- --   email          text        NOT NULL,
-- --   password_hash  text        NOT NULL,
-- --   created_at     timestamptz NOT NULL DEFAULT now()
-- -- );

-- -- -- Make sure each email is unique
-- -- CREATE UNIQUE INDEX users_email_uidx ON public.users (email);



-- -- =========================================
-- -- MIGRATION (run if you ALREADY have community with category/sub_category text fields)
-- -- This will:
-- --  - Create categories & sub_categories
-- --  - Add community.sub_category_id
-- --  - Backfill from existing text columns (category/sub_category)
-- --  - Enforce NOT NULL and drop old text columns
-- -- =========================================

-- BEGIN;

-- SET search_path = public;

-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -- Ensure users/refresh_tokens exist (idempotent)
-- CREATE TABLE IF NOT EXISTS public.users (
--   id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name           text        NOT NULL,
--   email          text        NOT NULL,
--   password_hash  text        NOT NULL,
--   created_at     timestamptz NOT NULL DEFAULT now()
-- );

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_indexes
--     WHERE schemaname = 'public'
--       AND indexname  = 'users_email_lower_uidx'
--   ) THEN
--     EXECUTE 'CREATE UNIQUE INDEX users_email_lower_uidx ON public.users (lower(email))';
--   END IF;
-- END$$;

-- CREATE TABLE IF NOT EXISTS public.refresh_tokens (
--   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   token_hash  text        NOT NULL,
--   user_id     uuid        NOT NULL,
--   expires_at  timestamptz NOT NULL,
--   created_at  timestamptz NOT NULL DEFAULT now(),
--   revoked     boolean     NOT NULL DEFAULT false
-- );

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_constraint WHERE conname = 'refresh_tokens_user_fk'
--   ) THEN
--     ALTER TABLE public.refresh_tokens
--       ADD CONSTRAINT refresh_tokens_user_fk
--       FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
--   END IF;
-- END$$;

-- CREATE UNIQUE INDEX IF NOT EXISTS refresh_tokens_token_hash_uidx ON public.refresh_tokens (token_hash);
-- CREATE INDEX        IF NOT EXISTS refresh_tokens_user_id_idx     ON public.refresh_tokens (user_id);
-- CREATE INDEX        IF NOT EXISTS refresh_tokens_expires_at_idx  ON public.refresh_tokens (expires_at);

-- -- Categories + Sub-categories (idempotent)
-- CREATE TABLE IF NOT EXISTS public.categories (
--   id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   name        text        NOT NULL,
--   slug        text,
--   description text,
--   created_at  timestamptz NOT NULL DEFAULT now()
-- );

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_indexes
--     WHERE schemaname = 'public' AND indexname = 'categories_name_lower_uidx'
--   ) THEN
--     EXECUTE 'CREATE UNIQUE INDEX categories_name_lower_uidx ON public.categories (lower(name))';
--   END IF;
-- END$$;

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_indexes
--     WHERE schemaname = 'public' AND indexname = 'categories_slug_lower_uidx'
--   ) THEN
--     EXECUTE 'CREATE UNIQUE INDEX categories_slug_lower_uidx ON public.categories (lower(slug)) WHERE slug IS NOT NULL';
--   END IF;
-- END$$;

-- CREATE TABLE IF NOT EXISTS public.sub_categories (
--   id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
--   category_id  uuid        NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
--   name         text        NOT NULL,
--   slug         text,
--   description  text,
--   created_at   timestamptz NOT NULL DEFAULT now()
-- );

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_indexes
--     WHERE schemaname = 'public' AND indexname = 'sub_categories_name_per_category_lower_uidx'
--   ) THEN
--     EXECUTE 'CREATE UNIQUE INDEX sub_categories_name_per_category_lower_uidx
--              ON public.sub_categories (category_id, lower(name))';
--   END IF;
-- END$$;

-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_indexes
--     WHERE schemaname = 'public' AND indexname = 'sub_categories_slug_per_category_lower_uidx'
--   ) THEN
--     EXECUTE 'CREATE UNIQUE INDEX sub_categories_slug_per_category_lower_uidx
--              ON public.sub_categories (category_id, lower(slug)) WHERE slug IS NOT NULL';
--   END IF;
-- END$$;

-- CREATE INDEX IF NOT EXISTS sub_categories_category_id_idx ON public.sub_categories (category_id);

-- -- Add sub_category_id to community (nullable first)
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1
--     FROM information_schema.columns
--     WHERE table_schema='public' AND table_name='community' AND column_name='sub_category_id'
--   ) THEN
--     ALTER TABLE public.community ADD COLUMN sub_category_id uuid;
--   END IF;
-- END$$;

-- -- FK
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM pg_constraint WHERE conname = 'community_sub_category_fk'
--   ) THEN
--     ALTER TABLE public.community
--       ADD CONSTRAINT community_sub_category_fk
--       FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(id) ON DELETE RESTRICT;
--   END IF;
-- END$$;

-- CREATE INDEX IF NOT EXISTS community_sub_category_id_idx ON public.community (sub_category_id);
-- CREATE INDEX IF NOT EXISTS community_created_at_idx      ON public.community (created_at DESC);

-- -- ========== BACKFILL ==========
-- -- 1) Insert distinct categories from existing text
-- INSERT INTO public.categories (name)
-- SELECT DISTINCT category
-- FROM public.community
-- WHERE category IS NOT NULL AND category <> ''
--   AND NOT EXISTS (
--     SELECT 1 FROM public.categories c WHERE lower(c.name) = lower(community.category)
--   );

-- -- 2) Insert distinct sub_categories with category mapping
-- WITH pairs AS (
--   SELECT DISTINCT category, sub_category
--   FROM public.community
--   WHERE COALESCE(category, '') <> '' AND COALESCE(sub_category, '') <> ''
-- )
-- INSERT INTO public.sub_categories (category_id, name)
-- SELECT c.id, p.sub_category
-- FROM pairs p
-- JOIN public.categories c ON lower(c.name) = lower(p.category)
-- WHERE NOT EXISTS (
--   SELECT 1 FROM public.sub_categories sc
--   WHERE sc.category_id = c.id AND lower(sc.name) = lower(p.sub_category)
-- );

-- -- 3) Update community.sub_category_id
-- UPDATE public.community com
-- SET sub_category_id = sc.id
-- FROM public.sub_categories sc
-- JOIN public.categories c ON c.id = sc.category_id
-- WHERE com.sub_category_id IS NULL
--   AND lower(c.name) = lower(com.category)
--   AND lower(sc.name) = lower(com.sub_category);

-- -- 4) Enforce NOT NULL if all rows are backfilled
-- DO $$
-- BEGIN
--   IF NOT EXISTS (
--     SELECT 1 FROM public.community WHERE sub_category_id IS NULL
--   ) THEN
--     ALTER TABLE public.community
--       ALTER COLUMN sub_category_id SET NOT NULL;
--   END IF;
-- END$$;

-- -- 5) Drop old text columns (optional, only if present)
-- DO $$
-- BEGIN
--   IF EXISTS (
--     SELECT 1 FROM information_schema.columns
--     WHERE table_schema='public' AND table_name='community' AND column_name='category'
--   ) THEN
--     ALTER TABLE public.community DROP COLUMN category;
--   END IF;

--   IF EXISTS (
--     SELECT 1 FROM information_schema.columns
--     WHERE table_schema='public' AND table_name='community' AND column_name='sub_category'
--   ) THEN
--     ALTER TABLE public.community DROP COLUMN sub_category;
--   END IF;
-- END$$;

-- -- ========== VIEW ==========
-- CREATE OR REPLACE VIEW public.community_enriched AS
-- SELECT
--   com.id,
--   com.name,
--   c.name  AS category,
--   sc.name AS sub_category,
--   com.description,
--   com.contact,
--   com.email,
--   com.address,
--   com.in_charge,
--   com.social_links,
--   com.logo,
--   com.image,
--   com.created_at
-- FROM public.community com
-- LEFT JOIN public.sub_categories sc ON sc.id = com.sub_category_id
-- LEFT JOIN public.categories     c  ON c.id  = sc.category_id;

-- -- COMMIT;



-- 0) Ensure community.created_at exists (rename legacy create_at or add new)
DO $fix$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='create_at'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_schema='public' AND table_name='community' AND column_name='created_at'
    ) THEN
      EXECUTE 'ALTER TABLE public.community RENAME COLUMN create_at TO created_at';
    END IF;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='created_at'
  ) THEN
    EXECUTE 'ALTER TABLE public.community ADD COLUMN created_at timestamptz NOT NULL DEFAULT now()';
  END IF;
END
$fix$;

-- 1) Main changes
BEGIN;
SET search_path = public;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  slug        text,
  description text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Unique on lower(name) when safe; else non-unique
DO $$
DECLARE has_dupes boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='categories_name_lower_uidx') THEN
    SELECT EXISTS (
      SELECT lower(name) FROM public.categories GROUP BY 1 HAVING COUNT(*) > 1
    ) INTO has_dupes;

    IF has_dupes THEN
      IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='categories_name_lower_idx') THEN
        EXECUTE 'CREATE INDEX categories_name_lower_idx ON public.categories (lower(name))';
      END IF;
    ELSE
      EXECUTE 'CREATE UNIQUE INDEX categories_name_lower_uidx ON public.categories (lower(name))';
    END IF;
  END IF;
END$$;

-- Unique on lower(slug) where slug IS NOT NULL when safe; else non-unique
DO $$
DECLARE has_dupes boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='categories_slug_lower_uidx') THEN
    SELECT EXISTS (
      SELECT lower(slug) FROM public.categories WHERE slug IS NOT NULL GROUP BY 1 HAVING COUNT(*) > 1
    ) INTO has_dupes;

    IF has_dupes THEN
      IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='categories_slug_lower_idx') THEN
        EXECUTE 'CREATE INDEX categories_slug_lower_idx ON public.categories (lower(slug)) WHERE slug IS NOT NULL';
      END IF;
    ELSE
      EXECUTE 'CREATE UNIQUE INDEX categories_slug_lower_uidx ON public.categories (lower(slug)) WHERE slug IS NOT NULL';
    END IF;
  END IF;
END$$;

-- Sub-categories
CREATE TABLE IF NOT EXISTS public.sub_categories (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id  uuid        NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  name         text        NOT NULL,
  slug         text,
  description  text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- Unique per (category_id, lower(name)) when safe; else non-unique
DO $$
DECLARE has_dupes boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='sub_categories_name_per_category_lower_uidx') THEN
    SELECT EXISTS (
      SELECT category_id, lower(name) FROM public.sub_categories GROUP BY 1,2 HAVING COUNT(*) > 1
    ) INTO has_dupes;

    IF has_dupes THEN
      IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='sub_categories_name_per_category_lower_idx') THEN
        EXECUTE 'CREATE INDEX sub_categories_name_per_category_lower_idx ON public.sub_categories (category_id, lower(name))';
      END IF;
    ELSE
      EXECUTE 'CREATE UNIQUE INDEX sub_categories_name_per_category_lower_uidx ON public.sub_categories (category_id, lower(name))';
    END IF;
  END IF;
END$$;

-- Unique per (category_id, lower(slug)) where slug IS NOT NULL when safe; else non-unique
DO $$
DECLARE has_dupes boolean;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='sub_categories_slug_per_category_lower_uidx') THEN
    SELECT EXISTS (
      SELECT category_id, lower(slug) FROM public.sub_categories WHERE slug IS NOT NULL GROUP BY 1,2 HAVING COUNT(*) > 1
    ) INTO has_dupes;

    IF has_dupes THEN
      IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='sub_categories_slug_per_category_lower_idx') THEN
        EXECUTE 'CREATE INDEX sub_categories_slug_per_category_lower_idx ON public.sub_categories (category_id, lower(slug)) WHERE slug IS NOT NULL';
      END IF;
    ELSE
      EXECUTE 'CREATE UNIQUE INDEX sub_categories_slug_per_category_lower_uidx ON public.sub_categories (category_id, lower(slug)) WHERE slug IS NOT NULL';
    END IF;
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS sub_categories_category_id_idx ON public.sub_categories (category_id);

-- Community: add columns if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='sub_category_id'
  ) THEN
    ALTER TABLE public.community ADD COLUMN sub_category_id uuid;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='reached_out'
  ) THEN
    ALTER TABLE public.community ADD COLUMN reached_out boolean NOT NULL DEFAULT false;
  END IF;
END$$;

-- FK to sub_categories (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='community_sub_category_fk') THEN
    ALTER TABLE public.community
      ADD CONSTRAINT community_sub_category_fk
      FOREIGN KEY (sub_category_id) REFERENCES public.sub_categories(id) ON DELETE RESTRICT;
  END IF;
END$$;

CREATE INDEX IF NOT EXISTS community_sub_category_id_idx ON public.community (sub_category_id);

-- created_at index (safe because we ensured the column)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname='community_created_at_idx'
  ) THEN
    EXECUTE 'CREATE INDEX community_created_at_idx ON public.community (created_at DESC)';
  END IF;
END$$;

-- 2) Backfill only if legacy text columns still exist
DO $$
DECLARE
  has_cat boolean;
  has_sub boolean;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='category'
  ) INTO has_cat;

  SELECT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema='public' AND table_name='community' AND column_name='sub_category'
  ) INTO has_sub;

  IF has_cat THEN
    -- Insert distinct categories
    EXECUTE $SQL$
      INSERT INTO public.categories (name)
      SELECT DISTINCT category
      FROM public.community
      WHERE category IS NOT NULL AND category <> ''
        AND NOT EXISTS (
          SELECT 1 FROM public.categories c WHERE lower(c.name) = lower(community.category)
        )
    $SQL$;
  END IF;

  IF has_cat AND has_sub THEN
    -- Insert distinct sub-categories
    EXECUTE $SQL$
      WITH pairs AS (
        SELECT DISTINCT category, sub_category
        FROM public.community
        WHERE COALESCE(category, '') <> '' AND COALESCE(sub_category, '') <> ''
      )
      INSERT INTO public.sub_categories (category_id, name)
      SELECT c.id, p.sub_category
      FROM pairs p
      JOIN public.categories c ON lower(c.name) = lower(p.category)
      WHERE NOT EXISTS (
        SELECT 1 FROM public.sub_categories sc
        WHERE sc.category_id = c.id AND lower(sc.name) = lower(p.sub_category)
      )
    $SQL$;

    -- Link community.sub_category_id
    EXECUTE $SQL$
      UPDATE public.community com
      SET sub_category_id = sc.id
      FROM public.sub_categories sc
      JOIN public.categories c ON c.id = sc.category_id
      WHERE com.sub_category_id IS NULL
        AND lower(c.name) = lower(com.category)
        AND lower(sc.name) = lower(com.sub_category)
    $SQL$;
  END IF;

  -- Make NOT NULL if fully backfilled (ignore if not)
  IF NOT EXISTS (SELECT 1 FROM public.community WHERE sub_category_id IS NULL) THEN
    BEGIN
      EXECUTE 'ALTER TABLE public.community ALTER COLUMN sub_category_id SET NOT NULL';
    EXCEPTION WHEN others THEN
      NULL;
    END;
  END IF;

  -- Drop legacy text columns if still present
  IF has_cat THEN
    EXECUTE 'ALTER TABLE public.community DROP COLUMN category';
  END IF;
  IF has_sub THEN
    EXECUTE 'ALTER TABLE public.community DROP COLUMN sub_category';
  END IF;
END
$$;

-- 3) View
CREATE OR REPLACE VIEW public.community_enriched AS
SELECT
  com.id,
  com.name,
  c.name  AS category,
  sc.name AS sub_category,
  com.description,
  com.contact,
  com.email,
  com.address,
  com.in_charge,
  com.social_links,
  com.logo,
  com.image,
  com.reached_out,
  com.created_at
FROM public.community com
LEFT JOIN public.sub_categories sc ON sc.id = com.sub_category_id
LEFT JOIN public.categories     c  ON c.id  = sc.category_id;

COMMIT;
