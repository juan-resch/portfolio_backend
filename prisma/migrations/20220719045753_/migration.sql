/*
  Warnings:

  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Work` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_workId_fkey";

-- AlterTable
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "workId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Skill_id_seq";

-- AlterTable
ALTER TABLE "Work" DROP CONSTRAINT "Work_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Work_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Work_id_seq";

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
