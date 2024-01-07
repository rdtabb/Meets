import React, { useRef, useEffect } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { EditProfilePopupData, QueryKeys } from '@constants/index'
import { useModal } from '@hooks/index'
import { editProfile } from '@methods/index'

import Modal from '../../Modal/Modal'

import { editProfileSchema } from './form-schema'

export const EditProfileModal = () => {
    const queryClient = useQueryClient()
    const popupRef = useRef<HTMLDivElement>(null)
    const { closePopup } = useModal()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus
    } = useForm<EditProfilePopupData>({
        resolver: zodResolver(editProfileSchema),
        mode: 'onChange'
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (variables: EditProfilePopupData) =>
            editProfile(variables).then(() => closePopup(popupRef.current)),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER] })
        }
    })

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('username')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form
                onSubmit={handleSubmit((variables) => mutate(variables))}
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
