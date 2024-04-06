import React, { useCallback, useState } from 'react'
import { flushSync } from 'react-dom'

import { Paperclip } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Autoplay from 'embla-carousel-autoplay'

import { Label, Input, Button } from '@components/ui'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import { Textarea } from '@components/ui/textarea'
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import {
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselContent,
    CarouselPrevious,
    type CarouselApi
} from '@components/ui/carousel'

interface FormValues {
    title: string
    content: string
}

export const CreatePost = (): JSX.Element => {
    const [images, setImages] = useState<string[]>([
        'https://images.unsplash.com/photo-1684009779393-bc492383b48b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1684010261709-962cc669733d?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ])
    const [image, setImage] = useState<string>('')
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()

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
            carouselApi?.scrollTo(images.length - 1)
        },
        [image]
    )

    const { register, watch } = useForm<FormValues>({
        defaultValues: {
            title: 'title',
            content: 'content'
        }
    })

    const title = watch('title')
    const content = watch('content')

    return (
        <main
            className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 mx-auto place-self-center"
            data-kb-theme="dark"
        >
            <div className="relative hidden flex-col items-start gap-8 md:flex">
                <form
                    className="grid w-full items-start gap-6"
                    onSubmit={(event) => event.preventDefault()}
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
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">Post</legend>
                        <div className="grid gap-3">
                            <Label htmlFor="role">Title</Label>
                            <Input placeholder="post title..." {...register('title')} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="what is your post about..."
                                className="min-h-[9.5rem]"
                                {...register('content')}
                            />
                        </div>
                    </fieldset>
                </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <section className="flex-1 grid place-items-center">
                    <Label className="sr-only">Post preview</Label>
                    <Card className="w-[300px] mx-auto">
                        <CardHeader>
                            <Carousel
                                setApi={setCarouselApi}
                                plugins={[
                                    Autoplay({
                                        delay: 3000
                                    })
                                ]}
                            >
                                <CarouselContent>
                                    {images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                src={image}
                                                className="rounded object-cover object-center h-full"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </CardHeader>

                        <CardContent>
                            <h3 className="font-semibold text-lg mb-2">{title}</h3>
                            <p className="text-sm">{content}</p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    )
}
