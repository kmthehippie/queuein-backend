/*
  Warnings:

  - The values [OWNER,MANAGER,ASSISTANT_MANAGER,HOST,SERVER,CASHIER,BARISTA] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('TIER_1', 'TIER_2', 'TIER_3', 'TIER_4');
ALTER TABLE "Staff" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Staff" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Staff" ALTER COLUMN "role" SET DEFAULT 'TIER_3';
COMMIT;

-- AlterTable
ALTER TABLE "Staff" ALTER COLUMN "role" SET DEFAULT 'TIER_3';
