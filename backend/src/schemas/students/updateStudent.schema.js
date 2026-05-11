const { z } = require('zod');

const updateStudentSchema = z.object({
    body: z.object({
        fullName: 
            z.string()
            .trim()
            .min(1)
            .max(300)
            .regex(/^[a-zA-Z0-9\s\-áéíóúàâãõç]+$/)
            .optional(),
        cpf:
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
              z.string()
                .length(11)
            )
            .optional(),
        birthDate: 
            z.coerce.date()
            .max(new Date())
            .optional(),
        phone: 
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
                z.string()
                    .length(11)
            )
            .optional(),
        email: 
            z.string()
            .trim()
            .toLowerCase()
            .email()
            .optional(),
        courseId: 
            z.coerce.number()
            .int()
            .positive()
            .optional(),
        classGroupId: 
            z.coerce.number()
            .int()
            .positive()
            .optional(),
    }).refine((data) => {
        if (data.courseId && !data.classGroupId || !data.courseId && data.classGroupId) {
            return false;
        }
        return true;
    }),
    params: z.object({
        id: z.coerce.number()
    }),
    query: z.object({}),
})

module.exports = updateStudentSchema;