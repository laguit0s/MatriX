import SidebarDesktop from "./components/SidebarDesktop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GerenciarAlunos from "./pages/GerenciarAlunos";
import GerenciarCursos from "./pages/GerenciarCursos";
import GerenciarTurmas from "./pages/GerenciarTurmas";

import "./styles/global.css";

function App() {
  return (
    // Estrutura principal: sidebar fixa + área de conteúdo das páginas.
    <div className="d-flex flex-grow-1 h-100" style={{ minWidth: 0 }}>
      <BrowserRouter>
        <SidebarDesktop />
        <div className="routes-container content-wrapper">
          <Routes>
            {/* Rotas de módulos administrativos */}
            <Route path="/gerenciar-alunos" element={<GerenciarAlunos />} />
            <Route path="/gerenciar-cursos" element={<GerenciarCursos />} />
            <Route path="/gerenciar-turmas" element={<GerenciarTurmas />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;