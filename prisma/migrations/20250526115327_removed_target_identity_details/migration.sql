/*
  Warnings:

  - You are about to drop the column `details` on the `AuditLog` table. All the data in the column will be lost.
  - You are about to drop the column `targetEntityId` on the `AuditLog` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "AuditLog_targetEntityId_idx";

-- AlterTable
ALTER TABLE "AuditLog" DROP COLUMN "details",
DROP COLUMN "targetEntityId";
