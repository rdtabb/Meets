import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { ImageProps } from '@components/index'
import { localStorageKeys } from '@constants/index'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const setLocalStorageItem = (key: keyof typeof localStorageKeys, value: string): void => {
    localStorage.setItem(key, value)
}
export const destroyLocalStorageItem = (
    keys: keyof typeof localStorageKeys | (keyof typeof localStorageKeys)[]
): void => {
    if (Array.isArray(keys)) {
        return void keys.forEach((key) => localStorage.removeItem(key))
    }
    localStorage.removeItem(keys)
}

export const composeImageClassnames = (
    className: string
): Pick<ImageProps, 'className' | 'classWhenLoading' | 'classWhenError'> => ({
    className,
    classWhenError: `${className}--error`,
    classWhenLoading: `${className}--loading`
})
