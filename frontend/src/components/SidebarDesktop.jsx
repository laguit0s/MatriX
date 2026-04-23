import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function SidebarDesktop() {
    const [isExpanded, setIsExpanded] = useState(true)
    const [showText, setShowText] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Constants
    const MAX_WIDTH = 250
    const MIN_WIDTH = 60
    const COLLAPSE_IDS = ["collapse-alunos", "collapse-cursos", "collapse-configuracoes"]
    const mobileWidth = "min(85vw, 320px)"

    // Styles
    const navbarStyles = {
        mobileNavbar: {
            zIndex: 1060
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            zIndex: 1050,
            marginTop: '60px'
        },
        sidebar: isMobile ? {
            position: 'fixed',
            top: '60px',
            left: 0,
            width: mobileWidth,
            minWidth: mobileWidth,
            // Altura dinâmica (dvh) para não ficar atrás da barra do navegador no mobile
            height: 'calc(100dvh - 60px)',
            transform: isMobileOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s ease',
            zIndex: 1051,
        } : {
            position: 'relative',
            width: isExpanded ? `${MAX_WIDTH}px` : `${MIN_WIDTH}px`,
            minWidth: isExpanded ? `${MAX_WIDTH}px` : `${MIN_WIDTH}px`,
            transition: 'all 0.3s ease'
        }
    }

    // CSS Classes
    const baseNavItemClass = "nav-item w-100"
    const collapsedNavItemClass = `${baseNavItemClass} d-flex justify-content-center`
    const expandedNavItemClass = isExpanded ? baseNavItemClass : collapsedNavItemClass
    
    const baseNavLinkClass = "nav-link w-auto"
    const expandedNavLinkClass = `${baseNavLinkClass} ms-4`
    const collapsedNavLinkClass = `${baseNavLinkClass} text-center`
    const navLinkClass = isExpanded ? expandedNavLinkClass : collapsedNavLinkClass

    // Handlers
    const closeAllSubmenus = () => {
        COLLAPSE_IDS.forEach((id) => {
            const submenu = document.getElementById(id)
            if (submenu) {
                submenu.classList.remove("show")
            }

            const trigger = document.querySelector(`[data-bs-target="#${id}"]`)
            if (trigger) {
                trigger.setAttribute("aria-expanded", "false")
            }
        })
    }

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(prev => !prev)
            return
        }

        if (isExpanded) {
            closeAllSubmenus()
            setIsExpanded(false)
            setShowText(false)
            return
        }
        setIsExpanded(true)
    }

    const handleTransition = event => {
        if (event.propertyName !== "width") return

        const currentWidth = event.currentTarget.getBoundingClientRect().width
        setShowText(currentWidth >= MAX_WIDTH)
    }

    const onClickCollapse = () => {
        if (!isExpanded) {
            setIsExpanded(true)
            setShowText(false)
        }
    }

    // Media Query
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767.98px)")

        const handleMediaChange = event => {
            setIsMobile(event.matches)

            if (event.matches) {
                setIsExpanded(true)
                setShowText(true)
                setIsMobileOpen(false)
            } else {
                setIsMobileOpen(false)
                setIsExpanded(true)
                setShowText(true)
            }
        }

        handleMediaChange(mediaQuery)

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener("change", handleMediaChange)
            return () => mediaQuery.removeEventListener("change", handleMediaChange)
        }

        mediaQuery.addListener(handleMediaChange)
        return () => mediaQuery.removeListener(handleMediaChange)
    }, [])

    // Render
    const sidebarOpen = isMobile ? isMobileOpen : true
    const arrowIcon = isExpanded ? "bi-arrow-left" : "bi-arrow-right"
    const iconVisibility = showText ? "d-inline" : "d-none"

    return (
        <>
            {/* Mobile Navbar */}
            {isMobile && (
                <nav
                    className="navbar navbar-light bg-light border-bottom d-md-none position-fixed top-0 start-0 w-100"
                    style={navbarStyles.mobileNavbar}
                >
                    <div className="container-fluid d-flex align-items-center justify-content-between">
                        <button
                            className="btn btn-light border"
                            onClick={toggleSidebar}
                            aria-label="Abrir menu lateral"
                        >
                            <i className="bi bi-list fs-5"></i>
                        </button>
                    </div>
                </nav>
            )}

            {/* Mobile Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-md-none"
                    style={navbarStyles.overlay}
                    onClick={toggleSidebar}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <nav
                // Removemos o 'h-100' no mobile para o Bootstrap não sobrescrever nossa altura calc(100dvh)
                className={`navbar flex-shrink-0 ${!isMobile ? 'h-100' : ''} bg-light border-end d-md-block p-0 flex-column`}
                style={navbarStyles.sidebar}
                onTransitionEnd={handleTransition}
            >
                {/* Removemos o 'h-100' da ul. O 'flex-grow-1' já cuida de preencher o espaço. */}
                <ul className="navbar-nav d-flex flex-column w-100 h-100">
                    {/* Logo */}
                    <li className={isExpanded ? baseNavItemClass : `${baseNavItemClass} d-flex flex-column align-items-center`}>
                        <button
                            className="btn w-100 py-0 d-none d-md-block"
                            onClick={toggleSidebar}
                        >
                            <i className={`bi ${arrowIcon} fs-2`}></i>
                        </button>
                        <a
                            href="#"
                            className={isExpanded
                                ? "nav-link ps-4 border-top border-bottom w-100 d-flex align-items-center py-2"
                                : "nav-link border-top border-bottom text-center w-100 d-flex align-items-center justify-content-center"
                            }
                        >
                            <i className={isExpanded
                                ? "bi bi-columns-gap me-2 h1 my-0"
                                : "bi bi-columns-gap h1 my-0"
                            }></i>
                            <span className={`${iconVisibility} h1 my-0`}>MatriX</span>
                        </a>
                    </li>

                    {/* Visão Geral */}
                    <li className={expandedNavItemClass}>
                        <a href="#" className={navLinkClass}>
                            <i className={isExpanded
                                ? "bi bi-bar-chart-line-fill me-2"
                                : "bi bi-bar-chart-line-fill"
                            }></i>
                            <span className={iconVisibility}>Visão Geral</span>
                        </a>
                    </li>

                    {/* Alunos */}
                    <li className={expandedNavItemClass}>
                        <a
                            href="#"
                            className={navLinkClass}
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-alunos"
                            onClick={onClickCollapse}
                        >
                            <i className={isExpanded
                                ? "bi bi-file-person-fill me-2"
                                : "bi bi-file-person-fill"
                            }></i>
                            <span className={iconVisibility}>Alunos</span>
                        </a>
                        <ul className="navbar-nav collapse w-100 ps-4" id="collapse-alunos">
                            <li className="nav-item border-bottom w-100">
                                <Link to="/gerenciar-alunos" className="nav-link w-100">
                                    <i className={`bi bi-justify ${showText ? "me-2" : ""}`}></i>
                                    <span className={iconVisibility}>Gerenciar Alunos</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Cursos */}
                    <li className={expandedNavItemClass}>
                        <a
                            href="#"
                            className={navLinkClass}
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-cursos"
                            onClick={onClickCollapse}
                        >
                            <i className={isExpanded
                                ? "bi bi-book-fill me-2"
                                : "bi bi-book-fill"
                            }></i>
                            <span className={iconVisibility}>Cursos</span>
                        </a>
                        <ul className="navbar-nav collapse w-100 ps-4" id="collapse-cursos">
                            <li className="nav-item border-bottom w-100">
                                <Link to="/gerenciar-cursos" className="nav-link w-100">
                                    <i className={`bi bi-justify ${showText ? "me-2" : ""}`}></i>
                                    <span className={iconVisibility}>Gerenciar Cursos</span>
                                </Link>
                            </li>
                            <li className="nav-item border-bottom w-100">
                                <Link to="/gerenciar-turmas" className="nav-link w-100">
                                    <i className={`bi bi-justify ${showText ? "me-2" : ""}`}></i>
                                    <span className={iconVisibility}>Gerenciar Turmas</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {/* Configurações: mt-auto mantido para colar no rodapé */}
                    <li className={`${expandedNavItemClass} mt-auto border-top`}>
                        <a
                            href="#"
                            className={navLinkClass}
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-configuracoes"
                            onClick={onClickCollapse}
                        >
                            <i className={isExpanded
                                ? "bi bi-gear me-2"
                                : "bi bi-gear"
                            }></i>
                            <span className={iconVisibility}>Configurações</span>
                        </a>
                        <ul className="navbar-nav collapse w-100 ps-4" id="collapse-configuracoes">
                            <li className="nav-item w-100">
                                <a href="#" className="nav-link w-100">
                                    <i className={`bi bi-justify ${showText ? "me-2" : ""}`}></i>
                                    <span className={iconVisibility}>Perfil</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default SidebarDesktop