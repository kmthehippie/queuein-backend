/*
  Warnings:

  - A unique constraint covering the columns `[number,accountId]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Customer_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_number_accountId_key" ON "Customer"("number", "accountId");
