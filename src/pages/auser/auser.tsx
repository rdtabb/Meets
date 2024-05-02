import React from 'react'

import { useAtomValue } from 'jotai'

import { ProfileInfo } from '@components/index'
import { ViewImageModal } from '@components/modals'
import { openPopupAtom } from '@features/index'
import { useAuserData } from '@hooks/index'

import { Aposts } from './_components/a-posts'

import { Route as AuserRoute } from '../../routes/auser.$userId'

export const Auser = () => {
    const { userId } = AuserRoute.useParams()
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
            <Aposts uid={userId} posts={posts} name={username} isLoading={isLoading} />
            <>{openPopupType === 'auserimage' && <ViewImageModal id={id} />}</>
        </>
    )
}

export default Auser
