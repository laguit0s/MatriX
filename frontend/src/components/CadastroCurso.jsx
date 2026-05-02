import api from '../services/api';
import { IMask, IMaskInput } from 'react-imask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const onlyDigits = (value) => (value ? String(value).replace(/\D/g, '') : '');

// modal de cadastro de novo aluno
function CadastroCurso({dados, title}) {
    const cursoSchema = z.object({
        nome: z.string().min(1, "Campo obrigatório.").max(300, "O nome não deve exceder 300 caracteres."),
        cod: z.string().min(1, "Campo obrigatório").max(30, "O código não deve exceder 30 caracteres."),
        valor: z.preprocess((value) => Number(value), z.number()),
        cobranca: z.coerce.string()
    })

    const { control, register, handleSubmit, formState: { errors, dirtyFields } } = useForm({ resolver: zodResolver(cursoSchema), defaultValues: {
        nome: dados ? dados.nome : '',
        cod: dados ? dados.cod : '',
        valor: dados ? dados.valor : '',
        cobranca: dados ? dados.cobranca : 'Mensal',
    }});

    // envia os dados do curso para a api
    const onSubmit = async (data) => {
        const payload = Object.fromEntries(
            Object.entries(data).filter(([campo]) => dirtyFields[campo])
        )

        if (dados) {
            if (Object.keys(payload).length === 0) return;
            await api.patch(`/api/gerenciar-cursos/${dados.id}`, payload);
        } else {
            await api.post('/api/gerenciar-cursos', data);
        }

        window.location.reload();
    }

    const onError = (errors) => {
        console.log("Erro no envio do formulário:", errors);
    };

    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-curso" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">{title}</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col">
                                <label>Nome:</label>
                                <input className='form-control' type="text" {...register('nome')}/>
                            </div>
                            <div className="col">
                                <label htmlFor="codigo-curso">Código:</label>
                                <input className='form-control' type="text" {...register('cod')}/>
                            </div>
                            <div className="col">
                                <label>Valor:</label>
                                <Controller
                                name="valor"
                                control={control}
                                defaultValue={0}
                                render={({ field }) => (
                                    <IMaskInput
                                    {...field}
                                    className="form-control"
                                    mask={Number}
                                    scale={2}
                                    thousandsSeparator="."
                                    radix=","
                                    mapToRadix={['.']}
                                    prefix="R$ "
                                    unmask="typed"
                                    onAccept={(value) => field.onChange(value)}
                                    />
                                )}
                                />
                            </div>
                            <div className="col">
                                <label>Cobrança:</label>
                                <select className='form-select' {...register('cobranca')}>
                                    <option value="Diária">Diária</option>
                                    <option value="Semanal">Semanal</option>
                                    <option value="Mensal">Mensal</option>
                                    <option value="Anual">Anual</option>
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

export default CadastroCurso;