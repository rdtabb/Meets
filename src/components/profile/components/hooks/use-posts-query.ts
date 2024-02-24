import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { QueryKeys, type Post } from '@constants/index'
import { getPosts } from '@methods/index'

interface UsePostsQuery {
    posts: Post[] | undefined
    isLoading: boolean
    isEmpty: boolean
}

export const usePostsQuery = (user_id?: string): UsePostsQuery => {
    const query = useQuery({
        queryKey: [QueryKeys.POSTS, user_id],
        queryFn: () => getPosts(user_id)
    })

    return useMemo(
        () => ({
            posts: query.data,
            isLoading: query.isLoading,
            isEmpty: !query.data?.length
        }),
        [query.data, query.isLoading]
    )
}
