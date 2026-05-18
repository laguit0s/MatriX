/*
  Warnings:

  - You are about to drop the column `statusMatricula` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `statusMatricula` on the `Matricula` table. All the data in the column will be lost.
  - Added the required column `status` to the `Matricula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "statusMatricula";

-- AlterTable
ALTER TABLE "Matricula" DROP COLUMN "statusMatricula",
ADD COLUMN     "status" TEXT NOT NULL;
