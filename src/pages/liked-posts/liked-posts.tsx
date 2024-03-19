import React from 'react'

import { PostsLoading, PostsEmpty, ProfileInfo } from '@components/index'
import { useCurrentUser } from '@hooks/index'

import { PostList } from './_components/post-list'

export const LikedPosts = () => {
    const { profileImageUrl, username, status, isLoading, likedPosts } = useCurrentUser()

    return (
        <>
            <ProfileInfo
                profileImageUrl={profileImageUrl}
                username={username}
                status={status}
                isLoading={isLoading}
            />
            {isLoading ? (
                <PostsLoading />
            ) : likedPosts?.length ? (
                <PostList posts={likedPosts} />
            ) : (
                <PostsEmpty message="no liked posts yet" />
            )}
        </>
    )
}

export default LikedPosts
