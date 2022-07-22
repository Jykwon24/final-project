set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "userExerciseList" (
	"exerciseId" serial NOT NULL,
	"sets" integer NOT NULL,
	"reps" integer NOT NULL,
	"userId" integer NOT NULL,
	"datesId" integer NOT NULL,
	"defaultExerciseId" integer NOT NULL,
	CONSTRAINT "userExerciseList_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "calories" (
	"calorieId" serial NOT NULL,
	"currentWeight" integer NOT NULL,
	"height" integer NOT NULL,
	"birthday" date NOT NULL,
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

CREATE TABLE "defaultExercises" (
	"defaultExerciseId" serial NOT NULL,
	"name" TEXT NOT NULL,
	"details" TEXT NOT NULL,
	CONSTRAINT "defaultExercises_pk" PRIMARY KEY ("defaultExerciseId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "userExerciseList" ADD CONSTRAINT "userExerciseList_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "userExerciseList" ADD CONSTRAINT "userExerciseList_fk1" FOREIGN KEY ("datesId") REFERENCES "dates"("datesId");
ALTER TABLE "userExerciseList" ADD CONSTRAINT "userExerciseList_fk2" FOREIGN KEY ("defaultExerciseId") REFERENCES "defaultExercises"("defaultExerciseId");
ALTER TABLE "calories" ADD CONSTRAINT "calories_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
