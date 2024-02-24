import React, { useRef, useEffect, useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useModal } from '@hooks/index'

import Modal from '../../Modal/Modal'
import { useEditProfileMutation } from '../hooks/hooks'

import { editProfileSchema, type EditProfileFormValues } from './form-schema'

export const EditProfileModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)
    const { closePopup } = useModal()

    const { editProfile, isPending } = useEditProfileMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus
    } = useForm<EditProfileFormValues>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onChange'
    })

    const onSubmit = useCallback(
        async (values: EditProfileFormValues) => {
            await editProfile(values)
            closePopup(popupRef.current)
        },
        [editProfile, closePopup]
    )

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('username')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                name="popupForm"
                className="popup__form"
                noValidate
            >
                <h2 className="popup__header">Edit your profile</h2>
                <div className="popup__inputs">
                    <fieldset className="popup__set">
                        <input
                            {...register('username')}
                            placeholder="Edit name..."
                            name="username"
                            id="username"
                            type="text"
                            className={
                                errors.username
                                    ? 'popup__input popup__input_type_error'
                                    : 'popup__input'
                            }
                        ></input>
                        {errors.username && (
                            <p className="popup__error">{errors.username.message}</p>
                        )}
                    </fieldset>
                    <fieldset className="popup__set">
                        <input
                            {...register('status')}
                            placeholder="Edit status..."
                            name="status"
                            id="status"
                            type="text"
                            className={
                                errors.status
                                    ? 'popup__input popup__input_type_error'
                                    : 'popup__input'
                            }
                            required
                        ></input>
                        {errors.status && <p className="popup__error">{errors.status.message}</p>}
                    </fieldset>
                </div>
                <button type="submit" className="popup__submit" disabled={!isValid || isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </button>
            </form>
        </Modal>
    )
}
