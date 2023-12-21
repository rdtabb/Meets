import React from 'react'

import { PostsLoading, ProfileInfo } from '..'

export const ProfileLoading = () => (
    <>
        <ProfileInfo isLoading={true} />
        <PostsLoading />
    </>
)
