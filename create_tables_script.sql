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

-- ADDRESSES
CREATE TABLE IF NOT EXISTS public.addresses (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  complement VARCHAR(100),
  neighborhood VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL DEFAULT 'Brasil',
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,

  CONSTRAINT pk_addresses PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.addresses OWNER TO root;

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

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  address_id UUID NOT NULL,
  total_value NUMERIC(10, 2) NOT NULL,
    raw_value NUMERIC(10, 2) NOT NULL,
  discount_value NUMERIC(10, 2) NOT NULL,
  coupon_id UUID,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,

  CONSTRAINT pk_orders PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.orders OWNER TO root;

-- ORDER ITEMS
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  sale_price NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,

  CONSTRAINT pk_order_items PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.order_items OWNER TO root;

-- ORDER STATUS
CREATE TABLE IF NOT EXISTS public.order_status (
  id UUID NOT NULL DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL,
  status_text VARCHAR(255) NOT NULL,
  status_date TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT now(),
  deleted_at TIMESTAMP WITHOUT TIME ZONE,

  CONSTRAINT pk_order_status PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.order_status OWNER TO root;

-- CART
CREATE TABLE IF NOT EXISTS public.carts (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    user_id uuid NOT NULL,

    CONSTRAINT "pk_carts" PRIMARY KEY (id)
)

ALTER TABLE IF EXISTS public.carts OWNER to root;

-- CART ITEMS
CREATE TABLE IF NOT EXISTS public.cart_items (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    quantity integer NOT NULL,
    sale_price numeric(10,2) NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    cart_id UUID NOT NULL,
    product_id UUID NOT NULL,

    CONSTRAINT "pk_cart_items" PRIMARY KEY (id)
)

ALTER TABLE IF EXISTS public.cart_items OWNER to root;

CREATE TABLE IF NOT EXISTS public.coupons (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    code character varying(6) COLLATE pg_catalog."default" NOT NULL,
    discount integer NOT NULL,
    start_date timestamp without time zone NOT NULL,
    end_date timestamp without time zone NOT NULL,
    target_type character varying COLLATE pg_catalog."default",
    target_value character varying(255) COLLATE pg_catalog."default",
    is_percentage boolean NOT NULL,
    max_uses integer NOT NULL,
    current_uses integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,

    CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY (id)
)

ALTER TABLE IF EXISTS public.coupons OWNER to root;

-- FK: addresses.user_id → users.id
ALTER TABLE public.addresses
  ADD CONSTRAINT fk_addresses_user FOREIGN KEY (user_id)
  REFERENCES public.users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: orders.address_id → addresses.id
ALTER TABLE public.orders
  ADD CONSTRAINT fk_orders_address FOREIGN KEY (address_id)
  REFERENCES public.addresses(id)
  ON UPDATE CASCADE
  ON DELETE SET NULL;

-- FK: orders.user_id → users.id
ALTER TABLE public.orders
  ADD CONSTRAINT fk_orders_user FOREIGN KEY (user_id)
  REFERENCES public.users(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: order_items.order_id → orders.id
ALTER TABLE public.order_items
  ADD CONSTRAINT fk_order_items_order FOREIGN KEY (order_id)
  REFERENCES public.orders(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: order_items.product_id → products.id
ALTER TABLE public.order_items
  ADD CONSTRAINT fk_order_items_product FOREIGN KEY (product_id)
  REFERENCES public.products(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

-- FK: order_status.order_id → orders.id
ALTER TABLE public.order_status
  ADD CONSTRAINT fk_order_status_order FOREIGN KEY (order_id)
  REFERENCES public.orders(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE;

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

-- FK: cart.user_id → user.id
ALTER TABLE public.cart
 ADD CONSTRAINT "fk_carts_users" FOREIGN KEY (user_id)
      REFERENCES public.users (id) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION;

-- FK: cart_items.product_id → product.id
ALTER TABLE public.cart_items
  ADD CONSTRAINT "FK_items_product" FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

-- FK: cart_items.cart_id → cart.id
ALTER TABLE public.cart_items
 ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id)
        REFERENCES public.carts (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION;

-- FK: cart.coupon_id -> coupon_id
ALTER TABLE public.cart
  ADD CONSTRAINT "FK_cart_coupon" FOREIGN KEY (coupon_id)
        REFERENCES public.coupons (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL;

-- FK: orders.coupon_id -> coupon_id
ALTER TABLE public.orders
  ADD CONSTRAINT "FK_order_coupon" FOREIGN KEY (coupon_id)
        REFERENCES public.coupons (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE SET NULL;

-- CHECK: só um pai (team ou product)
ALTER TABLE public.images
  ADD CONSTRAINT chk_only_one_parent CHECK (
    (product_id IS NOT NULL AND team_id IS NULL) OR
    (product_id IS NULL AND team_id IS NOT NULL)
  );

-- CHECK: só um carrinho por usuário
ALTER TABLE public.carts
  ADD CONSTRAINT "chk_user_has_one_cart" UNIQUE (user_id);
