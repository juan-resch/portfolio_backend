/*
  Warnings:

  - You are about to drop the column `icon` on the `Tech` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Tech` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tech" DROP COLUMN "icon",
DROP COLUMN "name";
