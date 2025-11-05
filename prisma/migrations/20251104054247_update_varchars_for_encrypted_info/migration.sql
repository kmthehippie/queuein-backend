/*
  Warnings:

  - You are about to alter the column `companyEmail` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - You are about to alter the column `contactNumber` on the `QueueItem` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.
  - Made the column `contactNumber` on table `QueueItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "companyName" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "companyEmail" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "name" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "number" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Outlet" ALTER COLUMN "name" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "location" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(1000);

-- Update existing NULL values to an empty string before making required
UPDATE "QueueItem" SET "contactNumber" = '' WHERE "contactNumber" IS NULL;

-- AlterTable
ALTER TABLE "QueueItem" ALTER COLUMN "contactNumber" SET NOT NULL,
ALTER COLUMN "contactNumber" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "name" SET DATA TYPE VARCHAR(1000),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(1000);