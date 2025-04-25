-- DropForeignKey
ALTER TABLE "Outlet" DROP CONSTRAINT "Outlet_userId_fkey";

-- AlterTable
ALTER TABLE "OAuthToken" ADD COLUMN     "pfp" VARCHAR(255);

-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "hours" TEXT,
ADD COLUMN     "phone" VARCHAR(36),
ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
