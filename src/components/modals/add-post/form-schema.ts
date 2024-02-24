import { z } from 'zod'

export const addPostSchema = z.object({
    url: z.string().trim().url({
        message: 'Invalid url'
    }),
    place: z
        .string()
        .trim()
        .min(2, {
            message: 'Post title must be at least 2 characters long'
        })
        .max(30)
})

export type CreatePostFormValues = z.infer<typeof addPostSchema>
