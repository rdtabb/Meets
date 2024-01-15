import React, { memo } from 'react'

import { useUser } from '@hooks/index'
import { openPopup } from '@utils/utils'

import { AvatarImage } from './avatar-image'
import { AvatarImageLoading } from './avatar-image-loading'

export const ProfileInfo = memo(() => {
    const { isLoading, username, status, profileImageUrl } = useUser()

    return (
        <section className="profile">
            <div className="profile__wrapper">
                {isLoading ? <AvatarImageLoading /> : <AvatarImage url={profileImageUrl} />}
                <div className="profile__info">
                    <div className="profile__info-wrapper">
                        <h1 className="profile__header">{isLoading ? 'Loading...' : username}</h1>
                        <button
                            onClick={() => openPopup('edit')}
                            type="button"
                            className="profile__edit-button"
                        ></button>
                    </div>
                    <p className="profile__description">{isLoading ? 'Loading...' : status}</p>
                </div>
            </div>
            <button
                onClick={() => openPopup('add')}
                type="button"
                className="profile__add-button"
            ></button>
        </section>
    )
})
