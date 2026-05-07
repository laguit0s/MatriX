import DataTable from "../components/DataTable";
import CadastroTurma from "../components/CadastroTurma";
import Header from "../components/Header";
import api from "../services/api";
import RenderProfile from "../services/renderProfileLink";
import DeleteCell from "../services/deleteCell";
import { useEffect, useState } from "react";

// constroi a tela principal para gerenciar registros e tabela
function GerenciarTurmas() {
    const [turmas, setTurmas] = useState(null);

    // faz leitura dos recursos do servidor e popula o estado da tabela
    useEffect(() => {
        async function carregarTurmas() {
            const req = await api.get('/api/gerenciar-turmas');
            setTurmas(req.data);
        }
        carregarTurmas();
    }, []);

    // define o titulo das colunas da tabela de exibicao de dados
    const tableHeaders = [<i className="bi bi-gear"></i>, "NOME", "CURSO", "ANO", "ALUNOS", 'VAGAS', 'STATUS', ''];

    return turmas ? (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR TURMAS" Modal={() => <CadastroTurma title={'Cadastrar turma'}/>} modalID={'#cadastro-turma'}/>
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={turmas} 
            headerColumnClass={{ 1: "width-1", 6: "width-1" }} 
            bodyColumnClass={{ 1: 'text-center p-0', 3: "text-start", 8: "text-center p-0 width-1" }} 
            propertiesIgnore={['id', 'vagasMax', 'numero', 'cursoId']} 
            colOrder={{
                2: "nome",
                3: "nomeCurso",
                4: "ano",
                5: "qtdAlunos",
                6: "vagasDisponiveis",
                7: "status"
            }}
            standardStart={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (item_id) => 
                    RenderProfile('/gerenciar-turmas/', item_id, 'bi bi-mortarboard-fill')
            }}
            standardEnd={{
                delete: true, 
                deleteCell: (item_id) => 
                    DeleteCell('/api/gerenciar-turmas/', item_id)
            }}/>
        </div>
    ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">carregando...</span>
            </div>
        </div>
    )
}

// expoe acesso a base global
export default GerenciarTurmas;