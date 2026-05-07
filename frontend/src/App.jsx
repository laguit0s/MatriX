import SidebarDesktop from "./components/.common/sidebar-desktop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ManageStudents from "./pages/student/manage-students";
import ManageCourses from "./pages/course/manage-courses";
import ManageClasses from "./pages/class/manage-classes";
import StudentProfile from "./pages/student/student-profile";
import CourseProfile from "./pages/course/course-profile";
import ClassProfile from "./pages/class/class-profile";

import "./styles/global.css";

// estrutura principal da navegacao e layout
function App() {
  return (
    // layout com barra lateral e painel de conteudo
    <div className="d-flex flex-grow-1 h-100" style={{ minWidth: 0 }}>
      <BrowserRouter>
        <SidebarDesktop />
        <div className="routes-container content-wrapper">
          <Routes>
            {/* rotas base dos modulos administrativos */}
            <Route path="/manage-students" element={<ManageStudents />} />
            <Route path="/manage-students/:id" element={<StudentProfile />} />
            <Route path="/manage-courses" element={<ManageCourses />} />
            <Route path="/manage-courses/:id" element={<CourseProfile />} />
            <Route path="/manage-classes" element={<ManageClasses />} />
            <Route path="/manage-classes/:id" element={<ClassProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
