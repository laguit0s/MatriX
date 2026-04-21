import { useState } from "react";

function Sidebar () {
    let [isExpanded, setIsExpanded] = useState(true);
    const MAX_WIDTH = '250px';
    const MIN_WIDTH = '80px';

    return (
        <nav className="navbar h-100 bg-light border-end d-none d-md-block p-0" style={{width: isExpanded ? '250px' : '80px', transition: 'all 0.3s ease'}}>
            <ul className="navbar-nav d-flex flex-column h-100">
                <li className="nav-item">
                    <button className="btn w-100 py-0" onClick={() => setIsExpanded(!isExpanded)}><i className={(isExpanded ? "bi bi-arrow-left" : "bi bi-arrow-right") + " fs-2"}></i></button>
                    <a href="#" className="nav-link ps-4 border-top border-bottom"><i className="bi bi-columns-gap me-2 h1"></i><span className={(isExpanded ? "d-inline" : "d-none") + " h1"}>MatriX</span></a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4"><i className="bi bi-bar-chart-line-fill me-2"></i><span className={isExpanded ? "d-inline" : "d-none"}>Visão Geral</span></a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-alunos"><i className="bi bi-file-person-fill me-2"></i><span className={isExpanded ? "d-inline" : "d-none"}>Alunos</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-alunos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className="bi bi-justify me-2"></i>Gerenciar Alunos</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-cursos"><i className="bi bi-book-fill me-2"></i><span className={isExpanded ? "d-inline" : "d-none"}>Cursos</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-cursos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className="bi bi-justify me-2"></i>Gerenciar Cursos</a></li>
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className="bi bi-justify me-2"></i>Gerenciar Turmas</a></li>
                    </ul>
                </li>
                <li className="nav-item border-top mt-auto">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-configuracoes"><i className="bi bi-gear me-2"></i><span className={isExpanded ? "d-inline" : "d-none"}>Configurações</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-configuracoes">
                        <li className="nav-item ms-2"><a href="#" className="nav-link"><i className="bi bi-justify me-2"></i>Perfil</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;