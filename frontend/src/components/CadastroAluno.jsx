import { useState } from 'react';
import api from '../services/api';

// modal de cadastro de novo aluno
function CadastroAluno({dados, title}) {
    // estado inicial do formulario
    const [form, setForm] = useState({
        nome: dados ? dados.nome : '',
        cpf: dados ? dados.cpf : '',
        data_nascimento: dados? dados.data_nascimento : '',
        telefone: dados ? dados.telefone : '',
        email: dados ? dados.email : ''
    });

    // atualiza o estado com os dados digitados
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    // envia os dados do aluno para a api
    const handleSubmit = async (e) => {
        e.preventDefault(); // previne comportamento do form
        await api.post('/api/gerenciar-alunos', form);
        window.location.reload(); // recarrega a pagina para atualizar a tabela
    }

    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-aluno" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">{title}</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col">
                                <label htmlFor="nome-aluno">Nome completo:</label>
                                <input value={dados && dados.nome} type="text" name="nome" id="nome-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label htmlFor="cpf-aluno">CPF:</label>
                                <input value={dados && dados.cpf} type="text" name="cpf" id="cpf-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label htmlFor="data-nascimento-aluno">Data de nascimento:</label>
                                <input value={dados && dados.data_nascimento} type="date" name="data_nascimento" id="data-nascimento-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col">
                                <label htmlFor="telefone-aluno">Telefone:</label>
                                <input value={dados && dados.telefone} type="text" name="telefone" id="telefone-aluno" className="form-control" onChange={handleChange}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="email-aluno">E-mail:</label>
                                <input value={dados && dados.email} type="email" name="email" id="email-aluno" className="form-control" onChange={handleChange}/>
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