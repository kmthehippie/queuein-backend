/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "slug" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_slug_key" ON "Account"("slug");

-- CreateIndex
CREATE INDEX "Account_companyName_idx" ON "Account"("companyName");
