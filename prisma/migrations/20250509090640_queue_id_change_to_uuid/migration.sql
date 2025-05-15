/*
  Warnings:

  - The primary key for the `Queue` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "QueueItem" DROP CONSTRAINT "QueueItem_queueId_fkey";

-- AlterTable
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Queue_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Queue_id_seq";

-- AlterTable
ALTER TABLE "QueueItem" ALTER COLUMN "queueId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
