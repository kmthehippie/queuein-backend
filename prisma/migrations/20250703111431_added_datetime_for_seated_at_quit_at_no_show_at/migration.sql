-- AlterTable
ALTER TABLE "QueueItem" ADD COLUMN     "noShowAt" TIMESTAMP(3),
ADD COLUMN     "quitAt" TIMESTAMP(3),
ADD COLUMN     "seatedAt" TIMESTAMP(3);
