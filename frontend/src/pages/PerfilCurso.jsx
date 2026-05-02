import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';
import CadastroCurso from '../components/CadastroCurso';

// estrutura a tela visual do registro do perfil 
function PerfilCurso() {
    const ppColor = '#006eff'

    const { id } = useParams();
    let [dados, setDados] = useState(null);

    // requisita no servidor a exibicao com formatacao visual do aluno
    useEffect(() => {
        async function carregarDados() {
            try {
                const req = await api.get(`/api/gerenciar-cursos/${id}`);
                setDados(req.data);
            } catch(e) {
                console.error(e);
            }
        }
        carregarDados();
    }, [id])

    // aguarda termino da busca antes exibir blocos formatados em display
    return dados ? (
        
        <div className="d-flex flex-column h-100 w-100">
            <CadastroCurso dados={dados} title={'Editar dados'}/>
            <div className="d-flex flex-column align-items-start p-4 gap-3">
                <Link to="/gerenciar-cursos" className='app-header__eyebrow'>
                    <i className="bi bi-house-fill"></i>
                    <span>Voltar</span>
                </Link>
                <h1 className="app-header__title">DETALHES DO CURSO</h1>
            </div>
            <div className="card shadow-sm border-0 w-100 placeholder-glow">
                <div className="card-body p-4">
                    <div className="d-flex align-items-start justify-content-between mb-4 gap-4">
                        <div className="d-flex align-items-center gap-4">
                            <h3 className="mb-1">{dados.nome}</h3>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <div className="row g-3">
                        <button className="btn btn-outline-primary col" type="button" data-bs-toggle="modal" data-bs-target="#cadastro-curso">
                            <i className="bi bi-pencil-fill me-2"></i>Editar
                        </button>
                        <div className="col-12">
                            <label className="text-muted small text-uppercase">código</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.cod}</p>
                        </div>
                        <div className="col-12">
                            <label className="text-muted small text-uppercase">valor</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.valor}</p>
                        </div>
                        <div className="col-12">
                            <label className="text-muted small text-uppercase">cobrança</label>
                            <p className="fs-6 fw-bold mb-0 text-break">{dados.cobranca}</p>
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
export default PerfilCurso;