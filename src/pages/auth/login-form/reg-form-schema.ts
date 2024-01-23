import { z } from 'zod'

export const regFormSchema = z
    .object({
        email: z.string().trim().email({
            message: 'Incorrect email'
        }),
        password: z.string().trim().min(6, {
            message: 'Password must be at least 6 characters long'
        }),
        confirmPassword: z.string().trim().min(6, {
            message: 'Password must be at least 6 characters long'
        })
    })
    .required({ email: true, password: true, confirmPassword: true })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })

export type FormValues = z.infer<typeof regFormSchema>
