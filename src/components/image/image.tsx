import React, { useState, useCallback, memo } from 'react'

export interface ImageProps {
    width: string
    height: string
    alt: string
    src: string
    classWhenError: string
    classWhenLoading: string
    className: string
}

export const Image = memo(
    ({
        width,
        height,
        alt,
        src,
        classWhenError,
        classWhenLoading,
        className
    }: ImageProps): JSX.Element => {
        const [isError, setIsError] = useState<boolean>(false)
        const [isLoading, setIsLoading] = useState<boolean>(true)

        const onImageLoadError = useCallback((): void => {
            setIsError(true)
            setIsLoading(false)
        }, [])

        const onImageLoad = useCallback((): void => {
            setIsLoading(true)
        }, [])

        return (
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`${className} ${isError ? classWhenError : null} ${
                    isLoading ? classWhenLoading : null
                }`}
                onError={onImageLoadError}
                onLoad={onImageLoad}
            />
        )
    }
)
