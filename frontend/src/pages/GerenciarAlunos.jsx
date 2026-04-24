import DataTable from "../components/DataTable";
import Header from "../components/Header";
import api from "../services/api";
import { useEffect } from "react";

function GerenciarAlunos() {
    // Carrega alunos uma vez ao montar a página.
    useEffect(() => {
        async function carregarAlunos() {
            try {
                const response = await api.get('/api/gerenciar-alunos');
                // Log temporário para validar integração frontend-backend.
                console.log(response.data);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        }

        carregarAlunos();
    }, []);

    // Estrutura visual da tabela (header + corpo achatado).
    const tableHeaders = [<i className="bi bi-gear px-1"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE", "DATA DA MATRÍCULA"];
    const tableRows = [];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR ALUNOS" />
            <DataTable headerContent={tableHeaders} bodyContent={tableRows} headerColumnClass={{ 1: "width-1" }} bodyColumnClass={{ 2: "text-start" }} />
        </div>
    );
}

export default GerenciarAlunos;