import React, { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { HandleNewPostParams, QueryKeys } from '@constants/index'
import { useModal } from '@hooks/index'
import { createPost } from '@methods/index'

import Modal from '../../Modal/Modal'

import { addPostSchema } from './form-schema'

export const CreatePostModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)
    const queryClient = useQueryClient()
    const { closePopup } = useModal()

    const { mutate: addPost, isPending } = useMutation({
        mutationFn: (variables: HandleNewPostParams) =>
            createPost(variables).then(() => closePopup(popupRef.current)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.POSTS] })
        }
    })

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isValid }
    } = useForm<HandleNewPostParams>({
        resolver: zodResolver(addPostSchema),
        mode: 'onChange'
    })

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('url')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form
                onSubmit={handleSubmit((variables) => addPost(variables))}
                name="popupForm"
                className="popup__form"
                noValidate
            >
                <h2 className="popup__header">Add new post</h2>
                <div className="popup__inputs">
                    <fieldset className="popup__set">
                        <input
                            {...register('url')}
                            placeholder="Enter picture url..."
                            type="url"
                            className={
                                errors.url ? 'popup__input popup__input_type_error' : 'popup__input'
                            }
                        ></input>
                        {errors.url && <p className="popup__error">{errors.url.message}</p>}
                    </fieldset>
                    <fieldset className="popup__set">
                        <input
                            {...register('place')}
                            placeholder="Enter post title..."
                            type="text"
                            className={
                                errors.place
                                    ? 'popup__input popup__input_type_error'
                                    : 'popup__input'
                            }
                            required
                        ></input>
                        {errors.place && <p className="popup__error">{errors.place.message}</p>}
                    </fieldset>
                </div>
                <button disabled={!isValid || isPending} type="submit" className="popup__submit">
                    {isPending ? 'Saving...' : 'Save'}
                </button>
            </form>
        </Modal>
    )
}
