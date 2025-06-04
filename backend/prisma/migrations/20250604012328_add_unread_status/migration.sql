-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "receiverUnread" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "senderUnread" BOOLEAN NOT NULL DEFAULT false;
