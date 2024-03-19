import React, { memo } from 'react'

import { PostsEmpty } from '@components/index'
import { PostsLoading } from '@components/index'
import { type Post as TPost } from '@constants/types'

import { Post } from './a-post'

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
        return <PostsEmpty message={`${name} has no posts`} />
    }

    return (
        <section className="cards">
            {posts.map((post) => (
                <Post post={post} posts={posts} target_id={uid} key={post.id} />
            ))}
        </section>
    )
})
