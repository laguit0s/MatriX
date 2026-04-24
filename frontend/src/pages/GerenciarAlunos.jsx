import DataTable from "../components/DataTable";
import Header from "../components/Header";
import api from "../services/api";
import { useEffect, useState } from "react";

function GerenciarAlunos() {
    const [alunos, setAlunos] = useState([]);

    // Carrega alunos uma vez ao montar a página.
    useEffect(() => {
        async function carregarAlunos() {
            const req = await api.get('api/gerenciar-alunos');
            setAlunos(req.data);
        }
        carregarAlunos();
    }, []);

    // Estrutura visual da tabela (header + corpo achatado).
    const tableHeaders = [<i className="bi bi-gear px-1"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE", "DATA DA MATRÍCULA"];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR ALUNOS" />
            <DataTable headerContent={tableHeaders} bodyContent={alunos} headerColumnClass={{ 1: "width-1" }} bodyColumnClass={{ 2: "text-start" }} />
        </div>
    );
}

export default GerenciarAlunos;