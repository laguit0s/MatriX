function Header({ title }) {
    return (
        <div className="app-header px-3 px-md-4 py-3">
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <p className="app-header__eyebrow mb-1">Painel administrativo</p>
                    <h1 className="app-header__title mb-0">{title}</h1>
                </div>
            </div>
        </div>
    )
}

export default Header