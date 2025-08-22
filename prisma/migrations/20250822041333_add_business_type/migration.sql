-- CreateEnum
CREATE TYPE "BusinessType" AS ENUM ('RESTAURANT', 'CLINIC', 'BASIC');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "businessType" "BusinessType" NOT NULL DEFAULT 'BASIC';
