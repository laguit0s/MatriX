const { z } = require('zod');

const createStudentSchema = z.object({
    body: z.object({
        fullName: 
            z.string()
            .trim()
            .min(1)
            .max(300)
            .regex(/^[a-zA-Z0-9\s\-áéíóúàâãõç]+$/),
        cpf:
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
              z.string()
                .length(11)
            ),
        birthDate: 
            z.coerce.date()
            .max(new Date()),
        phone: 
            z.string()
            .transform((val) => val.replace(/\D/g, ''))
            .pipe(
                z.string()
                    .length(11)
            ),
        email: 
            z.string()
            .trim()
            .toLowerCase()
            .email(),
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
    params: z.object({}),
    query: z.object({}),
})

module.exports = createStudentSchema;