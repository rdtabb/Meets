import { useCallback, useMemo } from 'react'

import { useSetAtom } from 'jotai'

import { PopupType, Post } from '@constants/index'
import { selectedPostAtom, openPopupAtom } from '@features/index'
import { handlePopup } from '@methods/index'

export const useModal = () => {
    const setSelectedPost = useSetAtom(selectedPostAtom)
    const setOpenPopup = useSetAtom(openPopupAtom)

    const openPopup = useCallback(
        (popup: PopupType) => {
            setOpenPopup(popup)
        },
        [setOpenPopup]
    )

    const closePopup = useCallback(
        async (popup: HTMLDivElement | null) => {
            popup && (await handlePopup(popup, 'close'))
            setOpenPopup('close')
        },
        [setOpenPopup]
    )

    const openImagePopup = useCallback(
        (post: Post, auser?: boolean) => {
            if (auser) {
                setOpenPopup('auserimage')
            } else {
                setOpenPopup('image')
            }
            setSelectedPost(post)
        },
        [setOpenPopup, setSelectedPost]
    )

    return useMemo(
        () => ({
            closePopup,
            openImagePopup,
            openPopup
        }),
        [closePopup, openImagePopup, openPopup]
    )
}

export type UseModal = ReturnType<typeof useModal>
