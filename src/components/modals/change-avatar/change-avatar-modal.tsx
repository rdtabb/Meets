import React, { useCallback, useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useModal } from '@hooks/use-modal'

import Modal from '../../Modal/Modal'
import { useChangeAvatarMutation } from '../hooks/hooks'

import { changeAvatarSchema, type ChangeAvatarFormValues } from './form-schema'

export const ChangeAvatarModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)
    const { closePopup } = useModal()

    const { isPending, changeAvatar } = useChangeAvatarMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus
    } = useForm<ChangeAvatarFormValues>({
        resolver: zodResolver(changeAvatarSchema),
        mode: 'onChange'
    })

    const onSubmit = useCallback(
        async (values: ChangeAvatarFormValues) => {
            await changeAvatar(values)
            closePopup(popupRef.current)
        },
        [changeAvatar, closePopup]
    )

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('url')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form onSubmit={handleSubmit(onSubmit)} name="popupForm" className="popup__form">
                <h2 className="popup__header">Edit your profile icon</h2>
                <div className="popup__inputs">
                    <fieldset className="popup__set">
                        <input
                            {...register('url')}
                            placeholder="Enter icon url"
                            type="text"
                            className={
                                errors.url ? 'popup__input popup__input_type_error' : 'popup__input'
                            }
                        ></input>
                        {errors.url && <p className="popup__error">{errors.url.message}</p>}
                    </fieldset>
                </div>
                <button type="submit" className="popup__submit" disabled={!isValid || isPending}>
                    {isPending ? 'Saving...' : 'Save'}
                </button>
            </form>
        </Modal>
    )
}
