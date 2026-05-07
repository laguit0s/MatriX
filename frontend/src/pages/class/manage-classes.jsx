import DataTable from "../../components/.common/data-table";
import ClassFormModal from "../../components/class/class-form-modal";
import AppHeader from "../../components/.common/app-header";
import api from "../../services/api";
import renderProfileLink from "../../components/.common/render-profile-link";
import deleteActionCell from "../../components/.common/delete-cell";
import { useEffect, useState } from "react";

function ManageClasses() {
    const [classes, setClasses] = useState(null);

    useEffect(() => {
        async function loadClasses() {
            const response = await api.get('/api/manage-classes');
            setClasses(response.data);
        }
        loadClasses();
    }, []);

    const tableHeaders = [<i className="bi bi-gear"></i>, "NOME", "CURSO", "ANO", "ALUNOS", 'VAGAS', 'STATUS', ''];

    return classes ? (
        <div className="d-flex flex-column h-100">
            <AppHeader title="GERENCIAR TURMAS" ModalComponent={() => <ClassFormModal title={'Cadastrar turma'} />} modalId={'#class-form-modal'} />
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={classes} 
            headerColumnClasses={{ 1: "width-1", 6: "width-1" }} 
            bodyColumnClasses={{ 1: 'text-center p-0', 3: "text-start", 8: "text-center p-0 width-1" }} 
            ignoredProperties={['id', 'maxSeats', 'number', 'courseId']} 
            columnOrder={{
                2: "name",
                3: "courseName",
                4: "year",
                5: "studentCount",
                6: "availableSeats",
                7: "status"
            }}
            startColumn={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (itemId) => 
                    renderProfileLink('/manage-classes/', itemId, 'bi bi-mortarboard-fill')
            }}
            endColumn={{
                delete: true, 
                deleteCell: (itemId) => 
                    deleteActionCell('/api/manage-classes/', itemId)
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

export default ManageClasses;
