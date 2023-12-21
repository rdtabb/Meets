import React, { useEffect, useRef } from 'react'

import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import { selectedPostSelector } from '@features/index'
import { useComments } from '@hooks/index'

import Modal from '../../Modal/Modal'

import { CommentsSection } from './comments'

interface FormValues {
    comment: string
}

interface IViewImageModalProps {
    id?: string
}

export const ViewImageModal = ({ id }: IViewImageModalProps): JSX.Element => {
    const selectedPost = useSelector(selectedPostSelector)
    const popupRef = useRef<HTMLDivElement>(null)!

    const { register, handleSubmit, setFocus, reset } = useForm<FormValues>({
        mode: 'onChange'
    })

    const commentsMutation = useComments('mutation')
    const commentsQuery = useComments('query', id, selectedPost?.id)

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
                        <CommentsSection comments={commentsQuery?.data} />
                    </ul>
                    <form
                        onSubmit={handleSubmit((data: FormValues) => {
                            reset()
                            return commentsMutation.mutate({
                                ...data,
                                post: selectedPost,
                                id
                            })
                        })}
                    >
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
