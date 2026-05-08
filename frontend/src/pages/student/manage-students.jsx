import StudentFormModal from "../../components/student/student-form-modal";
import DataTable from "../../components/.common/data-table";
import AppHeader from "../../components/.common/app-header";
import api from "../../services/api";
import renderProfileLink from "../../components/.common/render-profile-link";
import deleteActionCell from "../../components/.common/delete-cell";
import { useEffect, useState } from "react";

function ManageStudents() {
    const [students, setStudents] = useState(null);

    // carrega lista inicial para alimentar a tabela de alunos
    useEffect(() => {
        async function loadStudents() {
            const response = await api.get('/api/manage-students');
            setStudents(response.data);
        }
        loadStudents();
    }, []);

    const tableHeaders = [<i className="bi bi-gear"></i>, "NOME", "CPF", "DATA DE NASCIMENTO", "E-MAIL", "TELEFONE", 'MATRÍCULA', ''];

    // exibe spinner enquanto a api ainda nao retornou os registros
    return students ? (
        <div className="d-flex flex-column h-100">
            <AppHeader title="GERENCIAR ALUNOS" ModalComponent={() => <StudentFormModal title={'Cadastrar aluno'} />} modalId={"#student-form-modal"} />
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={students} 
            headerColumnClasses={{ 1: "width-1", 7: "width-1" }} 
            bodyColumnClasses={{ 1: 'text-center p-0', 2: "text-start", 5: "text-start", 8: "text-center p-0 width-1" }} 
            ignoredProperties={['id', 'enrollmentDate', 'enrollmentCount']} 
            startColumn={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (itemId) => 
                    renderProfileLink('/manage-students/', itemId, 'bi bi-person-square')
            }}
            endColumn={{
                delete: true, 
                deleteCell: (itemId) => 
                    deleteActionCell('/api/manage-students/', itemId)
            }}/>
        </div>
    ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">carregando...</span>
            </div>
        </div>
    );
}

export default ManageStudents;
