/*
  Warnings:

  - Added the required column `accountId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Queue_outletId_idx" ON "Queue"("outletId");

-- CreateIndex
CREATE INDEX "Queue_accountId_idx" ON "Queue"("accountId");

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
