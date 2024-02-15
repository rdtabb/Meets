import React, { useRef } from 'react'

import { signOut } from 'firebase/auth'
import { useSetAtom } from 'jotai'

import { openPopupAtom } from '@features/index'

import { auth } from '../../../firebase-config'
import Modal from '../../Modal/Modal'

export const SignoutConfirmModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)
    const setOpenPopup = useSetAtom(openPopupAtom)

    const signout = async (): Promise<void> => {
        setOpenPopup('close')
        await signOut(auth)
    }

    return (
        <Modal ref={popupRef}>
            <form name="popupForm" className="popup__form" noValidate>
                <h2 className="popup__header">Are you sure?</h2>
                <button type="submit" className="popup__submit" onClick={signout}>
                    Confirm
                </button>
            </form>
        </Modal>
    )
}
