-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_outletId_fkey";

-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "outletId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_outletId_fkey" FOREIGN KEY ("outletId") REFERENCES "Outlet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
