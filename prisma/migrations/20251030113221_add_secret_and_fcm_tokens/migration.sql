/*
  Warnings:

  - A unique constraint covering the columns `[secretToken]` on the table `QueueItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QueueItem" ADD COLUMN     "secretToken" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "QueueItem_secretToken_key" ON "QueueItem"("secretToken");
