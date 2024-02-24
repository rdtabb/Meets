import React, { memo } from 'react'

import { useSetAtom } from 'jotai'

import { editProfile } from '@assets/index'
import { openPopupAtom } from '@features/index'

interface IProfileInfoProps {
    isLoading: boolean
    profileImageUrl?: string
    username?: string
    status?: string
    editable?: boolean
}

export const ProfileInfo = memo(
    ({ isLoading, profileImageUrl, username, status, editable }: IProfileInfoProps) => {
        const setOpenPopup = useSetAtom(openPopupAtom)

        return (
            <section className="profile">
                <div className="profile__wrapper">
                    {isLoading ? (
                        <img className="profile__avatar--empty" />
                    ) : !profileImageUrl ? (
                        <div className="avatar-wrapper">
                            <img
                                aria-controls="popup--icon"
                                onClick={editable ? () => setOpenPopup('icon') : () => {}}
                                src={profileImageUrl}
                                className="profile__avatar--null"
                            />
                            <img
                                className="avatar-wrapper__icon"
                                src={editProfile}
                                alt="edit profile icon"
                            />
                        </div>
                    ) : (
                        <div className="avatar-wrapper">
                            <img
                                aria-controls="popup--icon"
                                onClick={editable ? () => setOpenPopup('icon') : () => {}}
                                src={profileImageUrl}
                                alt="Avatar"
                                className="profile__avatar"
                            />
                            <img
                                className="avatar-wrapper__icon"
                                src={editProfile}
                                alt="edit profile icon"
                            />
                        </div>
                    )}
                    <div className="profile__info">
                        <div className="profile__info-wrapper">
                            <h1 className="profile__header">
                                {isLoading ? 'Loading...' : username}
                            </h1>
                            {editable && (
                                <button
                                    onClick={editable ? () => setOpenPopup('edit') : () => {}}
                                    type="button"
                                    className="profile__edit-button"
                                ></button>
                            )}
                        </div>
                        <p className="profile__description">{isLoading ? 'Loading...' : status}</p>
                    </div>
                </div>
                {editable && (
                    <button
                        onClick={() => setOpenPopup('add')}
                        type="button"
                        className="profile__add-button"
                    ></button>
                )}
            </section>
        )
    }
)
