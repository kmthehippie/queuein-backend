/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_companyName_idx";

-- CreateIndex
CREATE INDEX "Account_slug_idx" ON "Account"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_number_key" ON "Customer"("number");
