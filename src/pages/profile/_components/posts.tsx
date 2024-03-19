import React, { memo } from 'react'

import { useAtomValue } from 'jotai'

import { ErrorBoundary } from '@components/index'
import { PostsEmpty, PostsLoading } from '@components/posts'
import { userIdAtom } from '@features/index'

import { usePostsQuery } from '../_hooks/use-posts-query'

import { Post } from './post'

export const Posts = memo((): JSX.Element => {
    const userId = useAtomValue(userIdAtom)
    const { posts, isLoading, isEmpty } = usePostsQuery(userId)

    if (isLoading) {
        return <PostsLoading />
    }

    if (isEmpty) {
        return <PostsEmpty message="no posts yet" />
    }

    return (
        <ErrorBoundary>
            <section className="cards">
                {posts?.map((post) => (
                    <Post post={post} posts={posts} target_uid={userId} key={post.id} />
                ))}
            </section>
        </ErrorBoundary>
    )
})
