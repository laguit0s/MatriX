import DataTable from "../components/DataTable";
import Header from "../components/Header";

// gerencia a exibicao e controle de dados das turmas
function GerenciarTurmas() {
    // dados fixos como exemplo da construcao da tabela de turmas
    const tableHeaders = ["HEADER 1", "HEADER 2", "HEADER 3"];
    const tableRows = ["DATA 1", "DATA 2", "DATA 3"];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR TURMAS" />
            <DataTable headerContent={tableHeaders} bodyContent={tableRows} />
        </div>
    );
}

// expoe modulo estruturado para a raiz
export default GerenciarTurmas;