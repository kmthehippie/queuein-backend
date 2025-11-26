-- AlterEnum
ALTER TYPE "ActionType" ADD VALUE 'QUEUE_PAUSED';

-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "actualResumeTime" TIMESTAMP(3),
ADD COLUMN     "estimatedResumeTime" TIMESTAMP(3),
ADD COLUMN     "isPaused" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pauseReason" VARCHAR(1000),
ADD COLUMN     "pausedAt" TIMESTAMP(3),
ADD COLUMN     "pausedByStaffId" TEXT;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_pausedByStaffId_fkey" FOREIGN KEY ("pausedByStaffId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
