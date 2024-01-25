/*
  Warnings:

  - You are about to drop the column `questionsId` on the `Plant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plant" DROP CONSTRAINT "Plant_questionsId_fkey";

-- AlterTable
ALTER TABLE "Plant" DROP COLUMN "questionsId",
ADD COLUMN     "fAQId" INTEGER;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_fAQId_fkey" FOREIGN KEY ("fAQId") REFERENCES "FAQ"("id") ON DELETE SET NULL ON UPDATE CASCADE;
