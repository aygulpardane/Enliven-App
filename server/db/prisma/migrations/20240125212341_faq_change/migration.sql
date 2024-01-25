/*
  Warnings:

  - You are about to drop the column `plantId` on the `FAQ` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FAQ" DROP CONSTRAINT "FAQ_plantId_fkey";

-- AlterTable
ALTER TABLE "FAQ" DROP COLUMN "plantId";

-- AlterTable
ALTER TABLE "Plant" ADD COLUMN     "questionsId" INTEGER;

-- AddForeignKey
ALTER TABLE "Plant" ADD CONSTRAINT "Plant_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "FAQ"("id") ON DELETE SET NULL ON UPDATE CASCADE;
