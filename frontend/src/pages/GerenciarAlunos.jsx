import CadastroAluno from "../components/CadastroAluno";
import DataTable from "../components/DataTable";
import Header from "../components/Header";
import api from "../services/api";
import RenderProfile from "../services/renderProfileLink";
import DeleteCell from "../services/deleteCell";
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
    const tableHeaders = [<i className="bi bi-gear px-1"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE", ''];

    return alunos.length !== 0 ? (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR ALUNOS" Modal={CadastroAluno} modalID={"#cadastro-aluno"}/>
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={alunos} 
            headerColumnClass={{ 1: "width-1", 7: "width-1" }} 
            bodyColumnClass={{ 1: 'text-center p-0', 2: "text-start", 5: "text-start", 7: "text-center p-0" }} 
            propertiesIgnore={['id', 'data_matricula']} 
            standardStart={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (item_id) => 
                    RenderProfile('/gerenciar-alunos/', item_id, 'bi bi-person-square')
            }}
            standardEnd={{
                delete: true, 
                deleteCell: (item_id) => 
                    DeleteCell('/gerenciar-alunos/', item_id)
            }}/>
        </div>
    ) : 
    <div className="d-flex justify-content-center align-items-center h-100">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">carregando...</span>
        </div>
    </div>
}

// expoe acesso a base global
export default GerenciarAlunos;