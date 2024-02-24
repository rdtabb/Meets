import { useMemo } from 'react'

import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { QueryKeys } from '@constants/queryKeys'
import { HandleLikeMutationParams, Post } from '@constants/types'
import { userIdAtom } from '@features/index'
import { likePost, unlikePost } from '@methods/index'

interface UseLikeMutationsProps {
    post: Post
    queryKey: QueryKeys
}

interface UseLikeMutations {
    isLiked: boolean
    currentMutation: UseMutateFunction<void, Error, HandleLikeMutationParams, unknown>
}

export const useLikeMutations = ({ post, queryKey }: UseLikeMutationsProps): UseLikeMutations => {
    const queryClient = useQueryClient()
    const userId = useAtomValue(userIdAtom)

    const likeMutation = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        }
    })

    const unlikeMutation = useMutation({
        mutationFn: unlikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] })
        }
    })

    const isLiked = useMemo((): boolean => {
        if (!post.likes.length) return false

        return post.likes.some((like) => like.user_id === userId)
    }, [post.likes, userId])

    return useMemo(
        () => ({
            isLiked,
            currentMutation: isLiked ? unlikeMutation.mutate : likeMutation.mutate
        }),
        [isLiked, unlikeMutation.mutate, likeMutation.mutate]
    )
}
