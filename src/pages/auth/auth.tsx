import React from 'react'

import { signInWithPopup, getAdditionalUserInfo, AdditionalUserInfo } from 'firebase/auth'
import { setDoc, doc, DocumentReference, DocumentData } from 'firebase/firestore'
import Cookies from 'universal-cookie'

import { meetsLogo, google } from '@assets/index'
import { ErrorBoundary } from '@components/index'
import { useAuthState } from '@context/auth-state'

import { auth, provider, db } from '../../firebase-config'

export const Auth = () => {
    const cookies = new Cookies()
    const { setIsAuth } = useAuthState()

    const signin = async (): Promise<void> => {
        try {
            const response = await signInWithPopup(auth, provider)
            const info: AdditionalUserInfo | null = getAdditionalUserInfo(response)
            const isNew: boolean | undefined = info?.isNewUser
            cookies.set('auth-token', response.user.refreshToken)
            const name: string | null = response.user.displayName
            const imgurl: string | null = response.user.photoURL
            const id: string = response.user.uid
            const docref: DocumentReference<DocumentData> = doc(db, 'users', `${id}`)
            localStorage.setItem('uid', `${id}`)

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
    }

    return (
        <ErrorBoundary>
            <main className="auth">
                <div className="img-container">
                    <img className="auth__logo" src={meetsLogo} alt="meets-logo" />
                </div>
                <h1 className="auth__header">Sign in with Google</h1>
                <button onClick={signin} className="auth__signin">
                    <img className="signin-icon" src={google} alt="Google icon" />
                    Sign in
                </button>
            </main>
        </ErrorBoundary>
    )
}
