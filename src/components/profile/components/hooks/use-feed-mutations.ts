import { useQueryClient, useMutation } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { likePost, unlikePost, deletePost } from '@methods/index'

export const useFeedMutations = () => {
    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS]
            })
        }
    })

    const unlikeMutation = useMutation({
        mutationFn: unlikePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS]
            })
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS]
            })
        }
    })

    return {
        deletePost: deleteMutation.mutate,
        likePost: likeMutation.mutate,
        unlikePost: unlikeMutation.mutate
    }
}
