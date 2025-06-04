/*
  Warnings:

  - You are about to drop the column `lastMessageAt` on the `Friend` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Friend" DROP COLUMN "lastMessageAt",
ADD COLUMN     "astMessageAt" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00';
