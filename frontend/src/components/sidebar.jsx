function Sidebar () {
    return (
        <nav className="navbar h-100 bg-light border-end d-none d-md-block" style={{width: '250px'}}>
            <ul className="navbar-nav d-flex flex-column h-100">
                <li className="nav-item d-flex justify-content-center gap-3">
                    <a href="#" className="nav-link border-bottom text-center"><h1>MatriX</h1></a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4">Visão Geral</a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-alunos">Alunos</a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-alunos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link">Gerenciar Alunos</a></li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-cursos">Cursos</a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-cursos">
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link">Gerenciar Cursos</a></li>
                        <li className="nav-item ms-2 border-bottom"><a href="#" className="nav-link">Gerenciar Turmas</a></li>
                    </ul>
                </li>
                <li className="nav-item border-top mt-auto">
                    <a href="#" className="nav-link ms-4" data-bs-toggle="collapse" data-bs-target="#collapse-configuracoes">Configurações</a>
                    <ul className="navbar-nav collapse ms-4" id="collapse-configuracoes">
                        <li className="nav-item ms-2"><a href="#" className="nav-link">Perfil</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar;