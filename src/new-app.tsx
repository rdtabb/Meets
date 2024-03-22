import React, { useEffect } from 'react'

import { Outlet } from '@tanstack/react-router'
import { useAtom, useAtomValue } from 'jotai'

import { ErrorBoundary, Container, AppFooter, AppHeader } from '@components/index'
import {
    SignoutConfirmModal,
    CreatePostModal,
    ChangeAvatarModal,
    EditProfileModal,
    ViewImageModal
} from '@components/modals'
import { Toaster } from '@components/ui/toaster'
import { isAuthAtom } from '@features/auth/auth'
import { userIdAtom, openPopupAtom } from '@features/index'
import { Auth } from '@pages/index'

import { auth } from './firebase-config'

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
                <Outlet />
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
