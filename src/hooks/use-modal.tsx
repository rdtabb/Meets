import { useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Post } from '@constants/index'
import { setOpenPopupType, setSelectedPost, selectedPostSelector } from '@features/index'
import { handlePopup } from '@methods/methods'

export const useModal = () => {
    const selectedPost = useSelector(selectedPostSelector)
    const dispatch = useDispatch()

    const closePopup = useCallback(async (popup: HTMLDivElement | null) => {
        popup && (await handlePopup(popup, 'close'))
        dispatch(setOpenPopupType('close'))
    }, [])

    const openImagePopup = useCallback(
        (post: Post) => {
            dispatch(setOpenPopupType('image'))
            if (selectedPost?.id !== post.id) dispatch(setSelectedPost(post))
        },
        [selectedPost]
    )

    return {
        closePopup,
        openImagePopup
    }
}

export type UseModal = ReturnType<typeof useModal>
