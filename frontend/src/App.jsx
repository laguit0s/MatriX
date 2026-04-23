import SidebarDesktop from "./components/SidebarDesktop"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import GerenciarAlunos from "./pages/GerenciarAlunos"
import "./styles/global.css"

function App() {
  return (
    <div className='d-flex flex-grow-1 h-100' style={{ minWidth: 0 }}>
      <BrowserRouter>
        <SidebarDesktop />
        <div className="routes-container content-wrapper">
          <Routes>
            <Route path="/gerenciar-alunos" element={<GerenciarAlunos />} />
            <Route path="/gerenciar-cursos" element={<GerenciarAlunos />} />
            <Route path="/gerenciar-turmas" element={<GerenciarAlunos />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App