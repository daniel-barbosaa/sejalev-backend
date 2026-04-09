/*
  Warnings:

  - You are about to drop the `user_books` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_books" DROP CONSTRAINT "user_books_user_id_fkey";

-- DropTable
DROP TABLE "user_books";

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "externalId" TEXT,
    "title" TEXT NOT NULL,
    "author" TEXT,
    "thumbnail" TEXT,
    "status" "BookStatus" NOT NULL DEFAULT 'WANT_TO_READ',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
