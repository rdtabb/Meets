import React from 'react'

import { PostsLoading } from '../posts'
import { ProfileInfo } from '../profile-info/profile-info'

export const ProfileLoading = () => (
    <>
        <ProfileInfo isLoading={true} />
        <PostsLoading />
    </>
)
