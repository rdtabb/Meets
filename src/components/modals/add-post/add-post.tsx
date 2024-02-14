import React, { useCallback, useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useModal } from '@hooks/index'

import Modal from '../../Modal/Modal'
import { useCreatePostMutation } from '../hooks/hooks'

import { addPostSchema, type CreatePostFormValues } from './form-schema'

export const CreatePostModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)
    const { closePopup } = useModal()

    const { addPost, isPending } = useCreatePostMutation()

    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors, isValid }
    } = useForm<CreatePostFormValues>({
        resolver: zodResolver(addPostSchema),
        mode: 'onChange'
    })

    const onSubmit = useCallback(
        async (variables: CreatePostFormValues) => {
            try {
                await addPost(variables)
                closePopup(popupRef.current)
            } catch (error) {
                console.log(error)
            }
        },
        [addPost, closePopup]
    )

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('url')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form
                onSubmit={handleSubmit(onSubmit)}
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
