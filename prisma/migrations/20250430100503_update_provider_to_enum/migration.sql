/*
  Warnings:

  - Changed the type of `provider` on the `OAuthToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('LOCAL', 'GOOGLE', 'GITHUB', 'FACEBOOK');

-- AlterTable
ALTER TABLE "OAuthToken" DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_provider_accountId_key" ON "OAuthToken"("provider", "accountId");
