import React, { useCallback } from 'react'

import { signInWithPopup, getAdditionalUserInfo, browserSessionPersistence } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { Rings } from 'react-loader-spinner'

import { meetsLogo, google } from '@assets/index'
import { ErrorBoundary } from '@components/index'
import { Toaster } from '@components/ui/toaster'
import { isAuthLoadingAtom } from '@features/index'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '@ui/tabs'

import { auth, provider, db } from '../../firebase-config'

import { StarryBackground } from './blurry-background/blurry-background'
import { Intro } from './intro/intro'
import { LoginForm } from './login-form/login-form'
import { RegisterForm } from './login-form/reg-form'

export const Auth = () => {
    const [isAuthLoading, setIsAuthLoading] = useAtom(isAuthLoadingAtom)

    const signinWithGoogle = useCallback(async (): Promise<void> => {
        try {
            setIsAuthLoading(true)
            await auth.setPersistence(browserSessionPersistence)
            const response = await signInWithPopup(auth, provider)
            const info = getAdditionalUserInfo(response)

            const isNew: boolean | undefined = info?.isNewUser

            const name: string | null = response.user.displayName
            const imgurl: string | null = response.user.photoURL
            const id: string = response.user.uid

            const docref = doc(db, 'users', id)

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
                } catch (error) {
                    console.log(error)
                }
            }
            setIsAuthLoading(false)
        } catch (error) {
            setIsAuthLoading(false)
            console.log(error)
        }
    }, [])

    return (
        <ErrorBoundary>
            <div className="auth-wrapper">
                <StarryBackground />
                <Intro />
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
                    {!isAuthLoading ? (
                        <>
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
                        </>
                    ) : (
                        <div className="flex justify-center">
                            <Rings color="white" height={300} width={300} />
                        </div>
                    )}
                    <Toaster />
                </main>
            </div>
        </ErrorBoundary>
    )
}
