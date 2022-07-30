/*
  Warnings:

  - Added the required column `color` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillId` to the `Tech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tech" ADD COLUMN     "skillId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tech" ADD CONSTRAINT "Tech_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
