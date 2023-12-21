import React, { memo } from 'react'

import { editProfile } from '../../../../assets'
import { openPopup } from '../../../../utils/utils'

type AvatarImageProps = {
    url?: string
}

export const AvatarImage = memo(({ url }: AvatarImageProps) => (
    <div className="avatar-wrapper">
        <img
            aria-controls="popup--icon"
            onClick={() => openPopup('icon')}
            src={url}
            alt="Avatar"
            className="profile__avatar"
        />
        <img className="avatar-wrapper__icon" src={editProfile} alt="edit profile icon" />
    </div>
))
