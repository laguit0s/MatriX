import CourseFormModal from "../../components/course/course-form-modal";
import DataTable from "../../components/.common/data-table";
import AppHeader from "../../components/.common/app-header";
import api from "../../services/api";
import renderProfileLink from "../../components/.common/render-profile-link";
import deleteActionCell from "../../components/.common/delete-cell";
import { useEffect, useState } from "react";

function ManageCourses() {
    const [courses, setCourses] = useState(null);

    useEffect(() => {
        async function loadCourses() {
            const response = await api.get('/api/manage-courses');
            setCourses(response.data);
        }
        loadCourses();
    }, []);

    const tableHeaders = [<i className="bi bi-gear"></i>, "NOME", "CÓDIGO", "VALOR", "COBRANÇA", ''];

    return courses ? (
        <div className="d-flex flex-column h-100">
            <AppHeader title="GERENCIAR CURSOS" ModalComponent={() => <CourseFormModal title={'Cadastrar curso'} />} modalId={"#course-form-modal"} />
            <DataTable 
            headerContent={tableHeaders} 
            bodyContent={courses} 
            headerColumnClasses={{ 1: "width-1", 6: "width-1" }} 
            bodyColumnClasses={{ 1: 'text-center p-0', 2: "text-start", 6: "text-center p-0" }} 
            ignoredProperties={['id']} 
            startColumn={{
                value: 'Profile', 
                profileLink: true,
                renderProfile: (itemId) => 
                    renderProfileLink('/manage-courses/', itemId, 'bi bi-mortarboard-fill')
            }}
            endColumn={{
                delete: true, 
                deleteCell: (itemId) => 
                    deleteActionCell('/api/manage-courses/', itemId)
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

export default ManageCourses;
