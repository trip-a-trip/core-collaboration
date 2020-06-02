CREATE TABLE public.invites (
  "code"      varchar NOT NULL,
  "author_id" varchar NOT NULL,
  "used"      boolean NOT NULL default FALSE
);

ALTER TABLE ONLY public.invites
  ADD CONSTRAINT "PK_invites" PRIMARY KEY (code);

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
DROP TABLE public.collaborators;
