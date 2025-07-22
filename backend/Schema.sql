-- Enable UUID gen if you don't already have it
-- (Postgres 13+: prefer gen_random_uuid from pgcrypto)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.community (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          varchar(500)      NOT NULL,
  category      varchar(100)      NOT NULL,
  sub_category  text              NOT NULL,
  description   varchar(1000)     NOT NULL,
  contact       varchar(100)      NOT NULL,
  email         varchar(255)      NOT NULL,
  address       text              NOT NULL,
  in_charge     text              NOT NULL,
  social_links  json              NOT NULL,   -- e.g. {"instagram":"...", "website":"..."}
  logo          varchar(255),                 -- optional
  image         varchar(255),                 -- optional
  created_at    timestamptz       NOT NULL DEFAULT now()
);

-- Helpful indexes (optional)
CREATE INDEX community_category_idx     ON public.community (category);
CREATE INDEX community_created_at_idx   ON public.community (created_at DESC);



-- UUID helper (use pgcrypto or uuid-ossp; pick what you already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.refresh_tokens (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash  text        NOT NULL,          -- store a hashed token, never the raw token
  user_id     uuid        NOT NULL,          -- who owns it
  expires_at  timestamptz NOT NULL,          -- when this token dies
  created_at  timestamptz NOT NULL DEFAULT now(),
  revoked     boolean     NOT NULL DEFAULT false
);

-- Link to users table (adjust schema/table name if needed)
ALTER TABLE public.refresh_tokens
  ADD CONSTRAINT refresh_tokens_user_fk
  FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;

-- Speed lookups & enforce uniqueness if desired
CREATE UNIQUE INDEX refresh_tokens_token_hash_uidx ON public.refresh_tokens (token_hash);
CREATE INDEX refresh_tokens_user_id_idx            ON public.refresh_tokens (user_id);
CREATE INDEX refresh_tokens_expires_at_idx         ON public.refresh_tokens (expires_at);




-- UUID generator (pick the one you use)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE public.users (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text        NOT NULL,
  email          text        NOT NULL,
  password_hash  text        NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- Make sure each email is unique
CREATE UNIQUE INDEX users_email_uidx ON public.users (email);
