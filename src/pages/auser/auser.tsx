import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ProfileInfo, PostsLoading, Aposts } from '@components/index'
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
            {isLoading ? <PostsLoading /> : <Aposts uid={id} posts={posts} name={username} />}
            <>{openPopupType === 'auserimage' && <ViewImageModal id={id} />}</>
        </>
    )
}

export default Auser
