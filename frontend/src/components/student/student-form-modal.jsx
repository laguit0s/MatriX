import api from '../../services/api';
import { IMaskInput } from 'react-imask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';

function StudentFormModal({ data: initialData, title }) {
    let [courses, setCourses] = useState(null);
    let [classes, setClasses] = useState(null);

    const onlyDigits = (val) => val.replace(/\D/g, '');

    // valida dados pessoais e ids de curso/turma quando houver matricula inicial
    const studentSchema = useMemo(() => z.object({
        fullName: 
            z.string()
            .trim()
            .min(1, 'O nome é obrigatório')
            .max(300, 'Nome muito grande')
            .regex(/^[a-zA-Z0-9\s\-áéíóúàâãõç]+$/, "Contém caracteres inválidos"),
        cpf: 
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
              z.string()
                .length(11, 'O CPF deve conter 11 dígitos')
            ),
        birthDate: 
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .refine((val) => /^\d{8}$/.test(val), {
                message: 'Data inválida'
            })
            .refine((val) => {
                const day = Number(val.slice(0, 2));
                const month = Number(val.slice(2, 4));
                const year = Number(val.slice(4, 8));

                const date = new Date(year, month - 1, day);

                return (
                    date.getFullYear() === year &&
                    date.getMonth() === month - 1 &&
                    date.getDate() === day
                );
            }, {
                message: 'Data inválida'
            })
            .transform((val) => {
                const day = Number(val.slice(0, 2));
                const month = Number(val.slice(2, 4));
                const year = Number(val.slice(4, 8));

                return new Date(year, month - 1, day);
            })
            .pipe(
                z.date().max(new Date(), 'Data inválida')
            ),
        phone: 
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
                z.string()
                    .length(11, 'O telefone deve conter 11 dígitos')
            ),
        email: 
            z.string()
            .trim()
            .toLowerCase()
            .email('E-mail inválido'),
        courseId: 
            z.coerce.number()
            .int()
            .positive()
            .refine((val) => courses.map(c => c.id).includes(val), { message: "Valor inválido" })
            .nullish(),
        classGroupId: 
            z.coerce.number()
            .int()
            .positive()
            .refine((val) => classes.map(c => c.id).includes(val), { message: "Valor inválido" })
            .nullish(),
    }), [courses, classes]);

    const { 
        control, 
        watch, 
        register, 
        handleSubmit, 
        setValue, 
        formState: { errors, dirtyFields } } 
        = useForm({ 
            resolver: zodResolver(studentSchema), 
            defaultValues: {
                fullName: initialData ? initialData.fullName : '',
                cpf: initialData ? onlyDigits(initialData.cpf) : '',
                birthDate: initialData ? initialData.birthDate : '',
                phone: initialData ? onlyDigits(initialData.phone) : '',
                email: initialData ? initialData.email : '',
                courseId: null,
                classGroupId: null
    }});

    const hasOpenClasses = classes && classes.filter(classGroup => (watch('courseId') == classGroup.courseId) && classGroup.status == "ABERTA").length > 0;

    // no cadastro, carrega turmas para permitir matricula imediata
    useEffect(() => {
        async function loadClasses() {
            const response = await api.get('/api/manage-classes');
            setClasses(response.data);
        }
        !initialData && loadClasses();
    }, []);

    // define a primeira turma disponivel para evitar select sem valor inicial
    useEffect(() => {
        if (!initialData && classes?.length && !watch('classGroupId')) {
            const selectedCourseId = watch('courseId');
            const candidate = classes.find(cg =>
                cg.status === 'ABERTA' &&
                (selectedCourseId ? cg.courseId == Number(selectedCourseId) : true)
            );
            setValue('classGroupId', candidate ? String(candidate.id) : null);
        }
    }, [classes, watch('courseId')]);

    // carrega cursos apenas no fluxo de cadastro
    useEffect(() => {
        async function loadCourses() {
            const response = await api.get('/api/manage-courses');
            response.data.length && setCourses(response.data);
        }
        !initialData && loadCourses();
    }, []);

    // define curso inicial quando houver opcoes retornadas pela api
    useEffect(() => {
        if (!initialData && courses?.length && !watch('courseId')) {
            setValue('courseId', String(courses[0].id));
        }
    }, [courses]);

    // atualiza turma selecionada para manter curso e turma consistentes
    useEffect(() => {
        if (courses && classes) {
            const validClasses = classes.filter(classGroup => classGroup.courseId == watch('courseId'));
            validClasses.length ? setValue('classGroupId', validClasses[0].id) : setValue('classGroupId', null);
            console.log('Course ID: ' + watch('courseId') + ' | Class ID: ' + watch('classGroupId'));
        }
        console.log(watch('courseId'))
    }, [watch('courseId')]);

    const onSubmit = async (formData) => {
        // no update, envia apenas campos alterados para evitar sobrescrita desnecessaria
        const payload = initialData ? Object.fromEntries(
            Object.entries(formData).filter(([campo]) => dirtyFields[campo])
        ) : formData;

        if (initialData) {
            if (Object.keys(payload).length === 0) return;
            await api.patch(`/api/manage-students/${initialData.id}`, payload);
        } else {
            await api.post('/api/manage-students', formData);
        }

        window.location.reload();
    };

    const onError = (errors) => {
        console.log("Erro no envio do formulário:", errors);
    };

    return (
        <div className="modal fade p-0" tabIndex="-1" id="student-form-modal" data-bs-backdrop="static" data-bs-keyboard="false" style={{zIndex: "5000"}}>
            <div className="modal-dialog modal-dialog-centered w-100 modal-lg modal-fullscreen-md-down">
                <div className="modal-content">
                    <div className="modal-header justify-content-center">
                        <h1 className="modal-title text-center m-0 fs-4">{title}</h1>
                    </div>
                    <form className="modal-body" onSubmit={handleSubmit(onSubmit, onError)}>
                        <div className="row row-cols-2 gx-2 gy-4">
                            <div className="col">
                                <label htmlFor="student-full-name">Nome completo:</label>
                                <Controller name="fullName" control={control} render={({ field }) => (
                                    <input {...field} className='form-control'></input>
                                )}>
                                </Controller>
                                {errors.fullName && (<span className='text-danger'>{errors.fullName.message}</span>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-cpf">CPF:</label>
                                <Controller name="cpf" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="000.000.000-00" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.cpf && (<span className='text-danger'>{errors.cpf.message}</span>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-birth-date">Data de nascimento:</label>
                                <Controller name="birthDate" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="00/00/0000" placeholder='DD/MM/AAAA' onAccept={(value) => field.onChange(value)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.birthDate && (<span className='text-danger'>{errors.birthDate.message}</span>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-phone">Telefone:</label>
                                <Controller name="phone" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="(00) 00000-0000" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.phone && (<span className='text-danger'>{errors.phone.message}</span>)}
                            </div>
                            <div className="col-12">
                                <label htmlFor="student-email">E-mail:</label>
                                <Controller name="email" control={control} render={({ field }) => (
                                    <input {...field} className='form-control'></input>
                                )}>
                                </Controller>
                                {errors.email && (<span className='text-danger'>{errors.email.message}</span>)}
                            </div>
                            {!initialData && (
                                <>
                                    <div className="col">
                                        <label>Curso:</label>
                                        <select className='form-select' {...register('courseId')} disabled={watch('courseId') ? false : true}>
                                            {
                                                courses
                                                ? 
                                                courses.map((course, i) => (
                                                    <option key={i} value={course.id}>{course.name}</option>
                                                ))
                                                :
                                                (<option value="">SEM CURSOS CADASTRADOS</option>)
                                            }
                                        </select>
                                        {errors.courseId && (<span className='text-danger'>{errors.courseId.message}</span>)}
                                    </div>
                                    <div className="col">
                                        <label>Turma:</label>
                                        <select className='form-select' {...register('classGroupId')} disabled={!watch('courseId') || !hasOpenClasses ? true : false}>
                                            {
                                                classes 
                                                &&
                                                classes.filter(classGroup => classGroup.courseId == Number(watch('courseId')) && classGroup.status == 'ABERTA').length 
                                                ?
                                                classes.filter(classGroup => classGroup.courseId == Number(watch('courseId')) && classGroup.status == 'ABERTA').map((classGroup, i) => (
                                                    <option key={i} value={classGroup.id}>{classGroup.name}</option>
                                                ))
                                                :
                                                (<option disabled value="">SEM TURMAS ABERTAS PARA O CURSO</option>)
                                            }
                                        </select>
                                        {errors.classGroupId && (<span className='text-danger'>{errors.classGroupId.message}</span>)}
                                    </div>
                                </>
                            )}
                            <div className="col-12 d-flex gap-3">
                                <button type="submit" className="btn btn-success w-100">Finalizar</button>
                                <button type="button" className="btn btn-secondary w-100" data-bs-dismiss="modal">Sair</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StudentFormModal;