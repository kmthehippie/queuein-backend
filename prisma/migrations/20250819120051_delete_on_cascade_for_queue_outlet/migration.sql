-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_outletId_fkey";

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
