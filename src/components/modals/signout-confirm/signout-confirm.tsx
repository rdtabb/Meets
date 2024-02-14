import React, { useRef } from 'react'

import { signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'

import { setOpenPopupType } from '@features/index'

import { cookies } from '../../../App'
import { auth } from '../../../firebase-config'
import Modal from '../../Modal/Modal'

export const SignoutConfirmModal = () => {
    const dispatch = useDispatch()
    const popupRef = useRef<HTMLDivElement>(null)

    const signout = async (): Promise<void> => {
        dispatch(setOpenPopupType('close'))
        await signOut(auth)
        cookies.remove('auth-token')
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
