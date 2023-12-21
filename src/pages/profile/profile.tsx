import React, { memo } from 'react'

import { Posts, ProfileInfo } from '@components/index'
import { useUserQuery } from '@hooks/index'

export const Profile = memo((): JSX.Element => {
    const { isLoading, username, status, profileImageUrl } = useUserQuery()

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
