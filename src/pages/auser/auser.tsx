import React from 'react'

import { useAtomValue } from 'jotai'
import { useParams } from 'react-router-dom'

import { ProfileInfo } from '@components/index'
import { ViewImageModal } from '@components/modals'
import { openPopupAtom } from '@features/index'
import { useAuserData } from '@hooks/index'

import { Aposts } from './_components/a-posts'

export const Auser = () => {
    const { id } = useParams()
    const { isLoading, posts, username, status, profileImageUrl } = useAuserData(id)
    const openPopupType = useAtomValue(openPopupAtom)

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
