import Sidebar from "../components/SidebarDesktop"
import DataTable from "../components/DataTable"
import Header from "../components/Header"

function GerenciarAlunos() {
    const tableHeader = [<i className="bi bi-gear px-1"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE"]
    const tableBody = ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]

    return (
        <div className="d-flex flex-column h-100">
            <Header title="GERENCIAR ALUNOS" />
            <DataTable headerContent={tableHeader} bodyContent={tableBody} headerColumnClass={{1: "width-1"}} bodyColumnClass={{1: "text-center", 3: "text-center", 4: "text-center", 5: "text-center", 6: "text-center"}}/>
        </div>
    )
}

export default GerenciarAlunos