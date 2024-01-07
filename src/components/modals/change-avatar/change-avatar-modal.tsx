import React, { useEffect, useRef } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditIconMutationProps } from '@constants/index'

import Modal from '../../Modal/Modal'
import { useChangeAvatarMutation } from '../hooks/hooks'

import { changeAvatarSchema } from './form-schema'

export const ChangeAvatarModal = () => {
    const popupRef = useRef<HTMLDivElement>(null)

    const { isPending, changeAvatar } = useChangeAvatarMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setFocus
    } = useForm<EditIconMutationProps>({
        resolver: zodResolver(changeAvatarSchema),
        mode: 'onChange'
    })

    useEffect(() => {
        if (window.innerWidth > 690) setFocus('url')
    }, [])

    return (
        <Modal ref={popupRef}>
            <form
                onSubmit={handleSubmit((values) => changeAvatar(values, popupRef.current))}
                name="popupForm"
                className="popup__form"
            >
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
