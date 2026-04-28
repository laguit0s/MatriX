import CadastroAluno from "../components/CadastroAluno";
import DataTable from "../components/DataTable";
import Header from "../components/Header";
import api from "../services/api";
import RenderProfile from "../services/renderProfileLink";
import { useEffect, useState } from "react";

// constroi a tela principal para gerenciar registros e tabela
function GerenciarAlunos() {
    const [alunos, setAlunos] = useState([]);

    // faz leitura dos recursos do servidor e popula o estado da tabela
    useEffect(() => {
        async function carregarAlunos() {
            const req = await api.get('/api/gerenciar-alunos');
            setAlunos(req.data);
        }
        carregarAlunos();
    }, []);

    // define o titulo das colunas da tabela de exibicao de dados
    const tableHeaders = [<i className="bi bi-gear px-1"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE", "DATA DA MATRÍCULA"];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR ALUNOS" Modal={CadastroAluno} modalID={"#cadastro-aluno"}/>
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={alunos} 
            headerColumnClass={{ 1: "width-1" }} 
            bodyColumnClass={{ 1: 'fs-5', 2: "text-start", 5: "text-start" }} 
            propertiesIgnore={['id']} 
            standard={{
                    value: 'Profile', 
                    profileLink: true,
                    renderProfile: (item_id) => 
                        RenderProfile('/gerenciar-alunos/', 'bi bi-pencil text-black', item_id)
                    }}/>
        </div>
    );
}

// expoe acesso a base global
export default GerenciarAlunos;