import React, { memo } from 'react'

import { type Post as TPost } from '@constants/types'

import { PostsLoading } from '../profile/components/posts/posts-loading'

import { Post } from './a-feed/post'
import { NoPosts } from './NoPosts'

interface APostsProps {
    posts?: TPost[]
    name?: string
    uid?: string
    isLoading: boolean
}

export const Aposts = memo(({ posts, name, uid, isLoading }: APostsProps): JSX.Element => {
    if (isLoading) {
        return <PostsLoading />
    }

    if (!posts?.length) {
        return <NoPosts name={name} />
    }

    return (
        <section className="cards">
            {posts.map((post) => (
                <Post post={post} posts={posts} target_id={uid} key={post.id} />
            ))}
        </section>
    )
})
