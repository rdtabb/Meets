import { z } from 'zod'

export const changeAvatarSchema = z.object({
    url: z.string().trim().url({
        message: 'Invalid url'
    })
})

export type ChangeAvatarFormValues = z.infer<typeof changeAvatarSchema>
