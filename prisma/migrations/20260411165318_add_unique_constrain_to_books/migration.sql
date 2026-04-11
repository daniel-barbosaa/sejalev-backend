/*
  Warnings:

  - A unique constraint covering the columns `[user_id,externalId]` on the table `books` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "books_user_id_externalId_key" ON "books"("user_id", "externalId");
