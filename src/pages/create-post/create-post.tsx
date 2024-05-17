import React, { useState } from 'react'

import Autoplay from 'embla-carousel-autoplay'

import { Label } from '@components/ui'
import { Card, CardContent, CardHeader } from '@components/ui/card'
import {
    Carousel,
    CarouselItem,
    CarouselNext,
    CarouselContent,
    CarouselPrevious,
    type CarouselApi
} from '@components/ui/carousel'

import { FilesForm } from './_components/files-form/files-form'

export const CreatePost = (): JSX.Element => {
    const [images, setImages] = useState<string[]>([
        'https://images.unsplash.com/photo-1684009779393-bc492383b48b?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1684010261709-962cc669733d?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ])
    const [carouselApi, setCarouselApi] = useState<CarouselApi>()
    console.log(carouselApi, setImages)

    return (
        <main
            className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3 mx-auto place-self-center"
            data-kb-theme="dark"
        >
            <FilesForm />
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
                <section className="flex-1 grid place-items-center">
                    <Label className="sr-only">Post preview</Label>
                    <Card className="w-[300px] mx-auto">
                        <CardHeader>
                            <Carousel
                                setApi={setCarouselApi}
                                plugins={[
                                    Autoplay({
                                        delay: 5000
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
                            <h3 className="font-semibold text-lg mb-2">title</h3>
                            <p className="text-sm">content</p>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </main>
    )
}
