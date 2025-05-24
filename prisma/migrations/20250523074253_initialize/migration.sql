/*
  Warnings:

  - Added the required column `inactiveAt` to the `QueueItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QueueItem" ADD COLUMN     "inactiveAt" TIMESTAMP(3) NOT NULL;
