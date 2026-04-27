function CadastroAluno() {
    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-aluno" style={{zIndex: "5000"}}>
            <div className="modal-dialog w-100 modal-xl modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="fs-5">Cadastrar Aluno</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
    )
}

export default CadastroAluno;