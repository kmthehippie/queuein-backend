/*
  Warnings:

  - Added the required column `position` to the `QueueItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QueueItem" ADD COLUMN     "position" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "QueueItem_position_idx" ON "QueueItem"("position");
