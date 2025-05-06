/*
  Warnings:

  - You are about to drop the column `maxOAuthTokens` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,accountId]` on the table `OAuthToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OAuthToken_refreshToken_accountId_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "maxOAuthTokens";

-- AlterTable
ALTER TABLE "OAuthToken" ADD COLUMN     "deviceName" TEXT,
ADD COLUMN     "lastLoggedIn" TIMESTAMP(3),
ADD COLUMN     "userAgent" TEXT NOT NULL DEFAULT 'UNKNOWN';

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_id_accountId_key" ON "OAuthToken"("id", "accountId");
