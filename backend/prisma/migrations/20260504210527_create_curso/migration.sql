/*
  Warnings:

  - You are about to drop the `aluno` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "aluno";

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "data_matricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cod" TEXT NOT NULL,
    "valor" DECIMAL(10,2) NOT NULL,
    "cobranca" TEXT NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_cpf_key" ON "Aluno"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Curso_cod_key" ON "Curso"("cod");
