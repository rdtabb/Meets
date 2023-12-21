/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, createContext, useContext, useState } from 'react'

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

    return (
        <AuthState.Provider
            value={{
                isAuth,
                setIsAuth
            }}
        >
            {children}
        </AuthState.Provider>
    )
}

export const useAuthState = () => useContext(AuthState)

export default AuthState
