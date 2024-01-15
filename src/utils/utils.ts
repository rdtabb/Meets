import { useMemo } from 'react'

import { type PopupType, localStorageKeys } from '@constants/index'
import { setOpenPopupType } from '@features/index'
import { store } from '@store/store'

export const openPopup = (popupType: PopupType): void => {
    store.dispatch(setOpenPopupType(popupType))
}

export const setLocalStorageItem = (key: keyof typeof localStorageKeys, value: string): void => {
    localStorage.setItem(key, value)
}

export const useUid = (): string => {
    return useMemo(() => localStorage.getItem('uid')!, [])
}
