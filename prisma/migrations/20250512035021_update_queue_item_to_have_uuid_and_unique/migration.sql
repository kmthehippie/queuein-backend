/*
  Warnings:

  - The primary key for the `QueueItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `QueueItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QueueItem" DROP CONSTRAINT "QueueItem_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "QueueItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "QueueItem_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "QueueItem_id_key" ON "QueueItem"("id");
