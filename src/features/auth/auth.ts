import { atom } from 'jotai'

export const userIdAtom = atom<string | undefined>(undefined)
export const isAuthAtom = atom<boolean>((get) => !!get(userIdAtom))
