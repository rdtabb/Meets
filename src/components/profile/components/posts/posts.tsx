import React, { memo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys } from '@constants/index'
import { getPosts } from '@methods/methods'

import { ErrorBoundary } from '../../../error-boundary/error-boundary'
import { Feed } from '../feed/feed'

import { PostsEmpty } from './posts-empty'
import { PostsLoading } from './posts-loading'

export const Posts = memo((): JSX.Element => {
    const { data: posts, isLoading } = useQuery({
        queryKey: [QueryKeys.POSTS],
        queryFn: getPosts
    })

    if (isLoading) {
        return <PostsLoading />
    }

    if (!posts?.length) {
        return <PostsEmpty />
    }

    return (
        <ErrorBoundary>
            <Feed posts={posts} />
        </ErrorBoundary>
    )
})
