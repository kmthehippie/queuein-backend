/*
  Warnings:

  - You are about to drop the column `pfp` on the `OAuthToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "logo" VARCHAR(255);

-- AlterTable
ALTER TABLE "OAuthToken" DROP COLUMN "pfp";

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "pfp" VARCHAR(255);
