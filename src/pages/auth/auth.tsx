import React, { useCallback } from 'react'

import { signInWithPopup, getAdditionalUserInfo, browserSessionPersistence } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import Cookies from 'universal-cookie'

import { meetsLogo, google } from '@assets/index'
import { ErrorBoundary } from '@components/index'
import { Toaster } from '@components/ui/toaster'
import { useAuthState } from '@context/auth-state'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@ui/index'

import { auth, provider, db } from '../../firebase-config'

import { LoginForm } from './login-form/login-form'
import { RegisterForm } from './login-form/reg-form'

export const Auth = () => {
    const { setIsAuth } = useAuthState()

    const signinWithGoogle = useCallback(async (): Promise<void> => {
        try {
            const cookies = new Cookies()
            await auth.setPersistence(browserSessionPersistence)
            const response = await signInWithPopup(auth, provider)
            const info = getAdditionalUserInfo(response)

            const isNew: boolean | undefined = info?.isNewUser
            cookies.set('auth-token', response.user.refreshToken)

            const name: string | null = response.user.displayName
            const imgurl: string | null = response.user.photoURL
            const id: string = response.user.uid

            const docref = doc(db, 'users', id)
            localStorage.setItem('uid', id)

            if (!isNew) {
                setIsAuth(true)
            }

            if (isNew) {
                try {
                    await setDoc(docref, {
                        name: name,
                        imgurl: imgurl,
                        id,
                        newPosts: [],
                        liked: [],
                        newStatus: 'Add your status!'
                    })
                    setIsAuth(true)
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [setIsAuth])

    return (
        <ErrorBoundary>
            <main className="auth" data-kb-theme="dark">
                <div className="img-container">
                    <img
                        className="auth__logo"
                        src={meetsLogo}
                        alt="meets-logo"
                        width={142}
                        height={40}
                    />
                </div>
                <Tabs defaultValue="login" className="mt-8 mb-10">
                    <TabsList className="w-full">
                        <TabsTrigger value="login" className="w-full">
                            Login
                        </TabsTrigger>
                        <TabsTrigger value="register" className="w-full">
                            Register
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <LoginForm />
                    </TabsContent>
                    <TabsContent value="register">
                        <RegisterForm />
                    </TabsContent>
                </Tabs>
                <button onClick={signinWithGoogle} className="auth__signinGoogle">
                    <img
                        className="signin-icon"
                        src={google}
                        alt="Google icon"
                        width={25}
                        height={25}
                    />
                    Sign in with Google
                </button>
                <Toaster />
            </main>
        </ErrorBoundary>
    )
}
