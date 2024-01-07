import { useQueryClient, useMutation } from '@tanstack/react-query'

import { QueryKeys } from '@constants/queryKeys'
import { deleteLikedPost } from '@methods/index'

export const useDeletePost = () => {
    const queryClient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: deleteLikedPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USER]
            })
        }
    })

    return {
        deletePost: deleteMutation.mutate
    }
}
