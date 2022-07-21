set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"userName" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"createdAt" TIMESTAMPTZ NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "exercises" (
	"exerciseId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"details" TEXT NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"userId" integer NOT NULL,
	"datesId" integer NOT NULL,
	CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calories" (
	"calorieId" serial NOT NULL,
	"currentWeight" integer NOT NULL,
	"height" integer NOT NULL,
	"birthday" DATE NOT NULL,
	"activityLevel" TEXT NOT NULL,
	"gender" text NOT NULL,
	"goal" TEXT NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "calories_pk" PRIMARY KEY ("calorieId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "dates" (
	"datesId" serial NOT NULL,
	"sun" TEXT NOT NULL,
	"mon" TEXT NOT NULL,
	"tues" TEXT NOT NULL,
	"wed" TEXT NOT NULL,
	"thurs" TEXT NOT NULL,
	"fri" TEXT NOT NULL,
	"sat" TEXT NOT NULL,
	CONSTRAINT "dates_pk" PRIMARY KEY ("datesId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk1" FOREIGN KEY ("datesId") REFERENCES "dates"("datesId");
ALTER TABLE "calories" ADD CONSTRAINT "calories_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
