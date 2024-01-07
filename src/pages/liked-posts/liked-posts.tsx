import React from 'react'

import { PostList, PostsLoading, PostsEmpty, ProfileInfo } from '@components/index'
import { useUser } from '@hooks/index'

export const LikedPosts = () => {
    const { profileImageUrl, username, status, isLoading, likedPosts } = useUser()

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
                <PostsEmpty />
            )}
        </>
    )
}

export default LikedPosts
