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

-- TEAMS
CREATE TABLE IF NOT EXISTS public.teams (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying(100) COLLATE pg_catalog."default" NOT NULL,
  city character varying(100) COLLATE pg_catalog."default" NOT NULL,
  created_at timestamp without time zone NOT NULL DEFAULT now(),
  updated_at timestamp without time zone NOT NULL DEFAULT now(),
  deleted_at timestamp without time zone,
  CONSTRAINT PK_teams PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.teams OWNER TO root;

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(800) NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  price NUMERIC NOT NULL,
  team_id UUID NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,
  CONSTRAINT pk_products PRIMARY KEY (id),
  CONSTRAINT fk_products_team FOREIGN KEY (team_id)
    REFERENCES public.teams (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

ALTER TABLE IF EXISTS public.products OWNER TO root;

-- IMAGES
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  url VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  product_id UUID NOT NULL,
  CONSTRAINT pk_product_images PRIMARY KEY (id),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id)
    REFERENCES public.products (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

ALTER TABLE IF EXISTS public.product_images OWNER TO root;
