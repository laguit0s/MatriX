import CadastroCurso from "../components/CadastroCurso";
import DataTable from "../components/DataTable";
import Header from "../components/Header";
import api from "../services/api";
import RenderProfile from "../services/renderProfileLink";
import DeleteCell from "../services/deleteCell";
import { useEffect, useState } from "react";

// constroi a tela principal para gerenciar registros e tabela
function GerenciarCursos() {
    const [cursos, setCursos] = useState([]);

    // faz leitura dos recursos do servidor e popula o estado da tabela
    useEffect(() => {
        async function carregarCursos() {
            const req = await api.get('/api/gerenciar-cursos');
            setCursos(req.data);
        }
        carregarCursos();
    }, []);

    // define o titulo das colunas da tabela de exibicao de dados
    const tableHeaders = [<i className="bi bi-gear"></i>, "NOME", "CÓDIGO", "VALOR", "COBRANÇA", ''];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR CURSOS" Modal={() => <CadastroCurso title={'Cadastrar curso'}/>} modalID={"#cadastro-curso"}/>
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={cursos} 
            headerColumnClass={{ 1: "width-1", 6: "width-1" }} 
            bodyColumnClass={{ 1: 'text-center p-0', 2: "text-start", 6: "text-center p-0" }} 
            propertiesIgnore={['id']} 
            standardStart={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (item_id) => 
                    RenderProfile('/gerenciar-cursos/', item_id, 'bi bi-mortarboard-fill')
            }}
            standardEnd={{
                delete: true, 
                deleteCell: (item_id) => 
                    DeleteCell('/api/gerenciar-cursos/', item_id)
            }}/>
        </div>
    )
}

// expoe acesso a base global
export default GerenciarCursos;