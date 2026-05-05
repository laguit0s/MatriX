/*
  Warnings:

  - Changed the type of `ano` on the `Turma` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Turma" DROP COLUMN "ano",
ADD COLUMN     "ano" INTEGER NOT NULL;
