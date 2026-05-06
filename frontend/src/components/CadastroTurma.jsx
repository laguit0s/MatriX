import api from '../services/api';
import { IMask, IMaskInput } from 'react-imask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';

// modal de cadastro de novo aluno
function CadastroTurma({dados, title}) {
    let [cursos, setCursos] = useState(null);

    const turmaSchema = z.object({
        curso: z.coerce.number(),
        vagasMax: z.coerce.number().min(1, 'A turma deve ter pelo menos um aluno.').max(1000, 'Limite de alunos excedido.'),
        status: z.string(),
    })

    const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(turmaSchema), defaultValues: {
        curso: dados ? dados.idCurso : null,
        status: dados ? dados.status : 'planejada',
    }});

    useEffect(() => {
        async function carregarCursos() {
            const dados = await api.get('/api/gerenciar-cursos');
            setCursos(dados.data);
        }
        carregarCursos();
    }, []);

    useEffect(() => {
        if (!dados && cursos && !watch('curso')) {
            setValue('curso', cursos[0].id);
        }
    }, [cursos])

    // envia os dados da turma para a api
    const onSubmit = async (data) => {
        const payload = data;

        if (dados) {
            await api.patch(`/api/gerenciar-turmas/${dados.id}`, payload);
        } else {
            console.log(payload);
            await api.post('/api/gerenciar-turmas', payload);
        }

        window.location.reload();
    }

    const onError = (errors) => {
        console.log("Erro no envio do formulário:", errors);
    };

    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-turma" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">{title}</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col form-group">
                                <label>Curso:</label>
                                <select className='form-select' {...register('curso')}>
                                    {
                                        cursos && cursos.map((curso, i) => (
                                            <option key={i} value={curso.id}>{curso.nome}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col form-group">
                                <label>Quantidade de vagas:</label>
                                <input className='form-control' type="number" {...register('vagasMax')}/>
                            </div>
                            <div className="col-12 form-group">
                                <label>Status:</label>
                                <select className='form-select' {...register('status')}>
                                    <option value="planejada">Planejada</option>
                                    <option value="aberta">Aberta</option>
                                    <option value="andamento">Em andamento</option>
                                    <option value="finalizada">Finalizada</option>
                                </select>
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

export default CadastroTurma;