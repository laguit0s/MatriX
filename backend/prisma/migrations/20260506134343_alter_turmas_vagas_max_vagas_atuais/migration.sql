/*
  Warnings:

  - You are about to drop the column `qtd_alunos` on the `Turma` table. All the data in the column will be lost.
  - You are about to drop the column `qtd_vagas` on the `Turma` table. All the data in the column will be lost.
  - Added the required column `qtdAlunos` to the `Turma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vagasAtuais` to the `Turma` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vagasMax` to the `Turma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Turma" DROP COLUMN "qtd_alunos",
DROP COLUMN "qtd_vagas",
ADD COLUMN     "qtdAlunos" INTEGER NOT NULL,
ADD COLUMN     "vagasAtuais" INTEGER NOT NULL,
ADD COLUMN     "vagasMax" INTEGER NOT NULL;
