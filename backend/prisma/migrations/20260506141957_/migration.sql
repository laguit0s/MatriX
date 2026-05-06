/*
  Warnings:

  - Made the column `vagasDisponiveis` on table `Turma` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Turma" ALTER COLUMN "vagasDisponiveis" SET NOT NULL;
