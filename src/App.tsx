import React, { lazy, Suspense, useEffect } from 'react'

import { useAtom, useAtomValue } from 'jotai'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Cookies from 'universal-cookie'

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
import { ROUTES } from '@constants/index'
import { isAuthAtom } from '@features/auth/auth'
import { openPopupTypeSelector, userIdAtom } from '@features/index'
import { Profile, Auth, Chat } from '@pages/index'

import { auth } from './firebase-config'

const Auser = lazy(() => import('@pages/auser/auser'))
const LikedPosts = lazy(() => import('@pages/liked-posts/liked-posts'))
const Userlist = lazy(() => import('@pages/userlist/userlist'))

export const cookies = new Cookies()

export const App = (): JSX.Element => {
    const openPopupType = useSelector(openPopupTypeSelector)
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
                            <Suspense fallback={<UserlistLoading />}>
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
