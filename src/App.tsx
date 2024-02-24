import React, { lazy, Suspense, useEffect } from 'react'

import { useAtom, useAtomValue } from 'jotai'
import { Routes, Route } from 'react-router-dom'

import {
    ErrorBoundary,
    Container,
    AppFooter,
    AppHeader,
    ProfileLoading,
    UserlistLoading
} from '@components/index'
import {
    SignoutConfirmModal,
    CreatePostModal,
    ChangeAvatarModal,
    EditProfileModal,
    ViewImageModal
} from '@components/modals'
import { Toaster } from '@components/ui/toaster'
import { ROUTES } from '@constants/index'
import { isAuthAtom } from '@features/auth/auth'
import { userIdAtom, openPopupAtom } from '@features/index'
import { Profile, Auth, Chat } from '@pages/index'

import { auth } from './firebase-config'

const Auser = lazy(() => import('@pages/auser/auser'))
const LikedPosts = lazy(() => import('@pages/liked-posts/liked-posts'))
const Userlist = lazy(() => import('@pages/userlist/userlist'))

export const App = (): JSX.Element => {
    const openPopupType = useAtomValue(openPopupAtom)
    const [uid, setUid] = useAtom(userIdAtom)
    const isAuth = useAtomValue(isAuthAtom)

    useEffect(() => {
        const unsub = auth.onIdTokenChanged(() => {
            setUid(auth.currentUser?.uid)
        })

        return (): void => {
            unsub()
        }
    }, [])

    if (!isAuth) {
        return <Auth />
    }

    return (
        <ErrorBoundary>
            <Container>
                <AppHeader />
                <Routes>
                    <Route path={ROUTES.PROFILE} element={<Profile />} />
                    <Route
                        path={ROUTES.LIKEDPOSTS}
                        element={
                            <Suspense fallback={<ProfileLoading />}>
                                <LikedPosts />
                            </Suspense>
                        }
                    />
                    <Route
                        path={ROUTES.USERSEARCH}
                        element={
                            <Suspense
                                fallback={
                                    <main className="search">
                                        <ul className="search__userlist">
                                            <UserlistLoading />
                                        </ul>
                                    </main>
                                }
                            >
                                <Userlist />
                            </Suspense>
                        }
                    />
                    <Route
                        path={ROUTES.AUSER}
                        element={
                            <Suspense fallback={<ProfileLoading />}>
                                <Auser />
                            </Suspense>
                        }
                    />
                    <Route path={ROUTES.CHAT} element={<Chat />} />
                </Routes>
                <Toaster />
                <AppFooter />
            </Container>
            <>{openPopupType === 'edit' && <EditProfileModal />}</>
            <>{openPopupType === 'add' && <CreatePostModal />}</>
            <>{openPopupType === 'image' && <ViewImageModal id={uid} />}</>
            <>{openPopupType === 'icon' && <ChangeAvatarModal />}</>
            <>{openPopupType === 'confirm' && <SignoutConfirmModal />}</>
        </ErrorBoundary>
    )
}
