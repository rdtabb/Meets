import React, { memo } from 'react'

import { editProfile } from '@assets/index'

import { openPopup } from '../../utils/utils'

interface IProfileInfoProps {
    isLoading: boolean
    profileImageUrl?: string
    username?: string
    status?: string
    editable?: boolean
}

export const ProfileInfo = memo(
    ({ isLoading, profileImageUrl, username, status, editable }: IProfileInfoProps) => (
        <section className="profile">
            <div className="profile__wrapper">
                {isLoading ? (
                    <img className="profile__avatar--empty" />
                ) : (
                    <div className="avatar-wrapper">
                        <img
                            aria-controls="popup--icon"
                            onClick={editable ? () => openPopup('icon') : () => {}}
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
                        <h1 className="profile__header">{isLoading ? 'Loading...' : username}</h1>
                        {editable && (
                            <button
                                onClick={editable ? () => openPopup('edit') : () => {}}
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
                    onClick={() => openPopup('add')}
                    type="button"
                    className="profile__add-button"
                ></button>
            )}
        </section>
    )
)
