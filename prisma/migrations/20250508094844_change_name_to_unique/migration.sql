/*
  Warnings:

  - A unique constraint covering the columns `[companyName]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_companyName_key" ON "Account"("companyName");
