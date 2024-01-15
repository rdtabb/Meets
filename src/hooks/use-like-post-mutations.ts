import { useMemo } from 'react'

import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { HandleLikeMutationParams, Post } from '@constants/types'
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
    const uid: string = localStorage.getItem('uid')!
    const queryClient = useQueryClient()

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

        return post.likes.some((like) => like.user_id === uid)
    }, [post.likes, uid])

    return {
        isLiked,
        currentMutation: isLiked ? unlikeMutation.mutate : likeMutation.mutate
    }
}
