/*
  Warnings:

  - Made the column `userId` on table `Work` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_postId_fkey";

-- DropForeignKey
ALTER TABLE "Work" DROP CONSTRAINT "Work_userId_fkey";

-- AlterTable
ALTER TABLE "Work" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
