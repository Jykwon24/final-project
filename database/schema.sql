set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "userExerciseList" (
	"exerciseId" serial NOT NULL,
	"userId" integer NOT NULL,
	"date" integer NOT NULL,
  "name" TEXT NOT NULL,
  "details" TEXT NOT NULL,
	CONSTRAINT "userExerciseList_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calories" (
	"calorieId" serial NOT NULL,
	"calorieRec" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "calories_pk" PRIMARY KEY ("calorieId")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "defaultExercises" (
	"defaultExerciseId" serial NOT NULL,
  "bodyPart" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"details" TEXT NOT NULL,
	CONSTRAINT "defaultExercises_pk" PRIMARY KEY ("defaultExerciseId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "userExerciseList" ADD CONSTRAINT "userExerciseList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "calories" ADD CONSTRAINT "calories_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
