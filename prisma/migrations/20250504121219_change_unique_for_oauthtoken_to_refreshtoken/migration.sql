/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken,accountId]` on the table `OAuthToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OAuthToken_provider_accountId_key";

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_refreshToken_accountId_key" ON "OAuthToken"("refreshToken", "accountId");
