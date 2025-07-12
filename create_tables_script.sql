  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

  CREATE  TABLE  IF  NOT  EXISTS  public.usuarios
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  nome character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  email character varying(70) COLLATE pg_catalog."default"  NOT NULL,
  senha character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_d7281c63c176e152e4c531594a8"  PRIMARY KEY (id)
  );
  
  ALTER  TABLE  IF  EXISTS  public.usuarios  OWNER  to  root;

  CREATE  TABLE  IF  NOT  EXISTS  public.produtos
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  usuario_id character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  nome character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  valor integer  NOT NULL,
  quantidade integer  NOT NULL,
  descricao character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  categoria character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  created_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  updated_at timestamp without time zone  NOT NULL  DEFAULT  now(),
  deleted_at timestamp without time zone,
  CONSTRAINT  "PK_a5d976312809192261ed96174f3"  PRIMARY KEY (id)
  );
  
  ALTER  TABLE  IF  EXISTS  public.produtos  OWNER  to  root;

  CREATE  TABLE  IF  NOT  EXISTS  public.produto_caracteristicas
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  nome character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  descricao character varying(255) COLLATE pg_catalog."default"  NOT NULL,
  "produtoId" uuid,
  CONSTRAINT  "PK_132816ff55e30a6bf554c9e2545"  PRIMARY KEY (id),
  CONSTRAINT  "FK_67339e59ab4b3ed091cf318f426"  FOREIGN KEY ("produtoId")
  REFERENCES  public.produtos (id) MATCH SIMPLE
  ON  UPDATE CASCADE
  ON DELETE CASCADE
  );
  
  ALTER  TABLE  IF  EXISTS  public.produto_caracteristicas  OWNER  to  root;

  CREATE  TABLE  IF  NOT  EXISTS  public.produto_imagens
  (
  id uuid NOT NULL  DEFAULT uuid_generate_v4(),
  url  character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  descricao character varying(100) COLLATE pg_catalog."default"  NOT NULL,
  "produtoId" uuid,
  CONSTRAINT  "PK_d1cf326e8d58dbc469bd7fe2f32"  PRIMARY KEY (id),
  CONSTRAINT  "FK_eb1531605709dd94ec67b2141d0"  FOREIGN KEY ("produtoId")
  REFERENCES  public.produtos (id) MATCH SIMPLE
  ON  UPDATE CASCADE
  ON DELETE CASCADE
  );
  
  ALTER  TABLE  IF  EXISTS  public.produto_imagens  OWNER  to  root;