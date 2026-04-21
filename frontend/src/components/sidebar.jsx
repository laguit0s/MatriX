import { useState } from "react";

function Sidebar () {
    let [isExpanded, setIsExpanded] = useState(true);
    let [showText, setShowText] = useState(true);

    const MAX_WIDTH = 250;
    const MIN_WIDTH = 80;
    const COLLAPSE_IDS = ["collapse-alunos", "collapse-cursos", "collapse-configuracoes"];

    const closeAllSubmenus = () => {
        COLLAPSE_IDS.forEach((id) => {
            const submenu = document.getElementById(id);

            if (submenu) {
                submenu.classList.remove("show");
            }

            const trigger = document.querySelector(`[data-bs-target="#${id}"]`);
            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }
        });
    }

    const toggleSidebar = () => {
        if (isExpanded) {
            closeAllSubmenus();
            setIsExpanded(false);
            setShowText(false);
            return;
        }
        setIsExpanded(true);        
    }

    const handleTransition = event => {
        if (event.propertyName !== "width") return;

        let currentWidth = event.currentTarget.getBoundingClientRect().width;

        if (currentWidth >= MAX_WIDTH) {
            setShowText(true);
        } else {
            setShowText(false);
        }
    }

    const onClickCollapse = () => {
        if (!isExpanded) {
            setIsExpanded(true);
            setShowText(false);
        } 
    }

    return (
        <nav className="navbar h-100 bg-light border-end d-none d-md-block p-0" style={{width: isExpanded ? `${MAX_WIDTH}px` : `${MIN_WIDTH}px`, transition: 'all 0.3s ease'}} onTransitionEnd={handleTransition}>
            <ul className="navbar-nav d-flex flex-column h-100">
                <li className={isExpanded ? "nav-item" : "nav-item d-flex flex-column align-items-center"}>
                    <button className="btn w-100 py-0" onClick={toggleSidebar}><i className={(isExpanded ? "bi bi-arrow-left" : "bi bi-arrow-right") + " fs-2"}></i></button>
                    <a href="#" className={isExpanded ? "nav-link ps-4 border-top border-bottom" : "nav-link border-top border-bottom text-center"}><i className={isExpanded ? "bi bi-columns-gap me-2 h1" : "bi bi-columns-gap h1"}></i><span className={(showText ? "d-inline" : "d-none") + " h1"}>MatriX</span></a>
                </li>
                <li className={isExpanded ? "nav-item" : "nav-item d-flex justify-content-center"}>
                    <a href="#" className={isExpanded ? "nav-link ms-4" : "nav-link"}><i className={isExpanded ? "bi bi-bar-chart-line-fill me-2" : "bi bi-bar-chart-line-fill"}></i><span className={showText ? "d-inline" : "d-none"}>Visão Geral</span></a>
                </li>
                <li className={isExpanded ? "nav-item" : "nav-item d-flex justify-content-center"}>
                    <a href="#" className={isExpanded ? "nav-link ms-4" : "nav-link"} data-bs-toggle="collapse" data-bs-target="#collapse-alunos" onClick={onClickCollapse}><i className={isExpanded ? "bi bi-file-person-fill me-2" : "bi bi-file-person-fill"}></i><span className={showText ? "d-inline" : "d-none"}>Alunos</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-alunos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className={showText ? "bi bi-justify me-2" : "bi bi-justify"}></i><span className={showText ? "d-inline" : "d-none"}>Gerenciar Alunos</span></a></li>
                    </ul>
                </li>
                <li className={isExpanded ? "nav-item" : "nav-item d-flex justify-content-center"}>
                    <a href="#" className={isExpanded ? "nav-link ms-4" : "nav-link"} data-bs-toggle="collapse" data-bs-target="#collapse-cursos" onClick={onClickCollapse}><i className={isExpanded ? "bi bi-book-fill me-2" : "bi bi-book-fill"}></i><span className={showText ? "d-inline" : "d-none"}>Cursos</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-cursos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className={showText ? "bi bi-justify me-2" : "bi bi-justify"}></i><span className={showText ? "d-inline" : "d-none"}>Gerenciar Cursos</span></a></li>
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link"><i className={showText ? "bi bi-justify me-2" : "bi bi-justify"}></i><span className={showText ? "d-inline" : "d-none"}>Gerenciar Turmas</span></a></li>
                    </ul>
                </li>
                <li className={(isExpanded ? "nav-item" : "nav-item d-flex justify-content-center") + " border-top mt-auto"}>
                    <a href="#" className={isExpanded ? "nav-link ms-4" : "nav-link"} data-bs-toggle="collapse" data-bs-target="#collapse-configuracoes" onClick={onClickCollapse}><i className={isExpanded ? "bi bi-gear me-2" : "bi bi-gear"}></i><span className={showText ? "d-inline" : "d-none"}>Configurações</span></a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-configuracoes">
                        <li className="nav-item ms-2"><a href="#" className="nav-link"><i className={showText ? "bi bi-justify me-2" : "bi bi-justify"}></i><span className={showText ? "d-inline" : "d-none"}>Perfil</span></a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;