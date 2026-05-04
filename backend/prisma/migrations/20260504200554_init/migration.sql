-- CreateTable
CREATE TABLE "aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "data_matricula" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "aluno_cpf_key" ON "aluno"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "aluno_email_key" ON "aluno"("email");
