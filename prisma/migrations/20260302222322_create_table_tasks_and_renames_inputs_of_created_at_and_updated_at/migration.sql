-- CreateEnum
CREATE TYPE "priority_type" AS ENUM ('PAIN_PREVENTION', 'GAIN_PRODUCTION');

-- CreateEnum
CREATE TYPE "status_type" AS ENUM ('PENDING', 'DONE');

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "priority" "priority_type" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "status_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);
