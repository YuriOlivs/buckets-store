CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS
CREATE TABLE IF NOT EXISTS public.users (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL,
  birth_date DATE NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,

  CONSTRAINT pk_users PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.users OWNER TO root;

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(800) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  price NUMERIC(10, 2) NOT NULL,
  quantity_available INTEGER NOT NULL DEFAULT 0,
  team_id UUID,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,
  CONSTRAINT pk_products PRIMARY KEY (id)
);

-- TEAMS
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying(100) NOT NULL,
  city character varying(100) NOT NULL,
  logo_id UUID,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  deleted_at timestamp without time zone,
  CONSTRAINT pk_teams PRIMARY KEY (id)
);

-- IMAGES
CREATE TABLE IF NOT EXISTS public.images (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  product_id UUID,
  team_id UUID,
  CONSTRAINT pk_images PRIMARY KEY (id)
);

-- FK: products.team_id → teams.id
ALTER TABLE public.products
  ADD CONSTRAINT fk_products_team FOREIGN KEY (team_id)
  REFERENCES public.teams(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: teams.logo_id → images.id
ALTER TABLE public.teams
  ADD CONSTRAINT fk_teams_logo FOREIGN KEY (logo_id)
  REFERENCES public.images(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL;

-- FK: images.product_id → products.id
ALTER TABLE public.images
  ADD CONSTRAINT fk_images_product FOREIGN KEY (product_id)
  REFERENCES public.products(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: images.team_id → teams.id
ALTER TABLE public.images
  ADD CONSTRAINT fk_images_team FOREIGN KEY (team_id)
  REFERENCES public.teams(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- CHECK: só um pai (team ou product)
ALTER TABLE public.images
  ADD CONSTRAINT chk_only_one_parent CHECK (
    (product_id IS NOT NULL AND team_id IS NULL) OR
    (product_id IS NULL AND team_id IS NOT NULL)
  );
