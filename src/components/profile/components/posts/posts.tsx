import React, { memo } from 'react'

import { useAtomValue } from 'jotai'

import { userIdAtom } from '@features/index'

import { ErrorBoundary } from '../../../error-boundary/error-boundary'
import { usePostsQuery } from '../hooks/use-posts-query'

import { Post } from './post'
import { PostsEmpty } from './posts-empty'
import { PostsLoading } from './posts-loading'

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
