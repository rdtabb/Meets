import React, { useState, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Paperclip } from 'lucide-react'
import { flushSync } from 'react-dom'
import { useForm } from 'react-hook-form'

import { Button, Form, Input, Label } from '@components/ui'
import { Textarea } from '@components/ui/textarea'
import { TooltipTrigger, Tooltip, TooltipProvider, TooltipContent } from '@components/ui/tooltip'

import { FormValues, FilesFormSchema } from './form-schema'

export const FilesForm = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            title: 'Title',
            content: 'content'
        },
        resolver: zodResolver(FilesFormSchema),
        mode: 'all'
    })

    const [images, setImages] = useState<string[]>([
        'https://images.unsplash.com/photo-1684009779393-bc492383b48b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1684010261709-962cc669733d?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ])
    const [image, setImage] = useState<string>('')
    console.log(images)

    const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value)
    }, [])

    const addImage = useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>): void => {
            if (!image.length || event.key !== 'Enter') return

            flushSync(() => {
                setImages((prev) => [...prev, image])
            })
            setImage('')
        },
        [image]
    )

    const createPost = useCallback((values: FormValues) => {
        console.log(values)
    }, [])

    return (
        <div className="relative hidden flex-col items-start gap-8 md:flex">
            <Form {...form}>
                <form
                    className="grid w-full items-start gap-6"
                    onSubmit={form.handleSubmit(createPost)}
                >
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">Images</legend>
                        <div className="gap-3 flex h-[150px] w-full items-center justify-center rounded-md border border-dashed text-sm">
                            Drop files
                        </div>
                        <div className="grid gap-3">
                            <div className="flex gap-1 items-center">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Attach File</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <p className="text-sm">browse file system</p>
                            </div>
                            <Input
                                value={image}
                                onChange={handleImageChange}
                                onKeyDown={addImage}
                                placeholder="Enter image url..."
                                className="w-[400px]"
                            />
                        </div>
                    </fieldset>
                </form>
            </Form>
            <Form>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
                    <div className="grid gap-3">
                        <Label htmlFor="role">Title</Label>
                        <Input placeholder="post title..." />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea
                            id="content"
                            placeholder="what is your post about..."
                            className="min-h-[9.5rem]"
                        />
                    </div>
                </fieldset>
            </Form>
        </div>
    )
}
