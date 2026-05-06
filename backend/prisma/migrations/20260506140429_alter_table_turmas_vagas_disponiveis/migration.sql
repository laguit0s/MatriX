/*
  Warnings:

  - You are about to drop the column `vagasAtuais` on the `Turma` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Turma" DROP COLUMN "vagasAtuais",
ADD COLUMN     "vagasDisponiveis" INTEGER NOT NULL;
