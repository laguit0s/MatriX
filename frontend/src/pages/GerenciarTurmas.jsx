import DataTable from "../components/DataTable";
import Header from "../components/Header";

function GerenciarTurmas() {
    // Dados de exemplo para compor a tabela desta tela.
    const tableHeaders = ["HEADER 1", "HEADER 2", "HEADER 3"];
    const tableRows = ["DATA 1", "DATA 2", "DATA 3"];

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR TURMAS" />
            <DataTable headerContent={tableHeaders} bodyContent={tableRows} />
        </div>
    );
}

export default GerenciarTurmas;