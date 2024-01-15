import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ProfileInfo, Aposts } from '@components/index'
import { ViewImageModal } from '@components/modals'
import { openPopupTypeSelector } from '@features/index'
import { useAuserData } from '@hooks/index'

export const Auser = () => {
    const { id } = useParams()
    const { isLoading, posts, username, status, profileImageUrl } = useAuserData(id)
    const openPopupType = useSelector(openPopupTypeSelector)

    return (
        <>
            <ProfileInfo
                status={status}
                profileImageUrl={profileImageUrl}
                username={username}
                isLoading={isLoading}
            />
            <Aposts uid={id} posts={posts} name={username} isLoading={isLoading} />
            <>{openPopupType === 'auserimage' && <ViewImageModal id={id} />}</>
        </>
    )
}

export default Auser