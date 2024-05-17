import React, { memo } from 'react'

import { ProfileInfo } from '@components/index'
import { useCurrentUser } from '@hooks/index'

import { Posts } from './_components/posts'

export const Profile = memo((): JSX.Element => {
    const { isLoading, username, status, profileImageUrl } = useCurrentUser()

    console.log(crypto.randomUUID())

    return (
        <main className="main">
            <ProfileInfo
                isLoading={isLoading}
                username={username}
                status={status}
                profileImageUrl={profileImageUrl}
                editable
            />
            <Posts />
        </main>
    )
})
