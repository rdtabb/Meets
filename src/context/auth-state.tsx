import React, { SetStateAction, createContext, useContext, useState, useMemo } from 'react'

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

// const initialSetterState: Pick<AuthState, 'setIsAuth' | 'setUserId'> = {
//     setIsAuth: () => {},
//     setUserId: () => {}
// }

const AuthState = createContext<AuthState>(initialState)
const AuthStateSetters = createContext<AuthState>(initialState)

export const AuthStateProvider = ({ children }: ChildrenType) => {
    const [userId, setUserId] = useState<string | undefined>(undefined)
    const [isAuth, setIsAuth] = useState<boolean>(!!userId)
    // TODO: probably move uid to different place in state

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

export const useAuthState = () => {
    const context = useContext(AuthState)

    if (!context) {
        throw new Error('AuthStateGetters context is not available')
    }

    return context
}

export const useAuthStateSetters = () => {
    const context = useContext(AuthStateSetters)

    if (!context) {
        throw new Error('AuthStateSetters context is not available')
    }

    return context
}

export default AuthState
