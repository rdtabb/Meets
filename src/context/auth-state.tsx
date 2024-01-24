import React, { SetStateAction, createContext, useContext, useState, useMemo } from 'react'

import { cookies } from '../App'
import { ChildrenType } from '../constants/types'

export type AuthState = {
    isAuth: boolean
    setIsAuth: React.Dispatch<SetStateAction<boolean>>
    userId: string | undefined
    setUserId: React.Dispatch<SetStateAction<string | undefined>>
}

const initialState: AuthState = {
    setIsAuth: () => {},
    isAuth: false,
    userId: undefined,
    setUserId: () => {}
}

const AuthState = createContext<AuthState>(initialState)

export const AuthStateProvider = ({ children }: ChildrenType) => {
    const [isAuth, setIsAuth] = useState<boolean>(cookies.get('auth-token'))
    // TODO: probably move uid to different place in state
    const [userId, setUserId] = useState<string | undefined>(undefined)

    const authStateValue: AuthState = useMemo(
        () => ({
            isAuth,
            setIsAuth,
            userId,
            setUserId
        }),
        [isAuth, userId]
    )

    return <AuthState.Provider value={authStateValue}>{children}</AuthState.Provider>
}

export const useAuthState = () => useContext(AuthState)

export default AuthState
