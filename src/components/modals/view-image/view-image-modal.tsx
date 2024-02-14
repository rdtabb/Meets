import React, { useCallback, useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectedPostSelector } from '@features/index'

import Modal from '../../Modal/Modal'
import { useCommentsQuery, useCommentsMutation } from '../hooks/hooks'

import { CommentsSection } from './comments'

interface ViewImageModalProps {
    id?: string
}

export interface AddCommentFormValues {
    comment: string
}

export const ViewImageModal = ({ id }: ViewImageModalProps): JSX.Element => {
    const selectedPost = useSelector(selectedPostSelector)
    const popupRef = useRef<HTMLDivElement>(null)!

    const { register, handleSubmit, setFocus, reset } = useForm<AddCommentFormValues>({
        mode: 'onChange'
    })

    const { createComment } = useCommentsMutation()
    const comments = useCommentsQuery({
        post_owner_id: id,
        post_id: selectedPost?.id
    })

    const onSubmit = useCallback(
        async (values: AddCommentFormValues) => {
            reset()
            await createComment({
                ...values,
                post: selectedPost,
                id
            })
        },
        [createComment, id, reset, selectedPost]
    )

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('comment')
    }, [])

    return (
        <Modal
            ref={popupRef}
            modalModifier="popup--image"
            containerModifier="popup__container--image"
        >
            <div className="popup--image__container">
                <img
                    src={selectedPost?.imgsrc}
                    alt={selectedPost?.city}
                    className="popup__image"
                    width="800px"
                    height="600px"
                />
                <div className="textarea">
                    <p className="popup__caption">{selectedPost?.city}</p>
                    <ul className="comments">
                        <CommentsSection comments={comments} />
                    </ul>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            {...register('comment')}
                            placeholder="Leave your comment..."
                            type="text"
                            className="popup__comment"
                        />
                    </form>
                </div>
            </div>
        </Modal>
    )
}
