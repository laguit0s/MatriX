import api from '../services/api';
import { IMask, IMaskInput } from 'react-imask';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { useEffect, useState, useMemo } from 'react';

const onlyDigits = (value) => (value ? String(value).replace(/\D/g, '') : '');

function StudentFormModal({ data: initialData, title }) {
    let [courses, setCourses] = useState(null);
    let [classes, setClasses] = useState(null);

    const studentSchema = z.object({
        fullName: z.string().min(1, 'O nome é obrigatório'),
        cpf: z.string().min(11, 'O CPF deve conter 11 dígitos').max(11, 'O CPF deve conter 11 dígitos'),
        birthDate: z.string().min(10, 'A data de nascimento deve conter 10 dígitos').max(10, 'A data de nascimento deve conter 8 dígitos'),
        phone: z.string().min(10, 'O telefone deve conter entre 10 e 11 dígitos').max(11, 'O telefone deve conter entre 10 e 11 dígitos'),
        email: z.string().email('E-mail inválido'),
        courseId: z.coerce.number().optional(),
        classGroupId: z.coerce.number().optional(),
    });

    const { control, watch, register, handleSubmit, setValue, formState: { errors, dirtyFields } } = useForm({ resolver: zodResolver(studentSchema), defaultValues: {
        fullName: initialData ? initialData.fullName : '',
        cpf: initialData ? onlyDigits(initialData.cpf) : '',
        birthDate: initialData ? initialData.birthDate : '',
        phone: initialData ? onlyDigits(initialData.phone) : '',
        email: initialData ? initialData.email : '',
        courseId: null,
        classGroupId: null
    }});

    useEffect(() => {
        async function loadClasses() {
            const response = await api.get('/api/manage-classes');
            setClasses(response.data);
        }
        !initialData && loadClasses();
    }, []);

    useEffect(() => {
        if (!initialData && classes?.length && !watch('classGroupId')) {
            setValue('classGroupId', String(classes[0].id));
        }
    }, [classes]);

    useEffect(() => {
        async function loadCourses() {
            const response = await api.get('/api/manage-courses');
            setCourses(response.data);
        }
        !initialData && loadCourses();
    }, []);

    useEffect(() => {
        if (!initialData && courses?.length && !watch('courseId')) {
            setValue('courseId', String(courses[0].id));
        }
    }, [courses]);

    useEffect(() => {
        if (courses && classes) {
            const validClasses = classes.filter(classGroup => classGroup.courseId == watch('courseId'));
            validClasses.length ? setValue('classGroupId', validClasses[0].id) : setValue('classGroupId', null);
            console.log('Course ID: ' + watch('courseId') + ' | Class ID: ' + watch('classGroupId'));
        }
    }, [watch('courseId')]);

    const onSubmit = async (formData) => {
        const payload = Object.fromEntries(
            Object.entries(formData).filter(([campo]) => dirtyFields[campo])
        );

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
                                {errors.fullName && (<p className='text-danger'>{errors.fullName.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-cpf">CPF:</label>
                                <Controller name="cpf" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="000.000.000-00" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.cpf && (<p className='text-danger'>{errors.cpf.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-birth-date">Data de nascimento:</label>
                                <Controller name="birthDate" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="00/00/0000" placeholder='DD/MM/AAAA' onAccept={(value) => field.onChange(value)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.birthDate && (<p className='text-danger'>{errors.birthDate.message}</p>)}
                            </div>
                            <div className="col">
                                <label htmlFor="student-phone">Telefone:</label>
                                <Controller name="phone" control={control} render={({ field }) => (
                                    <IMaskInput value={field.value} className='form-control' mask="(00) 00000-0000" onAccept={(value, mask) => field.onChange(mask.unmaskedValue)}></IMaskInput>
                                )}>
                                </Controller>
                                {errors.phone && (<p className='text-danger'>{errors.phone.message}</p>)}
                            </div>
                            <div className="col-12">
                                <label htmlFor="student-email">E-mail:</label>
                                <Controller name="email" control={control} render={({ field }) => (
                                    <input {...field} className='form-control'></input>
                                )}>
                                </Controller>
                                {errors.email && (<p className='text-danger'>{errors.email.message}</p>)}
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
                                                (
                                                    <option value="">SEM CURSOS CADASTRADOS</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label>Turma:</label>
                                        <select className='form-select' {...register('classGroupId')} disabled={!watch('classGroupId') ? true : false}>
                                            {
                                                classes &&
                                                classes.filter(classGroup => classGroup.courseId == Number(watch('courseId')) && classGroup.status == 'ABERTA').length 
                                                ?
                                                classes.filter(classGroup => classGroup.courseId == Number(watch('courseId')) && classGroup.status == 'ABERTA').map((classGroup, i) => (
                                                    <option key={i} value={classGroup.id}>{classGroup.name}</option>
                                                ))
                                                :
                                                (
                                                    <option disabled value="">SEM TURMAS ABERTAS PARA O CURSO</option>
                                                )

                                            }
                                        </select>
                                        {errors.classGroupId && (<p className='text-danger'>{errors.classGroupId.message}</p>)}
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
