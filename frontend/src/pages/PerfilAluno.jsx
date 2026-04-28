import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from '../services/api';

function PerfilAluno() {
    const { id } = useParams();
    let [dados, setDados] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            const req = await api.get(`/api/gerenciar-alunos/${id}`);
            setDados(req.data);
        }
        carregarDados();
    }, [id])

    return dados ? (
        <div>
            <h1>{dados.nome}</h1>
            <p>{dados.cpf}</p>
            <p>{dados.data_nascimento}</p>
            <p>{dados.email}</p>
            <p>{dados.telefone}</p>
        </div> 
    ) : <div>Carregando...</div>
}

export default PerfilAluno;