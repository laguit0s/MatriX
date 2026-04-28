import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

// estrutura a tela visual do registro do perfil 
function PerfilAluno() {
    const { id } = useParams();
    let [dados, setDados] = useState(null);

    // requisita no servidor a exibicao com formatacao visual do aluno
    useEffect(() => {
        async function carregarDados() {
            try {
                const req = await api.get(`/api/gerenciar-alunos/${id}`);
                setDados(req.data);
            } catch(e) {
                console.error(e);
            }
        }
        carregarDados();
    }, [id])

    // aguarda termino da busca antes exibir blocos formatados em display
    return dados ? (
        <div className="d-flex flex-column h-100 p-4 w-100">
            <div className="d-flex align-items-center mb-4 gap-3">
                <Link to="/gerenciar-alunos" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left"></i>
                </Link>
                <h2 className="m-0 fs-3">perfil do aluno</h2>
            </div>
            
            <div className="card shadow-sm border-0 w-100 placeholder-glow">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-4 gap-4">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                            <h3 className="mb-1">{dados.nome}</h3>
                            <p className="text-muted mb-0">matricula em: {dados.data_matricula || 'não informada'}</p>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <div className="row g-4 mt-2">
                        <div className="col-12 col-md-6 col-lg-3">
                            <label className="text-muted small text-uppercase">cpf</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.cpf}</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <label className="text-muted small text-uppercase">data de nascimento</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.data_nascimento}</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <label className="text-muted small text-uppercase">e-mail</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.email}</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-3">
                            <label className="text-muted small text-uppercase">telefone</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.telefone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    ) : (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">carregando...</span>
            </div>
        </div>
    )
}

// exporta interface montada
export default PerfilAluno;