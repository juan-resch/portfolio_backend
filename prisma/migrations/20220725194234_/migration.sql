/*
  Warnings:

  - Added the required column `role` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "role" TEXT NOT NULL;
