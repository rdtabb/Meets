import React, { SetStateAction, createContext, useContext, useState, useMemo } from 'react'

import { cookies } from '../App'
import { ChildrenType } from '../constants/types'

export type AuthState = {
    isAuth: boolean
    setIsAuth: React.Dispatch<SetStateAction<boolean>>
}

const initialState: AuthState = {
    setIsAuth: () => {},
    isAuth: false
}

const AuthState = createContext<AuthState>(initialState)

export const AuthStateProvider = ({ children }: ChildrenType) => {
    const [isAuth, setIsAuth] = useState<boolean>(cookies.get('auth-token'))

    const authStateValue: AuthState = useMemo(
        () => ({
            isAuth,
            setIsAuth
        }),
        [isAuth]
    )

    return <AuthState.Provider value={authStateValue}>{children}</AuthState.Provider>
}

export const useAuthState = () => useContext(AuthState)

export default AuthState
