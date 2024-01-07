/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo, useEffect, forwardRef, PropsWithChildren } from 'react'

import { createPortal } from 'react-dom'
import { useDispatch } from 'react-redux'

import { setOpenPopupType } from '@features/modal/modalSlice'
import { handlePopup } from '@methods/index'

interface ModalProps extends PropsWithChildren {
    modalModifier?: string
    containerModifier?: string
}

const Modal = forwardRef(
    ({ children, containerModifier, modalModifier }: ModalProps, popupRef: any) => {
        const dispatch = useDispatch()

        const closePopup = async () => {
            const popup = popupRef.current

            popup && (await handlePopup(popup, 'close'))
            dispatch(setOpenPopupType('close'))
        }

        const closePopupOnEsc = async (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                await closePopup()
            }
        }

        const closePopupOnOverlay = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (e.currentTarget === e.target) {
                await closePopup()
            }
        }

        useEffect(() => {
            const popup = popupRef.current
            popup && handlePopup(popup, 'open')

            document.addEventListener('keydown', closePopupOnEsc)

            return () => {
                document.removeEventListener('keydown', closePopupOnEsc)
            }
        }, [])

        return createPortal(
            <div
                ref={popupRef}
                data-visible="false"
                onClick={closePopupOnOverlay}
                className={`popup ${modalModifier}`}
            >
                <div className={`popup__container ${containerModifier}`}>
                    {children}
                    <button onClick={closePopup} type="button" className="popup__close"></button>
                </div>
            </div>,
            document.getElementById('root')!
        )
    }
)

export default memo(Modal)
