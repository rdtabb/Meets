import { useMemo } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { QueryKeys } from '@constants/queryKeys'
import { Post } from '@constants/types'
import { userIdAtom } from '@features/index'
import { likePost, unlikePost } from '@methods/index'

export const useLikeMutations = (post: Post) => {
    const uid = useAtomValue(userIdAtom)
    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.AUSER] })
        }
    })

    const unlikeMutation = useMutation({
        mutationFn: unlikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QueryKeys.AUSER] })
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
