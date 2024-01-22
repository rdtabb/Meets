import { z } from 'zod'

export const authFormSchema = z.object({
    email: z.string().email({
        message: 'Incorrect email'
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters long'
    })
})

export type FormValues = z.infer<typeof authFormSchema>
