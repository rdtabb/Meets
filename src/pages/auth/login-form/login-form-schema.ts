import { z } from 'zod'

export const loginFormSchema = z
    .object({
        email: z.string().trim().email({
            message: 'Incorrect email'
        }),
        password: z.string().trim().min(6, {
            message: 'Password must be at least 6 characters long'
        })
    })
    .required({ email: true, password: true })

export type FormValues = z.infer<typeof loginFormSchema>
