/*
  Warnings:

  - A unique constraint covering the columns `[companyEmailHashed]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyEmailHashed` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberHashed` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactNumberHashed` to the `QueueItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameHashed` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "companyEmailHashed" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "numberHashed" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "QueueItem" ADD COLUMN     "contactNumberHashed" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "nameHashed" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_companyEmailHashed_key" ON "Account"("companyEmailHashed");
