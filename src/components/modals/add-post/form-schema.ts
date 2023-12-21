import { z, ZodType } from 'zod'

import type { AddPostData } from '@constants/index'

export const addPostSchema: ZodType<AddPostData> = z.object({
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
