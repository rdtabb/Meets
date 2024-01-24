import React, { memo } from 'react'

import { type Post as TPost } from '@constants/index'
import { useAuthState } from '@context/auth-state'

import { ErrorBoundary } from '../../../error-boundary/error-boundary'
import { usePostsQuery } from '../hooks/use-posts-query'

import { Post } from './post'
import { PostsEmpty } from './posts-empty'
import { PostsLoading } from './posts-loading'

export const Posts = memo((): JSX.Element => {
    const { userId } = useAuthState()
    const { posts, isLoading, isEmpty } = usePostsQuery(userId)

    if (isLoading) {
        return <PostsLoading />
    }

    if (isEmpty) {
        return <PostsEmpty />
    }

    return (
        <ErrorBoundary>
            <section className="cards">
                {posts?.map((post: TPost) => (
                    <Post post={post} posts={posts} target_uid={userId} key={post.id} />
                ))}
            </section>
        </ErrorBoundary>
    )
})
