import { z, ZodType } from 'zod'

export const changeAvatarSchema: ZodType<{ url: string }> = z.object({
    url: z.string().trim().url({
        message: 'Invalid url'
    })
})
