import { useMemo } from 'react'

import { type PopupType, localStorageKeys } from '@constants/index'
import { setOpenPopupType } from '@features/index'
import { store } from '@store/store'
import { ImageProps } from '@components/index'

export const openPopup = (popupType: PopupType): void => {
    store.dispatch(setOpenPopupType(popupType))
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

export const useUid = (): string => {
    return useMemo(() => localStorage.getItem('uid')!, [])
}

export const composeImageClassnames = (
    className: string
): Pick<ImageProps, 'className' | 'classWhenLoading' | 'classWhenError'> => ({
    className,
    classWhenError: `${className}--error`,
    classWhenLoading: `${className}--loading`
})
