import React, { lazy, Suspense } from 'react'

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
import { useAuthState } from '@context/auth-state'
import { openPopupTypeSelector } from '@features/modal/modalSlice'
import { Profile, Auth, Chat } from '@pages/index'

const Auser = lazy(() => import('@pages/auser/auser'))
const LikedPosts = lazy(() => import('@pages/liked-posts/liked-posts'))
const Userlist = lazy(() => import('@pages/userlist/userlist'))

export const cookies = new Cookies()

export const App = () => {
    const openPopupType = useSelector(openPopupTypeSelector)
    const uid = localStorage.getItem('uid')!
    const { isAuth } = useAuthState()

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
