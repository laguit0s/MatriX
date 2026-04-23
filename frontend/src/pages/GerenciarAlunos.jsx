import Sidebar from "../components/SidebarDesktop"
import DataTable from "../components/DataTable"
import Header from "../components/Header"

function GerenciarAlunos() {
    const tableHeader = []
    for (let i = 0; i < 20; i++) {
        tableHeader.push(`HEADER ${i}`)
    }
    const tableBody = []
    for (let i = 0; i < 1000; i++) {
        tableBody.push(`DATA ${i}`)
    }
    return (
        <div className="d-flex flex-column h-100">
            <Header title="Gerenciar Alunos" />
            <DataTable headerContent={tableHeader} bodyContent={tableBody} bodyColumnClass={{0: "text-start", 1: "text-center", 2: "text-end"}}/>
        </div>
    )
}

export default GerenciarAlunos