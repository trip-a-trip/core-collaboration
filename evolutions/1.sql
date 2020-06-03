CREATE TABLE public.invites (
  "code"      varchar NOT NULL,
  "author_id" varchar NOT NULL,
  "used"      boolean NOT NULL default FALSE
);

ALTER TABLE ONLY public.invites
  ADD CONSTRAINT "PK_invites" PRIMARY KEY (code);

CREATE TABLE public."publish_tokens" (
  "token"   varchar NOT NULL,
  "user_id" varchar NOT NULL,
  "used"    boolean NOT NULL default FALSE
);

ALTER TABLE ONLY public."publish_tokens"
  ADD CONSTRAINT "PK_publish_tokens" PRIMARY KEY (token);

CREATE TABLE public.collaborators (
  "user_id"    varchar                     NOT NULL,
  "sponsor_id" varchar                     NOT NULL,
  "invited_at" timestamp without time zone NOT NULL,
  "rating"     integer                     NOT NULL default 0
);

ALTER TABLE ONLY public.collaborators
  ADD CONSTRAINT "PK_collaborators" PRIMARY KEY ("user_id");

#DOWN

DROP TABLE public.invites;
DROP TABLE public."publish_tokens";
DROP TABLE public.collaborators;
