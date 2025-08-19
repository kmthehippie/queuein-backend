-- DropForeignKey
ALTER TABLE "QueueItem" DROP CONSTRAINT "QueueItem_queueId_fkey";

-- AddForeignKey
ALTER TABLE "QueueItem" ADD CONSTRAINT "QueueItem_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "Queue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
