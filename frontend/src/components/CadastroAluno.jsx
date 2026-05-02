import api from '../services/api';
import { IMask, IMaskInput } from 'react-imask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

const onlyDigits = (value) => (value ? String(value).replace(/\D/g, '') : '');

// modal de cadastro de novo aluno
function CadastroAluno({dados, title}) {
    const alunoSchema = z.object({
        nome: z.string().min(1, 'O nome é obrigatório'),
        cpf: z.string().min(11, 'O CPF deve conter 11 dígitos').max(11, 'O CPF deve conter 11 dígitos'),
        data_nascimento: z.string().min(10, 'A data de nascimento deve conter 10 dígitos').max(10, 'A data de nascimento deve conter 8 dígitos'),
        telefone: z.string().min(10, 'O telefone deve conter entre 10 e 11 dígitos').max(11, 'O telefone deve conter entre 10 e 11 dígitos'),
        email: z.string().email('E-mail inválido')
    })

    const { control, handleSubmit, formState: { errors, dirtyFields } } = useForm({ resolver: zodResolver(alunoSchema), defaultValues: {
        nome: dados ? dados.nome : '',
        cpf: dados ? onlyDigits(dados.cpf) : '',
        data_nascimento: dados ? dados.data_nascimento : '',
        telefone: dados ? onlyDigits(dados.telefone) : '',
        email: dados ? dados.email : ''
    }});

    // envia os dados do aluno para a api
    const onSubmit = async (data) => {
        const payload = Object.fromEntries(
            Object.entries(data).filter(([campo]) => dirtyFields[campo])
        )

        if (dados) {
            if (Object.keys(payload).length === 0) return;
            await api.patch(`/api/gerenciar-alunos/${dados.id}`, payload);
        } else {
            await api.post('/api/gerenciar-alunos', data);
        }

        window.location.reload();
    }

    const onError = (errors) => {
        console.log("Erro no envio do formulário:", errors);
    };

    return (
        <div className="modal fade p-0" tabIndex="-1" id="cadastro-aluno" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">{title}</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col">
                                <label htmlFor="nome-aluno">Nome completo:</label>
                                <Controller name="nome" control={control} render={({ field }) => (
                                    <input {...field} className='form-control'></input>
                                )}>
                                </Controller>
                                {errors.nome && (<p className='text-danger'>{errors.nome.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="cpf-aluno">CPF:</label>
                                <Controller name="cpf" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="000.000.000-00" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.cpf && (<p className='text-danger'>{errors.cpf.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="data-nascimento-aluno">Data de nascimento:</label>
                                <Controller name="data_nascimento" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="00/00/0000" placeholder='DD/MM/AAAA' onAccept={(value) => field.onChange(value)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.data_nascimento && (<p className='text-danger'>{errors.data_nascimento.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="telefone-aluno">Telefone:</label>
                                <Controller name="telefone" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="(00) 00000-0000" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.telefone && (<p className='text-danger'>{errors.telefone.message}</p>)}
                            </div>
                            <div className="col-12">
                                <label htmlFor="email-aluno">E-mail:</label>
                                <Controller name="email" control={control} render={({ field }) => (
                                    <input {...field} className='form-control'></input>
                                )}>
                                </Controller>
                                {errors.email && (<p className='text-danger'>{errors.email.message}</p>)}
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