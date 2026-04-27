import { useState } from 'react';
import api from '../services/api';

function CadastroAluno() {
    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        data_nascimento: "",
        telefone: "",
        email: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        await api.post('api/gerenciar-alunos', form);
    }

    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-aluno" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">Cadastrar Aluno</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col">
                                <label for="nome-aluno">Nome completo:</label>
                                <input type="text" name="nome" id="nome-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="cpf-aluno">CPF:</label>
                                <input type="text" name="cpf" id="cpf-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="data-nascimento-aluno">Data de nascimento:</label>
                                <input type="date" name="data_nascimento" id="data-nascimento-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label for="telefone-aluno">Telefone:</label>
                                <input type="text" name="telefone" id="telefone-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col-12">
                                <label for="email-aluno">E-mail:</label>
                                <input type="email" name="email" id="email-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col-12 d-flex gap-3">
                                <button type="submit" className="btn btn-success w-100">Finalizar</button>
                                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Sair</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroAluno;