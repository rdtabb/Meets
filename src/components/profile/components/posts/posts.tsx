import React, { memo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys, Post as TPost } from '@constants/index'
import { useUid } from '@hooks/use-uid'
import { getPosts } from '@methods/index'

import { ErrorBoundary } from '../../../error-boundary/error-boundary'

import { Post } from './post'
import { PostsEmpty } from './posts-empty'
import { PostsLoading } from './posts-loading'

export const Posts = memo((): JSX.Element => {
    const { data: posts, isLoading } = useQuery({
        queryKey: [QueryKeys.POSTS],
        queryFn: getPosts
    })
    const uid = useUid()

    if (isLoading) {
        return <PostsLoading />
    }

    if (!posts?.length) {
        return <PostsEmpty />
    }

    return (
        <ErrorBoundary>
            <section className="cards">
                {posts.map((post: TPost) => (
                    <Post post={post} posts={posts} target_uid={uid} key={post.id} />
                ))}
            </section>
        </ErrorBoundary>
    )
})
