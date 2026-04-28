import SidebarDesktop from "./components/SidebarDesktop";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GerenciarAlunos from "./pages/GerenciarAlunos";
import GerenciarCursos from "./pages/GerenciarCursos";
import GerenciarTurmas from "./pages/GerenciarTurmas";
import PerfilAluno from "./pages/PerfilAluno";

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
            <Route path="/gerenciar-alunos" element={<GerenciarAlunos />} />
            <Route path="/gerenciar-alunos/:id" element={<PerfilAluno />} />
            <Route path="/gerenciar-cursos" element={<GerenciarCursos />} />
            <Route path="/gerenciar-turmas" element={<GerenciarTurmas />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;