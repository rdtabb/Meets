/* eslint-disable react/prop-types -- what the fuck? */
import React, { memo, useEffect, forwardRef, PropsWithChildren, ForwardedRef } from 'react'

import { useSetAtom } from 'jotai'
import { createPortal } from 'react-dom'

import { openPopupAtom } from '@features/index'
import { handlePopup } from '@methods/index'

interface ModalProps extends PropsWithChildren {
    modalModifier?: string
    containerModifier?: string
}

const Modal = forwardRef(
    (
        { children, containerModifier, modalModifier }: ModalProps,
        popupRef: ForwardedRef<HTMLDivElement>
    ) => {
        const setOpenPopup = useSetAtom(openPopupAtom)

        const closePopup = async (): Promise<void> => {
            if (typeof popupRef === 'function' || popupRef === null) {
                return void 0
            }

            const popup = popupRef.current

            popup && (await handlePopup(popup, 'close'))
            setOpenPopup('close')
        }

        const closePopupOnEsc = async (e: KeyboardEvent): Promise<void> => {
            if (e.key === 'Escape') {
                await closePopup()
            }
        }

        const closePopupOnOverlay = async (
            e: React.MouseEvent<HTMLDivElement, MouseEvent>
        ): Promise<void> => {
            if (e.currentTarget === e.target) {
                await closePopup()
            }
        }

        useEffect(() => {
            if (typeof popupRef === 'function' || popupRef === null) {
                return void 0
            }

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
