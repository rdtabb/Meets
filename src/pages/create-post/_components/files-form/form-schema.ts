import { z } from 'zod'

const required_message = 'Field is required' as const
const invalid_url_message = 'Invalid url' as const
const max_upload_size = 1024 * 1024 * 3 // 3MB
const accepted_file_types = ['image/png']

export const FilesFormSchema = z.object({
    content: z.string().trim().min(1, {
        message: required_message
    }),
    title: z
        .string()
        .trim()
        .min(1, {
            message: required_message
        })
        .max(30, {
            message: 'Title cannot be longer than 30 letters'
        }),
    imageurl: z
        .string()
        .trim()
        .url({
            message: invalid_url_message
        })
        .optional(),
    imagefile: z
        .instanceof(File)
        .refine((file) => {
            return !file || file.size <= max_upload_size
        }, 'Image must be less than 3mb')
        .refine((file) => {
            return accepted_file_types.includes(file.type)
        }, 'Image must be png')
})

export type FormValues = z.infer<typeof FilesFormSchema>
