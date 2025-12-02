-- DropIndex
DROP INDEX "OAuthToken_provider_accountId_key";

-- AlterTable
ALTER TABLE "OAuthToken" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "staffId" TEXT;

-- CreateIndex
CREATE INDEX "OAuthToken_accountId_idx" ON "OAuthToken"("accountId");

-- CreateIndex
CREATE INDEX "OAuthToken_staffId_idx" ON "OAuthToken"("staffId");

-- CreateIndex
CREATE INDEX "OAuthToken_accessToken_idx" ON "OAuthToken"("accessToken");

-- AddForeignKey
ALTER TABLE "OAuthToken" ADD CONSTRAINT "OAuthToken_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
