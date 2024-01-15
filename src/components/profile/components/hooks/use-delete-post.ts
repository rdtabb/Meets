import { useQueryClient, useMutation } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { deletePost } from '@methods/index'

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POSTS]
            })
        }
    })

    return deleteMutation.mutate
}
