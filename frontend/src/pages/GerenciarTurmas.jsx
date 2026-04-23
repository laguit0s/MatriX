import Sidebar from "../components/SidebarDesktop"
import DataTable from "../components/DataTable"
import Header from "../components/Header"

function GerenciarTurmas() {
    const tableHeader = ["HEADER 1", "HEADER 2", "HEADER 3"]
    const tableBody = ["DATA 1", "DATA 2", "DATA 3"]
    return (
        <div className="d-flex flex-column h-100">
            <Header title="Gerenciar Turmas" />
            <DataTable headerContent={tableHeader} bodyContent={tableBody} />
        </div>
    )
}

export default GerenciarTurmas