-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActionType" ADD VALUE 'QUEUE_RESUMED';
ALTER TYPE "ActionType" ADD VALUE 'AUDIT_LOG_CLEANUP';
ALTER TYPE "ActionType" ADD VALUE 'AUDIT_LOG_CLEANUP_FAILED';
ALTER TYPE "ActionType" ADD VALUE 'GDPR_DATA_CLEANUP';
ALTER TYPE "ActionType" ADD VALUE 'GDPR_DATA_CLEANUP_FAILED';
ALTER TYPE "ActionType" ADD VALUE 'INACTIVE_QUEUE_CLEANUP';
ALTER TYPE "ActionType" ADD VALUE 'INACTIVE_QUEUE_CLEANUP_FAILED';
ALTER TYPE "ActionType" ADD VALUE 'MONTHLY_USAGE_RESET';
