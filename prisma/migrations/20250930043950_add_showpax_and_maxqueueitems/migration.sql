-- AlterTable
ALTER TABLE "Outlet" ADD COLUMN     "showPax" BOOLEAN DEFAULT true;

-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "maxQueueItems" INTEGER NOT NULL DEFAULT 999;
