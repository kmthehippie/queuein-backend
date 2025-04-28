/*
  Warnings:

  - You are about to drop the column `userId` on the `OAuthToken` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Outlet` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[provider,accountId]` on the table `OAuthToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[accountId]` on the table `Outlet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `OAuthToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Outlet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'MANAGER', 'ASSISTANT_MANAGER', 'HOST', 'SERVER', 'CASHIER', 'BARISTA');

-- DropForeignKey
ALTER TABLE "OAuthToken" DROP CONSTRAINT "OAuthToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Outlet" DROP CONSTRAINT "Outlet_userId_fkey";

-- DropIndex
DROP INDEX "OAuthToken_provider_userId_key";

-- DropIndex
DROP INDEX "Outlet_userId_idx";

-- DropIndex
DROP INDEX "Outlet_userId_key";

-- AlterTable
ALTER TABLE "OAuthToken" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Outlet" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyName" VARCHAR(255),
    "companyEmail" TEXT NOT NULL,
    "password" TEXT,
    "hasPassword" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'HOST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" TEXT NOT NULL,
    "email" VARCHAR(255),

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_key" ON "Account"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyEmail_key" ON "Account"("companyEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_name_key" ON "Staff"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Staff_email_key" ON "Staff"("email");

-- CreateIndex
CREATE INDEX "Staff_accountId_idx" ON "Staff"("accountId");

-- CreateIndex
CREATE INDEX "Staff_name_idx" ON "Staff"("name");

-- CreateIndex
CREATE UNIQUE INDEX "OAuthToken_provider_accountId_key" ON "OAuthToken"("provider", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Outlet_accountId_key" ON "Outlet"("accountId");

-- CreateIndex
CREATE INDEX "Outlet_accountId_idx" ON "Outlet"("accountId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuthToken" ADD CONSTRAINT "OAuthToken_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outlet" ADD CONSTRAINT "Outlet_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;
