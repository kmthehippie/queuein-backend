/*
  Warnings:

  - The primary key for the `OAuthToken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "OAuthToken" DROP CONSTRAINT "OAuthToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "OAuthToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OAuthToken_id_seq";
