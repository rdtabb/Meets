import { atom } from 'jotai'

import { type Post, PopupType } from '@constants/types'

export const selectedPostAtom = atom<Post | undefined>(undefined)
export const openPopupAtom = atom<PopupType>('close')
