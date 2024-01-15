import { useMemo } from 'react'

export const useUid = (): string => {
    return useMemo(() => localStorage.getItem('uid')!, [])
}
